import React, {
  useMemo,
  useState,
  useContext,
  useCallback,
  createContext,
} from 'react'
import type { PropsWithChildren } from 'react'

import './modal-provider.scss'

type FadeType = 'in' | 'out' | undefined

interface BaseContextValue {
  fade: FadeType
  onModalOpen: () => void
  onModalClose: () => void
}

type ContextValue = Record<string, unknown> & BaseContextValue

const ModalContext = createContext<ContextValue | undefined>(undefined)

function ModalProvider({ children }: PropsWithChildren<unknown>) {
  const [fade, setFade] = useState<FadeType>('out')

  const onModalOpen = useCallback(() => setFade('in'), [])
  const onModalClose = useCallback(() => setFade('out'), [])

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
      <div data-scroll={fade === 'out'}>{children}</div>
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
