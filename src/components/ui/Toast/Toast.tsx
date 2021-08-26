import React, { useCallback, useEffect, useState } from 'react'
import { useUI } from 'src/sdk/ui'
import type { Toast as UIToast } from 'src/sdk/ui'

const styles = {
  error: {
    backgroundColor: 'red',
    minHeight: '150px',
    color: 'white',
  },
  warn: {
    backgroundColor: 'yellow',
    minHeight: '150px',
    color: 'white',
  },
  info: {
    backgroundColor: 'green',
    minHeight: '150px',
    color: 'white',
  },
}

function Toast() {
  const [toast, setToast] = useState<UIToast | undefined>(undefined)
  const closeToast = useCallback(() => setToast(undefined), [])
  const { toasts, popToast } = useUI()
  const [nextToast] = toasts

  useEffect(() => {
    setToast(nextToast)

    const id = setTimeout(() => {
      popToast()
      closeToast()
    }, 2e3)

    return () => {
      clearTimeout(id)
    }
  }, [closeToast, popToast, nextToast])

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
