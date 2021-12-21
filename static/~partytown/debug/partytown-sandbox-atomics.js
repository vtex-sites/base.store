/* Partytown 0.0.29 - MIT builder.io */
const isPromise = (v) => 'object' == typeof v && v && v.then

const noop = () => !0

const logMain = (msg) => {
  console.debug.apply(console, [
    '%cMain 🌎',
    'background: #717171; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;',
    msg,
  ])
}

const winIds = []

const normalizedWinId = (winId) => {
  winIds.includes(winId) || winIds.push(winId)
  return winIds.indexOf(winId) + 1
}

const len = (obj) => obj.length

const getConstructorName = (obj) => {
  try {
    return obj.constructor.name
  } catch (e) {}
  return ''
}

const startsWith = (str, val) => str.startsWith(val)

const isValidMemberName = (memberName) =>
  !(
    startsWith(memberName, 'webkit') ||
    startsWith(memberName, 'toJSON') ||
    startsWith(memberName, 'constructor') ||
    startsWith(memberName, 'toString') ||
    startsWith(memberName, '_')
  )

const randomId = () => Math.round(9999999999 * Math.random() + 4)

const instanceIds = new WeakMap()

const instances = new Map()

const mainRefs = new Map()

const winCtxs = {}

const windowIds = new WeakMap()

const getAndSetInstanceId = (instance, instanceId, nodeName) => {
  if (instance) {
    if (instance === instance.window) {
      return 0
    }
    if ('#document' === (nodeName = instance.nodeName)) {
      return 1
    }
    if ('HTML' === nodeName) {
      return 2
    }
    if ('HEAD' === nodeName) {
      return 3
    }
    if ('BODY' === nodeName) {
      return 4
    }
    'number' != typeof (instanceId = instanceIds.get(instance)) &&
      setInstanceId(instance, (instanceId = randomId()))
    return instanceId
  }
  return -1
}

const getInstance = (winId, instanceId, winCtx, win, doc) => {
  if ((winCtx = winCtxs[winId]) && (win = winCtx.$window$)) {
    doc = win.document
    return 0 === instanceId
      ? win
      : 1 === instanceId
      ? doc
      : 2 === instanceId
      ? doc.documentElement
      : 3 === instanceId
      ? doc.head
      : 4 === instanceId
      ? doc.body
      : instances.get(instanceId)
  }
}

const setInstanceId = (instance, instanceId) => {
  if (instance) {
    instances.set(instanceId, instance)
    instanceIds.set(instance, instanceId)
    setInc++
    if (setInc > 99999) {
      instances.forEach((instance, instanceId) => {
        instance.nodeType &&
          !instance.isConnected &&
          instances.delete(instanceId)
      })
      setInc = 0
    }
  }
}

let setInc = 0

const serializeForWorker = ($winId$, value, added, type, cstrName) => {
  if (void 0 !== value) {
    if (
      'string' === (type = typeof value) ||
      'number' === type ||
      'boolean' === type ||
      null == value
    ) {
      return [9, value]
    }
    if ('function' === type) {
      return [5]
    }
    added = added || new Set()
    if (Array.isArray(value)) {
      if (!added.has(value)) {
        added.add(value)
        return [0, value.map((v) => serializeForWorker($winId$, v, added))]
      }
      return [0, []]
    }
    if ('object' === type) {
      return '' === (cstrName = getConstructorName(value))
        ? [8, {}]
        : 'Window' === cstrName
        ? [
            6,
            {
              $winId$: $winId$,
              $instanceId$: 0,
            },
          ]
        : 'HTMLCollection' === cstrName || 'NodeList' === cstrName
        ? [
            7,
            Array.from(value).map(
              (v) => serializeForWorker($winId$, v, added)[1]
            ),
          ]
        : 'Event' === cstrName
        ? [4, serializeObjectForWorker($winId$, value, added)]
        : 'CSSRuleList' === cstrName
        ? [3, Array.from(value).map(serializeCssRuleForWorker)]
        : startsWith(cstrName, 'CSS') && cstrName.endsWith('Rule')
        ? [2, serializeCssRuleForWorker(value)]
        : 'CSSStyleDeclaration' === cstrName
        ? [8, serializeObjectForWorker($winId$, value, added)]
        : 'Attr' === cstrName
        ? [1, [value.name, value.value]]
        : value.nodeType
        ? [
            6,
            {
              $winId$: $winId$,
              $instanceId$: getAndSetInstanceId(value),
              $nodeName$: value.nodeName,
            },
          ]
        : [8, serializeObjectForWorker($winId$, value, added, !0, !0)]
    }
  }
}

