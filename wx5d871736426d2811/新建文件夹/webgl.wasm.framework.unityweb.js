var n = window.AudioContext || window.webkitAudioContext;
window.AudioContext = function() {
  return this instanceof window.AudioContext ? wx.createWebAudioContext() : new n
}, GameGlobal.unityNamespace.UnityModule = function(n) {
  function e(n, e) {
    return T("The JavaScript function 'Pointer_stringify(ptrToSomeCString)' is obsoleted and will be removed in a future Unity version. Please call 'UTF8ToString(ptrToSomeCString)' instead."), rn(n, e)
  }(n = void 0 !== n ? n : {}).Pointer_stringify = e;
  var i = "(^|\\n)(\\s+at\\s+|)jsStackTrace(\\s+\\(|@)([^\\n]+):\\d+:\\d+(\\)|)(\\n|$)",
    t = Hn().match(new RegExp(i));
  t && (n.stackTraceRegExp = new RegExp(i.replace("([^\\n]+)", t[4].replace(/[\\^${}[\]().*+?|]/g, "\\$&")).replace("jsStackTrace", "[^\\n]+")));
  var r = function(e) {
    if (!I) {
      I = !0, O = 1, "undefined" != typeof ENVIRONMENT_IS_PTHREAD && ENVIRONMENT_IS_PTHREAD && x("Pthread aborting at " + (new Error).stack), void 0 !== e ? (k(e), x(e), e = e instanceof Error ? e.toString() : JSON.stringify(e)) : e = "", n.IsWxGame && window.WXWASMSDK.WXUncaughtException(!0);
      var i = "abort(" + e + ") at " + Jn();
      if (!n.abortHandler || !n.abortHandler(i)) throw i
    }
  };
  n.SetFullscreen = function(e) {
    if (void 0 !== wn && wn)
      if (void 0 === pd) console.log("Player not loaded yet.");
      else {
        var i = pd.canPerformEventHandlerRequests;
        pd.canPerformEventHandlerRequests = function() {
          return 1
        }, n.ccall("SetFullscreen", null, ["number"], [e]), pd.canPerformEventHandlerRequests = i
      }
    else console.log("Runtime not initialized yet.")
  }, "undefined" != typeof ENVIRONMENT_IS_PTHREAD && ENVIRONMENT_IS_PTHREAD || n.preRun.push((function() {
    xc.queuePersist = function(n) {
      function e() {
        "again" === n.idbPersistState ? i() : n.idbPersistState = 0
      }

      function i() {
        n.idbPersistState = "idb", xc.syncfs(n, !1, e)
      }
      n.idbPersistState ? "idb" === n.idbPersistState && (n.idbPersistState = "again") : n.idbPersistState = setTimeout(i, 0)
    }, xc.mount = function(n) {
      var e = kc.mount(n);
      if (void 0 !== n && n.opts && n.opts.autoPersist) {
        e.idbPersistState = 0;
        var i = e.node_ops;
        e.node_ops = Object.assign({}, e.node_ops), e.node_ops.mknod = function(n, t, r, a) {
          var o = i.mknod(n, t, r, a);
          return o.node_ops = e.node_ops, o.idbfs_mount = e.mount, o.memfs_stream_ops = o.stream_ops, o.stream_ops = Object.assign({}, o.stream_ops), o.stream_ops.write = function(n, e, i, t, r, a) {
            return n.node.isModified = !0, o.memfs_stream_ops.write(n, e, i, t, r, a)
          }, o.stream_ops.close = function(n) {
            var e = n.node;
            if (e.isModified && (xc.queuePersist(e.idbfs_mount), e.isModified = !1), e.memfs_stream_ops.close) return e.memfs_stream_ops.close(n)
          }, o
        }, e.node_ops.rmdir = function(n) {
          return xc.queuePersist(e.mount), i.rmdir(n)
        }, e.node_ops.unlink = function(n) {
          return xc.queuePersist(e.mount), i.unlink(n)
        }, e.node_ops.mkdir = function(n, t) {
          return xc.queuePersist(e.mount), i.mkdir(n, t)
        }, e.node_ops.symlink = function(n, t, r) {
          return xc.queuePersist(e.mount), i.symlink(n, t, r)
        }, e.node_ops.rename = function(n, t, r) {
          return xc.queuePersist(e.mount), i.rename(n, t, r)
        }
      }
      return e
    }, (n.unityFileSystemInit || function() {
      Xc.mkdir("/idbfs"), n.__unityIdbfsMount = Xc.mount(xc, {
        autoPersist: !!n.autoSyncPersistentDataPath
      }, "/idbfs"), n.addRunDependency("JS_FileSystem_Mount"), Xc.syncfs(!0, (function(e) {
        e && console.log("IndexedDB is not available. Data will not persist in cache and PlayerPrefs will not be saved."), n.removeRunDependency("JS_FileSystem_Mount")
      }))
    })()
  }));
  var a, o = [],
    l = null;

  function u(n) {
    for (var e = Object.keys(o), i = 0; i < e.length; ++i) {
      if ((t = o[e[i]]).deviceId && t.deviceId == n.deviceId) return t
    }
    for (i = 0; i < e.length; ++i) {
      if ((t = o[e[i]]) == n) return t
    }
    for (i = 0; i < e.length; ++i) {
      if ((t = o[e[i]]).label && t.label == n.label) return t
    }
    for (i = 0; i < e.length; ++i) {
      var t;
      if ((t = o[e[i]]).groupId && t.kind && t.groupId == n.groupId && t.kind == n.kind) return t
    }
  }

  function f() {
    for (var n = 0;; ++n)
      if (!o[n]) return n
  }

  function c(n) {
    a(), o = [];
    var e = {},
      i = [];
    n.forEach((function(n) {
      if ("videoinput" === n.kind) {
        var t = u(n);
        t ? e[t.id] = t : i.push(n)
      }
    })), o = e, i.forEach((function(n) {
      n.id || (n.id = f(), n.name = n.label || "Video input #" + (n.id + 1), n.isFrontFacing = n.name.toLowerCase().includes("front") || !n.name.toLowerCase().includes("front") && !n.name.toLowerCase().includes("back"), o[n.id] = n)
    }))
  }

  function s() {
    o && (navigator.mediaDevices.enumerateDevices().then((function(n) {
      c(n), !0
    })).catch((function(n) {
      console.warn("Unable to enumerate media devices: " + n + "\nWebcams will not be available."), d()
    })), /Firefox/.test(navigator.userAgent) && (setTimeout(s, 6e4), T("Applying workaround to Firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=1397977")))
  }

  function d() {
    navigator.mediaDevices && navigator.mediaDevices.removeEventListener && navigator.mediaDevices.removeEventListener("devicechange", s), o = null
  }

  function p(n, e, i) {
    var t = Ve(e),
      r = Ve(n),
      a = 0;
    try {
      if (void 0 === i) Wg(r, t);
      else if ("string" == typeof i) a = Ve(i), Eg(r, t, a);
      else {
        if ("number" != typeof i) throw i + " is does not have a type which is supported by SendMessage.";
        Cg(r, t, i)
      }
    } finally {
      Gg(a), Gg(r), Gg(t)
    }
  }
  n.disableAccessToMediaDevices = d, navigator.mediaDevices ? "undefined" != typeof ENVIRONMENT_IS_PTHREAD && ENVIRONMENT_IS_PTHREAD || setTimeout((function() {
    try {
      jn("enumerateMediaDevices"), a = function() {
        null !== l && clearTimeout(l), Tn("enumerateMediaDevices"), navigator.mediaDevices && console.log("navigator.mediaDevices support available"), a = function() {}
      }, s(), l = setTimeout(a, 1e3), navigator.mediaDevices.addEventListener("devicechange", s)
    } catch (n) {
      console.warn("Unable to enumerate media devices: " + n), d()
    }
  }), 0) : (console.warn("navigator.mediaDevices not supported by this browser. Webcam access will not be available." + ("https:" == location.protocol ? "" : " Try hosting the page over HTTPS, because some browsers disable webcam access when insecure HTTP is being used.")), d()), n.SendMessage = p;
  var m, y = {};
  for (m in n) n.hasOwnProperty(m) && (y[m] = n[m]);
  var v = [],
    _ = "./this.program",
    g = function(n, e) {
      throw e
    },
    h = !1,
    w = !1,
    S = !1,
    C = !1;
  h = "object" == typeof window, w = "function" == typeof importScripts, S = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, C = !h && !S && !w;
  var E, W, b, A, D = "";

  function M(e) {
    return n.locateFile ? n.locateFile(e, D) : D + e
  }
  S ? (D = w ? require("path").dirname(D) + "/" : __dirname + "/", E = function(n, e) {
    return b || (b = require("fs")), A || (A = require("path")), n = A.normalize(n), b.readFileSync(n, e ? null : "utf8")
  }, function(n) {
    var e = E(n, !0);
    return e.buffer || (e = new Uint8Array(e)), K(e.buffer), e
  }, process.argv.length > 1 && (_ = process.argv[1].replace(/\\/g, "/")), v = process.argv.slice(2), "undefined" != typeof module && (module.exports = n), process.on("uncaughtException", (function(n) {
    if (!(n instanceof xE)) throw n
  })), process.on("unhandledRejection", r), g = function(n) {
    process.exit(n)
  }, n.inspect = function() {
    return "[Emscripten Module object]"
  }) : C ? ("undefined" != typeof read && (E = function(n) {
    return read(n)
  }), function(n) {
    var e;
    return "function" == typeof readbuffer ? new Uint8Array(readbuffer(n)) : (K("object" == typeof(e = read(n, "binary"))), e)
  }, "undefined" != typeof scriptArgs ? v = scriptArgs : void 0 !== arguments && (v = arguments), "function" == typeof quit && (g = function(n) {
    quit(n)
  }), "undefined" != typeof print && ("undefined" == typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" != typeof printErr ? printErr : print)) : (h || w) && (w ? D = this.location.href : "undefined" != typeof document && document.currentScript && (D = document.currentScript.src), D = 0 !== D.indexOf("blob:") ? D.substr(0, D.lastIndexOf("/") + 1) : "", E = function(n) {
    var e = new XMLHttpRequest;
    return e.open("GET", n, !1), e.send(null), e.responseText
  }, W = function(n, e, i) {
    var t = new XMLHttpRequest;
    t.open("GET", n, !0), t.responseType = "arraybuffer", t.onload = function() {
      200 == t.status || 0 == t.status && t.response ? e(t.response) : i()
    }, t.onerror = i, t.send(null)
  });
  var k = n.print || console.log.bind(console),
    x = n.printErr || console.warn.bind(console);
  for (m in y) y.hasOwnProperty(m) && (n[m] = y[m]);
  y = null, n.arguments && (v = n.arguments), n.thisProgram && (_ = n.thisProgram), n.quit && (g = n.quit);
  var X = 16;

  function j(n, e) {
    return e || (e = X), Math.ceil(n / e) * e
  }

  function T(n) {
    T.shown || (T.shown = {}), T.shown[n] || (T.shown[n] = 1, x(n))
  }
  var L, F = 0,
    P = function(n) {
      F = n
    },
    R = function() {
      return F
    };
  n.wasmBinary && (L = n.wasmBinary);
  var B, G = n.noExitRuntime || !0;
  "object" != typeof WebAssembly && r("no native wasm support detected");
  var O, I = !1;

  function K(n, e) {
    n || r("Assertion failed: " + e)
  }

  function N(e) {
    var i = n["_" + e];
    return K(i, "Cannot call unknown function " + e + ", make sure it is exported"), i
  }

  function U(n, e, i, t, r) {
    var a = {
      string: function(n) {
        var e = 0;
        if (null != n && 0 !== n) {
          var i = 1 + (n.length << 2);
          on(n, e = Lg(i), i)
        }
        return e
      },
      array: function(n) {
        var e = Lg(n.length);
        return cn(n, e), e
      }
    };
    var o = N(n),
      l = [],
      u = 0;
    if (t)
      for (var f = 0; f < t.length; f++) {
        var c = a[i[f]];
        c ? (0 === u && (u = jg()), l[f] = c(t[f])) : l[f] = t[f]
      }
    var s = o.apply(null, l);
    return s = function(n) {
      return "string" === e ? rn(n) : "boolean" === e ? Boolean(n) : n
    }(s), 0 !== u && Tg(u), s
  }

  function z(n, e, i, t) {
    var r = (i = i || []).every((function(n) {
      return "number" === n
    }));
    return "string" !== e && r && !t ? N(n) : function() {
      return U(n, e, i, arguments)
    }
  }
  var q, H, V, Y, J, Z, Q, $, nn, en = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;

  function tn(n, e, i) {
    for (var t = e + i, r = e; n[r] && !(r >= t);) ++r;
    if (r - e > 16 && n.subarray && en) return en.decode(n.subarray(e, r));
    for (var a = ""; e < r;) {
      var o = n[e++];
      if (128 & o) {
        var l = 63 & n[e++];
        if (192 != (224 & o)) {
          var u = 63 & n[e++];
          if ((o = 224 == (240 & o) ? (15 & o) << 12 | l << 6 | u : (7 & o) << 18 | l << 12 | u << 6 | 63 & n[e++]) < 65536) a += String.fromCharCode(o);
          else {
            var f = o - 65536;
            a += String.fromCharCode(55296 | f >> 10, 56320 | 1023 & f)
          }
        } else a += String.fromCharCode((31 & o) << 6 | l)
      } else a += String.fromCharCode(o)
    }
    return a
  }

  function e(n) {
    return rn(n)
  }

  function rn(n, e) {
    return n ? tn(V, n, e) : ""
  }

  function an(n, e, i, t) {
    if (!(t > 0)) return 0;
    for (var r = i, a = i + t - 1, o = 0; o < n.length; ++o) {
      var l = n.charCodeAt(o);
      if (l >= 55296 && l <= 57343) l = 65536 + ((1023 & l) << 10) | 1023 & n.charCodeAt(++o);
      if (l <= 127) {
        if (i >= a) break;
        e[i++] = l
      } else if (l <= 2047) {
        if (i + 1 >= a) break;
        e[i++] = 192 | l >> 6, e[i++] = 128 | 63 & l
      } else if (l <= 65535) {
        if (i + 2 >= a) break;
        e[i++] = 224 | l >> 12, e[i++] = 128 | l >> 6 & 63, e[i++] = 128 | 63 & l
      } else {
        if (i + 3 >= a) break;
        e[i++] = 240 | l >> 18, e[i++] = 128 | l >> 12 & 63, e[i++] = 128 | l >> 6 & 63, e[i++] = 128 | 63 & l
      }
    }
    return e[i] = 0, i - r
  }

  function on(n, e, i) {
    return an(n, V, e, i)
  }

  function ln(n) {
    for (var e = 0, i = 0; i < n.length; ++i) {
      var t = n.charCodeAt(i);
      t >= 55296 && t <= 57343 && (t = 65536 + ((1023 & t) << 10) | 1023 & n.charCodeAt(++i)), t <= 127 ? ++e : e += t <= 2047 ? 2 : t <= 65535 ? 3 : 4
    }
    return e
  }

  function un(n) {
    var e = ln(n) + 1,
      i = Bg(e);
    return i && an(n, H, i, e), i
  }

  function fn(n) {
    var e = ln(n) + 1,
      i = Lg(e);
    return an(n, H, i, e), i
  }

  function cn(n, e) {
    H.set(n, e)
  }

  function sn(n, e, i) {
    for (var t = 0; t < n.length; ++t) H[e++ >> 0] = n.charCodeAt(t);
    i || (H[e >> 0] = 0)
  }

  function dn(n, e) {
    return n % e > 0 && (n += e - n % e), n
  }

  function pn(e) {
    q = e, n.HEAP8 = window.EMSCRIPTEN_HEAP8 = H = new Int8Array(e), n.HEAP16 = window.EMSCRIPTEN_HEAP16 = Y = new Int16Array(e), n.HEAP32 = window.EMSCRIPTEN_HEAP32 = Z = new Int32Array(e), n.HEAPU8 = window.EMSCRIPTEN_HEAPU8 = V = new Uint8Array(e), n.HEAPU16 = window.EMSCRIPTEN_HEAPU16 = J = new Uint16Array(e), n.HEAPU32 = window.EMSCRIPTEN_HEAPU32 = Q = new Uint32Array(e), n.HEAPF32 = window.EMSCRIPTEN_HEAPF32 = $ = new Float32Array(e), n.HEAPF64 = window.EMSCRIPTEN_HEAPF64 = nn = new Float64Array(e)
  }
  var mn = 5242880,
    yn = (n.INITIAL_MEMORY, []),
    vn = [],
    _n = [],
    gn = [],
    hn = [],
    wn = !1;

  function Sn() {
    if (n.preRun)
      for ("function" == typeof n.preRun && (n.preRun = [n.preRun]); n.preRun.length;) An(n.preRun.shift());
    Nn(yn)
  }

  function Cn() {
    wn = !0, n.noFSInit || Xc.init.initialized || Xc.init(), void 0 !== Ar && Ar(unityNamespace.ttlAssetBundle ? unityNamespace.ttlAssetBundle : 5), Dc.init(), Fc.root = Xc.mount(Fc, {}, null), Es.root = Xc.mount(Es, {}, null), Nn(vn)
  }

  function En() {
    Xc.ignorePermissions = !1, Nn(_n)
  }

  function Wn() {
    !0
  }

  function bn() {
    if (n.postRun)
      for ("function" == typeof n.postRun && (n.postRun = [n.postRun]); n.postRun.length;) Mn(n.postRun.shift());
    Nn(hn)
  }

  function An(n) {
    yn.unshift(n)
  }

  function Dn(n) {
    vn.unshift(n)
  }

  function Mn(n) {
    hn.unshift(n)
  }
  var kn = GameGlobal.unityNamespace.runDependencies = 0,
    xn = null,
    Xn = null;

  function jn(e) {
    GameGlobal.manager.Logger.eventLog("addRunDependency: ", e), kn++, n.monitorRunDependencies && n.monitorRunDependencies(kn, e)
  }

  function Tn(e) {
    if (GameGlobal.manager.Logger.eventLog("removeRunDependency: ", e), kn--, n.monitorRunDependencies && n.monitorRunDependencies(kn, e), 0 == kn && (null !== xn && (clearInterval(xn), xn = null), Xn)) {
      var i = Xn;
      Xn = null, i()
    }
  }

  function r(e) {
    throw n.onAbort && n.onAbort(e), x(e += ""), I = !0, O = 1, n.IsWxGame && window.WXWASMSDK.WXUncaughtException(!0), e = "abort(" + e + "). Build with -s ASSERTIONS=1 for more info.", new WebAssembly.RuntimeError(e)
  }
  n.preloadedImages = {}, n.preloadedAudios = {};
  var Ln = "data:application/octet-stream;base64,";

  function Fn(n) {
    return n.startsWith(Ln)
  }

  function Pn(n) {
    return n.startsWith("file://")
  }
  var Rn, Bn, Gn = "build.wasm";

  function On() {
    if (!L && (h || w)) {
      if ("function" == typeof fetch && !Pn(Gn)) return fetch(Gn, {
        credentials: "same-origin"
      }).then((function(n) {
        if (!n.ok) throw "failed to load wasm binary file at '" + Gn + "'";
        return n.arrayBuffer()
      })).catch((function() {}));
      if (W && !n.IsWxGame) return new Promise((function(n, e) {
        W(Gn, (function(e) {
          n(new Uint8Array(e))
        }), e)
      }))
    }
    return Promise.resolve().then((function() {}))
  }

  function In() {
    var e = {
      a: wg,
      wx: {
        ignore_opt_glue_apis: ["glGenTextures", "glBindTexture", "glDeleteTextures", "glFramebufferTexture2D", "glIsTexture", "glCompressedTexImage2D", "glGetString"],
        wx_disable_wasm_opt: (wx.getDeviceInfo ? "ios" == wx.getDeviceInfo().platform : "ios" == wx.getSystemInfoSync().platform) ? 2 == GameGlobal.managerConfig.contextConfig.contextType ? 1 : 0 : 1
      }
    };

    function i(e, i) {
      var t = e.exports;
      n.asm = t, pn((B = n.asm.vq).buffer), n.asm.Yq, Dn(n.asm.wq), n.wasmInstantiated && (n.wasmInstantiated(), Tn("wasm-instantiate"))
    }

    function t(n) {
      i(n.instance)
    }

    function a(i) {
      return On().then((function(i) {
        return n.wasmBin ? WebAssembly.instantiate(n.wasmBin, e) : WebAssembly.instantiate(n.wasmPath, e)
      })).then(i, (function(n) {
        x("failed to asynchronously prepare wasm: " + n), r(n)
      }))
    }
    if (jn("wasm-instantiate"), jn("wasm-preloadAssets"), GameGlobal.manager.TimeLogger.timeStart("wasm编译耗时"), n.instantiateWasm) try {
      return n.instantiateWasm(e, i)
    } catch (n) {
      return x("Module.instantiateWasm callback failed with error: " + n), !1
    }
    return L || "function" != typeof WebAssembly.instantiateStreaming || Fn(Gn) || Pn(Gn) || "function" != typeof fetch ? a(t) : fetch(Gn, {
      credentials: "same-origin"
    }).then((function(n) {
      return WebAssembly.instantiateStreaming(n, e).then(t, (function(n) {
        return x("wasm streaming compile failed: " + n), x("falling back to ArrayBuffer instantiation"), a(t)
      }))
    })), {}
  }
  Fn(Gn) || (Gn = M(Gn));
  var Kn = {
    5423616: function() {
      return n.webglContextAttributes.premultipliedAlpha
    },
    5423677: function() {
      return n.webglContextAttributes.preserveDrawingBuffer
    },
    5423741: function() {
      return n.webglContextAttributes.powerPreference
    }
  };

  function Nn(e) {
    for (; e.length > 0;) {
      var i = e.shift();
      if ("function" != typeof i) {
        var t = i.func;
        "number" == typeof t ? void 0 === i.arg ? $g.call(null, t) : (r = i.arg, Yg.apply(null, [t, r])) : t(void 0 === i.arg ? null : i.arg)
      } else i(n)
    }
    var r
  }

  function Un(n) {
    return n.replace(/\b_Z[\w\d_]+/g, (function(n) {
      return n === n ? n : n + " [" + n + "]"
    }))
  }

  function zn(e, i, t) {
    var r = n["dynCall_" + e];
    return t && t.length ? r.apply(null, [i].concat(t)) : r.call(null, i)
  }

  function qn(n, e, i) {
    return zn(n, e, i)
  }

  function Hn() {
    var n = new Error;
    if (!n.stack) {
      try {
        throw new Error
      } catch (e) {
        n = e
      }
      if (!n.stack) return "(no stack trace available)"
    }
    return n.stack.toString()
  }
  var Vn = 0;

  function Yn() {
    return G || Vn > 0
  }

  function Jn() {
    var e = Hn();
    return n.extraStackTrace && (e += "\n" + n.extraStackTrace()), Un(e)
  }

  function Zn(n) {
    var e = GameGlobal.dnSDK.track("AD_CLICK", {
      ad_placement_name: n
    });
    null != e && 0 !== e.code ? console.warn("WXAMS AD_CLICK failed, code:", e.code, "message:", e.message) : null != e && 0 === e.code && console.log("WXAMS AD_CLICK success")
  }

  function Qn(n) {
    var e = GameGlobal.dnSDK.track("AD_PLACEMENT_SHOW", {
      ad_placement_name: n
    });
    null != e && 0 !== e.code ? console.warn("WXAMS AD_PLACEMENT_SHOW failed, code:", e.code, "message:", e.message) : null != e && 0 === e.code && console.log("WXAMS AD_PLACEMENT_SHOW success")
  }

  function $n(n) {
    var e = GameGlobal.dnSDK.track("AD_VIDEO_FINISH", {
      ad_placement_name: n
    });
    null != e && 0 !== e.code ? console.warn("WXAMS AD_VIDEO_FINISH failed, code:", e.code, "message:", e.message) : null != e && 0 === e.code && console.log("WXAMS AD_VIDEO_FINISH success")
  }

  function ne() {
    var n = GameGlobal.dnSDK.track("AD_IMPRESSION", {
      ad_type: 4
    });
    null != n && 0 !== n.code ? console.warn("WXAMS BANNER_SHOW failed, code:", n.code, "message:", n.message) : null != n && 0 === n.code && console.log("WXAMS BANNER_SHOW success")
  }

  function ee(n) {
    window.WXWASMSDK.CheckIsAddedToMyMiniProgram(n)
  }
  var ie = {};

  function te() {
    return void 0 !== ie.fs
  }

  function re(n, e, i, t, r) {
    window.WXWASMSDK.CreateFeedBackButton(n, e, i, t, r)
  }

  function ae(n) {
    var e = La(n);
    window.WXWASMSDK.DestroyPageManager(e)
  }

  function oe(n) {
    "undefined" != typeof GameGlobal && GameGlobal.monkeyCallback(La(n))
  }

  function le() {
    var n = GameGlobal.dnSDK.track("AD_IMPRESSION", {
      ad_type: 3
    });
    null != n && 0 !== n.code ? console.warn("WXAMS GRIDAD_SHOW failed, code:", n.code, "message:", n.message) : null != n && 0 === n.code && console.log("WXAMS GRIDAD_SHOW success")
  }

  function ue(n) {
    var e = La(n),
      i = window.WXWASMSDK.GetABValue(e),
      t = ln(i) + 1,
      r = Bg(t);
    return on(i, r, t), r
  }

  function fe(n) {
    window.WXWASMSDK.GetAuthorizeSetting(n)
  }

  function ce(n) {
    var e = La(n),
      i = window.WXWASMSDK.GetJsonValue(e),
      t = ln(i) + 1,
      r = Bg(t);
    return on(i, r, t), r
  }

  function se() {
    var n = ln(ie.cache.obsolete) + 1,
      e = Bg(n);
    return on(ie.cache.obsolete, e, n), ie.cache.obsolete = "", e
  }

  function de() {
    window.WXWASMSDK.GetPrivacySetting()
  }

  function pe() {
    window.WXWASMSDK.GetSubGameUpdateStatus()
  }

  function me() {
    var n = window.WXWASMSDK.GetWXDATA_CDN(),
      e = ln(n) + 1,
      i = Bg(e);
    return on(n, i, e), i
  }

  function ye() {
    window.WXWASMSDK.HideFeedBackButton()
  }

  function ve() {
    var n = GameGlobal.dnSDK.track("AD_IMPRESSION", {
      ad_type: 2
    });
    null != n && 0 !== n.code ? console.warn("WXAMS INTERSTITIAL_SHOW failed, code:", n.code, "message:", n.message) : null != n && 0 === n.code && console.log("WXAMS INTERSTITIAL_SHOW success")
  }

  function _e() {
    return window.WXWASMSDK.IsInitWXAMS
  }

  function ge() {
    return !!window.wx.createPageManager
  }

  function he(n, e, i, t, r, a, o, l, u, f) {
    console.log("call JSReportUnityProfileData \n");
    let c = {
      timestamp: (new Date).getTime(),
      fps: {
        targetFrameRate: n,
        avgEXFrameTime: Nr()
      },
      profiler: {
        monoHeapReserved: e,
        monoHeapUsed: i,
        nativeReserved: t,
        nativeUnused: r,
        nativeAllocated: a
      },
      render: {
        setPassCalls: o,
        drawCalls: l,
        vertices: u,
        trianglesCount: f
      },
      webassembly: {
        totalHeapMemory: Jr(),
        dynamicMemory: Kr(),
        usedHeapMemory: $r(),
        unAllocatedMemory: Qr()
      },
      assetbundle: {
        numberInMemory: Pr(),
        numberOnDisk: Rr(),
        sizeInMemory: Br(),
        sizeOnDisk: Gr()
      }
    };
    GameGlobal.manager.getGameDataMonitor().reportUnityProfileData(c)
  }

  function we() {
    console.log("call JSStartGameDataMonitor \n"), "function" == typeof GameGlobal.manager.getGameDataMonitor ? GameGlobal.manager.getGameDataMonitor().start() : console.log("GameGlobal.manager.getGameDataMonitor is not a function \n")
  }
  var Se = null,
    Ce = 0;

  function Ee() {
    return Se && Se.activated || 0 != Ce
  }
  var We = 1,
    be = {
      x: 0,
      y: 0,
      z: 0
    };

  function Ae() {
    be = {
      x: Se.x * We,
      y: Se.y * We,
      z: Se.z * We
    }, 0 != Ce && cS(Ce, be.x, be.y, be.z)
  }
  var De = 0,
    Me = 0,
    ke = 0,
    xe = 0,
    Xe = 0;

  function je(n, e) {
    var i = {
        x: n.x - e.x,
        y: n.y - e.y,
        z: n.z - e.z
      },
      t = i.x * i.x + i.y * i.y + i.z * i.z,
      r = {
        x: n.x + e.x,
        y: n.y + e.y,
        z: n.z + e.z
      };
    return t <= r.x * r.x + r.y * r.y + r.z * r.z ? i : r
  }

  function Te(n) {
    var e = {
      x: n.accelerationIncludingGravity.x * We,
      y: n.accelerationIncludingGravity.y * We,
      z: n.accelerationIncludingGravity.z * We
    };
    0 != Ce && cS(Ce, e.x, e.y, e.z);
    var i = {
      x: n.acceleration.x * We,
      y: n.acceleration.y * We,
      z: n.acceleration.z * We
    };
    if (0 != ke && cS(ke, i.x, i.y, i.z), 0 != xe) {
      var t = je(e, i);
      cS(xe, t.x, t.y, t.z)
    }
    if (0 != Xe) {
      var r = Math.PI / 180;
      cS(Xe, n.rotationRate.alpha * r, n.rotationRate.beta * r, n.rotationRate.gamma * r)
    }
  }
  var Le = 0;

  function Fe(n) {
    1 & n && "function" == typeof DeviceOrientationEvent.requestPermission && DeviceOrientationEvent.requestPermission().then((function(n) {
      "granted" === n ? Le &= -2 : T("DeviceOrientationEvent permission not granted")
    })).catch((function(n) {
      T(n), Le |= 1
    })), 2 & n && "function" == typeof DeviceMotionEvent.requestPermission && DeviceMotionEvent.requestPermission().then((function(n) {
      "granted" === n ? Le &= -3 : T("DeviceMotionEvent permission not granted")
    })).catch((function(n) {
      T(n), Le |= 2
    }))
  }

  function Pe() {
    0 == Ce && 0 == ke && 0 == xe && 0 == Xe && (Fe(2), window.addEventListener("devicemotion", Te))
  }

  function Re() {
    var n = 9.80665;
    We = /(iPhone|iPad|Macintosh)/i.test(navigator.userAgent) ? 1 / n : -1 / n
  }

  function Be(n, e) {
    if (Re(), "undefined" == typeof Accelerometer) return Pe(), void(0 != n && (Ce = n));

    function i(n) {
      (Se = new Accelerometer({
        frequency: n,
        referenceFrame: "device"
      })).addEventListener("reading", Ae), Se.addEventListener("error", (function(n) {
        T(n.error ? n.error : n)
      })), Se.start(), Me = n
    }
    0 != n && (Ce = n), Se ? Me != e && (Se.stop(), Se.removeEventListener("reading", Ae), i(e)) : 0 != De ? De = e : (De = e, navigator.permissions.query({
      name: "accelerometer"
    }).then((function(n) {
      "granted" === n.state ? i(De) : T("No permission to use Accelerometer."), De = 0
    })))
  }

  function Ge() {
    0 == Ce && 0 == ke && 0 == xe && 0 == Xe && window.removeEventListener("devicemotion", Mi)
  }

  function Oe() {
    Se ? ("undefined" == typeof GravitySensor && 0 != xe || (Se.stop(), Se.removeEventListener("reading", Ae), Se = null), Ce = 0, Me = 0) : 0 != Ce && (Ce = 0, Ge())
  }
  var Ie = 0;

  function Ke(e) {
    if (!Ie) try {
      $g.call(null, e)
    } catch (e) {
      throw Ie = 1, x("Uncaught exception from main loop:"), x(e), x("Halting program."), n.errorHandler && n.errorHandler(e), e
    }
  }

  function Ne(e, i) {
    for (var t = "", r = 0; r < i; r++) t += String.fromCharCode(V[e + r]);
    n.canvas.style.cursor = "url(data:image/cur;base64," + btoa(t) + "),default"
  }

  function Ue(e) {
    n.canvas.style.cursor = e ? "default" : "none"
  }

  function ze(n) {
    return void 0 !== window.CSS && void 0 !== window.CSS.escape ? window.CSS.escape(n) : n.replace(/(#|\.|\+|\[|\]|\(|\)|\{|\})/g, "\\$1")
  }

  function qe() {
    return "#" + ze(n.canvas ? n.canvas.id : "unity-canvas")
  }

  function He(n, e, i, t) {
    var r = document.querySelector(qe()),
      a = r && r.getBoundingClientRect();
    Q[i >> 2] = n - (a ? a.left : 0), Q[t >> 2] = e - (a ? a.top : 0)
  }

  function Ve(n) {
    var e = ln(n) + 1,
      i = Bg(e);
    return on(n, i, e), i
  }

  function Ye() {
    var n = qe();
    return Ye.selector != n && (Gg(Ye.ptr), Ye.ptr = Ve(n), Ye.selector = n), Ye.ptr
  }

  function Je(n) {
    var e = rn(n);
    window.open(e, "_blank", "")
  }
  var Ze = {
    numPendingSync: 0,
    syncInternal: 1e3,
    syncInProgress: !1,
    sync: function(n) {
      if (n) {
        if (0 == Ze.numPendingSync) return
      } else if (Ze.syncInProgress) return void Ze.numPendingSync++;
      Ze.syncInProgress = !0, Xc.syncfs(!1, (function(n) {
        Ze.syncInProgress = !1
      })), Ze.numPendingSync = 0
    }
  };

  function Qe() {
    n.indexedDB && n.indexedDB && n.setInterval((function() {
      Ze.sync(!0)
    }), Ze.syncInternal)
  }

  function $e() {
    n.indexedDB && (xc.queuePersist(n.__unityIdbfsMount.mount), window.warnedAboutManualFilesystemSyncGettingDeprecated || (window.warnedAboutManualFilesystemSyncGettingDeprecated = !0, n.autoSyncPersistentDataPath || console.warn("Manual synchronization of Unity Application.persistentDataPath via JS_FileSystem_Sync() is deprecated and will be later removed in a future Unity version. The persistent data directory will be automatically synchronized instead on file modification. Pass config.autoSyncPersistentDataPath = true; to configuration in createUnityInstance() to opt in to the new behavior.")))
  }
  var ni = null;

  function ei() {
    return "undefined" != typeof GravitySensor ? ni && ni.activated : 0 != xe
  }

  function ii() {
    0 != xe && cS(xe, ni.x * We, ni.y * We, ni.z * We)
  }
  var ti = 0,
    ri = null;

  function ai() {
    var n = {
      x: ri.x * We,
      y: ri.y * We,
      z: ri.z * We
    };
    if (0 != ke && cS(ke, n.x, n.y, n.z), 0 != xe && "undefined" == typeof GravitySensor) {
      var e = je(be, n);
      cS(xe, e.x, e.y, e.z)
    }
  }
  var oi = 0,
    li = 0;

  function ui(n, e) {
    if (Re(), "undefined" == typeof LinearAccelerationSensor) return Pe(), void(0 != n && (ke = n));

    function i(n) {
      (ri = new LinearAccelerationSensor({
        frequency: n,
        referenceFrame: "device"
      })).addEventListener("reading", ai), ri.addEventListener("error", (function(n) {
        T(n.error ? n.error : n)
      })), ri.start(), li = n
    }
    0 != n && (ke = n), ri ? li != e && (ri.stop(), ri.removeEventListener("reading", ai), i(e)) : 0 != oi ? oi = e : (oi = e, navigator.permissions.query({
      name: "accelerometer"
    }).then((function(n) {
      "granted" === n.state ? i(oi) : T("No permission to use LinearAccelerationSensor."), oi = 0
    })))
  }

  function fi(n, e) {
    if ("undefined" == typeof GravitySensor) return Be(0, Math.max(e, Me)), ui(0, Math.max(e, li)), void(xe = n);

    function i(n) {
      (ni = new GravitySensor({
        frequency: n,
        referenceFrame: "device"
      })).addEventListener("reading", ii), ni.addEventListener("error", (function(n) {
        T(n.error ? n.error : n)
      })), ni.start()
    }
    Re(), xe = n, ni ? (ni.stop(), ni.removeEventListener("reading", ii), i(e)) : 0 != ti ? ti = e : (ti = e, navigator.permissions.query({
      name: "accelerometer"
    }).then((function(n) {
      "granted" === n.state ? i(ti) : T("No permission to use GravitySensor."), ti = 0
    })))
  }

  function ci() {
    ri ? ("undefined" == typeof GravitySensor && 0 != xe || (ri.stop(), ri.removeEventListener("reading", ai), ri = null), ke = 0, li = 0) : 0 != ke && (ke = 0, Ge())
  }

  function si() {
    if (xe = 0, "undefined" == typeof GravitySensor) return 0 == Ce && Oe(), void(0 == ke && ci());
    ni && (ni.stop(), ni.removeEventListener("reading", ii), ni = null)
  }

  function di(n) {
    try {
      $g.call(null, n)
    } catch (n) {
      console.warn(n)
    }
  }
  var pi = null;

  function mi() {
    return pi && pi.activated || 0 != Xe
  }

  function yi() {
    0 != Xe && cS(Xe, pi.x, pi.y, pi.z)
  }
  var vi = 0;

  function _i(n, e) {
    if ("undefined" == typeof Gyroscope) return Pe(), void(Xe = n);

    function i(n) {
      (pi = new Gyroscope({
        frequency: n,
        referenceFrame: "device"
      })).addEventListener("reading", yi), pi.addEventListener("error", (function(n) {
        T(n.error ? n.error : n)
      })), pi.start()
    }
    Xe = n, pi ? (pi.stop(), pi.removeEventListener("reading", yi), i(e)) : 0 != vi ? vi = e : (vi = e, navigator.permissions.query({
      name: "gyroscope"
    }).then((function(n) {
      "granted" === n.state ? i(vi) : T("No permission to use Gyroscope."), vi = 0
    })))
  }

  function gi() {
    pi ? (pi.stop(), pi.removeEventListener("reading", yi), pi = null, Xe = 0) : 0 != Xe && (Xe = 0, Ge())
  }

  function hi() {
    if (n.IsWxGame) return;
    const e = function(n) {
      "canvas" !== n.target.localName && Sg()
    };
    document.addEventListener("contextmenu", e), n.deinitializers.push((function() {
      document.removeEventListener("contextmenu", e)
    }))
  }

  function wi() {
    return ri && ri.activated || 0 != ke
  }

  function Si(n, e) {
    var i = rn(n);
    switch ("function" == typeof dump && dump(i), e) {
      case 0:
      case 1:
      case 4:
        if (i.startsWith("An abnormal situation")) {
          if (null != GameGlobal.logAbNormalOnce) return;
          GameGlobal.logAbNormalOnce = 1
        }
        if (i.indexOf("is corrupted! Remove it and launch unity again!") > -1) return;
        return void x(i);
      case 2:
        return void console.warn(i);
      case 3:
      case 5:
        return void console.log(i);
      default:
        x("Unknown console message type!"), x(i)
    }
  }

  function Ci(n, e) {
    var i = Jn();
    return n && on(i, n, e), ln(i)
  }
  var Ei = null,
    Wi = 0;

  function bi() {
    return Ei && Ei.activated || 0 != Wi
  }

  function Ai() {
    0 != Wi && fS(Wi, Ei.quaternion[0], Ei.quaternion[1], Ei.quaternion[2], Ei.quaternion[3])
  }
  var Di = 0;

  function Mi(n) {
    if (Wi) {
      var e = Math.PI / 180,
        i = n.beta * e,
        t = n.gamma * e,
        r = n.alpha * e,
        a = Math.cos(i / 2),
        o = Math.sin(i / 2),
        l = Math.cos(t / 2),
        u = Math.sin(t / 2),
        f = Math.cos(r / 2),
        c = Math.sin(r / 2);
      fS(Wi, o * l * f - a * u * c, a * u * f + o * l * c, a * l * c + o * u * f, a * l * f - o * u * c)
    }
  }

  function ki(n, e) {
    function i(n) {
      (Ei = new RelativeOrientationSensor({
        frequency: n,
        referenceFrame: "device"
      })).addEventListener("reading", Ai), Ei.addEventListener("error", (function(n) {
        T(n.error ? n.error : n)
      })), Ei.start()
    }
    "undefined" != typeof RelativeOrientationSensor ? (Wi = n, Ei ? (Ei.stop(), Ei.removeEventListener("reading", Ai), i(e)) : 0 != Di ? Di = e : (Di = e, Promise.all([navigator.permissions.query({
      name: "accelerometer"
    }), navigator.permissions.query({
      name: "gyroscope"
    })]).then((function(n) {
      n.every((function(n) {
        return "granted" === n.state
      })) ? i(Di) : T("No permissions to use RelativeOrientationSensor."), Di = 0
    })))) : 0 == Wi && (Wi = n, Fe(1), window.addEventListener("deviceorientation", Mi))
  }

  function xi() {
    Ei ? (Ei.stop(), Ei.removeEventListener("reading", Ai), Ei = null) : 0 != Wi && window.removeEventListener("deviceorientation", Mi), Wi = 0
  }

  function Xi() {
    0 != Le && Fe(Le)
  }

  function ji() {
    n.QuitCleanup()
  }
  var Ti = 0;

  function Li() {
    Ti && Zg(Ti, window.innerWidth, window.innerHeight, screen.orientation ? screen.orientation.angle : window.orientation)
  }

  function Fi() {
    Ti = 0, window.removeEventListener("resize", Li), screen.orientation && screen.orientation.removeEventListener("change", Li)
  }

  function Pi(n) {
    Ti || (screen.orientation && screen.orientation.addEventListener("change", Li), window.addEventListener("resize", Li), Ti = n, setTimeout(Li, 0))
  }
  var Ri = -1,
    Bi = -1,
    Gi = -1;

  function Oi(n) {
    screen.orientation && screen.orientation.lock && (Ri = n, -1 == Gi && n != Bi && (Gi = setTimeout((function n() {
      var e = ["any", 0, "landscape", "portrait", "portrait-primary", "portrait-secondary", "landscape-primary", "landscape-secondary"][Bi = Ri];
      screen.orientation.lock(e).then((function() {
        Gi = Ri != Bi ? setTimeout(n, 0) : -1
      })).catch((function(n) {
        T(n), Gi = -1
      }))
    }), 0)))
  }

  function Ii(n, e) {
    var i = UnityLoader.SystemInfo.browser;
    return n && on(i, n, e), ln(i)
  }

  function Ki(n, e) {
    var i = UnityLoader.SystemInfo.browserVersion;
    return n && on(i, n, e), ln(i)
  }

  function Ni(e, i, t) {
    var r = rn(e),
      a = "#canvas" == r ? n.canvas : document.querySelector(r),
      o = 0,
      l = 0;
    if (a) {
      var u = a.getBoundingClientRect();
      o = u.width, l = u.height
    }
    nn[i >> 3] = o, nn[t >> 3] = l
  }

  function Ui(n, e) {
    return n && on(GameGlobal.unityNamespace.DATA_CDN || "https://game.weixin.qq.com", n, e), ln(GameGlobal.unityNamespace.DATA_CDN || "https://game.weixin.qq.com")
  }

  function zi(n, e) {
    var i = UnityLoader.SystemInfo.gpu;
    return n && on(i, n, e), ln(i)
  }

  function qi(n, e) {
    var i = UnityLoader.SystemInfo.language;
    return n && on(i, n, e), ln(i)
  }

  function Hi() {
    return n.matchWebGLToCanvasSize || void 0 === n.matchWebGLToCanvasSize
  }

  function Vi() {
    return V.length / 1048576
  }

  function Yi(n, e) {
    var i = UnityLoader.SystemInfo.os + " " + UnityLoader.SystemInfo.osVersion;
    return n && on(i, n, e), ln(i)
  }

  function Ji() {
    return 0 == n.matchWebGLToCanvasSize ? 1 : n.devicePixelRatio || window.devicePixelRatio || 1
  }

  function Zi(n, e) {
    nn[n >> 3] = UnityLoader.SystemInfo.width, nn[e >> 3] = UnityLoader.SystemInfo.height
  }

  function Qi(e, i) {
    return n.IsWxGame && (n.streamingAssetsUrl = n.resolveBuildUrl("StreamingAssets")), e && on(n.streamingAssetsUrl, e, i), ln(n.streamingAssetsUrl)
  }

  function $i() {
    var e = sg.getExtension("WEBGL_compressed_texture_astc");
    return !(!e || !e.getSupportedProfiles) && (!n.IsWxGame && e.getSupportedProfiles().includes("hdr"))
  }

  function nt() {
    return UnityLoader.SystemInfo.hasCursorLock
  }

  function et() {
    return UnityLoader.SystemInfo.hasFullscreen
  }

  function it() {
    return UnityLoader.SystemInfo.hasWebGL
  }

  function tt() {
    return UnityLoader.SystemInfo.mobile
  }

  function rt() {
    return !!n.shouldQuit
  }
  var at = {
    requests: {},
    responses: {},
    abortControllers: {},
    timer: {},
    nextRequestId: 1
  };

  function ot(n) {
    var e = at.abortControllers[n];
    e && !e.signal.aborted && e.abort()
  }

  function lt(n, e) {
    var i = rn(n),
      t = rn(e),
      r = new GameGlobal.unityNamespace.UnityLoader.UnityCache.XMLHttpRequest;
    GameGlobal.TEXTURE_PARALLEL_BUNDLE && GameGlobal.ParalleLDownloadTexture(i);
    var a = {
      url: i,
      init: {
        method: t,
        signal: r.signal,
        headers: {},
        enableStreamingDownload: !1
      },
      tempBuffer: null,
      tempBufferSize: 0
    };
    return at.abortControllers[at.nextRequestId] = r, at.requests[at.nextRequestId] = a, at.nextRequestId++
  }

  function ut(n) {
    var e = at.responses[n];
    if (!e) return "";
    if (e.headerString) return e.headerString;
    for (var i = "", t = e.headers.entries(), r = t.next(); !r.done; r = t.next()) i += r.value[0] + ": " + r.value[1] + "\r\n";
    return e.headerString = i, i
  }

  function ft(n, e, i, t, r) {
    var a = at.responses[n];
    if (!a) return on("", e, i), void on("", t, r);
    e && on(ut(n), e, i);
    t && on(a.url, t, r)
  }

  function ct(n, e) {
    var i = at.responses[n];
    if (!i) return Q[e >> 2] = 0, void(Q[1 + (e >> 2)] = 0);
    var t = ut(n);
    Q[e >> 2] = ln(t), Q[1 + (e >> 2)] = ln(i.url)
  }

  function st(n) {
    at.timer[n] && clearTimeout(at.timer[n]), delete at.requests[n], delete at.responses[n], delete at.abortControllers[n], delete at.timer[n]
  }

  function dt(n, e, i, t) {
    var r = at.abortControllers[n];
    r.retryCount = r.retryCount || 0, r.retryCount++;
    var a = new GameGlobal.unityNamespace.UnityLoader.UnityCache.XMLHttpRequest;
    a.open("GET", r.paramsCache.url, !0), a.responseType = r.responseType, a.onload = function() {
      if (r.status >= 400 && t) return setTimeout((function() {
        dt(n, e, i)
      }), 1e3), !1;
      if (i) {
        var o = new Uint8Array(a.response);
        if (0 != o.length) {
          var l = Bg(o.length);
          V.set(o, l), qn("viiiiii", i, [e, a.status, l, o.length, 0, 0])
        } else qn("viiiiii", i, [e, a.status, 0, 0, 0, 0])
      }
    }, a.send(r.postData), a.onerror = r.onerror, a.ontimeout = r.ontimeout, a.onabort = r.onabort, console.error("load url error:" + r.paramsCache.url), GameGlobal.logmanager.warn("load url error:" + r.paramsCache.url), GameGlobal.realtimeLogManager.error("load url error:" + r.paramsCache.url)
  }

  function pt(e, i, t, r, a, o) {
    var l = at.requests[e],
      u = at.abortControllers[e];

    function f() {
      at.timer[e] && (clearTimeout(at.timer[e]), delete at.timer[e])
    }

    function c(n, i) {
      if (u.retryCount = u.retryCount || 0, void 0 !== u && "GET" === u.paramsCache.method && /\b(settings|catalog)\.json\b/.test(u.paramsCache.url) && u.retryCount < 2) return setTimeout((function() {
        dt(e, r, a)
      }), 1e3);
      if (f(), a) {
        var t = ln(n) + 1,
          o = Bg(t);
        on(n, o, t), qn("viiiiii", a, [r, 500, 0, 0, o, i]), Gg(o), l.tempBuffer && Gg(l.tempBuffer)
      }
    }

    function s(n) {
      if (o && n.lengthComputable) {
        var i = n.response;
        if (at.responses[e] = i, n.chunk) {
          var t = function(n) {
            if (!l.tempBuffer) {
              const e = Math.max(n, 1024);
              l.tempBuffer = Bg(e), l.tempBufferSize = e
            }
            return l.tempBufferSize < n && (Gg(l.tempBuffer), l.tempBuffer = Bg(n), l.tempBufferSize = n), l.tempBuffer
          }(n.chunk.length);
          V.set(n.chunk, t), qn("viiiiii", o, [r, i.status, n.loaded, n.total, t, n.chunk.length])
        } else qn("viiiiii", o, [r, i.status, n.loaded, n.total, 0, 0])
      }
    }
    try {
      if (t > 0) {
        var d = V.subarray(i, i + t);
        l.init.body = d
      }
      l.timeout && (at.timer[e] = setTimeout((function() {
        l.isTimedOut = !0, u.abort()
      }), l.timeout));
      n.fetchWithProgress;
      l.init.onProgress = s, n.companyName && n.productName && n.cachedFetch && (n.cachedFetch, l.init.companyName = n.companyName, l.init.productName = n.productName, l.control = n.cacheControl(l.url)), (0, u.openAndSend)(l.url, l.init).then((function(n) {
        at.responses[e] = n,
          function(n, e) {
            if (f(), a) {
              s({
                response: n,
                loaded: !0,
                lengthComputable: !0,
                total: 100,
                type: "progress"
              });
              if (l.init.enableStreamingDownload) qn("viiiiii", a, [r, n.status, 0, e.length, 0, 0]);
              else if (void 0 !== ie && ie.isWXAssetBundle(n.url)) {
                if (!n.url.startsWith(GameGlobal.unityNamespace.DATA_CDN)) {
                  var i = Bg(e.length);
                  return V.set(e, i), void qn("viiiiii", a, [r, n.status, i, e.length, 0, 0])
                }
                var t = n.originXHR;
                if (0 == e.length || t.status >= 400) return GameGlobal.manager.reporter.wxAssetBundle.reportEmptyContent({
                  stage: ie.WXABErrorSteps.kWebRequestResponse,
                  fromCache: t.isReadFromCache,
                  httpStatus: t.status,
                  path: t.paramsCache.url,
                  size: 0
                }), GameGlobal.manager.Logger.pluginLog("[WXAssetBundle]WebRequest status: " + t.status + ", url: " + t.paramsCache.url + " return size " + e.length + " from " + (t.isReadFromCache ? "Cache" : "CDN")), void qn("viiiiii", a, [r, n.status, Bg(1), 1, 0, 0]);
                t.onsave = function(n) {
                  ie.cache.cleanable(ie.path2fd.get(n))
                };
                var o = t.response;
                let l = ie.url2path(n.url),
                  u = ie.path2fd.get(l);
                null == u && (u = ie.newfd(), ie.path2fd.set(l, u));
                let f = ie.fd2wxStream.get(u);
                f = {
                  node: {
                    mode: 32768,
                    usedBytes: e.length
                  },
                  fd: u,
                  path: l,
                  seekable: !0,
                  position: 0,
                  stream_ops: kc.stream_ops,
                  ungotten: [],
                  error: !1
                }, f.stream_ops.read = ie.read, ie.fd2wxStream.set(u, f), ie.cache.put(u, o, t.isReadFromCache), qn("viiiiii", a, [r, t.status, 0, 0, 0, 0]), ie.disk.set(unityNamespace.PathInFileOS(l), e.length)
              } else if (u.ignoreCallback || 0 == e.length) qn("viiiiii", a, [r, n.status, 0, 0, 0, 0]);
              else {
                i = Bg(e.length);
                V.set(e, i), qn("viiiiii", a, [r, n.status, i, e.length, 0, 0])
              }
              l.tempBuffer && Gg(l.tempBuffer)
            }
          }(n, n.parsedBody)
      })).catch((function(n) {
        l.isTimedOut ? c("Connection timed out.", 14) : u.signal.aborted ? c("Aborted.", 17) : c(n.message, 2)
      }))
    } catch (n) {
      c(n.message, 2)
    }
  }

  function mt(n, e) {
    var i = at.requests[n];
    i && (i.init.redirect = 0 === e ? "error" : "follow")
  }

  function yt(n, e, i) {
    var t = at.requests[n];
    if (t) {
      var r = rn(e),
        a = rn(i);
      t.init.headers[r] = a
    }
  }

  function vt(n, e) {
    var i = at.requests[n];
    i && (i.init.timeout = e, i.timeout = e)
  }

  function _t(n) {
    var e = rn(n),
      i = JSON.parse(e);
    const t = GameGlobal.dnSDK.track("LEVEL_ENTER", {
      enter_level_id: i.enter_level_id,
      enter_level_name: i.enter_level_name,
      game_mode: i.game_mode,
      level_id: i.level_id,
      chapter_id: i.chapter_id,
      coin_amount: i.coin_amount,
      stamina_value: i.stamina_value,
      level_value: i.level_value
    });
    null != t && 0 !== t.code ? console.warn("WXAMS LEVEL_ENTER failed, code:", t.code, "message:", t.message) : null != t && 0 === t.code && console.log("WXAMS LEVEL_ENTER success")
  }

  function gt(n) {
    var e = rn(n),
      i = JSON.parse(e);
    const t = GameGlobal.dnSDK.track("LEVEL_EXIT", {
      ad_cnt: i.ad_cnt,
      duration: i.duration,
      enter_level_id: i.enter_level_id,
      game_mode: i.game_mode,
      items: i.items,
      level_id: i.level_id,
      chapter_id: i.chapter_id,
      coin_amount: i.coin_amount,
      stamina_value: i.stamina_value,
      level_value: i.level_value
    });
    null != t && 0 !== t.code ? console.warn("WXAMS LEVEL_EXIT failed, code:", t.code, "message:", t.message) : null != t && 0 === t.code && console.log("WXAMS LEVEL_EXIT success")
  }

  function ht(n) {
    var e = rn(n),
      i = JSON.parse(e);
    const t = GameGlobal.dnSDK.track("LEVEL_LOSE", {
      ad_cnt: i.ad_cnt,
      duration: i.duration,
      enter_level_id: i.enter_level_id,
      game_mode: i.game_mode,
      items: i.items,
      level_id: i.level_id,
      chapter_id: i.chapter_id,
      coin_amount: i.coin_amount,
      stamina_value: i.stamina_value,
      level_value: i.level_value
    });
    null != t && 0 !== t.code ? console.warn("WXAMS LEVEL_LOSE failed, code:", t.code, "message:", t.message) : null != t && 0 === t.code && console.log("WXAMS LEVEL_LOSE success")
  }

  function wt(n) {
    var e = rn(n),
      i = JSON.parse(e);
    const t = GameGlobal.dnSDK.track("LEVEL_PASS", {
      ad_cnt: i.ad_cnt,
      duration: i.duration,
      enter_level_id: i.enter_level_id,
      game_mode: i.game_mode,
      items: i.items,
      level_id: i.level_id,
      chapter_id: i.chapter_id,
      coin_amount: i.coin_amount,
      stamina_value: i.stamina_value,
      level_value: i.level_value
    });
    null != t && 0 !== t.code ? console.warn("WXAMS LEVEL_PASS failed, code:", t.code, "message:", t.message) : null != t && 0 === t.code && console.log("WXAMS LEVEL_PASS success")
  }

  function St() {
    var n = GameGlobal.dnSDK.track("LOAD_FINISH", {});
    null != n && 0 !== n.code ? console.warn("WXAMS LOAD_FINISH failed, code:", n.code, "message:", n.message) : null != n && 0 === n.code && console.log("WXAMS LOAD_FINISH success")
  }

  function Ct() {
    window.WXWASMSDK.OpenPrivacyContract()
  }

  function Et() {
    var n = window.WXWASMSDK.GetOrCreateRecommendPageManager();
    null != n && window.WXWASMSDK.PreLoadPageManager(n, {
      openlink: "TWFRCqV5WeM2AkMXhKwJ03MhfPOieJfAsvXKUbWvQFQtLyyA5etMPabBehga950uzfZcH3Vi3QeEh41xRGEVFw"
    })
  }

  function Wt() {
    var n = GameGlobal.dnSDK.track("RETENTION_5S", {});
    null != n && 0 !== n.code ? console.warn("WXAMS RETENTION_5S failed, code:", n.code, "message:", n.message) : null != n && 0 === n.code && console.log("WXAMS RETENTION_5S success")
  }

  function bt() {
    var n = GameGlobal.dnSDK.track("AD_IMPRESSION", {
      ad_type: 1
    });
    null != n && 0 !== n.code ? console.warn("WXAMS REWARD_AD_SHOW failed, code:", n.code, "message:", n.message) : null != n && 0 === n.code && console.log("WXAMS REWARD_AD_SHOW success")
  }

  function At(n) {
    var e = La(n);
    window.WXWASMSDK.RequestSubscribe(e)
  }

  function Dt(n) {
    var e = La(n).split(";");
    window.WXWASMSDK.RequestSubscribeMulti(e)
  }

  function Mt() {
    window.WXWASMSDK.RequireOpenPrivacyAuthorize()
  }

  function kt() {
    var n = GameGlobal.dnSDK.track("SUBSCRIBE", {});
    null != n && 0 !== n.code ? console.warn("WXAMS SUBSCRIBE failed, code:", n.code, "message:", n.message) : null != n && 0 === n.code && console.log("WXAMS SUBSCRIBE success")
  }

  function xt(n) {
    var e = rn(n);
    GameGlobal.dnSDK.setOpenId(e)
  }

  function Xt(n) {
    "undefined" != typeof GameGlobal && (GameGlobal.UnityUIType = La(n))
  }

  function jt(n, e, i, t, r) {
    var a = La(n),
      o = La(e);
    window.WXWASMSDK.ShowCPSPageManager(a, o, i, t, r)
  }

  function Tt() {
    var n = window.WXWASMSDK.GetOrCreateRecommendPageManager();
    null != n && window.WXWASMSDK.ShowPageManager(n, {
      openlink: "TWFRCqV5WeM2AkMXhKwJ03MhfPOieJfAsvXKUbWvQFQtLyyA5etMPabBehga950uzfZcH3Vi3QeEh41xRGEVFw"
    })
  }

  function Lt() {
    window.WXWASMSDK.SubGameUpdate()
  }

  function Ft(n, e) {
    var i = rn(n),
      t = ie.url2path(i);
    return !(e && !GameGlobal.manager.fs.accessSync(t)) && (ie.disk.has(t) || ie.disk.set(t, 0), !0)
  }

  function Pt(n) {
    var e = ie.url2path(rn(n)),
      i = ie.path2fd.get(e);
    ie.cache.has(i) && ie.cache.delete(i), ie.disk.has(e) && ie.disk.delete(e)
  }

  function Rt(n) {
    window.WXWASMSDK.WXADDestroy(La(n))
  }

  function Bt(n, e) {
    return window.WXWASMSDK.WXADGetStyleValue(La(n), La(e))
  }

  function Gt(n, e, i) {
    window.WXWASMSDK.WXADLoad(La(n), La(e), La(i))
  }

  function Ot(n, e, i) {
    window.WXWASMSDK.WXADStyleChange(La(n), La(e), i)
  }

  function It(n, e, i, t) {
    return window.WXWASMSDK.WXAccessFile(La(n), La(e), La(i), La(t))
  }

  function Kt(n) {
    var e = window.WXWASMSDK.WXAccessFileSync(La(n)),
      i = ln(e || "") + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function Nt(n, e, i, t, r, a, o) {
    window.WXWASMSDK.WXAppendFile(La(n), V.slice(e, i + e), La(t), La(r), La(a), La(o))
  }

  function Ut(n, e, i, t, r, a) {
    window.WXWASMSDK.WXAppendStringFile(La(n), La(e), La(i), La(t), La(r), La(a))
  }

  function zt(n) {
    window.WXWASMSDK.WXCameraCloseFrameChange(La(n))
  }

  function qt(n, e) {
    window.WXWASMSDK.WXCameraCreateCamera(La(n), La(e))
  }

  function Ht(n) {
    window.WXWASMSDK.WXCameraDestroy(La(n))
  }

  function Vt(n) {
    window.WXWASMSDK.WXCameraListenFrameChange(La(n))
  }

  function Yt(n) {
    window.WXWASMSDK.WXCameraOnAuthCancel(La(n))
  }

  function Jt(n) {
    window.WXWASMSDK.WXCameraOnCameraFrame(La(n))
  }

  function Zt(n) {
    window.WXWASMSDK.WXCameraOnStop(La(n))
  }

  function Qt(n) {
    if (!n || !La(n)) return !1;
    const e = La(n);
    return void 0 !== wx[e[0].toLowerCase() + e.slice(1)]
  }

  function $t(n, e) {
    var i = La(n);
    window.WXWASMSDK.WXChallengeMiddleUpdate(i, e)
  }

  function nr() {
    window.WXWASMSDK.WXChatClose()
  }

  function er(n) {
    var e = window.WXWASMSDK.WXChatCreate(La(n)),
      i = ln(e || "") + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function ir() {
    window.WXWASMSDK.WXChatHide()
  }

  function tr(n) {
    window.WXWASMSDK.WXChatOff(La(n))
  }

  function rr(n) {
    window.WXWASMSDK.WXChatOn(La(n))
  }

  function ar(n) {
    window.WXWASMSDK.WXChatOpen(La(n))
  }

  function or(n) {
    window.WXWASMSDK.WXChatSetSignature(La(n))
  }

  function lr(n) {
    window.WXWASMSDK.WXChatSetTabs(La(n))
  }

  function ur(n) {
    window.WXWASMSDK.WXChatShow(La(n))
  }

  function fr() {
    return window.WXWASMSDK.WXCheckIsSupportMidasPayment()
  }

  function cr() {
    var n = window.WXWASMSDK.WXCleanAllFileCache(),
      e = ln(n || "") + 1,
      i = Bg(e);
    return on(n, i, e), i
  }

  function sr(n) {
    var e = window.WXWASMSDK.WXCleanFileCache(n),
      i = ln(e || "") + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function dr(n, e, i, t, r) {
    return window.WXWASMSDK.WXCopyFile(La(n), La(e), La(i), La(t), La(r))
  }

  function pr(n, e) {
    var i = window.WXWASMSDK.WXCopyFileSync(La(n), La(e)),
      t = ln(i || "") + 1,
      r = Bg(t);
    return on(i, r, t), r
  }

  function mr(n) {
    var e = window.WXWASMSDK.WXCreateBannerAd(La(n)),
      i = ln(e || "") + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function yr(n) {
    var e = La(n);
    window.WXWASMSDK.WXCreateChallenge(e)
  }

  function vr(n) {
    var e = window.WXWASMSDK.WXCreateCustomAd(La(n)),
      i = ln(e || "") + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function _r(n, e, i) {
    var t = window.WXWASMSDK.WXCreateFixedBottomMiddleBannerAd(La(n), e, i),
      r = ln(t || "") + 1,
      a = Bg(r);
    return on(t, a, r), a
  }

  function gr(n) {
    var e = window.WXWASMSDK.WXCreateGameClubButton(La(n)),
      i = ln(e || "") + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function hr(n, e, i, t, r, a, o) {
    var l = window.WXWASMSDK.WXCreateInnerAudioContext(La(n), e, i, t, r, a, o),
      u = ln(l || "") + 1,
      f = Bg(u);
    return on(l, f, u), f
  }

  function wr(n) {
    var e = window.WXWASMSDK.WXCreateInterstitialAd(La(n)),
      i = ln(e || "") + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function Sr(n) {
    var e = window.WXWASMSDK.WXCreateRewardedVideoAd(La(n)),
      i = ln(e || "") + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function Cr(n, e, i, t, r, a) {
    var o = window.WXWASMSDK.WXCreateUserInfoButton(n, e, i, t, La(r), a),
      l = ln(o || "") + 1,
      u = Bg(l);
    return on(o, u, l), u
  }

  function Er(n) {
    var e = window.WXWASMSDK.WXCreateVideo(La(n)),
      i = ln(e || "") + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function Wr(n) {
    window.WXWASMSDK.WXDataContextPostMessage(La(n))
  }

  function br(n, e) {
    var i = La(n);
    window.WXWASMSDK.WXEndChallenge(i, e)
  }

  function Ar(n, e) {
    function i(n) {
      return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
        return typeof n
      } : function(n) {
        return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
      })(n)
    }

    function t(n, e) {
      if (i = n, !(null != (t = e) && "undefined" != typeof Symbol && t[Symbol.hasInstance] ? t[Symbol.hasInstance](i) : i instanceof t)) throw new TypeError("Cannot call a class as a function");
      var i, t
    }

    function r(n, e) {
      for (var i = 0; i < e.length; i++) {
        var t = e[i];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(n, o(t.key), t)
      }
    }

    function a(n, e, i) {
      return e && r(n.prototype, e), i && r(n, i), Object.defineProperty(n, "prototype", {
        writable: !1
      }), n
    }

    function o(n) {
      var e = function(n, e) {
        if ("object" !== i(n) || null === n) return n;
        var t = n[Symbol.toPrimitive];
        if (void 0 !== t) {
          var r = t.call(n, e || "default");
          if ("object" !== i(r)) return r;
          throw new TypeError("@@toPrimitive must return a primitive value.")
        }
        return ("string" === e ? String : Number)(n)
      }(n, "string");
      return "symbol" === i(e) ? e : String(e)
    }
    var l = function() {
      function n(e, i) {
        t(this, n), this.hash = e, this.rename = i, this.size = 0
      }
      return a(n, [{
        key: "get",
        value: function(n) {
          return this.hash.get(this.rename(n))
        }
      }, {
        key: "set",
        value: function(n, e) {
          return this.delete(n), this.size += e, this.hash.set(this.rename(n), e)
        }
      }, {
        key: "has",
        value: function(n) {
          return this.hash.has(this.rename(n))
        }
      }, {
        key: "delete",
        value: function(n) {
          return this.size -= 0 | this.hash.get(this.rename(n)), this.hash.delete(this.rename(n))
        }
      }]), n
    }();
    ie.WXABErrorSteps = {
      kWebRequestResponse: 0,
      kLoadBundleFromFile: 1,
      kCacheGet: 2
    }, ie.disk = new l(unityNamespace.WXAssetBundles, unityNamespace.PathInFileOS), ie.msg = "", ie.fd2wxStream = new Map, ie.path2fd = new Map, ie.fs = wx.getFileSystemManager(), ie.nowfd = Xc.MAX_OPEN_FDS + 1, ie.isWXAssetBundle = function(n) {
      return ie._url2path.has(n) || n.startsWith(GameGlobal.unityNamespace.DATA_CDN) || n.startsWith("/vfs_streamingassets") ? unityNamespace.isWXAssetBundle(ie.url2path(n)) : unityNamespace.isWXAssetBundle(n)
    }, ie.newfd = function() {
      return ie.nowfd++
    }, ie.doWXAccess = function(n, e) {
      if (-8 & e) return -28;
      try {
        ie.fs.accessSync(n)
      } catch (n) {
        return -44
      }
      return 0
    };
    var u = function() {
      function n(e, i) {
        t(this, n), this.ttl = e, i > 0 && (this.capacity = i), this.hash = new Map, this.size = 0, this.maxSize = 0, this.obsolete = ""
      }
      return a(n, [{
        key: "record",
        value: function(n) {
          this.obsolete.includes(n) || ("" != this.obsolete && (this.obsolete += ";"), this.obsolete += n)
        }
      }, {
        key: "get",
        value: function(n) {
          var e = this.hash.get(n);
          return void 0 !== e ? (this.hash.delete(n), e.time = Date.now(), this.hash.set(n, e), e.ab) : -1
        }
      }, {
        key: "put",
        value: function(n, e, i) {
          if (e) {
            i = null == i || i;
            var t = {
                ab: e,
                time: Date.now(),
                cleanable: i
              },
              r = this.hash.get(n);
            if (void 0 !== r) this.size -= r.ab.byteLength, this.hash.delete(n), this.hash.set(n, t);
            else if (void 0 !== this.capacity && this.size >= this.capacity) {
              var a = this.hash.keys().next().value;
              this.size -= a.ab.byteLength, this.hash.delete(a), this.hash.set(n, t)
            } else this.hash.set(n, t);
            this.size += t.ab.byteLength, this.maxSize = Math.max(this.size, this.maxSize)
          }
        }
      }, {
        key: "cleanable",
        value: function(n, e) {
          e = null == e || e;
          var i = this.hash.get(n);
          return void 0 !== i ? (i.cleanable = e, this.hash.set(n, i), 0) : -1
        }
      }, {
        key: "cleanbytime",
        value: function(n) {
          for (var e, i, t = this.hash.keys(); null != (e = t.next().value) && (i = this.hash.get(e)).time < n;) i.cleanable && (this.size -= i.ab.byteLength, this.hash.delete(e))
        }
      }, {
        key: "RegularCleaning",
        value: function(n) {
          var e = this;
          setInterval((function() {
            e.cleanbytime(Date.now() - 1e3 * e.ttl)
          }), 1e3 * n)
        }
      }, {
        key: "delete",
        value: function(n) {
          return this.size -= this.hash.get(n).ab.byteLength, this.hash.delete(n)
        }
      }, {
        key: "has",
        value: function(n) {
          return this.hash.has(n)
        }
      }]), n
    }();
    ie.cache = new u(n, e), unityNamespace.isIOS && unityNamespace.isH5Renderer && ie.cache.RegularCleaning(1), ie.wxstat = function(n) {
      try {
        var e, i = ie.path2fd.get(n);
        return void 0 !== i ? ((e = {
          mode: 33206,
          size: ie.cache.get(i).byteLength,
          dev: 1,
          ino: 1,
          nlink: 1,
          uid: 0,
          gid: 0,
          rdev: 0,
          atime: new Date,
          mtime: new Date(0),
          ctime: new Date,
          blksize: 4096
        }).blocks = Math.ceil(e.size / e.blksize), e) : ((e = ie.fs.statSync(n)).dev = 1, e.ino = 1, e.nlink = 1, e.uid = 0, e.gid = 0, e.rdev = 0, e.atime = new Date(1e3 * e.lastAccessedTime), e.mtime = new Date(0), e.ctime = new Date(1e3 * e.lastModifiedTime), delete e.lastAccessedTime, delete e.lastModifiedTime, e.blksize = 4096, e.blocks = Math.ceil(e.size / e.blksize), e)
      } catch (n) {
        throw x(n), n
      }
    }, ie._url2path = new Map, ie.url2path = function(n) {
      if (ie._url2path.has(n)) return ie._url2path.get(n);
      if ((n = n.replaceAll(" ", "%20")).startsWith("/vfs_streamingassets/")) var e = n.replace("/vfs_streamingassets/", wx.env.USER_DATA_PATH + "/__GAME_FILE_CACHE/StreamingAssets/");
      else e = n.replace(GameGlobal.unityNamespace.DATA_CDN, wx.env.USER_DATA_PATH + "/__GAME_FILE_CACHE/");
      return e.indexOf("?") > -1 && (e = e.substring(0, e.indexOf("?"))), ie._url2path.set(n, e), e
    }, ie.LoadBundleFromFile = function(n) {
      try {
        var e = ie.fs.readFileSync(n)
      } catch (n) {
        var i = n ? n.toString() : "unknown"
      }
      var t = ie.disk.get(n);
      if (0 === t && (ie.disk.set(n, e.byteLength), t = e.byteLength), !e || e.byteLength != t) {
        var r = {
          stage: ie.WXABErrorSteps.kLoadBundleFromFile,
          path: n,
          size: e ? e.byteLength : 0,
          expected_size: t,
          error: i
        };
        return GameGlobal.manager.reporter.wxAssetBundle.reportEmptyContent(r), GameGlobal.manager.Logger.pluginLog("[WXAssetBundle]readFileSync at path " + n + " return size " + (e ? e.byteLength : 0) + ", different from expected size " + t + " error: " + i), wx.setStorageSync("wxfs_unserviceable", !0), GameGlobal.onCrash(), ""
      }
      return e
    }, ie.read = function(n, e, i, t, r) {
      var a = ie.cache.get(n.fd);
      if (-1 === a) {
        var o = ie.LoadBundleFromFile(n.path);
        ie.cache.put(n.fd, o), a = o
      }
      if (r >= n.node.usedBytes) return 0;
      var l = Math.min(n.node.usedBytes - r, t);
      return K(l >= 0), e.set(new Uint8Array(a.slice(r, r + l)), i), l
    }
  }

  function Dr(n, e) {
    window.WXWASMSDK.WXGameClubButtonAddListener(La(n), La(e))
  }

  function Mr(n) {
    window.WXWASMSDK.WXGameClubButtonDestroy(La(n))
  }

  function kr(n) {
    window.WXWASMSDK.WXGameClubButtonHide(La(n))
  }

  function xr(n, e) {
    window.WXWASMSDK.WXGameClubButtonRemoveListener(La(n), La(e))
  }

  function Xr(n, e, i) {
    window.WXWASMSDK.WXGameClubButtonSetProperty(La(n), La(e), La(i))
  }

  function jr(n) {
    window.WXWASMSDK.WXGameClubButtonShow(La(n))
  }

  function Tr(n, e, i) {
    window.WXWASMSDK.WXGameClubStyleChangeInt(La(n), La(e), i)
  }

  function Lr(n, e, i) {
    window.WXWASMSDK.WXGameClubStyleChangeStr(La(n), La(e), La(i))
  }

  function Fr(n, e, i, t) {
    t = t || !0;
    var r = rn(n),
      a = rn(e),
      o = ln(a) + 1,
      l = Bg(o);
    on(a, l, o);
    var u = new GameGlobal.unityNamespace.UnityLoader.UnityCache.XMLHttpRequest;

    function f(e, r) {
      if (t) return setTimeout((function() {
        Fr(n, !1)
      }), 1e3);
      if (i) {
        var a = ln(e) + 1,
          o = Bg(a);
        on(e, o, a), qn("viii", i, [l, r, o]), Gg(o), Gg(l)
      }
    }
    u.open("GET", r, !0), u.responseType = "arraybuffer", u.onload = function(e) {
      if (u.status >= 400 && t) return setTimeout((function() {
        Fr(n, !1)
      }), 1e3), u = null, !1;
      if (i) {
        var a = new Uint8Array(u.response);
        if (0 != a.length) {
          var o = u.response,
            f = ie.url2path(r),
            c = ie.path2fd.get(f);
          null == c && (c = ie.newfd(), ie.path2fd.set(f, c));
          var s = ie.fd2wxStream.get(c);
          null == s && ((s = {
            fd: c,
            path: f,
            seekable: !0,
            position: 0,
            stream_ops: kc.stream_ops,
            ungotten: [],
            node: {
              mode: 32768,
              usedBytes: a.length
            },
            error: !1
          }).stream_ops.read = ie.read, ie.fd2wxStream.set(c, s)), ie.cache.put(c, o, u.isReadFromCache), ie.disk.set(f, a.length), qn("viii", i, [l, 0, 0]), u.isReadFromCache && Gg(l)
        } else qn("viii", i, [l, 1111, 0]), Gg(l)
      }
    }, u.onsave = function(n) {
      ie.cache.cleanable(ie.path2fd.get(n)), Gg(l)
    }, u.onerror = function(n) {
      f("Unknown error.", 2)
    }, u.ontimeout = function(n) {
      f("Connection timed out.", 14)
    }, u.onabort = function(n) {
      f("Aborted.", 17)
    }, u.send()
  }

  function Pr() {
    return ie && ie.cache && ie.cache.hash && ie.cache.hash.size
  }

  function Rr() {
    return ie && ie.disk && ie.disk.hash && ie.disk.hash.size
  }

  function Br() {
    return ie && ie.cache && ie.cache.size
  }

  function Gr() {
    return ie && ie.disk && ie.disk.size
  }

  function Or(n) {
    var e = window.WXWASMSDK.WXGetCachePath(La(n)),
      i = ln(e || "") + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function Ir() {
    window.WXWASMSDK.WXGetDirectAdStatus()
  }

  function Kr() {
    if ("undefined" != typeof DYNAMIC_BASE) return Z[DYNAMICTOP_PTR >> 2] - DYNAMIC_BASE;
    var e = 7936880;
    return void 0 !== n.___heap_base && (e = n.___heap_base), Ig() - e
  }

  function Nr() {
    var n, e;
    return void 0 === GameGlobal.calcFrameTimeFunc && (GameGlobal.calcFrameTimeFunc = (n = 0, e = 0, function(i, t) {
      n++, e += t - i, n >= 60 ? (GameGlobal.avgExFrameTime = e / 60, n = 0, e = 0) : void 0 === GameGlobal.avgExFrameTime && (GameGlobal.avgExFrameTime = e / n)
    }), GameGlobal.avgExFrameTime = 0), GameGlobal.avgExFrameTime
  }

  function Ur(n, e) {
    window.WXWASMSDK.WXGetFontRawData(La(n), La(e))
  }

  function zr() {
    window.WXWASMSDK.WXGetGameExptInfo()
  }

  function qr(n) {
    window.WXWASMSDK.WXGetOpenDataContext(La(n))
  }

  function Hr() {
    var n = window.WXWASMSDK.WXGetPluginCachePath(),
      e = ln(n || "") + 1,
      i = Bg(e);
    return on(n, i, e), i
  }

  function Vr(n, e) {
    var i = La(n),
      t = La(e),
      r = window.WXWASMSDK.WXGetSign(i, t),
      a = ln(r) + 1,
      o = Bg(a);
    return on(r, o, a), o
  }

  function Yr() {
    return STATICTOP - STATIC_BASE
  }

  function Jr() {
    return "undefined" != typeof TOTAL_MEMORY ? TOTAL_MEMORY : B && B.buffer ? B.buffer.byteLength : (x("Fail to find wasmMemory.buffer, TotalMemorySize is not correct."), 0)
  }

  function Zr() {
    return mn
  }

  function Qr() {
    var n = Ig();
    return H.length - n
  }

  function $r() {
    if ("undefined" != typeof emscriptenMemoryProfiler) return emscriptenMemoryProfiler.totalMemoryAllocated
  }

  function na() {
    var n = window.WXWASMSDK.WXGetUserDataPath(),
      e = ln(n || "") + 1,
      i = Bg(e);
    return on(n, i, e), i
  }

  function ea(n, e, i) {
    window.WXWASMSDK.WXHideAd(La(n), La(e), La(i))
  }

  function ia() {
    window.WXWASMSDK && window.WXWASMSDK.WXHideLoadingPage()
  }

  function ta() {
    window.WXWASMSDK.WXHideOpenData()
  }

  function ra(n) {
    window.WXWASMSDK.WXInitializeSDK(La(n)), "undefined" != typeof emscriptenMemoryProfiler && (GameGlobal.memprofiler = emscriptenMemoryProfiler, GameGlobal.memprofiler.onDump = function() {
      var n = wx.getFileSystemManager(),
        e = GameGlobal.memprofiler.allocationsAtLoc;
      void 0 === e && (e = GameGlobal.memprofiler.allocationSiteStatistics);
      var i = [];
      for (var t in e) i.push(t);
      i.sort((function(n, i) {
        return e[i][1] - e[n][1]
      })), console.log("WXDumpUnityHeap begin", Object.keys(e).length, i.length), wx.getFileSystemManager().open({
        filePath: wx.env.USER_DATA_PATH + "/alloc_used.csv",
        flag: "w",
        success: function(t) {
          var r = t.fd;
          n.write({
            fd: r,
            data: "callback;count;size;malloc;free\r\n",
            fail: function(n) {
              x(n)
            }
          });
          for (var a = 0, o = 0; o < 1e5 && o < i.length; ++o) {
            var l = i[o],
              u = e[l];
            if (void 0 !== u) {
              var f = l.indexOf("emscripten_trace_record_") + "emscripten_trace_record_".length; - 1 != f && (l = l.substr(f));
              var c = l.lastIndexOf("InitWebGLPlayeriPPc "); - 1 != c && (l = l.substr(0, c)), -1 != (c = l.lastIndexOf("InitPlayerLoopCallbacks")) && (l = l.substr(0, c)), l = (l = (l = (l = (l = l.replace(/\(.*?\)/g, "")).replace(/[A-Z0-9]{40}/g, "")).replace(/\n/g, "<-")).replace(/_malloc <-.*?MemLabelId15AllocateOptions/g, "")).replace(/<-    at dynCall.*?at invoke_/g, ""), n.write({
                fd: r,
                data: l + ";" + u[0] + ";" + u[1] + ";" + u[2] + ";" + u[3] + "\r\n",
                fail: function(n) {
                  x(n)
                }
              })
            } else ++a
          }
          console.log("WXDumpUnityHeap end", a)
        }
      })
    })
  }

  function aa(n, e) {
    window.WXWASMSDK.WXInnerAudioContextAddListener(La(n), La(e))
  }

  function oa(n) {
    window.WXWASMSDK.WXInnerAudioContextDestroy(La(n))
  }

  function la(n, e) {
    return window.WXWASMSDK.WXInnerAudioContextGetBool(La(n), La(e))
  }

  function ua(n, e) {
    return window.WXWASMSDK.WXInnerAudioContextGetFloat(La(n), La(e))
  }

  function fa(n) {
    window.WXWASMSDK.WXInnerAudioContextPause(La(n))
  }

  function ca(n) {
    window.WXWASMSDK.WXInnerAudioContextPlay(La(n))
  }

  function sa(n, e) {
    window.WXWASMSDK.WXInnerAudioContextRemoveListener(La(n), La(e))
  }

  function da(n, e) {
    window.WXWASMSDK.WXInnerAudioContextSeek(La(n), e)
  }

  function pa(n, e, i) {
    window.WXWASMSDK.WXInnerAudioContextSetBool(La(n), La(e), i)
  }

  function ma(n, e, i) {
    window.WXWASMSDK.WXInnerAudioContextSetFloat(La(n), La(e), i)
  }

  function ya(n, e, i) {
    window.WXWASMSDK.WXInnerAudioContextSetString(La(n), La(e), La(i))
  }

  function va(n) {
    window.WXWASMSDK.WXInnerAudioContextStop(La(n))
  }

  function _a() {
    return window.WXWASMSDK.WXIsCloudTest()
  }

  function ga(n) {
    var e = window.WXWASMSDK.WXLaunchOperaBridge(La(n));
    if (e) {
      var i = ln(e) + 1,
        t = Bg(i);
      return on(e, t, i), t
    }
  }

  function ha(n) {
    window.WXWASMSDK.WXLogManagerDebug(La(n))
  }

  function wa(n) {
    window.WXWASMSDK.WXLogManagerInfo(La(n))
  }

  function Sa(n) {
    window.WXWASMSDK.WXLogManagerLog(La(n))
  }

  function Ca(n) {
    window.WXWASMSDK.WXLogManagerWarn(La(n))
  }

  function Ea(n, e, i, t, r, a) {
    var o = La(n),
      l = La(e),
      u = La(r);
    window.WXWASMSDK.WXMiniGameCommonGetUserLabel(o, l, i, t, u, a)
  }

  function Wa(n, e, i, t, r, a) {
    var o = La(n),
      l = La(e),
      u = La(r);
    window.WXWASMSDK.WXMiniGameCommonGetUserLabelV2(o, l, i, t, u, a)
  }

  function ba(n, e, i, t, r) {
    window.WXWASMSDK.WXMkdir(La(n), e, La(i), La(t), La(r))
  }

  function Aa(n, e) {
    var i = window.WXWASMSDK.WXMkdirSync(La(n), e),
      t = ln(i || "") + 1,
      r = Bg(t);
    return on(i, r, t), r
  }

  function Da() {
    window.WXWASMSDK.WXOnChallengeStart()
  }

  function Ma() {
    window.WXWASMSDK.WXOnDirectAdStatusChange()
  }

  function ka() {
    var n = window.WXWASMSDK.WXOnLaunchProgress(),
      e = ln(n || "") + 1,
      i = Bg(e);
    return on(n, i, e), i
  }

  function xa(n, e) {
    return window.WXWASMSDK.WXOnShareAppMessage(La(n), e)
  }

  function Xa(n) {
    return window.WXWASMSDK.WXOnShareAppMessageResolve(La(n))
  }

  function ja(n, e, i, t) {
    window.WXWASMSDK.WXOpenDataToTempFilePath(La(n), La(e), La(i), La(t))
  }

  function Ta(n) {
    var e = window.WXWASMSDK.WXOpenDataToTempFilePathSync(La(n)),
      i = ln(e || "") + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function La(n) {
    return void 0 !== rn ? rn(n) : e(n)
  }

  function Fa(n, e) {
    window.WXWASMSDK.WXPreDownloadAudios(La(n), e)
  }

  function Pa(n) {
    window.WXWASMSDK.WXPreloadConcurrent(n)
  }

  function Ra() {
    if ("undefined" != typeof emscriptenMemoryProfiler) return GameGlobal.memprofiler.onDump(), void wx.showModal({
      title: "ProfilingMemory",
      content: "OnDump Complete!"
    });
    x("Please call WX.InitSDK & Select ProfilingMemory Option")
  }

  function Ba() {
    window.WXWASMSDK.WXQuitChallenge()
  }

  function Ga(n, e) {
    window.WXWASMSDK.WXReadFile(La(n), La(e))
  }

  function Oa(n) {
    var e = window.WXWASMSDK.WXReadFileSync(La(n)),
      i = ln(e || "") + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function Ia(n) {
    var e = window.WXWASMSDK.WXRemoveFile(La(n)),
      i = ln(e || "") + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function Ka(n, e, i, t) {
    window.WXWASMSDK.WXReportGameSceneError(n, e, La(i), La(t))
  }

  function Na() {
    window.WXWASMSDK.WXReportGameStart()
  }

  function Ua(n, e, i) {
    window.WXWASMSDK.WXReportUserBehaviorBranchAnalytics(La(n), La(e), i)
  }

  function za(n, e) {
    var i = window.WXWASMSDK.WXReportShareBehavior(La(n), La(e)),
      t = ln(i || "") + 1,
      r = Bg(t);
    return on(i, r, t), r
  }

  function qa(n, e, i, t, r) {
    window.WXWASMSDK.WXRmdir(La(n), e, La(i), La(t), La(r))
  }

  function Ha(n, e) {
    var i = window.WXWASMSDK.WXRmdirSync(La(n), e),
      t = ln(i || "") + 1,
      r = Bg(t);
    return on(i, r, t), r
  }

  function Va(n, e) {
    window.WXWASMSDK.WXSetArrayBuffer(V, n, La(e))
  }

  function Ya(n) {
    window.WXWASMSDK.WXSetDataCDN(La(n))
  }

  function Ja(n) {
    window.WXWASMSDK.WXSetPreloadList(La(n))
  }

  function Za(n) {
    window.WXWASMSDK.WXSetSyncReadCacheEnabled(n)
  }

  function Qa(n, e) {
    window.WXWASMSDK.WXShareFontBuffer(V, n, La(e))
  }

  function $a(n, e, i) {
    window.WXWASMSDK.WXShowAd(La(n), La(e), La(i))
  }

  function no(n, e, i, t, r) {
    window.WXWASMSDK.WXShowAd2(La(n), La(e), La(i), La(t), La(r))
  }

  function eo(n, e, i, t, r) {
    window.WXWASMSDK.WXShowOpenData(n, e, i, t, r)
  }

  function io(n, e) {
    window.WXWASMSDK.WXStat(La(n), La(e))
  }

  function to() {
    window.WXWASMSDK.WXStorageDeleteAllSync()
  }

  function ro(n) {
    window.WXWASMSDK.WXStorageDeleteKeySync(La(n))
  }

  function ao(n, e) {
    return window.WXWASMSDK.WXStorageGetFloatSync(La(n), e)
  }

  function oo(n, e) {
    return window.WXWASMSDK.WXStorageGetIntSync(La(n), e)
  }

  function lo(n, e) {
    var i = window.WXWASMSDK.WXStorageGetStringSync(La(n), La(e)),
      t = ln(i || "") + 1,
      r = Bg(t);
    return on(i, r, t), r
  }

  function uo(n) {
    return window.WXWASMSDK.WXStorageHasKeySync(La(n))
  }

  function fo(n, e) {
    window.WXWASMSDK.WXStorageSetFloatSync(La(n), e)
  }

  function co(n, e) {
    window.WXWASMSDK.WXStorageSetIntSync(La(n), e)
  }

  function so(n, e) {
    window.WXWASMSDK.WXStorageSetStringSync(La(n), La(e))
  }

  function po(n, e, i, t) {
    window.WXWASMSDK.WXToTempFilePath(La(n), La(e), La(i), La(t))
  }

  function mo(n) {
    var e = window.WXWASMSDK.WXToTempFilePathSync(La(n)),
      i = ln(e || "") + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function yo() {
    window.WXWASMSDK.WXUncaughtException(!1)
  }

  function vo(n, e, i, t) {
    return window.WXWASMSDK.WXUnlink(La(n), La(e), La(i), La(t))
  }

  function _o(n) {
    var e = window.WXWASMSDK.WXUnlinkSync(La(n)),
      i = ln(e || "") + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function go(n, e) {
    var i = La(n);
    window.WXWASMSDK.WXUpdateScore(i, e)
  }

  function ho(n) {
    window.WXWASMSDK.WXUploadTaskAbort(La(n))
  }

  function wo(n) {
    window.WXWASMSDK.WXUploadTaskOffHeadersReceived(La(n))
  }

  function So(n) {
    window.WXWASMSDK.WXUploadTaskOffProgressUpdate(La(n))
  }

  function Co(n) {
    window.WXWASMSDK.WXUploadTaskOnHeadersReceived(La(n))
  }

  function Eo(n) {
    window.WXWASMSDK.WXUploadTaskOnProgressUpdate(La(n))
  }

  function Wo(n) {
    window.WXWASMSDK.WXUserInfoButtonDestroy(La(n))
  }

  function bo(n) {
    window.WXWASMSDK.WXUserInfoButtonHide(La(n))
  }

  function Ao(n) {
    window.WXWASMSDK.WXUserInfoButtonOffTap(La(n))
  }

  function Do(n) {
    window.WXWASMSDK.WXUserInfoButtonOnTap(La(n))
  }

  function Mo(n) {
    window.WXWASMSDK.WXUserInfoButtonShow(La(n))
  }

  function ko(n, e) {
    window.WXWASMSDK.WXVideoAddListener(La(n), La(e))
  }

  function xo(n, e) {
    window.WXWASMSDK.WXVideoDestroy(La(n), e)
  }

  function Xo(n) {
    window.WXWASMSDK.WXVideoExitFullScreen(La(n))
  }

  function jo(n) {
    window.WXWASMSDK.WXVideoPause(La(n))
  }

  function To(n) {
    window.WXWASMSDK.WXVideoPlay(La(n))
  }

  function Lo(n, e) {
    window.WXWASMSDK.WXVideoRemoveListener(La(n), La(e))
  }

  function Fo(n, e) {
    window.WXWASMSDK.WXVideoRequestFullScreen(La(n), e)
  }

  function Po(n, e) {
    window.WXWASMSDK.WXVideoSeek(La(n), e)
  }

  function Ro(n, e, i) {
    window.WXWASMSDK.WXVideoSetProperty(La(n), La(e), La(i))
  }

  function Bo(n) {
    window.WXWASMSDK.WXVideoStop(La(n))
  }

  function Go(n, e, i, t) {
    var r = window.WXWASMSDK.WXWriteBinFileSync(La(n), V.slice(e, i + e), La(t)),
      a = ln(r || "") + 1,
      o = Bg(a);
    return on(r, o, a), o
  }

  function Oo(n, e, i, t, r, a, o) {
    window.WXWASMSDK.WXWriteFile(La(n), V.slice(e, i + e), La(t), La(r), La(a), La(o))
  }

  function Io(n, e, i) {
    var t = window.WXWASMSDK.WXWriteFileSync(La(n), La(e), La(i)),
      r = ln(t || "") + 1,
      a = Bg(r);
    return on(t, a, r), a
  }

  function Ko(n) {
    window.WXWASMSDK.WXWriteLog(La(n))
  }

  function No(n, e, i, t, r, a) {
    window.WXWASMSDK.WXWriteStringFile(La(n), La(e), La(i), La(t), La(r), La(a))
  }

  function Uo(n) {
    window.WXWASMSDK.WXWriteWarn(La(n))
  }

  function zo(n, e, i) {
    var t = La(n),
      r = La(e),
      a = JSON.parse(La(i));
    GameGlobal[t][r].apply(GameGlobal[t], a)
  }

  function qo(n, e, i) {
    var t = La(n),
      r = La(e),
      a = JSON.parse(La(i)),
      o = GameGlobal[t][r].apply(GameGlobal[t], a),
      l = JSON.stringify(o),
      u = ln(l || "") + 1,
      f = Bg(u);
    return on(l || "", f, u), f
  }

  function Ho(n, e, i, t, r, a) {
    var o = window.WXWASMSDK.WX_ClassConstructor(La(n), La(e), La(i), La(t), La(r), La(a)),
      l = ln(o || "") + 1,
      u = Bg(l);
    return on(o || "", u, l), u
  }

  function Vo(n, e, i) {
    var t = window.WXWASMSDK.WX_ClassFunction(La(n), La(e), La(i)),
      r = ln(t || "") + 1,
      a = Bg(r);
    return on(t || "", a, r), a
  }

  function Yo(n, e, i, t) {
    window.WXWASMSDK.WX_ClassOffEventFunction(La(n), La(e), La(i), La(t))
  }

  function Jo(n, e, i, t, r) {
    window.WXWASMSDK.WX_ClassOnEventFunction(La(n), La(e), La(i), La(t), La(r))
  }

  function Zo(n, e, i, t, r, a, o, l, u) {
    window.WXWASMSDK.WX_ClassOneWayFunction(La(n), La(e), La(i), La(t), La(r), La(a), La(o), La(l), u)
  }

  function Qo(n, e, i, t) {
    var r = window.WXWASMSDK.WX_ClassOneWayNoFunction_t(La(n), La(e), La(i), La(t)),
      a = ln(r || "") + 1,
      o = Bg(a);
    return on(r || "", o, a), o
  }

  function $o(n, e, i) {
    window.WXWASMSDK.WX_ClassOneWayNoFunction_v(La(n), La(e), La(i))
  }

  function nl(n, e, i, t) {
    window.WXWASMSDK.WX_ClassOneWayNoFunction_vs(La(n), La(e), La(i), t)
  }

  function el(n, e, i, t) {
    window.WXWASMSDK.WX_ClassOneWayNoFunction_vs(La(n), La(e), La(i), La(t))
  }

  function il(n, e, i, t) {
    window.WXWASMSDK.WX_ClassOneWayNoFunction_vt(La(n), La(e), La(i), La(t))
  }

  function tl(n, e, i, t) {
    window.WXWASMSDK.WX_ClassSetProperty(La(n), La(e), La(i), La(t))
  }

  function rl(n, e, i) {
    var t = window.WXWASMSDK.WX_CloudCDN(La(n), V.buffer.slice(e, e + i)),
      r = ln(t || "") + 1,
      a = Bg(r);
    return on(t, a, r), a
  }

  function al(n, e, i) {
    e = i ? JSON.parse(La(e)) : La(e);
    var t = window.WXWASMSDK.WX_CloudCDN(La(n), e),
      r = ln(t || "") + 1,
      a = Bg(r);
    return on(t, a, r), a
  }

  function ol(n, e, i) {
    window.WXWASMSDK.WX_CloudCallContainer(La(n), La(e), La(i))
  }

  function ll(n, e, i) {
    window.WXWASMSDK.WX_CloudCallFunction(La(n), La(e), La(i))
  }

  function ul(n) {
    window.WXWASMSDK.WX_CloudCloud(La(n))
  }

  function fl(n, e) {
    var i = window.WXWASMSDK.WX_CloudCloudID(La(n), La(e)),
      t = ln(i || "") + 1,
      r = Bg(t);
    return on(i, r, t), r
  }

  function cl(n, e, i) {
    window.WXWASMSDK.WX_CloudDeleteFile(La(n), La(e), La(i))
  }

  function sl(n, e, i) {
    window.WXWASMSDK.WX_CloudDownloadFile(La(n), La(e), La(i))
  }

  function dl(n, e, i) {
    window.WXWASMSDK.WX_CloudGetTempFileURL(La(n), La(e), La(i))
  }

  function pl(n) {
    window.WXWASMSDK.WX_CloudInit(La(n))
  }

  function ml(n, e, i) {
    window.WXWASMSDK.WX_CloudUploadFile(La(n), La(e), La(i))
  }

  function yl() {
    var n = window.WXWASMSDK.WX_CreateTCPSocket(),
      e = ln(n || "") + 1,
      i = Bg(e);
    return on(n, i, e), i
  }

  function vl() {
    var n = window.WXWASMSDK.WX_CreateUDPSocket(),
      e = ln(n || "") + 1,
      i = Bg(e);
    return on(n, i, e), i
  }

  function _l(n, e, i) {
    window.WXWASMSDK.WX_FileSystemManagerAppendFileStringSync(La(n), La(e), La(i))
  }

  function gl(n, e, i, t) {
    window.WXWASMSDK.WX_FileSystemManagerAppendFileSync(La(n), V.slice(e, i + e), La(t))
  }

  function hl(n, e) {
    window.WXWASMSDK.WX_FileSystemManagerClose(La(n), La(e))
  }

  function wl(n) {
    window.WXWASMSDK.WX_FileSystemManagerCloseSync(La(n))
  }

  function Sl(n, e) {
    window.WXWASMSDK.WX_FileSystemManagerFstat(La(n), La(e))
  }

  function Cl(n) {
    var e = window.WXWASMSDK.WX_FileSystemManagerFstatSync(La(n)),
      i = ln(e) + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function El(n, e) {
    window.WXWASMSDK.WX_FileSystemManagerFtruncate(La(n), La(e))
  }

  function Wl(n) {
    window.WXWASMSDK.WX_FileSystemManagerFtruncateSync(La(n))
  }

  function bl(n, e) {
    window.WXWASMSDK.WX_FileSystemManagerGetFileInfo(La(n), La(e))
  }

  function Al(n, e) {
    window.WXWASMSDK.WX_FileSystemManagerGetSavedFileList(La(n), La(e))
  }

  function Dl(n, e) {
    window.WXWASMSDK.WX_FileSystemManagerOpen(La(n), La(e))
  }

  function Ml(n) {
    var e = window.WXWASMSDK.WX_FileSystemManagerOpenSync(La(n)),
      i = ln(e) + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function kl(n, e, i, t) {
    window.WXWASMSDK.WX_FileSystemManagerRead(La(n), V.slice(e, i + e), La(t))
  }

  function xl(n, e) {
    var i = window.WXWASMSDK.WX_FileSystemManagerReadCompressedFileSync(La(n), La(e)),
      t = ln(i) + 1,
      r = Bg(t);
    return on(i, r, t), r
  }

  function Xl(n, e) {
    var i = window.WXWASMSDK.WX_FileSystemManagerReadSync(La(n), La(e)),
      t = ln(i) + 1,
      r = Bg(t);
    return on(i, r, t), r
  }

  function jl(n, e) {
    window.WXWASMSDK.WX_FileSystemManagerReadZipEntry(La(n), La(e))
  }

  function Tl(n, e) {
    window.WXWASMSDK.WX_FileSystemManagerReadZipEntryString(La(n), La(e))
  }

  function Ll(n, e) {
    window.WXWASMSDK.WX_FileSystemManagerReaddir(La(n), La(e))
  }

  function Fl(n) {
    var e = window.WXWASMSDK.WX_FileSystemManagerReaddirSync(La(n)),
      i = ln(e) + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function Pl(n, e) {
    window.WXWASMSDK.WX_FileSystemManagerRemoveSavedFile(La(n), La(e))
  }

  function Rl(n, e) {
    window.WXWASMSDK.WX_FileSystemManagerRename(La(n), La(e))
  }

  function Bl(n, e) {
    window.WXWASMSDK.WX_FileSystemManagerRenameSync(La(n), La(e))
  }

  function Gl(n, e) {
    window.WXWASMSDK.WX_FileSystemManagerSaveFile(La(n), La(e))
  }

  function Ol(n, e) {
    var i = window.WXWASMSDK.WX_FileSystemManagerSaveFileSync(La(n), La(e)),
      t = ln(i) + 1,
      r = Bg(t);
    return on(i, r, t), r
  }

  function Il(n, e) {
    var i = window.WXWASMSDK.WX_FileSystemManagerStatSync(La(n), e),
      t = ln(i) + 1,
      r = Bg(t);
    return on(i, r, t), r
  }

  function Kl(n, e) {
    window.WXWASMSDK.WX_FileSystemManagerTruncate(La(n), La(e))
  }

  function Nl(n) {
    window.WXWASMSDK.WX_FileSystemManagerTruncateSync(La(n))
  }

  function Ul(n, e) {
    window.WXWASMSDK.WX_FileSystemManagerUnzip(La(n), La(e))
  }

  function zl(n, e, i, t) {
    window.WXWASMSDK.WX_FileSystemManagerWrite(La(n), V.slice(e, i + e), La(t))
  }

  function ql(n, e) {
    window.WXWASMSDK.WX_FileSystemManagerWriteString(La(n), La(e))
  }

  function Hl(n) {
    var e = window.WXWASMSDK.WX_FileSystemManagerWriteStringSync(La(n)),
      i = ln(e) + 1,
      t = Bg(i);
    return on(e, t, i), t
  }

  function Vl(n, e, i) {
    var t = window.WXWASMSDK.WX_FileSystemManagerWriteSync(La(n), V.slice(e, i + e)),
      r = ln(t) + 1,
      a = Bg(r);
    return on(t, a, r), a
  }

  function Yl(n) {
    window.WXWASMSDK.WX_GameRecorderAbort(La(n))
  }

  function Jl(n, e) {
    window.WXWASMSDK.WX_GameRecorderOff(La(n), La(e))
  }

  function Zl(n, e) {
    window.WXWASMSDK.WX_GameRecorderOn(La(n), La(e))
  }

  function Ql(n) {
    window.WXWASMSDK.WX_GameRecorderPause(La(n))
  }

  function $l(n) {
    window.WXWASMSDK.WX_GameRecorderResume(La(n))
  }

  function nu(n, e) {
    window.WXWASMSDK.WX_GameRecorderStart(La(n), La(e))
  }

  function eu(n) {
    window.WXWASMSDK.WX_GameRecorderStop(La(n))
  }

  function iu() {
    var n = window.WXWASMSDK.WX_GetGameRecorder(),
      e = ln(n || "") + 1,
      i = Bg(e);
    return on(n, i, e), i
  }

  function tu() {
    var n = window.WXWASMSDK.WX_GetRecorderManager(),
      e = ln(n || "") + 1,
      i = Bg(e);
    return on(n, i, e), i
  }

  function ru() {
    window.WXWASMSDK.WX_OffAddToFavorites()
  }

  function au() {
    window.WXWASMSDK.WX_OffBLECharacteristicValueChange()
  }

  function ou() {
    window.WXWASMSDK.WX_OffCopyUrl()
  }

  function lu(n) {
    window.WXWASMSDK.WX_OffEventRegister(La(n))
  }

  function uu() {
    window.WXWASMSDK.WX_OffGameLiveStateChange()
  }

  function fu() {
    window.WXWASMSDK.WX_OffGyroscopeChange()
  }

  function cu() {
    window.WXWASMSDK.WX_OffHandoff()
  }

  function su() {
    window.WXWASMSDK.WX_OffShareTimeline()
  }

  function du() {
    window.WXWASMSDK.WX_OffTouchCancel()
  }

  function pu() {
    window.WXWASMSDK.WX_OffTouchEnd()
  }

  function mu() {
    window.WXWASMSDK.WX_OffTouchMove()
  }

  function yu() {
    window.WXWASMSDK.WX_OffTouchStart()
  }

  function vu() {
    window.WXWASMSDK.WX_OnAddToFavorites()
  }

  function _u(n) {
    window.WXWASMSDK.WX_OnAddToFavorites_Resolve(La(n))
  }

  function gu() {
    window.WXWASMSDK.WX_OnBLECharacteristicValueChange()
  }

  function hu() {
    window.WXWASMSDK.WX_OnCopyUrl()
  }

  function wu(n) {
    window.WXWASMSDK.WX_OnCopyUrl_Resolve(La(n))
  }

  function Su(n, e) {
    window.WXWASMSDK.WX_OnEventRegister(La(n), La(e))
  }

  function Cu() {
    window.WXWASMSDK.WX_OnGameLiveStateChange()
  }

  function Eu(n) {
    window.WXWASMSDK.WX_OnGameLiveStateChange_Resolve(La(n))
  }

  function Wu() {
    window.WXWASMSDK.WX_OnGyroscopeChange()
  }

  function bu() {
    window.WXWASMSDK.WX_OnHandoff()
  }

  function Au(n) {
    window.WXWASMSDK.WX_OnHandoff_Resolve(La(n))
  }

  function Du() {
    window.WXWASMSDK.WX_OnNeedPrivacyAuthorization()
  }

  function Mu(n) {
    window.WXWASMSDK.WX_OnRecorderError(La(n))
  }

  function ku(n) {
    window.WXWASMSDK.WX_OnRecorderFrameRecorded(La(n))
  }

  function xu(n) {
    window.WXWASMSDK.WX_OnRecorderInterruptionBegin(La(n))
  }

  function Xu(n) {
    window.WXWASMSDK.WX_OnRecorderInterruptionEnd(La(n))
  }

  function ju(n) {
    window.WXWASMSDK.WX_OnRecorderPause(La(n))
  }

  function Tu(n) {
    window.WXWASMSDK.WX_OnRecorderResume(La(n))
  }

  function Lu(n) {
    window.WXWASMSDK.WX_OnRecorderStart(La(n))
  }

  function Fu(n) {
    window.WXWASMSDK.WX_OnRecorderStop(La(n))
  }

  function Pu() {
    window.WXWASMSDK.WX_OnShareTimeline()
  }

  function Ru(n) {
    window.WXWASMSDK.WX_OnShareTimeline_Resolve(La(n))
  }

  function Bu() {
    window.WXWASMSDK.WX_OnTouchCancel()
  }

  function Gu() {
    window.WXWASMSDK.WX_OnTouchEnd()
  }

  function Ou() {
    window.WXWASMSDK.WX_OnTouchMove()
  }

  function Iu() {
    window.WXWASMSDK.WX_OnTouchStart()
  }

  function Ku(n, e, i, t, r, a) {
    window.WXWASMSDK.WX_OneWayFunction(La(n), La(e), La(i), La(t), La(r), La(a))
  }

  function Nu(n) {
    window.WXWASMSDK.WX_OneWayNoFunction_v(La(n))
  }

  function Uu(n, e, i, t) {
    window.WXWASMSDK.WX_OneWayNoFunction_vnns(La(n), e, i, La(t))
  }

  function zu(n, e) {
    window.WXWASMSDK.WX_OneWayNoFunction_vs(La(n), La(e))
  }

  function qu(n, e, i) {
    window.WXWASMSDK.WX_OneWayNoFunction_vsn(La(n), La(e), i)
  }

  function Hu(n, e, i) {
    window.WXWASMSDK.WX_OneWayNoFunction_vst(La(n), La(e), La(i))
  }

  function Vu(n, e) {
    window.WXWASMSDK.WX_OneWayNoFunction_vt(La(n), La(e))
  }

  function Yu(n) {
    window.WXWASMSDK.WX_PrivacyAuthorizeResolve(La(n))
  }

  function Ju(n) {
    window.WXWASMSDK.WX_RecorderPause(La(n))
  }

  function Zu(n) {
    window.WXWASMSDK.WX_RecorderResume(La(n))
  }

  function Qu(n, e) {
    window.WXWASMSDK.WX_RecorderStart(La(n), La(e))
  }

  function $u(n) {
    window.WXWASMSDK.WX_RecorderStop(La(n))
  }

  function nf(n) {
    window.WXWASMSDK.WX_RegisterOnBLECharacteristicValueChangeCallback(n)
  }

  function ef(n) {
    window.WXWASMSDK.WX_RegisterOnGyroscopeChangeCallback(n)
  }

  function tf(n) {
    window.WXWASMSDK.WX_RegisterOnTouchCancelCallback(n)
  }

  function rf(n) {
    window.WXWASMSDK.WX_RegisterOnTouchEndCallback(n)
  }

  function af(n) {
    window.WXWASMSDK.WX_RegisterOnTouchMoveCallback(n)
  }

  function of(n) {
    window.WXWASMSDK.WX_RegisterOnTouchStartCallback(n)
  }

  function lf(n) {
    window.WXWASMSDK.WX_RegisterStartGyroscopeCallback(n)
  }

  function uf(n) {
    window.WXWASMSDK.WX_RegisterStopGyroscopeCallback(n)
  }

  function ff(n) {
    window.WXWASMSDK.WX_RegisterTCPSocketOnMessageCallback(n)
  }

  function cf(n) {
    window.WXWASMSDK.WX_RegisterUDPSocketOnMessageCallback(n)
  }

  function sf(n) {
    window.devicePixelRatio = n
  }

  function df(n) {
    window.WXWASMSDK.WX_SetPreferredFramesPerSecond(n)
  }

  function pf(n, e) {
    window.WXWASMSDK.WX_StartGyroscope(La(n), La(e))
  }

  function mf(n) {
    window.WXWASMSDK.WX_StopGyroscope(La(n))
  }

  function yf(n) {
    return window.WXWASMSDK.WX_SyncFunction_b(La(n))
  }

  function vf(n, e) {
    return window.WXWASMSDK.WX_SyncFunction_bs(La(n), La(e))
  }

  function _f(n, e, i, t) {
    return window.WXWASMSDK.WX_SyncFunction_bsnn(La(n), La(e), i, t)
  }

  function gf(n, e) {
    return window.WXWASMSDK.WX_SyncFunction_bt(La(n), La(e))
  }

  function hf(n, e) {
    return window.WXWASMSDK.WX_SyncFunction_nt(La(n), La(e))
  }

  function wf(n, e) {
    var i = window.WXWASMSDK.WX_SyncFunction_ss(La(n), La(e)),
      t = ln(i || "") + 1,
      r = Bg(t);
    return on(i || "", r, t), r
  }

  function Sf(n, e) {
    var i = window.WXWASMSDK.WX_SyncFunction_t(La(n), La(e)),
      t = ln(i || "") + 1,
      r = Bg(t);
    return on(i || "", r, t), r
  }

  function Cf(n, e, i, t) {
    var r = window.WXWASMSDK.WX_SyncFunction_tnn(La(n), La(e), i, t),
      a = ln(r || "") + 1,
      o = Bg(a);
    return on(r || "", o, a), o
  }

  function Ef(n, e, i) {
    var t = window.WXWASMSDK.WX_SyncFunction_tt(La(n), La(e), La(i)),
      r = ln(t || "") + 1,
      a = Bg(r);
    return on(t || "", a, r), a
  }

  function Wf(n, e) {
    window.WXWASMSDK.WX_TCPSocketBindWifi(La(n), La(e))
  }

  function bf(n) {
    window.WXWASMSDK.WX_TCPSocketClose(La(n))
  }

  function Af(n, e) {
    window.WXWASMSDK.WX_TCPSocketConnect(La(n), La(e))
  }

  function Df(n) {
    window.WXWASMSDK.WX_TCPSocketOffBindWifi(La(n))
  }

  function Mf(n) {
    window.WXWASMSDK.WX_TCPSocketOffClose(La(n))
  }

  function kf(n) {
    window.WXWASMSDK.WX_TCPSocketOffConnect(La(n))
  }

  function xf(n) {
    window.WXWASMSDK.WX_TCPSocketOffError(La(n))
  }

  function Xf(n) {
    window.WXWASMSDK.WX_TCPSocketOffMessage(La(n))
  }

  function jf(n) {
    window.WXWASMSDK.WX_TCPSocketOnBindWifi(La(n))
  }

  function Tf(n) {
    window.WXWASMSDK.WX_TCPSocketOnClose(La(n))
  }

  function Lf(n) {
    window.WXWASMSDK.WX_TCPSocketOnConnect(La(n))
  }

  function Ff(n) {
    window.WXWASMSDK.WX_TCPSocketOnError(La(n))
  }

  function Pf(n, e) {
    window.WXWASMSDK.WX_TCPSocketOnMessage(La(n), e)
  }

  function Rf(n, e, i) {
    window.WXWASMSDK.WX_TCPSocketWriteBuffer(La(n), e, i)
  }

  function Bf(n, e) {
    window.WXWASMSDK.WX_TCPSocketWriteString(La(n), La(e))
  }

  function Gf(n, e) {
    return window.WXWASMSDK.WX_UDPSocketBind(La(n), e)
  }

  function Of(n) {
    window.WXWASMSDK.WX_UDPSocketClose(La(n))
  }

  function If(n, e) {
    window.WXWASMSDK.WX_UDPSocketConnect(La(n), La(e))
  }

  function Kf(n) {
    window.WXWASMSDK.WX_UDPSocketOffClose(La(n))
  }

  function Nf(n) {
    window.WXWASMSDK.WX_UDPSocketOffError(La(n))
  }

  function Uf(n) {
    window.WXWASMSDK.WX_UDPSocketOffListening(La(n))
  }

  function zf(n) {
    window.WXWASMSDK.WX_UDPSocketOffMessage(La(n))
  }

  function qf(n) {
    window.WXWASMSDK.WX_UDPSocketOnClose(La(n))
  }

  function Hf(n) {
    window.WXWASMSDK.WX_UDPSocketOnError(La(n))
  }

  function Vf(n) {
    window.WXWASMSDK.WX_UDPSocketOnListening(La(n))
  }

  function Yf(n, e) {
    window.WXWASMSDK.WX_UDPSocketOnMessage(La(n), e)
  }

  function Jf(n, e, i, t) {
    window.WXWASMSDK.WX_UDPSocketSendBuffer(La(n), e, i, La(t))
  }

  function Zf(n, e, i) {
    window.WXWASMSDK.WX_UDPSocketSendString(La(n), La(e), La(i))
  }

  function Qf(n, e) {
    window.WXWASMSDK.WX_UDPSocketSetTTL(La(n), e)
  }

  function $f(n, e, i, t) {
    window.WXWASMSDK.WX_UDPSocketWriteBuffer(La(n), e, i, La(t))
  }

  function nc(n, e, i) {
    window.WXWASMSDK.WX_UDPSocketWriteString(La(n), La(e), La(i))
  }

  function ec(n, e) {
    window.WXWASMSDK.WX_UploadFile(La(n), La(e))
  }
  var ic = {
    DESTRUCTOR_OFFSET: 0,
    REFCOUNT_OFFSET: 4,
    TYPE_OFFSET: 8,
    CAUGHT_OFFSET: 12,
    RETHROWN_OFFSET: 13,
    SIZE: 16
  };

  function tc(n) {
    return Bg(n + ic.SIZE) + ic.SIZE
  }

  function rc(n) {
    this.excPtr = n, this.ptr = n - ic.SIZE, this.set_type = function(n) {
      Z[this.ptr + ic.TYPE_OFFSET >> 2] = n
    }, this.get_type = function() {
      return Z[this.ptr + ic.TYPE_OFFSET >> 2]
    }, this.set_destructor = function(n) {
      Z[this.ptr + ic.DESTRUCTOR_OFFSET >> 2] = n
    }, this.get_destructor = function() {
      return Z[this.ptr + ic.DESTRUCTOR_OFFSET >> 2]
    }, this.set_refcount = function(n) {
      Z[this.ptr + ic.REFCOUNT_OFFSET >> 2] = n
    }, this.set_caught = function(n) {
      n = n ? 1 : 0, H[this.ptr + ic.CAUGHT_OFFSET >> 0] = n
    }, this.get_caught = function() {
      return 0 != H[this.ptr + ic.CAUGHT_OFFSET >> 0]
    }, this.set_rethrown = function(n) {
      n = n ? 1 : 0, H[this.ptr + ic.RETHROWN_OFFSET >> 0] = n
    }, this.get_rethrown = function() {
      return 0 != H[this.ptr + ic.RETHROWN_OFFSET >> 0]
    }, this.init = function(n, e) {
      this.set_type(n), this.set_destructor(e), this.set_refcount(0), this.set_caught(!1), this.set_rethrown(!1)
    }, this.add_ref = function() {
      var n = Z[this.ptr + ic.REFCOUNT_OFFSET >> 2];
      Z[this.ptr + ic.REFCOUNT_OFFSET >> 2] = n + 1
    }, this.release_ref = function() {
      var n = Z[this.ptr + ic.REFCOUNT_OFFSET >> 2];
      return Z[this.ptr + ic.REFCOUNT_OFFSET >> 2] = n - 1, 1 === n
    }
  }

  function ac(n) {
    this.free = function() {
      Gg(this.ptr), this.ptr = 0
    }, this.set_base_ptr = function(n) {
      Z[this.ptr >> 2] = n
    }, this.get_base_ptr = function() {
      return Z[this.ptr >> 2]
    }, this.set_adjusted_ptr = function(n) {
      Z[this.ptr + 4 >> 2] = n
    }, this.get_adjusted_ptr = function() {
      return Z[this.ptr + 4 >> 2]
    }, this.get_exception_ptr = function() {
      if (Rg(this.get_exception_info().get_type())) return Z[this.get_base_ptr() >> 2];
      var n = this.get_adjusted_ptr();
      return 0 !== n ? n : this.get_base_ptr()
    }, this.get_exception_info = function() {
      return new rc(this.get_base_ptr())
    }, void 0 === n ? (this.ptr = Bg(8), this.set_adjusted_ptr(0)) : this.ptr = n
  }
  var oc = [];

  function lc(n) {
    n.add_ref()
  }

  function uc(n) {
    var e = new ac(n),
      i = e.get_exception_info();
    return i.get_caught() || (i.set_caught(!0)), i.set_rethrown(!1), oc.push(e), lc(i), e.get_exception_ptr()
  }
  var fc = 0;

  function cc(n) {
    return Gg(new rc(n).ptr)
  }

  function sc(n) {
    if (n.release_ref() && !n.get_rethrown()) {
      var e = n.get_destructor();
      e && (i = n.excPtr, qg.apply(null, [e, i])), cc(n.excPtr)
    }
    var i
  }

  function dc() {
    Fg(0);
    var n = oc.pop();
    sc(n.get_exception_info()), n.free(), fc = 0
  }

  function pc(n) {
    var e = new ac(n),
      i = e.get_base_ptr();
    throw fc || (fc = i), e.free(), i
  }

  function mc() {
    var n = fc;
    if (!n) return P(0), 0;
    var e = new rc(n),
      i = e.get_type(),
      t = new ac;
    if (t.set_base_ptr(n), !i) return P(0), 0 | t.ptr;
    var r = Array.prototype.slice.call(arguments),
      a = jg(),
      o = Lg(4);
    Z[o >> 2] = n;
    for (var l = 0; l < r.length; l++) {
      var u = r[l];
      if (0 === u || u === i) break;
      if (Pg(u, i, o)) {
        var f = Z[o >> 2];
        return n !== f && t.set_adjusted_ptr(f), P(u), 0 | t.ptr
      }
    }
    return Tg(a), P(i), 0 | t.ptr
  }

  function yc() {
    var n = fc;
    if (!n) return P(0), 0;
    var e = new rc(n),
      i = e.get_type(),
      t = new ac;
    if (t.set_base_ptr(n), !i) return P(0), 0 | t.ptr;
    var r = Array.prototype.slice.call(arguments),
      a = jg(),
      o = Lg(4);
    Z[o >> 2] = n;
    for (var l = 0; l < r.length; l++) {
      var u = r[l];
      if (0 === u || u === i) break;
      if (Pg(u, i, o)) {
        var f = Z[o >> 2];
        return n !== f && t.set_adjusted_ptr(f), P(u), 0 | t.ptr
      }
    }
    return Tg(a), P(i), 0 | t.ptr
  }

  function vc() {
    var n = fc;
    if (!n) return P(0), 0;
    var e = new rc(n),
      i = e.get_type(),
      t = new ac;
    if (t.set_base_ptr(n), !i) return P(0), 0 | t.ptr;
    var r = Array.prototype.slice.call(arguments),
      a = jg(),
      o = Lg(4);
    Z[o >> 2] = n;
    for (var l = 0; l < r.length; l++) {
      var u = r[l];
      if (0 === u || u === i) break;
      if (Pg(u, i, o)) {
        var f = Z[o >> 2];
        return n !== f && t.set_adjusted_ptr(f), P(u), 0 | t.ptr
      }
    }
    return Tg(a), P(i), 0 | t.ptr
  }

  function _c() {
    var n = oc.pop();
    n || r("no exception to throw");
    var e = n.get_exception_info(),
      i = n.get_base_ptr();
    throw e.get_rethrown() ? n.free() : (oc.push(n), e.set_rethrown(!0), e.set_caught(!1)), fc = i, i
  }

  function gc(n, e, i) {
    throw new rc(n).init(e, i), fc = n, n
  }

  function hc(n, e) {
    var i = new Date(1e3 * Z[n >> 2]);
    Z[e >> 2] = i.getUTCSeconds(), Z[e + 4 >> 2] = i.getUTCMinutes(), Z[e + 8 >> 2] = i.getUTCHours(), Z[e + 12 >> 2] = i.getUTCDate(), Z[e + 16 >> 2] = i.getUTCMonth(), Z[e + 20 >> 2] = i.getUTCFullYear() - 1900, Z[e + 24 >> 2] = i.getUTCDay(), Z[e + 36 >> 2] = 0, Z[e + 32 >> 2] = 0;
    var t = Date.UTC(i.getUTCFullYear(), 0, 1, 0, 0, 0, 0),
      r = (i.getTime() - t) / 864e5 | 0;
    return Z[e + 28 >> 2] = r, hc.GMTString || (hc.GMTString = un("GMT")), Z[e + 40 >> 2] = hc.GMTString, e
  }

  function wc(n, e) {
    return hc(n, e)
  }

  function Sc() {
    if (!Sc.called) {
      Sc.called = !0;
      var n = (new Date).getFullYear(),
        e = new Date(n, 0, 1),
        i = new Date(n, 6, 1),
        t = e.getTimezoneOffset(),
        r = i.getTimezoneOffset(),
        a = Math.max(t, r);
      Z[Xg() >> 2] = 60 * a, Z[xg() >> 2] = Number(t != r);
      var o = c(e),
        l = c(i),
        u = un(o),
        f = un(l);
      r < t ? (Z[kg() >> 2] = u, Z[kg() + 4 >> 2] = f) : (Z[kg() >> 2] = f, Z[kg() + 4 >> 2] = u)
    }

    function c(n) {
      var e = n.toTimeString().match(/\(([A-Za-z ]+)\)$/);
      return e ? e[1] : "GMT"
    }
  }

  function Cc(n, e) {
    Sc();
    var i = new Date(1e3 * Z[n >> 2]);
    Z[e >> 2] = i.getSeconds(), Z[e + 4 >> 2] = i.getMinutes(), Z[e + 8 >> 2] = i.getHours(), Z[e + 12 >> 2] = i.getDate(), Z[e + 16 >> 2] = i.getMonth(), Z[e + 20 >> 2] = i.getFullYear() - 1900, Z[e + 24 >> 2] = i.getDay();
    var t = new Date(i.getFullYear(), 0, 1),
      r = (i.getTime() - t.getTime()) / 864e5 | 0;
    Z[e + 28 >> 2] = r, Z[e + 36 >> 2] = -60 * i.getTimezoneOffset();
    var a = new Date(i.getFullYear(), 6, 1).getTimezoneOffset(),
      o = t.getTimezoneOffset(),
      l = 0 | (a != o && i.getTimezoneOffset() == Math.min(o, a));
    Z[e + 32 >> 2] = l;
    var u = Z[kg() + (l ? 4 : 0) >> 2];
    return Z[e + 40 >> 2] = u, e
  }

  function Ec(n, e) {
    return Cc(n, e)
  }
  var Wc = {
    splitPath: function(n) {
      return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(n).slice(1)
    },
    normalizeArray: function(n, e) {
      for (var i = 0, t = n.length - 1; t >= 0; t--) {
        var r = n[t];
        "." === r ? n.splice(t, 1) : ".." === r ? (n.splice(t, 1), i++) : i && (n.splice(t, 1), i--)
      }
      if (e)
        for (; i; i--) n.unshift("..");
      return n
    },
    normalize: function(n) {
      var e = "/" === n.charAt(0),
        i = "/" === n.substr(-1);
      return (n = Wc.normalizeArray(n.split("/").filter((function(n) {
        return !!n
      })), !e).join("/")) || e || (n = "."), n && i && (n += "/"), (e ? "/" : "") + n
    },
    dirname: function(n) {
      var e = Wc.splitPath(n),
        i = e[0],
        t = e[1];
      return i || t ? (t && (t = t.substr(0, t.length - 1)), i + t) : "."
    },
    basename: function(n) {
      if ("/" === n) return "/";
      var e = (n = (n = Wc.normalize(n)).replace(/\/$/, "")).lastIndexOf("/");
      return -1 === e ? n : n.substr(e + 1)
    },
    extname: function(n) {
      return Wc.splitPath(n)[3]
    },
    join: function() {
      var n = Array.prototype.slice.call(arguments, 0);
      return Wc.normalize(n.join("/"))
    },
    join2: function(n, e) {
      return Wc.normalize(n + "/" + e)
    }
  };

  function bc() {
    if (n.IsWxGame) return function() {
      return 256 * Math.random() | 0
    };
    if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
      var e = new Uint8Array(1);
      return function() {
        return crypto.getRandomValues(e), e[0]
      }
    }
    if (S) try {
      var i = require("crypto");
      return function() {
        return i.randomBytes(1)[0]
      }
    } catch (n) {}
    return function() {
      if (n.IsWxGame) return 256 * Math.random() | 0;
      r("randomDevice")
    }
  }
  var Ac = {
      resolve: function() {
        for (var n = "", e = !1, i = arguments.length - 1; i >= -1 && !e; i--) {
          var t = i >= 0 ? arguments[i] : Xc.cwd();
          if ("string" != typeof t) throw new TypeError("Arguments to path.resolve must be strings");
          if (!t) return "";
          n = t + "/" + n, e = "/" === t.charAt(0)
        }
        return (e ? "/" : "") + (n = Wc.normalizeArray(n.split("/").filter((function(n) {
          return !!n
        })), !e).join("/")) || "."
      },
      relative: function(n, e) {
        function i(n) {
          for (var e = 0; e < n.length && "" === n[e]; e++);
          for (var i = n.length - 1; i >= 0 && "" === n[i]; i--);
          return e > i ? [] : n.slice(e, i - e + 1)
        }
        n = Ac.resolve(n).substr(1), e = Ac.resolve(e).substr(1);
        for (var t = i(n.split("/")), r = i(e.split("/")), a = Math.min(t.length, r.length), o = a, l = 0; l < a; l++)
          if (t[l] !== r[l]) {
            o = l;
            break
          } var u = [];
        for (l = o; l < t.length; l++) u.push("..");
        return (u = u.concat(r.slice(o))).join("/")
      }
    },
    Dc = {
      ttys: [],
      init: function() {},
      shutdown: function() {},
      register: function(n, e) {
        Dc.ttys[n] = {
          input: [],
          output: [],
          ops: e
        }, Xc.registerDevice(n, Dc.stream_ops)
      },
      stream_ops: {
        open: function(n) {
          var e = Dc.ttys[n.node.rdev];
          if (!e) throw new Xc.ErrnoError(43);
          n.tty = e, n.seekable = !1
        },
        close: function(n) {
          n.tty.ops.flush(n.tty)
        },
        flush: function(n) {
          n.tty.ops.flush(n.tty)
        },
        read: function(n, e, i, t, r) {
          if (!n.tty || !n.tty.ops.get_char) throw new Xc.ErrnoError(60);
          for (var a = 0, o = 0; o < t; o++) {
            var l;
            try {
              l = n.tty.ops.get_char(n.tty)
            } catch (n) {
              throw new Xc.ErrnoError(29)
            }
            if (void 0 === l && 0 === a) throw new Xc.ErrnoError(6);
            if (null == l) break;
            a++, e[i + o] = l
          }
          return a && (n.node.timestamp = Date.now()), a
        },
        write: function(n, e, i, t, r) {
          if (!n.tty || !n.tty.ops.put_char) throw new Xc.ErrnoError(60);
          try {
            for (var a = 0; a < t; a++) n.tty.ops.put_char(n.tty, e[i + a])
          } catch (n) {
            throw new Xc.ErrnoError(29)
          }
          return t && (n.node.timestamp = Date.now()), a
        }
      },
      default_tty_ops: {
        get_char: function(n) {
          if (!n.input.length) {
            var e = null;
            if (S) {
              var i = Buffer.alloc ? Buffer.alloc(256) : new Buffer(256),
                t = 0;
              try {
                t = b.readSync(process.stdin.fd, i, 0, 256, null)
              } catch (n) {
                if (!n.toString().includes("EOF")) throw n;
                t = 0
              }
              e = t > 0 ? i.slice(0, t).toString("utf-8") : null
            } else "undefined" != typeof window && "function" == typeof window.prompt ? null !== (e = window.prompt("Input: ")) && (e += "\n") : "function" == typeof readline && null !== (e = readline()) && (e += "\n");
            if (!e) return null;
            n.input = gg(e, !0)
          }
          return n.input.shift()
        },
        put_char: function(n, e) {
          null === e || 10 === e ? (k(tn(n.output, 0)), n.output = []) : 0 != e && n.output.push(e)
        },
        flush: function(n) {
          n.output && n.output.length > 0 && (k(tn(n.output, 0)), n.output = [])
        }
      },
      default_tty1_ops: {
        put_char: function(n, e) {
          null === e || 10 === e ? (x(tn(n.output, 0)), n.output = []) : 0 != e && n.output.push(e)
        },
        flush: function(n) {
          n.output && n.output.length > 0 && (x(tn(n.output, 0)), n.output = [])
        }
      }
    };

  function Mc(n) {
    for (var e = j(n, 65536), i = Bg(e); n < e;) H[i + n++] = 0;
    return i
  }
  var kc = {
      ops_table: null,
      mount: function(n) {
        return kc.createNode(null, "/", 16895, 0)
      },
      createNode: function(n, e, i, t) {
        if (Xc.isBlkdev(i) || Xc.isFIFO(i)) throw new Xc.ErrnoError(63);
        kc.ops_table || (kc.ops_table = {
          dir: {
            node: {
              getattr: kc.node_ops.getattr,
              setattr: kc.node_ops.setattr,
              lookup: kc.node_ops.lookup,
              mknod: kc.node_ops.mknod,
              rename: kc.node_ops.rename,
              unlink: kc.node_ops.unlink,
              rmdir: kc.node_ops.rmdir,
              readdir: kc.node_ops.readdir,
              symlink: kc.node_ops.symlink
            },
            stream: {
              llseek: kc.stream_ops.llseek
            }
          },
          file: {
            node: {
              getattr: kc.node_ops.getattr,
              setattr: kc.node_ops.setattr
            },
            stream: {
              llseek: kc.stream_ops.llseek,
              read: kc.stream_ops.read,
              write: kc.stream_ops.write,
              allocate: kc.stream_ops.allocate,
              mmap: kc.stream_ops.mmap,
              msync: kc.stream_ops.msync
            }
          },
          link: {
            node: {
              getattr: kc.node_ops.getattr,
              setattr: kc.node_ops.setattr,
              readlink: kc.node_ops.readlink
            },
            stream: {}
          },
          chrdev: {
            node: {
              getattr: kc.node_ops.getattr,
              setattr: kc.node_ops.setattr
            },
            stream: Xc.chrdev_stream_ops
          }
        });
        var r = Xc.createNode(n, e, i, t);
        return Xc.isDir(r.mode) ? (r.node_ops = kc.ops_table.dir.node, r.stream_ops = kc.ops_table.dir.stream, r.contents = {}) : Xc.isFile(r.mode) ? (r.node_ops = kc.ops_table.file.node, r.stream_ops = kc.ops_table.file.stream, r.usedBytes = 0, r.contents = null) : Xc.isLink(r.mode) ? (r.node_ops = kc.ops_table.link.node, r.stream_ops = kc.ops_table.link.stream) : Xc.isChrdev(r.mode) && (r.node_ops = kc.ops_table.chrdev.node, r.stream_ops = kc.ops_table.chrdev.stream), r.timestamp = Date.now(), n && (n.contents[e] = r, n.timestamp = r.timestamp), r
      },
      getFileDataAsTypedArray: function(n) {
        return n.contents ? n.contents.subarray ? n.contents.subarray(0, n.usedBytes) : new Uint8Array(n.contents) : new Uint8Array(0)
      },
      expandFileStorage: function(n, e) {
        var i = n.contents ? n.contents.length : 0;
        if (!(i >= e)) {
          e = Math.max(e, i * (i < 1048576 ? 2 : 1.125) >>> 0), 0 != i && (e = Math.max(e, 256));
          var t = n.contents;
          n.contents = new Uint8Array(e), n.usedBytes > 0 && n.contents.set(t.subarray(0, n.usedBytes), 0)
        }
      },
      resizeFileStorage: function(n, e) {
        if (n.usedBytes != e)
          if (0 == e) n.contents = null, n.usedBytes = 0;
          else {
            var i = n.contents;
            n.contents = new Uint8Array(e), i && n.contents.set(i.subarray(0, Math.min(e, n.usedBytes))), n.usedBytes = e
          }
      },
      node_ops: {
        getattr: function(n) {
          var e = {};
          return e.dev = Xc.isChrdev(n.mode) ? n.id : 1, e.ino = n.id, e.mode = n.mode, e.nlink = 1, e.uid = 0, e.gid = 0, e.rdev = n.rdev, Xc.isDir(n.mode) ? e.size = 4096 : Xc.isFile(n.mode) ? e.size = n.usedBytes : Xc.isLink(n.mode) ? e.size = n.link.length : e.size = 0, e.atime = new Date(n.timestamp), e.mtime = new Date(n.timestamp), e.ctime = new Date(n.timestamp), e.blksize = 4096, e.blocks = Math.ceil(e.size / e.blksize), e
        },
        setattr: function(n, e) {
          void 0 !== e.mode && (n.mode = e.mode), void 0 !== e.timestamp && (n.timestamp = e.timestamp), void 0 !== e.size && kc.resizeFileStorage(n, e.size)
        },
        lookup: function(n, e) {
          throw Xc.genericErrors[44]
        },
        mknod: function(n, e, i, t) {
          return kc.createNode(n, e, i, t)
        },
        rename: function(n, e, i) {
          if (Xc.isDir(n.mode)) {
            var t;
            try {
              t = Xc.lookupNode(e, i)
            } catch (n) {}
            if (t)
              for (var r in t.contents) throw new Xc.ErrnoError(55)
          }
          delete n.parent.contents[n.name], n.parent.timestamp = Date.now(), n.name = i, e.contents[i] = n, e.timestamp = n.parent.timestamp, n.parent = e
        },
        unlink: function(n, e) {
          delete n.contents[e], n.timestamp = Date.now()
        },
        rmdir: function(n, e) {
          var i = Xc.lookupNode(n, e);
          for (var t in i.contents) throw new Xc.ErrnoError(55);
          delete n.contents[e], n.timestamp = Date.now()
        },
        readdir: function(n) {
          var e = [".", ".."];
          for (var i in n.contents) n.contents.hasOwnProperty(i) && e.push(i);
          return e
        },
        symlink: function(n, e, i) {
          var t = kc.createNode(n, e, 41471, 0);
          return t.link = i, t
        },
        readlink: function(n) {
          if (!Xc.isLink(n.mode)) throw new Xc.ErrnoError(28);
          return n.link
        }
      },
      stream_ops: {
        read: function(n, e, i, t, r) {
          var a = n.node.contents;
          if (r >= n.node.usedBytes) return 0;
          var o = Math.min(n.node.usedBytes - r, t);
          if (o > 8 && a.subarray) e.set(a.subarray(r, r + o), i);
          else
            for (var l = 0; l < o; l++) e[i + l] = a[r + l];
          return o
        },
        write: function(e, i, t, r, a, o) {
          if (n.IsWxGame || i.buffer !== H.buffer || (o = !1), !r) return 0;
          var l = e.node;
          if (l.timestamp = Date.now(), i.subarray && (!l.contents || l.contents.subarray)) {
            if (o) return l.contents = i.subarray(t, t + r), l.usedBytes = r, r;
            if (0 === l.usedBytes && 0 === a) return l.contents = i.slice(t, t + r), l.usedBytes = r, r;
            if (a + r <= l.usedBytes) return l.contents.set(i.subarray(t, t + r), a), r
          }
          if (kc.expandFileStorage(l, a + r), l.contents.subarray && i.subarray) l.contents.set(i.subarray(t, t + r), a);
          else
            for (var u = 0; u < r; u++) l.contents[a + u] = i[t + u];
          return l.usedBytes = Math.max(l.usedBytes, a + r), r
        },
        llseek: function(n, e, i) {
          var t = e;
          if (1 === i ? t += n.position : 2 === i && Xc.isFile(n.node.mode) && (t += n.node.usedBytes), t < 0) throw new Xc.ErrnoError(28);
          return t
        },
        allocate: function(n, e, i) {
          kc.expandFileStorage(n.node, e + i), n.node.usedBytes = Math.max(n.node.usedBytes, e + i)
        },
        mmap: function(n, e, i, t, r, a) {
          if (0 !== e) throw new Xc.ErrnoError(28);
          if (!Xc.isFile(n.node.mode)) throw new Xc.ErrnoError(43);
          var o, l, u = n.node.contents;
          if (2 & a || u.buffer !== q) {
            if ((t > 0 || t + i < u.length) && (u = u.subarray ? u.subarray(t, t + i) : Array.prototype.slice.call(u, t, t + i)), l = !0, !(o = Mc(i))) throw new Xc.ErrnoError(48);
            H.set(u, o)
          } else l = !1, o = u.byteOffset;
          return {
            ptr: o,
            allocated: l
          }
        },
        msync: function(n, e, i, t, r) {
          if (!Xc.isFile(n.node.mode)) throw new Xc.ErrnoError(43);
          if (2 & r) return 0;
          kc.stream_ops.write(n, e, 0, t, i, !1);
          return 0
        }
      }
    },
    xc = GameGlobal.unityNamespace.IDBFS = {
      dbs: {},
      indexedDB: function() {
        if ("undefined" != typeof indexedDB) return indexedDB;
        var n = null;
        return "object" == typeof window && (n = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB), K(n, "IDBFS used, but indexedDB not supported"), n
      },
      DB_VERSION: 21,
      DB_STORE_NAME: "FILE_DATA",
      mount: function(n) {
        return kc.mount.apply(null, arguments)
      },
      syncfs: function(n, e, i) {
        xc.getLocalSet(n, (function(t, r) {
          if (t) return i(t);
          xc.getRemoteSet(n, (function(n, t) {
            if (n) return i(n);
            var a = e ? t : r,
              o = e ? r : t;
            xc.reconcile(a, o, i)
          }))
        }))
      },
      getDB: function(n, e) {
        var i, t = xc.dbs[n];
        if (t) return e(null, t);
        try {
          i = xc.indexedDB().open(n, xc.DB_VERSION)
        } catch (n) {
          return e(n)
        }
        if (!i) return e("Unable to connect to IndexedDB");
        i.onupgradeneeded = function(n) {
          var e, i = n.target.result,
            t = n.target.transaction;
          (e = i.objectStoreNames.contains(xc.DB_STORE_NAME) ? t.objectStore(xc.DB_STORE_NAME) : i.createObjectStore(xc.DB_STORE_NAME)).indexNames.contains("timestamp") || e.createIndex("timestamp", "timestamp", {
            unique: !1
          })
        }, i.onsuccess = function() {
          t = i.result, xc.dbs[n] = t, e(null, t)
        }, i.onerror = function(n) {
          e(this.error), n.preventDefault()
        }
      },
      getLocalSet: function(n, e) {
        var i = {};

        function t(n) {
          return "." !== n && ".." !== n
        }

        function r(n) {
          return function(e) {
            return Wc.join2(n, e)
          }
        }
        for (var a = Xc.readdir(n.mountpoint).filter(t).map(r(n.mountpoint)); a.length;) {
          var o, l = a.pop();
          try {
            o = Xc.stat(l)
          } catch (n) {
            return e(n)
          }
          Xc.isDir(o.mode) && a.push.apply(a, Xc.readdir(l).filter(t).map(r(l))), i[l] = {
            timestamp: o.mtime
          }
        }
        return e(null, {
          type: "local",
          entries: i
        })
      },
      getRemoteSet: function(n, e) {
        var i = {};
        xc.getDB(n.mountpoint, (function(n, t) {
          if (n) return e(n);
          try {
            var r = t.transaction([xc.DB_STORE_NAME], "readonly");
            r.onerror = function(n) {
              e(this.error), n.preventDefault()
            }, r.objectStore(xc.DB_STORE_NAME).index("timestamp").openKeyCursor().onsuccess = function(n) {
              var r = n.target.result;
              if (!r) return e(null, {
                type: "remote",
                db: t,
                entries: i
              });
              i[r.primaryKey] = {
                timestamp: r.key
              }, r.continue()
            }
          } catch (n) {
            return e(n)
          }
        }))
      },
      loadLocalEntry: function(n, e) {
        var i, t;
        try {
          t = Xc.lookupPath(n).node, i = Xc.stat(n)
        } catch (n) {
          return e(n)
        }
        return Xc.isDir(i.mode) ? e(null, {
          timestamp: i.mtime,
          mode: i.mode
        }) : Xc.isFile(i.mode) ? (t.contents = kc.getFileDataAsTypedArray(t), e(null, {
          timestamp: i.mtime,
          mode: i.mode,
          contents: t.contents
        })) : e(new Error("node type not supported"))
      },
      storeLocalEntry: function(n, e, i) {
        try {
          if (Xc.isDir(e.mode)) Xc.mkdirTree(n, e.mode);
          else {
            if (!Xc.isFile(e.mode)) return i(new Error("node type not supported"));
            Xc.writeFile(n, e.contents, {
              canOwn: !0
            })
          }
          Xc.chmod(n, e.mode), Xc.utime(n, e.timestamp, e.timestamp)
        } catch (n) {
          return i(n)
        }
        i(null)
      },
      removeLocalEntry: function(n, e) {
        try {
          Xc.lookupPath(n);
          var i = Xc.stat(n);
          Xc.isDir(i.mode) ? Xc.rmdir(n) : Xc.isFile(i.mode) && Xc.unlink(n)
        } catch (n) {
          return e(n)
        }
        e(null)
      },
      loadRemoteEntry: function(n, e, i) {
        var t = n.get(e);
        t.onsuccess = function(n) {
          i(null, n.target.result)
        }, t.onerror = function(n) {
          i(this.error), n.preventDefault()
        }
      },
      storeRemoteEntry: function(n, e, i, t) {
        var r = n.put(i, e);
        r.onsuccess = function() {
          t(null)
        }, r.onerror = function(n) {
          t(this.error), n.preventDefault()
        }
      },
      removeRemoteEntry: function(n, e, i) {
        var t = n.delete(e);
        t.onsuccess = function() {
          i(null)
        }, t.onerror = function(n) {
          i(this.error), n.preventDefault()
        }
      },
      reconcile: function(n, e, i) {
        var t = 0,
          r = [];
        Object.keys(n.entries).forEach((function(i) {
          var a = n.entries[i],
            o = e.entries[i];
          o && a.timestamp.getTime() == o.timestamp.getTime() || (r.push(i), t++)
        }));
        var a = [];
        if (Object.keys(e.entries).forEach((function(e) {
            n.entries[e] || (a.push(e), t++)
          })), !t) return i(null);
        var o = !1,
          l = ("remote" === n.type ? n.db : e.db).transaction([xc.DB_STORE_NAME], "readwrite"),
          u = l.objectStore(xc.DB_STORE_NAME);

        function f(n) {
          if (n && !o) return o = !0, i(n)
        }
        l.onerror = function(n) {
          f(this.error), n.preventDefault()
        }, l.oncomplete = function(n) {
          o || i(null)
        }, r.sort().forEach((function(n) {
          "local" === e.type ? xc.loadRemoteEntry(u, n, (function(e, i) {
            if (e) return f(e);
            xc.storeLocalEntry(n, i, f)
          })) : xc.loadLocalEntry(n, (function(e, i) {
            if (e) return f(e);
            xc.storeRemoteEntry(u, n, i, f)
          }))
        })), a.sort().reverse().forEach((function(n) {
          "local" === e.type ? xc.removeLocalEntry(n, f) : xc.removeRemoteEntry(u, n, f)
        }))
      }
    },
    Xc = GameGlobal.unityNamespace.FS = {
      root: null,
      mounts: [],
      devices: {},
      streams: [],
      nextInode: 1,
      nameTable: null,
      currentPath: "/",
      initialized: !1,
      ignorePermissions: !0,
      trackingDelegate: {},
      tracking: {
        openFlags: {
          READ: 1,
          WRITE: 2
        }
      },
      ErrnoError: null,
      genericErrors: {},
      filesystems: null,
      syncFSRequests: 0,
      lookupPath: function(n, e) {
        if (e = e || {}, !(n = Ac.resolve(Xc.cwd(), n))) return {
          path: "",
          node: null
        };
        var i = {
          follow_mount: !0,
          recurse_count: 0
        };
        for (var t in i) void 0 === e[t] && (e[t] = i[t]);
        if (e.recurse_count > 8) throw new Xc.ErrnoError(32);
        for (var r = Wc.normalizeArray(n.split("/").filter((function(n) {
            return !!n
          })), !1), a = Xc.root, o = "/", l = 0; l < r.length; l++) {
          var u = l === r.length - 1;
          if (u && e.parent) break;
          if (a = Xc.lookupNode(a, r[l]), o = Wc.join2(o, r[l]), Xc.isMountpoint(a) && (!u || u && e.follow_mount) && (a = a.mounted.root), !u || e.follow)
            for (var f = 0; Xc.isLink(a.mode);) {
              var c = Xc.readlink(o);
              if (o = Ac.resolve(Wc.dirname(o), c), a = Xc.lookupPath(o, {
                  recurse_count: e.recurse_count
                }).node, f++ > 40) throw new Xc.ErrnoError(32)
            }
        }
        return {
          path: o,
          node: a
        }
      },
      getPath: function(n) {
        for (var e;;) {
          if (Xc.isRoot(n)) {
            var i = n.mount.mountpoint;
            return e ? "/" !== i[i.length - 1] ? i + "/" + e : i + e : i
          }
          e = e ? n.name + "/" + e : n.name, n = n.parent
        }
      },
      hashName: function(n, e) {
        for (var i = 0, t = 0; t < e.length; t++) i = (i << 5) - i + e.charCodeAt(t) | 0;
        return (n + i >>> 0) % Xc.nameTable.length
      },
      hashAddNode: function(n) {
        var e = Xc.hashName(n.parent.id, n.name);
        n.name_next = Xc.nameTable[e], Xc.nameTable[e] = n
      },
      hashRemoveNode: function(n) {
        var e = Xc.hashName(n.parent.id, n.name);
        if (Xc.nameTable[e] === n) Xc.nameTable[e] = n.name_next;
        else
          for (var i = Xc.nameTable[e]; i;) {
            if (i.name_next === n) {
              i.name_next = n.name_next;
              break
            }
            i = i.name_next
          }
      },
      lookupNode: function(n, e) {
        var i = Xc.mayLookup(n);
        if (i) throw new Xc.ErrnoError(i, n);
        for (var t = Xc.hashName(n.id, e), r = Xc.nameTable[t]; r; r = r.name_next) {
          var a = r.name;
          if (r.parent.id === n.id && a === e) return r
        }
        return Xc.lookup(n, e)
      },
      createNode: function(n, e, i, t) {
        var r = new Xc.FSNode(n, e, i, t);
        return Xc.hashAddNode(r), r
      },
      destroyNode: function(n) {
        Xc.hashRemoveNode(n)
      },
      isRoot: function(n) {
        return n === n.parent
      },
      isMountpoint: function(n) {
        return !!n.mounted
      },
      isFile: function(n) {
        return 32768 == (61440 & n)
      },
      isDir: function(n) {
        return 16384 == (61440 & n)
      },
      isLink: function(n) {
        return 40960 == (61440 & n)
      },
      isChrdev: function(n) {
        return 8192 == (61440 & n)
      },
      isBlkdev: function(n) {
        return 24576 == (61440 & n)
      },
      isFIFO: function(n) {
        return 4096 == (61440 & n)
      },
      isSocket: function(n) {
        return 49152 == (49152 & n)
      },
      flagModes: {
        r: 0,
        "r+": 2,
        w: 577,
        "w+": 578,
        a: 1089,
        "a+": 1090
      },
      modeStringToFlags: function(n) {
        var e = Xc.flagModes[n];
        if (void 0 === e) throw new Error("Unknown file open mode: " + n);
        return e
      },
      flagsToPermissionString: function(n) {
        var e = ["r", "w", "rw"][3 & n];
        return 512 & n && (e += "w"), e
      },
      nodePermissions: function(n, e) {
        return Xc.ignorePermissions || (!e.includes("r") || 292 & n.mode) && (!e.includes("w") || 146 & n.mode) && (!e.includes("x") || 73 & n.mode) ? 0 : 2
      },
      mayLookup: function(n) {
        var e = Xc.nodePermissions(n, "x");
        return e || (n.node_ops.lookup ? 0 : 2)
      },
      mayCreate: function(n, e) {
        try {
          Xc.lookupNode(n, e);
          return 20
        } catch (n) {}
        return Xc.nodePermissions(n, "wx")
      },
      mayDelete: function(n, e, i) {
        var t;
        try {
          t = Xc.lookupNode(n, e)
        } catch (n) {
          return n.errno
        }
        var r = Xc.nodePermissions(n, "wx");
        if (r) return r;
        if (i) {
          if (!Xc.isDir(t.mode)) return 54;
          if (Xc.isRoot(t) || Xc.getPath(t) === Xc.cwd()) return 10
        } else if (Xc.isDir(t.mode)) return 31;
        return 0
      },
      mayOpen: function(n, e) {
        return n ? Xc.isLink(n.mode) ? 32 : Xc.isDir(n.mode) && ("r" !== Xc.flagsToPermissionString(e) || 512 & e) ? 31 : Xc.nodePermissions(n, Xc.flagsToPermissionString(e)) : 44
      },
      MAX_OPEN_FDS: 4096,
      nextfd: function(n, e) {
        n = n || 0, e = e || Xc.MAX_OPEN_FDS;
        for (var i = n; i <= e; i++)
          if (!Xc.streams[i]) return i;
        throw new Xc.ErrnoError(33)
      },
      getStream: function(n) {
        return Xc.streams[n]
      },
      createStream: function(n, e, i) {
        Xc.FSStream || (Xc.FSStream = function() {}, Xc.FSStream.prototype = {
          object: {
            get: function() {
              return this.node
            },
            set: function(n) {
              this.node = n
            }
          },
          isRead: {
            get: function() {
              return 1 != (2097155 & this.flags)
            }
          },
          isWrite: {
            get: function() {
              return 0 != (2097155 & this.flags)
            }
          },
          isAppend: {
            get: function() {
              return 1024 & this.flags
            }
          }
        });
        var t = new Xc.FSStream;
        for (var r in n) t[r] = n[r];
        n = t;
        var a = Xc.nextfd(e, i);
        return n.fd = a, Xc.streams[a] = n, n
      },
      closeStream: function(n) {
        Xc.streams[n] = null
      },
      chrdev_stream_ops: {
        open: function(n) {
          var e = Xc.getDevice(n.node.rdev);
          n.stream_ops = e.stream_ops, n.stream_ops.open && n.stream_ops.open(n)
        },
        llseek: function() {
          throw new Xc.ErrnoError(70)
        }
      },
      major: function(n) {
        return n >> 8
      },
      minor: function(n) {
        return 255 & n
      },
      makedev: function(n, e) {
        return n << 8 | e
      },
      registerDevice: function(n, e) {
        Xc.devices[n] = {
          stream_ops: e
        }
      },
      getDevice: function(n) {
        return Xc.devices[n]
      },
      getMounts: function(n) {
        for (var e = [], i = [n]; i.length;) {
          var t = i.pop();
          e.push(t), i.push.apply(i, t.mounts)
        }
        return e
      },
      syncfs: function(n, e) {
        "function" == typeof n && (e = n, n = !1), Xc.syncFSRequests++, Xc.syncFSRequests > 1 && x("warning: " + Xc.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
        var i = Xc.getMounts(Xc.root.mount),
          t = 0;

        function r(n) {
          return Xc.syncFSRequests--, e(n)
        }

        function a(n) {
          if (n) return a.errored ? void 0 : (a.errored = !0, r(n));
          ++t >= i.length && r(null)
        }
        i.forEach((function(e) {
          if (!e.type.syncfs) return a(null);
          e.type.syncfs(e, n, a)
        }))
      },
      mount: function(n, e, i) {
        var t, r = "/" === i,
          a = !i;
        if (r && Xc.root) throw new Xc.ErrnoError(10);
        if (!r && !a) {
          var o = Xc.lookupPath(i, {
            follow_mount: !1
          });
          if (i = o.path, t = o.node, Xc.isMountpoint(t)) throw new Xc.ErrnoError(10);
          if (!Xc.isDir(t.mode)) throw new Xc.ErrnoError(54)
        }
        var l = {
            type: n,
            opts: e,
            mountpoint: i,
            mounts: []
          },
          u = n.mount(l);
        return u.mount = l, l.root = u, r ? Xc.root = u : t && (t.mounted = l, t.mount && t.mount.mounts.push(l)), u
      },
      unmount: function(n) {
        var e = Xc.lookupPath(n, {
          follow_mount: !1
        });
        if (!Xc.isMountpoint(e.node)) throw new Xc.ErrnoError(28);
        var i = e.node,
          t = i.mounted,
          r = Xc.getMounts(t);
        Object.keys(Xc.nameTable).forEach((function(n) {
          for (var e = Xc.nameTable[n]; e;) {
            var i = e.name_next;
            r.includes(e.mount) && Xc.destroyNode(e), e = i
          }
        })), i.mounted = null;
        var a = i.mount.mounts.indexOf(t);
        i.mount.mounts.splice(a, 1)
      },
      lookup: function(n, e) {
        return n.node_ops.lookup(n, e)
      },
      mknod: function(n, e, i) {
        var t = Xc.lookupPath(n, {
            parent: !0
          }).node,
          r = Wc.basename(n);
        if (!r || "." === r || ".." === r) throw new Xc.ErrnoError(28);
        var a = Xc.mayCreate(t, r);
        if (a) throw new Xc.ErrnoError(a);
        if (!t.node_ops.mknod) throw new Xc.ErrnoError(63);
        return t.node_ops.mknod(t, r, e, i)
      },
      create: function(n, e) {
        return e = void 0 !== e ? e : 438, e &= 4095, e |= 32768, Xc.mknod(n, e, 0)
      },
      mkdir: function(n, e) {
        return e = void 0 !== e ? e : 511, e &= 1023, e |= 16384, Xc.mknod(n, e, 0)
      },
      mkdirTree: function(n, e) {
        for (var i = n.split("/"), t = "", r = 0; r < i.length; ++r)
          if (i[r]) {
            t += "/" + i[r];
            try {
              Xc.mkdir(t, e)
            } catch (n) {
              if (20 != n.errno) throw n
            }
          }
      },
      mkdev: function(n, e, i) {
        return void 0 === i && (i = e, e = 438), e |= 8192, Xc.mknod(n, e, i)
      },
      symlink: function(n, e) {
        if (!Ac.resolve(n)) throw new Xc.ErrnoError(44);
        var i = Xc.lookupPath(e, {
          parent: !0
        }).node;
        if (!i) throw new Xc.ErrnoError(44);
        var t = Wc.basename(e),
          r = Xc.mayCreate(i, t);
        if (r) throw new Xc.ErrnoError(r);
        if (!i.node_ops.symlink) throw new Xc.ErrnoError(63);
        return i.node_ops.symlink(i, t, n)
      },
      rename: function(n, e) {
        var i, t, r = Wc.dirname(n),
          a = Wc.dirname(e),
          o = Wc.basename(n),
          l = Wc.basename(e);
        if (i = Xc.lookupPath(n, {
            parent: !0
          }).node, t = Xc.lookupPath(e, {
            parent: !0
          }).node, !i || !t) throw new Xc.ErrnoError(44);
        if (i.mount !== t.mount) throw new Xc.ErrnoError(75);
        var u, f = Xc.lookupNode(i, o),
          c = Ac.relative(n, a);
        if ("." !== c.charAt(0)) throw new Xc.ErrnoError(28);
        if ("." !== (c = Ac.relative(e, r)).charAt(0)) throw new Xc.ErrnoError(55);
        try {
          u = Xc.lookupNode(t, l)
        } catch (n) {}
        if (f !== u) {
          var s = Xc.isDir(f.mode),
            d = Xc.mayDelete(i, o, s);
          if (d) throw new Xc.ErrnoError(d);
          if (d = u ? Xc.mayDelete(t, l, s) : Xc.mayCreate(t, l)) throw new Xc.ErrnoError(d);
          if (!i.node_ops.rename) throw new Xc.ErrnoError(63);
          if (Xc.isMountpoint(f) || u && Xc.isMountpoint(u)) throw new Xc.ErrnoError(10);
          if (t !== i && (d = Xc.nodePermissions(i, "w"))) throw new Xc.ErrnoError(d);
          try {
            Xc.trackingDelegate.willMovePath && Xc.trackingDelegate.willMovePath(n, e)
          } catch (i) {
            x("FS.trackingDelegate['willMovePath']('" + n + "', '" + e + "') threw an exception: " + i.message)
          }
          Xc.hashRemoveNode(f);
          try {
            i.node_ops.rename(f, t, l)
          } catch (n) {
            throw n
          } finally {
            Xc.hashAddNode(f)
          }
          try {
            Xc.trackingDelegate.onMovePath && Xc.trackingDelegate.onMovePath(n, e)
          } catch (i) {
            x("FS.trackingDelegate['onMovePath']('" + n + "', '" + e + "') threw an exception: " + i.message)
          }
        }
      },
      rmdir: function(n) {
        var e = Xc.lookupPath(n, {
            parent: !0
          }).node,
          i = Wc.basename(n),
          t = Xc.lookupNode(e, i),
          r = Xc.mayDelete(e, i, !0);
        if (r) throw new Xc.ErrnoError(r);
        if (!e.node_ops.rmdir) throw new Xc.ErrnoError(63);
        if (Xc.isMountpoint(t)) throw new Xc.ErrnoError(10);
        try {
          Xc.trackingDelegate.willDeletePath && Xc.trackingDelegate.willDeletePath(n)
        } catch (e) {
          x("FS.trackingDelegate['willDeletePath']('" + n + "') threw an exception: " + e.message)
        }
        e.node_ops.rmdir(e, i), Xc.destroyNode(t);
        try {
          Xc.trackingDelegate.onDeletePath && Xc.trackingDelegate.onDeletePath(n)
        } catch (e) {
          x("FS.trackingDelegate['onDeletePath']('" + n + "') threw an exception: " + e.message)
        }
      },
      readdir: function(n) {
        var e = Xc.lookupPath(n, {
          follow: !0
        }).node;
        if (!e.node_ops.readdir) throw new Xc.ErrnoError(54);
        return e.node_ops.readdir(e)
      },
      unlink: function(n) {
        var e = Xc.lookupPath(n, {
            parent: !0
          }).node,
          i = Wc.basename(n),
          t = Xc.lookupNode(e, i),
          r = Xc.mayDelete(e, i, !1);
        if (r) throw new Xc.ErrnoError(r);
        if (!e.node_ops.unlink) throw new Xc.ErrnoError(63);
        if (Xc.isMountpoint(t)) throw new Xc.ErrnoError(10);
        try {
          Xc.trackingDelegate.willDeletePath && Xc.trackingDelegate.willDeletePath(n)
        } catch (e) {
          x("FS.trackingDelegate['willDeletePath']('" + n + "') threw an exception: " + e.message)
        }
        e.node_ops.unlink(e, i), Xc.destroyNode(t);
        try {
          Xc.trackingDelegate.onDeletePath && Xc.trackingDelegate.onDeletePath(n)
        } catch (e) {
          x("FS.trackingDelegate['onDeletePath']('" + n + "') threw an exception: " + e.message)
        }
      },
      readlink: function(n) {
        var e = Xc.lookupPath(n).node;
        if (!e) throw new Xc.ErrnoError(44);
        if (!e.node_ops.readlink) throw new Xc.ErrnoError(28);
        return Ac.resolve(Xc.getPath(e.parent), e.node_ops.readlink(e))
      },
      stat: function(n, e) {
        var i = Xc.lookupPath(n, {
          follow: !e
        }).node;
        if (!i) throw new Xc.ErrnoError(44);
        if (!i.node_ops.getattr) throw new Xc.ErrnoError(63);
        return i.node_ops.getattr(i)
      },
      lstat: function(n) {
        return Xc.stat(n, !0)
      },
      chmod: function(n, e, i) {
        var t;
        "string" == typeof n ? t = Xc.lookupPath(n, {
          follow: !i
        }).node : t = n;
        if (!t.node_ops.setattr) throw new Xc.ErrnoError(63);
        t.node_ops.setattr(t, {
          mode: 4095 & e | -4096 & t.mode,
          timestamp: Date.now()
        })
      },
      lchmod: function(n, e) {
        Xc.chmod(n, e, !0)
      },
      fchmod: function(n, e) {
        var i = Xc.getStream(n);
        if (!i) throw new Xc.ErrnoError(8);
        Xc.chmod(i.node, e)
      },
      chown: function(n, e, i, t) {
        var r;
        "string" == typeof n ? r = Xc.lookupPath(n, {
          follow: !t
        }).node : r = n;
        if (!r.node_ops.setattr) throw new Xc.ErrnoError(63);
        r.node_ops.setattr(r, {
          timestamp: Date.now()
        })
      },
      lchown: function(n, e, i) {
        Xc.chown(n, e, i, !0)
      },
      fchown: function(n, e, i) {
        var t = Xc.getStream(n);
        if (!t) throw new Xc.ErrnoError(8);
        Xc.chown(t.node, e, i)
      },
      truncate: function(n, e) {
        if (e < 0) throw new Xc.ErrnoError(28);
        var i;
        "string" == typeof n ? i = Xc.lookupPath(n, {
          follow: !0
        }).node : i = n;
        if (!i.node_ops.setattr) throw new Xc.ErrnoError(63);
        if (Xc.isDir(i.mode)) throw new Xc.ErrnoError(31);
        if (!Xc.isFile(i.mode)) throw new Xc.ErrnoError(28);
        var t = Xc.nodePermissions(i, "w");
        if (t) throw new Xc.ErrnoError(t);
        i.node_ops.setattr(i, {
          size: e,
          timestamp: Date.now()
        })
      },
      ftruncate: function(n, e) {
        var i = Xc.getStream(n);
        if (!i) throw new Xc.ErrnoError(8);
        if (0 == (2097155 & i.flags)) throw new Xc.ErrnoError(28);
        Xc.truncate(i.node, e)
      },
      utime: function(n, e, i) {
        var t = Xc.lookupPath(n, {
          follow: !0
        }).node;
        t.node_ops.setattr(t, {
          timestamp: Math.max(e, i)
        })
      },
      open: function(e, i, t, r, a) {
        if ("" === e) throw new Xc.ErrnoError(44);
        var o;
        if (t = void 0 === t ? 438 : t, t = 64 & (i = "string" == typeof i ? Xc.modeStringToFlags(i) : i) ? 4095 & t | 32768 : 0, "object" == typeof e) o = e;
        else {
          e = Wc.normalize(e);
          try {
            o = Xc.lookupPath(e, {
              follow: !(131072 & i)
            }).node
          } catch (n) {}
        }
        var l = !1;
        if (64 & i)
          if (o) {
            if (128 & i) throw new Xc.ErrnoError(20)
          } else o = Xc.mknod(e, t, 0), l = !0;
        if (!o) throw new Xc.ErrnoError(44);
        if (Xc.isChrdev(o.mode) && (i &= -513), 65536 & i && !Xc.isDir(o.mode)) throw new Xc.ErrnoError(54);
        if (!l) {
          var u = Xc.mayOpen(o, i);
          if (u) throw new Xc.ErrnoError(u)
        }
        512 & i && Xc.truncate(o, 0), i &= -131713;
        var f = Xc.createStream({
          node: o,
          path: Xc.getPath(o),
          flags: i,
          seekable: !0,
          position: 0,
          stream_ops: o.stream_ops,
          ungotten: [],
          error: !1
        }, r, a);
        f.stream_ops.open && f.stream_ops.open(f), !n.logReadFiles || 1 & i || (Xc.readFiles || (Xc.readFiles = {}), e in Xc.readFiles || (Xc.readFiles[e] = 1, x("FS.trackingDelegate error on read file: " + e)));
        try {
          if (Xc.trackingDelegate.onOpenFile) {
            var c = 0;
            1 != (2097155 & i) && (c |= Xc.tracking.openFlags.READ), 0 != (2097155 & i) && (c |= Xc.tracking.openFlags.WRITE), Xc.trackingDelegate.onOpenFile(e, c)
          }
        } catch (n) {
          x("FS.trackingDelegate['onOpenFile']('" + e + "', flags) threw an exception: " + n.message)
        }
        return f
      },
      close: function(n) {
        if (Xc.isClosed(n)) throw new Xc.ErrnoError(8);
        n.getdents && (n.getdents = null);
        try {
          n.stream_ops.close && n.stream_ops.close(n)
        } catch (n) {
          throw n
        } finally {
          Xc.closeStream(n.fd)
        }
        n.fd = null
      },
      isClosed: function(n) {
        return null === n.fd
      },
      llseek: function(n, e, i) {
        if (Xc.isClosed(n)) throw new Xc.ErrnoError(8);
        if (!n.seekable || !n.stream_ops.llseek) throw new Xc.ErrnoError(70);
        if (0 != i && 1 != i && 2 != i) throw new Xc.ErrnoError(28);
        return n.position = n.stream_ops.llseek(n, e, i), n.ungotten = [], n.position
      },
      read: function(n, e, i, t, r) {
        if (t < 0 || r < 0) throw new Xc.ErrnoError(28);
        if (Xc.isClosed(n)) throw new Xc.ErrnoError(8);
        if (1 == (2097155 & n.flags)) throw new Xc.ErrnoError(8);
        if (Xc.isDir(n.node.mode)) throw new Xc.ErrnoError(31);
        if (!n.stream_ops.read) throw new Xc.ErrnoError(28);
        var a = void 0 !== r;
        if (a) {
          if (!n.seekable) throw new Xc.ErrnoError(70)
        } else r = n.position;
        var o = n.stream_ops.read(n, e, i, t, r);
        return a || (n.position += o), o
      },
      write: function(n, e, i, t, r, a) {
        if (t < 0 || r < 0) throw new Xc.ErrnoError(28);
        if (Xc.isClosed(n)) throw new Xc.ErrnoError(8);
        if (0 == (2097155 & n.flags)) throw new Xc.ErrnoError(8);
        if (Xc.isDir(n.node.mode)) throw new Xc.ErrnoError(31);
        if (!n.stream_ops.write) throw new Xc.ErrnoError(28);
        n.seekable && 1024 & n.flags && Xc.llseek(n, 0, 2);
        var o = void 0 !== r;
        if (o) {
          if (!n.seekable) throw new Xc.ErrnoError(70)
        } else r = n.position;
        var l = n.stream_ops.write(n, e, i, t, r, a);
        o || (n.position += l);
        try {
          n.path && Xc.trackingDelegate.onWriteToFile && Xc.trackingDelegate.onWriteToFile(n.path)
        } catch (e) {
          x("FS.trackingDelegate['onWriteToFile']('" + n.path + "') threw an exception: " + e.message)
        }
        return l
      },
      allocate: function(n, e, i) {
        if (Xc.isClosed(n)) throw new Xc.ErrnoError(8);
        if (e < 0 || i <= 0) throw new Xc.ErrnoError(28);
        if (0 == (2097155 & n.flags)) throw new Xc.ErrnoError(8);
        if (!Xc.isFile(n.node.mode) && !Xc.isDir(n.node.mode)) throw new Xc.ErrnoError(43);
        if (!n.stream_ops.allocate) throw new Xc.ErrnoError(138);
        n.stream_ops.allocate(n, e, i)
      },
      mmap: function(n, e, i, t, r, a) {
        if (0 != (2 & r) && 0 == (2 & a) && 2 != (2097155 & n.flags)) throw new Xc.ErrnoError(2);
        if (1 == (2097155 & n.flags)) throw new Xc.ErrnoError(2);
        if (!n.stream_ops.mmap) throw new Xc.ErrnoError(43);
        return n.stream_ops.mmap(n, e, i, t, r, a)
      },
      msync: function(n, e, i, t, r) {
        return n && n.stream_ops.msync ? n.stream_ops.msync(n, e, i, t, r) : 0
      },
      munmap: function(n) {
        return 0
      },
      ioctl: function(n, e, i) {
        if (!n.stream_ops.ioctl) throw new Xc.ErrnoError(59);
        return n.stream_ops.ioctl(n, e, i)
      },
      readFile: function(n, e) {
        if ((e = e || {}).flags = e.flags || 0, e.encoding = e.encoding || "binary", "utf8" !== e.encoding && "binary" !== e.encoding) throw new Error('Invalid encoding type "' + e.encoding + '"');
        var i, t = Xc.open(n, e.flags),
          r = Xc.stat(n).size,
          a = new Uint8Array(r);
        return Xc.read(t, a, 0, r, 0), "utf8" === e.encoding ? i = tn(a, 0) : "binary" === e.encoding && (i = a), Xc.close(t), i
      },
      writeFile: function(n, e, i) {
        (i = i || {}).flags = i.flags || 577;
        var t = Xc.open(n, i.flags, i.mode);
        if ("string" == typeof e) {
          var r = new Uint8Array(ln(e) + 1),
            a = an(e, r, 0, r.length);
          Xc.write(t, r, 0, a, void 0, i.canOwn)
        } else {
          if (!ArrayBuffer.isView(e)) throw new Error("Unsupported data type");
          Xc.write(t, e, 0, e.byteLength, void 0, i.canOwn)
        }
        Xc.close(t)
      },
      cwd: function() {
        return Xc.currentPath
      },
      chdir: function(n) {
        var e = Xc.lookupPath(n, {
          follow: !0
        });
        if (null === e.node) throw new Xc.ErrnoError(44);
        if (!Xc.isDir(e.node.mode)) throw new Xc.ErrnoError(54);
        var i = Xc.nodePermissions(e.node, "x");
        if (i) throw new Xc.ErrnoError(i);
        Xc.currentPath = e.path
      },
      createDefaultDirectories: function() {
        Xc.mkdir("/tmp"), Xc.mkdir("/home"), Xc.mkdir("/home/web_user")
      },
      createDefaultDevices: function() {
        Xc.mkdir("/dev"), Xc.registerDevice(Xc.makedev(1, 3), {
          read: function() {
            return 0
          },
          write: function(n, e, i, t, r) {
            return t
          }
        }), Xc.mkdev("/dev/null", Xc.makedev(1, 3)), Dc.register(Xc.makedev(5, 0), Dc.default_tty_ops), Dc.register(Xc.makedev(6, 0), Dc.default_tty1_ops), Xc.mkdev("/dev/tty", Xc.makedev(5, 0)), Xc.mkdev("/dev/tty1", Xc.makedev(6, 0));
        var n = bc();
        Xc.createDevice("/dev", "random", n), Xc.createDevice("/dev", "urandom", n), Xc.mkdir("/dev/shm"), Xc.mkdir("/dev/shm/tmp")
      },
      createSpecialDirectories: function() {
        Xc.mkdir("/proc");
        var n = Xc.mkdir("/proc/self");
        Xc.mkdir("/proc/self/fd"), Xc.mount({
          mount: function() {
            var e = Xc.createNode(n, "fd", 16895, 73);
            return e.node_ops = {
              lookup: function(n, e) {
                var i = +e,
                  t = Xc.getStream(i);
                if (!t) throw new Xc.ErrnoError(8);
                var r = {
                  parent: null,
                  mount: {
                    mountpoint: "fake"
                  },
                  node_ops: {
                    readlink: function() {
                      return t.path
                    }
                  }
                };
                return r.parent = r, r
              }
            }, e
          }
        }, {}, "/proc/self/fd")
      },
      createStandardStreams: function() {
        n.stdin ? Xc.createDevice("/dev", "stdin", n.stdin) : Xc.symlink("/dev/tty", "/dev/stdin"), n.stdout ? Xc.createDevice("/dev", "stdout", null, n.stdout) : Xc.symlink("/dev/tty", "/dev/stdout"), n.stderr ? Xc.createDevice("/dev", "stderr", null, n.stderr) : Xc.symlink("/dev/tty1", "/dev/stderr");
        Xc.open("/dev/stdin", 0), Xc.open("/dev/stdout", 1), Xc.open("/dev/stderr", 1)
      },
      ensureErrnoError: function() {
        Xc.ErrnoError || (Xc.ErrnoError = function(n, e) {
          this.node = e, this.setErrno = function(n) {
            this.errno = n
          }, this.setErrno(n), this.message = "FS error"
        }, Xc.ErrnoError.prototype = new Error, Xc.ErrnoError.prototype.constructor = Xc.ErrnoError, [44].forEach((function(n) {
          Xc.genericErrors[n] = new Xc.ErrnoError(n), Xc.genericErrors[n].stack = "<generic error, no stack>"
        })))
      },
      staticInit: function() {
        Xc.ensureErrnoError(), Xc.nameTable = new Array(4096), Xc.mount(kc, {}, "/"), Xc.createDefaultDirectories(), Xc.createDefaultDevices(), Xc.createSpecialDirectories(), Xc.filesystems = {
          MEMFS: kc,
          IDBFS: xc
        }
      },
      init: function(e, i, t) {
        Xc.init.initialized = !0, Xc.ensureErrnoError(), n.stdin = e || n.stdin, n.stdout = i || n.stdout, n.stderr = t || n.stderr, Xc.createStandardStreams()
      },
      quit: function() {
        Xc.init.initialized = !1;
        var e = n._fflush;
        e && e(0);
        for (var i = 0; i < Xc.streams.length; i++) {
          var t = Xc.streams[i];
          t && Xc.close(t)
        }
      },
      getMode: function(n, e) {
        var i = 0;
        return n && (i |= 365), e && (i |= 146), i
      },
      findObject: function(n, e) {
        var i = Xc.analyzePath(n, e);
        return i.exists ? i.object : null
      },
      analyzePath: function(n, e) {
        try {
          n = (t = Xc.lookupPath(n, {
            follow: !e
          })).path
        } catch (n) {}
        var i = {
          isRoot: !1,
          exists: !1,
          error: 0,
          name: null,
          path: null,
          object: null,
          parentExists: !1,
          parentPath: null,
          parentObject: null
        };
        try {
          var t = Xc.lookupPath(n, {
            parent: !0
          });
          i.parentExists = !0, i.parentPath = t.path, i.parentObject = t.node, i.name = Wc.basename(n), t = Xc.lookupPath(n, {
            follow: !e
          }), i.exists = !0, i.path = t.path, i.object = t.node, i.name = t.node.name, i.isRoot = "/" === t.path
        } catch (n) {
          i.error = n.errno
        }
        return i
      },
      createPath: function(n, e, i, t) {
        n = "string" == typeof n ? n : Xc.getPath(n);
        for (var r = e.split("/").reverse(); r.length;) {
          var a = r.pop();
          if (a) {
            var o = Wc.join2(n, a);
            try {
              Xc.mkdir(o)
            } catch (n) {}
            n = o
          }
        }
        return o
      },
      createFile: function(n, e, i, t, r) {
        var a = Wc.join2("string" == typeof n ? n : Xc.getPath(n), e),
          o = Xc.getMode(t, r);
        return Xc.create(a, o)
      },
      createDataFile: function(n, e, i, t, r, a) {
        var o = e ? Wc.join2("string" == typeof n ? n : Xc.getPath(n), e) : n,
          l = Xc.getMode(t, r),
          u = Xc.create(o, l);
        if (i) {
          if ("string" == typeof i) {
            for (var f = new Array(i.length), c = 0, s = i.length; c < s; ++c) f[c] = i.charCodeAt(c);
            i = f
          }
          Xc.chmod(u, 146 | l);
          var d = Xc.open(u, 577);
          Xc.write(d, i, 0, i.length, 0, a), Xc.close(d), Xc.chmod(u, l)
        }
        return u
      },
      createDevice: function(n, e, i, t) {
        var r = Wc.join2("string" == typeof n ? n : Xc.getPath(n), e),
          a = Xc.getMode(!!i, !!t);
        Xc.createDevice.major || (Xc.createDevice.major = 64);
        var o = Xc.makedev(Xc.createDevice.major++, 0);
        return Xc.registerDevice(o, {
          open: function(n) {
            n.seekable = !1
          },
          close: function(n) {
            t && t.buffer && t.buffer.length && t(10)
          },
          read: function(n, e, t, r, a) {
            for (var o = 0, l = 0; l < r; l++) {
              var u;
              try {
                u = i()
              } catch (n) {
                throw new Xc.ErrnoError(29)
              }
              if (void 0 === u && 0 === o) throw new Xc.ErrnoError(6);
              if (null == u) break;
              o++, e[t + l] = u
            }
            return o && (n.node.timestamp = Date.now()), o
          },
          write: function(n, e, i, r, a) {
            for (var o = 0; o < r; o++) try {
              t(e[i + o])
            } catch (n) {
              throw new Xc.ErrnoError(29)
            }
            return r && (n.node.timestamp = Date.now()), o
          }
        }), Xc.mkdev(r, a, o)
      },
      forceLoadFile: function(n) {
        if (n.isDevice || n.isFolder || n.link || n.contents) return !0;
        if ("undefined" != typeof XMLHttpRequest) throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        if (!E) throw new Error("Cannot load without read() or XMLHttpRequest.");
        try {
          n.contents = gg(E(n.url), !0), n.usedBytes = n.contents.length
        } catch (n) {
          throw new Xc.ErrnoError(29)
        }
      },
      createLazyFile: function(n, e, i, t, r) {
        function a() {
          this.lengthKnown = !1, this.chunks = []
        }
        if (a.prototype.get = function(n) {
            if (!(n > this.length - 1 || n < 0)) {
              var e = n % this.chunkSize,
                i = n / this.chunkSize | 0;
              return this.getter(i)[e]
            }
          }, a.prototype.setDataGetter = function(n) {
            this.getter = n
          }, a.prototype.cacheLength = function() {
            var n = new XMLHttpRequest;
            if (n.open("HEAD", i, !1), n.send(null), !(n.status >= 200 && n.status < 300 || 304 === n.status)) throw new Error("Couldn't load " + i + ". Status: " + n.status);
            var e, t = Number(n.getResponseHeader("Content-length")),
              r = (e = n.getResponseHeader("Accept-Ranges")) && "bytes" === e,
              a = (e = n.getResponseHeader("Content-Encoding")) && "gzip" === e,
              o = 1048576;
            r || (o = t);
            var l = this;
            l.setDataGetter((function(n) {
              var e = n * o,
                r = (n + 1) * o - 1;
              if (r = Math.min(r, t - 1), void 0 === l.chunks[n] && (l.chunks[n] = function(n, e) {
                  if (n > e) throw new Error("invalid range (" + n + ", " + e + ") or no bytes requested!");
                  if (e > t - 1) throw new Error("only " + t + " bytes available! programmer error!");
                  var r = new XMLHttpRequest;
                  if (r.open("GET", i, !1), t !== o && r.setRequestHeader("Range", "bytes=" + n + "-" + e), "undefined" != typeof Uint8Array && (r.responseType = "arraybuffer"), r.overrideMimeType && r.overrideMimeType("text/plain; charset=x-user-defined"), r.send(null), !(r.status >= 200 && r.status < 300 || 304 === r.status)) throw new Error("Couldn't load " + i + ". Status: " + r.status);
                  return void 0 !== r.response ? new Uint8Array(r.response || []) : gg(r.responseText || "", !0)
                }(e, r)), void 0 === l.chunks[n]) throw new Error("doXHR failed!");
              return l.chunks[n]
            })), !a && t || (o = t = 1, t = this.getter(0).length, o = t, k("LazyFiles on gzip forces download of the whole file when length is accessed")), this._length = t, this._chunkSize = o, this.lengthKnown = !0
          }, "undefined" != typeof XMLHttpRequest) {
          if (!w) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
          var o = new a;
          Object.defineProperties(o, {
            length: {
              get: function() {
                return this.lengthKnown || this.cacheLength(), this._length
              }
            },
            chunkSize: {
              get: function() {
                return this.lengthKnown || this.cacheLength(), this._chunkSize
              }
            }
          });
          var l = {
            isDevice: !1,
            contents: o
          }
        } else l = {
          isDevice: !1,
          url: i
        };
        var u = Xc.createFile(n, e, l, t, r);
        l.contents ? u.contents = l.contents : l.url && (u.contents = null, u.url = l.url), Object.defineProperties(u, {
          usedBytes: {
            get: function() {
              return this.contents.length
            }
          }
        });
        var f = {};
        return Object.keys(u.stream_ops).forEach((function(n) {
          var e = u.stream_ops[n];
          f[n] = function() {
            return Xc.forceLoadFile(u), e.apply(null, arguments)
          }
        })), f.read = function(n, e, i, t, r) {
          Xc.forceLoadFile(u);
          var a = n.node.contents;
          if (r >= a.length) return 0;
          var o = Math.min(a.length - r, t);
          if (a.slice)
            for (var l = 0; l < o; l++) e[i + l] = a[r + l];
          else
            for (l = 0; l < o; l++) e[i + l] = a.get(r + l);
          return o
        }, u.stream_ops = f, u
      },
      createPreloadedFile: function(e, i, t, r, a, o, l, u, f, c) {
        cd.init();
        var s = i ? Ac.resolve(Wc.join2(e, i)) : e,
          d = "cp " + s;

        function p(t) {
          function p(n) {
            c && c(), u || Xc.createDataFile(e, i, n, r, a, f), o && o(), Tn(d)
          }
          var m = !1;
          n.preloadPlugins.forEach((function(n) {
            m || n.canHandle(s) && (n.handle(t, s, p, (function() {
              l && l(), Tn(d)
            })), m = !0)
          })), m || p(t)
        }
        jn(d), "string" == typeof t ? cd.asyncLoad(t, (function(n) {
          p(n)
        }), l) : p(t)
      },
      indexedDB: function() {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
      },
      DB_NAME: function() {
        return "EM_FS_" + window.location.pathname
      },
      DB_VERSION: 20,
      DB_STORE_NAME: "FILE_DATA",
      saveFilesToDB: function(n, e, i) {
        e = e || function() {}, i = i || function() {};
        var t = Xc.indexedDB();
        try {
          var r = t.open(Xc.DB_NAME(), Xc.DB_VERSION)
        } catch (n) {
          return i(n)
        }
        r.onupgradeneeded = function() {
          k("creating db"), r.result.createObjectStore(Xc.DB_STORE_NAME)
        }, r.onsuccess = function() {
          var t = r.result.transaction([Xc.DB_STORE_NAME], "readwrite"),
            a = t.objectStore(Xc.DB_STORE_NAME),
            o = 0,
            l = 0,
            u = n.length;

          function f() {
            0 == l ? e() : i()
          }
          n.forEach((function(n) {
            var e = a.put(Xc.analyzePath(n).object.contents, n);
            e.onsuccess = function() {
              ++o + l == u && f()
            }, e.onerror = function() {
              l++, o + l == u && f()
            }
          })), t.onerror = i
        }, r.onerror = i
      },
      loadFilesFromDB: function(n, e, i) {
        e = e || function() {}, i = i || function() {};
        var t = Xc.indexedDB();
        try {
          var r = t.open(Xc.DB_NAME(), Xc.DB_VERSION)
        } catch (n) {
          return i(n)
        }
        r.onupgradeneeded = i, r.onsuccess = function() {
          var t = r.result;
          try {
            var a = t.transaction([Xc.DB_STORE_NAME], "readonly")
          } catch (n) {
            return void i(n)
          }
          var o = a.objectStore(Xc.DB_STORE_NAME),
            l = 0,
            u = 0,
            f = n.length;

          function c() {
            0 == u ? e() : i()
          }
          n.forEach((function(n) {
            var e = o.get(n);
            e.onsuccess = function() {
              Xc.analyzePath(n).exists && Xc.unlink(n), Xc.createDataFile(Wc.dirname(n), Wc.basename(n), e.result, !0, !0, !0), ++l + u == f && c()
            }, e.onerror = function() {
              u++, l + u == f && c()
            }
          })), a.onerror = i
        }, r.onerror = i
      }
    },
    jc = {
      mappings: {},
      DEFAULT_POLLMASK: 5,
      umask: 511,
      calculateAt: function(n, e, i) {
        if ("/" === e[0]) return e;
        var t;
        if (-100 === n) t = Xc.cwd();
        else {
          var r = Xc.getStream(n);
          if (!r) throw new Xc.ErrnoError(8);
          t = r.path
        }
        if (0 == e.length) {
          if (!i) throw new Xc.ErrnoError(44);
          return t
        }
        return Wc.join2(t, e)
      },
      doStat: function(n, e, i) {
        try {
          var t = n(e)
        } catch (n) {
          if (n && n.node && Wc.normalize(e) !== Wc.normalize(Xc.getPath(n.node))) return -54;
          throw n
        }
        return Z[i >> 2] = t.dev, Z[i + 4 >> 2] = 0, Z[i + 8 >> 2] = t.ino, Z[i + 12 >> 2] = t.mode, Z[i + 16 >> 2] = t.nlink, Z[i + 20 >> 2] = t.uid, Z[i + 24 >> 2] = t.gid, Z[i + 28 >> 2] = t.rdev, Z[i + 32 >> 2] = 0, Bn = [t.size >>> 0, (Rn = t.size, +Math.abs(Rn) >= 1 ? Rn > 0 ? (0 | Math.min(+Math.floor(Rn / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((Rn - +(~~Rn >>> 0)) / 4294967296) >>> 0 : 0)], Z[i + 40 >> 2] = Bn[0], Z[i + 44 >> 2] = Bn[1], Z[i + 48 >> 2] = 4096, Z[i + 52 >> 2] = t.blocks, Z[i + 56 >> 2] = t.atime.getTime() / 1e3 | 0, Z[i + 60 >> 2] = 0, Z[i + 64 >> 2] = t.mtime.getTime() / 1e3 | 0, Z[i + 68 >> 2] = 0, Z[i + 72 >> 2] = t.ctime.getTime() / 1e3 | 0, Z[i + 76 >> 2] = 0, Bn = [t.ino >>> 0, (Rn = t.ino, +Math.abs(Rn) >= 1 ? Rn > 0 ? (0 | Math.min(+Math.floor(Rn / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((Rn - +(~~Rn >>> 0)) / 4294967296) >>> 0 : 0)], Z[i + 80 >> 2] = Bn[0], Z[i + 84 >> 2] = Bn[1], 0
      },
      doMsync: function(n, e, i, t, r) {
        var a = V.slice(n, n + i);
        Xc.msync(e, a, r, i, t)
      },
      doMkdir: function(n, e) {
        return "/" === (n = Wc.normalize(n))[n.length - 1] && (n = n.substr(0, n.length - 1)), Xc.mkdir(n, e, 0), 0
      },
      doMknod: function(n, e, i) {
        switch (61440 & e) {
          case 32768:
          case 8192:
          case 24576:
          case 4096:
          case 49152:
            break;
          default:
            return -28
        }
        return Xc.mknod(n, e, i), 0
      },
      doReadlink: function(n, e, i) {
        if (i <= 0) return -28;
        var t = Xc.readlink(n),
          r = Math.min(i, ln(t)),
          a = H[e + r];
        return on(t, e, i + 1), H[e + r] = a, r
      },
      doAccess: function(n, e) {
        if (-8 & e) return -28;
        var i;
        if (!(i = Xc.lookupPath(n, {
            follow: !0
          }).node)) return -44;
        var t = "";
        return 4 & e && (t += "r"), 2 & e && (t += "w"), 1 & e && (t += "x"), t && Xc.nodePermissions(i, t) ? -2 : 0
      },
      doDup: function(n, e, i) {
        var t = Xc.getStream(i);
        return t && Xc.close(t), Xc.open(n, e, 0, i, i).fd
      },
      doReadv: function(n, e, i, t) {
        for (var r = 0, a = 0; a < i; a++) {
          var o = Z[e + 8 * a >> 2],
            l = Z[e + (8 * a + 4) >> 2],
            u = Xc.read(n, H, o, l, t);
          if (u < 0) return -1;
          if (r += u, u < l) break
        }
        return r
      },
      doWritev: function(n, e, i, t) {
        for (var r = 0, a = 0; a < i; a++) {
          var o = Z[e + 8 * a >> 2],
            l = Z[e + (8 * a + 4) >> 2],
            u = Xc.write(n, H, o, l, t);
          if (u < 0) return -1;
          r += u
        }
        return r
      },
      varargs: void 0,
      get: function() {
        return jc.varargs += 4, Z[jc.varargs - 4 >> 2]
      },
      getStr: function(n) {
        var e = rn(n);
        return void 0 !== ie && ie.isWXAssetBundle(e) ? ie.url2path(e) : e
      },
      getStreamFromFD: function(n) {
        if (n > Xc.MAX_OPEN_FDS) {
          if (null == (e = ie.fd2wxStream.get(n))) throw new Xc.ErrnoError(8);
          return e
        }
        var e;
        if (!(e = Xc.getStream(n))) throw new Xc.ErrnoError(8);
        return e
      },
      get64: function(n, e) {
        return n
      }
    };

  function Tc(n, e, i, t, a) {
    try {
      for (var o = 0, l = e ? Z[e >> 2] : 0, u = e ? Z[e + 4 >> 2] : 0, f = i ? Z[i >> 2] : 0, c = i ? Z[i + 4 >> 2] : 0, s = t ? Z[t >> 2] : 0, d = t ? Z[t + 4 >> 2] : 0, p = 0, m = 0, y = 0, v = 0, _ = 0, g = 0, h = (e ? Z[e >> 2] : 0) | (i ? Z[i >> 2] : 0) | (t ? Z[t >> 2] : 0), w = (e ? Z[e + 4 >> 2] : 0) | (i ? Z[i + 4 >> 2] : 0) | (t ? Z[t + 4 >> 2] : 0), S = function(n, e, i, t) {
          return n < 32 ? e & t : i & t
        }, C = 0; C < n; C++) {
        var E = 1 << C % 32;
        if (S(C, h, w, E)) {
          var W = Xc.getStream(C);
          if (!W) throw new Xc.ErrnoError(8);
          var b = jc.DEFAULT_POLLMASK;
          W.stream_ops.poll && (b = W.stream_ops.poll(W)), 1 & b && S(C, l, u, E) && (C < 32 ? p |= E : m |= E, o++), 4 & b && S(C, f, c, E) && (C < 32 ? y |= E : v |= E, o++), 2 & b && S(C, s, d, E) && (C < 32 ? _ |= E : g |= E, o++)
        }
      }
      return e && (Z[e >> 2] = p, Z[e + 4 >> 2] = m), i && (Z[i >> 2] = y, Z[i + 4 >> 2] = v), t && (Z[t >> 2] = _, Z[t + 4 >> 2] = g), o
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }
  var Lc = {
      EPERM: 63,
      ENOENT: 44,
      ESRCH: 71,
      EINTR: 27,
      EIO: 29,
      ENXIO: 60,
      E2BIG: 1,
      ENOEXEC: 45,
      EBADF: 8,
      ECHILD: 12,
      EAGAIN: 6,
      EWOULDBLOCK: 6,
      ENOMEM: 48,
      EACCES: 2,
      EFAULT: 21,
      ENOTBLK: 105,
      EBUSY: 10,
      EEXIST: 20,
      EXDEV: 75,
      ENODEV: 43,
      ENOTDIR: 54,
      EISDIR: 31,
      EINVAL: 28,
      ENFILE: 41,
      EMFILE: 33,
      ENOTTY: 59,
      ETXTBSY: 74,
      EFBIG: 22,
      ENOSPC: 51,
      ESPIPE: 70,
      EROFS: 69,
      EMLINK: 34,
      EPIPE: 64,
      EDOM: 18,
      ERANGE: 68,
      ENOMSG: 49,
      EIDRM: 24,
      ECHRNG: 106,
      EL2NSYNC: 156,
      EL3HLT: 107,
      EL3RST: 108,
      ELNRNG: 109,
      EUNATCH: 110,
      ENOCSI: 111,
      EL2HLT: 112,
      EDEADLK: 16,
      ENOLCK: 46,
      EBADE: 113,
      EBADR: 114,
      EXFULL: 115,
      ENOANO: 104,
      EBADRQC: 103,
      EBADSLT: 102,
      EDEADLOCK: 16,
      EBFONT: 101,
      ENOSTR: 100,
      ENODATA: 116,
      ETIME: 117,
      ENOSR: 118,
      ENONET: 119,
      ENOPKG: 120,
      EREMOTE: 121,
      ENOLINK: 47,
      EADV: 122,
      ESRMNT: 123,
      ECOMM: 124,
      EPROTO: 65,
      EMULTIHOP: 36,
      EDOTDOT: 125,
      EBADMSG: 9,
      ENOTUNIQ: 126,
      EBADFD: 127,
      EREMCHG: 128,
      ELIBACC: 129,
      ELIBBAD: 130,
      ELIBSCN: 131,
      ELIBMAX: 132,
      ELIBEXEC: 133,
      ENOSYS: 52,
      ENOTEMPTY: 55,
      ENAMETOOLONG: 37,
      ELOOP: 32,
      EOPNOTSUPP: 138,
      EPFNOSUPPORT: 139,
      ECONNRESET: 15,
      ENOBUFS: 42,
      EAFNOSUPPORT: 5,
      EPROTOTYPE: 67,
      ENOTSOCK: 57,
      ENOPROTOOPT: 50,
      ESHUTDOWN: 140,
      ECONNREFUSED: 14,
      EADDRINUSE: 3,
      ECONNABORTED: 13,
      ENETUNREACH: 40,
      ENETDOWN: 38,
      ETIMEDOUT: 73,
      EHOSTDOWN: 142,
      EHOSTUNREACH: 23,
      EINPROGRESS: 26,
      EALREADY: 7,
      EDESTADDRREQ: 17,
      EMSGSIZE: 35,
      EPROTONOSUPPORT: 66,
      ESOCKTNOSUPPORT: 137,
      EADDRNOTAVAIL: 4,
      ENETRESET: 39,
      EISCONN: 30,
      ENOTCONN: 53,
      ETOOMANYREFS: 141,
      EUSERS: 136,
      EDQUOT: 19,
      ESTALE: 72,
      ENOTSUP: 138,
      ENOMEDIUM: 148,
      EILSEQ: 25,
      EOVERFLOW: 61,
      ECANCELED: 11,
      ENOTRECOVERABLE: 56,
      EOWNERDEAD: 62,
      ESTRPIPE: 135
    },
    Fc = {
      mount: function(e) {
        return n.websocket = n.websocket && "object" == typeof n.websocket ? n.websocket : {}, n.websocket._callbacks = {}, n.websocket.on = function(n, e) {
          return "function" == typeof e && (this._callbacks[n] = e), this
        }, n.websocket.emit = function(n, e) {
          "function" == typeof this._callbacks[n] && this._callbacks[n].call(this, e)
        }, Xc.createNode(null, "/", 16895, 0)
      },
      createSocket: function(n, e, i) {
        e &= -526337, i && K(1 == e == (6 == i));
        var t = {
            family: n,
            type: e,
            protocol: i,
            server: null,
            error: null,
            peers: {},
            pending: [],
            recv_queue: [],
            sock_ops: Fc.websocket_sock_ops
          },
          r = Fc.nextname(),
          a = Xc.createNode(Fc.root, r, 49152, 0);
        a.sock = t;
        var o = Xc.createStream({
          path: r,
          node: a,
          flags: 2,
          seekable: !1,
          stream_ops: Fc.stream_ops
        });
        return t.stream = o, t
      },
      getSocket: function(n) {
        var e = Xc.getStream(n);
        return e && Xc.isSocket(e.node.mode) ? e.node.sock : null
      },
      stream_ops: {
        poll: function(n) {
          var e = n.node.sock;
          return e.sock_ops.poll(e)
        },
        ioctl: function(n, e, i) {
          var t = n.node.sock;
          return t.sock_ops.ioctl(t, e, i)
        },
        read: function(n, e, i, t, r) {
          var a = n.node.sock,
            o = a.sock_ops.recvmsg(a, t);
          return o ? (e.set(o.buffer, i), o.buffer.length) : 0
        },
        write: function(n, e, i, t, r) {
          var a = n.node.sock;
          return a.sock_ops.sendmsg(a, e, i, t)
        },
        close: function(n) {
          var e = n.node.sock;
          e.sock_ops.close(e)
        }
      },
      nextname: function() {
        return Fc.nextname.current || (Fc.nextname.current = 0), "socket[" + Fc.nextname.current++ + "]"
      },
      websocket_sock_ops: {
        createPeer: function(e, i, t) {
          var r;
          if ("object" == typeof i && (r = i, i = null, t = null), r)
            if (r._socket) i = r._socket.remoteAddress, t = r._socket.remotePort;
            else {
              var a = /ws[s]?:\/\/([^:]+):(\d+)/.exec(r.url);
              if (!a) throw new Error("WebSocket URL must be in the format ws(s)://address:port");
              i = a[1], t = parseInt(a[2], 10)
            }
          else try {
            var o = n.websocket && "object" == typeof n.websocket,
              l = "ws:#".replace("#", "//");
            if (o && "string" == typeof n.websocket.url && (l = n.websocket.url), "ws://" === l || "wss://" === l) {
              var u = i.split("/");
              l = l + u[0] + ":" + t + "/" + u.slice(1).join("/")
            }
            var f = "binary";
            o && "string" == typeof n.websocket.subprotocol && (f = n.websocket.subprotocol);
            var c = void 0;
            "null" !== f && (f = f.replace(/^ +| +$/g, "").split(/ *, */), c = S ? {
              protocol: f.toString()
            } : f), o && null === n.websocket.subprotocol && (f = "null", c = void 0), (r = new(S ? require("ws") : WebSocket)(l, c)).binaryType = "arraybuffer"
          } catch (n) {
            throw new Xc.ErrnoError(Lc.EHOSTUNREACH)
          }
          var s = {
            addr: i,
            port: t,
            socket: r,
            dgram_send_queue: []
          };
          return Fc.websocket_sock_ops.addPeer(e, s), Fc.websocket_sock_ops.handlePeerEvents(e, s), 2 === e.type && void 0 !== e.sport && s.dgram_send_queue.push(new Uint8Array([255, 255, 255, 255, "p".charCodeAt(0), "o".charCodeAt(0), "r".charCodeAt(0), "t".charCodeAt(0), (65280 & e.sport) >> 8, 255 & e.sport])), s
        },
        getPeer: function(n, e, i) {
          return n.peers[e + ":" + i]
        },
        addPeer: function(n, e) {
          n.peers[e.addr + ":" + e.port] = e
        },
        removePeer: function(n, e) {
          delete n.peers[e.addr + ":" + e.port]
        },
        handlePeerEvents: function(e, i) {
          var t = !0,
            r = function() {
              n.websocket.emit("open", e.stream.fd);
              try {
                for (var t = i.dgram_send_queue.shift(); t;) i.socket.send(t), t = i.dgram_send_queue.shift()
              } catch (n) {
                i.socket.close()
              }
            };

          function a(r) {
            if ("string" == typeof r) {
              r = (new TextEncoder).encode(r)
            } else {
              if (K(void 0 !== r.byteLength), 0 == r.byteLength) return;
              r = new Uint8Array(r)
            }
            var a = t;
            if (t = !1, a && 10 === r.length && 255 === r[0] && 255 === r[1] && 255 === r[2] && 255 === r[3] && r[4] === "p".charCodeAt(0) && r[5] === "o".charCodeAt(0) && r[6] === "r".charCodeAt(0) && r[7] === "t".charCodeAt(0)) {
              var o = r[8] << 8 | r[9];
              return Fc.websocket_sock_ops.removePeer(e, i), i.port = o, void Fc.websocket_sock_ops.addPeer(e, i)
            }
            e.recv_queue.push({
              addr: i.addr,
              port: i.port,
              data: r
            }), n.websocket.emit("message", e.stream.fd)
          }
          S ? (i.socket.on("open", r), i.socket.on("message", (function(n, e) {
            e.binary && a(new Uint8Array(n).buffer)
          })), i.socket.on("close", (function() {
            n.websocket.emit("close", e.stream.fd)
          })), i.socket.on("error", (function(i) {
            e.error = Lc.ECONNREFUSED, n.websocket.emit("error", [e.stream.fd, e.error, "ECONNREFUSED: Connection refused"])
          }))) : (i.socket.onopen = r, i.socket.onclose = function() {
            n.websocket.emit("close", e.stream.fd)
          }, i.socket.onmessage = function(n) {
            a(n.data)
          }, i.socket.onerror = function(i) {
            e.error = Lc.ECONNREFUSED, n.websocket.emit("error", [e.stream.fd, e.error, "ECONNREFUSED: Connection refused"])
          })
        },
        poll: function(n) {
          if (1 === n.type && n.server) return n.pending.length ? 65 : 0;
          var e = 0,
            i = 1 === n.type ? Fc.websocket_sock_ops.getPeer(n, n.daddr, n.dport) : null;
          return (n.recv_queue.length || !i || i && i.socket.readyState === i.socket.CLOSING || i && i.socket.readyState === i.socket.CLOSED) && (e |= 65), (!i || i && i.socket.readyState === i.socket.OPEN) && (e |= 4), (i && i.socket.readyState === i.socket.CLOSING || i && i.socket.readyState === i.socket.CLOSED) && (e |= 16), e
        },
        ioctl: function(n, e, i) {
          switch (e) {
            case 21531:
              var t = 0;
              return n.recv_queue.length && (t = n.recv_queue[0].data.length), Z[i >> 2] = t, 0;
            default:
              return Lc.EINVAL
          }
        },
        close: function(n) {
          if (n.server) {
            try {
              n.server.close()
            } catch (n) {}
            n.server = null
          }
          for (var e = Object.keys(n.peers), i = 0; i < e.length; i++) {
            var t = n.peers[e[i]];
            try {
              t.socket.close()
            } catch (n) {}
            Fc.websocket_sock_ops.removePeer(n, t)
          }
          return 0
        },
        bind: function(n, e, i) {
          if (void 0 !== n.saddr || void 0 !== n.sport) throw new Xc.ErrnoError(Lc.EINVAL);
          if (n.saddr = e, n.sport = i, 2 === n.type) {
            n.server && (n.server.close(), n.server = null);
            try {
              n.sock_ops.listen(n, 0)
            } catch (n) {
              if (!(n instanceof Xc.ErrnoError)) throw n;
              if (n.errno !== Lc.EOPNOTSUPP) throw n
            }
          }
        },
        connect: function(n, e, i) {
          if (n.server) throw new Xc.ErrnoError(Lc.EOPNOTSUPP);
          if (void 0 !== n.daddr && void 0 !== n.dport) {
            var t = Fc.websocket_sock_ops.getPeer(n, n.daddr, n.dport);
            if (t) throw t.socket.readyState === t.socket.CONNECTING ? new Xc.ErrnoError(Lc.EALREADY) : new Xc.ErrnoError(Lc.EISCONN)
          }
          var r = Fc.websocket_sock_ops.createPeer(n, e, i);
          throw n.daddr = r.addr, n.dport = r.port, new Xc.ErrnoError(Lc.EINPROGRESS)
        },
        listen: function(e, i) {
          if (!S) throw new Xc.ErrnoError(Lc.EOPNOTSUPP);
          if (e.server) throw new Xc.ErrnoError(Lc.EINVAL);
          var t = require("ws").Server,
            r = e.saddr;
          e.server = new t({
            host: r,
            port: e.sport
          }), n.websocket.emit("listen", e.stream.fd), e.server.on("connection", (function(i) {
            if (1 === e.type) {
              var t = Fc.createSocket(e.family, e.type, e.protocol),
                r = Fc.websocket_sock_ops.createPeer(t, i);
              t.daddr = r.addr, t.dport = r.port, e.pending.push(t), n.websocket.emit("connection", t.stream.fd)
            } else Fc.websocket_sock_ops.createPeer(e, i), n.websocket.emit("connection", e.stream.fd)
          })), e.server.on("closed", (function() {
            n.websocket.emit("close", e.stream.fd), e.server = null
          })), e.server.on("error", (function(i) {
            e.error = Lc.EHOSTUNREACH, n.websocket.emit("error", [e.stream.fd, e.error, "EHOSTUNREACH: Host is unreachable"])
          }))
        },
        accept: function(n) {
          if (!n.server) throw new Xc.ErrnoError(Lc.EINVAL);
          var e = n.pending.shift();
          return e.stream.flags = n.stream.flags, e
        },
        getname: function(n, e) {
          var i, t;
          if (e) {
            if (void 0 === n.daddr || void 0 === n.dport) throw new Xc.ErrnoError(Lc.ENOTCONN);
            i = n.daddr, t = n.dport
          } else i = n.saddr || 0, t = n.sport || 0;
          return {
            addr: i,
            port: t
          }
        },
        sendmsg: function(n, e, i, t, r, a) {
          if (2 === n.type) {
            if (void 0 !== r && void 0 !== a || (r = n.daddr, a = n.dport), void 0 === r || void 0 === a) throw new Xc.ErrnoError(Lc.EDESTADDRREQ)
          } else r = n.daddr, a = n.dport;
          var o, l = Fc.websocket_sock_ops.getPeer(n, r, a);
          if (1 === n.type) {
            if (!l || l.socket.readyState === l.socket.CLOSING || l.socket.readyState === l.socket.CLOSED) throw new Xc.ErrnoError(Lc.ENOTCONN);
            if (l.socket.readyState === l.socket.CONNECTING) throw new Xc.ErrnoError(Lc.EAGAIN)
          }
          if (ArrayBuffer.isView(e) && (i += e.byteOffset, e = e.buffer), o = e.slice(i, i + t), 2 === n.type && (!l || l.socket.readyState !== l.socket.OPEN)) return l && l.socket.readyState !== l.socket.CLOSING && l.socket.readyState !== l.socket.CLOSED || (l = Fc.websocket_sock_ops.createPeer(n, r, a)), l.dgram_send_queue.push(o), t;
          try {
            return l.socket.send(o), t
          } catch (n) {
            throw new Xc.ErrnoError(Lc.EINVAL)
          }
        },
        recvmsg: function(n, e) {
          if (1 === n.type && n.server) throw new Xc.ErrnoError(Lc.ENOTCONN);
          var i = n.recv_queue.shift();
          if (!i) {
            if (1 === n.type) {
              var t = Fc.websocket_sock_ops.getPeer(n, n.daddr, n.dport);
              if (t) {
                if (t.socket.readyState === t.socket.CLOSING || t.socket.readyState === t.socket.CLOSED) return null;
                throw new Xc.ErrnoError(Lc.EAGAIN)
              }
              throw new Xc.ErrnoError(Lc.ENOTCONN)
            }
            throw new Xc.ErrnoError(Lc.EAGAIN)
          }
          var r = i.data.byteLength || i.data.length,
            a = i.data.byteOffset || 0,
            o = i.data.buffer || i.data,
            l = Math.min(e, r),
            u = {
              buffer: new Uint8Array(o, a, l),
              addr: i.addr,
              port: i.port
            };
          if (1 === n.type && l < r) {
            var f = r - l;
            i.data = new Uint8Array(o, a + l, f), n.recv_queue.unshift(i)
          }
          return u
        }
      }
    };

  function Pc(n) {
    var e = Fc.getSocket(n);
    if (!e) throw new Xc.ErrnoError(8);
    return e
  }

  function Rc(n) {
    return Z[bg() >> 2] = n, n
  }

  function Bc(n) {
    for (var e = n.split("."), i = 0; i < 4; i++) {
      var t = Number(e[i]);
      if (isNaN(t)) return null;
      e[i] = t
    }
    return (e[0] | e[1] << 8 | e[2] << 16 | e[3] << 24) >>> 0
  }

  function Gc(n) {
    return parseInt(n)
  }

  function Oc(n) {
    var e, i, t, r, a = [];
    if (!/^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i.test(n)) return null;
    if ("::" === n) return [0, 0, 0, 0, 0, 0, 0, 0];
    for ((n = n.startsWith("::") ? n.replace("::", "Z:") : n.replace("::", ":Z:")).indexOf(".") > 0 ? ((e = (n = n.replace(new RegExp("[.]", "g"), ":")).split(":"))[e.length - 4] = Gc(e[e.length - 4]) + 256 * Gc(e[e.length - 3]), e[e.length - 3] = Gc(e[e.length - 2]) + 256 * Gc(e[e.length - 1]), e = e.slice(0, e.length - 2)) : e = n.split(":"), t = 0, r = 0, i = 0; i < e.length; i++)
      if ("string" == typeof e[i])
        if ("Z" === e[i]) {
          for (r = 0; r < 8 - e.length + 1; r++) a[i + r] = 0;
          t = r - 1
        } else a[i + t] = Dg(parseInt(e[i], 16));
    else a[i + t] = e[i];
    return [a[1] << 16 | a[0], a[3] << 16 | a[2], a[5] << 16 | a[4], a[7] << 16 | a[6]]
  }

  function Ic(n, e, i, t, r) {
    switch (e) {
      case 2:
        i = Bc(i), r && (Z[r >> 2] = 16), Y[n >> 1] = e, Z[n + 4 >> 2] = i, Y[n + 2 >> 1] = Dg(t), Bn = [0, (Rn = 0, +Math.abs(Rn) >= 1 ? Rn > 0 ? (0 | Math.min(+Math.floor(Rn / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((Rn - +(~~Rn >>> 0)) / 4294967296) >>> 0 : 0)], Z[n + 8 >> 2] = Bn[0], Z[n + 12 >> 2] = Bn[1];
        break;
      case 10:
        i = Oc(i), r && (Z[r >> 2] = 28), Z[n >> 2] = e, Z[n + 8 >> 2] = i[0], Z[n + 12 >> 2] = i[1], Z[n + 16 >> 2] = i[2], Z[n + 20 >> 2] = i[3], Y[n + 2 >> 1] = Dg(t), Z[n + 4 >> 2] = 0, Z[n + 24 >> 2] = 0;
        break;
      default:
        return 5
    }
    return 0
  }
  var Kc = {
    address_map: {
      id: 1,
      addrs: {},
      names: {}
    },
    lookup_name: function(n) {
      var e, i = Bc(n);
      if (null !== i) return n;
      if (null !== (i = Oc(n))) return n;
      if (Kc.address_map.addrs[n]) e = Kc.address_map.addrs[n];
      else {
        var t = Kc.address_map.id++;
        K(t < 65535, "exceeded max address mappings of 65535"), e = "172.29." + (255 & t) + "." + (65280 & t), Kc.address_map.names[e] = n, Kc.address_map.addrs[n] = e
      }
      return e
    },
    lookup_addr: function(n) {
      return Kc.address_map.names[n] ? Kc.address_map.names[n] : null
    }
  };

  function Nc(n, e, i, t) {
    try {
      var a = Pc(n),
        o = a.sock_ops.accept(a);
      if (e) Ic(e, o.family, Kc.lookup_name(o.daddr), o.dport, i);
      return o.stream.fd
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Uc(n, e) {
    try {
      return n = jc.getStr(n), void 0 !== ie && ie.isWXAssetBundle(n) ? ie.path2fd.has(n) ? 0 : ie.doWXAccess(n, e) : jc.doAccess(n, e)
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function zc(n) {
    return (255 & n) + "." + (n >> 8 & 255) + "." + (n >> 16 & 255) + "." + (n >> 24 & 255)
  }

  function qc(n) {
    var e = "",
      i = 0,
      t = 0,
      r = 0,
      a = 0,
      o = 0,
      l = 0,
      u = [65535 & n[0], n[0] >> 16, 65535 & n[1], n[1] >> 16, 65535 & n[2], n[2] >> 16, 65535 & n[3], n[3] >> 16],
      f = !0,
      c = "";
    for (l = 0; l < 5; l++)
      if (0 !== u[l]) {
        f = !1;
        break
      } if (f) {
      if (c = zc(u[6] | u[7] << 16), -1 === u[5]) return e = "::ffff:", e += c;
      if (0 === u[5]) return e = "::", "0.0.0.0" === c && (c = ""), "0.0.0.1" === c && (c = "1"), e += c
    }
    for (i = 0; i < 8; i++) 0 === u[i] && (i - r > 1 && (o = 0), r = i, o++), o > t && (a = i - (t = o) + 1);
    for (i = 0; i < 8; i++) t > 1 && 0 === u[i] && i >= a && i < a + t ? i === a && (e += ":", 0 === a && (e += ":")) : (e += Number(Mg(65535 & u[i])).toString(16), e += i < 7 ? ":" : "");
    return e
  }

  function Hc(n, e) {
    var i, t = Y[n >> 1],
      r = Mg(J[n + 2 >> 1]);
    switch (t) {
      case 2:
        if (16 !== e) return {
          errno: 28
        };
        i = zc(i = Z[n + 4 >> 2]);
        break;
      case 10:
        if (28 !== e) return {
          errno: 28
        };
        i = qc(i = [Z[n + 8 >> 2], Z[n + 12 >> 2], Z[n + 16 >> 2], Z[n + 20 >> 2]]);
        break;
      default:
        return {
          errno: 5
        }
    }
    return {
      family: t,
      addr: i,
      port: r
    }
  }

  function Vc(n, e, i) {
    if (i && 0 === n) return null;
    var t = Hc(n, e);
    if (t.errno) throw new Xc.ErrnoError(t.errno);
    return t.addr = Kc.lookup_addr(t.addr) || t.addr, t
  }

  function Yc(n, e, i) {
    try {
      var t = Pc(n),
        a = Vc(e, i);
      return t.sock_ops.bind(t, a.addr, a.port), 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Jc(n, e) {
    try {
      return n = jc.getStr(n), Xc.chmod(n, e), 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Zc(n, e, i) {
    try {
      var t = Pc(n),
        a = Vc(e, i);
      return t.sock_ops.connect(t, a.addr, a.port), 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Qc(n, e) {
    try {
      var i = jc.getStreamFromFD(n);
      return i.fd === e ? e : jc.doDup(i.path, i.flags, e)
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function $c(n, e) {
    try {
      return Xc.fchmod(n, e), 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function ns(n, e, i) {
    jc.varargs = i;
    try {
      var t = jc.getStreamFromFD(n);
      switch (e) {
        case 0:
          return (a = jc.get()) < 0 ? -28 : Xc.open(t.path, t.flags, 0, a).fd;
        case 1:
        case 2:
          return 0;
        case 3:
          return t.flags;
        case 4:
          var a = jc.get();
          return t.flags |= a, 0;
        case 12:
          a = jc.get();
          return Y[a + 0 >> 1] = 2, 0;
        case 13:
        case 14:
          return 0;
        case 16:
        case 8:
          return -28;
        case 9:
          return Rc(28), -1;
        default:
          return -28
      }
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function es(n, e) {
    try {
      var i = jc.getStreamFromFD(n);
      return n > Xc.MAX_OPEN_FDS ? jc.doStat(ie.wxstat, i.path, e) : jc.doStat(Xc.stat, i.path, e)
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function is(n, e, i, t) {
    try {
      var a = jc.get64(i, t);
      return Xc.ftruncate(n, a), 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function ts(n, e) {
    try {
      if (0 === e) return -28;
      var i = Xc.cwd();
      return e < ln(i) + 1 ? -68 : (on(i, n, e), n)
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function rs(n, e, i) {
    try {
      var t = jc.getStreamFromFD(n);
      t.getdents || (t.getdents = Xc.readdir(t.path));
      for (var a = 0, o = Xc.llseek(t, 0, 1), l = Math.floor(o / 280); l < t.getdents.length && a + 280 <= i;) {
        var u, f, c = t.getdents[l];
        if ("." === c[0]) u = 1, f = 4;
        else {
          var s = Xc.lookupNode(t.node, c);
          u = s.id, f = Xc.isChrdev(s.mode) ? 2 : Xc.isDir(s.mode) ? 4 : Xc.isLink(s.mode) ? 10 : 8
        }
        Bn = [u >>> 0, (Rn = u, +Math.abs(Rn) >= 1 ? Rn > 0 ? (0 | Math.min(+Math.floor(Rn / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((Rn - +(~~Rn >>> 0)) / 4294967296) >>> 0 : 0)], Z[e + a >> 2] = Bn[0], Z[e + a + 4 >> 2] = Bn[1], Bn = [280 * (l + 1) >>> 0, (Rn = 280 * (l + 1), +Math.abs(Rn) >= 1 ? Rn > 0 ? (0 | Math.min(+Math.floor(Rn / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((Rn - +(~~Rn >>> 0)) / 4294967296) >>> 0 : 0)], Z[e + a + 8 >> 2] = Bn[0], Z[e + a + 12 >> 2] = Bn[1], Y[e + a + 16 >> 1] = 280, H[e + a + 18 >> 0] = f, on(c, e + a + 19, 256), a += 280, l += 1
      }
      return Xc.llseek(t, 280 * l, 0), a
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function as() {
    return 0
  }

  function os() {
    return 0
  }

  function ls(n, e, i) {
    try {
      var t = Pc(n);
      if (!t.daddr) return -53;
      Ic(e, t.family, Kc.lookup_name(t.daddr), t.dport, i);
      return 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function us() {
    return 42
  }

  function fs(n, e) {
    try {
      return Kg(e, 0, 136), Z[e >> 2] = 1, Z[e + 4 >> 2] = 2, Z[e + 8 >> 2] = 3, Z[e + 12 >> 2] = 4, 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function cs(n, e, i) {
    try {
      x("__sys_getsockname " + n);
      var t = Pc(n);
      Ic(e, t.family, Kc.lookup_name(t.saddr || "0.0.0.0"), t.sport, i);
      return 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function ss(n, e, i, t, a) {
    try {
      var o = Pc(n);
      return 1 === e && 4 === i ? (Z[t >> 2] = o.error, Z[a >> 2] = 4, o.error = null, 0) : -50
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function ds() {
    return 0
  }

  function ps(n, e, i) {
    jc.varargs = i;
    try {
      var t = jc.getStreamFromFD(n);
      switch (e) {
        case 21509:
        case 21505:
          return t.tty ? 0 : -59;
        case 21510:
        case 21511:
        case 21512:
        case 21506:
        case 21507:
        case 21508:
          return t.tty ? 0 : -59;
        case 21519:
          if (!t.tty) return -59;
          var a = jc.get();
          return Z[a >> 2] = 0, 0;
        case 21520:
          return t.tty ? -28 : -59;
        case 21531:
          a = jc.get();
          return Xc.ioctl(t, e, a);
        case 21523:
        case 21524:
          return t.tty ? 0 : -59;
        default:
          r("bad ioctl syscall " + e)
      }
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function ms(n, e) {
    return -34
  }

  function ys(n, e) {
    try {
      var i = Pc(n);
      return i.sock_ops.listen(i, e), 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function vs(n, e) {
    try {
      return n = jc.getStr(n), jc.doStat(Xc.lstat, n, e)
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function _s(n, e) {
    try {
      return n = jc.getStr(n), jc.doMkdir(n, e)
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function gs(n, e, i, t, r, a) {
    var o;
    a <<= 12;
    var l = !1;
    if (0 != (16 & t) && n % 65536 != 0) return -28;
    if (0 != (32 & t)) {
      if (!(o = Og(65536, e))) return -48;
      Kg(o, 0, e), l = !0
    } else {
      var u = Xc.getStream(r);
      if (!u) return -8;
      var f = Xc.mmap(u, n, e, a, i, t);
      o = f.ptr, l = f.allocated
    }
    return jc.mappings[o] = {
      malloc: o,
      len: e,
      allocated: l,
      fd: r,
      prot: i,
      flags: t,
      offset: a
    }, o
  }

  function hs(n, e, i, t, a, o) {
    try {
      return gs(n, e, i, t, a, o)
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function ws(n, e) {
    if (-1 == (0 | n) || 0 === e) return -28;
    var i = jc.mappings[n];
    if (!i) return 0;
    if (e === i.len) {
      var t = Xc.getStream(i.fd);
      t && (2 & i.prot && jc.doMsync(n, t, e, i.flags, i.offset), Xc.munmap(t)), jc.mappings[n] = null, i.allocated && Gg(i.malloc)
    }
    return 0
  }

  function Ss(n, e) {
    try {
      return ws(n, e)
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Cs(n, e, i) {
    jc.varargs = i;
    try {
      var t = jc.getStr(n);
      if (void 0 !== ie && ie.isWXAssetBundle(t)) {
        var a = ie.path2fd.get(t);
        if (void 0 !== a) return a;
        const n = ie.LoadBundleFromFile(t);
        let i = {
          fd: a = ie.newfd(),
          path: t,
          flags: e,
          seekable: !0,
          position: 0,
          stream_ops: kc.stream_ops,
          ungotten: [],
          node: {
            mode: 32768,
            usedBytes: new Uint8Array(n).length
          },
          error: !1
        };
        return i.stream_ops.read = ie.read, ie.path2fd.set(t, a), ie.fd2wxStream.set(a, i), ie.cache.put(a, n), a
      }
      var o = i ? jc.get() : 0;
      return Xc.open(t, e, o).fd
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }
  var Es = {
    BUCKET_BUFFER_SIZE: 8192,
    mount: function(n) {
      return Xc.createNode(null, "/", 16895, 0)
    },
    createPipe: function() {
      var n = {
        buckets: []
      };
      n.buckets.push({
        buffer: new Uint8Array(Es.BUCKET_BUFFER_SIZE),
        offset: 0,
        roffset: 0
      });
      var e = Es.nextname(),
        i = Es.nextname(),
        t = Xc.createNode(Es.root, e, 4096, 0),
        r = Xc.createNode(Es.root, i, 4096, 0);
      t.pipe = n, r.pipe = n;
      var a = Xc.createStream({
        path: e,
        node: t,
        flags: 0,
        seekable: !1,
        stream_ops: Es.stream_ops
      });
      t.stream = a;
      var o = Xc.createStream({
        path: i,
        node: r,
        flags: 1,
        seekable: !1,
        stream_ops: Es.stream_ops
      });
      return r.stream = o, {
        readable_fd: a.fd,
        writable_fd: o.fd
      }
    },
    stream_ops: {
      poll: function(n) {
        var e = n.node.pipe;
        if (1 == (2097155 & n.flags)) return 260;
        if (e.buckets.length > 0)
          for (var i = 0; i < e.buckets.length; i++) {
            var t = e.buckets[i];
            if (t.offset - t.roffset > 0) return 65
          }
        return 0
      },
      ioctl: function(n, e, i) {
        return Lc.EINVAL
      },
      fsync: function(n) {
        return Lc.EINVAL
      },
      read: function(n, e, i, t, r) {
        for (var a = n.node.pipe, o = 0, l = 0; l < a.buckets.length; l++) {
          var u = a.buckets[l];
          o += u.offset - u.roffset
        }
        K(e instanceof ArrayBuffer || ArrayBuffer.isView(e));
        var f = e.subarray(i, i + t);
        if (t <= 0) return 0;
        if (0 == o) throw new Xc.ErrnoError(Lc.EAGAIN);
        var c = Math.min(o, t),
          s = c,
          d = 0;
        for (l = 0; l < a.buckets.length; l++) {
          var p = a.buckets[l],
            m = p.offset - p.roffset;
          if (c <= m) {
            var y = p.buffer.subarray(p.roffset, p.offset);
            c < m ? (y = y.subarray(0, c), p.roffset += c) : d++, f.set(y);
            break
          }
          y = p.buffer.subarray(p.roffset, p.offset);
          f.set(y), f = f.subarray(y.byteLength), c -= y.byteLength, d++
        }
        return d && d == a.buckets.length && (d--, a.buckets[d].offset = 0, a.buckets[d].roffset = 0), a.buckets.splice(0, d), s
      },
      write: function(n, e, i, t, r) {
        var a = n.node.pipe;
        K(e instanceof ArrayBuffer || ArrayBuffer.isView(e));
        var o = e.subarray(i, i + t),
          l = o.byteLength;
        if (l <= 0) return 0;
        var u = null;
        0 == a.buckets.length ? (u = {
          buffer: new Uint8Array(Es.BUCKET_BUFFER_SIZE),
          offset: 0,
          roffset: 0
        }, a.buckets.push(u)) : u = a.buckets[a.buckets.length - 1], K(u.offset <= Es.BUCKET_BUFFER_SIZE);
        var f = Es.BUCKET_BUFFER_SIZE - u.offset;
        if (f >= l) return u.buffer.set(o, u.offset), u.offset += l, l;
        f > 0 && (u.buffer.set(o.subarray(0, f), u.offset), u.offset += f, o = o.subarray(f, o.byteLength));
        for (var c = o.byteLength / Es.BUCKET_BUFFER_SIZE | 0, s = o.byteLength % Es.BUCKET_BUFFER_SIZE, d = 0; d < c; d++) {
          var p = {
            buffer: new Uint8Array(Es.BUCKET_BUFFER_SIZE),
            offset: Es.BUCKET_BUFFER_SIZE,
            roffset: 0
          };
          a.buckets.push(p), p.buffer.set(o.subarray(0, Es.BUCKET_BUFFER_SIZE)), o = o.subarray(Es.BUCKET_BUFFER_SIZE, o.byteLength)
        }
        if (s > 0) {
          p = {
            buffer: new Uint8Array(Es.BUCKET_BUFFER_SIZE),
            offset: o.byteLength,
            roffset: 0
          };
          a.buckets.push(p), p.buffer.set(o)
        }
        return l
      },
      close: function(n) {
        n.node.pipe.buckets = null
      }
    },
    nextname: function() {
      return Es.nextname.current || (Es.nextname.current = 0), "pipe[" + Es.nextname.current++ + "]"
    }
  };

  function Ws(n) {
    try {
      if (0 == n) throw new Xc.ErrnoError(21);
      var e = Es.createPipe();
      return Z[n >> 2] = e.readable_fd, Z[n + 4 >> 2] = e.writable_fd, 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function bs(n, e, i) {
    try {
      for (var t = 0, a = 0; a < e; a++) {
        var o = n + 8 * a,
          l = Z[o >> 2],
          u = Y[o + 4 >> 1],
          f = 32,
          c = Xc.getStream(l);
        c && (f = jc.DEFAULT_POLLMASK, c.stream_ops.poll && (f = c.stream_ops.poll(c))), (f &= 24 | u) && t++, Y[o + 6 >> 1] = f
      }
      return t
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function As(n, e, i) {
    try {
      return n = jc.getStr(n), jc.doReadlink(n, e, i)
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Ds(n, e, i, t, a, o) {
    try {
      var l = Pc(n),
        u = l.sock_ops.recvmsg(l, i);
      if (!u) return 0;
      if (a) Ic(a, l.family, Kc.lookup_name(u.addr), u.port, o);
      return V.set(u.buffer, e), u.buffer.byteLength
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Ms(n, e, i) {
    try {
      for (var t = Pc(n), a = Z[e + 8 >> 2], o = Z[e + 12 >> 2], l = 0, u = 0; u < o; u++) l += Z[a + (8 * u + 4) >> 2];
      var f = t.sock_ops.recvmsg(t, l);
      if (!f) return 0;
      var c = Z[e >> 2];
      if (c) Ic(c, t.family, Kc.lookup_name(f.addr), f.port);
      var s = 0,
        d = f.buffer.byteLength;
      for (u = 0; d > 0 && u < o; u++) {
        var p = Z[a + (8 * u + 0) >> 2],
          m = Z[a + (8 * u + 4) >> 2];
        if (m) {
          var y = Math.min(m, d),
            v = f.buffer.subarray(s, s + y);
          V.set(v, p + s), s += y, d -= y
        }
      }
      return s
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function ks(n, e) {
    try {
      return n = jc.getStr(n), e = jc.getStr(e), Xc.rename(n, e), 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function xs(n) {
    try {
      return n = jc.getStr(n), Xc.rmdir(n), 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Xs(n, e, i) {
    try {
      var t, a, o = Pc(n),
        l = Z[e + 8 >> 2],
        u = Z[e + 12 >> 2],
        f = Z[e >> 2],
        c = Z[e + 4 >> 2];
      if (f) {
        var s = Hc(f, c);
        if (s.errno) return -s.errno;
        a = s.port, t = Kc.lookup_addr(s.addr) || s.addr
      }
      for (var d = 0, p = 0; p < u; p++) d += Z[l + (8 * p + 4) >> 2];
      var m = new Uint8Array(d),
        y = 0;
      for (p = 0; p < u; p++)
        for (var v = Z[l + (8 * p + 0) >> 2], _ = Z[l + (8 * p + 4) >> 2], g = 0; g < _; g++) m[y++] = H[v + g >> 0];
      return o.sock_ops.sendmsg(o, m, 0, d, t, a)
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function js(n, e, i, t, a, o) {
    try {
      var l = Pc(n),
        u = Vc(a, o, !0);
      return u ? l.sock_ops.sendmsg(l, H, e, i, u.addr, u.port) : Xc.write(l.stream, H, e, i)
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Ts(n) {
    try {
      return -50
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Ls(n, e) {
    try {
      return Pc(n), -52
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Fs(n, e, i) {
    try {
      return Fc.createSocket(n, e, i).stream.fd
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Ps(n, e) {
    try {
      return n = jc.getStr(n), void 0 !== ie && ie.isWXAssetBundle(n) ? jc.doStat(ie.wxstat, n, e) : jc.doStat(Xc.stat, n, e)
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Rs(n, e, i) {
    try {
      return n = jc.getStr(n), Z[i + 4 >> 2] = 4096, Z[i + 40 >> 2] = 4096, Z[i + 8 >> 2] = 1e6, Z[i + 12 >> 2] = 5e5, Z[i + 16 >> 2] = 5e5, Z[i + 20 >> 2] = Xc.nextInode, Z[i + 24 >> 2] = 1e6, Z[i + 28 >> 2] = 42, Z[i + 44 >> 2] = 2, Z[i + 36 >> 2] = 255, 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Bs(n, e) {
    try {
      return n = jc.getStr(n), e = jc.getStr(e), Xc.symlink(n, e), 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Gs(n, e, i, t) {
    try {
      n = jc.getStr(n);
      var a = jc.get64(i, t);
      return Xc.truncate(n, a), 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Os(n) {
    try {
      if (!n) return -21;
      var e = {
          __size__: 390,
          domainname: 325,
          machine: 260,
          nodename: 65,
          release: 130,
          sysname: 0,
          version: 195
        },
        i = function(i, t) {
          sn(t, n + e[i])
        };
      return i("sysname", "Emscripten"), i("nodename", "emscripten"), i("release", "1.0"), i("version", "#1"), i("machine", "wasm32"), 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Is(n) {
    try {
      return n = jc.getStr(n), Xc.unlink(n), 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Ks(n, e, i, t) {
    try {
      e = jc.getStr(e), e = jc.calculateAt(n, e, !0);
      var a = Z[i >> 2],
        o = Z[i + 4 >> 2],
        l = 1e3 * a + o / 1e6,
        u = 1e3 * (a = Z[(i += 8) >> 2]) + (o = Z[i + 4 >> 2]) / 1e6;
      return Xc.utime(e, l, u), 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), -n.errno
    }
  }

  function Ns() {
    r()
  }

  function Us() {
    return void 0 === Us.start && (Us.start = Date.now()), 1e3 * (Date.now() - Us.start) | 0
  }

  function zs() {
    return S ? 1 : 1e3
  }
  var qs, Hs = !0;

  function Vs(n, e) {
    var i;
    if (0 === n) i = 1e6;
    else {
      if (1 !== n || !Hs) return Rc(28), -1;
      i = zs()
    }
    return Z[e >> 2] = i / 1e9 | 0, Z[e + 4 >> 2] = i, 0
  }

  function Ys(n, e) {
    var i;
    if (0 === n) i = Date.now();
    else {
      if (1 !== n && 4 !== n || !Hs) return Rc(28), -1;
      i = qs()
    }
    return Z[e >> 2] = i / 1e3 | 0, Z[e + 4 >> 2] = i % 1e3 * 1e3 * 1e3 | 0, 0
  }

  function Js(n, e) {
    return n - e
  }

  function Zs(n) {}

  function Qs() {
    return 0
  }

  function $s(n, e) {}

  function nd(n, e) {
    return 0
  }
  qs = S ? function() {
    var n = process.hrtime();
    return 1e3 * n[0] + n[1] / 1e6
  } : "undefined" != typeof dateNow ? dateNow : function() {
    return performance.now()
  };
  var ed = [];

  function id(n, e) {
    var i;
    for (ed.length = 0, e >>= 2; i = V[n++];) {
      var t = i < 105;
      t && 1 & e && e++, ed.push(t ? nn[e++ >> 1] : Z[e]), ++e
    }
    return ed
  }

  function td(n, e, i, t) {
    var r = id(e, i);
    return Kn[n].apply(null, r)
  }

  function rd(n, e, i) {
    return td(n, e, i)
  }

  function ad(e, i) {
    if (cd.mainLoop.timingMode = e, cd.mainLoop.timingValue = i, 0 == e ? (16 == i && (e = 1, i = 1), 33 == i && (e = 1, i = 2), 66 == i && (e = 1, i = 3)) : 2 == e && (e = 1, i = 1), !cd.mainLoop.func) return 1;
    if (cd.mainLoop.running || (cd.mainLoop.running = !0), 0 == e) cd.mainLoop.scheduler = function() {
      var n = 0 | Math.max(0, cd.mainLoop.tickStartTime + i - qs());
      setTimeout(cd.mainLoop.runner, n)
    }, cd.mainLoop.method = "timeout";
    else if (1 == e) cd.mainLoop.timingValue = 1, wx.setPreferredFramesPerSecond(60 / i), cd.mainLoop.scheduler = function() {
      cd.requestAnimationFrame(cd.mainLoop.runner)
    }, cd.mainLoop.method = "rAF";
    else if (2 == e) {
      if ("undefined" == typeof setImmediate) {
        var t = [];
        addEventListener("message", (function(n) {
          "setimmediate" !== n.data && "setimmediate" !== n.data.target || (n.stopPropagation(), t.shift()())
        }), !0), setImmediate = function(e) {
          t.push(e), w ? (void 0 === n.setImmediates && (n.setImmediates = []), n.setImmediates.push(e), postMessage({
            target: "setimmediate"
          })) : postMessage("setimmediate", "*")
        }
      }
      cd.mainLoop.scheduler = function() {
        setImmediate(cd.mainLoop.runner)
      }, cd.mainLoop.method = "immediate"
    }
    return 0
  }

  function od(n) {
    TE(n)
  }

  function ld() {
    if (!Yn()) try {
      od(O)
    } catch (n) {
      if (n instanceof xE) return;
      throw n
    }
  }

  function ud(n, e, i, t, r) {
    K(!cd.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters."), cd.mainLoop.func = n, cd.mainLoop.arg = t;
    var a = cd.mainLoop.currentlyRunningMainloop;

    function o() {
      return !(a < cd.mainLoop.currentlyRunningMainloop) || (ld(), !1)
    }
    if (cd.mainLoop.running = !1, cd.mainLoop.runner = function() {
        if (!I)
          if (cd.mainLoop.queue.length > 0) {
            var e = Date.now(),
              i = cd.mainLoop.queue.shift();
            if (i.func(i.arg), cd.mainLoop.remainingBlockers) {
              var t = cd.mainLoop.remainingBlockers,
                r = t % 1 == 0 ? t - 1 : Math.floor(t);
              i.counted ? cd.mainLoop.remainingBlockers = r : (r += .5, cd.mainLoop.remainingBlockers = (8 * t + r) / 9)
            }
            if (console.log('main loop blocker "' + i.name + '" took ' + (Date.now() - e) + " ms"), cd.mainLoop.updateStatus(), !o()) return;
            setTimeout(cd.mainLoop.runner, 0)
          } else if (o())
          if (cd.mainLoop.currentFrameNumber = cd.mainLoop.currentFrameNumber + 1 | 0, 1 == cd.mainLoop.timingMode && cd.mainLoop.timingValue > 1 && cd.mainLoop.currentFrameNumber % cd.mainLoop.timingValue != 0) cd.mainLoop.scheduler();
          else {
            if (0 == cd.mainLoop.timingMode && (cd.mainLoop.tickStartTime = qs()), Gp.newRenderingFrameStarted(), GameGlobal.manager.isVisible) {
              let e;
              if (("function" == typeof GameGlobal.manager.getGameDataMonitor && GameGlobal.manager.getGameDataMonitor().isRunning() || void 0 !== GameGlobal.calcFrameTimeFunc) && (e = performance.now()), cd.mainLoop.runIter(n), void 0 !== e) {
                const n = performance.now();
                void 0 !== GameGlobal.calcFrameTimeFunc && GameGlobal.calcFrameTimeFunc(e, n), "function" == typeof GameGlobal.manager.getGameDataMonitor && GameGlobal.manager.getGameDataMonitor().isRunning() && p("WXSDKManagerHandler", "OnFrameInterval")
              }
            }
            o() && ("object" == typeof SDL && SDL.audio && SDL.audio.queueNewAudioData && SDL.audio.queueNewAudioData(), cd.mainLoop.scheduler())
          }
      }, !r) {
      if (e && e > 0 ? ad(0, 1e3 / e) : ad(1, 1), !GameGlobal.unityNamespace.isLoopRunnerEnable) return;
      cd.mainLoop.scheduler()
    }
    if (i) throw "unwind"
  }

  function fd(n, e) {
    if (!I)
      if (e) n();
      else try {
        n()
      } catch (n) {
        if (n instanceof xE) return;
        if ("unwind" !== n) throw n && "object" == typeof n && n.stack && x("exception thrown: " + [n, n.stack]), n
      }
  }
  var cd = GameGlobal.unityNamespace.Browser = {
    mainLoop: {
      running: !1,
      scheduler: null,
      method: "",
      currentlyRunningMainloop: 0,
      func: null,
      arg: 0,
      timingMode: 0,
      timingValue: 0,
      currentFrameNumber: 0,
      queue: [],
      pause: function() {
        cd.mainLoop.scheduler = null, cd.mainLoop.currentlyRunningMainloop++
      },
      resume: function() {
        cd.mainLoop.currentlyRunningMainloop++;
        var n = cd.mainLoop.timingMode,
          e = cd.mainLoop.timingValue,
          i = cd.mainLoop.func;
        cd.mainLoop.func = null, ud(i, 0, !1, cd.mainLoop.arg, !0), ad(n, e), cd.mainLoop.scheduler()
      },
      updateStatus: function() {
        if (n.setStatus) {
          var e = n.statusMessage || "Please wait...",
            i = cd.mainLoop.remainingBlockers,
            t = cd.mainLoop.expectedBlockers;
          i ? i < t ? n.setStatus(e + " (" + (t - i) + "/" + t + ")") : n.setStatus(e) : n.setStatus("")
        }
      },
      runIter: function(e) {
        if (!I) {
          if (n.preMainLoop)
            if (!1 === n.preMainLoop()) return;
          fd(e), n.postMainLoop && n.postMainLoop()
        }
      }
    },
    isFullscreen: !1,
    pointerLock: !1,
    moduleContextCreatedCallbacks: [],
    workers: [],
    init: function() {
      if (n.preloadPlugins || (n.preloadPlugins = []), !cd.initted) {
        cd.initted = !0;
        try {
          new Blob, cd.hasBlobConstructor = !0
        } catch (n) {
          cd.hasBlobConstructor = !1, console.log("warning: no blob constructor, cannot create blobs with mimetypes")
        }
        cd.BlobBuilder = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : cd.hasBlobConstructor ? null : console.log("warning: no BlobBuilder"), cd.URLObject = "undefined" != typeof window ? window.URL ? window.URL : window.webkitURL : void 0, n.noImageDecoding || void 0 !== cd.URLObject || (console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."), n.noImageDecoding = !0);
        var e = {
          canHandle: function(e) {
            return !n.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(e)
          },
          handle: function(e, i, t, r) {
            var a = null;
            if (cd.hasBlobConstructor) try {
              (a = new Blob([e], {
                type: cd.getMimetype(i)
              })).size !== e.length && (a = new Blob([new Uint8Array(e).buffer], {
                type: cd.getMimetype(i)
              }))
            } catch (n) {
              T("Blob constructor present but fails: " + n + "; falling back to blob builder")
            }
            if (!a) {
              var o = new cd.BlobBuilder;
              o.append(new Uint8Array(e).buffer), a = o.getBlob()
            }
            var l = cd.URLObject.createObjectURL(a),
              u = new Image;
            u.onload = function() {
              K(u.complete, "Image " + i + " could not be decoded");
              var r = document.createElement("canvas");
              r.width = u.width, r.height = u.height, r.getContext("2d").drawImage(u, 0, 0), n.preloadedImages[i] = r, cd.URLObject.revokeObjectURL(l), t && t(e)
            }, u.onerror = function(n) {
              console.log("Image " + l + " could not be decoded"), r && r()
            }, u.src = l
          }
        };
        n.preloadPlugins.push(e);
        var i = {
          canHandle: function(e) {
            return !n.noAudioDecoding && e.substr(-4) in {
              ".ogg": 1,
              ".wav": 1,
              ".mp3": 1
            }
          },
          handle: function(e, i, t, r) {
            var a = !1;

            function o(r) {
              a || (a = !0, n.preloadedAudios[i] = r, t && t(e))
            }

            function l() {
              a || (a = !0, n.preloadedAudios[i] = new Audio, r && r())
            }
            if (!cd.hasBlobConstructor) return l();
            try {
              var u = new Blob([e], {
                type: cd.getMimetype(i)
              })
            } catch (n) {
              return l()
            }
            var f = cd.URLObject.createObjectURL(u),
              c = new Audio;
            c.addEventListener("canplaythrough", (function() {
              o(c)
            }), !1), c.onerror = function(n) {
              a || (console.log("warning: browser could not fully decode audio " + i + ", trying slower base64 approach"), c.src = "data:audio/x-" + i.substr(-3) + ";base64," + function(n) {
                for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = "", t = 0, r = 0, a = 0; a < n.length; a++)
                  for (t = t << 8 | n[a], r += 8; r >= 6;) {
                    var o = t >> r - 6 & 63;
                    r -= 6, i += e[o]
                  }
                return 2 == r ? (i += e[(3 & t) << 4], i += "==") : 4 == r && (i += e[(15 & t) << 2], i += "="), i
              }(e), o(c))
            }, c.src = f, cd.safeSetTimeout((function() {
              o(c)
            }), 1e4)
          }
        };
        n.preloadPlugins.push(i);
        var t = n.canvas;
        t && (t.requestPointerLock = t.requestPointerLock || t.mozRequestPointerLock || t.webkitRequestPointerLock || t.msRequestPointerLock || function() {}, t.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || function() {}, t.exitPointerLock = t.exitPointerLock.bind(document), document.addEventListener("pointerlockchange", r, !1), document.addEventListener("mozpointerlockchange", r, !1), document.addEventListener("webkitpointerlockchange", r, !1), document.addEventListener("mspointerlockchange", r, !1), n.elementPointerLock && t.addEventListener("click", (function(e) {
          !cd.pointerLock && n.canvas.requestPointerLock && (n.canvas.requestPointerLock(), e.preventDefault())
        }), !1))
      }

      function r() {
        cd.pointerLock = document.pointerLockElement === n.canvas || document.mozPointerLockElement === n.canvas || document.webkitPointerLockElement === n.canvas || document.msPointerLockElement === n.canvas
      }
    },
    createContext: function(e, i, t, r) {
      if (i && n.ctx && e == n.canvas) return n.ctx;
      var a, o;
      if (i) {
        var l = {
          antialias: !1,
          alpha: !1,
          majorVersion: "undefined" != typeof WebGL2RenderingContext ? 2 : 1
        };
        if (r)
          for (var u in r) l[u] = r[u];
        void 0 !== Gp && (o = Gp.createContext(e, l), WXWASMSDK.canvasContext && WXWASMSDK.canvasContext._triggerCallback(), o && (a = Gp.getContext(o).GLctx))
      } else a = e.getContext("2d");
      return a ? (t && (i || K(void 0 === sg, "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"), n.ctx = a, i && Gp.makeContextCurrent(o), n.useWebGL = i, cd.moduleContextCreatedCallbacks.forEach((function(n) {
        n()
      })), cd.init()), a) : null
    },
    destroyContext: function(n, e, i) {},
    fullscreenHandlersInstalled: !1,
    lockPointer: void 0,
    resizeCanvas: void 0,
    requestFullscreen: function(e, i) {
      cd.lockPointer = e, cd.resizeCanvas = i, void 0 === cd.lockPointer && (cd.lockPointer = !0), void 0 === cd.resizeCanvas && (cd.resizeCanvas = !1);
      var t = n.canvas;

      function r() {
        cd.isFullscreen = !1;
        var e = t.parentNode;
        (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === e ? (t.exitFullscreen = cd.exitFullscreen, cd.lockPointer && t.requestPointerLock(), cd.isFullscreen = !0, cd.resizeCanvas ? cd.setFullscreenCanvasSize() : cd.updateCanvasDimensions(t)) : (e.parentNode.insertBefore(t, e), e.parentNode.removeChild(e), cd.resizeCanvas ? cd.setWindowedCanvasSize() : cd.updateCanvasDimensions(t)), n.onFullScreen && n.onFullScreen(cd.isFullscreen), n.onFullscreen && n.onFullscreen(cd.isFullscreen)
      }
      cd.fullscreenHandlersInstalled || (cd.fullscreenHandlersInstalled = !0, document.addEventListener("fullscreenchange", r, !1), document.addEventListener("mozfullscreenchange", r, !1), document.addEventListener("webkitfullscreenchange", r, !1), document.addEventListener("MSFullscreenChange", r, !1));
      var a = document.createElement("div");
      t.parentNode.insertBefore(a, t), a.appendChild(t), a.requestFullscreen = a.requestFullscreen || a.mozRequestFullScreen || a.msRequestFullscreen || (a.webkitRequestFullscreen ? function() {
        a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
      } : null) || (a.webkitRequestFullScreen ? function() {
        a.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
      } : null), a.requestFullscreen()
    },
    exitFullscreen: function() {
      return !!cd.isFullscreen && ((document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || function() {}).apply(document, []), !0)
    },
    nextRAF: 0,
    fakeRequestAnimationFrame: function(n) {
      var e = Date.now();
      if (0 === cd.nextRAF) cd.nextRAF = e + 1e3 / 60;
      else
        for (; e + 2 >= cd.nextRAF;) cd.nextRAF += 1e3 / 60;
      var i = Math.max(cd.nextRAF - e, 0);
      setTimeout(n, i)
    },
    requestAnimationFrame: function(n) {
      "function" != typeof requestAnimationFrame ? (0, cd.fakeRequestAnimationFrame)(n) : requestAnimationFrame(n)
    },
    safeRequestAnimationFrame: function(n) {
      return cd.requestAnimationFrame((function() {
        fd(n)
      }))
    },
    safeSetTimeout: function(n, e) {
      return setTimeout((function() {
        fd(n)
      }), e)
    },
    getMimetype: function(n) {
      return {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        bmp: "image/bmp",
        ogg: "audio/ogg",
        wav: "audio/wav",
        mp3: "audio/mpeg"
      } [n.substr(n.lastIndexOf(".") + 1)]
    },
    getUserMedia: function(n) {
      window.getUserMedia || (window.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia), window.getUserMedia(n)
    },
    getMovementX: function(n) {
      return n.movementX || n.mozMovementX || n.webkitMovementX || 0
    },
    getMovementY: function(n) {
      return n.movementY || n.mozMovementY || n.webkitMovementY || 0
    },
    getMouseWheelDelta: function(n) {
      var e = 0;
      switch (n.type) {
        case "DOMMouseScroll":
          e = n.detail / 3;
          break;
        case "mousewheel":
          e = n.wheelDelta / 120;
          break;
        case "wheel":
          switch (e = n.deltaY, n.deltaMode) {
            case 0:
              e /= 100;
              break;
            case 1:
              e /= 3;
              break;
            case 2:
              e *= 80;
              break;
            default:
              throw "unrecognized mouse wheel delta mode: " + n.deltaMode
          }
          break;
        default:
          throw "unrecognized mouse wheel event: " + n.type
      }
      return e
    },
    mouseX: 0,
    mouseY: 0,
    mouseMovementX: 0,
    mouseMovementY: 0,
    touches: {},
    lastTouches: {},
    calculateMouseEvent: function(e) {
      if (cd.pointerLock) "mousemove" != e.type && "mozMovementX" in e ? cd.mouseMovementX = cd.mouseMovementY = 0 : (cd.mouseMovementX = cd.getMovementX(e), cd.mouseMovementY = cd.getMovementY(e)), "undefined" != typeof SDL ? (cd.mouseX = SDL.mouseX + cd.mouseMovementX, cd.mouseY = SDL.mouseY + cd.mouseMovementY) : (cd.mouseX += cd.mouseMovementX, cd.mouseY += cd.mouseMovementY);
      else {
        var i = n.canvas.getBoundingClientRect(),
          t = n.canvas.width,
          r = n.canvas.height,
          a = void 0 !== window.scrollX ? window.scrollX : window.pageXOffset,
          o = void 0 !== window.scrollY ? window.scrollY : window.pageYOffset;
        if ("touchstart" === e.type || "touchend" === e.type || "touchmove" === e.type) {
          var l = e.touch;
          if (void 0 === l) return;
          var u = l.pageX - (a + i.left),
            f = l.pageY - (o + i.top),
            c = {
              x: u *= t / i.width,
              y: f *= r / i.height
            };
          if ("touchstart" === e.type) cd.lastTouches[l.identifier] = c, cd.touches[l.identifier] = c;
          else if ("touchend" === e.type || "touchmove" === e.type) {
            var s = cd.touches[l.identifier];
            s || (s = c), cd.lastTouches[l.identifier] = s, cd.touches[l.identifier] = c
          }
          return
        }
        var d = e.pageX - (a + i.left),
          p = e.pageY - (o + i.top);
        d *= t / i.width, p *= r / i.height, cd.mouseMovementX = d - cd.mouseX, cd.mouseMovementY = p - cd.mouseY, cd.mouseX = d, cd.mouseY = p
      }
    },
    asyncLoad: function(n, e, i, t) {
      var r = t ? "" : "al " + n;
      W(n, (function(i) {
        K(i, 'Loading data file "' + n + '" failed (no arrayBuffer).'), e(new Uint8Array(i)), r && Tn(r)
      }), (function(e) {
        if (!i) throw 'Loading data file "' + n + '" failed.';
        i()
      })), r && jn(r)
    },
    resizeListeners: [],
    updateResizeListeners: function() {
      var e = n.canvas;
      cd.resizeListeners.forEach((function(n) {
        n(e.width, e.height)
      }))
    },
    setCanvasSize: function(e, i, t) {
      var r = n.canvas;
      cd.updateCanvasDimensions(r, e, i), t || cd.updateResizeListeners()
    },
    windowedWidth: 0,
    windowedHeight: 0,
    setFullscreenCanvasSize: function() {
      if ("undefined" != typeof SDL) {
        var e = Q[SDL.screen >> 2];
        e |= 8388608, Z[SDL.screen >> 2] = e
      }
      cd.updateCanvasDimensions(n.canvas), cd.updateResizeListeners()
    },
    setWindowedCanvasSize: function() {
      if ("undefined" != typeof SDL) {
        var e = Q[SDL.screen >> 2];
        e &= -8388609, Z[SDL.screen >> 2] = e
      }
      cd.updateCanvasDimensions(n.canvas), cd.updateResizeListeners()
    },
    updateCanvasDimensions: function(e, i, t) {
      i && t ? (e.widthNative = i, e.heightNative = t) : (i = e.widthNative, t = e.heightNative);
      var r = i,
        a = t;
      if (n.forcedAspectRatio && n.forcedAspectRatio > 0 && (r / a < n.forcedAspectRatio ? r = Math.round(a * n.forcedAspectRatio) : a = Math.round(r / n.forcedAspectRatio)), (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === e.parentNode && "undefined" != typeof screen) {
        var o = Math.min(screen.width / r, screen.height / a);
        r = Math.round(r * o), a = Math.round(a * o)
      }
      cd.resizeCanvas ? (e.width != r && (e.width = r), e.height != a && (e.height = a), void 0 !== e.style && (e.style.removeProperty && e.style.removeProperty("width"), e.style.removeProperty && e.style.removeProperty("height"))) : (e.width != i && (e.width = i), e.height != t && (e.height = t), void 0 !== e.style && (r != i || a != t ? (e.style.setProperty && e.style.setProperty("width", r + "px", "important"), e.style.setProperty && e.style.setProperty("height", a + "px", "important")) : (e.style.removeProperty && e.style.removeProperty("width"), e.style.removeProperty && e.style.removeProperty("height"))))
    },
    wgetRequests: {},
    nextWgetRequestHandle: 0,
    getNextWgetRequestHandle: function() {
      var n = cd.nextWgetRequestHandle;
      return cd.nextWgetRequestHandle++, n
    }
  };

  function sd() {
    cd.mainLoop.pause(), cd.mainLoop.func = null
  }

  function dd(n) {
    clearInterval(n)
  }
  var pd = {
      inEventHandler: 0,
      removeAllEventListeners: function() {
        for (var n = pd.eventHandlers.length - 1; n >= 0; --n) pd._removeHandler(n);
        pd.eventHandlers = [], pd.deferredCalls = []
      },
      registerRemoveEventListeners: function() {
        pd.removeEventListenersRegistered || (gn.push(pd.removeAllEventListeners), pd.removeEventListenersRegistered = !0)
      },
      deferredCalls: [],
      deferCall: function(n, e, i) {
        function t(n, e) {
          if (n.length != e.length) return !1;
          for (var i in n)
            if (n[i] != e[i]) return !1;
          return !0
        }
        for (var r in pd.deferredCalls) {
          var a = pd.deferredCalls[r];
          if (a.targetFunction == n && t(a.argsList, i)) return
        }
        pd.deferredCalls.push({
          targetFunction: n,
          precedence: e,
          argsList: i
        }), pd.deferredCalls.sort((function(n, e) {
          return n.precedence < e.precedence
        }))
      },
      removeDeferredCalls: function(n) {
        for (var e = 0; e < pd.deferredCalls.length; ++e) pd.deferredCalls[e].targetFunction == n && (pd.deferredCalls.splice(e, 1), --e)
      },
      canPerformEventHandlerRequests: function() {
        return pd.inEventHandler && pd.currentEventHandler.allowsDeferredCalls
      },
      runDeferredCalls: function() {
        if (pd.canPerformEventHandlerRequests())
          for (var n = 0; n < pd.deferredCalls.length; ++n) {
            var e = pd.deferredCalls[n];
            pd.deferredCalls.splice(n, 1), --n, e.targetFunction.apply(null, e.argsList)
          }
      },
      eventHandlers: [],
      removeAllHandlersOnTarget: function(n, e) {
        for (var i = 0; i < pd.eventHandlers.length; ++i) pd.eventHandlers[i].target != n || e && e != pd.eventHandlers[i].eventTypeString || pd._removeHandler(i--)
      },
      _removeHandler: function(n) {
        var e = pd.eventHandlers[n];
        e.target.removeEventListener(e.eventTypeString, e.eventListenerFunc, e.useCapture), pd.eventHandlers.splice(n, 1)
      },
      registerOrRemoveHandler: function(n) {
        var e = function(e) {
          ++pd.inEventHandler, pd.currentEventHandler = n, pd.runDeferredCalls(), n.handlerFunc(e), pd.runDeferredCalls(), --pd.inEventHandler
        };
        if (n.callbackfunc) n.eventListenerFunc = e, "blur" === n.eventTypeString ? wx.onHide(e) : "focus" === n.eventTypeString ? wx.onShow(e) : n.target.addEventListener(n.eventTypeString, e, n.useCapture), pd.eventHandlers.push(n), pd.registerRemoveEventListeners();
        else
          for (var i = 0; i < pd.eventHandlers.length; ++i) pd.eventHandlers[i].target == n.target && pd.eventHandlers[i].eventTypeString == n.eventTypeString && pd._removeHandler(i--)
      },
      getNodeNameForTarget: function(n) {
        return n ? n == window ? "#window" : n == screen ? "#screen" : n && n.nodeName ? n.nodeName : "" : ""
      },
      fullscreenEnabled: function() {
        return document.fullscreenEnabled || document.webkitFullscreenEnabled
      }
    },
    md = {},
    yd = [0, "undefined" != typeof document ? document : 0, "undefined" != typeof window ? window : 0];

  function vd(e) {
    return n.canvas
  }

  function _d(e) {
    return n.canvas
  }

  function gd(n, e, i) {
    var t = _d();
    if (!t) return -4;
    Z[e >> 2] = t.width, Z[i >> 2] = t.height
  }

  function hd(n) {
    var e = jg(),
      i = Lg(8),
      t = i + 4,
      r = Lg(n.id.length + 1);
    on(n.id, r, n.id.length + 1);
    gd(0, i, t);
    var a = [Z[i >> 2], Z[t >> 2]];
    return Tg(e), a
  }

  function wd(n, e, i) {
    var t = _d();
    return t ? (t.width = e, t.height = i, 0) : -4
  }

  function Sd(n, e, i) {
    if (n.controlTransferredOffscreen) {
      var t = jg(),
        r = Lg(n.id.length + 1);
      on(n.id, r, n.id.length + 1), wd(0, e, i), Tg(t)
    } else n.width = e, n.height = i
  }

  function Cd(n) {
    var e = hd(n),
      i = e[0],
      t = e[1],
      r = n.style.width,
      a = n.style.height,
      o = n.style.backgroundColor,
      l = document.body.style.backgroundColor,
      u = n.style.paddingLeft,
      f = n.style.paddingRight,
      c = n.style.paddingTop,
      s = n.style.paddingBottom,
      d = n.style.marginLeft,
      p = n.style.marginRight,
      m = n.style.marginTop,
      y = n.style.marginBottom,
      v = document.body.style.margin,
      _ = document.documentElement.style.overflow,
      g = document.body.scroll,
      h = n.style.imageRendering;

    function w() {
      var e;
      document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || (document.removeEventListener("fullscreenchange", w), document.removeEventListener("webkitfullscreenchange", w), Sd(n, i, t), n.style.width = r, n.style.height = a, n.style.backgroundColor = o, l || (document.body.style.backgroundColor = "white"), document.body.style.backgroundColor = l, n.style.paddingLeft = u, n.style.paddingRight = f, n.style.paddingTop = c, n.style.paddingBottom = s, n.style.marginLeft = d, n.style.marginRight = p, n.style.marginTop = m, n.style.marginBottom = y, document.body.style.margin = v, document.documentElement.style.overflow = _, document.body.scroll = g, n.style.imageRendering = h, n.GLctxObject && n.GLctxObject.GLctx.viewport(0, 0, i, t), md.canvasResizedCallback && (e = md.canvasResizedCallbackUserData, Hg.apply(null, [md.canvasResizedCallback, 37, 0, e])))
    }
    return document.addEventListener("fullscreenchange", w), document.addEventListener("webkitfullscreenchange", w), w
  }

  function Ed(n, e, i) {
    n.style.paddingLeft = n.style.paddingRight = i + "px", n.style.paddingTop = n.style.paddingBottom = e + "px"
  }

  function Wd(n) {
    return yd.indexOf(n) < 0 ? n.getBoundingClientRect() : {
      left: 0,
      top: 0
    }
  }

  function bd(n, e) {
    var i = Cd(n),
      t = e.softFullscreen ? innerWidth : screen.width,
      r = e.softFullscreen ? innerHeight : screen.height,
      a = Wd(n),
      o = a.width,
      l = a.height,
      u = hd(n),
      f = u[0],
      c = u[1];
    if (3 == e.scaleMode) Ed(n, (r - l) / 2, (t - o) / 2), t = o, r = l;
    else if (2 == e.scaleMode)
      if (t * c < f * r) {
        var s = c * t / f;
        Ed(n, (r - s) / 2, 0), r = s
      } else {
        var d = f * r / c;
        Ed(n, 0, (t - d) / 2), t = d
      } n.style.backgroundColor || (n.style.backgroundColor = "black"), document.body.style.backgroundColor || (document.body.style.backgroundColor = "black"), n.style.width = t + "px", n.style.height = r + "px", 1 == e.filteringMode && (n.style.imageRendering = "optimizeSpeed", n.style.imageRendering = "-moz-crisp-edges", n.style.imageRendering = "-o-crisp-edges", n.style.imageRendering = "-webkit-optimize-contrast", n.style.imageRendering = "optimize-contrast", n.style.imageRendering = "crisp-edges", n.style.imageRendering = "pixelated");
    var p = 2 == e.canvasResolutionScaleMode ? devicePixelRatio : 1;
    if (0 != e.canvasResolutionScaleMode) {
      var m = t * p | 0,
        y = r * p | 0;
      Sd(n, m, y), n.GLctxObject && n.GLctxObject.GLctx.viewport(0, 0, m, y)
    }
    return i
  }

  function Ad(n, e) {
    if (0 == e.scaleMode && 0 == e.canvasResolutionScaleMode || bd(n, e), n.requestFullscreen) n.requestFullscreen();
    else {
      if (!n.webkitRequestFullscreen) return pd.fullscreenEnabled() ? -3 : -1;
      n.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    }
    var i;
    return md = e, e.canvasResizedCallback && (i = e.canvasResizedCallbackUserData, Hg.apply(null, [e.canvasResizedCallback, 37, 0, i])), 0
  }

  function Dd() {
    if (!pd.fullscreenEnabled()) return -1;
    pd.removeDeferredCalls(Ad);
    var n = yd[1];
    if (n.exitFullscreen) n.fullscreenElement && n.exitFullscreen();
    else {
      if (!n.webkitExitFullscreen) return -1;
      n.webkitFullscreenElement && n.webkitExitFullscreen()
    }
    return 0
  }

  function Md(n) {
    if (n.requestPointerLock) n.requestPointerLock();
    else {
      if (!n.msRequestPointerLock) return document.body.requestPointerLock || document.body.msRequestPointerLock ? -3 : -1;
      n.msRequestPointerLock()
    }
    return 0
  }

  function kd() {
    if (pd.removeDeferredCalls(Md), document.exitPointerLock) document.exitPointerLock();
    else {
      if (!document.msExitPointerLock) return -1;
      document.msExitPointerLock()
    }
    return 0
  }

  function xd(n) {
    var e = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement,
      i = !!e;
    Z[n >> 2] = i, Z[n + 4 >> 2] = pd.fullscreenEnabled();
    var t = i ? e : pd.previousFullscreenElement,
      r = pd.getNodeNameForTarget(t),
      a = t && t.id ? t.id : "";
    on(r, n + 8, 128), on(a, n + 136, 128), Z[n + 264 >> 2] = t ? t.clientWidth : 0, Z[n + 268 >> 2] = t ? t.clientHeight : 0, Z[n + 272 >> 2] = screen.width, Z[n + 276 >> 2] = screen.height, i && (pd.previousFullscreenElement = e)
  }

  function Xd(n) {
    return pd.fullscreenEnabled() ? (xd(n), 0) : -1
  }

  function jd(n, e) {
    nn[n >> 3] = e.timestamp;
    for (var i = 0; i < e.axes.length; ++i) nn[n + 8 * i + 16 >> 3] = e.axes[i];
    for (i = 0; i < e.buttons.length; ++i) "object" == typeof e.buttons[i] ? nn[n + 8 * i + 528 >> 3] = e.buttons[i].value : nn[n + 8 * i + 528 >> 3] = e.buttons[i];
    for (i = 0; i < e.buttons.length; ++i) "object" == typeof e.buttons[i] ? Z[n + 4 * i + 1040 >> 2] = e.buttons[i].pressed : Z[n + 4 * i + 1040 >> 2] = 1 == e.buttons[i];
    Z[n + 1296 >> 2] = e.connected, Z[n + 1300 >> 2] = e.index, Z[n + 8 >> 2] = e.axes.length, Z[n + 12 >> 2] = e.buttons.length, on(e.id, n + 1304, 64), on(e.mapping, n + 1368, 64)
  }

  function Td(n, e) {
    return n < 0 || n >= pd.lastGamepadState.length ? -5 : pd.lastGamepadState[n] ? (jd(e, pd.lastGamepadState[n]), 0) : -7
  }

  function Ld() {
    return 2147483648
  }

  function Fd() {
    return n.IsWxGame || n.IsWxGame ? 0 : pd.lastGamepadState.length
  }

  function Pd() {
    pd.removeAllEventListeners()
  }

  function Rd(n) {
    return !Gp.contexts[n] || Gp.contexts[n].GLctx.isContextLost()
  }

  function Bd(n) {
    return n < 0 || 0 === n && 1 / n == -1 / 0
  }

  function Gd(n, e) {
    return (n >>> 0) + 4294967296 * e
  }

  function Od(n, e) {
    return (n >>> 0) + 4294967296 * (e >>> 0)
  }

  function Id(n, e) {
    if (n <= 0) return n;
    var i = e <= 32 ? Math.abs(1 << e - 1) : Math.pow(2, e - 1);
    return n >= i && (e <= 32 || n > i) && (n = -2 * i + n), n
  }

  function Kd(n, e) {
    return n >= 0 ? n : e <= 32 ? 2 * Math.abs(1 << e - 1) + n : Math.pow(2, e) + n
  }

  function Nd(n, e) {
    var i = n,
      t = e;

    function r(n) {
      var e;
      return t = function(n, e) {
        return "double" !== e && "i64" !== e || 7 & n && (n += 4), n
      }(t, n), "double" === n ? (e = nn[t >> 3], t += 8) : "i64" == n ? (e = [Z[t >> 2], Z[t + 4 >> 2]], t += 8) : (n = "i32", e = Z[t >> 2], t += 4), e
    }
    for (var a, o, l, u = [];;) {
      var f = i;
      if (0 === (a = H[i >> 0])) break;
      if (o = H[i + 1 >> 0], 37 == a) {
        var c = !1,
          s = !1,
          d = !1,
          p = !1,
          m = !1;
        n: for (;;) {
          switch (o) {
            case 43:
              c = !0;
              break;
            case 45:
              s = !0;
              break;
            case 35:
              d = !0;
              break;
            case 48:
              if (p) break n;
              p = !0;
              break;
            case 32:
              m = !0;
              break;
            default:
              break n
          }
          i++, o = H[i + 1 >> 0]
        }
        var y = 0;
        if (42 == o) y = r("i32"), i++, o = H[i + 1 >> 0];
        else
          for (; o >= 48 && o <= 57;) y = 10 * y + (o - 48), i++, o = H[i + 1 >> 0];
        var v, _ = !1,
          g = -1;
        if (46 == o) {
          if (g = 0, _ = !0, i++, 42 == (o = H[i + 1 >> 0])) g = r("i32"), i++;
          else
            for (;;) {
              var h = H[i + 1 >> 0];
              if (h < 48 || h > 57) break;
              g = 10 * g + (h - 48), i++
            }
          o = H[i + 1 >> 0]
        }
        switch (g < 0 && (g = 6, _ = !1), String.fromCharCode(o)) {
          case "h":
            104 == H[i + 2 >> 0] ? (i++, v = 1) : v = 2;
            break;
          case "l":
            108 == H[i + 2 >> 0] ? (i++, v = 8) : v = 4;
            break;
          case "L":
          case "q":
          case "j":
            v = 8;
            break;
          case "z":
          case "t":
          case "I":
            v = 4;
            break;
          default:
            v = null
        }
        switch (v && i++, o = H[i + 1 >> 0], String.fromCharCode(o)) {
          case "d":
          case "i":
          case "u":
          case "o":
          case "x":
          case "X":
          case "p":
            var w = 100 == o || 105 == o;
            if (l = r("i" + 8 * (v = v || 4)), 8 == v && (l = 117 == o ? Od(l[0], l[1]) : Gd(l[0], l[1])), v <= 4) l = (w ? Id : Kd)(l & Math.pow(256, v) - 1, 8 * v);
            var S = Math.abs(l),
              C = "";
            if (100 == o || 105 == o) b = Id(l, 8 * v).toString(10);
            else if (117 == o) b = Kd(l, 8 * v).toString(10), l = Math.abs(l);
            else if (111 == o) b = (d ? "0" : "") + S.toString(8);
            else if (120 == o || 88 == o) {
              if (C = d && 0 != l ? "0x" : "", l < 0) {
                l = -l, b = (S - 1).toString(16);
                for (var E = [], W = 0; W < b.length; W++) E.push((15 - parseInt(b[W], 16)).toString(16));
                for (b = E.join(""); b.length < 2 * v;) b = "f" + b
              } else b = S.toString(16);
              88 == o && (C = C.toUpperCase(), b = b.toUpperCase())
            } else 112 == o && (0 === S ? b = "(nil)" : (C = "0x", b = S.toString(16)));
            if (_)
              for (; b.length < g;) b = "0" + b;
            for (l >= 0 && (c ? C = "+" + C : m && (C = " " + C)), "-" == b.charAt(0) && (C = "-" + C, b = b.substr(1)); C.length + b.length < y;) s ? b += " " : p ? b = "0" + b : C = " " + C;
            (b = C + b).split("").forEach((function(n) {
              u.push(n.charCodeAt(0))
            }));
            break;
          case "f":
          case "F":
          case "e":
          case "E":
          case "g":
          case "G":
            var b;
            if (l = r("double"), isNaN(l)) b = "nan", p = !1;
            else if (isFinite(l)) {
              var A = !1,
                D = Math.min(g, 20);
              if (103 == o || 71 == o) {
                A = !0, g = g || 1;
                var M = parseInt(l.toExponential(D).split("e")[1], 10);
                g > M && M >= -4 ? (o = (103 == o ? "f" : "F").charCodeAt(0), g -= M + 1) : (o = (103 == o ? "e" : "E").charCodeAt(0), g--), D = Math.min(g, 20)
              }
              101 == o || 69 == o ? (b = l.toExponential(D), /[eE][-+]\d$/.test(b) && (b = b.slice(0, -1) + "0" + b.slice(-1))) : 102 != o && 70 != o || (b = l.toFixed(D), 0 === l && Bd(l) && (b = "-" + b));
              var k = b.split("e");
              if (A && !d)
                for (; k[0].length > 1 && k[0].includes(".") && ("0" == k[0].slice(-1) || "." == k[0].slice(-1));) k[0] = k[0].slice(0, -1);
              else
                for (d && -1 == b.indexOf(".") && (k[0] += "."); g > D++;) k[0] += "0";
              b = k[0] + (k.length > 1 ? "e" + k[1] : ""), 69 == o && (b = b.toUpperCase()), l >= 0 && (c ? b = "+" + b : m && (b = " " + b))
            } else b = (l < 0 ? "-" : "") + "inf", p = !1;
            for (; b.length < y;) s ? b += " " : b = !p || "-" != b[0] && "+" != b[0] ? (p ? "0" : " ") + b : b[0] + "0" + b.slice(1);
            o < 97 && (b = b.toUpperCase()), b.split("").forEach((function(n) {
              u.push(n.charCodeAt(0))
            }));
            break;
          case "s":
            var x = r("i8*"),
              X = x ? Ng(x) : "(null)".length;
            if (_ && (X = Math.min(X, g)), !s)
              for (; X < y--;) u.push(32);
            if (x)
              for (W = 0; W < X; W++) u.push(V[x++ >> 0]);
            else u = u.concat(gg("(null)".substr(0, X), !0));
            if (s)
              for (; X < y--;) u.push(32);
            break;
          case "c":
            for (s && u.push(r("i8")); --y > 0;) u.push(32);
            s || u.push(r("i8"));
            break;
          case "n":
            var j = r("i32*");
            Z[j >> 2] = u.length;
            break;
          case "%":
            u.push(a);
            break;
          default:
            for (W = f; W < i + 2; W++) u.push(H[W >> 0])
        }
        i += 2
      } else u.push(a), i += 1
    }
    return u
  }

  function Ud(n) {
    if (!n || !n.callee || !n.callee.name) return [null, "", ""];
    n.callee.toString();
    var e = n.callee.name,
      i = "(",
      t = !0;
    for (var r in n) {
      var a = n[r];
      t || (i += ", "), t = !1, i += "number" == typeof a || "string" == typeof a ? a : "(" + typeof a + ")"
    }
    i += ")";
    var o = n.callee.caller;
    return t && (i = ""), [n = o ? o.arguments : [], e, i]
  }

  function zd(n) {
    var e = Hn(),
      i = e.lastIndexOf("_emscripten_log"),
      t = e.lastIndexOf("_emscripten_get_callstack"),
      r = e.indexOf("\n", Math.max(i, t)) + 1;
    e = e.slice(r), 32 & n && T("EM_LOG_DEMANGLE is deprecated; ignoring"), 8 & n && "undefined" == typeof emscripten_source_map && (T('Source map information is not available, emscripten_log with EM_LOG_C_STACK will be ignored. Build with "--pre-js $EMSCRIPTEN/src/emscripten-source-map.min.js" linker flag to add source map loading to code.'), n ^= 8, n |= 16);
    var a = null;
    if (128 & n)
      for (a = Ud(arguments); a[1].includes("_emscripten_");) a = Ud(a[0]);
    var o = e.split("\n");
    e = "";
    var l = new RegExp("\\s*(.*?)@(.*?):([0-9]+):([0-9]+)"),
      u = new RegExp("\\s*(.*?)@(.*):(.*)(:(.*))?"),
      f = new RegExp("\\s*at (.*?) \\((.*):(.*):(.*)\\)");
    for (var c in o) {
      var s = o[c],
        d = "",
        p = "",
        m = 0,
        y = 0,
        v = f.exec(s);
      if (v && 5 == v.length) d = v[1], p = v[2], m = v[3], y = v[4];
      else {
        if ((v = l.exec(s)) || (v = u.exec(s)), !(v && v.length >= 4)) {
          e += s + "\n";
          continue
        }
        d = v[1], p = v[2], m = v[3], y = 0 | v[4]
      }
      var _ = !1;
      if (8 & n) {
        var g = emscripten_source_map.originalPositionFor({
          line: m,
          column: y
        });
        (_ = g && g.source) && (64 & n && (g.source = g.source.substring(g.source.replace(/\\/g, "/").lastIndexOf("/") + 1)), e += "    at " + d + " (" + g.source + ":" + g.line + ":" + g.column + ")\n")
      }(16 & n || !_) && (64 & n && (p = p.substring(p.replace(/\\/g, "/").lastIndexOf("/") + 1)), e += (_ ? "     = " + d : "    at " + d) + " (" + p + ":" + m + ":" + y + ")\n"), 128 & n && a[0] && (a[1] == d && a[2].length > 0 && (e = e.replace(/\s+$/, ""), e += " with values: " + a[1] + a[2] + "\n"), a = Ud(a[0]))
    }
    return e = e.replace(/\s+$/, "")
  }

  function qd(n, e) {
    24 & n && (e = e.replace(/\s+$/, ""), e += (e.length > 0 ? "\n" : "") + zd(n)), 1 & n ? 4 & n ? x(e) : 2 & n ? console.warn(e) : 512 & n ? console.info(e) : 256 & n ? console.debug(e) : console.log(e) : 6 & n ? x(e) : k(e)
  }

  function Hd(n, e, i) {
    qd(n, tn(Nd(e, i), 0))
  }

  function Vd(n, e) {
    throw Fg(n, e || 1), "longjmp"
  }

  function Yd(n, e) {
    return Vd(n, e)
  }

  function Jd(n, e, i) {
    V.copyWithin(n, e, e + i)
  }

  function Zd(n, e) {
    return pd.fullscreenEnabled() ? (n = vd()) ? n.requestFullscreen || n.webkitRequestFullscreen ? pd.canPerformEventHandlerRequests() ? Ad(n, e) : e.deferUntilInEventHandler ? (pd.deferCall(Ad, 1, [n, e]), 1) : -2 : -3 : -4 : -1
  }

  function Qd(n, e) {
    return Zd(n, {
      scaleMode: 0,
      canvasResolutionScaleMode: 0,
      filteringMode: 0,
      deferUntilInEventHandler: e,
      canvasResizedCallbackTargetThread: 2
    })
  }

  function $d(n, e) {
    return (n = vd()) ? n.requestPointerLock || n.msRequestPointerLock ? pd.canPerformEventHandlerRequests() ? Md(n) : e ? (pd.deferCall(Md, 2, [n]), 1) : -2 : -1 : -4
  }

  function np(n) {
    try {
      return B.grow(n - q.byteLength + 65535 >>> 16), pn(B.buffer), 1
    } catch (i) {
      var e = {
        stage: "WasmMemoryGrowException",
        error: i ? i.toString() : "empty",
        oldSize: q.byteLength,
        newSize: n
      };
      GameGlobal.manager.reporter.alarm.malloc(e)
    }
  }

  function ep(n) {
    var e = V.length;
    if ((n >>>= 0) > 2147483648) return !1;
    for (var i = 1; i <= 4; i *= 2) {
      var t = e * (1 + .2 / i);
      t = Math.min(t, n + 100663296);
      var r = Math.min(2147483648, dn(Math.max(n, t), 65536)),
        a = {
          stage: "TryToRealloc",
          oldSize: e,
          requestedSize: n,
          newSize: r
        };
      if (GameGlobal.manager.reporter.alarm.malloc(a), np(r)) return !0
    }
    return !1
  }

  function ip() {
    try {
      if (navigator.getGamepads) return (pd.lastGamepadState = navigator.getGamepads()) ? 0 : -1
    } catch (n) {
      navigator.getGamepads = null
    }
    return -1
  }

  function tp(n, e, i, t, r, a, o) {
    pd.focusEvent || (pd.focusEvent = Bg(256));
    var l = {
      target: vd(),
      eventTypeString: a,
      callbackfunc: t,
      handlerFunc: function(n) {
        var i = pd.focusEvent;
        Hg(t, r, i, e)
      },
      useCapture: i
    };
    pd.registerOrRemoveHandler(l)
  }

  function rp(n, e, i, t, r) {
    return tp(0, e, i, t, 12, "blur"), 0
  }

  function ap(n, e, i, t, r) {
    return tp(0, e, i, t, 13, "focus"), 0
  }

  function op(n, e, i, t, r, a, o) {
    pd.fullscreenChangeEvent || (pd.fullscreenChangeEvent = Bg(280));
    var l = {
      target: n,
      eventTypeString: a,
      callbackfunc: t,
      handlerFunc: function(n) {
        var i, a, o, l = n || event,
          u = pd.fullscreenChangeEvent;
        xd(u), i = r, a = u, o = e, Hg.apply(null, [t, i, a, o]) && l.preventDefault()
      },
      useCapture: i
    };
    pd.registerOrRemoveHandler(l)
  }

  function lp(n, e, i, t, r) {
    return pd.fullscreenEnabled() ? (n = vd()) ? (op(n, e, i, t, 19, "fullscreenchange"), op(n, e, i, t, 19, "webkitfullscreenchange"), 0) : -4 : -1
  }

  function up(n, e, i, t, r, a, o) {
    pd.gamepadEvent || (pd.gamepadEvent = Bg(1432));
    var l = {
      target: vd(),
      allowsDeferredCalls: !0,
      eventTypeString: a,
      callbackfunc: t,
      handlerFunc: function(n) {
        var i, a, o, l = n || event,
          u = pd.gamepadEvent;
        jd(u, l.gamepad), i = r, a = u, o = e, Hg.apply(null, [t, i, a, o]) && l.preventDefault()
      },
      useCapture: i
    };
    pd.registerOrRemoveHandler(l)
  }

  function fp(n, e, i, t) {
    return ip() ? -1 : up(0, n, e, i, 26, "gamepadconnected")
  }

  function cp(n, e, i, t) {
    return ip() ? -1 : up(0, n, e, i, 27, "gamepaddisconnected")
  }

  function sp(n, e, i) {
    return setInterval((function() {
      var e;
      e = i, Yg.apply(null, [n, e])
    }), e)
  }

  function dp(n, e, i, t, r, a, o) {
    pd.keyEvent || (pd.keyEvent = Bg(164));
    var l = {
      target: vd(),
      allowsDeferredCalls: !0,
      eventTypeString: a,
      callbackfunc: t,
      handlerFunc: function(n) {
        var i, a, o, l = pd.keyEvent,
          u = l >> 2;
        Z[u + 0] = n.location, Z[u + 1] = n.ctrlKey, Z[u + 2] = n.shiftKey, Z[u + 3] = n.altKey, Z[u + 4] = n.metaKey, Z[u + 5] = n.repeat, Z[u + 6] = n.charCode, Z[u + 7] = n.keyCode, Z[u + 8] = n.which, on(n.key || "", l + 36, 32), on(n.code || "", l + 68, 32), on(n.char || "", l + 100, 32), on(n.locale || "", l + 132, 32), i = r, a = l, o = e, Hg.apply(null, [t, i, a, o]) && n.preventDefault()
      },
      useCapture: i
    };
    pd.registerOrRemoveHandler(l)
  }

  function pp(n, e, i, t, r) {
    return dp(0, e, i, t, 2, "keydown"), 0
  }

  function mp(n, e, i, t, r) {
    return dp(0, e, i, t, 1, "keypress"), 0
  }

  function yp(n, e, i, t, r) {
    return dp(0, e, i, t, 3, "keyup"), 0
  }

  function vp(n, e, i) {
    ud((function() {
      $g.call(null, n)
    }), e, i)
  }

  function _p(n, e, i) {
    var t = n >> 2;
    Z[t + 0] = e.screenX, Z[t + 1] = e.screenY, Z[t + 2] = e.clientX, Z[t + 3] = e.clientY, Z[t + 4] = e.ctrlKey, Z[t + 5] = e.shiftKey, Z[t + 6] = e.altKey, Z[t + 7] = e.metaKey, Y[2 * t + 16] = e.button, Y[2 * t + 17] = e.buttons, Z[t + 9] = e.movementX, Z[t + 10] = e.movementY;
    var r = Wd(i);
    Z[t + 11] = e.clientX - r.left, Z[t + 12] = e.clientY - r.top
  }

  function gp(n, e, i, t, r, a, o) {
    pd.mouseEvent || (pd.mouseEvent = Bg(64));
    var l = {
      target: n = vd(),
      allowsDeferredCalls: "mousemove" != a && "mouseenter" != a && "mouseleave" != a,
      eventTypeString: a,
      callbackfunc: t,
      handlerFunc: function(i) {
        var a, o, l, u = i || event;
        _p(pd.mouseEvent, u, n), a = r, o = pd.mouseEvent, l = e, Hg.apply(null, [t, a, o, l]) && u.preventDefault()
      },
      useCapture: i
    };
    pd.registerOrRemoveHandler(l)
  }

  function hp(n, e, i, t, r) {
    return gp(n, e, i, t, 5, "mousedown"), 0
  }

  function wp(n, e, i, t, r) {
    return gp(n, e, i, t, 8, "mousemove"), 0
  }

  function Sp(n, e, i, t, r) {
    return gp(n, e, i, t, 6, "mouseup"), 0
  }

  function Cp(n) {
    var e = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement,
      i = !!e;
    Z[n >> 2] = i;
    var t = pd.getNodeNameForTarget(e),
      r = e && e.id ? e.id : "";
    on(t, n + 4, 128), on(r, n + 132, 128)
  }

  function Ep(n, e, i, t, r, a, o) {
    pd.pointerlockChangeEvent || (pd.pointerlockChangeEvent = Bg(260));
    var l = {
      target: n,
      eventTypeString: a,
      callbackfunc: t,
      handlerFunc: function(n) {
        var i, a, o, l = n || event,
          u = pd.pointerlockChangeEvent;
        Cp(u), i = r, a = u, o = e, Hg.apply(null, [t, i, a, o]) && l.preventDefault()
      },
      useCapture: i
    };
    pd.registerOrRemoveHandler(l)
  }

  function Wp(n, e, i, t, r) {
    return document && document.body && (document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock || document.body.msRequestPointerLock) ? (n = vd()) ? (Ep(n, e, i, t, 20, "pointerlockchange"), Ep(n, e, i, t, 20, "mozpointerlockchange"), Ep(n, e, i, t, 20, "webkitpointerlockchange"), Ep(n, e, i, t, 20, "mspointerlockchange"), 0) : -4 : -1
  }

  function bp(n, e, i, t, r, a, o) {
    pd.touchEvent || (pd.touchEvent = Bg(1684));
    var l = {
      target: n = vd(),
      allowsDeferredCalls: "touchstart" == a || "touchend" == a,
      eventTypeString: a,
      callbackfunc: t,
      handlerFunc: function(i) {
        for (var a = {}, o = i.touches, l = 0; l < o.length; ++l)(y = o[l]).isChanged = y.onTarget = 0, a[y.identifier] = y;
        for (l = 0; l < i.changedTouches.length; ++l)(y = i.changedTouches[l]).isChanged = 1, a[y.identifier] = y;
        for (l = 0; l < i.targetTouches.length; ++l) a[i.targetTouches[l].identifier].onTarget = 1;
        var u = pd.touchEvent,
          f = u >> 2;
        Z[f + 1] = i.ctrlKey, Z[f + 2] = i.shiftKey, Z[f + 3] = i.altKey, Z[f + 4] = i.metaKey, f += 5;
        var c, s, d, p = Wd(n),
          m = 0;
        for (var l in a) {
          var y = a[l];
          if (Z[f + 0] = y.identifier, Z[f + 1] = y.screenX, Z[f + 2] = y.screenY, Z[f + 3] = y.clientX, Z[f + 4] = y.clientY, Z[f + 5] = y.pageX, Z[f + 6] = y.pageY, Z[f + 7] = y.isChanged, Z[f + 8] = y.onTarget, Z[f + 9] = y.clientX - p.left, Z[f + 10] = y.clientY - p.top, f += 13, ++m > 31) break
        }
        Z[u >> 2] = m, c = r, s = u, d = e, Hg.apply(null, [t, c, s, d]) && i.preventDefault()
      },
      useCapture: i
    };
    pd.registerOrRemoveHandler(l)
  }

  function Ap(n, e, i, t, r) {
    return bp(n, e, i, t, 25, "touchcancel"), 0
  }

  function Dp(n, e, i, t, r) {
    return bp(n, e, i, t, 23, "touchend"), 0
  }

  function Mp(n, e, i, t, r) {
    return bp(n, e, i, t, 24, "touchmove"), 0
  }

  function kp(n, e, i, t, r) {
    return bp(n, e, i, t, 22, "touchstart"), 0
  }

  function xp(n, e, i, t, r, a, o) {
    pd.wheelEvent || (pd.wheelEvent = Bg(96));
    var l = {
      target: n,
      allowsDeferredCalls: !0,
      eventTypeString: a,
      callbackfunc: t,
      handlerFunc: function(i) {
        var a, o, l, u = i || event,
          f = pd.wheelEvent;
        _p(f, u, n), nn[f + 64 >> 3] = u.deltaX, nn[f + 72 >> 3] = u.deltaY, nn[f + 80 >> 3] = u.deltaZ, Z[f + 88 >> 2] = u.deltaMode, a = r, o = f, l = e, Hg.apply(null, [t, a, o, l]) && u.preventDefault()
      },
      useCapture: i
    };
    pd.registerOrRemoveHandler(l)
  }

  function Xp(n, e, i, t, r) {
    return void 0 !== (n = vd()).onwheel ? (xp(n, e, i, t, 9, "wheel"), 0) : -1
  }

  function jp(n) {
    for (var e = qs(); qs() - e < n;);
  }

  function Tp(n) {
    var e = n.getExtension("ANGLE_instanced_arrays");
    if (e) return n.vertexAttribDivisor = function(n, i) {
      e.vertexAttribDivisorANGLE(n, i)
    }, n.drawArraysInstanced = function(n, i, t, r) {
      e.drawArraysInstancedANGLE(n, i, t, r)
    }, n.drawElementsInstanced = function(n, i, t, r, a) {
      e.drawElementsInstancedANGLE(n, i, t, r, a)
    }, 1
  }

  function Lp(n) {
    var e = n.getExtension("OES_vertex_array_object");
    if (e) return n.createVertexArray = function() {
      return e.createVertexArrayOES()
    }, n.deleteVertexArray = function(n) {
      e.deleteVertexArrayOES(n)
    }, n.bindVertexArray = function(n) {
      e.bindVertexArrayOES(n)
    }, n.isVertexArray = function(n) {
      return e.isVertexArrayOES(n)
    }, 1
  }

  function Fp(n) {
    var e = n.getExtension("WEBGL_draw_buffers");
    if (e) return n.drawBuffers = function(n, i) {
      e.drawBuffersWEBGL(n, i)
    }, 1
  }

  function Pp(n) {
    return !!(n.dibvbi = n.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"))
  }

  function Rp(n) {
    return !!(n.mdibvbi = n.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"))
  }

  function Bp(n) {
    return !!(n.multiDrawWebgl = n.getExtension("WEBGL_multi_draw"))
  }
  var Gp = {
      counter: 1,
      buffers: [],
      mappedBuffers: {},
      programs: [],
      framebuffers: [],
      renderbuffers: [],
      textures: [],
      shaders: [],
      vaos: [],
      contexts: [],
      offscreenCanvases: {},
      queries: [],
      samplers: [],
      transformFeedbacks: [],
      syncs: [],
      byteSizeByTypeRoot: 5120,
      byteSizeByType: [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8],
      stringCache: {},
      stringiCache: {},
      unpackAlignment: 4,
      recordError: function(n) {
        Gp.lastError || (Gp.lastError = n)
      },
      getNewId: function(n) {
        for (var e = Gp.counter++, i = n.length; i < e; i++) n[i] = null;
        return e
      },
      MAX_TEMP_BUFFER_SIZE: 2097152,
      numTempVertexBuffersPerSize: 64,
      log2ceilLookup: function(n) {
        return 32 - Math.clz32(0 === n ? 0 : n - 1)
      },
      generateTempBuffers: function(n, e) {
        var i = Gp.log2ceilLookup(Gp.MAX_TEMP_BUFFER_SIZE);
        e.tempVertexBufferCounters1 = [], e.tempVertexBufferCounters2 = [], e.tempVertexBufferCounters1.length = e.tempVertexBufferCounters2.length = i + 1, e.tempVertexBuffers1 = [], e.tempVertexBuffers2 = [], e.tempVertexBuffers1.length = e.tempVertexBuffers2.length = i + 1, e.tempIndexBuffers = [], e.tempIndexBuffers.length = i + 1;
        for (var t = 0; t <= i; ++t) {
          e.tempIndexBuffers[t] = null, e.tempVertexBufferCounters1[t] = e.tempVertexBufferCounters2[t] = 0;
          var r = Gp.numTempVertexBuffersPerSize;
          e.tempVertexBuffers1[t] = [], e.tempVertexBuffers2[t] = [];
          var a = e.tempVertexBuffers1[t],
            o = e.tempVertexBuffers2[t];
          a.length = o.length = r;
          for (var l = 0; l < r; ++l) a[l] = o[l] = null
        }
        if (n) {
          e.tempQuadIndexBuffer = sg.createBuffer(), e.GLctx.bindBuffer(34963, e.tempQuadIndexBuffer);
          for (var u = Gp.MAX_TEMP_BUFFER_SIZE >> 1, f = new Uint16Array(u), c = (t = 0, 0); !(f[t++] = c, t >= u || (f[t++] = c + 1, t >= u) || (f[t++] = c + 2, t >= u) || (f[t++] = c, t >= u) || (f[t++] = c + 2, t >= u) || (f[t++] = c + 3, t >= u));) c += 4;
          e.GLctx.bufferData(34963, f, 35044), e.GLctx.bindBuffer(34963, null)
        }
      },
      getTempVertexBuffer: function(n) {
        var e = Gp.log2ceilLookup(n),
          i = Gp.currentContext.tempVertexBuffers1[e],
          t = Gp.currentContext.tempVertexBufferCounters1[e];
        Gp.currentContext.tempVertexBufferCounters1[e] = Gp.currentContext.tempVertexBufferCounters1[e] + 1 & Gp.numTempVertexBuffersPerSize - 1;
        var r = i[t];
        if (r) return r;
        var a = sg.getParameter(34964);
        return i[t] = sg.createBuffer(), sg.bindBuffer(34962, i[t]), sg.bufferData(34962, 1 << e, 35048), sg.bindBuffer(34962, a), i[t]
      },
      getTempIndexBuffer: function(n) {
        var e = Gp.log2ceilLookup(n),
          i = Gp.currentContext.tempIndexBuffers[e];
        if (i) return i;
        var t = sg.getParameter(34965);
        return Gp.currentContext.tempIndexBuffers[e] = sg.createBuffer(), sg.bindBuffer(34963, Gp.currentContext.tempIndexBuffers[e]), sg.bufferData(34963, 1 << e, 35048), sg.bindBuffer(34963, t), Gp.currentContext.tempIndexBuffers[e]
      },
      newRenderingFrameStarted: function() {
        if (Gp.currentContext) {
          var n = Gp.currentContext.tempVertexBuffers1;
          Gp.currentContext.tempVertexBuffers1 = Gp.currentContext.tempVertexBuffers2, Gp.currentContext.tempVertexBuffers2 = n, n = Gp.currentContext.tempVertexBufferCounters1, Gp.currentContext.tempVertexBufferCounters1 = Gp.currentContext.tempVertexBufferCounters2, Gp.currentContext.tempVertexBufferCounters2 = n;
          for (var e = Gp.log2ceilLookup(Gp.MAX_TEMP_BUFFER_SIZE), i = 0; i <= e; ++i) Gp.currentContext.tempVertexBufferCounters1[i] = 0
        }
      },
      getSource: function(n, e, i, t) {
        for (var r = "", a = 0; a < e; ++a) {
          var o = t ? Z[t + 4 * a >> 2] : -1;
          r += rn(Z[i + 4 * a >> 2], o < 0 ? void 0 : o)
        }
        return r
      },
      calcBufLength: function(n, e, i, t) {
        return i > 0 ? t * i : n * Gp.byteSizeByType[e - Gp.byteSizeByTypeRoot] * t
      },
      usedTempBuffers: [],
      preDrawHandleClientVertexAttribBindings: function(n) {
        Gp.resetBufferBinding = !1;
        for (var e = 0; e < Gp.currentContext.maxVertexAttribs; ++e) {
          var i = Gp.currentContext.clientBuffers[e];
          if (i.clientside && i.enabled) {
            Gp.resetBufferBinding = !0;
            var t = Gp.calcBufLength(i.size, i.type, i.stride, n),
              r = Gp.getTempVertexBuffer(t);
            sg.bindBuffer(34962, r), sg.bufferSubData(34962, 0, V.subarray(i.ptr, i.ptr + t)), i.vertexAttribPointerAdaptor.call(sg, e, i.size, i.type, i.normalized, i.stride, 0)
          }
        }
      },
      postDrawHandleClientVertexAttribBindings: function() {
        Gp.resetBufferBinding && sg.bindBuffer(34962, Gp.buffers[sg.currentArrayBufferBinding])
      },
      createContext: function(e, i) {
        e.getContextSafariWebGL2Fixed || (e.getContextSafariWebGL2Fixed = e.getContext, e.getContext = function(i, t) {
          var r = e.getContextSafariWebGL2Fixed(i, t);
          return n.IsWxGame || "webgl" == i == r instanceof WebGLRenderingContext ? r : null
        });
        var t = i.majorVersion > 1 ? e.getContext("webgl2", i) : e.getContext("webgl", i);
        return t ? Gp.registerContext(t, i) : 0
      },
      registerContext: function(n, e) {
        var i = Gp.getNewId(Gp.contexts),
          t = {
            handle: i,
            attributes: e,
            version: e.majorVersion,
            GLctx: n
          };
        n.canvas && (n.canvas.GLctxObject = t), Gp.contexts[i] = t, (void 0 === e.enableExtensionsByDefault || e.enableExtensionsByDefault) && Gp.initExtensions(t), t.maxVertexAttribs = t.GLctx.getParameter(34921), t.clientBuffers = [];
        for (var r = 0; r < t.maxVertexAttribs; r++) t.clientBuffers[r] = {
          enabled: !1,
          clientside: !1,
          size: 0,
          type: 0,
          normalized: 0,
          stride: 0,
          ptr: 0,
          vertexAttribPointerAdaptor: null
        };
        return Gp.generateTempBuffers(!1, t), i
      },
      makeContextCurrent: function(e) {
        return Gp.currentContext = Gp.contexts[e], n.ctx = sg = Gp.currentContext && Gp.currentContext.GLctx, !(e && !sg)
      },
      getContext: function(n) {
        return Gp.contexts[n]
      },
      deleteContext: function(n) {
        Gp.currentContext === Gp.contexts[n] && (Gp.currentContext = null), "object" == typeof pd && pd.removeAllHandlersOnTarget(Gp.contexts[n].GLctx.canvas), Gp.contexts[n] && Gp.contexts[n].GLctx.canvas && (Gp.contexts[n].GLctx.canvas.GLctxObject = void 0), Gp.contexts[n] = null
      },
      initExtensions: function(n) {
        if (n || (n = Gp.currentContext), !n.initExtensionsDone) {
          n.initExtensionsDone = !0;
          var e = n.GLctx;
          Tp(e), Lp(e), Fp(e), Pp(e), Rp(e), n.version >= 2 && (e.disjointTimerQueryExt = e.getExtension("EXT_disjoint_timer_query_webgl2")), (n.version < 2 || !e.disjointTimerQueryExt) && (e.disjointTimerQueryExt = e.getExtension("EXT_disjoint_timer_query")), Bp(e);
          var i = e.getSupportedExtensions() || [];
          GameGlobal.USED_TEXTURE_COMPRESSION && (i.push("WEBGL_compressed_texture_etc1"), i.push("WEBGL_compressed_texture_etc")), i.forEach((function(n) {
            n.includes("lose_context") || n.includes("debug") || e.getExtension(n)
          }))
        }
      }
    },
    Op = ["default", "low-power", "high-performance"];

  function Ip(n, e) {
    var i = e >> 2,
      t = Z[i + 6],
      r = {
        alpha: !!Z[i + 0],
        depth: !!Z[i + 1],
        stencil: !!Z[i + 2],
        antialias: !!Z[i + 3],
        premultipliedAlpha: !!Z[i + 4],
        preserveDrawingBuffer: !!Z[i + 5],
        powerPreference: Op[t],
        failIfMajorPerformanceCaveat: !!Z[i + 7],
        majorVersion: Z[i + 8],
        minorVersion: Z[i + 9],
        enableExtensionsByDefault: Z[i + 10],
        explicitSwapControl: Z[i + 11],
        proxyContextToMainThread: Z[i + 12],
        renderViaOffscreenBackBuffer: Z[i + 13]
      },
      a = _d();
    if (!a) return 0;
    if (r.explicitSwapControl) return 0;
    var o = Gp.createContext(a, r);
    return WXWASMSDK.canvasContext && WXWASMSDK.canvasContext._triggerCallback(), o
  }

  function Kp(n, e) {
    return Ip(0, e)
  }

  function Np() {
    return Gp.currentContext ? Gp.currentContext.handle : 0
  }

  function Up() {
    return Np()
  }

  function zp(n) {
    return Gp.makeContextCurrent(n) ? 0 : -5
  }

  function qp(n) {
    Gp.currentContext == n && (Gp.currentContext = 0), Gp.deleteContext(n)
  }

  function Hp(n, e) {
    var i = Gp.getContext(n),
      t = rn(e);
    return t.startsWith("GL_") && (t = t.substr(3)), "ANGLE_instanced_arrays" == t && Tp(sg), "OES_vertex_array_object" == t && Lp(sg), "WEBGL_draw_buffers" == t && Fp(sg), "WEBGL_draw_instanced_base_vertex_base_instance" == t && Pp(sg), "WEBGL_multi_draw_instanced_base_vertex_base_instance" == t && Rp(sg), "WEBGL_multi_draw" == t && Bp(sg), !!i.GLctx.getExtension(t)
  }

  function Vp(n) {
    for (var e = n >> 2, i = 0; i < 14; ++i) Z[e + i] = 0;
    Z[e + 0] = Z[e + 1] = Z[e + 3] = Z[e + 4] = Z[e + 8] = Z[e + 10] = 1
  }
  n._emscripten_webgl_get_current_context = Up, n._emscripten_webgl_make_context_current = zp;
  var Yp = {};

  function Jp() {
    return _ || "./this.program"
  }

  function Zp() {
    if (!Zp.strings) {
      var n = {
        USER: "web_user",
        LOGNAME: "web_user",
        PATH: "/",
        PWD: "/",
        HOME: "/home/web_user",
        LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
        _: Jp()
      };
      for (var e in Yp) n[e] = Yp[e];
      var i = [];
      for (var e in n) i.push(e + "=" + n[e]);
      Zp.strings = i
    }
    return Zp.strings
  }

  function Qp(n, e) {
    try {
      var i = 0;
      return Zp().forEach((function(t, r) {
        var a = e + i;
        Z[n + 4 * r >> 2] = a, sn(t, a), i += t.length + 1
      })), 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), n.errno
    }
  }

  function $p(n, e) {
    try {
      var i = Zp();
      Z[n >> 2] = i.length;
      var t = 0;
      return i.forEach((function(n) {
        t += n.length + 1
      })), Z[e >> 2] = t, 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), n.errno
    }
  }

  function nm(n) {
    if (n > Xc.MAX_OPEN_FDS) return 0;
    try {
      var e = jc.getStreamFromFD(n);
      return Xc.close(e), 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), n.errno
    }
  }

  function em(n, e) {
    try {
      var i = jc.getStreamFromFD(n),
        t = i.tty ? 2 : Xc.isDir(i.mode) ? 3 : Xc.isLink(i.mode) ? 7 : 4;
      return H[e >> 0] = t, 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), n.errno
    }
  }

  function im(n, e, i, t) {
    try {
      var a = jc.getStreamFromFD(n),
        o = jc.doReadv(a, e, i);
      return Z[t >> 2] = o, 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), n.errno
    }
  }

  function tm(n, e, i, t, a) {
    try {
      var o = jc.getStreamFromFD(n),
        l = 4294967296 * i + (e >>> 0);
      return l <= -9007199254740992 || l >= 9007199254740992 ? -61 : (Xc.llseek(o, l, t), Bn = [o.position >>> 0, (Rn = o.position, +Math.abs(Rn) >= 1 ? Rn > 0 ? (0 | Math.min(+Math.floor(Rn / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((Rn - +(~~Rn >>> 0)) / 4294967296) >>> 0 : 0)], Z[a >> 2] = Bn[0], Z[a + 4 >> 2] = Bn[1], o.getdents && 0 === l && 0 === t && (o.getdents = null), 0)
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), n.errno
    }
  }

  function rm(n) {
    try {
      var e = jc.getStreamFromFD(n);
      return e.stream_ops && e.stream_ops.fsync ? -e.stream_ops.fsync(e) : 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), n.errno
    }
  }

  function am(n, e, i, t) {
    try {
      var a = jc.getStreamFromFD(n),
        o = jc.doWritev(a, e, i);
      return Z[t >> 2] = o, 0
    } catch (n) {
      return void 0 !== Xc && n instanceof Xc.ErrnoError || r(n), n.errno
    }
  }

  function om(n, e) {
    return 0
  }

  function lm() {
    return R()
  }

  function um(n, e, i, t) {
    var r, a = 0,
      o = 0,
      l = 0,
      u = 0,
      f = 0,
      c = 0;

    function s(n, e, i, t, r, a) {
      var o, l, u;
      return l = 10 === n ? 28 : 16, r = 10 === n ? qc(r) : zc(r), K(!Ic(o = Bg(l), n, r, a)), u = Bg(32), Z[u + 4 >> 2] = n, Z[u + 8 >> 2] = e, Z[u + 12 >> 2] = i, Z[u + 24 >> 2] = t, Z[u + 20 >> 2] = o, Z[u + 16 >> 2] = 10 === n ? 28 : 16, Z[u + 28 >> 2] = 0, u
    }
    if (i && (l = Z[i >> 2], u = Z[i + 4 >> 2], f = Z[i + 8 >> 2], c = Z[i + 12 >> 2]), f && !c && (c = 2 === f ? 17 : 6), !f && c && (f = 17 === c ? 2 : 1), 0 === c && (c = 6), 0 === f && (f = 1), !n && !e) return -2;
    if (-1088 & l) return -1;
    if (0 !== i && 2 & Z[i >> 2] && !n) return -1;
    if (32 & l) return -2;
    if (0 !== f && 1 !== f && 2 !== f) return -7;
    if (0 !== u && 2 !== u && 10 !== u) return -6;
    if (e && (e = rn(e), o = parseInt(e, 10), isNaN(o))) return 1024 & l ? -2 : -8;
    if (!n) return 0 === u && (u = 2), 0 == (1 & l) && (a = 2 === u ? Ag(2130706433) : [0, 0, 0, 1]), r = s(u, f, c, null, a, o), Z[t >> 2] = r, 0;
    if (null !== (a = Bc(n = rn(n))))
      if (0 === u || 2 === u) u = 2;
      else {
        if (!(10 === u && 8 & l)) return -2;
        a = [0, 0, Ag(65535), a], u = 10
      }
    else if (null !== (a = Oc(n))) {
      if (0 !== u && 10 !== u) return -2;
      u = 10
    }
    return null != a ? (r = s(u, f, c, n, a, o), Z[t >> 2] = r, 0) : 4 & l ? -2 : (a = Bc(n = Kc.lookup_name(n)), 0 === u ? u = 2 : 10 === u && (a = [0, 0, Ag(65535), a]), r = s(u, f, c, null, a, o), Z[t >> 2] = r, 0)
  }

  function fm(n) {
    var e = Bg(20),
      i = Bg(n.length + 1);
    on(n, i, n.length + 1), Z[e >> 2] = i;
    var t = Bg(4);
    Z[t >> 2] = 0, Z[e + 4 >> 2] = t;
    Z[e + 8 >> 2] = 2, Z[e + 12 >> 2] = 4;
    var r = Bg(12);
    return Z[r >> 2] = r + 8, Z[r + 4 >> 2] = 0, Z[r + 8 >> 2] = Bc(Kc.lookup_name(n)), Z[e + 16 >> 2] = r, e
  }

  function cm(n, e, i) {
    if (2 !== i) return Rc(5), null;
    var t = zc(n = Z[n >> 2]),
      r = Kc.lookup_addr(t);
    return r && (t = r), fm(t)
  }

  function sm(n) {
    return fm(rn(n))
  }

  function dm(n, e, i, t, r, a, o) {
    var l = Hc(n, e);
    if (l.errno) return -6;
    var u = l.port,
      f = l.addr,
      c = !1;
    if (i && t) {
      var s;
      if (1 & o || !(s = Kc.lookup_addr(f))) {
        if (8 & o) return -2
      } else f = s;
      on(f, i, t) + 1 >= t && (c = !0)
    }
    r && a && (on(u = "" + u, r, a) + 1 >= a && (c = !0));
    return c ? -12 : 0
  }

  function pm() {
    throw "getpwuid: TODO"
  }

  function mm(n) {
    var e = Date.now();
    return Z[n >> 2] = e / 1e3 | 0, Z[n + 4 >> 2] = e % 1e3 * 1e3 | 0, 0
  }

  function ym(n) {
    sg.activeTexture(n)
  }

  function vm(n, e) {
    (n = Gp.programs[n])[(e = Gp.shaders[e]).shaderType] = e, sg.attachShader(n, e)
  }

  function _m(n, e) {
    sg.beginQuery(n, Gp.queries[e])
  }

  function gm(n) {
    sg.beginTransformFeedback(n)
  }

  function hm(n, e, i) {
    sg.bindAttribLocation(Gp.programs[n], e, rn(i))
  }

  function wm(n, e) {
    34962 == n ? sg.currentArrayBufferBinding = e : 34963 == n && (sg.currentElementArrayBufferBinding = e), 35051 == n ? sg.currentPixelPackBufferBinding = e : 35052 == n && (sg.currentPixelUnpackBufferBinding = e), sg.bindBuffer(n, Gp.buffers[e])
  }

  function Sm(n, e, i) {
    sg.bindBufferBase(n, e, Gp.buffers[i])
  }

  function Cm(n, e, i, t, r) {
    sg.bindBufferRange(n, e, Gp.buffers[i], t, r)
  }

  function Em(n, e) {
    sg.bindFramebuffer(n, Gp.framebuffers[e])
  }

  function Wm(n, e) {
    sg.bindRenderbuffer(n, Gp.renderbuffers[e])
  }

  function bm(n, e) {
    sg.bindSampler(n, Gp.samplers[e])
  }

  function Am(n, e) {
    window._lastBoundTexture = e, sg.bindTexture(n, e ? Gp.textures[e] : null)
  }

  function Dm(n, e) {
    sg.bindTransformFeedback(n, Gp.transformFeedbacks[e])
  }

  function Mm(n) {
    sg.bindVertexArray(Gp.vaos[n]);
    var e = sg.getParameter(34965);
    sg.currentElementArrayBufferBinding = e ? 0 | e.name : 0
  }

  function km(n) {
    sg.blendEquation(n)
  }

  function xm(n, e) {
    sg.blendEquationSeparate(n, e)
  }

  function Xm(n, e, i, t) {
    sg.blendFuncSeparate(n, e, i, t)
  }

  function jm(n, e, i, t, r, a, o, l, u, f) {
    sg.blitFramebuffer(n, e, i, t, r, a, o, l, u, f)
  }

  function Tm(n, e, i, t) {
    Gp.currentContext.version >= 2 ? i ? sg.bufferData(n, V, t, i, e) : sg.bufferData(n, e, t) : sg.bufferData(n, i ? V.subarray(i, i + e) : e, t)
  }

  function Lm(n, e, i, t) {
    Gp.currentContext.version >= 2 ? sg.bufferSubData(n, e, V, t, i) : sg.bufferSubData(n, e, V.subarray(t, t + i))
  }

  function Fm(n) {
    return sg.checkFramebufferStatus(n)
  }

  function Pm(n) {
    sg.clear(n)
  }

  function Rm(n, e, i, t) {
    sg.clearBufferfi(n, e, i, t)
  }

  function Bm(n, e, i) {
    sg.clearBufferfv(n, e, $, i >> 2)
  }

  function Gm(n, e, i) {
    sg.clearBufferuiv(n, e, Q, i >> 2)
  }

  function Om(n, e, i, t) {
    sg.clearColor(n, e, i, t)
  }

  function Im(n) {
    sg.clearDepth(n)
  }

  function Km(n) {
    sg.clearStencil(n)
  }

  function Nm(n, e, i, t) {
    return 37146
  }

  function Um(n, e, i, t) {
    sg.colorMask(!!n, !!e, !!i, !!t)
  }

  function zm(n) {
    sg.compileShader(Gp.shaders[n])
  }

  function qm(n, e, i, t, r, a, o, l) {
    var u = window._lastTextureId,
      f = "undefined" != typeof wx;
    var c = function() {
        var n = 36196 == i;
        if (f && GameGlobal.USED_TEXTURE_COMPRESSION && n) {
          var e = V.subarray(l, l + 1)[0],
            t = V.subarray(l + 1, l + 1 + e),
            r = [];
          t.forEach((function(n) {
            r.push(String.fromCharCode(n))
          }));
          var a = r.join(""),
            o = r.length - 8,
            u = r.length - 5;
          if ("_" == r[o]) {
            o++;
            for (var c = ["a", "s", "t", "c"], s = 0; s < c.length; s++)
              if (r[o + s] != c[s]) return [a, "8x8", !1];
            o--;
            var d = a.substring(o + 5);
            return [a.substr(0, o), d, !1]
          }
          if ("_" == r[u]) {
            u++;
            var p = r[u++];
            if ("4" != p && "5" != p && "6" != p && "8" != p) return [a, "8x8", !1];
            d = p + "x" + p;
            var m = !1;
            return "#" != r[u] && (m = !0), u -= 2, [a.substr(0, u), d, m]
          }
          return [a, "8x8", !1]
        }
        return [-1, "8x8", !1]
      }(),
      s = c[0],
      d = c[1],
      p = c[2];

    function m(n) {
      sg.texImage2D(sg.TEXTURE_2D, 0, sg.RGBA, sg.RGBA, sg.UNSIGNED_BYTE, n)
    }

    function y(i) {
      if (Gp.textures[u]) {
        var o = GameGlobal.DownloadedTextures[i].data,
          l = u;
        Gp.textures[l] && (sg.bindTexture(sg.TEXTURE_2D, Gp.textures[l]), p && !GameGlobal.NoneLimitSupportedTexture ? m(o) : GameGlobal.TextureCompressedFormat && ("pvr" != GameGlobal.TextureCompressedFormat || t === r && -1 != [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096].indexOf(r)) && ("dds" != GameGlobal.TextureCompressedFormat || r % 4 == 0 && t % 4 == 0) ? function(i) {
          var o = 0,
            l = 16;
          switch (p ? GameGlobal.NoneLimitSupportedTexture : GameGlobal.TextureCompressedFormat) {
            case "astc":
              var u = sg.getExtension("WEBGL_compressed_texture_astc");
              if ("4x4" == d) {
                o = u.COMPRESSED_RGBA_ASTC_4x4_KHR;
                break
              }
              if ("5x5" == d) {
                o = u.COMPRESSED_RGBA_ASTC_5x5_KHR;
                break
              }
              if ("6x6" == d) {
                o = 37812;
                break
              }
              o = u.COMPRESSED_RGBA_ASTC_8x8_KHR;
              break;
            case "etc2":
              o = sg.getExtension("WEBGL_compressed_texture_etc").COMPRESSED_RGBA8_ETC2_EAC;
              break;
            case "dds":
              o = sg.getExtension("WEBGL_compressed_texture_s3tc").COMPRESSED_RGBA_S3TC_DXT5_EXT, l = 128;
              break;
            case "pvr":
              o = sg.getExtension("WEBGL_compressed_texture_pvrtc").COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
              l = new Int32Array(i, 0, 13)[12] + 52;
              break;
            case "etc1":
              o = sg.getExtension("WEBGL_compressed_texture_etc1").COMPRESSED_RGB_ETC1_WEBGL
          }
          sg.compressedTexImage2D(n, e, o, t, r, a, new Uint8Array(i, l))
        }(o) : m(o), sg.bindTexture(sg.TEXTURE_2D, window._lastBoundTexture ? Gp.textures[window._lastBoundTexture] : null))
      }
    } - 1 == s ? Gp.currentContext.supportsWebGL2EntryPoints ? sg.compressedTexImage2D(n, e, i, t, r, a, V, l, o) : sg.compressedTexImage2D(n, e, i, t, r, a, l ? V.subarray(l, l + o) : null) : GameGlobal.DownloadedTextures[s] && GameGlobal.DownloadedTextures[s].data ? y(s) : (sg.texImage2D(sg.TEXTURE_2D, 0, sg.RGBA, 1, 1, 0, sg.RGBA, sg.UNSIGNED_SHORT_4_4_4_4, new Uint16Array([0, 0])), window.WXWASMSDK.WXDownloadTexture(s, t, r, (function() {
      y(s)
    }), p))
  }

  function Hm(n, e, i, t, r, a, o, l, u) {
    sg.currentPixelUnpackBufferBinding ? sg.compressedTexImage3D(n, e, i, t, r, a, o, l, u) : sg.compressedTexImage3D(n, e, i, t, r, a, o, V, u, l)
  }

  function Vm(n, e, i, t, r, a, o, l, u) {
    var f = window._lastTextureId,
      c = "undefined" != typeof wx;
    var s = function() {
        var n = 36196 == o;
        if (c && GameGlobal.USED_TEXTURE_COMPRESSION && n) {
          var e = V.subarray(u, u + 1)[0],
            i = V.subarray(u + 1, u + 1 + e),
            t = [];
          i.forEach((function(n) {
            t.push(String.fromCharCode(n))
          }));
          var r = t.join(""),
            a = t.length - 8,
            l = t.length - 5;
          if ("_" == t[a]) {
            a++;
            for (var f = ["a", "s", "t", "c"], s = 0; s < f.length; s++)
              if (t[a + s] != f[s]) return [r, "8x8", !1];
            a--;
            var d = r.substring(a + 5);
            return [r.substr(0, a), d, !1]
          }
          if ("_" == t[l]) {
            l++;
            var p = t[l++];
            if ("4" != p && "5" != p && "6" != p && "8" != p) return [r, "8x8", !1];
            d = p + "x" + p;
            var m = !1;
            return "#" != t[l] && (m = !0), l -= 2, [r.substr(0, l), d, m]
          }
          return [r, "8x8", !1]
        }
        return [-1, "8x8", !1]
      }(),
      d = s[0],
      p = s[1],
      m = s[2];

    function y(o) {
      sg.texSubImage2D(n, e, i, t, r, a, sg.RGBA, sg.UNSIGNED_BYTE, o)
    }

    function v(o) {
      if (Gp.textures[f]) {
        var l = GameGlobal.DownloadedTextures[o].data,
          u = f;
        Gp.textures[u] && (sg.bindTexture(sg.TEXTURE_2D, Gp.textures[u]), m && !GameGlobal.NoneLimitSupportedTexture ? y(l) : GameGlobal.TextureCompressedFormat && ("pvr" != GameGlobal.TextureCompressedFormat || r === a && -1 != PotList.indexOf(a)) && ("dds" != GameGlobal.TextureCompressedFormat || a % 4 == 0 && r % 4 == 0) ? function(o) {
          var l = 0,
            u = 16;
          switch (m ? GameGlobal.NoneLimitSupportedTexture : GameGlobal.TextureCompressedFormat) {
            case "astc":
              var f = sg.getExtension("WEBGL_compressed_texture_astc");
              if ("4x4" == p) {
                l = f.COMPRESSED_RGBA_ASTC_4x4_KHR;
                break
              }
              if ("5x5" == p) {
                l = f.COMPRESSED_RGBA_ASTC_5x5_KHR;
                break
              }
              if ("6x6" == p) {
                l = 37812;
                break
              }
              l = f.COMPRESSED_RGBA_ASTC_8x8_KHR;
              break;
            case "etc2":
              l = sg.getExtension("WEBGL_compressed_texture_etc").COMPRESSED_RGBA8_ETC2_EAC;
              break;
            case "dds":
              l = sg.getExtension("WEBGL_compressed_texture_s3tc").COMPRESSED_RGBA_S3TC_DXT5_EXT, u = 128;
              break;
            case "pvr":
              l = sg.getExtension("WEBGL_compressed_texture_pvrtc").COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
              u = new Int32Array(o, 0, 13)[12] + 52;
              break;
            case "etc1":
              l = sg.getExtension("WEBGL_compressed_texture_etc1").COMPRESSED_RGB_ETC1_WEBGL
          }
          sg.compressedTexSubImage2D(n, e, i, t, r, a, l, new Uint8Array(o, u))
        }(l) : y(l), sg.bindTexture(sg.TEXTURE_2D, window._lastBoundTexture ? Gp.textures[window._lastBoundTexture] : null))
      }
    }
    var _ = window._lastTexStorage2DParams;
    if (-1 != d) {
      var g = sg.RGBA8;
      switch (GameGlobal.TextureCompressedFormat) {
        case "astc":
          var h = sg.getExtension("WEBGL_compressed_texture_astc");
          if ("4x4" == p) {
            g = h.COMPRESSED_RGBA_ASTC_4x4_KHR;
            break
          }
          if ("5x5" == p) {
            g = h.COMPRESSED_RGBA_ASTC_5x5_KHR;
            break
          }
          if ("6x6" == p) {
            g = 37812;
            break
          }
          g = h.COMPRESSED_RGBA_ASTC_8x8_KHR;
          break;
        case "etc2":
          g = sg.getExtension("WEBGL_compressed_texture_etc").COMPRESSED_RGBA8_ETC2_EAC;
          break;
        case "dds":
          g = sg.getExtension("WEBGL_compressed_texture_s3tc").COMPRESSED_RGBA_S3TC_DXT5_EXT;
          break;
        case "pvr":
          g = sg.getExtension("WEBGL_compressed_texture_pvrtc").COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
      }
      return sg.texStorage2D(_[0], _[1], g, r, a), void(GameGlobal.DownloadedTextures[d] && GameGlobal.DownloadedTextures[d].data ? v(d) : window.WXWASMSDK.WXDownloadTexture(d, r, a, (function() {
        v(d)
      }), m))
    }
    Gp.currentContext.supportsWebGL2EntryPoints ? sg.compressedTexSubImage2D(n, e, i, t, r, a, o, V, u, l) : sg.compressedTexSubImage2D(n, e, i, t, r, a, o, u ? V.subarray(u, u + l) : null)
  }

  function Ym(n, e, i, t, r, a, o, l, u, f, c) {
    sg.currentPixelUnpackBufferBinding ? sg.compressedTexSubImage3D(n, e, i, t, r, a, o, l, u, f, c) : sg.compressedTexSubImage3D(n, e, i, t, r, a, o, l, u, V, c, f)
  }

  function Jm(n, e, i, t, r) {
    sg.copyBufferSubData(n, e, i, t, r)
  }

  function Zm(n, e, i, t, r, a, o, l) {
    sg.copyTexImage2D(n, e, i, t, r, a, o, l)
  }

  function Qm(n, e, i, t, r, a, o, l) {
    sg.copyTexSubImage2D(n, e, i, t, r, a, o, l)
  }

  function $m() {
    var n = Gp.getNewId(Gp.programs),
      e = sg.createProgram();
    return e.name = n, e.maxUniformLength = e.maxAttributeLength = e.maxUniformBlockNameLength = 0, e.uniformIdCounter = 1, Gp.programs[n] = e, n
  }

  function ny(n) {
    var e = Gp.getNewId(Gp.shaders);
    return Gp.shaders[e] = sg.createShader(n), Gp.shaders[e].shaderType = 1 & n ? "vs" : "fs", e
  }

  function ey(n) {
    sg.cullFace(n)
  }

  function iy(n, e) {
    for (var i = 0; i < n; i++) {
      var t = Z[e + 4 * i >> 2],
        r = Gp.buffers[t];
      r && (sg.deleteBuffer(r), r.name = 0, Gp.buffers[t] = null, t == sg.currentArrayBufferBinding && (sg.currentArrayBufferBinding = 0), t == sg.currentElementArrayBufferBinding && (sg.currentElementArrayBufferBinding = 0), t == sg.currentPixelPackBufferBinding && (sg.currentPixelPackBufferBinding = 0), t == sg.currentPixelUnpackBufferBinding && (sg.currentPixelUnpackBufferBinding = 0))
    }
  }

  function ty(n, e) {
    for (var i = 0; i < n; ++i) {
      var t = Z[e + 4 * i >> 2],
        r = Gp.framebuffers[t];
      r && (sg.deleteFramebuffer(r), r.name = 0, Gp.framebuffers[t] = null)
    }
  }

  function ry(n) {
    if (n) {
      var e = Gp.programs[n];
      e ? (sg.deleteProgram(e), e.name = 0, Gp.programs[n] = null) : Gp.recordError(1281)
    }
  }

  function ay(n, e) {
    for (var i = 0; i < n; i++) {
      var t = Z[e + 4 * i >> 2],
        r = Gp.queries[t];
      r && (sg.deleteQuery(r), Gp.queries[t] = null)
    }
  }

  function oy(n, e) {
    for (var i = 0; i < n; i++) {
      var t = Z[e + 4 * i >> 2],
        r = Gp.renderbuffers[t];
      r && (sg.deleteRenderbuffer(r), r.name = 0, Gp.renderbuffers[t] = null)
    }
  }

  function ly(n, e) {
    for (var i = 0; i < n; i++) {
      var t = Z[e + 4 * i >> 2],
        r = Gp.samplers[t];
      r && (sg.deleteSampler(r), r.name = 0, Gp.samplers[t] = null)
    }
  }

  function uy(n) {
    if (n) {
      var e = Gp.shaders[n];
      e ? (sg.deleteShader(e), Gp.shaders[n] = null) : Gp.recordError(1281)
    }
  }

  function fy(n) {
    if (n) {
      var e = Gp.syncs[n];
      e ? (sg.deleteSync(e), e.name = 0, Gp.syncs[n] = null) : Gp.recordError(1281)
    }
  }

  function cy(n, e) {
    for (var i = 0; i < n; i++) {
      var t = Z[e + 4 * i >> 2],
        r = Gp.textures[t];
      r && (sg.deleteTexture(r), r.name = 0, Gp.textures[t] = null)
    }
  }

  function sy(n, e) {
    for (var i = 0; i < n; i++) {
      var t = Z[e + 4 * i >> 2],
        r = Gp.transformFeedbacks[t];
      r && (sg.deleteTransformFeedback(r), r.name = 0, Gp.transformFeedbacks[t] = null)
    }
  }

  function dy(n, e) {
    for (var i = 0; i < n; i++) {
      var t = Z[e + 4 * i >> 2];
      sg.deleteVertexArray(Gp.vaos[t]), Gp.vaos[t] = null
    }
  }

  function py(n) {
    sg.depthFunc(n)
  }

  function my(n) {
    sg.depthMask(!!n)
  }

  function yy(n, e) {
    sg.detachShader(Gp.programs[n], Gp.shaders[e])
  }

  function vy(n) {
    sg.disable(n)
  }

  function _y(n) {
    Gp.currentContext.clientBuffers[n].enabled = !1, sg.disableVertexAttribArray(n)
  }

  function gy(n, e, i) {
    Gp.preDrawHandleClientVertexAttribBindings(e + i), sg.drawArrays(n, e, i), Gp.postDrawHandleClientVertexAttribBindings()
  }

  function hy(n, e, i, t) {
    sg.drawArraysInstanced(n, e, i, t)
  }
  var wy = [];

  function Sy(n, e) {
    for (var i = wy[n], t = 0; t < n; t++) i[t] = Z[e + 4 * t >> 2];
    sg.drawBuffers(i)
  }

  function Cy(n, e, i, t) {
    var r;
    if (!sg.currentElementArrayBufferBinding) {
      var a = Gp.calcBufLength(1, i, 0, e);
      r = Gp.getTempIndexBuffer(a), sg.bindBuffer(34963, r), sg.bufferSubData(34963, 0, V.subarray(t, t + a)), t = 0
    }
    Gp.preDrawHandleClientVertexAttribBindings(e), sg.drawElements(n, e, i, t), Gp.postDrawHandleClientVertexAttribBindings(e), sg.currentElementArrayBufferBinding || sg.bindBuffer(34963, null)
  }

  function Ey(n, e, i, t, r) {
    sg.drawElementsInstanced(n, e, i, t, r)
  }

  function Wy(n) {
    sg.enable(n)
  }

  function by(n) {
    Gp.currentContext.clientBuffers[n].enabled = !0, sg.enableVertexAttribArray(n)
  }

  function Ay(n) {
    sg.endQuery(n)
  }

  function Dy() {
    sg.endTransformFeedback()
  }

  function My(n, e) {
    var i = sg.fenceSync(n, e);
    if (i) {
      var t = Gp.getNewId(Gp.syncs);
      return i.name = t, Gp.syncs[t] = i, t
    }
    return 0
  }

  function ky() {
    sg.finish()
  }

  function xy() {
    sg.flush()
  }

  function Xy(n) {
    switch (n) {
      case 34962:
        n = 34964;
        break;
      case 34963:
        n = 34965;
        break;
      case 35051:
        n = 35053;
        break;
      case 35052:
        n = 35055;
        break;
      case 35982:
        n = 35983;
        break;
      case 36662:
        n = 36662;
        break;
      case 36663:
        n = 36663;
        break;
      case 35345:
        n = 35368
    }
    var e = sg.getParameter(n);
    return e ? 0 | e.name : 0
  }

  function jy(n) {
    switch (n) {
      case 34962:
      case 34963:
      case 36662:
      case 36663:
      case 35051:
      case 35052:
      case 35882:
      case 35982:
      case 35345:
        return !0;
      default:
        return !1
    }
  }

  function Ty(n, e, i) {
    if (!jy(n)) return Gp.recordError(1280), void x("GL_INVALID_ENUM in glFlushMappedBufferRange");
    var t = Gp.mappedBuffers[Xy(n)];
    return t ? 16 & t.access ? e < 0 || i < 0 || e + i > t.length ? (Gp.recordError(1281), void x("invalid range in glFlushMappedBufferRange")) : void sg.bufferSubData(n, t.offset, V.subarray(t.mem + e, t.mem + e + i)) : (Gp.recordError(1282), void x("buffer was not mapped with GL_MAP_FLUSH_EXPLICIT_BIT in glFlushMappedBufferRange")) : (Gp.recordError(1282), void x("buffer was never mapped in glFlushMappedBufferRange"))
  }

  function Ly(n, e, i, t) {
    sg.framebufferRenderbuffer(n, e, i, Gp.renderbuffers[t])
  }

  function Fy(n, e, i, t, r) {
    sg.framebufferTexture2D(n, e, i, Gp.textures[t], r)
  }

  function Py(n, e, i, t, r) {
    sg.framebufferTextureLayer(n, e, Gp.textures[i], t, r)
  }

  function Ry(n) {
    sg.frontFace(n)
  }

  function By(n, e, i, t) {
    for (var r = 0; r < n; r++) {
      var a = sg[i](),
        o = a && Gp.getNewId(t);
      a ? (a.name = o, t[o] = a) : Gp.recordError(1282), Z[e + 4 * r >> 2] = o
    }
  }

  function Gy(n, e) {
    By(n, e, "createBuffer", Gp.buffers)
  }

  function Oy(n, e) {
    By(n, e, "createFramebuffer", Gp.framebuffers)
  }

  function Iy(n, e) {
    By(n, e, "createQuery", Gp.queries)
  }

  function Ky(n, e) {
    By(n, e, "createRenderbuffer", Gp.renderbuffers)
  }

  function Ny(n, e) {
    By(n, e, "createSampler", Gp.samplers)
  }

  function Uy(n, e) {
    for (var i = 0; i < n; i++) {
      var t = sg.createTexture();
      if (!t) {
        for (Gp.recordError(1282); i < n;) Z[e + 4 * i++ >> 2] = 0;
        return
      }
      var r = Gp.getNewId(Gp.textures);
      t.name = r, Gp.textures[r] = t, window._lastTextureId = r, Z[e + 4 * i >> 2] = r
    }
  }

  function zy(n, e) {
    By(n, e, "createTransformFeedback", Gp.transformFeedbacks)
  }

  function qy(n, e) {
    By(n, e, "createVertexArray", Gp.vaos)
  }

  function Hy(n) {
    sg.generateMipmap(n)
  }

  function Vy(n, e, i, t, r, a, o, l) {
    e = Gp.programs[e];
    var u = sg[n](e, i);
    if (u) {
      var f = l && on(u.name, l, t);
      r && (Z[r >> 2] = f), a && (Z[a >> 2] = u.size), o && (Z[o >> 2] = u.type)
    }
  }

  function Yy(n, e, i, t, r, a, o) {
    Vy("getActiveAttrib", n, e, i, t, r, a, o)
  }

  function Jy(n, e, i, t, r, a, o) {
    Vy("getActiveUniform", n, e, i, t, r, a, o)
  }

  function Zy(n, e, i, t, r) {
    n = Gp.programs[n];
    var a = sg.getActiveUniformBlockName(n, e);
    if (a)
      if (r && i > 0) {
        var o = on(a, r, i);
        t && (Z[t >> 2] = o)
      } else t && (Z[t >> 2] = 0)
  }

  function Qy(n, e, i, t) {
    if (t)
      if (n = Gp.programs[n], 35393 != i) {
        var r = sg.getActiveUniformBlockParameter(n, e, i);
        if (null !== r)
          if (35395 == i)
            for (var a = 0; a < r.length; a++) Z[t + 4 * a >> 2] = r[a];
          else Z[t >> 2] = r
      } else {
        var o = sg.getActiveUniformBlockName(n, e);
        Z[t >> 2] = o.length + 1
      }
    else Gp.recordError(1281)
  }

  function $y(n, e, i, t, r) {
    if (r)
      if (e > 0 && 0 == i) Gp.recordError(1281);
      else {
        n = Gp.programs[n];
        for (var a = [], o = 0; o < e; o++) a.push(Z[i + 4 * o >> 2]);
        var l = sg.getActiveUniforms(n, a, t);
        if (l) {
          var u = l.length;
          for (o = 0; o < u; o++) Z[r + 4 * o >> 2] = l[o]
        }
      }
    else Gp.recordError(1281)
  }

  function nv(n, e) {
    return sg.getAttribLocation(Gp.programs[n], rn(e))
  }

  function ev(n, e, i, t) {
    t ? sg.getBufferSubData(n, e, V, t, i) : Gp.recordError(1281)
  }

  function iv() {
    var n = sg.getError() || Gp.lastError;
    return Gp.lastError = 0, n
  }

  function tv(n, e, i, t) {
    var r = sg.getFramebufferAttachmentParameter(n, e, i);
    (r instanceof WebGLRenderbuffer || r instanceof WebGLTexture) && (r = 0 | r.name), Z[t >> 2] = r
  }

  function rv(n, e) {
    Q[n >> 2] = e, Q[n + 4 >> 2] = (e - Q[n >> 2]) / 4294967296
  }

  function av(n, e, i, t) {
    if (i) {
      var r, a = sg.getIndexedParameter(n, e);
      switch (typeof a) {
        case "boolean":
          r = a ? 1 : 0;
          break;
        case "number":
          r = a;
          break;
        case "object":
          if (null === a) switch (n) {
            case 35983:
            case 35368:
              r = 0;
              break;
            default:
              return void Gp.recordError(1280)
          } else {
            if (!(a instanceof WebGLBuffer)) return void Gp.recordError(1280);
            r = 0 | a.name
          }
          break;
        default:
          return void Gp.recordError(1280)
      }
      switch (t) {
        case 1:
          rv(i, r);
          break;
        case 0:
          Z[i >> 2] = r;
          break;
        case 2:
          $[i >> 2] = r;
          break;
        case 4:
          H[i >> 0] = r ? 1 : 0;
          break;
        default:
          throw "internal emscriptenWebGLGetIndexed() error, bad type: " + t
      }
    } else Gp.recordError(1281)
  }

  function ov(n, e, i) {
    av(n, e, i, 0)
  }

  function lv(n, e, i) {
    if (e) {
      var t = void 0;
      switch (n) {
        case 36346:
          t = 1;
          break;
        case 36344:
          return void(0 != i && 1 != i && Gp.recordError(1280));
        case 34814:
        case 36345:
          t = 0;
          break;
        case 34466:
          var r = sg.getParameter(34467);
          t = r ? r.length : 0;
          break;
        case 33390:
          t = 1048576;
          break;
        case 33309:
          if (Gp.currentContext.version < 2) return void Gp.recordError(1282);
          var a = sg.getSupportedExtensions() || [];
          GameGlobal.USED_TEXTURE_COMPRESSION && (a.push("WEBGL_compressed_texture_etc1"), a.push("WEBGL_compressed_texture_etc")), t = 2 * a.length;
          break;
        case 33307:
        case 33308:
          if (Gp.currentContext.version < 2) return void Gp.recordError(1280);
          t = 33307 == n ? 3 : 0
      }
      if (void 0 === t) {
        var o = sg.getParameter(n);
        switch (typeof o) {
          case "number":
            t = o;
            break;
          case "boolean":
            t = o ? 1 : 0;
            break;
          case "string":
            return void Gp.recordError(1280);
          case "object":
            if (null === o) switch (n) {
              case 34964:
              case 35725:
              case 34965:
              case 36006:
              case 36007:
              case 32873:
              case 34229:
              case 36662:
              case 36663:
              case 35053:
              case 35055:
              case 36010:
              case 35097:
              case 35869:
              case 32874:
              case 36389:
              case 35983:
              case 35368:
              case 34068:
                t = 0;
                break;
              default:
                return void Gp.recordError(1280)
            } else {
              if (o instanceof Float32Array || o instanceof Uint32Array || o instanceof Int32Array || o instanceof Array) {
                for (var l = 0; l < o.length; ++l) switch (i) {
                  case 0:
                    Z[e + 4 * l >> 2] = o[l];
                    break;
                  case 2:
                    $[e + 4 * l >> 2] = o[l];
                    break;
                  case 4:
                    H[e + l >> 0] = o[l] ? 1 : 0
                }
                return
              }
              try {
                t = 0 | o.name
              } catch (e) {
                return Gp.recordError(1280), void x("GL_INVALID_ENUM in glGet" + i + "v: Unknown object returned from WebGL getParameter(" + n + ")! (error: " + e + ")")
              }
            }
            break;
          default:
            return Gp.recordError(1280), void x("GL_INVALID_ENUM in glGet" + i + "v: Native code calling glGet" + i + "v(" + n + ") and it returns " + o + " of type " + typeof o + "!")
        }
      }
      switch (i) {
        case 1:
          rv(e, t);
          break;
        case 0:
          Z[e >> 2] = t;
          break;
        case 2:
          $[e >> 2] = t;
          break;
        case 4:
          H[e >> 0] = t ? 1 : 0
      }
    } else Gp.recordError(1281)
  }

  function uv(n, e) {
    lv(n, e, 0)
  }

  function fv(n, e, i, t, r) {
    if (t < 0) Gp.recordError(1281);
    else if (r) {
      var a = sg.getInternalformatParameter(n, e, i);
      if (null !== a)
        for (var o = 0; o < a.length && o < t; ++o) Z[r + 4 * o >> 2] = a[o]
    } else Gp.recordError(1281)
  }

  function cv(n, e, i, t, r) {
    Gp.recordError(1282)
  }

  function sv(n, e, i, t) {
    var r = sg.getProgramInfoLog(Gp.programs[n]);
    null === r && (r = "(unknown error)");
    var a = e > 0 && t ? on(r, t, e) : 0;
    i && (Z[i >> 2] = a)
  }

  function dv(n, e, i) {
    if (i)
      if (n >= Gp.counter) Gp.recordError(1281);
      else if (n = Gp.programs[n], 35716 == e) {
      var t = sg.getProgramInfoLog(n);
      null === t && (t = "(unknown error)"), Z[i >> 2] = t.length + 1
    } else if (35719 == e) {
      if (!n.maxUniformLength)
        for (var r = 0; r < sg.getProgramParameter(n, 35718); ++r) n.maxUniformLength = Math.max(n.maxUniformLength, sg.getActiveUniform(n, r).name.length + 1);
      Z[i >> 2] = n.maxUniformLength
    } else if (35722 == e) {
      if (!n.maxAttributeLength)
        for (r = 0; r < sg.getProgramParameter(n, 35721); ++r) n.maxAttributeLength = Math.max(n.maxAttributeLength, sg.getActiveAttrib(n, r).name.length + 1);
      Z[i >> 2] = n.maxAttributeLength
    } else if (35381 == e) {
      if (!n.maxUniformBlockNameLength)
        for (r = 0; r < sg.getProgramParameter(n, 35382); ++r) n.maxUniformBlockNameLength = Math.max(n.maxUniformBlockNameLength, sg.getActiveUniformBlockName(n, r).length + 1);
      Z[i >> 2] = n.maxUniformBlockNameLength
    } else Z[i >> 2] = sg.getProgramParameter(n, e);
    else Gp.recordError(1281)
  }

  function pv(n, e, i) {
    if (i) {
      var t, r = Gp.queries[n],
        a = sg.getQueryParameter(r, e);
      t = "boolean" == typeof a ? a ? 1 : 0 : a, Z[i >> 2] = t
    } else Gp.recordError(1281)
  }

  function mv(n, e, i) {
    i ? Z[i >> 2] = sg.getQuery(n, e) : Gp.recordError(1281)
  }

  function yv(n, e, i) {
    i ? Z[i >> 2] = sg.getRenderbufferParameter(n, e) : Gp.recordError(1281)
  }

  function vv(n, e, i, t) {
    var r = sg.getShaderInfoLog(Gp.shaders[n]);
    null === r && (r = "(unknown error)");
    var a = e > 0 && t ? on(r, t, e) : 0;
    i && (Z[i >> 2] = a)
  }

  function _v(n, e, i, t) {
    var r = sg.getShaderPrecisionFormat(n, e);
    Z[i >> 2] = r.rangeMin, Z[i + 4 >> 2] = r.rangeMax, Z[t >> 2] = r.precision
  }

  function gv(n, e, i, t) {
    var r = sg.getShaderSource(Gp.shaders[n]);
    if (r) {
      var a = e > 0 && t ? on(r, t, e) : 0;
      i && (Z[i >> 2] = a)
    }
  }

  function hv(n, e, i) {
    if (i)
      if (35716 == e) {
        var t = sg.getShaderInfoLog(Gp.shaders[n]);
        null === t && (t = "(unknown error)");
        var r = t ? t.length + 1 : 0;
        Z[i >> 2] = r
      } else if (35720 == e) {
      var a = sg.getShaderSource(Gp.shaders[n]),
        o = a ? a.length + 1 : 0;
      Z[i >> 2] = o
    } else Z[i >> 2] = sg.getShaderParameter(Gp.shaders[n], e);
    else Gp.recordError(1281)
  }

  function wv(n) {
    var e = Gp.stringCache[n];
    if (!e) {
      switch (n) {
        case 7939:
          var i = sg.getSupportedExtensions() || [];
          GameGlobal.USED_TEXTURE_COMPRESSION && (i.push("WEBGL_compressed_texture_etc1"), i.push("WEBGL_compressed_texture_etc")), e = Ve((i = i.concat(i.map((function(n) {
            return "GL_" + n
          })))).join(" "));
          break;
        case 7936:
        case 7937:
        case 37445:
        case 37446:
          var t = sg.getParameter(n);
          t || Gp.recordError(1280), e = t && Ve(t);
          break;
        case 7938:
          var r = sg.getParameter(7938);
          e = Ve(r = Gp.currentContext.version >= 2 ? "OpenGL ES 3.0 (" + r + ")" : "OpenGL ES 2.0 (" + r + ")");
          break;
        case 35724:
          var a = sg.getParameter(35724),
            o = a.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
          null !== o && (3 == o[1].length && (o[1] = o[1] + "0"), a = "OpenGL ES GLSL ES " + o[1] + " (" + a + ")"), e = Ve(a);
          break;
        default:
          Gp.recordError(1280)
      }
      Gp.stringCache[n] = e
    }
    return e
  }

  function Sv(n, e) {
    if (Gp.currentContext.version < 2) return Gp.recordError(1282), 0;
    var i = Gp.stringiCache[n];
    if (i) return e < 0 || e >= i.length ? (Gp.recordError(1281), 0) : i[e];
    switch (n) {
      case 7939:
        var t = sg.getSupportedExtensions() || [];
        return GameGlobal.USED_TEXTURE_COMPRESSION && (t.push("WEBGL_compressed_texture_etc1"), t.push("WEBGL_compressed_texture_etc")), t = (t = t.concat(t.map((function(n) {
          return "GL_" + n
        })))).map((function(n) {
          return Ve(n)
        })), i = Gp.stringiCache[n] = t, e < 0 || e >= i.length ? (Gp.recordError(1281), 0) : i[e];
      default:
        return Gp.recordError(1280), 0
    }
  }

  function Cv(n, e, i) {
    i ? Z[i >> 2] = sg.getTexParameter(n, e) : Gp.recordError(1281)
  }

  function Ev(n, e) {
    return sg.getUniformBlockIndex(Gp.programs[n], rn(e))
  }

  function Wv(n, e, i, t) {
    if (t)
      if (e > 0 && (0 == i || 0 == t)) Gp.recordError(1281);
      else {
        n = Gp.programs[n];
        for (var r = [], a = 0; a < e; a++) r.push(rn(Z[i + 4 * a >> 2]));
        var o = sg.getUniformIndices(n, r);
        if (o) {
          var l = o.length;
          for (a = 0; a < l; a++) Z[t + 4 * a >> 2] = o[a]
        }
      }
    else Gp.recordError(1281)
  }

  function bv(n, e) {
    function i(n) {
      return "]" == n.slice(-1) && n.lastIndexOf("[")
    }
    if (e = rn(e), n = Gp.programs[n]) {
      var t, r, a = n.uniformLocsById,
        o = n.uniformSizeAndIdsByName,
        l = 0,
        u = e,
        f = i(e);
      if (!a)
        for (n.uniformLocsById = a = {}, n.uniformArrayNamesById = {}, t = 0; t < sg.getProgramParameter(n, 35718); ++t) {
          var c = sg.getActiveUniform(n, t),
            s = c.name,
            d = c.size,
            p = i(s),
            m = p > 0 ? s.slice(0, p) : s,
            y = o[m] ? o[m][1] : n.uniformIdCounter;
          for (n.uniformIdCounter = Math.max(y + d, n.uniformIdCounter), o[m] = [d, y], r = 0; r < d; ++r) a[y] = r, n.uniformArrayNamesById[y++] = m
        }
      f > 0 && (l = Gc(e.slice(f + 1)) >>> 0, u = e.slice(0, f));
      var v = o[u];
      if (v && l < v[0] && (a[l += v[1]] = a[l] || sg.getUniformLocation(n, e))) return l
    } else Gp.recordError(1281);
    return -1
  }

  function Av(n) {
    var e = sg.currentProgram;
    if (e) {
      var i = e.uniformLocsById[n];
      return "number" == typeof i && (e.uniformLocsById[n] = i = sg.getUniformLocation(e, e.uniformArrayNamesById[n] + (i > 0 ? "[" + i + "]" : ""))), i
    }
    Gp.recordError(1282)
  }

  function Dv(n, e, i, t) {
    if (i) {
      n = Gp.programs[n];
      var r = sg.getUniform(n, Av(e));
      if ("number" == typeof r || "boolean" == typeof r) switch (t) {
        case 0:
          Z[i >> 2] = r;
          break;
        case 2:
          $[i >> 2] = r
      } else
        for (var a = 0; a < r.length; a++) switch (t) {
          case 0:
            Z[i + 4 * a >> 2] = r[a];
            break;
          case 2:
            $[i + 4 * a >> 2] = r[a]
        }
    } else Gp.recordError(1281)
  }

  function Mv(n, e, i) {
    Dv(n, e, i, 0)
  }

  function kv(n, e, i, t) {
    if (i) {
      Gp.currentContext.clientBuffers[n].enabled && x("glGetVertexAttrib*v on client-side array: not supported, bad data returned");
      var r = sg.getVertexAttrib(n, e);
      if (34975 == e) Z[i >> 2] = r && r.name;
      else if ("number" == typeof r || "boolean" == typeof r) switch (t) {
        case 0:
          Z[i >> 2] = r;
          break;
        case 2:
          $[i >> 2] = r;
          break;
        case 5:
          Z[i >> 2] = Math.fround(r)
      } else
        for (var a = 0; a < r.length; a++) switch (t) {
          case 0:
            Z[i + 4 * a >> 2] = r[a];
            break;
          case 2:
            $[i + 4 * a >> 2] = r[a];
            break;
          case 5:
            Z[i + 4 * a >> 2] = Math.fround(r[a])
        }
    } else Gp.recordError(1281)
  }

  function xv(n, e, i) {
    kv(n, e, i, 5)
  }

  function Xv(n, e, i) {
    for (var t = wy[e], r = 0; r < e; r++) t[r] = Z[i + 4 * r >> 2];
    sg.invalidateFramebuffer(n, t)
  }

  function jv(n) {
    return sg.isEnabled(n)
  }

  function Tv(n) {
    var e = Gp.vaos[n];
    return e ? sg.isVertexArray(e) : 0
  }

  function Lv(n) {
    function e(n, e) {
      Object.keys(e).forEach((function(i) {
        n[i] = e[i]
      }))
    }
    n = Gp.programs[n], sg.linkProgram(n), n.uniformLocsById = 0, n.uniformSizeAndIdsByName = {}, [n.vs, n.fs].forEach((function(e) {
      Object.keys(e.explicitUniformLocations).forEach((function(i) {
        var t = e.explicitUniformLocations[i];
        n.uniformSizeAndIdsByName[i] = [1, t], n.uniformIdCounter = Math.max(n.uniformIdCounter, t + 1)
      }))
    })), n.explicitUniformBindings = {}, n.explicitSamplerBindings = {}, [n.vs, n.fs].forEach((function(i) {
      e(n.explicitUniformBindings, i.explicitUniformBindings), e(n.explicitSamplerBindings, i.explicitSamplerBindings)
    })), n.explicitProgramBindingsApplied = 0
  }

  function Fv(n, e, i, t) {
    if (26 != t && 10 != t) return x("glMapBufferRange is only supported when access is MAP_WRITE|INVALIDATE_BUFFER"), 0;
    if (!jy(n)) return Gp.recordError(1280), x("GL_INVALID_ENUM in glMapBufferRange"), 0;
    var r = Bg(i);
    return r ? (Gp.mappedBuffers[Xy(n)] = {
      offset: e,
      length: i,
      mem: r,
      access: t
    }, r) : 0
  }

  function Pv(n, e) {
    3317 == n && (Gp.unpackAlignment = e), sg.pixelStorei(n, e)
  }

  function Rv(n, e) {
    sg.polygonOffset(n, e)
  }

  function Bv(n, e, i, t) {
    Gp.recordError(1280)
  }

  function Gv(n, e, i) {
    Gp.recordError(1280)
  }

  function Ov(n) {
    sg.readBuffer(n)
  }

  function Iv(n, e, i, t) {
    var r;
    return e * (n * i + (r = t) - 1 & -r)
  }

  function Kv(n) {
    return {
      5: 3,
      6: 4,
      8: 2,
      29502: 3,
      29504: 4,
      26917: 2,
      26918: 2,
      29846: 3,
      29847: 4
    } [n - 6402] || 1
  }

  function Nv(n) {
    return 0 == (n -= 5120) ? H : 1 == n ? V : 2 == n ? Y : 4 == n ? Z : 6 == n ? $ : 5 == n || 28922 == n || 28520 == n || 30779 == n || 30782 == n ? Q : J
  }

  function Uv(n) {
    return 31 - Math.clz32(n.BYTES_PER_ELEMENT)
  }

  function zv(n, e, i, t, r, a) {
    var o = Nv(n),
      l = Uv(o),
      u = 1 << l,
      f = Iv(i, t, Kv(e) * u, Gp.unpackAlignment);
    return o.subarray(r >> l, r + f >> l)
  }

  function qv(n, e, i, t, r, a, o) {
    if (Gp.currentContext.version >= 2)
      if (sg.currentPixelPackBufferBinding) sg.readPixels(n, e, i, t, r, a, o);
      else {
        Nv(a);
        sg.readPixels(n, e, i, t, r, a, zv(a, r, i, t, o))
      }
    else {
      var l = zv(a, r, i, t, o);
      l ? sg.readPixels(n, e, i, t, r, a, l) : Gp.recordError(1280)
    }
  }

  function Hv(n, e, i, t) {
    sg.renderbufferStorage(n, e, i, t)
  }

  function Vv(n, e, i, t, r) {
    sg.renderbufferStorageMultisample(n, e, i, t, r)
  }

  function Yv(n, e, i) {
    sg.samplerParameteri(Gp.samplers[n], e, i)
  }

  function Jv(n, e, i, t) {
    sg.scissor(n, e, i, t)
  }

  function Zv(n, e, i = "(", t = ")") {
    for (var r = 0; e < n.length; ++e)
      if (n[e] == i && ++r, n[e] == t && 0 == --r) return e
  }

  function Qv(n) {
    var e = 0,
      i = n.length,
      t = "",
      r = [1],
      a = {
        defined: function(n) {
          return a[n[0]] ? 1 : 0
        },
        GL_FRAGMENT_PRECISION_HIGH: function() {
          return 1
        }
      };

    function o(n, e) {
      return !(n.charCodeAt(e) > 32)
    }

    function l(n, e) {
      for (; !o(n, e);) ++e;
      return e
    }

    function u(n, e) {
      var i = n.charCodeAt(e);
      return i > 32 ? i < 48 ? 1 : i < 58 ? 2 : i < 65 ? 1 : i < 91 || 95 == i ? 3 : i < 97 ? 1 : i < 123 ? 3 : 1 : i < 33 ? 0 : 4
    }

    function f(n, e) {
      for (var i = [], t = n.length, r = 0; r <= t; ++r) {
        var a = u(n, r);
        if (2 == a || 3 == a)
          for (var o = r + 1; o <= t; ++o) {
            var l = u(n, o);
            if (l != a && (2 != l || 3 != a)) {
              i.push(n.substring(r, o)), r = o - 1;
              break
            }
          } else if (1 == a) {
            var f = n.substr(r, 2);
            ["<=", ">=", "==", "!=", "&&", "||"].includes(f) ? (i.push(f), ++r) : i.push(n[r])
          }
      }
      return i
    }

    function c(n, e, i) {
      void 0 === i && (i = n.length);
      n.length;
      for (var t = "", r = e; r < i; ++r) {
        if (3 == u(n, r))
          for (var o = r + 1; o <= i; ++o) {
            var l = u(n, o);
            if (2 != l && 3 != l) {
              var f = n.substring(r, o),
                s = a[f];
              if (s) {
                var d = n.substring(e, r);
                if (s.length && "(" == n[o]) {
                  var p = Zv(n, o);
                  d += s(n.substring(o + 1, p).split(",")) + n.substring(p + 1, i)
                } else d += s() + n.substring(o, i);
                return c(d, 0)
              }
              t += f, r = o - 1;
              break
            }
          } else t += n[r]
      }
      return t
    }

    function s(n) {
      for (; n.length > 1 || "function" != typeof n[0];) n = function(n) {
        var e, i, t, r = -2;
        for (t = 0; t < n.length; ++t)(i = ["*", "/", "+", "-", "!", "<", "<=", ">", ">=", "==", "!=", "&&", "||", "("].indexOf(n[t])) > r && (e = t, r = i);
        if (13 == r && (t = Zv(n, e))) return n.splice(e, t + 1 - e, s(n.slice(e + 1, t))), n;
        if (4 == r) {
          e = n.lastIndexOf("!");
          var a = s(n.slice(e + 1, e + 2));
          return n.splice(e, 2, (function() {
            return !a()
          })), n
        }
        if (r >= 0) {
          var o = s(n.slice(0, e)),
            l = s(n.slice(e + 1));
          switch (n[e]) {
            case "&&":
              return [function() {
                return o() && l()
              }];
            case "||":
              return [function() {
                return o() || l()
              }];
            case "==":
              return [function() {
                return o() == l()
              }];
            case "!=":
              return [function() {
                return o() != l()
              }];
            case "<":
              return [function() {
                return o() < l()
              }];
            case "<=":
              return [function() {
                return o() <= l()
              }];
            case ">":
              return [function() {
                return o() > l()
              }];
            case ">=":
              return [function() {
                return o() >= l()
              }];
            case "+":
              return [function() {
                return o() + l()
              }];
            case "-":
              return [function() {
                return o() - l()
              }];
            case "*":
              return [function() {
                return o() * l()
              }];
            case "/":
              return [function() {
                return Math.floor(o() / l())
              }]
          }
        }
        var u = Gc(n[e]);
        return [function() {
          return u
        }]
      }(n);
      return n[0]
    }
    for (; e < i; ++e) {
      var d = e;
      (e = n.indexOf("\n", e)) < 0 && (e = i);
      for (var p = d; p < e && o(n, p); ++p);
      var m = r[r.length - 1];
      if ("#" == n[p]) {
        var y = l(n, p),
          v = n.substring(p + 1, y),
          _ = n.substring(y, e).trim();
        switch (v) {
          case "if":
            var g = s(f(c(_, 0)))();
            r.push(!!g * r[r.length - 1]);
            break;
          case "ifdef":
            r.push(!!a[_] * r[r.length - 1]);
            break;
          case "ifndef":
            r.push(!a[_] * r[r.length - 1]);
            break;
          case "else":
            r[r.length - 1] = 1 - r[r.length - 1];
            break;
          case "endif":
            r.pop();
            break;
          case "define":
            if (m) {
              var h = _.indexOf("("),
                w = l(_, 0);
              if (w < h && (h = 0), h > 0) {
                var S = _.indexOf(")", h);
                let n = _.substring(h + 1, S).split(",").map(n => n.trim()),
                  e = f(_.substring(S + 1).trim());
                a[_.substring(0, h)] = function(i) {
                  var t = "";
                  return e.forEach(e => {
                    var r = n.indexOf(e);
                    t += r >= 0 ? i[r] : e
                  }), t
                }
              } else {
                let n = c(_.substring(w + 1).trim(), 0);
                a[_.substring(0, w)] = function() {
                  return n
                }
              }
            }
            break;
          case "undef":
            m && delete a[_];
            break;
          default:
            t += c(n, d, e) + "\n"
        }
      } else m && (t += c(n, d, e) + "\n")
    }
    return t
  }

  function $v(n) {
    for (var e, i, t = 0, r = "", a = n.length; t < a; ++t)
      if ("/" == (e = n[t]))
        if ("/" == (i = n[t + 1]))
          for (; t < a && "\n" != n[t + 1];) ++t;
        else if ("*" == i)
      for (; t < a && ("*" != n[t - 1] || "/" != n[t]);) ++t;
    else r += e;
    else r += e;
    return r
  }

  function n_(n, e, i, t) {
    var r = Gp.getSource(n, e, i, t);
    r = Qv($v(r));
    for (var a, o = /layout\s*\(\s*location\s*=\s*(-?\d+)\s*\)\s*(uniform\s+((lowp|mediump|highp)\s+)?\w+\s+(\w+))/g, l = {}; a = o.exec(r);)
      if (l[a[5]] = Gc(a[1]), !(l[a[5]] >= 0 && l[a[5]] < 1048576)) return x('Specified an out of range layout(location=x) directive "' + l[a[5]] + '"! (' + a[0] + ")"), void Gp.recordError(1281);
    r = r.replace(o, "$2"), Gp.shaders[n].explicitUniformLocations = l;
    for (var u, f = /layout\s*\(.*?binding\s*=\s*(-?\d+).*?\)\s*uniform\s+(\w+)\s+(\w+)?/g, c = {}, s = {}; u = f.exec(r);) {
      for (var d = 1, p = u.index; p < r.length && ";" != r[p]; ++p) {
        if ("[" == r[p]) {
          d = Gc(r.slice(p + 1));
          break
        }
        "{" == r[p] && (p = Zv(r, p, "{", "}") - 1)
      }
      var m = Gc(u[1]),
        y = 34930;
      u[3] && -1 != u[2].indexOf("sampler") ? c[u[3]] = [m, d] : (y = 35374, s[u[2]] = [m, d]);
      var v = sg.getParameter(y);
      if (!(m >= 0 && m + d <= v)) return x('Specified an out of range layout(binding=x) directive "' + m + '"! (' + u[0] + "). Valid range is [0, " + v + "-1]"), void Gp.recordError(1281)
    }
    r = (r = (r = r.replace(/layout\s*\(.*?binding\s*=\s*([-\d]+).*?\)/g, "")).replace(/(layout\s*\((.*?)),\s*binding\s*=\s*([-\d]+)\)/g, "$1)")).replace(/layout\s*\(\s*binding\s*=\s*([-\d]+)\s*,(.*?)\)/g, "layout($2)"), Gp.shaders[n].explicitSamplerBindings = c, Gp.shaders[n].explicitUniformBindings = s, sg.shaderSource(Gp.shaders[n], r)
  }

  function e_(n, e, i, t) {
    sg.stencilFuncSeparate(n, e, i, t)
  }

  function i_(n) {
    sg.stencilMask(n)
  }

  function t_(n, e, i, t) {
    sg.stencilOpSeparate(n, e, i, t)
  }

  function r_(n, e, i, t, r, a, o, l, u) {
    if (Gp.currentContext.version >= 2)
      if (sg.currentPixelUnpackBufferBinding) sg.texImage2D(n, e, i, t, r, a, o, l, u);
      else if (u) {
      Nv(l);
      sg.texImage2D(n, e, i, t, r, a, o, l, zv(l, o, t, r, u))
    } else sg.texImage2D(n, e, i, t, r, a, o, l, null);
    else sg.texImage2D(n, e, i, t, r, a, o, l, u ? zv(l, o, t, r, u) : null)
  }

  function a_(n, e, i, t, r, a, o, l, u, f) {
    if (sg.currentPixelUnpackBufferBinding) sg.texImage3D(n, e, i, t, r, a, o, l, u, f);
    else if (f) {
      Nv(u);
      sg.texImage3D(n, e, i, t, r, a, o, l, u, zv(u, l, t, r, f))
    } else sg.texImage3D(n, e, i, t, r, a, o, l, u, null)
  }

  function o_(n, e, i) {
    sg.texParameterf(n, e, i)
  }

  function l_(n, e, i) {
    sg.texParameteri(n, e, i)
  }

  function u_(n, e, i) {
    var t = Z[i >> 2];
    sg.texParameteri(n, e, t)
  }

  function f_(n, e, i, t, r) {
    window._lastTexStorage2DParams = [n, e, i, t, r], 36196 != i && 37492 != i && 37493 != i && sg.texStorage2D(n, e, i, t, r)
  }

  function c_(n, e, i, t, r, a) {
    sg.texStorage3D(n, e, i, t, r, a)
  }

  function s_(n, e, i, t, r, a, o, l, u) {
    if (Gp.currentContext.version >= 2)
      if (sg.currentPixelUnpackBufferBinding) sg.texSubImage2D(n, e, i, t, r, a, o, l, u);
      else if (u) {
      Nv(l);
      sg.texSubImage2D(n, e, i, t, r, a, o, l, zv(l, o, r, a, u))
    } else sg.texSubImage2D(n, e, i, t, r, a, o, l, null);
    else {
      var f = null;
      u && (f = zv(l, o, r, a, u)), sg.texSubImage2D(n, e, i, t, r, a, o, l, f)
    }
  }

  function d_(n, e, i, t, r, a, o, l, u, f, c) {
    if (sg.currentPixelUnpackBufferBinding) sg.texSubImage3D(n, e, i, t, r, a, o, l, u, f, c);
    else if (c) {
      Nv(f);
      sg.texSubImage3D(n, e, i, t, r, a, o, l, u, f, zv(f, u, a, o, c))
    } else sg.texSubImage3D(n, e, i, t, r, a, o, l, u, f, null)
  }

  function p_(n, e, i, t) {
    n = Gp.programs[n];
    for (var r = [], a = 0; a < e; a++) r.push(rn(Z[i + 4 * a >> 2]));
    sg.transformFeedbackVaryings(n, r, t)
  }
  var m_ = [];

  function y_(n, e, i) {
    if (Gp.currentContext.version >= 2) sg.uniform1fv(Av(n), $, i >> 2, e);
    else {
      if (e <= 288)
        for (var t = m_[e - 1], r = 0; r < e; ++r) t[r] = $[i + 4 * r >> 2];
      else t = $.subarray(i >> 2, i + 4 * e >> 2);
      sg.uniform1fv(Av(n), t)
    }
  }

  function v_(n, e) {
    sg.uniform1i(Av(n), e)
  }
  var __ = [];

  function g_(n, e, i) {
    if (Gp.currentContext.version >= 2) sg.uniform1iv(Av(n), Z, i >> 2, e);
    else {
      if (e <= 288)
        for (var t = __[e - 1], r = 0; r < e; ++r) t[r] = Z[i + 4 * r >> 2];
      else t = Z.subarray(i >> 2, i + 4 * e >> 2);
      sg.uniform1iv(Av(n), t)
    }
  }

  function h_(n, e, i) {
    sg.uniform1uiv(Av(n), Q, i >> 2, e)
  }

  function w_(n, e, i) {
    if (Gp.currentContext.version >= 2) sg.uniform2fv(Av(n), $, i >> 2, 2 * e);
    else {
      if (e <= 144)
        for (var t = m_[2 * e - 1], r = 0; r < 2 * e; r += 2) t[r] = $[i + 4 * r >> 2], t[r + 1] = $[i + (4 * r + 4) >> 2];
      else t = $.subarray(i >> 2, i + 8 * e >> 2);
      sg.uniform2fv(Av(n), t)
    }
  }

  function S_(n, e, i) {
    if (Gp.currentContext.version >= 2) sg.uniform2iv(Av(n), Z, i >> 2, 2 * e);
    else {
      if (e <= 144)
        for (var t = __[2 * e - 1], r = 0; r < 2 * e; r += 2) t[r] = Z[i + 4 * r >> 2], t[r + 1] = Z[i + (4 * r + 4) >> 2];
      else t = Z.subarray(i >> 2, i + 8 * e >> 2);
      sg.uniform2iv(Av(n), t)
    }
  }

  function C_(n, e, i) {
    sg.uniform2uiv(Av(n), Q, i >> 2, 2 * e)
  }

  function E_(n, e, i) {
    if (Gp.currentContext.version >= 2) sg.uniform3fv(Av(n), $, i >> 2, 3 * e);
    else {
      if (e <= 96)
        for (var t = m_[3 * e - 1], r = 0; r < 3 * e; r += 3) t[r] = $[i + 4 * r >> 2], t[r + 1] = $[i + (4 * r + 4) >> 2], t[r + 2] = $[i + (4 * r + 8) >> 2];
      else t = $.subarray(i >> 2, i + 12 * e >> 2);
      sg.uniform3fv(Av(n), t)
    }
  }

  function W_(n, e, i) {
    if (Gp.currentContext.version >= 2) sg.uniform3iv(Av(n), Z, i >> 2, 3 * e);
    else {
      if (e <= 96)
        for (var t = __[3 * e - 1], r = 0; r < 3 * e; r += 3) t[r] = Z[i + 4 * r >> 2], t[r + 1] = Z[i + (4 * r + 4) >> 2], t[r + 2] = Z[i + (4 * r + 8) >> 2];
      else t = Z.subarray(i >> 2, i + 12 * e >> 2);
      sg.uniform3iv(Av(n), t)
    }
  }

  function b_(n, e, i) {
    sg.uniform3uiv(Av(n), Q, i >> 2, 3 * e)
  }

  function A_(n, e, i) {
    if (Gp.currentContext.version >= 2) sg.uniform4fv(Av(n), $, i >> 2, 4 * e);
    else {
      if (e <= 72) {
        var t = m_[4 * e - 1],
          r = $;
        i >>= 2;
        for (var a = 0; a < 4 * e; a += 4) {
          var o = i + a;
          t[a] = r[o], t[a + 1] = r[o + 1], t[a + 2] = r[o + 2], t[a + 3] = r[o + 3]
        }
      } else t = $.subarray(i >> 2, i + 16 * e >> 2);
      sg.uniform4fv(Av(n), t)
    }
  }

  function D_(n, e, i) {
    if (Gp.currentContext.version >= 2) sg.uniform4iv(Av(n), Z, i >> 2, 4 * e);
    else {
      if (e <= 72)
        for (var t = __[4 * e - 1], r = 0; r < 4 * e; r += 4) t[r] = Z[i + 4 * r >> 2], t[r + 1] = Z[i + (4 * r + 4) >> 2], t[r + 2] = Z[i + (4 * r + 8) >> 2], t[r + 3] = Z[i + (4 * r + 12) >> 2];
      else t = Z.subarray(i >> 2, i + 16 * e >> 2);
      sg.uniform4iv(Av(n), t)
    }
  }

  function M_(n, e, i) {
    sg.uniform4uiv(Av(n), Q, i >> 2, 4 * e)
  }

  function k_(n, e, i) {
    n = Gp.programs[n], sg.uniformBlockBinding(n, e, i)
  }

  function x_(n, e, i, t) {
    if (Gp.currentContext.version >= 2) sg.uniformMatrix3fv(Av(n), !!i, $, t >> 2, 9 * e);
    else {
      if (e <= 32)
        for (var r = m_[9 * e - 1], a = 0; a < 9 * e; a += 9) r[a] = $[t + 4 * a >> 2], r[a + 1] = $[t + (4 * a + 4) >> 2], r[a + 2] = $[t + (4 * a + 8) >> 2], r[a + 3] = $[t + (4 * a + 12) >> 2], r[a + 4] = $[t + (4 * a + 16) >> 2], r[a + 5] = $[t + (4 * a + 20) >> 2], r[a + 6] = $[t + (4 * a + 24) >> 2], r[a + 7] = $[t + (4 * a + 28) >> 2], r[a + 8] = $[t + (4 * a + 32) >> 2];
      else r = $.subarray(t >> 2, t + 36 * e >> 2);
      sg.uniformMatrix3fv(Av(n), !!i, r)
    }
  }

  function X_(n, e, i, t) {
    if (Gp.currentContext.version >= 2) sg.uniformMatrix4fv(Av(n), !!i, $, t >> 2, 16 * e);
    else {
      if (e <= 18) {
        var r = m_[16 * e - 1],
          a = $;
        t >>= 2;
        for (var o = 0; o < 16 * e; o += 16) {
          var l = t + o;
          r[o] = a[l], r[o + 1] = a[l + 1], r[o + 2] = a[l + 2], r[o + 3] = a[l + 3], r[o + 4] = a[l + 4], r[o + 5] = a[l + 5], r[o + 6] = a[l + 6], r[o + 7] = a[l + 7], r[o + 8] = a[l + 8], r[o + 9] = a[l + 9], r[o + 10] = a[l + 10], r[o + 11] = a[l + 11], r[o + 12] = a[l + 12], r[o + 13] = a[l + 13], r[o + 14] = a[l + 14], r[o + 15] = a[l + 15]
        }
      } else r = $.subarray(t >> 2, t + 64 * e >> 2);
      sg.uniformMatrix4fv(Av(n), !!i, r)
    }
  }

  function j_(n) {
    if (!jy(n)) return Gp.recordError(1280), x("GL_INVALID_ENUM in glUnmapBuffer"), 0;
    var e = Xy(n),
      i = Gp.mappedBuffers[e];
    return i ? (Gp.mappedBuffers[e] = null, 16 & i.access || (Gp.currentContext.version >= 2 ? sg.bufferSubData(n, i.offset, V, i.mem, i.length) : sg.bufferSubData(n, i.offset, V.subarray(i.mem, i.mem + i.length))), Gg(i.mem), 1) : (Gp.recordError(1282), x("buffer was never mapped in glUnmapBuffer"), 0)
  }

  function T_() {
    var n = sg.currentProgram;
    n.explicitProgramBindingsApplied || (Gp.currentContext.version >= 2 && Object.keys(n.explicitUniformBindings).forEach((function(e) {
      for (var i = n.explicitUniformBindings[e], t = 0; t < i[1]; ++t) {
        var r = sg.getUniformBlockIndex(n, e + (i[1] > 1 ? "[" + t + "]" : ""));
        sg.uniformBlockBinding(n, r, i[0] + t)
      }
    })), Object.keys(n.explicitSamplerBindings).forEach((function(e) {
      for (var i = n.explicitSamplerBindings[e], t = 0; t < i[1]; ++t) sg.uniform1i(sg.getUniformLocation(n, e + (t ? "[" + t + "]" : "")), i[0] + t)
    })), n.explicitProgramBindingsApplied = 1)
  }

  function L_(n) {
    n = Gp.programs[n], sg.useProgram(n), (sg.currentProgram = n) && T_()
  }

  function F_(n) {
    sg.validateProgram(Gp.programs[n])
  }

  function P_(n, e, i, t, r) {
    sg.vertexAttrib4f(n, e, i, t, r)
  }

  function R_(n, e) {
    sg.vertexAttrib4f(n, $[e >> 2], $[e + 4 >> 2], $[e + 8 >> 2], $[e + 12 >> 2])
  }

  function B_(n, e, i, t, r) {
    var a = Gp.currentContext.clientBuffers[n];
    if (!sg.currentArrayBufferBinding) return a.size = e, a.type = i, a.normalized = !1, a.stride = t, a.ptr = r, a.clientside = !0, void(a.vertexAttribPointerAdaptor = function(n, e, i, t, r, a) {
      this.vertexAttribIPointer(n, e, i, r, a)
    });
    a.clientside = !1, sg.vertexAttribIPointer(n, e, i, t, r)
  }

  function G_(n, e, i, t, r, a) {
    var o = Gp.currentContext.clientBuffers[n];
    if (!sg.currentArrayBufferBinding) return o.size = e, o.type = i, o.normalized = t, o.stride = r, o.ptr = a, o.clientside = !0, void(o.vertexAttribPointerAdaptor = function(n, e, i, t, r, a) {
      this.vertexAttribPointer(n, e, i, t, r, a)
    });
    o.clientside = !1, sg.vertexAttribPointer(n, e, i, !!t, r, a)
  }

  function O_(n, e, i, t) {
    sg.viewport(n, e, i, t)
  }

  function I_(n) {
    return n
  }

  function K_(n) {
    Sc();
    var e = new Date(Z[n + 20 >> 2] + 1900, Z[n + 16 >> 2], Z[n + 12 >> 2], Z[n + 8 >> 2], Z[n + 4 >> 2], Z[n >> 2], 0),
      i = Z[n + 32 >> 2],
      t = e.getTimezoneOffset(),
      r = new Date(e.getFullYear(), 0, 1),
      a = new Date(e.getFullYear(), 6, 1).getTimezoneOffset(),
      o = r.getTimezoneOffset(),
      l = Math.min(o, a);
    if (i < 0) Z[n + 32 >> 2] = Number(a != o && l == t);
    else if (i > 0 != (l == t)) {
      var u = Math.max(o, a),
        f = i > 0 ? l : u;
      e.setTime(e.getTime() + 6e4 * (f - t))
    }
    Z[n + 24 >> 2] = e.getDay();
    var c = (e.getTime() - r.getTime()) / 864e5 | 0;
    return Z[n + 28 >> 2] = c, Z[n >> 2] = e.getSeconds(), Z[n + 4 >> 2] = e.getMinutes(), Z[n + 8 >> 2] = e.getHours(), Z[n + 12 >> 2] = e.getDate(), Z[n + 16 >> 2] = e.getMonth(), e.getTime() / 1e3 | 0
  }

  function N_(n) {
    var e = rn(n);
    GameGlobal.dnSDK.track("ADD_TO_WISHLIST", {
      type: e
    })
  }

  function U_(n) {
    var e = rn(n);
    GameGlobal.dnSDK.onCreateRole(e)
  }

  function z_(n, e) {
    var i = rn(e);
    GameGlobal.dnSDK.track("PURCHASE", {
      value: n,
      outer_action_id: i
    })
  }

  function q_(n) {
    GameGlobal.dnSDK.track("RE_ACTIVE", {
      backFlowDay: n
    })
  }

  function H_() {
    GameGlobal.dnSDK.onRegister()
  }

  function V_(n) {
    var e = rn(n);
    GameGlobal.dnSDK.track("SHARE", {
      target: e
    })
  }

  function Y_() {
    var n = GameGlobal.dnSDK.onTutorialFinish();
    null != n && 0 !== n.code ? console.warn("WXAMS TUTORIAL_FINISH failed, code:", n.code, "message:", n.message) : null != n && 0 === n.code && console.log("WXAMS TUTORIAL_FINISH success")
  }

  function J_() {
    var n = GameGlobal.dnSDK.track("TUTORIAL_START", {});
    null != n && 0 !== n.code ? console.warn("WXAMS TUTORIAL_START failed, code:", n.code, "message:", n.message) : null != n && 0 === n.code && console.log("WXAMS TUTORIAL_START success")
  }

  function Z_(n, e) {
    GameGlobal.dnSDK.track("UPDATE_LEVEL", {
      level: n,
      power: e
    })
  }

  function Q_(n) {
    var e = rn(n);
    GameGlobal.dnSDK.track("VIEW_CONTENT", {
      item: e
    })
  }

  function $_(n) {
    P(n)
  }

  function ng(n, e, i) {
    return 0
  }

  function eg(n) {
    return Z[n >> 2] = 0, 0
  }

  function ig(n) {
    return n % 4 == 0 && (n % 100 != 0 || n % 400 == 0)
  }

  function tg(n, e) {
    for (var i = 0, t = 0; t <= e; i += n[t++]);
    return i
  }
  var rg = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    ag = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  function og(n, e) {
    for (var i = new Date(n.getTime()); e > 0;) {
      var t = ig(i.getFullYear()),
        r = i.getMonth(),
        a = (t ? rg : ag)[r];
      if (!(e > a - i.getDate())) return i.setDate(i.getDate() + e), i;
      e -= a - i.getDate() + 1, i.setDate(1), r < 11 ? i.setMonth(r + 1) : (i.setMonth(0), i.setFullYear(i.getFullYear() + 1))
    }
    return i
  }

  function lg(n, e, i, t) {
    var r = Z[t + 40 >> 2],
      a = {
        tm_sec: Z[t >> 2],
        tm_min: Z[t + 4 >> 2],
        tm_hour: Z[t + 8 >> 2],
        tm_mday: Z[t + 12 >> 2],
        tm_mon: Z[t + 16 >> 2],
        tm_year: Z[t + 20 >> 2],
        tm_wday: Z[t + 24 >> 2],
        tm_yday: Z[t + 28 >> 2],
        tm_isdst: Z[t + 32 >> 2],
        tm_gmtoff: Z[t + 36 >> 2],
        tm_zone: r ? rn(r) : ""
      },
      o = rn(i),
      l = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y"
      };
    for (var u in l) o = o.replace(new RegExp(u, "g"), l[u]);
    var f = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      c = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function s(n, e, i) {
      for (var t = "number" == typeof n ? n.toString() : n || ""; t.length < e;) t = i[0] + t;
      return t
    }

    function d(n, e) {
      return s(n, e, "0")
    }

    function p(n, e) {
      function i(n) {
        return n < 0 ? -1 : n > 0 ? 1 : 0
      }
      var t;
      return 0 === (t = i(n.getFullYear() - e.getFullYear())) && 0 === (t = i(n.getMonth() - e.getMonth())) && (t = i(n.getDate() - e.getDate())), t
    }

    function m(n) {
      switch (n.getDay()) {
        case 0:
          return new Date(n.getFullYear() - 1, 11, 29);
        case 1:
          return n;
        case 2:
          return new Date(n.getFullYear(), 0, 3);
        case 3:
          return new Date(n.getFullYear(), 0, 2);
        case 4:
          return new Date(n.getFullYear(), 0, 1);
        case 5:
          return new Date(n.getFullYear() - 1, 11, 31);
        case 6:
          return new Date(n.getFullYear() - 1, 11, 30)
      }
    }

    function y(n) {
      var e = og(new Date(n.tm_year + 1900, 0, 1), n.tm_yday),
        i = new Date(e.getFullYear(), 0, 4),
        t = new Date(e.getFullYear() + 1, 0, 4),
        r = m(i),
        a = m(t);
      return p(r, e) <= 0 ? p(a, e) <= 0 ? e.getFullYear() + 1 : e.getFullYear() : e.getFullYear() - 1
    }
    var v = {
      "%a": function(n) {
        return f[n.tm_wday].substring(0, 3)
      },
      "%A": function(n) {
        return f[n.tm_wday]
      },
      "%b": function(n) {
        return c[n.tm_mon].substring(0, 3)
      },
      "%B": function(n) {
        return c[n.tm_mon]
      },
      "%C": function(n) {
        return d((n.tm_year + 1900) / 100 | 0, 2)
      },
      "%d": function(n) {
        return d(n.tm_mday, 2)
      },
      "%e": function(n) {
        return s(n.tm_mday, 2, " ")
      },
      "%g": function(n) {
        return y(n).toString().substring(2)
      },
      "%G": function(n) {
        return y(n)
      },
      "%H": function(n) {
        return d(n.tm_hour, 2)
      },
      "%I": function(n) {
        var e = n.tm_hour;
        return 0 == e ? e = 12 : e > 12 && (e -= 12), d(e, 2)
      },
      "%j": function(n) {
        return d(n.tm_mday + tg(ig(n.tm_year + 1900) ? rg : ag, n.tm_mon - 1), 3)
      },
      "%m": function(n) {
        return d(n.tm_mon + 1, 2)
      },
      "%M": function(n) {
        return d(n.tm_min, 2)
      },
      "%n": function() {
        return "\n"
      },
      "%p": function(n) {
        return n.tm_hour >= 0 && n.tm_hour < 12 ? "AM" : "PM"
      },
      "%S": function(n) {
        return d(n.tm_sec, 2)
      },
      "%t": function() {
        return "\t"
      },
      "%u": function(n) {
        return n.tm_wday || 7
      },
      "%U": function(n) {
        var e = new Date(n.tm_year + 1900, 0, 1),
          i = 0 === e.getDay() ? e : og(e, 7 - e.getDay()),
          t = new Date(n.tm_year + 1900, n.tm_mon, n.tm_mday);
        if (p(i, t) < 0) {
          var r = tg(ig(t.getFullYear()) ? rg : ag, t.getMonth() - 1) - 31,
            a = 31 - i.getDate() + r + t.getDate();
          return d(Math.ceil(a / 7), 2)
        }
        return 0 === p(i, e) ? "01" : "00"
      },
      "%V": function(n) {
        var e, i = new Date(n.tm_year + 1900, 0, 4),
          t = new Date(n.tm_year + 1901, 0, 4),
          r = m(i),
          a = m(t),
          o = og(new Date(n.tm_year + 1900, 0, 1), n.tm_yday);
        return p(o, r) < 0 ? "53" : p(a, o) <= 0 ? "01" : (e = r.getFullYear() < n.tm_year + 1900 ? n.tm_yday + 32 - r.getDate() : n.tm_yday + 1 - r.getDate(), d(Math.ceil(e / 7), 2))
      },
      "%w": function(n) {
        return n.tm_wday
      },
      "%W": function(n) {
        var e = new Date(n.tm_year, 0, 1),
          i = 1 === e.getDay() ? e : og(e, 0 === e.getDay() ? 1 : 7 - e.getDay() + 1),
          t = new Date(n.tm_year + 1900, n.tm_mon, n.tm_mday);
        if (p(i, t) < 0) {
          var r = tg(ig(t.getFullYear()) ? rg : ag, t.getMonth() - 1) - 31,
            a = 31 - i.getDate() + r + t.getDate();
          return d(Math.ceil(a / 7), 2)
        }
        return 0 === p(i, e) ? "01" : "00"
      },
      "%y": function(n) {
        return (n.tm_year + 1900).toString().substring(2)
      },
      "%Y": function(n) {
        return n.tm_year + 1900
      },
      "%z": function(n) {
        var e = n.tm_gmtoff,
          i = e >= 0;
        return e = (e = Math.abs(e) / 60) / 60 * 100 + e % 60, (i ? "+" : "-") + String("0000" + e).slice(-4)
      },
      "%Z": function(n) {
        return n.tm_zone
      },
      "%%": function() {
        return "%"
      }
    };
    for (var u in v) o.includes(u) && (o = o.replace(new RegExp(u, "g"), v[u](a)));
    var _ = gg(o, !1);
    return _.length > e ? 0 : (cn(_, n), _.length - 1)
  }

  function ug(n) {
    var e = Date.now() / 1e3 | 0;
    return n && (Z[n >> 2] = e), e
  }

  function fg(n, e) {
    n = rn(n);
    try {
      return Xc.utime(n, e, e), 0
    } catch (n) {
      if (!(n instanceof Xc.ErrnoError)) throw n + " : " + Jn();
      return Rc(n.errno), -1
    }
  }

  function cg(n, e) {
    return fg(n, e ? 1e3 * Z[e + 4 >> 2] : Date.now())
  }
  var sg, dg = function(n, e, i, t) {
      n || (n = this), this.parent = n, this.mount = n.mount, this.mounted = null, this.id = Xc.nextInode++, this.name = e, this.mode = i, this.node_ops = {}, this.stream_ops = {}, this.rdev = t
    },
    pg = 365,
    mg = 146;
  Object.defineProperties(dg.prototype, {
    read: {
      get: function() {
        return (this.mode & pg) === pg
      },
      set: function(n) {
        n ? this.mode |= pg : this.mode &= ~pg
      }
    },
    write: {
      get: function() {
        return (this.mode & mg) === mg
      },
      set: function(n) {
        n ? this.mode |= mg : this.mode &= ~mg
      }
    },
    isFolder: {
      get: function() {
        return Xc.isDir(this.mode)
      }
    },
    isDevice: {
      get: function() {
        return Xc.isChrdev(this.mode)
      }
    }
  }), Xc.FSNode = dg, Xc.staticInit(), n.FS_createPath = Xc.createPath, n.FS_createDataFile = Xc.createDataFile, n.requestFullscreen = function(n, e) {
    cd.requestFullscreen(n, e)
  }, n.requestAnimationFrame = function(n) {
    cd.requestAnimationFrame(n)
  }, n.setCanvasSize = function(n, e, i) {
    cd.setCanvasSize(n, e, i)
  }, n.pauseMainLoop = function() {
    cd.mainLoop.pause()
  }, n.resumeMainLoop = function() {
    cd.mainLoop.resume()
  }, n.getUserMedia = function() {
    cd.getUserMedia()
  }, n.createContext = function(n, e, i, t) {
    return cd.createContext(n, e, i, t)
  };
  for (var yg = 0; yg < 32; ++yg) wy.push(new Array(yg));
  var vg = new Float32Array(288);
  for (yg = 0; yg < 288; ++yg) m_[yg] = vg.subarray(0, yg + 1);
  var _g = new Int32Array(288);
  for (yg = 0; yg < 288; ++yg) __[yg] = _g.subarray(0, yg + 1);

  function gg(n, e, i) {
    var t = i > 0 ? i : ln(n) + 1,
      r = new Array(t),
      a = an(n, r, 0, r.length);
    return e && (r.length = a), r
  }
  var hg, wg = {
      Ce: Zn,
      Be: Qn,
      Ae: $n,
      ze: ne,
      ye: ee,
      uq: te,
      tq: re,
      sq: ae,
      rq: oe,
      xe: le,
      qq: ue,
      we: fe,
      pq: ce,
      oq: se,
      ve: de,
      ue: pe,
      nq: me,
      te: ye,
      se: ve,
      mq: _e,
      lq: ge,
      kq: he,
      re: we,
      jq: Ee,
      Eb: Be,
      Db: Oe,
      qe: Ke,
      iq: Ne,
      pe: Ue,
      Cb: He,
      hq: Ye,
      gq: Je,
      fq: Qe,
      pa: $e,
      eq: ei,
      Bb: fi,
      Ab: si,
      dq: di,
      oe: mi,
      zb: _i,
      yb: gi,
      cq: hi,
      bq: wi,
      xb: ui,
      wb: ci,
      aq: Si,
      $p: Ci,
      _p: bi,
      vb: ki,
      ub: xi,
      ne: Xi,
      Zp: ji,
      Yp: Fi,
      Xp: Pi,
      ta: Oi,
      Wp: window.WXWASMSDK._JS_Sound_Create_Channel,
      Z: window.WXWASMSDK._JS_Sound_GetAudioBufferSampleRate,
      V: window.WXWASMSDK._JS_Sound_GetAudioContextSampleRate,
      Vp: window.WXWASMSDK._JS_Sound_GetData,
      ja: window.WXWASMSDK._JS_Sound_GetLength,
      Up: window.WXWASMSDK._JS_Sound_GetLoadState,
      Tp: (n, e) => window.WXWASMSDK._JS_Sound_GetMetaData(Q, n, e),
      Sp: window.WXWASMSDK._JS_Sound_Init,
      Rp: window.WXWASMSDK._JS_Sound_IsStopped,
      me: window.WXWASMSDK._JS_Sound_Load,
      le: window.WXWASMSDK._JS_Sound_Load_PCM,
      tb: window.WXWASMSDK._JS_Sound_Play,
      Ta: window.WXWASMSDK._JS_Sound_ReleaseInstance,
      ke: window.WXWASMSDK._JS_Sound_ResumeIfNeeded,
      Qp: window.WXWASMSDK._JS_Sound_Set3D,
      Pp: window.WXWASMSDK._JS_Sound_SetListenerOrientation,
      Op: window.WXWASMSDK._JS_Sound_SetListenerPosition,
      je: window.WXWASMSDK._JS_Sound_SetLoop,
      ie: window.WXWASMSDK._JS_Sound_SetLoopPoints,
      Sa: window.WXWASMSDK._JS_Sound_SetPaused,
      he: window.WXWASMSDK._JS_Sound_SetPitch,
      Np: window.WXWASMSDK._JS_Sound_SetPosition,
      Mp: window.WXWASMSDK._JS_Sound_SetVolume,
      Ra: window.WXWASMSDK._JS_Sound_Stop,
      ge: Ii,
      fe: Ki,
      Qa: Ni,
      ee: Ui,
      de: zi,
      ce: qi,
      be: Hi,
      sb: Vi,
      ae: Yi,
      $d: Ji,
      Lp: Zi,
      _d: Qi,
      Kp: $i,
      Zd: nt,
      Jp: et,
      Pa: it,
      Ip: tt,
      Hp: rt,
      Gp: n => window.WXWASMSDK._JS_Video_CanPlayFormat(n, {
        dynCall_vi: Yg,
        dynCall_vii: Ug,
        UTF8ToString: rn,
        GL: Gp,
        GLctx: sg
      }),
      Fp: window.WXWASMSDK._JS_Video_Create,
      Oa: window.WXWASMSDK._JS_Video_Destroy,
      Ep: window.WXWASMSDK._JS_Video_Duration,
      Dp: window.WXWASMSDK._JS_Video_EnableAudioTrack,
      Cp: window.WXWASMSDK._JS_Video_GetAudioLanguageCode,
      Bp: window.WXWASMSDK._JS_Video_GetNumAudioTracks,
      Ap: window.WXWASMSDK._JS_Video_Height,
      zp: window.WXWASMSDK._JS_Video_IsPlaying,
      yp: window.WXWASMSDK._JS_Video_IsReady,
      Yd: window.WXWASMSDK._JS_Video_Pause,
      xp: window.WXWASMSDK._JS_Video_Play,
      Xd: window.WXWASMSDK._JS_Video_Seek,
      wp: window.WXWASMSDK._JS_Video_SetEndedHandler,
      vp: window.WXWASMSDK._JS_Video_SetErrorHandler,
      up: window.WXWASMSDK._JS_Video_SetLoop,
      tp: window.WXWASMSDK._JS_Video_SetMute,
      sp: window.WXWASMSDK._JS_Video_SetPlaybackRate,
      rp: window.WXWASMSDK._JS_Video_SetReadyHandler,
      qp: window.WXWASMSDK._JS_Video_SetSeekedOnceHandler,
      pp: window.WXWASMSDK._JS_Video_SetVolume,
      op: window.WXWASMSDK._JS_Video_Time,
      np: window.WXWASMSDK._JS_Video_UpdateToTexture,
      mp: window.WXWASMSDK._JS_Video_Width,
      lp: ot,
      kp: lt,
      jp: ft,
      ip: ct,
      rb: st,
      hp: pt,
      gp: mt,
      fp: yt,
      ep: vt,
      dp: _t,
      cp: gt,
      bp: ht,
      ap: wt,
      Wd: St,
      Vd: Ct,
      Ud: Et,
      Td: Wt,
      Sd: bt,
      $o: At,
      _o: Dt,
      Rd: Mt,
      Qd: kt,
      Zo: xt,
      Yo: Xt,
      Xo: jt,
      Pd: Tt,
      Od: Lt,
      Wo: Ft,
      Vo: Pt,
      Uo: Rt,
      To: Bt,
      So: Gt,
      Ro: Ot,
      Qo: It,
      Po: Kt,
      Oo: Nt,
      No: Ut,
      Mo: zt,
      Lo: qt,
      Ko: Ht,
      Jo: Vt,
      Io: Yt,
      Ho: Jt,
      Go: Zt,
      Fo: Qt,
      Lf: $t,
      Nd: nr,
      Eo: er,
      Md: ir,
      Do: tr,
      Co: rr,
      Bo: ar,
      Ao: or,
      zo: lr,
      yo: ur,
      Ld: fr,
      xo: cr,
      wo: sr,
      vo: dr,
      uo: pr,
      to: mr,
      so: yr,
      ro: vr,
      qo: _r,
      po: gr,
      oo: hr,
      no: wr,
      mo: Sr,
      lo: Cr,
      ko: Er,
      jo: Wr,
      Kf: br,
      io: Ar,
      ho: Dr,
      go: Mr,
      fo: kr,
      eo: xr,
      co: Xr,
      bo: jr,
      ao: Tr,
      $n: Lr,
      _n: Fr,
      Kd: Pr,
      Jd: Rr,
      Id: Br,
      Hd: Gr,
      Zn: Or,
      Gd: Ir,
      qb: Kr,
      Fd: Nr,
      Yn: Ur,
      Ed: zr,
      Xn: qr,
      Wn: Hr,
      Vn: Vr,
      pb: Yr,
      Dd: Jr,
      Un: Zr,
      Cd: Qr,
      Bd: $r,
      Tn: na,
      Sn: ea,
      Ad: ia,
      zd: ta,
      Rn: ra,
      Qn: aa,
      Pn: oa,
      On: la,
      Nn: ua,
      Mn: fa,
      Ln: ca,
      Kn: sa,
      Jn: da,
      In: pa,
      Hn: ma,
      Gn: ya,
      Fn: va,
      En: _a,
      Dn: ga,
      Cn: ha,
      Bn: wa,
      An: Sa,
      zn: Ca,
      yn: Ea,
      xn: Wa,
      wn: ba,
      vn: Aa,
      yd: Da,
      xd: Ma,
      un: ka,
      tn: xa,
      sn: Xa,
      rn: ja,
      qn: Ta,
      pn: La,
      on: Fa,
      wd: Pa,
      vd: Ra,
      ud: Ba,
      nn: Ga,
      mn: Oa,
      ln: Ia,
      kn: Ka,
      td: Na,
      jn: Ua,
      hn: za,
      gn: qa,
      fn: Ha,
      en: Va,
      dn: Ya,
      cn: Ja,
      sd: Za,
      bn: Qa,
      an: $a,
      $m: no,
      _m: eo,
      Zm: io,
      rd: to,
      Ym: ro,
      Xm: ao,
      Wm: oo,
      Vm: lo,
      Um: uo,
      Tm: fo,
      Sm: co,
      Rm: so,
      Qm: po,
      Pm: mo,
      qd: yo,
      Om: vo,
      Nm: _o,
      Jf: go,
      Mm: ho,
      Lm: wo,
      Km: So,
      Jm: Co,
      Im: Eo,
      Hm: Wo,
      Gm: bo,
      Fm: Ao,
      Em: Do,
      Dm: Mo,
      Cm: ko,
      Bm: xo,
      Am: Xo,
      zm: jo,
      ym: To,
      xm: Lo,
      wm: Fo,
      vm: Po,
      um: Ro,
      tm: Bo,
      sm: Go,
      rm: Oo,
      qm: Io,
      pm: Ko,
      om: No,
      nm: Uo,
      mm: zo,
      lm: qo,
      km: Ho,
      jm: Vo,
      im: Yo,
      hm: Jo,
      gm: Zo,
      fm: Qo,
      em: $o,
      dm: nl,
      cm: el,
      bm: il,
      am: tl,
      $l: rl,
      _l: al,
      Zl: ol,
      Yl: ll,
      Xl: ul,
      Wl: fl,
      Vl: cl,
      Ul: sl,
      Tl: dl,
      Sl: pl,
      Rl: ml,
      Ql: yl,
      Pl: vl,
      Ol: _l,
      Nl: gl,
      Ml: hl,
      Ll: wl,
      Kl: Sl,
      Jl: Cl,
      Il: El,
      Hl: Wl,
      Gl: bl,
      Fl: Al,
      El: Dl,
      Dl: Ml,
      Cl: kl,
      Bl: xl,
      Al: Xl,
      zl: jl,
      yl: Tl,
      xl: Ll,
      wl: Fl,
      vl: Pl,
      ul: Rl,
      tl: Bl,
      sl: Gl,
      rl: Ol,
      ql: Il,
      pl: Kl,
      ol: Nl,
      nl: Ul,
      ml: zl,
      ll: ql,
      kl: Hl,
      jl: Vl,
      il: Yl,
      hl: Jl,
      gl: Zl,
      fl: Ql,
      el: $l,
      dl: nu,
      cl: eu,
      bl: iu,
      al: tu,
      pd: ru,
      od: au,
      nd: ou,
      $k: lu,
      md: uu,
      ld: fu,
      kd: cu,
      jd: su,
      id: du,
      hd: pu,
      gd: mu,
      fd: yu,
      ed: vu,
      _k: _u,
      dd: gu,
      cd: hu,
      Zk: wu,
      Yk: Su,
      bd: Cu,
      Xk: Eu,
      ad: Wu,
      $c: bu,
      Wk: Au,
      _c: Du,
      Vk: Mu,
      Uk: ku,
      Tk: xu,
      Sk: Xu,
      Rk: ju,
      Qk: Tu,
      Pk: Lu,
      Ok: Fu,
      Zc: Pu,
      Nk: Ru,
      Yc: Bu,
      Xc: Gu,
      Wc: Ou,
      Vc: Iu,
      Mk: Ku,
      Lk: Nu,
      Kk: Uu,
      Jk: zu,
      Ik: qu,
      Hk: Hu,
      Gk: Vu,
      Fk: Yu,
      Ek: Ju,
      Dk: Zu,
      Ck: Qu,
      Bk: $u,
      Ak: nf,
      zk: ef,
      yk: tf,
      xk: rf,
      wk: af,
      vk: of,
      uk: lf,
      tk: uf,
      sk: ff,
      rk: cf,
      Uc: sf,
      Tc: df,
      qk: pf,
      pk: mf,
      ok: yf,
      nk: vf,
      mk: _f,
      lk: gf,
      kk: hf,
      jk: wf,
      ik: Sf,
      hk: Cf,
      gk: Ef,
      fk: Wf,
      ek: bf,
      dk: Af,
      ck: Df,
      bk: Mf,
      ak: kf,
      $j: xf,
      _j: Xf,
      Zj: jf,
      Yj: Tf,
      Xj: Lf,
      Wj: Ff,
      Vj: Pf,
      Uj: Rf,
      Tj: Bf,
      Sj: Gf,
      Rj: Of,
      Qj: If,
      Pj: Kf,
      Oj: Nf,
      Nj: Uf,
      Mj: zf,
      Lj: qf,
      Kj: Hf,
      Jj: Vf,
      Ij: Yf,
      Hj: Jf,
      Gj: Zf,
      Fj: Qf,
      Ej: $f,
      Dj: nc,
      Cj: ec,
      o: tc,
      h: uc,
      p: dc,
      i: mc,
      a: yc,
      Bj: vc,
      ob: cc,
      Aj: _c,
      oa: gc,
      zj: wc,
      yj: Ec,
      k: pc,
      vj: Tc,
      ej: Nc,
      ij: Uc,
      hj: Yc,
      Sc: Jc,
      gj: Zc,
      Si: Qc,
      Mi: $c,
      U: ns,
      oj: es,
      qj: is,
      tj: ts,
      lj: rs,
      Pc: as,
      Qc: os,
      aj: ls,
      mj: us,
      Ri: fs,
      bj: cs,
      dj: ss,
      nj: ds,
      Nc: ps,
      Oi: ms,
      fj: ys,
      pj: vs,
      Vi: _s,
      sj: hs,
      Ni: Ss,
      nb: Cs,
      Ti: Ws,
      uj: bs,
      Pi: As,
      Zi: Ds,
      Yi: Ms,
      Wi: ks,
      Ui: xs,
      _i: Xs,
      $i: js,
      cj: Ts,
      Xi: Ls,
      Oc: Fs,
      Rc: Ps,
      kj: Rs,
      Qi: Bs,
      rj: Gs,
      wj: Os,
      xj: Is,
      jj: Ks,
      x: Ns,
      R: Us,
      Ii: Vs,
      Kc: Ys,
      Hi: Js,
      Gi: Zs,
      Na: Qs,
      Jc: $s,
      Fi: nd,
      lb: rd,
      Ei: sd,
      Di: dd,
      Ci: Dd,
      Bi: kd,
      Ai: gd,
      zi: Xd,
      Ic: Td,
      yi: Ld,
      M: qs,
      Hc: Fd,
      xi: Pd,
      wi: Rd,
      G: Hd,
      E: Yd,
      vi: Jd,
      ui: Qd,
      ti: $d,
      si: ep,
      Gc: ip,
      Fc: rp,
      kb: wd,
      ri: ap,
      qi: lp,
      Ec: fp,
      Dc: cp,
      pi: sp,
      Ma: pp,
      La: mp,
      Ka: yp,
      oi: vp,
      ni: ad,
      Cc: hp,
      Bc: wp,
      Ac: Sp,
      mi: Wp,
      zc: Ap,
      yc: Dp,
      xc: Mp,
      wc: kp,
      vc: Xp,
      li: jp,
      ki: Kp,
      ji: qp,
      Ja: Hp,
      ii: Up,
      hi: Vp,
      Ia: zp,
      Li: Qp,
      Ki: $p,
      A: od,
      ia: nm,
      Mc: em,
      Lc: im,
      If: tm,
      Ji: rm,
      mb: am,
      Ha: om,
      b: lm,
      gi: um,
      fi: cm,
      ei: sm,
      uc: dm,
      di: pm,
      Ga: mm,
      ci: ym,
      bi: vm,
      tc: _m,
      ai: gm,
      Fa: hm,
      $h: wm,
      _h: Sm,
      Zh: Cm,
      Yh: Em,
      Xh: Wm,
      Wh: bm,
      Vh: Am,
      Uh: Dm,
      Th: Mm,
      sc: km,
      rc: xm,
      qc: Xm,
      Sh: jm,
      Rh: Tm,
      Qh: Lm,
      Ph: Fm,
      Oh: Pm,
      Nh: Rm,
      Mh: Bm,
      Lh: Gm,
      Kh: Om,
      Jh: Im,
      Ih: Km,
      Hf: Nm,
      jb: Um,
      Hh: zm,
      Gh: qm,
      Fh: Hm,
      Eh: Vm,
      Dh: Ym,
      Ch: Jm,
      Bh: Zm,
      pc: Qm,
      Ah: $m,
      zh: ny,
      yh: ey,
      xh: iy,
      wh: ty,
      vh: ry,
      ib: ay,
      uh: oy,
      th: ly,
      sh: uy,
      oc: fy,
      rh: cy,
      qh: sy,
      ph: dy,
      Ea: py,
      Da: my,
      oh: yy,
      nh: vy,
      mh: _y,
      lh: gy,
      kh: hy,
      jh: Sy,
      ih: Cy,
      hh: Ey,
      gh: Wy,
      fh: by,
      nc: Ay,
      eh: Dy,
      mc: My,
      dh: ky,
      lc: xy,
      ch: Ty,
      Y: Ly,
      S: Fy,
      Ca: Py,
      Ba: Ry,
      bh: Gy,
      ah: Oy,
      kc: Iy,
      $g: Ky,
      _g: Ny,
      Zg: Uy,
      Yg: zy,
      Xg: qy,
      Wg: Hy,
      Vg: Yy,
      hb: Jy,
      gb: Zy,
      na: Qy,
      ma: $y,
      Ug: nv,
      Tg: ev,
      Sg: iv,
      Rg: tv,
      Qg: ov,
      Aa: uv,
      Pg: fv,
      jc: cv,
      Og: sv,
      ca: dv,
      Ng: pv,
      Mg: mv,
      Lg: yv,
      Kg: vv,
      ic: _v,
      Jg: gv,
      Ig: hv,
      Hg: wv,
      Gg: Sv,
      Fg: Cv,
      Eg: Ev,
      fb: Wv,
      sa: bv,
      hc: Mv,
      Dg: xv,
      eb: Xv,
      Cg: jv,
      Bg: Tv,
      Ag: Lv,
      zg: Fv,
      yg: Pv,
      gc: Rv,
      fc: Bv,
      xg: Gv,
      wg: Ov,
      la: qv,
      vg: Hv,
      ug: Vv,
      tg: Yv,
      db: Jv,
      sg: n_,
      rg: e_,
      qg: i_,
      pg: t_,
      og: r_,
      ng: a_,
      mg: o_,
      cb: l_,
      lg: u_,
      kg: f_,
      jg: c_,
      ig: s_,
      hg: d_,
      gg: p_,
      ec: y_,
      za: v_,
      dc: g_,
      cc: h_,
      bc: w_,
      ac: S_,
      $b: C_,
      bb: E_,
      _b: W_,
      Zb: b_,
      ka: A_,
      Yb: D_,
      Xb: M_,
      ab: k_,
      Wb: x_,
      ya: X_,
      fg: j_,
      eg: L_,
      dg: F_,
      cg: P_,
      bg: R_,
      ag: B_,
      $f: G_,
      $a: O_,
      Vb: ZS,
      _f: WC,
      L: PS,
      Q: gS,
      ha: BS,
      Gf: uE,
      Ub: kC,
      ba: VS,
      N: nC,
      F: GS,
      z: cC,
      O: _S,
      B: RS,
      w: WS,
      ra: qS,
      aa: zS,
      d: CS,
      Zf: YS,
      xa: oC,
      Tb: JS,
      c: sS,
      _a: DC,
      $: pC,
      wa: yC,
      Sb: wC,
      e: mS,
      qa: tC,
      Yf: CC,
      Rb: hC,
      va: iC,
      q: vS,
      Za: mC,
      s: dS,
      K: dC,
      v: DS,
      D: bS,
      J: jS,
      P: QS,
      Qb: MS,
      Ff: gE,
      Ef: IC,
      Df: UC,
      Cf: LC,
      Bf: wE,
      Af: dE,
      zf: RC,
      yf: PC,
      xf: nE,
      wf: NC,
      vf: qC,
      uf: VC,
      tf: mE,
      sf: HC,
      rf: KC,
      qf: eE,
      pf: AE,
      of: FC,
      nf: fE,
      mf: GC,
      lf: BC,
      kf: $C,
      jf: TC,
      hf: kE,
      gf: JC,
      ff: ZC,
      ef: cE,
      df: CE,
      cf: _E,
      bf: oE,
      af: lE,
      $e: YC,
      g: ES,
      l: wS,
      Xf: jC,
      y: OS,
      Pb: uC,
      Ya: AC,
      Wf: $S,
      H: IS,
      Vf: vC,
      m: pS,
      Uf: fC,
      Tf: NS,
      Sf: lC,
      fa: hS,
      X: US,
      Rf: TS,
      T: KS,
      Xa: sC,
      f: SS,
      ga: EC,
      Ob: rC,
      Qf: bC,
      _: eC,
      n: yS,
      Pf: XC,
      Of: xC,
      Nb: MC,
      Mb: aC,
      Nf: _C,
      ea: gC,
      r: AS,
      t: XS,
      C: kS,
      Mf: SC,
      I: FS,
      W: LS,
      ua: xS,
      Lb: HS,
      _e: pE,
      Ze: SE,
      Ye: rE,
      Xe: vE,
      We: sE,
      Ve: aE,
      Ue: tE,
      Te: OC,
      Se: EE,
      Re: QC,
      Qe: iE,
      Pe: zC,
      Oe: WE,
      Ne: DE,
      Me: yE,
      Le: hE,
      Ke: ME,
      Je: bE,
      j: I_,
      Kb: K_,
      Ie: N_,
      He: U_,
      Ge: z_,
      Jb: q_,
      Ib: H_,
      Fe: V_,
      Hb: Y_,
      Gb: J_,
      Ee: Z_,
      De: Q_,
      u: $_,
      Wa: ng,
      Va: eg,
      Ua: lg,
      da: ug,
      Fb: cg
    },
    Sg = (In(), n.___wasm_call_ctors = function() {
      return (n.___wasm_call_ctors = n.asm.wq).apply(null, arguments)
    }, n._ReleaseKeys = function() {
      return (Sg = n._ReleaseKeys = n.asm.xq).apply(null, arguments)
    }),
    Cg = n._SendMessageFloat = function() {
      return (Cg = n._SendMessageFloat = n.asm.yq).apply(null, arguments)
    },
    Eg = n._SendMessageString = function() {
      return (Eg = n._SendMessageString = n.asm.zq).apply(null, arguments)
    },
    Wg = n._SendMessage = function() {
      return (Wg = n._SendMessage = n.asm.Aq).apply(null, arguments)
    },
    bg = (n._SetFullscreen = function() {
      return (n._SetFullscreen = n.asm.Bq).apply(null, arguments)
    }, n._main = function() {
      return (n._main = n.asm.Cq).apply(null, arguments)
    }, n.___errno_location = function() {
      return (bg = n.___errno_location = n.asm.Dq).apply(null, arguments)
    }),
    Ag = n._htonl = function() {
      return (Ag = n._htonl = n.asm.Eq).apply(null, arguments)
    },
    Dg = n._htons = function() {
      return (Dg = n._htons = n.asm.Fq).apply(null, arguments)
    },
    Mg = n._ntohs = function() {
      return (Mg = n._ntohs = n.asm.Gq).apply(null, arguments)
    },
    kg = n.__get_tzname = function() {
      return (kg = n.__get_tzname = n.asm.Hq).apply(null, arguments)
    },
    xg = n.__get_daylight = function() {
      return (xg = n.__get_daylight = n.asm.Iq).apply(null, arguments)
    },
    Xg = n.__get_timezone = function() {
      return (Xg = n.__get_timezone = n.asm.Jq).apply(null, arguments)
    },
    jg = n.stackSave = function() {
      return (jg = n.stackSave = n.asm.Kq).apply(null, arguments)
    },
    Tg = n.stackRestore = function() {
      return (Tg = n.stackRestore = n.asm.Lq).apply(null, arguments)
    },
    Lg = n.stackAlloc = function() {
      return (Lg = n.stackAlloc = n.asm.Mq).apply(null, arguments)
    },
    Fg = (n._emscripten_stack_get_base = function() {
      return (n._emscripten_stack_get_base = n.asm.Nq).apply(null, arguments)
    }, n._emscripten_stack_get_end = function() {
      return (n._emscripten_stack_get_end = n.asm.Oq).apply(null, arguments)
    }, n._setThrew = function() {
      return (Fg = n._setThrew = n.asm.Pq).apply(null, arguments)
    }),
    Pg = n.___cxa_can_catch = function() {
      return (Pg = n.___cxa_can_catch = n.asm.Qq).apply(null, arguments)
    },
    Rg = n.___cxa_is_pointer_type = function() {
      return (Rg = n.___cxa_is_pointer_type = n.asm.Rq).apply(null, arguments)
    },
    Bg = n._malloc = function() {
      return (Bg = n._malloc = n.asm.Sq).apply(null, arguments)
    },
    Gg = n._free = function() {
      return (Gg = n._free = n.asm.Tq).apply(null, arguments)
    },
    Og = n._memalign = function() {
      return (Og = n._memalign = n.asm.Uq).apply(null, arguments)
    },
    Ig = n._sbrk = function() {
      return (Ig = n._sbrk = n.asm.Vq).apply(null, arguments)
    },
    Kg = n._memset = function() {
      return (Kg = n._memset = n.asm.Wq).apply(null, arguments)
    },
    Ng = n._strlen = function() {
      return (Ng = n._strlen = n.asm.Xq).apply(null, arguments)
    },
    Ug = (n.dynCall_iidiiii = function() {
      return (n.dynCall_iidiiii = n.asm.Zq).apply(null, arguments)
    }, n.dynCall_vii = function() {
      return (Ug = n.dynCall_vii = n.asm._q).apply(null, arguments)
    }),
    zg = n.dynCall_iii = function() {
      return (zg = n.dynCall_iii = n.asm.$q).apply(null, arguments)
    },
    qg = n.dynCall_ii = function() {
      return (qg = n.dynCall_ii = n.asm.ar).apply(null, arguments)
    },
    Hg = n.dynCall_iiii = function() {
      return (Hg = n.dynCall_iiii = n.asm.br).apply(null, arguments)
    },
    Vg = n.dynCall_jiji = function() {
      return (Vg = n.dynCall_jiji = n.asm.cr).apply(null, arguments)
    },
    Yg = n.dynCall_vi = function() {
      return (Yg = n.dynCall_vi = n.asm.dr).apply(null, arguments)
    },
    Jg = n.dynCall_iiiii = function() {
      return (Jg = n.dynCall_iiiii = n.asm.er).apply(null, arguments)
    },
    Zg = n.dynCall_viii = function() {
      return (Zg = n.dynCall_viii = n.asm.fr).apply(null, arguments)
    },
    Qg = n.dynCall_i = function() {
      return (Qg = n.dynCall_i = n.asm.gr).apply(null, arguments)
    },
    $g = n.dynCall_v = function() {
      return ($g = n.dynCall_v = n.asm.hr).apply(null, arguments)
    },
    nh = n.dynCall_iiiiii = function() {
      return (nh = n.dynCall_iiiiii = n.asm.ir).apply(null, arguments)
    },
    eh = n.dynCall_viiii = function() {
      return (eh = n.dynCall_viiii = n.asm.jr).apply(null, arguments)
    },
    ih = n.dynCall_iiij = function() {
      return (ih = n.dynCall_iiij = n.asm.kr).apply(null, arguments)
    },
    th = n.dynCall_iiiiiiii = function() {
      return (th = n.dynCall_iiiiiiii = n.asm.lr).apply(null, arguments)
    },
    rh = n.dynCall_iiijiii = function() {
      return (rh = n.dynCall_iiijiii = n.asm.mr).apply(null, arguments)
    },
    ah = n.dynCall_iij = function() {
      return (ah = n.dynCall_iij = n.asm.nr).apply(null, arguments)
    },
    oh = n.dynCall_viiiii = function() {
      return (oh = n.dynCall_viiiii = n.asm.or).apply(null, arguments)
    },
    lh = n.dynCall_iiiiiii = function() {
      return (lh = n.dynCall_iiiiiii = n.asm.pr).apply(null, arguments)
    },
    uh = n.dynCall_jii = function() {
      return (uh = n.dynCall_jii = n.asm.qr).apply(null, arguments)
    },
    fh = n.dynCall_iji = function() {
      return (fh = n.dynCall_iji = n.asm.rr).apply(null, arguments)
    },
    ch = n.dynCall_viiffi = function() {
      return (ch = n.dynCall_viiffi = n.asm.sr).apply(null, arguments)
    },
    sh = n.dynCall_viiiiiiiii = function() {
      return (sh = n.dynCall_viiiiiiiii = n.asm.tr).apply(null, arguments)
    },
    dh = n.dynCall_viiiiii = function() {
      return (dh = n.dynCall_viiiiii = n.asm.ur).apply(null, arguments)
    },
    ph = n.dynCall_jiiiiiiiiii = function() {
      return (ph = n.dynCall_jiiiiiiiiii = n.asm.vr).apply(null, arguments)
    },
    mh = n.dynCall_jiii = function() {
      return (mh = n.dynCall_jiii = n.asm.wr).apply(null, arguments)
    },
    yh = n.dynCall_iiji = function() {
      return (yh = n.dynCall_iiji = n.asm.xr).apply(null, arguments)
    },
    vh = n.dynCall_jiiji = function() {
      return (vh = n.dynCall_jiiji = n.asm.yr).apply(null, arguments)
    },
    _h = n.dynCall_ji = function() {
      return (_h = n.dynCall_ji = n.asm.zr).apply(null, arguments)
    },
    gh = n.dynCall_jjji = function() {
      return (gh = n.dynCall_jjji = n.asm.Ar).apply(null, arguments)
    },
    hh = n.dynCall_dii = function() {
      return (hh = n.dynCall_dii = n.asm.Br).apply(null, arguments)
    },
    wh = n.dynCall_viijiiijiiii = function() {
      return (wh = n.dynCall_viijiiijiiii = n.asm.Cr).apply(null, arguments)
    },
    Sh = n.dynCall_viiiiiii = function() {
      return (Sh = n.dynCall_viiiiiii = n.asm.Dr).apply(null, arguments)
    },
    Ch = n.dynCall_ijji = function() {
      return (Ch = n.dynCall_ijji = n.asm.Er).apply(null, arguments)
    },
    Eh = n.dynCall_iiiiiiiii = function() {
      return (Eh = n.dynCall_iiiiiiiii = n.asm.Fr).apply(null, arguments)
    },
    Wh = n.dynCall_jiiii = function() {
      return (Wh = n.dynCall_jiiii = n.asm.Gr).apply(null, arguments)
    },
    bh = n.dynCall_fiiii = function() {
      return (bh = n.dynCall_fiiii = n.asm.Hr).apply(null, arguments)
    },
    Ah = n.dynCall_diiii = function() {
      return (Ah = n.dynCall_diiii = n.asm.Ir).apply(null, arguments)
    },
    Dh = n.dynCall_diii = function() {
      return (Dh = n.dynCall_diii = n.asm.Jr).apply(null, arguments)
    },
    Mh = n.dynCall_fiii = function() {
      return (Mh = n.dynCall_fiii = n.asm.Kr).apply(null, arguments)
    },
    kh = n.dynCall_fii = function() {
      return (kh = n.dynCall_fii = n.asm.Lr).apply(null, arguments)
    },
    xh = n.dynCall_vidi = function() {
      return (xh = n.dynCall_vidi = n.asm.Mr).apply(null, arguments)
    },
    Xh = n.dynCall_vifi = function() {
      return (Xh = n.dynCall_vifi = n.asm.Nr).apply(null, arguments)
    },
    jh = n.dynCall_viji = function() {
      return (jh = n.dynCall_viji = n.asm.Or).apply(null, arguments)
    },
    Th = n.dynCall_viiji = function() {
      return (Th = n.dynCall_viiji = n.asm.Pr).apply(null, arguments)
    },
    Lh = n.dynCall_viifi = function() {
      return (Lh = n.dynCall_viifi = n.asm.Qr).apply(null, arguments)
    },
    Fh = n.dynCall_viidi = function() {
      return (Fh = n.dynCall_viidi = n.asm.Rr).apply(null, arguments)
    },
    Ph = n.dynCall_viiff = function() {
      return (Ph = n.dynCall_viiff = n.asm.Sr).apply(null, arguments)
    },
    Rh = n.dynCall_viiij = function() {
      return (Rh = n.dynCall_viiij = n.asm.Tr).apply(null, arguments)
    },
    Bh = n.dynCall_viij = function() {
      return (Bh = n.dynCall_viij = n.asm.Ur).apply(null, arguments)
    },
    Gh = n.dynCall_ifi = function() {
      return (Gh = n.dynCall_ifi = n.asm.Vr).apply(null, arguments)
    },
    Oh = n.dynCall_idi = function() {
      return (Oh = n.dynCall_idi = n.asm.Wr).apply(null, arguments)
    },
    Ih = n.dynCall_viiiiiiii = function() {
      return (Ih = n.dynCall_viiiiiiii = n.asm.Xr).apply(null, arguments)
    },
    Kh = n.dynCall_viiiiiiiiiiii = function() {
      return (Kh = n.dynCall_viiiiiiiiiiii = n.asm.Yr).apply(null, arguments)
    },
    Nh = (n.dynCall_iiiiji = function() {
      return (n.dynCall_iiiiji = n.asm.Zr).apply(null, arguments)
    }, n.dynCall_viiiiiiiiiiiii = function() {
      return (n.dynCall_viiiiiiiiiiiii = n.asm._r).apply(null, arguments)
    }, n.dynCall_fffi = function() {
      return (Nh = n.dynCall_fffi = n.asm.$r).apply(null, arguments)
    }),
    Uh = n.dynCall_jji = function() {
      return (Uh = n.dynCall_jji = n.asm.as).apply(null, arguments)
    },
    zh = n.dynCall_iidi = function() {
      return (zh = n.dynCall_iidi = n.asm.bs).apply(null, arguments)
    },
    qh = n.dynCall_iifi = function() {
      return (qh = n.dynCall_iifi = n.asm.cs).apply(null, arguments)
    },
    Hh = n.dynCall_viiiiiiiiii = function() {
      return (Hh = n.dynCall_viiiiiiiiii = n.asm.ds).apply(null, arguments)
    },
    Vh = n.dynCall_dddi = function() {
      return (Vh = n.dynCall_dddi = n.asm.es).apply(null, arguments)
    },
    Yh = n.dynCall_iiiiiiiiii = function() {
      return (Yh = n.dynCall_iiiiiiiiii = n.asm.fs).apply(null, arguments)
    },
    Jh = n.dynCall_jjii = function() {
      return (Jh = n.dynCall_jjii = n.asm.gs).apply(null, arguments)
    },
    Zh = n.dynCall_dji = function() {
      return (Zh = n.dynCall_dji = n.asm.hs).apply(null, arguments)
    },
    Qh = n.dynCall_viffi = function() {
      return (Qh = n.dynCall_viffi = n.asm.is).apply(null, arguments)
    },
    $h = (n.dynCall_fiffffi = function() {
      return (n.dynCall_fiffffi = n.asm.js).apply(null, arguments)
    }, n.dynCall_fi = function() {
      return ($h = n.dynCall_fi = n.asm.ks).apply(null, arguments)
    }),
    nw = n.dynCall_viiifi = function() {
      return (nw = n.dynCall_viiifi = n.asm.ls).apply(null, arguments)
    },
    ew = (n.dynCall_viiffifiiifiifi = function() {
      return (n.dynCall_viiffifiiifiifi = n.asm.ms).apply(null, arguments)
    }, n.dynCall_viffffi = function() {
      return (n.dynCall_viffffi = n.asm.ns).apply(null, arguments)
    }, n.dynCall_vifii = function() {
      return (ew = n.dynCall_vifii = n.asm.os).apply(null, arguments)
    }),
    iw = n.dynCall_iiiifii = function() {
      return (iw = n.dynCall_iiiifii = n.asm.ps).apply(null, arguments)
    },
    tw = n.dynCall_iiiif = function() {
      return (tw = n.dynCall_iiiif = n.asm.qs).apply(null, arguments)
    },
    rw = n.dynCall_viiiff = function() {
      return (rw = n.dynCall_viiiff = n.asm.rs).apply(null, arguments)
    },
    aw = n.dynCall_jdi = function() {
      return (aw = n.dynCall_jdi = n.asm.ss).apply(null, arguments)
    },
    ow = n.dynCall_vijii = function() {
      return (ow = n.dynCall_vijii = n.asm.ts).apply(null, arguments)
    },
    lw = n.dynCall_viiijii = function() {
      return (lw = n.dynCall_viiijii = n.asm.us).apply(null, arguments)
    },
    uw = n.dynCall_iiffii = function() {
      return (uw = n.dynCall_iiffii = n.asm.vs).apply(null, arguments)
    },
    fw = n.dynCall_viiiifi = function() {
      return (fw = n.dynCall_viiiifi = n.asm.ws).apply(null, arguments)
    },
    cw = n.dynCall_viidii = function() {
      return (cw = n.dynCall_viidii = n.asm.xs).apply(null, arguments)
    },
    sw = n.dynCall_vidiii = function() {
      return (sw = n.dynCall_vidiii = n.asm.ys).apply(null, arguments)
    },
    dw = n.dynCall_viiddi = function() {
      return (dw = n.dynCall_viiddi = n.asm.zs).apply(null, arguments)
    },
    pw = n.dynCall_iiijii = function() {
      return (pw = n.dynCall_iiijii = n.asm.As).apply(null, arguments)
    },
    mw = n.dynCall_fiifi = function() {
      return (mw = n.dynCall_fiifi = n.asm.Bs).apply(null, arguments)
    },
    yw = n.dynCall_viifii = function() {
      return (yw = n.dynCall_viifii = n.asm.Cs).apply(null, arguments)
    },
    vw = (n.dynCall_viifffffi = function() {
      return (n.dynCall_viifffffi = n.asm.Ds).apply(null, arguments)
    }, n.dynCall_iiiiiifffffi = function() {
      return (vw = n.dynCall_iiiiiifffffi = n.asm.Es).apply(null, arguments)
    }),
    _w = (n.dynCall_viiffffi = function() {
      return (n.dynCall_viiffffi = n.asm.Fs).apply(null, arguments)
    }, n.dynCall_iiiffi = function() {
      return (_w = n.dynCall_iiiffi = n.asm.Gs).apply(null, arguments)
    }),
    gw = (n.dynCall_viiffffffffi = function() {
      return (n.dynCall_viiffffffffi = n.asm.Hs).apply(null, arguments)
    }, n.dynCall_viifffffffi = function() {
      return (n.dynCall_viifffffffi = n.asm.Is).apply(null, arguments)
    }, n.dynCall_iiiiiffi = function() {
      return (gw = n.dynCall_iiiiiffi = n.asm.Js).apply(null, arguments)
    }),
    hw = (n.dynCall_viifffiiii = function() {
      return (n.dynCall_viifffiiii = n.asm.Ks).apply(null, arguments)
    }, n.dynCall_iiifi = function() {
      return (hw = n.dynCall_iiifi = n.asm.Ls).apply(null, arguments)
    }),
    ww = (n.dynCall_viifiifi = function() {
      return (n.dynCall_viifiifi = n.asm.Ms).apply(null, arguments)
    }, n.dynCall_viiifffii = function() {
      return (n.dynCall_viiifffii = n.asm.Ns).apply(null, arguments)
    }, n.dynCall_viiiifii = function() {
      return (ww = n.dynCall_viiiifii = n.asm.Os).apply(null, arguments)
    }),
    Sw = n.dynCall_viiiifiii = function() {
      return (Sw = n.dynCall_viiiifiii = n.asm.Ps).apply(null, arguments)
    },
    Cw = n.dynCall_viiiij = function() {
      return (Cw = n.dynCall_viiiij = n.asm.Qs).apply(null, arguments)
    },
    Ew = n.dynCall_iijji = function() {
      return (Ew = n.dynCall_iijji = n.asm.Rs).apply(null, arguments)
    },
    Ww = n.dynCall_iiiifi = function() {
      return (Ww = n.dynCall_iiiifi = n.asm.Ss).apply(null, arguments)
    },
    bw = n.dynCall_iiifii = function() {
      return (bw = n.dynCall_iiifii = n.asm.Ts).apply(null, arguments)
    },
    Aw = n.dynCall_iiiiij = function() {
      return (Aw = n.dynCall_iiiiij = n.asm.Us).apply(null, arguments)
    },
    Dw = n.dynCall_vijjji = function() {
      return (Dw = n.dynCall_vijjji = n.asm.Vs).apply(null, arguments)
    },
    Mw = (n.dynCall_viiiiiiiiiii = function() {
      return (n.dynCall_viiiiiiiiiii = n.asm.Ws).apply(null, arguments)
    }, n.dynCall_iijiiii = function() {
      return (n.dynCall_iijiiii = n.asm.Xs).apply(null, arguments)
    }, n.dynCall_jijiii = function() {
      return (Mw = n.dynCall_jijiii = n.asm.Ys).apply(null, arguments)
    }),
    kw = n.dynCall_viijii = function() {
      return (kw = n.dynCall_viijii = n.asm.Zs).apply(null, arguments)
    },
    xw = n.dynCall_iijiiiiii = function() {
      return (xw = n.dynCall_iijiiiiii = n.asm._s).apply(null, arguments)
    },
    Xw = n.dynCall_iijjiiiiii = function() {
      return (Xw = n.dynCall_iijjiiiiii = n.asm.$s).apply(null, arguments)
    },
    jw = n.dynCall_iiiijjii = function() {
      return (jw = n.dynCall_iiiijjii = n.asm.at).apply(null, arguments)
    },
    Tw = n.dynCall_iijii = function() {
      return (Tw = n.dynCall_iijii = n.asm.bt).apply(null, arguments)
    },
    Lw = n.dynCall_iijiii = function() {
      return (Lw = n.dynCall_iijiii = n.asm.ct).apply(null, arguments)
    },
    Fw = n.dynCall_viiiji = function() {
      return (Fw = n.dynCall_viiiji = n.asm.dt).apply(null, arguments)
    },
    Pw = n.dynCall_viiiiiiifiifiii = function() {
      return (Pw = n.dynCall_viiiiiiifiifiii = n.asm.et).apply(null, arguments)
    },
    Rw = n.dynCall_j = function() {
      return (Rw = n.dynCall_j = n.asm.ft).apply(null, arguments)
    },
    Bw = n.dynCall_jijj = function() {
      return (Bw = n.dynCall_jijj = n.asm.gt).apply(null, arguments)
    },
    Gw = n.dynCall_iiiiiiiiiji = function() {
      return (Gw = n.dynCall_iiiiiiiiiji = n.asm.ht).apply(null, arguments)
    },
    Ow = n.dynCall_vji = function() {
      return (Ow = n.dynCall_vji = n.asm.it).apply(null, arguments)
    },
    Iw = (n.dynCall_viiijji = function() {
      return (n.dynCall_viiijji = n.asm.jt).apply(null, arguments)
    }, n.dynCall_iiiji = function() {
      return (Iw = n.dynCall_iiiji = n.asm.kt).apply(null, arguments)
    }),
    Kw = n.dynCall_iiiifffi = function() {
      return (Kw = n.dynCall_iiiifffi = n.asm.lt).apply(null, arguments)
    },
    Nw = (n.dynCall_viiiiiiiiiiiiii = function() {
      return (n.dynCall_viiiiiiiiiiiiii = n.asm.mt).apply(null, arguments)
    }, n.dynCall_viiiiiiiiiiiiiii = function() {
      return (n.dynCall_viiiiiiiiiiiiiii = n.asm.nt).apply(null, arguments)
    }, n.dynCall_viiiiiiiiiiiiiiii = function() {
      return (n.dynCall_viiiiiiiiiiiiiiii = n.asm.ot).apply(null, arguments)
    }, n.dynCall_viiiiiiiiiiiiiiiii = function() {
      return (n.dynCall_viiiiiiiiiiiiiiiii = n.asm.pt).apply(null, arguments)
    }, n.dynCall_viiiiiiiiiiiiiiiiii = function() {
      return (n.dynCall_viiiiiiiiiiiiiiiiii = n.asm.qt).apply(null, arguments)
    }, n.dynCall_fifi = function() {
      return (n.dynCall_fifi = n.asm.rt).apply(null, arguments)
    }, n.dynCall_viiiifiiii = function() {
      return (n.dynCall_viiiifiiii = n.asm.st).apply(null, arguments)
    }, n.dynCall_ffffffi = function() {
      return (n.dynCall_ffffffi = n.asm.tt).apply(null, arguments)
    }, n.dynCall_viif = function() {
      return (Nw = n.dynCall_viif = n.asm.ut).apply(null, arguments)
    }),
    Uw = (n.dynCall_viiiffii = function() {
      return (n.dynCall_viiiffii = n.asm.vt).apply(null, arguments)
    }, n.dynCall_viifffifiiiiiiii = function() {
      return (n.dynCall_viifffifiiiiiiii = n.asm.wt).apply(null, arguments)
    }, n.dynCall_viifffiffifiiiiiiii = function() {
      return (n.dynCall_viifffiffifiiiiiiii = n.asm.xt).apply(null, arguments)
    }, n.dynCall_viifffiiiiiii = function() {
      return (n.dynCall_viifffiiiiiii = n.asm.yt).apply(null, arguments)
    }, n.dynCall_viffffffiiii = function() {
      return (n.dynCall_viffffffiiii = n.asm.zt).apply(null, arguments)
    }, n.dynCall_viiifii = function() {
      return (n.dynCall_viiifii = n.asm.At).apply(null, arguments)
    }, n.dynCall_viiffiiiii = function() {
      return (n.dynCall_viiffiiiii = n.asm.Bt).apply(null, arguments)
    }, n.dynCall_vifiiiiffiffifffiiiifii = function() {
      return (n.dynCall_vifiiiiffiffifffiiiifii = n.asm.Ct).apply(null, arguments)
    }, n.dynCall_vifiiiiiiiiiiifiiiifiiiiiii = function() {
      return (n.dynCall_vifiiiiiiiiiiifiiiifiiiiiii = n.asm.Dt).apply(null, arguments)
    }, n.dynCall_vifffiiiiiiiiiiiifiiiifiiiiiiii = function() {
      return (n.dynCall_vifffiiiiiiiiiiiifiiiifiiiiiiii = n.asm.Et).apply(null, arguments)
    }, n.dynCall_vifiiiifiiiifii = function() {
      return (n.dynCall_vifiiiifiiiifii = n.asm.Ft).apply(null, arguments)
    }, n.dynCall_viiif = function() {
      return (Uw = n.dynCall_viiif = n.asm.Gt).apply(null, arguments)
    }),
    zw = n.dynCall_ddiii = function() {
      return (zw = n.dynCall_ddiii = n.asm.Ht).apply(null, arguments)
    },
    qw = n.dynCall_viiifff = function() {
      return (qw = n.dynCall_viiifff = n.asm.It).apply(null, arguments)
    },
    Hw = n.dynCall_vifffi = function() {
      return (Hw = n.dynCall_vifffi = n.asm.Jt).apply(null, arguments)
    },
    Vw = (n.dynCall_viiiiiiiiiiiiiiiiiii = function() {
      return (n.dynCall_viiiiiiiiiiiiiiiiiii = n.asm.Kt).apply(null, arguments)
    }, n.dynCall_viiiijii = function() {
      return (Vw = n.dynCall_viiiijii = n.asm.Lt).apply(null, arguments)
    }),
    Yw = n.dynCall_iiiiiiiiiii = function() {
      return (Yw = n.dynCall_iiiiiiiiiii = n.asm.Mt).apply(null, arguments)
    },
    Jw = n.dynCall_viijiiiiii = function() {
      return (Jw = n.dynCall_viijiiiiii = n.asm.Nt).apply(null, arguments)
    },
    Zw = n.dynCall_vijiii = function() {
      return (Zw = n.dynCall_vijiii = n.asm.Ot).apply(null, arguments)
    },
    Qw = n.dynCall_vjjjiiii = function() {
      return (Qw = n.dynCall_vjjjiiii = n.asm.Pt).apply(null, arguments)
    },
    $w = n.dynCall_ijjjiijii = function() {
      return ($w = n.dynCall_ijjjiijii = n.asm.Qt).apply(null, arguments)
    },
    nS = n.dynCall_vijiiii = function() {
      return (nS = n.dynCall_vijiiii = n.asm.Rt).apply(null, arguments)
    },
    eS = n.dynCall_vjiiiii = function() {
      return (eS = n.dynCall_vjiiiii = n.asm.St).apply(null, arguments)
    },
    iS = n.dynCall_jiiiii = function() {
      return (iS = n.dynCall_jiiiii = n.asm.Tt).apply(null, arguments)
    },
    tS = (n.dynCall_viifiii = function() {
      return (n.dynCall_viifiii = n.asm.Ut).apply(null, arguments)
    }, n.dynCall_vfi = function() {
      return (n.dynCall_vfi = n.asm.Vt).apply(null, arguments)
    }, n.dynCall_iifiiiii = function() {
      return (n.dynCall_iifiiiii = n.asm.Wt).apply(null, arguments)
    }, n.dynCall_jiijji = function() {
      return (n.dynCall_jiijji = n.asm.Xt).apply(null, arguments)
    }, n.dynCall_jiiiiiiii = function() {
      return (n.dynCall_jiiiiiiii = n.asm.Yt).apply(null, arguments)
    }, n.dynCall_jjdi = function() {
      return (n.dynCall_jjdi = n.asm.Zt).apply(null, arguments)
    }, n.dynCall_jiiiiiiidi = function() {
      return (n.dynCall_jiiiiiiidi = n.asm._t).apply(null, arguments)
    }, n.dynCall_vijdi = function() {
      return (n.dynCall_vijdi = n.asm.$t).apply(null, arguments)
    }, n.dynCall_vjii = function() {
      return (n.dynCall_vjii = n.asm.au).apply(null, arguments)
    }, n.dynCall_vifiiii = function() {
      return (n.dynCall_vifiiii = n.asm.bu).apply(null, arguments)
    }, n.dynCall_viiififfi = function() {
      return (n.dynCall_viiififfi = n.asm.cu).apply(null, arguments)
    }, n.dynCall_ijii = function() {
      return (n.dynCall_ijii = n.asm.du).apply(null, arguments)
    }, n.dynCall_ffi = function() {
      return (n.dynCall_ffi = n.asm.eu).apply(null, arguments)
    }, n.dynCall_vifiiiii = function() {
      return (n.dynCall_vifiiiii = n.asm.fu).apply(null, arguments)
    }, n.dynCall_iiiiiifi = function() {
      return (n.dynCall_iiiiiifi = n.asm.gu).apply(null, arguments)
    }, n.dynCall_iiffi = function() {
      return (n.dynCall_iiffi = n.asm.hu).apply(null, arguments)
    }, n.dynCall_viifiiiii = function() {
      return (n.dynCall_viifiiiii = n.asm.iu).apply(null, arguments)
    }, n.dynCall_vffi = function() {
      return (n.dynCall_vffi = n.asm.ju).apply(null, arguments)
    }, n.dynCall_vffffi = function() {
      return (n.dynCall_vffffi = n.asm.ku).apply(null, arguments)
    }, n.dynCall_vfii = function() {
      return (n.dynCall_vfii = n.asm.lu).apply(null, arguments)
    }, n.dynCall_vifiii = function() {
      return (n.dynCall_vifiii = n.asm.mu).apply(null, arguments)
    }, n.dynCall_viiiiifii = function() {
      return (n.dynCall_viiiiifii = n.asm.nu).apply(null, arguments)
    }, n.dynCall_viffii = function() {
      return (n.dynCall_viffii = n.asm.ou).apply(null, arguments)
    }, n.dynCall_fiiiiffi = function() {
      return (n.dynCall_fiiiiffi = n.asm.pu).apply(null, arguments)
    }, n.dynCall_viiiffi = function() {
      return (n.dynCall_viiiffi = n.asm.qu).apply(null, arguments)
    }, n.dynCall_viiiiiffi = function() {
      return (n.dynCall_viiiiiffi = n.asm.ru).apply(null, arguments)
    }, n.dynCall_vifffii = function() {
      return (n.dynCall_vifffii = n.asm.su).apply(null, arguments)
    }, n.dynCall_viffffii = function() {
      return (n.dynCall_viffffii = n.asm.tu).apply(null, arguments)
    }, n.dynCall_fiiiii = function() {
      return (n.dynCall_fiiiii = n.asm.uu).apply(null, arguments)
    }, n.dynCall_viiiiifi = function() {
      return (n.dynCall_viiiiifi = n.asm.vu).apply(null, arguments)
    }, n.dynCall_ffffffffi = function() {
      return (n.dynCall_ffffffffi = n.asm.wu).apply(null, arguments)
    }, n.dynCall_viiiifiiiifi = function() {
      return (n.dynCall_viiiifiiiifi = n.asm.xu).apply(null, arguments)
    }, n.dynCall_ddi = function() {
      return (n.dynCall_ddi = n.asm.yu).apply(null, arguments)
    }, n.dynCall_ffffi = function() {
      return (n.dynCall_ffffi = n.asm.zu).apply(null, arguments)
    }, n.dynCall_viiiiffi = function() {
      return (tS = n.dynCall_viiiiffi = n.asm.Au).apply(null, arguments)
    }),
    rS = (n.dynCall_iiffffiii = function() {
      return (n.dynCall_iiffffiii = n.asm.Bu).apply(null, arguments)
    }, n.dynCall_iiidfi = function() {
      return (n.dynCall_iiidfi = n.asm.Cu).apply(null, arguments)
    }, n.dynCall_iiijfi = function() {
      return (n.dynCall_iiijfi = n.asm.Du).apply(null, arguments)
    }, n.dynCall_iiiffii = function() {
      return (n.dynCall_iiiffii = n.asm.Eu).apply(null, arguments)
    }, n.dynCall_iifffi = function() {
      return (n.dynCall_iifffi = n.asm.Fu).apply(null, arguments)
    }, n.dynCall_iiiififi = function() {
      return (n.dynCall_iiiififi = n.asm.Gu).apply(null, arguments)
    }, n.dynCall_iiiffifiiii = function() {
      return (n.dynCall_iiiffifiiii = n.asm.Hu).apply(null, arguments)
    }, n.dynCall_iiifiifiii = function() {
      return (n.dynCall_iiifiifiii = n.asm.Iu).apply(null, arguments)
    }, n.dynCall_iiifiifiiiii = function() {
      return (n.dynCall_iiifiifiiiii = n.asm.Ju).apply(null, arguments)
    }, n.dynCall_ifii = function() {
      return (n.dynCall_ifii = n.asm.Ku).apply(null, arguments)
    }, n.dynCall_iifii = function() {
      return (n.dynCall_iifii = n.asm.Lu).apply(null, arguments)
    }, n.dynCall_ifffii = function() {
      return (n.dynCall_ifffii = n.asm.Mu).apply(null, arguments)
    }, n.dynCall_ffffii = function() {
      return (n.dynCall_ffffii = n.asm.Nu).apply(null, arguments)
    }, n.dynCall_ffffifi = function() {
      return (n.dynCall_ffffifi = n.asm.Ou).apply(null, arguments)
    }, n.dynCall_ffffiffi = function() {
      return (n.dynCall_ffffiffi = n.asm.Pu).apply(null, arguments)
    }, n.dynCall_viiififi = function() {
      return (n.dynCall_viiififi = n.asm.Qu).apply(null, arguments)
    }, n.dynCall_ifiii = function() {
      return (n.dynCall_ifiii = n.asm.Ru).apply(null, arguments)
    }, n.dynCall_iifiiiiii = function() {
      return (n.dynCall_iifiiiiii = n.asm.Su).apply(null, arguments)
    }, n.dynCall_iiffiiiii = function() {
      return (n.dynCall_iiffiiiii = n.asm.Tu).apply(null, arguments)
    }, n.dynCall_iiffifiii = function() {
      return (n.dynCall_iiffifiii = n.asm.Uu).apply(null, arguments)
    }, n.dynCall_iifiifiii = function() {
      return (n.dynCall_iifiifiii = n.asm.Vu).apply(null, arguments)
    }, n.dynCall_iififi = function() {
      return (n.dynCall_iififi = n.asm.Wu).apply(null, arguments)
    }, n.dynCall_iiifiii = function() {
      return (n.dynCall_iiifiii = n.asm.Xu).apply(null, arguments)
    }, n.dynCall_iiifiiii = function() {
      return (n.dynCall_iiifiiii = n.asm.Yu).apply(null, arguments)
    }, n.dynCall_iiififii = function() {
      return (n.dynCall_iiififii = n.asm.Zu).apply(null, arguments)
    }, n.dynCall_iiififi = function() {
      return (n.dynCall_iiififi = n.asm._u).apply(null, arguments)
    }, n.dynCall_iiffifiiii = function() {
      return (n.dynCall_iiffifiiii = n.asm.$u).apply(null, arguments)
    }, n.dynCall_iifiifiiii = function() {
      return (n.dynCall_iifiifiiii = n.asm.av).apply(null, arguments)
    }, n.dynCall_iiifiiiii = function() {
      return (n.dynCall_iiifiiiii = n.asm.bv).apply(null, arguments)
    }, n.dynCall_iifiii = function() {
      return (n.dynCall_iifiii = n.asm.cv).apply(null, arguments)
    }, n.dynCall_iiiiifiiii = function() {
      return (n.dynCall_iiiiifiiii = n.asm.dv).apply(null, arguments)
    }, n.dynCall_fiifii = function() {
      return (n.dynCall_fiifii = n.asm.ev).apply(null, arguments)
    }, n.dynCall_viiiiiifiifiiii = function() {
      return (n.dynCall_viiiiiifiifiiii = n.asm.fv).apply(null, arguments)
    }, n.dynCall_viidiii = function() {
      return (n.dynCall_viidiii = n.asm.gv).apply(null, arguments)
    }, n.dynCall_diidi = function() {
      return (n.dynCall_diidi = n.asm.hv).apply(null, arguments)
    }, n.dynCall_fiifdi = function() {
      return (n.dynCall_fiifdi = n.asm.iv).apply(null, arguments)
    }, n.dynCall_viiiiiifddfiiii = function() {
      return (n.dynCall_viiiiiifddfiiii = n.asm.jv).apply(null, arguments)
    }, n.dynCall_viijiii = function() {
      return (n.dynCall_viijiii = n.asm.kv).apply(null, arguments)
    }, n.dynCall_fiifji = function() {
      return (n.dynCall_fiifji = n.asm.lv).apply(null, arguments)
    }, n.dynCall_viiiiiifjjfiiii = function() {
      return (n.dynCall_viiiiiifjjfiiii = n.asm.mv).apply(null, arguments)
    }, n.dynCall_fiiffi = function() {
      return (n.dynCall_fiiffi = n.asm.nv).apply(null, arguments)
    }, n.dynCall_viiiiiiffffiiii = function() {
      return (n.dynCall_viiiiiiffffiiii = n.asm.ov).apply(null, arguments)
    }, n.dynCall_viifiiii = function() {
      return (n.dynCall_viifiiii = n.asm.pv).apply(null, arguments)
    }, n.dynCall_iiiiifiii = function() {
      return (n.dynCall_iiiiifiii = n.asm.qv).apply(null, arguments)
    }, n.dynCall_fffffi = function() {
      return (n.dynCall_fffffi = n.asm.rv).apply(null, arguments)
    }, n.dynCall_fiiffffi = function() {
      return (n.dynCall_fiiffffi = n.asm.sv).apply(null, arguments)
    }, n.dynCall_fffifffi = function() {
      return (n.dynCall_fffifffi = n.asm.tv).apply(null, arguments)
    }, n.dynCall_iiiifiii = function() {
      return (n.dynCall_iiiifiii = n.asm.uv).apply(null, arguments)
    }, n.dynCall_viiffiifiiii = function() {
      return (n.dynCall_viiffiifiiii = n.asm.vv).apply(null, arguments)
    }, n.dynCall_iiifffiii = function() {
      return (n.dynCall_iiifffiii = n.asm.wv).apply(null, arguments)
    }, n.dynCall_fifffi = function() {
      return (n.dynCall_fifffi = n.asm.xv).apply(null, arguments)
    }, n.dynCall_jijii = function() {
      return (n.dynCall_jijii = n.asm.yv).apply(null, arguments)
    }, n.dynCall_viiijiiii = function() {
      return (n.dynCall_viiijiiii = n.asm.zv).apply(null, arguments)
    }, n.dynCall_viiiiji = function() {
      return (n.dynCall_viiiiji = n.asm.Av).apply(null, arguments)
    }, n.dynCall_iiiijjiii = function() {
      return (n.dynCall_iiiijjiii = n.asm.Bv).apply(null, arguments)
    }, n.dynCall_iiiffiii = function() {
      return (n.dynCall_iiiffiii = n.asm.Cv).apply(null, arguments)
    }, n.dynCall_iiiiifii = function() {
      return (n.dynCall_iiiiifii = n.asm.Dv).apply(null, arguments)
    }, n.dynCall_iiifffi = function() {
      return (n.dynCall_iiifffi = n.asm.Ev).apply(null, arguments)
    }, n.dynCall_viiiiifiii = function() {
      return (n.dynCall_viiiiifiii = n.asm.Fv).apply(null, arguments)
    }, n.dynCall_iiiiiifiiii = function() {
      return (n.dynCall_iiiiiifiiii = n.asm.Gv).apply(null, arguments)
    }, n.dynCall_iffffi = function() {
      return (n.dynCall_iffffi = n.asm.Hv).apply(null, arguments)
    }, n.dynCall_diji = function() {
      return (n.dynCall_diji = n.asm.Iv).apply(null, arguments)
    }, n.dynCall_iidiii = function() {
      return (n.dynCall_iidiii = n.asm.Jv).apply(null, arguments)
    }, n.dynCall_vijfi = function() {
      return (n.dynCall_vijfi = n.asm.Kv).apply(null, arguments)
    }, n.dynCall_di = function() {
      return (n.dynCall_di = n.asm.Lv).apply(null, arguments)
    }, n.dynCall_iffi = function() {
      return (n.dynCall_iffi = n.asm.Mv).apply(null, arguments)
    }, n.dynCall_ifffi = function() {
      return (n.dynCall_ifffi = n.asm.Nv).apply(null, arguments)
    }, n.dynCall_jjiji = function() {
      return (n.dynCall_jjiji = n.asm.Ov).apply(null, arguments)
    }, n.dynCall_iiiiiji = function() {
      return (n.dynCall_iiiiiji = n.asm.Pv).apply(null, arguments)
    }, n.dynCall_iiffiii = function() {
      return (n.dynCall_iiffiii = n.asm.Qv).apply(null, arguments)
    }, n.dynCall_iifiiii = function() {
      return (n.dynCall_iifiiii = n.asm.Rv).apply(null, arguments)
    }, n.dynCall_viiffii = function() {
      return (n.dynCall_viiffii = n.asm.Sv).apply(null, arguments)
    }, n.dynCall_iiiiifi = function() {
      return (n.dynCall_iiiiifi = n.asm.Tv).apply(null, arguments)
    }, n.dynCall_fifffffi = function() {
      return (n.dynCall_fifffffi = n.asm.Uv).apply(null, arguments)
    }, n.dynCall_iiiifiiii = function() {
      return (n.dynCall_iiiifiiii = n.asm.Vv).apply(null, arguments)
    }, n.dynCall_viffifiiifiifi = function() {
      return (n.dynCall_viffifiiifiifi = n.asm.Wv).apply(null, arguments)
    }, n.dynCall_iiiffifiiifiifiii = function() {
      return (n.dynCall_iiiffifiiifiifiii = n.asm.Xv).apply(null, arguments)
    }, n.dynCall_viiifiii = function() {
      return (n.dynCall_viiifiii = n.asm.Yv).apply(null, arguments)
    }, n.dynCall_iiiiiifii = function() {
      return (n.dynCall_iiiiiifii = n.asm.Zv).apply(null, arguments)
    }, n.dynCall_viiijiii = function() {
      return (n.dynCall_viiijiii = n.asm._v).apply(null, arguments)
    }, n.dynCall_vjiii = function() {
      return (n.dynCall_vjiii = n.asm.$v).apply(null, arguments)
    }, n.dynCall_ijiii = function() {
      return (n.dynCall_ijiii = n.asm.aw).apply(null, arguments)
    }, n.dynCall_iiddi = function() {
      return (n.dynCall_iiddi = n.asm.bw).apply(null, arguments)
    }, n.dynCall_djii = function() {
      return (n.dynCall_djii = n.asm.cw).apply(null, arguments)
    }, n.dynCall_viiiiififiiii = function() {
      return (n.dynCall_viiiiififiiii = n.asm.dw).apply(null, arguments)
    }, n.dynCall_iiif = function() {
      return (rS = n.dynCall_iiif = n.asm.ew).apply(null, arguments)
    }),
    aS = (n.dynCall_fifii = function() {
      return (n.dynCall_fifii = n.asm.fw).apply(null, arguments)
    }, n.dynCall_fiiffifi = function() {
      return (n.dynCall_fiiffifi = n.asm.gw).apply(null, arguments)
    }, n.dynCall_fiifiiiii = function() {
      return (n.dynCall_fiifiiiii = n.asm.hw).apply(null, arguments)
    }, n.dynCall_iiiiiiffi = function() {
      return (n.dynCall_iiiiiiffi = n.asm.iw).apply(null, arguments)
    }, n.dynCall_iiiiffi = function() {
      return (n.dynCall_iiiiffi = n.asm.jw).apply(null, arguments)
    }, n.dynCall_iiiifiiiffi = function() {
      return (n.dynCall_iiiifiiiffi = n.asm.kw).apply(null, arguments)
    }, n.dynCall_viiffiiifi = function() {
      return (n.dynCall_viiffiiifi = n.asm.lw).apply(null, arguments)
    }, n.dynCall_iiifiiffi = function() {
      return (n.dynCall_iiifiiffi = n.asm.mw).apply(null, arguments)
    }, n.dynCall_vififfii = function() {
      return (n.dynCall_vififfii = n.asm.nw).apply(null, arguments)
    }, n.dynCall_viifiiiiiiiiffiiffiiffiiffiiffiii = function() {
      return (n.dynCall_viifiiiiiiiiffiiffiiffiiffiiffiii = n.asm.ow).apply(null, arguments)
    }, n.dynCall_viiiififiiii = function() {
      return (n.dynCall_viiiififiiii = n.asm.pw).apply(null, arguments)
    }, n.dynCall_iiiiiififiiiiii = function() {
      return (n.dynCall_iiiiiififiiiiii = n.asm.qw).apply(null, arguments)
    }, n.dynCall_viiiififiii = function() {
      return (n.dynCall_viiiififiii = n.asm.rw).apply(null, arguments)
    }, n.dynCall_ffii = function() {
      return (n.dynCall_ffii = n.asm.sw).apply(null, arguments)
    }, n.dynCall_vifffifiiiiiiii = function() {
      return (n.dynCall_vifffifiiiiiiii = n.asm.tw).apply(null, arguments)
    }, n.dynCall_iiifffifiiiiiiiiii = function() {
      return (n.dynCall_iiifffifiiiiiiiiii = n.asm.uw).apply(null, arguments)
    }, n.dynCall_vifffiffifiiiiiiii = function() {
      return (n.dynCall_vifffiffifiiiiiiii = n.asm.vw).apply(null, arguments)
    }, n.dynCall_iiifffiffifiiiiiiiiii = function() {
      return (n.dynCall_iiifffiffifiiiiiiiiii = n.asm.ww).apply(null, arguments)
    }, n.dynCall_viffffffi = function() {
      return (n.dynCall_viffffffi = n.asm.xw).apply(null, arguments)
    }, n.dynCall_vifffiiiiiii = function() {
      return (n.dynCall_vifffiiiiiii = n.asm.yw).apply(null, arguments)
    }, n.dynCall_iiifffiiiiiiiii = function() {
      return (n.dynCall_iiifffiiiiiiiii = n.asm.zw).apply(null, arguments)
    }, n.dynCall_vffffffiiii = function() {
      return (n.dynCall_vffffffiiii = n.asm.Aw).apply(null, arguments)
    }, n.dynCall_iiffffffiiiiii = function() {
      return (n.dynCall_iiffffffiiiiii = n.asm.Bw).apply(null, arguments)
    }, n.dynCall_viffffffii = function() {
      return (n.dynCall_viffffffii = n.asm.Cw).apply(null, arguments)
    }, n.dynCall_viffiiiii = function() {
      return (n.dynCall_viffiiiii = n.asm.Dw).apply(null, arguments)
    }, n.dynCall_iiiffiiiiiii = function() {
      return (n.dynCall_iiiffiiiiiii = n.asm.Ew).apply(null, arguments)
    }, n.dynCall_vfiiiiffiffifffiiiifii = function() {
      return (n.dynCall_vfiiiiffiffifffiiiifii = n.asm.Fw).apply(null, arguments)
    }, n.dynCall_iifiiiiffiffifffiiiifiiii = function() {
      return (n.dynCall_iifiiiiffiffifffiiiifiiii = n.asm.Gw).apply(null, arguments)
    }, n.dynCall_vfiiiiiiiiiiifiiiifiiiiiii = function() {
      return (n.dynCall_vfiiiiiiiiiiifiiiifiiiiiii = n.asm.Hw).apply(null, arguments)
    }, n.dynCall_iifiiiiiiiiiiifiiiifiiiiiiiii = function() {
      return (n.dynCall_iifiiiiiiiiiiifiiiifiiiiiiiii = n.asm.Iw).apply(null, arguments)
    }, n.dynCall_vfffiiiiiiiiiiiifiiiifiiiiiiii = function() {
      return (n.dynCall_vfffiiiiiiiiiiiifiiiifiiiiiiii = n.asm.Jw).apply(null, arguments)
    }, n.dynCall_iifffiiiiiiiiiiiifiiiifiiiiiiiiii = function() {
      return (n.dynCall_iifffiiiiiiiiiiiifiiiifiiiiiiiiii = n.asm.Kw).apply(null, arguments)
    }, n.dynCall_vfiiiifiiiifii = function() {
      return (n.dynCall_vfiiiifiiiifii = n.asm.Lw).apply(null, arguments)
    }, n.dynCall_iifiiiifiiiifiiii = function() {
      return (n.dynCall_iifiiiifiiiifiiii = n.asm.Mw).apply(null, arguments)
    }, n.dynCall_iiiiiiiiiiiifi = function() {
      return (n.dynCall_iiiiiiiiiiiifi = n.asm.Nw).apply(null, arguments)
    }, n.dynCall_viiiiffiii = function() {
      return (aS = n.dynCall_viiiiffiii = n.asm.Ow).apply(null, arguments)
    }),
    oS = n.dynCall_ffffffii = function() {
      return (oS = n.dynCall_ffffffii = n.asm.Pw).apply(null, arguments)
    },
    lS = n.dynCall_viiiiffff = function() {
      return (lS = n.dynCall_viiiiffff = n.asm.Qw).apply(null, arguments)
    },
    uS = (n.dynCall_viiiffiiii = function() {
      return (n.dynCall_viiiffiiii = n.asm.Rw).apply(null, arguments)
    }, n.dynCall_viiiffffi = function() {
      return (n.dynCall_viiiffffi = n.asm.Sw).apply(null, arguments)
    }, n.dynCall_iiiiffiiii = function() {
      return (n.dynCall_iiiiffiiii = n.asm.Tw).apply(null, arguments)
    }, n.dynCall_iiifffii = function() {
      return (n.dynCall_iiifffii = n.asm.Uw).apply(null, arguments)
    }, n.dynCall_iiiiifiiffiiiifffiiiiiiiffiiffi = function() {
      return (n.dynCall_iiiiifiiffiiiifffiiiiiiiffiiffi = n.asm.Vw).apply(null, arguments)
    }, n.dynCall_iiiiiifiiffiiiifffiiiiiiiffiiffiffiiiiiiiiii = function() {
      return (n.dynCall_iiiiiifiiffiiiifffiiiiiiiffiiffiffiiiiiiiiii = n.asm.Ww).apply(null, arguments)
    }, n.dynCall_viifffii = function() {
      return (n.dynCall_viifffii = n.asm.Xw).apply(null, arguments)
    }, n.dynCall_viifffiii = function() {
      return (n.dynCall_viifffiii = n.asm.Yw).apply(null, arguments)
    }, n.dynCall_iifiiiffi = function() {
      return (n.dynCall_iifiiiffi = n.asm.Zw).apply(null, arguments)
    }, n.dynCall_viiifiiii = function() {
      return (n.dynCall_viiifiiii = n.asm._w).apply(null, arguments)
    }, n.dynCall_iiiiifiiiiii = function() {
      return (n.dynCall_iiiiifiiiiii = n.asm.$w).apply(null, arguments)
    }, n.dynCall_viiffiifi = function() {
      return (n.dynCall_viiffiifi = n.asm.ax).apply(null, arguments)
    }, n.dynCall_viffiifi = function() {
      return (n.dynCall_viffiifi = n.asm.bx).apply(null, arguments)
    }, n.dynCall_vffiiiii = function() {
      return (n.dynCall_vffiiiii = n.asm.cx).apply(null, arguments)
    }, n.dynCall_vfiiiii = function() {
      return (n.dynCall_vfiiiii = n.asm.dx).apply(null, arguments)
    }, n.dynCall_vifffiiii = function() {
      return (n.dynCall_vifffiiii = n.asm.ex).apply(null, arguments)
    }, n.dynCall_vifffiiiii = function() {
      return (n.dynCall_vifffiiiii = n.asm.fx).apply(null, arguments)
    }, n.dynCall_fiiffiffii = function() {
      return (n.dynCall_fiiffiffii = n.asm.gx).apply(null, arguments)
    }, n.dynCall_viiififiiii = function() {
      return (n.dynCall_viiififiiii = n.asm.hx).apply(null, arguments)
    }, n.dynCall_viiifiiiii = function() {
      return (n.dynCall_viiifiiiii = n.asm.ix).apply(null, arguments)
    }, n.dynCall_viiifffi = function() {
      return (n.dynCall_viiifffi = n.asm.jx).apply(null, arguments)
    }, n.dynCall_vififfffi = function() {
      return (n.dynCall_vififfffi = n.asm.kx).apply(null, arguments)
    }, n.dynCall_ffffiii = function() {
      return (n.dynCall_ffffiii = n.asm.lx).apply(null, arguments)
    }, n.dynCall_ffiii = function() {
      return (n.dynCall_ffiii = n.asm.mx).apply(null, arguments)
    }, n.dynCall_iiifiiifi = function() {
      return (n.dynCall_iiifiiifi = n.asm.nx).apply(null, arguments)
    }, n.dynCall_ifiiiii = function() {
      return (n.dynCall_ifiiiii = n.asm.ox).apply(null, arguments)
    }, n.dynCall_fiffi = function() {
      return (n.dynCall_fiffi = n.asm.px).apply(null, arguments)
    }, n.dynCall_iiiiiiiiiiii = function() {
      return (n.dynCall_iiiiiiiiiiii = n.asm.qx).apply(null, arguments)
    }, n.dynCall_viiiiifffffiifiiiii = function() {
      return (n.dynCall_viiiiifffffiifiiiii = n.asm.rx).apply(null, arguments)
    }, n.dynCall_ffiffffiiii = function() {
      return (n.dynCall_ffiffffiiii = n.asm.sx).apply(null, arguments)
    }, n.dynCall_ffiffffiiiiffifi = function() {
      return (n.dynCall_ffiffffiiiiffifi = n.asm.tx).apply(null, arguments)
    }, n.dynCall_iiiiiiffiii = function() {
      return (n.dynCall_iiiiiiffiii = n.asm.ux).apply(null, arguments)
    }, n.dynCall_iiiiiiffiiiii = function() {
      return (n.dynCall_iiiiiiffiiiii = n.asm.vx).apply(null, arguments)
    }, n.dynCall_iiiiififfiii = function() {
      return (n.dynCall_iiiiififfiii = n.asm.wx).apply(null, arguments)
    }, n.dynCall_iiiiiffiii = function() {
      return (n.dynCall_iiiiiffiii = n.asm.xx).apply(null, arguments)
    }, n.dynCall_iiiiiffiiiii = function() {
      return (n.dynCall_iiiiiffiiiii = n.asm.yx).apply(null, arguments)
    }, n.dynCall_iiiififfiii = function() {
      return (n.dynCall_iiiififfiii = n.asm.zx).apply(null, arguments)
    }, n.dynCall_ifiiii = function() {
      return (n.dynCall_ifiiii = n.asm.Ax).apply(null, arguments)
    }, n.dynCall_idiiiii = function() {
      return (n.dynCall_idiiiii = n.asm.Bx).apply(null, arguments)
    }, n.dynCall_idiiii = function() {
      return (n.dynCall_idiiii = n.asm.Cx).apply(null, arguments)
    }, n.dynCall_idii = function() {
      return (n.dynCall_idii = n.asm.Dx).apply(null, arguments)
    }, n.dynCall_iiijiiii = function() {
      return (n.dynCall_iiijiiii = n.asm.Ex).apply(null, arguments)
    }, n.dynCall_vjiiii = function() {
      return (n.dynCall_vjiiii = n.asm.Fx).apply(null, arguments)
    }, n.dynCall_iddi = function() {
      return (n.dynCall_iddi = n.asm.Gx).apply(null, arguments)
    }, n.dynCall_iiiiiiiiiiiiii = function() {
      return (n.dynCall_iiiiiiiiiiiiii = n.asm.Hx).apply(null, arguments)
    }, n.dynCall_vifiifi = function() {
      return (n.dynCall_vifiifi = n.asm.Ix).apply(null, arguments)
    }, n.dynCall_viddfffi = function() {
      return (n.dynCall_viddfffi = n.asm.Jx).apply(null, arguments)
    }, n.dynCall_viidfffi = function() {
      return (n.dynCall_viidfffi = n.asm.Kx).apply(null, arguments)
    }, n.dynCall_vidifffi = function() {
      return (n.dynCall_vidifffi = n.asm.Lx).apply(null, arguments)
    }, n.dynCall_viddi = function() {
      return (n.dynCall_viddi = n.asm.Mx).apply(null, arguments)
    }, n.dynCall_vidii = function() {
      return (n.dynCall_vidii = n.asm.Nx).apply(null, arguments)
    }, n.dynCall_viiiiiiifi = function() {
      return (n.dynCall_viiiiiiifi = n.asm.Ox).apply(null, arguments)
    }, n.dynCall_viiiiffffffffii = function() {
      return (n.dynCall_viiiiffffffffii = n.asm.Px).apply(null, arguments)
    }, n.dynCall_ddddi = function() {
      return (n.dynCall_ddddi = n.asm.Qx).apply(null, arguments)
    }, n.dynCall_iiiiiiiiiiiii = function() {
      return (n.dynCall_iiiiiiiiiiiii = n.asm.Rx).apply(null, arguments)
    }, n.dynCall_vijji = function() {
      return (n.dynCall_vijji = n.asm.Sx).apply(null, arguments)
    }, n.dynCall_vijjiiiii = function() {
      return (n.dynCall_vijjiiiii = n.asm.Tx).apply(null, arguments)
    }, n.dynCall_vijjjii = function() {
      return (n.dynCall_vijjjii = n.asm.Ux).apply(null, arguments)
    }, n.dynCall_viijji = function() {
      return (n.dynCall_viijji = n.asm.Vx).apply(null, arguments)
    }, n.dynCall_viffffffffffffffffi = function() {
      return (n.dynCall_viffffffffffffffffi = n.asm.Wx).apply(null, arguments)
    }, n.dynCall_didi = function() {
      return (n.dynCall_didi = n.asm.Xx).apply(null, arguments)
    }, n.dynCall_ijjiiii = function() {
      return (n.dynCall_ijjiiii = n.asm.Yx).apply(null, arguments)
    }, n.dynCall_vdiiiii = function() {
      return (n.dynCall_vdiiiii = n.asm.Zx).apply(null, arguments)
    }, n.dynCall_diiji = function() {
      return (n.dynCall_diiji = n.asm._x).apply(null, arguments)
    }, n.dynCall_vjiiiiiiii = function() {
      return (n.dynCall_vjiiiiiiii = n.asm.$x).apply(null, arguments)
    }, n.dynCall_vjiiiiiii = function() {
      return (n.dynCall_vjiiiiiii = n.asm.ay).apply(null, arguments)
    }, n.dynCall_ijiiii = function() {
      return (n.dynCall_ijiiii = n.asm.by).apply(null, arguments)
    }, n.dynCall_iidii = function() {
      return (n.dynCall_iidii = n.asm.cy).apply(null, arguments)
    }, n.dynCall_jidi = function() {
      return (n.dynCall_jidi = n.asm.dy).apply(null, arguments)
    }, n.dynCall_fidi = function() {
      return (n.dynCall_fidi = n.asm.ey).apply(null, arguments)
    }, n.dynCall_diddi = function() {
      return (n.dynCall_diddi = n.asm.fy).apply(null, arguments)
    }, n.dynCall_vffffiiii = function() {
      return (n.dynCall_vffffiiii = n.asm.gy).apply(null, arguments)
    }, n.dynCall_viiiifffi = function() {
      return (n.dynCall_viiiifffi = n.asm.hy).apply(null, arguments)
    }, n.dynCall_vfiii = function() {
      return (n.dynCall_vfiii = n.asm.iy).apply(null, arguments)
    }, n.dynCall_viifffi = function() {
      return (n.dynCall_viifffi = n.asm.jy).apply(null, arguments)
    }, n.dynCall_iiiifiiiii = function() {
      return (n.dynCall_iiiifiiiii = n.asm.ky).apply(null, arguments)
    }, n.dynCall_vijjii = function() {
      return (n.dynCall_vijjii = n.asm.ly).apply(null, arguments)
    }, n.dynCall_viiiififfi = function() {
      return (n.dynCall_viiiififfi = n.asm.my).apply(null, arguments)
    }, n.dynCall_viiiifiifi = function() {
      return (n.dynCall_viiiifiifi = n.asm.ny).apply(null, arguments)
    }, n.dynCall_viiiifiiiii = function() {
      return (n.dynCall_viiiifiiiii = n.asm.oy).apply(null, arguments)
    }, n.dynCall_viiiifiiiiiiii = function() {
      return (n.dynCall_viiiifiiiiiiii = n.asm.py).apply(null, arguments)
    }, n.dynCall_viiiiiffii = function() {
      return (n.dynCall_viiiiiffii = n.asm.qy).apply(null, arguments)
    }, n.dynCall_viffiii = function() {
      return (n.dynCall_viffiii = n.asm.ry).apply(null, arguments)
    }, n.dynCall_viffffiii = function() {
      return (n.dynCall_viffffiii = n.asm.sy).apply(null, arguments)
    }, n.dynCall_viiiififii = function() {
      return (n.dynCall_viiiififii = n.asm.ty).apply(null, arguments)
    }, n.dynCall_viiififiii = function() {
      return (n.dynCall_viiififiii = n.asm.uy).apply(null, arguments)
    }, n.dynCall_viiififii = function() {
      return (n.dynCall_viiififii = n.asm.vy).apply(null, arguments)
    }, n.dynCall_iiiififfi = function() {
      return (n.dynCall_iiiififfi = n.asm.wy).apply(null, arguments)
    }, n.dynCall_iiiiiiffiiiiiiiiiffffiiii = function() {
      return (n.dynCall_iiiiiiffiiiiiiiiiffffiiii = n.asm.xy).apply(null, arguments)
    }, n.dynCall_iiiiiiffiiiiiiiiiiiiiii = function() {
      return (n.dynCall_iiiiiiffiiiiiiiiiiiiiii = n.asm.yy).apply(null, arguments)
    }, n.dynCall_jiiiiffffii = function() {
      return (n.dynCall_jiiiiffffii = n.asm.zy).apply(null, arguments)
    }, n.dynCall_viijiiii = function() {
      return (n.dynCall_viijiiii = n.asm.Ay).apply(null, arguments)
    }, n.dynCall_iiiffffi = function() {
      return (n.dynCall_iiiffffi = n.asm.By).apply(null, arguments)
    }, n.dynCall_ddidi = function() {
      return (n.dynCall_ddidi = n.asm.Cy).apply(null, arguments)
    }, n.dynCall_iiidi = function() {
      return (n.dynCall_iiidi = n.asm.Dy).apply(null, arguments)
    }, n.dynCall_viddii = function() {
      return (n.dynCall_viddii = n.asm.Ey).apply(null, arguments)
    }, n.dynCall_iiidii = function() {
      return (n.dynCall_iiidii = n.asm.Fy).apply(null, arguments)
    }, n.dynCall_iiiddi = function() {
      return (n.dynCall_iiiddi = n.asm.Gy).apply(null, arguments)
    }, n.dynCall_viddiiii = function() {
      return (n.dynCall_viddiiii = n.asm.Hy).apply(null, arguments)
    }, n.dynCall_viiidii = function() {
      return (n.dynCall_viiidii = n.asm.Iy).apply(null, arguments)
    }, n.dynCall_vffffii = function() {
      return (n.dynCall_vffffii = n.asm.Jy).apply(null, arguments)
    }, n.dynCall_vddii = function() {
      return (n.dynCall_vddii = n.asm.Ky).apply(null, arguments)
    }, n.dynCall_vdi = function() {
      return (n.dynCall_vdi = n.asm.Ly).apply(null, arguments)
    }, n.dynCall_viiijjii = function() {
      return (n.dynCall_viiijjii = n.asm.My).apply(null, arguments)
    }, n.dynCall_vjji = function() {
      return (n.dynCall_vjji = n.asm.Ny).apply(null, arguments)
    }, n.dynCall_viiiijji = function() {
      return (n.dynCall_viiiijji = n.asm.Oy).apply(null, arguments)
    }, n.dynCall_viiiijjii = function() {
      return (n.dynCall_viiiijjii = n.asm.Py).apply(null, arguments)
    }, n.dynCall_viiiifiiiiii = function() {
      return (n.dynCall_viiiifiiiiii = n.asm.Qy).apply(null, arguments)
    }, n.dynCall_jjiiii = function() {
      return (n.dynCall_jjiiii = n.asm.Ry).apply(null, arguments)
    }, n.dynCall_vijiiiiiii = function() {
      return (n.dynCall_vijiiiiiii = n.asm.Sy).apply(null, arguments)
    }, n.dynCall_vijiiiiiiii = function() {
      return (n.dynCall_vijiiiiiiii = n.asm.Ty).apply(null, arguments)
    }, n.dynCall_jjiiiii = function() {
      return (n.dynCall_jjiiiii = n.asm.Uy).apply(null, arguments)
    }, n.dynCall_jijjji = function() {
      return (n.dynCall_jijjji = n.asm.Vy).apply(null, arguments)
    }, n.dynCall_jijjjii = function() {
      return (n.dynCall_jijjjii = n.asm.Wy).apply(null, arguments)
    }, n.dynCall_jjiii = function() {
      return (n.dynCall_jjiii = n.asm.Xy).apply(null, arguments)
    }, n.dynCall_ijijiiiii = function() {
      return (n.dynCall_ijijiiiii = n.asm.Yy).apply(null, arguments)
    }, n.dynCall_ijjjiii = function() {
      return (n.dynCall_ijjjiii = n.asm.Zy).apply(null, arguments)
    }, n.dynCall_vijjjiijii = function() {
      return (n.dynCall_vijjjiijii = n.asm._y).apply(null, arguments)
    }, n.dynCall_vijiiiiii = function() {
      return (n.dynCall_vijiiiiii = n.asm.$y).apply(null, arguments)
    }, n.dynCall_jfi = function() {
      return (n.dynCall_jfi = n.asm.az).apply(null, arguments)
    }, n.dynCall_fji = function() {
      return (n.dynCall_fji = n.asm.bz).apply(null, arguments)
    }, n.dynCall_fdi = function() {
      return (n.dynCall_fdi = n.asm.cz).apply(null, arguments)
    }, n.dynCall_dfi = function() {
      return (n.dynCall_dfi = n.asm.dz).apply(null, arguments)
    }, n.dynCall_jidii = function() {
      return (n.dynCall_jidii = n.asm.ez).apply(null, arguments)
    }, n.dynCall_viiiiiiiji = function() {
      return (n.dynCall_viiiiiiiji = n.asm.fz).apply(null, arguments)
    }, n.dynCall_viiiiiiiiji = function() {
      return (n.dynCall_viiiiiiiiji = n.asm.gz).apply(null, arguments)
    }, n.dynCall_viiiiiiiiiji = function() {
      return (n.dynCall_viiiiiiiiiji = n.asm.hz).apply(null, arguments)
    }, n.dynCall_ijiijii = function() {
      return (n.dynCall_ijiijii = n.asm.iz).apply(null, arguments)
    }, n.dynCall_vjjiiiii = function() {
      return (n.dynCall_vjjiiiii = n.asm.jz).apply(null, arguments)
    }, n.dynCall_vjjii = function() {
      return (n.dynCall_vjjii = n.asm.kz).apply(null, arguments)
    }, n.dynCall_ijiiji = function() {
      return (n.dynCall_ijiiji = n.asm.lz).apply(null, arguments)
    }, n.dynCall_ijiiiii = function() {
      return (n.dynCall_ijiiiii = n.asm.mz).apply(null, arguments)
    }, n.dynCall_ijiiiiji = function() {
      return (n.dynCall_ijiiiiji = n.asm.nz).apply(null, arguments)
    }, n.dynCall_ijjiii = function() {
      return (n.dynCall_ijjiii = n.asm.oz).apply(null, arguments)
    }, n.dynCall_jiiiiii = function() {
      return (n.dynCall_jiiiiii = n.asm.pz).apply(null, arguments)
    }, n.dynCall_ddii = function() {
      return (n.dynCall_ddii = n.asm.qz).apply(null, arguments)
    }, n.dynCall_idiii = function() {
      return (n.dynCall_idiii = n.asm.rz).apply(null, arguments)
    }, n.dynCall_jjjii = function() {
      return (n.dynCall_jjjii = n.asm.sz).apply(null, arguments)
    }, n.dynCall_vdiii = function() {
      return (n.dynCall_vdiii = n.asm.tz).apply(null, arguments)
    }, n.dynCall_jdii = function() {
      return (n.dynCall_jdii = n.asm.uz).apply(null, arguments)
    }, n.dynCall_vijijji = function() {
      return (n.dynCall_vijijji = n.asm.vz).apply(null, arguments)
    }, n.dynCall_iijjji = function() {
      return (n.dynCall_iijjji = n.asm.wz).apply(null, arguments)
    }, n.dynCall_viijjji = function() {
      return (n.dynCall_viijjji = n.asm.xz).apply(null, arguments)
    }, n.dynCall_vdii = function() {
      return (n.dynCall_vdii = n.asm.yz).apply(null, arguments)
    }, n.dynCall_iiiijii = function() {
      return (n.dynCall_iiiijii = n.asm.zz).apply(null, arguments)
    }, n.dynCall_jijji = function() {
      return (n.dynCall_jijji = n.asm.Az).apply(null, arguments)
    }, n.dynCall_iijjii = function() {
      return (n.dynCall_iijjii = n.asm.Bz).apply(null, arguments)
    }, n.dynCall_jjjji = function() {
      return (n.dynCall_jjjji = n.asm.Cz).apply(null, arguments)
    }, n.dynCall_viijijii = function() {
      return (n.dynCall_viijijii = n.asm.Dz).apply(null, arguments)
    }, n.dynCall_viijijiii = function() {
      return (n.dynCall_viijijiii = n.asm.Ez).apply(null, arguments)
    }, n.dynCall_vijiji = function() {
      return (n.dynCall_vijiji = n.asm.Fz).apply(null, arguments)
    }, n.dynCall_viijiijiii = function() {
      return (n.dynCall_viijiijiii = n.asm.Gz).apply(null, arguments)
    }, n.dynCall_viiiijiiii = function() {
      return (n.dynCall_viiiijiiii = n.asm.Hz).apply(null, arguments)
    }, n.dynCall_viijjii = function() {
      return (n.dynCall_viijjii = n.asm.Iz).apply(null, arguments)
    }, n.dynCall_jiiiiiiiii = function() {
      return (n.dynCall_jiiiiiiiii = n.asm.Jz).apply(null, arguments)
    }, n.dynCall_viiffiifiii = function() {
      return (n.dynCall_viiffiifiii = n.asm.Kz).apply(null, arguments)
    }, n.dynCall_viiiiffffffffi = function() {
      return (n.dynCall_viiiiffffffffi = n.asm.Lz).apply(null, arguments)
    }, n.dynCall_fifiiii = function() {
      return (n.dynCall_fifiiii = n.asm.Mz).apply(null, arguments)
    }, n.dynCall_viiffifiii = function() {
      return (n.dynCall_viiffifiii = n.asm.Nz).apply(null, arguments)
    }, n.dynCall_vifffffffi = function() {
      return (n.dynCall_vifffffffi = n.asm.Oz).apply(null, arguments)
    }, n.dynCall_viffiiifi = function() {
      return (n.dynCall_viffiiifi = n.asm.Pz).apply(null, arguments)
    }, n.dynCall_viiffiiiffi = function() {
      return (n.dynCall_viiffiiiffi = n.asm.Qz).apply(null, arguments)
    }, n.dynCall_vfffffffffiiii = function() {
      return (n.dynCall_vfffffffffiiii = n.asm.Rz).apply(null, arguments)
    }, n.dynCall_viiiiiifffffi = function() {
      return (n.dynCall_viiiiiifffffi = n.asm.Sz).apply(null, arguments)
    }, n.dynCall_iiffffi = function() {
      return (n.dynCall_iiffffi = n.asm.Tz).apply(null, arguments)
    }, n.dynCall_iiffffffiii = function() {
      return (n.dynCall_iiffffffiii = n.asm.Uz).apply(null, arguments)
    }, n.dynCall_iffffffi = function() {
      return (n.dynCall_iffffffi = n.asm.Vz).apply(null, arguments)
    }, n.dynCall_viiiiiffffiii = function() {
      return (n.dynCall_viiiiiffffiii = n.asm.Wz).apply(null, arguments)
    }, n.dynCall_fiffii = function() {
      return (n.dynCall_fiffii = n.asm.Xz).apply(null, arguments)
    }, n.dynCall_viiffiiii = function() {
      return (n.dynCall_viiffiiii = n.asm.Yz).apply(null, arguments)
    }, n.dynCall_iiiiiifiii = function() {
      return (n.dynCall_iiiiiifiii = n.asm.Zz).apply(null, arguments)
    }, n.dynCall_iiiiiiififii = function() {
      return (n.dynCall_iiiiiiififii = n.asm._z).apply(null, arguments)
    }, n.dynCall_viiiififi = function() {
      return (n.dynCall_viiiififi = n.asm.$z).apply(null, arguments)
    }, n.dynCall_fffiii = function() {
      return (n.dynCall_fffiii = n.asm.aA).apply(null, arguments)
    }, n.dynCall_fffii = function() {
      return (n.dynCall_fffii = n.asm.bA).apply(null, arguments)
    }, n.dynCall_iiiifffiiii = function() {
      return (n.dynCall_iiiifffiiii = n.asm.cA).apply(null, arguments)
    }, n.dynCall_iiiiiiiiiiiiiiiii = function() {
      return (n.dynCall_iiiiiiiiiiiiiiiii = n.asm.dA).apply(null, arguments)
    }, n.dynCall_iiiiiiiiiiiiiiiiii = function() {
      return (n.dynCall_iiiiiiiiiiiiiiiiii = n.asm.eA).apply(null, arguments)
    }, n.dynCall_viiidi = function() {
      return (n.dynCall_viiidi = n.asm.fA).apply(null, arguments)
    }, n.dynCall_iiififfii = function() {
      return (n.dynCall_iiififfii = n.asm.gA).apply(null, arguments)
    }, n.dynCall_viiiiiiji = function() {
      return (n.dynCall_viiiiiiji = n.asm.hA).apply(null, arguments)
    }, n.dynCall_iiiijiii = function() {
      return (n.dynCall_iiiijiii = n.asm.iA).apply(null, arguments)
    }, n.dynCall_jiiiiiii = function() {
      return (n.dynCall_jiiiiiii = n.asm.jA).apply(null, arguments)
    }, n.dynCall_iiiiiiiiiiiiiii = function() {
      return (n.dynCall_iiiiiiiiiiiiiii = n.asm.kA).apply(null, arguments)
    }, n.dynCall_iiiiiiiiiiiiiiii = function() {
      return (n.dynCall_iiiiiiiiiiiiiiii = n.asm.lA).apply(null, arguments)
    }, n.dynCall_iiiiiiiiiiiiiiiiiii = function() {
      return (n.dynCall_iiiiiiiiiiiiiiiiiii = n.asm.mA).apply(null, arguments)
    }, n.dynCall_iiijjii = function() {
      return (n.dynCall_iiijjii = n.asm.nA).apply(null, arguments)
    }, n.dynCall_viiiiifiiiifii = function() {
      return (n.dynCall_viiiiifiiiifii = n.asm.oA).apply(null, arguments)
    }, n.dynCall_viiiiiffiffifffiiiifii = function() {
      return (n.dynCall_viiiiiffiffifffiiiifii = n.asm.pA).apply(null, arguments)
    }, n.dynCall_viiiiiiiiiiiifiiiifiiiiiii = function() {
      return (n.dynCall_viiiiiiiiiiiifiiiifiiiiiii = n.asm.qA).apply(null, arguments)
    }, n.dynCall_vifffffiiii = function() {
      return (n.dynCall_vifffffiiii = n.asm.rA).apply(null, arguments)
    }, n.dynCall_viffiiiiiiiiiiiifiiiifiiiiiiii = function() {
      return (n.dynCall_viffiiiiiiiiiiiifiiiifiiiiiiii = n.asm.sA).apply(null, arguments)
    }, n.dynCall_vij = function() {
      return (n.dynCall_vij = n.asm.tA).apply(null, arguments)
    }, n.dynCall_fff = function() {
      return (n.dynCall_fff = n.asm.uA).apply(null, arguments)
    }, n.dynCall_vif = function() {
      return (n.dynCall_vif = n.asm.vA).apply(null, arguments)
    }, n.dynCall_ijj = function() {
      return (n.dynCall_ijj = n.asm.wA).apply(null, arguments)
    }, n.dynCall_ij = function() {
      return (n.dynCall_ij = n.asm.xA).apply(null, arguments)
    }, n.dynCall_viffff = function() {
      return (n.dynCall_viffff = n.asm.yA).apply(null, arguments)
    }, n.dynCall_vid = function() {
      return (n.dynCall_vid = n.asm.zA).apply(null, arguments)
    }, n.dynCall_viiiiif = function() {
      return (n.dynCall_viiiiif = n.asm.AA).apply(null, arguments)
    }, n.dynCall_viiiif = function() {
      return (n.dynCall_viiiif = n.asm.BA).apply(null, arguments)
    }, n.dynCall_viiiiiif = function() {
      return (n.dynCall_viiiiiif = n.asm.CA).apply(null, arguments)
    }, n.dynCall_iiiij = function() {
      return (n.dynCall_iiiij = n.asm.DA).apply(null, arguments)
    }, n.dynCall_fif = function() {
      return (n.dynCall_fif = n.asm.EA).apply(null, arguments)
    }, n.dynCall_iiiiiifff = function() {
      return (n.dynCall_iiiiiifff = n.asm.FA).apply(null, arguments)
    }, n.dynCall_iiiiiifiif = function() {
      return (n.dynCall_iiiiiifiif = n.asm.GA).apply(null, arguments)
    }, n.dynCall_iiiiiiifiif = function() {
      return (n.dynCall_iiiiiiifiif = n.asm.HA).apply(null, arguments)
    }, n.dynCall_fiff = function() {
      return (n.dynCall_fiff = n.asm.IA).apply(null, arguments)
    }, n.dynCall_fiiiiiifiifif = function() {
      return (n.dynCall_fiiiiiifiifif = n.asm.JA).apply(null, arguments)
    }, n.dynCall_fiiiiiifiiiif = function() {
      return (n.dynCall_fiiiiiifiiiif = n.asm.KA).apply(null, arguments)
    }, n.dynCall_iifiiiijii = function() {
      return (n.dynCall_iifiiiijii = n.asm.LA).apply(null, arguments)
    }, n.dynCall_vifijii = function() {
      return (n.dynCall_vifijii = n.asm.MA).apply(null, arguments)
    }, n.dynCall_iiiifffiii = function() {
      return (n.dynCall_iiiifffiii = n.asm.NA).apply(null, arguments)
    }, n.dynCall_iiiifffffi = function() {
      return (n.dynCall_iiiifffffi = n.asm.OA).apply(null, arguments)
    }, n.dynCall_viffiiiif = function() {
      return (n.dynCall_viffiiiif = n.asm.PA).apply(null, arguments)
    }, n.dynCall_viffiifffffiii = function() {
      return (n.dynCall_viffiifffffiii = n.asm.QA).apply(null, arguments)
    }, n.dynCall_viffffiifffiiiiif = function() {
      return (n.dynCall_viffffiifffiiiiif = n.asm.RA).apply(null, arguments)
    }, n.dynCall_iiiifffffii = function() {
      return (n.dynCall_iiiifffffii = n.asm.SA).apply(null, arguments)
    }, n.dynCall_viiiiiiiiiiifii = function() {
      return (n.dynCall_viiiiiiiiiiifii = n.asm.TA).apply(null, arguments)
    }, n.dynCall_viff = function() {
      return (n.dynCall_viff = n.asm.UA).apply(null, arguments)
    }, n.dynCall_iiiiifiiiiif = function() {
      return (n.dynCall_iiiiifiiiiif = n.asm.VA).apply(null, arguments)
    }, n.dynCall_viiiifiiiiif = function() {
      return (n.dynCall_viiiifiiiiif = n.asm.WA).apply(null, arguments)
    }, n.dynCall_iifff = function() {
      return (n.dynCall_iifff = n.asm.XA).apply(null, arguments)
    }, n.dynCall_iif = function() {
      return (n.dynCall_iif = n.asm.YA).apply(null, arguments)
    }, n.dynCall_viijijj = function() {
      return (n.dynCall_viijijj = n.asm.ZA).apply(null, arguments)
    }, n.dynCall_viijj = function() {
      return (n.dynCall_viijj = n.asm._A).apply(null, arguments)
    }, n.dynCall_iiijji = function() {
      return (n.dynCall_iiijji = n.asm.$A).apply(null, arguments)
    }, n.dynCall_ijjiiiii = function() {
      return (n.dynCall_ijjiiiii = n.asm.aB).apply(null, arguments)
    }, n.dynCall_vidd = function() {
      return (uS = n.dynCall_vidd = n.asm.bB).apply(null, arguments)
    }),
    fS = (n.dynCall_iiiiiifffiiifiii = function() {
      return (n.dynCall_iiiiiifffiiifiii = n.asm.cB).apply(null, arguments)
    }, n.dynCall_fiiiif = function() {
      return (n.dynCall_fiiiif = n.asm.dB).apply(null, arguments)
    }, n.dynCall_vifff = function() {
      return (n.dynCall_vifff = n.asm.eB).apply(null, arguments)
    }, n.dynCall_viifff = function() {
      return (n.dynCall_viifff = n.asm.fB).apply(null, arguments)
    }, n.dynCall_vf = function() {
      return (n.dynCall_vf = n.asm.gB).apply(null, arguments)
    }, n.dynCall_vffff = function() {
      return (fS = n.dynCall_vffff = n.asm.hB).apply(null, arguments)
    }),
    cS = (n.dynCall_vff = function() {
      return (n.dynCall_vff = n.asm.iB).apply(null, arguments)
    }, n.dynCall_f = function() {
      return (n.dynCall_f = n.asm.jB).apply(null, arguments)
    }, n.dynCall_ff = function() {
      return (n.dynCall_ff = n.asm.kB).apply(null, arguments)
    }, n.dynCall_d = function() {
      return (n.dynCall_d = n.asm.lB).apply(null, arguments)
    }, n.dynCall_fiif = function() {
      return (n.dynCall_fiif = n.asm.mB).apply(null, arguments)
    }, n.dynCall_iiiiiiffiiiiiiiiiffffiii = function() {
      return (n.dynCall_iiiiiiffiiiiiiiiiffffiii = n.asm.nB).apply(null, arguments)
    }, n.dynCall_vfff = function() {
      return (cS = n.dynCall_vfff = n.asm.oB).apply(null, arguments)
    });

  function sS(n, e, i) {
    var t = jg();
    try {
      return zg(n, e, i)
    } catch (n) {
      if (Tg(t), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function dS(n, e, i, t, r, a) {
    var o = jg();
    try {
      return nh(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function pS(n, e, i) {
    var t = jg();
    try {
      Ug(n, e, i)
    } catch (n) {
      if (Tg(t), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function mS(n, e, i, t) {
    var r = jg();
    try {
      return Hg(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function yS(n, e, i, t, r) {
    var a = jg();
    try {
      eh(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function vS(n, e, i, t, r) {
    var a = jg();
    try {
      return Jg(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function _S(n, e, i, t) {
    var r = jg();
    try {
      return Mh(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function gS(n, e, i, t) {
    var r = jg();
    try {
      return Dh(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function hS(n, e, i, t) {
    var r = jg();
    try {
      Nw(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function wS(n, e) {
    var i = jg();
    try {
      Yg(n, e)
    } catch (n) {
      if (Tg(i), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function SS(n, e, i, t) {
    var r = jg();
    try {
      Zg(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function CS(n, e) {
    var i = jg();
    try {
      return qg(n, e)
    } catch (n) {
      if (Tg(i), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function ES(n) {
    var e = jg();
    try {
      $g(n)
    } catch (n) {
      if (Tg(e), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function WS(n) {
    var e = jg();
    try {
      return Qg(n)
    } catch (n) {
      if (Tg(e), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function bS(n, e, i, t, r, a, o, l) {
    var u = jg();
    try {
      return th(n, e, i, t, r, a, o, l)
    } catch (n) {
      if (Tg(u), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function AS(n, e, i, t, r, a) {
    var o = jg();
    try {
      oh(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function DS(n, e, i, t, r, a, o) {
    var l = jg();
    try {
      return lh(n, e, i, t, r, a, o)
    } catch (n) {
      if (Tg(l), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function MS(n, e, i, t, r, a, o, l, u, f, c) {
    var s = jg();
    try {
      return Yw(n, e, i, t, r, a, o, l, u, f, c)
    } catch (n) {
      if (Tg(s), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function kS(n, e, i, t, r, a, o, l) {
    var u = jg();
    try {
      Sh(n, e, i, t, r, a, o, l)
    } catch (n) {
      if (Tg(u), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function xS(n, e, i, t, r, a, o, l, u, f, c) {
    var s = jg();
    try {
      Hh(n, e, i, t, r, a, o, l, u, f, c)
    } catch (n) {
      if (Tg(s), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function XS(n, e, i, t, r, a, o) {
    var l = jg();
    try {
      dh(n, e, i, t, r, a, o)
    } catch (n) {
      if (Tg(l), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function jS(n, e, i, t, r, a, o, l, u) {
    var f = jg();
    try {
      return Eh(n, e, i, t, r, a, o, l, u)
    } catch (n) {
      if (Tg(f), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function TS(n, e, i, t, r, a) {
    var o = jg();
    try {
      ch(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function LS(n, e, i, t, r, a, o, l, u, f) {
    var c = jg();
    try {
      sh(n, e, i, t, r, a, o, l, u, f)
    } catch (n) {
      if (Tg(c), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function FS(n, e, i, t, r, a, o, l, u) {
    var f = jg();
    try {
      Ih(n, e, i, t, r, a, o, l, u)
    } catch (n) {
      if (Tg(f), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function PS(n, e, i) {
    var t = jg();
    try {
      return hh(n, e, i)
    } catch (n) {
      if (Tg(t), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function RS(n, e, i, t, r) {
    var a = jg();
    try {
      return bh(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function BS(n, e, i, t, r) {
    var a = jg();
    try {
      return Ah(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function GS(n, e, i) {
    var t = jg();
    try {
      return kh(n, e, i)
    } catch (n) {
      if (Tg(t), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function OS(n, e, i, t) {
    var r = jg();
    try {
      xh(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function IS(n, e, i, t) {
    var r = jg();
    try {
      Xh(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function KS(n, e, i, t, r) {
    var a = jg();
    try {
      Lh(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function NS(n, e, i, t, r) {
    var a = jg();
    try {
      Fh(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function US(n, e, i, t, r) {
    var a = jg();
    try {
      Ph(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function zS(n, e, i) {
    var t = jg();
    try {
      return Gh(n, e, i)
    } catch (n) {
      if (Tg(t), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function qS(n, e, i) {
    var t = jg();
    try {
      return Oh(n, e, i)
    } catch (n) {
      if (Tg(t), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function HS(n, e, i, t, r, a, o, l, u, f, c, s, d) {
    var p = jg();
    try {
      Kh(n, e, i, t, r, a, o, l, u, f, c, s, d)
    } catch (n) {
      if (Tg(p), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function VS(n, e, i, t) {
    var r = jg();
    try {
      return Nh(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function YS(n, e, i, t) {
    var r = jg();
    try {
      return zh(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function JS(n, e, i, t) {
    var r = jg();
    try {
      return qh(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function ZS(n, e, i, t) {
    var r = jg();
    try {
      return Vh(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function QS(n, e, i, t, r, a, o, l, u, f) {
    var c = jg();
    try {
      return Yh(n, e, i, t, r, a, o, l, u, f)
    } catch (n) {
      if (Tg(c), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function $S(n, e, i, t, r) {
    var a = jg();
    try {
      Qh(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function nC(n, e) {
    var i = jg();
    try {
      return $h(n, e)
    } catch (n) {
      if (Tg(i), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function eC(n, e, i, t, r, a) {
    var o = jg();
    try {
      nw(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function iC(n, e, i, t, r, a, o) {
    var l = jg();
    try {
      return iw(n, e, i, t, r, a, o)
    } catch (n) {
      if (Tg(l), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function tC(n, e, i, t, r) {
    var a = jg();
    try {
      return tw(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function rC(n, e, i, t, r, a) {
    var o = jg();
    try {
      rw(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function aC(n, e, i, t, r, a, o) {
    var l = jg();
    try {
      fw(n, e, i, t, r, a, o)
    } catch (n) {
      if (Tg(l), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function oC(n, e, i, t, r, a) {
    var o = jg();
    try {
      return uw(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function lC(n, e, i, t, r, a) {
    var o = jg();
    try {
      cw(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function uC(n, e, i, t, r, a) {
    var o = jg();
    try {
      sw(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function fC(n, e, i, t, r, a) {
    var o = jg();
    try {
      dw(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function cC(n, e, i, t, r) {
    var a = jg();
    try {
      return mw(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function sC(n, e, i, t, r, a) {
    var o = jg();
    try {
      yw(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function dC(n, e, i, t, r, a, o, l, u, f, c, s) {
    var d = jg();
    try {
      return vw(n, e, i, t, r, a, o, l, u, f, c, s)
    } catch (n) {
      if (Tg(d), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function pC(n, e, i, t, r, a) {
    var o = jg();
    try {
      return _w(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function mC(n, e, i, t, r, a, o, l) {
    var u = jg();
    try {
      return gw(n, e, i, t, r, a, o, l)
    } catch (n) {
      if (Tg(u), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function yC(n, e, i, t, r) {
    var a = jg();
    try {
      return hw(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function vC(n, e, i, t, r) {
    var a = jg();
    try {
      ew(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function _C(n, e, i, t, r, a, o, l) {
    var u = jg();
    try {
      ww(n, e, i, t, r, a, o, l)
    } catch (n) {
      if (Tg(u), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function gC(n, e, i, t, r, a, o, l, u) {
    var f = jg();
    try {
      Sw(n, e, i, t, r, a, o, l, u)
    } catch (n) {
      if (Tg(f), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function hC(n, e, i, t, r, a) {
    var o = jg();
    try {
      return Ww(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function wC(n, e, i, t, r, a) {
    var o = jg();
    try {
      return bw(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function SC(n, e, i, t, r, a, o, l, u, f, c, s, d, p, m) {
    var y = jg();
    try {
      Pw(n, e, i, t, r, a, o, l, u, f, c, s, d, p, m)
    } catch (n) {
      if (Tg(y), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function CC(n, e, i, t, r, a, o, l) {
    var u = jg();
    try {
      return Kw(n, e, i, t, r, a, o, l)
    } catch (n) {
      if (Tg(u), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function EC(n, e, i, t, r) {
    var a = jg();
    try {
      Uw(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function WC(n, e, i, t, r) {
    var a = jg();
    try {
      return zw(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function bC(n, e, i, t, r, a, o) {
    var l = jg();
    try {
      qw(n, e, i, t, r, a, o)
    } catch (n) {
      if (Tg(l), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function AC(n, e, i, t, r, a) {
    var o = jg();
    try {
      Hw(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function DC(n, e, i, t) {
    var r = jg();
    try {
      return rS(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function MC(n, e, i, t, r, a, o, l, u, f) {
    var c = jg();
    try {
      aS(n, e, i, t, r, a, o, l, u, f)
    } catch (n) {
      if (Tg(c), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function kC(n, e, i, t, r, a, o, l) {
    var u = jg();
    try {
      return oS(n, e, i, t, r, a, o, l)
    } catch (n) {
      if (Tg(u), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function xC(n, e, i, t, r, a, o, l) {
    var u = jg();
    try {
      tS(n, e, i, t, r, a, o, l)
    } catch (n) {
      if (Tg(u), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function XC(n, e, i, t, r, a, o, l, u) {
    var f = jg();
    try {
      lS(n, e, i, t, r, a, o, l, u)
    } catch (n) {
      if (Tg(f), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function jC(n, e, i, t) {
    var r = jg();
    try {
      uS(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function TC(n, e, i, t, r) {
    var a = jg();
    try {
      return Wh(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function LC(n, e, i, t, r) {
    var a = jg();
    try {
      return ih(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function FC(n) {
    var e = jg();
    try {
      return Rw(n)
    } catch (n) {
      if (Tg(e), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function PC(n, e, i, t) {
    var r = jg();
    try {
      return ah(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function RC(n, e, i, t, r, a, o, l) {
    var u = jg();
    try {
      return rh(n, e, i, t, r, a, o, l)
    } catch (n) {
      if (Tg(u), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function BC(n, e, i) {
    var t = jg();
    try {
      return uh(n, e, i)
    } catch (n) {
      if (Tg(t), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function GC(n, e) {
    var i = jg();
    try {
      return _h(n, e)
    } catch (n) {
      if (Tg(i), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function OC(n, e, i, t, r, a, o) {
    var l = jg();
    try {
      kw(n, e, i, t, r, a, o)
    } catch (n) {
      if (Tg(l), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function IC(n, e, i, t, r, a, o) {
    var l = jg();
    try {
      return Aw(n, e, i, t, r, a, o)
    } catch (n) {
      if (Tg(l), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function KC(n, e, i, t) {
    var r = jg();
    try {
      return fh(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function NC(n, e, i, t, r, a) {
    var o = jg();
    try {
      return Tw(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function UC(n, e, i, t, r, a, o, l, u, f) {
    var c = jg();
    try {
      return jw(n, e, i, t, r, a, o, l, u, f)
    } catch (n) {
      if (Tg(c), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function zC(n, e, i, t, r, a) {
    var o = jg();
    try {
      ow(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function qC(n, e, i, t, r, a, o) {
    var l = jg();
    try {
      return Lw(n, e, i, t, r, a, o)
    } catch (n) {
      if (Tg(l), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function HC(n, e, i, t, r, a, o, l, u, f, c, s) {
    var d = jg();
    try {
      return Xw(n, e, i, t, r, a, o, l, u, f, c, s)
    } catch (n) {
      if (Tg(d), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function VC(n, e, i, t, r, a, o, l, u, f) {
    var c = jg();
    try {
      return xw(n, e, i, t, r, a, o, l, u, f)
    } catch (n) {
      if (Tg(c), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function YC(n, e, i, t, r, a) {
    var o = jg();
    try {
      return gh(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function JC(n, e, i, t, r, a, o, l, u, f, c) {
    var s = jg();
    try {
      return ph(n, e, i, t, r, a, o, l, u, f, c)
    } catch (n) {
      if (Tg(s), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function ZC(n, e, i, t, r, a) {
    var o = jg();
    try {
      return vh(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function QC(n, e, i, t, r, a, o, l, u, f, c, s, d, p) {
    var m = jg();
    try {
      wh(n, e, i, t, r, a, o, l, u, f, c, s, d, p)
    } catch (n) {
      if (Tg(m), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function $C(n, e, i, t) {
    var r = jg();
    try {
      return mh(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function nE(n, e, i, t, r) {
    var a = jg();
    try {
      return yh(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function eE(n, e, i, t, r, a) {
    var o = jg();
    try {
      return Ch(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function iE(n, e, i, t, r) {
    var a = jg();
    try {
      jh(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function tE(n, e, i, t, r, a) {
    var o = jg();
    try {
      Th(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function rE(n, e, i, t, r, a) {
    var o = jg();
    try {
      Rh(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function aE(n, e, i, t, r) {
    var a = jg();
    try {
      Bh(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function oE(n, e, i, t) {
    var r = jg();
    try {
      return Uh(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function lE(n, e, i, t, r) {
    var a = jg();
    try {
      return Jh(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function uE(n, e, i, t) {
    var r = jg();
    try {
      return Zh(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function fE(n, e, i) {
    var t = jg();
    try {
      return aw(n, e, i)
    } catch (n) {
      if (Tg(t), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function cE(n, e, i, t, r) {
    var a = jg();
    try {
      return Vg(n, e, i, t, r)
    } catch (n) {
      if (Tg(a), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function sE(n, e, i, t, r, a, o, l) {
    var u = jg();
    try {
      lw(n, e, i, t, r, a, o, l)
    } catch (n) {
      if (Tg(u), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function dE(n, e, i, t, r, a, o) {
    var l = jg();
    try {
      return pw(n, e, i, t, r, a, o)
    } catch (n) {
      if (Tg(l), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function pE(n, e, i, t, r, a, o) {
    var l = jg();
    try {
      Cw(n, e, i, t, r, a, o)
    } catch (n) {
      if (Tg(l), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function mE(n, e, i, t, r, a, o) {
    var l = jg();
    try {
      return Ew(n, e, i, t, r, a, o)
    } catch (n) {
      if (Tg(l), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function yE(n, e, i, t, r, a, o, l, u) {
    var f = jg();
    try {
      Dw(n, e, i, t, r, a, o, l, u)
    } catch (n) {
      if (Tg(f), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function vE(n, e, i, t, r, a, o) {
    var l = jg();
    try {
      Fw(n, e, i, t, r, a, o)
    } catch (n) {
      if (Tg(l), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function _E(n, e, i, t, r, a) {
    var o = jg();
    try {
      return Bw(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function gE(n, e, i, t, r, a, o, l, u, f, c, s) {
    var d = jg();
    try {
      return Gw(n, e, i, t, r, a, o, l, u, f, c, s)
    } catch (n) {
      if (Tg(d), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function hE(n, e, i, t) {
    var r = jg();
    try {
      Ow(n, e, i, t)
    } catch (n) {
      if (Tg(r), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function wE(n, e, i, t, r, a) {
    var o = jg();
    try {
      return Iw(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function SE(n, e, i, t, r, a, o, l, u) {
    var f = jg();
    try {
      Vw(n, e, i, t, r, a, o, l, u)
    } catch (n) {
      if (Tg(f), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function CE(n, e, i, t, r, a, o) {
    var l = jg();
    try {
      return Mw(n, e, i, t, r, a, o)
    } catch (n) {
      if (Tg(l), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function EE(n, e, i, t, r, a, o, l, u, f, c) {
    var s = jg();
    try {
      Jw(n, e, i, t, r, a, o, l, u, f, c)
    } catch (n) {
      if (Tg(s), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function WE(n, e, i, t, r, a, o) {
    var l = jg();
    try {
      Zw(n, e, i, t, r, a, o)
    } catch (n) {
      if (Tg(l), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function bE(n, e, i, t, r, a, o, l, u, f, c) {
    var s = jg();
    try {
      Qw(n, e, i, t, r, a, o, l, u, f, c)
    } catch (n) {
      if (Tg(s), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function AE(n, e, i, t, r, a, o, l, u, f, c, s, d) {
    var p = jg();
    try {
      return $w(n, e, i, t, r, a, o, l, u, f, c, s, d)
    } catch (n) {
      if (Tg(p), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function DE(n, e, i, t, r, a, o, l) {
    var u = jg();
    try {
      nS(n, e, i, t, r, a, o, l)
    } catch (n) {
      if (Tg(u), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function ME(n, e, i, t, r, a, o, l) {
    var u = jg();
    try {
      eS(n, e, i, t, r, a, o, l)
    } catch (n) {
      if (Tg(u), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function kE(n, e, i, t, r, a) {
    var o = jg();
    try {
      return iS(n, e, i, t, r, a)
    } catch (n) {
      if (Tg(o), n !== n + 0 && "longjmp" !== n) throw n;
      Fg(1, 0)
    }
  }

  function xE(n) {
    this.name = "ExitStatus", this.message = "Program terminated with exit(" + n + ")", this.status = n
  }

  function XE(e) {
    var i = n._main,
      t = (e = e || []).length + 1,
      r = Lg(4 * (t + 1));
    Z[r >> 2] = fn(_);
    for (var a = 1; a < t; a++) Z[(r >> 2) + a] = fn(e[a - 1]);
    Z[(r >> 2) + t] = 0;
    try {
      TE(i(t, r), !0)
    } catch (n) {
      if (n instanceof xE) return;
      if ("unwind" == n) return;
      var o = n;
      n && "object" == typeof n && n.stack && (o = [n, n.stack]), x("exception thrown: " + o), g(1, n)
    } finally {
      if (!0 === I) return;
      GameGlobal.unityNamespace.pluginCalledMainCb && GameGlobal.unityNamespace.pluginCalledMainCb(), !0, n.calledMainCb && n.calledMainCb(), (GameGlobal.unityNamespace.enableProfileStats || "function" == typeof GameGlobal.manager.getWXAppCheatMonitor && GameGlobal.manager.getWXAppCheatMonitor().shouldForceShowPerfMonitor()) && setTimeout(() => {
        p("WXSDKManagerHandler", "OpenProfileStats")
      }, 1e4)
    }
  }

  function jE(e) {
    function i() {
      GameGlobal.manager.TimeLogger.timeStart("callMain耗时"), hg || (hg = !0, n.calledRun = !0, I || (Cn(), En(), n.onRuntimeInitialized && n.onRuntimeInitialized(), LE && XE(e), bn()))
    }
    e = e || v, kn > 0 || (Sn(), kn > 0 || (n.setStatus ? (n.setStatus("Running..."), setTimeout((function() {
      setTimeout((function() {
        n.setStatus("")
      }), 1), i()
    }), 1)) : i()))
  }

  function TE(e, i) {
    O = e, i && Yn() && 0 === e || (Yn() || (Wn(), n.onExit && n.onExit(e), I = !0), g(e, new xE(e)))
  }
  if (n.GL = Gp, n.ccall = U, n.cwrap = z, n.stringToUTF8 = on, n.lengthBytesUTF8 = ln, n.stackTrace = Jn, n.addRunDependency = jn, n.removeRunDependency = Tn, n.FS_createPath = Xc.createPath, n.FS_createDataFile = Xc.createDataFile, n.stackTrace = Jn, Xn = function n() {
      hg || jE(), hg || (Xn = n)
    }, n.run = jE, n.preInit)
    for ("function" == typeof n.preInit && (n.preInit = [n.preInit]); n.preInit.length > 0;) n.preInit.pop()();
  var LE = !0;
  n.noInitialRun && (LE = !1), jE()
}, GameGlobal.unityNamespace.useWasmCodeSplit = !0, GameGlobal.unityNamespace.WASM_SPLIT_SUB_VERSION = 2, GameGlobal.unityNamespace.WASM_SPLIT_API_VERSION = 7, GameGlobal.unityNamespace.WASM_SPLIT_PLUGIN_VERSION = "1.1.37";