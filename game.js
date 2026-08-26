// ================================================================
// 离线模式拦截器 v7 —— 2026-08-26 晚
//
// 本版变化：
//   0. appid 保持 wxb710578e30185510（用户工具链绑定，不能改）。
//      真实登录此路不通（wx.login 的 code 归属本 appid，而 login.do
//      按游戏的 appid=wx5d871736426d2811 做 code2Session，必不匹配）
//      → 自适应登录自动落在回放模式，功能无损
//   1. 安装时间回溯：广告配置里有 firstDayNoAd（首日无广告）开关，
//      本 hook 扫描存储里疑似"安装/注册时间"的字段，自动回溯30天，
//      绕过"首日不加载广告"的限制
//   2. 启动日志持久化 offline_logs + 45秒 watchdog（v6）
//   3. 云存档本地化 / 道具加满 / 免广告 hook（v5）
//
// 倒计时说明：关卡倒计时是 C# 纯内存计算（PBGameModel_Z.LeftTime
// 每帧递减），JS 层无法冻结（冻结 performance.now 会连动画一起冻死）。
// 等效方案：广告复活（+120秒/次，假广告秒完成）→ 无限续时间。
// ================================================================
var OFFLINE = {
  ENABLED: true,        // 总开关
  LOG: true,            // 拦截日志（稳定后改 false）
  freeAd: true,         // 免广告（激励视频秒完成）
  localSave: true,      // 云存档本地化
  saveBackupCount: 3,   // update 存档在本地保留的份数
  goodsCheat: true,     // 道具/体力/无限体力buff 作弊
  tryRealLogin: true,   // 自适应登录：先试真实服务器，失败自动回退回放
  persistLogs: true,    // 启动日志持久化（存到 storage，事后可查启动阶段行为）
  sniffNet: true,       // 网络嗅探：透传请求的响应预览（定位广告/配置问题用）
  sniffStorage: true,   // 存储嗅探：记录所有本地写入（定位道具数量key用）
  sniffBridge: true,    // C#→JS 桥调用嗅探（广告初始化诊断用）
  fakeOpenId: "oqHl119jj4V3IOGxovYqxEl_lnnI" // 抓包真实openid，勿改
};

// 自适应状态：真实登录成功后，所有加密响应类接口透传真实服务器
var ADAPTIVE = {
  realLogin: false,     // login.do 真实成功过？
  loginDecided: false,  // 登录方式已确定？
  adBridgeCalls: 0      // C# 调用广告API的次数（watchdog 用）
};

// 道具作弊参数
var GOODS = {
  staminaId: 1002,          // 体力
  unlimitedBuffId: 1003,    // 无限体力buff（签到送的10分钟道具同款）
  staminaCount: 999,        // 体力保持值
  itemCount: 99,            // 道具(2002~2004等)保持值
  buffCount: 99,            // buff道具持有数
  buffEndTime: 4102444800000 // buff到期时间 = 2100年（永久）
};

