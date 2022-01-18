import React, { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { Accordion as UIAccordion } from '@faststore/ui'

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * ID to find this component in testing tools (e.g.: cypress,
   * testing-library, and jest).
   */
  testId?: string
  /**
   * Indices that indicate which accordion items are opened.
   */
  expandedIndices: Iterable<number>
  /**
   * Function that is triggered when an accordion item is opened/closed.
   */
  onChange: (index: number) => void
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
