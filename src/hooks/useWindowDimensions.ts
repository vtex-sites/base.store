import { useState, useEffect } from 'react'

const getWindowDimensions = () => {
  // See breakpoints on styles/theme.scss
  const notebookBreakpoint = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--breakpoint-notebook')

  const width = window.innerWidth
  const height = window.innerHeight
  const isMobile = width ? width < parseInt(notebookBreakpoint, 10) : null

  return {
    width,
    height,
    isMobile,
  }
}

export default function useWindowDimensions() {
  if (typeof window === 'undefined') {
    throw new Error(
      `Cannot use this hook on SSR. This is an anti-pattern and WILL lead to React hydration mismatches and performance loss. To learn more: https://reactjs.org/docs/react-dom.html#hydrate`
    )
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
