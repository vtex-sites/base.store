import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'

export interface HeroContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * ID to find this component in testing tools (e.g.: cypress, testing library, and jest).
   */
  testId?: string
}

const HeroContent = forwardRef<HTMLDivElement, HeroContentProps>(
  function HeroContent(
    { testId = 'store-hero-content', children, ...otherProps },
    ref
  ) {
    return (
      <section
        ref={ref}
        data-store-hero-content
        data-testid={testId}
        {...otherProps}
      >
        {children}
      </section>
    )
  }
)

export default HeroContent
