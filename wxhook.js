/* =============================================================
 * wxhook.js 合并版 —— 动态时间作弊（轮询驱动）+ 广告Hook + 传送带档位
 * -------------------------------------------------------------
 *  模块⓪ 性能守卫 v11.2（iOS 发热/卡顿修复）
 *         真机全静默 console（LogManager 零开销）、Toast 防抖、
 *         哨兵失效自动降级（地址漂移后不再持续写内存）
 *  模块① 倒计时锚点哨兵 v10（修正状态误判）
 *         LeftTime@0x319eb54，偏移量 60000 秒，
 *         轮询内存值动态触发提示和重置，并在关闭分支增加5分钟阈值修正
 *  模块② 广告 Hook v1
 *  模块③ 速度模块 v11.1 + 失效降级（哨兵检测地址漂移自动解除）
 *  附加  内存扫描套件 v6.1
 * -------------------------------------------------------------
 *  手势：上方88%双指 → 速度过滤，下方12%双指 → 时间作弊开关
 *  真机想看日志：控制台执行 GameGlobal.perfRestoreConsole()
 * ============================================================= */

/* ============ [模块⓪] 性能守卫 —— iOS 发热/越玩越卡修复 ============ */
/* 2026-09-04 病因分析（安卓正常/苹果越玩越卡越烫）：
 *  ① 真机上每条 console.log 都进微信 LogManager（内存缓冲+字符串拼接），
 *     游戏的 [PLUGIN MONITOR] 每秒打 5 条带堆栈的日志 + 本 hook 各模块日志
 *     → iOS JSC 上持续 GC 压力+发热，玩得越久缓冲越大越卡
 *  ② 速度哨兵(300ms)在关卡切换地址漂移后，把 5.0 持续写进已回收的堆槽
 *     → 若被 Unity 复用成活字段（时间缩放/物理参数），等于持续破坏游戏内存
 *  ③ 倒计时哨兵(800ms)在锚点失效后高频"检测到正常倒计时"写值+日志轰炸
 *  修复：真机 console 全静默 / Toast 防抖 / 两哨兵失效自动降级停写 */
