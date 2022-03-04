import React from 'react'
import IconSVG from 'src/components/common/IconSVG'

import type { UIButtonProps } from '../../ui/Button'
import Button from '../../ui/Button'
import Section from '../Section'

interface ScrollToTopButtonProps {
  /**
   * Button copy.
   * @default 'Scroll to top'
   */
  text?: string
  /**
   * Button's icon.
   * @default <IconSVG name="CaretUp" width={16} height={16} weight="bold" />
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
  icon = <IconSVG name="CaretUp" width={16} height={16} weight="bold" />,
  iconPosition = 'left',
}: ScrollToTopButtonProps) {
  return (
    <Section className="product-listing__scroll-top">
      <Button
        variant="secondary"
        icon={icon}
        iconPosition={iconPosition}
        onClick={() => window.scrollTo(0, 0)}
      >
        {text}
      </Button>
    </Section>
  )
}

export default ScrollToTopButton