// ---- 抓包回放数据（2026-08-26 15:42 正式服）----
var REPLAY_LOGIN_TOKEN = "{\"token\":\"a7e051c693a3449fb9943e148c1b48df\",\"openId\":\"oqHl119jj4V3IOGxovYqxEl_lnnI\",\"sessionKey\":\"BCAIAFckKj1xSGd0SFRiQRkLTzUhNE5J\",\"KVDataList\":[],\"firstLoginFlag\":false,\"loginTime\":1787730129398,\"lastLoginTime\":1787726065000,\"code\":\"0\"}";
var REPLAY_DECODE_V2   = "{\"code\":\"0\",\"msg\":\"sElo5AYICxUEyeSwnn+ZCQ==\"}";
var REPLAY_MINI_AUTH   = "{\"encrypt\":\"/W3aBgVsjt+JC20VuJHAVJxmKkDTv30lFmptOhRlA6lfBryaCwEJiWJWaIcc7yuQxZkSlHoeW92BjSYvK0sge8sW70jE7DIhEhiuD5Tgqc3WN+7oDiopynkQwzB83NX7UYxDmoJIjX/DjBgIXcEfgXgQbcllcHF65hXhTz1gUC/xU4FLvL99MLG6gBxfRZHIVTZdtOck2dN63yZ967NW5bEP679v5J8XZyuo/beY6XQtg8hATkg/pWWaPxHN5qZurzXHmqoYBx95DckjRUwTduElQjIouS1jezPGv7x4GWomtoa3X2PrT8iBypsq9UjCloil53rk2bDURDhk7hWi6a5ajRdS6RM6fBsTe7CbyNBihiTFlajVrz5/6sot9N4zlmaCKmq/HfEdB5vhY/j/6v0ZZhDZV6i3VOKgu2yp/kU4ofnTzpcJHlA3Zjhn5ow4+HFKZUyMj3r3ZMtGnp+WTnGGzoVr/Y0u0USwvRkrm+TDLPJsnw85SgQiuRSKETWWVZenEbUvwyl9rJ2FXnzmbTuuKnLKU26omd1Igi46ny8CxVIT0+KihGW1QV71Ig1Nf9utKqa8/jGewmLlqFVJr9GJpKnpKv8w1XwQ35VNOQ79EWcusLhfi2Rb1/4GjDEp\"}";
var REPLAY_MINI_VER    = "{\"encrypt\":\"/W3aBgVsjt+JC20VuJHAVLkz1x7kdc4/z+tYEVTU3YFi43fgmTFwKRnPyZC1xKL8vY/lwQoafMDbE8CpwveZ2TuJOBmzmkqyHZ+8ghvBvB9hFDv0ox4utAGfrblVTbCw8DskC7BOX8IxQqj7p8tnKA+EgI0zwDHuBqN9Jp/yJTK/anFOO9OC+nv4RYoKXmnRUvMfCenlFknjpPlZnCznYa4jUA81eNEJ4pbApsVhetScgICdIXEMWol6gZHqOwEPjNJPqG+BGjEeijKMsojNupkzIbxvatZEzu4HW1b24D66fFmGw615I8Puzj8GPz2OsjaG2aJ9STiVZtwwjR3gAdR6Q1DzWWDsINiqBOM2FsOXXE8a0GeR90CtNJYq6C51sOX2nPBAHfdfDV4EQcZfZj7cgGiZGIMKqN64b6dlV8D7dUJq86avdhNUynkoiZ5wr2EcivgxpPWBuoXEj7gF/VkwUFB3JzvPCzhO5j3aeJueTKd3KVJuNycZIK3bqBPaDhZ9bjz6skXRuzczPkEqe4xyPQyOP45UE119TsSzHz6V/s3wXAfCk2FKgqFfs2riTw6aF6HVkiphZielGrGKz3svGHEUDzkcUolj7fGerlqBU4CSROCszxLgdyQ/TIG0TEYatnpasK07yMgvPVjqXA==\"}";
var REPLAY_MINI_UPD    = "{\"encrypt\":\"/W3aBgVsjt+JC20VuJHAVG9s+eU8/gqta61l/Yv6/QGQdKhg4ub+fu9e9T6VIJAjOWhftWWmWmm/O22Tfs//jdhfBVU1NWzgDEK9nuVl2JE=\"}";
var REPLAY_ADZ_CFG     = "1mO78AhfO4TB/+E9X5DTiPzd/qRQQB8LfjzPKhBMcJ7O5zpcIqNlb32Ut2vCXDMt5xFRWeWIXTNH9Z2aDnvYcPxdp2MDfQ8QwX8Ungzirg5mYQCNWXsudKUJ4DmUiTFsQiwWS8mMQxH9JJLtar+rLWGh47CUL/RVL7GC0AVi03EaSnVi/pKEqh903hkW2UTejGaF9CMSEMAER3bTyUwkd6TzJ6ZoDCfd/UaZr2AoRdOvSkMZUdEYXe96cL02lBvB3Xn68lfjwjAx6oGevz+xFBtEWawKJDw7nO7dYjRyWhPOviHLsdQ5fTFcKF5F9Gm3ifjzxwps2LMJj3xtPA/QDcNTY2eduXuVwZj+vfMux+GsIc88yVFAXrmccHOnWVTYJwsJAeS/OZzEVF2YWEfd+lmDSrPD7PUR8KwgP1znfdxj1eBKm/EpjSESTdaiAW5Cp7uoquSE9ncGecO1fGU9GpzA/nEkrtZjGAc4pRwxhVRTh4JNxgqlfkm/C4sgCzjeDPtGW1tvnY8eJbNaACcViCyrEB8S5gAq00rV583gzXU6s/PO2VUSAWPC5vFIK7Iin5mBfgti63K26O/nXkvH8kOOzbdcMHZrFPyMS7pvymmq1cNC9Un5L22Hlfp8OClxFjo7/kcj/B0Mecu8UtVjTb0/1klTn4ul6tmA+t2yYqTyUa9AfFrGAB4/1/9bhuRqKLaetPAu06lEcujI+uNPuW8zg8n3FhwIgxSHrN6zbDjYBuq6LGYcKnL82sOno7R0ZnSoMOAxwDYzhU209u2zLy7WxPPwVhAtrFq7BRI6VNSmNbiRB1qi0LBKuMoRdRqWWpqt1WsTgArfKyFp8dH0wCTjRhYphzNea6Io4406hmEExClbpNT5c7484ax/v81HJkM0TWipbQve8V8P+xmlICkcg2uJuBriLkZeJnWlfFMxZw4LSmgxNURYeQXSs+v0mANNvcJJi+mIIWy2MuYQxVSEuIult7/xViXEDLjswn1Rmq6Q86c8dsFHnlphOWo89e9eWY2STYy7VYqwj50ZxvlVeDXjmvSSR3K9obpaoibaHczk7QwYZJaxAlkkBO1X18yzA1FvAbG9V+G0Rm8KIEL4cQz4Qh7VANdPb3D1dSQxxlaslvY/P3949sXev0T0UzUjn0G1RDiicZMZXd3LXYW2JeASUyhAQfjoBVxbeOwKW+Kcm/cKqypwP99Uz7EQbdeTB0ne35s49Wb3bceiIoY5QfsdX8CEj+mlr6atJ+/pjd3hsbmm4JINeAKXdDLSiYt6wMa2sQKcl4T/DMSOjwg7gOjIjfMXyylL2XH3XWVjFJAqryCQ8TalxQMeAOuT4cc/VnVGBNgw/3FAMaD6araQDFzzLn0AivEyTBWaRV7CVxv6eXxYc60McCS0Ls5X7D/LLfKwjFCRjE3ezGJWO3zyb2xFUJxgDL4PpSmWpTxYEB7Zfm+tSpJSeqROd/Vv88dapgV7aML+Z+81YJ1pi93iSh9s3kkf0dKOUoZ6NB0Lc2NG3KmDOLWjHTG8zorABGXYYXsdw5tNVxRjwJ/SBgiRVbd0PZJAezw29dsb7HltmA9pqRB9Ux+WqNbnnhPsE+vrlTqoxPRfRCl4YT7lBqnHCRLA++jfelM84VTl8I3k8nlMi7paCtt8q9BhCKROa/pTiyojJnzmrVTU1vPzn4EsxCnPJMgGCy8BDh49IvX2u+ARHjI8YA7JIQu6l+eyUXNB50IC5z1ozYSH5IsUKXMxcgsm5DyBoqzcQn7VgJ1PcS1fjUXOURfTp9H1uLXzbxjocKEJlagGvONLzS3Eim2/XaAv5HuH+zXME20jcIpINafdbG0DqcqYwhafff6OMwYYMhZSbkndK6jLr2298J7lfcE5vucaWM1jMHpvYHg6oCca4OLgEQbWpxuS3GyiFkt/yKRH7ySWGzujvmF5ZLsU9sVIItaNPTIZ3luaW0q9gOm9ehwR7iwicZhyMpXVJ60Kzt5mZz+ULxLSm3Qws85GISZ+UwSnG12rXgl0y3n65ph3cv+oTzKmb4H+E+ZceT8cS187Pl2mHVWpY2KGJdrAI8tzPYXjbOIPJ6H8v738SfJrvb1waACESok1UYZNRBR+LfZLZj5F/sfUOs+R6TNNq63cfvTREg6WqLVF2LMRPn236hN67bcd28GkMy4z6S2GoFLOlQXejlQu9jI6bucyJIC/qW5cpsnXXdJb0nSncBkrmQ9ZY7urHYXqhxC5dx0AAffHo79an9PpK/LC8zvA5DCxJeFKrWC6an2AunFeXTIFJYPpJAHtZ9YbMGIYkvQztkdhy1/rlnMfRC4MPLaJeDf2gqUvkJ7u8rH/dkDJO2ZXnAKFOlfcSKjGIDEOsUwOWQziEBUU36B48LaTbSTj2vAJY4QbULyXMVJKPTeczQOmfw3cZJkTSmnIH7GX/ZOi/lz0Pg4fxbcDlD80QkQFPyUpWoIk1CNX2EeAZa5n1LfrOaDCKWLg0bXjSo5mlUaw8lIebzcUkbbyYjMy3dqreWC2jwold3hpjIkvta0z+o7qkO91jnCWv6vXJVpoRE1uqrjx9NPHAZHgJ4bDJ5pg91zJtjg7107XIaEpkeCVMweFOO+zcew2sLBeka+MoUhRaLegGCgzFlTGCwpezwE6l7T9gD9AKEngMWd/JTaxoh82lp3mVRz4Y9OmSwPKL5s/WhHebV82uM4wOVNk/UwvmGDQ+pk5S20SbBUEAkT0IK6LMmngam2tnkbQPB0t1EYgxA86uSb/GDy8wH5L4WYZmq464SFYg+smDFhzcLiNupuNU80iYz/sNOVPTOnqnJ884EgEtSiTTlGj1uqXl4De3QWjszkZlEuPxH0rU5MACaG7I9t6hAIlz9mBBV6gEg+lDnp0SqUClsuyoGyT85Zlu2q1ufv4anNxg+5tvz7Nvj07kq+98vhhHa62wDU6Wix5F++4h1odyjiSEKplMV/HUgfaW+41RItbxYa+pjHw06acbjhNKyOdNAUcbfCI/IHmn+eactuIteloz5kiUBpbK4WQS9OugSrTBZltswPwkcPv/VL7Wyvd5TOoCrRH1Da7/K0rVrLVjrOOcWFPChb2/QYyNQ7XJuJQpGcZQ/QORHb0KZJswulmESwVC4NEUl6Fmz1V5sqtEYtviX8nQHj8Wm364YCmxzyx0RDmII1UMJ5l91ipJ0/xvxZNoPPtRHJig9l3OwCZH6XD0i3KYyfWZvJDWQ1o4tU1KFLaF4nD3VHKWjxMJt6xvKhVFfK6oQuEdCO4u2kDtVZr+WpyQwRT5RskYGfl7cHn2e+kEgHtilmsRD59AYPslL1z1HqMWdN+jhGjdCrckoOg+TnSPnA09twTyx0TZlGiiuvPP/FgXLGy5+TUSJmF8Zh7nSw6pQbtBUddQnGruJFps1KP/222NiqWQRZlNnrrQI8hLydeg2t9jNWNb3mNZKh0yDmJ0Gi/MxZ/VRhKilyV8EUE70TEPyyKR/Cs6FV/ln6Lr2OvyRIPvP1P+59yj4QMtxJ4J9OtT8SR3N9UOLSm7Zlz3J4Km7vJVr9Po5+86nKKqMDArtApps8w0FkMsmC/dZktM5Ep5FbmeQ/x8VKXICvAqJBdV83uw0xb1pjv+KwuLENEMn7QXe0Ap0u5JH34V4SDjT9u2AJtTTcYxue95nx8ExC+WIjo9SUogvmyxzvMm1ZNWIxbNOwpqPCTMGEz8z/+1ANpMlUq1FAMFa5kPOU/mFTGEkDB1apsTTil8U72OpAm96a7DfRGs+NRV0ALn3mrInK11Z/BF8t3xyjHL4KavjlICO8EMWLpP+Ti8BK3uaw2W8DrRZbUwAk2C7VGGQ6v0LRB2zxSjaHMZvH4R8PXxr78X1NWtXVbXtPyTIOAT92v58L+YGU2IdFsac3GlYqoW650l5IsRe/JNBUrsfCyvJu/j6oBCUQHVoD06WsTYCcAGJq/HcU3dssw9aW1PwW2YRIqHwgMBbWhdW4CbnDESsot7JNTZjscXjmRCRHEsRXkMxxP0Hfh/WP43KFLHOHNVBP8LuTSAkbhv1Oj+TMZH7G+mNozmuUEuhe72IzsgKR34zds846GmxdzsLOSl3rmbqbJeoFYmiIbToY9kC9Xd2bruPGQTqPgFQGtJuIbg1kzyMZUvIuqxtFxuxdgDU6+"; // 广告位配置(base64)
var REPLAY_DBT_CFG     = "a1HvihfUBot4RTl9/yT9+phfTo22XOwU8TwP8frVgemHiDEki+BaLgRZZDwaMKWKF7w1EhmDl6uI3SyA8kUOukfDND9iIDeVm0vNYm+kmI4yccS1cTgi+cdn/vGjiAmSC6/upkHIb5e1zErinKkmN6JlufW2KfY7K7j/GIb3yAjdjRWgri74uorlKknD4thsgYoma1QSm+b0OBCnnk5nvk7Dx9MqHjK+qxcQ1NpnhhFml4s8Da1Vt5GtOnZ/N2ZdOf8eAl4YasPtItDd8iX0VwwC1nIl/FYOxj/R0CLN45hsHKoxGFDkIitorcmuUxo1odBcXkwS6gKSlXiJXvjYc/u5xRl7FFKgddQMjRPPc4QUMVADCFX37DyPHTbHo7VIbIW/ym2ygTdwTXPSGICBaBlhsT/vWTEhKuast4z/epop4UxwnyTO3icx42bP3j6FsGfs6gxMUR2fmP9VTS5QLDi5ZPWTFP7IStQtqC7cIuMy0763ZpLYB56+fVFQt1SXYCoKdjHKXd1D40ASdBWghitkQaggMKDCGJkd5D11uLC9FGnQtFvsNEevnDVMrxyVbJ0Oisiyg6jModbnu9LcR67px87F0LtOjsxR49ZA1zJHY+kRKO2dTsUxjaWTpwqKIzJDyXz0Kk48e6KId1GHFlL1/SuXXlazHbYrWCLNaUAd9FyPx6/dv5v3yZfzB07v1rbpM/odJE46jmlg0lX08FWhR97ZGyQ64fTv4YkMBXTUpeSt5faUVWzfm/f2/c4V6tPv3Ubbcz+1J0rYESwXMnZBkNvxE63JovBkURunt/NlUhlLKyxXODoxgFswfVfcGO31fDs4m/kTn3qo1AziVgyYH3DMDJo8RTKE8rnla3QWgn7Moex2B2jMq3Ey6f4SFAUJE2AKt/R/84z8t9tOGtkyyNs3ptm3qhyA25XqvQH9pVl1z3H265I+pbV6AzS+mOwpdAvpwLtxoKgvtYr5g/2zKxk48stTQxnhQLmwxbWO86gahBWtF9G2D+h+aAbh3pbtoppBTfCCvB+4LaLQ8DniHDQ4bTjo2VMlf4ZoHlZDCLp2nmuAa4Uo6gVkG4PczjXnxQINzouMF52PAXH+FILbwSD9PG9zDjGJa4tqltkUTYpLLs3ZeH817Rhd/4Wznh6s/NTGDP5cepKEYofKZJmhu02gADXaCz6DCIjbrVw+5BGA4wDYLrIearq7o1DHP+sT0OsCagg4WP7PN7b79XvIdN64XEqhv/RF1IZ6Cj4X4/nlVTn9vnYifi9u1CkMtOKd3thQJgrWwX7b27mzKnRuuYwmcTtF30RWTDXZau08ie26IsFpaAIGnrVONlXDPDluOGlNL0aT5bTnuXxrAZO594l0VUlhhllJKHgAZaL3gNlivLHfUXUp7mLstAMIM/pK8x94IosRAMlpNEBAtAnQA2vCUUdBBjOEgMLn4q7EzHeP/qI1+tZWcP3ECXQF7I/NghXcbu2OJ45ijBFkT9Ezim/iyCGlXkfrk/lfptW3xcIq1BBJFLjC1eHlIgn7zyMeMktSHwFBrspzTK4GxkNRrXWXyFrRQ8bUMFEXs81CVZVpl+BhK3+IoTK3+WMP+bn96Z48oEIvxAzGN+n4+onUU7nDfXr7Ec3POfglOJMPGRdJzHuhDp+aiGl1NXxwWuSusuQhDZtajLmxTrkwIS5inuIOfrPC4kyQpeZyNi7vZ4pgYXPjZgRaMj2sI6Rpvtr4jqPniOOOlpxKa02YCV6rtfQZ+wVH9fl4kfl6906w+HQPeCShJMlpQ+czTl289KLCIBwbeCTVA75lUpVgQs/WSMouGqmWsk6DK6sbV0X5ERcO18Hs2UKyAG8rNY9MyChG7dCXGF2IFnNjjStCLw=="; // 远程参数配置(base64)

