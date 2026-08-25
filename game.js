require("./weapp-adapter"), require("./events"), require("./texture-config");
var e = o(require("./unity-namespace"));
require("./wasm-split"), require("./webgl.wasm.framework.unityweb"), require("./unity-sdk/index");
var a = o(require("./check-version")),
  t = require("./plugin-config"),
  n = require("./unity-sdk/font/index");

function o(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
var i = {
  DATA_FILE_MD5: "73856268f55b3cf4",
  CODE_FILE_MD5: "451868dc5d53b768",
  GAME_NAME: "webgl",
  APPID: "wxb710578e30185510",
  DATA_FILE_SIZE: "20688739",
  OPT_DATA_FILE_SIZE: "$OPT_DATA_FILE_SIZE",
  DATA_CDN: "https://lfrjtxx-cou.gusspro.com/app-vy/Release/pdpx_vy/XYX/weixin/base/1.07/26082220225743230444",
  loadDataPackageFromSubpackage: !1,
  compressDataPackage: !0,
  preloadDataList: [, "/WebGL/pdpx_vy/7633e37509420d5c4b6b2e8b4a57fe7c.unity3d", "/WebGL/pdpx_vy/d92b10571f36c4b46fc93fc88702c1f0.unity3d", "/WebGL/pdpx_vy/0ad180d04830c1d905034ea213293ab4.unity3d", "/WebGL/pdpx_vy/2aca61074c33d1e145a27aac46f39ac2.unity3d", "/WebGL/pdpx_vy/2b53cd231084166ee8618661db44553a.unity3d", "/WebGL/pdpx_vy/4c0e20f81a98cf6882fc6a61b9415212.unity3d", "/WebGL/pdpx_vy/a789c5cfe2b56becb9458f694fb66d41.unity3d", "/WebGL/pdpx_vy/e7ff843cd8990db7d34fc73acf31994a.unity3d", "/WebGL/pdpx_vy/a11bccc004bc472f25ea0c8de15c527d.unity3d", "/WebGL/pdpx_vy/3257b4b268bcefb6bc4c7b39615bf11f.unity3d", "/WebGL/pdpx_vy/9d6b60c68111cac33b6d388dcf58c48e.unity3d", "/WebGL/pdpx_vy/a80b27ee25ffff74c67bbbf088418819.unity3d", "/WebGL/pdpx_vy/f85477e214e70a9de88688ddec03d9a0.unity3d", "/WebGL/pdpx_vy/00a02eb0fd95a9b6b24551e87b2c8a5a.unity3d", "/WebGL/pdpx_vy/4e4e1e203b2bf2704c5f9395ce16d495.unity3d", "/WebGL/pdpx_vy/4679d75a12fe188634e0bf3a8e01e747.unity3d", "/WebGL/pdpx_vy/c44a672629d2eecfcc82253da9b650eb.unity3d", "/WebGL/pdpx_vy/967d8d4c4553a24d1eee64cbd28c64fd.unity3d", "/WebGL/pdpx_vy/e9106ba2f44c8ccf836e5cb9a510e735.unity3d", "/WebGL/pdpx_vy/ae60bfcec33ea0d7f7ec417a25f1f290.unity3d"],
  contextConfig: {
    contextType: 1,
    contextExt: {
      enableGLX: !1,
      enableMetal: !1
    }
  },
  PROFILER_UPLOAD_URL: ""
};
GameGlobal.managerConfig = i, (0, a.default)().then((function(a) {
  if (a) {
    var o;
    try {
      o = requirePlugin("UnityPlugin", {
        enableRequireHostModule: !0,
        customEnv: {
          wx: wx,
          unityNamespace: e.default,
          document: document,
          canvas: canvas,
          events: GameGlobal.events,
          WXWASMSDK: GameGlobal.WXWASMSDK
        }
      }).default
    } catch (e) {
      GameGlobal.realtimeLogManager.error(e), GameGlobal.logmanager.warn(e.stack), console.error("requirePlugin:", e), -1 !== e.message.indexOf("not defined") && console.error("！！！插件需要申请才可使用\n请勿使用测试AppID，并登录 https://mp.weixin.qq.com/ 并前往：能力地图-开发提效包-快适配 开通\n阅读文档获取详情:https://github.com/wechat-miniprogram/minigame-unity-webgl-transform/blob/main/Design/Transform.md")
    }
    Error.stackTraceLimit = 1 / 0, Object.assign(i, {
      hideAfterCallmain: !0,
      loadingPageConfig: {
        totalLaunchTime: 7e3,
        animationDuration: 100,
        designWidth: 0,
        designHeight: 0,
        scaleMode: t.scaleMode.default,
        textConfig: {
          firstStartText: "首次加载请耐心等待",
          downloadingText: ["正在加载资源"],
          compilingText: "编译中",
          initText: "初始化中",
          completeText: "开始游戏",
          textDuration: 1500,
          style: {
            bottom: 64,
            height: 24,
            width: 240,
            lineHeight: 24,
            color: "#ffffff",
            fontSize: 12
          }
        },
        barConfig: {
          style: {
            width: 240,
            height: 24,
            padding: 2,
            bottom: 64,
            backgroundColor: "#07C160"
          }
        },
        iconConfig: {
          visible: !0,
          style: {
            width: 64,
            height: 23,
            bottom: 20
          }
        },
        materialConfig: {
          backgroundImage: "images/background.jpg",
          backgroundVideo: ""
        }
      }
    }), GameGlobal.managerConfig = i;
    var d = new o(i);
    d.onLaunchProgress((function(e) {
      e.type, t.launchEventType.launchPlugin, e.type, t.launchEventType.loadWasm, e.type, t.launchEventType.compileWasm, e.type, t.launchEventType.loadAssets, e.type, t.launchEventType.readAssets, e.type, t.launchEventType.prepareGame
    })), d.onModulePrepared((function() {
      for (var a in e.default) GameGlobal.hasOwnProperty(a) && "DATA_CDN" !== a || (GameGlobal[a] = e.default[a]);
      i.DATA_CDN = GameGlobal.DATA_CDN, d.assetPath = "".concat((i.DATA_CDN || "").replace(/\/$/, ""), "/Assets"), (0, n.preloadWxCommonFont)()
    })), d.onLogError = function(e) {
      GameGlobal.realtimeLogManager.error(e);
      var a = e && e.stack;
      GameGlobal.logmanager.warn(a ? e.stack : e)
    }, GameGlobal.canUseiOSAutoGC && 0 !== e.default.iOSAutoGCInterval && setInterval((function() {
      wx.triggerGC()
    }), e.default.iOSAutoGCInterval), d.startGame(), GameGlobal.manager = d, GameGlobal.events.on("launchOperaPushMsgToWasm", (function(e, a) {
      return GameGlobal.WXWASMSDK.WXLaunchOperaBridgeToC(e, a)
    })), GameGlobal.events.on("createWorker", (function(e) {}))
  }
}));
var d = GameGlobal.WXWASMSDK.GetJsonValue("ams_actionid"),
  c = GameGlobal.WXWASMSDK.GetJsonValue("ams_secretkey"),
  r = GameGlobal.WXWASMSDK.GetJsonValue("ams_appid");
if (d && c && r) {
  d = Number(d), GameGlobal.WXWASMSDK.InitAMS(d, c, r);
  var l = GameGlobal.WXWASMSDK.GetJsonValue("UsePayModule");
  l && "0" !== l || GameGlobal.WXWASMSDK.START_LOAD()
}