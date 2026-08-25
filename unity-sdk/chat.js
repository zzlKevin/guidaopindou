Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0, require("../@babel/runtime/helpers/Objectvalues");
var e, a, n, o, t = (e = require("./module-helper")) && e.__esModule ? e : {
    default: e
  },
  i = require("./utils");
exports.default = {
  WXChatCreate: function(e) {
    var t = (0, i.formatJsonStr)(e);
    return function(e, t) {
      try {
        if ("undefined" != typeof requirePlugin) return a || (a = requirePlugin("MiniGameChat", {
          enableRequireHostModule: !0,
          customEnv: {
            wx: wx
          }
        }).default), n ? "" : void 0 === (n = new a(e)) || void 0 === n.on ? (console.error("MiniGameChat create error"), "") : (n.on("ready", (function() {
          GameGlobal.miniGameChat || (GameGlobal.miniGameChat = n, o || (o = {}), Object.keys(o).forEach((function(e) {
            o || (o = {}), Object.values(o[e]).forEach((function(a) {
              n.on(e, a)
            }))
          })), n.emit("ready"), t(n))
        })), n.on("error", (function(e) {
          console.log("插件初始化失败", e)
        })), (0, i.uid)())
      } catch (e) {
        return console.error(e), ""
      }
    }({
      x: t.x,
      y: t.y,
      autoShow: !1,
      logoUrl: t.logoUrl || "",
      movable: t.movable,
      enableSnap: t.enableSnap,
      scale: t.scale
    }, (function(e) {
      e.on("error", (function(e) {
        console.error("error", e)
      }))
    }))
  },
  WXChatHide: function() {
    GameGlobal.miniGameChat && GameGlobal.miniGameChat.hide()
  },
  WXChatShow: function(e) {
    if (GameGlobal.miniGameChat) {
      var a = (0, i.formatJsonStr)(e);
      GameGlobal.miniGameChat.show({
        x: a.x,
        y: a.y
      })
    }
  },
  WXChatClose: function() {
    GameGlobal.miniGameChat && GameGlobal.miniGameChat.close()
  },
  WXChatOpen: function(e) {
    GameGlobal.miniGameChat && GameGlobal.miniGameChat.open(e || "")
  },
  WXChatSetTabs: function(e) {
    if (GameGlobal.miniGameChat) {
      e || (e = "[]");
      var a = JSON.parse(e);
      GameGlobal.miniGameChat.setTabs(a)
    }
  },
  WXChatOff: function(e) {
    var a = GameGlobal.miniGameChat;
    if (a && a && void 0 !== o && void 0 !== o[e]) {
      for (var n in Object.keys(o[e])) {
        var t = o[e][n];
        t && a.off(e, t)
      }
      o[e] = {}
    }
  },
  WXChatOn: function(e) {
    var a = (0, i.uid)(),
      n = function(a) {
        var n = "";
        a && (n = JSON.stringify(a));
        var o = JSON.stringify({
          eventType: e,
          result: n
        });
        t.default.send("OnWXChatCallback", o)
      };
    if (o || (o = {}), void 0 === o[e] && (o[e] = {}), o[e]) {
      o[e][a] = n;
      var r = GameGlobal.miniGameChat;
      return r && r.on(e, n), a
    }
    return ""
  },
  WXChatSetSignature: function(e) {
    var a = GameGlobal.miniGameChat;
    a && a.setChatSignature({
      signature: e
    })
  }
};