// 日志持久化：ring buffer 存到 storage（启动阶段日志事后可查）
var __logBuf = [];
var __logFlushed = 0;
try {
  __logBuf = JSON.parse(wx.getStorageSync("offline_logs") || "[]");
  if (!Array.isArray(__logBuf)) __logBuf = [];
  __logBuf.push("==== 新会话 " + new Date().toLocaleString() + " ====");
} catch (e) { __logBuf = []; }

function offlineLog(tag, msg) {
  if (!OFFLINE.LOG) return;
  var line = "[OFFLINE][" + tag + "] " + (msg || "");
  console.log(line);
  if (OFFLINE.persistLogs) {
    __logBuf.push(line);
    // 超400条丢弃旧的一半；每累计20条刷盘一次
    if (__logBuf.length > 400) __logBuf = __logBuf.slice(200);
    if (__logBuf.length - __logFlushed >= 20) {
      __logFlushed = __logBuf.length;
      try { wx.setStorageSync("offline_logs", JSON.stringify(__logBuf)); } catch (e) {}
    }
  }
}
// 页面隐藏时强制刷盘
try {
  wx.onHide(function () {
    try { wx.setStorageSync("offline_logs", JSON.stringify(__logBuf)); } catch (e) {}
  });
} catch (e) {}

// 构造 wx.request 风格的响应对象，data 一律用字符串
// （weapp-adapter 的 XHR 会原样赋给 responseText，和真实服务器行为一致）
function fireSuccess(options, dataStr, delay) {
  var resp = {
    data: dataStr,
    statusCode: 200,
    errMsg: "request:ok",
    header: { "Content-Type": "application/json; charset=utf-8", "Server": "offline" },
    cookies: []
  };
  setTimeout(function () {
    try {
      if (options.success) options.success(resp);
    } finally {
      if (options.complete) options.complete(resp);
    }
  }, delay || 0);
  return { abort: function () {} };
}

