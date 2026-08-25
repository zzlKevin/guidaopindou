Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = function(t) {
  for (var e = new DataView(t), a = e.getUint16(4), n = 0, o = 0, r = 0, g = 0, i = 0; i < a; i++) {
    1668112752 === e.getUint32(12 + 16 * i) && (r = 12 + 16 * i + 4, g = e.getUint32(r), n = e.getUint32(12 + 16 * i + 8), o = e.getUint32(12 + 16 * i + 12), GameGlobal.manager.Logger.pluginLog("[font]cmapCheckSubOffset [".concat(r, "], cmapCheckSum [").concat(g, "], cmapOffset [").concat(n, "], cmapLength [").concat(o, "]")))
  }
  if (0 === n) return GameGlobal.manager.Logger.pluginError("[font]not found cmap"), !1;
  for (var c = new DataView(t, n, o), f = c.getUint16(2), u = 4, l = 0, m = 0; m < f; m++) {
    var p = c.getUint16(u),
      b = c.getUint16(u + 2);
    if (0 === p && 5 === b) {
      m === f - 1 && (l = u, GameGlobal.manager.Logger.pluginLog("[font]targetSubtableOffset ".concat(l)));
      break
    }
    u += 8
  }
  if (l > 0) {
    var s = new DataView(t, n, o - 8);
    s.setUint16(2, f - 1);
    for (var U = 0, L = (s.byteLength + 3) / 4, G = 0; G < L; G++) U += s.getUint32(G);
    return e.setUint32(r, U), !0
  }
  return GameGlobal.manager.Logger.pluginLog("[font]not found cmap subtable"), !1
};