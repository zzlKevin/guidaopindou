var e = require("./@babel/runtime/helpers/typeof");
require("./@babel/runtime/helpers/Objectentries");
var a, t, n = require("./@babel/runtime/helpers/toConsumableArray"),
  s = require("./@babel/runtime/helpers/slicedToArray"),
  i = require("./@babel/runtime/helpers/createForOfIteratorHelper"),
  o = require("./@babel/runtime/helpers/classCallCheck"),
  r = require("./@babel/runtime/helpers/createClass"),
  l = require("./import-func-index"),
  m = "undefined" != typeof wx && wx.getSystemInfoSync ? wx.getSystemInfoSync() : {},
  u = m.platform || "",
  c = "ios" === u,
  f = "android" === u,
  G = m.version || "0.0.0",
  p = m.SDKVersion || "0.0.0",
  b = "SDK-OverSea" === (null === (a = m.host) || void 0 === a ? void 0 : a.env) && f && (null === (t = m.host) || void 0 === t ? void 0 : t.version) < 587405312;

function g(e, a) {
  var t = /^\d+(\.\d+)*$/;
  if (!t.test(e) || !t.test(a)) return -1;
  for (var n = e.split("."), s = a.split("."), i = Math.max(n.length, s.length), o = 0; o < i; o++) {
    var r = o < n.length ? parseInt(n[o], 10) : 0,
      l = o < s.length ? parseInt(s[o], 10) : 0;
    if (r > l) return 1;
    if (r < l) return -1
  }
  return 0
}
var d, h = "wasmcode",
  w = "wasmcode1",
  v = "wasmcode2",
  y = "wasmcode/",
  M = "wasmcode1/",
  S = "wasmcode2/",
  k = !1,
  N = !1,
  _ = 3e4,
  F = 0,
  C = f && g(G, "8.0.30") && g(p, "2.28.1") && !b,
  I = c && !GameGlobal.isIOSHighPerformanceMode && g(G, "8.0.31") && g(p, "2.28.1"),
  D = f && "8.0.25" === G;
(C || I) && (N = !0);
var A = null;

function L(e) {
  var a;
  !A && e && (wx && "function" == typeof wx.createSignal && (a = wx.createSignal()), A = null == a ? a : {
    waitingCnt: 0,
    signal: a,
    wait: function() {
      this.signal && (this.waitingCnt++, console.log("[PLUGIN SUBWASM LOG]before signal wait, waitingCount: ", this.waitingCnt), this.signal.wait(), this.waitingCnt--, console.log("[PLUGIN SUBWASM LOG]after signal wait"))
    },
    notify: function() {
      GameGlobal.unityNamespace.eventLog("signal notify, waitingCount: ", this.waitingCnt), this.waitingCnt <= 0 || (this.signal.notify(), setTimeout(this.notify.bind(this), 1))
    }
  });
  return A
}
var T, W = (wx.getAccountInfoSync() || {}).miniProgram,
  E = W && "release" != W.envVersion,
  P = [],
  J = !1;

function B(e, a) {
  if (J) e(a);
  else {
    var t = Date.now();
    if (GameGlobal.unityNamespace.eventLog("start loadSubPackage wasmcode1"), P.push({
        callback: e,
        needBlock: a
      }), !T) {
      T = wx.loadSubpackage({
        name: w,
        waiterMode: N,
        success: function() {
          var e = Date.now() - t;
          GameGlobal.unityNamespace.eventLog("下载代码分包1完毕: ", (e / 1e3).toFixed(2), "s"), GameGlobal.manager.subWasmDownloaded(e), J = !0, P.forEach((function(e) {
            return e.callback(e.needBlock)
          })), P = []
        },
        fail: function(e) {
          GameGlobal.manager.Logger.pluginError("load wasmcode1 fail:", e), GameGlobal.manager.subWasmDownloadError(e)
        }
      });
      var n = 0;
      T.onProgressUpdate((function(e) {
        var a = Math.floor(e.progress / 10);
        if (a != n) {
          var t = (e.totalBytesWritten / 1048576).toFixed(2),
            s = (e.totalBytesExpectedToWrite / 1048576).toFixed(2);
          console.log("代码分包1下载进度", e.progress, t, "MB;", s, "MB")
        }
        n = a
      }))
    }
    if (N && a) {
      T.await();
      var s = Date.now() - t;
      GameGlobal.unityNamespace.eventLog("await loadSubWasmPackage and callback: ", (s / 1e3).toFixed(2), "s")
    }
  }
}
var x = !1,
  O = !1;

