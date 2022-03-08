import { parseSearchState, SearchProvider, useSession } from '@faststore/sdk'
import { graphql } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React, { useMemo } from 'react'
import ProductGallery from 'src/components/sections/ProductGallery'
import Section from 'src/components/sections/Section'
import SROnly from 'src/components/ui/SROnly'
import { ITEMS_PER_PAGE } from 'src/constants'
import { applySearchState } from 'src/sdk/search/state'
import { mark } from 'src/sdk/tests/mark'
import type { PageProps } from 'gatsby'
import type {
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables,
} from '@generated/graphql'

export type Props = PageProps<
  SearchPageQueryQuery,
  SearchPageQueryQueryVariables
>

const useSearchParams = ({ href }: Location) =>
  useMemo(() => href && parseSearchState(new URL(href)), [href])

function Page(props: Props) {
  const {
    data: { site },
  } = props

  const { locale } = useSession()
  const searchParams = useSearchParams(props.location)
  const title = 'Search Results | FastStore'

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
      <GatsbySeo
        noindex
        language={locale}
        title={title}
        description={site?.siteMetadata?.description ?? ''}
        titleTemplate={site?.siteMetadata?.titleTemplate ?? ''}
        openGraph={{
          type: 'website',
          title,
          description: site?.siteMetadata?.description ?? '',
        }}
      />

      {/*
        Sections: Components imported from '../components/sections' only.
        Do not import or render components from any other folder in here.
      */}
      <SROnly as="h1" text={title} />

      <Section>
        <ProductGallery title="Search Results" />
      </Section>
    </SearchProvider>
  )
}

export const query = graphql`
  query SearchPageQuery {
    site {
      siteMetadata {
        titleTemplate
        title
        description
      }
    }
  }
`

Page.displayName = 'Page'

export default mark(Page)
