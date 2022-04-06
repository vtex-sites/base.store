import { Children, useRef } from 'react'
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

  const elementsRef = useRef<HTMLDivElement>(null)

  const moveScroll = (container: HTMLDivElement | null, value: number) => {
    if (container) {
      if (container.scrollHeight > container.clientHeight) {
        container.scrollTop += value
      } else {
        container.scrollLeft += value
      }
    }
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
          icon={<Icon name="ArrowLeft" width={24} height={24} />}
          onClick={() => moveScroll(elementsRef.current, -200)}
        />
      )}
      <div data-carousel-track ref={elementsRef}>
        {elements.map((el, idx) => {
          return <div key={idx}>{el}</div>
        })}
      </div>
      {elementCount > itemsPerPage && (
        <IconButton
          aria-label="forward slide image selector"
          icon={<Icon name="ArrowLeft" width={24} height={24} />}
          onClick={() => moveScroll(elementsRef.current, +200)}
        />
      )}
    </section>
  )
}

export default ImageGallerySelector
