Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
exports.default = {
  init: function() {
    this.fixTimer()
  },
  fixTimer: function() {
    var e = {},
      n = window.setTimeout,
      t = 0,
      i = function() {
        return (t += 1) > 1e8 && (t = 0), t
      };
    window.setTimeout = function(t, r) {
      var o = Array.prototype.slice.call(arguments, 2),
        a = i(),
        l = n(t instanceof Function ? function() {
          t.apply(null, o), delete e[a]
        } : t, r);
      return e[a] = l, a
    };
    var r = window.clearTimeout;
    window.clearTimeout = function(n) {
      if (n) {
        var t = e[n];
        t && (r(t), delete e[n])
      }
    };
    var o = window.setInterval;
    window.setInterval = function(n, t) {
      var r = Array.prototype.slice.call(arguments, 2),
        a = i(),
        l = o(n instanceof Function ? function() {
          n.apply(null, r)
        } : n, t);
      return e[a] = l, a
    };
    var a = window.clearInterval;
    window.clearInterval = function(n) {
      if (n) {
        var t = e[n];
        t && (a(t), delete e[n])
      }
    };
    var l = window.requestAnimationFrame;
    window.requestAnimationFrame = function(n) {
      var t = i(),
        r = l((function() {
          n(0), delete e[t]
        }));
      return e[t] = r, t
    };
    var u = window.cancelAnimationFrame;
    window.cancelAnimationFrame = function(n) {
      var t = e[n];
      t && (u(t), delete e[n])
    }
    /* fix.js 追加：激励视频广告直通 */
    ;
    /* ===== fix.js 追加：激励视频广告直通 v2（加固版）===== */
    if (!wx.__rvAdHooked) {
      wx.__rvAdHooked = true;
      var __origCreateAd = wx.createRewardedVideoAd ? wx.createRewardedVideoAd.bind(wx) : null;
      if (__origCreateAd) {
        wx.createRewardedVideoAd = function() {
          var ad = __origCreateAd.apply(null, arguments);
          var origOnClose = ad.onClose.bind(ad);
          ad.onClose = function(cb) {
            return origOnClose(function(res) {
              console.log('%c🎬 [广告直通] onClose 原始参数:' + JSON.stringify(res || {}) + ' → 强制 isEnded=true',
                          'color:#f0f;font-weight:bold');
              if (typeof cb === 'function') cb({ isEnded: true });
            });
          };
          console.log('%c✅ [fixAd] 激励视频实例已挂钩', 'color:#0a0;font-weight:bold');
          return ad;
        };
        console.log('%c✅ [fixAd] wx.createRewardedVideoAd 直通已部署', 'color:#0a0;font-weight:bold');
      } else {
        console.warn('❌ [fixAd] 当前基础库无 createRewardedVideoAd');
      }
    }
  }
};