// login.do 响应（loginTime 动态化，其余字段与真实服务器一致）
function buildLoginResp() {
  var o = JSON.parse(REPLAY_LOGIN_TOKEN);
  o.loginTime = Date.now();
  o.lastLoginTime = Date.now() - 3600000;
  return JSON.stringify(o);
}

// mini-event 弹窗：永远返回空列表（无弹窗）
function buildMiniEventResp(options) {
  var category = "";
  try {
    var body = typeof options.data === "string" ? JSON.parse(options.data) : options.data;
    if (body && body.category) category = body.category;
  } catch (e) {}
  return JSON.stringify({ msg: "OK", code: 0, data: [], category: category });
}

// gusspro 存档上传：本地备份 + 回放成功响应
function handleSaveUpload(options) {
  if (OFFLINE.localSave && typeof options.data === "string" && options.data.length > 2) {
    try {
      var backups = wx.getStorageSync("offline_save_backups") || [];
      backups.push({ time: Date.now(), data: options.data });
      while (backups.length > OFFLINE.saveBackupCount) backups.shift();
      wx.setStorageSync("offline_save_backups", backups);
      offlineLog("SAVE", "云存档已本地备份 #" + backups.length + " (" + options.data.length + "B)");
    } catch (e) {
      offlineLog("SAVE", "本地备份失败: " + e);
    }
  }
  return fireSuccess(options, REPLAY_MINI_UPD);
}

// ---- 道具/体力/无限buff 作弊 ----
// vyGoodsModel 结构（用户实测确认）：
//   {"propList":[{"id":1003,"count":0,"endTimeStamp":0},{"id":1002,"count":90,...},
//                {"id":2002..2004,...道具...}, ...可能还有其他字段}
var __goodsLogCount = 0;
function isGoodsKey(key) {
  return typeof key === "string" && key.indexOf("pdpx_vyGoodsModel") === 0;
}
function boostGoods(jsonStr, source) {
  if (!OFFLINE.goodsCheat || typeof jsonStr !== "string" || jsonStr.length < 5) return jsonStr;
  try {
    var o = JSON.parse(jsonStr);
    if (!o || !o.propList) return jsonStr;
    var list = o.propList;
    for (var i = 0; i < list.length; i++) {
      var p = list[i];
      if (!p || typeof p.id !== "number") continue;
      if (p.id === GOODS.staminaId) {
        if (p.count < GOODS.staminaCount) p.count = GOODS.staminaCount;      // 体力999
      } else if (p.id === GOODS.unlimitedBuffId) {
        if (p.count < GOODS.buffCount) p.count = GOODS.buffCount;            // buff道具99个
        if (!p.endTimeStamp || p.endTimeStamp < Date.now()) p.endTimeStamp = GOODS.buffEndTime; // 永久生效
      } else if (p.id >= 2000) {
        if (p.count < GOODS.itemCount) p.count = GOODS.itemCount;            // 所有道具99
      }
    }
    var out = JSON.stringify(o);
    if (__goodsLogCount < 6) {
      __goodsLogCount++;
      offlineLog("CHEAT", "道具已加满(" + source + "): " + out.slice(0, 240));
    }
    return out;
  } catch (e) {
    offlineLog("CHEAT", "解析失败(" + source + "): " + e);
    return jsonStr;
  }
}

// 透传请求的响应嗅探（只加日志，不改行为；成功/失败都记录）
function sniffRequest(options) {
  if (!OFFLINE.sniffNet || !options) return options;
  var wrapped = {};
  for (var k in options) wrapped[k] = options[k];
  if (options.success) {
    var origSuccess = options.success;
    wrapped.success = function (res) {
      try {
        var data = res && res.data, preview;
        if (typeof data === "string") {
          preview = data.length > 100 ? data.slice(0, 100) + "...(" + data.length + "B)" : data;
        } else if (data instanceof ArrayBuffer) {
          preview = "(binary " + data.byteLength + "B)";
        } else {
          preview = JSON.stringify(data);
          if (preview && preview.length > 100) preview = preview.slice(0, 100) + "...";
        }
        offlineLog("NET", (res && res.statusCode || "?") + " " + options.url.slice(0, 100) + " => " + preview);
      } catch (e) {}
      origSuccess(res);
    };
  }
  if (options.fail) {
    var origFail = options.fail;
    wrapped.fail = function (err) {
      offlineLog("NETFAIL", options.url.slice(0, 100) + " => " + (err && err.errMsg));
      origFail(err);
    };
  } else {
    wrapped.fail = function (err) {
      offlineLog("NETFAIL", options.url.slice(0, 100) + " => " + (err && err.errMsg) + " (无fail回调)");
    };
  }
  return wrapped;
}

