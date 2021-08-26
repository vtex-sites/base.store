import React, { useCallback, useEffect, useState } from 'react'
import { useUI } from 'src/sdk/ui'
import PQueue from 'p-queue'
import type { Toast as UIToast } from 'src/sdk/ui'

const styles = {
  error: {
    backgroundColor: 'red',
  },
  warn: {
    backgroundColor: 'yellow',
  },
  info: {
    backgroundColor: 'green',
  },
}

const toastQueue = new PQueue({
  concurrency: 1,
  autoStart: true,
})

const delay = (ms = 1e3) => new Promise((resolve) => setTimeout(resolve, ms))

function Toast() {
  const { toasts, popToast } = useUI()
  const [toast, setToast] = useState<UIToast | undefined>(undefined)
  const closeToast = useCallback(() => setToast(undefined), [])

  useEffect(() => {
    if (toasts.length === 0) {
      toastQueue.add(closeToast)
    } else {
      toastQueue.add(async () => {
        const [newToast] = toasts

        popToast()
        setToast(newToast)

        await delay()
      })
    }

    return () => {
      toastQueue.clear()
    }
  }, [closeToast, popToast, toasts])

  if (toast === undefined) {
    return null
  }

  return (
    <div>
      <button onClick={closeToast}>Close</button>
      <div style={styles[toast.status]}>message: {toast.message}</div>
    </div>
  )
}

export default Toast
