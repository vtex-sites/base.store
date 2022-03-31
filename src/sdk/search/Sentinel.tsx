import { useSearch } from '@faststore/sdk'
import { useEffect, useRef } from 'react'
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
function Sentinel({ page, pageSize, products, title }: Props) {
  const viewedRef = useRef(false)
  const { ref, inView } = useInView()
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

  return <div ref={ref} />
}

export default Sentinel
