var e = require("../@babel/runtime/helpers/objectSpread2"),
  i = N(require("./storage")),
  r = N(require("./userinfo")),
  t = N(require("./module-helper")),
  u = N(require("./share")),
  a = N(require("./ad")),
  n = N(require("./canvas")),
  d = N(require("./fs")),
  l = N(require("./open-data")),
  o = N(require("./util")),
  f = N(require("./cloud")),
  c = N(require("./audio/index")),
  q = N(require("./texture")),
  w = N(require("./fix")),
  s = N(require("./canvas-context")),
  b = N(require("./video")),
  g = N(require("./logger")),
  h = N(require("./game-club")),
  m = N(require("./sdk")),
  x = N(require("./camera")),
  p = N(require("./recorder")),
  v = N(require("./upload-file")),
  y = N(require("./game-recorder")),
  S = N(require("./chat")),
  P = N(require("./font/index")),
  R = N(require("./authorize")),
  _ = N(require("./video/index")),
  G = N(require("./mobileKeyboard/index")),
  W = N(require("./touch/index")),
  j = N(require("./TCPSocket/index")),
  k = N(require("./UDPSocket/index")),
  H = N(require("./bluetooth/index")),
  O = N(require("./gyroscope/index")),
  D = N(require("./ams_sdk")),
  K = N(require("./wxsdk"));

function N(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
if (GameGlobal.unityNamespace = GameGlobal.unityNamespace || {}, GameGlobal.unityNamespace.unityVersion = "2021.3.56f2", window._ScaleRate = 1, "2021.3.56f2".split(".").slice(0, 2).join("") < "20193") {
  var z = window.innerWidth * window.devicePixelRatio,
    C = window.innerHeight * window.devicePixelRatio;
  canvas.width = z, canvas.height = C, window._ScaleRate = window.devicePixelRatio
}
Object.defineProperty(canvas, "clientHeight", {
  get: function() {
    return window.innerHeight * window._ScaleRate
  },
  configurable: !0
}), Object.defineProperty(canvas, "clientWidth", {
  get: function() {
    return window.innerWidth * window._ScaleRate
  },
  configurable: !0
}), Object.defineProperty(document.body, "clientHeight", {
  get: function() {
    return window.innerHeight * window._ScaleRate
  },
  configurable: !0
}), Object.defineProperty(document.body, "clientWidth", {
  get: function() {
    return window.innerWidth * window._ScaleRate
  },
  configurable: !0
}), Object.defineProperty(document, "fullscreenEnabled", {
  get: function() {
    return !0
  },
  configurable: !0
}), w.default.init();
var I = e(e(e(e(e(e(e(e(e(e(e(e(e(e(e(e(e(e(e(e(e(e(e(e(e(e(e(e(e(e(e({
  WXInitializeSDK: function() {
    t.default.init(), t.default.send("Inited", 200)
  }
}, i.default), r.default), u.default), a.default), n.default), d.default), l.default), o.default), f.default), c.default), q.default), b.default), g.default), h.default), {}, {
  canvasContext: s.default
}, m.default), x.default), p.default), v.default), y.default), S.default), P.default), R.default), _.default), G.default), W.default), j.default), k.default), H.default), O.default), D.default), K.default);
GameGlobal.WXWASMSDK = I;