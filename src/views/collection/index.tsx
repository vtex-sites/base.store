import React from 'react'
import { ITEMS_PER_PAGE } from 'src/constants'
import { SearchProvider } from 'src/sdk/search/Provider'
import ProductGallery from 'src/components/sections/ProductGallery'
import type { SearchParamsState } from '@vtex/store-sdk'
import type { Props as PageProps } from 'src/pages/{StoreCollection.slug}/[...]'

import { useCollection } from './hooks/useCollection'
import Seo from './Seo'

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
  const { facets, productSearch } = vtex ?? {}
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
      {/* Seo components */}
      <Seo
        slug={slug}
        site={site!}
        storeCollection={storeCollection!}
        breadcrumb={facets!.breadcrumb! as any}
      />

      {/* UI components */}
      <ProductGallery
        fallbackData={dynamicData}
        facets={facets!.facets as any}
        productSearch={productSearch!}
      />
    </SearchProvider>
  )
}

export default View
