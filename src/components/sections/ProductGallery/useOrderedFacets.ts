import type {
  FacetedFilter_FacetsFragment,
  ProductGalleryQueryQuery,
} from '@generated/graphql'
import { useMemo, useRef } from 'react'

export const useOrderedFacets = (data?: ProductGalleryQueryQuery) => {
  const facets = useRef<FacetedFilter_FacetsFragment[]>([])

  return useMemo(() => {
    if (data) {
      const orderFacets = data.search.facets.map((facet) => {
        if (facet.type === 'BOOLEAN') {
          facet.values.sort((a, b) => a.label.localeCompare(b.label))
        }

        return facet
      })

      facets.current = orderFacets
    }

    return facets.current
  }, [data, facets])
}
