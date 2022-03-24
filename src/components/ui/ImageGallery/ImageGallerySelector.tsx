import { Children } from 'react'
import type { HTMLAttributes, PropsWithChildren } from 'react'
import { IconButton } from '@faststore/ui'
import Icon from 'src/components/ui/Icon'

import './image-gallery-selector.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
  itemsPerPage: number
}

function ImageGallerySelector({
  itemsPerPage,
  children,
}: PropsWithChildren<Props>) {
  const elements = Children.toArray(children)
  const elementCount = elements.length

  if (!elementCount) {
    return null
  }

  return (
    <section
      data-image-gallery-selector
      aria-roledescription="carousel"
      aria-label="Product images"
    >
      {elementCount > itemsPerPage && (
        <IconButton
          aria-label="backward slide image selector"
          icon={<Icon name="ArrowLeft" />}
          onClick={() => {
            const container = document.getElementById('myScrollSlider')

            if (container) {
              if (container.scrollHeight > container.clientHeight) {
                container.scrollTop -= 200
              } else {
                container.scrollLeft -= 200
              }
            }
          }}
        />
      )}
      <div id="myScrollSlider" data-carousel-track>
        {elements.map((el, idx) => {
          return <div key={idx}>{el}</div>
        })}
      </div>
      {elementCount > itemsPerPage && (
        <IconButton
          aria-label="forward slide image selector"
          icon={<Icon name="ArrowRight" />}
          onClick={() => {
            const container = document.getElementById('myScrollSlider')

            if (container) {
              if (container?.scrollHeight > container?.clientHeight) {
                container.scrollTop += 200
              } else {
                container.scrollLeft += 200
              }
            }
          }}
        />
      )}
    </section>
  )
}

export default ImageGallerySelector
