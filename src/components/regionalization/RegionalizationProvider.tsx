import React, { useMemo, useState, useContext, createContext } from 'react'
import type { PropsWithChildren } from 'react'

interface RegionalizationContextValue {
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
}

const RegionalizationContext = createContext<
  RegionalizationContextValue | undefined
>(undefined)

function RegionalizationProvider({ children }: PropsWithChildren<unknown>) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const value = useMemo(
    () => ({
      isModalOpen,
      setIsModalOpen,
    }),
    [isModalOpen, setIsModalOpen]
  )

  return (
    <RegionalizationContext.Provider value={value}>
      {children}
    </RegionalizationContext.Provider>
  )
}

export function useRegionalization() {
  const context = useContext(RegionalizationContext)

  if (context === undefined) {
    throw new Error(
      'Do not use Regionalization outside the Regionalization context.'
    )
  }

  return context
}

export default RegionalizationProvider
