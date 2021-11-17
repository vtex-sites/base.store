import React from 'react'
import ProductGallery from 'src/components/sections/ProductGallery'
import { ITEMS_PER_PAGE } from 'src/constants'
import { SearchProvider } from 'src/sdk/search/Provider'
import type { SearchParamsState } from '@faststore/sdk'
import type { Props as PageProps } from 'src/pages/{StoreCollection.slug}'

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

  const title =
    staticData.storeCollection?.seo.title ??
    staticData.site?.siteMetadata?.title ??
    ''

  return (
    <>
      <h1 data-testid="collection-page" className="absolute top-[-100px]">
        {title}
      </h1>

      {search == null || site == null || storeCollection == null ? (
        <div>...loading</div>
      ) : (
        <SearchProvider
          searchParams={searchParams}
          pageInfo={{
            size: ITEMS_PER_PAGE,
            total: Math.ceil(
              search.products.pageInfo.totalCount / ITEMS_PER_PAGE
            ),
          }}
        >
          {/* TODO: Move seo components to SSG */}
          <Seo
            title={title}
            slug={slug}
            site={site}
            storeCollection={storeCollection}
          />

          {/* UI components */}
          <ProductGallery
            fallbackData={dynamicData}
            products={search.products}
            facets={search.facets}
            title={title}
          />
        </SearchProvider>
      )}
    </>
  )
}

export default View
