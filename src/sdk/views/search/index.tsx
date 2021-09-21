import React from 'react'
import ProductGallery from 'src/components/sections/ProductGallery'
import { ITEMS_PER_PAGE } from 'src/constants'
import { SearchProvider } from 'src/sdk/search/Provider'
import type { SearchParamsState } from '@vtex/store-sdk'
import type { FC } from 'react'
import type { Props as PageProps } from 'src/pages/s/[...]'

import Seo from './Seo'
import { useSearch } from './hooks/useSearch'

interface Props extends PageProps {
  searchParams: SearchParamsState
}

const View: FC<Props> = (props) => {
  const { searchParams, data: serverData } = props
  const { data: dynamicData } = useSearch(searchParams)

  const data = { ...dynamicData, ...serverData }
  const { site, search } = data

  if (search == null || site == null) {
    return <div>loading...</div>
  }

  const {
    products: {
      pageInfo: { totalCount },
    },
  } = search

  // usePlpPixelEffect({
  //   searchParams,
  //   totalCount,
  //   location,
  // })

  return (
    <SearchProvider
      searchParams={searchParams}
      pageInfo={{
        size: ITEMS_PER_PAGE,
        total: Math.ceil(totalCount / ITEMS_PER_PAGE),
      }}
    >
      <>
        {/* Seo Components */}
        <Seo site={site} />

        {/* UI Components */}
        <ProductGallery
          initialData={dynamicData}
          facets={search.facets}
          products={search.products}
        />
      </>
    </SearchProvider>
  )
}

export default View
