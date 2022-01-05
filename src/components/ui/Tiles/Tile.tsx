import React, { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

export interface TileProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * ID to find this component in testing tools (e.g.: cypress,
   * testing-library, and jest).
   */
  testId?: string
}

const Tile = forwardRef<HTMLDivElement, TileProps>(function Tile(
  { testId = 'store-tile', children, ...otherProps },
  ref
) {
  return (
    <div ref={ref} data-tile data-testid={testId} {...otherProps}>
      {children}
    </div>
  )
})

export default Tile
