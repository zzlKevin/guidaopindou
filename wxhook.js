/* =============================================================
 * wxhook.js  v5 —— 锚点版 · 全自动零交互
 * 原理：LeftTime 字段位于固定偏移 0x319eb54，
 *       每 0.8 秒检查一次；若发现有正常倒计时数值则立刻覆写为 9999
 * ============================================================= */
(function () {
  'use strict';
  var G = typeof GameGlobal !== 'undefined' ? GameGlobal : {};
  if (G.__hookV5) { console.log('[wxhook] 已加载'); return; }
  
  /* ========== 可调参数 ========== */
  var ANCHOR      = 0x319eb54;   // ⭐ LeftTime 字段的绝对地址（经验证 1~4 关通用）
  var TARGET_SEC  = 99999;         // 写入的目标秒数（166 分多）
  var MIN_VAL     = 50;           // 视为"正在倒数中"的最小阈值（低于此可能是过场）
  var MAX_VAL     = 620;          // 视为"正在倒数中"的最大阈值（超过此是总时长备份）
  
  /* ========== 基础工具（保底，方便万一要重新定位）========== */
  G.getWasmMem = function () {
    if (G.Module && G.Module.HEAPU8 && G.Module.HEAPU8.buffer) return G.Module.HEAPU8;
    return G.EMSCRIPTEN_HEAPU8 || null;
  };
  G.wasmmemReady = function () {
    var h = G.getWasmMem();
    return !!(h && h.buffer && h.buffer.byteLength > 1024);
  };
  G.anchorVal = function () {                       // 看一眼锚点当前是什么数
    if (!G.wasmmemReady()) return '(未就绪)';
    var v = new DataView(G.getWasmMem().buffer).getFloat32(ANCHOR, true);
    return Number.isFinite(v) ? v.toFixed(2) : 'NaN';
  };
  G.setAnchor = function (sec) {                    // 手动强制写锚点
    if (!G.wasmmemReady()) return console.warn('未就绪');
    new DataView(G.getWasmMem().buffer).setFloat32(ANCHOR, sec || TARGET_SEC, true);
    console.log('[setAnchor] 已写入', sec || TARGET_SEC);
  };
  G.relocate = function (low, high) {               // 兜底：若某天锚点失效重新找
    console.warn('请使用以下流程重新定位：');
    console.log(' ① GameGlobal.rscan(' + low + ',' + high + ')');
    console.log(' ② 让它走 6 秒后：snap(); rdiff(6,2)');
    console.log(' ③ 把命中的新地址替换掉本文件里的 ANCHOR 常量');
  };
  
  /* ========== 全自动哨兵 ========== */
  var _sentinelStarted = false;
  function _patrol() {
    if (!G.wasmmemReady()) return;
    try {
      var dv = new DataView(G.getWasmMem().buffer);
      var v = dv.getFloat32(ANCHOR, true);
      // 必须是有效浮点 & 处于"活着的倒计时"范围才动手
      if (Number.isFinite(v) && v > MIN_VAL && v < MAX_VAL) {
        dv.setFloat32(ANCHOR, TARGET_SEC, true);
        var t = new Date().toLocaleTimeString();
        console.log('%c⚡[' + t + '] 检测到倒计时(' + v.toFixed(1) + 's) → 已改为 ' + TARGET_SEC,
                    'color:#d00;font-weight:bold');
      }
    } catch (e) { /* 吞掉瞬时错误 */ }
  }
  
  // 等 wasm 就绪后开启巡检循环
  var _waitTimer = setInterval(function () {
    if (G.wasmmemReady()) {
      clearInterval(_waitTimer);
      _sentinelStarted = true;
      //console.log('%c[wxhook v5] ✅ 锚点哨兵已上线','color:#0a0;font-weight:bold');
      //console.log('   监视地址: 0x' + ANCHOR.toString(16));
      //console.log('   触发条件: 数值出现在 ' + MIN_VAL + '~' + MAX_VAL + ' 秒之间');
      //console.log('   动作:     覆写为 ' + TARGET_SEC + ' 秒');
      //console.log('   提示:     G.anchorVal() 随时可查看当前锚点读数');
      setInterval(_patrol, 800);           // 每 0.8 秒巡一次，代价可忽略
    }
  }, 500);
  
  G.G = G;
  G.__hookV5 = true;
  
  console.log('%c[wxhook v5] 已装载', 'color:#0a0;font-weight:bold',
    '\n编译完成后无需任何操作，进入关卡即自动触发',
    '\n调试命令: GameGlobal.anchorVal() / GameGlobal.setAnchor(N) / GameGlobal.relocate(low,high)');
  })();
  /* ============ 广告 Hook v1：劫持 createRewardedVideoAd ============ */