var __wxPerf = (function () {
  'use strict';
  var G = (typeof GameGlobal !== 'undefined') ? GameGlobal : {};
  if (G.__perfGuard) return G.__perfGuard;

  var isDevtools = false;
  try {
    var pi = (wx.getSystemInfoSync() || {}).platform;
    isDevtools = (pi === 'devtools');
  } catch (e) {}

  /* Toast 防抖：同名文案最小间隔（防哨兵 300ms 连环弹原生 UI） */
  var __lastToast = {};
  function throttledToast(msg, dur) {
    var now = Date.now();
    if (__lastToast[msg] && now - __lastToast[msg] < 1500) return;
    __lastToast[msg] = now;
    try {
      wx.showToast({ title: msg, icon: 'none', duration: dur || 2000, mask: false });
    } catch (e) {}
  }

  /* 真机 console 全静默：不进 LogManager = 零内存/GC 开销 */
  var silenced = false;
  var orig = {
    log: console.log, info: console.info, warn: console.warn,
    debug: console.debug, error: console.error
  };
  function silence() {
    if (silenced) return;
    silenced = true;
    ['log', 'info', 'warn', 'debug', 'error'].forEach(function (k) {
      try { console[k] = function () {}; } catch (e) {}
    });
  }

  /* 噪音过滤：微信插件/基础库的刷屏日志（devtools 也生效）
   * PLUGIN MONITOR / PLUGIN LOG 来自官方 UnityPlugin（plugin.js），无公开开关
   * wxapplib 来自微信小游戏基础库 —— 只能在 console 层拦 */
  var NOISE_RE = /\[PLUGIN MONITOR|\[PLUGIN LOG|wxapplib|预下载监控/i;
  var noiseFilterOn = true;
  function installNoiseFilter() {
    ['log', 'info', 'warn', 'debug'].forEach(function (k) {
      try {
        console[k] = function () {
          if (!noiseFilterOn) { orig[k].apply(console, arguments); return; }
          for (var i = 0; i < arguments.length; i++) {
            var a = arguments[i];
            if (typeof a === 'string' && NOISE_RE.test(a)) return;   // 丢弃
          }
          orig[k].apply(console, arguments);
        };
      } catch (e) {}
    });
  }
  function uninstallNoiseFilter() {
    ['log', 'info', 'warn', 'debug'].forEach(function (k) {
      try { console[k] = orig[k]; } catch (e) {}
    });
  }
  /* 切换噪音过滤（诊断时想看插件日志就执行一次） */
  G.perfToggleNoise = function () {
    noiseFilterOn = !noiseFilterOn;
    if (!noiseFilterOn) uninstallNoiseFilter(); else installNoiseFilter();
    try { (orig.log || console.log)('[perf] 噪音过滤已' + (noiseFilterOn ? '开启' : '关闭')); } catch (e) {}
    return noiseFilterOn;
  };

  if (!isDevtools) silence();
  else installNoiseFilter();   /* 开发者工具：过滤刷屏但保留游戏/自家日志 */

  G.perfRestoreConsole = function () {
    if (silenced) {
      silenced = false;
      uninstallNoiseFilter();
      ['log', 'info', 'warn', 'debug', 'error'].forEach(function (k) {
        try { console[k] = orig[k]; } catch (e) {}
      });
      (orig.log || function () {})('[perf] console 已恢复（真机调试模式，注意发热）');
    } else {
      uninstallNoiseFilter();
      noiseFilterOn = false;
      (orig.log || function () {})('[perf] 噪音过滤已关闭（诊断模式）');
    }
  };

  var api = {
    isDevtools: isDevtools,
    silenced: function () { return silenced; },
    toast: throttledToast
  };
  G.__perfGuard = api;
  return api;
})();

/* ============ [模块①] 倒计时锚点哨兵 v10 —— 自适应地址版 ============ */
(function () {
  'use strict';
  var G = typeof GameGlobal !== 'undefined' ? GameGlobal : {};
  if (G.__hookV5) { console.log('[wxhook] 已加载'); return; }

  // ---- 候选地址与动态锚点 ----
  var CANDIDATE_ADDRS = [0x319eb54, 0x3180b54];
  var currentAnchor = null;          // 实际使用的地址
  var TARGET_SEC  = 60000;           // 偏移量 = 1000 分钟
  var timeCheatOn = true;           // 默认开启
  var originalLevelTime = null;     // 原定关卡时间（秒）
  var pollTimer = null;            // 轮询定时器句柄
  var triggered30 = false;         // 当前周期是否已触发30秒提示
  var triggered10 = false;         // 当前周期是否已触发10秒提示

  G.__timeCheatOn = true;

  // ---- 本地存储辅助 ----
  function getStoredAnchor() {
    try {
      if (typeof wx !== 'undefined' && wx.getStorageSync) {
        var stored = wx.getStorageSync('wxhook_anchor');
        if (stored && typeof stored === 'number' && stored > 0) return stored;
      }
    } catch(e) {}
    return null;
  }
  function saveAnchor(addr) {
    try {
      if (typeof wx !== 'undefined' && wx.setStorageSync) {
        wx.setStorageSync('wxhook_anchor', addr);
      }
    } catch(e) {}
  }

  // ---- 内存访问工具（使用 currentAnchor；DataView 缓存避免每 tick 分配） ----
  var __dv = null, __dvBuf = null;
  function getDV() {
    if (!G.wasmmemReady()) return null;
    var buf = G.getWasmMem().buffer;
    if (__dvBuf !== buf) { __dvBuf = buf; __dv = new DataView(buf); }
    return __dv;
  }
  function getAnchorValue() {
    if (!G.wasmmemReady() || !currentAnchor) return NaN;
    var dv = getDV();
    if (!dv) return NaN;
    return dv.getFloat32(currentAnchor, true);
  }
  function setAnchorValue(val) {
    if (!G.wasmmemReady() || !currentAnchor) return;
    var dv = getDV();
    if (!dv) return;
    dv.setFloat32(currentAnchor, val, true);
  }
  function isNormal(v) {
    return Number.isFinite(v) && v > 10 && v < 600;
  }

  function showToast(msg, dur) {
    dur = dur || 2000;
    if (typeof __wxPerf !== 'undefined' && __wxPerf.toast) {
      __wxPerf.toast(msg, dur);   // 防抖版：防哨兵连环弹原生 UI
      return;
    }
    try {
      if (typeof wx !== 'undefined' && wx.showToast) {
        wx.showToast({ title: msg, icon: 'none', duration: dur });
      } else {
        console.log('[toast] ' + msg);
      }
    } catch (e) {
      console.log('[toast] ' + msg);
    }
  }

  /* ========== 轮询核心 ========== */
  function pollLoop() {
    if (!timeCheatOn || !G.wasmmemReady() || !currentAnchor) return;
    try {
      var cur = getAnchorValue();
      if (!Number.isFinite(cur) || cur < 0) return;

      // 真实剩余时间 = 当前值 - 偏移量
      var real = cur - TARGET_SEC;

      // 如果 real <= 0，表示周期结束
      if (real <= 0) {
        // 重置周期
        if (originalLevelTime !== null && originalLevelTime > 0) {
          showToast('作弊前的时间已经到了，现在重新计时', 3000);
          setAnchorValue(originalLevelTime + TARGET_SEC);
          // 重置提示标记
          triggered30 = false;
          triggered10 = false;
          console.log('[timeCheat] 周期重置，新值 = ' + (originalLevelTime + TARGET_SEC).toFixed(0));
        } else {
          console.warn('[timeCheat] 无原始关卡时间，无法重置');
        }
        return;
      }

      // 触发30秒提示
      if (real <= 30 && !triggered30) {
        triggered30 = true;
        showToast('作弊前的30秒倒计时', 2000);
        console.log('[timeCheat] 30秒提示触发');
      }
      // 触发10秒提示
      if (real <= 10 && !triggered10) {
        triggered10 = true;
        showToast('作弊前的10秒倒计时', 2000);
        console.log('[timeCheat] 10秒提示触发');
      }
    } catch (e) {
      // 忽略轮询错误
    }
  }

  /* ========== 启动/停止轮询 ========== */
  function startPoll() {
    if (pollTimer) return;
    pollTimer = setInterval(pollLoop, 500);  // 每0.5秒检查一次
    console.log('[timeCheat] 轮询已启动');
  }
  function stopPoll() {
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
      console.log('[timeCheat] 轮询已停止');
    }
  }

  // ---- 切换作弊（使用 currentAnchor） ----
  G.toggleTimeCheat = function () {
    if (!currentAnchor) { showToast('地址未确定', 1500); return; }
    var current = getAnchorValue();
    if (!Number.isFinite(current) || current < 0) {
      showToast('当前时间无效', 1500);
      return;
    }

    if (timeCheatOn) {
      // ========= 关闭作弊分支 =========
      // ★ 修正：如果当前内存值小于300秒（5分钟），视为尚未作弊，强制转为开启状态
      if (current < 300) {
        // 将内部状态设为未开启
        timeCheatOn = false;
        G.__timeCheatOn = false;
        // 重新调用自身，进入开启分支
        G.toggleTimeCheat();
        return;
      }

      var newVal = current - TARGET_SEC;
      if (newVal <= 0) {
        showToast('不宜减少，无法关闭', 2000);
        console.log('[timeCheat] 关闭失败：current=' + current + ', newVal=' + newVal);
        return;
      }
      setAnchorValue(newVal);
      timeCheatOn = false;
      G.__timeCheatOn = false;
      stopPoll();
      // 重置提示标记（避免下次开启时残留）
      triggered30 = false;
      triggered10 = false;
      showToast('作弊已关闭，恢复时间', 2000);
      console.log('%c[timeCheat] 作弊关闭，内存设为 ' + newVal.toFixed(0), 'color:#d00;font-weight:bold');
    } else {
      // ----- 开启作弊 -----
      // 如果 originalLevelTime 为空且当前值是正常范围，则记录
      if (originalLevelTime === null && isNormal(current)) {
        originalLevelTime = current;
        console.log('[timeCheat] 记录原定关卡时间: ' + originalLevelTime.toFixed(0) + '秒');
      }
      // 无条件增加偏移
      setAnchorValue(current + TARGET_SEC);
      timeCheatOn = true;
      G.__timeCheatOn = true;
      // 重置提示标记（新周期开始）
      triggered30 = false;
      triggered10 = false;
      showToast('开启时间作弊');
      console.log('%c[timeCheat] 作弊开启，内存增加 ' + TARGET_SEC + ' 秒', 'color:#0a0;font-weight:bold');
      // 启动轮询（如果未启动）
      startPoll();
    }
  };

  /* ========== 哨兵（辅助保护） ========== */
  /* v11.2 性能守卫：patrol 写节流 + 锚点漂移自动关闭
   * 病灶：关卡切换/版本更新后锚点失效，若旧地址的垃圾值恰好在 (10,600)，
   * patrol 每 800ms 写一次+打一条日志 → 真机 LogManager 轰炸 + 持续写脏数据 */
  var __patrolHits = [];
  function patrol() {
    if (!timeCheatOn || !G.wasmmemReady() || !currentAnchor) return;
    try {
      var v = getAnchorValue();
      if (isNormal(v)) {
        // 漂移检测：20 秒内命中 ≥6 次 = 地址大概率已失效（正常一关只重置 1 次）
        var now = Date.now();
        __patrolHits.push(now);
        while (__patrolHits.length && now - __patrolHits[0] > 20000) __patrolHits.shift();
        if (__patrolHits.length >= 6) {
          timeCheatOn = false;
          G.__timeCheatOn = false;
          stopPoll();
          try { wx.removeStorageSync('wxhook_anchor'); } catch (e) {}
          currentAnchor = null;
          __patrolHits = [];
          showToast('时间作弊已自动关闭(锚点漂移)', 2500);
          console.warn('[timeCheat] 锚点漂移自动关闭：20s内命中' + 6 + '次，已停写+清除存储地址');
          return;
        }
        // 游戏重置了倒计时，重新增加偏移
        if (originalLevelTime === null) {
          originalLevelTime = v;
          console.log('[timeCheat] 哨兵记录原定关卡时间: ' + originalLevelTime.toFixed(0) + '秒');
        }
        setAnchorValue(v + TARGET_SEC);
        var t = new Date().toLocaleTimeString();
        console.log('%c⚡[' + t + '] 哨兵检测到正常倒计时(' + v.toFixed(1) + 's) → 已增加 ' + TARGET_SEC + ' 秒', 'color:#d00;font-weight:bold');
        // 重置提示标记（因为新周期开始）
        triggered30 = false;
        triggered10 = false;
        // 确保轮询在运行
        if (!pollTimer && timeCheatOn) startPoll();
      }
    } catch (e) {}
  }

  // ---- 地址检测与初始化 ----
  function initAnchor() {
    if (!G.wasmmemReady()) return false;
    // 1. 尝试读取存储的地址
    var stored = getStoredAnchor();
    if (stored) {
      try {
        var val = new DataView(G.getWasmMem().buffer).getFloat32(stored, true);
        if (Number.isFinite(val) && val > 10) {
          currentAnchor = stored;
          console.log('[timeCheat] 使用存储的地址: 0x' + stored.toString(16));
          return true;
        } else {
          // 存储的地址无效，清除
          try { wx.removeStorageSync('wxhook_anchor'); } catch(e) {}
        }
      } catch(e) {}
    }
    // 2. 检测候选地址
    for (var i = 0; i < CANDIDATE_ADDRS.length; i++) {
      var addr = CANDIDATE_ADDRS[i];
      try {
        var val = new DataView(G.getWasmMem().buffer).getFloat32(addr, true);
        if (Number.isFinite(val) && val > 10) {
          currentAnchor = addr;
          saveAnchor(addr);
          console.log('[timeCheat] 检测到有效地址: 0x' + addr.toString(16));
          return true;
        }
      } catch(e) {}
    }
    return false;
  }

  // ---- 启动流程 ----
  var waitTimer = setInterval(function () {
    if (G.wasmmemReady()) {
      // 尝试确定地址
      if (!currentAnchor) {
        if (!initAnchor()) {
          // 地址未确定，继续等待
          return;
        }
      }
      // 地址已确定，执行原有初始化
      clearInterval(waitTimer);
      // 默认开启
      if (timeCheatOn) {
        var initVal = getAnchorValue();
        if (isNormal(initVal)) {
          originalLevelTime = initVal;
          setAnchorValue(initVal + TARGET_SEC);
          console.log('%c[init] 初始开启，原定时间=' + initVal.toFixed(0) + '，已增加 ' + TARGET_SEC + ' 秒', 'color:#0a0;font-weight:bold');
          triggered30 = false;
          triggered10 = false;
          startPoll();
        } else {
          console.log('[init] 当前值异常，等待正常倒计时出现');
        }
      }
      // 哨兵每0.8秒运行
      setInterval(patrol, 800);
    }
  }, 500);

  // ---- 暴露工具（增加 setAnchorAddr 手动设置） ----
  G.getWasmMem = function () {
    if (G.Module && G.Module.HEAPU8 && G.Module.HEAPU8.buffer) return G.Module.HEAPU8;
    return G.EMSCRIPTEN_HEAPU8 || null;
  };
  G.wasmmemReady = function () {
    var h = G.getWasmMem();
    return !!(h && h.buffer && h.buffer.byteLength > 1024);
  };
  G.anchorVal = function () {
    if (!G.wasmmemReady() || !currentAnchor) return '(未就绪)';
    var v = new DataView(G.getWasmMem().buffer).getFloat32(currentAnchor, true);
    return Number.isFinite(v) ? v.toFixed(2) : 'NaN';
  };
  G.setAnchor = function (sec) {
    if (!G.wasmmemReady() || !currentAnchor) return console.warn('未就绪或地址未确定');
    new DataView(G.getWasmMem().buffer).setFloat32(currentAnchor, sec || TARGET_SEC, true);
    console.log('[setAnchor] 已写入', sec || TARGET_SEC);
  };
  G.setAnchorAddr = function (addr) {
    if (typeof addr !== 'number' || addr <= 0) return console.warn('无效地址');
    currentAnchor = addr;
    saveAnchor(addr);
    console.log('[setAnchorAddr] 手动设置地址: 0x' + addr.toString(16));
  };
  G.relocate = function (low, high) {
    console.warn('请使用以下流程重新定位：');
    console.log(' ① GameGlobal.rscan(' + low + ',' + high + ')');
    console.log(' ② 让它走 6 秒后：snap(); rdiff(6,2)');
    console.log(' ③ 把命中的新地址替换到 CANDIDATE_ADDRS 数组中');
  };

  G.G = G;
  G.__hookV5 = true;
  console.log('%c[wxhook 自适应地址版] 倒计时模块已装载', 'color:#0a0;font-weight:bold',
    '\n自动检测候选地址：' + CANDIDATE_ADDRS.map(a => '0x' + a.toString(16)).join(', '),
    '\n检测到的地址会存入本地存储，下次启动直接使用');
})();

/* ============ [模块②] 广告 Hook ============ */
(function () {
  if (wx.createRewardedVideoAd && wx.createRewardedVideoAd.__wxhookAd) {
    console.log('[AD-Hook] 已加载'); return;
  }
  var _origCreate = wx.createRewardedVideoAd;
  wx.createRewardedVideoAd = function () {
    console.log('%c[AD] createRewardedVideoAd 被调用', 'color:#c60;font-weight:bold');
    var ad = _origCreate.apply(this, arguments);
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

/* ============ [模块③] 速度模块 v11.1（上方88%区域双指过滤） ============ */
(function () {
  'use strict';
  var globalObj = (typeof GameGlobal !== 'undefined') ? GameGlobal :
                  (typeof window !== 'undefined') ? window : global;
  if (globalObj.__speedV11) { console.log('[speed] 已加载'); return; }

  function showToast(msg, dur) {
    dur = dur || 2000;
    if (globalObj.toast && typeof globalObj.toast === 'function') {
      globalObj.toast(msg, dur);
    } else if (typeof __wxPerf !== 'undefined' && __wxPerf.toast) {
      __wxPerf.toast(msg, dur);   // v11.2 防抖：防哨兵连环弹原生 UI
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

  var screenHeight = 0;
  try {
    var sysInfo = wx.getSystemInfoSync();
    screenHeight = sysInfo.windowHeight || sysInfo.screenHeight || 0;
  } catch (e) {}
  if (!screenHeight) {
    try { if (typeof window !== 'undefined' && window.innerHeight) screenHeight = window.innerHeight; } catch (e) {}
  }
  if (!screenHeight) screenHeight = 800;
  console.log('[speed] 屏幕高度 = ' + screenHeight + '，下方12%阈值 = ' + (screenHeight * 0.88));

  var SPEED_TARGET = 5;
  var state = 'IDLE';
  var MAXC = 2200000;
  var pAddr, pVal, pType;
  /* v11.2 懒分配：首次三指快照才申请 ~37MB（不点三指 = 零常驻内存） */
  function ensureBuffers() {
    if (pAddr) return true;
    try {
      pAddr = new Float64Array(MAXC);
      pVal  = new Float64Array(MAXC);
      pType = new Uint8Array(MAXC);
    } catch (e) { pAddr = null; return false; }
    return true;
  }
  var pLen = 0;
  var locked = [];
  var bufId = null, f32v = null, i32v = null;
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
    if (!views() || !ensureBuffers()) return false;
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
    var pick = -1;
    if (pLen === 1) pick = 0;
    else if (pLen === 3) {
      if (pType[1] === 1) pick = 1;
      else { for (var r = 0; r < pLen; r++) { if (pType[r] === 1) { pick = r; break; } } if (pick < 0) pick = 1; }
    } else {
      for (var r = 0; r < pLen; r++) { if (pType[r] === 1) { pick = r; break; } }
      if (pick < 0) pick = (pLen === 1) ? 0 : 1;
    }
    if (pick < 0 || pick >= pLen) pick = 0;
    var A = pAddr[pick], T = pType[pick], V0 = readVal(T, A >> 2);
    locked = [{ a: A, t: T, v0: V0 }];
    writeVal(T, A >> 2, SPEED_TARGET);
    state = 'LOCKED';
    console.log('%c[speed] ★ 锁定 0x' + A.toString(16) + ' -> ' + SPEED_TARGET + '倍', 'color:#0a0;font-weight:bold');
    showToast('已锁定5倍 三指解除', 2500);
  }

  function quadFinger() {
    if (state !== 'SCAN') return;
    if (!views() || !pLen) { showToast('候选为空 请重新三指', 1500); state = 'IDLE'; return; }
    var filterVal = stepValues[stepIndex];
    applyFilter(filterVal);
    stepIndex = (stepIndex + 1) % stepValues.length;
    if (pLen === 0) { showToast('候选:0 请重新三指', 2000); state = 'IDLE'; return; }
    if (pLen <= 3) { showToast('候选:' + pLen + ' 自动锁定...', 1500); lockSelect(); return; }
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
    } else {
      for (var k = 0; k < locked.length; k++) {
        var L = locked[k];
        writeVal(L.t, L.a >> 2, L.v0);
      }
      locked = [];
      state = 'IDLE';
      showToast('已恢复原生倍速', 1500);
    }
  }

  // 哨兵维持5倍（v11.2 失效降级版）
  /* 病灶：关卡切换后速度对象地址漂移（运行时副本重建），旧地址被 Unity 回收复用，
   * 原版对任何异常值都无条件写 5.0 → 每 300ms 往活游戏内存里塞脏数据（iOS 上
   * 越玩越卡越烫的元凶之一：破坏的字段若是时间缩放/物理参数 = 持续高负载）
   * 修复：连续 8 拍(~2.4s)读到非{1,2,3,5}值 → 判定漂移 → 自动解除+停止写入 */
  var __sentBad = 0;
  setInterval(function () {
    if (state !== 'LOCKED' || !views()) return;
    try {
      for (var k = locked.length - 1; k >= 0; k--) {
        var L = locked[k];
        var v = readVal(L.t, L.a >> 2);
        if (!Number.isFinite(v)) {          // NaN/Inf：地址必然失效
          __sentBad += 8;
        } else if (isNat(v)) {
          L.v0 = v; writeVal(L.t, L.a >> 2, SPEED_TARGET); __sentBad = 0;
        } else if (v === SPEED_TARGET) {
          __sentBad = 0;                     // 我们自己写的值，正常
        } else {
          __sentBad++;                       // 陌生值：地址可能已被复用，先观察不写
        }
      }
      if (__sentBad >= 8) {
        locked = [];
        state = 'IDLE';
        __sentBad = 0;
        showToast('速度锁定已失效(地址漂移) 重新三指', 2500);
        console.warn('[speed] 哨兵降级：连续异常值，已停止写入并解除锁定');
        return;
      }
    } catch (e) {
      locked = [];
      state = 'IDLE';
      showToast('锚点失效 请重新三指', 1500);
    }
  }, 300);

  // 手势路由（区域划分）
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
        var touches = e.touches;
        var bottomThreshold = screenHeight * 0.88;
        var allBottom = true, allTop = true;
        for (var i = 0; i < touches.length; i++) {
          var y = touches[i].clientY;
          if (y < bottomThreshold) allBottom = false;
          if (y >= bottomThreshold) allTop = false;
        }
        if (allBottom) {
          // 下方12%区域 → 切换时间作弊
          if (globalObj.toggleTimeCheat) {
            globalObj.toggleTimeCheat();
          }
          return;
        } else if (allTop) {
          // 上方88%区域 → 速度过滤
          if (now - __lastQuad < 800) return;
          __lastQuad = now;
          quadFinger();
        }
      }
    });
  } catch (e) {}

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
  console.log('%c[wxhook v11.1] 速度模块已装载', 'color:#0a0;font-weight:bold',
    '\n流程：三指扫描 → 双指按序过滤（3→1→设置→2→1循环）',
    '\n候选≤3自动锁定5倍，三指解除',
    '\n双指操作区域：上方88%（速度过滤），下方12%（时间作弊开关）');
  showToast('速度模块 v11.1 已启动', 2000);
})();

