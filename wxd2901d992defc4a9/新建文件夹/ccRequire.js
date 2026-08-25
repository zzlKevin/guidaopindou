var moduleMap = {
  'src/assets/Script/framework/util/quadTree/quadtree.min.js': function srcAssetsScriptFrameworkUtilQuadTreeQuadtreeMinJs() {
    return require('src/assets/Script/framework/util/quadTree/quadtree.min.js');
  },
  'assets/internal/index.js': function assetsInternalIndexJs() {
    return require('assets/internal/index.js');
  },
  'src/scripts/gameAsset/index.js': function srcScriptsGameAssetIndexJs() {
    return require('src/scripts/gameAsset/index.js');
  },
  'src/scripts/remoteAsset/index.js': function srcScriptsRemoteAssetIndexJs() {
    return require('src/scripts/remoteAsset/index.js');
  },
  'assets/resources/index.js': function assetsResourcesIndexJs() {
    return require('assets/resources/index.js');
  },
  'src/scripts/spineAsset/index.js': function srcScriptsSpineAssetIndexJs() {
    return require('src/scripts/spineAsset/index.js');
  },
  'src/scripts/miniGameRes/index.js': function srcScriptsMiniGameResIndexJs() {
    return require('src/scripts/miniGameRes/index.js');
  },
  'src/scripts/en/index.js': function srcScriptsEnIndexJs() {
    return require('src/scripts/en/index.js');
  },
  'src/scripts/jp/index.js': function srcScriptsJpIndexJs() {
    return require('src/scripts/jp/index.js');
  },
  'src/scripts/kr/index.js': function srcScriptsKrIndexJs() {
    return require('src/scripts/kr/index.js');
  },
  'src/scripts/zh/index.js': function srcScriptsZhIndexJs() {
    return require('src/scripts/zh/index.js');
  },
  'src/scripts/zh-tw/index.js': function srcScriptsZhTwIndexJs() {
    return require('src/scripts/zh-tw/index.js');
  } // tail
};
window.__cocos_require__ = function(moduleName) {
  var func = moduleMap[moduleName];
  if (!func) {
    throw new Error("cannot find module ".concat(moduleName));
  }
  return func();
};