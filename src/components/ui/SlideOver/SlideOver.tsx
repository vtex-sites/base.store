import React, { useEffect, useState, useCallback, useRef } from 'react'
import type { ReactNode, HTMLAttributes } from 'react'
import { Modal as UIModal } from '@faststore/ui'

import './slide-over.scss'

type Direction = 'leftSide' | 'rightSide'
type WidthSize = 'full' | 'partial'
type FadeType = 'in' | 'out'

interface SlideOverProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  direction: Direction
  size: WidthSize
  children: ReactNode
  /**
   * This function is called whenever the user clicks outside
   * the modal content
   */
  onDismiss?: () => void
  /**
   * This callback function enables the transition effect on children "close" button
   */
  onDismissTransition: (callback: () => unknown) => unknown
}

// prevent scroll on Safari iOS
function handleTouchMove(e: TouchEvent) {
  e.preventDefault()
}

const SlideOver = ({
  isOpen,
  onDismiss,
  onDismissTransition,
  direction = 'leftSide',
  size = 'full',
  children,
  ...otherProps
}: SlideOverProps) => {
  const [fadeType, setFadeType] = useState<FadeType>()
  const layout = useRef<HTMLElement | null>(null)

  const handleClose = useCallback(() => {
    setFadeType('out')
    layout.current?.classList.remove('no-scroll')
    layout.current?.removeEventListener('touchmove', handleTouchMove)
  }, [layout])

  useEffect(() => {
    layout.current = document.body
  }, [])

  useEffect(() => {
    if (isOpen) {
      setFadeType('in')

      // Avoids double scroll issue on the page
      layout.current?.classList.add('no-scroll')
      layout.current?.addEventListener('touchmove', handleTouchMove, false)
    }

    return () => {
      layout.current?.classList.remove('no-scroll')
      layout.current?.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isOpen, layout])

  useEffect(() => {
    onDismissTransition(() => handleClose())
  }, [handleClose, onDismissTransition])

  const handleTransitionEnd = () => {
    if (fadeType === 'out') {
      onDismiss?.()
    }
  }

  return (
    <UIModal
      isOpen={isOpen}
      onDismiss={(e) => {
        e.preventDefault()
        handleClose()
      }}
      data-slide-over
      data-slide-over-direction={direction}
      data-slide-over-size={size}
      data-slide-over-state={fadeType}
      onTransitionEnd={handleTransitionEnd}
      {...otherProps}
    >
      {children}
    </UIModal>
  )
}

export default SlideOver
