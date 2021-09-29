import React, { useEffect, useRef } from 'react'
import { useUI } from 'src/sdk/ui'

const state = {
  error: 'bg-red',
  warn: 'bg-yellow',
  info: 'bg-green',
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
      <div className={`h-36 text-white ${state[toast.status]}`}>
        message: {toast.message}
      </div>
    </div>
  )
}

export default Toast
