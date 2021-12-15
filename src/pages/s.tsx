import { parseSearchState, SearchProvider } from '@faststore/sdk'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import ProductGallery from 'src/components/sections/ProductGallery'
import { ITEMS_PER_PAGE } from 'src/constants'
import { useApplySearchState } from 'src/sdk/search/state'
import { useSiteUrl } from 'src/sdk/useSiteUrl'

import storeConfig from '../../store.config'

const {
  site: { title },
} = storeConfig

const useSearchParams = () => {
  const siteUrl = useSiteUrl()
  const { asPath } = useRouter()

  return useMemo(() => {
    return siteUrl && parseSearchState(new URL(asPath, siteUrl))
  }, [asPath, siteUrl])
}

function Page() {
  const applySearchState = useApplySearchState()
  const searchParams = useSearchParams()

  if (!searchParams) {
    return null
  }

  return (
    <SearchProvider
      onChange={applySearchState}
      itemsPerPage={ITEMS_PER_PAGE}
      {...searchParams}
    >
      {/* SEO */}
      <NextSeo noindex />

      {/*
        Sections: Components imported from '../components/sections' only.
        Do not import or render components from any other folder in here.
      */}
      <h1 className="absolute top-[-100px]">{title}</h1>

      <ProductGallery title="Search Results" />
    </SearchProvider>
  )
}

export default Page
