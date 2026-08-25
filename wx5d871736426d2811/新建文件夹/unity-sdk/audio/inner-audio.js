Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var o, e = (o = require("../module-helper")) && o.__esModule ? o : {
    default: o
  },
  n = require("../../check-version"),
  a = require("./store"),
  i = require("./utils"),
  d = require("./const");
var t = {
  getFullUrl: function(o) {
    if (!/^https?:\/\//.test(o) && !/^wxfile:\/\//.test(o)) {
      var e = GameGlobal.manager.assetPath;
      o = "".concat(e.replace(/\/$/, ""), "/").concat(o.replace(/^\//, "").replace(/^Assets\//, ""))
    }
    return o
  },
  downloadAudios: function(o) {
    var e = o.split(",");
    return Promise.all(e.map((function(o) {
      var e = t.getFullUrl(o);
      return new Promise((function(o, n) {
        if (a.downloadingAudioMap[e]) a.downloadingAudioMap[e].push({
          resolve: o,
          reject: n
        });
        else if (a.downloadingAudioMap[e] = [{
            resolve: o,
            reject: n
          }], t.checkLocalFile(e)) t.handleDownloadEnd(e, !0);
        else if (GameGlobal.unityNamespace.isCacheableFile(e)) {
          var d = new GameGlobal.unityNamespace.UnityLoader.UnityCache.XMLHttpRequest;
          d.open("GET", e, !0), d.responseType = "arraybuffer", d.onsave = function() {
            a.localAudioMap[e] = GameGlobal.manager.getCachePath(e), t.handleDownloadEnd(e, !0)
          }, d.onsavefail = function() {
            t.handleDownloadEnd(e, !1)
          }, d.onerror = function() {
            t.handleDownloadEnd(e, !1)
          }, d.send()
        } else wx.downloadFile({
          url: e,
          success: function(o) {
            200 === o.statusCode && o.tempFilePath ? (a.localAudioMap[e] = o.tempFilePath, t.handleDownloadEnd(e, !0)) : t.handleDownloadEnd(e, !1)
          },
          fail: function(o) {
            t.handleDownloadEnd(e, !1), (0, i.printErrMsg)(o)
          }
        })
      }))
    })))
  },
  handleDownloadEnd: function(o, e) {
    if (a.downloadingAudioMap[o]) {
      for (; a.downloadingAudioMap[o] && a.downloadingAudioMap[o].length > 0;) {
        var n = a.downloadingAudioMap[o].shift();
        e ? null == n || n.resolve("") : null == n || n.reject()
      }
      delete a.downloadingAudioMap[o]
    }
  },
  checkLocalFile: function(o) {
    if (a.localAudioMap[o]) return !0;
    var e = GameGlobal.manager.getCachePath(o);
    return !!e && (a.localAudioMap[o] = e, !0)
  },
  setAudioSrc: function(o, e) {
    return new Promise((function(n, i) {
      var d = t.getFullUrl(e);
      o.isLoading = d, t.checkLocalFile(d) ? (o.src = a.localAudioMap[d], delete o.isLoading, t.handleDownloadEnd(d, !0), n(a.localAudioMap[d])) : o.needDownload ? t.downloadAudios(d).then((function() {
        o ? (o.src = a.localAudioMap[d], delete o.isLoading, n(a.localAudioMap[d])) : (console.warn("资源已被删除:", d), i({
          errCode: -1,
          errMsg: "资源已被删除"
        }))
      })).catch((function() {
        console.warn("资源下载失败:", d), o && (o.src = d, delete o.isLoading), i({
          errCode: -1,
          errMsg: "资源下载失败"
        })
      })) : (o.src = d, delete o.isLoading, n(d))
    }))
  }
};

function r(o) {
  return !!a.audios[o] || (console.error(d.INNER_AUDIO_UNDEFINED_MSG, o), !1)
}
exports.default = {
  WXCreateInnerAudioContext: function(o, d, r, l, u, s, c) {
    var f, A = (0, i.createInnerAudio)(),
      p = A.audio,
      g = A.id;
    return p.needDownload = c, o && t.setAudioSrc(p, o).catch((function(o) {
      e.default.send("OnAudioCallback", JSON.stringify({
        callbackId: g,
        errMsg: "onError",
        result: JSON.stringify(o)
      }))
    })), d && (p.loop = !0), l && (p.autoplay = !0), void 0 === r && (r = 0), r > 0 && (p.startTime = +r.toFixed(2)), f = void 0 === u ? 1 : +u.toFixed(2), a.innerAudioVolume.set(p, f), a.WEBAudio.isMute && (f = 0), 1 !== f && (p.volume = f), n.isSupportPlayBackRate || (s = 1), void 0 !== s && 1 !== s && (p.playbackRate = +s.toFixed(2)), g
  },
  WXInnerAudioContextSetBool: function(o, e, n) {
    r(o) && (a.audios[o][e] = Boolean(+n))
  },
  WXInnerAudioContextSetString: function(o, e, n) {
    r(o) && ("src" === e ? t.setAudioSrc(a.audios[o], n) : "needDownload" === e ? a.audios[o].needDownload = !!n : a.audios[o][e] = n)
  },
  WXInnerAudioContextSetFloat: function(o, e, n) {
    if (r(o)) {
      var i = +n.toFixed(2);
      "volume" === e && (a.innerAudioVolume.set(a.audios[o], i), a.WEBAudio.isMute && (i = 0)), a.audios[o][e] = i
    }
  },
  WXInnerAudioContextGetFloat: function(o, e) {
    return r(o) ? a.audios[o][e] : 0
  },
  WXInnerAudioContextGetBool: function(o, e) {
    return !!r(o) && a.audios[o][e]
  },
  WXInnerAudioContextPlay: function(o) {
    if (r(o)) {
      var e = a.audios[o].isLoading;
      e ? a.downloadingAudioMap[e] ? a.downloadingAudioMap[e].push({
        resolve: function() {
          void 0 !== a.audios[o] && a.audios[o].play()
        },
        reject: function() {}
      }) : (a.audios[o].src = e, a.audios[o].play()) : a.audios[o].play()
    }
  },
  WXInnerAudioContextPause: function(o) {
    r(o) && a.audios[o].pause()
  },
  WXInnerAudioContextStop: function(o) {
    r(o) && a.audios[o].stop()
  },
  WXInnerAudioContextDestroy: function(o) {
    r(o) && (0, i.destroyInnerAudio)(o, !1)
  },
  WXInnerAudioContextSeek: function(o, e) {
    r(o) && a.audios[o].seek(+e.toFixed(3))
  },
  WXInnerAudioContextAddListener: function(o, n) {
    r(o) && ("onCanplay" === n ? a.audios[o][n]((function() {
      var i = a.audios[o];
      i.duration, i.buffered, i.referrerPolicy, i.volume;
      setTimeout((function() {
        e.default.send("OnAudioCallback", JSON.stringify({
          callbackId: o,
          errMsg: n
        }))
      }), 0)
    })) : "onError" === n ? a.audios[o][n]((function(a) {
      "onError" === n && (console.error(a), a.errMsg && a.errMsg.indexOf(d.IGNORE_ERROR_MSG) > -1) || e.default.send("OnAudioCallback", JSON.stringify({
        callbackId: o,
        errMsg: n,
        result: JSON.stringify(a)
      }))
    })) : a.audios[o][n]((function() {
      e.default.send("OnAudioCallback", JSON.stringify({
        callbackId: o,
        errMsg: n
      }))
    })))
  },
  WXInnerAudioContextRemoveListener: function(o, e) {
    r(o) && a.audios[o][e]()
  },
  WXPreDownloadAudios: function(o, n) {
    t.downloadAudios(o).then((function() {
      e.default.send("WXPreDownloadAudiosCallback", JSON.stringify({
        callbackId: n.toString(),
        errMsg: "0"
      }))
    })).catch((function() {
      e.default.send("WXPreDownloadAudiosCallback", JSON.stringify({
        callbackId: n.toString(),
        errMsg: "1"
      }))
    }))
  }
};