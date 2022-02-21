import { useEffect, useState } from 'react'

const PERFORMANCE_TEST_QUERY_STRING = '__performanceTest'

export default function usePerformanceTestFlag() {
  const [renderComponent, setRenderComponent] = useState(false)

  useEffect(() => {
    if (!window.location.search.includes(PERFORMANCE_TEST_QUERY_STRING)) {
      setRenderComponent(true)
    }
  }, [])

  return renderComponent
}
