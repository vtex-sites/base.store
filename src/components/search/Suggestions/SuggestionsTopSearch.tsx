import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import { List as UIList } from '@faststore/ui'
import { Badge } from 'src/components/ui/Badge'
import Link from 'src/components/ui/Link'

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
  // TODO: Adapts for the real received data type
  searchedItems: LinkItem[]
}

type LinkItem = {
  href: string
  name: string
}

const SuggestionsTopSearch = forwardRef<
  HTMLDivElement,
  SuggestionsTopSearchProps
>(function SuggestionsTopSearch(
  { testId = 'top-search', searchedItems, ...otherProps },
  ref
) {
  return (
    <section
      ref={ref}
      data-testid={testId}
      data-store-suggestions-top-search
      className="suggestions__section"
      {...otherProps}
    >
      <p className="suggestions__title">Top Search</p>
      <UIList variant="ordered">
        {searchedItems.map((item, index) => (
          <li key={index} className="suggestions__item">
            <Link variant="display" to={item.href}>
              <Badge variant="info" small>
                {index + 1}
              </Badge>
              {item.name}
            </Link>
          </li>
        ))}
      </UIList>
    </section>
  )
})

export default SuggestionsTopSearch
