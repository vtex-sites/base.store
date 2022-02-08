import { useState, useEffect, useCallback } from 'react'

/**
 * This hook should only be used client-side. If used server side, this should throw
 */
export default function useWindowDimensions() {
  if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
    console.error(
      'Depending on window dimentions on the server is an anti-pattern and will lead to hydration mismatches. Please refer to the React docs for more info: https://reactjs.org/docs/react-dom.html#hydrate'
    )

    throw new Error('BadReactUsage')
  }

  // See breakpoints on styles/theme.scss
  const notebookBreakpoint = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--breakpoint-notebook')

  const getWindowDimensions = useCallback(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const isMobile = width ? width < parseInt(notebookBreakpoint, 10) : null

    return {
      width,
      height,
      isMobile,
    }
  }, [notebookBreakpoint])

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [getWindowDimensions])

  return windowDimensions
}
