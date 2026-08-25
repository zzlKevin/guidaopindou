Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, r = (e = require("./module-helper")) && e.__esModule ? e : {
    default: e
  },
  o = require("./utils");
var t, a = {},
  i = (0, o.getListObject)(a, "gameRecorder");
exports.default = {
  WX_GetGameRecorder: function() {
    var e = (0, o.uid)();
    return a[e] = wx.getGameRecorder(), e
  },
  WX_GameRecorderOff: function(e, r) {
    var o = i(e);
    if (o && o && void 0 !== t && void 0 !== t[r]) {
      for (var a in Object.keys(t[r])) {
        var n = t[r][a];
        n && o.off(r, n)
      }
      t[r] = {}
    }
  },
  WX_GameRecorderOn: function(e, a) {
    var n = i(e);
    if (n) {
      t || (t = {
        start: {},
        stop: {},
        pause: {},
        resume: {},
        abort: {},
        timeUpdate: {},
        error: {}
      });
      var d = (0, o.uid)(),
        u = function(o) {
          var t = "";
          o && (t = JSON.stringify(o));
          var i = JSON.stringify({
            id: e,
            res: JSON.stringify({
              eventType: a,
              result: t
            })
          });
          r.default.send("_OnGameRecorderCallback", i)
        };
      return t[a] ? (t[a][d] = u, n.on(a, u), d) : ""
    }
  },
  WX_GameRecorderStart: function(e, r) {
    var t = i(e);
    if (t) {
      var a = (0, o.formatJsonStr)(r);
      t.start(a)
    }
  },
  WX_GameRecorderAbort: function(e) {
    var r = i(e);
    r && r.abort()
  },
  WX_GameRecorderPause: function(e) {
    var r = i(e);
    r && r.pause()
  },
  WX_GameRecorderResume: function(e) {
    var r = i(e);
    r && r.resume()
  },
  WX_GameRecorderStop: function(e) {
    var r = i(e);
    r && r.stop()
  },
  WX_OperateGameRecorderVideo: function(e) {
    if (void 0 !== wx.operateGameRecorderVideo) {
      var r = (0, o.formatJsonStr)(e);
      r.fail = function(e) {
        console.error(e)
      }, wx.operateGameRecorderVideo(r)
    }
  }
};