/* ============ 内存扫描套件 v6.1 ============ */
(function () {
  'use strict';
  var G = typeof GameGlobal !== 'undefined' ? GameGlobal : {};
  if (G.__vscan) { console.log('[vscan] 已加载'); return; }

  var __cands = [];
  var __lastVal = 0;

  function dv() {
    if (!G.wasmmemReady || !G.wasmmemReady()) return null;
    return new DataView(G.getWasmMem().buffer);
  }
  function fmt(a) { return '0x' + a.toString(16); }

  G.vscan = function (value) {
    var d = dv();
    if (!d) return console.warn('[vscan] wasm内存未就绪');
    if (typeof value !== 'number' || value <= 0) return console.warn('[vscan] 请传入正数');
    __cands = [];
    __lastVal = value;
    var len = d.byteLength - 4;
    for (var a = 0; a < len; a += 4) {
      if (d.getInt32(a, true) === value) __cands.push({ a: a, t: 'i' });
    }
    var fv = value;
    for (var a2 = 0; a2 < len; a2 += 4) {
      if (d.getFloat32(a2, true) === fv) __cands.push({ a: a2, t: 'f' });
    }
    console.log('%c[vscan] 首扫 ' + value + ' → ' + __cands.length + ' 个候选', 'color:#06c;font-weight:bold');
    if (__cands.length === 0) {
      console.warn('没找到！可能存的是"等级索引"：显示2倍速时索引是1，试 GameGlobal.vscan(1)');
    } else {
      G.vlist();
    }
    return __cands.length;
  };

  G.vfilter = function (newValue) {
    var d = dv();
    if (!d) return console.warn('[vfilter] wasm内存未就绪');
    if (!__cands.length) return console.warn('[vfilter] 先跑 GameGlobal.vscan');
    var keep = [];
    for (var i = 0; i < __cands.length; i++) {
      var c = __cands[i];
      var v = c.t === 'i' ? d.getInt32(c.a, true) : d.getFloat32(c.a, true);
      if (v === newValue) keep.push(c);
    }
    var dropped = __cands.length - keep.length;
    __cands = keep;
    console.log('%c[vfilter] ' + __lastVal + ' → ' + newValue + '：淘汰 ' + dropped + '，剩 ' + __cands.length + ' 个', 'color:#06c;font-weight:bold');
    __lastVal = newValue;
    G.vlist();
    return __cands.length;
  };

  G.vkeep = function () { return G.vfilter(__lastVal); };

  G.vlist = function () {
    if (!__cands.length) { console.log('[vlist] 无候选'); return []; }
    var d = dv();
    var lines = [];
    __cands.slice(0, 30).forEach(function (c) {
      var v = d ? (c.t === 'i' ? d.getInt32(c.a, true) : d.getFloat32(c.a, true)) : '?';
      lines.push('  ' + fmt(c.a) + ' (' + (c.t === 'i' ? 'int' : 'float') + ') = ' + v +
        '  验证: GameGlobal.vwrite(' + fmt(c.a) + ', 10)');
    });
    console.log('[vlist] ' + __cands.length + ' 个候选（前' + Math.min(30, __cands.length) + '）：\n' + lines.join('\n'));
    if (__cands.length === 1) {
      console.log('%c★ 只剩1个候选！99%就是它 → GameGlobal.vwrite(' + fmt(__cands[0].a) + ', 10) 验证，界面/速度有变化就 GameGlobal.vwatch(' + fmt(__cands[0].a) + ', 10) 锁定', 'color:#0a0;font-weight:bold');
    }
    return __cands;
  };

  G.vwrite = function (addr, val) {
    var d = dv();
    if (!d) return console.warn('[vwrite] wasm内存未就绪');
    var t = 'i';
    for (var i = 0; i < __cands.length; i++) {
      if (__cands[i].a === addr) { t = __cands[i].t; break; }
    }
    if (t === 'i') d.setInt32(addr, val, true);
    else d.setFloat32(addr, val, true);
    console.log('%c[vwrite] ' + fmt(addr) + ' ← ' + val + '（' + (t === 'i' ? 'int' : 'float') + '）看游戏有没有变化！', 'color:#d00;font-weight:bold');
    return true;
  };

  var __watchTimer = null;
  G.vwatch = function (addr, val) {
    G.vunwatch();
    var d = dv();
    if (!d) return console.warn('[vwatch] wasm内存未就绪');
    var t = 'i';
    for (var i = 0; i < __cands.length; i++) {
      if (__cands[i].a === addr) { t = __cands[i].t; break; }
    }
    __watchTimer = setInterval(function () {
      try {
        var dd = dv();
        if (!dd) return;
        if (t === 'i') dd.setInt32(addr, val, true);
        else dd.setFloat32(addr, val, true);
      } catch (e) {}
    }, 500);
    console.log('%c[vwatch] ★ 已锁定 ' + fmt(addr) + ' = ' + val + '（每0.5秒覆写）', 'color:#0a0;font-weight:bold');
    return true;
  };
  G.vunwatch = function () {
    if (__watchTimer) { clearInterval(__watchTimer); __watchTimer = null; console.log('[vwatch] 已解除'); }
    return true;
  };

  G.vpump = function (cur) {
    var r = G.vscan(cur);
    if (r === undefined || r === 0) return r;
    console.log('%c[vpump] 倍速连环过滤开始！接下来：', 'color:#c60;font-weight:bold',
      '\n① 点倍速按钮（2x→3x），然后 GameGlobal.vfilter(3)',
      '\n② 再点（3x→1x），然后 GameGlobal.vfilter(1)',
      '\n③ 再点（1x→2x），然后 GameGlobal.vfilter(2)',
      '\n④ 重复几轮直到候选 < 10 个',
      '\n⑤ GameGlobal.vlist() → 逐个 GameGlobal.vwrite(地址, 10)',
      '\n   看豆子/传送带速度有没有暴走',
      '\n⑥ 找到后 GameGlobal.vwatch(地址, 10) 永久10倍');
    return r;
  };

  G.__vscan = true;
  console.log('%c[vscan v6.1] 装载完成（控制台使用 GameGlobal. 前缀）', 'color:#0a0;font-weight:bold',
    '\n=== 倍速 10x 定位流程 ===',
    '\n1. 进关卡，看当前倍速数字（比如 2x）',
    '\n2. GameGlobal.vpump(2)',
    '\n3. 按提示每点一次倍速按钮调一次 GameGlobal.vfilter(新数字)',
    '\n4. 候选剩个位数后逐个 vwrite(地址,10) 试速度',
    '\n5. 确认后 GameGlobal.vwatch(地址, 10) 锁定');
})();

