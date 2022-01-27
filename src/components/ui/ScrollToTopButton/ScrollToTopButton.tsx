import React from 'react'
import { CaretUp as CareUpIcon } from 'phosphor-react'

import type { UIButtonProps } from '../Button'
import Button from '../Button'

interface ScrollToTopButtonProps {
  /**
   * Button copy.
   * @default 'Scroll to top'
   */
  text?: string
  /**
   * Button's icon.
   * @default <CareUpIcon size={16} weight="bold" />
   */
  icon?: UIButtonProps['icon']
  /**
   * Button icon's position.
   * @default 'left'
   */
  iconPosition?: UIButtonProps['iconPosition']
}

function ScrollToTopButton({
  text = 'Scroll to top',
  icon = <CareUpIcon size={16} weight="bold" />,
  iconPosition = 'left',
}: ScrollToTopButtonProps) {
  return (
    <Button
      variant="secondary"
      icon={icon}
      iconPosition={iconPosition}
      onClick={() => window.scrollTo(0, 0)}
    >
      {text}
    </Button>
  )
}

export default ScrollToTopButton
