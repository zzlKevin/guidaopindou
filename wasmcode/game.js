;(function(){
    const document = __global.document;
    let head = __global.document.getElementsByTagName("head")[0];
    let alert = __global.alert;
    alert = function() { /* noEmitProgress */ };
    
  ; /////////// Begin - B A R R I E R   C O D E ////////////// ;
  /*   */  let _openList = [];
  /*   */  head = window.__$ownerHead || head;
  /* B */  let _barrierOpened = false;
  /* A */  const _openBarrier = function () {
  /* R */    _barrierOpened = true;
  /* R */    _openList.forEach(f => f());
  /* I */    _openList = [];
  /* E */  };
  /* R */  window.__$scriptOnLoadBarriers = window.__$scriptOnLoadBarriers || {};
  /*   */  window.__$scriptOnLoadBarriers[decodeURIComponent("wasmcode%2Fgame.js")] = {
  /* C */    onDidOpen(fn) {
  /* O */      if (_barrierOpened) { fn() }
  /* D */      else { _openList.push(fn) }
  /* E */    }
  /*   */  };
  /*   */
  ; /////////// End - B A R R I E R   C O D E ////////////// ;
  
    const finishUp = function() { _openBarrier() };
    const timing = window.top.__global.timing || {}
    const loadStartTs = Date.now()
    const links = ["wasmcode/game.js"]
    const ignoreds = {}
    const total = links.length
    let scriptCounter = links.length

    let babelLock = false
    let requireScriptAppended = false
    let inCaseTimer = null
    __global.addEventListener('__babel_module_loading', () => {
      // 当前分包下有依赖helper函数，需要等待加载完才能初始化脚本
      babelLock = true
    }, false)

    const loadedCallback = () => {
      babelLock = false
      __global.removeEventListener('__babel_module_loaded', loadedCallback)
      doWhenAllScriptLoaded()
    }
    __global.addEventListener('__babel_module_loaded', loadedCallback, false)

    const doWhenAllScriptLoaded = () => {
      if (requireScriptAppended) {
        return
      }

      if (scriptCounter <= 0 && babelLock) {
        // 分包资源已经加载好，如果因为babel helper模块未加载完而中断初始化，需要添加一个延迟保护，确保分包最终能初始化
        // 正常情况下应该是由上面的 __babel_module_loaded 事件触发
        inCaseTimer = setTimeout(function(){
          babelLock = false
          doWhenAllScriptLoaded()
        }, 500)
        return
      }

      if (!babelLock && scriptCounter <= 0) {
        // 当前包全部脚本加载完
        timing.addCost('MAIN_PACKAGE_LOAD', loadStartTs, Date.now(),{packageName:`/wasmcode/`})
        timing.addPoint('USERCODE_LOADED', Date.now())

        clearTimeout(inCaseTimer)
        requireScriptAppended = true
        const requireStartTs = Date.now()
        const innerScript = document.createElement('script')
        innerScript.text = `var decodePathName = decodeURI("wasmcode/game.js");require(decodePathName)`
        head.appendChild(innerScript)
        timing.addCost('MAIN_PACKAGE_REQUIRE', requireStartTs, Date.now(),{packageName:`/wasmcode/`})
        timing.addPoint('USERCODE_REQUIRED', Date.now())

        alert(`SUBPACKAGE_READY_/wasmcode/`)
        finishUp()
      }
    }

    const scriptLoaded = function() {
      if (this.__loaded) {
        return
      }
      this.__loaded = true
      scriptCounter--

      // 进度。。。。
      const progress = (total - scriptCounter) / total
      // console.log(total, scriptCounter, progress)
      alert('SUBPACKAGE_PROGRESS_' + progress + `_17716362_/wasmcode/`)

      doWhenAllScriptLoaded()
    }

    for (const link of links) {
      const script = document.createElement('script')
      const ignoreText = ignoreds[link]
      script.src = link
      script.onload = function() {
        scriptLoaded.apply(this, arguments)
        if (ignoreText) {
          const s = document.createElement('script')
          s.text = ignoreText
          head.appendChild(s)
        }
      }
      script.onerror = scriptLoaded.bind(script)
      head.appendChild(script)
    }
  })()