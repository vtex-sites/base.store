import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useSearch } from './useSearch'

interface Props {
  page: number
}

/**
 * Use this component to add a boundary between pages so we can
 * change the current page being viewed on infinite pagination.
 *
 * For more info: https://developers.google.com/search/blog/2014/02/infinite-scroll-search-friendly
 *
 * Also, this component's name was taken from: https://en.wikipedia.org/wiki/Page_break
 */
function PageBreak({ page }: Props) {
  const { ref, inView } = useInView()
  const {
    pageInfo: { setCurrentPage },
  } = useSearch()

  useEffect(() => {
    if (inView) {
      setCurrentPage(page)
    }
  }, [inView, page, setCurrentPage])

  return <div ref={ref} />
}

export default PageBreak
