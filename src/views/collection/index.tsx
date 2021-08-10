import React, { lazy } from 'react'
import { useLocation } from '@reach/router'
import { usePlpPixelEffect, SearchProvider } from '@vtex/gatsby-theme-store'
import type { FC } from 'react'
import type { SearchParamsState } from '@vtex/store-sdk'
import type { CollectionPageQueryQuery } from 'src/{StoreCollection.slug}/__generated__/CollectionPageQuery.graphql'
import type { ServerCollectionPageQueryQuery } from 'src/{StoreCollection.slug}/__generated__/ServerCollectionPageQuery.graphql'
import type { BrowserCollectionPageQueryQuery } from 'src/{StoreCollection.slug}/__generated__/BrowserCollectionPageQuery.graphql'
import { View } from 'src/components/ui/View'

import Seo from './Seo'
import AboveTheFold from './components/AboveTheFold'

const loader = () => import('./components/BelowTheFold')
const BelowTheFold = lazy(loader)

export interface CollectionViewProps {
  data:
    | CollectionPageQueryQuery
    | (ServerCollectionPageQueryQuery & BrowserCollectionPageQueryQuery)
  searchParams: SearchParamsState
  pageInfo: { size: number }
  params: Record<string, string>
}

const ViewComponents = {
  seo: Seo,
  above: AboveTheFold,
  below: {
    component: BelowTheFold,
    preloader: loader,
  },
} as const

const CollectionView: FC<CollectionViewProps> = (props) => {
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

export default CollectionView
