import React from 'react'
import ProductGallery from 'src/components/sections/ProductGallery'
import { ITEMS_PER_PAGE } from 'src/constants'
import { SearchProvider } from 'src/sdk/search/Provider'
import type { SearchParamsState } from '@faststore/sdk'
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
  const title = site?.siteMetadata?.title ?? ''

  return (
    <>
      <h1 className="absolute top-[-100px]">{title}</h1>

      {search == null || site == null ? (
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
          <Seo title={title} site={site} />

          {/* UI components */}
          <ProductGallery
            fallbackData={dynamicData}
            products={search.products}
            facets={search.facets}
          />
        </SearchProvider>
      )}
    </>
  )
}

export default View