function R(e) {
  GameGlobal.unityNamespace.eventLog("start compileSubWasm: needBlock ", e), GameGlobal.manager.beforeLoadSubWasm();
  var a = Date.now(),
    t = M + GameGlobal.unityNamespace.CODE_FILE_MD5 + "." + GameGlobal.unityNamespace.GAME_NAME + ".wasm.code.unityweb.wasm.br",
    n = function(e) {
      var t = Date.now() - a;
      GameGlobal.manager.subWasmCompiled(t), GameGlobal.unityNamespace.eventLog("[PLUGIN SUBWASM LOG]subwasm loaded: ", t), oe(wasm_split_info.primary.memory), O = !0, N || null === L(!1) || L(!1).notify()
    };
  N && e ? (new WXWebAssembly.Instance(t, wasm_split_info), n()) : WXWebAssembly.instantiate(t, wasm_split_info).then(n).catch((function(e) {
    console.error("wasmcode1 catch ", e)
  }))
}

function j(e) {
  setTimeout((function a() {
    O ? e() : setTimeout(a, 1)
  }), 1)
}

function U(e) {
  if (!O)
    if (!x || N) {
      if (x = !0, GameGlobal.unityNamespace.eventLog("start instantiateSubWasm: needBlock ", e), B(R, e), !N && e && null != L(!0)) {
        GameGlobal.unityNamespace.eventLog("start wait for loadSubWasmPackage");
        var a = Date.now();
        L(!0).wait(), GameGlobal.manager.reportWaitTime(Date.now() - a)
      }
    } else if (e && null != L(!0)) {
    GameGlobal.unityNamespace.eventLog("start wait for instantiating task");
    var t = Date.now();
    L(!0).wait(), GameGlobal.manager.reportWaitTime(Date.now() - t)
  }
}

function H(e) {
  GameGlobal.unityNamespace.eventLog("Now init wasmsplit"), z = !0;
  var a = Date.now();
  GameGlobal.manager.wasmsplit.innerInitFuncSplitWasm({
    archiveArray: e,
    success: function() {
      var t = Date.now() - a;
      GameGlobal.manager.reportInitFuncSplitWasm(e.byteLength, t, !GameGlobal.firstInvoke)
    }
  })
}
var z = !1;

function q() {
  if (GameGlobal.unityNamespace.eventLog("Async initializing function split..."), !z) {
    var e = wx.getFileSystemManager(),
      a = Date.now(),
      t = S + d;
    e.readFile({
      filePath: t,
      position: 0,
      success: function(e) {
        var t = Date.now() - a;
        GameGlobal.unityNamespace.eventLog("wasmcode2 file async read time (ms): ", t), H(e.data)
      },
      fail: function(e) {
        GameGlobal.manager.Logger.pluginError("Async wasmcode2 file read failed", e), z = !0
      }
    })
  }
}
var V = !1;

function K() {
  var e = Date.now();
  if (!V) {
    GameGlobal.unityNamespace.eventLog("start loadSubPackage", v), V = !0;
    var a = wx.loadSubpackage({
        name: v,
        waiterMode: !1,
        success: function() {
          var a = Date.now() - e;
          console.log("下载wasmcode2数据完毕: ", (a / 1e3).toFixed(2), "s"), F > 0 && setTimeout(q, F), 0 == F && q()
        },
        fail: function(e) {
          GameGlobal.manager.Logger.pluginError("下载wasmcode2数据失败:", e)
        }
      }),
      t = 0;
    a && a.onProgressUpdate((function(e) {
      var a = Math.floor(e.progress / 10);
      if (a != t) {
        var n = (e.totalBytesWritten / 1048576).toFixed(2),
          s = (e.totalBytesExpectedToWrite / 1048576).toFixed(2);
        console.log("下载wasmcode2数据进度", e.progress, n, "MB;", s, "MB")
      }
      t = a
    }))
  }
}

