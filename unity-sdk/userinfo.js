Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, r = (e = require("./module-helper")) && e.__esModule ? e : {
    default: e
  },
  t = require("./utils");
var o = {},
  n = (0, t.getListObject)(o, "userInfoButton");
exports.default = {
  WXCreateUserInfoButton: function(e, r, n, i, a, u) {
    var d = (0, t.uid)(),
      s = wx.createUserInfoButton({
        type: "text",
        text: "",
        withCredentials: u,
        lang: a,
        style: {
          left: e / window.devicePixelRatio,
          top: r / window.devicePixelRatio,
          width: n / window.devicePixelRatio,
          height: i / window.devicePixelRatio,
          backgroundColor: "rgba(0, 0, 0, 0)",
          color: "rgba(0, 0, 0, 0)",
          textAlign: "center",
          fontSize: 0,
          borderRadius: 0,
          borderColor: "#FFFFFF",
          borderWidth: 0,
          lineHeight: i / window.devicePixelRatio
        }
      });
    return o[d] = s, d
  },
  WXUserInfoButtonShow: function(e) {
    var r = n(e);
    r && r.show()
  },
  WXUserInfoButtonDestroy: function(e) {
    var r = n(e);
    r && (r.destroy(), o && delete o[e])
  },
  WXUserInfoButtonHide: function(e) {
    var r = n(e);
    r && r.hide()
  },
  WXUserInfoButtonOffTap: function(e) {
    var r = n(e);
    r && r.offTap()
  },
  WXUserInfoButtonOnTap: function(e) {
    var t = n(e);
    t && t.onTap((function(t) {
      t.userInfo = t.userInfo || {}, r.default.send("UserInfoButtonOnTapCallback", JSON.stringify({
        callbackId: e,
        errCode: t.err_code || (0 === t.errMsg.indexOf("getUserInfo:fail") ? 1 : 0),
        errMsg: t.errMsg || "",
        signature: t.signature || "",
        encryptedData: t.encryptedData || "",
        iv: t.iv || "",
        cloudID: t.cloudID || "",
        userInfoRaw: JSON.stringify({
          nickName: t.userInfo.nickName || "",
          avatarUrl: t.userInfo.avatarUrl || "",
          country: t.userInfo.country || "",
          province: t.userInfo.province || "",
          city: t.userInfo.city || "",
          language: t.userInfo.language || "",
          gender: t.userInfo.gender || 0
        })
      }))
    }))
  }
};