Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e = require("../@babel/runtime/helpers/objectSpread2"),
  t = l(require("./response")),
  a = l(require("./module-helper")),
  r = require("./utils");

function l(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
exports.default = {
  WXToTempFilePathSync: function(e) {
    return canvas.toTempFilePathSync((0, r.getDefaultData)(canvas, e))
  },
  WXToTempFilePath: function(l, u, i, n) {
    l && canvas.toTempFilePath(e(e(e({}, (0, r.getDefaultData)(canvas, l)), t.default.handleText(u, i, n)), {}, {
      success: function(e) {
        a.default.send("ToTempFilePathCallback", JSON.stringify({
          callbackId: u,
          errMsg: e.errMsg,
          errCode: e.errCode || 0,
          tempFilePath: e.tempFilePath
        }))
      }
    }))
  }
};