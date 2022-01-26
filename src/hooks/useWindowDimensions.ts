import { useState, useEffect, useCallback } from 'react'

export default function useWindowDimensions() {
  const hasWindow = typeof window !== 'undefined'
  // See breakpoints on styles/global.scss
  const notebookBreakpoint = hasWindow
    ? getComputedStyle(document.documentElement).getPropertyValue(
        '--breakpoint-notebook'
      )
    : '1280'

  const getWindowDimensions = useCallback(() => {
    const width = hasWindow ? window.innerWidth : null
    const height = hasWindow ? window.innerHeight : null
    const isMobile = width ? width < parseInt(notebookBreakpoint, 10) : null

    return {
      width,
      height,
      isMobile,
    }
  }, [hasWindow, notebookBreakpoint])

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    if (!hasWindow) {
      return undefined
    }

    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [hasWindow, getWindowDimensions])

  return windowDimensions
}
