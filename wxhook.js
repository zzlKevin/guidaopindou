/* =============================================================
 * wxhook.js 合并版 —— 倒计时9999 + 广告弹窗Hook + 传送带档位（3合1）
 * -------------------------------------------------------------
 *  模块① 倒计时锚点哨兵 v5（原第二个文件）
 *         LeftTime@0x319eb54，每 0.8 秒巡检，自动覆写为 99999 秒
 *  模块② 广告 Hook v1（原第二个文件）
 *         劫持 wx.createRewardedVideoAd，onClose 伪造 isEnded=true
 *  模块③ 速度模块 v11.1（原第一个文件，含 Toast 弹窗）
 *         传送带档位：三指扫描 → 双指档位过滤(3→1→设置→2→1) → 锁定5倍
 * -------------------------------------------------------------
 *  合并说明：第一个文件是被上一轮改丢"倒计时9999"的版本，
 *            现以第二个文件为底座，并入第一个文件的档位+弹窗模块，
 *            三个功能全部保留，各模块操作不同内存地址，互不冲突。
 * ============================================================= */

/* ============ [模块①] 倒计时锚点哨兵 v5 —— 全自动零交互 ============ */
/* 原理：LeftTime 字段位于固定偏移 0x319eb54，
 *       每 0.8 秒检查一次；若发现有正常倒计时数值则立刻覆写为 9999 */
(function () {
  'use strict';
  var G = typeof GameGlobal !== 'undefined' ? GameGlobal : {};
  if (G.__hookV5) { console.log('[wxhook] 已加载'); return; }

  /* ========== 可调参数 ========== */
  var ANCHOR      = 0x319eb54;   // ⭐ LeftTime 字段的绝对地址（经验证 1~4 关通用）
  var TARGET_SEC  = 99999;         // 写入的目标秒数（166 分多）
  var MIN_VAL     = 50;           // 视为“正在倒数中”的最小阈值（低于此可能是过场）
  var MAX_VAL     = 620;          // 视为“正在倒数中”的最大阈值（超过此是总时长备份）

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
      // 必须是有效浮点 & 处于“活着的倒计时”范围才动手
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

  console.log('%c[wxhook v5] 倒计时模块已装载', 'color:#0a0;font-weight:bold',
    '\n编译完成后无需任何操作，进入关卡即自动触发',
    '\n调试命令: GameGlobal.anchorVal() / GameGlobal.setAnchor(N) / GameGlobal.relocate(low,high)');
})();

/* ============ [模块②] 广告 Hook v1：劫持 createRewardedVideoAd ============ */
(function () {
  if (wx.createRewardedVideoAd && wx.createRewardedVideoAd.__wxhookAd) {
    console.log('[AD-Hook] 已加载'); return;
  }
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
  wx.createRewardedVideoAd.__wxhookAd = true;
  console.log('[AD-Hook] wx.createRewardedVideoAd 已拦截');
})();

/* =============================================================
 * [模块③] 速度模块 v11.1 —— 传送带档位 + Toast弹窗（原第一个文件）
 * 流程：三指扫描 → 双指按序过滤（3→1→设置→2→1循环）→ 候选≤3自动锁定5倍
 * ============================================================= */
