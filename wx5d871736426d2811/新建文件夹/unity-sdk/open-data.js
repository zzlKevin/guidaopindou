Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, t, a, n, o, i = require("../@babel/runtime/helpers/objectSpread2"),
  r = u(require("./response")),
  s = u(require("./module-helper")),
  c = require("./utils"),
  l = require("../check-version");

function u(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}

function d(n) {
  return e || (l.isSupportSharedCanvasMode || ("ScreenCanvas" === n && console.warn("[unity-sdk]: 当前环境不支持 ScreenCanvas 模式"), a = t.OffScreenCanvas), a || (a = "string" == typeof n && t[n] ? t[n] : t.OffScreenCanvas), console.log("[unity-sdk]: 当前开放数据域为 ".concat(a, " 模式")), e = wx.getOpenDataContext({
    sharedCanvasMode: a
  }))
}

function p() {
  return d().canvas
}

function f() {
  if (o) {
    var e = GameGlobal.manager.gameInstance.Module,
      t = e.GL,
      a = t.currentContext.GLctx,
      i = "Linear" === GameGlobal.unityNamespace.unityColorSpace;
    a.emscriptenGLX ? e.ccall("glxShowOpenData", null, ["number", "number", "bool"], [o, p().__uid(), i]) : (a.bindTexture(a.TEXTURE_2D, t.textures[o]), i ? a.texImage2D(a.TEXTURE_2D, 0, a.SRGB8_ALPHA8, a.RGBA, a.UNSIGNED_BYTE, p()) : a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, p()), n = requestAnimationFrame(f))
  }
}

function g() {
  void 0 !== n && cancelAnimationFrame(n)
}! function(e) {
  e.ScreenCanvas = "screenCanvas", e.OffScreenCanvas = "offscreenCanvas"
}(t || (t = {})), wx.onShow((function() {
  e && d().postMessage({
    type: "WXShow"
  })
}));
exports.default = {
  WXGetOpenDataContext: function(e) {
    (0, c.debugLog)("WXGetOpenDataContext:", e), d(e)
  },
  WXDataContextPostMessage: function(e) {
    (0, c.debugLog)("WXDataContextPostMessage:", e), d().postMessage(e)
  },
  WXShowOpenData: function(n, i, r, s, l) {
    (0, c.debugLog)("WXShowOpenData:", n, i, r, s, l), (s <= 0 || l <= 0) && console.error("[unity-sdk]: WXShowOpenData要求 width 和 height 参数必须大于0"), e || console.warn("[unity-sdk]: 请先调用 WXGetOpenDataContext");
    var u = d(),
      p = u.canvas;
    p.width = s, p.height = l, a === t.ScreenCanvas && p.style && (p.style.left = "".concat(i / window.devicePixelRatio, "px"), p.style.top = "".concat(r / window.devicePixelRatio, "px"), p.style.width = "".concat(s / window.devicePixelRatio, "px"), p.style.height = "".concat(l / window.devicePixelRatio, "px")), u.postMessage({
      type: "WXRender",
      x: i,
      y: r,
      width: s,
      height: l,
      devicePixelRatio: window.devicePixelRatio
    }), a === t.OffScreenCanvas && (o = n, g(), f())
  },
  WXHideOpenData: function() {
    if ((0, c.debugLog)("WXHideOpenData"), e) {
      if (d().postMessage({
          type: "WXDestroy"
        }), a === t.OffScreenCanvas) ! function() {
        g();
        var e = p();
        e.width = 1, e.height = 1;
        var t = GameGlobal.manager.gameInstance.Module;
        t.GL.currentContext.GLctx.emscriptenGLX && t.ccall("glxHideOpenData", null, [], [])
      }();
      else if (a === t.ScreenCanvas) {
        var n = p();
        n.style && (n.style.top = "9999px")
      }
    } else console.warn("[unity-sdk]: 请先调用 WXGetOpenDataContext")
  },
  WXOpenDataToTempFilePathSync: function(e) {
    (0, c.debugLog)("WXOpenDataToTempFilePathSync", e);
    var t = p();
    return t ? t.toTempFilePathSync((0, c.getDefaultData)(t, e)) : "Please use WX.GetOpenDataContext() first"
  },
  WXOpenDataToTempFilePath: function(e, t, a, n) {
    if ((0, c.debugLog)("WXOpenDataToTempFilePath", e), e) {
      var o = p();
      if (!o) return void console.error("Please use WX.GetOpenDataContext() first");
      o.toTempFilePath(i(i(i({}, (0, c.getDefaultData)(o, e)), r.default.handleText(t, a, n)), {}, {
        success: function(e) {
          s.default.send("ToTempFilePathCallback", JSON.stringify({
            callbackId: t,
            errMsg: e.errMsg,
            errCode: e.errCode || 0,
            tempFilePath: e.tempFilePath
          }))
        }
      }))
    }
  }
};