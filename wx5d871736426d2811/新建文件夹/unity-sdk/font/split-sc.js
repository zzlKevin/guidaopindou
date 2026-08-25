Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = function(e) {
  var r = new DataView(e),
    n = r.getUint32(0);
  if ("ttcf" !== (0, t.toBytesInt32)(n)) return void GameGlobal.manager.Logger.pluginError("input not a valid ttc file");
  for (var i = r.getInt32(8), o = void 0, f = /S\0?C/, g = 0; g < i; g++) {
    var u = r.getUint32(12 + 4 * g),
      l = a(r, u);
    if ("string" == typeof l && f.test(l)) {
      o = u;
      break
    }
  }
  if (!o) return void GameGlobal.manager.Logger.pluginError("SC Font not found in TTC File.");
  return function(e, r) {
    for (var n = e.getUint16(r + 4), a = 12 + 16 * n, i = 0, o = 0; o < n; o++) {
      var f = e.getUint32(r + 12 + 12 + 16 * o);
      i += (0, t.ceil4)(f)
    }
    var g = new ArrayBuffer(a + i),
      u = new Uint8Array(g),
      l = new DataView(g);
    u.set(new Uint8Array(e.buffer, r, a), 0);
    for (var v = a, c = 0; c < n; c++) {
      var s = e.getUint32(r + 12 + 8 + 16 * c),
        U = e.getUint32(r + 12 + 12 + 16 * c);
      l.setUint32(20 + 16 * c, v), u.set(new Uint8Array(e.buffer, s, U), v), v += (0, t.ceil4)(U)
    }
    return l
  }(r, o).buffer
};
var e = require("../../@babel/runtime/helpers/createForOfIteratorHelper"),
  t = require("./util");

function r(e, r) {
  for (var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, a = e, i = a.getUint16(n + 4), o = 0; o < i; o++) {
    var f = a.getUint32(n + 12 + 16 * o),
      g = (0, t.toBytesInt32)(f);
    if (g === r) {
      var u = a.getUint32(n + 12 + 16 * o + 8),
        l = a.getUint32(n + 12 + 16 * o + 12);
      return new DataView(e.buffer, u, l)
    }
  }
  GameGlobal.manager.Logger.pluginError("\tTable#".concat(r, " not found in DataView"))
}

function n(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
    n = r(e, "name", t);
  if (n) {
    var a = {};
    a.data = n, a.format = n.getUint16(0), a.count = n.getUint16(2), a.stringOffset = n.getUint16(4);
    for (var i = [], o = 0; o < a.count; o++) {
      var f = 6 + 12 * o;
      i.push({
        platformID: n.getUint16(f),
        platformSpecificID: n.getUint16(f + 2),
        languageID: n.getUint16(f + 4),
        nameID: n.getUint16(f + 6),
        length: n.getUint16(f + 8),
        offset: n.getUint16(f + 10)
      })
    }
    return a.nameRecords = i, a
  }
}

function a(r) {
  var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
    i = n(r, a);
  if (i && i.nameRecords) {
    var o, f = e(i.nameRecords);
    try {
      for (f.s(); !(o = f.n()).done;) {
        var g = o.value,
          u = g.nameID;
        if (1 === u) {
          var l, v = g.offset,
            c = g.length;
          return (0, t.decodeUnicode)(r.buffer, ((null === (l = i.data) || void 0 === l ? void 0 : l.byteOffset) || 0) + (i.stringOffset || 0) + v, c)
        }
      }
    } catch (e) {
      f.e(e)
    } finally {
      f.f()
    }
  }
}