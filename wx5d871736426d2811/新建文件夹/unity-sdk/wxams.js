Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SDK = void 0, require("../@babel/runtime/helpers/Arrayincludes");
var t = require("../@babel/runtime/helpers/typeof");
/**
 * @dn-sdk/minigame v1.5.6
 * (c) 2025
 * @license ISC
 */
function e(t, e, n) {
  return (e = h(e)) in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t
}

function n(t) {
  return function(t) {
    if (Array.isArray(t)) return o(t)
  }(t) || function(t) {
    if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
  }(t) || r(t) || function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
  }()
}

function r(t, e) {
  if (t) {
    if ("string" == typeof t) return o(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(t, e) : void 0
  }
}

function o(t, e) {
  (null == e || e > t.length) && (e = t.length);
  for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
  return r
}

function i(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && a(t, e)
}

function a(t, e) {
  return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
    return t.__proto__ = e, t
  })(t, e)
}

function u(t) {
  var e = function() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
    } catch (t) {
      return !1
    }
  }();
  return function() {
    var n, r = l(t);
    if (e) {
      var o = l(this).constructor;
      n = Reflect.construct(r, arguments, o)
    } else n = r.apply(this, arguments);
    return c(this, n)
  }
}

function c(t, e) {
  if (e && ("object" === f(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return s(t)
}

function s(t) {
  if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t
}

function l(t) {
  return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t)
  })(t)
}

function f(e) {
  return (f = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
    return t(e)
  } : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : t(e)
  })(e)
}