(function () {
  // ① 第一步：先纯监听不改动 —— 用于确认这条链路真的会被走到
  var _origCreate = wx.createRewardedVideoAd;
  wx.createRewardedVideoAd = function () {
    console.log('%c[AD] createRewardedVideoAd 被调用', 'color:#c60;font-weight:bold');
    var ad = _origCreate.apply(this, arguments);

    // ② 包装 onClose：把 isEnded 强改为 true
    var _origOn = ad.onClose ? ad.onClose.bind(ad) : null;
    if (_origOn) {
      ad.onClose = function (cb) {
        _origOn(function (res) {
          console.log('[AD] onClose 原始参数:', JSON.stringify(res));
          var forged = Object.assign({}, res || {}, { isEnded: true });
          console.log('%c[AD] 已伪造 isEnded=true', 'color:#d00;font-weight:bold');
          cb(forged);
        });
      };
    }
    return ad;
  };
  console.log('[AD-Hook] wx.createRewardedVideoAd 已拦截');
})();

/* =============================================================
 * 速度模块 v7.1 —— 动态重定位版 2026-09-01
 * 实测规律（用户两局数据）：
 *   · 速度对象地址每局漂移（0x7a2a118 → 0x7822c98），固定锚点不可行
 *   · 存储类型 = float（两次有效写入都是 float）
 *   · 结构特征 = 主字段与 +4 影子字段同值成对（2,2 / 3,3）
 * 方案：
 *   1. 锚点组（≤3个）：哨兵每0.3秒对组内地址维持5倍
 *   2. 失效自动重定位：锚点读值异常 → 全内存结构扫描找回新地址
 *   3. 30秒验证扫描：防"对象销毁后残留5感知不到"（关卡切换兜底）
 *   4. 三指同按 = 开关（防抖1.2秒）
 * ============================================================= */
