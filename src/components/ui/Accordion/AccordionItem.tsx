import React, { forwardRef } from 'react'
import {
  Icon as UIIcon,
  AccordionItem as UIAccordionItem,
  AccordionPanel as UIAccordionPanel,
  AccordionButton as UIAccordionButton,
} from '@faststore/ui'
import type { AccordionItemProps } from '@faststore/ui'

interface Props extends AccordionItemProps {
  /**
   * Attribute to check whether the item is expanded or not.
   */
  isExpanded: boolean
  /**
   * Label for Accordion button
   */
  buttonLabel?: string
}

const AccordionItem = forwardRef<HTMLDivElement, Props>(function AccordionItem(
  {
    children,
    isExpanded,
    index = 0,
    buttonLabel = '',
    testId = 'store-accordion-item',
    ...otherProps
  },
  ref
) {
  return (
    <UIAccordionItem
      data-store-accordion-item
      ref={ref}
      index={index}
      data-testid={testId}
      {...otherProps}
    >
      <UIAccordionButton
        data-accordion-item-button
        data-testid={`${testId}-button`}
      >
        {buttonLabel}
        <UIIcon
          data-accordion-item-button-icon
          data-testid={`${testId}-button-icon`}
          component={isExpanded ? <div>-</div> : <div>+</div>}
        />
      </UIAccordionButton>
      <UIAccordionPanel
        data-accordion-item-panel
        data-testid={`${testId}-panel`}
      >
        {children}
      </UIAccordionPanel>
    </UIAccordionItem>
  )
})

export default AccordionItem
