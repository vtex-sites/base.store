import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import { List as UIList } from '@faststore/ui'
import { Badge } from 'src/components/ui/Badge'

import './suggestions.scss'

export interface SuggestionsTopSearchProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * ID to find this component in testing tools (e.g.: cypress, testing library, and jest).
   */
  testId?: string
}

const SuggestionsTopSearch = forwardRef<
  HTMLDivElement,
  SuggestionsTopSearchProps
>(function TopSearch({ testId = 'top-search', children, ...otherProps }, ref) {
  return (
    <section
      ref={ref}
      data-testid={testId}
      className="suggestions__section / suggestions__top-search"
      {...otherProps}
    >
      <p className="suggestions__title">Top Search</p>
      <UIList variant="ordered">
        <li>
          <Badge variant="new" small>
            1
          </Badge>
          Office Supplies
        </li>
        <li>
          <Badge variant="new" small>
            1
          </Badge>
          Office Supplies
        </li>
        <li>
          <Badge variant="new" small>
            1
          </Badge>
          Office Supplies
        </li>
      </UIList>
    </section>
  )
})

export default SuggestionsTopSearch
