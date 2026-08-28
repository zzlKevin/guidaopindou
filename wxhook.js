/* =============================================================
 * wxhook.js  v5 —— 锚点版 · 全自动零交互
 * 原理：LeftTime 字段位于固定偏移 0x319eb54，
 *       每 0.8 秒检查一次；若发现有正常倒计时数值则立刻覆写为 9999
 * ============================================================= */
(function () {
  'use strict';
  var G = typeof GameGlobal !== 'undefined' ? GameGlobal : {};
  if (G.__hookV5) { console.log('[wxhook] 已加载'); return; }
  
  /* ========== 可调参数 ========== */
  var ANCHOR      = 0x319eb54;   // ⭐ LeftTime 字段的绝对地址（经验证 1~4 关通用）
  var TARGET_SEC  = 99999;         // 写入的目标秒数（166 分多）
  var MIN_VAL     = 50;           // 视为"正在倒数中"的最小阈值（低于此可能是过场）
  var MAX_VAL     = 620;          // 视为"正在倒数中"的最大阈值（超过此是总时长备份）
  
  /* ========== 基础工具（保底，方便万一要重新定位）========== */
  G.getWasmMem = function () {
    if (G.Module && G.Module.HEAPU8 && G.Module.HEAPU8.buffer) return G.Module.HEAPU8;
    return G.EMSCRIPTEN_HEAPU8 || null;
  };
  G.wasmmemReady = function () {
    var h = G.getWasmMem();
    return !!(h && h.buffer && h.buffer.byteLength > 1024);
  };
  G.anchorVal = function () {                       // 看一眼锚点当前是什么数
    if (!G.wasmmemReady()) return '(未就绪)';
    var v = new DataView(G.getWasmMem().buffer).getFloat32(ANCHOR, true);
    return Number.isFinite(v) ? v.toFixed(2) : 'NaN';
  };
  G.setAnchor = function (sec) {                    // 手动强制写锚点
    if (!G.wasmmemReady()) return console.warn('未就绪');
    new DataView(G.getWasmMem().buffer).setFloat32(ANCHOR, sec || TARGET_SEC, true);
    console.log('[setAnchor] 已写入', sec || TARGET_SEC);
  };
  G.relocate = function (low, high) {               // 兜底：若某天锚点失效重新找
    console.warn('请使用以下流程重新定位：');
    console.log(' ① GameGlobal.rscan(' + low + ',' + high + ')');
    console.log(' ② 让它走 6 秒后：snap(); rdiff(6,2)');
    console.log(' ③ 把命中的新地址替换掉本文件里的 ANCHOR 常量');
  };
  
  /* ========== 全自动哨兵 ========== */
  var _sentinelStarted = false;
  function _patrol() {
    if (!G.wasmmemReady()) return;
    try {
      var dv = new DataView(G.getWasmMem().buffer);
      var v = dv.getFloat32(ANCHOR, true);
      // 必须是有效浮点 & 处于"活着的倒计时"范围才动手
      if (Number.isFinite(v) && v > MIN_VAL && v < MAX_VAL) {
        dv.setFloat32(ANCHOR, TARGET_SEC, true);
        var t = new Date().toLocaleTimeString();
        console.log('%c⚡[' + t + '] 检测到倒计时(' + v.toFixed(1) + 's) → 已改为 ' + TARGET_SEC,
                    'color:#d00;font-weight:bold');
      }
    } catch (e) { /* 吞掉瞬时错误 */ }
  }
  
  // 等 wasm 就绪后开启巡检循环
  var _waitTimer = setInterval(function () {
    if (G.wasmmemReady()) {
      clearInterval(_waitTimer);
      _sentinelStarted = true;
      //console.log('%c[wxhook v5] ✅ 锚点哨兵已上线','color:#0a0;font-weight:bold');
      //console.log('   监视地址: 0x' + ANCHOR.toString(16));
      //console.log('   触发条件: 数值出现在 ' + MIN_VAL + '~' + MAX_VAL + ' 秒之间');
      //console.log('   动作:     覆写为 ' + TARGET_SEC + ' 秒');
      //console.log('   提示:     G.anchorVal() 随时可查看当前锚点读数');
      setInterval(_patrol, 800);           // 每 0.8 秒巡一次，代价可忽略
    }
  }, 500);
  
  G.G = G;
  G.__hookV5 = true;
  
  console.log('%c[wxhook v5] 已装载', 'color:#0a0;font-weight:bold',
    '\n编译完成后无需任何操作，进入关卡即自动触发',
    '\n调试命令: G.anchorVal() / G.setAnchor(N) / G.relocate(low,high)');
  })();
  /* ============ 广告 Hook v1：劫持 createRewardedVideoAd ============ */
(function () {
  // ① 第一步：先纯监听不改动 —— 用于确认这条链路真的会被走到
  var _origCreate = wx.createRewardedVideoAd;
  wx.createRewardedVideoAd = function () {
    console.log('%c[AD] createRewardedVideoAd 被调用', 'color:#c60;font-weight:bold');
    var ad = _origCreate.apply(this, arguments);

    // ② 包装 onClose：把 isEnded 强改为 true
    var _origOn = ad.onClose ? ad.onClose.bind(ad) : null;
    if (_origOn) {
      ad.onClose = function (cb) {
        _origOn(function (res) {
          console.log('[AD] onClose 原始参数:', JSON.stringify(res));
          var forged = Object.assign({}, res || {}, { isEnded: true });
          console.log('%c[AD] 已伪造 isEnded=true', 'color:#d00;font-weight:bold');
          cb(forged);
        });
      };
    }
    return ad;
  };
  console.log('[AD-Hook] wx.createRewardedVideoAd 已拦截');
})();