function d(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function p(t, e) {
  for (var n = 0; n < e.length; n++) {
    var r = e[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, h(r.key), r)
  }
}

function v(t, e, n) {
  return e && p(t.prototype, e), n && p(t, n), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t
}

function h(t) {
  var e = function(t, e) {
    if ("object" !== f(t) || null === t) return t;
    var n = t[Symbol.toPrimitive];
    if (void 0 !== n) {
      var r = n.call(t, e);
      if ("object" !== f(r)) return r;
      throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return String(t)
  }(t, "string");
  return "symbol" === f(e) ? e : String(e)
}
var _, y, g = "LOCAL_ID",
  m = "CLICK_ID",
  A = "QUEUE_LOST_MAP",
  k = "REMOTE_CONFIG",
  T = "REMOTE_COMMON_CONFIG",
  R = "OPENID",
  b = {
    init: "init",
    reporting: "reporting",
    fail: "fail"
  },
  S = {
    maxSdkInstance: 4,
    maxQueueLength: 500,
    actionParamMaxLength: 1e4,
    autoTrack: !0,
    reportThreshold: 5,
    reportDelay: 1,
    inspectDelay: 30,
    cgiBatchSize: 50,
    requestConcurrency: 4,
    requestTimeout: 1e4,
    signVersion: "1.0",
    realTimeActionList: ["START_APP", "REGISTER", "PURCHASE"]
  },
  E = "JS_RUN_ERROR",
  O = "REQUEST_ERROR",
  I = "REQUEST_CONFIG_ERROR",
  w = "JS_QUEUE_LOG",
  C = "PROXY_ERROR",
  x = "QUEUE_LOST_NUM",
  N = "SIGN_ERROR",
  L = "UNKNOWN",
  M = "TRUE",
  P = "FALSE",
  D = "TICKET_INTERVAL_CHANGE",
  q = (y = function(t) {
    return "".concat("@dn-sdk/minigame", "_").concat("production", "_").concat(t)
  }, {
    getSync: function(t) {
      var e;
      try {
        e = wx.getStorageSync(y(t))
      } catch (t) {
        return console.error("storage get error", t), e
      }
      return e
    },
    setSync: function(t, e) {
      try {
        wx.setStorageSync(y(t), e)
      } catch (t) {
        return console.error("storage set error", t), !1
      }
      return !0
    }
  }),
  U = function() {
    var t;
    return function() {
      if (!t) {
        var e = function() {
            if (_) return _;
            try {
              return _ = wx.getSystemInfoSync()
            } catch (t) {
              return {}
            }
          }(),
          n = e.system,
          r = void 0 === n ? "" : n,
          o = (null == r ? void 0 : r.split(" ")) || [],
          i = function(t) {
            if (!t) return L;
            var e = (null == t ? void 0 : t.toUpperCase()) || "";
            return e.indexOf("ANDROID") > -1 ? "ANDROID" : e.indexOf("IOS") > -1 ? "IOS" : e.indexOf("MAC") > -1 ? "OSX" : e.indexOf("WINDOWS") > -1 ? "WINDOWS" : L
          }(o[0]),
          a = function(t) {
            return !t || t.length <= 0 ? "" : 2 === t.length ? t[1] : 3 === t.length && "Windows" === t[0] ? "".concat(t[1], " ").concat(t[2]) : t[t.length - 1]
          }(o);
        t = {
          benchmark_level: e.benchmarkLevel,
          device_brand: e.brand,
          screen_height: Math.floor(e.screenHeight),
          screen_width: Math.floor(e.screenWidth),
          wx_lib_version: e.SDKVersion,
          wx_version: e.version,
          wx_platform: e.platform,
          device_model: e.model,
          os: i,
          os_version: a
        }
      }
      return t
    }
  }(),
  F = function() {
    var t;
    return function() {
      try {
        if (t) return t;
        t || (t = q.getSync(g) || ""), t || (t = et(), q.setSync(g, t))
      } catch (t) {}
      return t
    }
  }(),
  j = function() {
    var t = "unknown",
      e = !1;
    return function() {
      if (!e) try {
        wx.getNetworkType({
          success: function(e) {
            t = e.networkType
          },
          fail: function() {
            t = "unknown"
          }
        }), wx.onNetworkStatusChange((function(e) {
          t = e.networkType
        })), e = !0
      } catch (t) {}
      return t
    }
  }();
j();
var B = function() {
    var t = "";
    return function() {
      return t || (t = q.getSync(R) || ""), t
    }
  }(),
  V = function() {
    var t;
    return function() {
      if (t) return t;
      try {
        var e = wx.getAccountInfoSync();
        return $(e.miniProgram) ? t = e.miniProgram : {}
      } catch (e) {
        return {}
      }
    }
  }();

function G(t) {
  var e = null == t ? void 0 : t.query;
  if (!$(e)) return "";
  var n = "";
  return e.gdt_vid || [1045, 1046, 1084].indexOf(null == t ? void 0 : t.scene) > -1 ? n = "TENCENT" : e.clue_token || e.clickid && e.item_id ? n = "BYTEDANCE" : e.callback && "kuaishou" === e.ksChannel ? n = "KUAISHOU" : e.bd_vid || e.ai && e.d && e.q && e.c ? n = "BAIDU" : e.uctrackid ? n = "ALIBABA" : (e.trackid || e.imp || [1065, 1069, 1194].indexOf(null == t ? void 0 : t.scene) > -1 && (e.callback || e.u)) && (n = "OTHERS"), n
}

function K(t, e) {
  try {
    var n = U(),
      r = V(),
      o = {
        sdk_version: "1.5.6",
        sdk_name: "@dn-sdk/minigame",
        device_brand: null == n ? void 0 : n.device_brand,
        device_model: null == n ? void 0 : n.device_model,
        wx_version: null == n ? void 0 : n.wx_version,
        wx_lib_version: null == n ? void 0 : n.wx_lib_version,
        wx_platform: null == n ? void 0 : n.wx_platform,
        os: null == n ? void 0 : n.os,
        os_version: null == n ? void 0 : n.os_version,
        local_id: F(),
        env_version: null == r ? void 0 : r.envVersion,
        appid: null == r ? void 0 : r.appId
      },
      i = Object.assign(o, t);
    wx.request({
      url: "https://api.datanexus.qq.com/data-nexus-trace/log",
      data: i,
      method: "POST",
      timeout: S.requestTimeout,
      success: function(t) {
        "function" == typeof e && 200 === (null == t ? void 0 : t.statusCode) && e()
      }
    })
  } catch (n) {
    ft.error(n)
  }
}
var W = function() {
  function t() {
    d(this, t)
  }
  return v(t, null, [{
    key: "revise",
    value: function(t) {
      t > 0 && !this.isRevised && (this.offsetTime = t - Date.now(), this.isRevised = !0)
    }
  }, {
    key: "getRevisedcurrentTimeMillis",
    value: function() {
      return this.isRevised ? Date.now() + this.offsetTime : -1
    }
  }]), t
}();

function Y(t) {
  return new Promise((function(e, n) {
    wx.request({
      method: "POST",
      url: "https://api.datanexus.qq.com/data-nexus-config/v1/sdk/config/get",
      data: t,
      timeout: S.requestTimeout,
      success: function(t) {
        H(t, e, "config/get", n), Q(t)
      },
      fail: function(t) {
        J(t, "config/get", n)
      }
    })
  }))
}

function H(t, e, n, r) {
  var o, i, a, u, c = null == t ? void 0 : t.statusCode,
    s = null == (o = null == t ? void 0 : t.data) ? void 0 : o.code;
  if (200 !== c || 0 !== s) {
    var l = s;
    200 !== c && (l = "number" == typeof c ? -1 * c : -888), K({
      log_type: I,
      message: "cgiName: ".concat(n, ", statusCode: ").concat(c, ", code: ").concat(s, ", traceid: ").concat(null == (a = null == t ? void 0 : t.data) ? void 0 : a.trace_id),
      code: l
    }), null == r || r(null == (u = null == t ? void 0 : t.data) ? void 0 : u.data)
  } else e(null == (i = t.data) ? void 0 : i.data)
}

function J(t, e, n) {
  K({
    log_type: I,
    message: "cgiName: ".concat(e, " , message: ").concat(null == t ? void 0 : t.errMsg, " "),
    code: "number" == typeof(null == t ? void 0 : t.errno) ? -1 * t.errno : -999
  }), null == n || n(t)
}

function Q(t) {
  var e, n = 1 * (null == (e = null == t ? void 0 : t.header) ? void 0 : e["Server-Time"]);
  n > 17266752e5 && W.revise(n)
}
W.offsetTime = 0, W.isRevised = !1;
var z = Object.prototype.toString,
  $ = function(t) {
    return "[object Object]" === z.call(t)
  },
  Z = function(t) {
    return "[object Array]" === z.call(t)
  },
  X = function(t) {
    return "[object Function]" === z.call(t)
  },
  tt = (new Date).getTime();

function et() {
  var t = (new Date).getTime(),
    e = Math.abs(1e3 * (t - tt));
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (function(n) {
    var r = 16 * Math.random();
    return t > 0 ? (r = (t + r) % 16 | 0, t = Math.floor(t / 16)) : (r = (e + r) % 16 | 0, e = Math.floor(e / 16)), ("x" === n ? r : 3 & r | 8).toString(16).replace(/-/g, "")
  }))
}
var nt = /^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i,
  rt = function(t) {
    if ("string" != typeof t) throw new TypeError("Invalid argument expected string");
    if (!nt.test(t)) throw new Error("Invalid argument not valid semver ('".concat(t, "' received)"))
  },
  ot = function(t) {
    return isNaN(Number(t)) ? t : Number(t)
  },
  it = function(t) {
    var e = t.replace(/^v/, "").replace(/\+.*$/, ""),
      n = function(t, e) {
        return -1 === t.indexOf("-") ? t.length : t.indexOf("-")
      }(e),
      r = e.substring(0, n).split(".");
    return r.push(e.substring(n + 1)), r
  },
  at = function(t, e) {
    [t, e].forEach(rt);
    for (var n = it(t), r = it(e), o = 0; o < Math.max(n.length - 1, r.length - 1); o++) {
      var i = parseInt(n[o] || "0", 10),
        a = parseInt(r[o] || "0", 10);
      if (i > a) return 1;
      if (a > i) return -1
    }
    var u = n[n.length - 1],
      c = r[r.length - 1];
    if (u && c)
      for (var s = u.split(".").map(ot), l = c.split(".").map(ot), f = 0; f < Math.max(s.length, l.length); f++) {
        if (void 0 === s[f] || "string" == typeof l[f] && "number" == typeof s[f]) return -1;
        if (void 0 === l[f] || "string" == typeof s[f] && "number" == typeof l[f] || s[f] > l[f]) return 1;
        if (l[f] > s[f]) return -1
      } else if (u || c) return u ? -1 : 1;
    return 0
  };

function ut(t) {
  return ct()[t]
}

function ct() {
  return S
}

function st(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e)
}
var lt = function(t) {
    try {
      return t && "string" == typeof t ? -1 === (t = t.replace(/\s/g, "")).indexOf(".") ? t : t.split(".").slice(0, 2).join(".") : ""
    } catch (e) {
      return t
    }
  },
  ft = function() {
    function t() {
      d(this, t)
    }
    return v(t, null, [{
      key: "error",
      value: function(t) {
        for (var e, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
        (e = console).error.apply(e, ["".concat("[@dn-sdk/minigame v1.5.6]", ": ").concat(t)].concat(r))
      }
    }, {
      key: "info",
      value: function(e) {
        for (var n, r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++) o[i - 1] = arguments[i];
        t.debug && (n = console).info.apply(n, ["".concat("[@dn-sdk/minigame v1.5.6]", ": ").concat(e)].concat(o))
      }
    }, {
      key: "log",
      value: function(e) {
        for (var n, r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++) o[i - 1] = arguments[i];
        t.debug && (n = console).log.apply(n, ["".concat("[@dn-sdk/minigame v1.5.6]", ": ").concat(e)].concat(o))
      }
    }, {
      key: "warn",
      value: function(t) {
        for (var e, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
        (e = console).warn.apply(e, ["".concat("[@dn-sdk/minigame v1.5.6]", ": ").concat(t)].concat(r))
      }
    }, {
      key: "devLog",
      value: function(e) {
        for (var n, r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++) o[i - 1] = arguments[i];
        t.isDev && (n = console).log.apply(n, ["".concat("[@dn-sdk/minigame v1.5.6]", ": ").concat(e)].concat(o))
      }
    }]), t
  }();
ft.debug = !1, ft.isDev = !1;
var dt = function() {
  var t;
  return function() {
    if (!t) try {
      var e = wx.getLaunchOptionsSync(),
        n = e.query.gdt_vid || "";
      n ? q.setSync(m, n) : n = q.getSync(m) || "";
      var r = JSON.stringify(e);
      r.length > 1e4 && (r = JSON.stringify({
        cut: 1,
        scene: e.scene
      })), t = {
        source_scene: e.scene,
        pkg_channel_id: e.query.wxgamepro || "",
        ad_trace_id: n,
        launch_options: r,
        channel: G(e)
      }
    } catch (e) {
      t = {}, ft.log("获取场景值和渠道号失败", e)
    }
    return t
  }
}();

function pt(t, e, n) {
  var r = n.value;
  return n.value = function() {
    for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];
    try {
      return r.apply(this, o)
    } catch (n) {
      try {
        ft.error.apply(ft, ["calling ".concat(t.constructor.name, ".").concat(e, " error with arguments")].concat(o)), ft.error(n);
        var a = {
          log_type: E,
          message: "[safeExcutable] ".concat(t.constructor.name, ".").concat(e, ": ").concat(null == n ? void 0 : n.message),
          err_stack: null == n ? void 0 : n.stack
        };
        X(this.reportLog) ? this.reportLog(a) : K(a)
      } catch (a) {}
    }
  }, n
}
var vt = Object.defineProperty,
  ht = Object.getOwnPropertyDescriptor,
  _t = function(t, e, n, r) {
    for (var o, i = r > 1 ? void 0 : r ? ht(e, n) : e, a = t.length - 1; a >= 0; a--)(o = t[a]) && (i = (r ? o(e, n, i) : o(i)) || i);
    return r && i && vt(e, n, i), i
  },
  yt = function() {
    function t(e) {
      var n = e.userActionSetId,
        r = e.maxLength,
        o = void 0 === r ? 500 : r;
      d(this, t), this.lostActionMaps = {}, this.stack = [], this.localStorageKey = "", this.localStorageKey = "".concat("QUEUE_ACTIONS", "_").concat(null == n ? void 0 : n.toString()), this.maxLength = o, this.userActionSetId = n, this.setTimeStamp(), this.init()
    }
    return v(t, [{
      key: "getItems",
      value: function() {
        return this.stack
      }
    }, {
      key: "getStorage",
      value: function() {
        var t, e = (null == (t = q) ? void 0 : t.getSync(this.localStorageKey)) || "[]";
        return JSON.parse(e)
      }
    }, {
      key: "reportLostNum",
      value: function() {
        var t = this,
          e = Object.assign({}, this.lostActionMaps),
          n = [];
        for (var r in e) {
          var o = null == r ? void 0 : r.split("_");
          n.push({
            queue_lost_session_id: o[0],
            queue_lost_timestamp: o[1],
            queue_lost_num: e[r]
          })
        }
        n.length && (this.setTimeStamp(), n.forEach((function(e) {
          var n = Object.assign({}, {
              user_action_set_id: t.userActionSetId,
              log_type: x
            }, e),
            r = null == e ? void 0 : e.queue_lost_session_id,
            o = null == e ? void 0 : e.queue_lost_timestamp,
            i = "".concat(r, "_").concat(o);
          K(n, (function() {
            st(t.lostActionMaps, i) && (delete t.lostActionMaps[i], q.setSync(A, JSON.stringify(t.lostActionMaps)))
          }))
        })))
      }
    }, {
      key: "getLostMaps",
      value: function() {
        return this.lostActionMaps
      }
    }, {
      key: "init",
      value: function() {
        var t = this,
          e = this.getStorage(),
          n = null == e ? void 0 : e.map((function(t) {
            var e, n;
            return t.inner_status === (null == (e = b) ? void 0 : e.reporting) ? Object.assign({}, t, {
              inner_status: null == (n = b) ? void 0 : n.fail,
              is_retry: !0,
              retry_count: t.retry_count + 1
            }) : t
          }));
        this.stack = n, this.lostActionMaps = JSON.parse(q.getSync(A) || "{}"), setTimeout((function() {
          t.reportLostNum()
        }), 1e3)
      }
    }, {
      key: "addItem",
      value: function(t) {
        var e;
        null == (e = null == this ? void 0 : this.stack) || e.push(t)
      }
    }, {
      key: "removeItems",
      value: function(t) {
        var e, n = null == (e = null == this ? void 0 : this.stack) ? void 0 : e.filter((function(e) {
          return !(null != t && t.includes(null == e ? void 0 : e.action_id))
        }));
        this.stack = n
      }
    }, {
      key: "updateForReportFail",
      value: function(t) {
        var e;
        this.stack = null == (e = this.stack) ? void 0 : e.map((function(e) {
          var n;
          return null != t && t.includes(null == e ? void 0 : e.action_id) ? Object.assign({}, e, {
            inner_status: null == (n = b) ? void 0 : n.fail,
            retry_count: e.retry_count + 1,
            is_retry: !0
          }) : e
        }))
      }
    }, {
      key: "updateForReporting",
      value: function(t) {
        var e;
        this.stack = null == (e = this.stack) ? void 0 : e.map((function(e) {
          var n;
          return null != t && t.includes(null == e ? void 0 : e.action_id) ? Object.assign({}, e, {
            inner_status: null == (n = b) ? void 0 : n.reporting
          }) : e
        }))
      }
    }, {
      key: "updateAllStack",
      value: function(t) {
        this.stack = t
      }
    }, {
      key: "updateToStorage",
      value: function() {
        q.setSync(this.localStorageKey, JSON.stringify(this.stack))
      }
    }, {
      key: "updateLostAction",
      value: function(t) {
        if (t) {
          var e = "".concat(t, "_").concat(this.timeStamp),
            n = this.lostActionMaps[e] || 0;
          this.lostActionMaps[e] = n + 1, q.setSync(A, JSON.stringify(this.lostActionMaps))
        }
      }
    }, {
      key: "setTimeStamp",
      value: function() {
        this.timeStamp = Date.now().toString()
      }
    }]), t
  }();
_t([pt], yt.prototype, "getItems", 1), _t([pt], yt.prototype, "getStorage", 1), _t([pt], yt.prototype, "reportLostNum", 1), _t([pt], yt.prototype, "getLostMaps", 1), _t([pt], yt.prototype, "init", 1), _t([pt], yt.prototype, "addItem", 1), _t([pt], yt.prototype, "removeItems", 1), _t([pt], yt.prototype, "updateForReportFail", 1), _t([pt], yt.prototype, "updateForReporting", 1), _t([pt], yt.prototype, "updateAllStack", 1), _t([pt], yt.prototype, "updateToStorage", 1), _t([pt], yt.prototype, "updateLostAction", 1);
var gt = v((function t() {
  d(this, t)
}));
gt.hasDirectGameMask = !1, gt.activeDuration = 0;
var mt = Object.defineProperty,
  At = Object.getOwnPropertyDescriptor,
  kt = function(t, e, n, r) {
    for (var o, i = r > 1 ? void 0 : r ? At(e, n) : e, a = t.length - 1; a >= 0; a--)(o = t[a]) && (i = (r ? o(e, n, i) : o(i)) || i);
    return r && i && mt(e, n, i), i
  },
  Tt = function(t) {
    i(n, yt);
    var e = u(n);

    function n(t) {
      var r, o = t.userActionSetId,
        i = t.maxLength,
        a = void 0 === i ? 500 : i,
        u = t.ogEvents,
        c = void 0 === u ? [] : u;
      return d(this, n), (r = e.call(this, {
        userActionSetId: o,
        maxLength: a
      })).ogEvents = c, r
    }
    return v(n, [{
      key: "getReportableActions",
      value: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 100,
          e = this.getItems(),
          n = [];
        return null == e || e.forEach((function(e) {
          var r;
          (null == n ? void 0 : n.length) < t && (null == e ? void 0 : e.inner_status) !== (null == (r = b) ? void 0 : r.reporting) && (null == n || n.push(e))
        })), n
      }
    }, {
      key: "addAction",
      value: function(t) {
        var e = {
            code: 0,
            message: "成功",
            actionId: t.action_id
          },
          n = this.getItems();
        if ((null == n ? void 0 : n.length) >= this.maxLength) {
          var r = "队列长度超过最大限制".concat(this.maxLength, "条，SDK将按照行为优先级排序，丢弃优先级最低的行为事件");
          ft.warn(r), K({
            user_action_set_id: this.userActionSetId,
            log_type: w,
            message: "队列长度超过限制"
          });
          var o = this.sortQueue(t, n);
          ft.debug && ft.info("超过".concat(this.maxLength, "条按优先级排序的队列："), o.concat([]));
          var i = o.pop();
          this.updateAllStack(o), this.updateLostAction((null == i ? void 0 : i.session_id) || ""), (null == i ? void 0 : i.action_id) === t.action_id && (e = {
            code: 103,
            message: "缓存队列已满，主动丢弃行为"
          })
        } else this.addItem(t);
        return gt.hasDirectGameMask || this.updateToStorage(), e
      }
    }, {
      key: "removeActions",
      value: function(t) {
        this.removeItems(t), this.updateToStorage()
      }
    }, {
      key: "updateActionsForReportFail",
      value: function(t) {
        this.updateForReportFail(t), this.updateToStorage()
      }
    }, {
      key: "updateActionsForReporting",
      value: function(t) {
        this.updateForReporting(t), this.updateToStorage()
      }
    }, {
      key: "getReportableActionsLength",
      value: function() {
        var t = this.getItems().filter((function(t) {
          var e;
          return (null == t ? void 0 : t.inner_status) !== (null == (e = b) ? void 0 : e.reporting)
        }));
        return null == t ? void 0 : t.length
      }
    }, {
      key: "sortQueue",
      value: function(t, e) {
        var n = this,
          r = {},
          o = null == t ? void 0 : t.action_time,
          i = e.concat([t]),
          a = function(t) {
            return r[t.action_id] || (r[t.action_id] = n.caculateWeight(o, t)), r[t.action_id]
          };
        return i.sort((function(t, e) {
          return a(e) - a(t)
        }))
      }
    }, {
      key: "caculateWeight",
      value: function(t, e) {
        var n, r = 0,
          o = this.formatWeight(t, null == e ? void 0 : e.action_time),
          i = o.ogWeight,
          a = o.sdkWeight,
          u = o.userWeight;
        null != (n = this.ogEvents) && n.includes(null == e ? void 0 : e.action_type) && (r += i), null != e && e.is_sdk_auto_track ? r += a : r += u;
        var c = t - (null == e ? void 0 : e.action_time) + 1;
        return c > 0 ? r + 1 / c : r
      }
    }, {
      key: "formatWeight",
      value: function(t, e) {
        var n = 1e3,
          r = 10,
          o = 100;
        return t - e > 2592e6 && (n /= 100, r /= 100, o /= 100), {
          ogWeight: n,
          sdkWeight: r,
          userWeight: o
        }
      }
    }]), n
  }();
