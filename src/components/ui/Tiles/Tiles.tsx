import React, { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

import Tile from './Tile'

export interface TilesProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * ID to find this component in testing tools (e.g.: cypress,
   * testing-library, and jest).
   */
  testId?: string
}

const Tiles = forwardRef<HTMLDivElement, TilesProps>(function Tiles(
  { testId = 'store-tiles', children, ...otherProps },
  ref
) {
  const childrenCount = React.Children.count(children)

  if (childrenCount < 2 || childrenCount > 4) {
    throw new Error('Tiles cannot receive less than 2 or more than 4 children')
  }

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child) || child.type !== Tile) {
      throw new Error('Only Tile components allowed as children.')
    }
  })

  const spanFirstChild = childrenCount === 3

  return (
    <div ref={ref} data-store-tiles data-testid={testId} {...otherProps}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return

        if (index === 0 && spanFirstChild) {
          const { className } = child.props

          return React.cloneElement(child, {
            className: className
              ? `${className} tile-item-spanded`
              : 'tile-item-spanded',
          })
        }

        return child
      })}
    </div>
  )
})

export default Tiles
