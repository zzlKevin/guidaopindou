Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var r, e = (r = require("./module-helper")) && r.__esModule ? r : {
    default: r
  },
  n = require("./utils");
var t = {},
  a = (0, n.getListObject)(t, "video");
exports.default = {
  WX_GetRecorderManager: function() {
    var r = (0, n.uid)();
    return t[r] = wx.getRecorderManager(), r
  },
  WX_OnRecorderError: function(r) {
    var n = a(r);
    if (n) {
      n.onError((function(n) {
        var t = JSON.stringify({
          callbackId: r,
          res: JSON.stringify(n)
        });
        e.default.send("_OnRecorderErrorCallback", t)
      }))
    }
  },
  WX_OnRecorderFrameRecorded: function(r) {
    var t = a(r);
    if (t) {
      t.onFrameRecorded((function(t) {
        (0, n.cacheArrayBuffer)(r, t.frameBuffer);
        var a = JSON.stringify({
          callbackId: r,
          res: JSON.stringify({
            frameBufferLength: t.frameBuffer.byteLength,
            isLastFrame: t.isLastFrame
          })
        });
        e.default.send("_OnRecorderFrameRecordedCallback", a)
      }))
    }
  },
  WX_OnRecorderInterruptionBegin: function(r) {
    var n = a(r);
    if (n) {
      n.onInterruptionBegin((function(n) {
        var t = JSON.stringify({
          callbackId: r,
          res: JSON.stringify(n)
        });
        e.default.send("_OnRecorderInterruptionBeginCallback", t)
      }))
    }
  },
  WX_OnRecorderInterruptionEnd: function(r) {
    var n = a(r);
    if (n) {
      n.onInterruptionEnd((function(n) {
        var t = JSON.stringify({
          callbackId: r,
          res: JSON.stringify(n)
        });
        e.default.send("_OnRecorderInterruptionEndCallback", t)
      }))
    }
  },
  WX_OnRecorderPause: function(r) {
    var n = a(r);
    if (n) {
      n.onPause((function(n) {
        var t = JSON.stringify({
          callbackId: r,
          res: JSON.stringify(n)
        });
        e.default.send("_OnRecorderPauseCallback", t)
      }))
    }
  },
  WX_OnRecorderResume: function(r) {
    var n = a(r);
    if (n) {
      n.onResume((function(n) {
        var t = JSON.stringify({
          callbackId: r,
          res: JSON.stringify(n)
        });
        e.default.send("_OnRecorderResumeCallback", t)
      }))
    }
  },
  WX_OnRecorderStart: function(r) {
    var n = a(r);
    if (n) {
      n.onStart((function(n) {
        var t = JSON.stringify({
          callbackId: r,
          res: JSON.stringify(n)
        });
        e.default.send("_OnRecorderStartCallback", t)
      }))
    }
  },
  WX_OnRecorderStop: function(r) {
    var n = a(r);
    if (n) {
      n.onStop((function(n) {
        var t = JSON.stringify({
          callbackId: r,
          res: JSON.stringify(n)
        });
        e.default.send("_OnRecorderStopCallback", t)
      }))
    }
  },
  WX_RecorderPause: function(r) {
    var e = a(r);
    e && e.pause()
  },
  WX_RecorderResume: function(r) {
    var e = a(r);
    e && e.resume()
  },
  WX_RecorderStart: function(r, e) {
    var t = a(r);
    if (t) {
      var i = (0, n.formatJsonStr)(e);
      t.start(i)
    }
  },
  WX_RecorderStop: function(r) {
    var e = a(r);
    e && e.stop()
  }
};