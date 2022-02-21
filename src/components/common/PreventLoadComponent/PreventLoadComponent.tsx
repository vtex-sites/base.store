import type {
  ComponentPropsWithoutRef,
  ElementType,
  SuspenseProps,
} from 'react'
import React, { Suspense } from 'react'
import usePerformanceTestFlag from 'src/hooks/usePerformanceTestFlag'

interface Props<C> {
  fallback: SuspenseProps['fallback']
  component: C
}

export default function PreventLoadComponent<C extends ElementType>({
  fallback,
  component: Component,
  ...componentProps
}: Props<C> & ComponentPropsWithoutRef<C>) {
  const renderComponent = usePerformanceTestFlag()

  if (!renderComponent) {
    return null
  }

  return (
    <Suspense fallback={fallback}>
      <Component {...(componentProps as any)} />
    </Suspense>
  )
}
