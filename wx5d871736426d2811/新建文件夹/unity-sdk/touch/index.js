Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var n, o, t, e, c = require("../utils");

function u(n, o) {
  var t = (0, c.convertOnTouchStartListenerResultToPointer)({
    touches: n.touches.map((function(o) {
      return (0, c.formatTouchEvent)(o, n.type)
    })),
    changedTouches: n.changedTouches.map((function(o) {
      return (0, c.formatTouchEvent)(o, n.type, 1)
    })),
    timeStamp: parseInt(n.timeStamp.toString(), 10)
  });
  GameGlobal.Module.dynCall_viii(o, t, n.touches.length, n.changedTouches.length), GameGlobal.Module._free(t)
}
var f = function(o) {
    u(o, n)
  },
  a = function(n) {
    u(n, o)
  },
  i = function(n) {
    u(n, t)
  },
  h = function(n) {
    u(n, e)
  };
exports.default = {
  WX_OnTouchCancel: function() {
    wx.onTouchCancel(f)
  },
  WX_OffTouchCancel: function() {
    wx.offTouchCancel(f)
  },
  WX_OnTouchEnd: function() {
    wx.onTouchEnd(a)
  },
  WX_OffTouchEnd: function() {
    wx.offTouchEnd(a)
  },
  WX_OnTouchMove: function() {
    wx.onTouchMove(i)
  },
  WX_OffTouchMove: function() {
    wx.offTouchMove(i)
  },
  WX_OnTouchStart: function() {
    wx.onTouchStart(h)
  },
  WX_OffTouchStart: function() {
    wx.offTouchStart(h)
  },
  WX_RegisterOnTouchCancelCallback: function(o) {
    n = o
  },
  WX_RegisterOnTouchEndCallback: function(n) {
    o = n
  },
  WX_RegisterOnTouchMoveCallback: function(n) {
    t = n
  },
  WX_RegisterOnTouchStartCallback: function(n) {
    e = n
  }
};