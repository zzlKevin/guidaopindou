Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e = require("../@babel/runtime/helpers/objectSpread2"),
  r = a(require("./module-helper")),
  t = a(require("./response")),
  n = require("./utils"),
  o = require("./audio/utils");

function a(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
var d = {};
exports.default = {
  WXCreateBannerAd: function(t) {
    var o = (0, n.formatJsonStr)(t);
    o.style = JSON.parse(o.styleRaw || "{}");
    var a = wx.createBannerAd(o),
      i = (0, n.uid)();
    return d[i] = a, a.onError((function(e) {
      console.error(e), r.default.send("ADOnErrorCallback", JSON.stringify({
        callbackId: i,
        errMsg: e.errMsg,
        errCode: e.errCode || e.err_code
      }))
    })), a.onLoad((function() {
      r.default.send("ADOnLoadCallback", JSON.stringify({
        callbackId: i,
        errMsg: ""
      }))
    })), a.onResize((function(t) {
      r.default.send("ADOnResizeCallback", JSON.stringify(e({
        callbackId: i,
        errMsg: ""
      }, t)))
    })), i
  },
  WXCreateFixedBottomMiddleBannerAd: function(t, o, a) {
    var i = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync(),
      l = wx.createBannerAd({
        adUnitId: t,
        adIntervals: o,
        style: {
          left: 0,
          top: i.windowHeight - a,
          height: a,
          width: i.windowWidth
        }
      }),
      s = (0, n.uid)();
    d[s] = l, l.onError((function(e) {
      console.error(e), r.default.send("ADOnErrorCallback", JSON.stringify({
        callbackId: s,
        errMsg: e.errMsg,
        errCode: e.errCode || e.err_code
      }))
    })), l.onLoad((function() {
      r.default.send("ADOnLoadCallback", JSON.stringify({
        callbackId: s,
        errMsg: ""
      }))
    }));
    var c = i.windowWidth;
    return l.onResize((function(t) {
      (Math.abs(t.height - a) > 1 || Math.abs(t.width - c) > 1) && (l.style.left = Math.round((i.windowWidth - t.width) / 2), l.style.top = Math.round(i.windowHeight - t.height)), r.default.send("ADOnResizeCallback", JSON.stringify(e({
        callbackId: s,
        errMsg: ""
      }, t)))
    })), s
  },
  WXCreateRewardedVideoAd: function(t) {
    var a = (0, n.formatJsonStr)(t),
      i = wx.createRewardedVideoAd(a),
      l = (0, n.uid)();
    return d[l] = i, a.multiton || (i.offLoad(), i.offError(), i.offClose()), i.onError((function(e) {
      console.error(e), r.default.send("ADOnErrorCallback", JSON.stringify({
        callbackId: l,
        errMsg: e.errMsg,
        errCode: e.errCode || e.err_code
      }))
    })), i.onLoad((function(t) {
      r.default.send("ADOnLoadCallback", JSON.stringify(e({
        callbackId: l,
        errMsg: ""
      }, t)))
    })), i.onClose((function(t) {
      r.default.send("ADOnVideoCloseCallback", JSON.stringify(e({
        callbackId: l,
        errMsg: ""
      }, t))), setTimeout((function() {
        (0, o.resumeWebAudio)()
      }), 0)
    })), l
  },
  WXCreateInterstitialAd: function(e) {
    var t = (0, n.formatJsonStr)(e),
      o = wx.createInterstitialAd(t),
      a = (0, n.uid)();
    return d[a] = o, o.onError((function(e) {
      console.error(e), r.default.send("ADOnErrorCallback", JSON.stringify({
        callbackId: a,
        errMsg: e.errMsg,
        errCode: e.errCode || e.err_code
      }))
    })), o.onLoad((function() {
      r.default.send("ADOnLoadCallback", JSON.stringify({
        callbackId: a,
        errMsg: ""
      }))
    })), o.onClose((function() {
      r.default.send("ADOnCloseCallback", JSON.stringify({
        callbackId: a,
        errMsg: ""
      }))
    })), a
  },
  WXCreateCustomAd: function(e) {
    var t = (0, n.formatJsonStr)(e);
    t.style = JSON.parse(t.styleRaw || "{}");
    var o = wx.createCustomAd(t),
      a = (0, n.uid)();
    return d[a] = o, o.onError((function(e) {
      console.error(e), r.default.send("ADOnErrorCallback", JSON.stringify({
        callbackId: a,
        errMsg: e.errMsg,
        errCode: e.errCode || e.err_code
      }))
    })), o.onLoad((function() {
      r.default.send("ADOnLoadCallback", JSON.stringify({
        callbackId: a,
        errMsg: ""
      }))
    })), o.onClose((function() {
      r.default.send("ADOnCloseCallback", JSON.stringify({
        callbackId: a,
        errMsg: ""
      }))
    })), o.onHide((function() {
      r.default.send("ADOnHideCallback", JSON.stringify({
        callbackId: a,
        errMsg: ""
      }))
    })), a
  },
  WXADStyleChange: function(e, r, t) {
    if (!d[e]) return !1;
    void 0 !== d[e].style && (d[e].style[r] = t)
  },
  WXShowAd: function(e, r, n) {
    if (!d[e]) return !1;
    d[e].show().then((function() {
      t.default.textFormat(r, {
        errMsg: "show:ok"
      })
    })).catch((function(e) {
      t.default.textFormat(n, {
        errMsg: e.errMsg || ""
      })
    }))
  },
  WXShowAd2: function(e, r, n, o, a) {
    if (!d[e]) return !1;
    d[e].show({
      branchId: r,
      branchDim: n
    }).then((function() {
      t.default.textFormat(o, {
        errMsg: "show:ok"
      })
    })).catch((function(e) {
      t.default.textFormat(a, {
        errMsg: e.errMsg || ""
      })
    }))
  },
  WXHideAd: function(e, r, n) {
    if (!d[e]) return !1;
    if (void 0 !== d[e].hide)
      if (r || n) {
        var o = d[e].hide();
        o ? o.then((function() {
          t.default.textFormat(r, {
            errMsg: "hide:ok"
          })
        })).catch((function(e) {
          t.default.textFormat(n, {
            errMsg: e.errMsg || ""
          })
        })) : t.default.textFormat(r, {
          errMsg: "hide:ok"
        })
      } else d[e].hide()
  },
  WXADGetStyleValue: function(e, r) {
    return d[e] ? void 0 !== d[e].style ? d[e].style[r] : void 0 : -1
  },
  WXADDestroy: function(e) {
    if (!d[e]) return !1;
    d[e].destroy(), delete d[e]
  },
  WXADLoad: function(n, o, a) {
    if (!d[n]) return !1;
    void 0 !== d[n].load && d[n].load().then((function() {
      t.default.textFormat(o, {})
    })).catch((function(t) {
      r.default.send("ADLoadErrorCallback", JSON.stringify(e({
        callbackId: a
      }, t)))
    }))
  },
  WXReportShareBehavior: function(e, r) {
    if (!d[e]) return "{}";
    if (void 0 === d[e].reportShareBehavior) return "{}";
    var t = (0, n.formatJsonStr)(r);
    return JSON.stringify(d[e].reportShareBehavior(t))
  }
};