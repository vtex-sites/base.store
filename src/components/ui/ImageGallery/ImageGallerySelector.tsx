import type { HTMLAttributes, PropsWithChildren } from 'react'
import React, { useMemo } from 'react'
import { useSlider, IconButton } from '@faststore/ui'

import { ForwardArrowIcon, BackwardArrowIcon } from './Icons'

interface Props extends HTMLAttributes<HTMLDivElement> {
  itemsPerPage: number
}

const createTransformValues = (totalItems: number) => {
  if (!totalItems) {
    return {}
  }

  const transformMap: Record<number, number> = {}
  const slideWidth = 100 / totalItems

  for (let idx = 0; idx < totalItems; ++idx) {
    const transformValue = -(slideWidth * idx)

    transformMap[idx] = transformValue
  }

  return transformMap
}

function ImageGallerySelector({
  itemsPerPage,
  children,
  ...otherProps
}: PropsWithChildren<Props>) {
  const elements = React.Children.toArray(children)
  const elementCount = elements.length

  const transformValues = useMemo(
    () => createTransformValues(elementCount),
    [elementCount]
  )

  const { handlers, slide, sliderState, sliderDispatch } = useSlider({
    totalItems: elementCount,
    itemsPerPage,
    infiniteMode: false,
  })

  if (!elements || !elementCount) {
    return null
  }

  return (
    <section aria-roledescription="carousel" aria-label="Product images">
      <IconButton
        aria-label="slide image selector backward"
        icon={<BackwardArrowIcon color="#323845" />}
        onClick={() => {
          if (sliderState.sliding) {
            return
          }

          slide('previous', sliderDispatch)
        }}
      />
      <IconButton
        aria-label="slide image selector forward"
        icon={<ForwardArrowIcon color="#323845" />}
        onClick={() => {
          if (sliderState.sliding) {
            return
          }

          slide('next', sliderDispatch)
        }}
      />

      <div {...otherProps} {...handlers}>
        <div
          data-carousel-track
          style={{
            display: 'flex',
            transition: sliderState.sliding ? `transform 400ms` : undefined,
            width: `${(elementCount * 100) / itemsPerPage}%`,
            transform: `translate3d(${
              transformValues[sliderState.currentPage * itemsPerPage]
            }%, 0, 0)`,
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
                <div className="flex justify-center items-center w-full">
                  {el}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ImageGallerySelector
