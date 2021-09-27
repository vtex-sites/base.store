import React from 'react'
import { Carousel as UICarousel } from '@vtex/store-ui'
import { graphql } from 'gatsby'
import type { Data_CarouselFragmentFragment } from '@generated/data_CarouselFragment.graphql'
import { GatsbyImage } from 'gatsby-plugin-image'

interface Props {
  data: Data_CarouselFragmentFragment
}

function Carousel({ data: { primary, items } }: Props) {
  return (
    <UICarousel
      infiniteMode
      controls={
        primary?.display_arrows && primary.display_dots
          ? 'complete'
          : primary?.display_arrows
          ? 'navigationArrows'
          : 'paginationBullets'
      }
    >
      {items?.map(
        (item) =>
          item?.items && (
            <GatsbyImage
              alt={item.items.alt ?? ''}
              image={item.items.gatsbyImageData}
            />
          )
      )}
    </UICarousel>
  )
}

export const fragment = graphql`
  fragment data_CarouselFragment on PrismicHomeDataBodyCarousel {
    id
    primary {
      display_arrows
      display_dots
      title {
        text
      }
    }
    items {
      items {
        alt
        gatsbyImageData(layout: FULL_WIDTH, breakpoints: [360, 720, 1024, 1920])
      }
    }
    slice_type
  }
`

export default Carousel