function X() {
  $.size > 0 && (GameGlobal.manager.reportCalledFuncs && GameGlobal.manager.reportCalledFuncs({
    called_func_list: Array.from($.keys()),
    func_cnt_list: Array.from($.values()),
    sub_version: GameGlobal.unityNamespace.WASM_SPLIT_SUB_VERSION
  }), $.clear())
}
GameGlobal.firstInvoke = !0, window.Math_abs = Math.abs, window.Math_cos = Math.cos, window.Math_sin = Math.sin, window.Math_sqrt = Math.sqrt, window.Math_ceil = Math.ceil, window.Math_floor = Math.floor, window.Math_pow = Math.pow, window.Math_min = Math.min, window.Math_max = Math.max, window.Math_fround = Math.fround, window.Math_imul = Math.imul, window.Math_clz32 = Math.clz32, window.Math_trunc = Math.trunc, window.FUNCTION_TABLE = [];
var $ = new Map,
  Q = new Set;

function Y() {
  var e = GameGlobal.unityNamespace.logCallBasePtr;
  if (e)
    for (var a = new Int32Array(window.wasm_split_info.primary.memory.buffer), t = 0; t < GameGlobal.unityNamespace.logCallMemorySize; t++) a[e + t] && ($.set(t, a[e + t]), a[e + t] = 0);
  $.size > 0 && (GameGlobal.manager.reportCalledFuncs({
    called_func_list: Array.from($.keys()),
    func_cnt_list: Array.from($.values()),
    sub_version: GameGlobal.unityNamespace.WASM_SPLIT_SUB_VERSION
  }), $.clear()), Q.size > 0 && (GameGlobal.manager.reportCalledFuncs({
    called_func_list: Array.from(Q),
    sub_version: GameGlobal.unityNamespace.WASM_SPLIT_SUB_VERSION,
    func_type: 1
  }), Q.clear()), setTimeout(Y, 5e3)
}
GameGlobal.unityNamespace.reportCalledFunc = Y, GameGlobal.unityNamespace.pluginCalledMainCbs || (GameGlobal.unityNamespace.pluginCalledMainCbs = []), GameGlobal.unityNamespace.pluginCalledMainCb || (GameGlobal.unityNamespace.pluginCalledMainCb = function() {
  this.pluginCalledMainCbs.forEach((function(e) {
    return e()
  }))
}), E && GameGlobal.unityNamespace.pluginCalledMainCbs.push(Y);
var Z = 1,
  ee = 6e4,
  ae = 5 * ee,
  te = new(function() {
    return r((function e() {
      o(this, e), this.gameStartTime = Date.now(), this.totalFrames = 0, this.currentSceneID = null, this.totalMissingFuncs = 0, this.accumulativeInvokeTime = 0, this.lastReportTime = 0, this.lastReportMissingFuncs = 0, this.lastReportAccumulativeInvokeTime = 0, this.funcMissTimes = [], this.totalFrameMissCount = 0, this.frameEventDurations = [], this.funcMissInFrameCounts = [], this.consecutiveMissStreaks = [], this.currentConsecutiveMissStreak = 0, this.lastFrameHadMiss = !1, this.lastProcessedFrameNumber = -1, this.currentFrameNumber = -1, this.frameMissEvents = new Map, this.processedFrames = new Set, this.jankStats = {
        MicroJanks: 0,
        SmallJanks: 0,
        Janks: 0,
        BigJanks: 0,
        HugeJanks: 0,
        Stucks: 0,
        MicroJankDuration: 0,
        SmallJankDuration: 0,
        JankDuration: 0,
        BigJankDuration: 0,
        HugeJankDuration: 0,
        StuckDuration: 0
      }
    }), [{
      key: "calculatePercentiles",
      value: function(e) {
        if (0 === e.length) return [0, 0, 0, 0];
        var a = e.slice().sort((function(e, a) {
            return e - a
          })),
          t = a.length,
          n = function(e) {
            var n = Math.ceil(t * e / 100) - 1;
            return a[Math.max(0, Math.min(n, t - 1))]
          };
        return [n(10), n(50), n(90), a[t - 1]]
      }
    }, {
      key: "getCurrentFrameNumber",
      value: function() {
        try {
          var e, a;
          return (null === (e = GameGlobal.unityNamespace.Browser) || void 0 === e || null === (a = e.mainLoop) || void 0 === a ? void 0 : a.currentFrameNumber) || 0
        } catch (e) {
          return 0
        }
      }
    }, {
      key: "processCompletedFrames",
      value: function(e) {
        var a, t = i(this.frameMissEvents.entries());
        try {
          for (t.s(); !(a = t.n()).done;) {
            var n = s(a.value, 2),
              o = n[0],
              r = n[1];
            o < e && !this.processedFrames.has(o) && (this.finalizeFrameEvent(o, r), this.processedFrames.add(o))
          }
        } catch (e) {
          t.e(e)
        } finally {
          t.f()
        }
      }
    }, {
      key: "finalizeFrameEvent",
      value: function(e, a) {
        var t = a.lastMissEndTime - a.firstMissStartTime;
        this.frameEventDurations.push(t), this.funcMissInFrameCounts.push(a.missCount), e === this.lastProcessedFrameNumber + 1 ? this.currentConsecutiveMissStreak++ : (this.currentConsecutiveMissStreak > 0 && this.consecutiveMissStreaks.push(this.currentConsecutiveMissStreak), this.currentConsecutiveMissStreak = 1), this.lastProcessedFrameNumber = e, this.classifyAndRecordJank(t)
      }
    }, {
      key: "classifyAndRecordJank",
      value: function(e) {
        e <= 8 ? (this.jankStats.MicroJanks++, this.jankStats.MicroJankDuration += e) : e > 8 && e <= 16 ? (this.jankStats.SmallJanks++, this.jankStats.SmallJankDuration += e) : e > 16 && e <= 33 ? (this.jankStats.Janks++, this.jankStats.JankDuration += e) : e > 33 && e <= 200 ? (this.jankStats.BigJanks++, this.jankStats.BigJankDuration += e) : e > 200 && e <= 1e3 ? (this.jankStats.HugeJanks++, this.jankStats.HugeJankDuration += e) : e > 1e3 && (this.jankStats.Stucks++, this.jankStats.StuckDuration += e)
      }
    }, {
      key: "recordFuncMiss",
      value: function(e) {
        if (ne) {
          var a = Date.now(),
            t = Date.now() - e;
          this.funcMissTimes.push(t), this.totalMissingFuncs++, this.accumulativeInvokeTime += t;
          var n = this.getCurrentFrameNumber();
          this.processCompletedFrames(n), this.frameMissEvents.has(n) || (this.frameMissEvents.set(n, {
            firstMissStartTime: e,
            lastMissEndTime: a,
            missCount: 0,
            missTimes: []
          }), this.totalFrameMissCount++);
          var s = this.frameMissEvents.get(n);
          s.lastMissEndTime = a, s.missCount++, s.missTimes.push(t)
        }
      }
    }, {
      key: "setSceneID",
      value: function(e) {
        this.currentSceneID = e
      }
    }, {
      key: "finalizeAllPendingFrames",
      value: function() {
        var e, a = this.getCurrentFrameNumber(),
          t = i(this.frameMissEvents.entries());
        try {
          for (t.s(); !(e = t.n()).done;) {
            var n = s(e.value, 2),
              o = n[0],
              r = n[1];
            this.processedFrames.has(o) || (o !== a || r.lastMissEndTime || (r.lastMissEndTime = Date.now()), this.finalizeFrameEvent(o, r), this.processedFrames.add(o))
          }
        } catch (e) {
          t.e(e)
        } finally {
          t.f()
        }
        this.currentConsecutiveMissStreak > 0 && (this.consecutiveMissStreaks.push(this.currentConsecutiveMissStreak), this.currentConsecutiveMissStreak = 0)
      }
    }, {
      key: "generateReportData",
      value: function() {
        return this.finalizeAllPendingFrames(), {
          TotalFrames: this.getCurrentFrameNumber(),
          SceneId: this.currentSceneID,
          TotalMissFuncs: this.totalMissingFuncs,
          TotalMissTime: this.accumulativeInvokeTime,
          FuncMissDist: JSON.stringify(this.calculatePercentiles(this.funcMissTimes)),
          TotalMissFrames: this.totalFrameMissCount,
          FrameMissDist: JSON.stringify(this.calculatePercentiles(this.frameEventDurations)),
          FuncMissInFrameDist: JSON.stringify(this.calculatePercentiles(this.funcMissInFrameCounts)),
          ConsecutiveMissFrames: this.consecutiveMissStreaks.length > 0 ? Math.max.apply(Math, n(this.consecutiveMissStreaks)) : 0,
          MicroJanks: this.jankStats.MicroJanks,
          SmallJanks: this.jankStats.SmallJanks,
          Janks: this.jankStats.Janks,
          BigJanks: this.jankStats.BigJanks,
          HugeJanks: this.jankStats.HugeJanks,
          Stucks: this.jankStats.Stucks,
          MicroJankDuration: this.jankStats.MicroJankDuration,
          SmallJankDuration: this.jankStats.SmallJankDuration,
          JankDuration: this.jankStats.JankDuration,
          BigJankDuration: this.jankStats.BigJankDuration,
          HugeJankDuration: this.jankStats.HugeJankDuration,
          StuckDuration: this.jankStats.StuckDuration
        }
      }
    }, {
      key: "report",
      value: function() {
        this.lastReportTime = Date.now(), this.lastReportMissingFuncs = this.totalMissingFuncs, this.lastReportAccumulativeInvokeTime = this.accumulativeInvokeTime;
        var e = se();
        if ("new" === e) {
          var a = this.generateReportData();
          GameGlobal.manager.reportWasmSplitPerformance(a)
        } else if ("old" === e) GameGlobal.manager.reportInvokeWasmFuncInfo(this.totalMissingFuncs, this.accumulativeInvokeTime);
        else {
          console.warn("[PLUGIN WARN] Wasm split report not supported");
          var t = this.generateReportData();
          console.log("[PLUGIN] Wasm split func missing report:", t)
        }
        X()
      }
    }])
  }()),
  ne = !1;

