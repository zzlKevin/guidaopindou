Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, n = require("../@babel/runtime/helpers/regeneratorRuntime"),
  a = require("../@babel/runtime/helpers/asyncToGenerator"),
  t = (e = require("./module-helper")) && e.__esModule ? e : {
    default: e
  };
var o = null,
  s = null;
exports.default = {
  GetJsonValue: function(e) {
    if (null == s) {
      var n = wx.getFileSystemManager().readFileSync("GameConfig.json", "utf8", 0);
      s = JSON.parse(n)
    }
    return null == s || null == s[e] ? "" : s[e]
  },
  GetABValue: function(e) {
    var n = wx.getExptInfoSync([e]);
    return void 0 === n[e] ? (console.log("GetABValue undefined 0"), "0") : (console.log("GetABValue: " + n[e]), n[e])
  },
  WXGetGameExptInfo: function() {
    void 0 !== wx.getGameExptInfo ? wx.getGameExptInfo({
      keyList: [],
      success: function(e) {
        if (null != e.list && 0 != e.list.length) {
          var n = JSON.stringify(e.list);
          console.log("WXGetGameExptInfo wx.getGameExptInfo success list:", n), t.default.send("OnWXGetGameExptInfoCallback", n)
        } else console.log("WXGetGameExptInfo wx.getGameExptInfo success, list is empty")
      }
    }) : console.log("WXGetGameExptInfo wx.getGameExptInfo is not supported in this environment.")
  },
  CreateFeedBackButton: function(e, n, a, t, s) {
    console.log("call CreateFeedBackButton "), null == o ? o = wx.createFeedbackButton({
      type: "text",
      text: s ? "FeedBack" : "",
      style: {
        left: a,
        top: t,
        width: e,
        height: n,
        lineHeight: 40,
        backgroundColor: s ? "#000000" : "",
        color: "#ffffff",
        textAlign: "center",
        fontSize: 16,
        borderRadius: 4
      }
    }) : (o.style.left = a, o.style.top = t, o.style.width = e, o.style.height = n, o.style.backgroundColor = s ? "#000000" : ""), o.show()
  },
  HideFeedBackButton: function() {
    null != o && o.hide()
  },
  CheckIsAddedToMyMiniProgram: function(e) {
    console.log("CheckIsAddedToMyMiniProgram"), wx.checkIsAddedToMyMiniProgram ? wx.checkIsAddedToMyMiniProgram && wx.checkIsAddedToMyMiniProgram({
      success: function(n) {
        console.log("CheckIsAddedToMyMiniProgram res.added:" + n.added), t.default.send("OnCheckIsAddedToMyMiniProgram", JSON.stringify({
          id: e,
          code: 0,
          added: n.added
        }))
      },
      fail: function(n) {
        console.log("CheckIsAddedToMyMiniProgram Failure"), t.default.send("OnCheckIsAddedToMyMiniProgram", JSON.stringify({
          id: e,
          code: 0,
          added: !1
        }))
      }
    }) : t.default.send("OnCheckIsAddedToMyMiniProgram", JSON.stringify({
      id: e,
      code: -1,
      added: !1
    }))
  },
  RequireOpenPrivacyAuthorize: function() {
    wx.requirePrivacyAuthorize && wx.requirePrivacyAuthorize({
      success: function(e) {
        t.default.send("OnRequirePrivacyAuthorizeCallback", JSON.stringify({
          success: 1,
          errMsg: e.errMsg
        }))
      },
      fail: function(e) {
        t.default.send("OnRequirePrivacyAuthorizeCallback", JSON.stringify({
          success: 0,
          errMsg: e.errMsg
        }))
      },
      complete: function() {}
    })
  },
  GetPrivacySetting: function() {
    wx.getPrivacySetting({
      success: function(e) {
        var n = 0;
        e.needAuthorization && (n = 1), t.default.send("OnGetPrivacySettingCallback", JSON.stringify({
          code: n,
          privacyContractName: e.privacyContractName
        }))
      },
      fail: function() {
        t.default.send("OnGetPrivacySettingCallback", JSON.stringify({
          code: -1
        }))
      },
      complete: function() {}
    })
  },
  OnNeedPrivacyAuthorization: function(e) {
    var n = "exposureAuthorization";
    2 == e ? n = "agree" : 3 == e && (n = "disagree"), console.log("微信隐私 上报隐私行为：" + n), wx.onNeedPrivacyAuthorization && wx.onNeedPrivacyAuthorization((function(e) {
      e({
        event: n
      })
    }))
  },
  OpenPrivacyContract: function() {
    wx.openPrivacyContract && wx.openPrivacyContract({
      success: function() {},
      fail: function() {},
      complete: function() {}
    })
  },
  SubGameUpdate: function() {
    wx.requestSubscribeSystemMessage({
      msgTypeList: ["SYS_MSG_TYPE_WHATS_NEW"],
      success: function(e) {
        console.log(e);
        var n = "accept" == e.SYS_MSG_TYPE_WHATS_NEW ? "1" : "0";
        t.default.send("RequestSubscribeSystemMessageCallBack", n)
      },
      fail: function(e) {
        console.error(e), t.default.send("RequestSubscribeSystemMessageCallBack", "0")
      }
    })
  },
  GetSubGameUpdateStatus: function() {
    wx.getSetting({
      withSubscriptions: !0,
      success: function(e) {
        var n = "accept" == e.subscriptionsSetting.SYS_MSG_TYPE_WHATS_NEW ? "1" : "0";
        t.default.send("GetSubGameUpdateStatusCallBack", n)
      },
      fail: function(e) {
        t.default.send("GetSubGameUpdateStatusCallBack", "0")
      }
    })
  },
  RequestSubscribe: function(e) {
    wx.requestSubscribeMessage({
      tmplIds: [e],
      success: function(e) {
        console.log(e), t.default.send("RequestSubscribeCallBack", JSON.stringify(e))
      },
      fail: function(e) {
        console.log(e), t.default.send("RequestSubscribeCallBack", JSON.stringify(e))
      }
    })
  },
  RequestSubscribeMulti: function(e) {
    wx.requestSubscribeMessage({
      tmplIds: e,
      success: function(e) {
        console.log(e), t.default.send("RequestSubscribeCallBack", JSON.stringify(e))
      },
      fail: function(e) {
        console.log(e), t.default.send("RequestSubscribeCallBack", JSON.stringify(e))
      }
    })
  },
  GetAuthorizeSetting: function(e) {
    e = 1 == e, wx.getSetting({
      withSubscriptions: e,
      success: function(e) {
        console.log(e), null != e.authSetting ? (null != e.subscriptionsSetting && (e.authSetting.subscriptionsSetting = e.subscriptionsSetting), t.default.send("GetAuthorizeSettingCallBack", JSON.stringify(e.authSetting))) : t.default.send("GetAuthorizeSettingCallBack", "")
      },
      fail: function(e) {
        console.log("GetAuthorizeSetting fail"), t.default.send("GetAuthorizeSettingCallBack", "")
      }
    })
  },
  GetWXDATA_CDN: function() {
    return GameGlobal.managerConfig.DATA_CDN
  },
  GetOrCreatePageManager: function(e, n) {
    if (!window.wx.createPageManager) return console.log("当前基础库版本暂不支持。"), null;
    if (window.PageManagerHashs = window.PageManagerHashs || {}, null != window.PageManagerHashs[e] && "destroy" != window.PageManagerHashs[e].stage) return window.PageManagerHashs[e];
    var a = window.wx.createPageManager();
    return window.PageManagerHashs[e] = a, window.PageManagerHashs[e].stage = "init", window.PageManagerHashs[e].waitReady = !1, a.on("show", (function(n) {
      null != window.PageManagerHashs && null != window.PageManagerHashs[e] && (window.PageManagerHashs[e].waitReady = !1, window.PageManagerHashs[e].stage = "show"), console.log("page manager show,tag:" + e + ",res:" + JSON.stringify(n))
    })), a.on("error", (function(n) {
      null != window.PageManagerHashs && null != window.PageManagerHashs[e] && (window.PageManagerHashs[e].waitReady = !1), console.error("page manager error,tag:" + e + ",res:" + JSON.stringify(n))
    })), a.on("destroy", (function(n) {
      console.log("page manager destroy,remove tag:" + e + ",res:" + JSON.stringify(n)), null != window.PageManagerHashs && null != window.PageManagerHashs[e] && (window.PageManagerHashs[e].waitReady = !1, window.PageManagerHashs[e] = null)
    })), null != n && "function" == typeof n && 1 == n.length && n(a), a
  },
  DestroyPageManager: function(e) {
    null != window.PageManagerHashs && null != window.PageManagerHashs[e] && window.PageManagerHashs[e].destroy()
  },
  GetOrCreateRecommendPageManager: function() {
    return window.WXWASMSDK.GetOrCreatePageManager("recommend", (function(e) {
      e.on("destroy", (function(e) {
        var n = "0";
        null != e && null != e.isRecommended ? (console.log("recommend component close：", e.isRecommended), n = e.isRecommended ? "1" : "0") : (n = "-1", console.log("recommend component close：res is null")), t.default.send("OnDestroyRecommendCallback", n)
      }))
    }))
  },
  PreLoadPageManager: function(e, t) {
    return a(n().mark((function a() {
      var o, s;
      return n().wrap((function(n) {
        for (;;) switch (n.prev = n.next) {
          case 0:
            if ("init", o = "preloading", s = "ready", null != e && "init" == e.stage) {
              n.next = 5;
              break
            }
            return n.abrupt("return");
          case 5:
            return e.stage = o, n.next = 8, e.load(t);
          case 8:
            return e.stage = s, n.abrupt("return", e);
          case 10:
          case "end":
            return n.stop()
        }
      }), a)
    })))()
  },
  ShowPageManager: function(e, t) {
    return a(n().mark((function a() {
      var o, s, r, i;
      return n().wrap((function(n) {
        for (;;) switch (n.prev = n.next) {
          case 0:
            if (o = "init", s = "preloading", r = "ready", i = "show", "destroy", null != e && e.stage != i && "destroy" != e.stage && !e.waitReady) {
              n.next = 7;
              break
            }
            return n.abrupt("return");
          case 7:
            if (e.stage != o && e.stage != r) {
              n.next = 12;
              break
            }
            e.stage = i, e.show(t), n.next = 20;
            break;
          case 12:
            if (e.stage != s) {
              n.next = 20;
              break
            }
            e.waitReady = !0;
          case 14:
            if (e.stage == r || !e.waitReady) {
              n.next = 19;
              break
            }
            return n.next = 17, new Promise((function(e) {
              return setTimeout(e, 100)
            }));
          case 17:
            n.next = 14;
            break;
          case 19:
            e.waitReady && (e.stage = i, e.show(t));
          case 20:
          case "end":
            return n.stop()
        }
      }), a)
    })))()
  },
  ShowCPSPageManager: function(e, n, a, o, s) {
    window.WXWASMSDK.GetOrCreatePageManager(e, (function(e) {
      console.log("ShowCPSPageManager ", n, "left:", a, "top:", o, "vertical:", s), e.on("ready", (function() {
        console.log("ShowCPSPageManager ready ", n), t.default.send("OnReadyCPSPageManagerCallback", n)
      })), e.on("show", (function() {
        t.default.send("OnShowCPSPageManagerCallback", n)
      })), e.on("clickgame", (function(e) {
        e = null == e ? {} : e, t.default.send("OnClickGameCPSPageManagerCallback", JSON.stringify({
          id: n,
          targetGameName: e.targetGameName
        }))
      })), e.on("destroy", (function() {
        console.log("ShowCPSPageManager destroy ", n), t.default.send("OnDestroyGameCPSPageManagerCallback", n)
      })), e.on("error", (function(e) {
        console.log("ShowCPSPageManager error ", JSON.stringify(e)), t.default.send("OnErrorGameCPSPageManagerCallback", JSON.stringify(e))
      })), e.show({
        openlink: "wFFX1cDJnwJCet72QGUJJvBpa9z9lfAob-7EYHwzFENHJ_tNECj5LquvJqnbm82RktAcRyg7gORaUSh0yRSiuYF21JvF84j7-SgazajvTW-ScbwFiQccq8FWsrzHVPox1dr90HHv_CTrgRJD4HOdiRJFeLNRrDu0Pj3vsIGuonI",
        query: {
          id: n,
          left: a,
          top: o,
          isVertical: 1 == s
        }
      })
    }))
  },
  WXChallengeIsValid: function() {
    return null != wx.getRankManager
  },
  WXUpdateScore: function(e, n) {
    null != wx.getRankManager && wx.getRankManager().update({
      scoreKey: e,
      score: n,
      success: function(e) {
        console.log("分数上报成功", e), t.default.send("OnWXUpdateScoreCallback", JSON.stringify({
          code: 0
        }))
      },
      fail: function(e) {
        console.error("分数上报失败", e), t.default.send("OnWXUpdateScoreCallback", JSON.stringify({
          code: -1,
          errMsg: "failed"
        }))
      }
    })
  },
  WXCreateChallenge: function(e) {
    null != wx.getRankManager && wx.getRankManager().createChallenge({
      scoreKey: e,
      success: function(e) {
        console.log("擂台赛创建成功", e), t.default.send("OnWXCreateChallengeCallback", JSON.stringify({
          code: 0
        }))
      },
      fail: function(e) {
        console.error("擂台赛创建失败", e), t.default.send("OnWXCreateChallengeCallback", JSON.stringify({
          code: -1,
          errMsg: "failed"
        }))
      }
    })
  },
  WXEndChallenge: function(e, n) {
    null != wx.getRankManager && wx.getRankManager().update({
      scoreKey: e,
      score: n,
      success: function(e) {
        console.log("擂台赛结束", e), t.default.send("OnWXEndChallengeCallback", JSON.stringify({
          code: 0
        }))
      },
      fail: function(e) {
        console.error("擂台赛结束异常", e), t.default.send("OnWXEndChallengeCallback", JSON.stringify({
          code: -1,
          errMsg: "failed"
        }))
      }
    })
  },
  WXOnChallengeStart: function() {
    null != wx.getRankManager && wx.getRankManager().onChallengeStart((function(e) {
      console.log("擂台赛开始", e.scoreKey), t.default.send("OnWXOnChallengeStartCallback", JSON.stringify({
        code: 0,
        scoreKey: e.scoreKey
      }))
    }))
  },
  WXChallengeMiddleUpdate: function(e, n) {
    null != wx.getRankManager && wx.getRankManager().middleUpdate({
      scoreKey: e,
      score: n,
      success: function() {
        console.log("分数更新成功"), t.default.send("OnWXChallengeMiddleUpdateCallback", JSON.stringify({
          code: 0
        }))
      },
      fail: function(e) {
        console.error("分数更新失败", e), t.default.send("OnWXChallengeMiddleUpdateCallback", JSON.stringify({
          code: -1,
          errMsg: "failed"
        }))
      }
    })
  },
  WXQuitChallenge: function() {
    null != wx.getRankManager && wx.getRankManager().abort({
      success: function(e) {
        console.log("擂台赛退出成功", e), t.default.send("OnWXQuitChallengeCallback", JSON.stringify({
          code: 0
        }))
      },
      fail: function(e) {
        console.error("擂台赛退出失败", e), t.default.send("OnWXQuitChallengeCallback", JSON.stringify({
          code: -1,
          errMsg: "failed"
        }))
      }
    })
  },
  WXGetDirectAdStatus: function() {
    if (null != wx.getDirectAdStatusSync) {
      var e = wx.getLaunchOptionsSync();
      if (e) {
        var n = !1;
        if ((1387 === e.scene || null != e.query && "true" === e.query.minigame_direct_debug) && (n = !0), n) {
          var a = wx.getDirectAdStatusSync();
          console.log("WX_FeedPlay js Status 当前是否在蒙层阶段:" + a.isInMask), console.log("WX_FeedPlay js Status当前是否在直玩广告中:" + a.isInDirectGameAd), t.default.send("OnWXOnDirectAdStatusChangeCallback", JSON.stringify({
            isInMask: a.isInMask,
            isInDirectGameAd: a.isInDirectGameAd
          }))
        }
      }
    } else console.log("WX_FeedPlay WXGetDirectAdStatus,undefined")
  },
  WXOnDirectAdStatusChange: function() {
    if (null != wx.onDirectAdStatusChange) {
      var e = wx.getLaunchOptionsSync();
      if (e) {
        var n = !1;
        (1387 === e.scene || null != e.query && "true" === e.query.minigame_direct_debug) && (n = !0), n && wx.onDirectAdStatusChange((function(e) {
          console.log("WX_FeedPlay js Status 当前是否在蒙层阶段:" + e.isInMask), console.log("WX_FeedPlay js Status当前是否在直玩广告中:" + e.isInDirectGameAd), console.log("WX_FeedPlay js Status当前是否由于异常流程而结束:" + e.isEndByAbnormal), t.default.send("OnWXOnDirectAdStatusChangeCallback", JSON.stringify({
            isInMask: e.isInMask,
            isInDirectGameAd: e.isInDirectGameAd,
            isEndByAbnormal: e.isEndByAbnormal
          }))
        }))
      }
    } else console.log("WX_FeedPlay WXOnDirectAdStatusChange,undefined")
  },
  WXCheckIsSupportMidasPayment: function() {
    wx.checkIsSupportMidasPayment ? wx.checkIsSupportMidasPayment({
      success: function(e) {
        console.log("支持检查结果:", e);
        var n = e.data && e.data.allow_pay;
        n ? console.log("当前环境支持支付") : console.log("当前环境不支持支付"), t.default.send("OnWXCheckIsSupportMidasPaymentCallback", JSON.stringify({
          code: 0,
          support: !!n
        }))
      },
      fail: function(e) {
        console.error("检查支持情况失败", e), t.default.send("OnWXCheckIsSupportMidasPaymentCallback", JSON.stringify({
          code: -1,
          errMsg: e && e.errMsg ? e.errMsg : "failed"
        }))
      },
      complete: function() {
        console.log("检查完成")
      }
    }) : t.default.send("OnWXCheckIsSupportMidasPaymentCallback", JSON.stringify({
      code: -1,
      errMsg: "API not available"
    }))
  }
};