// ---- wx.request 拦截 ----
var __originalRequest = wx.request;
wx.request = function (options) {
  if (!OFFLINE.ENABLED || !options || !options.url) {
    return __originalRequest(options);
  }
  var url = options.url;
  // 所有非CDN请求的入口日志（诊断广告初始化用）
  if (OFFLINE.LOG && url.indexOf("lfrjtxx-cou") < 0 && url.indexOf("myqcloud") < 0) {
    var shortUrl = url.length > 110 ? url.slice(0, 110) + "..." : url;
    offlineLog("REQ", (options.method || "GET") + " " + shortUrl);
  }

  // 1. 登录服务器 azory（login.do / decodeV2）
  if (url.indexOf("azory.lumosfun.com") >= 0) {
    if (url.indexOf("login.do") >= 0) {
      // 自适应登录：先打真实服务器（appid 已改回游戏真身，code2Session 应能成功）
      // 失败/空响应 → 回退抓包回放。真实成功则置 realLogin，后续加密接口全透传。
      if (OFFLINE.tryRealLogin && !ADAPTIVE.loginDecided) {
        ADAPTIVE.loginDecided = true;
        offlineLog("LOGIN", "login.do -> 尝试真实登录...");
        var wrapped = {};
        for (var kk in options) wrapped[kk] = options[kk];
        var decided = false;
        function fallback(reason) {
          if (decided) return;
          decided = true;
          ADAPTIVE.realLogin = false;
          offlineLog("LOGIN", "真实登录失败(" + reason + ") -> 回退回放模式");
          fireSuccess(options, buildLoginResp());
        }
        wrapped.success = function (res) {
          if (decided) return;
          var body = res && res.data;
          var bodyStr = typeof body === "string" ? body : JSON.stringify(body);
          if (res && res.statusCode === 200 && bodyStr && bodyStr.indexOf("\"token\"") >= 0 && bodyStr.indexOf("\"openId\"") >= 0) {
            decided = true;
            ADAPTIVE.realLogin = true;
            offlineLog("LOGIN", "真实登录成功! 后续加密接口透传真实服务器");
            if (options.success) options.success(res);
            if (options.complete) options.complete(res);
          } else {
            fallback("无效响应: " + (bodyStr || "(空)").slice(0, 60));
          }
        };
        wrapped.fail = function (err) {
          fallback((err && err.errMsg) || "网络失败");
        };
        setTimeout(function () { fallback("超时8秒"); }, 8000);
        return __originalRequest(wrapped);
      }
      // 已决定过登录方式：回放模式下继续回放；真实模式下透传
      if (ADAPTIVE.realLogin) {
        offlineLog("LOGIN", "login.do -> 透传（真实登录模式）");
        return __originalRequest(sniffRequest(options));
      }
      offlineLog("LOGIN", "login.do -> 回放真实登录态");
      return fireSuccess(options, buildLoginResp());
    }
    if (url.indexOf("decodeV2") >= 0) {
      if (ADAPTIVE.realLogin) {
        offlineLog("LOGIN", "decodeV2 -> 透传（真实模式）");
        return __originalRequest(sniffRequest(options));
      }
      offlineLog("LOGIN", "decodeV2 -> 回放解密结果");
      return fireSuccess(options, REPLAY_DECODE_V2);
    }
    // azory 其他接口：真实模式透传，回放模式也透传（无抓包数据可回放）
    offlineLog("LOGIN", "azory透传: " + (url.split("/")[3] || ""));
    return __originalRequest(sniffRequest(options));
  }

  // 2. 云存档/事件服务 gusspro
  if (url.indexOf("gusspro.com") >= 0 && url.indexOf("/mini-data/") >= 0) {
    if (url.indexOf("auth/login") >= 0) {
      offlineLog("SAVE", "mini-data auth/login -> 回放");
      return fireSuccess(options, REPLAY_MINI_AUTH);
    }
    if (url.indexOf("data/private/version") >= 0) {
      offlineLog("SAVE", "mini-data version -> 回放（云端版本冻结，本地存档优先）");
      return fireSuccess(options, REPLAY_MINI_VER);
    }
    if (url.indexOf("data/private/update") >= 0) {
      return handleSaveUpload(options);
    }
    if (url.indexOf("sys/nowTime") >= 0) {
      return fireSuccess(options, JSON.stringify({
        code: 0,
        data: { ef: false, version: "wpHCjWPCh8KNaMKSb8KGwoVTwoB3cWXCl01I", nowTime: Date.now() },
        msg: "OK"
      }));
    }
    // 其他 mini-data 接口一律按成功空数据处理
    offlineLog("SAVE", "mini-data 其他接口 -> 通用成功");
    return fireSuccess(options, JSON.stringify({ code: 0, msg: "OK", data: {} }));
  }
  if (url.indexOf("gusspro.com") >= 0 && url.indexOf("/mini-event/") >= 0) {
    offlineLog("EVENT", "mini-event -> 无弹窗");
    return fireSuccess(options, buildMiniEventResp(options));
  }

  // 3. 广告系统相关服务器（自适应）：
  //    真实登录模式：全部透传真实服务器（响应加密与真实会话自洽，广告系统能正常初始化）
  //    回放模式：getAdzCfg/DbtRemoteConfig/EventStatServ 回放抓包 + UserStatServ等透传
  if (ADAPTIVE.realLogin) {
    if (url.indexOf("jajsy.lumosfun.com") >= 0 ||
        url.indexOf("gjyxkvuxz.lumosfun.com") >= 0 ||
        url.indexOf("wjrtyjhkl.lumosfun.com") >= 0 ||
        url.indexOf("fixhkl.lumosfun.com") >= 0 ||
        url.indexOf("fixfun.lumosfun.com") >= 0 ||
        url.indexOf("fixgniinsl.lumosfun.com") >= 0 ||
        url.indexOf("fyywngzynts.lumosfun.com") >= 0) {
      offlineLog("ADS", "真实模式透传: " + (url.split("/")[3] || ""));
      return __originalRequest(sniffRequest(options));
    }
  }
  if (url.indexOf("fixhkl.lumosfun.com") >= 0) {
    offlineLog("ADS", "getAdzCfg -> 回放广告配置");
    return fireSuccess(options, REPLAY_ADZ_CFG);
  }
  if (url.indexOf("wjrtyjhkl.lumosfun.com") >= 0) {
    offlineLog("ADS", "DbtRemoteConfig -> 回放远程配置");
    return fireSuccess(options, REPLAY_DBT_CFG);
  }
  if (url.indexOf("jajsy.lumosfun.com") >= 0) {
    offlineLog("ADS", "EventStatServ/UserStatServ -> 回放成功响应");
    return fireSuccess(options, '{"code":"0","msg":""}');
  }
  if (url.indexOf("gjyxkvuxz.lumosfun.com") >= 0 ||
      url.indexOf("fixfun.lumosfun.com") >= 0 ||      // adsapi
      url.indexOf("fixgniinsl.lumosfun.com") >= 0 ||  // adsbidding
      url.indexOf("fyywngzynts.lumosfun.com") >= 0) { // attribution
    offlineLog("ADS", "透传真实服务器: " + (url.split("/")[3] || ""));
    return __originalRequest(sniffRequest(options));
  }
  if (url.indexOf("backend.gravity-engine.com") >= 0) {
    var body = "";
    if (url.indexOf("user/initialize") >= 0) {
      body = JSON.stringify({ data: { token: OFFLINE.fakeOpenId }, extra: {}, code: 0, msg: "成功" });
    } else {
      body = JSON.stringify({ data: {}, extra: { error: "", errors: [] }, code: 0, msg: "成功" });
    }
    offlineLog("REPORT", "gravity-engine -> 通用成功");
    return fireSuccess(options, body);
  }
  if (url.indexOf("api.datanexus.qq.com") >= 0) {
    if (url.indexOf("config/get") >= 0) {
      body = JSON.stringify({ code: 0, data: { noClaimActionList: ["TICKET", "ENTER_FOREGROUND", "ENTER_BACKGROUND"], channelClaimActionList: ["REGISTER", "START_APP", "RE_ACTIVE"], realTimeActionList: ["START_APP", "REGISTER", "PURCHASE", "RE_ACTIVE"], ticketInterval: 60, requestTimeout: 30000 }, trace_id: "offline" });
    } else {
      body = JSON.stringify({ code: 0, message: "ok", trace_id: "offline", data: { code: 0, message: "ok", trace_id: "offline" } });
    }
    offlineLog("REPORT", "datanexus -> 通用成功");
    return fireSuccess(options, body);
  }

  // 4. 其他（资源CDN / 微信自身）→ 放行真实请求
  return __originalRequest(sniffRequest(options));
};

