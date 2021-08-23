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
  const { site, vtex } = data
  const { productSearch, facets } = vtex ?? {}
  const totalCount = productSearch?.totalCount ?? 0

  if (dynamicData == null) {
    return <div>loading...</div>
  }

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
        <Seo site={site!} />

        {/* UI Components */}
        <ProductGallery
          initialData={dynamicData as any}
          facets={facets!.facets as any}
          productSearch={productSearch as any}
        />
      </>
    </SearchProvider>
  )
}

export default View
