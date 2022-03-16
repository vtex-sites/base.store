import { IconButton, useSlider } from '@faststore/ui'
import { Children } from 'react'
import type { HTMLAttributes, PropsWithChildren } from 'react'

import { BackwardArrowIcon, ForwardArrowIcon } from './Icons'

import './image-gallery-selector.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
  itemsPerPage: number
}

function getTransformValue(
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
) {
  // We use 100 to represent the full width of the parent element
  const slideWidth = 100 / totalItems

  // slideWidth gives us the full width value for sliding through all elements.
  // We then multiply the slideWidth by (currentPage * itemsPerPage) to calculate the
  // transformValue for each page (the more we slide forward, the more we have to slide in total).
  // It is negative so the transition slides the items to the left.
  return -(slideWidth * currentPage * itemsPerPage)
}

function ImageGallerySelector({
  itemsPerPage,
  children,
  ...otherProps
}: PropsWithChildren<Props>) {
  const elements = Children.toArray(children)
  const elementCount = elements.length

  const { handlers, slide, sliderState, sliderDispatch } = useSlider({
    totalItems: elementCount,
    itemsPerPage,
    infiniteMode: false,
  })

  if (!elementCount) {
    return null
  }

  return (
    <section
      data-image-gallery-selector
      aria-roledescription="carousel"
      aria-label="Product images"
    >
      <IconButton
        aria-label="backward slide image selector"
        icon={<BackwardArrowIcon color="#323845" />}
        onClick={() => {
          if (sliderState.sliding) {
            return
          }

          slide('previous', sliderDispatch)
        }}
      />
      <div {...otherProps} {...handlers}>
        <div
          data-carousel-track
          style={{
            display: 'flex',
            transition: sliderState.sliding ? `transform 400ms` : undefined,
            width: `${(elementCount * 100) / itemsPerPage}%`,
            transform: `translate3d(${getTransformValue(
              elementCount,
              sliderState.currentPage,
              itemsPerPage
            )}%, 0, 0)`,
          }}
          onTransitionEnd={() => {
            sliderDispatch({
              type: 'STOP_SLIDE',
            })

            if (sliderState.currentItem >= elementCount) {
              sliderDispatch({
                type: 'GO_TO_PAGE',
                payload: {
                  pageIndex: 0,
                  shouldSlide: false,
                },
              })
            }

            if (sliderState.currentItem < 0) {
              sliderDispatch({
                type: 'GO_TO_PAGE',
                payload: {
                  pageIndex: sliderState.totalPages - 1,
                  shouldSlide: false,
                },
              })
            }
          }}
        >
          {elements.map((el, idx) => {
            return (
              <div key={idx} style={{ width: `${100 / elementCount}%` }}>
                <div>{el}</div>
              </div>
            )
          })}
        </div>
      </div>
      <IconButton
        aria-label="forward slide image selector"
        icon={<ForwardArrowIcon color="#323845" />}
        onClick={() => {
          if (sliderState.sliding) {
            return
          }

          slide('next', sliderDispatch)
        }}
      />
    </section>
  )
}

export default ImageGallerySelector
