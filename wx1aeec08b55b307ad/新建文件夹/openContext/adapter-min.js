var e = require("../openContext/@babel/runtime/helpers/typeof");
! function e(t, n, r) {
  function o(a, c) {
    if (!n[a]) {
      if (!t[a]) {
        var u = "function" == typeof require && require;
        if (!c && u) return u(a, !0);
        if (i) return i(a, !0);
        throw (c = new Error("Cannot find module '" + a + "'")).code = "MODULE_NOT_FOUND", c
      }
      u = n[a] = {
        exports: {}
      }, t[a][0].call(u.exports, (function(e) {
        return o(t[a][1][e] || e)
      }), u, u.exports, e, t, n, r)
    }
    return n[a].exports
  }
  for (var i = "function" == typeof require && require, a = 0; a < r.length; a++) o(r[a]);
  return o
}({
  1: [function(e, t, n) {}, {}],
  2: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }
    var i = window.fsUtils,
      a = i.getUserDataPath,
      c = i.readJsonSync,
      u = i.makeDirSync,
      l = i.writeFileSync,
      s = i.copyFile,
      f = i.downloadFile,
      d = i.writeFile,
      p = i.deleteFile,
      h = i.rmdirSync,
      m = i.unzip,
      y = i.isOutOfStorage,
      g = !1,
      b = null,
      v = !1,
      w = [],
      _ = [],
      E = !1,
      S = 0,
      x = /^https?:\/\/.*/;
    cc.assetManager.cacheManager = n.exports = {
      cacheDir: "gamecaches",
      cachedFileName: "cacheList.json",
      cacheEnabled: !0,
      autoClear: !0,
      cacheInterval: 500,
      deleteInterval: 500,
      writeFileInterval: 2e3,
      outOfStorage: !1,
      tempFiles: null,
      cachedFiles: null,
      cacheQueue: {},
      version: "1.0",
      getCache: function(e) {
        return this.cachedFiles.has(e) ? this.cachedFiles.get(e).url : ""
      },
      getTemp: function(e) {
        return this.tempFiles.has(e) ? this.tempFiles.get(e) : ""
      },
      init: function() {
        this.cacheDir = a() + "/" + this.cacheDir;
        var e = this.cacheDir + "/" + this.cachedFileName,
          t = c(e);
        t instanceof Error || !t.version ? (t instanceof Error || h(this.cacheDir, !0), this.cachedFiles = new cc.AssetManager.Cache, u(this.cacheDir, !0), l(e, JSON.stringify({
          files: this.cachedFiles._map,
          version: this.version
        }), "utf8")) : this.cachedFiles = new cc.AssetManager.Cache(t.files), this.tempFiles = new cc.AssetManager.Cache
      },
      updateLastTime: function(e) {
        this.cachedFiles.has(e) && (this.cachedFiles.get(e).lastTime = Date.now())
      },
      _write: function() {
        v = !(b = null), d(this.cacheDir + "/" + this.cachedFileName, JSON.stringify({
          files: this.cachedFiles._map,
          version: this.version
        }), "utf8", (function() {
          v = !1;
          for (var e = 0, t = _.length; e < t; e++) _[e]();
          _.length = 0, _.push.apply(_, w), w.length = 0
        }))
      },
      writeCacheFile: function(e) {
        b || (b = setTimeout(this._write.bind(this), this.writeFileInterval), !0 !== v) ? e && _.push(e) : e && w.push(e)
      },
      _cache: function() {
        var e, t, n = this,
          r = this;
        for (e in this.cacheQueue) {
          d = void 0, t = function(t) {
            if (g = !1, t) {
              if (y(t.message)) return r.outOfStorage = !0, void(r.autoClear && r.clearLRU())
            } else r.cachedFiles.add(e, {
              bundle: c,
              url: l,
              lastTime: u
            }), delete r.cacheQueue[e], r.writeCacheFile();
            cc.js.isEmptyObject(r.cacheQueue) || (g = !0, setTimeout(r._cache.bind(r), r.cacheInterval))
          }, i = (d = n.cacheQueue[e]).srcUrl, a = d.isCopy, c = d.cacheBundleRoot, u = Date.now().toString(), l = "", l = (c ? "".concat(n.cacheDir, "/").concat(c, "/") : "".concat(n.cacheDir, "/")).concat(u).concat(S++).concat(cc.path.extname(e)), a ? s(i, l, t) : f(i, l, null, t);
          var i, a, c, u, l, d = {
            v: void 0
          };
          if ("object" === o(d)) return d.v
        }
        g = !1
      },
      cacheFile: function(e, t, n, r, o) {
        !(n = void 0 !== n ? n : this.cacheEnabled) || this.cacheQueue[e] || this.cachedFiles.has(e) || (this.cacheQueue[e] = {
          srcUrl: t,
          cacheBundleRoot: r,
          isCopy: o
        }, g) || (g = !0, this.outOfStorage ? g = !1 : setTimeout(this._cache.bind(this), this.cacheInterval))
      },
      clearCache: function() {
        var e = this,
          t = (h(this.cacheDir, !0), this.cachedFiles = new cc.AssetManager.Cache, u(this.cacheDir, !0), this.cacheDir + "/" + this.cachedFileName);
        this.outOfStorage = !1, l(t, JSON.stringify({
          files: this.cachedFiles._map,
          version: this.version
        }), "utf8"), cc.assetManager.bundles.forEach((function(t) {
          x.test(t.base) && e.makeBundleFolder(t.name)
        }))
      },
      clearLRU: function() {
        if (!E) {
          E = !0;
          var e = [],
            t = this;
          if (this.cachedFiles.forEach((function(n, r) {
              "internal" === n.bundle || t._isZipFile(r) && cc.assetManager.bundles.find((function(e) {
                return -1 !== e.base.indexOf(n.url)
              })) || e.push({
                originUrl: r,
                url: n.url,
                lastTime: n.lastTime
              })
            })), e.sort((function(e, t) {
              return e.lastTime - t.lastTime
            })), e.length = Math.floor(e.length / 3), 0 !== e.length) {
            for (var n = 0, r = e.length; n < r; n++) this.cachedFiles.remove(e[n].originUrl);
            this.writeCacheFile((function() {
              setTimeout((function n() {
                var r = e.pop();
                t._isZipFile(r.originUrl) ? (h(r.url, !0), t._deleteFileCB()) : p(r.url, t._deleteFileCB.bind(t)), 0 < e.length ? setTimeout(n, t.deleteInterval) : E = !1
              }), t.deleteInterval)
            }))
          }
        }
      },
      removeCache: function(e) {
        var t, n;
        this.cachedFiles.has(e) && (n = (t = this).cachedFiles.remove(e).url, this.writeCacheFile((function() {
          t._isZipFile(e) ? (h(n, !0), t._deleteFileCB()) : p(n, t._deleteFileCB.bind(t))
        })))
      },
      _deleteFileCB: function(e) {
        e || (this.outOfStorage = !1)
      },
      makeBundleFolder: function(e) {
        u(this.cacheDir + "/" + e, !0)
      },
      unzipAndCacheBundle: function(e, t, n, r) {
        var o = Date.now().toString(),
          i = "".concat(this.cacheDir, "/").concat(n, "/").concat(o).concat(S++),
          a = this;
        u(i, !0), m(t, i, (function(t) {
          t ? (h(i, !0), y(t.message) && (a.outOfStorage = !0, a.autoClear) && a.clearLRU(), r && r(t)) : (a.cachedFiles.add(e, {
            bundle: n,
            url: i,
            lastTime: o
          }), a.writeCacheFile(), r && r(null, i))
        }))
      },
      _isZipFile: function(e) {
        return ".zip" === e.slice(-4)
      }
    }
  }, {}],
  3: [function(e, t, n) {
    var r, o, i = e("../cache-manager"),
      a = (e = window.fsUtils).fs,
      c = e.downloadFile,
      u = e.readText,
      l = e.readArrayBuffer,
      s = e.readJson,
      f = e.loadSubpackage,
      d = e.getUserDataPath,
      p = e.exists,
      h = /^https?:\/\/.*/,
      m = {},
      y = (e = cc.assetManager.downloader, cc.assetManager.parser),
      g = cc.assetManager.presets,
      b = __globalAdapter.isSubContext,
      v = (e.maxConcurrency = 8, e.maxRequestsPerFrame = 64, g.scene.maxConcurrency = 10, g.scene.maxRequestsPerFrame = 64, {}),
      w = {};

    function _(e, t, n) {
      "function" == typeof t && (n = t, t = null), h.test(e) ? n && n(new Error("Can not load remote scripts")) : (__cocos_require__(e), n && n(null))
    }

    function E(e, t, n) {
      "function" == typeof t && (n = t, t = null), (t = ((t = cc.sys).platform === t.TAOBAO || t.platform === t.TAOBAO_MINIGAME ? window.document : document).createElement("audio")).src = e, n && n(null, t)
    }

    function S(e, t, n, r, o) {
      var a = k(e, n);
      a.inLocal ? t(a.url, n, o) : a.inCache ? (i.updateLastTime(e), t(a.url, n, (function(t, n) {
        t && i.removeCache(e), o(t, n)
      }))) : c(e, null, n.header, r, (function(r, a) {
        r ? o(r, null) : t(a, n, (function(t, r) {
          t || (i.tempFiles.add(e, a), i.cacheFile(e, a, n.cacheEnabled, n.__cacheBundleRoot__, !0)), o(t, r)
        }))
      }))
    }

    function x(e, t, n) {
      l(e, n)
    }

    function O(e, t, n) {
      u(e, n)
    }

    function T(e, t, n) {
      s(e, n)
    }
    var N = b ? function(e, t, n) {
      e = (e = k(e, t).url).slice(r.length + 1), t = __cocos_require__(cc.path.changeExtname(e, ".js")), n && n(null, t)
    } : function(e, t, n) {
      S(e, T, t, t.onFileProgress, n)
    };
    g = b ? function(e, t, n) {
      n(null, "Arial")
    } : function(e, t, n) {
      n(null, __globalAdapter.loadFont(e) || "Arial")
    };

    function M(e, t, n) {
      p(e, (function(t) {
        t ? n(null, e) : n(new Error("file ".concat(e, " does not exist!")))
      }))
    }

    function A(e, t, n) {
      S(e, M, t, t.onFileProgress, n)
    }

    function P(e, t, n) {
      l(e, (function(e, r) {
        if (e) return n(e);
        I(r, t, n)
      }))
    }

    function C(e, t, n) {
      l(e, (function(e, r) {
        if (e) return n(e);
        R(r, t, n)
      }))
    }

    function D(e, t, n) {
      l(e, (function(e, r) {
        if (e) return n(e);
        L(r, t, n)
      }))
    }
    var j, I = y.parsePVRTex,
      R = y.parseASTCTex,
      L = y.parsePKMTex,
      F = b ? function(e, t, n) {
        n(null, e = k(e, t).url)
      } : A,
      k = (e.downloadDomAudio = E, e.downloadScript = _, y.parsePVRTex = P, y.parsePKMTex = D, y.parseASTCTex = C, e.register({
        ".js": _,
        ".mp3": A,
        ".ogg": A,
        ".wav": A,
        ".m4a": A,
        ".png": F,
        ".jpg": F,
        ".bmp": F,
        ".jpeg": F,
        ".gif": F,
        ".ico": F,
        ".tiff": F,
        ".image": F,
        ".webp": F,
        ".pvr": A,
        ".pkm": A,
        ".astc": A,
        ".font": A,
        ".eot": A,
        ".ttf": A,
        ".woff": A,
        ".svg": A,
        ".ttc": A,
        ".txt": A,
        ".xml": A,
        ".vsh": A,
        ".fsh": A,
        ".atlas": A,
        ".tmx": A,
        ".tsx": A,
        ".plist": A,
        ".fnt": A,
        ".json": N,
        ".ExportJson": A,
        ".binary": A,
        ".bin": A,
        ".dbbin": A,
        ".skel": A,
        ".mp4": A,
        ".avi": A,
        ".mov": A,
        ".mpg": A,
        ".mpeg": A,
        ".rm": A,
        ".rmvb": A,
        bundle: function(e, t, n) {
          var r, u = cc.path.basename(e),
            l = t.version || cc.assetManager.downloader.bundleVers[u],
            s = l ? "".concat(l, ".") : "";
          if (v[u]) {
            var p = ((r = cc.sys).platform === r.TAOBAO_MINIGAME ? "" : "subpackages/").concat(u, "/config.").concat(s, "json"),
              y = function() {
                N(p, t, (function(e, t) {
                  var r, o;
                  (r = t) && ((o = cc.sys).platform === o.TAOBAO_MINIGAME ? r.base = "".concat(u, "/") : r.base = "subpackages/".concat(u, "/")), n(e, t)
                }))
              };
            if (m[u]) return y();
            f(u, t.onFileProgress, (function(e) {
              e ? n(e, null) : (m[u] = !0, y())
            }))
          } else {
            h.test(e) || !b && e.startsWith(d()) ? (_ = e, g = "src/scripts/".concat(u, "/index.js"), i.makeBundleFolder(u)) : w[u] ? (_ = "".concat(o, "remote/").concat(u), g = "src/scripts/".concat(u, "/index.js"), i.makeBundleFolder(u)) : (_ = "assets/".concat(u), g = "assets/".concat(u, "/index.js")), __cocos_require__(g), t.__cacheBundleRoot__ = u;
            var g, _;
            p = "".concat(_, "/config.").concat(l ? l + "." : "", "json");
            N(p, t, (function(e, r) {
              var o, u, l;
              e ? n && n(e) : r.isZip ? (e = r.zipVersion, e = "".concat(_, "/res.").concat(e ? e + "." : "", "zip"), o = e, u = t, l = function(e, t) {
                e ? n && n(e) : (r.base = t + "/res/", (e = cc.sys).platform === e.ALIPAY_GAME && e.os === e.OS_ANDROID && a.accessSync({
                  path: e = t + "res/"
                }).success && (r.base = e), n && n(null, r))
              }, (e = i.cachedFiles.get(o)) ? (i.updateLastTime(o), l && l(null, e.url)) : h.test(o) ? c(o, null, u.header, u.onFileProgress, (function(e, t) {
                e ? l && l(e) : i.unzipAndCacheBundle(o, t, u.__cacheBundleRoot__, l)
              })) : i.unzipAndCacheBundle(o, o, u.__cacheBundleRoot__, l)) : (r.base = _ + "/", n && n(null, r))
            }))
          }
        },
        default: function(e, t, n) {
          S(e, O, t, t.onFileProgress, n)
        }
      }), y.register({
        ".png": e.downloadDomImage,
        ".jpg": e.downloadDomImage,
        ".bmp": e.downloadDomImage,
        ".jpeg": e.downloadDomImage,
        ".gif": e.downloadDomImage,
        ".ico": e.downloadDomImage,
        ".tiff": e.downloadDomImage,
        ".image": e.downloadDomImage,
        ".webp": e.downloadDomImage,
        ".pvr": P,
        ".pkm": D,
        ".astc": C,
        ".font": g,
        ".eot": g,
        ".ttf": g,
        ".woff": g,
        ".svg": g,
        ".ttc": g,
        ".mp3": E,
        ".ogg": E,
        ".wav": E,
        ".m4a": E,
        ".txt": O,
        ".xml": O,
        ".vsh": O,
        ".fsh": O,
        ".atlas": O,
        ".tmx": O,
        ".tsx": O,
        ".fnt": O,
        ".plist": function(e, t, n) {
          u(e, (function(e, t) {
            var r = null;
            e || (r = cc.plistParser.parse(t)) || (e = new Error("parse failed")), n && n(e, r)
          }))
        },
        ".binary": x,
        ".bin": x,
        ".dbbin": x,
        ".skel": x,
        ".ExportJson": T
      }), b ? function(e, t) {
        return {
          url: e = h.test(e) ? e : r + "/" + e
        }
      } : function(e, t) {
        var n = !1,
          r = !1;
        return !e.startsWith(d()) && h.test(e) ? t.reload || ((t = i.cachedFiles.get(e)) ? (r = !0, e = t.url) : (t = i.tempFiles.get(e)) && (n = !0, e = t)) : n = !0, {
          url: e,
          inLocal: n,
          inCache: r
        }
      });
    b ? (j = cc.assetManager.init, cc.assetManager.init = function(e) {
      j.call(cc.assetManager, e), r = e.subContextRoot || ""
    }) : (cc.assetManager.transformPipeline.append((function(e) {
      for (var t = e.output = e.input, n = 0, r = t.length; n < r; n++) {
        var o = t[n],
          i = o.options;
        o.config ? i.__cacheBundleRoot__ = o.config.name : "bundle" !== o.ext && (i.cacheEnabled = void 0 !== i.cacheEnabled && i.cacheEnabled)
      }
    })), j = cc.assetManager.init, cc.assetManager.init = function(e) {
      j.call(cc.assetManager, e), e.subpackages && e.subpackages.forEach((function(e) {
        return v[e] = "subpackages/" + e
      })), e.remoteBundles && e.remoteBundles.forEach((function(e) {
        return w[e] = !0
      })), (o = e.server || "") && !o.endsWith("/") && (o += "/"), i.init()
    })
  }, {
    "../cache-manager": 2
  }],
  4: [function(e, t, n) {
    var r = cc.internal.inputManager,
      o = window.__globalAdapter;
    Object.assign(r, {
      setAccelerometerEnabled: function(e) {
        var t = cc.director.getScheduler();
        t.enableForTarget(this), e ? (this._registerAccelerometerEvent(), t.scheduleUpdate(this)) : (this._unregisterAccelerometerEvent(), t.unscheduleUpdate(this))
      },
      _registerAccelerometerEvent: function() {
        this._accelCurTime = 0;
        var e = this;
        this._acceleration = new cc.Acceleration, o.startAccelerometer((function(t) {
          e._acceleration.x = t.x, e._acceleration.y = t.y, e._acceleration.z = t.y
        }))
      },
      _unregisterAccelerometerEvent: function() {
        this._accelCurTime = 0, o.stopAccelerometer()
      }
    })
  }, {}],
  5: [function(e, t, n) {
    var r = cc.internal.inputManager,
      o = cc.renderer,
      i = cc.game,
      a = cc.dynamicAtlasManager,
      c = i.run;
    Object.assign(i, {
      _banRunningMainLoop: __globalAdapter.isSubContext,
      _firstSceneLaunched: !1,
      run: function() {
        var e = this;
        cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, (function() {
          e._firstSceneLaunched = !0
        })), c.apply(this, arguments)
      },
      setFrameRate: function(e) {
        this.config.frameRate = e, __globalAdapter.setPreferredFramesPerSecond ? __globalAdapter.setPreferredFramesPerSecond(e) : (this._intervalId && window.cancelAnimFrame(this._intervalId), this._intervalId = 0, this._paused = !0, this._setAnimFrame(), this._runMainLoop())
      },
      _runMainLoop: function() {
        var e, t, n, r, o, i;
        this._banRunningMainLoop || (n = (e = this).config, r = cc.director, o = !0, i = n.frameRate, cc.debug.setDisplayStats(n.showFPS), t = function() {
          e._paused || (e._intervalId = window.requestAnimFrame(t), 30 === i && !__globalAdapter.setPreferredFramesPerSecond && (o = !o)) || r.mainLoop()
        }, e._intervalId = window.requestAnimFrame(t), e._paused = !1)
      },
      _initRenderer: function() {
        var e, t;
        this._rendererInitialized || ((e = cc.sys).platform === e.TAOBAO || e.platform === e.TAOBAO_MINIGAME ? this.frame = this.container = window.document.createElement("DIV") : this.frame = this.container = document.createElement("DIV"), e = __globalAdapter.isSubContext ? window.sharedCanvas || __globalAdapter.getSharedCanvas() : e.platform === e.TAOBAO || e.platform === e.TAOBAO_MINIGAME ? window.canvas : canvas, this.canvas = e, this._determineRenderType(), this.renderType === this.RENDER_TYPE_WEBGL && (t = {
          stencil: !0,
          antialias: cc.macro.ENABLE_WEBGL_ANTIALIAS,
          alpha: cc.macro.ENABLE_TRANSPARENT_CANVAS,
          preserveDrawingBuffer: !1
        }, o.initWebGL(e, t), this._renderContext = o.device._gl, !cc.macro.CLEANUP_IMAGE_CACHE) && a && (a.enabled = !0), this._renderContext || (this.renderType = this.RENDER_TYPE_CANVAS, o.initCanvas(e), this._renderContext = o.device._ctx), this._rendererInitialized = !0)
      },
      _initEvents: function() {
        var e = cc.sys,
          t = (this.config.registerSystemEvent && r.registerSystemEvent(this.canvas), !1);
        e.platform !== e.BYTEDANCE_GAME && (__globalAdapter.onAudioInterruptionEnd && __globalAdapter.onAudioInterruptionEnd((function() {
          cc.audioEngine && cc.audioEngine._restore()
        })), __globalAdapter.onAudioInterruptionBegin) && __globalAdapter.onAudioInterruptionBegin((function() {
          cc.audioEngine && cc.audioEngine._break()
        })), __globalAdapter.onShow && __globalAdapter.onShow((function(e) {
          t && (t = !1, i.renderType === i.RENDER_TYPE_WEBGL && i._renderContext.finish(), i.emit(i.EVENT_SHOW, e))
        })), __globalAdapter.onHide && __globalAdapter.onHide((function() {
          t || (t = !0, i.emit(i.EVENT_HIDE))
        })), this.on(i.EVENT_HIDE, (function() {
          i.pause()
        })), this.on(i.EVENT_SHOW, (function() {
          i.resume()
        }))
      },
      end: function() {}
    })
  }, {}],
  6: [function(e, t, n) {
    var r = cc.internal.inputManager,
      o = {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    r && Object.assign(r, {
      _updateCanvasBoundingRect: function() {},
      registerSystemEvent: function(e) {
        if (!this._isRegisterEvent) {
          this._glView = cc.view;
          var t, n = this,
            r = {
              onTouchStart: this.handleTouchesBegin,
              onTouchMove: this.handleTouchesMove,
              onTouchEnd: this.handleTouchesEnd,
              onTouchCancel: this.handleTouchesCancel
            };
          for (t in r) ! function(e) {
            var t = r[e];
            __globalAdapter[e]((function(e) {
              e.changedTouches && t.call(n, n.getTouchesByEvent(e, o))
            }))
          }(t);
          this._isRegisterEvent = !0
        }
      }
    })
  }, {}],
  7: [function(e, t, n) {
    Object.assign(cc.screen, {
      autoFullScreen: function(e, t) {}
    })
  }, {}],
  8: [function(e, t, n) {
    var r = cc.Texture2D;
    r && Object.assign(r.prototype, {
      initWithElement: function(e) {
        e && (this._image = e, this.handleLoadedTexture())
      }
    })
  }, {}],
  9: [function(e, t, n) {
    t.exports = function(e, t) {
      var n = (t = t || __globalAdapter.getSystemInfoSync()).language || "",
        r = t.system || "iOS",
        o = t.platform || "iOS";
      e.isNative = !1, e.isBrowser = !1, e.isMobile = !0, e.language = n.substr(0, 2), e.languageCode = n.toLowerCase(), "android" === (o = o.toLowerCase()) ? e.os = e.OS_ANDROID : "ios" === o && (e.os = e.OS_IOS), r = r.toLowerCase(), n = /[\d\.]+/.exec(r = "android p" === r ? "android p 9.0" : r), e.osVersion = n ? n[0] : r, e.osMainVersion = parseInt(e.osVersion), e.browserType = null, e.browserVersion = null, o = t.windowWidth, n = t.windowHeight, r = t.pixelRatio || 1, e.windowPixelResolution = {
        width: r * o,
        height: r * n
      }, e.localStorage = window.localStorage, t = !__globalAdapter.isSubContext, o = !1;
      try {
        o = document.createElement("canvas").toDataURL("image/webp").startsWith("data:image/webp")
      } catch (e) {}
      e.capabilities = {
        canvas: !0,
        opengl: !!t,
        webp: o
      }, e.__audioSupport = {
        ONLY_ONE: !1,
        WEB_AUDIO: !1,
        DELAY_CREATE_CTX: !1,
        format: [".mp3"]
      }
    }
  }, {}],
  10: [function(e, t, n) {
    t.exports = function(e) {
      e._setupContainer = function(e, t, n) {
        var r = e._devicePixelRatio = 1;
        e.isRetinaEnabled() && (r = e._devicePixelRatio = Math.min(e._maxPixelRatio, window.devicePixelRatio || 1)), __globalAdapter.isSubContext || (n *= r, (e = cc.game.canvas).width === (t *= r) && e.height === n) || (e.width = t, e.height = n)
      }
    }
  }, {}],
  11: [function(e, t, n) {
    t.exports = function(e) {
      Object.assign(e, {
        _adjustViewportMeta: function() {},
        setRealPixelResolution: function(e, t, n) {
          this.setDesignResolutionSize(e, t, n)
        },
        enableAutoFullScreen: function(e) {
          cc.warn("cc.view.enableAutoFullScreen() is not supported on minigame platform.")
        },
        isAutoFullScreenEnabled: function() {
          return !1
        },
        setCanvasSize: function() {
          cc.warn("cc.view.setCanvasSize() is not supported on minigame platform.")
        },
        setFrameSize: function() {
          cc.warn("frame size is readonly on minigame platform.")
        },
        _initFrameSize: function() {
          var e, t = this._frameSize;
          __globalAdapter.isSubContext ? (e = window.sharedCanvas || __globalAdapter.getSharedCanvas(), t.width = e.width, t.height = e.height) : (t.width = window.innerWidth, t.height = window.innerHeight)
        }
      })
    }
  }, {}],
  12: [function(e, t, n) {
    var r = window.__globalAdapter;
    Object.assign(r, {
      adaptSys: e("./BaseSystemInfo"),
      adaptView: e("./View"),
      adaptContainerStrategy: e("./ContainerStrategy")
    })
  }, {
    "./BaseSystemInfo": 9,
    "./ContainerStrategy": 10,
    "./View": 11
  }],
  13: [function(e, t, n) {
    e("./Audio"), e("./AudioEngine"), e("./DeviceMotionEvent"), e("./Editbox"), e("./Game"), e("./InputManager"), e("./AssetManager"), e("./Screen"), e("./Texture2D"), e("./misc")
  }, {
    "./AssetManager": 3,
    "./Audio": 1,
    "./AudioEngine": 1,
    "./DeviceMotionEvent": 4,
    "./Editbox": 1,
    "./Game": 5,
    "./InputManager": 6,
    "./Screen": 7,
    "./Texture2D": 8,
    "./misc": 14
  }],
  14: [function(e, t, n) {
    cc.macro.DOWNLOAD_MAX_CONCURRENT = 10
  }, {}],
  15: [function(e, t, n) {
    var r = {
      cloneMethod: function(e, t, n, r) {
        t[n] && (e[r = r || n] = t[n].bind(t))
      },
      encode: function(e) {
        for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", n = String(e), r = "", o = 0, i = void 0; n.charAt(0 | o) || (t = "=", o % 1);) {
          o += .75;
          var a = n.charCodeAt(o);
          if (255 < a) throw new Error('"btoa" failed');
          i = i << 8 | a, r += t.charAt(63 & i >> 8 - o % 1 * 8)
        }
        return r
      },
      decode: function(e) {
        for (var t, n, r = "", o = String(e).replace(/[=]+$/, ""), i = 0, a = 0; n = o.charAt(a);) a += 1, ~(n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(n)) && (t = i % 4 ? 64 * t + n : n, i++ % 4) && (r += String.fromCharCode(255 & t >> (-2 * i & 6)));
        return r
      },
      arrayBufferToBase64: function(e) {
        return r.encode(r.arrayBufferToString(e))
      },
      base64ToArrayBuffer: function(e) {
        return r.stringToArrayBuffer(r.decode(e))
      },
      arrayBufferToString: function(e) {
        for (var t = "", n = new Uint8Array(e), r = n.byteLength, o = 0; o < r; o++) t += String.fromCharCode(n[o]);
        return t
      },
      stringToArrayBuffer: function(e) {
        for (var t = e.length, n = new Uint8Array(t), r = 0; r < t; r++) n[r] = e.charCodeAt(r);
        return n.buffer
      }
    };
    t.exports = r
  }, {}],
  16: [function(e, t, n) {
    function r(e) {
      this.options = e || {
        locator: {}
      }
    }

    function o() {
      this.cdata = !1
    }

    function i(e, t) {
      t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber
    }

    function a(e) {
      if (e) return "\n@" + (e.systemId || "") + "#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]"
    }

    function c(e, t, n) {
      return "string" == typeof e ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e, t, n) + "" : e
    }

    function u(e, t) {
      (e.currentElement || e.doc).appendChild(t)
    }
    r.prototype.parseFromString = function(e, t) {
      var n = this.options,
        r = new s,
        i = n.domBuilder || new o,
        c = n.errorHandler,
        u = n.locator,
        f = n.xmlns || {},
        d = (t = /\/x?html?$/.test(t)) ? l.entityMap : {
          lt: "<",
          gt: ">",
          amp: "&",
          quot: '"',
          apos: "'"
        };
      return u && i.setDocumentLocator(u), r.errorHandler = function(e, t, n) {
        if (!e) {
          if (t instanceof o) return t;
          e = t
        }
        var r = {},
          i = e instanceof Function;

        function c(t) {
          var o = e[t];
          !o && i && (o = 2 == e.length ? function(n) {
            e(t, n)
          } : e), r[t] = o ? function(e) {
            o("[xmldom " + t + "]\t" + e + a(n))
          } : function() {}
        }
        return n = n || {}, c("warning"), c("error"), c("fatalError"), r
      }(c, i, u), r.domBuilder = n.domBuilder || i, t && (f[""] = "http://www.w3.org/1999/xhtml"), f.xml = f.xml || "http://www.w3.org/XML/1998/namespace", e ? r.parse(e, f, d) : r.errorHandler.error("invalid doc source"), i.doc
    }, o.prototype = {
      startDocument: function() {
        this.doc = (new f).createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId)
      },
      startElement: function(e, t, n, r) {
        var o = this.doc,
          a = o.createElementNS(e, n || t),
          c = r.length;
        u(this, a), this.currentElement = a, this.locator && i(this.locator, a);
        for (var l = 0; l < c; l++) {
          e = r.getURI(l);
          var s = r.getValue(l),
            f = (n = r.getQName(l), o.createAttributeNS(e, n));
          this.locator && i(r.getLocator(l), f), f.value = f.nodeValue = s, a.setAttributeNode(f)
        }
      },
      endElement: function(e, t, n) {
        var r = this.currentElement;
        r.tagName, this.currentElement = r.parentNode
      },
      startPrefixMapping: function(e, t) {},
      endPrefixMapping: function(e) {},
      processingInstruction: function(e, t) {
        e = this.doc.createProcessingInstruction(e, t), this.locator && i(this.locator, e), u(this, e)
      },
      ignorableWhitespace: function(e, t, n) {},
      characters: function(e, t, n) {
        var r;
        (e = c.apply(this, arguments)) && (r = this.cdata ? this.doc.createCDATASection(e) : this.doc.createTextNode(e), this.currentElement ? this.currentElement.appendChild(r) : /^\s*$/.test(e) && this.doc.appendChild(r), this.locator) && i(this.locator, r)
      },
      skippedEntity: function(e) {},
      endDocument: function() {
        this.doc.normalize()
      },
      setDocumentLocator: function(e) {
        (this.locator = e) && (e.lineNumber = 0)
      },
      comment: function(e, t, n) {
        e = c.apply(this, arguments), e = this.doc.createComment(e), this.locator && i(this.locator, e), u(this, e)
      },
      startCDATA: function() {
        this.cdata = !0
      },
      endCDATA: function() {
        this.cdata = !1
      },
      startDTD: function(e, t, n) {
        var r = this.doc.implementation;
        r && r.createDocumentType && (r = r.createDocumentType(e, t, n), this.locator && i(this.locator, r), u(this, r))
      },
      warning: function(e) {
        console.warn("[xmldom warning]\t" + e, a(this.locator))
      },
      error: function(e) {
        console.error("[xmldom error]\t" + e, a(this.locator))
      },
      fatalError: function(e) {
        throw console.error("[xmldom fatalError]\t" + e, a(this.locator)), e
      }
    }, "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, (function(e) {
      o.prototype[e] = function() {
        return null
      }
    }));
    var l = e("./entities"),
      s = e("./sax").XMLReader,
      f = n.DOMImplementation = e("./dom").DOMImplementation;
    n.XMLSerializer = e("./dom").XMLSerializer, n.DOMParser = r
  }, {
    "./dom": 17,
    "./entities": 18,
    "./sax": 19
  }],
  17: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }

    function i(e, t) {
      for (var n in e) t[n] = e[n]
    }

    function a(e, t) {
      var n = e.prototype;
      if (!(n instanceof t)) {
        var r, o = function() {};
        for (r in o.prototype = t.prototype, o = new o, n) o[r] = n[r];
        e.prototype = n = o
      }
      n.constructor != e && ("function" != typeof e && console.error("unknow Class:" + e), n.constructor = e)
    }
    var c, u = {},
      l = (u.ELEMENT_NODE = 1, u.ATTRIBUTE_NODE = 2, u.TEXT_NODE = 3, u.CDATA_SECTION_NODE = 4, u.ENTITY_REFERENCE_NODE = 5, u.ENTITY_NODE = 6, u.PROCESSING_INSTRUCTION_NODE = 7, u.COMMENT_NODE = 8, u.DOCUMENT_NODE = 9, u.DOCUMENT_TYPE_NODE = 10, u.DOCUMENT_FRAGMENT_NODE = 11, u.NOTATION_NODE = 12, {}),
      s = {};

    function f(e, t) {
      var n;
      return t instanceof Error ? n = t : (n = this, Error.call(this, s[e]), this.message = s[e], Error.captureStackTrace && Error.captureStackTrace(this, f)), n.code = e, t && (this.message = this.message + ": " + t), n
    }

    function d() {}

    function p(e, t) {
      this._node = e, this._refresh = t, h(this)
    }

    function h(e) {
      var t = e._node._inc || e._node.ownerDocument._inc;
      if (e._inc != t) {
        var n, r = e._refresh(e._node);
        for (n in G(e, "length", r.length), r) e[n] = r[n];
        e._inc = t
      }
    }

    function m() {}

    function y(e, t) {
      for (var n = e.length; n--;)
        if (e[n] === t) return n
    }

    function g(e, t, n, r) {
      r ? t[y(t, r)] = n : t[t.length++] = n, e && (t = (n.ownerElement = e).ownerDocument) && (r && x(t, e, r), r = e, e = n, (n = t) && n._inc++, "http://www.w3.org/2000/xmlns/" == e.namespaceURI) && (r._nsMap[e.prefix ? e.localName : ""] = e.value)
    }

    function b(e, t, n) {
      var r = y(t, n);
      if (!(0 <= r)) throw f(8, new Error(e.tagName + "@" + n));
      for (var o, i = t.length - 1; r < i;) t[r] = t[++r];
      t.length = i, e && (o = e.ownerDocument) && (x(o, e, n), n.ownerElement = null)
    }

    function v(e) {
      if (this._features = {}, e)
        for (var t in e) this._features = e[t]
    }

    function w() {}

    function _(e) {
      return ("<" == e ? "&lt;" : ">" == e && "&gt;") || ("&" == e ? "&amp;" : '"' == e && "&quot;") || "&#" + e.charCodeAt() + ";"
    }

    function E(e, t) {
      if (t(e)) return 1;
      if (e = e.firstChild)
        do {
          if (E(e, t)) return 1
        } while (e = e.nextSibling)
    }

    function S() {}

    function x(e, t, n) {
      e && e._inc++, "http://www.w3.org/2000/xmlns/" == n.namespaceURI && delete t._nsMap[n.prefix ? n.localName : ""]
    }

    function O(e, t, n) {
      if (e && e._inc) {
        e._inc++;
        var r = t.childNodes;
        if (n) r[r.length++] = n;
        else {
          for (var o = t.firstChild, i = 0; o;) o = (r[i++] = o).nextSibling;
          r.length = i
        }
      }
    }

    function T(e, t) {
      var n = t.previousSibling,
        r = t.nextSibling;
      return n ? n.nextSibling = r : e.firstChild = r, r ? r.previousSibling = n : e.lastChild = n, O(e.ownerDocument, e), t
    }

    function N(e, t, n) {
      var r = t.parentNode;
      if (r && r.removeChild(t), 11 === t.nodeType) {
        var o = t.firstChild;
        if (null == o) return t;
        var i = t.lastChild
      } else o = i = t;
      for (r = n ? n.previousSibling : e.lastChild, o.previousSibling = r, i.nextSibling = n, r ? r.nextSibling = o : e.firstChild = o, null == n ? e.lastChild = i : n.previousSibling = i; o.parentNode = e, o !== i && (o = o.nextSibling););
      return O(e.ownerDocument || e, e), 11 == t.nodeType && (t.firstChild = t.lastChild = null), t
    }

    function M() {
      this._nsMap = {}
    }

    function A() {}

    function P() {}

    function C() {}

    function D() {}

    function j() {}

    function I() {}

    function R() {}

    function L() {}

    function F() {}

    function k() {}

    function B() {}

    function H() {}

    function W(e, t) {
      var n, r = [],
        o = 9 == this.nodeType && this.documentElement || this,
        i = o.prefix,
        a = o.namespaceURI;
      return V(this, r, e, t, n = a && null == i && null == o.lookupPrefix(a) ? [{
        namespace: a,
        prefix: null
      }] : n), r.join("")
    }

    function U(e, t, n) {
      var r = e.prefix || "",
        o = e.namespaceURI;
      if ((r || o) && ("xml" !== r || "http://www.w3.org/XML/1998/namespace" !== o) && "http://www.w3.org/2000/xmlns/" != o) {
        for (var i = n.length; i--;) {
          var a = n[i];
          if (a.prefix == r) return a.namespace != o
        }
        return 1
      }
    }

    function V(e, t, n, r, o) {
      if (r) {
        if (!(e = r(e))) return;
        if ("string" == typeof e) return void t.push(e)
      }
      switch (e.nodeType) {
        case 1:
          o = o || [];
          var i = e.attributes,
            a = i.length,
            c = e.firstChild,
            u = e.tagName;
          n = "http://www.w3.org/1999/xhtml" === e.namespaceURI || n, t.push("<", u);
          for (var l = 0; l < a; l++) "xmlns" == (s = i.item(l)).prefix ? o.push({
            prefix: s.localName,
            namespace: s.value
          }) : "xmlns" == s.nodeName && o.push({
            prefix: "",
            namespace: s.value
          });
          var s, f, d;
          for (l = 0; l < a; l++) U(s = i.item(l), 0, o) && (f = s.prefix || "", d = s.namespaceURI, t.push(f ? " xmlns:" + f : " xmlns", '="', d, '"'), o.push({
            prefix: f,
            namespace: d
          })), V(s, t, n, r, o);
          if (U(e, 0, o) && (f = e.prefix || "", d = e.namespaceURI, t.push(f ? " xmlns:" + f : " xmlns", '="', d, '"'), o.push({
              prefix: f,
              namespace: d
            })), c || n && !/^(?:meta|link|img|br|hr|input)$/i.test(u)) {
            if (t.push(">"), n && /^script$/i.test(u))
              for (; c;) c.data ? t.push(c.data) : V(c, t, n, r, o), c = c.nextSibling;
            else
              for (; c;) V(c, t, n, r, o), c = c.nextSibling;
            t.push("</", u, ">")
          } else t.push("/>");
          return;
        case 9:
        case 11:
          for (c = e.firstChild; c;) V(c, t, n, r, o), c = c.nextSibling;
          return;
        case 2:
          return t.push(" ", e.name, '="', e.value.replace(/[<&"]/g, _), '"');
        case 3:
          return t.push(e.data.replace(/[<&]/g, _));
        case 4:
          return t.push("<![CDATA[", e.data, "]]>");
        case 8:
          return t.push("\x3c!--", e.data, "--\x3e");
        case 10:
          u = e.publicId;
          var p = e.systemId;
          return t.push("<!DOCTYPE ", e.name), void(u ? (t.push(' PUBLIC "', u), p && "." != p && t.push('" "', p), t.push('">')) : p && "." != p ? t.push(' SYSTEM "', p, '">') : ((u = e.internalSubset) && t.push(" [", u, "]"), t.push(">")));
        case 7:
          return t.push("<?", e.target, " ", e.data, "?>");
        case 5:
          return t.push("&", e.nodeName, ";");
        default:
          t.push("??", e.nodeName)
      }
    }

    function G(e, t, n) {
      e[t] = n
    }
    l.INDEX_SIZE_ERR = (s[1] = "Index size error", 1), l.DOMSTRING_SIZE_ERR = (s[2] = "DOMString size error", 2), l.HIERARCHY_REQUEST_ERR = (s[3] = "Hierarchy request error", 3), l.WRONG_DOCUMENT_ERR = (s[4] = "Wrong document", 4), l.INVALID_CHARACTER_ERR = (s[5] = "Invalid character", 5), l.NO_DATA_ALLOWED_ERR = (s[6] = "No data allowed", 6), l.NO_MODIFICATION_ALLOWED_ERR = (s[7] = "No modification allowed", 7), l.NOT_FOUND_ERR = (s[8] = "Not found", 8), l.NOT_SUPPORTED_ERR = (s[9] = "Not supported", 9), l.INUSE_ATTRIBUTE_ERR = (s[10] = "Attribute in use", 10), l.INVALID_STATE_ERR = (s[11] = "Invalid state", 11), l.SYNTAX_ERR = (s[12] = "Syntax error", 12), l.INVALID_MODIFICATION_ERR = (s[13] = "Invalid modification", 13), l.NAMESPACE_ERR = (s[14] = "Invalid namespace", 14), l.INVALID_ACCESS_ERR = (s[15] = "Invalid access", 15), f.prototype = Error.prototype, i(l, f), d.prototype = {
      length: 0,
      item: function(e) {
        return this[e] || null
      },
      toString: function(e, t) {
        for (var n = [], r = 0; r < this.length; r++) V(this[r], n, e, t);
        return n.join("")
      }
    }, p.prototype.item = function(e) {
      return h(this), this[e]
    }, a(p, d), m.prototype = {
      length: 0,
      item: d.prototype.item,
      getNamedItem: function(e) {
        for (var t = this.length; t--;) {
          var n = this[t];
          if (n.nodeName == e) return n
        }
      },
      setNamedItem: function(e) {
        var t = e.ownerElement;
        if (t && t != this._ownerElement) throw new f(10);
        return t = this.getNamedItem(e.nodeName), g(this._ownerElement, this, e, t), t
      },
      setNamedItemNS: function(e) {
        var t = e.ownerElement;
        if (t && t != this._ownerElement) throw new f(10);
        return t = this.getNamedItemNS(e.namespaceURI, e.localName), g(this._ownerElement, this, e, t), t
      },
      removeNamedItem: function(e) {
        return e = this.getNamedItem(e), b(this._ownerElement, this, e), e
      },
      removeNamedItemNS: function(e, t) {
        return e = this.getNamedItemNS(e, t), b(this._ownerElement, this, e), e
      },
      getNamedItemNS: function(e, t) {
        for (var n = this.length; n--;) {
          var r = this[n];
          if (r.localName == t && r.namespaceURI == e) return r
        }
        return null
      }
    }, v.prototype = {
      hasFeature: function(e, t) {
        return !(!(e = this._features[e.toLowerCase()]) || t && !(t in e))
      },
      createDocument: function(e, t, n) {
        var r = new S;
        return r.implementation = this, r.childNodes = new d, (r.doctype = n) && r.appendChild(n), t && (n = r.createElementNS(e, t), r.appendChild(n)), r
      },
      createDocumentType: function(e, t, n) {
        var r = new I;
        return r.name = e, r.nodeName = e, r.publicId = t, r.systemId = n, r
      }
    }, w.prototype = {
      firstChild: null,
      lastChild: null,
      previousSibling: null,
      nextSibling: null,
      attributes: null,
      parentNode: null,
      childNodes: null,
      ownerDocument: null,
      nodeValue: null,
      namespaceURI: null,
      prefix: null,
      localName: null,
      insertBefore: function(e, t) {
        return N(this, e, t)
      },
      replaceChild: function(e, t) {
        this.insertBefore(e, t), t && this.removeChild(t)
      },
      removeChild: function(e) {
        return T(this, e)
      },
      appendChild: function(e) {
        return this.insertBefore(e, null)
      },
      hasChildNodes: function() {
        return null != this.firstChild
      },
      cloneNode: function(e) {
        return function e(t, n, r) {
          var i = new n.constructor;
          for (var a in n) {
            var c = n[a];
            "object" != o(c) && c != i[a] && (i[a] = c)
          }
          switch (n.childNodes && (i.childNodes = new d), i.ownerDocument = t, i.nodeType) {
            case 1:
              var u = n.attributes,
                l = i.attributes = new m,
                s = u.length;
              l._ownerElement = i;
              for (var f = 0; f < s; f++) i.setAttributeNode(e(t, u.item(f), !0));
              break;
            case 2:
              r = !0
          }
          if (r)
            for (var p = n.firstChild; p;) i.appendChild(e(t, p, r)), p = p.nextSibling;
          return i
        }(this.ownerDocument || this, this, e)
      },
      normalize: function() {
        for (var e = this.firstChild; e;) {
          var t = e.nextSibling;
          t && 3 == t.nodeType && 3 == e.nodeType ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), e = t)
        }
      },
      isSupported: function(e, t) {
        return this.ownerDocument.implementation.hasFeature(e, t)
      },
      hasAttributes: function() {
        return 0 < this.attributes.length
      },
      lookupPrefix: function(e) {
        for (var t = this; t;) {
          var n = t._nsMap;
          if (n)
            for (var r in n)
              if (n[r] == e) return r;
          t = 2 == t.nodeType ? t.ownerDocument : t.parentNode
        }
        return null
      },
      lookupNamespaceURI: function(e) {
        for (var t = this; t;) {
          var n = t._nsMap;
          if (n && e in n) return n[e];
          t = 2 == t.nodeType ? t.ownerDocument : t.parentNode
        }
        return null
      },
      isDefaultNamespace: function(e) {
        return null == this.lookupPrefix(e)
      }
    }, i(u, w), i(u, w.prototype), S.prototype = {
      nodeName: "#document",
      nodeType: 9,
      doctype: null,
      documentElement: null,
      _inc: 1,
      insertBefore: function(e, t) {
        if (11 == e.nodeType)
          for (var n = e.firstChild; n;) {
            var r = n.nextSibling;
            this.insertBefore(n, t), n = r
          } else null == this.documentElement && 1 == e.nodeType && (this.documentElement = e), N(this, e, t), e.ownerDocument = this;
        return e
      },
      removeChild: function(e) {
        return this.documentElement == e && (this.documentElement = null), T(this, e)
      },
      importNode: function(e, t) {
        return function e(t, n, r) {
          var o;
          switch (n.nodeType) {
            case 1:
              (o = n.cloneNode(!1)).ownerDocument = t;
            case 11:
              break;
            case 2:
              r = !0
          }
          if ((o = o || n.cloneNode(!1)).ownerDocument = t, o.parentNode = null, r)
            for (var i = n.firstChild; i;) o.appendChild(e(t, i, r)), i = i.nextSibling;
          return o
        }(this, e, t)
      },
      getElementById: function(e) {
        var t = null;
        return E(this.documentElement, (function(n) {
          if (1 == n.nodeType && n.getAttribute("id") == e) return t = n, !0
        })), t
      },
      createElement: function(e) {
        var t = new M;
        return t.ownerDocument = this, t.nodeName = e, t.tagName = e, t.childNodes = new d, (t.attributes = new m)._ownerElement = t
      },
      createDocumentFragment: function() {
        var e = new k;
        return e.ownerDocument = this, e.childNodes = new d, e
      },
      createTextNode: function(e) {
        var t = new C;
        return t.ownerDocument = this, t.appendData(e), t
      },
      createComment: function(e) {
        var t = new D;
        return t.ownerDocument = this, t.appendData(e), t
      },
      createCDATASection: function(e) {
        var t = new j;
        return t.ownerDocument = this, t.appendData(e), t
      },
      createProcessingInstruction: function(e, t) {
        var n = new B;
        return n.ownerDocument = this, n.tagName = n.target = e, n.nodeValue = n.data = t, n
      },
      createAttribute: function(e) {
        var t = new A;
        return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t
      },
      createEntityReference: function(e) {
        var t = new F;
        return t.ownerDocument = this, t.nodeName = e, t
      },
      createElementNS: function(e, t) {
        var n = new M,
          r = t.split(":"),
          o = n.attributes = new m;
        return n.childNodes = new d, n.ownerDocument = this, n.nodeName = t, n.tagName = t, n.namespaceURI = e, 2 == r.length ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, o._ownerElement = n
      },
      createAttributeNS: function(e, t) {
        var n = new A,
          r = t.split(":");
        return n.ownerDocument = this, n.nodeName = t, n.name = t, n.namespaceURI = e, n.specified = !0, 2 == r.length ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, n
      }
    }, a(S, w), S.prototype.getElementsByTagName = (M.prototype = {
      nodeType: 1,
      hasAttribute: function(e) {
        return null != this.getAttributeNode(e)
      },
      getAttribute: function(e) {
        return (e = this.getAttributeNode(e)) && e.value || ""
      },
      getAttributeNode: function(e) {
        return this.attributes.getNamedItem(e)
      },
      setAttribute: function(e, t) {
        (e = this.ownerDocument.createAttribute(e)).value = e.nodeValue = "" + t, this.setAttributeNode(e)
      },
      removeAttribute: function(e) {
        (e = this.getAttributeNode(e)) && this.removeAttributeNode(e)
      },
      appendChild: function(e) {
        return 11 === e.nodeType ? this.insertBefore(e, null) : (t = this, (n = (e = e).parentNode) && (r = t.lastChild, n.removeChild(e), r = t.lastChild), r = t.lastChild, e.parentNode = t, e.previousSibling = r, e.nextSibling = null, r ? r.nextSibling = e : t.firstChild = e, t.lastChild = e, O(t.ownerDocument, t, e), e);
        var t, n, r
      },
      setAttributeNode: function(e) {
        return this.attributes.setNamedItem(e)
      },
      setAttributeNodeNS: function(e) {
        return this.attributes.setNamedItemNS(e)
      },
      removeAttributeNode: function(e) {
        return this.attributes.removeNamedItem(e.nodeName)
      },
      removeAttributeNS: function(e, t) {
        (e = this.getAttributeNodeNS(e, t)) && this.removeAttributeNode(e)
      },
      hasAttributeNS: function(e, t) {
        return null != this.getAttributeNodeNS(e, t)
      },
      getAttributeNS: function(e, t) {
        return (e = this.getAttributeNodeNS(e, t)) && e.value || ""
      },
      setAttributeNS: function(e, t, n) {
        (e = this.ownerDocument.createAttributeNS(e, t)).value = e.nodeValue = "" + n, this.setAttributeNode(e)
      },
      getAttributeNodeNS: function(e, t) {
        return this.attributes.getNamedItemNS(e, t)
      },
      getElementsByTagName: function(e) {
        return new p(this, (function(t) {
          var n = [];
          return E(t, (function(r) {
            r === t || 1 != r.nodeType || "*" !== e && r.tagName != e || n.push(r)
          })), n
        }))
      },
      getElementsByTagNameNS: function(e, t) {
        return new p(this, (function(n) {
          var r = [];
          return E(n, (function(o) {
            o === n || 1 !== o.nodeType || "*" !== e && o.namespaceURI !== e || "*" !== t && o.localName != t || r.push(o)
          })), r
        }))
      }
    }).getElementsByTagName, S.prototype.getElementsByTagNameNS = M.prototype.getElementsByTagNameNS, a(M, w), A.prototype.nodeType = 2, a(A, w), P.prototype = {
      data: "",
      substringData: function(e, t) {
        return this.data.substring(e, e + t)
      },
      appendData: function(e) {
        e = this.data + e, this.nodeValue = this.data = e, this.length = e.length
      },
      insertData: function(e, t) {
        this.replaceData(e, 0, t)
      },
      appendChild: function(e) {
        throw new Error(s[3])
      },
      deleteData: function(e, t) {
        this.replaceData(e, t, "")
      },
      replaceData: function(e, t, n) {
        var r = this.data.substring(0, e);
        e = this.data.substring(e + t);
        this.nodeValue = this.data = n = r + n + e, this.length = n.length
      }
    }, a(P, w), C.prototype = {
      nodeName: "#text",
      nodeType: 3,
      splitText: function(e) {
        var t = (n = this.data).substring(e),
          n = n.substring(0, e);
        this.data = this.nodeValue = n, this.length = n.length, e = this.ownerDocument.createTextNode(t);
        return this.parentNode && this.parentNode.insertBefore(e, this.nextSibling), e
      }
    }, a(C, P), D.prototype = {
      nodeName: "#comment",
      nodeType: 8
    }, a(D, P), j.prototype = {
      nodeName: "#cdata-section",
      nodeType: 4
    }, a(j, P), I.prototype.nodeType = 10, a(I, w), R.prototype.nodeType = 12, a(R, w), L.prototype.nodeType = 6, a(L, w), F.prototype.nodeType = 5, a(F, w), k.prototype.nodeName = "#document-fragment", k.prototype.nodeType = 11, a(k, w), B.prototype.nodeType = 7, a(B, w), H.prototype.serializeToString = function(e, t, n) {
      return W.call(e, t, n)
    }, w.prototype.toString = W;
    try {
      Object.defineProperty && (c = function e(t) {
        switch (t.nodeType) {
          case 1:
          case 11:
            var n = [];
            for (t = t.firstChild; t;) 7 !== t.nodeType && 8 !== t.nodeType && n.push(e(t)), t = t.nextSibling;
            return n.join("");
          default:
            return t.nodeValue
        }
      }, Object.defineProperty(p.prototype, "length", {
        get: function() {
          return h(this), this.$$length
        }
      }), Object.defineProperty(w.prototype, "textContent", {
        get: function() {
          return c(this)
        },
        set: function(e) {
          switch (this.nodeType) {
            case 1:
            case 11:
              for (; this.firstChild;) this.removeChild(this.firstChild);
              (e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
              break;
            default:
              this.data = e, this.value = e, this.nodeValue = e
          }
        }
      }), G = function(e, t, n) {
        e["$$" + t] = n
      })
    } catch (r) {}
    r.DOMImplementation = v, r.XMLSerializer = H
  }, {}],
  18: [function(e, t, n) {
    n.entityMap = {
      lt: "<",
      gt: ">",
      amp: "&",
      quot: '"',
      apos: "'",
      Agrave: "À",
      Aacute: "Á",
      Acirc: "Â",
      Atilde: "Ã",
      Auml: "Ä",
      Aring: "Å",
      AElig: "Æ",
      Ccedil: "Ç",
      Egrave: "È",
      Eacute: "É",
      Ecirc: "Ê",
      Euml: "Ë",
      Igrave: "Ì",
      Iacute: "Í",
      Icirc: "Î",
      Iuml: "Ï",
      ETH: "Ð",
      Ntilde: "Ñ",
      Ograve: "Ò",
      Oacute: "Ó",
      Ocirc: "Ô",
      Otilde: "Õ",
      Ouml: "Ö",
      Oslash: "Ø",
      Ugrave: "Ù",
      Uacute: "Ú",
      Ucirc: "Û",
      Uuml: "Ü",
      Yacute: "Ý",
      THORN: "Þ",
      szlig: "ß",
      agrave: "à",
      aacute: "á",
      acirc: "â",
      atilde: "ã",
      auml: "ä",
      aring: "å",
      aelig: "æ",
      ccedil: "ç",
      egrave: "è",
      eacute: "é",
      ecirc: "ê",
      euml: "ë",
      igrave: "ì",
      iacute: "í",
      icirc: "î",
      iuml: "ï",
      eth: "ð",
      ntilde: "ñ",
      ograve: "ò",
      oacute: "ó",
      ocirc: "ô",
      otilde: "õ",
      ouml: "ö",
      oslash: "ø",
      ugrave: "ù",
      uacute: "ú",
      ucirc: "û",
      uuml: "ü",
      yacute: "ý",
      thorn: "þ",
      yuml: "ÿ",
      nbsp: " ",
      iexcl: "¡",
      cent: "¢",
      pound: "£",
      curren: "¤",
      yen: "¥",
      brvbar: "¦",
      sect: "§",
      uml: "¨",
      copy: "©",
      ordf: "ª",
      laquo: "«",
      not: "¬",
      shy: "­­",
      reg: "®",
      macr: "¯",
      deg: "°",
      plusmn: "±",
      sup2: "²",
      sup3: "³",
      acute: "´",
      micro: "µ",
      para: "¶",
      middot: "·",
      cedil: "¸",
      sup1: "¹",
      ordm: "º",
      raquo: "»",
      frac14: "¼",
      frac12: "½",
      frac34: "¾",
      iquest: "¿",
      times: "×",
      divide: "÷",
      forall: "∀",
      part: "∂",
      exist: "∃",
      empty: "∅",
      nabla: "∇",
      isin: "∈",
      notin: "∉",
      ni: "∋",
      prod: "∏",
      sum: "∑",
      minus: "−",
      lowast: "∗",
      radic: "√",
      prop: "∝",
      infin: "∞",
      ang: "∠",
      and: "∧",
      or: "∨",
      cap: "∩",
      cup: "∪",
      int: "∫",
      there4: "∴",
      sim: "∼",
      cong: "≅",
      asymp: "≈",
      ne: "≠",
      equiv: "≡",
      le: "≤",
      ge: "≥",
      sub: "⊂",
      sup: "⊃",
      nsub: "⊄",
      sube: "⊆",
      supe: "⊇",
      oplus: "⊕",
      otimes: "⊗",
      perp: "⊥",
      sdot: "⋅",
      Alpha: "Α",
      Beta: "Β",
      Gamma: "Γ",
      Delta: "Δ",
      Epsilon: "Ε",
      Zeta: "Ζ",
      Eta: "Η",
      Theta: "Θ",
      Iota: "Ι",
      Kappa: "Κ",
      Lambda: "Λ",
      Mu: "Μ",
      Nu: "Ν",
      Xi: "Ξ",
      Omicron: "Ο",
      Pi: "Π",
      Rho: "Ρ",
      Sigma: "Σ",
      Tau: "Τ",
      Upsilon: "Υ",
      Phi: "Φ",
      Chi: "Χ",
      Psi: "Ψ",
      Omega: "Ω",
      alpha: "α",
      beta: "β",
      gamma: "γ",
      delta: "δ",
      epsilon: "ε",
      zeta: "ζ",
      eta: "η",
      theta: "θ",
      iota: "ι",
      kappa: "κ",
      lambda: "λ",
      mu: "μ",
      nu: "ν",
      xi: "ξ",
      omicron: "ο",
      pi: "π",
      rho: "ρ",
      sigmaf: "ς",
      sigma: "σ",
      tau: "τ",
      upsilon: "υ",
      phi: "φ",
      chi: "χ",
      psi: "ψ",
      omega: "ω",
      thetasym: "ϑ",
      upsih: "ϒ",
      piv: "ϖ",
      OElig: "Œ",
      oelig: "œ",
      Scaron: "Š",
      scaron: "š",
      Yuml: "Ÿ",
      fnof: "ƒ",
      circ: "ˆ",
      tilde: "˜",
      ensp: " ",
      emsp: " ",
      thinsp: " ",
      zwnj: "‌",
      zwj: "‍",
      lrm: "‎",
      rlm: "‏",
      ndash: "–",
      mdash: "—",
      lsquo: "‘",
      rsquo: "’",
      sbquo: "‚",
      ldquo: "“",
      rdquo: "”",
      bdquo: "„",
      dagger: "†",
      Dagger: "‡",
      bull: "•",
      hellip: "…",
      permil: "‰",
      prime: "′",
      Prime: "″",
      lsaquo: "‹",
      rsaquo: "›",
      oline: "‾",
      euro: "€",
      trade: "™",
      larr: "←",
      uarr: "↑",
      rarr: "→",
      darr: "↓",
      harr: "↔",
      crarr: "↵",
      lceil: "⌈",
      rceil: "⌉",
      lfloor: "⌊",
      rfloor: "⌋",
      loz: "◊",
      spades: "♠",
      clubs: "♣",
      hearts: "♥",
      diams: "♦"
    }
  }, {}],
  19: [function(e, t, n) {
    var r = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
      o = new RegExp("[\\-\\.0-9" + r.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"),
      i = new RegExp("^" + r.source + o.source + "*(?::" + r.source + o.source + "*)?$");

    function a() {}

    function c(e, t) {
      return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t
    }

    function u(e, t, n) {
      for (var r = e.tagName, o = null, i = e.length; i--;) {
        var a = e[i],
          c = a.qName,
          u = a.value;
        c = 0 < (f = c.indexOf(":")) ? (s = a.prefix = c.slice(0, f), d = c.slice(f + 1), "xmlns" === s && d) : (s = null, "xmlns" === (d = c) && "");
        a.localName = d, !1 !== c && (null == o && (o = {}, l(n, n = {})), n[c] = o[c] = u, a.uri = "http://www.w3.org/2000/xmlns/", t.startPrefixMapping(c, u))
      }
      var s;
      for (i = e.length; i--;)(s = (a = e[i]).prefix) && ("xml" === s && (a.uri = "http://www.w3.org/XML/1998/namespace"), "xmlns" !== s) && (a.uri = n[s || ""]);
      var f, d = 0 < (f = r.indexOf(":")) ? (s = e.prefix = r.slice(0, f), e.localName = r.slice(f + 1)) : (s = null, e.localName = r),
        p = e.uri = n[s || ""];
      if (t.startElement(p, d, r, e), !e.closed) return e.currentNSMap = n, e.localNSMap = o, 1;
      if (t.endElement(p, d, r), o)
        for (s in o) t.endPrefixMapping(s)
    }

    function l(e, t) {
      for (var n in e) t[n] = e[n]
    }

    function s(e) {}
    a.prototype = {
      parse: function(e, t, n) {
        var r = this.domBuilder;
        r.startDocument(), l(t, t = {}),
          function(e, t, n, r, o) {
            function i(e) {
              var t = e.slice(1, -1);
              return t in n ? n[t] : "#" === t.charAt(0) ? 65535 < (t = parseInt(t.substr(1).replace("x", "0x"))) ? (t -= 65536, String.fromCharCode(55296 + (t >> 10), 56320 + (1023 & t))) : String.fromCharCode(t) : (o.error("entity not found:" + e), e)
            }

            function a(t) {
              var n;
              g < t && (n = e.substring(g, t).replace(/&#?\w+;/g, i), h && l(g), r.characters(n, 0, t - g), g = t)
            }

            function l(t, n) {
              for (; d <= t && (n = p.exec(e));) f = n.index, d = f + n[0].length, h.lineNumber++;
              h.columnNumber = t - f + 1
            }
            for (var f = 0, d = 0, p = /.*(?:\r\n?|\n)|.*$/g, h = r.locator, m = [{
                currentNSMap: t
              }], y = {}, g = 0;;) {
              try {
                var b, v, w = e.indexOf("<", g);
                if (w < 0) return e.substr(g).match(/^\s*$/) || (v = (b = r.doc).createTextNode(e.substr(g)), b.appendChild(v), r.currentElement = v);
                switch (g < w && a(w), e.charAt(w + 1)) {
                  case "/":
                    var _ = e.indexOf(">", w + 3),
                      E = e.substring(w + 2, _),
                      S = m.pop(),
                      x = (_ < 0 ? (E = e.substring(w + 2).replace(/[\s<].*/, ""), o.error("end tag name: " + E + " is not complete:" + S.tagName), _ = w + 1 + E.length) : E.match(/\s</) && (E = E.replace(/[\s<].*/, ""), o.error("end tag name: " + E + " maybe not complete"), _ = w + 1 + E.length), S.localNSMap),
                      O = S.tagName == E;
                    if (O || S.tagName && S.tagName.toLowerCase() == E.toLowerCase()) {
                      if (r.endElement(S.uri, S.localName, E), x)
                        for (var T in x) r.endPrefixMapping(T);
                      O || o.fatalError("end tag name: " + E + " is not match the current start tagName:" + S.tagName)
                    } else m.push(S);
                    _++;
                    break;
                  case "?":
                    h && l(w), _ = function(e, t, n) {
                      var r = e.indexOf("?>", t);
                      return r && (e = e.substring(t, r).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/)) ? (e[0].length, n.processingInstruction(e[1], e[2]), r + 2) : -1
                    }(e, w, r);
                    break;
                  case "!":
                    h && l(w), _ = function(e, t, n, r) {
                      if ("-" === e.charAt(t + 2)) return "-" === e.charAt(t + 3) ? t < (i = e.indexOf("--\x3e", t + 4)) ? (n.comment(e, t + 4, i - t - 4), i + 3) : (r.error("Unclosed comment"), -1) : -1;
                      if ("CDATA[" == e.substr(t + 3, 6)) return i = e.indexOf("]]>", t + 9), n.startCDATA(), n.characters(e, t + 9, i - t - 9), n.endCDATA(), i + 3;
                      var o, i = (r = function(e, t) {
                        var n, r = [],
                          o = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
                        for (o.lastIndex = t, o.exec(e); n = o.exec(e);)
                          if (r.push(n), n[1]) return r
                      }(e, t)).length;
                      return 1 < i && /!doctype/i.test(r[0][0]) ? (e = r[1][0], t = 3 < i && /^public$/i.test(r[2][0]) && r[3][0], o = 4 < i && r[4][0], r = r[i - 1], n.startDTD(e, t && t.replace(/^(['"])(.*?)\1$/, "$2"), o && o.replace(/^(['"])(.*?)\1$/, "$2")), n.endDTD(), r.index + r[0].length) : -1
                    }(e, w, r, o);
                    break;
                  default:
                    h && l(w);
                    var N = new s,
                      M = m[m.length - 1].currentNSMap,
                      A = (_ = function(e, t, n, r, o, i) {
                        for (var a, c = ++t, u = 0;;) {
                          var l = e.charAt(c);
                          switch (l) {
                            case "=":
                              if (1 === u) a = e.slice(t, c);
                              else if (2 !== u) throw new Error("attribute equal must after attrName");
                              u = 3;
                              break;
                            case "'":
                            case '"':
                              if (3 === u || 1 === u) {
                                if (1 === u && (i.warning('attribute value must after "="'), a = e.slice(t, c)), t = c + 1, !(0 < (c = e.indexOf(l, t)))) throw new Error("attribute value no end '" + l + "' match");
                                s = e.slice(t, c).replace(/&#?\w+;/g, o), n.add(a, s, t - 1)
                              } else {
                                if (4 != u) throw new Error('attribute value must after "="');
                                s = e.slice(t, c).replace(/&#?\w+;/g, o), n.add(a, s, t), i.warning('attribute "' + a + '" missed start quot(' + l + ")!!"), t = c + 1
                              }
                              u = 5;
                              break;
                            case "/":
                              switch (u) {
                                case 0:
                                  n.setTagName(e.slice(t, c));
                                case 5:
                                case 6:
                                case 7:
                                  u = 7, n.closed = !0;
                                case 4:
                                case 1:
                                case 2:
                                  break;
                                default:
                                  throw new Error("attribute invalid close char('/')")
                              }
                              break;
                            case "":
                              return i.error("unexpected end of input"), 0 == u && n.setTagName(e.slice(t, c)), c;
                            case ">":
                              switch (u) {
                                case 0:
                                  n.setTagName(e.slice(t, c));
                                case 5:
                                case 6:
                                case 7:
                                  break;
                                case 4:
                                case 1:
                                  "/" === (s = e.slice(t, c)).slice(-1) && (n.closed = !0, s = s.slice(0, -1));
                                case 2:
                                  2 === u && (s = a), 4 == u ? (i.warning('attribute "' + s + '" missed quot(")!!'), n.add(a, s.replace(/&#?\w+;/g, o), t)) : ("http://www.w3.org/1999/xhtml" === r[""] && s.match(/^(?:disabled|checked|selected)$/i) || i.warning('attribute "' + s + '" missed value!! "' + s + '" instead!!'), n.add(s, s, t));
                                  break;
                                case 3:
                                  throw new Error("attribute value missed!!")
                              }
                              return c;
                            case "":
                              l = " ";
                            default:
                              if (l <= " ") switch (u) {
                                case 0:
                                  n.setTagName(e.slice(t, c)), u = 6;
                                  break;
                                case 1:
                                  a = e.slice(t, c), u = 2;
                                  break;
                                case 4:
                                  var s = e.slice(t, c).replace(/&#?\w+;/g, o);
                                  i.warning('attribute "' + s + '" missed quot(")!!'), n.add(a, s, t);
                                case 5:
                                  u = 6
                              } else switch (u) {
                                case 2:
                                  n.tagName, "http://www.w3.org/1999/xhtml" === r[""] && a.match(/^(?:disabled|checked|selected)$/i) || i.warning('attribute "' + a + '" missed value!! "' + a + '" instead2!!'), n.add(a, a, t), t = c, u = 1;
                                  break;
                                case 5:
                                  i.warning('attribute space is required"' + a + '"!!');
                                case 6:
                                  u = 1, t = c;
                                  break;
                                case 3:
                                  u = 4, t = c;
                                  break;
                                case 7:
                                  throw new Error("elements closed character '/' and '>' must be connected to")
                              }
                          }
                          c++
                        }
                      }(e, w, N, M, i, o), N.length);
                    if (!N.closed && function(e, t, n, r) {
                        var o = r[n];
                        return null == o && ((o = e.lastIndexOf("</" + n + ">")) < t && (o = e.lastIndexOf("</" + n)), r[n] = o), o < t
                      }(e, _, N.tagName, y) && (N.closed = !0, n.nbsp || o.warning("unclosed xml attribute")), h && A) {
                      for (var P = c(h, {}), C = 0; C < A; C++) {
                        var D = N[C];
                        l(D.offset), D.locator = c(h, {})
                      }
                      r.locator = P, u(N, r, M) && m.push(N), r.locator = h
                    } else u(N, r, M) && m.push(N);
                    "http://www.w3.org/1999/xhtml" !== N.uri || N.closed ? _++ : _ = function(e, t, n, r, o) {
                      if (/^(?:script|textarea)$/i.test(n)) {
                        var i = e.indexOf("</" + n + ">", t);
                        e = e.substring(t + 1, i);
                        if (/[&<]/.test(e)) return /^script$/i.test(n) || (e = e.replace(/&#?\w+;/g, r)), o.characters(e, 0, e.length), i
                      }
                      return t + 1
                    }(e, _, N.tagName, i, r)
                }
              } catch (t) {
                o.error("element parse error: " + t), _ = -1
              }
              g < _ ? g = _ : a(Math.max(w, g) + 1)
            }
          }(e, t, n, r, this.errorHandler), r.endDocument()
      }
    }, s.prototype = {
      setTagName: function(e) {
        if (!i.test(e)) throw new Error("invalid tagName:" + e);
        this.tagName = e
      },
      add: function(e, t, n) {
        if (!i.test(e)) throw new Error("invalid attribute:" + e);
        this[this.length++] = {
          qName: e,
          value: t,
          offset: n
        }
      },
      length: 0,
      getLocalName: function(e) {
        return this[e].localName
      },
      getLocator: function(e) {
        return this[e].locator
      },
      getQName: function(e) {
        return this[e].qName
      },
      getURI: function(e) {
        return this[e].uri
      },
      getValue: function(e) {
        return this[e].value
      }
    }, n.XMLReader = a
  }, {}],
  20: [function(e, t, n) {
    var r = GameGlobal,
      o = r.__globalAdapter = {};
    Object.assign(o, {
      init: function() {
        e("./wrapper/builtin"), r.DOMParser = e("../../common/xmldom/dom-parser").DOMParser, e("./wrapper/unify"), e("./wrapper/fs-utils"), e("../../common/engine/globalAdapter"), e("./wrapper/systemInfo")
      },
      adaptEngine: function() {
        e("./wrapper/error-reporter"), e("../../common/engine"), e("./wrapper/engine"), e("./wrapper/sub-context-adapter")
      }
    })
  }, {
    "../../common/engine": 13,
    "../../common/engine/globalAdapter": 12,
    "../../common/xmldom/dom-parser": 16,
    "./wrapper/builtin": 43,
    "./wrapper/engine": 50,
    "./wrapper/error-reporter": 52,
    "./wrapper/fs-utils": 53,
    "./wrapper/sub-context-adapter": 54,
    "./wrapper/systemInfo": 55,
    "./wrapper/unify": 56
  }],
  21: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }

    function i(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function(e) {
          return e = function(e, t) {
            if ("object" !== o(e) || null === e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 === n) return String(e);
            if ("object" !== o(n = n.call(e, t))) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.")
          }(e, "string"), "symbol" === o(e) ? e : String(e)
        }(r.key), r)
      }
    }

    function a() {
      return (a = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(e, t, n) {
        var r = function(e, t) {
          for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = l(e)););
          return e
        }(e, t);
        if (r) return (r = Object.getOwnPropertyDescriptor(r, t)).get ? r.get.call(arguments.length < 3 ? e : n) : r.value
      }).apply(this, arguments)
    }

    function c(e, t) {
      return (c = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
        return e.__proto__ = t, e
      })(e, t)
    }

    function u(e) {
      var t = function() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
        } catch (e) {
          return !1
        }
      }();
      return function() {
        var n, r = l(e);
        n = t ? (n = l(this).constructor, Reflect.construct(r, arguments, n)) : r.apply(this, arguments), r = this;
        if (n && ("object" === o(n) || "function" == typeof n)) return n;
        if (void 0 !== n) throw new TypeError("Derived constructors may only return object or undefined");
        if (void 0 !== r) return r;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
    }

    function l(e) {
      return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e)
      })(e)
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.default = void 0, t = (t = t("./HTMLAudioElement")) && t.__esModule ? t : {
      default: t
    };
    var s = 1,
      f = {};
    t = function(e) {
      var t = r;
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && c(t, e);
      var n = u(r);

      function r(e) {
        var t;
        if (!(this instanceof r)) throw new TypeError("Cannot call a class as a function");
        (t = n.call(this))._$sn = s++, t.HAVE_NOTHING = 0, t.HAVE_METADATA = 1, t.HAVE_CURRENT_DATA = 2, t.HAVE_FUTURE_DATA = 3, t.HAVE_ENOUGH_DATA = 4, t.readyState = 0;
        var o = wx.createInnerAudioContext();
        return f[t._$sn] = o, t._canplayEvents = ["load", "loadend", "canplay", "canplaythrough", "loadedmetadata"], o.onCanplay((function() {
          t._loaded = !0, t.readyState = t.HAVE_CURRENT_DATA, t._canplayEvents.forEach((function(e) {
            t.dispatchEvent({
              type: e
            })
          }))
        })), o.onPlay((function() {
          t._paused = f[t._$sn].paused, t.dispatchEvent({
            type: "play"
          })
        })), o.onPause((function() {
          t._paused = f[t._$sn].paused, t.dispatchEvent({
            type: "pause"
          })
        })), o.onEnded((function() {
          t._paused = f[t._$sn].paused, !1 === f[t._$sn].loop && t.dispatchEvent({
            type: "ended"
          }), t.readyState = 4
        })), o.onError((function() {
          t._paused = f[t._$sn].paused, t.dispatchEvent({
            type: "error"
          })
        })), e ? t.src = e : t._src = "", t._loop = o.loop, t._autoplay = o.autoplay, t._paused = o.paused, t._volume = o.volume, t._muted = !1, t
      }
      return t = r, (e = [{
        key: "addEventListener",
        value: function(e, t) {
          var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
          a(l(r.prototype), "addEventListener", this).call(this, e, t, n), e = String(e).toLowerCase(), this._loaded && -1 !== this._canplayEvents.indexOf(e) && this.dispatchEvent({
            type: e
          })
        }
      }, {
        key: "load",
        value: function() {}
      }, {
        key: "play",
        value: function() {
          f[this._$sn].play()
        }
      }, {
        key: "resume",
        value: function() {
          f[this._$sn].resume()
        }
      }, {
        key: "pause",
        value: function() {
          f[this._$sn].pause()
        }
      }, {
        key: "stop",
        value: function() {
          f[this._$sn].stop()
        }
      }, {
        key: "destroy",
        value: function() {
          f[this._$sn].destroy()
        }
      }, {
        key: "canPlayType",
        value: function() {
          var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
          return "string" == typeof e && (-1 < e.indexOf("audio/mpeg") || e.indexOf("audio/mp4")) ? "probably" : ""
        }
      }, {
        key: "currentTime",
        get: function() {
          return f[this._$sn].currentTime
        },
        set: function(e) {
          f[this._$sn].seek(e)
        }
      }, {
        key: "duration",
        get: function() {
          return f[this._$sn].duration
        }
      }, {
        key: "src",
        get: function() {
          return this._src
        },
        set: function(e) {
          this._src = e, this._loaded = !1, this.readyState = this.HAVE_NOTHING, f[this._$sn].src = e
        }
      }, {
        key: "loop",
        get: function() {
          return this._loop
        },
        set: function(e) {
          this._loop = e, f[this._$sn].loop = e
        }
      }, {
        key: "autoplay",
        get: function() {
          return this.autoplay
        },
        set: function(e) {
          this._autoplay = e, f[this._$sn].autoplay = e
        }
      }, {
        key: "paused",
        get: function() {
          return this._paused
        }
      }, {
        key: "volume",
        get: function() {
          return this._volume
        },
        set: function(e) {
          this._volume = e, this._muted || (f[this._$sn].volume = e)
        }
      }, {
        key: "muted",
        get: function() {
          return this._muted
        },
        set: function(e) {
          this._muted = e, f[this._$sn].volume = e ? 0 : this._volume
        }
      }, {
        key: "cloneNode",
        value: function() {
          var e = new r;
          return e.loop = this.loop, e.autoplay = this.autoplay, e.src = this.src, e
        }
      }]) && i(t.prototype, e), Object.defineProperty(t, "prototype", {
        writable: !1
      }), r
    }(t.default);
    r.default = t, n.exports = r.default
  }, {
    "./HTMLAudioElement": 29
  }],
  22: [function(e, t, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = function() {
      var e = o && wx.__first__canvas || wx.createCanvas();
      return o = !1, e.type = "canvas", e.getContext, e.getBoundingClientRect = function() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        }
      }, e.style = {
        top: "0px",
        left: "0px",
        width: r.innerWidth + "px",
        height: r.innerHeight + "px"
      }, e.addEventListener = function(e, t) {
        document.addEventListener(e, t, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {})
      }, e.removeEventListener = function(e, t) {
        document.removeEventListener(e, t)
      }, e.dispatchEvent = function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        console.log("canvas.dispatchEvent", e.type, e)
      }, Object.defineProperty(e, "clientWidth", {
        enumerable: !0,
        get: function() {
          return r.innerWidth
        }
      }), Object.defineProperty(e, "clientHeight", {
        enumerable: !0,
        get: function() {
          return r.innerHeight
        }
      }), e
    };
    var r = e("./WindowProperties"),
      o = !0;
    t.exports = n.default
  }, {
    "./WindowProperties": 40
  }],
  23: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }

    function i(e, t) {
      return (i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
        return e.__proto__ = t, e
      })(e, t)
    }

    function a(e) {
      var t = function() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
        } catch (e) {
          return !1
        }
      }();
      return function() {
        var n, r = c(e);
        n = t ? (n = c(this).constructor, Reflect.construct(r, arguments, n)) : r.apply(this, arguments), r = this;
        if (n && ("object" === o(n) || "function" == typeof n)) return n;
        if (void 0 !== n) throw new TypeError("Derived constructors may only return object or undefined");
        if (void 0 !== r) return r;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
    }

    function c(e) {
      return (c = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e)
      })(e)
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.default = void 0, t = function(e) {
      var t = r;
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && i(t, e);
      var n = a(r);

      function r() {
        var e;
        if (this instanceof r) return (e = n.call(this)).className = "", e.children = [], e;
        throw new TypeError("Cannot call a class as a function")
      }
      return t = r, Object.defineProperty(t, "prototype", {
        writable: !1
      }), t
    }(((t = t("./Node")) && t.__esModule ? t : {
      default: t
    }).default), r.default = t, n.exports = r.default
  }, {
    "./Node": 37
  }],
  24: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }

    function i(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function(e) {
          return e = function(e, t) {
            if ("object" !== o(e) || null === e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 === n) return String(e);
            if ("object" !== o(n = n.call(e, t))) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.")
          }(e, "string"), "symbol" === o(e) ? e : String(e)
        }(r.key), r)
      }
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.default = void 0, r.default = function(e, t, n) {
      return t && i(e.prototype, t), n && i(e, n), Object.defineProperty(e, "prototype", {
        writable: !1
      }), e
    }((function e() {
      if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function")
    })), n.exports = r.default
  }, {}],
  25: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.default = void 0;
    var i = t("../util/index.js");

    function a(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function(e) {
          return e = function(e, t) {
            if ("object" !== o(e) || null === e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 === n) return String(e);
            if ("object" !== o(n = n.call(e, t))) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.")
          }(e, "string"), "symbol" === o(e) ? e : String(e)
        }(r.key), r)
      }
    }
    var c = function(e, t, n) {
      return t && a(e.prototype, t), n && a(e, n), Object.defineProperty(e, "prototype", {
        writable: !1
      }), e
    }((function e(t) {
      if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function");
      this.touches = [], this.targetTouches = [], this.changedTouches = [], this.preventDefault = i.noop, this.stopPropagation = i.noop, this.type = t, this.target = window.canvas, this.currentTarget = window.canvas
    }));

    function u(e) {
      return function(t) {
        var n = new c(e);
        n.touches = t.touches, n.targetTouches = Array.prototype.slice.call(t.touches), n.changedTouches = t.changedTouches, n.timeStamp = t.timeStamp, document.dispatchEvent(n)
      }
    }
    r.default = c, wx.onTouchStart(u("touchstart")), wx.onTouchMove(u("touchmove")), wx.onTouchEnd(u("touchend")), wx.onTouchCancel(u("touchcancel")), n.exports = r.default
  }, {
    "../util/index.js": 47
  }],
  26: [function(e, t, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), Object.defineProperty(n, "MouseEvent", {
      enumerable: !0,
      get: function() {
        return o.default
      }
    }), Object.defineProperty(n, "TouchEvent", {
      enumerable: !0,
      get: function() {
        return r.default
      }
    });
    var r = i(e("./TouchEvent")),
      o = i(e("./MouseEvent"));

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
  }, {
    "./MouseEvent": 24,
    "./TouchEvent": 25
  }],
  27: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }

    function i(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function(e) {
          return e = function(e, t) {
            if ("object" !== o(e) || null === e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 === n) return String(e);
            if ("object" !== o(n = n.call(e, t))) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.")
          }(e, "string"), "symbol" === o(e) ? e : String(e)
        }(r.key), r)
      }
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.default = void 0;
    var a = new WeakMap,
      c = function() {
        function e() {
          if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function");
          a.set(this, {})
        }
        var t, n;
        return t = e, (n = [{
          key: "addEventListener",
          value: function(e, t) {
            var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {},
              r = a.get(this);
            r || a.set(this, r = {}), r[e] || (r[e] = []), r[e].push(t), n.capture, n.once, n.passive
          }
        }, {
          key: "removeEventListener",
          value: function(e, t) {
            var n = a.get(this);
            if (n) {
              var r = n[e];
              if (r && 0 < r.length)
                for (var o = r.length; o--;)
                  if (r[o] === t) {
                    r.splice(o, 1);
                    break
                  }
            }
          }
        }, {
          key: "dispatchEvent",
          value: function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
              t = a.get(this)[e.type];
            if (t)
              for (var n = 0; n < t.length; n++) t[n](e)
          }
        }]) && i(t.prototype, n), Object.defineProperty(t, "prototype", {
          writable: !1
        }), e
      }();
    r.default = c, n.exports = r.default
  }, {}],
  28: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }

    function i(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function(e) {
          return e = function(e, t) {
            if ("object" !== o(e) || null === e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 === n) return String(e);
            if ("object" !== o(n = n.call(e, t))) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.")
          }(e, "string"), "symbol" === o(e) ? e : String(e)
        }(r.key), r)
      }
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.default = void 0;
    var a = function() {
      function e() {
        if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function")
      }
      var t, n;
      return t = e, (n = [{
        key: "construct",
        value: function() {}
      }]) && i(t.prototype, n), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e
    }();
    r.default = a, n.exports = r.default
  }, {}],
  29: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }

    function i(e, t) {
      return (i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
        return e.__proto__ = t, e
      })(e, t)
    }

    function a(e) {
      var t = function() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
        } catch (e) {
          return !1
        }
      }();
      return function() {
        var n, r = c(e);
        n = t ? (n = c(this).constructor, Reflect.construct(r, arguments, n)) : r.apply(this, arguments), r = this;
        if (n && ("object" === o(n) || "function" == typeof n)) return n;
        if (void 0 !== n) throw new TypeError("Derived constructors may only return object or undefined");
        if (void 0 !== r) return r;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
    }

    function c(e) {
      return (c = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e)
      })(e)
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.default = void 0, t = function(e) {
      var t = r;
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && i(t, e);
      var n = a(r);

      function r() {
        if (this instanceof r) return n.call(this, "audio");
        throw new TypeError("Cannot call a class as a function")
      }
      return t = r, Object.defineProperty(t, "prototype", {
        writable: !1
      }), t
    }(((t = t("./HTMLMediaElement")) && t.__esModule ? t : {
      default: t
    }).default), r.default = t, n.exports = r.default
  }, {
    "./HTMLMediaElement": 33
  }],
  30: [function(e, t, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = void 0;
    var r = o(e("./Canvas"));

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    o(e("./HTMLElement")), GameGlobal.screencanvas = GameGlobal.screencanvas || new r.default, e = GameGlobal.screencanvas.constructor, n.default = e, t.exports = n.default
  }, {
    "./Canvas": 22,
    "./HTMLElement": 31
  }],
  31: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.default = void 0;
    var i = (i = t("./Element")) && i.__esModule ? i : {
        default: i
      },
      a = t("./util/index.js"),
      c = t("./WindowProperties");

    function u(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function(e) {
          return e = function(e, t) {
            if ("object" !== o(e) || null === e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 === n) return String(e);
            if ("object" !== o(n = n.call(e, t))) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.")
          }(e, "string"), "symbol" === o(e) ? e : String(e)
        }(r.key), r)
      }
    }

    function l(e, t) {
      return (l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
        return e.__proto__ = t, e
      })(e, t)
    }

    function s(e) {
      var t = function() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
        } catch (e) {
          return !1
        }
      }();
      return function() {
        var n, r = f(e);
        n = t ? (n = f(this).constructor, Reflect.construct(r, arguments, n)) : r.apply(this, arguments), r = this;
        if (n && ("object" === o(n) || "function" == typeof n)) return n;
        if (void 0 !== n) throw new TypeError("Derived constructors may only return object or undefined");
        if (void 0 !== r) return r;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
    }

    function f(e) {
      return (f = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e)
      })(e)
    }
    t = function(e) {
      var t = r;
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && l(t, e);
      var n = s(r);

      function r() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
          t = this,
          o = r;
        if (t instanceof o) return (t = n.call(this)).className = "", t.childern = [], t.style = {
          width: "".concat(c.innerWidth, "px"),
          height: "".concat(c.innerHeight, "px")
        }, t.insertBefore = a.noop, t.innerHTML = "", t.tagName = e.toUpperCase(), t;
        throw new TypeError("Cannot call a class as a function")
      }
      return t = r, (e = [{
        key: "setAttribute",
        value: function(e, t) {
          this[e] = t
        }
      }, {
        key: "getAttribute",
        value: function(e) {
          return this[e]
        }
      }, {
        key: "clientWidth",
        get: function() {
          var e = parseInt(this.style.fontSize, 10) * this.innerHTML.length;
          return Number.isNaN(e) ? 0 : e
        }
      }, {
        key: "clientHeight",
        get: function() {
          var e = parseInt(this.style.fontSize, 10);
          return Number.isNaN(e) ? 0 : e
        }
      }, {
        key: "getBoundingClientRect",
        value: function() {
          return {
            top: 0,
            left: 0,
            width: c.innerWidth,
            height: c.innerHeight
          }
        }
      }, {
        key: "focus",
        value: function() {}
      }]) && u(t.prototype, e), Object.defineProperty(t, "prototype", {
        writable: !1
      }), r
    }(i.default), r.default = t, n.exports = r.default
  }, {
    "./Element": 23,
    "./WindowProperties": 40,
    "./util/index.js": 47
  }],
  32: [function(e, t, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = void 0, (e = e("./HTMLElement")) && e.__esModule, e = wx.createImage().constructor, n.default = e, t.exports = n.default
  }, {
    "./HTMLElement": 31
  }],
  33: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }

    function i(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function(e) {
          return e = function(e, t) {
            if ("object" !== o(e) || null === e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 === n) return String(e);
            if ("object" !== o(n = n.call(e, t))) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.")
          }(e, "string"), "symbol" === o(e) ? e : String(e)
        }(r.key), r)
      }
    }

    function a(e, t) {
      return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
        return e.__proto__ = t, e
      })(e, t)
    }

    function c(e) {
      var t = function() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
        } catch (e) {
          return !1
        }
      }();
      return function() {
        var n, r = u(e);
        n = t ? (n = u(this).constructor, Reflect.construct(r, arguments, n)) : r.apply(this, arguments), r = this;
        if (n && ("object" === o(n) || "function" == typeof n)) return n;
        if (void 0 !== n) throw new TypeError("Derived constructors may only return object or undefined");
        if (void 0 !== r) return r;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
    }

    function u(e) {
      return (u = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e)
      })(e)
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.default = void 0, t = function(e) {
      var t = r;
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && a(t, e);
      var n = c(r);

      function r(e) {
        if (this instanceof r) return n.call(this, e);
        throw new TypeError("Cannot call a class as a function")
      }
      return t = r, (e = [{
        key: "addTextTrack",
        value: function() {}
      }, {
        key: "captureStream",
        value: function() {}
      }, {
        key: "fastSeek",
        value: function() {}
      }, {
        key: "load",
        value: function() {}
      }, {
        key: "pause",
        value: function() {}
      }, {
        key: "play",
        value: function() {}
      }]) && i(t.prototype, e), Object.defineProperty(t, "prototype", {
        writable: !1
      }), r
    }(((t = t("./HTMLElement")) && t.__esModule ? t : {
      default: t
    }).default), r.default = t, n.exports = r.default
  }, {
    "./HTMLElement": 31
  }],
  34: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }

    function i(e, t) {
      return (i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
        return e.__proto__ = t, e
      })(e, t)
    }

    function a(e) {
      var t = function() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
        } catch (e) {
          return !1
        }
      }();
      return function() {
        var n, r = c(e);
        n = t ? (n = c(this).constructor, Reflect.construct(r, arguments, n)) : r.apply(this, arguments), r = this;
        if (n && ("object" === o(n) || "function" == typeof n)) return n;
        if (void 0 !== n) throw new TypeError("Derived constructors may only return object or undefined");
        if (void 0 !== r) return r;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
    }

    function c(e) {
      return (c = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e)
      })(e)
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.default = void 0, t = function(e) {
      var t = r;
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && i(t, e);
      var n = a(r);

      function r() {
        if (this instanceof r) return n.call(this, "video");
        throw new TypeError("Cannot call a class as a function")
      }
      return t = r, Object.defineProperty(t, "prototype", {
        writable: !1
      }), t
    }(((t = t("./HTMLMediaElement")) && t.__esModule ? t : {
      default: t
    }).default), r.default = t, n.exports = r.default
  }, {
    "./HTMLMediaElement": 33
  }],
  35: [function(e, t, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = function() {
      return wx.createImage()
    }, (e = e("./HTMLImageElement")) && e.__esModule, t.exports = n.default
  }, {
    "./HTMLImageElement": 32
  }],
  36: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }

    function i(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function(e) {
          return e = function(e, t) {
            if ("object" !== o(e) || null === e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 === n) return String(e);
            if ("object" !== o(n = n.call(e, t))) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.")
          }(e, "string"), "symbol" === o(e) ? e : String(e)
        }(r.key), r)
      }
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.default = void 0, r.default = function(e, t, n) {
      return t && i(e.prototype, t), n && i(e, n), Object.defineProperty(e, "prototype", {
        writable: !1
      }), e
    }((function e() {
      if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function")
    })), n.exports = r.default
  }, {}],
  37: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }

    function i(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function(e) {
          return e = function(e, t) {
            if ("object" !== o(e) || null === e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 === n) return String(e);
            if ("object" !== o(n = n.call(e, t))) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.")
          }(e, "string"), "symbol" === o(e) ? e : String(e)
        }(r.key), r)
      }
    }

    function a(e, t) {
      return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
        return e.__proto__ = t, e
      })(e, t)
    }

    function c(e) {
      var t = function() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
        } catch (e) {
          return !1
        }
      }();
      return function() {
        var n, r = u(e);
        n = t ? (n = u(this).constructor, Reflect.construct(r, arguments, n)) : r.apply(this, arguments), r = this;
        if (n && ("object" === o(n) || "function" == typeof n)) return n;
        if (void 0 !== n) throw new TypeError("Derived constructors may only return object or undefined");
        if (void 0 !== r) return r;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
    }

    function u(e) {
      return (u = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e)
      })(e)
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.default = void 0, t = function(e) {
      var t = r;
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && a(t, e);
      var n = c(r);

      function r() {
        var e;
        if (this instanceof r) return (e = n.call(this)).childNodes = [], e;
        throw new TypeError("Cannot call a class as a function")
      }
      return t = r, (e = [{
        key: "appendChild",
        value: function(e) {
          this.childNodes.push(e)
        }
      }, {
        key: "cloneNode",
        value: function() {
          var e = Object.create(this);
          return Object.assign(e, this), e
        }
      }, {
        key: "removeChild",
        value: function(e) {
          var t = this.childNodes.findIndex((function(t) {
            return t === e
          }));
          return -1 < t ? this.childNodes.splice(t, 1) : null
        }
      }]) && i(t.prototype, e), Object.defineProperty(t, "prototype", {
        writable: !1
      }), r
    }(((t = t("./EventTarget.js")) && t.__esModule ? t : {
      default: t
    }).default), r.default = t, n.exports = r.default
  }, {
    "./EventTarget.js": 27
  }],
  38: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }

    function i(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function(e) {
          return e = function(e, t) {
            if ("object" !== o(e) || null === e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 === n) return String(e);
            if ("object" !== o(n = n.call(e, t))) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.")
          }(e, "string"), "symbol" === o(e) ? e : String(e)
        }(r.key), r)
      }
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.default = void 0, r.default = function(e, t, n) {
      return t && i(e.prototype, t), n && i(e, n), Object.defineProperty(e, "prototype", {
        writable: !1
      }), e
    }((function e() {
      if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function")
    })), n.exports = r.default
  }, {}],
  39: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }

    function i(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function(e) {
          return e = function(e, t) {
            if ("object" !== o(e) || null === e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 === n) return String(e);
            if ("object" !== o(n = n.call(e, t))) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.")
          }(e, "string"), "symbol" === o(e) ? e : String(e)
        }(r.key), r)
      }
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.default = void 0;
    var a = new WeakMap,
      c = function() {
        function e(t) {
          var n = this,
            r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [],
            o = this,
            i = e;
          if (!(o instanceof i)) throw new TypeError("Cannot call a class as a function");
          if (this.binaryType = "", this.bufferedAmount = 0, this.extensions = "", this.onclose = null, this.onerror = null, this.onmessage = null, this.onopen = null, this.protocol = "", this.readyState = 3, "string" != typeof t || !/(^ws:\/\/)|(^wss:\/\/)/.test(t)) throw new TypeError("Failed to construct 'WebSocket': The URL '".concat(t, "' is invalid"));
          return this.url = t, this.readyState = e.CONNECTING, o = wx.connectSocket({
            url: t,
            protocols: Array.isArray(r) ? r : [r],
            tcpNoDelay: !0
          }), a.set(this, o), o.onClose((function(t) {
            n.readyState = e.CLOSED, "function" == typeof n.onclose && n.onclose(t)
          })), o.onMessage((function(e) {
            "function" == typeof n.onmessage && n.onmessage(e)
          })), o.onOpen((function() {
            n.readyState = e.OPEN, "function" == typeof n.onopen && n.onopen()
          })), o.onError((function(e) {
            "function" == typeof n.onerror && n.onerror(new Error(e.errMsg))
          })), this
        }
        var t, n;
        return t = e, (n = [{
          key: "close",
          value: function(t, n) {
            this.readyState = e.CLOSING, a.get(this).close({
              code: t,
              reason: n
            })
          }
        }, {
          key: "send",
          value: function(e) {
            if (!("string" == typeof e || e instanceof ArrayBuffer || ArrayBuffer.isView(e))) throw new TypeError("Failed to send message: The data ".concat(e, " is invalid"));
            a.get(this).send({
              data: e
            })
          }
        }]) && i(t.prototype, n), Object.defineProperty(t, "prototype", {
          writable: !1
        }), e
      }();
    (r.default = c).CONNECTING = 0, c.OPEN = 1, c.CLOSING = 2, c.CLOSED = 3, n.exports = r.default
  }, {}],
  40: [function(e, t, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.screen = n.performance = n.ontouchstart = n.ontouchmove = n.ontouchend = n.innerWidth = n.innerHeight = n.devicePixelRatio = void 0;
    var r = (i = wx.getSystemInfoSync()).screenWidth,
      o = i.screenHeight,
      i = i.devicePixelRatio,
      a = (i = (n.devicePixelRatio = i, r), o);
    r = {
      width: r,
      height: o,
      availWidth: n.innerWidth = i,
      availHeight: n.innerHeight = a,
      availLeft: 0,
      availTop: 0
    }, n.screen = r, o = {
      now: Date.now
    };
    n.performance = o, n.ontouchstart = null, n.ontouchmove = null, n.ontouchend = null
  }, {}],
  41: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }

    function i(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function(e) {
          return e = function(e, t) {
            if ("object" !== o(e) || null === e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 === n) return String(e);
            if ("object" !== o(n = n.call(e, t))) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.")
          }(e, "string"), "symbol" === o(e) ? e : String(e)
        }(r.key), r)
      }
    }

    function a(e, t) {
      return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
        return e.__proto__ = t, e
      })(e, t)
    }

    function c(e) {
      var t = function() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
        } catch (e) {
          return !1
        }
      }();
      return function() {
        var n, r = l(e);
        n = t ? (n = l(this).constructor, Reflect.construct(r, arguments, n)) : r.apply(this, arguments), r = this;
        if (n && ("object" === o(n) || "function" == typeof n)) return n;
        if (void 0 !== n) throw new TypeError("Derived constructors may only return object or undefined");
        return u(r)
      }
    }

    function u(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e
    }

    function l(e) {
      return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e)
      })(e)
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.default = void 0, t = (t = t("./EventTarget.js")) && t.__esModule ? t : {
      default: t
    };
    var s = new WeakMap,
      f = new WeakMap,
      d = new WeakMap,
      p = new WeakMap,
      h = new WeakMap;

    function m(e) {
      if ("function" == typeof this["on".concat(e)]) {
        for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
        this["on".concat(e)].apply(this, n)
      }
    }

    function y(e) {
      this.readyState = e, m.call(this, "readystatechange")
    }
    t = function(e) {
      var t = r;
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && a(t, e);
      var n = c(r);

      function r() {
        var e;
        if (this instanceof r) return (e = n.call(this)).timeout = 0, e.onabort = null, e.onerror = null, e.onload = null, e.onloadstart = null, e.onprogress = null, e.ontimeout = null, e.onloadend = null, e.onreadystatechange = null, e.readyState = 0, e.response = null, e.responseText = null, e.responseType = "", e.responseXML = null, e.status = 0, e.statusText = "", e.upload = {}, e.withCredentials = !1, d.set(u(e), {
          "content-type": "application/x-www-form-urlencoded"
        }), p.set(u(e), {}), e;
        throw new TypeError("Cannot call a class as a function")
      }
      return t = r, (e = [{
        key: "abort",
        value: function() {
          var e = h.get(this);
          e && e.abort()
        }
      }, {
        key: "getAllResponseHeaders",
        value: function() {
          var e = p.get(this);
          return Object.keys(e).map((function(t) {
            return "".concat(t, ": ").concat(e[t])
          })).join("\n")
        }
      }, {
        key: "getResponseHeader",
        value: function(e) {
          return p.get(this)[e]
        }
      }, {
        key: "open",
        value: function(e, t) {
          f.set(this, e), s.set(this, t), y.call(this, r.OPENED)
        }
      }, {
        key: "overrideMimeType",
        value: function() {}
      }, {
        key: "send",
        value: function() {
          var e = this,
            t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
          if (this.readyState !== r.OPENED) throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
          t = wx.request({
            data: t,
            url: s.get(this),
            method: f.get(this),
            header: d.get(this),
            dataType: "other",
            responseType: "arraybuffer" === this.responseType ? "arraybuffer" : "text",
            timeout: this.timeout || void 0,
            success: function(t) {
              var n = t.data,
                o = t.statusCode;
              t = t.header;
              switch (e.status = o, p.set(e, t), m.call(e, "loadstart"), y.call(e, r.HEADERS_RECEIVED), y.call(e, r.LOADING), e.responseType) {
                case "json":
                  e.responseText = n;
                  try {
                    e.response = JSON.parse(n)
                  } catch (t) {
                    e.response = null
                  }
                  break;
                case "":
                case "text":
                  e.responseText = e.response = n;
                  break;
                case "arraybuffer":
                  e.response = n, e.responseText = "";
                  for (var i = new Uint8Array(n), a = i.byteLength, c = 0; c < a; c++) e.responseText += String.fromCharCode(i[c]);
                  break;
                default:
                  e.response = null
              }
              y.call(e, r.DONE), m.call(e, "load"), m.call(e, "loadend")
            },
            fail: function(t) {
              -1 !== (t = t.errMsg).indexOf("abort") ? m.call(e, "abort") : -1 !== t.indexOf("timeout") ? m.call(e, "timeout") : m.call(e, "error", t), m.call(e, "loadend")
            }
          }), h.set(this, t)
        }
      }, {
        key: "setRequestHeader",
        value: function(e, t) {
          var n = d.get(this);
          n[e] = t, d.set(this, n)
        }
      }, {
        key: "addEventListener",
        value: function(e, t) {
          var n;
          "function" == typeof t && (n = this, this["on" + e] = function(e) {
            t.call(n, e)
          })
        }
      }]) && i(t.prototype, e), Object.defineProperty(t, "prototype", {
        writable: !1
      }), r
    }(t.default), (r.default = t).UNSEND = 0, t.OPENED = 1, t.HEADERS_RECEIVED = 2, t.LOADING = 3, t.DONE = 4, n.exports = r.default
  }, {
    "./EventTarget.js": 27
  }],
  42: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), r.default = void 0;
    var i = function(e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || "object" !== o(e) && "function" != typeof e) return {
          default: e
        };
        if ((t = function(e) {
            var t, n;
            return "function" != typeof WeakMap ? null : (t = new WeakMap, n = new WeakMap, function(e) {
              return e ? n : t
            }(e))
          }(t)) && t.has(e)) return t.get(e);
        var n, r = {},
          i = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (n in e) {
          var a;
          "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && ((a = i ? Object.getOwnPropertyDescriptor(e, n) : null) && (a.get || a.set) ? Object.defineProperty(r, n, a) : r[n] = e[n])
        }
        return r.default = e, t && t.set(e, r), r
      }(t("./window")),
      a = f(t("./HTMLElement")),
      c = f(t("./HTMLVideoElement")),
      u = f(t("./Image")),
      l = f(t("./Audio")),
      s = f(t("./Canvas"));

    function f(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    t("./EventIniter/index.js");
    var d = {},
      p = {
        readyState: "complete",
        visibilityState: "visible",
        documentElement: i,
        hidden: !1,
        style: {},
        location: i.location,
        ontouchstart: null,
        ontouchmove: null,
        ontouchend: null,
        head: new a.default("head"),
        body: new a.default("body"),
        createElement: function(e) {
          return "canvas" === e ? new s.default : "audio" === e ? new l.default : "img" === e ? new u.default : "video" === e ? new c.default : new a.default(e)
        },
        createElementNS: function(e, t) {
          return this.createElement(t)
        },
        getElementById: function(e) {
          return e === i.canvas.id ? i.canvas : null
        },
        getElementsByTagName: function(e) {
          return "head" === e ? [p.head] : "body" === e ? [p.body] : "canvas" === e ? [i.canvas] : []
        },
        getElementsByName: function(e) {
          return "head" === e ? [p.head] : "body" === e ? [p.body] : "canvas" === e ? [i.canvas] : []
        },
        querySelector: function(e) {
          return "head" === e ? p.head : "body" === e ? p.body : "canvas" === e || e === "#".concat(i.canvas.id) ? i.canvas : null
        },
        querySelectorAll: function(e) {
          return "head" === e ? [p.head] : "body" === e ? [p.body] : "canvas" === e ? [i.canvas] : []
        },
        addEventListener: function(e, t) {
          d[e] || (d[e] = []), d[e].push(t)
        },
        removeEventListener: function(e, t) {
          var n = d[e];
          if (n && 0 < n.length)
            for (var r = n.length; r--;)
              if (n[r] === t) {
                n.splice(r, 1);
                break
              }
        },
        dispatchEvent: function(e) {
          var t = d[e.type];
          if (t)
            for (var n = 0; n < t.length; n++) t[n](e)
        }
      };
    r.default = p, n.exports = r.default
  }, {
    "./Audio": 21,
    "./Canvas": 22,
    "./EventIniter/index.js": 26,
    "./HTMLElement": 31,
    "./HTMLVideoElement": 34,
    "./Image": 35,
    "./window": 48
  }],
  43: [function(t, n, r) {
    function o(t) {
      return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      })(t)
    }
    var i = function(e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || "object" !== o(e) && "function" != typeof e) return {
          default: e
        };
        if ((t = function(e) {
            var t, n;
            return "function" != typeof WeakMap ? null : (t = new WeakMap, n = new WeakMap, function(e) {
              return e ? n : t
            }(e))
          }(t)) && t.has(e)) return t.get(e);
        var n, r = {},
          i = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (n in e) {
          var a;
          "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && ((a = i ? Object.getOwnPropertyDescriptor(e, n) : null) && (a.get || a.set) ? Object.defineProperty(r, n, a) : r[n] = e[n])
        }
        return r.default = e, t && t.set(e, r), r
      }(t("./window")),
      a = c(t("./document"));

    function c(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    c(t("./HTMLElement"));
    var u = GameGlobal;
    if (!GameGlobal.__isAdapterInjected)
      if (GameGlobal.__isAdapterInjected = !0, i.document = a.default, i.addEventListener = function(e, t) {
          i.document.addEventListener(e, t)
        }, i.removeEventListener = function(e, t) {
          i.document.removeEventListener(e, t)
        }, i.dispatchEvent = i.document.dispatchEvent, t = wx.getSystemInfoSync().platform, "undefined" == typeof __devtoolssubcontext && "devtools" === t) {
        for (var l in i) {
          var s = Object.getOwnPropertyDescriptor(u, l);
          s && !0 !== s.configurable || Object.defineProperty(window, l, {
            value: i[l]
          })
        }
        for (var f in i.document) {
          var d = Object.getOwnPropertyDescriptor(u.document, f);
          d && !0 !== d.configurable || Object.defineProperty(u.document, f, {
            value: i.document[f]
          })
        }
        window.parent = window
      } else {
        for (var p in i) u[p] = i[p];
        u.window = i, (window = u).top = window.parent = window
      }
  }, {
    "./HTMLElement": 31,
    "./document": 42,
    "./window": 48
  }],
  44: [function(e, t, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = void 0, n.default = {
      get length() {
        return wx.getStorageInfoSync().keys.length
      },
      key: function(e) {
        return wx.getStorageInfoSync().keys[e]
      },
      getItem: function(e) {
        return wx.getStorageSync(e)
      },
      setItem: function(e, t) {
        return wx.setStorageSync(e, t)
      },
      removeItem: function(e) {
        wx.removeStorageSync(e)
      },
      clear: function() {
        wx.clearStorageSync()
      }
    }, t.exports = n.default
  }, {}],
  45: [function(e, t, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = void 0, n.default = {
      href: "game.js",
      reload: function() {}
    }, t.exports = n.default
  }, {}],
  46: [function(e, t, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = void 0;
    e = e("./util/index.js");
    var r = wx.getSystemInfoSync(),
      o = (console.log(r), r.system),
      i = r.platform,
      a = r.language,
      c = (r = r.version, o = o && -1 !== o.toLowerCase().indexOf("android") ? "Android; CPU ".concat(o) : "iPhone; CPU iPhone OS ".concat(o, " like Mac OS X"), r = "Mozilla/5.0 (".concat(o, ") AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/").concat(r, " MiniGame NetType/WIFI Language/").concat(a), {
        platform: i,
        language: a,
        appVersion: "5.0 (".concat(o, ") AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"),
        userAgent: r,
        onLine: !0,
        geolocation: {
          getCurrentPosition: e.noop,
          watchPosition: e.noop,
          clearWatch: e.noop
        }
      });
    wx.onNetworkStatusChange && wx.onNetworkStatusChange((function(e) {
      c.onLine = e.isConnected
    })), n.default = c, t.exports = n.default
  }, {
    "./util/index.js": 47
  }],
  47: [function(e, t, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.noop = function() {}
  }, {}],
  48: [function(e, t, n) {
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var r = {
        canvas: !0,
        setTimeout: !0,
        setInterval: !0,
        clearTimeout: !0,
        clearInterval: !0,
        requestAnimationFrame: !0,
        cancelAnimationFrame: !0,
        navigator: !0,
        XMLHttpRequest: !0,
        WebSocket: !0,
        Image: !0,
        ImageBitmap: !0,
        Audio: !0,
        FileReader: !0,
        HTMLElement: !0,
        HTMLImageElement: !0,
        HTMLCanvasElement: !0,
        HTMLMediaElement: !0,
        HTMLAudioElement: !0,
        HTMLVideoElement: !0,
        WebGLRenderingContext: !0,
        TouchEvent: !0,
        MouseEvent: !0,
        DeviceMotionEvent: !0,
        localStorage: !0,
        location: !0
      },
      o = (Object.defineProperty(n, "Audio", {
        enumerable: !0,
        get: function() {
          return s.default
        }
      }), Object.defineProperty(n, "DeviceMotionEvent", {
        enumerable: !0,
        get: function() {
          return v.DeviceMotionEvent
        }
      }), Object.defineProperty(n, "FileReader", {
        enumerable: !0,
        get: function() {
          return f.default
        }
      }), Object.defineProperty(n, "HTMLAudioElement", {
        enumerable: !0,
        get: function() {
          return y.default
        }
      }), Object.defineProperty(n, "HTMLCanvasElement", {
        enumerable: !0,
        get: function() {
          return h.default
        }
      }), Object.defineProperty(n, "HTMLElement", {
        enumerable: !0,
        get: function() {
          return d.default
        }
      }), Object.defineProperty(n, "HTMLImageElement", {
        enumerable: !0,
        get: function() {
          return p.default
        }
      }), Object.defineProperty(n, "HTMLMediaElement", {
        enumerable: !0,
        get: function() {
          return m.default
        }
      }), Object.defineProperty(n, "HTMLVideoElement", {
        enumerable: !0,
        get: function() {
          return g.default
        }
      }), Object.defineProperty(n, "Image", {
        enumerable: !0,
        get: function() {
          return u.default
        }
      }), Object.defineProperty(n, "ImageBitmap", {
        enumerable: !0,
        get: function() {
          return l.default
        }
      }), Object.defineProperty(n, "MouseEvent", {
        enumerable: !0,
        get: function() {
          return v.MouseEvent
        }
      }), Object.defineProperty(n, "TouchEvent", {
        enumerable: !0,
        get: function() {
          return v.TouchEvent
        }
      }), Object.defineProperty(n, "WebGLRenderingContext", {
        enumerable: !0,
        get: function() {
          return b.default
        }
      }), Object.defineProperty(n, "WebSocket", {
        enumerable: !0,
        get: function() {
          return c.default
        }
      }), Object.defineProperty(n, "XMLHttpRequest", {
        enumerable: !0,
        get: function() {
          return a.default
        }
      }), n.clearTimeout = n.clearInterval = n.canvas = n.cancelAnimationFrame = void 0, Object.defineProperty(n, "localStorage", {
        enumerable: !0,
        get: function() {
          return w.default
        }
      }), Object.defineProperty(n, "location", {
        enumerable: !0,
        get: function() {
          return _.default
        }
      }), Object.defineProperty(n, "navigator", {
        enumerable: !0,
        get: function() {
          return i.default
        }
      }), n.setTimeout = n.setInterval = n.requestAnimationFrame = void 0, S(e("./Canvas"))),
      i = S(e("./navigator")),
      a = S(e("./XMLHttpRequest")),
      c = S(e("./WebSocket")),
      u = S(e("./Image")),
      l = S(e("./ImageBitmap")),
      s = S(e("./Audio")),
      f = S(e("./FileReader")),
      d = S(e("./HTMLElement")),
      p = S(e("./HTMLImageElement")),
      h = S(e("./HTMLCanvasElement")),
      m = S(e("./HTMLMediaElement")),
      y = S(e("./HTMLAudioElement")),
      g = S(e("./HTMLVideoElement")),
      b = S(e("./WebGLRenderingContext")),
      v = e("./EventIniter/index.js"),
      w = S(e("./localStorage")),
      _ = S(e("./location")),
      E = e("./WindowProperties");

    function S(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    Object.keys(E).forEach((function(e) {
      "default" === e || "__esModule" === e || Object.prototype.hasOwnProperty.call(r, e) || e in n && n[e] === E[e] || Object.defineProperty(n, e, {
        enumerable: !0,
        get: function() {
          return E[e]
        }
      })
    })), GameGlobal.screencanvas = GameGlobal.screencanvas || new o.default;
    e = GameGlobal.screencanvas, e = (o = (n.canvas = e, GameGlobal)).setTimeout;
    var x = o.setInterval,
      O = o.clearTimeout,
      T = o.clearInterval,
      N = o.requestAnimationFrame;
    o = o.cancelAnimationFrame;
    n.cancelAnimationFrame = o, n.requestAnimationFrame = N, n.clearInterval = T, n.clearTimeout = O, n.setInterval = x, n.setTimeout = e
  }, {
    "./Audio": 21,
    "./Canvas": 22,
    "./EventIniter/index.js": 26,
    "./FileReader": 28,
    "./HTMLAudioElement": 29,
    "./HTMLCanvasElement": 30,
    "./HTMLElement": 31,
    "./HTMLImageElement": 32,
    "./HTMLMediaElement": 33,
    "./HTMLVideoElement": 34,
    "./Image": 35,
    "./ImageBitmap": 36,
    "./WebGLRenderingContext": 38,
    "./WebSocket": 39,
    "./WindowProperties": 40,
    "./XMLHttpRequest": 41,
    "./localStorage": 44,
    "./location": 45,
    "./navigator": 46
  }],
  49: [function(e, t, n) {
    cc.Texture2D && (cc.Texture2D.prototype._checkPackable = function() {
      var e, t, n = cc.dynamicAtlasManager;
      n && (this._isCompressed() || (e = this.width, t = this.height, !this._image) || e > n.maxFrameSize || t > n.maxFrameSize || this._getHash() !== n.Atlas.DEFAULT_HASH ? this._packable = !1 : this._image && this._image.getContext && (this._packable = !0))
    })
  }, {}],
  50: [function(e, t, n) {
    e("./VideoPlayer"), e("./pc-adapter"), e("./Texture2D")
  }, {
    "./Texture2D": 49,
    "./VideoPlayer": 1,
    "./pc-adapter": 51
  }],
  51: [function(e, t, n) {
    var r = wx.getSystemInfoSync(),
      o = cc.internal.inputManager,
      i = cc.internal.eventManager,
      a = cc.Event.EventKeyboard,
      c = cc.Event.EventMouse,
      u = {
        backspace: 8,
        tab: 9,
        enter: 13,
        shift: 16,
        control: 17,
        alt: 18,
        pause: 19,
        capslock: 20,
        escape: 27,
        " ": 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        arrowleft: 37,
        arrowup: 38,
        arrowright: 39,
        arrowdown: 40,
        insert: 45,
        a: 65,
        b: 66,
        c: 67,
        d: 68,
        e: 69,
        f: 70,
        g: 71,
        h: 72,
        i: 73,
        j: 74,
        k: 75,
        l: 76,
        m: 77,
        n: 78,
        o: 79,
        p: 80,
        q: 81,
        r: 82,
        s: 83,
        t: 84,
        u: 85,
        v: 86,
        w: 87,
        x: 88,
        y: 89,
        z: 90,
        "*": 106,
        "+": 107,
        "-": 109,
        "/": 111,
        f1: 112,
        f2: 113,
        f3: 114,
        f4: 115,
        f5: 116,
        f6: 117,
        f7: 118,
        f8: 119,
        f9: 120,
        f10: 121,
        f11: 122,
        f12: 123,
        numlock: 144,
        scrolllock: 145,
        ";": 186,
        "=": 187,
        ",": 188,
        ".": 190,
        "`": 192,
        "[": 219,
        "\\": 220,
        "]": 221,
        "'": 222
      },
      l = {
        Delete: 46,
        Digit0: 48,
        Digit1: 49,
        Digit2: 50,
        Digit3: 51,
        Digit4: 52,
        Digit5: 53,
        Digit6: 54,
        Digit7: 55,
        Digit8: 56,
        Digit9: 57,
        Numpad0: 96,
        Numpad1: 97,
        Numpad2: 98,
        Numpad3: 99,
        Numpad4: 100,
        Numpad5: 101,
        Numpad6: 102,
        Numpad7: 103,
        Numpad8: 104,
        Numpad9: 105,
        NumpadDecimal: 110
      };

    function s(e) {
      var t = e.key.toLowerCase();
      e = e.code;
      return /^\d$/.test(t) || "delete" === t ? l[e] : u[t] || 0
    }
    __globalAdapter.isSubContext || "windows" !== r.platform || (o.registerSystemEvent = function() {
      var e;

      function t(t, n, r) {
        wx[t]((function(t) {
          var a = o.getMouseEvent(t, e, n);
          a.setButton(t.button || 0), r(t, a), i.dispatchEvent(a)
        }))
      }
      this._isRegisterEvent || (this._glView = cc.view, wx.onKeyDown((function(e) {
        return i.dispatchEvent(new a(s(e), !0))
      })), wx.onKeyUp((function(e) {
        return i.dispatchEvent(new a(s(e), !1))
      })), e = {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      }, t("onMouseDown", c.DOWN, (function(t, n) {
        o._mousePressed = !0, o.handleTouchesBegin([o.getTouchByXY(t.x, t.y, e)])
      })), t("onMouseUp", c.UP, (function(t, n) {
        o._mousePressed = !1, o.handleTouchesEnd([o.getTouchByXY(t.x, t.y, e)])
      })), t("onMouseMove", c.MOVE, (function(t, n) {
        o.handleTouchesMove([o.getTouchByXY(t.x, t.y, e)]), o._mousePressed || n.setButton(null)
      })), t("onWheel", c.SCROLL, (function(e, t) {
        t.setScrollData(0, -e.deltaY)
      })), this._isRegisterEvent = !0)
    })
  }, {}],
  52: [function(e, t, n) {
    wx.onError && wx.onError((function e(t) {
      wx.offError && wx.offError(e);
      var n, r, o, i = Math.random() < .01;
      !__globalAdapter.isSubContext && (i = i && wx.getSystemInfoSync()) && cc.Canvas.instance && (n = cc.Canvas.instance.node) && ((r = new cc.Node).color = cc.Color.BLACK, o = r.addComponent(cc.Label), r.height = n.height - 60, r.width = n.width - 60, o.overflow = cc.Label.Overflow.SHRINK, o.horizontalAlign = cc.Label.HorizontalAlign.LEFT, o.verticalAlign = cc.Label.VerticalAlign.TOP, o.fontSize = 24, o.string = "出错了，请截屏发送给游戏开发者（Please send this screenshot to the game developer）\nPlatform: WeChat " + i.version + "\nEngine: Cocos Creator v" + window.CocosEngine + "\nDevice: " + i.brand + " " + i.model + " System: " + i.system + "\nError:\n" + t.message, cc.LabelOutline && (r.addComponent(cc.LabelOutline).color = cc.Color.WHITE), r.once("touchend", (function() {
        r.destroy(), setTimeout((function() {
          cc.director.resume()
        }), 1e3)
      })), r.parent = n, cc.director.pause())
    }))
  }, {}],
  53: [function(e, t, n) {
    var r = wx.getFileSystemManager ? wx.getFileSystemManager() : null,
      o = /the maximum size of the file storage/,
      i = {
        fs: r,
        isOutOfStorage: function(e) {
          return o.test(e)
        },
        getUserDataPath: function() {
          return wx.env.USER_DATA_PATH
        },
        checkFsValid: function() {
          return !!r || (console.warn("can not get the file system!"), !1)
        },
        deleteFile: function(e, t) {
          r.unlink({
            filePath: e,
            success: function() {
              t && t(null)
            },
            fail: function(n) {
              console.warn("Delete file failed: path: ".concat(e, " message: ").concat(n.errMsg)), t && t(new Error(n.errMsg))
            }
          })
        },
        downloadFile: function(e, t, n, r, o) {
          var a = {
            url: e,
            success: function(t) {
              200 === t.statusCode ? o && o(null, t.tempFilePath || t.filePath) : (t.filePath && i.deleteFile(t.filePath), console.warn("Download file failed: path: ".concat(e, " message: ").concat(t.statusCode)), o && o(new Error(t.statusCode), null))
            },
            fail: function(t) {
              console.warn("Download file failed: path: ".concat(e, " message: ").concat(t.errMsg)), o && o(new Error(t.errMsg), null)
            }
          };
          t && (a.filePath = t), n && (a.header = n), t = wx.downloadFile(a);
          r && t.onProgressUpdate(r)
        },
        saveFile: function(e, t, n) {
          wx.saveFile({
            tempFilePath: e,
            filePath: t,
            success: function(e) {
              n && n(null)
            },
            fail: function(t) {
              console.warn("Save file failed: path: ".concat(e, " message: ").concat(t.errMsg)), n && n(new Error(t.errMsg))
            }
          })
        },
        copyFile: function(e, t, n) {
          r.copyFile({
            srcPath: e,
            destPath: t,
            success: function() {
              n && n(null)
            },
            fail: function(t) {
              console.warn("Copy file failed: path: ".concat(e, " message: ").concat(t.errMsg)), n && n(new Error(t.errMsg))
            }
          })
        },
        writeFile: function(e, t, n, o) {
          r.writeFile({
            filePath: e,
            encoding: n,
            data: t,
            success: function() {
              o && o(null)
            },
            fail: function(t) {
              console.warn("Write file failed: path: ".concat(e, " message: ").concat(t.errMsg)), o && o(new Error(t.errMsg))
            }
          })
        },
        writeFileSync: function(e, t, n) {
          try {
            return r.writeFileSync(e, t, n), null
          } catch (t) {
            return console.warn("Write file failed: path: ".concat(e, " message: ").concat(t.message)), new Error(t.message)
          }
        },
        readFile: function(e, t, n) {
          r.readFile({
            filePath: e,
            encoding: t,
            success: function(e) {
              n && n(null, e.data)
            },
            fail: function(t) {
              console.warn("Read file failed: path: ".concat(e, " message: ").concat(t.errMsg)), n && n(new Error(t.errMsg), null)
            }
          })
        },
        readDir: function(e, t) {
          r.readdir({
            dirPath: e,
            success: function(e) {
              t && t(null, e.files)
            },
            fail: function(n) {
              console.warn("Read directory failed: path: ".concat(e, " message: ").concat(n.errMsg)), t && t(new Error(n.errMsg), null)
            }
          })
        },
        readText: function(e, t) {
          i.readFile(e, "utf8", t)
        },
        readArrayBuffer: function(e, t) {
          i.readFile(e, "", t)
        },
        readJson: function(e, t) {
          i.readFile(e, "utf8", (function(n, r) {
            var o = null;
            if (!n) try {
              o = JSON.parse(r)
            } catch (r) {
              console.warn("Read json failed: path: ".concat(e, " message: ").concat(r.message)), n = new Error(r.message)
            }
            t && t(n, o)
          }))
        },
        readJsonSync: function(e) {
          try {
            var t = r.readFileSync(e, "utf8");
            return JSON.parse(t)
          } catch (t) {
            return console.warn("Read json failed: path: ".concat(e, " message: ").concat(t.message)), new Error(t.message)
          }
        },
        makeDirSync: function(e, t) {
          try {
            return r.mkdirSync(e, t), null
          } catch (t) {
            return console.warn("Make directory failed: path: ".concat(e, " message: ").concat(t.message)), new Error(t.message)
          }
        },
        rmdirSync: function(e, t) {
          try {
            r.rmdirSync(e, t)
          } catch (t) {
            return console.warn("rm directory failed: path: ".concat(e, " message: ").concat(t.message)), new Error(t.message)
          }
        },
        exists: function(e, t) {
          r.access({
            path: e,
            success: function() {
              t && t(!0)
            },
            fail: function() {
              t && t(!1)
            }
          })
        },
        loadSubpackage: function(e, t, n) {
          var r = wx.loadSubpackage({
            name: e,
            success: function() {
              n && n()
            },
            fail: function(t) {
              console.warn("Load Subpackage failed: path: ".concat(e, " message: ").concat(t.errMsg)), n && n(new Error("Failed to load subpackage ".concat(e, ": ").concat(t.errMsg)))
            }
          });
          return t && r.onProgressUpdate(t), r
        },
        unzip: function(e, t, n) {
          r.unzip({
            zipFilePath: e,
            targetPath: t,
            success: function() {
              n && n(null)
            },
            fail: function(t) {
              console.warn("unzip failed: path: ".concat(e, " message: ").concat(t.errMsg)), n && n(new Error("unzip failed: " + t.errMsg))
            }
          })
        }
      };
    window.fsUtils = t.exports = i
  }, {}],
  54: [function(e, t, n) {
    var r = !1,
      o = cc.game,
      i = (o.once(o.EVENT_ENGINE_INITED, (function() {
        r = !0
      })), {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }),
      a = (cc.view.convertToLocationInView = function(e, t, n, r) {
        return r = r || cc.v2(), e = this._devicePixelRatio * (e - n.left), n = this._devicePixelRatio * (n.top + n.height - t), e = (e - i.x) * this._viewportRect.width / i.width, n = (n - i.y) * this._viewportRect.height / i.height, this._isRotated ? (r.x = this._viewportRect.width - n, r.y = e) : (r.x = e, r.y = n), r
      }, o._prepareFinished = function(e) {
        var t = this;
        this._prepared = !0, this._initEngine(), cc.assetManager.builtins.init((function() {
          console.log("Cocos Creator v" + cc.ENGINE_VERSION), t._setAnimFrame(), t.emit(t.EVENT_GAME_INITED), e && e()
        }))
      }, wx.onMessage((function(e) {
        e.fromEngine && ("boot" === e.event ? (o._banRunningMainLoop = !1, o._firstSceneLaunched && o._runMainLoop()) : "viewport" === e.event ? (i.x = e.x, i.y = e.y, i.width = e.width, i.height = e.height) : "resize" === e.event ? window.dispatchEvent({
          type: "resize"
        }) : r && ("mainLoop" === e.event ? e.value ? o.resume() : o.pause() : "frameRate" === e.event ? o.setFrameRate(e.value) : "step" === e.event && o.step()))
      })), cc.Canvas.prototype.update = function() {
        this._width === o.canvas.width && this._height === o.canvas.height || this.applySettings()
      }, cc.Canvas.prototype.applySettings);
    cc.Canvas.prototype.applySettings = function() {
      a.call(this), this._width = o.canvas.width, this._height = o.canvas.height
    }
  }, {}],
  55: [function(e, t, n) {
    var r = window.__globalAdapter,
      o = wx.getSystemInfoSync(),
      i = r.adaptSys;
    Object.assign(r, {
      adaptSys: function(e) {
        var t;
        i.call(this, e), "windows" === o.platform ? (e.isMobile = !1, e.os = e.OS_WINDOWS) : r.isDevTool && (-1 < (t = o.system.toLowerCase()).indexOf("android") ? e.os = e.OS_ANDROID : -1 < t.indexOf("ios") && (e.os = e.OS_IOS)), wx.getOpenDataContext ? e.platform = e.WECHAT_GAME : e.platform = e.WECHAT_GAME_SUB, e.getSafeAreaRect = function() {
          var e = cc.view,
            t = r.getSafeArea(),
            n = e.getFrameSize(),
            o = new cc.Vec2(t.left, t.bottom);
          t = new cc.Vec2(t.right, t.top), n = {
            left: 0,
            top: 0,
            width: n.width,
            height: n.height
          };
          return e.convertToLocationInView(o.x, o.y, n, o), e.convertToLocationInView(t.x, t.y, n, t), e._convertPointWithScale(o), e._convertPointWithScale(t), cc.rect(o.x, o.y, t.x - o.x, t.y - o.y)
        }
      }
    })
  }, {}],
  56: [function(e, t, n) {
    var r, o, i, a, c, u, l;
    e = e("../../../common/utils");
    window.__globalAdapter && (r = function(e) {
      a = wx.getSystemInfoSync(), setTimeout((function() {
        a = wx.getSystemInfoSync(), c = !0
      }), e || 5e3)
    }, o = function() {
      return a.deviceOrientation ? "landscape" === a.deviceOrientation : a.screenWidth > a.screenHeight
    }, i = window.__globalAdapter, c = !1, r(), i.isSubContext = void 0 === wx.getOpenDataContext, i.isDevTool = "devtools" === a.platform, e.cloneMethod(i, wx, "getSystemInfoSync"), e.cloneMethod(i, wx, "onTouchStart"), e.cloneMethod(i, wx, "onTouchMove"), e.cloneMethod(i, wx, "onTouchEnd"), e.cloneMethod(i, wx, "onTouchCancel"), e.cloneMethod(i, wx, "createInnerAudioContext"), e.cloneMethod(i, wx, "onAudioInterruptionEnd"), e.cloneMethod(i, wx, "onAudioInterruptionBegin"), e.cloneMethod(i, wx, "createVideo"), e.cloneMethod(i, wx, "setPreferredFramesPerSecond"), e.cloneMethod(i, wx, "showKeyboard"), e.cloneMethod(i, wx, "hideKeyboard"), e.cloneMethod(i, wx, "updateKeyboard"), e.cloneMethod(i, wx, "onKeyboardInput"), e.cloneMethod(i, wx, "onKeyboardConfirm"), e.cloneMethod(i, wx, "onKeyboardComplete"), e.cloneMethod(i, wx, "offKeyboardInput"), e.cloneMethod(i, wx, "offKeyboardConfirm"), e.cloneMethod(i, wx, "offKeyboardComplete"), e.cloneMethod(i, wx, "getOpenDataContext"), e.cloneMethod(i, wx, "onMessage"), e.cloneMethod(i, wx, "getSharedCanvas"), e.cloneMethod(i, wx, "loadFont"), e.cloneMethod(i, wx, "onShow"), e.cloneMethod(i, wx, "onHide"), e.cloneMethod(i, wx, "onError"), e.cloneMethod(i, wx, "offError"), u = !1, l = 1, wx.onDeviceOrientationChange && wx.onDeviceOrientationChange((function(e) {
      r(), "landscape" === e.value ? l = 1 : "landscapeReverse" === e.value && (l = -1)
    })), wx.onWindowResize && wx.onWindowResize((function() {
      r(), window.dispatchEvent("resize")
    })), Object.assign(i, {
      startAccelerometer: function(e) {
        u ? wx.startAccelerometer && wx.startAccelerometer({
          fail: function(e) {
            console.error("start accelerometer failed", e)
          }
        }) : (u = !0, wx.onAccelerometerChange && wx.onAccelerometerChange((function(t) {
          var n, r = {},
            i = t.x,
            a = t.y;
          o() && (n = i, i = -a, a = n), r.x = i * l, r.y = a * l, r.z = t.z, e && e(r)
        })))
      },
      stopAccelerometer: function() {
        wx.stopAccelerometer && wx.stopAccelerometer({
          fail: function(e) {
            console.error("stop accelerometer failed", e)
          }
        })
      }
    }), i.getSafeArea = function() {
      var e, t, n, r = (a = c ? a : wx.getSystemInfoSync()).windowWidth,
        u = a.windowHeight,
        l = (h = a.safeArea).top,
        s = h.left,
        f = h.bottom,
        d = h.right,
        p = h.width,
        h = h.height;
      return "ios" === a.platform && !i.isDevTool && o() && (t = l, e = s, n = h, l = u - d, s = t, f = u - e - (u = r - (t = f)), d = t, h = p - u, p = n), {
        top: l,
        left: s,
        bottom: f,
        right: d,
        width: p,
        height: h
      }
    })
  }, {
    "../../../common/utils": 15
  }]
}, {}, [20]);