import { List as UIList } from '@faststore/ui'
import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import Button from 'src/components/ui/Button'
import Link from 'src/components/ui/Link'

import SuggestionProductCard from '../SuggestionProductCard'

function formatSearchTerm(
  indexSubstring: number,
  searchTerm: string,
  suggestion: string
) {
  if (indexSubstring === 0) {
    return searchTerm
      .split('')
      .map((char, idx) =>
        idx === 0 && suggestion.indexOf(char.toUpperCase()) === 0
          ? char.toUpperCase()
          : char.toLowerCase()
      )
      .join('')
  }

  return searchTerm.toLowerCase()
}

function handleSuggestions(suggestion: string, searchTerm: string) {
  const suggestionSubstring = suggestion
    .toLowerCase()
    .split(searchTerm.toLowerCase())

  return (
    <p>
      {suggestionSubstring.map((substring, indexSubstring) => (
        <>
          {substring.length > 0 && (
            <b className="suggestions__item-bold">
              {indexSubstring === 0
                ? substring.charAt(0).toUpperCase() + substring.slice(1)
                : substring}
            </b>
          )}
          {indexSubstring !== suggestionSubstring.length - 1 &&
            formatSearchTerm(indexSubstring, searchTerm, suggestion)}
        </>
      ))}
    </p>
  )
}

export interface SuggestionsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * ID to find this component in testing tools (e.g.: cypress, testing library, and jest).
   */
  testId?: string
  /**
   * Search term
   */
  term?: string
  /**
   * List of suggestions to be displayed in the suggestions list.
   *
   * @type {string[]}
   * @memberof SuggestionsProps
   */
  terms: string[]
  /**
   * List of products to be displayed in the suggestions list.
   *
   * @type {any[]}
   * @memberof SuggestionsProps
   */
  products: any[]
  /**
   * Callback to be executed when a suggestion is selected.
   *
   * @memberof SuggestionsProps
   */
  onSearch: (term: string) => void
}

const Suggestions = forwardRef<HTMLDivElement, SuggestionsProps>(
  function Suggestions(
    {
      testId = 'suggestions',
      term = '',
      terms,
      products,
      onSearch,
      ...otherProps
    },
    ref
  ) {
    return (
      <section
        ref={ref}
        data-testid={testId}
        data-store-suggestions
        className="suggestions"
        {...otherProps}
      >
        {terms.length > 0 && (
          <UIList data-suggestions-list className="suggestions__section">
            {terms?.map((suggestion) => (
              <li key={suggestion} className="suggestions__item">
                <Button onClick={() => onSearch(suggestion)}>
                  {handleSuggestions(suggestion, term)}
                </Button>
              </li>
            ))}
          </UIList>
        )}

        {products.length > 0 && (
          <div className="suggestions__section">
            <p className="suggestions__title">Suggested Products</p>
            <UIList>
              {products.map((product) => (
                <li key={product.name} className="suggestions__item">
                  <Link to="/" variant="display">
                    <SuggestionProductCard product={product} />
                  </Link>
                </li>
              ))}
            </UIList>
          </div>
        )}
      </section>
    )
  }
)

export default Suggestions
