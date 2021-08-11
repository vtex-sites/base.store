import { Container } from '@vtex/store-ui'
import React from 'react'
import type { PageProps } from 'gatsby'
import type { FC } from 'react'
import ProductSummary from 'src/components/product/ProductSummary'
import Carousel from 'src/components/common/Carousel'
import RichTextRow from 'src/components/common/RichTextRow'
import Shelf from 'src/components/product/ProductSlider'
import type { HomePageQueryQuery } from 'src/__generated__/HomePageQuery.graphql'

type Props = PageProps<HomePageQueryQuery>

const Above: FC<Props> = ({ data: { cmsHome, vtex } }) => (
  <>
    <Carousel {...cmsHome?.sections[0].props} showArrows showDots />
    <RichTextRow />
    <Container>
      <Shelf
        {...cmsHome?.sections[1].props}
        products={vtex.products}
        showArrows
        showDots
        ProductSummary={ProductSummary}
      />
    </Container>
  </>
)

export default Above