const serializeObjectForWorker = (
  winId,
  obj,
  added,
  includeFunctions,
  includeEmptyStrings,
  serializedObj,
  propName,
  propValue
) => {
  serializedObj = {}
  if (!added.has(obj)) {
    added.add(obj)
    for (propName in obj) {
      if (isValidMemberName(propName)) {
        propValue = obj[propName]
        ;(includeFunctions || 'function' != typeof propValue) &&
          (includeEmptyStrings || '' !== propValue) &&
          (serializedObj[propName] = serializeForWorker(
            winId,
            propValue,
            added
          ))
      }
    }
  }
  return serializedObj
}

const serializeCssRuleForWorker = (cssRule) => {
  let obj = {}
  let key
  for (key in cssRule) {
    validCssRuleProps.includes(key) && (obj[key] = cssRule[key])
  }
  return obj
}

const deserializeFromWorker = (
  worker,
  serializedTransfer,
  serializedType,
  serializedValue
) => {
  if (serializedTransfer) {
    serializedType = serializedTransfer[0]
    serializedValue = serializedTransfer[1]
    if (9 === serializedType) {
      return serializedValue
    }
    if (10 === serializedType) {
      return deserializeRefFromWorker(worker, serializedValue)
    }
    if (0 === serializedType) {
      return serializedValue.map((v) => deserializeFromWorker(worker, v))
    }
    if (6 === serializedType) {
      return getInstance(serializedValue.$winId$, serializedValue.$instanceId$)
    }
    if (4 === serializedType) {
      return constructEvent(
        deserializeObjectFromWorker(worker, serializedValue)
      )
    }
    if (8 === serializedType) {
      return deserializeObjectFromWorker(worker, serializedValue)
    }
  }
}

const deserializeRefFromWorker = (
  worker,
  { $winId$: $winId$, $instanceId$: $instanceId$, $refId$: $refId$ }
) => {
  let ref = mainRefs.get($refId$)
  if (!ref) {
    ref = function (...args) {
      const refHandlerData = {
        $instanceId$: $instanceId$,
        $refId$: $refId$,
        $thisArg$: serializeForWorker($winId$, this),
        $args$: serializeForWorker($winId$, args),
      }
      worker.postMessage([7, refHandlerData])
    }
    mainRefs.set($refId$, ref)
  }
  return ref
}

const constructEvent = (eventProps) =>
  new ('detail' in eventProps ? CustomEvent : Event)(
    eventProps.type,
    eventProps
  )

const deserializeObjectFromWorker = (worker, serializedValue, obj, key) => {
  obj = {}
  for (key in serializedValue) {
    obj[key] = deserializeFromWorker(worker, serializedValue[key])
  }
  return obj
}

const validCssRuleProps =
  'cssText,selectorText,href,media,namespaceURI,prefix,name,conditionText'.split(
    ','
  )

const mainAccessHandler = async (worker, accessReq) => {
  const accessRsp = {
    $msgId$: accessReq.$msgId$,
  }
  const totalTasks = len(accessReq.$tasks$)
  for (let i = 0; i < totalTasks; i++) {
    try {
      let task = accessReq.$tasks$[i]
      let winId = task.$winId$
      let instanceId = task.$instanceId$
      let applyPath = task.$applyPath$
      let instance
      let rtnValue
      winCtxs[winId] ||
        (await new Promise((resolve) => {
          let i = 0
          let callback = () => {
            winCtxs[winId] || i++ > 999 ? resolve() : setTimeout(callback, 9)
          }
          callback()
        }))
      if (1 === applyPath[0] && applyPath[1] in winCtxs[winId].$window$) {
        const constructedInstance = new winCtxs[winId].$window$[applyPath[1]](
          ...deserializeFromWorker(worker, applyPath[2])
        )
        setInstanceId(constructedInstance, instanceId)
      } else {
        instance = getInstance(winId, instanceId)
        if (instance) {
          rtnValue = applyToInstance(
            worker,
            instance,
            applyPath,
            task.$groupedGetters$
          )
          task.$assignInstanceId$ &&
            setInstanceId(rtnValue, task.$assignInstanceId$)
          if (isPromise(rtnValue)) {
            rtnValue = await rtnValue
            accessRsp.$isPromise$ = !0
          }
          accessRsp.$rtnValue$ = serializeForWorker(winId, rtnValue)
        } else {
          accessRsp.$error$ = instanceId + ' not found'
        }
      }
    } catch (e) {
      i === totalTasks - 1
        ? (accessRsp.$error$ = String(e.stack || e))
        : console.error(e)
    }
  }
  return accessRsp
}

