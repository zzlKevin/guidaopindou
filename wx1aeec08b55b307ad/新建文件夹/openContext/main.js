window.boot = function() {
  var e = window._CCSettings;
  window._CCSettings = void 0;
  var n = function() {
      cc.view.enableRetina(!0), cc.view.resizeWithBrowserSize(!0);
      var n = e.launchScene;
      cc.director.loadScene(n, null, (function() {
        console.log("Success to load scene: " + n)
      }))
    },
    s = cc.sys.platform === cc.sys.WECHAT_GAME_SUB,
    a = {
      id: "GameCanvas",
      debugMode: e.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
      showFPS: !s && e.debug,
      frameRate: 60,
      groupList: e.groupList,
      collisionMatrix: e.collisionMatrix
    };
  cc.assetManager.init({
    bundleVers: e.bundleVers,
    subpackages: e.subpackages,
    remoteBundles: e.remoteBundles,
    server: e.server,
    subContextRoot: e.subContextRoot
  });
  var c = cc.AssetManager.BuiltinBundleName.RESOURCES,
    t = cc.AssetManager.BuiltinBundleName.INTERNAL,
    r = cc.AssetManager.BuiltinBundleName.MAIN,
    o = cc.AssetManager.BuiltinBundleName.START_SCENE,
    u = [t];
  e.hasResourcesBundle && u.push(c), e.hasStartSceneBundle && u.push(r);
  var i = 0;

  function l(s) {
    if (s) return console.error(s.message, s.stack);
    ++i === u.length + 1 && cc.assetManager.loadBundle(e.hasStartSceneBundle ? o : r, (function(e) {
      e || cc.game.run(a, n)
    }))
  }
  cc.assetManager.loadScript(e.jsList.map((function(e) {
    return "src/" + e
  })), l);
  for (var d = 0; d < u.length; d++) cc.assetManager.loadBundle(u[d], l)
};