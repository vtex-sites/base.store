import React, { useEffect, useRef } from 'react'
import { useUI } from 'src/sdk/ui'

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
  const { toasts, popToast } = useUI()
  const toast = toasts[toasts.length - 1]
  const ref = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    const id = setTimeout(() => {
      popToast()
    }, 2e3)

    ref.current.push(id)
  }, [popToast])

  if (toast === undefined) {
    return null
  }

  return (
    <div>
      <button onClick={popToast}>Close</button>
      <div style={styles[toast.status]}>message: {toast.message}</div>
    </div>
  )
}

export default Toast
