import { formatSearchState, useSearch } from '@faststore/sdk'
import React, { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

import { replaceSearchState } from './state'
import { useViewItemListEvent } from '../analytics/hooks/useViewItemListEvent'

interface Props {
  page: number
  title: string
  products: ProductSummary_ProductFragment[]
}

/**
 * Use this component to add a boundary between pages so we can
 * change the current page being viewed on infinite pagination.
 *
 * For more info: https://developers.google.com/search/blog/2014/02/infinite-scroll-search-friendly
 *
 * Also, this component's name is kind of curious. Wikipedia calls is Page Break(https://en.wikipedia.org/wiki/Page_break)
 * however all codes I've seen online use Sentinel
 */
function Sentinel({ page, products, title }: Props) {
  const viewedRef = useRef(false)
  const { ref, inView } = useInView()
  const { state: searchState } = useSearch()

  const { sendViewItemListEvent } = useViewItemListEvent({ products, title })

  useEffect(() => {
    if (inView) {
      replaceSearchState(formatSearchState({ ...searchState, page }))
    }

    if (inView && !viewedRef.current) {
      sendViewItemListEvent()
      viewedRef.current = true
    }
  }, [inView, page, searchState, sendViewItemListEvent])

  return <div ref={ref} />
}

export default Sentinel
