/* Partytown 0.0.29 - MIT builder.io */
const resolves = new Map()

const swMessageError = (accessReq, $error$) => ({
  $msgId$: accessReq.$msgId$,
  $error$: $error$,
})

const httpRequestFromWebWorker = (req, isolated) =>
  new Promise(async (resolve) => {
    const accessReq = await req.clone().json()
    const responseData = await ((accessReq) =>
      new Promise(async (resolve) => {
        const client = [...(await self.clients.matchAll())].sort((a, b) =>
          a.url > b.url ? -1 : a.url < b.url ? 1 : 0
        )[0]
        if (client) {
          const msgResolve = [
            resolve,
            setTimeout(() => {
              resolves.delete(accessReq.$msgId$)
              resolve(swMessageError(accessReq, 'Timeout'))
            }, 12e4),
          ]
          resolves.set(accessReq.$msgId$, msgResolve)
          client.postMessage(accessReq)
        } else {
          resolve(swMessageError(accessReq, 'No Party'))
        }
      }))(accessReq)
    resolve(
      response(JSON.stringify(responseData), isolated, 'application/json')
    )
  })

const response = (body, isolated, contentType) => {
  const headers = {
    'content-type': contentType || 'text/html',
    'Cache-Control': 'no-store',
  }
  isolated && (headers['Cross-Origin-Embedder-Policy'] = 'require-corp')
  return new Response(body, {
    headers: headers,
  })
}

self.oninstall = () => self.skipWaiting()

self.onactivate = () => self.clients.claim()

self.onmessage = (ev) => {
  const accessRsp = ev.data
  const r = resolves.get(accessRsp.$msgId$)
  if (r) {
    resolves.delete(accessRsp.$msgId$)
    clearTimeout(r[1])
    r[0](accessRsp)
  }
}

self.onfetch = (ev) => {
  const req = ev.request
  const pathname = new URL(req.url).pathname
  if (pathname.endsWith('debug/partytown-sandbox-sw.html')) {
    ev.respondWith(
      response(
        '<!DOCTYPE html><html><head><meta charset="utf-8"><script src="./partytown-sandbox-sw.js"></script></head></html>',
        false
      )
    )
  } else {
    pathname.endsWith('proxytown') &&
      ev.respondWith(httpRequestFromWebWorker(req, false))
  }
}
