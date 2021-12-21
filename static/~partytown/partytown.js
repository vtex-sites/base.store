/* Partytown 0.0.29 - MIT builder.io */
!(function (t, e, n, i, o, r, a, s, d, c, l, p) {
  function u() {
    ;(a = (r.lib || '/~partytown/') + (r.debug ? 'debug/' : '')),
      (d = e.querySelectorAll('script[type="text/partytown"]')),
      i != t
        ? i.dispatchEvent(new CustomEvent('pt1', { detail: t }))
        : d.length &&
          ((s = setTimeout(f, 9999)),
          e.addEventListener('pt0', w),
          o
            ? h('atomics')
            : n.serviceWorker
            ? n.serviceWorker
                .register(a + 'partytown-sw.js' + (o ? '?isolated' : ''), {
                  scope: a,
                })
                .then(function (t) {
                  t.active
                    ? h('sw')
                    : t.installing &&
                      t.installing.addEventListener(
                        'statechange',
                        function (t) {
                          'activated' == t.target.state && h('sw')
                        }
                      )
                }, console.error)
            : f())
  }
  function h(t) {
    ;(c = e.createElement('iframe')).setAttribute(
      'style',
      'display:block;width:0;height:0;border:0;visibility:hidden'
    ),
      c.setAttribute('aria-hidden', !0),
      (c.src = a + 'partytown-sandbox-' + t + '.html?' + Date.now()),
      e.body.appendChild(c)
  }
  function f(t, n) {
    for (w(), t = 0; t < d.length; t++)
      ((n = e.createElement('script')).innerHTML = d[t].innerHTML),
        e.head.appendChild(n)
  }
  function w() {
    clearTimeout(s)
  }
  ;(r = t.partytown || {}),
    i == t &&
      (r.forward || []).map(function (e) {
        ;(l = t),
          e.split('.').map(function (e, n, i) {
            l = l[i[n]] =
              n + 1 < i.length
                ? 'push' == i[n + 1]
                  ? []
                  : {}
                : function () {
                    ;(t._ptf = t._ptf || []).push(i, arguments)
                  }
          })
      }),
    'complete' == e.readyState ? u() : t.addEventListener('load', u)
})(window, document, navigator, top, top.crossOriginIsolated)
