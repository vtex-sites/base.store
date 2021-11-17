import { parseSearchParamsState } from '@faststore/sdk'
import { graphql } from 'gatsby'
import React, { useMemo } from 'react'
import View from 'src/views/collection'
import type { SearchParamsState } from '@faststore/sdk'
import type { PageProps } from 'gatsby'
import type {
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables,
} from '@generated/graphql'

export type Props = PageProps<
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables & { slug: string }
>

const useSearchParams = (props: Props): SearchParamsState => {
  const {
    location: { pathname, href },
    data: { storeCollection },
  } = props

  const selectedFacets = storeCollection?.meta.selectedFacets

  return useMemo(() => {
    const url = new URL(href ?? pathname, 'https://localhost')

    for (const { key, value } of selectedFacets ?? []) {
      url.searchParams.append('facet', `${key}=${value}`)
    }

    const state = parseSearchParamsState(url)

    return state
  }, [href, pathname, selectedFacets])
}

function Page(props: Props) {
  const searchParams = useSearchParams(props)

  return <View {...props} searchParams={searchParams} />
}

/**
 * This query is run during SSG
 * */
export const query = graphql`
  query CollectionPageQuery($id: String!) {
    site {
      ...CollectionSeoFragment_site
    }

    storeCollection(id: { eq: $id }) {
      ...CollectionSeoFragment_storeCollection
      meta {
        selectedFacets {
          key
          value
        }
      }
    }
  }
`

export default Page
