import type { PropsWithChildren } from 'react'
import React, { createContext, useEffect, useState } from 'react'

export const HydrationContext = createContext<boolean | undefined>(undefined)

export default function HydrationProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return (
    <HydrationContext.Provider value={hydrated}>
      {children}
    </HydrationContext.Provider>
  )
}
