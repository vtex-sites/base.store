import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import { List as UIList } from '@faststore/ui'
import Button from 'src/components/ui/Button'

import SuggestionProductCard from '../SuggestionProductCard'

import './suggestions.scss'

const MAX_SUGGESTIONS = 5
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

const SUGGESTIONS = ['Sony MX', 'Sony MV-100 Headphone', 'Sony M2000 Earbuds']

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
    { testId = 'suggestions', term = '', ...otherProps },
    ref
  ) {
    const suggestions =
      SUGGESTED_PRODUCTS.length > 0
        ? SUGGESTIONS.slice(0, MAX_SUGGESTIONS)
        : SUGGESTIONS

    const handleSuggestions = (suggestion: string, searchTerm: string) => {
      const suggestionSubstring = suggestion
        .toLowerCase()
        .split(searchTerm.toLowerCase())

      return (
        <p>
          {suggestionSubstring.map((substring, indexSubstring) => {
            const formatSearchTerm = () => {
              if (indexSubstring === 0) {
                return searchTerm
                  .split('')
                  .map((char, idx) =>
                    idx === 0 && suggestion.indexOf(char.toUpperCase()) === 0
                      ? char.toUpperCase()
                      : char.toLowerCase()
                  )
              }

              return searchTerm.toLowerCase()
            }

            return (
              <>
                <b className="suggestions__suggestion-bold">
                  {indexSubstring === 0
                    ? substring.charAt(0).toUpperCase() + substring.slice(1)
                    : substring}
                </b>
                {indexSubstring !== suggestionSubstring.length - 1 &&
                  formatSearchTerm()}
              </>
            )
          })}
        </p>
      )
    }

    return (
      <section
        ref={ref}
        data-testid={testId}
        data-store-suggestions
        className="suggestions"
        {...otherProps}
      >
        <UIList data-suggestions-list className="suggestions__section">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              onClick={() => null}
              className="suggestions__suggestion"
            >
              {handleSuggestions(suggestion, term)}
            </Button>
          ))}
        </UIList>

        <div className="suggestions__section">
          <p className="suggestions__title">Suggested Products</p>
          <UIList>
            {SUGGESTED_PRODUCTS.slice(0, MAX_SUGGESTED_PRODUCTS).map(
              (product, index) => (
                <SuggestionProductCard key={index} product={product} />
              )
            )}
          </UIList>
        </div>
      </section>
    )
  }
)

export default Suggestions
