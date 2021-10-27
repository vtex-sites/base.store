import type { RefObject } from 'react'
import { useEffect, useState } from 'react'

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0, root = null, rootMargin = '0%' }: Args
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  useEffect(() => {
    const node = elementRef?.current // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || !node) return

    const observerParams = { threshold, root, rootMargin }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const observer = new IntersectionObserver(([entry]): void => {
      setEntry(entry)
    }, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef, root, rootMargin, threshold])

  return entry
}

export default useIntersectionObserver
