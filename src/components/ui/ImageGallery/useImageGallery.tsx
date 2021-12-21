import type { MouseEventHandler } from 'react'
import { createContext, useContext } from 'react'

import type { ImageElementData } from '.'

export interface ImageGalleryContext {
  /**
   * Name to link children by context.
   */
  name: string

  /**
   * Stores the url and alt attributes to populate the <img> tag.
   */
  selectedImageData: ImageElementData

  /**
   * onClick event that can be shared to other components inside the context
   */
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const ImageGalleryContext = createContext<
  ImageGalleryContext | undefined
>(undefined)

export function useImageGallery() {
  const context = useContext(ImageGalleryContext)

  if (!context) {
    throw new Error(
      `useImageGallery hook cannot be used outside the ImageGallery context`
    )
  }

  return context
}
