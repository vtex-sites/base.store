/* Partytown 0.0.29 - MIT builder.io */
;((self) => {
  const WinIdKey = Symbol()
  const InstanceIdKey = Symbol()
  const NodeNameKey = Symbol()
  const NamespaceKey = Symbol()
  const ApplyPathKey = Symbol()
  const InstanceStateKey = Symbol()
  const HookContinue = Symbol()
  const HookPrevent = Symbol()
  const webWorkerInstances = new Map()
  const webWorkerRefsByRefId = {}
  const webWorkerRefIdsByRef = new WeakMap()
  const nodeConstructors = {}
  const envGlobalConstructors = {}
  const webWorkerCtx = {}
  const environments = {}
  const cachedDimensions = new Map()
  const cachedTree = new Map()
  const dimensionMethodNames = 'getClientRects,getBoundingClientRect'.split(',')
  const dimensionPropNames =
    'innerHeight,innerWidth,outerHeight,outerWidth,clientHeight,clientWidth,clientTop,clientLeft,scrollHeight,scrollWidth,scrollTop,scrollLeft,offsetHeight,offsetWidth,offsetTop,offsetLeft'.split(
      ','
    )
  const elementTreePropNames =
    'childElementCount,children,firstElementChild,lastElementChild,nextElementSibling,previousElementSibling'
  const noop = () => !0
  const logWorker = (msg, winId = -1) => {
    try {
      if (webWorkerCtx.$config$.logStackTraces) {
        const frames = new Error().stack.split('\n')
        const i = frames.findIndex((f) => f.includes('logWorker'))
        msg += '\n' + frames.slice(i + 1).join('\n')
      }
      let prefix
      let color
      if (winId > -1) {
        prefix = `Worker (${normalizedWinId(winId)}) 🎉`
        color = winColor(winId)
      } else {
        prefix = self.name
        color = '#9844bf'
      }
      if (webWorkerCtx.lastLog !== msg) {
        webWorkerCtx.lastLog = msg
        console.debug.apply(console, [
          `%c${prefix}`,
          `background: ${color}; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;`,
          msg,
        ])
      }
    } catch (e) {}
  }
  const winIds = []
  const normalizedWinId = (winId) => {
    winIds.includes(winId) || winIds.push(winId)
    return winIds.indexOf(winId) + 1
  }
  const winColor = (winId) => {
    const colors = ['#00309e', '#ea3655', '#eea727']
    return colors[normalizedWinId(winId) - 1] || colors[colors.length - 1]
  }
  const logWorkerGlobalConstructor = (winId, cstrName, args) => {
    if (webWorkerCtx.$config$.logCalls) {
      try {
        logWorker(
          `Construct new ${cstrName}(${args
            .map((v) => logValue([], v))
            .join(', ')})`,
          winId
        )
      } catch (e) {}
    }
  }
  const logTargetProp = (target, accessType, applyPath) => {
    let n = ''
    if (target) {
      const instanceId = target[InstanceIdKey]
      const cstrName = getConstructorName(target)
      if (0 === instanceId) {
        n = ''
      } else if (1 === instanceId) {
        n = 'document.'
      } else if (2 === instanceId) {
        n = 'document.documentElement.'
      } else if (3 === instanceId) {
        n = 'document.head.'
      } else if (4 === instanceId) {
        n = 'document.body.'
      } else if (target[NodeNameKey]) {
        let nodeName = target[NodeNameKey]
        n =
          '#text' === nodeName
            ? 'textNode.'
            : '#comment' === nodeName
            ? 'commentNode.'
            : '#document' === nodeName
            ? 'document.'
            : 'html' === nodeName
            ? 'doctype.'
            : target.nodeName.toLowerCase() + 'Element.'
      } else if (2 === target.nodeType) {
        n = 'attributes.'
      } else if ('CanvasRenderingContext2D' === cstrName) {
        n = 'context2D.'
      } else if ('CSSStyleDeclaration' === cstrName) {
        n = 'value.'
      } else if ('MutationObserver' === cstrName) {
        n = 'mutationObserver.'
      } else if ('NamedNodeMap' === cstrName) {
        n = 'namedNodeMap.'
      } else if ('ResizeObserver' === cstrName) {
        n = 'resizeObserver.'
      } else {
        n = '¯\\_(ツ)_/¯ TARGET.'
        console.warn('¯\\_(ツ)_/¯ TARGET', target)
      }
      target[ApplyPathKey] &&
        target[ApplyPathKey].length &&
        (n += [...target[ApplyPathKey]].join('.') + '.')
    }
    if (applyPath.length > 1) {
      const first = applyPath.slice(0, applyPath.length - 1)
      const last = applyPath[applyPath.length - 1]
      if (!isNaN(last)) {
        return n + `${first.join('.')}[${last}]`
      }
    }
    return n + applyPath.join('.')
  }
  const logValue = (applyPath, v) => {
    const type = typeof v
    if (void 0 === v) {
      return 'undefined'
    }
    if ('boolean' === type || 'number' === type || null == v) {
      return JSON.stringify(v)
    }
    if ('string' === type) {
      return applyPath.includes('cookie')
        ? JSON.stringify(v.substr(0, 10) + '...')
        : JSON.stringify(v.length > 50 ? v.substr(0, 40) + '...' : v)
    }
    if (Array.isArray(v)) {
      return `[${v.map(logValue).join(', ')}]`
    }
    if ('object' === type) {
      const instanceId = v[InstanceIdKey]
      if ('number' == typeof instanceId) {
        if (4 === instanceId) {
          return '<body>'
        }
        if (1 === instanceId) {
          return '#document'
        }
        if (2 === instanceId) {
          return '<html>'
        }
        if (3 === instanceId) {
          return '<head>'
        }
        if (0 === instanceId) {
          return 'window'
        }
        if (v[NodeNameKey]) {
          if (1 === v.nodeType) {
            return `<${v[NodeNameKey].toLowerCase()}>`
          }
          if (10 === v.nodeType) {
            return `<!DOCTYPE ${v[NodeNameKey]}>`
          }
          if (v.nodeType <= 11) {
            return v[NodeNameKey]
          }
        }
        return '¯\\_(ツ)_/¯ instance obj'
      }
      return v[Symbol.iterator]
        ? `[${Array.from(v)
            .map((i) => logValue(applyPath, i))
            .join(', ')}]`
        : 'value' in v
        ? 'string' == typeof v.value
          ? `"${v.value}"`
          : objToString(v.value)
        : objToString(v)
    }
    return ((v) => 'object' == typeof v && v && v.then)(v)
      ? 'Promise'
      : 'function' === type
      ? `ƒ() ${v.name || ''}`.trim()
      : `¯\\_(ツ)_/¯ ${String(v)}`.trim()
  }
  const objToString = (obj) => {
    const s = []
    for (let key in obj) {
      const value = obj[key]
      const type = typeof value
      'string' === type
        ? s.push(`${key}: "${value}"`)
        : 'function' === type
        ? s.push(`${key}: ƒ`)
        : Array.isArray(type)
        ? s.push(`${key}: [..]`)
        : 'object' === type && value
        ? s.push(`${key}: {..}`)
        : s.push(`${key}: ${String(value)}`)
    }
    let str = s.join(', ')
    str.length > 200 && (str = str.substr(0, 200) + '..')
    return `{ ${str} }`
  }
  const len = (obj) => obj.length
  const getConstructorName = (obj) => {
    try {
      return obj.constructor.name
    } catch (e) {}
    return ''
  }
  const defineConstructorName = (Cstr, value) =>
    Object.defineProperty(Cstr, 'name', {
      value: value,
    })
  const EMPTY_ARRAY = []
  const randomId = () => Math.round(9999999999 * Math.random() + 4)
  const defineProperty = (obj, memberName, descriptor) =>
    Object.defineProperty(obj, memberName, {
      ...descriptor,
      configurable: !0,
    })
  const definePrototypeProperty = (Cstr, memberName, descriptor) =>
    defineProperty(Cstr.prototype, memberName, descriptor)
  const definePrototypePropertyDescriptor = (Cstr, propertyDescriptorMap) =>
    Object.defineProperties(Cstr.prototype, propertyDescriptorMap)
  const definePrototypeValue = (Cstr, memberName, value) =>
    definePrototypeProperty(Cstr, memberName, {
      value: value,
      writable: !0,
    })
  const taskQueue = []
  let asyncMsgTimer = 0
  const queue = (
    instance,
    $applyPath$,
    isSetter,
    $assignInstanceId$,
    $groupedGetters$
  ) => {
    const $instanceId$ = instance[InstanceIdKey]
    taskQueue.push({
      $winId$: instance[WinIdKey],
      $instanceId$: $instanceId$,
      $applyPath$: [...instance[ApplyPathKey], ...$applyPath$],
      $assignInstanceId$: $assignInstanceId$,
      $groupedGetters$: $groupedGetters$,
    })
    if (!isSetter) {
      return sendToMain(!0)
    }
    asyncMsgTimer = setTimeout(sendToMain, 30)
  }
  const sendToMain = (isBlocking) => {
    clearTimeout(asyncMsgTimer)
    if (len(taskQueue)) {
      webWorkerCtx.$config$.logMainAccess &&
        logWorker(`Main access, tasks sent: ${taskQueue.length}`)
      const endTask = taskQueue[len(taskQueue) - 1]
      const accessReq = {
        $msgId$: randomId(),
        $tasks$: taskQueue.slice(),
      }
      taskQueue.length = 0
      if (isBlocking) {
        const accessRsp = ((webWorkerCtx, accessReq) => {
          const sharedDataBuffer = webWorkerCtx.$sharedDataBuffer$
          const sharedData = new Int32Array(sharedDataBuffer)
          Atomics.store(sharedData, 0, 0)
          webWorkerCtx.$postMessage$([9, accessReq])
          Atomics.wait(sharedData, 0, 0)
          let dataLength = Atomics.load(sharedData, 0)
          0 === dataLength && console.error('Atomics failed', sharedDataBuffer)
          let accessRespStr = ''
          for (let i = 0; i < dataLength; i++) {
            accessRespStr += String.fromCharCode(sharedData[i + 1])
          }
          return JSON.parse(accessRespStr)
        })(webWorkerCtx, accessReq)
        const isPromise = accessRsp.$isPromise$
        const rtnValue = deserializeFromMain(
          endTask.$instanceId$,
          endTask.$applyPath$,
          accessRsp.$rtnValue$
        )
        if (accessRsp.$error$) {
          if (isPromise) {
            return Promise.reject(accessRsp.$error$)
          }
          throw new Error(accessRsp.$error$)
        }
        return isPromise ? Promise.resolve(rtnValue) : rtnValue
      }
      webWorkerCtx.$postMessage$([10, accessReq])
    }
  }
  const getter = (instance, applyPath, groupedGetters) => {
    let rtnValue
    if (webWorkerCtx.$config$.get) {
      rtnValue = webWorkerCtx.$config$.get(
        createHookOptions(instance, applyPath)
      )
      if (rtnValue !== HookContinue) {
        return rtnValue
      }
    }
    rtnValue = queue(instance, applyPath, !1, void 0, groupedGetters)
    ;((
      target,
      applyPath,
      rtnValue,
      restrictedToWorker = !1,
      groupedGetters = !1
    ) => {
      if (webWorkerCtx.$config$.logGetters) {
        try {
          const msg = `Get ${logTargetProp(
            target,
            'Get',
            applyPath
          )}, returned: ${logValue(applyPath, rtnValue)}${
            restrictedToWorker ? ' (restricted to worker)' : ''
          }${groupedGetters ? ' (grouped getter)' : ''}`
          msg.includes('Symbol(') || logWorker(msg, target[WinIdKey])
        } catch (e) {}
      }
    })(instance, applyPath, rtnValue, !1, !!groupedGetters)
    return rtnValue
  }
  const setter = (instance, applyPath, value) => {
    if (webWorkerCtx.$config$.set) {
      const hookSetterValue = webWorkerCtx.$config$.set({
        value: value,
        prevent: HookPrevent,
        ...createHookOptions(instance, applyPath),
      })
      if (hookSetterValue === HookPrevent) {
        return
      }
      hookSetterValue !== HookContinue && (value = hookSetterValue)
    }
    const serializedValue = serializeInstanceForMain(instance, value)
    const setterApplyPath = [...applyPath, serializedValue, 0]
    ;((target, applyPath, value, restrictedToWorker = !1) => {
      if (webWorkerCtx.$config$.logSetters) {
        try {
          applyPath = applyPath.slice(0, applyPath.length - 2)
          logWorker(
            `Set ${logTargetProp(target, 'Set', applyPath)}, value: ${logValue(
              applyPath,
              value
            )}${restrictedToWorker ? ' (restricted to worker)' : ''}`,
            target[WinIdKey]
          )
        } catch (e) {}
      }
    })(instance, setterApplyPath, value)
    queue(instance, setterApplyPath, !0)
  }
  const callMethod = (instance, applyPath, args, assignInstanceId) => {
    let rtnValue
    if (webWorkerCtx.$config$.apply) {
      rtnValue = webWorkerCtx.$config$.apply({
        args: args,
        ...createHookOptions(instance, applyPath),
      })
      if (rtnValue !== HookContinue) {
        return rtnValue
      }
    }
    const methodName = applyPath[len(applyPath) - 1]
    const isSetter = setterMethods.includes(methodName)
    const callApplyPath = [
      ...applyPath,
      serializeInstanceForMain(instance, args),
    ]
    rtnValue = queue(instance, callApplyPath, isSetter, assignInstanceId)
    ;((target, applyPath, args, rtnValue) => {
      if (webWorkerCtx.$config$.logCalls) {
        try {
          applyPath = applyPath.slice(0, applyPath.length - 1)
          logWorker(
            `Call ${logTargetProp(target, 'Call', applyPath)}(${args
              .map((v) => logValue(applyPath, v))
              .join(', ')}), returned: ${logValue(applyPath, rtnValue)}`,
            target[WinIdKey]
          )
        } catch (e) {}
      }
    })(instance, callApplyPath, args, rtnValue)
    isSetter ||
      dimensionMethodNames.includes(methodName) ||
      cachedDimensions.clear()
    return rtnValue
  }
  const createHookOptions = (instance, applyPath) => ({
    name: applyPath.join('.'),
    continue: HookContinue,
    nodeName: instance[NodeNameKey],
    constructor: instance.constructor && instance.constructor.name,
  })
  const setterMethods =
    'addEventListener,removeEventListener,createElement,createTextNode,insertBefore,insertRule,deleteRule,setAttribute,setItem,removeItem,classList.add,classList.remove,classList.toggle'.split(
      ','
    )
  const addStorageApi = (win, storageName, items) => {
    const getIndexByKey = (key) =>
      items.findIndex((i) => i[STORAGE_KEY] === key)
    const storage = {
      getItem(key) {
        const index = getIndexByKey(key)
        return index > -1 ? items[index][STORAGE_VALUE] : null
      },
      setItem(key, value) {
        const index = getIndexByKey(key)
        index > -1
          ? (items[index][STORAGE_VALUE] = value)
          : items.push([key, value])
        callMethod(win, [storageName, 'setItem'], [key, value])
      },
      removeItem(key) {
        const index = getIndexByKey(key)
        index > -1 && items.splice(index, 1)
        callMethod(win, [storageName, 'removeItem'], [key])
      },
      key(index) {
        const item = items[index]
        return item ? item[STORAGE_KEY] : null
      },
      clear() {
        items.length = 0
        callMethod(win, [storageName, 'clear'], EMPTY_ARRAY)
      },
      get length() {
        return items.length
      },
    }
    win[storageName] = storage
  }
  const STORAGE_KEY = 0
  const STORAGE_VALUE = 1
  const getOrCreateNodeInstance = (winId, instanceId, nodeName, namespace) => {
    let instance = webWorkerInstances.get(instanceId)
    if (!instance) {
      instance = createNodeInstance(winId, instanceId, nodeName, namespace)
      webWorkerInstances.set(instanceId, instance)
    }
    return instance
  }
  const createNodeInstance = (winId, instanceId, nodeName, namespace) =>
    new (nodeConstructors[nodeName]
      ? nodeConstructors[nodeName]
      : nodeName.includes('-')
      ? nodeConstructors.UNKNOWN
      : self.HTMLElement)(winId, instanceId, [], nodeName, namespace)
  const hasInstanceStateValue = (instance, stateKey) =>
    stateKey in instance[InstanceStateKey]
  const getInstanceStateValue = (instance, stateKey) =>
    instance[InstanceStateKey][stateKey]
  const setInstanceStateValue = (instance, stateKey, stateValue) =>
    (instance[InstanceStateKey][stateKey] = stateValue)
  const setWorkerRef = (ref, refId) => {
    if (!(refId = webWorkerRefIdsByRef.get(ref))) {
      webWorkerRefIdsByRef.set(ref, (refId = randomId()))
      webWorkerRefsByRefId[refId] = ref
    }
    return refId
  }
  const runScriptContent = (env, instanceId, scriptContent, winId) => {
    let errorMsg = ''
    try {
      webWorkerCtx.$config$.logScriptExecution &&
        logWorker(
          `Execute script (${instanceId}): ${scriptContent
            .substr(0, 100)
            .split('\n')
            .map((l) => l.trim())
            .join(' ')
            .trim()
            .substr(0, 60)}...`,
          winId
        )
      env.$currentScriptId$ = instanceId
      run(env, scriptContent, env.$location$ + '')
    } catch (contentError) {
      console.error(scriptContent, contentError)
      errorMsg = String(contentError.stack || contentError) + ''
    }
    env.$currentScriptId$ = -1
    return errorMsg
  }
  const run = (env, scriptContent, scriptUrl) => {
    scriptContent = scriptContent.replace(/\/\/# source/g, '//Xsource')
    new Function(
      `with(this){${scriptContent}}\n//# sourceURL=${scriptUrl}`
    ).apply(env.$window$)
  }
  const runStateLoadHandlers = (instance, type, handlers) => {
    ;(handlers = getInstanceStateValue(instance, type)) &&
      ((cb, ms) => {
        setTimeout(cb, ms)
      })(() =>
        handlers.map((cb) =>
          cb({
            type: type,
          })
        )
      )
  }
  const resolveToUrl = (env, url, noUserHook, baseLocation) => {
    baseLocation = env.$location$
    while (!baseLocation.host) {
      baseLocation = (env = environments[env.$parentWinId$]).$location$
      if (env.$winId$ === env.$parentWinId$) {
        break
      }
    }
    const resolvedUrl = new URL(url || '', baseLocation)
    if (!noUserHook && webWorkerCtx.$config$.resolveUrl) {
      const configResolvedUrl = webWorkerCtx.$config$.resolveUrl(
        resolvedUrl,
        baseLocation
      )
      if (configResolvedUrl) {
        return configResolvedUrl
      }
    }
    return resolvedUrl
  }
  const resolveUrl = (env, url, noUserHook) =>
    resolveToUrl(env, url, noUserHook) + ''
  const getUrl = (elm) =>
    resolveToUrl(getEnv(elm), getInstanceStateValue(elm, 4))
  const getPartytownScript = () =>
    `<script src=${JSON.stringify(
      webWorkerCtx.$libPath$ + 'partytown.js'
    )} async defer><\/script>`
  const createImageConstructor = (env) =>
    class HTMLImageElement {
      constructor() {
        this.s = ''
        this.l = []
        this.e = []
      }
      get src() {
        return this.s
      }
      set src(src) {
        webWorkerCtx.$config$.logImageRequests &&
          logWorker(`Image() request: ${resolveUrl(env, src)}`, env.$winId$)
        fetch(resolveUrl(env, src, !0), {
          mode: 'no-cors',
          keepalive: !0,
        }).then(
          (rsp) => {
            rsp.ok || 0 === rsp.status
              ? this.l.map((cb) =>
                  cb({
                    type: 'load',
                  })
                )
              : this.e.map((cb) =>
                  cb({
                    type: 'error',
                  })
                )
          },
          () =>
            this.e.forEach((cb) =>
              cb({
                type: 'error',
              })
            )
        )
      }
      addEventListener(eventName, cb) {
        'load' === eventName && this.l.push(cb)
        'error' === eventName && this.e.push(cb)
      }
      get onload() {
        return this.l[0]
      }
      set onload(cb) {
        this.l = [cb]
      }
      get onerror() {
        return this.e[0]
      }
      set onerror(cb) {
        this.e = [cb]
      }
    }
  class Location extends URL {
    assign() {
      logWorker('location.assign(), noop')
    }
    reload() {
      logWorker('location.reload(), noop')
    }
    replace() {
      logWorker('location.replace(), noop')
    }
  }
  class WorkerProxy {
    constructor(winId, instanceId, applyPath, nodeName, namespace) {
      this[WinIdKey] = winId
      this[InstanceIdKey] = instanceId
      this[ApplyPathKey] = applyPath || []
      this[NodeNameKey] = nodeName
      this[InstanceStateKey] = {}
      namespace && (this[NamespaceKey] = namespace)
    }
  }
  class WorkerTrapProxy extends WorkerProxy {
    constructor(winId, instanceId, applyPath, nodeName) {
      super(winId, instanceId, applyPath, nodeName)
      return new Proxy(this, {
        get: (instance, propName) => getter(instance, [propName]),
        set(instance, propName, propValue) {
          setter(instance, [propName], propValue)
          return !0
        },
      })
    }
  }
  class Window extends WorkerProxy {
    constructor($winId$, $parentWinId$, url) {
      super($winId$, 0)
      for (const globalName in self) {
        if (!(globalName in this) && 'onmessage' !== globalName) {
          const value = self[globalName]
          if (null != value) {
            const isFunction =
              'function' == typeof value &&
              !value.toString().startsWith('class')
            this[globalName] = isFunction ? value.bind(self) : value
          }
        }
      }
      Object.getOwnPropertyNames(self).map((globalName) => {
        globalName in this || (this[globalName] = self[globalName])
      })
      for (const envCstrName in envGlobalConstructors) {
        this[envCstrName] = defineConstructorName(
          class {
            constructor(...cstrArgs) {
              const instance = new (0, envGlobalConstructors[envCstrName])(
                $winId$,
                randomId()
              )
              const serializedCstrArgs = serializeInstanceForMain(
                instance,
                cstrArgs
              )
              queue(instance, [1, envCstrName, serializedCstrArgs])
              logWorkerGlobalConstructor($winId$, envCstrName, cstrArgs)
              return instance
            }
          },
          envCstrName
        )
      }
      const win = new Proxy(this, {
        has: () => !0,
      })
      environments[$winId$] = {
        $winId$: $winId$,
        $parentWinId$: $parentWinId$,
        $window$: win,
        $document$: createNodeInstance($winId$, 1, '#document'),
        $documentElement$: createNodeInstance($winId$, 2, 'HTML'),
        $head$: createNodeInstance($winId$, 3, 'HEAD'),
        $body$: createNodeInstance($winId$, 4, 'BODY'),
        $location$: new Location(url),
      }
      this.requestAnimationFrame = (cb) =>
        setTimeout(() => cb(performance.now()), 9)
      this.cancelAnimationFrame = (id) => clearTimeout(id)
      this.requestIdleCallback = (cb) => {
        const start = Date.now()
        return setTimeout(
          () =>
            cb({
              didTimeout: !1,
              timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
            }),
          1
        )
      }
      this.cancelIdleCallback = (id) => clearTimeout(id)
      addStorageApi(this, 'localStorage', webWorkerCtx.$localStorage$)
      addStorageApi(this, 'sessionStorage', webWorkerCtx.$sessionStorage$)
      defineProperty(this.performance, 'timing', {
        get: () => {
          const timing = getter(this, ['performance', 'timing'])
          return timing
            ? {
                ...timing,
                toJSON: () => timing,
              }
            : void 0
        },
      })
      return win
    }
    get Audio() {
      return ((env) =>
        class Audio {
          constructor(src) {
            const audio = env.$document$.createElement('audio')
            audio.src = src
            return audio
          }
        })(getEnv(this))
    }
    get body() {
      return getEnv(this).$body$
    }
    get document() {
      return getEnv(this).$document$
    }
    get documentElement() {
      return getEnv(this).$documentElement$
    }
    fetch(input, init) {
      input =
        'string' == typeof input || input instanceof URL
          ? String(input)
          : input.url
      return fetch(resolveUrl(getEnv(this), input), init)
    }
    get frameElement() {
      const env = getEnv(this)
      const parentWinId = env.$parentWinId$
      const winId = env.$winId$
      return winId === parentWinId
        ? null
        : getOrCreateNodeInstance(parentWinId, winId, 'IFRAME')
    }
    get globalThis() {
      return this
    }
    get head() {
      return getEnv(this).$head$
    }
    get location() {
      return getEnv(this).$location$
    }
    set location(loc) {
      getEnv(this).$location$.href = loc + ''
    }
    get Image() {
      return createImageConstructor(getEnv(this))
    }
    get name() {
      const winId = this[WinIdKey]
      return name + `${normalizedWinId(winId)} (${winId})`
    }
    get navigator() {
      return ((env) => {
        const navigator = self.navigator
        navigator.sendBeacon = (url, body) => {
          if (webWorkerCtx.$config$.logSendBeaconRequests) {
            try {
              logWorker(
                `sendBeacon: ${resolveUrl(env, url, !0)}${
                  body ? ', data: ' + JSON.stringify(body) : ''
                }`
              )
            } catch (e) {
              console.error(e)
            }
          }
          try {
            fetch(resolveUrl(env, url, !0), {
              method: 'POST',
              body: body,
              mode: 'no-cors',
              keepalive: !0,
            })
            return !0
          } catch (e) {
            console.error(e)
            return !1
          }
        }
        return navigator
      })(getEnv(this))
    }
    get origin() {
      return getEnv(this).$location$.origin
    }
    get parent() {
      return environments[getEnv(this).$parentWinId$].$window$
    }
    get self() {
      return this
    }
    get top() {
      for (const envWinId in environments) {
        if (
          environments[envWinId].$winId$ ===
          environments[envWinId].$parentWinId$
        ) {
          return environments[envWinId].$window$
        }
      }
    }
    get window() {
      return this
    }
  }
  const createEnvironment = ({
    $winId$: $winId$,
    $parentWinId$: $parentWinId$,
    $url$: $url$,
  }) => {
    if (environments[$winId$]) {
      environments[$winId$].$location$.href = $url$
    } else {
      new Window($winId$, $parentWinId$, $url$)
      logWorker(
        `Created ${
          $winId$ === $parentWinId$ ? 'top' : 'iframe'
        } window ${normalizedWinId($winId$)} environment (${$winId$})`,
        $winId$
      )
    }
    webWorkerCtx.$postMessage$([6, $winId$])
  }
  const getEnv = (instance) => environments[instance[WinIdKey]]
  class Node extends WorkerProxy {
    appendChild(node) {
      return this.insertBefore(node, null)
    }
    get href() {}
    set href(_) {}
    insertBefore(newNode, referenceNode) {
      const winId = (newNode[WinIdKey] = this[WinIdKey])
      const instanceId = newNode[InstanceIdKey]
      const nodeName = newNode[NodeNameKey]
      const isScript = 'SCRIPT' === nodeName
      const isIFrame = 'IFRAME' === nodeName
      if (isScript) {
        const scriptContent = getInstanceStateValue(newNode, 3)
        if (scriptContent) {
          const errorMsg = runScriptContent(
            getEnv(newNode),
            instanceId,
            scriptContent,
            winId
          )
          const datasetType = errorMsg ? 'pterror' : 'ptid'
          const datasetValue = errorMsg || instanceId
          setter(newNode, ['type'], 'text/partytown-x')
          setter(newNode, ['dataset', datasetType], datasetValue)
          setter(newNode, ['innerHTML'], scriptContent)
        }
      }
      callMethod(this, ['insertBefore'], [newNode, referenceNode])
      isIFrame &&
        ((iframe) => {
          let i = 0
          const winId = iframe[InstanceIdKey]
          setter(iframe, ['dataset', 'ptwindow'], winId)
          const callback = () => {
            if (environments[winId] && environments[winId].$isInitialized$) {
              let type = getInstanceStateValue(iframe, 1) ? 'error' : 'load'
              let handlers = getInstanceStateValue(iframe, type)
              handlers &&
                handlers.map((handler) =>
                  handler({
                    type: type,
                  })
                )
            } else if (i++ > 2e3) {
              let errorHandlers = getInstanceStateValue(iframe, 'error')
              errorHandlers &&
                errorHandlers.map((handler) =>
                  handler({
                    type: 'error',
                  })
                )
              console.error(`Iframe timeout: ${winId}`)
            } else {
              setTimeout(callback, 9)
            }
          }
          callback()
        })(newNode)
      if (isScript) {
        sendToMain(!0)
        webWorkerCtx.$postMessage$([6, winId])
      }
      return newNode
    }
    get nodeName() {
      return this[NodeNameKey]
    }
    get nodeType() {
      return 3
    }
    get ownerDocument() {
      return getEnv(this).$document$
    }
  }
  class Attr {
    constructor(serializedAttr) {
      this.name = serializedAttr[0]
      this.value = serializedAttr[1]
    }
    get nodeName() {
      return this.name
    }
    get nodeType() {
      return 2
    }
  }
  class NodeList {
    constructor(nodes) {
      ;(this._ = nodes).map((node, index) => (this[index] = node))
    }
    entries() {
      return this._.entries()
    }
    forEach(cb, thisArg) {
      this._.map(cb, thisArg)
    }
    item(index) {
      return this[index]
    }
    keys() {
      return this._.keys()
    }
    get length() {
      return len(this._)
    }
    values() {
      return this._.values()
    }
    [Symbol.iterator]() {
      return this._[Symbol.iterator]()
    }
  }
  const serializeForMain = ($winId$, $instanceId$, value, added) => {
    if (void 0 !== value) {
      let type = typeof value
      if (
        'string' === type ||
        'boolean' === type ||
        'number' === type ||
        null == value
      ) {
        return [9, value]
      }
      if ('function' === type) {
        return [
          10,
          {
            $winId$: $winId$,
            $instanceId$: $instanceId$,
            $refId$: setWorkerRef(value),
          },
        ]
      }
      added = added || new Set()
      if (Array.isArray(value)) {
        return added.has(value)
          ? [0, []]
          : [
              0,
              value.map((v) =>
                serializeForMain($winId$, $instanceId$, v, added)
              ),
            ]
      }
      if ('object' === type) {
        return 'number' == typeof value[InstanceIdKey]
          ? [
              6,
              {
                $winId$: value[WinIdKey],
                $instanceId$: value[InstanceIdKey],
              },
            ]
          : value instanceof Event
          ? [4, serializeObjectForMain($winId$, $instanceId$, value, !1, added)]
          : [8, serializeObjectForMain($winId$, $instanceId$, value, !0, added)]
      }
    }
  }
  const serializeObjectForMain = (
    winId,
    instanceId,
    obj,
    includeFunctions,
    added,
    serializedObj,
    propName,
    propValue
  ) => {
    serializedObj = {}
    if (!added.has(obj)) {
      added.add(obj)
      for (propName in obj) {
        propValue = obj[propName]
        ;(includeFunctions || 'function' != typeof propValue) &&
          (serializedObj[propName] = serializeForMain(
            winId,
            instanceId,
            propValue,
            added
          ))
      }
    }
    return serializedObj
  }
  const serializeInstanceForMain = (instance, value) =>
    instance
      ? serializeForMain(instance[WinIdKey], instance[InstanceIdKey], value)
      : [9, value]
  const deserializeFromMain = (
    instanceId,
    applyPath,
    serializedValueTransfer,
    serializedType,
    serializedValue
  ) => {
    if (serializedValueTransfer) {
      serializedType = serializedValueTransfer[0]
      serializedValue = serializedValueTransfer[1]
      if (
        9 === serializedType ||
        2 === serializedType ||
        3 === serializedType
      ) {
        return serializedValue
      }
      if (10 === serializedType) {
        return deserializeRefFromMain(applyPath, serializedValue)
      }
      if (6 === serializedType) {
        return getOrCreateSerializedInstance(serializedValue)
      }
      if (7 === serializedType) {
        return new NodeList(serializedValue.map(getOrCreateSerializedInstance))
      }
      if (1 === serializedType) {
        return new Attr(serializedValue)
      }
      if (0 === serializedType) {
        return serializedValue.map((v) =>
          deserializeFromMain(instanceId, applyPath, v)
        )
      }
      if (4 === serializedType) {
        return ((eventProps) =>
          new Proxy(new Event(eventProps.type, eventProps), {
            get: (target, propName) =>
              propName in eventProps
                ? eventProps[propName]
                : target[String(propName)],
          }))(deserializeObjectFromMain(instanceId, applyPath, serializedValue))
      }
      if (8 === serializedType) {
        return deserializeObjectFromMain(instanceId, applyPath, serializedValue)
      }
    }
  }
  const deserializeObjectFromMain = (
    instanceId,
    applyPath,
    serializedValue,
    obj,
    key
  ) => {
    obj = {}
    for (key in serializedValue) {
      obj[key] = deserializeFromMain(
        instanceId,
        [...applyPath, key],
        serializedValue[key]
      )
    }
    return obj
  }
  const getOrCreateSerializedInstance = ({
    $winId$: $winId$,
    $instanceId$: $instanceId$,
    $nodeName$: $nodeName$,
  }) =>
    getPlatformInstance($winId$, $instanceId$) ||
    getOrCreateNodeInstance($winId$, $instanceId$, $nodeName$)
  const getPlatformInstance = (winId, instanceId) => {
    const env = environments[winId]
    return 0 === instanceId
      ? env.$window$
      : 1 === instanceId
      ? env.$document$
      : 2 === instanceId
      ? env.$documentElement$
      : 3 === instanceId
      ? env.$head$
      : 4 === instanceId
      ? env.$body$
      : void 0
  }
  const deserializeRefFromMain = (
    applyPath,
    {
      $winId$: $winId$,
      $instanceId$: $instanceId$,
      $nodeName$: $nodeName$,
      $refId$: $refId$,
    }
  ) => {
    webWorkerRefsByRefId[$refId$] ||
      webWorkerRefIdsByRef.set(
        (webWorkerRefsByRefId[$refId$] = function (...args) {
          const instance = getOrCreateNodeInstance(
            $winId$,
            $instanceId$,
            $nodeName$
          )
          return callMethod(instance, applyPath, args)
        }),
        $refId$
      )
    return webWorkerRefsByRefId[$refId$]
  }
  const HTMLStyleDescriptorMap = {
    sheet: {
      get() {
        return new CSSStyleSheet(this)
      },
    },
  }
  class CSSStyleSheet {
    constructor(ownerNode) {
      this.ownerNode = ownerNode
    }
    get cssRules() {
      const ownerNode = this.ownerNode
      return new Proxy(
        {},
        {
          get(target, propKey) {
            const propName = String(propKey)
            return 'item' === propName
              ? (index) => getCssRule(ownerNode, index)
              : 'length' === propName
              ? getCssRules(ownerNode).length
              : isNaN(propName)
              ? target[propKey]
              : getCssRule(ownerNode, propName)
          },
        }
      )
    }
    insertRule(ruleText, index) {
      const cssRules = getCssRules(this.ownerNode)
      if (
        (index = void 0 === index ? 0 : index) >= 0 &&
        index <= cssRules.length
      ) {
        callMethod(this.ownerNode, ['sheet', 'insertRule'], [ruleText, index])
        cssRules.splice(index, 0, 0)
      }
      return index
    }
    deleteRule(index) {
      callMethod(this.ownerNode, ['sheet', 'deleteRule'], [index])
      getCssRules(this.ownerNode).splice(index, 1)
    }
  }
  const getCssRules = (ownerNode) => {
    let cssRules = getInstanceStateValue(ownerNode, 2)
    if (!cssRules) {
      cssRules = getter(ownerNode, ['sheet', 'cssRules'])
      setInstanceStateValue(ownerNode, 2, cssRules)
    }
    return cssRules
  }
  const getCssRule = (ownerNode, index) => {
    let cssRules = getCssRules(ownerNode)
    0 === cssRules[index] &&
      (cssRules[index] = getter(ownerNode, [
        'sheet',
        'cssRules',
        parseInt(index, 10),
      ]))
    return cssRules[index]
  }
  const DocumentDescriptorMap = {
    body: {
      get() {
        return getEnv(this).$body$
      },
    },
    createElement: {
      value(tagName) {
        tagName = tagName.toUpperCase()
        const winId = this[WinIdKey]
        const instanceId = randomId()
        const elm = getOrCreateNodeInstance(winId, instanceId, tagName)
        callMethod(this, ['createElement'], [tagName], instanceId)
        if ('IFRAME' === tagName) {
          createEnvironment({
            $winId$: instanceId,
            $parentWinId$: winId,
            $url$: 'about:blank',
          })
          setter(elm, ['srcdoc'], getPartytownScript())
        } else {
          'SCRIPT' === tagName && setter(elm, ['type'], 'text/partytown')
        }
        return elm
      },
    },
    createElementNS: {
      value(namespace, tagName) {
        tagName = tagName.toLowerCase()
        const winId = this[WinIdKey]
        const instanceId = randomId()
        const nsElm = getOrCreateNodeInstance(
          winId,
          instanceId,
          tagName,
          namespace
        )
        callMethod(this, ['createElementNS'], [namespace, tagName], instanceId)
        return nsElm
      },
    },
    createTextNode: {
      value(text) {
        const winId = this[WinIdKey]
        const instanceId = randomId()
        const textNode = getOrCreateNodeInstance(winId, instanceId, '#text')
        callMethod(this, ['createTextNode'], [text], instanceId)
        return textNode
      },
    },
    createEvent: {
      value: (type) => new Event(type),
    },
    currentScript: {
      get() {
        const winId = this[WinIdKey]
        const currentScriptId = getEnv(this).$currentScriptId$
        return currentScriptId > 0
          ? getOrCreateNodeInstance(winId, currentScriptId, 'SCRIPT')
          : null
      },
    },
    defaultView: {
      get() {
        return ((instance) => getEnv(instance).$window$)(this)
      },
    },
    documentElement: {
      get() {
        return getEnv(this).$documentElement$
      },
    },
    getElementsByTagName: {
      value(tagName) {
        return 'BODY' === (tagName = tagName.toUpperCase())
          ? [getEnv(this).$body$]
          : 'HEAD' === tagName
          ? [getEnv(this).$head$]
          : callMethod(this, ['getElementsByTagName'], [tagName])
      },
    },
    head: {
      get() {
        return getEnv(this).$head$
      },
    },
    implementation: {
      value: {
        hasFeature: noop,
      },
    },
    location: {
      get() {
        return getEnv(this).$location$
      },
      set(url) {
        getEnv(this).$location$.href = url + ''
      },
    },
    nodeType: {
      value: 9,
    },
    parentNode: {
      value: null,
    },
    parentElement: {
      value: null,
    },
    readyState: {
      value: 'complete',
    },
  }
  const DocumentElementChildDescriptorMap = {
    parentElement: {
      get() {
        return this.parentNode
      },
    },
    parentNode: {
      get() {
        return getEnv(this).$documentElement$
      },
    },
  }
  const DocumentElementDescriptorMap = {
    parentElement: {
      value: null,
    },
    parentNode: {
      get() {
        return getEnv(this).$document$
      },
    },
  }
  const ElementDescriptorMap = {
    localName: {
      get() {
        return this[NodeNameKey].toLowerCase()
      },
    },
    namespaceURI: {
      get() {
        return this[NamespaceKey] || 'http://www.w3.org/1999/xhtml'
      },
    },
    nodeType: {
      value: 1,
    },
    tagName: {
      get() {
        return this[NodeNameKey]
      },
    },
  }
  const HTMLAnchorDescriptorMap = {
    hash: {
      get() {
        return getUrl(this).hash
      },
    },
    host: {
      get() {
        return getUrl(this).host
      },
    },
    hostname: {
      get() {
        return getUrl(this).hostname
      },
    },
    href: {
      get() {
        return getUrl(this).href
      },
      set(href) {
        setInstanceStateValue(this, 4, (href += ''))
        setter(this, ['href'], href)
      },
    },
    origin: {
      get() {
        return getUrl(this).origin
      },
    },
    pathname: {
      get() {
        return getUrl(this).pathname
      },
    },
    port: {
      get() {
        return getUrl(this).port
      },
    },
    protocol: {
      get() {
        return getUrl(this).protocol
      },
    },
    search: {
      get() {
        return getUrl(this).search
      },
    },
  }
  const HTMLCanvasDescriptorMap = {
    getContext: {
      value(...args) {
        const applyPath = ['getContext', serializeInstanceForMain(this, args)]
        return new self.CanvasRenderingContext2D(
          this[WinIdKey],
          this[InstanceIdKey],
          applyPath
        )
      },
    },
  }
  const HTMLSrcElementDescriptorMap = {
    addEventListener: {
      value(...args) {
        const eventName = args[0]
        const callbacks = getInstanceStateValue(this, eventName) || []
        callbacks.push(args[1])
        setInstanceStateValue(this, eventName, callbacks)
      },
    },
    async: {
      get: noop,
      set: noop,
    },
    defer: {
      get: noop,
      set: noop,
    },
    onload: {
      get() {
        let callbacks = getInstanceStateValue(this, 'load')
        return (callbacks && callbacks[0]) || null
      },
      set(cb) {
        setInstanceStateValue(this, 'load', cb ? [cb] : null)
      },
    },
    onerror: {
      get() {
        let callbacks = getInstanceStateValue(this, 'error')
        return (callbacks && callbacks[0]) || null
      },
      set(cb) {
        setInstanceStateValue(this, 'error', cb ? [cb] : null)
      },
    },
  }
  const HTMLIFrameDescriptorMap = {
    contentDocument: {
      get() {
        return this.contentWindow.document
      },
    },
    contentWindow: {
      get() {
        const iframeContentWinId = this[InstanceIdKey]
        return environments[iframeContentWinId].$window$
      },
    },
    src: {
      get() {
        return getInstanceStateValue(this, 4) || ''
      },
      set(url) {
        let xhr = new XMLHttpRequest()
        let xhrStatus
        url = resolveUrl(getEnv(this), url)
        setInstanceStateValue(this, 1, void 0)
        setInstanceStateValue(this, 4, url)
        xhr.open('GET', url, !1)
        xhr.send()
        xhrStatus = xhr.status
        xhrStatus > 199 && xhrStatus < 300
          ? setter(
              this,
              ['srcdoc'],
              ((url, html) =>
                `<base href="${url}">` +
                html
                  .replace(/<script>/g, '<script type="text/partytown">')
                  .replace(/<script /g, '<script type="text/partytown" ')
                  .replace(/text\/javascript/g, 'text/partytown') +
                getPartytownScript())(url, xhr.responseText)
            )
          : setInstanceStateValue(this, 1, xhrStatus)
      },
    },
    ...HTMLSrcElementDescriptorMap,
  }
  const innerHTMLDescriptor = {
    get() {
      return getInstanceStateValue(this, 3) || ''
    },
    set(scriptContent) {
      setInstanceStateValue(this, 3, scriptContent)
    },
  }
  const HTMLScriptDescriptorMap = {
    innerHTML: innerHTMLDescriptor,
    innerText: innerHTMLDescriptor,
    src: {
      get() {
        return getInstanceStateValue(this, 4) || ''
      },
      set(url) {
        const env = getEnv(this)
        const orgUrl = resolveUrl(env, url, !0)
        url = resolveUrl(env, url)
        setInstanceStateValue(this, 4, url)
        setter(this, ['src'], url)
        orgUrl !== url && setter(this, ['dataset', 'ptsrc'], orgUrl)
      },
    },
    getAttribute: {
      value(attrName) {
        return 'src' === attrName
          ? this.src
          : callMethod(this, ['getAttribute'], [attrName])
      },
    },
    setAttribute: {
      value(attrName, attrValue) {
        'src' === attrName
          ? (this.src = attrValue)
          : callMethod(this, ['setAttribute'], [attrName, attrValue])
      },
    },
    textContent: innerHTMLDescriptor,
    type: {
      get() {
        return getter(this, ['type'])
      },
      set(type) {
        'text/javascript' !== type && setter(this, ['type'], type)
      },
    },
    ...HTMLSrcElementDescriptorMap,
  }
  const defineWorkerInterface = ([
    cstrName,
    superCstrName,
    members,
    interfaceType,
    nodeName,
  ]) => {
    const SuperCstr = TrapConstructors[cstrName]
      ? WorkerTrapProxy
      : 'Object' === superCstrName || 'EventTarget' === superCstrName
      ? WorkerProxy
      : self[superCstrName]
    const Cstr = (self[cstrName] = defineConstructorName(
      self[cstrName] || class extends SuperCstr {},
      cstrName
    ))
    12 === interfaceType && (envGlobalConstructors[cstrName] = Cstr)
    nodeName && (nodeConstructors[nodeName] = Cstr)
    members.map(([memberName, memberType, staticValue]) => {
      memberName in Cstr.prototype ||
        memberName in SuperCstr.prototype ||
        ('string' == typeof memberType
          ? definePrototypeProperty(Cstr, memberName, {
              get() {
                if (!hasInstanceStateValue(this, memberName)) {
                  const winId = this[WinIdKey]
                  const instanceId = this[InstanceIdKey]
                  const applyPath = [...this[ApplyPathKey], memberName]
                  const nodeName = this[NodeNameKey]
                  const PropCstr = self[memberType]
                  setInstanceStateValue(
                    this,
                    memberName,
                    new PropCstr(winId, instanceId, applyPath, nodeName)
                  )
                }
                return getInstanceStateValue(this, memberName)
              },
              set(value) {
                setInstanceStateValue(this, memberName, value)
              },
            })
          : 5 === memberType
          ? definePrototypeValue(Cstr, memberName, function (...args) {
              return callMethod(this, [memberName], args)
            })
          : memberType > 0 &&
            (void 0 !== staticValue
              ? definePrototypeValue(Cstr, memberName, staticValue)
              : definePrototypeProperty(Cstr, memberName, {
                  get() {
                    return getter(this, [memberName])
                  },
                  set(value) {
                    return setter(this, [memberName], value)
                  },
                })))
    })
  }
  const TrapConstructors = {
    CSSStyleDeclaration: 1,
    DOMStringMap: 1,
    NamedNodeMap: 1,
  }
  const patchPrototypes = () => {
    const Document = self.Document
    const DocumentFragment = self.DocumentFragment
    const Element = self.Element
    ;(() => {
      'atob,btoa,crypto,indexedDB,performance,setTimeout,setInterval,clearTimeout,clearInterval'
        .split(',')
        .map((memberName) => delete Window.prototype[memberName])
    })()
    definePrototypePropertyDescriptor(Element, ElementDescriptorMap)
    definePrototypePropertyDescriptor(Document, DocumentDescriptorMap)
    definePrototypePropertyDescriptor(
      self.HTMLAnchorElement,
      HTMLAnchorDescriptorMap
    )
    definePrototypePropertyDescriptor(
      self.HTMLCanvasElement,
      HTMLCanvasDescriptorMap
    )
    definePrototypePropertyDescriptor(
      self.HTMLIFrameElement,
      HTMLIFrameDescriptorMap
    )
    definePrototypePropertyDescriptor(
      self.HTMLScriptElement,
      HTMLScriptDescriptorMap
    )
    definePrototypePropertyDescriptor(
      self.HTMLStyleElement,
      HTMLStyleDescriptorMap
    )
    definePrototypePropertyDescriptor(
      self.HTMLHeadElement,
      DocumentElementChildDescriptorMap
    )
    definePrototypePropertyDescriptor(
      self.HTMLBodyElement,
      DocumentElementChildDescriptorMap
    )
    definePrototypePropertyDescriptor(
      self.HTMLHtmlElement,
      DocumentElementDescriptorMap
    )
    constantProps(CSSStyleSheet, {
      type: 'text/css',
    })
    definePrototypeNodeType(self.Comment, 8)
    definePrototypeNodeType(self.DocumentType, 10)
    definePrototypeNodeType(DocumentFragment, 11)
    cachedTreeProps(
      Node,
      'childNodes,firstChild,isConnected,lastChild,nextSibling,parentElement,parentNode,previousSibling'
    )
    cachedTreeProps(Element, elementTreePropNames)
    cachedTreeProps(DocumentFragment, elementTreePropNames)
    cachedDimensionProps(Element)
    cachedDimensionProps(Window)
    cachedDimensionMethods(Element)
    cachedReadonlyProps(Document, 'compatMode,referrer')
  }
  const definePrototypeNodeType = (Cstr, nodeType) =>
    definePrototypeValue(Cstr, 'nodeType', nodeType)
  const cachedTreeProps = (Cstr, treeProps) =>
    treeProps.split(',').map((propName) =>
      definePrototypeProperty(Cstr, propName, {
        get() {
          let cacheKey = getDimensionCacheKey(this, propName)
          let result = cachedTree.get(cacheKey)
          if (!result) {
            result = getter(this, [propName])
            cachedTree.set(cacheKey, result)
          }
          return result
        },
      })
    )
  const getDimensionCacheKey = (instance, memberName) =>
    instance[WinIdKey] + '.' + instance[InstanceIdKey] + '.' + memberName
  const cachedReadonlyProps = (Cstr, propNames) =>
    propNames.split(',').map((propName) =>
      definePrototypeProperty(Cstr, propName, {
        get() {
          hasInstanceStateValue(this, propName) ||
            setInstanceStateValue(this, propName, getter(this, [propName]))
          return getInstanceStateValue(this, propName)
        },
        set(val) {
          setInstanceStateValue(this, propName, val)
        },
      })
    )
  const constantProps = (Cstr, props) =>
    Object.keys(props).map((propName) =>
      definePrototypeValue(Cstr, propName, props[propName])
    )
  const cachedDimensionProps = (Cstr) =>
    dimensionPropNames.map((propName) =>
      definePrototypeProperty(Cstr, propName, {
        get() {
          const dimension = cachedDimensions.get(
            getDimensionCacheKey(this, propName)
          )
          if ('number' == typeof dimension) {
            return dimension
          }
          const groupedDimensions = getter(this, [propName], dimensionPropNames)
          if (groupedDimensions && 'object' == typeof groupedDimensions) {
            Object.entries(groupedDimensions).map(
              ([dimensionPropName, value]) => {
                cachedDimensions.set(
                  getDimensionCacheKey(this, dimensionPropName),
                  value
                )
              }
            )
            return groupedDimensions[propName]
          }
          return groupedDimensions
        },
      })
    )
  const cachedDimensionMethods = (Cstr) =>
    dimensionMethodNames.map((methodName) => {
      Cstr.prototype[methodName] = function () {
        let cacheKey = getDimensionCacheKey(this, methodName)
        let dimensions = cachedDimensions.get(cacheKey)
        if (!dimensions) {
          dimensions = callMethod(this, [methodName], EMPTY_ARRAY)
          cachedDimensions.set(cacheKey, dimensions)
        }
        return dimensions
      }
    })
  const queuedEvents = []
  const receiveMessageFromSandboxToWorker = (ev) => {
    const msg = ev.data
    const msgType = msg[0]
    if (webWorkerCtx.$isInitialized$) {
      if (6 === msgType) {
        ;(async (initScript) => {
          let winId = initScript.$winId$
          let instanceId = initScript.$instanceId$
          let instance = getOrCreateNodeInstance(winId, instanceId, 'SCRIPT')
          let scriptContent = initScript.$content$
          let scriptSrc = initScript.$url$
          let scriptOrgSrc = initScript.$orgUrl$
          let errorMsg = ''
          let env = environments[winId]
          let rsp
          if (scriptSrc) {
            try {
              scriptSrc = resolveToUrl(env, scriptSrc) + ''
              setInstanceStateValue(instance, 4, scriptSrc)
              webWorkerCtx.$config$.logScriptExecution &&
                logWorker(
                  `Execute script (${instanceId}) src: ${scriptOrgSrc}`,
                  winId
                )
              rsp = await self.fetch(scriptSrc)
              if (rsp.ok) {
                scriptContent = await rsp.text()
                env.$currentScriptId$ = instanceId
                run(env, scriptContent, scriptOrgSrc || scriptSrc)
                runStateLoadHandlers(instance, 'load')
              } else {
                errorMsg = rsp.statusText
                runStateLoadHandlers(instance, 'error')
              }
            } catch (urlError) {
              errorMsg = String(urlError.stack || urlError) + ''
              runStateLoadHandlers(instance, 'error')
            }
          } else {
            scriptContent &&
              (errorMsg = runScriptContent(
                env,
                instanceId,
                scriptContent,
                winId
              ))
          }
          env.$currentScriptId$ = -1
          webWorkerCtx.$postMessage$([5, winId, instanceId, errorMsg])
        })(msg[1])
      } else if (7 === msgType) {
        ;(({
          $instanceId$: $instanceId$,
          $refId$: $refId$,
          $thisArg$: $thisArg$,
          $args$: $args$,
        }) => {
          if (webWorkerRefsByRefId[$refId$]) {
            try {
              const thisArg = deserializeFromMain($instanceId$, [], $thisArg$)
              const args = deserializeFromMain($instanceId$, [], $args$)
              webWorkerRefsByRefId[$refId$].apply(thisArg, args)
            } catch (e) {
              console.error(e)
            }
          }
        })(msg[1])
      } else if (8 === msgType) {
        ;(({ $winId$: $winId$, $forward$: $forward$, $args$: $args$ }) => {
          try {
            let target = environments[$winId$].$window$
            let i = 0
            let l = len($forward$)
            for (; i < l; i++) {
              i + 1 < l
                ? (target = target[$forward$[i]])
                : target[$forward$[i]].apply(
                    target,
                    deserializeFromMain(0, [], $args$)
                  )
            }
          } catch (e) {
            console.error(e)
          }
        })(msg[1])
      } else if (3 === msgType) {
        createEnvironment(msg[1])
      } else if (4 === msgType) {
        environments[msg[1]].$isInitialized$ = 1
        {
          const winId = msg[1]
          const env = environments[winId]
          const winType = env.$winId$ === env.$parentWinId$ ? 'top' : 'iframe'
          logWorker(
            `Initialized ${winType} window ${normalizedWinId(
              winId
            )} environment (${winId}) 🎉`,
            winId
          )
        }
      } else {
        11 === msgType && (environments[msg[1]].$location$.href = msg[2])
      }
    } else if (1 === msgType) {
      ;((initWebWorkerData) => {
        const config = (webWorkerCtx.$config$ = JSON.parse(
          initWebWorkerData.$config$
        ))
        ;['resolveUrl', 'get', 'set', 'apply'].map((configName) => {
          config[configName] &&
            (config[configName] = new Function(
              'return ' + config[configName]
            )())
        })
        webWorkerCtx.$libPath$ = initWebWorkerData.$libPath$
        webWorkerCtx.$localStorage$ = initWebWorkerData.$localStorage$
        webWorkerCtx.$sessionStorage$ = initWebWorkerData.$sessionStorage$
        webWorkerCtx.$postMessage$ = postMessage.bind(self)
        webWorkerCtx.$sharedDataBuffer$ = initWebWorkerData.$sharedDataBuffer$
        self.postMessage = self.importScripts = void 0
        self.Node = Node
        self.Window = Window
        self.CSSStyleSheet = CSSStyleSheet
        initWebWorkerData.$interfaces$.map(defineWorkerInterface)
        patchPrototypes()
        webWorkerCtx.$isInitialized$ = 1
        logWorker('Initialized web worker')
      })(msg[1])
      webWorkerCtx.$postMessage$([2])
      queuedEvents.length &&
        logWorker(`Queued ready messages: ${queuedEvents.length}`)
      queuedEvents.slice().forEach(receiveMessageFromSandboxToWorker)
      queuedEvents.length = 0
    } else {
      queuedEvents.push(ev)
    }
  }
  self.onmessage = receiveMessageFromSandboxToWorker
  postMessage([0])
})(self)
