/** @jsx jsx */
import { Breadcrumb, Container, jsx } from '@vtex/store-ui'
import CollectionBanner from 'src/components/common/CollectionBanner'
import type { FC } from 'react'
import type { BreadcrumbItem } from '@vtex/store-ui'
import FacetedProductList from 'src/components/common/FacetedProductList'

import type { CollectionViewProps } from '..'

type Props = CollectionViewProps

const AboveTheFold: FC<Props> = ({ data }) => {
  const breadcrumb = (data.vtex.facets?.breadcrumb ?? []) as BreadcrumbItem[]
  const sections = data.storeCollection?.fields?.plp?.sections

  return (
    <Container>
      <Breadcrumb breadcrumb={breadcrumb} type="SEARCH" />

      {sections != null && <CollectionBanner sections={sections} />}

      <FacetedProductList data={data} />
    </Container>
  )
}

export default AboveTheFold