kt([pt], Tt.prototype, "getReportableActions", 1), kt([pt], Tt.prototype, "addAction", 1), kt([pt], Tt.prototype, "removeActions", 1), kt([pt], Tt.prototype, "updateActionsForReportFail", 1), kt([pt], Tt.prototype, "updateActionsForReporting", 1), kt([pt], Tt.prototype, "getReportableActionsLength", 1), kt([pt], Tt.prototype, "sortQueue", 1), kt([pt], Tt.prototype, "caculateWeight", 1), kt([pt], Tt.prototype, "formatWeight", 1);
var Rt = function() {
  function t() {
    d(this, t), this.events = {}
  }
  return v(t, [{
    key: "subscribe",
    value: function(e, n) {
      t.checkCallback(n), Z(this.events[e]) ? this.events[e].push(n) : this.events[e] = [n]
    }
  }, {
    key: "once",
    value: function(e, n) {
      t.checkCallback(n), this.subscribe(this.onceEventName(e), n)
    }
  }, {
    key: "unsubscribe",
    value: function(e, n) {
      t.checkCallback(n), Z(this.events[e]) && (this.events[e] = this.events[e].filter((function(t) {
        return t !== n
      }))), Z(this.events[this.onceEventName(e)]) && (this.events[this.onceEventName(e)] = this.events[this.onceEventName(e)].filter((function(t) {
        return t !== n
      })))
    }
  }, {
    key: "publish",
    value: function(t) {
      for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
      var o = Date.now();
      Z(this.events[t]) && this.events[t].forEach((function(t) {
        return t.apply(void 0, [o].concat(n))
      })), Z(this.events[this.onceEventName(t)]) && (this.events[this.onceEventName(t)].forEach((function(t) {
        return t.apply(void 0, [o].concat(n))
      })), this.events[this.onceEventName(t)] = [])
    }
  }, {
    key: "onceEventName",
    value: function(t) {
      return "once_event_prefix_".concat(t)
    }
  }], [{
    key: "checkCallback",
    value: function(e) {
      X(e) || ft.error(t.ERROR_CALLBACK_IS_NOT_A_FUNCTION)
    }
  }]), t
}();
Rt.ERROR_CALLBACK_IS_NOT_A_FUNCTION = "callback 不是函数";
var bt = new Rt,
  St = ["REGISTER", "VIEW_CONTENT", "ADD_TO_CART", "PURCHASE", "COMPLETE_ORDER", "ADD_TO_WISHLIST", "START_APP", "CREATE_ROLE", "AUTHORIZE", "TUTORIAL_FINISH", "START_PAY", "FINISH_PAY"],
  Et = "FINISH_PAY",
  Ot = "START_PAY",
  It = ["REGISTER", "START_APP", "RE_ACTIVE"],
  wt = ["TICKET", "ENTER_FOREGROUND", "ENTER_BACKGROUND"],
  Ct = new(function() {
    function t() {
      d(this, t), this.channelClaimActionList = It, this.noClaimActionList = wt, this.realTimeActionList = S.realTimeActionList, this.ticketInterval = 60, this.requestTimeout = S.requestTimeout, this.loadConfig()
    }
    return v(t, [{
      key: "getChannelClaimActionList",
      value: function() {
        return this.channelClaimActionList
      }
    }, {
      key: "getNoClaimActionList",
      value: function() {
        return this.noClaimActionList
      }
    }, {
      key: "getRealTimeActionList",
      value: function() {
        return this.realTimeActionList
      }
    }, {
      key: "getTicketInterval",
      value: function() {
        return this.ticketInterval
      }
    }, {
      key: "getRequestTimeout",
      value: function() {
        return this.requestTimeout
      }
    }, {
      key: "loadConfig",
      value: function() {
        var t = this;
        try {
          if ("undefined" == typeof wx) return;
          var e = q.getSync(T);
          e && this.updateConfig(e), Y({
            conf_name: "mini_game_sdk_common",
            conf_key: "config"
          }).then((function(e) {
            e && $(e) && (t.updateConfig(e), q.setSync(T, e))
          }))
        } catch (e) {
          console.error(e)
        }
      }
    }, {
      key: "updateConfig",
      value: function(t) {
        t.channelClaimActionList && Z(t.channelClaimActionList) && (this.channelClaimActionList = t.channelClaimActionList), t.noClaimActionList && Z(t.noClaimActionList) && (this.noClaimActionList = t.noClaimActionList), t.realTimeActionList && Z(t.realTimeActionList) && (this.realTimeActionList = t.realTimeActionList), t.ticketInterval && "number" == typeof t.ticketInterval && t.ticketInterval > 1 && t.ticketInterval !== this.ticketInterval && (this.ticketInterval = t.ticketInterval, bt.publish(D)), t.requestTimeout && "number" == typeof t.requestTimeout && t.requestTimeout > 5e3 && (this.requestTimeout = t.requestTimeout)
      }
    }]), t
  }()),
  xt = function() {
    var t = !0,
      e = !0,
      n = !0,
      r = !0,
      o = !0,
      i = !1;
    return function() {
      if (!i) {
        i = !0;
        var a = q.getSync(k);
        if ((null == a ? void 0 : a.bg) === M ? t = !0 : (null == a ? void 0 : a.bg) === P && (t = !1), (null == a ? void 0 : a.fg) === M ? e = !0 : (null == a ? void 0 : a.fg) === P && (e = !1), (null == a ? void 0 : a.st) === M ? n = !0 : (null == a ? void 0 : a.st) === P && (n = !1), (null == a ? void 0 : a.ti) === M ? r = !0 : (null == a ? void 0 : a.ti) === P && (r = !1), ft.devLog("当前缓存开关 bgOn，fgOn，stOn，tiOn：", t, e, n, r), n && bt.publish("START_APP"), r) {
          var u = function() {
              o && bt.publish("TICKET")
            },
            c = setInterval(u, 1e3 * Ct.getTicketInterval());
          bt.subscribe(D, (function() {
            c && clearInterval(c), c = setInterval(u, 1e3 * Ct.getTicketInterval())
          }))
        }
        wx.onShow((function(t) {
          if (o = !0, e) {
            var n = "";
            try {
              (n = JSON.stringify(t)).length > 1e4 && (n = JSON.stringify({
                cut: 1,
                scene: t.scene
              }))
            } catch (t) {}
            bt.publish("ENTER_FOREGROUND", {
              enter_options: n
            })
          }
        })), wx.onHide((function() {
          if (o = !1, t) {
            var e = 0;
            0 !== gt.activeDuration && (e = Date.now() - gt.activeDuration, gt.activeDuration = 0), bt.publish("ENTER_BACKGROUND", {
              duration: e > 0 ? e : 0
            })
          }
        }))
      }
    }
  }(),
  Nt = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

