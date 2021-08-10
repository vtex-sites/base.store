import React, { lazy } from 'react'
import { useLocation } from '@reach/router'
import { usePlpPixelEffect, SearchProvider } from '@vtex/gatsby-theme-store'
import { View } from 'src/components/ui/View'
import type { FC } from 'react'
import type { SearchParamsState } from '@vtex/store-sdk'
import type { ServerSearchPageQueryQuery } from 'src/s/__generated__/ServerSearchPageQuery.graphql'
import type { BrowserSearchPageQueryQuery } from 'src/s/__generated__/BrowserSearchPageQuery.graphql'

import Seo from './Seo'
import AboveTheFold from './components/AboveTheFold'

const loader = () => import('./components/BelowTheFold')
const BelowTheFold = lazy(loader)

export interface SearchViewProps {
  data: ServerSearchPageQueryQuery & BrowserSearchPageQueryQuery
  searchParams: SearchParamsState
  pageInfo: { size: number }
}

const ViewComponents = {
  seo: Seo,
  above: AboveTheFold,
  below: {
    component: BelowTheFold,
    preloader: loader,
  },
} as const

const SearchView: FC<SearchViewProps> = (props) => {
  const {
    data,
    searchParams,
    pageInfo: { size },
  } = props

  const totalCount = data.vtex.productSearch!.recordsFiltered! ?? 0
  const location = useLocation()

  usePlpPixelEffect({
    searchParams,
    totalCount,
    location,
  })

  return (
    <SearchProvider
      searchParams={searchParams}
      data={data}
      pageInfo={{
        size,
        total: Math.ceil(totalCount / size),
      }}
    >
      <View {...ViewComponents} data={props} />
    </SearchProvider>
  )
}

export default SearchView
