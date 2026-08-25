Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, t = (e = require("./module-helper")) && e.__esModule ? e : {
    default: e
  },
  r = require("./utils");
var i = null;
exports.default = {
  WX_OnNeedPrivacyAuthorization: function() {
    wx.onNeedPrivacyAuthorization((function(e) {
      i = e, t.default.send("_OnNeedPrivacyAuthorizationCallback", "{}")
    }))
  },
  WX_PrivacyAuthorizeResolve: function(e) {
    var t = (0, r.formatJsonStr)(e);
    t.event = t.eventString, i && (i(t), "agree" !== t.event && "disagree" !== t.event || (i = null))
  }
};