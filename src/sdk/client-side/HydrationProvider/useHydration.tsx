import { useContext } from 'react'

import { HydrationContext } from './HydrationProvider'

export default function useHydration() {
  const context = useContext(HydrationContext)

  if (context === undefined && typeof window !== 'undefined') {
    throw new Error(`HydrationProvider needs to be on the React tree`)
  }

  return context
}
