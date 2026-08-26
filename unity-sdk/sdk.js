Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0, require("../@babel/runtime/helpers/Arrayincludes");
var n, t = require("../@babel/runtime/helpers/objectSpread2"),
  e = (n = require("./module-helper")) && n.__esModule ? n : {
    default: n
  },
  o = require("./utils");
var r, a, c, i, f, s = {},
  u = {},
  l = {};

function _(n, t) {
  u[n] || (u[n] = {});
  var e = u[n][t];
  return e || console.error("".concat(n, " 不存在:"), t), e
}

function d(n) {
  for (var t, e = arguments.length, o = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) o[r - 1] = arguments[r];
  (t = wx)[n.replace(/^\w/, (function(n) {
    return n.toLowerCase()
  }))].apply(t, o)
}
var y = ["getSystemSetting", "getAppAuthorizeSetting"];

function p(n) {
  for (var t, e = arguments.length, o = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) o[r - 1] = arguments[r];
  return (t = wx)[n.replace(/^\w/, (function(n) {
    return n.toLowerCase()
  }))].apply(t, o)
}

function v(n, t, e) {
  var o = _(n, e);
  if (o) {
    for (var r = arguments.length, a = new Array(r > 3 ? r - 3 : 0), c = 3; c < r; c++) a[c - 3] = arguments[c];
    o[t.replace(/^\w/, (function(n) {
      return n.toLowerCase()
    }))].apply(o, a)
  }
}

