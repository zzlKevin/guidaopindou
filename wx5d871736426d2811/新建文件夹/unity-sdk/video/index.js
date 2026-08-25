Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, o = require("../../@babel/runtime/helpers/classCallCheck"),
  t = require("../../@babel/runtime/helpers/createClass"),
  n = require("../../check-version"),
  r = require("../utils"),
  a = null,
  i = n.isH5Renderer && !GameGlobal.isIOSHighPerformanceModePlus || n.isPc || n.isDevtools,
  d = [],
  l = !!GameGlobal.isIOSHighPerformanceModePlus,
  u = {},
  _ = function() {
    return t((function e() {
      o(this, e), this.videoBuffers = new Map
    }), [{
      key: "getTempBuffer",
      value: function(e, o) {
        var t = GameGlobal.manager.gameInstance.Module;
        if (this.videoBuffers.has(e)) {
          var n = this.videoBuffers.get(e);
          if (n.byteLength >= o) return n.ptr;
          null !== n.ptr && t._free(n.ptr)
        }
        var r = t._malloc(o);
        return null === r ? null : (this.videoBuffers.set(e, {
          byteLength: o,
          ptr: r
        }), r)
      }
    }, {
      key: "destroyTempBuffer",
      value: function(e) {
        if (this.videoBuffers.has(e)) {
          var o = GameGlobal.manager.gameInstance.Module,
            t = this.videoBuffers.get(e);
          null !== t.ptr && o._free(t.ptr), this.videoBuffers.delete(e)
        }
      }
    }])
  }();
var s = 0;

function c() {
  var e;
  a && (e = a).dynCall_vi.apply(e, arguments)
}

function v() {
  (0, r.debugLog)("jsVideoEnded"), this.onendedCallback && c(this.onendedCallback, this.onendedRef)
}

function f(e) {
  var o = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  (0, r.debugLog)("_JS_Video_SetLoop", e, o);
  var t = u[e];
  t.loopEndPollInterval && clearInterval(t.loopEndPollInterval), t.loop = o, o ? (t.loopEndPollInterval = setInterval((function() {
    if (void 0 !== t.currentTime && void 0 !== t.lastSeenPlaybackTime) {
      var e = Math.floor(t.currentTime),
        o = Math.floor(t.lastSeenPlaybackTime);
      if (e < o) {
        var n = t.duration,
          r = .2 * n;
        e < r && o > n - r && v.apply(t)
      }
    }
    t.lastSeenPlaybackTime = t.currentTime
  }), 1e3 / 30), t.lastSeenPlaybackTime = t.currentTime, t.onended = null) : t.onended = v
}

