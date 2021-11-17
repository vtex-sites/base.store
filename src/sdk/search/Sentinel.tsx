import type { ProductSummary_ProductFragment } from '@generated/graphql'
import React, { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import { useViewItemListEvent } from '../analytics/hooks/useViewItemListEvent'
import { useSearch } from './useSearch'

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
 * Also, this component's name was taken from: https://en.wikipedia.org/wiki/Page_break
 */
function Sentinel({ page, products, title }: Props) {
  const viewedRef = useRef(false)
  const { ref, inView } = useInView()
  const {
    pageInfo: { setCurrentPage },
  } = useSearch()

  const { sendViewItemListEvent } = useViewItemListEvent({ products, title })

  useEffect(() => {
    if (inView) {
      setCurrentPage(page)
    }

    if (inView && !viewedRef.current) {
      sendViewItemListEvent()
      viewedRef.current = true
    }
  }, [inView, page, sendViewItemListEvent, setCurrentPage])

  return <div ref={ref} />
}

export default Sentinel
