var e = require("../../../openContext/@babel/runtime/helpers/typeof");
window.__require = function e(t, n, o) {
  function i(r, c) {
    if (!n[r]) {
      if (!t[r]) {
        var l = r.split("/");
        if (l = l[l.length - 1], !t[l]) {
          var s = "function" == typeof __require && __require;
          if (!c && s) return s(l, !0);
          if (a) return a(l, !0);
          throw new Error("Cannot find module '" + r + "'")
        }
        r = l
      }
      var p = n[r] = {
        exports: {}
      };
      t[r][0].call(p.exports, (function(e) {
        return i(t[r][1][e] || e)
      }), p, p.exports, e, t, n, o)
    }
    return n[r].exports
  }
  for (var a = "function" == typeof __require && __require, r = 0; r < o.length; r++) i(o[r]);
  return i
}({
  EventMgr: [function(e, t, n) {
    cc._RF.push(t, "5dbb4Shks5PYqvfDXIUvG+s", "EventMgr"), Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var o = function() {
      function e() {}
      return e.emitEvent_csryw = function(e, t, n, o, i, a) {
        this.eventTarget_csryw.emit(e + "", t, n, o, i, a)
      }, e.onEvent_csryw = function(e, t, n) {
        this.eventTarget_csryw.on(e + "", t, n)
      }, e.onceEvent_csryw = function(e, t, n) {
        this.eventTarget_csryw.once(e + "", t, n)
      }, e.offEvent_csryw = function(e, t, n) {
        this.eventTarget_csryw.off(e + "", t, n)
      }, e.offTargetEvent_csryw = function(e) {
        this.eventTarget_csryw.targetOff(e)
      }, e.eventTarget_csryw = new cc.EventTarget, e
    }();
    n.default = o, cc._RF.pop()
  }, {}],
  RankMain: [function(t, n, o) {
    cc._RF.push(n, "68df55MZlVOfqnnrkpTgpga", "RankMain");
    var i, a = this && this.__extends || (i = function(e, t) {
        return (i = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function(e, t) {
            e.__proto__ = t
          } || function(e, t) {
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
          })(e, t)
      }, function(e, t) {
        function n() {
          this.constructor = e
        }
        i(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
      }),
      r = this && this.__decorate || function(t, n, o, i) {
        var a, r = arguments.length,
          c = r < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, o) : i;
        if ("object" == ("undefined" == typeof Reflect ? "undefined" : e(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, n, o, i);
        else
          for (var l = t.length - 1; l >= 0; l--)(a = t[l]) && (c = (r < 3 ? a(c) : r > 3 ? a(n, o, c) : a(n, o)) || c);
        return r > 3 && c && Object.defineProperty(n, o, c), c
      };
    Object.defineProperty(o, "__esModule", {
      value: !0
    });
    var c = cc._decorator,
      l = c.ccclass,
      s = c.property,
      p = function(e) {
        function t() {
          var t = null !== e && e.apply(this, arguments) || this;
          return t.labelOneName = null, t.labelOneScore = null, t.labelSelfRank = null, t.labelSelfName = null, t.labelSelfScore = null, t.selfOpenId = null, t
        }
        return a(t, e), t.prototype.onLoad = function() {}, t.prototype.start = function() {}, t.prototype.update = function() {}, t.prototype.showRank = function(e) {
          this.selfOpenId = e, cc.sys.platform == cc.sys.WECHAT_GAME_SUB ? this.getWxRankData() : cc.sys.platform == cc.sys.BYTEDANCE_GAME_SUB && this.getDyRankData()
        }, t.prototype.getWxRankData = function() {
          var e = this;
          window.wx.getFriendCloudStorage({
            keyList: ["score"],
            success: function(t) {
              console.log(t), console.log("############获取微信排行榜 调用成功##############222");
              for (var n = [], o = t.data, i = 0; i < o.length; i++) o[i].KVDataList.length > 0 && n.push({
                name: o[i].nickname,
                head: o[i].avatarUrl || "",
                score: Number(o[i].KVDataList[0].value),
                openid: o[i].openid
              });
              n.sort((function(e, t) {
                return t.score - e.score
              })), e.initRank(n)
            },
            fail: function(e) {
              console.log(e), console.log("#################获取微信排行榜失败#################")
            }
          })
        }, t.prototype.getDyRankData = function() {
          var e = this;
          window.wx.getImRankData({
            dataType: 0,
            relationType: "friend",
            rankType: "day",
            pageNum: 1,
            pageSize: 50,
            zoneId: "test",
            success: function(t) {
              console.log(t), console.log("############获取抖音排行榜 调用成功##############");
              for (var n = [], o = t.data.items, i = 0; i < o.length; i++) n.push({
                name: o[i].nick_name,
                head: o[i].user_img || "",
                score: Number(o[i].value),
                openid: o[i].openid
              });
              n.sort((function(e, t) {
                return t.score - e.score
              })), e.initRank(n)
            },
            fail: function(e) {
              console.log(e), console.log("#################获取抖音排行榜失败#################")
            }
          })
        }, t.prototype.initRank = function(e) {
          for (var t = 0; t < e.length; t++) e[t].openid == this.selfOpenId ? (this.labelSelfRank.string = t + 1 + "", this.labelSelfScore.string = "第" + e[t].score + "关", this.labelSelfName.string = e[t].name.substring(0, 2) + "...") : 0 == t && (this.labelOneName.string = e[t].name.substring(0, 2) + "...", this.labelOneScore.string = "第" + e[t].score + "关")
        }, r([s(cc.Label)], t.prototype, "labelOneName", void 0), r([s(cc.Label)], t.prototype, "labelOneScore", void 0), r([s(cc.Label)], t.prototype, "labelSelfRank", void 0), r([s(cc.Label)], t.prototype, "labelSelfName", void 0), r([s(cc.Label)], t.prototype, "labelSelfScore", void 0), r([l], t)
      }(cc.Component);
    o.default = p, cc._RF.pop()
  }, {}],
  RankView: [function(t, n, o) {
    cc._RF.push(n, "e1b90/rohdEk4SdmmEZANaD", "RankView");
    var i, a, r = this && this.__extends || (i = function(e, t) {
        return (i = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function(e, t) {
            e.__proto__ = t
          } || function(e, t) {
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
          })(e, t)
      }, function(e, t) {
        function n() {
          this.constructor = e
        }
        i(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
      }),
      c = this && this.__decorate || function(t, n, o, i) {
        var a, r = arguments.length,
          c = r < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, o) : i;
        if ("object" == ("undefined" == typeof Reflect ? "undefined" : e(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, n, o, i);
        else
          for (var l = t.length - 1; l >= 0; l--)(a = t[l]) && (c = (r < 3 ? a(c) : r > 3 ? a(n, o, c) : a(n, o)) || c);
        return r > 3 && c && Object.defineProperty(n, o, c), c
      };
    Object.defineProperty(o, "__esModule", {
        value: !0
      }), o.RankType = void 0,
      function(e) {
        e[e.Level = 1] = "Level", e[e.Win = 2] = "Win", e[e.Friend = 3] = "Friend", e[e.Country = 4] = "Country", e[e.Day = 5] = "Day", e[e.Week = 6] = "Week", e[e.All = 7] = "All"
      }(a = o.RankType || (o.RankType = {}));
    var l = cc._decorator,
      s = l.ccclass,
      p = l.property,
      d = function(e) {
        function t() {
          var t = null !== e && e.apply(this, arguments) || this;
          return t.nodeItem = null, t.nodeItemSelf = null, t.labelOne = null, t.labelTwo = null, t.labelThree = null, t.scrollView = null, t.openId = "", t.lastLevelData = [], t.lastWinData = [], t.rankList = [], t.curRank = a.Level, t.rankType = a.Friend, t.isResize = !1, t.deltaTime = 0, t.headList = {}, t
        }
        return r(t, e), t.prototype.onLoad = function() {
          this.nodeItem.active = !1, this.nodeItemSelf.active = !1, this.rankList.push(this.nodeItem);
          for (var e = 0; e < 49; e++) {
            var t = cc.instantiate(this.nodeItem);
            t.parent = this.scrollView.content, this.rankList.push(t)
          }
        }, t.prototype.start = function() {}, t.prototype.clear = function() {
          this.scrollView.node.active = !1
        }, t.prototype.updateHeight = function(e) {
          this.isResize || (this.node.y += e, this.nodeItemSelf.y -= e, this.isResize = !0)
        }, t.prototype.showRank = function(e) {
          void 0 === e && (e = !1), this.curRank = a.Level, e && (this.curRank = a.Win), this.rankType = a.Friend, this.nodeItemSelf.active = !1, this.getFriendData(e), this.clear()
        }, t.prototype.showAreaRank = function(e, t) {
          void 0 === t && (t = !1), this.curRank = a.Level, t && (this.curRank = a.Win), this.nodeItemSelf.active = !1;
          var n = e.data;
          n && this.initRank(n), e.selfData && this.initSelfRank(e.selfData, e.selfData.rank)
        }, t.prototype.getFriendData = function(e) {
          void 0 === e && (e = !1), this.deltaTime = 60;
          var t = this;
          window.wx.getFriendCloudStorage({
            keyList: [e ? "winScore" : "score"],
            success: function(n) {
              console.log(n), console.log("TTT############获取微信排行榜 调用成功##############111");
              for (var o = [], i = n.data, r = 0; r < i.length; r++)
                if (i[r].KVDataList.length > 0) {
                  var c = {
                    name: i[r].nickname,
                    head: i[r].avatarUrl || "",
                    score: Number(i[r].KVDataList[0].value),
                    openid: i[r].openid
                  };
                  o.push(c)
                } for (o.sort((function(e, t) {
                  return t.score - e.score
                })), e ? t.lastWinData = o : t.lastLevelData = o, r = 0; r < o.length; r++) - 1 != o[r].openid.indexOf(t.openId) && (console.warn("getFriendData i = ", r), t.initSelfRank(o[r], r + 1));
              t.rankType == a.Friend && t.curRank == (e ? a.Win : a.Level) && t.initRank(o)
            },
            fail: function(n) {
              if (console.log(n), console.log("#################获取微信排行榜失败#################"), t.rankType == a.Friend && t.curRank == (e ? a.Win : a.Level)) {
                var o = e ? t.lastWinData : t.lastLevelData;
                if (console.log(o), o) {
                  t.initRank(o);
                  for (var i = 0; i < o.length; i++) - 1 != o[i].openid.indexOf(t.openId) && t.initSelfRank(o[i], i + 1)
                }
              }
            }
          })
        }, t.prototype.initRank = function(e) {
          console.log(e), this.labelOne.string = "", this.labelTwo.string = "", this.labelThree.string = "", this.scrollView.node.active = !0;
          for (var t = 0; t < e.length; t++) {
            var n = void 0;
            t < this.rankList.length ? n = this.rankList[t] : ((n = cc.instantiate(this.nodeItem)).parent = this.scrollView.content, this.rankList.push(n)), n.active = !0;
            var o = e[t],
              i = n.getChildByName("labelName").getComponent(cc.Label);
            o.name && "" != o.name ? i.string = o.name : i.string = "玩家" + o.openid.substring(0, 8);
            var r = n.getChildByName("labelRank").getComponent(cc.Label),
              c = o.rank || t + 1;
            r.string = "" + c, n.getChildByName("labelScore").getComponent(cc.Label).string = "" + (o.score || 1);
            var l = n.getChildByName("imgHead").getComponent(cc.Sprite);
            l.originHead || (l.originHead = l.spriteFrame), "" != o.head ? this.loadHead(o.head, l, o.openid) : l.spriteFrame = l.originHead, 1 == c ? (n.getChildByName("imgBg1").active = !0, n.getChildByName("imgBg2").active = !1, n.getChildByName("imgBg3").active = !1, n.getChildByName("imgBg4").active = !1, this.labelOne.string = o.name) : 2 == c ? (n.getChildByName("imgBg1").active = !1, n.getChildByName("imgBg2").active = !0, n.getChildByName("imgBg3").active = !1, n.getChildByName("imgBg4").active = !1, this.labelTwo.string = o.name) : 3 == c ? (n.getChildByName("imgBg1").active = !1, n.getChildByName("imgBg2").active = !1, n.getChildByName("imgBg3").active = !0, n.getChildByName("imgBg4").active = !1, this.labelThree.string = o.name) : (n.getChildByName("imgBg1").active = !1, n.getChildByName("imgBg2").active = !1, n.getChildByName("imgBg3").active = !1, n.getChildByName("imgBg4").active = !0), console.warn("initRank ", this.curRank), this.curRank == a.Win ? n.getChildByName("label").getComponent(cc.Label).string = "连胜" : n.getChildByName("label").getComponent(cc.Label).string = "关卡"
          }
          for (t = e.length; t < this.rankList.length; t++) this.rankList[t].active = !1
        }, t.prototype.initSelfRank = function(e, t) {
          if (console.warn("initSelfRank   data = ", e, t), e) {
            this.nodeItemSelf.active = !0;
            var n = this.nodeItemSelf.getChildByName("labelName").getComponent(cc.Label);
            e.name && "" != e.name ? n.string = e.name : n.string = "玩家" + e.openid.substring(0, 8), this.nodeItemSelf.getChildByName("labelRank").getComponent(cc.Label).string = "" + (t || 0), this.nodeItemSelf.getChildByName("labelScore").getComponent(cc.Label).string = "" + (e.score || 1);
            var o = this.nodeItemSelf.getChildByName("imgHead").getComponent(cc.Sprite);
            "" != e.head ? this.loadHead(e.head, o, e.openid) : o.spriteFrame = o.originHead, this.curRank == a.Win ? this.nodeItemSelf.getChildByName("label").getComponent(cc.Label).string = "连胜" : this.nodeItemSelf.getChildByName("label").getComponent(cc.Label).string = "关卡"
          } else this.nodeItemSelf.active = !1
        }, t.prototype.loadHead = function(e, t, n) {
          var o = this;
          if (e && "" != e)
            if (this.headList[e] || this.headList[n]) {
              var i = void 0;
              this.headList[n] ? i = new cc.SpriteFrame(this.headList[n]) : this.headList[e] && (i = new cc.SpriteFrame(this.headList[e])), i && (t.spriteFrame = i)
            } else e && "" != e && cc.assetManager.loadRemote(e, {
              ext: ".png"
            }, (function(i, a) {
              if (!i) {
                var r = new cc.SpriteFrame(a);
                t.spriteFrame = r, a.addRef(), o.headList[e] = a, o.headList[n] = a
              }
            }))
        }, t.prototype.update = function(e) {
          this.deltaTime > 0 && (this.deltaTime -= e, this.deltaTime < 0 && (this.deltaTime = 0))
        }, c([p(cc.Node)], t.prototype, "nodeItem", void 0), c([p(cc.Node)], t.prototype, "nodeItemSelf", void 0), c([p(cc.Label)], t.prototype, "labelOne", void 0), c([p(cc.Label)], t.prototype, "labelTwo", void 0), c([p(cc.Label)], t.prototype, "labelThree", void 0), c([p(cc.ScrollView)], t.prototype, "scrollView", void 0), c([s], t)
      }(cc.Component);
    o.default = d, cc._RF.pop()
  }, {}],
  SubScene: [function(t, n, o) {
    cc._RF.push(n, "45637E/+B9GSI6B0ZFTADpr", "SubScene");
    var i, a = this && this.__extends || (i = function(e, t) {
        return (i = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function(e, t) {
            e.__proto__ = t
          } || function(e, t) {
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
          })(e, t)
      }, function(e, t) {
        function n() {
          this.constructor = e
        }
        i(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
      }),
      r = this && this.__decorate || function(t, n, o, i) {
        var a, r = arguments.length,
          c = r < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, o) : i;
        if ("object" == ("undefined" == typeof Reflect ? "undefined" : e(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, n, o, i);
        else
          for (var l = t.length - 1; l >= 0; l--)(a = t[l]) && (c = (r < 3 ? a(c) : r > 3 ? a(n, o, c) : a(n, o)) || c);
        return r > 3 && c && Object.defineProperty(n, o, c), c
      };
    Object.defineProperty(o, "__esModule", {
      value: !0
    });
    var c = t("./RankView"),
      l = cc._decorator,
      s = l.ccclass,
      p = l.property,
      d = function(e) {
        function t() {
          var t = null !== e && e.apply(this, arguments) || this;
          return t.nodeRank = null, t.canvas = null, t.openId = "", t
        }
        return a(t, e), t.prototype.onLoad = function() {}, t.prototype.start = function() {
          if (console.warn("<---初始化开放域TTT---\x3e"), cc.sys.platform == cc.sys.WECHAT_GAME_SUB) {
            var e = window.wx;
            if (e) {
              var t = this;
              e.onMessage((function(e) {
                t.onMessage(e)
              }))
            }
          }
        }, t.prototype.onMessage = function(e) {
          console.warn("onMessage---\x3e", e), "friendRank" == e.command ? ("" == this.nodeRank.openId && (this.nodeRank.openId = e.openId), this.showFriendRank(), this.nodeRank.updateHeight(.5 * (e.data - 1500))) : "friendWinRank" == e.command ? this.showFriendRank(!0) : "areaWinRank" == e.command ? this.showAreaRank(e.data, !0) : "areaRank" == e.command ? this.showAreaRank(e.data) : "clear" == e.command && this.nodeRank.clear()
        }, t.prototype.showFriendRank = function(e) {
          void 0 === e && (e = !1), this.nodeRank.showRank(e)
        }, t.prototype.showAreaRank = function(e, t) {
          void 0 === t && (t = !1), this.nodeRank.showAreaRank(e, t)
        }, t.prototype.showSelfRank = function() {}, r([p(c.default)], t.prototype, "nodeRank", void 0), r([p(cc.Canvas)], t.prototype, "canvas", void 0), r([s], t)
      }(cc.Component);
    o.default = d, cc._RF.pop()
  }, {
    "./RankView": "RankView"
  }]
}, {}, ["EventMgr", "RankMain", "RankView", "SubScene"]);