import type {
  Filter_FacetsFragment,
  ProductGalleryQueryQuery,
} from '@generated/graphql'
import { useMemo, useRef } from 'react'

export const useDelayedFacets = (data?: ProductGalleryQueryQuery) => {
  const facets = useRef<Filter_FacetsFragment[]>([])

  return useMemo(() => {
    if (data) {
      facets.current = data.search.facets as any
    }

    return facets.current
  }, [data, facets])
}
