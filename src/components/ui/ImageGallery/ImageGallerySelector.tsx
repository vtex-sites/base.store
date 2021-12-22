import type { HTMLAttributes } from 'react'
import React, { useMemo } from 'react'
import { useSlider, IconButton, Button } from '@faststore/ui'

import { useImageGallery } from './useImageGallery'
import { ForwardArrowIcon, BackwardArrowIcon } from './Icons'
import type { ImageElementData } from '.'

interface Props extends HTMLAttributes<HTMLDivElement> {
  imagesPerPage: number
  images: ImageElementData[]
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

function ImageGallerySelector({ imagesPerPage, images, ...otherProps }: Props) {
  const imageCount = images.length

  const { onClick, selectedImageData } = useImageGallery()

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
                  data-thumbnail-button
                  className={
                    selectedImageData.url === image.url ? 'selected' : ''
                  }
                  aria-label={`${image.alternateName} - Image ${idx + 1} of ${
                    images.length
                  }`}
                  onClick={onClick}
                >
                  <img alt={image.alternateName} src={image.url} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <IconButton
        aria-label="slide image selector backward"
        onClick={() => {
          if (sliderState.sliding) {
            return
          }

          slide('previous', sliderDispatch)
        }}
        icon={<BackwardArrowIcon color="#323845" />}
      />
      <IconButton
        aria-label="slide image selector forward"
        onClick={() => {
          if (sliderState.sliding) {
            return
          }

          slide('next', sliderDispatch)
        }}
        icon={<ForwardArrowIcon color="#323845" />}
      />
    </section>
  )
}

export default ImageGallerySelector
