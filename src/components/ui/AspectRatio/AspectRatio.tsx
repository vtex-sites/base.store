import React, { forwardRef, Children } from 'react'
import type { HTMLAttributes } from 'react'

import './aspect-ratio.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
  /**
   * ID to find this component in testing tools (e.g.: cypress,
   * testing-library, and jest).
   */
  testId?: string
  /*
   * The aspect ratio value: Common values are:
   *
   * `21:9`, `16:10`, `16:9`, `4:3`, `2:1`
   */
  ratio?: string
}

const AspectRatio = forwardRef<HTMLDivElement, Props>(function AspectRatio(
  { children, ratio = '1', testId = 'store-aspect-ratio', ...otherProps },
  ref
) {
  // Ensures only one child component
  const child = Children.only(children)

  return (
    <div data-store-aspect-ratio-wrapper data-variant={ratio} {...otherProps}>
      <div data-aspect-ratio ref={ref} data-testid={testId}>
        {child}
      </div>
    </div>
  )
})

export default AspectRatio
