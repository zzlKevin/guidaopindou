require('adapter-min.js');
__globalAdapter.init();
requirePlugin('cocos');
__globalAdapter.adaptEngine();
require('./ccRequire');
require('./src/settings');
window.CDNS = ["https://gj-femsj-res-v1.hortorgames.com/main/asset", "https://gj-femsj-res-v2.hortorgames.com/main/asset"];
window.HSDK = require("./hortor-sdk/HSDK.wx.min.js"); // Introduce Cocos Service here

require('./main'); // TODO: move to common
// Adjust devicePixelRatio

cc.view._maxPixelRatio = 4;
if (cc.sys.platform !== cc.sys.WECHAT_GAME_SUB) {
  // Release Image objects after uploaded gl texture
  cc.macro.CLEANUP_IMAGE_CACHE = true;
}
window.boot();