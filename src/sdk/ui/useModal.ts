import { useState, useCallback, useRef, useEffect } from 'react'

const useModal = () => {
  const [fade, setFade] = useState<'in' | 'out'>()
  const layout = useRef<HTMLElement | null>()

  useEffect(() => {
    layout.current = document.getElementById('layout')
  }, [])

  const closeModal = useCallback(() => {
    setFade('out')
    layout.current?.classList.remove('no-scroll')
  }, [])

  return {
    fade,
    layout: layout.current,
    setFade,
    closeModal,
  }
}

export default useModal