function S(n, t, r, a, c, i) {
  (0, o.formatResponse)(c, i), e.default.send(r, function(n, t, e, o) {
    return JSON.stringify({
      id: n,
      callbackId: t,
      type: e,
      res: JSON.stringify(o) || ""
    })
  }(n, t, a, i))
}
exports.default = {
  WX_OneWayFunction: function(n, r, a, c, i, f) {
    var s = n.replace(/^\w/, (function(n) {
        return n.toLowerCase()
      })),
      u = (0, o.formatJsonStr)(i);
      //--------------------------------------------
      //这是原版：
      "login" === s ? u.timeout || delete u.timeout : "reportScene" === s 
    && GameGlobal.manager && GameGlobal.manager.setGameStage &&
     GameGlobal.manager.setGameStage(u.sceneId), wx[s](t(t({}, u), {}, {
      success: function(t) {
        (0, o.formatResponse)(r, t), e.default.send("".concat(n, "Callback"), JSON.stringify({
          callbackId: f,
          type: "success",
          res: JSON.stringify(t)
        }))
      },
      fail: function(t) {
        (0, o.formatResponse)(a, t), e.default.send("".concat(n, "Callback"), JSON.stringify({
          callbackId: f,
          type: "fail",
          res: JSON.stringify(t)
        }))
      },
      complete: function(t) {
        (0, o.formatResponse)(c, t), e.default.send("".concat(n, "Callback"), JSON.stringify({
          callbackId: f,
          type: "complete",
          res: JSON.stringify(t)
        }))
      }
    }))
    //--------------------------------------------
      // if ("login" === s) {
      //   // 伪造登录成功，不再调用 wx.login
      //   var fakeRes = { code: "offline_fake_code", errMsg: "login:ok" };
      //   // 触发 success
      //   (0, o.formatResponse)(r, fakeRes);
      //   e.default.send("".concat(n, "Callback"), JSON.stringify({
      //     callbackId: f,
      //     type: "success",
      //     res: JSON.stringify(fakeRes)
      //   }));
      //   // 触发 complete
      //   (0, o.formatResponse)(c, fakeRes);
      //   e.default.send("".concat(n, "Callback"), JSON.stringify({
      //     callbackId: f,
      //     type: "complete",
      //     res: JSON.stringify(fakeRes)
      //   }));
      // } else {
      //   // 其他 API 保持原逻辑
      //   wx[s](t(t({}, u), {}, {
      //     success: function(t) {
      //       (0, o.formatResponse)(r, t), e.default.send("".concat(n, "Callback"), JSON.stringify({
      //         callbackId: f,
      //         type: "success",
      //         res: JSON.stringify(t)
      //       }))
      //     },
      //     fail: function(t) {
      //       (0, o.formatResponse)(a, t), e.default.send("".concat(n, "Callback"), JSON.stringify({
      //         callbackId: f,
      //         type: "fail",
      //         res: JSON.stringify(t)
      //       }))
      //     },
      //     complete: function(t) {
      //       (0, o.formatResponse)(c, t), e.default.send("".concat(n, "Callback"), JSON.stringify({
      //         callbackId: f,
      //         type: "complete",
      //         res: JSON.stringify(t)
      //       }))
      //     }
      //   }));
      // }
  },
  WX_OneWayNoFunction_v: function(n) {
    d(n)
  },
  WX_OneWayNoFunction_vs: function(n, t) {
    d(n, t)
  },
  WX_OneWayNoFunction_vt: function(n, t) {
    d(n, (0, o.formatJsonStr)(t))
  },
  WX_OneWayNoFunction_vst: function(n, t, e) {
    d(n, t, (0, o.formatJsonStr)(e))
  },
  WX_OneWayNoFunction_vsn: function(n, t, e) {
    d(n, t, e)
  },
  WX_OneWayNoFunction_vnns: function(n, t, e, o) {
    d(n, t, e, o)
  },
  WX_OnEventRegister: function(n, t) {
    s[n] || (s[n] = []);
    var r = function(r) {
      (0, o.formatResponse)(t, r);
      var a = (0, o.stringifyRes)(r);
      e.default.send("_".concat(n, "Callback"), a)
    };
    s[n].push(r), wx[n.replace(/^\w/, (function(n) {
      return n.toLowerCase()
    }))](r)
  },
  WX_OffEventRegister: function(n) {
    (s[n] || []).forEach((function(t) {
      wx[n.replace(/^On/, "off")](t)
    }))
  },
  WX_OnAddToFavorites: function() {
    wx.onAddToFavorites((function(n) {
      var t = (0, o.stringifyRes)(n);
      return e.default.send("_OnAddToFavoritesCallback", t), r
    }))
  },
  WX_OnAddToFavorites_Resolve: function(n) {
    try {
      return void(r = (0, o.formatJsonStr)(n))
    } catch (n) {}
    r = {}
  },
  WX_OffAddToFavorites: function() {
    wx.offAddToFavorites()
  },
  WX_OnCopyUrl: function() {
    wx.onCopyUrl((function(n) {
      var t = (0, o.stringifyRes)(n);
      return e.default.send("_OnCopyUrlCallback", t), a
    }))
  },
  WX_OnCopyUrl_Resolve: function(n) {
    try {
      return void(a = (0, o.formatJsonStr)(n))
    } catch (n) {}
    a = {}
  },
  WX_OffCopyUrl: function() {
    wx.offCopyUrl()
  },
  WX_OnHandoff: function() {
    wx.onHandoff((function(n) {
      var t = (0, o.stringifyRes)(n);
      return e.default.send("_OnHandoffCallback", t), c
    }))
  },
  WX_OnHandoff_Resolve: function(n) {
    try {
      return void(c = (0, o.formatJsonStr)(n))
    } catch (n) {}
    c = {}
  },
  WX_OffHandoff: function() {
    wx.offHandoff()
  },
  WX_OnShareTimeline: function() {
    wx.onShareTimeline((function(n) {
      var t = (0, o.stringifyRes)(n);
      return e.default.send("_OnShareTimelineCallback", t), i
    }))
  },
  WX_OnShareTimeline_Resolve: function(n) {
    try {
      return void(i = (0, o.formatJsonStr)(n))
    } catch (n) {}
    i = {}
  },
  WX_OffShareTimeline: function() {
    wx.offShareTimeline()
  },
  WX_OnGameLiveStateChange: function() {
    wx.onGameLiveStateChange((function(n) {
      (0, o.formatResponse)("OnGameLiveStateChangeCallbackResult", n);
      var t = (0, o.stringifyRes)(n);
      return e.default.send("_OnGameLiveStateChangeCallback", t), f
    }))
  },
  WX_OnGameLiveStateChange_Resolve: function(n) {
    try {
      return void(f = (0, o.formatJsonStr)(n))
    } catch (n) {}
    f = {}
  },
  WX_OffGameLiveStateChange: function() {
    wx.offGameLiveStateChange()
  },
  WX_SyncFunction_bs: function(n, t) {
    return p(n, t)
  },
  WX_SyncFunction_t: function(n, t) {
    var e = p(n);
    return y.includes(n.replace(/^\w/, (function(n) {
      return n.toLowerCase()
    }))) ? ((0, o.formatResponse)(t, JSON.parse(JSON.stringify(e))), JSON.stringify(e)) : ((0, o.formatResponse)(t, e), JSON.stringify(e))
  },
  WX_SyncFunction_tt: function(n, t, e) {
    var r = p(n, (0, o.formatJsonStr)(e));
    return (0, o.formatResponse)(t, r), JSON.stringify(r)
  },
  WX_SyncFunction_b: function(n) {
    return p(n)
  },
  WX_SyncFunction_bsnn: function(n, t, e, o) {
    return p(n, t, e, o)
  },
  WX_SyncFunction_bt: function(n, t) {
    return p(n, (0, o.formatJsonStr)(t))
  },
  WX_SyncFunction_nt: function(n, t) {
    return p(n, (0, o.formatJsonStr)(t))
  },
  WX_SyncFunction_ss: function(n, t) {
    return p(n, t)
  },
  WX_SyncFunction_tnn: function(n, t, e, r) {
    var a = p(n, e, r);
    return (0, o.formatResponse)(t, a), JSON.stringify(a)
  },
  WX_ClassConstructor: function(n, r, a, c, i, f) {
    var s = (0, o.formatJsonStr)(f),
      l = (0, o.uid)(),
      _ = wx[n.replace(/^\w/, (function(n) {
        return n.toLowerCase()
      }))](t(t({}, s), {}, {
        success: function(t) {
          (0, o.formatResponse)(a, t), e.default.send("".concat(n, "Callback"), JSON.stringify({
            callbackId: l,
            type: "success",
            res: JSON.stringify(t)
          }))
        },
        fail: function(t) {
          (0, o.formatResponse)(c, t), e.default.send("".concat(n, "Callback"), JSON.stringify({
            callbackId: l,
            type: "fail",
            res: JSON.stringify(t)
          }))
        },
        complete: function(t) {
          (0, o.formatResponse)(i, t), e.default.send("".concat(n, "Callback"), JSON.stringify({
            callbackId: l,
            type: "complete",
            res: JSON.stringify(t)
          }))
        }
      }));
    return u[r] || (u[r] = {}), u[r][l] = _, l
  },
  WX_ClassFunction: function(n, t, e) {
    var r = wx[n.replace(/^\w/, (function(n) {
        return n.toLowerCase()
      }))]((0, o.formatJsonStr)(e)),
      a = (0, o.uid)();
    return u[t] || (u[t] = {}), u[t][a] = r, a
  },
  WX_ClassSetProperty: function(n, t, e, o) {
    var r = _(n, t);
    if (r)
      if (/^\s*(\{.*\}|\[.*\])\s*$/.test(o)) try {
        var a = JSON.parse(o);
        Object.assign(r[e], a)
      } catch (n) {
        r[e] = o
      } else r[e] = o
  },
  WX_ClassOnEventFunction: function(n, t, r, a, c) {
    var i = _(n, a);
    if (i) {
      l[n + t] || (l[n + t] = {});
      var f = function(i) {
        "string" !== r && (0, o.formatResponse)(r, i), c || (c = "");
        var f = JSON.stringify({
          callbackId: a + c,
          res: JSON.stringify(i)
        });
        e.default.send("_".concat(n).concat(t, "Callback"), f)
      };
      l[n + t][a + c] || (l[n + t][a + c] = []), l[n + t][a + c].push(f), "WXVideoDecoder" === n ? i[t.replace(/^\w/, (function(n) {
        return n.toLowerCase()
      }))](c, f) : i[t.replace(/^\w/, (function(n) {
        return n.toLowerCase()
      }))](f)
    }
  },
  WX_ClassOffEventFunction: function(n, t, e, o) {
    var r = _(n, e);
    r && (o || (o = ""), t = t.replace(/Off/, "On"), l[n + t][e + o] && (l[n + t][e + o].forEach((function(e) {
      "WXVideoDecoder" === n ? r[t.replace(/^\w/, (function(n) {
        return n.toLowerCase()
      }))](o, e) : r[t.replace(/^\w/, (function(n) {
        return n.toLowerCase()
      }))](e)
    })), delete l[n + t][e + o]))
  },
  WX_ClassOneWayNoFunction_v: function(n, t, e) {
    v(n, t, e)
  },
  WX_ClassOneWayNoFunction_vs: function(n, t, e, o) {
    v(n, t, e, o)
  },
  WX_ClassOneWayNoFunction_t: function(n, t, e, r) {
    var a = _(n, r);
    if (!a) return JSON.stringify((0, o.formatResponse)(e));
    var c = a[t.replace(/^\w/, (function(n) {
      return n.toLowerCase()
    }))]();
    return JSON.stringify((0, o.formatResponse)(e, c, r))
  },
  WX_ClassOneWayNoFunction_vt: function(n, t, e, r) {
    v(n, t, e, (0, o.formatJsonStr)(r))
  },
  WX_ClassOneWayNoFunction_vn: function(n, t, e, o) {
    v(n, t, e, o)
  },
  WX_ClassOneWayFunction: function(n, e, r, a, c, i, f, s) {
    var u = arguments.length > 8 && void 0 !== arguments[8] && arguments[8],
      l = _(n, r);
    if (l) {
      var d = e.replace(/^\w/, (function(n) {
          return n.toLowerCase()
        })),
        y = (0, o.formatJsonStr)(f);
      u ? l[d](t({}, y)).then((function(t) {
        S(r, s, "_".concat(n).concat(e, "Callback"), "success", a, t)
      })).catch((function(t) {
        S(r, s, "_".concat(n).concat(e, "Callback"), "fail", c, t)
      })).finally((function(t) {
        S(r, s, "_".concat(n).concat(e, "Callback"), "complete", i, t)
      })) : l[d](t(t({}, y), {}, {
        success: function(t) {
          S(r, s, "_".concat(n).concat(e, "Callback"), "success", a, t)
        },
        fail: function(t) {
          S(r, s, "_".concat(n).concat(e, "Callback"), "fail", c, t)
        },
        complete: function(t) {
          S(r, s, "_".concat(n).concat(e, "Callback"), "complete", i, t)
        }
      }))
    }
  }
};