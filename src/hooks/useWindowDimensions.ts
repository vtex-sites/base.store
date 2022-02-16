import { useState, useEffect, useCallback } from 'react'

/**
 * @deprecated
 * @description This is a non compliant React component and may lead
 * to undesired behavior if used on SSR. DO NOT USE IT unless you know
 * this component will not be used during SSR. If you need SSR, render
 * both versions of your page and hide it using CSS + media query
 */
export default function useWindowDimensions() {
  const hasWindow = typeof window !== 'undefined'
  // See breakpoints on styles/theme.scss
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