/* ============ [模块④] 倒计时手动扫描工具箱（来自 v4） ============ */
(function () {
  'use strict';
  var G = typeof GameGlobal !== 'undefined' ? GameGlobal : {};
  if (G.__hookScan) { console.log('[scan-tool] 已加载'); return; }

  // ----- 复用已有的 wasm 访问函数 -----
  function getMem() { return G.getWasmMem ? G.getWasmMem() : null; }
  function memReady() { return G.wasmmemReady ? G.wasmmemReady() : false; }

  // ----- 扫描三件套 -----
  G.rscan = function (low, high) {
    var buf = getMem();
    if (!buf) { console.warn('[rscan] 内存未就绪'); return 0; }
    var f32 = new Float32Array(buf.buffer), i32 = new Int32Array(buf.buffer);
    var map = {}, loMs = Math.max(1024, low * 1000), hiMs = high * 1000;
    for (var i = 262144; i < f32.length; i++) {
      var fv = f32[i];
      if (fv >= low && fv <= high && fv === fv) { map[i << 2] = 'f32'; continue; }
      var iv = i32[i];
      if (iv >= loMs && iv <= hiMs) map[i << 2] = 'i32ms';
    }
    G.__cand = Object.keys(map).map(function (a) {
      return { a: +a, t: map[a], last: undefined };
    });
    console.log('[rscan]', low + '~' + high + 's 候选:', G.__cand.length);
    if (G.__cand.length <= 30) G.list();
    return G.__cand.length;
  };

  function _read(c, dv) {
    return c.t === 'i32ms' ? dv.getInt32(c.a, true) / 1000 : dv.getFloat32(c.a, true);
  }

  G.snap = function () {
    if (!G.__cand || !G.__cand.length) return console.warn('[snap] 先 rscan');
    var dv = new DataView(getMem().buffer);
    G.__snapT = Date.now();
    G.__cand.forEach(function (c) { c.last = _read(c, dv); });
    console.log('[snap] 已记录', G.__cand.length, '个基准值');
  };

  // G.rdiff = function (dropSec, eps) {
  //   if (!G.__cand || !G.__cand.length) return 0;
  //   var dv = new DataView(getMem().buffer);
  //   if (dropSec == null) dropSec = (Date.now() - (G.__snapT || Date.now())) / 1000;
  //   if (eps == null) eps = Math.max(1, dropSec * 0.45);
  //   G.__cand = G.__cand.filter(function (c) {
  //     var now = _read(c, dv);
  //     return now >= 0 && now < 36000 &&
  //            Math.abs((c.last - now) - dropSec) < eps;
  //   });
  //   console.log('[rdiff] 预期↓' + dropSec.toFixed(1) + 's 剩:', G.__cand.length);
  //   if (G.__cand.length <= 10) G.list();
  //   return G.__cand.length;
  // };
  G.rdiff = function (dropSec, eps) {
    if (!G.__cand || !G.__cand.length) return 0;
    var dv = new DataView(getMem().buffer);
    if (dropSec == null) dropSec = (Date.now() - (G.__snapT || Date.now())) / 1000;
    if (eps == null) eps = Math.max(1, dropSec * 0.45);
    G.__cand = G.__cand.filter(function (c) {
      var now = _read(c, dv);
      return now >= 0 && now < 36000 &&
             Math.abs((c.last - now) - dropSec) < eps;
    });
    console.log('[rdiff] 预期↓' + dropSec.toFixed(1) + 's 剩:', G.__cand.length);
    if (G.__cand.length <= 10) {
      try {
        G.list();   // 如果 list 内部出错（比如 console.table 不可用），不会中断 rdiff
      } catch (e) {
        console.warn('[rdiff] 列表输出失败，但过滤结果有效', e);
      }
    }
    return G.__cand.length;
  };
  // G.list = function () {
  //   if (!G.__cand || !G.__cand.length) return console.warn('无候选');
  //   var dv = new DataView(getMem().buffer);
  //   console.table(G.__cand.map(function (c) {
  //     return { addr: '0x' + c.a.toString(16), type: c.t,
  //              cur: (+_read(c, dv)).toFixed(2),
  //              last: c.last == null ? '-' : (+c.last).toFixed(2) };
  //   }));
  // };
  G.list = function () {
    if (!G.__cand || !G.__cand.length) return console.warn('无候选');
    var dv = new DataView(getMem().buffer);
    var lines = [];
    G.__cand.forEach(function (c) {
      var cur = +_read(c, dv);
      var last = c.last == null ? '-' : (+c.last).toFixed(2);
      lines.push('  ' + '0x' + c.a.toString(16) + ' (' + c.t + ') cur=' + cur.toFixed(2) + ' last=' + last);
    });
    console.log('[list] 候选列表（共 ' + G.__cand.length + ' 个）:\n' + lines.join('\n'));
  };
  // ----- 写入 -----
  G.poke = function (addr, sec) {
    var a = typeof addr === 'string' ? parseInt(addr, 16) : addr;
    var c = (G.__cand || []).find(function (x) { return x.a === a; });
    var dv = new DataView(getMem().buffer);
    if (c && c.t === 'i32ms') dv.setInt32(a, Math.round(sec * 1000), true);
    else dv.setFloat32(a, sec, true);
    console.log('[poke] 0x' + a.toString(16), '←', sec);
  };

  G.set = function (sec) {
    if (!G.__cand || !G.__cand.length) return console.warn('请先 rscan/addTime');
    var dv = new DataView(getMem().buffer);
    G.__cand.forEach(function (c) {
      if (c.t === 'i32ms') dv.setInt32(c.a, Math.round(sec * 1000), true);
      else dv.setFloat32(c.a, sec, true);
    });
    console.log('%c[set] ' + G.__cand.length + ' 个地址 → ' + sec + ' 秒',
                'color:#0a0;font-weight:bold');
  };

  // ----- 一键加时（半自动） -----
  G.addTime = async function (targetSec) {
    targetSec = targetSec || 60000;
    if (!memReady()) return console.warn('内存未就绪');
    console.log('%c[addTime] 开始…这 30 秒请留在本关并让它自然倒数', 'color:#06c;font-weight:bold');

    G.rscan(196, 620);
    if (!G.__cand.length) {
      console.warn('扫不到东西：请先点击豆子启动倒计时，再重新执行 addTime');
      return;
    }
    var round = 0;
    while (G.__cand.length > 1 && round < 4) {
      round++;
      await new Promise(function (r) { setTimeout(r, 5200); });
      G.snap();
      await new Promise(function (r) { setTimeout(r, 200); });
      G.rdiff();
      if (!G.__cand.length) return console.warn('候选全灭，请等几秒重试 addTime');
    }
    G.set(targetSec);
    console.log('%c✅ 完成！剩余时间 → ' + targetSec + ' 秒 (' +
      G.__cand.map(function (c) { return '0x' + c.a.toString(16); }).join(', ') + ')',
      'color:#d00;font-weight:bold');
  };

  // ----- 全自动哨兵 -----
  G._ap = { on: false, timer: null, st: 'idle', list: null, v0: null,
            t0: 0, lastFire: 0, idleLast: 0, busy: false };

  function _apVals(arr) {
    var dv = new DataView(getMem().buffer), o = [];
    for (var i = 0; i < arr.length; i++) o.push(dv.getFloat32(arr[i], true));
    return o;
  }

  async function _apTick() {
    var A = G._ap;
    if (!A.on || A.busy || !memReady()) return;
    A.busy = true;
    try {
      var f32 = new Float32Array(getMem().buffer);

      if (A.st === 'idle') {
        if (Date.now() - A.lastFire < 120000) return;
        if (Date.now() - A.idleLast < 7000)  return;
        A.idleLast = Date.now();
        var ad = [], CAP = 400000;
        for (var i = 131072; i < f32.length; i++) {
          var v = f32[i];
          if (v === v && v >= 198 && v <= 616) { ad.push(i << 2); if (ad.length >= CAP) break; }
        }
        if (ad.length >= CAP) { console.log('[AP] 本轮噪音过大，跳过'); return; }
        if (!ad.length) return;
        A.list = ad; A.v0 = _apVals(ad); A.t0 = Date.now(); A.st = 'w1';
        console.log('[AP] 发现疑似倒计时群体:', ad.length, '个');
        return;
      }

      if (A.st === 'w1' || A.st === 'w2') {
        var cur = _apVals(A.list);
        var dt = (Date.now() - A.t0) / 1000;
        var lo = Math.max(dt - 1.5, 0), hi = dt + 1.5;
        var keep = [];
        for (var k = 0; k < A.list.length; k++) {
          var d = A.v0[k] - cur[k];
          if (d >= lo && d <= hi && cur[k] > 140 && cur[k] < 620) keep.push(k);
        }
        console.log('[AP][' + A.st + '] Δt=' + dt.toFixed(1) + 's 保留', keep.length, '/', A.list.length);
        if (!keep.length) { A.st = 'idle'; A.list = null; return; }

        var na = [], nv = [];
        keep.forEach(function (idx) { na.push(A.list[idx]); nv.push(cur[idx]); });
        A.list = na; A.v0 = nv; A.t0 = Date.now();

        if (A.st === 'w1') { A.st = 'w2'; return; }

        /* 两轮见证完毕 → 动手 */
        if (na.length <= 8) {
          var dv = new DataView(getMem().buffer);
          na.forEach(function (a) { dv.setFloat32(a, 60000, true); });
          A.lastFire = Date.now();
          console.log('%c[AP] 🔥 已自动写入 60000 秒 @ ' +
            na.map(function (a) { return '0x' + a.toString(16); }).join(', '),
            'color:#d00;font-weight:bold');
        } else {
          console.log('[AP] 幸存者过多(' + na.length + ')，本轮放弃，下一关再试');
        }
        A.st = 'idle'; A.list = null;
      }
    } catch (e) { A.st = 'idle'; }
    finally { A.busy = false; }
  }

  G.autopilotStart = function (ivMs) {
    if (G._ap.on) return console.warn('哨兵已在运行');
    G._ap.on = true; G._ap.st = 'idle';
    G._ap.timer = setInterval(_apTick, ivMs || 4000);
    console.log('%c[AP] 全自动哨兵已开启：%c此后每关倒计时一起步就会被改成60000',
                'color:#0a0;font-weight:bold', '');
    console.log('关闭命令: GameGlobal.autopilotStop()');
  };

  G.autopilotStop = function () {
    clearInterval(G._ap.timer);
    G._ap.on = false; G._ap.st = 'idle'; G._ap.list = null;
    console.log('[AP] 已关闭');
  };

  // ----- 冻结/解冻 -----
  G.unfreeze = function () {
    if (G.__ftick) { clearInterval(G.__ftick); G.__ftick = null; }
    console.log('unfreeze ok');
  };
  G.freeze = function (val, iv) {
    G.unfreeze();
    var cands = (G.__cand || []).slice();
    G.__ftick = setInterval(function () {
      var dv = new DataView(getMem().buffer);
      cands.forEach(function (c) {
        if (c.t === 'i32ms') dv.setInt32(c.a, Math.round(val * 1000), true);
        else dv.setFloat32(c.a, val, true);
      });
    }, iv || 16);
    console.log('[freeze] 冻结中', cands.length, '个地址');
  };

  // ----- 杂项 -----
  G.G = G;
  G.__hookScan = true;
  console.log('%c[scan-tool v4] 倒计时手动扫描工具箱已就绪', 'color:#0a0;font-weight:bold',
    '\n── 半自动 ──  进关开表后执行:  GameGlobal.addTime()',
    '\n── 全自动 ──  加载后开一次:    GameGlobal.autopilotStart()',
    '\n其余: set / poke / rscan / snap / rdiff / list / freeze / unfreeze');
})();


