import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import { List as UIList } from '@faststore/ui'
import Link from 'src/components/ui/Link'

import SuggestionProductCard from '../SuggestionProductCard'

import './suggestions.scss'

const MAX_SUGGESTED_PRODUCTS = 4
const SUGGESTED_PRODUCTS = [
  {
    name: 'Ergonomic Wooden Bacon',
    listPrice: 72.06,
    price: 46.26,
    image: [
      {
        alternateName: 'rerum',
        url: 'http://storeframework.vtexassets.com/arquivos/ids/167285/ut.jpg?v=637753017045600000',
      },
    ],
  },
  {
    name: 'Handcrafted Rubber Sausages',
    listPrice: 59.57,
    price: 32.83,
    image: [
      {
        alternateName: 'ea',
        url: 'http://storeframework.vtexassets.com/arquivos/ids/155949/voluptas.jpg?v=637752878341070000',
      },
    ],
  },
]

const SEARCH_SUGGESTIONS = [
  'Sony MX',
  'Sony MV-100 Headphone',
  'Sony M2000 Earbuds',
]

export interface SuggestionsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * ID to find this component in testing tools (e.g.: cypress, testing library, and jest).
   */
  testId?: string
  /**
   * Search term
   */
  term?: string
}

const Suggestions = forwardRef<HTMLDivElement, SuggestionsProps>(
  function Suggestions(
    { testId = 'suggestions', term = 'ny', ...otherProps },
    ref
  ) {
    const boldTerm = (suggestion: string, _term: string) => {
      const suggestionChars = suggestion.split(_term)

      return (
        <p>
          {suggestionChars.map((char, index) => (
            <>
              {char}
              {index !== suggestionChars.length - 1 && (
                <b className="suggestions__bold-term">{_term}</b>
              )}
            </>
          ))}
        </p>
      )
    }

    return (
      <div
        ref={ref}
        data-testid={testId}
        data-store-suggestions
        className="suggestions"
        {...otherProps}
      >
        <UIList>
          {SEARCH_SUGGESTIONS.map((suggestion, index) => (
            <Link key={index} to="/">
              {boldTerm(suggestion, term)}
            </Link>
          ))}
        </UIList>

        <div data-suggestions-suggested-products>
          <p className="suggestions__suggested-products-title">
            Suggested Products
          </p>
          <UIList>
            {SUGGESTED_PRODUCTS.slice(0, MAX_SUGGESTED_PRODUCTS + 1).map(
              (product, index) => (
                <SuggestionProductCard key={index} product={product} />
              )
            )}
          </UIList>
        </div>
      </div>
    )
  }
)

export default Suggestions
