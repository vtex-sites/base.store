import React, { forwardRef } from 'react'
import { Accordion as UIAccordion } from '@faststore/ui'
import type { AccordionProps } from '@faststore/ui'

import './accordion.scss'

interface Props extends Omit<AccordionProps, 'indices'> {
  /**
   * Indices that indicate which accordion items are opened.
   */
  expandedIndices: Iterable<number>
}

const Accordion = forwardRef<HTMLDivElement, Props>(function Accordion(
  {
    expandedIndices,
    onChange,
    children,
    testId = 'store-accordion',
    ...otherProps
  },
  ref
) {
  return (
    <UIAccordion
      className="accordion"
      data-store-accordion
      ref={ref}
      onChange={onChange}
      data-testid={testId}
      indices={expandedIndices}
      {...otherProps}
    >
      {children}
    </UIAccordion>
  )
})

export default Accordion
