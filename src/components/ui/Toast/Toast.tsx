import { useEffect, useRef } from 'react'
import { useUI } from 'src/sdk/ui'
import Icon from 'src/components/ui/Icon'

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
    <div data-fs-toast>
      <Icon data-fs-toast-icon name={toast.icon} width={48} height={48} />
      <div data-fs-toast-wrapper>
        <p data-fs-toast-title>{toast.title}</p>
        <p>{toast.description}</p>
      </div>
    </div>
  )
}

export default Toast
