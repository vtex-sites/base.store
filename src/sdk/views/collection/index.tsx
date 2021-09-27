import React from 'react'
import ProductGallery from 'src/components/sections/ProductGallery'
import { ITEMS_PER_PAGE } from 'src/constants'
import { SearchProvider } from 'src/sdk/search/Provider'
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
  const { storeCollection, site, search } = data

  if (search == null || storeCollection == null || site == null) {
    return <div>loading...</div>
  }

  const {
    facets,
    products,
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
      {/* Seo components */}
      <Seo slug={slug} site={site} storeCollection={storeCollection} />

      {/* UI components */}
      <ProductGallery
        initialData={dynamicData}
        products={products}
        facets={facets}
      />
    </SearchProvider>
  )
}

export default View