// ---- 安装时间回溯：绕过 firstDayNoAd（首日无广告）----
// 原理：广告配置的"首日不加载广告"按 安装时间/注册日 判定。
// C# 读到的任何"安装/注册/首玩时间"如果落在今天，就回溯30天。
var INSTALL_BACKDATE_DAYS = 30;
var __backdateKeys = {}; // 已回溯过的 key，避免重复日志
function looksLikeTimestamp(v) {
  // 13位毫秒时间戳（2000~2100年）或 10位秒时间戳
  return (typeof v === "number" && v > 946684800 && v < 4102444800) ||
         (typeof v === "number" && v > 946684800000 && v < 4102444800000);
}
function backdateValue(v) {
  if (typeof v === "number") {
    if (v > 946684800000) return v - INSTALL_BACKDATE_DAYS * 86400000; // 毫秒
    if (v > 946684800) return v - INSTALL_BACKDATE_DAYS * 86400;      // 秒
  }
  return v;
}
function tryBackdate(key, value) {
  if (!OFFLINE.goodsCheat) return value; // 跟作弊总开关走
  try {
    var nowMs = Date.now();
    var upperMs = nowMs + 86400000; // 明天之内（未来的解锁时间不动）
    // 数字且 key 名疑似"安装/注册/创建/首玩" → 直接回溯
    if (typeof value === "number" && /install|create|register|first|newuser|new_user/i.test(key)) {
      if (looksLikeTimestamp(value) && value > 1700000000 && value < upperMs) {
        var nv2 = backdateValue(value);
        if (nv2 !== value && __backdateKeys[key] !== String(value)) {
          __backdateKeys[key] = String(nv2);
          offlineLog("CHEAT", "安装时间回溯 " + key + ": " + value + " -> " + nv2);
          return nv2;
        }
      }
      return value;
    }
    // JSON 字符串：不管顶层 key 名，探测内部时间戳字段（install/create/first/time）
    if (typeof value === "string" && value.length > 5 && value.length < 3000 && value.charAt(0) === "{") {
      var o = JSON.parse(value);
      var changed = false;
      for (var f in o) {
        if (!/install|create|register|first/i.test(f)) continue; // 只动明确的字段，纯time结尾的太宽
        var val = o[f];
        if (typeof val === "number" && val > 1700000000 && val < upperMs) {
          var nf = backdateValue(val);
          if (nf !== val) { o[f] = nf; changed = true; }
        }
      }
      if (changed) {
        offlineLog("CHEAT", "JSON时间回溯: " + key + " (绕过首日无广告)");
        return JSON.stringify(o);
      }
    }
  } catch (e) {}
  return value;
}

// ---- 存储 hook：写入加满道具 + 读取也加满 + 嗅探日志 ----
(function hookStorage() {
  // 写入：道具模型在写入时自动加满（C#写回扣减后的值也会被补回999/99）
  var origSet = wx.setStorage;
  if (origSet) {
    wx.setStorage = function (o) {
      try {
        if (o && isGoodsKey(o.key) && typeof o.data === "string") {
          o.data = boostGoods(o.data, "setStorage");
        }
        if (o) o.data = tryBackdate(o.key, o.data);
        if (OFFLINE.sniffStorage) {
          var v = o && o.data;
          var s = typeof v === "string" ? v : JSON.stringify(v);
          if (s && s.length > 90) s = s.slice(0, 90) + "...(" + s.length + "B)";
          offlineLog("STOR", "SET " + (o && o.key) + " = " + s);
        }
      } catch (e) {}
      return origSet.call(wx, o);
    };
  }
  var origSetSync = wx.setStorageSync;
  if (origSetSync) {
    wx.setStorageSync = function (k, v) {
      try {
        if (isGoodsKey(k) && typeof v === "string") {
          v = boostGoods(v, "setStorageSync");
        }
        v = tryBackdate(k, v);
        if (OFFLINE.sniffStorage) {
          var s = typeof v === "string" ? v : JSON.stringify(v);
          if (s && s.length > 90) s = s.slice(0, 90) + "...(" + s.length + "B)";
          offlineLog("STOR", "SETSync " + k + " = " + s);
        }
      } catch (e) {}
      return origSetSync.call(wx, k, v);
    };
  }
  // 同步读取：道具模型读取时加满（启动加载存档即生效）
  var origGetSync = wx.getStorageSync;
  if (origGetSync) {
    wx.getStorageSync = function (k) {
      var v = origGetSync.call(wx, k);
      if (isGoodsKey(k) && typeof v === "string" && v.length > 5) {
        v = boostGoods(v, "getStorageSync");
        if (OFFLINE.sniffStorage) offlineLog("STOR", "GETSync " + k + " (" + v.length + "B 已加满)");
      }
      v = tryBackdate(k, v);
      return v;
    };
  }
  // 异步读取：成功回调里加满
  var origGet = wx.getStorage;
  if (origGet) {
    wx.getStorage = function (o) {
      if (o && o.success) {
        var isGoods = isGoodsKey(o.key);
        var origSuccess = o.success;
        var wrapped = {};
        for (var kk in o) wrapped[kk] = o[kk];
        wrapped.success = function (res) {
          if (isGoods && res && typeof res.data === "string" && res.data.length > 5) {
            res.data = boostGoods(res.data, "getStorage");
          }
          if (res) res.data = tryBackdate(o.key, res.data);
          origSuccess(res);
        };
        o = wrapped;
      }
      return origGet.call(wx, o);
    };
  }
})();

