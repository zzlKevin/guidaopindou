Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.cacheArrayBuffer = y, exports.convertDataToPointer = function(e) {
  if ("number" == typeof e) return function(e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Float64Array,
      t = b(e, r);
    return h(t)
  }(e);
  if ("string" == typeof e) return g(e);
  if (e instanceof ArrayBuffer || "object" === r(e)) return h(new Uint8Array(e));
  return 0
}, exports.convertInfoToPointer = function(e) {
  return h(function(e) {
    return v([p(e.address), p(e.family), b(e.port, Uint32Array)])
  }(e))
}, exports.convertOnTouchStartListenerResultToPointer = function(e) {
  return h(function(e) {
    return v([w(e.touches), w(e.changedTouches), b(e.timeStamp, Uint32Array)])
  }(e))
}, exports.debugLog = function() {}, exports.formatIdentifier = l, exports.formatJsonStr = s, exports.formatResponse = function e(t, i, o) {
  i || (i = {});
  if ("object" !== r(i)) return {};
  var a = n.ResType[t];
  if (!a) return i;
  if (Object.keys(a).forEach((function(t) {
      if (null === i[t] || void 0 === i[t]) void 0 === u[a[t]] ? a[t].indexOf("[]") > -1 ? i[t] = [] : (i[t] = {}, n.ResType[a[t]] && e(a[t], i[t])) : i[t] = u[a[t]];
      else if ("long" === a[t]) i[t] = parseInt(i[t], 10);
      else if ("number" === a[t] && "string" == typeof i[t]) i[t] = Number(i[t]);
      else if ("string" === a[t] && "number" == typeof i[t]) i[t] = "".concat(i[t]);
      else if ("string" === a[t] && "object" === r(i[t])) i[t] = JSON.stringify(i[t]);
      else if ("bool" !== a[t] || "number" != typeof i[t] && "string" != typeof i[t]) {
        if ("arrayBuffer" === a[t]) o ? (y(o, i[t]), i.arrayBufferLength = i[t].byteLength, i[t] = []) : i[t] instanceof ArrayBuffer ? (i[t] = new Uint8Array(i[t]), i[t] = Array.from(i[t])) : i[t] = [];
        else if ("object" === r(i[t]) && "object" === a[t]) Object.keys(i[t]).forEach((function(e) {
          "object" === r(i[t][e]) ? i[t][e] = JSON.stringify(i[t][e]) : i[t][e] += ""
        }));
        else if ("object" === r(i[t]) && a[t]) {
          var f = a[t].match(/(.+)\[\]/);
          if (f)
            for (var c = 0, l = Object.keys(i[t]); c < l.length; c++) {
              var s = l[c];
              "string" === f[1] ? i[t][s] = "".concat(i[t][s]) : "number" === f[1] ? i[t][s] = Number(i[t][s]) : e(f[1], i[t][s])
            } else e(a[t], i[t])
        }
      } else i[t] = !!i[t]
    })), a.anyKeyWord) return i;
  Object.keys(i).forEach((function(e) {
    if (void 0 === a[e]) delete i[e];
    else {
      var t = c[a[e]];
      t && t !== r(i[e]) && (i[e] = u[a[e]])
    }
  })), "SystemInfo" !== t && "WindowInfo" !== t || !i.pixelRatio || (i.pixelRatio = window.devicePixelRatio);
  return i
}, exports.formatTouchEvent = function(e, r, t) {
  return {
    clientX: e.clientX * window.devicePixelRatio,
    clientY: (window.innerHeight - e.clientY) * window.devicePixelRatio,
    force: e.force,
    identifier: l(e.identifier, r, t),
    pageX: e.pageX * window.devicePixelRatio,
    pageY: (window.innerHeight - e.pageY) * window.devicePixelRatio
  }
}, exports.getDefaultData = function(e, r) {
  var t = s(r);
  void 0 === t.x && (t.x = 0);
  void 0 === t.y && (t.y = 0);
  void 0 !== t.width && 0 !== t.width || (t.width = e.width);
  void 0 !== t.height && 0 !== t.height || (t.height = e.height);
  void 0 !== t.destWidth && 0 !== t.destWidth || (t.destWidth = e.width);
  void 0 !== t.destHeight && 0 !== t.destHeight || (t.destHeight = e.height);
  return t
}, exports.getListObject = function(e, r) {
  return function(t) {
    e || (e = {});
    var n = e[t];
    return n || console.error("".concat(r, " 不存在:"), t), n
  }
}, exports.offEventCallback = function(e, r, t) {
  if (!e || !e[t]) return;
  e[t].forEach(r), delete e[t]
}, exports.onEventCallback = function(e, r, n, i) {
  e[n] || (e[n] = []);
  var o = function(e) {
    var o = JSON.stringify({
      callbackId: i || n,
      res: JSON.stringify(e)
    });
    t.default.send(r, o)
  };
  return e[n].push(o), o
}, exports.setArrayBuffer = function(e, r, t) {
  e.set(new Uint8Array(f[t]), r), delete f[t]
}, exports.stringifyRes = function(e) {
  if (!e) return "{}";
  return JSON.stringify(e)
}, exports.uid = void 0;
var e, r = require("../@babel/runtime/helpers/typeof"),
  t = (e = require("./module-helper")) && e.__esModule ? e : {
    default: e
  },
  n = require("./resType"),
  i = require("./resTypeOther");