const applyToInstance = (worker, instance, applyPath, groupedGetters) => {
  let i = 0
  let l = len(applyPath)
  let next
  let current
  let previous
  let args
  for (; i < l; i++) {
    current = applyPath[i]
    next = applyPath[i + 1]
    previous = applyPath[i - 1]
    try {
      if (!Array.isArray(next)) {
        if ('string' == typeof current || 'number' == typeof current) {
          if (i + 1 === l && groupedGetters) {
            const groupedRtnValues = {}
            groupedGetters.map(
              (propName) => (groupedRtnValues[propName] = instance[propName])
            )
            return groupedRtnValues
          }
          instance = instance[current]
        } else {
          if (0 === next) {
            instance[previous] = deserializeFromWorker(worker, current)
            return
          }
          if ('function' == typeof instance[previous]) {
            args = deserializeFromWorker(worker, current)
            'insertRule' === previous &&
              args[1] > len(instance.cssRules) &&
              (args[1] = len(instance.cssRules))
            instance = instance[previous].apply(instance, args)
          }
        }
      }
    } catch (err) {
      console.warn(err)
    }
  }
  return instance
}

const registerWindow = (worker, $winId$, $window$) => {
  if (!windowIds.has($window$)) {
    windowIds.set($window$, $winId$)
    const doc = $window$.document
    const history = $window$.history
    const envData = {
      $winId$: $winId$,
      $parentWinId$: windowIds.get($window$.parent),
      $url$: doc.baseURI,
    }
    const sendInitEnvData = () => worker.postMessage([3, envData])
    const pushState = history.pushState.bind(history)
    const replaceState = history.replaceState.bind(history)
    const onLocationChange = () =>
      setTimeout(() => worker.postMessage([11, $winId$, doc.baseURI]))
    history.pushState = (data, _, url) => {
      pushState(data, _, url)
      onLocationChange()
    }
    history.replaceState = (data, _, url) => {
      replaceState(data, _, url)
      onLocationChange()
    }
    $window$.addEventListener('popstate', onLocationChange)
    $window$.addEventListener('hashchange', onLocationChange)
    winCtxs[$winId$] = {
      $winId$: $winId$,
      $window$: $window$,
    }
    winCtxs[$winId$].$startTime$ = performance.now()
    {
      const winType =
        envData.$winId$ === envData.$parentWinId$ ? 'top' : 'iframe'
      logMain(
        `Registered ${winType} window ${normalizedWinId($winId$)} (${$winId$})`
      )
    }
    'complete' === doc.readyState
      ? sendInitEnvData()
      : $window$.addEventListener('load', sendInitEnvData)
  }
}

const readNextScript = (worker, winCtx) => {
  let $winId$ = winCtx.$winId$
  let win = winCtx.$window$
  let doc = win.document
  let scriptSelector =
    'script[type="text/partytown"]:not([data-ptid]):not([data-pterror])'
  let scriptElm = doc.querySelector(
    'script[type="text/partytown"]:not([data-ptid]):not([data-pterror]):not([async]):not([defer])'
  )
  let $instanceId$
  let scriptData
  scriptElm || (scriptElm = doc.querySelector(scriptSelector))
  if (scriptElm) {
    scriptElm.dataset.ptid = $instanceId$ = getAndSetInstanceId(
      scriptElm,
      $winId$
    )
    scriptData = {
      $winId$: $winId$,
      $instanceId$: $instanceId$,
    }
    if (scriptElm.src) {
      scriptData.$url$ = scriptElm.src
      scriptData.$orgUrl$ = scriptElm.dataset.ptsrc || scriptElm.src
    } else {
      scriptData.$content$ = scriptElm.innerHTML
    }
    worker.postMessage([6, scriptData])
  } else if (!winCtx.$isInitialized$) {
    winCtx.$isInitialized$ = 1
    ;((worker, $winId$, win) => {
      let queuedForwardCalls = win._ptf
      let forwards = (win.partytown || {}).forward || []
      let i
      let mainForwardFn
      let forwardCall = ($forward$, args) =>
        worker.postMessage([
          8,
          {
            $winId$: $winId$,
            $forward$: $forward$,
            $args$: serializeForWorker($winId$, Array.from(args)),
          },
        ])
      win._ptf = void 0
      forwards.map((forwardProps) => {
        mainForwardFn = win
        forwardProps.split('.').map((_, i, arr) => {
          mainForwardFn = mainForwardFn[arr[i]] =
            i + 1 < len(arr)
              ? mainForwardFn[arr[i]] || ('push' === arr[i + 1] ? [] : {})
              : (...args) => forwardCall(arr, args)
        })
      })
      if (queuedForwardCalls) {
        for (i = 0; i < len(queuedForwardCalls); i += 2) {
          forwardCall(queuedForwardCalls[i], queuedForwardCalls[i + 1])
        }
      }
    })(worker, $winId$, win)
    doc.dispatchEvent(new CustomEvent('pt0'))
    {
      const winType = win === win.top ? 'top' : 'iframe'
      logMain(
        `Executed ${winType} window ${normalizedWinId(
          $winId$
        )} environment scripts in ${(
          performance.now() - winCtx.$startTime$
        ).toFixed(1)}ms`
      )
    }
    worker.postMessage([4, $winId$])
  }
}

