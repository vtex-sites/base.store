import React, { useEffect, useState, useCallback } from 'react'
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
  const layout = document.getElementById('layout')

  const handleClose = useCallback(() => {
    setFadeType('out')
    if (layout) {
      layout.classList.remove('no-scroll')
    }
  }, [layout])

  useEffect(() => {
    if (isOpen) {
      setFadeType('in')

      // Avoids double scroll issue on the page
      if (layout) {
        layout.classList.add('no-scroll')
      }
    }
  }, [isOpen, layout])

  useEffect(() => {
    if (handleClose) {
      onDismissTransition(() => handleClose())
    }
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