// ---- 免广告：hook 广告创建 API ----
(function hookAds() {
  if (!OFFLINE.freeAd) return;

  function off(list, cb) {
    if (!cb) { list.length = 0; return; }
    var i = list.indexOf(cb);
    if (i >= 0) list.splice(i, 1);
  }

  // kind: rewarded / interstitial / banner
  function createFakeAd(kind) {
    var cbs = { load: [], error: [], close: [], resize: [] };
    function fire(name, arg) {
      var list = cbs[name].slice();
      for (var i = 0; i < list.length; i++) {
        try { if (list[i]) list[i](arg); } catch (e) { console.error("[OFFLINE][AD] 回调出错", e); }
      }
    }
    var ad = {
      style: { left: 0, top: 0, width: 320, height: 50, realWidth: 0, realHeight: 0 },
      onLoad: function (cb) { cbs.load.push(cb); return ad; },
      onError: function (cb) { cbs.error.push(cb); return ad; },
      onClose: function (cb) { cbs.close.push(cb); return ad; },
      onResize: function (cb) { cbs.resize.push(cb); return ad; },
      offLoad: function (cb) { off(cbs.load, cb); return ad; },
      offError: function (cb) { off(cbs.error, cb); return ad; },
      offClose: function (cb) { off(cbs.close, cb); return ad; },
      offResize: function (cb) { off(cbs.resize, cb); return ad; },
      load: function () {
        return new Promise(function (resolve) {
          setTimeout(function () { fire("load"); resolve(); }, 0);
        });
      },
      show: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve(); // 展示成功
            if (kind === "rewarded") {
              // 80ms 后"看完"关闭，isEnded:true = 完整观看 → C# 直接发奖
              setTimeout(function () {
                offlineLog("AD", "激励视频秒完成，发放奖励");
                fire("close", { isEnded: true, endType: 0 });
              }, 80);
            }
          }, 30);
        });
      },
      hide: function () { return Promise.resolve(); },
      destroy: function () {},
      getProvider: function () { return "fake"; }
    };
    // 创建即异步触发一次加载成功（部分逻辑会等 onLoad 再 show）
    setTimeout(function () { fire("load"); }, 0);
    return ad;
  }

  var origRewarded = wx.createRewardedVideoAd;
  wx.createRewardedVideoAd = function (opts) {
    offlineLog("AD", "createRewardedVideoAd -> 免广告模式");
    return createFakeAd("rewarded");
  };
  var origInterstitial = wx.createInterstitialAd;
  wx.createInterstitialAd = function (opts) {
    offlineLog("AD", "createInterstitialAd -> 静默插屏");
    return createFakeAd("interstitial");
  };
  var origBanner = wx.createBannerAd;
  wx.createBannerAd = function (opts) {
    offlineLog("AD", "createBannerAd -> 静默横幅");
    return createFakeAd("banner");
  };
})();

// ---- WXWASMSDK 桥嗅探：捕获 C# 调用的广告 API + 存储读写双保险 ----
(function hookBridge() {
  if (!OFFLINE.sniffBridge) return;
  var __realSDK = null;
  var wrapped = false;
  function wrapSDK(sdk) {
    if (!sdk || wrapped) return sdk;
    try {
      for (var name in sdk) {
        var fn = sdk[name];
        if (typeof fn !== "function") continue;
        // 广告相关桥：完整记录调用参数（诊断"广告未准备好"的关键）
        if (/(Ad|Ams|Video|Banner|Interstitial|Reward)/i.test(name)) {
          (function (fname, orig) {
            sdk[fname] = function () {
              var args = Array.prototype.slice.call(arguments);
              var preview = "";
              try {
                preview = JSON.stringify(args).slice(0, 150);
              } catch (e) { preview = "(不可序列化)"; }
              ADAPTIVE.adBridgeCalls++;
              offlineLog("BRIDGE", fname + "(" + preview + ")");
              return orig.apply(sdk, args);
            };
          })(name, fn);
        }
        // 存储字符串读写：道具模型再加满一次（绕过 storage.js 的 _cacheData 缓存）
        else if (name === "WXStorageGetStringSync" || name === "WXStorageSetStringSync") {
          (function (fname, orig) {
            sdk[fname] = function (key, value) {
              if (isGoodsKey(key) && typeof value === "string") {
                value = boostGoods(value, fname);
              }
              var ret = orig.apply(sdk, [key, value]);
              if (fname === "WXStorageGetStringSync" && isGoodsKey(key) && typeof ret === "string" && ret.length > 5) {
                ret = boostGoods(ret, fname + "读");
              }
              return ret;
            };
          })(name, fn);
        }
        // 数字读写：安装时间回溯必须在桥层做（storage.js 的 _cacheData
        // 内存缓存绕过 wx.setStorage 层，只 hook wx 层的话 C# 读缓存拿到旧值）
        else if (name === "WXStorageGetIntSync" || name === "WXStorageSetIntSync" ||
                 name === "WXStorageGetFloatSync" || name === "WXStorageSetFloatSync") {
          (function (fname, orig) {
            sdk[fname] = function (key, value) {
              if (typeof value === "number") {
                value = tryBackdate(key, value);
              }
              var ret = orig.apply(sdk, [key, value]);
              if (fname.indexOf("Get") === 0) {
                ret = tryBackdate(key, ret);
              }
              return ret;
            };
          })(name, fn);
        }
      }
      wrapped = true;
      offlineLog("BRIDGE", "WXWASMSDK 已包装（广告API日志 + 存储双保险）");
    } catch (e) {
      offlineLog("BRIDGE", "包装失败: " + e);
    }
    return sdk;
  }
  try {
    Object.defineProperty(GameGlobal, "WXWASMSDK", {
      configurable: true,
      get: function () { return __realSDK; },
      set: function (v) { __realSDK = wrapSDK(v); }
    });
  } catch (e) {
    offlineLog("BRIDGE", "defineProperty 失败: " + e);
  }
})();

// ---- 启动 watchdog：+45秒 检查广告初始化是否发生 ----
(function bootWatchdog() {
  setTimeout(function () {
    offlineLog("WATCHDOG", "启动45秒报告: 登录模式=" + (ADAPTIVE.realLogin ? "真实" : "回放") +
      ", 广告API调用次数=" + ADAPTIVE.adBridgeCalls +
      (ADAPTIVE.adBridgeCalls === 0 ? " ⚠️广告系统未初始化!" : " ✓广告系统已激活"));
    // 强制刷盘一次，方便事后查启动日志
    try { wx.setStorageSync("offline_logs", JSON.stringify(__logBuf)); } catch (e) {}
  }, 45000);
})();

offlineLog("INIT", "离线模式 v6 已启用（自适应登录 + 本地存档 + 免广告 + 道具加满 + 日志持久化）");

require("./weapp-adapter"), require("./events"), require("./texture-config");
var e = o(require("./unity-namespace"));
require("./wasm-split"), require("./webgl.wasm.framework.unityweb"), require("./unity-sdk/index");
var a = o(require("./check-version")),
  t = require("./plugin-config"),
  n = require("./unity-sdk/font/index");