function Lt(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
}
var Mt, Pt = Lt((function() {
    var t, e = null;

    function n(t) {
      return !!t && ("object" == f(t) || "function" == typeof t)
    }

    function r(t) {
      if (null !== t && !n(t)) throw new TypeError("Object prototype may only be an Object or null: " + t)
    }
    var o = Object,
      i = !(!o.create && {
          __proto__: null
        }
        instanceof o),
      a = o.create || (i ? function(t) {
        return r(t), {
          __proto__: t
        }
      } : function(t) {
        if (r(t), null === t) throw new SyntaxError("Native Object.create is required to create objects with null prototype");
        var e = function() {};
        return e.prototype = t, new e
      }),
      u = function() {
        return null
      },
      c = o.getPrototypeOf || ([].__proto__ === Array.prototype ? function(t) {
        var e = t.__proto__;
        return n(e) ? e : null
      } : u);
    return (t = function(s, l) {
      if (void 0 === (this && this instanceof t ? this.constructor : void 0)) throw new TypeError("Constructor Proxy requires 'new'");
      if (!n(s) || !n(l)) throw new TypeError("Cannot create proxy with a non-object as target or handler");
      var f = function() {};
      e = function() {
        s = null, f = function(t) {
          throw new TypeError("Cannot perform '".concat(t, "' on a proxy that has been revoked"))
        }
      }, setTimeout((function() {
        e = null
      }), 0);
      var d = l;
      for (var p in l = {
          get: null,
          set: null,
          apply: null,
          construct: null
        }, d) {
        if (!(p in l)) throw new TypeError("Proxy polyfill does not support trap '".concat(p, "'"));
        l[p] = d[p]
      }
      "function" == typeof d && (l.apply = d.apply.bind(d));
      var v, h = c(s),
        _ = !1,
        y = !1;
      "function" == typeof s ? (v = function() {
        var t = this && this.constructor === v,
          e = Array.prototype.slice.call(arguments);
        return f(t ? "construct" : "apply"), t && l.construct ? l.construct.call(this, s, e) : !t && l.apply ? l.apply(s, this, e) : t ? (e.unshift(s), new(s.bind.apply(s, e))) : s.apply(this, e)
      }, _ = !0) : s instanceof Array ? (v = [], y = !0) : v = i || null !== h ? a(h) : {};
      var g = l.get ? function(t) {
          return f("get"), l.get(this, t, v)
        } : function(t) {
          return f("get"), this[t]
        },
        m = l.set ? function(t, e) {
          f("set"), l.set(this, t, e, v)
        } : function(t, e) {
          f("set"), this[t] = e
        },
        A = o.getOwnPropertyNames(s),
        k = {};
      A.forEach((function(t) {
        if (!_ && !y || !(t in v)) {
          var e = {
            enumerable: !!o.getOwnPropertyDescriptor(s, t).enumerable,
            get: g.bind(s, t),
            set: m.bind(s, t)
          };
          o.defineProperty(v, t, e), k[t] = !0
        }
      }));
      var T = !0;
      if (_ || y) {
        var R = o.setPrototypeOf || ([].__proto__ === Array.prototype ? function(t, e) {
          return r(e), t.__proto__ = e, t
        } : u);
        h && R(v, h) || (T = !1)
      }
      if (l.get || !T)
        for (var b in s) k[b] || o.defineProperty(v, b, {
          get: g.bind(s, b)
        });
      return o.seal(s), o.seal(v), v
    }).revocable = function(n, r) {
      return {
        proxy: new t(n, r),
        revoke: e
      }
    }, t
  })),
  Dt = {};
try {
  Mt || (Mt = Pt())
} catch (_) {
  _ = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(_);
  Bt(_)
}

function qt(t, e, r, o) {
  try {
    if (!Mt || null == t || !t[e]) return;
    t[e] = new Mt(t[e], {
      apply: function(t, e, i) {
        var a, u;
        o && jt((function() {
          return o.apply(void 0, n(i))
        }));
        var c = !!(null != (a = i[0]) && a.success || null != (u = i[0]) && u.fail);
        c && ["success", "fail"].forEach((function(t) {
          if (i[0][t]) try {
            i[0][t] = new Mt(i[0][t], {
              apply: function(e, o, a) {
                return jt((function() {
                  return r.apply(void 0, [t, i[0]].concat(n(a)))
                })), e.apply(o, a)
              }
            })
          } catch (t) {
            Bt(t)
          }
        }));
        var s = t.apply(e, i);
        return !c && s && "[object Promise]" === Object.prototype.toString.call(s) ? s.then((function(t) {
          return jt((function() {
            return r("success", i[0], t)
          })), t
        })).catch((function(t) {
          throw jt((function() {
            return r("fail", i[0], t)
          })), t
        })) : s
      }
    })
  } catch (t) {
    Bt(t)
  }
}

function Ut(t, e, r) {
  try {
    if (!Mt || null == t || !t[e]) return;
    t[e] = new Mt(t[e], {
      apply: function(t, e, o) {
        var i = "function" == typeof o[0];
        if (i) try {
          o[0] = new Mt(o[0], {
            apply: function(t, e, o) {
              var i = t.call.apply(t, [e].concat(n(o)));
              return jt((function() {
                return r(i)
              })), i
            }
          })
        } catch (t) {
          Bt(t)
        }
        var a = t.call.apply(t, [e].concat(n(o)));
        return i || jt((function() {
          return r(a)
        })), a
      }
    })
  } catch (t) {
    Bt(t)
  }
}

function Ft(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
    r = arguments.length > 2 ? arguments[2] : void 0,
    o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [],
    i = arguments.length > 4 ? arguments[4] : void 0;
  try {
    if (!Mt || null == t || !t[e]) return;
    t[e] = new Mt(t[e], {
      apply: function(t, a, u) {
        var c = t.call.apply(t, [a].concat(n(u)));
        return (!r || !Dt[e]) && (jt((function() {
          return null == i ? void 0 : i(c)
        })), o.forEach((function(t) {
          var e = t.eventName,
            n = t.isAsync,
            r = t.proxyEvent;
          n ? qt(c, e, r) : Ut(c, e, r)
        }))), r && (Dt[e] = !0), c
      }
    })
  } catch (t) {
    Bt(t)
  }
}

function jt(t) {
  try {
    t()
  } catch (t) {
    Bt(t)
  }
}

function Bt(t) {
  K({
    log_type: C,
    message: null == t ? void 0 : t.message,
    err_stack: null == t ? void 0 : t.stack
  })
}
var Vt = "SHARE",
  Gt = Ot,
  Kt = Et,
  Wt = function() {
    var t = !1;
    return function() {
      t || (t = !0, qt(wx, "login", (function(t) {
        "success" === t && bt.publish("LOGIN")
      })), Ut(wx, "onAddToFavorites", (function() {
        bt.publish("ADD_TO_WISHLIST")
      })), Ut(wx, "onShareTimeline", (function() {
        bt.publish(Vt, {
          target: "TIME_LINE",
          trigger: "MENU"
        })
      })), Ut(wx, "onShareAppMessage", (function() {
        bt.publish(Vt, {
          target: "APP_MESSAGE",
          trigger: "MENU"
        })
      })), Ut(wx, "shareAppMessage", (function() {
        bt.publish(Vt, {
          target: "APP_MESSAGE",
          trigger: "BUTTON"
        })
      })), Ft(wx, "createGameClubButton", !1, [{
        isAsync: !1,
        eventName: "onTap",
        proxyEvent: function() {
          bt.publish("TAP_GAME_CLUB")
        }
      }], (function() {
        bt.publish("CREATE_GAME_CLUB")
      })), Ft(wx, "getGameServerManager", !0, [{
        isAsync: !0,
        eventName: "createRoom",
        proxyEvent: function(t) {
          "success" === t && bt.publish("CREATE_GAME_ROOM")
        }
      }, {
        isAsync: !0,
        eventName: "joinRoom",
        proxyEvent: function(t) {
          "success" === t && bt.publish("JOIN_GAME_ROOM")
        }
      }]), qt(wx, "requestMidasPayment", (function(t, e) {
        bt.publish(Kt, {
          status: "success" === t ? "SUCCESS" : "FAIL",
          quantity: (null == e ? void 0 : e.buyQuantity) || 0,
          mode: (null == e ? void 0 : e.mode) || "",
          platform: (null == e ? void 0 : e.platform) || "",
          no: (null == e ? void 0 : e.outTradeNo) || "",
          payType: "Midas"
        })
      }), (function(t) {
        bt.publish(Gt, {
          quantity: (null == t ? void 0 : t.buyQuantity) || 0,
          mode: (null == t ? void 0 : t.mode) || "",
          platform: (null == t ? void 0 : t.platform) || "",
          no: (null == t ? void 0 : t.outTradeNo) || "",
          payType: "Midas"
        })
      })), qt(wx, "requestMidasPaymentGameItem", (function(t, e) {
        var n = (e || {}).signData;
        bt.publish(Kt, {
          status: "success" === t ? "SUCCESS" : "FAIL",
          quantity: (null == n ? void 0 : n.buyQuantity) || 0,
          mode: (null == n ? void 0 : n.mode) || "",
          platform: (null == n ? void 0 : n.platform) || "",
          no: (null == n ? void 0 : n.outTradeNo) || "",
          p: (null == n ? void 0 : n.goodsPrice) || 0,
          productId: (null == n ? void 0 : n.productId) || "",
          payType: "MidasGameItem"
        })
      }), (function(t) {
        var e = (t || {}).signData;
        bt.publish(Gt, {
          quantity: (null == e ? void 0 : e.buyQuantity) || 0,
          mode: (null == e ? void 0 : e.mode) || "",
          platform: (null == e ? void 0 : e.platform) || "",
          no: (null == e ? void 0 : e.outTradeNo) || "",
          p: (null == e ? void 0 : e.goodsPrice) || 0,
          productId: (null == e ? void 0 : e.productId) || "",
          payType: "MidasGameItem"
        })
      })))
    }
  }(),
  Yt = function() {
    function t() {
      d(this, t)
    }
    return v(t, null, [{
      key: "isEmpty",
      value: function(t) {
        return null == t || "string" == typeof t && "" === t.trim()
      }
    }, {
      key: "format",
      value: function(t) {
        for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
        return t.replace(/\${(\d+)}/g, (function(t, e) {
          return n[e]
        }))
      }
    }, {
      key: "customStringify",
      value: function(t) {
        var e = [];
        try {
          return JSON.stringify(t, (function(t, n) {
            if (void 0 === n) return "undefined";
            if ("object" == f(n) && null !== n) {
              if (-1 !== e.indexOf(n)) return "[Circular]";
              e.push(n)
            }
            return "bigint" == typeof n ? n.toString() : n
          }))
        } catch (t) {
          return "[Param Error]"
        }
      }
    }]), t
  }(),
  Ht = /^([a-zA-Z][a-zA-Z\d_]{0,63})$/i,
  Jt = /^ams_reserved_(.*)/i,
  Qt = function() {
    function t() {
      d(this, t)
    }
    return v(t, null, [{
      key: "validateActionType",
      value: function(e) {
        return Yt.isEmpty(e) ? (ft.error(t.ERROR_ACTION_TYPE_NULL), !1) : !!Ht.test(e) || (ft.error(t.ERROR_ACTION_TYPE_INVALID), !1)
      }
    }, {
      key: "validateActionParam",
      value: function(e) {
        if (!e) return !0;
        if (!$(e)) return ft.error(t.ERROR_ACTION_PARAM_IS_NOT_OBJECT), !1;
        for (var n in e) {
          if (Yt.isEmpty(n)) return ft.error(t.ERROR_ACTION_PARAM_KEY_NULL), !1;
          if (!Ht.test(n)) return ft.error(t.ERROR_ACTION_PARAM_KEY_INVALID), !1;
          Jt.test(n) && ft.warn(t.WARN_ACTION_PARAM_KEY_RESERVED);
          var r = e[n];
          if (!t.isValidValue(r)) return ft.error(Yt.format(t.ERROR_ACTION_PARAM_VALUE_INVALID, n, r)), !1;
          if (Z(r)) {
            if (!t.isValidArrayValue(r)) {
              for (var o = 0; o < r.length; o++) ft.error(Yt.format(t.ERROR_ACTION_PARAM_VALUE_ARRAY_INVALID, n, Yt.customStringify(r), o, r[o]));
              return !1
            }
            if (!t.checkArrayElementTypes(r)) return ft.error(t.ERROR_ACTION_PARAM_VALUE_ARRAY_TYPE_UNUNIQUE), !1
          }
        }
        return !0
      }
    }, {
      key: "isValidValue",
      value: function(t) {
        return null == t || "string" == typeof t || "number" == typeof t || "boolean" == typeof t || Z(t)
      }
    }, {
      key: "isValidArrayValue",
      value: function(t) {
        for (var e = 0; e < t.length; e++) {
          var n = t[e];
          if ("string" != typeof n && "number" != typeof n && "boolean" != typeof n) return !1
        }
        return !0
      }
    }, {
      key: "checkArrayElementTypes",
      value: function(t) {
        if (!t || t.length <= 1) return !0;
        for (var e = f(t[0]), n = 1; n < t.length; n++)
          if (f(t[n]) !== e) return !1;
        return !0
      }
    }]), t
  }();
