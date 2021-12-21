import type { HTMLAttributes, PropsWithChildren } from 'react'
import React, { useMemo } from 'react'
import { useSlider, IconButton, Button } from '@faststore/ui'

import { useImageGallery } from './useImageGallery'
import { LeftArrowIcon, RightArrowIcon } from './Icons'

interface Props extends HTMLAttributes<HTMLDivElement> {
  imagesPerPage: number
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
  imagesPerPage,
  children,
  ...otherProps
}: PropsWithChildren<Props>) {
  const images = React.Children.toArray(children)
  const imageCount = images.length

  const { onClick } = useImageGallery()

  const transformValues = useMemo(
    () => createTransformValues(imageCount),
    [imageCount]
  )

  const { handlers, slide, sliderState, sliderDispatch } = useSlider({
    totalItems: imageCount,
    itemsPerPage: imagesPerPage,
    infiniteMode: false,
  })

  const slidingTransition = `transform 400ms`

  if (!images || !imageCount) {
    return null
  }

  return (
    <section>
      <div {...otherProps} {...handlers}>
        <div
          data-carousel-track
          style={{
            display: 'flex',
            transition: sliderState.sliding ? slidingTransition : undefined,
            width: `${(imageCount * 100) / imagesPerPage}%`,
            transform: `translate3d(${
              transformValues[sliderState.currentPage * imagesPerPage]
            }%, 0, 0)`,
          }}
          onTransitionEnd={() => {
            sliderDispatch({
              type: 'STOP_SLIDE',
            })

            if (sliderState.currentItem >= imageCount) {
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
          {images.map((image, idx) => (
            <div key={idx} style={{ width: `${100 / imageCount}%` }}>
              <div className="flex justify-center items-center w-full">
                <Button
                  onClick={onClick}
                  style={{
                    border: '1px solid black',
                    padding: '2px',
                    margin: '2px',
                    width: '75px',
                    height: '75px',
                  }}
                >
                  {image}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <IconButton
        onClick={() => {
          if (sliderState.sliding) {
            return
          }

          slide('previous', sliderDispatch)
        }}
        icon={<LeftArrowIcon color="#323845" />}
      />
      <IconButton
        onClick={() => {
          if (sliderState.sliding) {
            return
          }

          slide('next', sliderDispatch)
        }}
        icon={<RightArrowIcon color="#323845" />}
      />
    </section>
  )
}

export default ImageGallerySelector
