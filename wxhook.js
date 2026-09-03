/* =============================================================
 * wxhook.js 合并版 —— 动态时间作弊（状态校正）+ 广告Hook + 传送带档位
 * -------------------------------------------------------------
 *  模块① 倒计时锚点哨兵 v10（校正状态，5分钟内视为未开启）
 *         LeftTime@0x319eb54，偏移量 60000 秒，
 *         轮询内存值动态触发 30/10 秒提示和周期重置
 *  模块② 广告 Hook v1
 *  模块③ 速度模块 v11.1
 *  附加  内存扫描套件 v6.1
 * -------------------------------------------------------------
 *  手势：上方88%双指 → 速度过滤，下方12%双指 → 时间作弊开关
 * ============================================================= */

/* ============ [模块①] 倒计时锚点哨兵 v10 —— 状态校正 ============ */
(function () {
  'use strict';
  var G = typeof GameGlobal !== 'undefined' ? GameGlobal : {};
  if (G.__hookV5) { console.log('[wxhook] 已加载'); return; }

  var ANCHOR      = 0x319eb54;
  var TARGET_SEC  = 60000;          // 偏移量 = 1000 分钟
  var CORRECT_THRESHOLD = 300;      // 5分钟，视为未开启的阈值

  var timeCheatOn = true;           // 默认开启（但会立即校正）
  var originalLevelTime = null;     // 原定关卡时间（秒）
  var pollTimer = null;
  var triggered30 = false;
  var triggered10 = false;

  G.__timeCheatOn = true;

  /* ========== 基础工具 ========== */
  function getAnchorValue() {
    if (!G.wasmmemReady()) return NaN;
    return new DataView(G.getWasmMem().buffer).getFloat32(ANCHOR, true);
  }
  function setAnchorValue(val) {
    if (!G.wasmmemReady()) return;
    new DataView(G.getWasmMem().buffer).setFloat32(ANCHOR, val, true);
  }
  function isNormal(v) {
    return Number.isFinite(v) && v > 10 && v < 600;
  }

  function showToast(msg, dur) {
    dur = dur || 2000;
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

  /* ========== 校正状态 ========== */
  function calibrateState() {
    var cur = getAnchorValue();
    if (!Number.isFinite(cur) || cur < 0) return;
    var real = cur - TARGET_SEC;
    // 如果当前值小于偏移量，或真实剩余时间 <= 300秒，视为未开启
    if (cur < TARGET_SEC || real <= CORRECT_THRESHOLD) {
      if (timeCheatOn) {
        timeCheatOn = false;
        G.__timeCheatOn = false;
        stopPoll();
        // 重置提示标记
        triggered30 = false;
        triggered10 = false;
        console.log('[timeCheat] 状态校正：未开启');
      }
    } else {
      // 当前值明显大于偏移量，视为已开启
      if (!timeCheatOn) {
        timeCheatOn = true;
        G.__timeCheatOn = true;
        startPoll();
        console.log('[timeCheat] 状态校正：已开启');
      }
    }
  }

  /* ========== 轮询核心 ========== */
  function pollLoop() {
    if (!timeCheatOn) return;
    if (!G.wasmmemReady()) return;

    try {
      var cur = getAnchorValue();
      if (!Number.isFinite(cur) || cur < 0) return;
      var real = cur - TARGET_SEC;

      // 周期结束
      if (real <= 0) {
        if (originalLevelTime !== null && originalLevelTime > 0) {
          showToast('作弊前的时间已经到了，现在重新计时', 3000);
          setAnchorValue(originalLevelTime + TARGET_SEC);
          triggered30 = false;
          triggered10 = false;
          console.log('[timeCheat] 周期重置，新值 = ' + (originalLevelTime + TARGET_SEC).toFixed(0));
        } else {
          console.warn('[timeCheat] 无原始关卡时间，无法重置');
        }
        return;
      }

      // 30秒提示
      if (real <= 30 && !triggered30) {
        triggered30 = true;
        showToast('作弊前的30秒倒计时', 2000);
        console.log('[timeCheat] 30秒提示触发');
      }
      // 10秒提示
      if (real <= 10 && !triggered10) {
        triggered10 = true;
        showToast('作弊前的10秒倒计时', 2000);
        console.log('[timeCheat] 10秒提示触发');
      }
    } catch (e) {}
  }

  function startPoll() {
    if (pollTimer) return;
    pollTimer = setInterval(pollLoop, 500);
    console.log('[timeCheat] 轮询已启动');
  }
  function stopPoll() {
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
      console.log('[timeCheat] 轮询已停止');
    }
  }

  /* ========== 切换作弊（带状态校正） ========== */
  G.toggleTimeCheat = function () {
    var cur = getAnchorValue();
    if (!Number.isFinite(cur) || cur < 0) {
      showToast('当前时间无效', 1500);
      return;
    }

    // 1. 校正状态
    calibrateState();

    // 2. 根据校正后的状态执行切换
    if (timeCheatOn) {
      // ----- 关闭作弊 -----
      var real = cur - TARGET_SEC;
      if (real <= CORRECT_THRESHOLD) {
        showToast('不宜减少，无法关闭（剩余时间不足5分钟）', 2000);
        console.log('[timeCheat] 关闭失败：真实剩余=' + real.toFixed(0) + 's');
        return;
      }
      // 执行关闭
      setAnchorValue(real); // 直接写回真实时间
      timeCheatOn = false;
      G.__timeCheatOn = false;
      stopPoll();
      triggered30 = false;
      triggered10 = false;
      showToast('作弊已关闭，恢复时间', 2000);
      console.log('%c[timeCheat] 作弊关闭，内存设为 ' + real.toFixed(0), 'color:#d00;font-weight:bold');
    } else {
      // ----- 开启作弊 -----
      var realTime = (cur < TARGET_SEC) ? cur : cur - TARGET_SEC;
      if (realTime <= 0) {
        showToast('当前时间无效', 1500);
        return;
      }
      // 记录原始时间（如果未记录）
      if (originalLevelTime === null && realTime > 10 && realTime < 600) {
        originalLevelTime = realTime;
        console.log('[timeCheat] 记录原定关卡时间: ' + originalLevelTime.toFixed(0) + '秒');
      }
      // 将内存设为 真实时间 + 偏移
      setAnchorValue(realTime + TARGET_SEC);
      timeCheatOn = true;
      G.__timeCheatOn = true;
      triggered30 = false;
      triggered10 = false;
      startPoll();
      showToast('作弊开启，偏移 ' + TARGET_SEC + ' 秒', 2500);
      console.log('%c[timeCheat] 作弊开启，内存设为 ' + (realTime + TARGET_SEC).toFixed(0), 'color:#0a0;font-weight:bold');
    }
  };

  /* ========== 哨兵（辅助保护） ========== */
  function patrol() {
    if (!timeCheatOn || !G.wasmmemReady()) return;
    try {
      var v = getAnchorValue();
      if (isNormal(v)) {
        // 游戏重置了倒计时，重新增加偏移
        if (originalLevelTime === null) {
          originalLevelTime = v;
          console.log('[timeCheat] 哨兵记录原定关卡时间: ' + originalLevelTime.toFixed(0) + '秒');
        }
        setAnchorValue(v + TARGET_SEC);
        var t = new Date().toLocaleTimeString();
        console.log('%c⚡[' + t + '] 哨兵检测到正常倒计时(' + v.toFixed(1) + 's) → 已增加 ' + TARGET_SEC + ' 秒', 'color:#d00;font-weight:bold');
        triggered30 = false;
        triggered10 = false;
        if (!pollTimer && timeCheatOn) startPoll();
      }
    } catch (e) {}
  }

  /* ========== 初始化 ========== */
  var waitTimer = setInterval(function () {
    if (G.wasmmemReady()) {
      clearInterval(waitTimer);
      // 初始校正状态
      calibrateState();
      // 如果校正后为开启，则确保轮询运行
      if (timeCheatOn) {
        startPoll();
        // 同时检查是否已加偏移，如果没有则加
        var cur = getAnchorValue();
        if (cur < TARGET_SEC && cur > 0) {
          // 未加偏移，但状态为开启，需要加偏移
          if (originalLevelTime === null && isNormal(cur)) {
            originalLevelTime = cur;
          }
          setAnchorValue(cur + TARGET_SEC);
          console.log('%c[init] 初始校正开启，已增加偏移', 'color:#0a0;font-weight:bold');
        }
      }
      // 哨兵每0.8秒运行
      setInterval(patrol, 800);
    }
  }, 500);

  // 暴露工具
  G.getWasmMem = function () {
    if (G.Module && G.Module.HEAPU8 && G.Module.HEAPU8.buffer) return G.Module.HEAPU8;
    return G.EMSCRIPTEN_HEAPU8 || null;
  };
  G.wasmmemReady = function () {
    var h = G.getWasmMem();
    return !!(h && h.buffer && h.buffer.byteLength > 1024);
  };
  G.anchorVal = function () {
    if (!G.wasmmemReady()) return '(未就绪)';
    var v = new DataView(G.getWasmMem().buffer).getFloat32(ANCHOR, true);
    return Number.isFinite(v) ? v.toFixed(2) : 'NaN';
  };
  G.setAnchor = function (sec) {
    if (!G.wasmmemReady()) return console.warn('未就绪');
    new DataView(G.getWasmMem().buffer).setFloat32(ANCHOR, sec || TARGET_SEC, true);
    console.log('[setAnchor] 已写入', sec || TARGET_SEC);
  };
  G.relocate = function (low, high) {
    console.warn('请使用以下流程重新定位：');
    console.log(' ① GameGlobal.rscan(' + low + ',' + high + ')');
    console.log(' ② 让它走 6 秒后：snap(); rdiff(6,2)');
    console.log(' ③ 把命中的新地址替换掉本文件里的 ANCHOR 常量');
  };

  G.G = G;
  G.__hookV5 = true;
  console.log('%c[wxhook v10] 倒计时模块已装载（状态校正，5分钟内视为未开启）', 'color:#0a0;font-weight:bold',
    '\n偏移量60000秒，轮询内存触发提示和重置，下方12%区域双指切换');
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
  try {
    pAddr = new Float64Array(MAXC);
    pVal  = new Float64Array(MAXC);
    pType = new Uint8Array(MAXC);
  } catch (e) { pAddr = null; }
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

  // 哨兵维持5倍
  setInterval(function () {
    if (state !== 'LOCKED' || !views()) return;
    try {
      for (var k = locked.length - 1; k >= 0; k--) {
        var L = locked[k];
        var v = readVal(L.t, L.a >> 2);
        if (isNat(v)) { L.v0 = v; writeVal(L.t, L.a >> 2, SPEED_TARGET); }
        else if (v !== SPEED_TARGET) { writeVal(L.t, L.a >> 2, SPEED_TARGET); }
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