(function () {
  'use strict';
  var G = typeof GameGlobal !== 'undefined' ? GameGlobal : {};

  var SPEED_TARGET = 5;         // 目标倍速
  var SPEED_LOCKED = true;      // 默认开
  var CHECK_MS     = 300;       // 哨兵周期
  var VERIFY_MS    = 30000;     // 定期验证扫描周期（防残留5卡死）
  var SCAN_GAP     = 2000;      // 两次扫描最小间隔
  var LAST_KNOWN   = 0x7a2a118; // 参考点（择近用，随成功锁定更新）

  var anchors   = [];   // 锚点组
  var scanning  = false;
  var lastScan  = 0;
  var f32bufId  = null, f32 = null;

  function refreshF32() {
    var h = G.Module && G.Module.HEAPU8;
    if (!h || !h.buffer) return null;
    if (f32bufId !== h.buffer) {
      f32bufId = h.buffer;
      f32 = new Float32Array(h.buffer);
    }
    return f32;
  }
  function isNat(v) { return v === 1 || v === 2 || v === 3; }

  /* 全内存结构扫描：float∈{1,2,3} 且 a+4 同值 且 a-4 异值
   * （成对特征抓速度对象，a-4 条件排除 Vector3(2,2,2) 中段误报）*/
  function structScan() {
    var f = refreshF32();
    if (!f) return [];
    var out = [];
    var start = 0x3000000 >> 2;   // 跳过静态数据区
    for (var i = start; i < f.length - 1; i++) {
      var v = f[i];
      if (v === 1 || v === 2 || v === 3) {
        if (f[i + 1] === v && f[i - 1] !== v) out.push(i * 4);
      }
    }
    return out;
  }

  function applyAnchor(addr) {   // 只写主字段（用户实测单写主即生效，避免误伤相邻结构）
    var f = refreshF32();
    if (!f) return;
    f[addr >> 2] = SPEED_TARGET;
  }

  function relocate(reason) {
    var now = Date.now();
    if (scanning || now - lastScan < SCAN_GAP) return;
    scanning = true; lastScan = now;
    setTimeout(function () {
      try {
        var cands = structScan();
        if (cands.length) {
          // 相邻去重：Vector3(2,2,2)主段和中段都匹配特征，只留主段
          cands = cands.filter(function(a){ return cands.indexOf(a - 4) < 0; });
          // 择近（堆分配局部性）+ 全部写入（双保险）
          var best = cands[0], bd = Math.abs(cands[0] - LAST_KNOWN);
          for (var i = 1; i < cands.length; i++) {
            var d2 = Math.abs(cands[i] - LAST_KNOWN);
            if (d2 < bd) { bd = d2; best = cands[i]; }
          }
          cands.forEach(applyAnchor);
          LAST_KNOWN = best;
          if (anchors.indexOf(best) < 0) {
            anchors.unshift(best);
            if (anchors.length > 3) anchors.length = 3;   // 组上限：误伤可控
          }
          console.log('[speed] 重定位(' + reason + '): ' + cands.length + '个候选，锚点组=' +
            anchors.map(function(a){ return '0x' + a.toString(16); }).join(','));
        }
      } catch (e) {} finally { scanning = false; }
    }, 0);
  }

  /* 哨兵：组内地址 原生值→覆写5；读值异常→剔除 */
  setInterval(function () {
    if (!SPEED_LOCKED) return;
    try {
      var f = refreshF32();
      if (!f) return;
      if (!anchors.length) { relocate('初始'); return; }
      for (var k = anchors.length - 1; k >= 0; k--) {
        var i = anchors[k] >> 2;
        var v = f[i];
        if (isNat(v)) { f[i] = SPEED_TARGET; }   // 只写主字段
        else if (v !== SPEED_TARGET) { anchors.splice(k, 1); }   // 死地址剔除
      }
      if (!anchors.length) relocate('失效');
    } catch (e) {}
  }, CHECK_MS);

  /* 30秒验证：对象销毁后地址残留5（哨兵无感）→ 主动扫活跃原生候选找回 */
  setInterval(function () {
    if (!SPEED_LOCKED) return;
    try {
      var f = refreshF32();
      if (!f || !anchors.length) return;
      var alive = f[anchors[0] >> 2] === SPEED_TARGET;
      if (alive) relocate('验证');
    } catch (e) {}
  }, VERIFY_MS);

  /* 三指同按开关（防抖1.2秒）*/
  var __lastToggle = 0;
  try {
    wx.onTouchStart(function (e) {
      if (!e || !e.touches || e.touches.length < 3) return;
      var now = Date.now();
      if (now - __lastToggle < 1200) return;
      __lastToggle = now;
      SPEED_LOCKED = !SPEED_LOCKED;
      console.log('%c[speed] 三指开关 → ' + (SPEED_LOCKED
        ? ('ON：锁定' + SPEED_TARGET + '倍速')
        : 'OFF：恢复原生1/2/3按钮'),
        'color:#d00;font-weight:bold');
    });
  } catch (e) {}

  /* 命令（控制台用 GameGlobal. 前缀）*/
  G.speedOn = function (target) {
    SPEED_LOCKED = true;
    if (target) SPEED_TARGET = target;
    console.log('[speed] 已开启，目标=' + SPEED_TARGET + '，锚点组=' + anchors.length + '个');
    return true;
  };
  G.speedOff = function () {
    SPEED_LOCKED = false;
    return true;
  };
  G.speedStatus = function () {
    var f = refreshF32();
    var info = {
      locked: SPEED_LOCKED,
      target: SPEED_TARGET,
      anchors: anchors.map(function(a){ return '0x' + a.toString(16); }),
      readings: f ? anchors.map(function(a){ return f[a >> 2]; }) : []
    };
    console.log('[speed] ' + JSON.stringify(info));
    return info;
  };
  /* 手动指定锚点（vwrite 确认有效时直接焊入）*/
  G.addSpeedAnchor = function (addr) {
    if (typeof addr === 'number' && addr > 0 && anchors.indexOf(addr) < 0) {
      anchors.unshift(addr);
      if (anchors.length > 3) anchors.length = 3;
      applyAnchor(addr);
    }
    return anchors.length;
  };

  console.log('%c[wxhook v7.1] 速度模块(动态重定位)已装载：自动5倍',
    'color:#0a0;font-weight:bold',
    '\n· 锚点每局自动重新定位（结构扫描：float∈{1,2,3}且+4同值成对）',
    '\n· 关卡切换后最多30秒自动恢复；失效即时重扫',
    '\n· 三指同按 = 开/关；GameGlobal.speedStatus() 查看锚点组');
})();



