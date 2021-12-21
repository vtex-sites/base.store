/* Partytown 0.0.29 - MIT builder.io */
!(function (
  win,
  doc,
  nav,
  top,
  crossOriginIsolated,
  config,
  libPath,
  timeout,
  scripts,
  sandbox,
  mainForwardFn,
  useAtomics
) {
  function ready() {
    libPath =
      (config.lib || '/~partytown/') + (!1 !== config.debug ? 'debug/' : '')
    scripts = doc.querySelectorAll('script[type="text/partytown"]')
    if (top != win) {
      top.dispatchEvent(
        new CustomEvent('pt1', {
          detail: win,
        })
      )
    } else if (scripts.length) {
      timeout = setTimeout(fallback, 6e4)
      doc.addEventListener('pt0', clearFallback)
      ;(useAtomics = crossOriginIsolated) &&
        (useAtomics = !win.location.search.includes('forceServiceWorker'))
      useAtomics
        ? loadSandbox('atomics')
        : nav.serviceWorker
        ? nav.serviceWorker
            .register(
              libPath +
                'partytown-sw.js' +
                (crossOriginIsolated ? '?isolated' : ''),
              {
                scope: libPath,
              }
            )
            .then(function (swRegistration) {
              if (swRegistration.active) {
                loadSandbox('sw')
              } else if (swRegistration.installing) {
                swRegistration.installing.addEventListener(
                  'statechange',
                  function (ev) {
                    'activated' == ev.target.state && loadSandbox('sw')
                  }
                )
              } else {
                console.warn(swRegistration)
              }
            }, console.error)
        : fallback()
    }
  }
  function loadSandbox(msgType) {
    ;(sandbox = doc.createElement('iframe')).setAttribute(
      'style',
      'display:block;width:0;height:0;border:0;visibility:hidden'
    )
    sandbox.setAttribute('aria-hidden', !0)
    sandbox.src =
      libPath + 'partytown-sandbox-' + msgType + '.html?' + Date.now()
    doc.body.appendChild(sandbox)
  }
  function fallback(i, script) {
    console.warn('Partytown script fallback')
    clearFallback()
    for (i = 0; i < scripts.length; i++) {
      ;(script = doc.createElement('script')).innerHTML = scripts[i].innerHTML
      doc.head.appendChild(script)
    }
  }
  function clearFallback() {
    clearTimeout(timeout)
  }
  config = win.partytown || {}
  top == win &&
    (config.forward || []).map(function (forwardProps) {
      mainForwardFn = win
      forwardProps.split('.').map(function (_, i, forwardPropsArr) {
        mainForwardFn = mainForwardFn[forwardPropsArr[i]] =
          i + 1 < forwardPropsArr.length
            ? 'push' == forwardPropsArr[i + 1]
              ? []
              : {}
            : function () {
                ;(win._ptf = win._ptf || []).push(forwardPropsArr, arguments)
              }
      })
    })
  'complete' == doc.readyState ? ready() : win.addEventListener('load', ready)
})(window, document, navigator, top, top.crossOriginIsolated)
