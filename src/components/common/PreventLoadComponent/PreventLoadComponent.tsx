import type {
  ComponentPropsWithoutRef,
  ElementType,
  SuspenseProps,
} from 'react'
import React, { Suspense } from 'react'
import { useHydration } from 'src/sdk/client-side/HydrationProvider'

interface Props<C> {
  fallback: SuspenseProps['fallback']
  preventLoadComponentCallback: () => boolean
  component: C
}

export default function PreventLoadComponent<C extends ElementType>({
  fallback,
  component: Component,
  preventLoadComponentCallback,
  ...componentProps
}: Props<C> & ComponentPropsWithoutRef<C>) {
  const hydrated = useHydration()

  if (!hydrated || preventLoadComponentCallback()) {
    return null
  }

  return (
    <Suspense fallback={fallback}>
      <Component {...(componentProps as any)} />
    </Suspense>
  )
}
