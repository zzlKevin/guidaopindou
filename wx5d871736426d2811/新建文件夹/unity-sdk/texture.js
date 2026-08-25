Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e, t = (e = require("./canvas-context")) && e.__esModule ? e : {
  default: e
};
var a = {},
  o = {},
  n = {},
  r = !1;
"undefined" != typeof window && window.indexedDB && Object.defineProperty(window, "indexedDB", {
  get: function() {},
  set: function() {},
  enumerable: !0,
  configurable: !0
});
var l = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096],
  c = GameGlobal.unityNamespace.unityColorSpace && "Linear" === GameGlobal.unityNamespace.unityColorSpace ? "lpng" : "png",
  i = !1,
  s = [];
wx.stopDownloadTexture = function() {
  i = !0
}, wx.starDownloadTexture = function() {
  for (i = !1; s.length > 0;) {
    var e = s.shift();
    e && u.WXDownloadTexture(e.path, e.width, e.height, e.callback, e.limitType)
  }
};
var u = {
  getSupportedExtensions: function() {
    if (r) return GameGlobal.TextureCompressedFormat;
    var e = canvas.getContext(2 === GameGlobal.managerConfig.contextConfig.contextType ? "webgl2" : "webgl").getSupportedExtensions(),
      t = [""];
    return GameGlobal.TextureCompressedFormat = "", -1 !== e.indexOf("WEBGL_compressed_texture_s3tc") && (GameGlobal.TextureCompressedFormat = "dds"), -1 !== e.indexOf("WEBGL_compressed_texture_pvrtc") && (GameGlobal.TexturePVRTCSupported = !0, GameGlobal.TextureCompressedFormat = "pvr"), -1 !== e.indexOf("WEBGL_compressed_texture_etc") && (GameGlobal.TextureEtc2Supported = !0, t.push("etc2"), GameGlobal.TextureCompressedFormat = "etc2"), -1 !== e.indexOf("WEBGL_compressed_texture_astc") && (t.push("astc"), GameGlobal.TextureCompressedFormat = "astc"), r = !0, GameGlobal.NoneLimitSupportedTexture = t.pop(), GameGlobal.TextureCompressedFormat
  },
  getRemoteImageFile: function(e, t, a, o) {
    var n = GameGlobal.TextureCompressedFormat;
    n && o && (n = GameGlobal.NoneLimitSupportedTexture), n && ("pvr" !== n || t === a && -1 !== l.indexOf(t)) && ("dds" !== n || t % 4 == 0 && a % 4 == 0) ? u.requestFile(e, t, a, n, o) : u.downloadFile(e, t, a)
  },
  reTryRemoteImageFile: function(e, t, a) {
    var o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
      r = e;
    n[r] || (n[r] = {
      count: 0,
      path: e,
      width: t,
      height: a,
      limitType: o
    }), n[r].count > 4 || (setTimeout((function() {
      u.getRemoteImageFile(e, t, a, o)
    }), 250 * Math.pow(2, n[r].count)), n[r].count++)
  },
  requestFile: function(e, t, r, l, c) {
    var i = e,
      s = "".concat(GameGlobal.manager.assetPath.replace(/\/$/, ""), "/Textures/").concat(l, "/").concat(t, "/").concat(e, ".txt"),
      m = new GameGlobal.unityNamespace.UnityLoader.UnityCache.XMLHttpRequest;
    m.responseType = "arraybuffer", m.open("GET", s, !0), m.onload = function() {
      var l = m;
      200 === l.status ? (a[i] = {
        data: l.response,
        tmpFile: ""
      }, o[i].forEach((function(e) {
        return e()
      })), delete o[i], delete n[i], delete a[i].data) : u.reTryRemoteImageFile(e, t, r, c)
    }, m.onerror = function() {
      u.reTryRemoteImageFile(e, t, r, c)
    }, m.setRequestHeader("wechatminigame-skipclean", "1"), m.send(null)
  },
  callbackPngFile: function(e, t) {
    var r = wx.createImage();
    r.crossOrigin = "", r.src = e, r.onload = function() {
      a[t] = {
        data: r,
        tmpFile: ""
      }, o[t].forEach((function(e) {
        return e()
      })), delete o[t], delete n[t], delete a[t]
    }
  },
  downloadFile: function(e, t, r) {
    var l = "".concat(GameGlobal.manager.assetPath.replace(/\/$/, ""), "/Textures/").concat(c, "/").concat(t, "/").concat(e, ".png"),
      i = e,
      s = GameGlobal.manager.getCachePath(l);
    if (s) u.callbackPngFile(s, i);
    else if (GameGlobal.unityNamespace.needCacheTextures) {
      var m = new GameGlobal.unityNamespace.UnityLoader.UnityCache.XMLHttpRequest;
      m.responseType = "arraybuffer", m.open("GET", l, !0), m.onsave = function(e) {
        u.callbackPngFile(e, i)
      }, m.onerror = function() {
        u.reTryRemoteImageFile(e, t, r)
      }, m.setRequestHeader("wechatminigame-skipclean", "1"), m.send(null)
    } else {
      var d = wx.createImage();
      d.crossOrigin = "", d.src = l, d.onload = function() {
        a[i] = {
          data: d,
          tmpFile: ""
        }, o[i].forEach((function(e) {
          return e()
        })), delete o[i], delete n[i], delete a[i]
      }, d.onerror = function() {
        u.reTryRemoteImageFile(e, t, r)
      }
    }
  },
  WXDownloadTexture: function(e, t, a, n) {
    var l = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
      c = t % 4;
    0 !== c && (t += 4 - c), r || u.getSupportedExtensions();
    var m = e;
    m && (i ? s.push({
      path: e,
      width: t,
      height: a,
      callback: n,
      limitType: l
    }) : o[m] ? o[m].push(n) : (o[m] = [n], u.getRemoteImageFile(e, t, a, l)))
  }
};
GameGlobal.DownloadedTextures = a, GameGlobal.TextureCompressedFormat = "", GameGlobal.ParalleLDownloadTexture = function(e) {
  e = e.replace(GameGlobal.managerConfig.DATA_CDN, "").replace(/^\//, ""), e = "/".concat(e), GameGlobal.TEXTURE_BUNDLES[e] && GameGlobal.TEXTURE_BUNDLES[e].forEach((function(e) {
    var t = GameGlobal.TextureCompressedFormat;
    if (t) {
      if ("pvr" !== t) {
        var a = new GameGlobal.unityNamespace.UnityLoader.UnityCache.XMLHttpRequest,
          o = "".concat(GameGlobal.manager.assetPath, "/Textures/").concat(t, "/").concat(e.w, "/").concat(e.p, ".txt");
        a.open("GET", o, !0), a.responseType = "arraybuffer", a.setRequestHeader("wechatminigame-skipclean", "1"), a.send()
      }
    } else {
      var n = "".concat(GameGlobal.manager.assetPath, "/Textures/png/").concat(e.w, "/").concat(e.p, ".png"),
        r = wx.createImage();
      r.crossOrigin = "", r.src = n
    }
  }))
};
exports.default = {
  WXDownloadTexture: u.WXDownloadTexture
};
t.default.addCreatedListener((function() {
  GameGlobal.USED_TEXTURE_COMPRESSION && (u.getSupportedExtensions(), ("" === GameGlobal.TextureCompressedFormat || "pvr" === GameGlobal.TextureCompressedFormat) && "ios" === (wx.getDeviceInfo ? wx.getDeviceInfo() : wx.getSystemInfoSync()).platform && wx.showModal({
    title: "提示",
    content: "当前操作系统版本过低，建议您升级至最新版本。"
  }));
  wx.onNetworkStatusChange((function(e) {
    e.isConnected && Object.keys(n).forEach((function(e) {
      var t = n[e];
      t.count > 4 && u.getRemoteImageFile(t.path, t.width, t.height, t.limitType)
    }))
  }))
}));