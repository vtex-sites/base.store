/** @jsx jsx */
import { Breadcrumb, Container, jsx } from '@vtex/store-ui'
import SearchBanner from 'src/components/search/Banner'
import type { FC } from 'react'
import type { BreadcrumbItem } from '@vtex/store-ui'
import FacetedProductList from 'src/components/common/FacetedProductList'

import type { SearchViewProps } from '..'

type Props = SearchViewProps

const AboveTheFold: FC<Props> = ({
  data,
  data: {
    vtex: { facets, banners },
  },
}) => {
  const breadcrumb = (facets?.breadcrumb ?? []) as BreadcrumbItem[]

  return (
    <Container>
      <Breadcrumb breadcrumb={breadcrumb} type="SEARCH" />

      <SearchBanner html={banners?.banners?.[0]?.html} />

      <FacetedProductList data={data} />
    </Container>
  )
}

export default AboveTheFold
