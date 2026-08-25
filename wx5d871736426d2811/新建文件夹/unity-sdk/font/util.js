Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ceil4 = function(r) {
  return r + 3 & -4
}, exports.decodeUnicode = function(r, e, t) {
  var o = new Uint8Array(r, e, t);
  return String.fromCharCode.apply(null, Array.from(o))
}, exports.toBytesInt32 = function(r) {
  for (var e = "", t = 3; t >= 0; t--) e += String.fromCharCode(r >> 8 * t & 255);
  return e
};