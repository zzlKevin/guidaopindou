Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, t = (e = require("./module-helper")) && e.__esModule ? e : {
    default: e
  },
  n = require("./utils");
var u = {},
  a = {
    0: "text",
    1: "image"
  },
  r = {
    0: "green",
    1: "white",
    2: "dark",
    3: "light"
  },
  o = (0, n.getListObject)(u, "gameClubButton");
exports.default = {
  WXCreateGameClubButton: function(e) {
    var t = (0, n.formatJsonStr)(e);
    t.style = JSON.parse(t.styleRaw), 0 === t.style.fontSize && (t.style.fontSize = void 0), t.type = a[t.type], t.icon = r[t.icon], t.text || (t.text = "");
    var o = (0, n.uid)();
    return u[o] = wx.createGameClubButton(t), o
  },
  WXGameClubButtonDestroy: function(e) {
    var t = o(e);
    t && (t.destroy(), u && delete u[e])
  },
  WXGameClubButtonHide: function(e) {
    var t = o(e);
    t && t.hide()
  },
  WXGameClubButtonShow: function(e) {
    var t = o(e);
    t && t.show()
  },
  WXGameClubButtonAddListener: function(e, n) {
    var u = o(e);
    u && u[n]((function() {
      t.default.send("OnGameClubButtonCallback", JSON.stringify({
        callbackId: e,
        errMsg: n
      }))
    }))
  },
  WXGameClubButtonRemoveListener: function(e, t) {
    var n = o(e);
    n && n[t]()
  },
  WXGameClubButtonSetProperty: function(e, t, n) {
    var u = o(e);
    u && (u[t] = n)
  },
  WXGameClubStyleChangeInt: function(e, t, n) {
    var u = o(e);
    u && (u.style[t] = n)
  },
  WXGameClubStyleChangeStr: function(e, t, n) {
    var u = o(e);
    u && (u.style[t] = n)
  }
};