import type { MouseEventHandler, ReactNode } from 'react'
import { createContext, useContext } from 'react'

export interface ImageGalleryContext {
  /**
   * Name to link children by context.
   */
  name: string

  selectedImage?: ReactNode

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
