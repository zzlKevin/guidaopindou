Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, a = require("../@babel/runtime/helpers/objectSpread2"),
  l = (e = require("./module-helper")) && e.__esModule ? e : {
    default: e
  },
  t = require("./utils");
var r = {},
  o = {},
  s = {},
  i = (0, t.getListObject)(r, "uploadTask");
exports.default = {
  WX_UploadFile: function(e, o) {
    var s = (0, t.formatJsonStr)(e),
      i = wx.uploadFile(a(a({}, s), {}, {
        success: function(e) {
          l.default.send("UploadFileCallback", JSON.stringify({
            callbackId: o,
            type: "success",
            res: JSON.stringify(e)
          }))
        },
        fail: function(e) {
          l.default.send("UploadFileCallback", JSON.stringify({
            callbackId: o,
            type: "fail",
            res: JSON.stringify(e)
          }))
        },
        complete: function(e) {
          l.default.send("UploadFileCallback", JSON.stringify({
            callbackId: o,
            type: "complete",
            res: JSON.stringify(e)
          })), setTimeout((function() {
            r && delete r[o]
          }), 0)
        }
      }));
    r[o] = i
  },
  WXUploadTaskAbort: function(e) {
    var a = i(e);
    a && a.abort()
  },
  WXUploadTaskOffHeadersReceived: function(e) {
    var a = i(e);
    a && (0, t.offEventCallback)(s, (function(e) {
      a.offHeadersReceived(e)
    }), e)
  },
  WXUploadTaskOffProgressUpdate: function(e) {
    var a = i(e);
    a && (0, t.offEventCallback)(o, (function(e) {
      a.offProgressUpdate(e)
    }), e)
  },
  WXUploadTaskOnHeadersReceived: function(e) {
    var a = i(e);
    if (a) {
      var l = (0, t.onEventCallback)(s, "_OnHeadersReceivedCallback", e);
      a.onHeadersReceived(l)
    }
  },
  WXUploadTaskOnProgressUpdate: function(e) {
    var a = i(e);
    if (a) {
      var l = (0, t.onEventCallback)(o, "_OnProgressUpdateCallback", e);
      a.onProgressUpdate(l)
    }
  }
};