Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, r, s = require("../@babel/runtime/helpers/objectSpread2"),
  a = (e = require("./module-helper")) && e.__esModule ? e : {
    default: e
  },
  n = require("./utils");
exports.default = {
  WXShareAppMessage: function(e) {
    wx.shareAppMessage(s({}, (0, n.formatJsonStr)(e)))
  },
  WXOnShareAppMessage: function(e, t) {
    wx.onShareAppMessage((function() {
      return s(s({}, (0, n.formatJsonStr)(e)), {}, {
        promise: t ? new Promise((function(e) {
          r = e, a.default.send("OnShareAppMessageCallback")
        })) : null
      })
    }))
  },
  WXOnShareAppMessageResolve: function(e) {
    r && r((0, n.formatJsonStr)(e))
  }
};
wx.showShareMenu({
  menus: ["shareAppMessage", "shareTimeline"]
});