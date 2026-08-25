Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, a = require("../@babel/runtime/helpers/objectSpread2"),
  r = (e = require("./module-helper")) && e.__esModule ? e : {
    default: e
  },
  t = require("./utils");
var n = {},
  i = (0, t.getListObject)(n, "camera");
exports.default = {
  WXCameraCreateCamera: function(e, i) {
    var l = wx.createCamera(a(a({}, (0, t.formatJsonStr)(e)), {}, {
      success: function(e) {
        r.default.send("CameraCreateCallback", JSON.stringify({
          callbackId: i,
          type: "success",
          res: JSON.stringify(e)
        }))
      },
      fail: function(e) {
        r.default.send("CameraCreateCallback", JSON.stringify({
          callbackId: i,
          type: "fail",
          res: JSON.stringify(e)
        }))
      },
      complete: function(e) {
        r.default.send("CameraCreateCallback", JSON.stringify({
          callbackId: i,
          type: "complete",
          res: JSON.stringify(e)
        }))
      }
    }));
    n[i] = l
  },
  WXCameraCloseFrameChange: function(e) {
    var a = i(e);
    a && a.closeFrameChange()
  },
  WXCameraDestroy: function(e) {
    var a = i(e);
    a && a.destroy()
  },
  WXCameraListenFrameChange: function(e) {
    var a = i(e);
    a && a.listenFrameChange()
  },
  WXCameraOnAuthCancel: function(e) {
    var a = i(e);
    if (a) {
      a.onAuthCancel((function(a) {
        var t = JSON.stringify({
          callbackId: e,
          res: JSON.stringify(a)
        });
        r.default.send("CameraOnAuthCancelCallback", t)
      }))
    }
  },
  WXCameraOnCameraFrame: function(e) {
    var a = i(e);
    if (a) {
      a.onCameraFrame((function(a) {
        (0, t.cacheArrayBuffer)(e, a.data);
        var n = JSON.stringify({
          callbackId: e,
          res: JSON.stringify({
            width: a.width,
            height: a.height
          })
        });
        r.default.send("CameraOnCameraFrameCallback", n)
      }))
    }
  },
  WXCameraOnStop: function(e) {
    var a = i(e);
    if (a) {
      a.onStop((function(a) {
        var t = JSON.stringify({
          callbackId: e,
          res: JSON.stringify(a)
        });
        r.default.send("CameraOnStopCallback", t)
      }))
    }
  }
};