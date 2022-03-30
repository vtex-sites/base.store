import React, {
  useMemo,
  useState,
  useContext,
  useCallback,
  createContext,
} from 'react'
import type { PropsWithChildren } from 'react'

import './provider.scss'

type FadeType = 'in' | 'out' | undefined

interface BaseContextValue {
  fade: FadeType
  onModalOpen: () => void
  onModalClose: () => void
}

type ContextValue = Record<string, unknown> & BaseContextValue

const ModalContext = createContext<ContextValue | undefined>(undefined)

function ModalProvider({ children }: PropsWithChildren<unknown>) {
  const [scroll, setScroll] = useState<boolean>(true)
  const [fade, setFade] = useState<FadeType>()

  const onModalOpen = useCallback(() => {
    setFade('in')
    setScroll(false)
  }, [])

  const onModalClose = useCallback(() => {
    setFade('out')
    setScroll(true)
  }, [])

  const value = useMemo(
    () => ({
      fade,
      onModalOpen,
      onModalClose,
    }),
    [fade, onModalOpen, onModalClose]
  )

  return (
    <ModalContext.Provider value={value}>
      <div data-scroll={scroll}>{children}</div>
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)

  if (context === undefined) {
    throw new Error('Do not use Modal outside the Modal context.')
  }

  return context
}

export default ModalProvider
