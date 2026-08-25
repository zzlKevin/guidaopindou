Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.loadEngine = void 0;
var e = function e(n) {
  console.warn("引擎分包加载:", n), wx.loadSubpackage ? function(e) {
    return new Promise((function(n, o) {
      var t = (new Date).getTime();
      wx.loadSubpackage({
        name: e,
        success: function(e) {
          console.log("引擎子包加载完毕", (new Date).getTime() - t, "ms"), n(!0)
        },
        fail: function(e) {
          console.log("引擎子包加载失败", (new Date).getTime() - t, "ms"), n(!1)
        }
      }).onProgressUpdate((function(e) {}))
    }))
  }(n).then((function(o) {
    o || e(n)
  })) : require(n + "/game.js")
};
exports.loadEngine = e;