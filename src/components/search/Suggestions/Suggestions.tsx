import { List as UIList } from '@faststore/ui'
import type {
  SearchSuggestionsQueryQuery,
  SearchSuggestionsQueryQueryVariables,
} from '@generated/graphql'
import { gql } from '@vtex/graphql-utils'
import type { HTMLAttributes } from 'react'
import { useEffect, useState } from 'react'
import Button from 'src/components/ui/Button'
import Link from 'src/components/ui/Link'
import { request } from 'src/sdk/graphql/request'

import SuggestionProductCard from '../SuggestionProductCard'

const SearchSuggestionsQuery = gql`
  query SearchSuggestionsQuery($term: String!) {
    search(term: $term) {
      suggestions {
        terms
        products {
          ...ProductSummary_product
        }
      }
    }
  }
`

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
   * Callback to be executed when a suggestion is selected.
   *
   * @memberof SuggestionsProps
   */
  onSearch: (term: string) => void
}

function useSuggestions(term: string) {
  const [suggestions, setSuggestions] =
    useState<SearchSuggestionsQueryQuery['search']['suggestions']>()

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (term.length > 0) {
      setLoading(true)
      request<
        SearchSuggestionsQueryQuery,
        SearchSuggestionsQueryQueryVariables
      >(SearchSuggestionsQuery, { term })
        .then((data) => {
          setSuggestions(data.search.suggestions)
        })
        .finally(() => setLoading(false))
    }
  }, [term])

  const terms = suggestions?.terms ?? []
  const products = suggestions?.products ?? []

  return { terms, products, loading }
}

function Suggestions({
  testId = 'suggestions',
  term = '',
  onSearch,
  ...otherProps
}: SuggestionsProps) {
  const { terms, products, loading } = useSuggestions(term)

  if (term.length === 0 && !loading) {
    return <p>Top Search List</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <section
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
            {products.map((product, index) => (
              <li key={product.name} className="suggestions__item">
                <Link to="/" variant="display">
                  <SuggestionProductCard product={product} index={index} />
                </Link>
              </li>
            ))}
          </UIList>
        </div>
      )}
    </section>
  )
}

export default Suggestions