Object.assign(n.ResType, i.ResTypeOther);
var o = [],
  a = {},
  f = {},
  u = {
    array: [],
    arrayBuffer: [],
    string: "",
    number: 0,
    bool: !1,
    object: {}
  },
  c = {
    array: "object",
    arrayBuffer: "object",
    string: "string",
    number: "number",
    bool: "boolean",
    object: "object"
  };
exports.uid = function() {
  return function() {
    for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 20, r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], t = "".concat(r ? "" : "!#%()*+,-./:;=?@[]^_`{|}~", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"), n = t.length, i = [], o = 0; o < e; o++) i[o] = t.charAt(Math.random() * n);
    return i.join("")
  }(20, !0)
};

function l(e, r, t) {
  t && a[e] && (clearTimeout(a[e]), delete a[e]);
  var n = o.indexOf(e);
  if (n <= -1)
    for (var i = 0; i < o.length; i++)
      if (null === o[i]) {
        o[i] = e, n = i;
        break
      } return n <= -1 && (o.push(e), n = o.length - 1), !t || "touchend" !== r && "touchcancel" !== r || (a[e] = setTimeout((function() {
    o[n] = null, delete a[e]
  }), 50)), n
}

function s(e, r) {
  if (!e) return {};
  if ("string|arrayBuffer" === r) return d(e);
  try {
    var t = JSON.parse(e);
    if (Object.keys(t).forEach((function(e) {
        null === t[e] && delete t[e]
      })), r) {
      var i = n.ResType[r];
      if (!i) return t;
      Object.keys(i).forEach((function(e) {
        t[e] && ("arrayBuffer" === i[e] ? t[e] = new Uint8Array(t[e]).buffer : "string|arrayBuffer" === i[e] && (t[e] = d(t[e])))
      }))
    }
    return t
  } catch (r) {
    return e
  }
}

function d(e) {
  return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e) ? function(e) {
    for (var r = atob(e), t = r.length, n = new Uint8Array(t), i = 0; i < t; i++) n[i] = r.charCodeAt(i);
    return n.buffer
  }(e) : e
}

function y(e, r) {
  e && r && (f[e] = r)
}

function h(e) {
  var r = GameGlobal.Module._malloc(e.length);
  return GameGlobal.Module.HEAPU8.set(e, r), r
}

function g(e) {
  var r = GameGlobal.Module.lengthBytesUTF8(e) + 1,
    t = GameGlobal.Module._malloc(r);
  return GameGlobal.Module.stringToUTF8(e, t, r), t
}

function b(e) {
  var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Float64Array;
  return new Uint8Array(new r([e]).buffer)
}

function p(e) {
  var r = g(e),
    t = GameGlobal.Module.lengthBytesUTF8(e),
    n = new Uint8Array(GameGlobal.Module.HEAPU8.buffer, r, t),
    i = new Uint8Array(4);
  new DataView(i.buffer).setUint32(0, n.length, !0);
  var o = new Uint8Array(4 + n.length);
  return o.set(i), o.set(n, 4), GameGlobal.Module._free(r), o
}

function v(e) {
  var r = e.reduce((function(e, r) {
      return e + r.length
    }), 0),
    t = new Uint8Array(r),
    n = 0;
  return e.forEach((function(e) {
    t.set(e, n), n += e.length
  })), t
}

function m(e) {
  return v([b(e.clientX, Float32Array), b(e.clientY, Float32Array), b(e.force), b(e.identifier, Uint32Array), b(e.pageX, Float32Array), b(e.pageY, Float32Array)])
}

function w(e) {
  return v(e.map(m))
}