const onMessageFromWebWorker = (worker, mainWindow, msg) => {
  const msgType = msg[0]
  if (2 === msgType) {
    registerWindow(worker, randomId(), mainWindow)
  } else {
    const winId = msg[1]
    const winCtx = winCtxs[winId]
    winCtx &&
      (6 === msgType
        ? readNextScript(worker, winCtx)
        : 5 === msgType &&
          ((worker, winCtx, instanceId, errorMsg, script) => {
            ;(script = winCtx.$window$.document.querySelector(
              `[data-ptid="${instanceId}"]`
            )) &&
              (errorMsg
                ? (script.dataset.pterror = errorMsg)
                : (script.type += '-x'))
            readNextScript(worker, winCtx)
          })(worker, winCtx, msg[2], msg[3]))
  }
}

const readImplementation = (cstrName, impl) => {
  const interfaceMembers = []
  const interfaceInfo = [cstrName, 'Object', interfaceMembers]
  for (const memberName in impl) {
    readImplementationMember(interfaceMembers, impl, memberName)
  }
  return interfaceInfo
}

const readOwnImplementation = (
  interfaces,
  cstrName,
  CstrPrototype,
  impl,
  interfaceType
) => {
  if ('Object' !== cstrName && !interfaces.some((i) => i[0] === cstrName)) {
    const SuperCstr = Object.getPrototypeOf(CstrPrototype)
    const superCstrName = SuperCstr.constructor.name
    const interfaceMembers = []
    readOwnImplementation(
      interfaces,
      superCstrName,
      SuperCstr,
      impl,
      interfaceType
    )
    Object.keys(Object.getOwnPropertyDescriptors(CstrPrototype)).map(
      (memberName) =>
        readImplementationMember(interfaceMembers, impl, memberName)
    )
    interfaces.push([
      cstrName,
      superCstrName,
      interfaceMembers,
      interfaceType,
      impl.nodeName,
    ])
  }
}

const readImplementationMember = (
  interfaceMembers,
  implementation,
  memberName,
  value,
  memberType,
  cstrName
) => {
  try {
    isValidMemberName(memberName) &&
      isNaN(memberName[0]) &&
      ('function' === (memberType = typeof (value = implementation[memberName]))
        ? (String(value).includes('[native') ||
            Object.getPrototypeOf(implementation)[memberName]) &&
          interfaceMembers.push([memberName, 5])
        : 'object' === memberType && null != value
        ? 'Object' !== (cstrName = getConstructorName(value)) &&
          window[cstrName] &&
          interfaceMembers.push([memberName, value.nodeType || cstrName])
        : 'symbol' !== memberType &&
          (memberName.toUpperCase() === memberName
            ? interfaceMembers.push([memberName, 6, value])
            : interfaceMembers.push([memberName, 6])))
  } catch (e) {
    console.warn(e)
  }
}

const htmlConstructorToTagMap = {
  Anchor: 'A',
  DList: 'DL',
  Image: 'IMG',
  OList: 'OL',
  Paragraph: 'P',
  TableCaption: 'CAPTION',
  TableCell: 'TD',
  TableCol: 'COLGROUP',
  TableRow: 'TR',
  TableSection: 'TBODY',
  UList: 'UL',
}

const getHtmlTagNameFromConstructor = (t) => {
  t = t.substr(4).replace('Element', '')
  return htmlConstructorToTagMap[t] || t
}

const readStorage = (win, storageName) => {
  let items = []
  let i = 0
  let l = len(win[storageName])
  let key
  for (; i < l; i++) {
    key = win[storageName].key(i)
    items.push([key, win[storageName].getItem(key)])
  }
  return items
}

