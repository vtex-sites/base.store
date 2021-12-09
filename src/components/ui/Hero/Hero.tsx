import React from 'react'

export interface HeroProps {
  /**
   * ID to find this component in testing tools (e.g.: cypress,
   * testing-library, and jest).
   */
  testId?: string
  children: React.ReactNode
}

const Hero = ({ testId = 'store-hero', children }: HeroProps) => {
  return (
    <article data-store-hero data-testid={testId}>
      {children}
    </article>
  )
}

export default Hero
