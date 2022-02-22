import type {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from 'react'
import React, { Suspense, useEffect, useState } from 'react'

export default function LazyIcon<C extends ElementType>({
  icon: Icon,
  ...props
}: PropsWithChildren<{ icon: C } & ComponentPropsWithoutRef<C>>) {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <Icon {...(props as any)} />
    </Suspense>
  )
}