/* ============ [模块⑤] 倒计时快速扫描手势 + 下方区域切换时间作弊 ============ */
// (function () {
//   'use strict';
//   var G = typeof GameGlobal !== 'undefined' ? GameGlobal : {};
//   if (G.__scanGesture) { console.log('[scan-gesture] 已加载'); return; }

//   function showToast(msg, dur) {
//     dur = dur || 2000;
//     try {
//       if (typeof wx !== 'undefined' && wx.showToast) {
//         wx.showToast({ title: msg, icon: 'none', duration: dur });
//       } else {
//         console.log('[toast] ' + msg);
//       }
//     } catch (e) {
//       console.log('[toast] ' + msg);
//     }
//   }

//   // 获取屏幕高度，用于区域判断
//   var screenHeight = 0;
//   try {
//     var sysInfo = wx.getSystemInfoSync();
//     screenHeight = sysInfo.windowHeight || sysInfo.screenHeight || 0;
//   } catch (e) {}
//   if (!screenHeight) {
//     try { if (typeof window !== 'undefined' && window.innerHeight) screenHeight = window.innerHeight; } catch (e) {}
//   }
//   if (!screenHeight) screenHeight = 800;
//   var bottomThreshold = screenHeight * 0.88; // 下方12%区域起始Y坐标
//   console.log('[scan-gesture] 屏幕高度=' + screenHeight + ', 下方12%阈值=' + bottomThreshold);

