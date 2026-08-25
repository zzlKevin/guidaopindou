var e;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SDKVersion = void 0, exports.canUseCoverview = function() {
  return f || l
}, exports.compareVersion = x, exports.webAudioNeedResume = exports.version = exports.isSupportVideoPlayer = exports.isSupportSharedCanvasMode = exports.isSupportPlayBackRate = exports.isSupportInnerAudio = exports.isSupportCacheAudio = exports.isSupportBufferURL = exports.isPc = exports.isMobile = exports.isIOS175 = exports.isIOS = exports.isH5Renderer = exports.isDevtools = exports.isDevelop = exports.isDebug = exports.isAndroid = exports.default = void 0;
var o = wx.getAppBaseInfo ? wx.getAppBaseInfo() : wx.getSystemInfoSync(),
  r = exports.version = o.version,
  t = exports.SDKVersion = o.SDKVersion,
  s = wx.getDeviceInfo ? wx.getDeviceInfo() : wx.getSystemInfoSync(),
  i = s.platform,
  n = s.system,
  p = wx.getAccountInfoSync(),
  a = null == p || null === (e = p.miniProgram) || void 0 === e ? void 0 : e.envVersion;

function x(e, o) {
  return !(!e || !o) && e.split(".").map((function(e) {
    return e.padStart(2, "0")
  })).join("") >= o.split(".").map((function(e) {
    return e.padStart(2, "0")
  })).join("")
}
exports.isDebug = !1;
var u = exports.isPc = "windows" === i || "mac" === i,
  c = exports.isIOS = "ios" === i,
  d = exports.isAndroid = "android" === i,
  l = exports.isDevtools = "devtools" === i,
  f = exports.isMobile = !u && !l,
  S = exports.isDevelop = "develop" === a,
  v = exports.isH5Renderer = GameGlobal.isIOSHighPerformanceMode,
  m = n ? n.split(" ") : [],
  w = m.length ? m[m.length - 1] : "",
  g = x(r, "3.3"),
  I = x(t, "2.17.0"),
  y = x(t, "2.23.1"),
  P = x(w, "14.0"),
  A = x(w, "15.0") || GameGlobal.isIOSHighPerformanceModePlus,
  R = x(r, "8.0.19"),
  b = (exports.isSupportBufferURL = !u && (v ? x(t, "2.29.1") && x(r, "8.0.30") : "function" == typeof wx.createBufferURL), exports.isSupportPlayBackRate = !d || x(r, "8.0.23"), exports.isSupportCacheAudio = !c || x(r, "8.0.31"), exports.isSupportInnerAudio = x(r, "8.0.38"), u && !x(t, "2.32.3")),
  h = f && !x(t, "2.21.1"),
  D = b || h;
exports.isIOS175 = x(w, "17.5") && v, exports.isSupportSharedCanvasMode = x(t, "3.6.6") && !u;
GameGlobal.canUseH5Renderer = v && y, GameGlobal.canUseiOSAutoGC = v && x(t, "2.32.1");
var G = u && !g,
  C = f && !I,
  M = v && !y || !v && !1,
  O = (exports.isSupportVideoPlayer = c && x(t, "3.1.1") || d && x(t, "3.0.0") || (u || l) && x(t, "3.2.1"), function() {
    return 2 === GameGlobal.managerConfig.contextConfig.contextType && (!A && c || d && !R)
  });
exports.webAudioNeedResume = x(t, "2.25.3") && v;
if (S && c && y && P && !v && console.error("此AppID未开通高性能模式\n请前往mp后台-能力地图-开发提效包-高性能模式开通\n可大幅提升游戏运行性能"), u) try {
  window.devicePixelRatio < 2 && (window.devicePixelRatio = 2)
} catch (e) {
  console.warn(e)
}
exports.default = function() {
  return new Promise((function(e) {
    if (!l && (G || C || M || O() || D)) {
      var o = !0,
        r = "当前微信版本过低\n请更新微信后进行游戏";
      return c && (!P || O() && c) && (r = "当前操作系统版本过低\n请更新iOS系统后进行游戏", o = !1), wx.showModal({
        title: "提示",
        content: r,
        showCancel: !1,
        confirmText: o ? "更新微信" : "确定",
        success: function(e) {
          e.confirm && (o && "function" == typeof wx.createBufferURL ? wx.updateWeChatApp() : wx.exitMiniProgram({
            success: function() {}
          }))
        }
      }), e(!1)
    }
    return e(!0)
  }))
};