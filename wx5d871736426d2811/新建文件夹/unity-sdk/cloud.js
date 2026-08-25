Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, l = require("../@babel/runtime/helpers/objectSpread2"),
  a = require("../@babel/runtime/helpers/typeof"),
  t = (e = require("./module-helper")) && e.__esModule ? e : {
    default: e
  },
  n = require("./utils");
var o = {},
  s = {};
var i = {};
exports.default = {
  WX_CloudCloud: function(e) {
    var l = (0, n.formatJsonStr)(e),
      a = new wx.cloud.Cloud(l);
    i[l.resourceEnv] = a
  },
  WX_CloudInit: function(e) {
    var l = (0, n.formatJsonStr)(e);
    "_default_" === l.env ? wx.cloud.init() : wx.cloud.init(l)
  },
  WX_CloudCallFunction: function(e, c, u) {
    var r = (0, n.formatJsonStr)(c);
    r.data && function e(l) {
      Object.keys(l).forEach((function(t) {
        "object" === a(l[t]) ? e(l[t]) : "string" == typeof l[t] && (o[l[t]] && (l[t] = o[l[t]]), s[l[t]] && (l[t] = s[l[t]]))
      }))
    }(r.data), ("_default_" === e ? wx.cloud : i[e]).callFunction(l(l({}, r), {}, {
      success: function(e) {
        (0, n.formatResponse)("CallFunctionResult", e), t.default.send("_CloudCallFunctionCallback", JSON.stringify({
          callbackId: u,
          type: "success",
          res: JSON.stringify(e)
        }))
      },
      fail: function(e) {
        (0, n.formatResponse)("GeneralCallbackResult", e), t.default.send("_CloudCallFunctionCallback", JSON.stringify({
          callbackId: u,
          type: "fail",
          res: JSON.stringify(e)
        }))
      },
      complete: function(e) {
        (0, n.formatResponse)("GeneralCallbackResult", e), t.default.send("_CloudCallFunctionCallback", JSON.stringify({
          callbackId: u,
          type: "complete",
          res: JSON.stringify(e)
        }))
      }
    }))
  },
  WX_CloudCloudID: function(e, l) {
    var a = ("_default_" === e ? wx.cloud : i[e]).CloudID(l),
      t = "CloudID-".concat((0, n.uid)());
    return o[t] = a, t
  },
  WX_CloudCDN: function(e, l) {
    var a = ("_default_" === e ? wx.cloud : i[e]).CDN(l),
      t = "CDN-".concat((0, n.uid)());
    return s[t] = a, t
  },
  WX_CloudCallContainer: function(e, a, o) {
    var s = (0, n.formatJsonStr)(a);
    ("_default_" === e ? wx.cloud : i[e]).callContainer(l(l({}, s), {}, {
      success: function(e) {
        (0, n.formatResponse)("CallContainerResult", e), t.default.send("_CloudCallContainerCallback", JSON.stringify({
          callbackId: o,
          type: "success",
          res: JSON.stringify(e)
        }))
      },
      fail: function(e) {
        (0, n.formatResponse)("GeneralCallbackResult", e), t.default.send("_CloudCallContainerCallback", JSON.stringify({
          callbackId: o,
          type: "fail",
          res: JSON.stringify(e)
        }))
      },
      complete: function(e) {
        (0, n.formatResponse)("GeneralCallbackResult", e), t.default.send("_CloudCallContainerCallback", JSON.stringify({
          callbackId: o,
          type: "complete",
          res: JSON.stringify(e)
        }))
      }
    }))
  },
  WX_CloudUploadFile: function(e, a, o) {
    var s = (0, n.formatJsonStr)(a);
    ("_default_" === e ? wx.cloud : i[e]).uploadFile(l(l({}, s), {}, {
      success: function(e) {
        (0, n.formatResponse)("UploadFileResult", e), t.default.send("_CloudUploadFileCallback", JSON.stringify({
          callbackId: o,
          type: "success",
          res: JSON.stringify(e)
        }))
      },
      fail: function(e) {
        (0, n.formatResponse)("GeneralCallbackResult", e), t.default.send("_CloudUploadFileCallback", JSON.stringify({
          callbackId: o,
          type: "fail",
          res: JSON.stringify(e)
        }))
      },
      complete: function(e) {
        (0, n.formatResponse)("GeneralCallbackResult", e), t.default.send("_CloudUploadFileCallback", JSON.stringify({
          callbackId: o,
          type: "complete",
          res: JSON.stringify(e)
        }))
      }
    }))
  },
  WX_CloudDownloadFile: function(e, a, o) {
    var s = (0, n.formatJsonStr)(a);
    ("_default_" === e ? wx.cloud : i[e]).downloadFile(l(l({}, s), {}, {
      success: function(e) {
        (0, n.formatResponse)("DownloadFileResult", e), t.default.send("_CloudDownloadFileCallback", JSON.stringify({
          callbackId: o,
          type: "success",
          res: JSON.stringify(e)
        }))
      },
      fail: function(e) {
        (0, n.formatResponse)("GeneralCallbackResult", e), t.default.send("_CloudDownloadFileCallback", JSON.stringify({
          callbackId: o,
          type: "fail",
          res: JSON.stringify(e)
        }))
      },
      complete: function(e) {
        (0, n.formatResponse)("GeneralCallbackResult", e), t.default.send("_CloudDownloadFileCallback", JSON.stringify({
          callbackId: o,
          type: "complete",
          res: JSON.stringify(e)
        }))
      }
    }))
  },
  WX_CloudGetTempFileURL: function(e, a, o) {
    var s = (0, n.formatJsonStr)(a);
    ("_default_" === e ? wx.cloud : i[e]).getTempFileURL(l(l({}, s), {}, {
      success: function(e) {
        (0, n.formatResponse)("GetTempFileURLResult", e), t.default.send("_CloudGetTempFileURLCallback", JSON.stringify({
          callbackId: o,
          type: "success",
          res: JSON.stringify(e)
        }))
      },
      fail: function(e) {
        (0, n.formatResponse)("GeneralCallbackResult", e), t.default.send("_CloudGetTempFileURLCallback", JSON.stringify({
          callbackId: o,
          type: "fail",
          res: JSON.stringify(e)
        }))
      },
      complete: function(e) {
        (0, n.formatResponse)("GeneralCallbackResult", e), t.default.send("_CloudGetTempFileURLCallback", JSON.stringify({
          callbackId: o,
          type: "complete",
          res: JSON.stringify(e)
        }))
      }
    }))
  },
  WX_CloudDeleteFile: function(e, a, o) {
    var s = (0, n.formatJsonStr)(a);
    ("_default_" === e ? wx.cloud : i[e]).deleteFile(l(l({}, s), {}, {
      success: function(e) {
        (0, n.formatResponse)("DeleteFileResult", e), t.default.send("_CloudDeleteFileCallback", JSON.stringify({
          callbackId: o,
          type: "success",
          res: JSON.stringify(e)
        }))
      },
      fail: function(e) {
        (0, n.formatResponse)("GeneralCallbackResult", e), t.default.send("_CloudDeleteFileCallback", JSON.stringify({
          callbackId: o,
          type: "fail",
          res: JSON.stringify(e)
        }))
      },
      complete: function(e) {
        (0, n.formatResponse)("GeneralCallbackResult", e), t.default.send("_CloudDeleteFileCallback", JSON.stringify({
          callbackId: o,
          type: "complete",
          res: JSON.stringify(e)
        }))
      }
    }))
  }
};