//   var scanReady = false;      // 三指扫描成功后允许双指（仅上方区域使用）
//   var lastTri = 0, lastDual = 0;
//   var dualPending = false;

//   try {
//     wx.onTouchStart(function (e) {
//       if (!e || !e.touches) return;
//       var n = e.touches.length;
//       var now = Date.now();

//       // ----- 三指：扫描（全局有效，无区域限制） -----
//       if (n === 3) {
//         if (now - lastTri < 1500) return;
//         lastTri = now;
//         if (typeof G.rscan === 'function') {
//           var cnt = G.rscan(205, 210);
//           showToast('扫描候选: ' + cnt + ' 个', 2000);
//           console.log('[scan-gesture] 三指扫描完成，候选数:', cnt);
//           if (cnt > 0) {
//             scanReady = true;
//             setTimeout(function () { scanReady = false; }, 30000); // 30秒内有效
//           } else {
//             scanReady = false;
//           }
//         } else {
//           showToast('rscan 未定义', 2000);
//         }
//         return;
//       }

//       // ----- 双指：根据区域分流 -----
//       if (n === 2) {
//         var touches = e.touches;
//         var allAbove = true, allBelow = true;
//         for (var i = 0; i < touches.length; i++) {
//           var y = touches[i].clientY;
//           if (y >= bottomThreshold) allAbove = false;
//           if (y < bottomThreshold) allBelow = false;
//         }

