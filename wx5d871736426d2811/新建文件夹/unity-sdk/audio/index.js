Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e = require("../../@babel/runtime/helpers/objectSpread2"),
  r = d(require("./inner-audio")),
  u = d(require("./unity-audio")),
  t = d(require("./common"));

function d(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
exports.default = e(e(e({}, r.default), u.default), t.default);