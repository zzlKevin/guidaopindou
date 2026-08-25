var e;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
exports.default = {
  WXLogManagerDebug: function(g) {
    e || (e = wx.getLogManager({
      level: 0
    })), e.debug(g)
  },
  WXLogManagerInfo: function(g) {
    e || (e = wx.getLogManager({
      level: 0
    })), e.info(g)
  },
  WXLogManagerLog: function(g) {
    e || (e = wx.getLogManager({
      level: 0
    })), e.log(g)
  },
  WXLogManagerWarn: function(g) {
    e || (e = wx.getLogManager({
      level: 0
    })), e.warn(g)
  }
};