//         // 情况1：都在下方12%区域 → 切换时间作弊（原功能）
//         if (allBelow) {
//           if (typeof G.toggleTimeCheat === 'function') {
//             G.toggleTimeCheat();
//           } else {
//             showToast('toggleTimeCheat 未定义', 1500);
//           }
//           return;
//         }

//         // 情况2：都在上方88%区域 → 倒计时扫描过滤
//         if (allAbove) {
//           if (now - lastDual < 2000) return;
//           lastDual = now;
//           if (dualPending) return;
//           dualPending = true;

//           if (!scanReady) {
//             showToast('请先三指扫描', 1500);
//             dualPending = false;
//             return;
//           }

//           if (typeof G.snap === 'function' && typeof G.rdiff === 'function') {
//             // 检查候选是否存在
//             if (!G.__cand || G.__cand.length === 0) {
//               showToast('候选为空，请重新三指扫描', 2000);
//               scanReady = false;
//               dualPending = false;
//               return;
//             }
//             G.snap();
//             showToast('已拍快照，等待1秒后过滤...', 1500);
//             console.log('[scan-gesture] 双指（上方）触发 snap，1秒后 rdiff');

//             setTimeout(function () {
//               try {
//                 var remaining = G.rdiff(6, 5);
//                 console.log('[scan-gesture] rdiff 结果，候选剩余:', remaining);