function g(e) {
  if ((0, r.debugLog)("jsVideoAllAudioTracksAreDisabled"), !e.enabledTracks) return !1;
  for (var o = 0; o < e.enabledTracks.length; ++o)
    if (e.enabledTracks[o]) return !1;
  return !0
}
exports.default = {
  _JS_Video_CanPlayFormat: function(e, o) {
    return a = o, !!n.isSupportVideoPlayer
  },
  _JS_Video_Create: function(o) {
    var t = "";
    if (a && (t = a.UTF8ToString(o)), (0, r.debugLog)("_JS_Video_Create", t), GameGlobal.mtl && (l = !1, e || (e = new _)), i) {
      var n = GameGlobal.manager.createWKVideo(t, a.GLctx);
      u[++s] = n
    } else {
      var c, v = {
        videoDecoder: c = d.length > 0 ? d.pop() : wx.createVideoDecoder({
          type: "wemedia"
        }),
        videoWidth: 0,
        videoHeight: 0,
        isReady: !1,
        stoped: !0,
        paused: !1,
        ended: !1,
        seeking: !1,
        duration: 1
      };
      u[++s] = v, c.remove(), c.on("start", (function(e) {
        var o, t;
        ((0, r.debugLog)("wxVideoDecoder start:", e), v.isReady) ? (v.paused = !1, v.stoped = !1) : (e.video && e.video.duration && (v.duration = e.video.duration / 1e3), v.videoWidth = null !== (o = e.width) && void 0 !== o ? o : 0, v.videoHeight = null !== (t = e.height) && void 0 !== t ? t : 0, v.isReady = !0, c.stop())
      })), c.on("stop", (function(e) {
        (0, r.debugLog)("wxVideoDecoder stop:", e), v.stoped = !0
      })), c.on("bufferchange", (function(e) {
        (0, r.debugLog)("wxVideoDecoder bufferchange:", e)
      })), c.on("ended", (function(e) {
        var o;
        ((0, r.debugLog)("wxVideoDecoder ended:", e), v.loop) ? v.seek(0): (v.ended = !0, null === (o = v.onended) || void 0 === o || o.call(v))
      })), c.on("frame", (function(e) {
        var o, t;
        (v.currentTime = e.pts / 1e3, l || GameGlobal.mtl) && (null === (o = v.frameData) || void 0 === o || null === (t = o.close) || void 0 === t || t.call(o));
        v.frameData = e
      }));
      var f = {
        source: t
      };
      l && (f.videoDataType = 2), v.play = function() {
        v.seeking && (v.seeking = !1), v.paused ? (v.paused = !1, c.wait(!1)) : c.start(f)
      }, v.pause = function() {
        c.wait(!0), v.paused = !0
      }, v.seek = function(e) {
        c.avSync.seek({
          stamp: e
        }), v.seeking = !0, c.emitter.emit("seek", {})
      }, v.destroy = function() {
        c.stop(), d.push(c), v.loopEndPollInterval && clearInterval(v.loopEndPollInterval), delete v.videoDecoder, delete v.onendedCallback, delete v.frameData, v.stoped = !0, v.paused = !1, v.ended = !1, v.seeking = !1, v.currentTime = 0, v.onended = null
      }, v.play()
    }
    return s
  },
  _JS_Video_Destroy: function(o) {
    (0, r.debugLog)("_JS_Video_Destroy", o), u[o].destroy();
    var t = GameGlobal.manager.gameInstance.Module,
      n = t.GL;
    if (GameGlobal.mtl) {
      var a;
      if (!i) null === (a = e) || void 0 === a || a.destroyTempBuffer(o)
    } else {
      var d = n.currentContext.GLctx;
      !i && d.emscriptenGLX && t._glxVideoDestroy && t._glxVideoDestroy(o)
    }
    delete u[o]
  },
  _JS_Video_Duration: function(e) {
    return u[e].duration
  },
  _JS_Video_EnableAudioTrack: function(e, o, t) {
    var n = u[e];
    for (n.enabledTracks || (n.enabledTracks = []); n.enabledTracks.length <= o;) n.enabledTracks.push(!0);
    n.enabledTracks[o] = t;
    var r = n.audioTracks;
    if (r) {
      var a = r[o];
      a && (a.enabled = !!t)
    }
  },
  _JS_Video_GetAudioLanguageCode: function(e, o) {
    var t = u[e].audioTracks;
    if (!t) return "";
    var n = t[o];
    return n ? n.language : ""
  },
  _JS_Video_GetNumAudioTracks: function(e) {
    var o = u[e].audioTracks;
    return o ? o.length : 1
  },
  _JS_Video_Height: function(e) {
    return u[e].videoHeight
  },
  _JS_Video_IsPlaying: function(e) {
    if (i) return u[e].isPlaying;
    var o = u[e];
    return o.isReady && !o.stoped && !o.paused && !o.ended
  },
  _JS_Video_IsReady: function(e) {
    return !!u[e].isReady
  },
  _JS_Video_IsSeeking: function(e) {
    return !!u[e].seeking
  },
  _JS_Video_Pause: function(e) {
    (0, r.debugLog)("_JS_Video_Pause");
    var o = u[e];
    o.loopEndPollInterval && clearInterval(o.loopEndPollInterval), o.pause()
  },
  _JS_Video_SetLoop: f,
  _JS_Video_Play: function(e, o) {
    (0, r.debugLog)("_JS_Video_Play", e, o);
    var t = u[e];
    t.muted = o || g(t), t.play(), f(e, t.loop)
  },
  _JS_Video_Seek: function(e, o) {
    (0, r.debugLog)("_JS_Video_Seek", e, o), u[e].seek(o)
  },
  _JS_Video_SetEndedHandler: function(e, o, t) {
    (0, r.debugLog)("_JS_Video_SetEndedHandler", e, o, t);
    var n = u[e];
    n.onendedCallback = t, n.onendedRef = o
  },
  _JS_Video_SetErrorHandler: function(e, o, t) {
    (0, r.debugLog)("_JS_Video_SetErrorHandler", e, o, t), i && u[e].on("error", (function(e) {
      (0, r.debugLog)("video error:", e),
      function() {
        var e;
        a && (e = a).dynCall_vii.apply(e, arguments)
      }(t, o, e)
    }))
  },
  _JS_Video_SetMute: function(e, o) {
    (0, r.debugLog)("_JS_Video_SetMute", e, o);
    var t = u[e];
    t.muted = o || g(t)
  },
  _JS_Video_SetPlaybackRate: function(e, o) {},
  _JS_Video_SetReadyHandler: function(e, o, t) {
    (0, r.debugLog)("_JS_Video_SetReadyHandler", e, o, t);
    var n, a = u[e];
    i ? a.on("canplay", (function() {
      c(t, o)
    })) : null === (n = a.videoDecoder) || void 0 === n || n.on("bufferchange", (function e() {
      var n;
      console.log("_JS_Video_SetReadyHandler onCanPlay"), c(t, o), null === (n = a.videoDecoder) || void 0 === n || n.off("bufferchange", e)
    }))
  },
  _JS_Video_SetSeekedOnceHandler: function(e, o, t) {
    (0, r.debugLog)("_JS_Video_SetSeekedOnceHandler", e, o, t);
    var n, a = u[e];
    i ? a.on("seek", (function() {
      c(t, o)
    })) : null === (n = a.videoDecoder) || void 0 === n || n.on("seek", (function() {
      c(t, o)
    }))
  },
  _JS_Video_SetVolume: function(e, o) {
    (0, r.debugLog)("_JS_Video_SetVolume"), u[e].volume = o
  },
  _JS_Video_Time: function(e) {
    return u[e].currentTime
  },
  _JS_Video_UpdateToTexture: function(o, t) {
    var n = u[o];
    if (!(n.videoWidth > 0 && n.videoHeight > 0)) return !1;
    if (n.lastUpdateTextureTime === n.currentTime) return !1;
    if (n.lastUpdateTextureTime = n.currentTime, !a) return !1;
    var r = GameGlobal.manager.gameInstance.Module,
      d = a,
      _ = d.GL,
      s = d.GLctx;
    if (!i && GameGlobal.mtl) {
      var c, v;
      if (l) return !1;
      var f = null === (c = n.frameData) || void 0 === c ? void 0 : c.data,
        g = l ? f : new Uint8ClampedArray(f),
        p = l ? 0 : g.byteLength,
        m = null === (v = e) || void 0 === v ? void 0 : v.getTempBuffer(o, p);
      return m && r.HEAPU8.set(g, m), r._mtlVideoUpdateToTexture(o, l, t, n.videoWidth, n.videoHeight, m)
    }
    var T = _.currentContext.GLctx;
    if (!i && r._glxVideoUpdateToTexture && T.emscriptenGLX) {
      var S, b, h = null === (S = n.frameData) || void 0 === S ? void 0 : S.data,
        V = l ? h : new Uint8ClampedArray(h),
        E = l ? 0 : V.byteLength;
      return l ? b = V.__uid : (b = r._glxGetVideoTempBuffer(o, E)) && r.HEAPU8.set(V, b), r._glxVideoUpdateToTexture(n, l, t, n.videoWidth, n.videoHeight, b), !0
    }
    s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL, !0);
    var y = s.RGBA,
      k = s.RGBA,
      D = n.videoWidth,
      G = n.videoHeight;
    if (n.previousUploadedWidth !== D || n.previousUploadedHeight !== G) {
      s.deleteTexture(_.textures[t]);
      var L = s.createTexture();
      if (L.name = t, _.textures[t] = L, s.bindTexture(s.TEXTURE_2D, L), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_S, s.CLAMP_TO_EDGE), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_T, s.CLAMP_TO_EDGE), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, s.LINEAR), i) n.render();
      else {
        var x, P = null === (x = n.frameData) || void 0 === x ? void 0 : x.data,
          J = l ? P : new Uint8ClampedArray(P);
        l ? s.texImage2D(s.TEXTURE_2D, 0, y, k, s.UNSIGNED_BYTE, J) : s.texImage2D(s.TEXTURE_2D, 0, y, n.videoWidth, n.videoHeight, 0, k, s.UNSIGNED_BYTE, J)
      }
      n.previousUploadedWidth = D, n.previousUploadedHeight = G
    } else if (s.bindTexture(s.TEXTURE_2D, _.textures[t]), i) n.render();
    else {
      var U, I = null === (U = n.frameData) || void 0 === U ? void 0 : U.data,
        R = l ? I : new Uint8ClampedArray(I);
      l ? s.texImage2D(s.TEXTURE_2D, 0, y, k, s.UNSIGNED_BYTE, R) : s.texImage2D(s.TEXTURE_2D, 0, y, n.videoWidth, n.videoHeight, 0, k, s.UNSIGNED_BYTE, R)
    }
    return s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL, !1), !0
  },
  _JS_Video_Width: function(e) {
    return u[e].videoWidth
  },
  _JS_Video_SetSeekedHandler: function(e, o, t) {
    var n, r = u[e];
    i ? r.on("seek", (function() {
      c(t, o)
    })) : null === (n = r.videoDecoder) || void 0 === n || n.on("seek", (function() {
      c(t, o)
    }))
  },
  _JS_Video_GetPlaybackRate: function(e) {
    return u[e].playbackRate
  }
};