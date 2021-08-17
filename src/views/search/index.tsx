import React, { lazy, Suspense, SuspenseList } from 'react'
import { ITEMS_PER_PAGE } from 'src/constants'
import { SearchProvider } from 'src/sdk/search/Provider'
import type { SearchParamsState } from '@vtex/store-sdk'
import type { FC } from 'react'
import type { Props as PageProps } from 'src/pages/s/[...]'

import { useSearch } from './hooks/useSearch'

const Seo = lazy(
  () =>
    import(
      /* webpackMode: "eager" */
      './Seo'
    )
)

const ProductGallery = lazy(
  () =>
    import(
      /* webpackMode: "eager" */
      'src/components/sections/ProductGallery'
    )
)

interface Props extends PageProps {
  searchParams: SearchParamsState
}

const View: FC<Props> = (props) => {
  const { searchParams, data: serverData } = props
  const { data: dynamicData } = useSearch(searchParams)

  const data = { ...dynamicData, ...serverData }
  const { site, vtex } = data
  const { productSearch, facets } = vtex!
  const totalCount = productSearch!.totalCount ?? 0

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
      <SuspenseList>
        {/* Seo Components */}
        <Suspense fallback={null}>
          <Seo site={site!} />
        </Suspense>

        {/* UI Components */}
        <Suspense fallback={null}>
          <ProductGallery
            initialData={dynamicData}
            facets={facets!.facets as any}
            productSearch={productSearch!}
          />
        </Suspense>
      </SuspenseList>
    </SearchProvider>
  )
}

export default View
