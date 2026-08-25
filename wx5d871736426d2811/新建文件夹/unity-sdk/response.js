Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, t = (e = require("./module-helper")) && e.__esModule ? e : {
  default: e
};
exports.default = {
  handleText: function(e, t, r) {
    var n = this;
    return {
      success: function(t) {
        n.textFormat(e, t)
      },
      fail: function(e) {
        n.textFormat(t, e)
      },
      complete: function(e) {
        n.textFormat(r, e)
      }
    }
  },
  handleTextLongBack: function(e, t, r) {
    var n = this;
    return {
      success: function(t) {
        n.textFormatLongBack(e, t)
      },
      fail: function(e) {
        n.textFormatLongBack(t, e)
      },
      complete: function(e) {
        n.textFormatLongBack(r, e)
      }
    }
  },
  textFormat: function(e, r) {
    if (!e) return !1;
    t.default.send("TextResponseCallback", JSON.stringify({
      callbackId: e,
      errMsg: r.errMsg,
      errCode: r.errCode
    }))
  },
  textFormatLongBack: function(e, r) {
    if (!e) return !1;
    t.default.send("TextResponseLongCallback", JSON.stringify({
      callbackId: e,
      errMsg: r.errMsg,
      errCode: r.errCode
    }))
  },
  handle: function(e, t, r, n) {
    return {
      success: function(r) {
        if (!t) return !1;
        e(t, r)
      },
      fail: function(t) {
        if (!r) return !1;
        e(r, t)
      },
      complete: function(t) {
        if (!n) return !1;
        e(n, t)
      }
    }
  }
};