const createMessengerAtomics = async (sandboxWindow, receiveMessage) => {
  const sharedDataBuffer = new SharedArrayBuffer(1073741824)
  const sharedData = new Int32Array(sharedDataBuffer)
  return (worker, mainWindow, msg) => {
    const msgType = msg[0]
    if (0 === msgType) {
      const initData = ((win) => {
        const startTime = performance.now()
        const docImpl = win.document.implementation.createHTMLDocument()
        const textNode = docImpl.createTextNode('')
        const comment = docImpl.createComment('')
        const frag = docImpl.createDocumentFragment()
        const elm = docImpl.createElement('i')
        const svg = docImpl.createElementNS('http://www.w3.org/2000/svg', 'svg')
        const canvasRenderingContext2D = docImpl
          .createElement('canvas')
          .getContext('2d')
        const mutationObserver = new MutationObserver(noop)
        const resizeObserver = new ResizeObserver(noop)
        const elms = Object.getOwnPropertyNames(win)
          .filter((c) => /^HTML.+Element$/.test(c))
          .map((htmlCstrName) => {
            const htmlTagName = getHtmlTagNameFromConstructor(htmlCstrName)
            return [docImpl.createElement(htmlTagName)]
          })
        const impls = [
          [win.history],
          [win.screen],
          [win.screen.orientation],
          [mutationObserver, 12],
          [resizeObserver, 12],
          [textNode],
          [comment],
          [frag],
          [elm],
          [elm.attributes],
          [elm.classList],
          [elm.dataset],
          [elm.style],
          [svg],
          [docImpl],
          [docImpl.doctype],
          [canvasRenderingContext2D],
          ...elms,
        ]
          .filter((implData) => implData[0])
          .map((implData) => {
            const impl = implData[0]
            const interfaceType = implData[1]
            const cstrName = impl.constructor.name
            return [cstrName, win[cstrName].prototype, impl, interfaceType]
          })
        const $interfaces$ = [
          readImplementation('Window', win),
          readImplementation('Node', textNode),
        ]
        const config = win.partytown || {}
        const libPath = (config.lib || '/~partytown/') + 'debug/'
        const initWebWorkerData = {
          $config$: JSON.stringify(config, (k, v) => {
            'function' == typeof v &&
              (v = String(v)).startsWith(k + '(') &&
              (v = 'function ' + v)
            return v
          }),
          $libPath$: new URL(libPath, win.location) + '',
          $interfaces$: $interfaces$,
          $localStorage$: readStorage(win, 'localStorage'),
          $sessionStorage$: readStorage(win, 'sessionStorage'),
        }
        impls.map(([cstrName, CstrPrototype, impl, intefaceType]) =>
          readOwnImplementation(
            $interfaces$,
            cstrName,
            CstrPrototype,
            impl,
            intefaceType
          )
        )
        logMain(
          `Read ${$interfaces$.length} interfaces in ${(
            performance.now() - startTime
          ).toFixed(1)}ms`
        )
        return initWebWorkerData
      })(mainWindow)
      initData.$sharedDataBuffer$ = sharedDataBuffer
      worker.postMessage([1, initData])
    } else if (9 === msgType) {
      const accessReq = msg[1]
      receiveMessage(accessReq, (accessRsp) => {
        const stringifiedData = JSON.stringify(accessRsp)
        const stringifiedDataLength = stringifiedData.length
        for (let i = 0; i < stringifiedDataLength; i++) {
          sharedData[i + 1] = stringifiedData.charCodeAt(i)
        }
        sharedData[0] = stringifiedDataLength
        Atomics.notify(sharedData, 0)
      })
    } else {
      onMessageFromWebWorker(worker, mainWindow, msg)
    }
  }
}

;(async (sandboxWindow) => {
  let worker
  const mainWindow = sandboxWindow.parent
  const onMessageHandler = await createMessengerAtomics(
    0,
    (accessReq, responseCallback) =>
      mainAccessHandler(worker, accessReq).then(responseCallback)
  )
  if (onMessageHandler) {
    worker = new Worker('./partytown-ww-atomics.js', {
      name: 'Partytown 🎉',
    })
    worker.onmessage = (ev) => {
      const msg = ev.data
      10 === msg[0]
        ? mainAccessHandler(worker, msg[1])
        : onMessageHandler(worker, mainWindow, msg)
    }
    logMain('Created Partytown web worker (0.0.29)')
    worker.onerror = (ev) => console.error('Web Worker Error', ev)
    mainWindow.addEventListener('pt1', (ev) => {
      const win = ev.detail
      const winId = getAndSetInstanceId(win.frameElement)
      registerWindow(worker, winId, win)
    })
  }
})(window)
