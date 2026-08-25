Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0, require("../../@babel/runtime/helpers/Objectvalues");
var e = require("./store"),
  u = require("./utils");
(0, u.mkCacheDir)();
exports.default = {
  WXGetAudioCount: function() {
    return {
      innerAudio: Object.keys(e.audios).length,
      webAudio: e.WEBAudio.bufferSourceNodeLength,
      buffer: e.WEBAudio.audioBufferLength
    }
  },
  WXSetAudioMute: function(u) {
    if ("boolean" == typeof u && e.WEBAudio.isMute !== u) {
      e.WEBAudio.isMute = u;
      for (var o = 0, i = Object.keys(e.WEBAudio.audioInstances); o < i.length; o++) {
        var n, t, d = i[o],
          a = e.WEBAudio.audioInstances[+d];
        if (a.source) null === (n = a.setVolume) || void 0 === n || n.call(a, u ? 0 : null !== (t = e.unityAudioVolume.get(a)) && void 0 !== t ? t : 1)
      }
      for (var r = 0, s = Object.values(e.audios); r < s.length; r++) {
        var c, f = s[r];
        f.volume = u ? 0 : null !== (c = e.innerAudioVolume.get(f)) && void 0 !== c ? c : 1
      }
    }
  }
};
(function() {
  var o = {};
  wx.onHide((function() {
    Object.keys(e.audios).forEach((function(u) {
      !1 != !e.audios[u].paused && (o[u] = !0)
    }))
  })), wx.onShow((function() {
    Object.keys(e.audios).forEach((function(u) {
      !1 !== e.audios[u].paused && o[u] && e.audios[u].play()
    })), o = {}
  })), wx.onAudioInterruptionBegin((function() {
    Object.keys(e.audios).forEach((function(u) {
      !1 != !e.audios[u].paused && (o[u] = !0)
    }))
  })), wx.onAudioInterruptionEnd((function() {
    Object.keys(e.audios).forEach((function(u) {
      !1 !== e.audios[u].paused && o[u] && e.audios[u].play()
    })), o = {}, (0, u.resumeWebAudio)()
  }))
})();