Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.destroyInnerAudio = exports.createInnerAudio = void 0, exports.mkCacheDir = function() {
  var e = wx.getFileSystemManager();
  e.rmdir({
    dirPath: i.TEMP_DIR_PATH,
    recursive: !0,
    complete: function() {
      e.mkdir({
        dirPath: i.TEMP_DIR_PATH
      })
    }
  })
}, exports.resumeWebAudio = exports.printErrMsg = void 0;
var e = require("../utils"),
  o = require("../../check-version"),
  r = require("./store"),
  i = require("./const");
exports.resumeWebAudio = function() {
  var e, o, i;
  null === (e = r.WEBAudio.audioContext) || void 0 === e || e.resume(), null === (o = GameGlobal.Module.mContext) || void 0 === o || o.resume(), null === (i = GameGlobal.Module.context) || void 0 === i || i.resume()
}, exports.createInnerAudio = function() {
  var i = (0, e.uid)(),
    t = o.isSupportCacheAudio && r.WEBAudio.audioCache.length ? r.WEBAudio.audioCache.shift() : wx.createInnerAudioContext();
  return t && (r.audios[i] = t), {
    id: i,
    audio: t
  }
}, exports.destroyInnerAudio = function(e, i) {
  if (e) {
    if (!i || !o.isSupportCacheAudio || r.WEBAudio.audioCache.length > 32) r.audios[e].destroy();
    else {
      ["Play", "Pause", "Stop", "Canplay", "Error", "Ended", "Waiting", "Seeking", "Seeked", "TimeUpdate"].forEach((function(o) {
        r.audios[e]["off".concat(o)]()
      }));
      var t = {
        startTime: 0,
        obeyMuteSwitch: !0,
        volume: 1,
        autoplay: !1,
        loop: !1,
        referrerPolicy: ""
      };
      Object.keys(t).forEach((function(o) {
        try {
          r.audios[e][o] = t[o]
        } catch (e) {}
      })), r.audios[e].stop();
      var u = r.audios[e];
      setTimeout((function() {
        r.WEBAudio.audioCache.push(u)
      }), 1e3)
    }
    delete r.audios[e]
  }
}, exports.printErrMsg = function(e) {
  GameGlobal.manager.printErr(e)
};