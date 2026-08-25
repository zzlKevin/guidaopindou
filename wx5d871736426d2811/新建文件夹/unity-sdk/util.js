Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var a, e = (a = require("./module-helper")) && a.__esModule ? a : {
    default: a
  },
  r = require("../plugin-config"),
  n = require("./utils");
require("../events");
exports.default = {
  WXReportGameStart: function() {
    GameGlobal.manager.reportCustomLaunchInfo()
  },
  WXReportGameSceneError: function(a, e, r, n) {
    GameGlobal.manager && GameGlobal.manager.reportGameSceneError && GameGlobal.manager.reportGameSceneError(a, e, r, n)
  },
  WXWriteLog: function(a) {
    GameGlobal.manager && GameGlobal.manager.writeLog && GameGlobal.manager.writeLog(a)
  },
  WXWriteWarn: function(a) {
    GameGlobal.manager && GameGlobal.manager.writeWarn && GameGlobal.manager.writeWarn(a)
  },
  WXHideLoadingPage: function() {
    GameGlobal.manager && GameGlobal.manager.hideLoadingPage && GameGlobal.manager.hideLoadingPage()
  },
  WXReportUserBehaviorBranchAnalytics: function(a, e, r) {
    wx.reportUserBehaviorBranchAnalytics({
      branchId: a,
      branchDim: e,
      eventType: r
    })
  },
  WXPreloadConcurrent: function(a) {
    GameGlobal.manager && GameGlobal.manager.setConcurrent && GameGlobal.manager.setConcurrent(a)
  },
  WXIsCloudTest: function() {
    return !(void 0 === GameGlobal.isTest || !GameGlobal.isTest)
  },
  WXUncaughtException: function(a) {
    var e;
    var r = new Error("WXUncaughtException"),
      n = null === (e = r.stack) || void 0 === e ? void 0 : e.toString();
    if (n) {
      var l = n.indexOf("WXUncaughtException"); - 1 !== l && (n = n.substr(l));
      var t = n.lastIndexOf("browserIterationFunc"); - 1 !== t && (n = n.substr(0, t))
    }
    if (wx.getRealtimeLogManager().error(n), wx.getLogManager({
        level: 0
      }).warn(n), !0 === a) throw GameGlobal.onCrash(r), r;
    setTimeout((function() {
      throw r
    }), 0)
  },
  WXCleanAllFileCache: function() {
    if (GameGlobal.manager && GameGlobal.manager.cleanCache) {
      var a = (0, n.uid)();
      return GameGlobal.manager.cleanAllCache().then((function(r) {
        e.default.send("CleanAllFileCacheCallback", JSON.stringify({
          callbackId: a,
          result: r
        }))
      })), a
    }
    return ""
  },
  WXCleanFileCache: function(a) {
    if (GameGlobal.manager && GameGlobal.manager.cleanCache) {
      var r = (0, n.uid)();
      return GameGlobal.manager.cleanCache(a).then((function(a) {
        e.default.send("CleanFileCacheCallback", JSON.stringify({
          callbackId: r,
          result: a
        }))
      })), r
    }
    return ""
  },
  WXRemoveFile: function(a) {
    if (GameGlobal.manager && GameGlobal.manager.removeFile && a) {
      var r = (0, n.uid)();
      return GameGlobal.manager.removeFile(a).then((function(a) {
        e.default.send("RemoveFileCallback", JSON.stringify({
          callbackId: r,
          result: a
        }))
      })), r
    }
    return ""
  },
  WXGetCachePath: function(a) {
    if (GameGlobal.manager && GameGlobal.manager.getCachePath) return GameGlobal.manager.getCachePath(a)
  },
  WXGetPluginCachePath: function() {
    if (GameGlobal.manager && GameGlobal.manager.PLUGIN_CACHE_PATH) return GameGlobal.manager.PLUGIN_CACHE_PATH
  },
  WXOnLaunchProgress: function() {
    if (GameGlobal.manager && GameGlobal.manager.onLaunchProgress) {
      var a = (0, n.uid)();
      return setTimeout((function() {
        GameGlobal.manager.onLaunchProgress((function(n) {
          e.default.send("OnLaunchProgressCallback", JSON.stringify({
            callbackId: a,
            res: JSON.stringify(Object.assign({}, n.data, {
              type: n.type
            }))
          })), n.type === r.launchEventType.prepareGame && e.default.send("RemoveLaunchProgressCallback", JSON.stringify({
            callbackId: a
          }))
        }))
      }), 0), a
    }
    return ""
  },
  WXSetDataCDN: function(a) {
    GameGlobal.manager && GameGlobal.manager.setDataCDN && GameGlobal.manager.setDataCDN(a)
  },
  WXSetPreloadList: function(a) {
    if (GameGlobal.manager && GameGlobal.manager.setPreloadList) {
      var e = (a || "").split(",").filter((function(a) {
        return !!a && !!a.trim()
      }));
      GameGlobal.manager.setPreloadList(e)
    }
  },
  WXSetArrayBuffer: function(a, e, r) {
    (0, n.setArrayBuffer)(a, e, r)
  },
  WXLaunchOperaBridge: function(a) {
    var e = GameGlobal.events.emit("launchOperaMsgBridgeFromWasm", a);
    return Array.isArray(e) && e.length > 0 ? e[0] : null
  },
  WXLaunchOperaBridgeToC: function(a, r) {
    e.default.send("WXLaunchOperaBridgeToC", JSON.stringify({
      callback: a,
      args: r
    }))
  },
  WX_SetPreferredFramesPerSecond: function(a) {
    wx.setPreferredFramesPerSecond(a)
  },
  WXSetSyncReadCacheEnabled: function(a) {
    GameGlobal.manager && GameGlobal.manager.fs.setSyncReadCacheEnabled && GameGlobal.manager.fs.setSyncReadCacheEnabled(!!a)
  }
};