function se() {
  return GameGlobal.manager.reportWasmSplitPerformance ? "new" : GameGlobal.manager.reportInvokeWasmFuncInfo ? "old" : null
}

function ie() {
  var e = !0;
  4 & Z && te.totalMissingFuncs < te.lastReportMissingFuncs + 10 && Date.now() - te.lastReportTime < ae && (e = !1), 0 === te.totalMissingFuncs && (e = !1), e && te.report(), setTimeout(ie, ee)
}

function oe(e) {
  if (!GameGlobal.unityNamespace.initedRedirMem) {
    GameGlobal.unityNamespace.initedRedirMem = !0;
    var a = wx.getFileSystemManager();
    try {
      var t = a.readFileSync(y + GameGlobal.unityNamespace.CODE_FILE_MD5 + "." + GameGlobal.unityNamespace.GAME_NAME + ".redirmem.bin")
    } catch (e) {
      return void GameGlobal.unityNamespace.eventLog("[PLUGIN LOG] release does not have redirmem.bin")
    }
    var n = new Int32Array(t);
    GameGlobal.unityNamespace.logCallMemorySize = n.length;
    var s = e.buffer.byteLength - t.byteLength;
    GameGlobal.unityNamespace.logCallBaseAddr.value = s, s >>= 2, GameGlobal.unityNamespace.logCallBasePtr = s;
    for (var i = new Int32Array(e.buffer), o = 0; o < n.length; o++) i[s + o] = n[o];
    var r = GameGlobal.manager.gameInstance.Module._malloc(t.byteLength);
    for (GameGlobal.unityNamespace.logCallBaseAddr.value = r, r >>= 2, GameGlobal.unityNamespace.logCallBasePtr = r, o = 0; o < n.length; o++) i[r + o] = i[s + o]
  }
}

