import { parseSearchState, SearchProvider } from '@faststore/sdk'
import { graphql } from 'gatsby'
import React, { useEffect, useMemo } from 'react'
import { execute } from 'src/server'
import View from 'src/views/collection'
import type { SearchState } from '@faststore/sdk'
import type { PageProps } from 'gatsby'
import type {
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables,
  ServerCollectionPageQueryQuery,
} from '@generated/graphql'
import { gql } from '@vtex/graphql-utils'
import { setSearchState } from 'src/sdk/search/state'
import { ITEMS_PER_PAGE } from 'src/constants'

export type Props = PageProps<
  CollectionPageQueryQuery,
  CollectionPageQueryQueryVariables
> & {
  serverData?: ServerCollectionPageQueryQuery
}

const useSearchParams = (props: Props): SearchState => {
  const {
    location: { href, pathname },
    serverData,
  } = props

  const selectedFacets = serverData?.collection.meta.selectedFacets

  return useMemo(() => {
    const maybeState = href ? parseSearchState(new URL(href)) : null

    // Runs on SSG
    return {
      page: maybeState?.page ?? 0,
      base: maybeState?.base ?? pathname,
      selectedFacets:
        maybeState && maybeState.selectedFacets.length > 0
          ? maybeState.selectedFacets
          : selectedFacets ?? [],
      term: maybeState?.term ?? null,
      sort: maybeState?.sort ?? 'score_desc',
    }
  }, [href, pathname, selectedFacets])
}

function Page(props: Props) {
  const { serverData } = props
  const searchParams = useSearchParams(props)

  const notFound = !serverData?.collection

  useEffect(() => {
    if (notFound) {
      window.location.href = `/404/?from=${encodeURIComponent(
        window.location.pathname
      )}`
    }
  }, [notFound])

  // Product not found
  if (notFound) {
    return null
  }

  return (
    <SearchProvider
      onChange={setSearchState}
      itemsPerPage={ITEMS_PER_PAGE}
      {...searchParams}
    >
      <View {...props} />
    </SearchProvider>
  )
}

export const querySSG = graphql`
  query CollectionPageQuery {
    site {
      ...CollectionSeoFragment_site
    }
  }
`

export const querySSR = gql`
  query ServerCollectionPageQuery($slug: String!) {
    collection(slug: $slug) {
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

export const getServerData = async ({
  params: { '*': slug },
}: {
  params: Record<string, string>
}) => {
  try {
    const { data, errors } = await execute({
      operationName: querySSR,
      variableValues: { slug },
    })

    if (errors) {
      console.error(errors)
    }

    return {
      status: 200,
      props: data,
      headers: {
        'cache-control': 'public, max-age=0, must-revalidate',
      },
    }
  } catch (err) {
    console.error(err)

    return {
      status: 500,
      props: {},
      headers: {
        'cache-control': 'public, max-age=0, must-revalidate',
      },
    }
  }
}

export default Page
