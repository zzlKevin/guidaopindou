Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e = null,
  o = {
    value: "",
    maxLength: 140,
    multiple: !1,
    confirmHold: !1,
    confirmType: "done"
  },
  t = function(e) {
    o.value = e.value
  },
  n = function(e) {
    o.value = e.value, a(!1)
  },
  l = function(e) {
    f()
  },
  i = !1,
  u = null,
  r = !1;

function a(e) {
  if (!u)
    if (r = !0, e) {
      u = setTimeout(o, 200)
    } else o();

  function o() {
    i && wx.hideKeyboard(), i = !1, u = null, setTimeout((function() {
      r = !1
    }), 100)
  }
}

function f() {
  wx.offKeyboardInput(t), wx.offKeyboardConfirm(n), wx.offKeyboardComplete(l)
}
exports.default = {
  _JS_MobileKeybard_GetIgnoreBlurEvent: function() {
    return r
  },
  _JS_MobileKeyboard_GetKeyboardStatus: function() {
    return i ? 0 : 1
  },
  _JS_MobileKeyboard_GetText: function(t, n) {
    return t && e.stringToUTF8(o.value, t, n), e.lengthBytesUTF8(o.value)
  },
  _JS_MobileKeyboard_GetTextSelection: function(t, n) {
    var l = o.value.length;
    e.HEAP32[t >> 2] = l, e.HEAP32[n >> 2] = 0
  },
  _JS_MobileKeyboard_Hide: a,
  _JS_MobileKeyboard_SetCharacterLimit: function(e) {
    o.maxLength = e
  },
  _JS_MobileKeyboard_SetText: function(t) {
    i && (o.value = e.UTF8ToString(t))
  },
  _JS_MobileKeyboard_SetTextSelection: function(e, o) {},
  _JS_MobileKeyboard_Show: function(r, f, d, _, b, c, m, y, x) {
    null === e && (e = x), u && (clearTimeout(u), u = null), i && o.multiple !== !!_ ? a(!1) : (o.value = e.UTF8ToString(r), o.maxLength = y > 0 ? y : 524288, o.multiple = !!_, wx.showKeyboard({
      defaultValue: o.value,
      maxLength: o.maxLength,
      multiple: o.multiple,
      confirmHold: o.confirmHold,
      confirmType: o.confirmType
    }), wx.onKeyboardInput(t), wx.onKeyboardConfirm(n), wx.onKeyboardComplete(l), i = !0)
  }
};