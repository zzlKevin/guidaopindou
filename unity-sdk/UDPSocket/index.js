Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, t = require("../utils"),
  o = {},
  a = {},
  n = {},
  r = {},
  s = {},
  f = (0, t.getListObject)(o, "UDPSocket");
exports.default = {
  WX_CreateUDPSocket: function() {
    var e = wx.createUDPSocket(),
      a = (0, t.uid)();
    return o[a] = e, a
  },
  WX_UDPSocketBind: function(e, o) {
    var a = f(e);
    if (!a) return 0;
    var n = (0, t.formatJsonStr)(o);
    return a.bind(n.port)
  },
  WX_UDPSocketClose: function(e) {
    var t = f(e);
    t && (t.close(), delete o[e])
  },
  WX_UDPSocketConnect: function(e, o) {
    var a = f(e);
    a && a.connect((0, t.formatJsonStr)(o))
  },
  WX_UDPSocketOffClose: function(e) {
    var o = f(e);
    o && (0, t.offEventCallback)(a, (function(e) {
      o.offClose(e)
    }), e)
  },
  WX_UDPSocketOffError: function(e) {
    var o = f(e);
    o && (0, t.offEventCallback)(n, (function(e) {
      o.offError(e)
    }), e)
  },
  WX_UDPSocketOffListening: function(e) {
    var o = f(e);
    o && (0, t.offEventCallback)(r, (function(e) {
      o.offListening(e)
    }), e)
  },
  WX_UDPSocketOffMessage: function(e) {
    var o = f(e);
    o && (0, t.offEventCallback)(s, (function(e) {
      o.offMessage(e)
    }), e)
  },
  WX_UDPSocketOnClose: function(e) {
    var o = f(e);
    if (o) {
      var n = (0, t.onEventCallback)(a, "_UDPSocketOnCloseCallback", e, e);
      o.onClose(n)
    }
  },
  WX_UDPSocketOnError: function(e) {
    var o = f(e);
    if (o) {
      var a = (0, t.onEventCallback)(n, "_UDPSocketOnErrorCallback", e, e);
      o.onError(a)
    }
  },
  WX_UDPSocketOnListening: function(e) {
    var o = f(e);
    if (o) {
      var a = (0, t.onEventCallback)(r, "_UDPSocketOnListeningCallback", e, e);
      o.onListening(a)
    }
  },
  WX_UDPSocketOnMessage: function(o, a) {
    var n = f(o);
    if (n) {
      s[o] || (s[o] = []);
      var r = function(n) {
        (0, t.formatResponse)("UDPSocketOnMessageListenerResult", n);
        var r = (0, t.convertDataToPointer)(o),
          s = (0, t.convertDataToPointer)(n.message);
        if (a) {
          var f = (0, t.convertInfoToPointer)(n.localInfo),
            c = (0, t.convertInfoToPointer)(n.remoteInfo);
          GameGlobal.Module.dynCall_viiiii(e, r, s, n.message.length || n.message.byteLength, f, c), GameGlobal.Module._free(f), GameGlobal.Module._free(c)
        } else GameGlobal.Module.dynCall_viiiii(e, r, s, n.message.length || n.message.byteLength, 0, 0);
        GameGlobal.Module._free(r), GameGlobal.Module._free(s)
      };
      s[o].push(r), n.onMessage(r)
    }
  },
  WX_UDPSocketSendString: function(e, o, a) {
    var n = f(e);
    if (n) {
      var r = (0, t.formatJsonStr)(a);
      n.send({
        address: r.address,
        message: o,
        port: r.port,
        setBroadcast: r.setBroadcast
      })
    }
  },
  WX_UDPSocketSendBuffer: function(e, o, a, n) {
    var r = f(e);
    if (r) {
      var s = (0, t.formatJsonStr)(n);
      r.send({
        address: s.address,
        message: GameGlobal.Module.HEAPU8.buffer.slice(o, o + a),
        port: s.port,
        length: s.length,
        offset: s.offset,
        setBroadcast: s.setBroadcast
      })
    }
  },
  WX_UDPSocketSetTTL: function(e, t) {
    var o = f(e);
    o && o.setTTL(t)
  },
  WX_UDPSocketWriteString: function(e, o, a) {
    var n = f(e);
    if (n) {
      var r = (0, t.formatJsonStr)(a);
      n.write({
        address: r.address,
        message: o,
        port: r.port,
        setBroadcast: r.setBroadcast
      })
    }
  },
  WX_UDPSocketWriteBuffer: function(e, o, a, n) {
    var r = f(e);
    if (r) {
      var s = (0, t.formatJsonStr)(n);
      r.write({
        address: s.address,
        message: GameGlobal.Module.HEAPU8.buffer.slice(o, o + a),
        port: s.port,
        length: s.length,
        offset: s.offset,
        setBroadcast: s.setBroadcast
      })
    }
  },
  WX_RegisterUDPSocketOnMessageCallback: function(t) {
    e = t
  }
};