Qt.ERROR_ACTION_TYPE_NULL = "在track方法中，action_type参数不能为空！", Qt.ERROR_ACTION_TYPE_INVALID = "在track方法中，action_type参数只能包含字母、数字和下划线，且只能以字母开头，长度不能超过64个字符！", Qt.ERROR_ACTION_PARAM_KEY_NULL = "在track方法中，action_param参数的key不能为空！", Qt.ERROR_ACTION_PARAM_KEY_INVALID = "在track方法中，action_param参数的key只能包含字母、数字和下划线，且不能以数字开头，长度不能超过64个字符！", Qt.WARN_ACTION_PARAM_KEY_RESERVED = "SDK内部预留参数的key均以'ams_reserved_'开头，该参数的值会被SDK内部覆盖，请不要使用！", Qt.ERROR_ACTION_PARAM_VALUE_INVALID = "在track方法中，action_param参数的value必须是String/Number/Boolean/Array中的一种！[key=${0}, value=${1}]", Qt.ERROR_ACTION_PARAM_VALUE_ARRAY_INVALID = "在track方法中，如果action_param参数中的某个元素的value是Array，那么这个Array中的每个元素必须是String/Number/Boolean中的一种！[key=${0}, value=${1}, 数组的第${2}个元素为${3}]", Qt.ERROR_ACTION_PARAM_VALUE_ARRAY_TYPE_UNUNIQUE = "在track方法中，如果action_param参数中的某个元素的value是Array，那么这个Array中所有元素的类型必须是同一种！", Qt.ERROR_ACTION_PARAM_IS_NOT_OBJECT = "action_param 参数不是Object";
var zt = {
  exports: {}
};
! function(t) {
  ! function(e) {
    function n(t, e) {
      var n = (65535 & t) + (65535 & e);
      return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n
    }

    function r(t, e, r, o, i, a) {
      return n(function(t, e) {
        return t << e | t >>> 32 - e
      }(n(n(e, t), n(o, a)), i), r)
    }

    function o(t, e, n, o, i, a, u) {
      return r(e & n | ~e & o, t, e, i, a, u)
    }

    function i(t, e, n, o, i, a, u) {
      return r(e & o | n & ~o, t, e, i, a, u)
    }

    function a(t, e, n, o, i, a, u) {
      return r(e ^ n ^ o, t, e, i, a, u)
    }

    function u(t, e, n, o, i, a, u) {
      return r(n ^ (e | ~o), t, e, i, a, u)
    }

    function c(t, e) {
      t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
      var r, c, s, l, f, d = 1732584193,
        p = -271733879,
        v = -1732584194,
        h = 271733878;
      for (r = 0; r < t.length; r += 16) c = d, s = p, l = v, f = h, d = o(d, p, v, h, t[r], 7, -680876936), h = o(h, d, p, v, t[r + 1], 12, -389564586), v = o(v, h, d, p, t[r + 2], 17, 606105819), p = o(p, v, h, d, t[r + 3], 22, -1044525330), d = o(d, p, v, h, t[r + 4], 7, -176418897), h = o(h, d, p, v, t[r + 5], 12, 1200080426), v = o(v, h, d, p, t[r + 6], 17, -1473231341), p = o(p, v, h, d, t[r + 7], 22, -45705983), d = o(d, p, v, h, t[r + 8], 7, 1770035416), h = o(h, d, p, v, t[r + 9], 12, -1958414417), v = o(v, h, d, p, t[r + 10], 17, -42063), p = o(p, v, h, d, t[r + 11], 22, -1990404162), d = o(d, p, v, h, t[r + 12], 7, 1804603682), h = o(h, d, p, v, t[r + 13], 12, -40341101), v = o(v, h, d, p, t[r + 14], 17, -1502002290), d = i(d, p = o(p, v, h, d, t[r + 15], 22, 1236535329), v, h, t[r + 1], 5, -165796510), h = i(h, d, p, v, t[r + 6], 9, -1069501632), v = i(v, h, d, p, t[r + 11], 14, 643717713), p = i(p, v, h, d, t[r], 20, -373897302), d = i(d, p, v, h, t[r + 5], 5, -701558691), h = i(h, d, p, v, t[r + 10], 9, 38016083), v = i(v, h, d, p, t[r + 15], 14, -660478335), p = i(p, v, h, d, t[r + 4], 20, -405537848), d = i(d, p, v, h, t[r + 9], 5, 568446438), h = i(h, d, p, v, t[r + 14], 9, -1019803690), v = i(v, h, d, p, t[r + 3], 14, -187363961), p = i(p, v, h, d, t[r + 8], 20, 1163531501), d = i(d, p, v, h, t[r + 13], 5, -1444681467), h = i(h, d, p, v, t[r + 2], 9, -51403784), v = i(v, h, d, p, t[r + 7], 14, 1735328473), d = a(d, p = i(p, v, h, d, t[r + 12], 20, -1926607734), v, h, t[r + 5], 4, -378558), h = a(h, d, p, v, t[r + 8], 11, -2022574463), v = a(v, h, d, p, t[r + 11], 16, 1839030562), p = a(p, v, h, d, t[r + 14], 23, -35309556), d = a(d, p, v, h, t[r + 1], 4, -1530992060), h = a(h, d, p, v, t[r + 4], 11, 1272893353), v = a(v, h, d, p, t[r + 7], 16, -155497632), p = a(p, v, h, d, t[r + 10], 23, -1094730640), d = a(d, p, v, h, t[r + 13], 4, 681279174), h = a(h, d, p, v, t[r], 11, -358537222), v = a(v, h, d, p, t[r + 3], 16, -722521979), p = a(p, v, h, d, t[r + 6], 23, 76029189), d = a(d, p, v, h, t[r + 9], 4, -640364487), h = a(h, d, p, v, t[r + 12], 11, -421815835), v = a(v, h, d, p, t[r + 15], 16, 530742520), d = u(d, p = a(p, v, h, d, t[r + 2], 23, -995338651), v, h, t[r], 6, -198630844), h = u(h, d, p, v, t[r + 7], 10, 1126891415), v = u(v, h, d, p, t[r + 14], 15, -1416354905), p = u(p, v, h, d, t[r + 5], 21, -57434055), d = u(d, p, v, h, t[r + 12], 6, 1700485571), h = u(h, d, p, v, t[r + 3], 10, -1894986606), v = u(v, h, d, p, t[r + 10], 15, -1051523), p = u(p, v, h, d, t[r + 1], 21, -2054922799), d = u(d, p, v, h, t[r + 8], 6, 1873313359), h = u(h, d, p, v, t[r + 15], 10, -30611744), v = u(v, h, d, p, t[r + 6], 15, -1560198380), p = u(p, v, h, d, t[r + 13], 21, 1309151649), d = u(d, p, v, h, t[r + 4], 6, -145523070), h = u(h, d, p, v, t[r + 11], 10, -1120210379), v = u(v, h, d, p, t[r + 2], 15, 718787259), p = u(p, v, h, d, t[r + 9], 21, -343485551), d = n(d, c), p = n(p, s), v = n(v, l), h = n(h, f);
      return [d, p, v, h]
    }

    function s(t) {
      var e, n = "",
        r = 32 * t.length;
      for (e = 0; e < r; e += 8) n += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);
      return n
    }

    function l(t) {
      var e, n = [];
      for (n[(t.length >> 2) - 1] = void 0, e = 0; e < n.length; e += 1) n[e] = 0;
      var r = 8 * t.length;
      for (e = 0; e < r; e += 8) n[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
      return n
    }

    function f(t) {
      var e, n, r = "0123456789abcdef",
        o = "";
      for (n = 0; n < t.length; n += 1) e = t.charCodeAt(n), o += r.charAt(e >>> 4 & 15) + r.charAt(15 & e);
      return o
    }

    function d(t) {
      return unescape(encodeURIComponent(t))
    }

    function p(t) {
      return function(t) {
        return s(c(l(t), 8 * t.length))
      }(d(t))
    }

    function v(t, e) {
      return function(t, e) {
        var n, r, o = l(t),
          i = [],
          a = [];
        for (i[15] = a[15] = void 0, o.length > 16 && (o = c(o, 8 * t.length)), n = 0; n < 16; n += 1) i[n] = 909522486 ^ o[n], a[n] = 1549556828 ^ o[n];
        return r = c(i.concat(l(e)), 512 + 8 * e.length), s(c(a.concat(r), 640))
      }(d(t), d(e))
    }

    function h(t, e, n) {
      return e ? n ? v(e, t) : function(t, e) {
        return f(v(t, e))
      }(e, t) : n ? p(t) : function(t) {
        return f(p(t))
      }(t)
    }
    t.exports ? t.exports = h : e.md5 = h
  }(Nt)
}(zt);
var $t = Lt(zt.exports),
  Zt = "function" == typeof btoa,
  Xt = "function" == typeof Buffer;
"function" == typeof TextDecoder && new TextDecoder;
var te, ee = "function" == typeof TextEncoder ? new TextEncoder : void 0,
  ne = Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
