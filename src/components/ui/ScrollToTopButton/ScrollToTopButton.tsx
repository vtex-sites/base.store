import React from 'react'
import { CaretUp as CareUpIcon } from 'phosphor-react'

import Button from '../Button'

interface ScrollToTopButtonProps {
  /**
   * Button copy.
   * @default 'Scroll to top'
   */
  text?: string
}

function ScrollToTopButton({ text = 'Scroll to top' }: ScrollToTopButtonProps) {
  return (
    <Button
      variant="secondary"
      icon={<CareUpIcon size={16} />}
      iconPosition="left"
      onClick={() => window.scrollTo(0, 0)}
    >
      {text}
    </Button>
  )
}

export default ScrollToTopButton
