Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0, exports.preloadWxCommonFont = function() {
  var e, n;
  GameGlobal.unityNamespace.preloadWXFont && null !== (e = GameGlobal.manager) && void 0 !== e && null !== (n = e.font) && void 0 !== n && n.getCommonFont && f()
};
var e = r(require("../module-helper")),
  n = require("../utils"),
  o = r(require("./fix-cmap")),
  a = r(require("./read-metrics")),
  t = r(require("./split-sc"));

function r(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
var i, l, u = (wx.getDeviceInfo ? wx.getDeviceInfo() : wx.getSystemInfoSync()).platform,
  c = {},
  d = !1,
  s = "ios" === u,
  m = "android" === u,
  g = {
    CJK_Unified_Ideographs: {
      include: !0,
      unicodeRange: [19968, 40959]
    },
    C0_Controls_and_Basic_Latin: {
      include: !0,
      unicodeRange: [0, 127]
    },
    CJK_Symbols_and_Punctuation: {
      include: !0,
      unicodeRange: [12288, 12351]
    },
    General_Punctuation: {
      include: !0,
      unicodeRange: [8192, 8303]
    },
    Enclosed_CJK_Letters_and_Months: {
      include: !0,
      unicodeRange: [12800, 13055]
    },
    Vertical_Forms: {
      include: !0,
      unicodeRange: [65040, 65055]
    },
    CJK_Compatibility_Forms: {
      include: !0,
      unicodeRange: [65072, 65103]
    },
    Miscellaneous_Symbols: {
      include: !0,
      unicodeRange: [9728, 9983]
    },
    CJK_Compatibility: {
      include: !0,
      unicodeRange: [13056, 13311]
    },
    Halfwidth_and_Fullwidth_Forms: {
      include: !0,
      unicodeRange: [65280, 65519]
    },
    Dingbats: {
      include: !0,
      unicodeRange: [9984, 10175]
    },
    Letterlike_Symbols: {
      include: !0,
      unicodeRange: [8448, 8527]
    },
    Enclosed_Alphanumerics: {
      include: !0,
      unicodeRange: [9312, 9471]
    },
    Number_Forms: {
      include: !0,
      unicodeRange: [8528, 8591]
    },
    Currency_Symbols: {
      include: !0,
      unicodeRange: [8352, 8399]
    },
    Arrows: {
      include: !0,
      unicodeRange: [8592, 8703]
    },
    Geometric_Shapes: {
      include: !0,
      unicodeRange: [9632, 9727]
    },
    Mathematical_Operators: {
      include: !0,
      unicodeRange: [8704, 8959]
    },
    CustomUnicodeRange: []
  };

function f(e, n) {
  var a, r, u = !(null === (a = GameGlobal.manager) || void 0 === a || null === (r = a.font) || void 0 === r || !r.getCommonFont);
  return e || u ? (l && !n || (l = new Promise((function(a, r) {
    if ((!u || n) && e) {
      var l = new GameGlobal.unityNamespace.UnityLoader.UnityCache.XMLHttpRequest;
      return l.open("GET", e.fallbackUrl, !0), l.responseType = "arraybuffer", l.onload = function() {
        if ((200 === l.status || 0 === l.status) && l.response) {
          var e = l.response;
          i = e, d = l.isReadFromCache, a()
        }
      }, l.onerror = r, void l.send()
    }
    var c = [];
    Object.keys(g).forEach((function(e) {
      g[e].include && c.push(g[e].unicodeRange)
    })), c = c.concat(g.CustomUnicodeRange), GameGlobal.manager.font.getCommonFont({
      success: function(e) {
        if (s && (0, o.default)(e), m) {
          var n = (0, t.default)(e);
          n && (e = n)
        }
        i = e, a()
      },
      fail: r
    }, c)
  }))), l) : Promise.reject("invalid usage")
}
exports.default = {
  WXGetFontRawData: function o(t, r) {
    var l, u, s = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      m = (0, n.formatJsonStr)(t),
      g = !(null !== (l = GameGlobal.manager) && void 0 !== l && null !== (u = l.font) && void 0 !== u && u.getCommonFont);
    GameGlobal.manager.TimeLogger.timeStart("WXGetFontRawData"), f(m, s).then((function() {
      if (i) {
        GameGlobal.manager.font.reportGetFontCost(GameGlobal.manager.TimeLogger.timeEnd("WXGetFontRawData"), {
          loadFromRemote: s || g,
          isReadFromCache: d,
          preloadWXFont: GameGlobal.unityNamespace.preloadWXFont
        });
        var n = (0, a.default)(i) || {},
          o = n.ascent,
          t = n.descent,
          l = n.lineGap,
          u = n.unitsPerEm;
        c[r] = i, e.default.send("GetFontRawDataCallback", JSON.stringify({
          callbackId: r,
          type: "success",
          res: JSON.stringify({
            byteLength: i.byteLength,
            ascent: o,
            descent: t,
            lineGap: l,
            unitsPerEm: u
          })
        })), GameGlobal.manager.Logger.pluginLog("[font] load font from ".concat(s || g ? "network, url=".concat(m.fallbackUrl) : "local")), i = null
      } else GameGlobal.manager.Logger.pluginError("[font] load font error: empty content")
    })).catch((function(e) {
      "no support font" === e.errmsg && !1 === s ? o(t, r, !0) : GameGlobal.manager.Logger.pluginError("[font] load font error: ", e)
    }))
  },
  WXShareFontBuffer: function(e, n, o) {
    "string" == typeof c[o] && GameGlobal.manager.Logger.pluginError("[font]内存写入异常"), e.set(new Uint8Array(c[o]), n), delete c[o]
  }
};