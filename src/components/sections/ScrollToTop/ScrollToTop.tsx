import { CaretUp as CareUpIcon } from 'phosphor-react'
import React from 'react'
import Button from 'src/components/ui/Button'
import type { UIButtonProps } from 'src/components/ui/Button'

import './scroll-to-top.scss'

interface ScrollToTopButtonProps extends UIButtonProps {
  /**
   * Button copy.
   * @default 'Scroll to top'
   */
  text?: string
}

function ScrollToTop({
  text = 'Scroll to top',
  icon = <CareUpIcon size={16} weight="bold" />,
  iconPosition = 'left',
}: ScrollToTopButtonProps) {
  return (
    <div className="scroll-to-top">
      <Button
        variant="secondary"
        icon={icon}
        iconPosition={iconPosition}
        onClick={() => window.scrollTo(0, 0)}
      >
        {text}
      </Button>
    </div>
  )
}

export default ScrollToTop
