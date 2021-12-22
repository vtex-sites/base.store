import React, { forwardRef } from 'react'
import type { HTMLAttributes, ReactElement } from 'react'

import Tile from './Tile'

export interface TilesProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * ID to find this component in testing tools (e.g.: cypress,
   * testing-library, and jest).
   */
  testId?: string
}

const MIN_CHILDREN = 2
const MAX_CHILDREN = 4
const NUMBER_ITEMS_TO_EXPAND = 3

const Tiles = forwardRef<HTMLDivElement, TilesProps>(function Tiles(
  { testId = 'store-tiles', children, ...otherProps },
  ref
) {
  const childrenCount = React.Children.count(children)
  const spanFirstChild = childrenCount === NUMBER_ITEMS_TO_EXPAND

  if (process.env.NODE_ENV === 'development') {
    const isOutOfBounds =
      childrenCount < MIN_CHILDREN || childrenCount > MAX_CHILDREN

    if (isOutOfBounds) {
      throw new Error(
        `Tiles cannot receive less than ${MIN_CHILDREN} or more than ${MAX_CHILDREN} children.`
      )
    }
  }

  if (process.env.NODE_ENV === 'development') {
    React.Children.forEach(children as ReactElement, (child) => {
      if (child.type !== Tile) {
        throw new Error('Only Tile components allowed as children.')
      }
    })
  }

  return (
    <div
      ref={ref}
      data-store-tiles={spanFirstChild ? 'expanded' : ''}
      data-testid={testId}
      {...otherProps}
    >
      {children}
    </div>
  )
})

export default Tiles