te = {}, ne.forEach((function(t, e) {
  return te[t] = e
}));
var re = String.fromCharCode.bind(String);
"function" == typeof Uint8Array.from && Uint8Array.from.bind(Uint8Array);
var oe = Zt ? function(t) {
    return btoa(t)
  } : Xt ? function(t) {
    return Buffer.from(t, "binary").toString("base64")
  } : function(t) {
    for (var e, n, r, o, i = "", a = t.length % 3, u = 0; u < t.length;) {
      if ((n = t.charCodeAt(u++)) > 255 || (r = t.charCodeAt(u++)) > 255 || (o = t.charCodeAt(u++)) > 255) throw new TypeError("invalid character found");
      i += ne[(e = n << 16 | r << 8 | o) >> 18 & 63] + ne[e >> 12 & 63] + ne[e >> 6 & 63] + ne[63 & e]
    }
    return a ? i.slice(0, a - 3) + "===".substring(a) : i
  },
  ie = Xt ? function(t) {
    return Buffer.from(t).toString("base64")
  } : function(t) {
    for (var e = [], n = 0, r = t.length; n < r; n += 4096) e.push(re.apply(null, t.subarray(n, n + 4096)));
    return oe(e.join(""))
  },
  ae = function(t) {
    if (t.length < 2) return (e = t.charCodeAt(0)) < 128 ? t : e < 2048 ? re(192 | e >>> 6) + re(128 | 63 & e) : re(224 | e >>> 12 & 15) + re(128 | e >>> 6 & 63) + re(128 | 63 & e);
    var e = 65536 + 1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320);
    return re(240 | e >>> 18 & 7) + re(128 | e >>> 12 & 63) + re(128 | e >>> 6 & 63) + re(128 | 63 & e)
  },
  ue = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
  ce = Xt ? function(t) {
    return Buffer.from(t, "utf8").toString("base64")
  } : ee ? function(t) {
    return ie(ee.encode(t))
  } : function(t) {
    return oe(function(t) {
      return t.replace(ue, ae)
    }(t))
  },
  se = Object.defineProperty,
  le = Object.getOwnPropertyDescriptor,
  fe = function(t, e, n, r) {
    for (var o, i = r > 1 ? void 0 : r ? le(e, n) : e, a = t.length - 1; a >= 0; a--)(o = t[a]) && (i = (r ? o(e, n, i) : o(i)) || i);
    return r && i && se(e, n, i), i
  },
  de = function() {
    function t(e) {
      var n = this;
      d(this, t), this.cgiBatchSize = S.cgiBatchSize, this.reportThreshold = S.reportThreshold, this.reportDelay = S.reportDelay, this.triggerExecuteSend = function(t) {
        var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          r = [];
        return function() {
          for (var o = arguments.length, i = new Array(o), a = 0; a < o; a++) i[a] = arguments[a];
          return clearTimeout(e), e = setTimeout((function() {
            var e = t.apply(void 0, i);
            r.forEach((function(t) {
              return t(e)
            })), r = []
          }), n), new Promise((function(t) {
            return r.push(t)
          }))
        }
      }((function() {
        n.executeSend()
      }), 1e3 * this.reportDelay), this.inspectDelay = S.inspectDelay, this.inspectTimer = void 0, this.isNeedContinueSend = !1, this.getBaseInfo = e.getBaseInfo, this.reportLog = e.reportLog, this.queueManager = e.queueManager, this.configManager = e.configManager, this.onReportComplete = e.onReportComplete, this.onReportFail = e.onReportFail, this.flushSend(), this.startInspectTimer()
    }
    return v(t, [{
      key: "batchSend",
      value: function() {
        var t, e = this.queueManager.getReportableActions(this.reportThreshold);
        if (e.length >= this.reportThreshold) this.executeSend();
        else {
          var n = (null == (t = this.configManager) ? void 0 : t.getRealTimeActionList()) || S.realTimeActionList;
          e.some((function(t) {
            return n.indexOf(t.action_type) > -1 && !t.is_retry
          })) ? this.executeSend() : this.triggerExecuteSend()
        }
        this.startInspectTimer()
      }
    }, {
      key: "flushSend",
      value: function() {
        this.executeSend()
      }
    }, {
      key: "executeSend",
      value: function() {
        var e = this;
        if (!gt.hasDirectGameMask)
          if (t.currentRequestCount >= t.requestConcurrency) this.isNeedContinueSend = !0;
          else {
            this.isNeedContinueSend = !1;
            var n = (t.requestConcurrency - t.currentRequestCount) * this.cgiBatchSize,
              r = this.queueManager.getReportableActions(n),
              o = this.getBaseInfo();
            if (!o.openid && !o.unionid && (ft.warn("请尽快调用 setOpenId 或 setUnionId 方法设置用户ID！"), r = r.filter((function(t) {
                return null == t ? void 0 : t.ad_trace_id
              }))), !(r.length <= 0)) {
              n < this.queueManager.getReportableActionsLength() && (this.isNeedContinueSend = !0), t.currentRequestCount += Math.ceil(r.length / this.cgiBatchSize);
              for (var i = [], a = 0; a < r.length; a += this.cgiBatchSize) {
                var u = this.generateActionReportParams(r.slice(a, a + this.cgiBatchSize));
                i.push(this.report(u))
              }
              Promise.all(i).then((function(t) {
                var n = t.some((function(t) {
                  return t >= 0
                }));
                e.isNeedContinueSend && n && e.executeSend()
              })).catch((function(t) {
                ft.error(t), e.reportLog({
                  message: "executeSend catch: ".concat(t.message),
                  log_type: E,
                  err_stack: t.stack
                })
              }))
            }
          }
      }
    }, {
      key: "generateActionReportParams",
      value: function(t) {
        var e = [],
          n = [],
          r = this.getBaseInfo();
        return t.forEach((function(t) {
          n.push(t.action_id);
          var r = Object.assign({}, t);
          delete r.inner_status, e.push(r)
        })), {
          data: {
            info: r,
            actions: e
          },
          actionIdList: n
        }
      }
    }, {
      key: "dealSuccessData",
      value: function(t, e, n) {
        [51001, 51003].indexOf(null == t ? void 0 : t.code) > -1 ? this.queueManager.updateActionsForReportFail(e) : this.queueManager.removeActions(e), 0 !== (null == t ? void 0 : t.code) && (this.reportLog({
          log_type: O,
          code: null == t ? void 0 : t.code,
          message: "trace_id: ".concat(null == t ? void 0 : t.trace_id, "，msg: ").concat(null == t ? void 0 : t.message)
        }), ft.error("上报失败：", t)), this.doTrackCallbackFn(this.onReportComplete, t, n), -1 === [0, 51001, 51003].indexOf(null == t ? void 0 : t.code) && this.doTrackCallbackFn(this.onReportFail, t, n)
      }
    }, {
      key: "dealFailData",
      value: function(t, e, n) {
        this.queueManager.updateActionsForReportFail(e), this.reportLog({
          log_type: O,
          code: t.code,
          message: t.message
        }), ft.error("上报失败：", t), this.doTrackCallbackFn(this.onReportComplete, t, n)
      }
    }, {
      key: "report",
      value: function(e) {
        var n = this,
          r = e.data,
          o = e.actionIdList;
        return this.queueManager.updateActionsForReporting(o), ft.debug && (ft.info("上报行为类型: ", "【".concat(r.actions.map((function(t) {
          return t.action_type
        })).join("、"), "】")), ft.info("上报请求参数: ", r)), new Promise((function(e) {
          var i, a, u, c, s, l, d, p, v = Date.now();
          try {
            var h = function(t) {
                var e = "",
                  n = null == t ? void 0 : t.appid,
                  r = null == t ? void 0 : t.secret_key,
                  o = null == t ? void 0 : t.sdk_version,
                  i = null == t ? void 0 : t.timestamp;
                if (!(n && r && o && i && 32 === r.length)) return e;
                for (var a = $t(o + n + i), u = 0; u < 32; u++) e += u % 2 == 0 ? r[u] : a[u];
                return e
              }({
                appid: null == (i = null == r ? void 0 : r.info) ? void 0 : i.appid,
                secret_key: null == (a = null == r ? void 0 : r.info) ? void 0 : a.secret_key,
                sdk_version: null == (u = null == r ? void 0 : r.info) ? void 0 : u.sdk_version,
                timestamp: v
              }),
              _ = function(t) {
                return arguments.length > 1 && void 0 !== arguments[1] && arguments[1] ? function(t) {
                  return t.replace(/=/g, "").replace(/[+\/]/g, (function(t) {
                    return "+" == t ? "-" : "_"
                  }))
                }(ce(t)) : ce(t)
              }(JSON.stringify(r));
            d = {
              "Client-Time": v,
              "Sign-Value": $t(_ + (null == (c = null == r ? void 0 : r.info) ? void 0 : c.user_action_set_id) + (null == (s = null == r ? void 0 : r.info) ? void 0 : s.secret_key) + h),
              "Sign-Version": S.signVersion,
              "content-type": "text/plain;charset=UTF-8"
            }, p = _
          } catch (h) {
            d = {
              "Client-Time": v
            }, p = r, n.reportLog({
              log_type: N,
              message: "sign error msg: ".concat(null == h ? void 0 : h.message),
              err_stack: null == h ? void 0 : h.stack
            }), ft.error(h)
          }
          wx.request({
            url: "https://api.datanexus.qq.com/data-nexus-cgi/miniprogram",
            method: "POST",
            timeout: (null == (l = n.configManager) ? void 0 : l.getRequestTimeout()) || S.requestTimeout,
            header: d,
            data: p,
            success: function(i) {
              var a, u;
              ft.devLog("上报接口返回码:", null == (a = null == i ? void 0 : i.data) ? void 0 : a.code);
              var c = (null == (u = null == i ? void 0 : i.header) ? void 0 : u["Server-Time"]) || -1;
              if (W.revise(c), t.currentRequestCount -= 1, 200 === (null == i ? void 0 : i.statusCode)) return n.dealSuccessData(null == i ? void 0 : i.data, o, r), void e((null == i ? void 0 : i.data).code);
              var s = "";
              try {
                s = "object" == f(null == i ? void 0 : i.data) ? JSON.stringify(null == i ? void 0 : i.data) : null == i ? void 0 : i.data
              } catch (t) {
                ft.error(t)
              }
              var l = {
                code: "number" == typeof(null == i ? void 0 : i.statusCode) ? -1 * i.statusCode : -888,
                message: "statusCode: ".concat(null == i ? void 0 : i.statusCode, ", data: ").concat(s)
              };
              n.dealFailData(l, o, r), e(l.code)
            },
            fail: function(i) {
              ft.devLog("上报失败:", i), t.currentRequestCount -= 1;
              var a = {
                code: "number" == typeof(null == i ? void 0 : i.errno) ? -1 * i.errno : -999,
                message: null == i ? void 0 : i.errMsg
              };
              n.dealFailData(a, o, r), e(a.code)
            }
          })
        }))
      }
    }, {
      key: "startInspectTimer",
      value: function() {
        var e = this;
        clearTimeout(this.inspectTimer), this.inspectTimer = setTimeout((function() {
          t.currentRequestCount >= t.requestConcurrency && (t.currentRequestCount = t.requestConcurrency - 1), e.executeSend(), e.startInspectTimer()
        }), 1e3 * this.inspectDelay)
      }
    }, {
      key: "doTrackCallbackFn",
      value: function(t, e, n) {
        if ("function" == typeof t) try {
          for (var r = [], o = 0; o < n.actions.length; o++)
            if (!n.actions[o].is_sdk_auto_track) {
              var i = n.actions[o],
                a = i.action_type,
                u = i.action_param,
                c = i.action_id,
                s = i.action_time;
              r.push({
                action_type: a,
                action_param: u,
                action_id: c,
                action_time: s
              })
            } if (r.length) {
            var l = n.info,
              f = l.user_action_set_id,
              d = l.appid,
              p = l.openid,
              v = l.unionid,
              h = l.user_unique_id;
            t({
              code: null == e ? void 0 : e.code,
              message: null == e ? void 0 : e.message,
              data: {
                actions: r,
                info: {
                  user_action_set_id: f,
                  appid: d,
                  openid: p,
                  unionid: v,
                  user_unique_id: h
                }
              }
            })
          }
        } catch (r) {
          ft.error("返回上报回调数据异常：", r)
        }
      }
    }], [{
      key: "setRequestConcurrency",
      value: function(e) {
        "number" == typeof e ? e < 1 ? ft.error("网络请求最大并发量不能小于1") : e > 10 ? ft.error("网络请求最大并发量不能大于10") : t.requestConcurrency = e : ft.error("网络请求最大并发量需设置为数字")
      }
    }]), t
  }();
