Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, a = require("../utils"),
  t = function(t) {
    var r = (0, a.convertDataToPointer)(t.deviceId),
      o = (0, a.convertDataToPointer)(t.serviceId),
      i = (0, a.convertDataToPointer)(t.characteristicId),
      l = (0, a.convertDataToPointer)(t.value);
    GameGlobal.Module.dynCall_viiiii(e, r, o, i, l, t.value.byteLength), GameGlobal.Module._free(r), GameGlobal.Module._free(o), GameGlobal.Module._free(i), GameGlobal.Module._free(l)
  };
exports.default = {
  WX_OnBLECharacteristicValueChange: function() {
    wx.onBLECharacteristicValueChange(t)
  },
  WX_OffBLECharacteristicValueChange: function() {
    wx.offBLECharacteristicValueChange()
  },
  WX_RegisterOnBLECharacteristicValueChangeCallback: function(a) {
    e = a
  }
};