function re(e, a) {
  console.log("in wasm-split preInstantiateWasm"), d = GameGlobal.unityNamespace.CODE_FILE_MD5 + "." + GameGlobal.unityNamespace.GAME_NAME + ".wasm.code.unityweb.wasm.br",
    function() {
      if (!k) {
        k = !0;
        var e = "undefined" != typeof GameGlobal && GameGlobal.managerConfig || null;
        if (e) {
          var a = e.WASM_MODULE_NAME || "wasmcode",
            t = 0 === a.indexOf("wasmcode") ? a.slice(8) : "";
          h = "wasmcode" + t, w = "wasmcode1" + t, v = "wasmcode2" + t;
          var n = e.GAME_DIR || "",
            s = n ? n.replace(/\/?$/, "/") : "";
          y = s + "wasmcode/", M = s + "wasmcode1/", S = s + "wasmcode2/", console.log("[WASM-SPLIT] resolveManagerConfig:", "WASMCODE_NAME=", h, "WASMCODE1_NAME=", w, "WASMCODE2_NAME=", v, "WASMCODE_PATH=", y, "WASMCODE1_PATH=", M, "WASMCODE2_PATH=", S)
        }
      }
    }(),
    function() {
      if (GameGlobal.manager.wasmsplit.getFeatures) {
        var e = GameGlobal.manager.wasmsplit.getFeatures(),
          a = function(a, t, n, s) {
            if (void 0 !== (null == e ? void 0 : e[a])) {
              var i = parseInt(e[a], 10);
              !isNaN(i) && i >= 0 ? (s(i), GameGlobal.unityNamespace.eventLog(t + " set to:", i)) : GameGlobal.unityNamespace.eventLog("Invalid " + a + " value, using default:", e[a])
            } else GameGlobal.unityNamespace.eventLog("No " + a + " found, using default:", n)
          };
        a("delayInitTime", "kDelayLoadWasmcode2Time", _, (function(e) {
          _ = e
        })), a("reportStrategy", "reportStrategy", Z, (function(e) {
          Z = e
        })), a("reportInterval", "kMinWasmSplitReportInterval", ee, (function(e) {
          ae = 5 * (ee = e)
        })), a("delayFuncInitTime", "kDelayFuncInitTime", F, (function(e) {
          F = e
        }))
      } else GameGlobal.unityNamespace.eventLog("No features found")
    }(), c && GameGlobal.canUseH5Renderer && GameGlobal.unityNamespace.pluginCalledMainCbs.push((function() {
      GameGlobal.unityNamespace.eventLog("setTimeout for download wasmcode2: ", _), setTimeout(K, _),
        function() {
          if (!se()) return console.warn("[PLUGIN WARN] Wasm split report not supported, fallback to onHide for missing funcs only"), void wx.onHide((function() {
            X()
          }));
          ne = !0, 1 & Z && wx.onHide((function() {
            0 !== te.totalMissingFuncs && te.report()
          })), 2 & Z && ie()
        }()
    }));
  var t = a.asm2wasm = a.asm2wasm || {};
  t["f64-to-int"] = t["f64-to-int"] || function(e) {
    return 0 | e
  }, t["f64-rem"] = t["f64-rem"] || function(e, a) {
    return e % a
  }, a.env = a.env || {}, a.primary = {
    table: a.env.table || new WebAssembly.Table({
      initial: l.tableSize,
      maximum: l.tableSize,
      element: "anyfunc"
    }),
    memory: a.env.memory
  }, (0, l.setImportGlobal)(a), a.wasm_split = a.wasm_split || {}, a.wasm_split.wait = function() {
    var e = GameGlobal.unityNamespace.waitTableId.value;
    if (GameGlobal.unityNamespace.eventLog("wait for func: ", e), c && canUseH5Renderer) return function e(a, t) {
      GameGlobal.firstInvoke && (GameGlobal.firstInvoke = !1, GameGlobal.manager.startFetchJsCode()), z || function() {
        GameGlobal.unityNamespace.eventLog("Sync wasm split initialization");
        var e = wx.getFileSystemManager(),
          a = S + d;
        try {
          var t = Date.now(),
            n = e.readFileSync(a),
            s = Date.now() - t;
          GameGlobal.unityNamespace.eventLog("wasmcode2 file sync read time (ms): ", s), H(n)
        } catch (e) {
          GameGlobal.unityNamespace.eventLog("Subpackage wasmcode2 not loaded, trying to load..."), K()
        }
      }();
      var n = Date.now();
      GameGlobal.manager.wasmsplit.innerInvokeWasmBuffer({
        invokeWasmBuffer: invokeWasmBuffer,
        funcName: a,
        importObj: window.wasm_split_info,
        success: function(e) {
          te.recordFuncMiss(n), "number" == typeof e && $.set(e, ($.get(e) || 0) + 1)
        },
        fail: function(n) {
          if (t > 0) return GameGlobal.unityNamespace.eventLog("fetch table_id: ", a, "; remainRetryTimes: ", t), e(a, t - 1);
          if ("system error" !== n && "content is null" !== n && "system error" !== n.errmsg && "content is null" !== n.errmsg) throw wx.showModal({
            title: "网络状态异常",
            content: "请检查网络后重启 小游戏",
            showCancel: !1,
            confirmText: wx.restartMiniProgram ? "立即重启" : "确定",
            success: function() {
              wx.restartMiniProgram && wx.restartMiniProgram({})
            }
          }), new Error("网络状态异常:" + n);
          z ? GameGlobal.onCrash() : GameGlobal.unityNamespace.eventLog("Try to syncly wait for func split initialization"), GameGlobal.unityNamespace.eventLog("fetch table_id:", a, "; md5: ", GameGlobal.unityNamespace.CODE_FILE_MD5, "; subversion: ", GameGlobal.unityNamespace.WASM_SPLIT_SUB_VERSION, "; err: ", n)
        }
      })
    }(e.toString(), 3);
    U(!0), GameGlobal.manager.wasmsplit && GameGlobal.manager.wasmsplit.checkNeedReportMissPatchFunc && GameGlobal.manager.wasmsplit.checkNeedReportMissPatchFunc(e), GameGlobal.manager.reportCalledFuncs({
      called_func_list: [e],
      func_type: 2,
      sub_version: GameGlobal.unityNamespace.WASM_SPLIT_SUB_VERSION
    })
  }, a.wasm_split.logCall = function(e, a) {
    GameGlobal.manager.mainCalled || Q.add(e), $.set(e, ($.get(e) || 0) + 1)
  }, a.wasm_split.__wasm_split_waitTableId = GameGlobal.unityNamespace.waitTableId = new WebAssembly.Global({
    value: "i32",
    mutable: !0
  }), a.wasm_split.__wasm_split_logCallBaseAddr = GameGlobal.unityNamespace.logCallBaseAddr = new WebAssembly.Global({
    value: "i32",
    mutable: !0
  }), window.wasm_split_info = a
}

