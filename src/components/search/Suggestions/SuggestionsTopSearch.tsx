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
  /**
   * List of top searched items
   */
  // TODO: Find out what object this will receive
  searchedItems: string[]
}

const SuggestionsTopSearch = forwardRef<
  HTMLDivElement,
  SuggestionsTopSearchProps
>(function TopSearch(
  { testId = 'top-search', searchedItems, ...otherProps },
  ref
) {
  return (
    <section
      ref={ref}
      data-testid={testId}
      data-suggestions-top-search
      className="suggestions__section"
      {...otherProps}
    >
      <p className="suggestions__title">Top Search</p>
      <UIList variant="ordered">
        {searchedItems.map((item, index) => (
          <li key={index}>
            <Badge variant="new" small>
              {index + 1}
            </Badge>
            {item}
          </li>
        ))}
      </UIList>
    </section>
  )
})

export default SuggestionsTopSearch