function o(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
var i = {
  DATA_FILE_MD5: "73856268f55b3cf4",
  CODE_FILE_MD5: "451868dc5d53b768",
  GAME_NAME: "webgl",
  APPID: "wxb710578e30185510",
  DATA_FILE_SIZE: "20688739",
  OPT_DATA_FILE_SIZE: "$OPT_DATA_FILE_SIZE",
  DATA_CDN: "https://lfrjtxx-cou.gusspro.com/app-vy/Release/pdpx_vy/XYX/weixin/base/1.07/26082220225743230444",
  // 数据包本地化开关：!0=从项目 data-package/ 子包读取（需把
  // 73856268f55b3cf4.webgl.data.unityweb.bin.br 放进 data-package/ 文件夹，且该文件
  // 必须在 game.json 的 subpackages 里声明才会真正打进包）；
  // !1=从 DATA_CDN 在线下载（原版默认行为，微信会缓存到 __GAME_FILE_CACHE）
  loadDataPackageFromSubpackage: !1,
  compressDataPackage: !0,
  preloadDataList: [, "/WebGL/pdpx_vy/7633e37509420d5c4b6b2e8b4a57fe7c.unity3d", "/WebGL/pdpx_vy/d92b10571f36c4b46fc93fc88702c1f0.unity3d", "/WebGL/pdpx_vy/0ad180d04830c1d905034ea213293ab4.unity3d", "/WebGL/pdpx_vy/2aca61074c33d1e145a27aac46f39ac2.unity3d", "/WebGL/pdpx_vy/2b53cd231084166ee8618661db44553a.unity3d", "/WebGL/pdpx_vy/4c0e20f81a98cf6882fc6a61b9415212.unity3d", "/WebGL/pdpx_vy/a789c5cfe2b56becb9458f694fb66d41.unity3d", "/WebGL/pdpx_vy/e7ff843cd8990db7d34fc73acf31994a.unity3d", "/WebGL/pdpx_vy/a11bccc004bc472f25ea0c8de15c527d.unity3d", "/WebGL/pdpx_vy/3257b4b268bcefb6bc4c7b39615bf11f.unity3d", "/WebGL/pdpx_vy/9d6b60c68111cac33b6d388dcf58c48e.unity3d", "/WebGL/pdpx_vy/a80b27ee25ffff74c67bbbf088418819.unity3d", "/WebGL/pdpx_vy/f85477e214e70a9de88688ddec03d9a0.unity3d", "/WebGL/pdpx_vy/00a02eb0fd95a9b6b24551e87b2c8a5a.unity3d", "/WebGL/pdpx_vy/4e4e1e203b2bf2704c5f9395ce16d495.unity3d", "/WebGL/pdpx_vy/4679d75a12fe188634e0bf3a8e01e747.unity3d", "/WebGL/pdpx_vy/c44a672629d2eecfcc82253da9b650eb.unity3d", "/WebGL/pdpx_vy/967d8d4c4553a24d1eee64cbd28c64fd.unity3d", "/WebGL/pdpx_vy/e9106ba2f44c8ccf836e5cb9a510e735.unity3d", "/WebGL/pdpx_vy/ae60bfcec33ea0d7f7ec417a25f1f290.unity3d"],
  contextConfig: {
    contextType: 1,
    contextExt: {
      enableGLX: !1,
      enableMetal: !1
    }
  },
  PROFILER_UPLOAD_URL: ""
};
GameGlobal.managerConfig = i, (0, a.default)().then((function(a) {
  if (a) {
    var o;
    try {
      o = requirePlugin("UnityPlugin", {
        enableRequireHostModule: !0,
        customEnv: {
          wx: wx,
          unityNamespace: e.default,
          document: document,
          canvas: canvas,
          events: GameGlobal.events,
          WXWASMSDK: GameGlobal.WXWASMSDK
        }
      }).default
    } catch (e) {
      GameGlobal.realtimeLogManager.error(e), GameGlobal.logmanager.warn(e.stack), console.error("requirePlugin:", e), -1 !== e.message.indexOf("not defined") && console.error("！！！插件需要申请才可使用\n请勿使用测试AppID，并登录 https://mp.weixin.qq.com/ 并前往：能力地图-开发提效包-快适配 开通\n阅读文档获取详情:https://github.com/wechat-miniprogram/minigame-unity-webgl-transform/blob/main/Design/Transform.md")
    }
    Error.stackTraceLimit = 1 / 0, Object.assign(i, {
      hideAfterCallmain: !0,
      loadingPageConfig: {
        totalLaunchTime: 7e3,
        animationDuration: 100,
        designWidth: 0,
        designHeight: 0,
        scaleMode: t.scaleMode.default,
        textConfig: {
          firstStartText: "首次加载请耐心等待",
          downloadingText: ["正在加载资源"],
          compilingText: "编译中",
          initText: "初始化中",
          completeText: "开始游戏",
          textDuration: 1500,
          style: {
            bottom: 64,
            height: 24,
            width: 240,
            lineHeight: 24,
            color: "#ffffff",
            fontSize: 12
          }
        },
        barConfig: {
          style: {
            width: 240,
            height: 24,
            padding: 2,
            bottom: 64,
            backgroundColor: "#07C160"
          }
        },
        iconConfig: {
          visible: !0,
          style: {
            width: 64,
            height: 23,
            bottom: 20
          }
        },
        materialConfig: {
          backgroundImage: "images/background.jpg",
          backgroundVideo: ""
        }
      }
    }), GameGlobal.managerConfig = i;
    var d = new o(i);
    d.onLaunchProgress((function(e) {
      e.type, t.launchEventType.launchPlugin, e.type, t.launchEventType.loadWasm, e.type, t.launchEventType.compileWasm, e.type, t.launchEventType.loadAssets, e.type, t.launchEventType.readAssets, e.type, t.launchEventType.prepareGame
    })), d.onModulePrepared((function() {
      for (var a in e.default) GameGlobal.hasOwnProperty(a) && "DATA_CDN" !== a || (GameGlobal[a] = e.default[a]);
      i.DATA_CDN = GameGlobal.DATA_CDN, d.assetPath = "".concat((i.DATA_CDN || "").replace(/\/$/, ""), "/Assets"), (0, n.preloadWxCommonFont)()
    })), d.onLogError = function(e) {
      GameGlobal.realtimeLogManager.error(e);
      var a = e && e.stack;
      GameGlobal.logmanager.warn(a ? e.stack : e)
    }, GameGlobal.canUseiOSAutoGC && 0 !== e.default.iOSAutoGCInterval && setInterval((function() {
      wx.triggerGC()
    }), e.default.iOSAutoGCInterval), d.startGame(), GameGlobal.manager = d, GameGlobal.events.on("launchOperaPushMsgToWasm", (function(e, a) {
      return GameGlobal.WXWASMSDK.WXLaunchOperaBridgeToC(e, a)
    })), GameGlobal.events.on("createWorker", (function(e) {}))
  }
}));
var d = GameGlobal.WXWASMSDK.GetJsonValue("ams_actionid"),
  c = GameGlobal.WXWASMSDK.GetJsonValue("ams_secretkey"),
  r = GameGlobal.WXWASMSDK.GetJsonValue("ams_appid");
if (d && c && r) {
  d = Number(d), GameGlobal.WXWASMSDK.InitAMS(d, c, r);
  var l = GameGlobal.WXWASMSDK.GetJsonValue("UsePayModule");
  l && "0" !== l || GameGlobal.WXWASMSDK.START_LOAD()
}