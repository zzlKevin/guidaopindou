Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, o = require("../utils"),
  n = {},
  t = {},
  a = {},
  f = {},
  c = {},
  i = {},
  r = (0, o.getListObject)(n, "TCPSocket");
exports.default = {
  WX_CreateTCPSocket: function() {
    var e = wx.createTCPSocket({
        type: "ipv4"
      }),
      t = (0, o.uid)();
    return n[t] = e, t
  },
  WX_TCPSocketBindWifi: function(e, n) {
    var t = r(e);
    t && t.bindWifi((0, o.formatJsonStr)(n))
  },
  WX_TCPSocketClose: function(e) {
    var o = r(e);
    o && (o.close(), delete n[e])
  },
  WX_TCPSocketConnect: function(e, n) {
    var t = r(e);
    t && t.connect((0, o.formatJsonStr)(n))
  },
  WX_TCPSocketWriteString: function(e, o) {
    var n = r(e);
    n && n.write(o)
  },
  WX_TCPSocketWriteBuffer: function(e, o, n) {
    var t = r(e);
    t && t.write(GameGlobal.Module.HEAPU8.buffer.slice(o, o + n))
  },
  WX_TCPSocketOffBindWifi: function(e) {
    var n = r(e);
    n && (0, o.offEventCallback)(t, (function(e) {
      n.offBindWifi(e)
    }), e)
  },
  WX_TCPSocketOffClose: function(e) {
    var n = r(e);
    n && (0, o.offEventCallback)(a, (function(e) {
      n.offClose(e)
    }), e)
  },
  WX_TCPSocketOffConnect: function(e) {
    var n = r(e);
    n && (0, o.offEventCallback)(f, (function(e) {
      n.offConnect(e)
    }), e)
  },
  WX_TCPSocketOffError: function(e) {
    var n = r(e);
    n && (0, o.offEventCallback)(c, (function(e) {
      n.offError(e)
    }), e)
  },
  WX_TCPSocketOffMessage: function(e) {
    var n = r(e);
    n && (0, o.offEventCallback)(i, (function(e) {
      n.offMessage(e)
    }), e)
  },
  WX_TCPSocketOnBindWifi: function(e) {
    var n = r(e);
    if (n) {
      var a = (0, o.onEventCallback)(t, "_TCPSocketOnBindWifiCallback", e, e);
      n.onBindWifi(a)
    }
  },
  WX_TCPSocketOnClose: function(e) {
    var n = r(e);
    if (n) {
      var t = (0, o.onEventCallback)(a, "_TCPSocketOnCloseCallback", e, e);
      n.onClose(t)
    }
  },
  WX_TCPSocketOnConnect: function(e) {
    var n = r(e);
    if (n) {
      var t = (0, o.onEventCallback)(f, "_TCPSocketOnConnectCallback", e, e);
      n.onConnect(t)
    }
  },
  WX_TCPSocketOnError: function(e) {
    var n = r(e);
    if (n) {
      var t = (0, o.onEventCallback)(c, "_TCPSocketOnErrorCallback", e, e);
      n.onError(t)
    }
  },
  WX_TCPSocketOnMessage: function(n, t) {
    var a = r(n);
    if (a) {
      i[n] || (i[n] = []);
      var f = function(a) {
        (0, o.formatResponse)("TCPSocketOnMessageListenerResult", a);
        var f = (0, o.convertDataToPointer)(n),
          c = (0, o.convertDataToPointer)(a.message);
        if (t) {
          var i = (0, o.convertInfoToPointer)(a.localInfo),
            r = (0, o.convertInfoToPointer)(a.remoteInfo);
          GameGlobal.Module.dynCall_viiiii(e, f, c, a.message.length || a.message.byteLength, i, r), GameGlobal.Module._free(i), GameGlobal.Module._free(r)
        } else GameGlobal.Module.dynCall_viiiii(e, f, c, a.message.length || a.message.byteLength, 0, 0);
        GameGlobal.Module._free(f), GameGlobal.Module._free(c)
      };
      i[n].push(f), a.onMessage(f)
    }
  },
  WX_RegisterTCPSocketOnMessageCallback: function(o) {
    e = o
  }
};