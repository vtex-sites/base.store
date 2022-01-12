import React, { forwardRef, Children } from 'react'
import type { HTMLAttributes } from 'react'

import './aspect-ratio.scss'

type Ratio =
  | '1'
  | '1:1'
  | '2'
  | '2:1'
  | '3:2'
  | '4:3'
  | '5:3'
  | '5:4'
  | '7:5'
  | '16:9'
  | '16:10'
  | '21:9'

type InverseRatio =
  | '1:2'
  | '2:3'
  | '3:4'
  | '3:5'
  | '4:5'
  | '5:7'
  | '9:16'
  | '10:16'
  | '9:21'

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
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
  ratio?: Ratio | InverseRatio
}

const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio(
    { children, ratio = '1', testId = 'store-aspect-ratio', ...otherProps },
    ref
  ) {
    // Ensures only one child component
    const child = Children.only(children)

    return (
      <div data-store-aspect-ratio data-variant={ratio} {...otherProps}>
        <div data-aspect-ratio-content ref={ref} data-testid={testId}>
          {child}
        </div>
      </div>
    )
  }
)

export default AspectRatio
