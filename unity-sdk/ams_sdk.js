Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e = require("./wxams");
exports.default = {
  InitAMS: function(o, l, n) {
    if (null == GameGlobal.dnSDK) {
      try {
        GameGlobal.dnSDK = new e.SDK({
          user_action_set_id: o,
          secret_key: l,
          appid: n
        })
      } catch (e) {
        return void console.warn("WXAMS Init failed, error:", e)
      }
      console.log("WXAMS Init success"), window.WXWASMSDK.IsInitWXAMS = !0
    } else console.log("WXAMS InitAMS already initialized, skip")
  },
  START_LOAD: function() {
    var e = GameGlobal.dnSDK.track("START_LOAD", {});
    null != e && 0 !== e.code ? console.warn("WXAMS START_LOAD failed, code:", e.code, "message:", e.message) : null != e && 0 === e.code && console.log("WXAMS START_LOAD success")
  }
};