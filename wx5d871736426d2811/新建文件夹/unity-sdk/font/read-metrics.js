Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = function(t) {
  for (var n, i = new DataView(t), r = i.getUint16(4), a = 0, g = 0, s = 0, u = 0; u < r; u++) {
    var f = i.getUint32(12 + 16 * u),
      o = (0, e.toBytesInt32)(f);
    if ("hhea" === o) {
      var U = i.getUint32(12 + 16 * u + 8),
        l = i.getUint32(12 + 16 * u + 12),
        v = new DataView(t, U, l);
      a = v.getInt16(4), g = v.getInt16(6), s = v.getInt16(8)
    } else if ("head" === o) {
      var w = i.getUint32(12 + 16 * u + 8),
        c = i.getUint32(12 + 16 * u + 12),
        d = new DataView(t, w, c);
      n = d.getUint16(18)
    }
  }
  if (!a || !g || !n) return;
  return {
    ascent: 1 * a / n,
    descent: 1 * g / n,
    lineGap: 1 * s / n,
    unitsPerEm: n
  }
};
var e = require("./util");