de.currentRequestCount = 0, de.requestConcurrency = S.requestConcurrency, fe([pt], de.prototype, "batchSend", 1), fe([pt], de.prototype, "flushSend", 1), fe([pt], de.prototype, "executeSend", 1);
var pe = function() {
    function t() {
      d(this, t)
    }
    return v(t, [{
      key: "install",
      value: function(t, n) {
        var r = function(n) {
          bt.subscribe(n, function(n) {
            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return function(o) {
              var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              gt.hasDirectGameMask || ("ENTER_FOREGROUND" === n && (gt.activeDuration = Date.now()), t.track(n, Object.assign(r || {}, i, e(e({}, Se, !0), Ee, o))))
            }
          }(n))
        };
        r("TICKET"), r("START_APP"), r("ENTER_FOREGROUND"), r("ENTER_BACKGROUND"), "all" === n && (r("LOGIN"), r("ADD_TO_WISHLIST"), r("SHARE"), r("CREATE_GAME_CLUB"), r("TAP_GAME_CLUB"), r("CREATE_GAME_ROOM"), r("JOIN_GAME_ROOM"), r("START_PAY"), r("FINISH_PAY"))
      }
    }]), t
  }(),
  ve = function() {
    function t() {
      d(this, t), this.special_method_symbol = Symbol("special_method_symbol")
    }
    return v(t, [{
      key: "onPurchase",
      value: function(t) {
        return "number" != typeof t && ft.warn("付费金额需要为数字"), t <= 0 && ft.warn("付费金额需要大于0"), this.wrapTrack("PURCHASE", {
          value: t
        })
      }
    }, {
      key: "onEnterForeground",
      value: function() {
        return this.wrapTrack("ENTER_FOREGROUND")
      }
    }, {
      key: "onEnterBackground",
      value: function() {
        return this.wrapTrack("ENTER_BACKGROUND")
      }
    }, {
      key: "onAppStart",
      value: function() {
        return this.wrapTrack("START_APP")
      }
    }, {
      key: "onAppQuit",
      value: function() {
        return this.wrapTrack("APP_QUIT")
      }
    }, {
      key: "onAddToWishlist",
      value: function() {
        return this.wrapTrack("ADD_TO_WISHLIST")
      }
    }, {
      key: "wrapTrack",
      value: function(t, n) {
        return this.track(t, Object.assign(n || {}, e({}, this.special_method_symbol, 1)))
      }
    }]), t
  }(),
  he = function(t) {
    i(n, ve);
    var e = u(n);

    function n() {
      return d(this, n), e.apply(this, arguments)
    }
    return v(n, [{
      key: "onRegister",
      value: function() {
        return this.wrapTrack("REGISTER")
      }
    }, {
      key: "onCreateRole",
      value: function(t) {
        return t && "string" != typeof t && ft.warn("角色名称需要为字符串"), this.wrapTrack("CREATE_ROLE", t ? {
          name: t
        } : {})
      }
    }, {
      key: "onTutorialFinish",
      value: function() {
        return this.wrapTrack("TUTORIAL_FINISH")
      }
    }]), n
  }(),
  _e = "（如果确认无误，请忽略该提示）",
  ye = function() {
    var t = [];
    return {
      requestActionList: function() {
        try {
          Y({
            conf_name: "data_nexus_common",
            conf_key: "action_types"
          }).then((function(e) {
            Z(e) && (t = e)
          }))
        } catch (t) {
          ft.error(t)
        }
      },
      getActionList: function() {
        return t
      }
    }
  }();

