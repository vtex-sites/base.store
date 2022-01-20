import React, { useEffect, useState, useCallback } from 'react'
import type { ReactNode, HTMLAttributes } from 'react'
import { Modal as UIModal } from '@faststore/ui'

import './slide-over.scss'

type Direction = 'leftSide' | 'rightSide'
type WidthSize = 'full' | 'partial'
type FadeType = 'in' | 'out'

interface SlideOverProps extends HTMLAttributes<HTMLDivElement> {
  direction: Direction
  size: WidthSize
  children: ReactNode
  isOpen: boolean
  onDismiss?: () => void
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

  const handleClose = useCallback(() => {
    setFadeType('out')
  }, [])

  useEffect(() => {
    if (isOpen === undefined || isOpen) {
      setFadeType('in')
    }
  }, [isOpen])

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