(function () {
  'use strict';
  // 兼容全局对象
  var globalObj = (typeof GameGlobal !== 'undefined') ? GameGlobal :
                  (typeof window !== 'undefined') ? window : global;
  if (globalObj.__speedV11) { console.log('[speed] 已加载'); return; }

  // 内置 Toast
  function showToast(msg, dur) {
    dur = dur || 2000;
    if (globalObj.toast && typeof globalObj.toast === 'function') {
      globalObj.toast(msg, dur);
    } else {
      try {
        if (typeof wx !== 'undefined' && wx.showToast) {
          wx.showToast({ title: msg, icon: 'none', duration: dur, mask: false });
        } else {
          console.log('[toast] ' + msg);
        }
      } catch (e) {
        console.log('[toast] ' + msg);
      }
    }
  }

  var SPEED_TARGET = 5;
  var state = 'IDLE';          // IDLE | SCAN | LOCKED
  var MAXC = 2200000;
  var pAddr, pVal, pType;
  try {
    pAddr = new Float64Array(MAXC);
    pVal  = new Float64Array(MAXC);
    pType = new Uint8Array(MAXC);
  } catch (e) { pAddr = null; }
  var pLen = 0;
  var locked = [];
  var bufId = null, f32v = null, i32v = null;

  // 步骤顺序（0 代表“设置”）
  var stepValues = [3, 1, 0, 2, 1];
  var stepIndex = 0;

  function views() {
    var h = globalObj.Module && globalObj.Module.HEAPU8;
    if (!h || !h.buffer) return false;
    if (bufId !== h.buffer) {
      bufId = h.buffer;
      f32v = new Float32Array(h.buffer);
      i32v = new Int32Array(h.buffer);
    }
    return true;
  }
  function readVal(t, idx) { return t === 0 ? i32v[idx] : f32v[idx]; }
  function writeVal(t, idx, v) { if (t === 0) i32v[idx] = v; else f32v[idx] = v; }
  function isNat(v) { return v === 1 || v === 2 || v === 3; }

  function snapshot() {
    if (!views() || !pAddr) return false;
    pLen = 0;
    var i, n = i32v.length;
    for (i = 0; i < n && pLen < MAXC; i++) {
      if (i32v[i] === 1) { pAddr[pLen] = i * 4; pVal[pLen] = 1; pType[pLen] = 0; pLen++; }
    }
    var f = f32v;
    for (i = 0; i < f.length && pLen < MAXC; i++) {
      if (f[i] === 1) { pAddr[pLen] = i * 4; pVal[pLen] = 1; pType[pLen] = 1; pLen++; }
    }
    return true;
  }

  function applyFilter(filterVal) {
    if (!pLen) return;
    var w = 0;
    for (var r = 0; r < pLen; r++) {
      if (readVal(pType[r], pAddr[r] >> 2) === filterVal) {
        pAddr[w] = pAddr[r];
        pVal[w] = filterVal;
        pType[w] = pType[r];
        w++;
      }
    }
    pLen = w;
  }

  function lockSelect() {
    if (!pLen) {
      state = 'IDLE';
      showToast('候选:0 请重新三指', 2000);
      return;
    }
    var pick = -1, ruleDesc = '';
    if (pLen === 1) {
      pick = 0;
      ruleDesc = '唯一';
    } else if (pLen === 3) {
      if (pType[1] === 1) { pick = 1; ruleDesc = '第2(float)'; }
      else {
        for (var r = 0; r < pLen; r++) { if (pType[r] === 1) { pick = r; ruleDesc = '优先float'; break; } }
        if (pick < 0) { pick = 1; ruleDesc = '第2(int)'; }
      }
    } else {
      for (var r = 0; r < pLen; r++) { if (pType[r] === 1) { pick = r; ruleDesc = '优先float'; break; } }
      if (pick < 0) { pick = (pLen === 1) ? 0 : 1; ruleDesc = 'int'; }
    }
    if (pick < 0 || pick >= pLen) pick = 0;

    var A = pAddr[pick], T = pType[pick], V0 = readVal(T, A >> 2);
    locked = [{ a: A, t: T, v0: V0 }];
    writeVal(T, A >> 2, SPEED_TARGET);
    state = 'LOCKED';
    var typeLabel = T === 1 ? 'float' : 'int';
    console.log('%c[speed] ★ 锁定 0x' + A.toString(16) + '(' + typeLabel + ') -> ' + SPEED_TARGET + '倍', 'color:#0a0;font-weight:bold');
    showToast('已锁定5倍 三指解除', 2500);
  }

  function quadFinger() {
    if (state !== 'SCAN') {
      // showToast('请先三指扫描', 1500);
      return;
    }
    if (!views() || !pLen) {
      showToast('候选为空 请重新三指', 1500);
      state = 'IDLE';
      return;
    }
    var filterVal = stepValues[stepIndex];
    var opName = (filterVal === 0) ? '设置' : filterVal + '倍';
    applyFilter(filterVal);
    stepIndex = (stepIndex + 1) % stepValues.length;

    if (pLen === 0) {
      showToast('候选:0 请重新三指', 2000);
      state = 'IDLE';
      return;
    }
    if (pLen <= 3) {
      showToast('候选:' + pLen + ' 自动锁定...', 1500);
      lockSelect();
      return;
    }
    var nextOp = stepValues[stepIndex];
    var nextName = (nextOp === 0) ? '设置' : nextOp + '倍';
    showToast('候选:' + pLen + ' ' + nextName + ' 双指', 2000);
  }

  function triFinger() {
    if (!views()) { showToast('WASM未就绪', 1000); return; }
    if (state === 'IDLE') {
      if (snapshot()) {
        state = 'SCAN';
        stepIndex = 0;
        var firstOp = stepValues[0];
        var firstName = (firstOp === 0) ? '设置' : firstOp + '倍';
        console.log('[speed] 扫描完成，候选 ' + pLen + ' 个');
        showToast('候选:' + pLen + ' ' + firstName + ' 双指', 3000);
      } else {
        showToast('快照失败 请重试', 1500);
      }
    } else if (state === 'SCAN') {
      state = 'IDLE';
      showToast('已取消扫描', 1500);
    } else { // LOCKED
      for (var k = 0; k < locked.length; k++) {
        var L = locked[k];
        writeVal(L.t, L.a >> 2, L.v0);
      }
      locked = [];
      state = 'IDLE';
      showToast('已恢复原生倍速', 1500);
    }
  }

  // 哨兵：维持5倍，但优化失效判断
  setInterval(function () {
    if (state !== 'LOCKED' || !views()) return;
    try {
      for (var k = locked.length - 1; k >= 0; k--) {
        var L = locked[k];
        var v = readVal(L.t, L.a >> 2);
        if (isNat(v)) {
          // 用户手动切换了倍速，更新原生值并覆盖为5
          L.v0 = v;
          writeVal(L.t, L.a >> 2, SPEED_TARGET);
        } else if (v !== SPEED_TARGET) {
          // 值变为其他（如0），直接覆盖为5，不更新v0，也不失效
          writeVal(L.t, L.a >> 2, SPEED_TARGET);
        }
        // 若 v 等于 5，则不做任何事
      }
    } catch (e) {
      // 读取异常则判定失效
      locked = [];
      state = 'IDLE';
      showToast('锚点失效 请重新三指', 1500);
    }
  }, 300);

  // 手势路由
  var __lastTri = 0, __lastQuad = 0;
  try {
    wx.onTouchStart(function (e) {
      if (!e || !e.touches) return;
      var n = e.touches.length, now = Date.now();
      if (n === 3) {
        if (now - __lastTri < 800) return;
        __lastTri = now;
        triFinger();
      } else if (n === 2) {
        if (now - __lastQuad < 800) return;
        __lastQuad = now;
        quadFinger();
      }
    });
  } catch (e) {}

  // 暴露控制台命令
  globalObj.speedStatus = function () {
    var info = {
      state: state,
      target: SPEED_TARGET,
      candidates: state === 'SCAN' ? pLen : 0,
      stepIndex: stepIndex,
      nextStep: stepValues[stepIndex],
      locked: locked.map(function (L) {
        return { addr: '0x' + L.a.toString(16), type: L.t === 0 ? 'int' : 'float',
                 current: views() ? readVal(L.t, L.a >> 2) : null, native: L.v0 };
      })
    };
    console.log('[speed]', info);
    return info;
  };
  globalObj.speedOff = function () {
    if (state === 'LOCKED') {
      for (var k = 0; k < locked.length; k++) {
        var L = locked[k];
        writeVal(L.t, L.a >> 2, L.v0);
      }
    }
    locked = [];
    state = 'IDLE';
    showToast('已强制解除', 1500);
    return true;
  };

  globalObj.__speedV11 = true;
  console.log('%c[wxhook v11.1] 速度模块已装载（优化哨兵，Toast顺序调整）', 'color:#0a0;font-weight:bold',
    '\n流程：三指扫描 → 双指按序过滤（3→1→设置→2→1循环）',
    '\n候选≤3自动锁定，三指解除');
  showToast('速度模块 v11.1 已启动', 2000);
})();