function le(a, t, n) {
  for (var s = a.asm2wasm = a.asm2wasm || {}, i = GameGlobal.manager.gameInstance.Module, o = a.primary.table, r = 0; r < o.length; ++r) window.FUNCTION_TABLE[r] = o.get(r);
  if (Object.entries(t.instance.exports).forEach((function(t) {
      "object" == e(t[1]) && t[1] instanceof WebAssembly.Memory && (a.primary.memory = t[1], s.__wasm_memory_size = window.__wasm_memory_size = function() {
        return t[1].buffer.byteLength / 65536 | 0
      }), t[0].startsWith("wasm_split.") && (a.primary[t[0]] = t[1])
    })), a.primary["wasm_split.initGlobal"] = t.instance.exports.initGlobal, t.instance.exports.initGlobal(), i.asm = t.instance.exports, GameGlobal.canUseH5Renderer || N || null != L(!0)) {
    oe(a.primary.memory);
    var l = "android&wasm3";
    GameGlobal.canUseH5Renderer && (l = "iOS_hp"),
      function(e) {
        var a = e.runtimeType;
        return GameGlobal.manager.instantiatePatch ? GameGlobal.manager.instantiatePatch(GameGlobal.unityNamespace.WASM_SPLIT_SUB_VERSION, wasm_split_info, {}).then((function(e) {
          return e && GameGlobal.unityNamespace.eventLog(a + " instantiatePatch success ", GameGlobal.unityNamespace.WASM_SPLIT_SUB_VERSION), e
        })).catch((function(e) {
          console.warn("[PLUGIN SUBWASM WARN]", a, " instantiatePatch warn", e), GameGlobal.unityNamespace.eventLog(a, "instantiatePatch warn", e)
        })) : Promise.resolve()
      }({
        runtimeType: l,
        undefined: void 0
      }).finally((function() {
        console.log("instantiatePatch finally"), n(t.instance, t.module)
      }))
  } else GameGlobal.unityNamespace.eventLog("no signal api, start instantiate sub wasm"), U(!0), j((function() {
    return n(t.instance, t.module)
  }))
}
GameGlobal.unityNamespace.instantiateWasm = function(e, a) {
  console.log("in wasm-split instantiateWasm");
  var t = GameGlobal.manager.gameInstance.Module.wasmPath;
  return re(0, e), WebAssembly.instantiate(t, e).then((function(t) {
    le(e, t, a)
  })), {}
}, GameGlobal.unityNamespace.preInstantiateWasm = re, GameGlobal.unityNamespace.postInstantiateWasm = le, GameGlobal.unityNamespace.compileSubWasm = function() {
  return new Promise((function(e) {
    if (GameGlobal.unityNamespace.eventLog("start asyncCompileSubWasm"), O) return e();
    D ? (U(!1), j(e)) : B((function() {
      GameGlobal.unityNamespace.eventLog("async load subpackage done")
    }), !1)
  }))
};