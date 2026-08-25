Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = exports.AudioChannelInstance = void 0, require("../../@babel/runtime/helpers/Objectvalues");
var e = require("../../@babel/runtime/helpers/classCallCheck"),
  o = require("../../@babel/runtime/helpers/createClass"),
  t = require("../../check-version"),
  i = require("./store"),
  u = require("./const"),
  n = require("./utils"),
  r = require("../utils");

function a(e, o, t) {
  return {
    buffer: e,
    error: o,
    release: function() {
      this.buffer = null, i.WEBAudio.audioBufferLength -= t
    },
    resetGain: function() {},
    getLength: function() {
      if (!this.buffer) return 0;
      var e = 44100 / this.buffer.sampleRate;
      return this.buffer.length * e
    },
    getData: function(e, o) {
      if (!this.buffer) return console.log("Trying to get data of sound which is not loaded."), 0;
      for (var t = e >> 2, i = GameGlobal.unityNamespace.Module.HEAPF32.subarray(t, t + (o >> 2)), u = Math.floor((o >> 2) / this.buffer.numberOfChannels), n = Math.min(this.buffer.length, u), r = 0; r < this.buffer.numberOfChannels; r++) {
        var a = this.buffer.getChannelData(r).subarray(0, n);
        i.set(a, r * n)
      }
      return n * this.buffer.numberOfChannels * 4
    },
    getNumberOfChannels: function() {
      return this.buffer ? this.buffer.numberOfChannels : (console.log("Trying to get metadata of sound which is not loaded."), 0)
    },
    getFrequency: function() {
      return this.buffer ? this.buffer.sampleRate : (console.log("Trying to get metadata of sound which is not loaded."), 0)
    }
  }
}