//                 if (remaining === 0) {
//                   showToast('过滤后无候选，请重试', 2500);
//                   scanReady = false;
//                 } else if (remaining === 1) {
//                   if (typeof G.set === 'function') {
//                     G.set(60000);
//                     var addr = (G.__cand && G.__cand[0]) ? '0x' + G.__cand[0].a.toString(16) : '未知';
//                     var msg = '✅ 已锁定 ' + addr + ' = 60000秒';
//                     showToast(msg, 4000);
//                     console.log('%c[scan-gesture] ' + msg, 'color:#d00;font-weight:bold');
//                     scanReady = false;
//                   } else {
//                     showToast('set 未定义', 1500);
//                   }
//                 } else {
//                   showToast('候选 ' + remaining + ' 个，请再次双指', 2500);
//                   // scanReady 保持 true，允许继续过滤
//                 }
//               } catch (err) {
//                 showToast('过滤出错', 2000);
//                 console.error('[scan-gesture] 错误:', err);
//                 scanReady = false;
//               }
//               dualPending = false;
//             }, 1000);
//           } else {
//             showToast('snap/rdiff 未定义', 2000);
//             dualPending = false;
//           }
//           return;
//         }

//         // 情况3：跨区域（一个在上一个在下）→ 忽略
//         // 什么都不做
//       }
//     });
//   } catch (e) {
//     console.warn('[scan-gesture] 触摸事件绑定失败:', e.message);
//   }
//   G.__scanGesture = true;
//   console.log('%c[scan-gesture] 倒计时扫描手势已启用（双指区域分流）', 'color:#0a0;font-weight:bold',
//     '\n三指（任意区域）→ rscan(205,210)，开启上方双指扫描权限',
//     '\n双指（上方88%）→ 倒计时过滤+锁定',
//     '\n双指（下方12%）→ 切换时间作弊（toggleTimeCheat）');
// })();