/* =============================================================
 * 内存扫描套件 v6.1 —— 2026-09-01 倍速定位版
 * 修正（按用户实测反馈）：
 *   ① vlist 加 return，不再是 Undefined
 *   ② 控制台调用前缀必须是 GameGlobal.（G 只是模块内部变量）
 * 新增：倍速 10x 定位流程（见下方说明）
 * ============================================================= */
(function () {
  'use strict';
  var G = typeof GameGlobal !== 'undefined' ? GameGlobal : {};
  if (G.__vscan) { console.log('[vscan] 已加载'); return; }

  var __cands = [];   // 候选: [{a:地址, t:'f'|'i'}]
  var __lastVal = 0;

  function dv() {
    if (!G.wasmmemReady || !G.wasmmemReady()) return null;
    return new DataView(G.getWasmMem().buffer);
  }
  function fmt(a) { return '0x' + a.toString(16); }

  /* 首扫：全内存找 value（int32 和 float32 双格式） */
  G.vscan = function (value) {
    var d = dv();
    if (!d) return console.warn('[vscan] wasm内存未就绪');
    if (typeof value !== 'number' || value <= 0) return console.warn('[vscan] 请传入正数');
    __cands = [];
    __lastVal = value;
    var len = d.byteLength - 4;
    for (var a = 0; a < len; a += 4) {
      if (d.getInt32(a, true) === value) __cands.push({ a: a, t: 'i' });
    }
    var fv = value;
    for (var a2 = 0; a2 < len; a2 += 4) {
      if (d.getFloat32(a2, true) === fv) __cands.push({ a: a2, t: 'f' });
    }
    var msg = '[vscan] 首扫 ' + value + ' → ' + __cands.length + ' 个候选';
    console.log('%c' + msg, 'color:#06c;font-weight:bold');
    if (__cands.length === 0) {
      console.warn('没找到！可能存的是"等级索引"：显示2倍速时索引是1，试 GameGlobal.vscan(1)');
    } else {
      G.vlist();
    }
    return __cands.length;
  };

  /* 过滤：值变化后，只保留值同步变化的地址 */
  G.vfilter = function (newValue) {
    var d = dv();
    if (!d) return console.warn('[vfilter] wasm内存未就绪');
    if (!__cands.length) return console.warn('[vfilter] 先跑 GameGlobal.vscan');
    var keep = [];
    for (var i = 0; i < __cands.length; i++) {
      var c = __cands[i];
      var v = c.t === 'i' ? d.getInt32(c.a, true) : d.getFloat32(c.a, true);
      if (v === newValue) keep.push(c);
    }
    var dropped = __cands.length - keep.length;
    __cands = keep;
    console.log('%c[vfilter] ' + __lastVal + ' → ' + newValue + '：淘汰 ' + dropped + '，剩 ' + __cands.length + ' 个',
                'color:#06c;font-weight:bold');
    __lastVal = newValue;
    G.vlist();
    return __cands.length;
  };

  /* 不变过滤：切场景后核对（剔除被回收/复用的地址） */
  G.vkeep = function () {
    return G.vfilter(__lastVal);
  };

  /* 列表：v6.1 加 return，返回候选数组（控制台直接可见） */
  G.vlist = function () {
    if (!__cands.length) { console.log('[vlist] 无候选'); return []; }
    var d = dv();
    var lines = [];
    __cands.slice(0, 30).forEach(function (c) {
      var v = d ? (c.t === 'i' ? d.getInt32(c.a, true) : d.getFloat32(c.a, true)) : '?';
      lines.push('  ' + fmt(c.a) + ' (' + (c.t === 'i' ? 'int' : 'float') + ') = ' + v +
        '  验证: GameGlobal.vwrite(' + fmt(c.a) + ', 10)');
    });
    var head = '[vlist] ' + __cands.length + ' 个候选（前' + Math.min(30, __cands.length) + '）：';
    console.log(head + '\n' + lines.join('\n'));
    if (__cands.length === 1) {
      console.log('%c★ 只剩1个候选！99%就是它 → GameGlobal.vwrite(' + fmt(__cands[0].a) + ', 10) 验证，界面/速度有变化就 GameGlobal.vwatch(' + fmt(__cands[0].a) + ', 10) 锁定',
                  'color:#0a0;font-weight:bold');
    }
    return __cands;
  };

  /* 写值验证 */
  G.vwrite = function (addr, val) {
    var d = dv();
    if (!d) return console.warn('[vwrite] wasm内存未就绪');
    var t = 'i';
    for (var i = 0; i < __cands.length; i++) {
      if (__cands[i].a === addr) { t = __cands[i].t; break; }
    }
    if (t === 'i') d.setInt32(addr, val, true);
    else d.setFloat32(addr, val, true);
    console.log('%c[vwrite] ' + fmt(addr) + ' ← ' + val + '（' + (t === 'i' ? 'int' : 'float') +
      '）看游戏有没有变化！', 'color:#d00;font-weight:bold');
    return true;
  };

  /* 哨兵锁定：持续覆写（0.5秒一次） */
  var __watchTimer = null;
  G.vwatch = function (addr, val) {
    G.vunwatch();
    var d = dv();
    if (!d) return console.warn('[vwatch] wasm内存未就绪');
    var t = 'i';
    for (var i = 0; i < __cands.length; i++) {
      if (__cands[i].a === addr) { t = __cands[i].t; break; }
    }
    __watchTimer = setInterval(function () {
      try {
        var dd = dv();
        if (!dd) return;
        if (t === 'i') dd.setInt32(addr, val, true);
        else dd.setFloat32(addr, val, true);
      } catch (e) {}
    }, 500);
    console.log('%c[vwatch] ★ 已锁定 ' + fmt(addr) + ' = ' + val + '（每0.5秒覆写）',
                'color:#0a0;font-weight:bold');
    return true;
  };
  G.vunwatch = function () {
    if (__watchTimer) { clearInterval(__watchTimer); __watchTimer = null; console.log('[vwatch] 已解除'); }
    return true;
  };

  /* 倍速专用向导：vpump(当前倍速数字)
   * 用法：进关卡确认当前倍速 → GameGlobal.vpump(2)（当前2x就传2）
   * 然后按提示每点一次倍速按钮敲一次回车 */
  G.vpump = function (cur) {
    var r = G.vscan(cur);
    if (r === undefined || r === 0) return r;
    console.log('%c[vpump] 倍速连环过滤开始！接下来：',
      'color:#c60;font-weight:bold',
      '\n① 点倍速按钮（2x→3x），然后 GameGlobal.vfilter(3)',
      '\n② 再点（3x→1x），然后 GameGlobal.vfilter(1)',
      '\n③ 再点（1x→2x），然后 GameGlobal.vfilter(2)',
      '\n④ 重复几轮直到候选 < 10 个',
      '\n⑤ GameGlobal.vlist() → 逐个 GameGlobal.vwrite(地址, 10)',
      '\n   看豆子/传送带速度有没有暴走（按钮文字不一定变，看实际速度！）',
      '\n⑥ 找到后 GameGlobal.vwatch(地址, 10) 永久10倍');
    return r;
  };

  G.__vscan = true;
  console.log('%c[vscan v6.1] 装载完成（注意：控制台里用 GameGlobal. 前缀，不是 G.）',
    'color:#0a0;font-weight:bold',
    '\n=== 倍速 10x 定位流程 ===',
    '\n1. 进关卡，看当前倍速数字（比如 2x）',
    '\n2. GameGlobal.vpump(2)   ← 传当前倍速数字',
    '\n3. 按提示：每点一次倍速按钮，调一次 GameGlobal.vfilter(新数字)',
    '\n4. 候选剩个位数后逐个 vwrite(地址,10) 试速度',
    '\n5. 确认后 GameGlobal.vwatch(地址, 10) 锁定',
    '\n※ 若 vscan 找不到：倍速可能存的是索引(0/1/2)而不是数字(1/2/3)，改传 GameGlobal.vpump(1)',
    '\n※ 速度没变化但游戏卡死/报错 → 那个地址是别的字段，vunwatch 换下一个');
})();