function s(e) {
  var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
  return new Promise((function(t, i) {
    var u = e.duration;
    u > 0 ? t(u) : o > 0 ? setTimeout((function() {
      t(s(e, o - 1))
    }), 100) : i("getAudio.duration is 0")
  }))
}
var d = exports.AudioChannelInstance = function() {
  return o((function o(t, u) {
    var n;
    e(this, o), this.threeD = !1, this.source = void 0, this.gain = void 0, this.callback = 0, this.userData = 0, this.loop = !1, this.loopStart = 0, this.loopEnd = 0, this.deleyTime = 0, this.deleyOffset = 0, i.WEBAudio.audioContext && (this.gain = i.WEBAudio.audioContext.createGain(), null === (n = this.gain) || void 0 === n || n.connect(i.WEBAudio.audioContext.destination)), this.callback = t, this.userData = u
  }), [{
    key: "resetGain",
    value: function() {
      var e;
      i.WEBAudio.audioContext && this.gain && (this.gain.disconnect(), this.gain = i.WEBAudio.audioContext.createGain(), null === (e = this.gain) || void 0 === e || e.connect(i.WEBAudio.audioContext.destination))
    }
  }, {
    key: "release",
    value: function() {
      this.disconnectSource(), this.gain && this.gain.disconnect()
    }
  }, {
    key: "setLoop",
    value: function(e) {
      this.loop = e, this.source && this.source.loop != e && (this.source.loop = e)
    }
  }, {
    key: "setLoopPoints",
    value: function(e, o) {
      this.loopStart = e, this.loopEnd = o, this.source && (this.source.loopStart !== e && (this.source.loopStart = e), this.source.loopEnd !== o && (this.source.loopEnd = o))
    }
  }, {
    key: "playUrl",
    value: function(e, o, t, u, a) {
      var d = this;
      (0, r.debugLog)("playUrl: ", o, e, t, u, a);
      try {
        if (this.setup(o), !this.source || !this.source.mediaElement) return;
        void 0 !== u && (this.source.mediaElement.volume = u), i.WEBAudio.isMute && (this.source.mediaElement.volume = 0), this.source.mediaElement.onPlay((function() {
          if ((0, r.debugLog)("this.source.mediaElement.onPlay"), void 0 !== d.source && (d.source.isPlaying = !0, !d.source.loop && d.source.mediaElement)) {
            var e = d.source.mediaElement.duration;
            if (e > 0) {
              d.source.stopTicker && (clearTimeout(d.source.stopTicker), d.source.stopTicker = void 0);
              var o = Math.floor(1e3 * e) + 1e3;
              d.source.stopTicker = setTimeout((function() {
                d.source && d.source.mediaElement && d.source.mediaElement.stop()
              }), o)
            }
          }
        })), this.source.mediaElement.onPause((function() {
          (0, r.debugLog)("this.source.mediaElement.onPause"), void 0 !== d.source && (d.source.isPlaying = !1, d.source.stopTicker && (clearTimeout(d.source.stopTicker), d.source.stopTicker = void 0))
        })), this.source.mediaElement.onStop((function() {
          if ((0, r.debugLog)("this.source.mediaElement.onStop"), void 0 !== d.source) {
            if (d.source.playAfterStop) return d.source._reset(), void(void 0 !== d.source.mediaElement && d.source.mediaElement.play());
            d.source._reset(), d.disconnectSource()
          }
          d.callback && GameGlobal.unityNamespace.Module.dynCall_vi(d.callback, [d.userData])
        })), this.source.mediaElement.onEnded((function() {
          (0, r.debugLog)("this.source.mediaElement.onEnded"), void 0 !== d.source && (d.source._reset(), d.disconnectSource()), d.callback && GameGlobal.unityNamespace.Module.dynCall_vi(d.callback, [d.userData])
        })), this.source.mediaElement.onError((function(e) {
          (0, r.debugLog)("this.source.mediaElement.onError", e), (0, n.printErrMsg)(e);
          var o = e.errMsg;
          o && o.indexOf("play audio fail") < 0 || void 0 !== d.source && d.source.mediaElement && (d.source._reset(), d.source.mediaElement.stop())
        }));
        var c = function() {
          (0, r.debugLog)("this.source.mediaElement.onCanplay"), void 0 !== d.source && d.source.mediaElement && s(d.source.mediaElement).then((function(e) {
            a.length = 44100 * e
          })).catch((function(e) {
            0 === a.length && (a.error = !0, (0, n.printErrMsg)(e))
          }))
        };
        this.source.canPlayFnList || (this.source.canPlayFnList = []), this.source.canPlayFnList.push(c), this.source.mediaElement.onCanplay(c), this.source.mediaElement.loop = this.loop, this.deleyTime = e, this.deleyOffset = t, this.source.start(e, t), this.source.playbackStartTime = e - t / this.source.playbackRateValue
      } catch (e) {
        (0, n.printErrMsg)("playUrl error. Exception: ".concat(e))
      }
    }
  }, {
    key: "playBuffer",
    value: function(e, o, t, u) {
      var r = this;
      try {
        if (this.setup(), !this.source) return;
        var a;
        if (this.source.buffer = o, this.source.onended = function() {
            r.disconnectSource(), r.callback && GameGlobal.unityNamespace.Module.dynCall_vi(r.callback, [r.userData])
          }, this.gain && u) i.WEBAudio.isMute ? (i.unityAudioVolume.set(u, this.gain.gain.value || 1), a = 0) : a = i.unityAudioVolume.get(u), this.gain.gain.value !== a && "number" == typeof a && (this.gain.gain.value = a);
        this.source.loop = this.loop, this.source.loopStart = this.loopStart, this.source.loopEnd = this.loopEnd, this.source.start(e, t), this.source.playbackStartTime = e - t / this.source.playbackRateValue
      } catch (e) {
        (0, n.printErrMsg)("playBuffer error. Exception: ".concat(e))
      }
    }
  }, {
    key: "disconnectSource",
    value: function() {
      this.source && (this.source.mediaElement ? (this.source.stopTimeout && (clearTimeout(this.source.stopTimeout), delete this.source.stopTimeout), (0, n.destroyInnerAudio)(this.source.instanceId, !1), delete this.source.mediaElement, delete this.source) : this.source.isPausedMockNode ? this.source.buffer = null : (this.source.onended = null, this.source.disconnect && this.source.disconnect(), GameGlobal.isIOSHighPerformanceMode && (this.source.buffer = null), i.WEBAudio.bufferSourceNodeLength -= 1, delete this.source))
    }
  }, {
    key: "stop",
    value: function(e) {
      if (i.WEBAudio.audioContext && this.source)
        if (this.source.buffer) {
          try {
            this.source.stop(i.WEBAudio.audioContext.currentTime + e)
          } catch (e) {}
          0 == e && this.disconnectSource()
        } else this.source.mediaElement && this.source.stop(e)
    }
  }, {
    key: "isPaused",
    value: function() {
      return !this.source || (!!this.source.isPausedMockNode || !!this.source.mediaElement && (null === (e = !this.source.isPlaying || this.source.pauseRequested) || void 0 === e || e));
      var e
    }
  }, {
    key: "pause",
    value: function() {
      var e, o = this.source;
      if (o)
        if (o.mediaElement) null === (e = o._pauseMediaElement) || void 0 === e || e.call(o);
        else if (!o.isPausedMockNode) {
        var t = {
          isPausedMockNode: !0,
          loop: this.loop,
          loopStart: this.loopStart,
          loopEnd: this.loopEnd,
          buffer: o.buffer,
          playbackRate: o.playbackRateValue,
          playbackPausedAtPosition: o.estimatePlaybackPosition(),
          setPitch: function(e) {
            this.playbackRate = e
          },
          _reset: function() {}
        };
        this.stop(0), this.disconnectSource(), this.source = t
      }
    }
  }, {
    key: "resume",
    value: function() {
      if (i.WEBAudio.audioContext && this.source) {
        if (this.source.mediaElement) return this.source.start(this.deleyTime, this.deleyOffset), delete this.deleyTime, void delete this.deleyOffset;
        var e = this.source;
        if (e.isPausedMockNode && (delete this.source, e.buffer)) {
          this.playBuffer(i.WEBAudio.audioContext.currentTime - Math.min(0, e.playbackPausedAtPosition), e.buffer, Math.max(0, e.playbackPausedAtPosition));
          var o = this.source;
          o && (o.loop = e.loop, o.loopStart = e.loopStart, o.loopEnd = e.loopEnd, o.setPitch(e.playbackRate))
        }
      }
    }
  }, {
    key: "setVolume",
    value: function(e, o) {
      i.WEBAudio.audioContext && (i.WEBAudio.isMute && (e = 0), o && 1 == e || this.source && (this.source.buffer && this.gain ? this.gain.gain.value = e : this.source.mediaElement && (this.source.mediaElement.volume = e)))
    }
  }, {
    key: "setup",
    value: function(e) {
      var o = this;
      if (i.WEBAudio.audioContext) {
        if (this.source && !this.source.isPausedMockNode && (this.source.url ? void 0 === e ? (void 0 !== this.source && this.source._reset(), this.disconnectSource()) : (this.source._reset(), this.disconnectSource()) : void 0 !== e && this.stop(0)), e) {
          var u = (0, n.createInnerAudio)(),
            r = u.audio,
            a = u.id;
          r.src = e;
          var s = function() {
              o.source && (o.source.needCanPlay = !0, o.source.fixPlayTicker && (clearTimeout(o.source.fixPlayTicker), delete o.source.fixPlayTicker), o.source.fixPlayTicker = setTimeout((function() {
                o.source && o.source.mediaElement && o.source.needCanPlay && !o.source.isPlaying && o.source.mediaElement.play()
              }), 100))
            },
            d = function(e) {
              if (o.source && o.source.mediaElement)
                if (t.isSupportBufferURL && o.source.readyToPlay) o.source.stopCache ? (o.source.stopCache = !1, o.source.playAfterStop = !0) : o.source.isPlaying || (t.isAndroid && s(), o.source.mediaElement.play(), null == e || e());
                else {
                  var i = function() {
                    if (o.source) {
                      if (o.source.needCanPlay = !1, o.source.readyToPlay = !0, void 0 !== o.source.mediaElement) {
                        o.source.mediaElement.duration;
                        o.source.canPlayFnList.forEach((function(e) {
                          var t, i;
                          null === (t = o.source) || void 0 === t || null === (i = t.mediaElement) || void 0 === i || i.offCanplay(e)
                        })), o.source.canPlayFnList = []
                      }
                      o.source.stopCache ? (o.source.stopCache = !1, o.source.playAfterStop = !0) : o.source.isPlaying || (t.isAndroid && s(), void 0 !== o.source.mediaElement && (o.source.mediaElement.play(), null == e || e()))
                    }
                  };
                  o.source.canPlayFnList || (o.source.canPlayFnList = []), o.source.canPlayFnList.push(i), o.source.mediaElement.onCanplay(i), s()
                }
            };
          this.source = {
            instanceId: a,
            mediaElement: r,
            url: e,
            playbackStartTime: 0,
            playbackRate: 1,
            pauseRequested: !1,
            _reset: function() {
              o.source && (o.source.readyToPlay = !1, o.source.isPlaying = !1, o.source.stopCache = !1, o.source.playAfterStop = !1, o.source.needCanPlay = !1, o.source.stopTicker && (clearTimeout(o.source.stopTicker), o.source.stopTicker = void 0))
            },
            _pauseMediaElement: function() {
              void 0 !== o.source && (o.source.playTimeout ? o.source.pauseRequested = !0 : o.source.isPlaying && o.source.mediaElement && o.source.mediaElement.pause())
            },
            _startPlayback: function(e) {
              if (void 0 !== o.source && o.source.mediaElement) return o.source.playTimeout ? (o.source.mediaElement.seek(e), void(o.source.pauseRequested = !1)) : void d((function() {
                o.source && o.source.mediaElement && o.source.mediaElement.seek(e)
              }))
            },
            start: function(e, t) {
              if (void 0 !== o.source)
                if (void 0 !== e || void 0 !== t) {
                  void 0 === e && (e = 0), void 0 === t && (t = 0);
                  var i, u, n = 1e3 * e;
                  if (n > 4) o.source.playTimeout && (clearTimeout(o.source.playTimeout), delete o.source.playTimeout), o.source.playTimeout = setTimeout((function() {
                    var e, i;
                    void 0 !== o.source && (delete o.source.playTimeout, null === (e = (i = o.source)._startPlayback) || void 0 === e || e.call(i, t || 0))
                  }), n);
                  else null === (i = (u = o.source)._startPlayback) || void 0 === i || i.call(u, t)
                } else d()
            },
            stop: function(e) {
              if (void 0 !== o.source) {
                void 0 === e && (e = 0);
                var t = 1e3 * e;
                t > 4 ? (o.source.stopTimeout && (clearTimeout(o.source.stopTimeout), delete o.source.stopTimeout), o.source.stopTimeout = setTimeout((function() {
                  o.source && o.source.mediaElement && (o.source.stopCache = !0, o.source.mediaElement.stop())
                }), t)) : o.source.mediaElement && (o.source.stopCache = !0, o.source.mediaElement.stop())
              }
            }
          };
          r.buffered, r.referrerPolicy, r.volume;
          var c = this.source;
          Object.defineProperty(this.source, "loopStart", {
            get: function() {
              return 0
            },
            set: function(e) {}
          }), Object.defineProperty(c, "loopEnd", {
            get: function() {
              return 0
            },
            set: function(e) {}
          }), Object.defineProperty(c, "loop", {
            get: function() {
              var e, o;
              return null !== (e = null == c || null === (o = c.mediaElement) || void 0 === o ? void 0 : o.loop) && void 0 !== e && e
            },
            set: function(e) {
              c && c.mediaElement && (c.mediaElement.loop = e)
            }
          }), Object.defineProperty(c, "playbackRateValue", {
            get: function() {
              var e;
              return null !== (e = null == c ? void 0 : c.playbackRate) && void 0 !== e ? e : 1
            },
            set: function(e) {
              c && c.mediaElement && (t.isSupportPlayBackRate ? (c.playbackRate = e, c.mediaElement.playbackRate = e) : c.mediaElement.playbackRate = 1)
            }
          }), Object.defineProperty(c, "currentTime", {
            get: function() {
              var e, o;
              return null !== (e = null == c || null === (o = c.mediaElement) || void 0 === o ? void 0 : o.currentTime) && void 0 !== e ? e : 0
            },
            set: function(e) {
              c && c.mediaElement && ("function" == typeof c.mediaElement.seek ? c.mediaElement.seek(e) : c.mediaElement.currentTime = e)
            }
          })
        } else {
          this.source = i.WEBAudio.audioContext.createBufferSource(), i.WEBAudio.bufferSourceNodeLength += 1;
          var l = this.source;
          Object.defineProperty(this.source, "playbackRateValue", {
            get: function() {
              var e, o;
              return null !== (e = null == l || null === (o = l.playbackRate) || void 0 === o ? void 0 : o.value) && void 0 !== e ? e : 0
            },
            set: function(e) {
              l && void 0 !== l.playbackRate && (l.playbackRate.value = e)
            }
          })
        }
        this.source && (this.source.estimatePlaybackPosition = function() {
          return o.source ? (e = i.WEBAudio.audioContext ? (i.WEBAudio.audioContext.currentTime - o.source.playbackStartTime) * o.source.playbackRateValue : -o.source.playbackStartTime * o.source.playbackRateValue, void 0 !== o.source.loopStart && void 0 !== o.source.loopEnd && o.source.loop && e >= o.source.loopStart && (e = (e - o.source.loopStart) % (o.source.loopEnd - o.source.loopStart) + o.source.loopStart), e) : 0;
          var e
        }, this.source.setPitch = function(e) {
          if (!o.source) return 0;
          var t = o.source.estimatePlaybackPosition();
          t >= 0 && i.WEBAudio.audioContext && (o.source.playbackStartTime = i.WEBAudio.audioContext.currentTime - t / e), o.source.playbackRateValue = e
        }, this.setupPanning())
      }
    }
  }, {
    key: "setupPanning",
    value: function() {
      void 0 !== this.source && (this.source.isPausedMockNode || this.source.disconnect && this.source.connect && (this.source.disconnect(), this.gain && this.source.connect(this.gain)))
    }
  }, {
    key: "isStopped",
    value: function() {
      return !this.source
    }
  }])
}();
exports.default = {
  _JS_Sound_Create_Channel: function(e, o) {
    if (!i.WEBAudio.audioContext || 0 === i.WEBAudio.audioWebEnabled) return 0;
    var t = new d(e, o);
    return i.WEBAudio.audioInstances[++i.WEBAudio.audioInstanceIdCounter] = t, i.WEBAudio.audioInstanceIdCounter
  },
  _JS_Sound_GetLength: function(e) {
    if (0 === i.WEBAudio.audioWebEnabled) return 441e3;
    var o = i.WEBAudio.audioInstances[e];
    return o ? o.getLength() : 441e3
  },
  _JS_Sound_GetLoadState: function(e) {
    if (0 === i.WEBAudio.audioWebEnabled) return 2;
    var o = i.WEBAudio.audioInstances[e];
    return !o || o.error ? 2 : o.buffer || o.url && o.length ? 0 : 1
  },
  _JS_Sound_Init: function() {
    try {
      if (wx && wx.createWebAudioContext && (i.WEBAudio.audioContext = wx.createWebAudioContext(), console.log("use wx WebAudio")), !i.WEBAudio.audioContext) return void(0, n.printErrMsg)("Minigame Web Audio API not suppoted");
      i.WEBAudio.audioWebSupport = 1, i.WEBAudio.audioWebEnabled = 1;
      var e = null;
      wx.onHide((function() {
        var o;
        e && (clearTimeout(e), e = null), null === (o = i.WEBAudio.audioContext) || void 0 === o || o.suspend()
      })), wx.onShow((function() {
        var e, o;
        t.isIOS175 ? (null === (e = i.WEBAudio.audioContext) || void 0 === e || e.close(), i.WEBAudio.audioContext = wx.createWebAudioContext(), Object.values(i.WEBAudio.audioInstances).forEach((function(e) {
          return e.resetGain()
        }))) : null === (o = i.WEBAudio.audioContext) || void 0 === o || o.resume()
      })), t.webAudioNeedResume && (e = setTimeout((function() {
        (0, n.resumeWebAudio)()
      }), 2e3))
    } catch (e) {
      (0, n.printErrMsg)("Web Audio API is not supported in this browser")
    }
  },
  _JS_Sound_IsStopped: function(e) {
    if (0 == i.WEBAudio.audioWebEnabled) return !0;
    var o = i.WEBAudio.audioInstances[e];
    return !o || o.isStopped()
  },
  _JS_Sound_Load: function(e, o, r) {
    if (!i.WEBAudio.audioContext || 0 === i.WEBAudio.audioWebEnabled) return 0;
    var d, c = GameGlobal.unityNamespace.Module.HEAPU8.buffer.slice(e, e + o);
    return r = o > 131072 ? 0 : 1, t.isPc && (r = 1), t.isAndroid && !t.isSupportInnerAudio && (r = 1), d = r && i.WEBAudio.audioWebSupport ? function(e, o, t) {
      var u, n = a(null, !1, t);
      return null === (u = i.WEBAudio.audioContext) || void 0 === u || u.decodeAudioData(e, (function(e) {
        n.buffer = e, i.WEBAudio.audioBufferLength += t
      }), (function(e) {
        n.error = !0, console.log("Decode error: ".concat(e))
      })), n
    }(c, 0, o) : function(e, o, r) {
      var a = {
        error: !1,
        length: 0,
        url: void 0,
        release: function() {
          i.WEBAudio.audioBufferLength -= r, t.isSupportBufferURL && this.url && wx.revokeBufferURL(this.url), delete this.url
        },
        resetGain: function() {},
        getLength: function() {
          return this.length || 0
        },
        getData: function(e, o) {
          return console.warn("getData() is not supported for compressed sound."), 0
        },
        getNumberOfChannels: function() {
          return console.warn("getNumberOfChannels() is not supported for compressed sound."), 0
        },
        getFrequency: function() {
          return console.warn("getFrequency() is not supported for compressed sound."), 0
        }
      };
      if (t.isSupportBufferURL) {
        var d = wx.createBufferURL(e);
        a.url = d, l(), i.WEBAudio.audioBufferLength += r
      } else {
        var c = "".concat(u.TEMP_DIR_PATH, "/temp-audio").concat(o + r, ".mp3");
        GameGlobal.manager.getCachePath(c) ? (a.url = c, l(), i.WEBAudio.audioBufferLength += r) : GameGlobal.manager.writeFile(c, e).then((function() {
          a.url = c, l(), i.WEBAudio.audioBufferLength += r
        })).catch((function(e) {
          a.error = !0, (0, n.printErrMsg)(e)
        }))
      }

      function l() {
        if (a.url) {
          var e = (0, n.createInnerAudio)().audio;
          e.src = a.url, e.onCanplay((function() {
            s(e).then((function(o) {
              a.length = 44100 * o, e.destroy()
            })).catch((function(o) {
              0 === a.length && (a.error = !0, (0, n.printErrMsg)(o)), e.destroy()
            }))
          }))
        }
      }
      return a
    }(c, e, o), i.WEBAudio.audioInstances[++i.WEBAudio.audioInstanceIdCounter] = d, i.WEBAudio.audioInstanceIdCounter
  },
  _JS_Sound_Load_PCM: function(e, o, t, u) {
    if (!i.WEBAudio.audioContext || 0 === i.WEBAudio.audioWebSupport || 0 === i.WEBAudio.audioWebEnabled) return 0;
    var n = function(e, o, t, u) {
      if (i.WEBAudio.audioContext) {
        for (var n = i.WEBAudio.audioContext.createBuffer(e, o, t), r = 0; r < e; r++) {
          var s = (u >> 2) + o * r;
          (n.copyToChannel || function(e, o, t) {
            var i = e.subarray(0, Math.min(e.length, n.length - (0 | t)));
            n.getChannelData(0 | o).set(i, 0 | t)
          }).apply(n, [GameGlobal.unityNamespace.Module.HEAPF32.subarray(s, s + o), r, 0])
        }
        return a(n, !1, o)
      }
      return a(null, !1, o)
    }(e, o, t, u);
    return i.WEBAudio.audioInstances[++i.WEBAudio.audioInstanceIdCounter] = n, i.WEBAudio.audioInstanceIdCounter
  },
  _JS_Sound_Play: function(e, o, t, u) {
    if (i.WEBAudio.audioContext && 0 !== i.WEBAudio.audioWebEnabled) {
      (0, r.debugLog)("_JS_Sound_Play", e, o, t, u), WXWASMSDK._JS_Sound_Stop(o, 0);
      var a = i.WEBAudio.audioInstances[e],
        s = i.WEBAudio.audioInstances[o];
      if (a && a.url) try {
        s.playUrl(u, a.url, t, i.unityAudioVolume.get(s), a)
      } catch (e) {
        (0, n.printErrMsg)("playUrl error. Exception: ".concat(e))
      } else if (a && a.buffer) try {
        s.playBuffer(i.WEBAudio.audioContext.currentTime + u, a.buffer, t, s)
      } catch (e) {
        (0, n.printErrMsg)("playBuffer error. Exception: ".concat(e))
      } else console.log("Trying to play sound which is not loaded.")
    }
  },
  _JS_Sound_ReleaseInstance: function(e) {
    if (0 !== i.WEBAudio.audioWebEnabled) {
      var o = i.WEBAudio.audioInstances[e];
      o && o.release(), delete i.WEBAudio.audioInstances[e]
    }
  },
  _JS_Sound_ResumeIfNeeded: function() {
    0 !== i.WEBAudio.audioWebSupport && 0 !== i.WEBAudio.audioWebEnabled && (i.WEBAudio.audioContext && "suspended" !== i.WEBAudio.audioContext.state || (0, n.resumeWebAudio)())
  },
  _JS_Sound_Set3D: function(e, o) {
    if (0 !== i.WEBAudio.audio3DSupport && 0 !== i.WEBAudio.audioWebEnabled) {
      var t = i.WEBAudio.audioInstances[e];
      t.threeD != o && (t.threeD = o, t.source || t.setup(), t.setupPanning())
    }
  },
  _JS_Sound_SetListenerOrientation: function(e, o, t, u, n, r) {
    i.WEBAudio.audioContext && 0 !== i.WEBAudio.audio3DSupport && 0 !== i.WEBAudio.audioWebSupport && 0 !== i.WEBAudio.audioWebEnabled && (o = o > 0 ? 0 : o, t = t > 0 ? 0 : t, u = u < 0 ? 0 : u, n = n < 0 ? 0 : n, r = r < 0 ? 0 : r, (e = e > 0 ? 0 : e) == i.WEBAudio.lOrientation.x && o == i.WEBAudio.lOrientation.y && t == i.WEBAudio.lOrientation.z && u == i.WEBAudio.lOrientation.xUp && n == i.WEBAudio.lOrientation.yUp && r == i.WEBAudio.lOrientation.zUp || (i.WEBAudio.lOrientation.x = e, i.WEBAudio.lOrientation.y = o, i.WEBAudio.lOrientation.z = t, i.WEBAudio.lOrientation.xUp = u, i.WEBAudio.lOrientation.yUp = n, i.WEBAudio.lOrientation.zUp = r, i.WEBAudio.audioContext.listener.forwardX ? (i.WEBAudio.audioContext.listener.forwardX = -e, i.WEBAudio.audioContext.listener.forwardY = -o, i.WEBAudio.audioContext.listener.forwardZ = -t, i.WEBAudio.audioContext.listener.upX = u, i.WEBAudio.audioContext.listener.upY = n, i.WEBAudio.audioContext.listener.upZ = r) : i.WEBAudio.audioContext.listener.setOrientation(-e, -o, -t, u, n, r)))
  },
  _JS_Sound_SetListenerPosition: function(e, o, t) {
    i.WEBAudio.audioContext && 0 !== i.WEBAudio.audio3DSupport && 0 !== i.WEBAudio.audioWebSupport && 0 !== i.WEBAudio.audioWebEnabled && (o = o < 0 ? 0 : o, t = t < 0 ? 0 : t, (e = e < 0 ? 0 : e) == i.WEBAudio.lPosition.x && o == i.WEBAudio.lPosition.y && t == i.WEBAudio.lPosition.z || (i.WEBAudio.lPosition.x = e, i.WEBAudio.lPosition.y = o, i.WEBAudio.lPosition.z = t, i.WEBAudio.audioContext.listener.positionX ? (i.WEBAudio.audioContext.listener.positionX = e, i.WEBAudio.audioContext.listener.positionY = o, i.WEBAudio.audioContext.listener.positionZ = t) : i.WEBAudio.audioContext.listener.setPosition(e, o, t)))
  },
  _JS_Sound_SetLoop: function(e, o) {
    if (0 !== i.WEBAudio.audioWebEnabled) {
      var t = i.WEBAudio.audioInstances[e];
      t.source || t.setup(), t.source && t.setLoop(o > 0)
    }
  },
  _JS_Sound_SetLoopPoints: function(e, o, t) {
    if (0 !== i.WEBAudio.audioWebEnabled) {
      var u = i.WEBAudio.audioInstances[e];
      u.source || u.setup(), u.source && u.setLoopPoints(o, t)
    }
  },
  _JS_Sound_SetPaused: function(e, o) {
    if (0 !== i.WEBAudio.audioWebEnabled) {
      (0, r.debugLog)("_JS_Sound_SetPaused", e, o);
      var t = i.WEBAudio.audioInstances[e];
      !!o !== t.isPaused() && (o ? t.pause() : t.resume())
    }
  },
  _JS_Sound_SetPitch: function(e, o) {
    if (0 !== i.WEBAudio.audioWebSupport && 0 !== i.WEBAudio.audioWebEnabled) try {
      var t;
      null === (t = i.WEBAudio.audioInstances[e].source) || void 0 === t || t.setPitch(o)
    } catch (e) {
      (0, n.printErrMsg)("Invalid audio pitch ".concat(o, " specified to WebAudio backend!"))
    }
  },
  _JS_Sound_SetPosition: function(e, o, t, u) {
    0 !== i.WEBAudio.audio3DSupport && 0 !== i.WEBAudio.audioWebSupport && 0 !== i.WEBAudio.audioWebEnabled && console.error("不支持3d音效")
  },
  _JS_Sound_SetVolume: function(e, o) {
    if (0 !== i.WEBAudio.audioWebEnabled) try {
      var t = Number(o.toFixed(2)),
        u = i.WEBAudio.audioInstances[e],
        r = i.unityAudioVolume.get(u);
      if (r === t) return;
      i.unityAudioVolume.set(u, t), u.setVolume(t, null == r)
    } catch (e) {
      (0, n.printErrMsg)("Invalid audio volume ".concat(o, " specified to WebAudio backend!"))
    }
  },
  _JS_Sound_Stop: function(e, o) {
    0 !== i.WEBAudio.audioWebEnabled && ((0, r.debugLog)("_JS_Sound_Stop", e, o), i.WEBAudio.audioInstances[e].stop(o))
  },
  _JS_Sound_GetData: function(e, o, t) {
    var u;
    if (0 === i.WEBAudio.audioWebEnabled) return 0;
    var n = i.WEBAudio.audioInstances[e];
    return n && null !== (u = n.getData(o, t)) && void 0 !== u ? u : 0
  },
  _JS_Sound_GetMetaData: function(e, o, t) {
    var u, n;
    if (0 === i.WEBAudio.audioWebEnabled) return e[t >> 2] = 0, e[1 + (t >> 2)] = 0, !1;
    var r = i.WEBAudio.audioInstances[o];
    return r ? (e[t >> 2] = null !== (u = r.getNumberOfChannels()) && void 0 !== u ? u : 0, e[1 + (t >> 2)] = null !== (n = r.getFrequency()) && void 0 !== n ? n : 0, !0) : (e[t >> 2] = 0, e[1 + (t >> 2)] = 0, !1)
  },
  _JS_Sound_GetAudioBufferSampleRate: function(e) {
    var o;
    if (0 === i.WEBAudio.audioWebEnabled) return i.WEBAudio.FAKEMOD_SAMPLERATE;
    var t = i.WEBAudio.audioInstances[e];
    if (!t) return i.WEBAudio.FAKEMOD_SAMPLERATE;
    var u = t.buffer ? t.buffer : t.source ? null === (o = t.source) || void 0 === o ? void 0 : o.buffer : null;
    return u ? u.sampleRate : i.WEBAudio.FAKEMOD_SAMPLERATE
  },
  _JS_Sound_GetAudioContextSampleRate: function() {
    return 0 !== i.WEBAudio.audioWebEnabled && i.WEBAudio.audioContext ? i.WEBAudio.audioContext.sampleRate : i.WEBAudio.FAKEMOD_SAMPLERATE
  },
  _JS_Sound_GetPosition: function(e) {
    if (0 == i.WEBAudio.audioWebEnabled) return 0;
    var o = i.WEBAudio.audioInstances[e];
    if (!o) return 0;
    var t = o.source;
    return t && t.estimatePlaybackPosition ? t.estimatePlaybackPosition() : 0
  }
};