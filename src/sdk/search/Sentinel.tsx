import { useSearch } from '@faststore/sdk'
import type { PropsWithChildren } from 'react'
import React, { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

import { useViewItemListEvent } from '../analytics/hooks/useViewItemListEvent'

interface Props {
  page: number
  pageSize: number
  title: string
  products: ProductSummary_ProductFragment[]
}

// Adds/Replaces ?page= to the querystring of the page
const replacePagination = (page: number) => {
  const searchParams = new URLSearchParams(window.location.search)

  searchParams.set('page', page.toString())

  window.history.replaceState(
    undefined,
    '',
    `${window.location.pathname}?${searchParams}`
  )
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
function Sentinel({
  children,
  page,
  pageSize,
  products,
  title,
}: PropsWithChildren<Props>) {
  const viewedRef = useRef(false)
  const { ref, inView } = useInView({
    /*
     * Defines extra breakpoints on the children that will be wrapped
     * by the Sentinel. This helps on infinite pagination when scrolling
     * up and down between pages, making the page updates smoother and
     * more precise. We add more granular breakpoints at the edges for
     * compatibility with mobile devices, where less content is shown on
     * screen and higher thresholds are harder to reach.
     */
    threshold: [
      0.01, 0.02, 0.03, 0.04, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9,
      0.95, 0.96, 0.97, 0.98, 0.99, 1,
    ],
  })

  const { state: searchState, pages } = useSearch()

  const { sendViewItemListEvent } = useViewItemListEvent({
    products,
    title,
    page,
    pageSize,
  })

  useEffect(() => {
    // Only replace pagination state when infinite scroll
    // state has more than one page being rendered to the screen
    if (inView && pages.length > 1) {
      replacePagination(page)
    }

    if (inView && !viewedRef.current) {
      sendViewItemListEvent()
      viewedRef.current = true
    }
  }, [inView, page, pages.length, searchState, sendViewItemListEvent])

  return (
    <div data-sentinel={inView} ref={ref}>
      {children}
    </div>
  )
}

export default Sentinel
