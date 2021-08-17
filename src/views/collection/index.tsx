import React, { lazy, Suspense, SuspenseList } from 'react'
import { ITEMS_PER_PAGE } from 'src/constants'
import { SearchProvider } from 'src/sdk/search/Provider'
import type { SearchParamsState } from '@vtex/store-sdk'
import type { Props as PageProps } from 'src/pages/{StoreCollection.slug}/[...]'

import { useCollection } from './hooks/useCollection'

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

function View(props: Props) {
  const {
    pageContext: { slug },
    data: staticData,
    searchParams,
  } = props

  const { data: dynamicData } = useCollection(searchParams)

  const data = { ...dynamicData, ...staticData }

  const { storeCollection, site, vtex } = data
  const { facets, productSearch } = vtex!
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
        {/* Seo components */}
        <Suspense fallback={null}>
          <Seo
            slug={slug}
            site={site!}
            storeCollection={storeCollection!}
            breadcrumb={facets!.breadcrumb! as any}
          />
        </Suspense>

        {/* UI components */}
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
