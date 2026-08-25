Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e = require("./conf");
exports.default = {
  _send: null,
  init: function() {
    this._send = GameGlobal.Module.SendMessage
  },
  send: function(t) {
    var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    this._send || this.init(), this._send(e.MODULE_NAME, t, s)
  }
};