Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, o, t, r = require("../../@babel/runtime/helpers/objectSpread2"),
  a = require("../utils"),
  n = function(e) {
    (0, a.formatResponse)("OnGyroscopeChangeListenerResult", e);
    var o = (0, a.convertDataToPointer)(e.x),
      r = (0, a.convertDataToPointer)(e.y),
      n = (0, a.convertDataToPointer)(e.z);
    GameGlobal.Module.dynCall_viii(t, o, r, n), GameGlobal.Module._free(o), GameGlobal.Module._free(r), GameGlobal.Module._free(n)
  };

function l(e, o, t, r) {
  (0, a.formatResponse)("GeneralCallbackResult", r);
  var n = (0, a.convertDataToPointer)(o),
    l = (0, a.convertDataToPointer)(r.errMsg);
  GameGlobal.Module.dynCall_viii(e, n, t, l), GameGlobal.Module._free(n), GameGlobal.Module._free(l)
}
exports.default = {
  WX_StartGyroscope: function(o, t) {
    var n = (0, a.formatJsonStr)(t);
    wx.startGyroscope(r(r({}, n), {}, {
      success: function(t) {
        l(e, o, 2, t)
      },
      fail: function(t) {
        l(e, o, 1, t)
      },
      complete: function(t) {
        l(e, o, 0, t)
      }
    }))
  },
  WX_StopGyroscope: function(e, t) {
    var n = (0, a.formatJsonStr)(t);
    wx.stopGyroscope(r(r({}, n), {}, {
      success: function(t) {
        l(o, e, 2, t)
      },
      fail: function(t) {
        l(o, e, 1, t)
      },
      complete: function(t) {
        l(o, e, 0, t)
      }
    }))
  },
  WX_OnGyroscopeChange: function() {
    wx.onGyroscopeChange(n)
  },
  WX_OffGyroscopeChange: function() {
    wx.offGyroscopeChange()
  },
  WX_RegisterStartGyroscopeCallback: function(o) {
    e = o
  },
  WX_RegisterStopGyroscopeCallback: function(e) {
    o = e
  },
  WX_RegisterOnGyroscopeChangeCallback: function(e) {
    t = e
  }
};