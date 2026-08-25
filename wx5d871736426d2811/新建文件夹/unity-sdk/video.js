Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, o = (e = require("./module-helper")) && e.__esModule ? e : {
    default: e
  },
  r = require("./utils");
var n = {},
  l = (0, r.getListObject)(n, "video");
exports.default = {
  WXCreateVideo: function(e) {
    var o = (0, r.uid)(),
      l = (0, r.formatJsonStr)(e);
    return l.underGameView && (GameGlobal.enableTransparentCanvas = !0), n[o] = wx.createVideo(l), o
  },
  WXVideoSetProperty: function(e, o, r) {
    var n = l(e);
    n && ("x" === o || "y" === o || "width" === o || "height" === o || "initialTime" === o || "playbackRate" === o ? n[o] = +r : "src" === o || "poster" === o || "objectFit" === o || "backgroundColor" === o ? n[o] = r : "live" !== o && "controls" !== o && "showProgress" !== o && "showProgressInControlMode" !== o && "autoplay" !== o && "loop" !== o && "muted" !== o && "obeyMuteSwitch" !== o && "enableProgressGesture" !== o && "enablePlayGesture" !== o && "showCenterPlayBtn" !== o || (n[o] = "True" === r))
  },
  WXVideoAddListener: function(e, r) {
    var n;
    null === (n = l(e)) || void 0 === n || n[r]((function(n) {
      o.default.send("OnVideoCallback", JSON.stringify({
        callbackId: e,
        type: r,
        position: null == n ? void 0 : n.position,
        buffered: null != n && n.buffered ? Number(n.buffered) : void 0,
        duration: null == n ? void 0 : n.duration,
        errMsg: null == n ? void 0 : n.errMsg
      })), "onError" === r && (GameGlobal.enableTransparentCanvas = !1, console.error(n))
    }))
  },
  WXVideoRemoveListener: function(e, o) {
    var r;
    null === (r = l(e)) || void 0 === r || r[o]()
  },
  WXVideoDestroy: function(e, o) {
    var r;
    null === (r = l(e)) || void 0 === r || r.destroy(), o && (GameGlobal.enableTransparentCanvas = !1)
  },
  WXVideoPlay: function(e) {
    var o;
    null === (o = l(e)) || void 0 === o || o.play()
  },
  WXVideoPause: function(e) {
    var o;
    null === (o = l(e)) || void 0 === o || o.pause()
  },
  WXVideoStop: function(e) {
    var o;
    null === (o = l(e)) || void 0 === o || o.stop()
  },
  WXVideoSeek: function(e, o) {
    var r;
    null === (r = l(e)) || void 0 === r || r.seek(o)
  },
  WXVideoRequestFullScreen: function(e, o) {
    var r;
    null === (r = l(e)) || void 0 === r || r.requestFullScreen(o)
  },
  WXVideoExitFullScreen: function(e) {
    var o;
    null === (o = l(e)) || void 0 === o || o.exitFullScreen()
  }
};