function ge(t, e) {
  try {
    t.is_sdk_auto_track || (function(t) {
      try {
        var e = ye.getActionList();
        if (!e.includes(t)) {
          var n, o = function(t, e) {
            var n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (!n) {
              if (Array.isArray(t) || (n = r(t))) {
                n && (t = n);
                var o = 0,
                  i = function() {};
                return {
                  s: i,
                  n: function() {
                    return o >= t.length ? {
                      done: !0
                    } : {
                      done: !1,
                      value: t[o++]
                    }
                  },
                  e: function(t) {
                    throw t
                  },
                  f: i
                }
              }
              throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var a, u = !0,
              c = !1;
            return {
              s: function() {
                n = n.call(t)
              },
              n: function() {
                var t = n.next();
                return u = t.done, t
              },
              e: function(t) {
                c = !0, a = t
              },
              f: function() {
                try {
                  u || null == n.return || n.return()
                } finally {
                  if (c) throw a
                }
              }
            }
          }(e);
          try {
            for (o.s(); !(n = o.n()).done;) {
              var i = n.value;
              if (me(i, t) <= parseInt((.3 * i.length).toString())) {
                ft.warn("通过SDK上报的".concat(t, "行为名称可能有误，请检查该行为类型是否为腾讯广告提供的标准行为！").concat(_e));
                break
              }
            }
          } catch (t) {
            o.e(t)
          } finally {
            o.f()
          }
        }
      } catch (e) {
        ft.error(e)
      }
    }(t.action_type), "minigame" === e ? function(t, e) {
      var n, r, o;
      try {
        ["PURCHASE", "ADD_TO_CART"].includes(t.action_type) && t.action_param && st(t.action_param, "value") && ("number" != typeof(null == (n = t.action_param) ? void 0 : n.value) ? ft.warn("通过SDK上报的".concat(t.action_type, "行为携带的金额参数需要为数字！")) : (null == (r = t.action_param) ? void 0 : r.value) <= 0 ? ft.warn("通过SDK上报的".concat(t.action_type, "行为携带的金额参数需要大于0！")) : "minigame" === e && (null == (o = t.action_param) ? void 0 : o.value) < 100 && ft.warn("通过SDK上报的".concat(t.action_type, "行为携带的金额参数可能有误，金额的单位为‘分’，请检查金额是否正确！").concat(_e)))
      } catch (t) {
        ft.error(t)
      }
    }(t, e) : "miniprogram" === e && function(t) {
      try {
        var e = null == t ? void 0 : t.action_type,
          n = (null == t ? void 0 : t.action_param) || {};
        "PURCHASE" === e && st(n, "value") && ("number" != typeof(null == n ? void 0 : n.value) ? ft.warn("通过SDK上报的".concat(e, "行为携带的金额参数需要为数字！")) : (null == n ? void 0 : n.value) <= 0 && ft.warn("通过SDK上报的".concat(e, "行为携带的金额参数需要大于0！")))
      } catch (e) {
        ft.error(e)
      }
    }(t))
  } catch (t) {
    ft.error(t)
  }
}

function me(t, e) {
  try {
    if (0 === t.length) return e.length;
    if (0 === e.length) return t.length;
    for (var n = [], r = 0; r <= e.length; r++) n[r] = [r];
    for (var o = 0; o <= t.length; o++) n[0][o] = o;
    for (var i = 1; i <= e.length; i++)
      for (var a = 1; a <= t.length; a++) e.charAt(i - 1) === t.charAt(a - 1) ? n[i][a] = n[i - 1][a - 1] : n[i][a] = Math.min(n[i - 1][a - 1] + 1, n[i][a - 1] + 1, n[i - 1][a] + 1);
    return n[e.length][t.length]
  } catch (n) {
    ft.error(n)
  }
}

function Ae(t) {
  try {
    t && !/^[a-zA-Z0-9_\-]+$/.test(t) && ft.warn("通过SDK上报的openid：".concat(t, "可能有误，请检查openid是否正确！").concat(_e))
  } catch (t) {
    ft.error(t)
  }
}
var ke = Object.defineProperty,
  Te = Object.getOwnPropertyDescriptor,
  Re = function(t, e, n, r) {
    for (var o, i = r > 1 ? void 0 : r ? Te(e, n) : e, a = t.length - 1; a >= 0; a--)(o = t[a]) && (i = (r ? o(e, n, i) : o(i)) || i);
    return r && i && ke(e, n, i), i
  },
  be = Symbol("initializedInstance"),
  Se = Symbol("autoTrack"),
  Ee = Symbol("actionTime"),
  Oe = function(t) {
    i(r, he);
    var n = u(r);

    function r(t) {
      var e;
      if (d(this, r), (e = n.call(this)).env = "production", e.sdk_version = "1.5.6", e.sdk_name = "@dn-sdk/minigame", e.deviceInfo = {}, e.gameInfo = {}, e.session_id = "", e.log_id = 0, e.inited = !1, e.initErrMsg = "", null == wx || !wx.createCanvas) return e.initErrMsg = "不支持非微信小游戏中使用", ft.error(e.initErrMsg), c(e);
      var o = ct();
      if (r[be].length >= o.maxSdkInstance) return e.initErrMsg = "初始化超过上限", ft.error(e.initErrMsg), c(e);
      var i = function(t) {
          return $(t) ? (function(t) {
            var e = ["user_action_set_id", "secret_key", "appid", "openid", "unionid", "user_unique_id", "auto_track", "auto_attr", "on_report_fail", "on_report_complete"];
            for (var n in t) e.includes(n) || ft.warn("Invalid property '".concat(n, "' found in config"))
          }(t), "number" != typeof t.user_action_set_id ? "user_action_set_id 参数需为 number 类型" : t.user_action_set_id <= 0 ? "user_action_set_id 参数需大于 0" : "string" != typeof t.secret_key ? "secret_key 参数需为 string 类型" : "" === t.secret_key.trim() ? "缺少 secret_key 参数" : 32 !== t.secret_key.length ? "secret_key 参数需为 32 位字符串" : "string" != typeof t.appid ? "appid 参数需为 string 类型" : "" !== t.appid.trim() || "缺少 appid") : "初始化参数需为 object 类型"
        }(t),
        a = V();
      if (!0 !== i) return e.initErrMsg = i, ft.error(i), c(e);
      var u = null == a ? void 0 : a.appId;
      if (u && u !== t.appid) return e.initErrMsg = "初始化传入的appid与当前小游戏appid不一致", ft.error(e.initErrMsg), c(e);
      e.config = t, st(t, "auto_track") || (e.config.auto_track = ut("autoTrack")), e.openid = t.openid, e.unionid = t.unionid, e.user_unique_id = t.user_unique_id, e.onReportComplete = t.on_report_complete, e.onReportFail = t.on_report_fail, e.saveValidOpenidToStorage();
      var l = t.user_action_set_id;
      return r[be].includes(l) ? (e.initErrMsg = "同个数据源[".concat(l, "]只能初始化一次"), ft.error(e.initErrMsg), e.reportLog({
        log_type: E,
        message: e.initErrMsg
      }), c(e)) : (e.reportLog = e.reportLog.bind(s(e)), e.getTrackBaseInfo = e.getTrackBaseInfo.bind(s(e)), gt.activeDuration = Date.now(), e.deviceInfo = U(), e.gameInfo = dt(), e.session_id = et(), e.queueManage = new Tt({
        userActionSetId: l,
        maxLength: o.maxQueueLength,
        ogEvents: St
      }), e.actionReporter = new de({
        getBaseInfo: e.getTrackBaseInfo,
        reportLog: e.reportLog,
        queueManager: e.queueManage,
        configManager: Ct,
        onReportComplete: e.onReportComplete,
        onReportFail: e.onReportFail
      }), e.inited = !0, r[be].push(l), e.useAutoTrack(), e.doReportOnEnterBackground(), "release" === (null == a ? void 0 : a.envVersion) ? (ft.info("初始化成功"), c(e)) : (function(t) {
        var e = t.sdk_version,
          n = t.default_download_url,
          r = t.fail_handler;
        Y({
          conf_name: t.conf_name,
          conf_key: t.conf_key
        }).then((function(t) {
          if ($(t)) {
            var o = null == t ? void 0 : t.blackVersions,
              i = null == t ? void 0 : t.minVersion,
              a = null == t ? void 0 : t.bestVersion,
              u = null == t ? void 0 : t.downloadUrl,
              c = n;
            return u && /^https/.test(u) && (c = u), Z(o) && (null == o ? void 0 : o.indexOf(e)) > -1 ? (null == r || r(), void ft.error("初始化失败！当前SDK版本存在兼容问题，请尽快升级至最新版！下载地址：".concat(c))) : i && at(e, i) < 0 ? (null == r || r(), void ft.error("初始化失败！当前SDK版本过低，请尽快升级至最新版！下载地址：".concat(c))) : (a && at(e, a) < 0 && ft.warn("新版本SDK已上线，强烈建议您升级至最新版，尽早享受新特性！下载地址：".concat(c)), void ft.info("初始化成功"))
          }
          ft.info("初始化成功")
        })).catch((function() {
          ft.info("初始化成功")
        }))
      }({
        conf_name: "mini_game_sdk_common",
        conf_key: "version",
        sdk_version: e.sdk_version,
        default_download_url: "https://sr-home-1257214331.cos.ap-guangzhou.myqcloud.com/sdk/dn-sdk-minigame/dn-sdk-minigame.zip",
        fail_handler: function() {
          e.inited = !1
        }
      }), ye.requestActionList(), Ae(t.openid), c(e)))
    }
    return v(r, [{
      key: "getInitResult",
      value: function() {
        return {
          inited: this.inited,
          initErrMsg: this.initErrMsg
        }
      }
    }, {
      key: "track",
      value: function(t, e) {
        var n, r;
        if (!this.inited || !this.queueManage) return ft.error("上报失败，请先完成初始化"), {
          code: 100,
          message: "未完成初始化或重复初始化导致初始化失败，请先完成初始化"
        };
        var o = Qt.validateActionType(t),
          i = Qt.validateActionParam(e);
        if (o && i) {
          !this.openid && !this.unionid && ft.warn("缺少 openid 或 unionid");
          var a = ut("actionParamMaxLength");
          if (JSON.stringify(e || {}).length > a) return ft.error("监测到超过".concat(a, "的上报日志：").concat(t, " ").concat(e)), {
            code: 102,
            message: "action_param 参数过大，不能超过 ".concat(a, " 字符")
          };
          var u = !(null == e || !e[Se]),
            c = this.createAction(t, e || {}, u);
          "release" !== (null == (n = V()) ? void 0 : n.envVersion) && ge(c, "minigame");
          var s = this.queueManage.addAction(c);
          return null == (r = this.actionReporter) || r.batchSend(), s
        }
        return {
          code: 101,
          message: "action_type 或 action_param 参数错误"
        }
      }
    }, {
      key: "flush",
      value: function() {
        var t;
        null == (t = this.actionReporter) || t.flushSend()
      }
    }, {
      key: "setOpenId",
      value: function(t) {
        var e;
        if (t && "string" == typeof t) return this.openid = t, this.gameInfo.ad_trace_id && !q.getSync(R) && bt.publish("START_APP"), this.flush(), this.saveValidOpenidToStorage(), "release" !== (null == (e = V()) ? void 0 : e.envVersion) && Ae(t), {
          code: 0,
          message: "成功"
        };
        var n = "openid 格式错误";
        return ft.error(n), {
          code: 101,
          message: n
        }
      }
    }, {
      key: "setUnionId",
      value: function(t) {
        if (t && "string" == typeof t) return this.unionid = t, this.flush(), {
          code: 0,
          message: "成功"
        };
        var e = "unionid 格式错误";
        return ft.error(e), {
          code: 101,
          message: e
        }
      }
    }, {
      key: "setUserUniqueId",
      value: function(t) {
        if (t && "string" == typeof t) return this.user_unique_id = t, {
          code: 0,
          message: "成功"
        };
        var e = "user_unique_id 格式错误";
        return ft.error(e), {
          code: 101,
          message: e
        }
      }
    }, {
      key: "doReportOnEnterBackground",
      value: function() {
        var t = this;
        wx.onHide((function() {
          var e, n;
          null == (e = t.actionReporter) || e.flushSend(), null == (n = t.queueManage) || n.reportLostNum()
        }))
      }
    }, {
      key: "getTrackBaseInfo",
      value: function() {
        var t = V();
        return Object.assign({}, this.deviceInfo, function(t, e) {
          var n = {};
          return ["user_action_set_id", "appid", "openid", "secret_key", "user_unique_id", "unionid"].forEach((function(e) {
            st(t, e) && (n[e] = t[e])
          })), n
        }(this.config), {
          local_id: F(),
          sdk_name: this.sdk_name,
          sdk_version: this.sdk_version,
          openid: this.openid || B(),
          unionid: this.unionid,
          user_unique_id: this.user_unique_id,
          inner_param: {
            app_env_version: t.envVersion,
            app_version: t.version
          }
        })
      }
    }, {
      key: "createAction",
      value: function(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        null != e && e[Se] && delete e[Se];
        var r = Date.now();
        null != e && e[Ee] && (r = null == e ? void 0 : e[Ee], delete e[Ee]);
        var o = {
          action_id: et(),
          action_param: e,
          action_time: r,
          action_type: t,
          is_retry: !1,
          is_sdk_auto_track: n,
          retry_count: 0,
          revised_action_time: W.getRevisedcurrentTimeMillis(),
          log_id: ++this.log_id,
          session_id: this.session_id,
          pkg_channel_id: this.gameInfo.pkg_channel_id,
          source_scene: this.gameInfo.source_scene,
          network_type: j(),
          ad_trace_id: this.gameInfo.ad_trace_id,
          channel: this.getChannelByActionType(t)
        };
        return null != e && e[this.special_method_symbol] && (this.addActionInnerParam(o, "is_special_method", !0), delete e[this.special_method_symbol]), Ct.getChannelClaimActionList().indexOf(t) > -1 && this.gameInfo.launch_options && this.addActionInnerParam(o, "launch_options", this.gameInfo.launch_options), o
      }
    }, {
      key: "addActionInnerParam",
      value: function(t, n, r) {
        t.inner_param && $(t.inner_param) ? t.inner_param[n] = r : t.inner_param = e({}, n, r)
      }
    }, {
      key: "getChannelByActionType",
      value: function(t) {
        var e = "";
        return Ct.getChannelClaimActionList().indexOf(t) > -1 ? e = this.gameInfo.channel || "" : Ct.getNoClaimActionList().indexOf(t) > -1 && (e = "UNKNOWN"), e
      }
    }, {
      key: "reportLog",
      value: function(t) {
        var e, n, r = {
          user_action_set_id: null == (e = this.config) ? void 0 : e.user_action_set_id,
          appid: null == (n = this.config) ? void 0 : n.appid,
          session_id: this.session_id
        };
        K(Object.assign(r, t))
      }
    }, {
      key: "useAutoTrack",
      value: function() {
        var t;
        if (null != (t = this.config) && t.auto_track) {
          var e = !0,
            n = q.getSync(k);
          (null == n ? void 0 : n.ap) === M ? e = !0 : (null == n ? void 0 : n.ap) === P && (e = !1), "devtools" === U().wx_platform && (e = !0), (new pe).install(this, e ? "all" : "lifecycle"), xt(), e && Wt(), this.getAutoProxyRemoteConfig()
        }
      }
    }, {
      key: "getAutoProxyRemoteConfig",
      value: function() {
        var t, e, n = U();
        n.os && n.os_version && null != (t = this.config) && t.user_action_set_id && function(t) {
          return new Promise((function(e) {
            wx.request({
              method: "POST",
              url: "https://api.datanexus.qq.com/data-nexus-config/v1/sdk/minigame/get",
              data: t,
              timeout: S.requestTimeout,
              success: function(t) {
                H(t, e, "minigame/get"), Q(t)
              },
              fail: function(t) {
                J(t, "minigame/get")
              }
            })
          }))
        }({
          conf_name: "MG",
          conf_param: {
            user_action_set_id: null == (e = this.config) ? void 0 : e.user_action_set_id,
            sdk_version: this.sdk_version,
            os_type: (null == n ? void 0 : n.os) || "",
            os_version: lt(n.os_version),
            device_brand: (null == n ? void 0 : n.device_brand) || "",
            weixin_lib_version: (null == n ? void 0 : n.wx_lib_version) || "",
            weixin_version: (null == n ? void 0 : n.wx_version) || ""
          }
        }).then((function(t) {
          $(t) && q.setSync(k, t)
        }))
      }
    }, {
      key: "saveValidOpenidToStorage",
      value: function() {
        this.openid && function(t) {
          return /^[a-zA-Z0-9_-]{28,30}$/.test(t)
        }(this.openid) && q.setSync(R, this.openid)
      }
    }], [{
      key: "setRequestConcurrency",
      value: function(t) {
        de.setRequestConcurrency(t)
      }
    }, {
      key: "setDebug",
      value: function(t) {
        ft.debug = t
      }
    }]), r
  }(),
  Ie = exports.SDK = Oe;
Ie[be] = [], Re([pt], Ie.prototype, "track", 1), Re([pt, function(t, e, n) {
  var r = n.value;
  return n.value = function() {
    if (this.inited) {
      for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
      return r.apply(this, e)
    }
    ft.error("上报失败，请先完成初始化")
  }, n
}], Ie.prototype, "flush", 1), Re([pt], Ie.prototype, "setOpenId", 1), Re([pt], Ie.prototype, "setUnionId", 1), Re([pt], Ie.prototype, "setUserUniqueId", 1), Re([pt], Ie.prototype, "doReportOnEnterBackground", 1), Re([pt], Ie.prototype, "getTrackBaseInfo", 1), Re([pt], Ie.prototype, "useAutoTrack", 1);