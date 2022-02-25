import type {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from 'react'
import React, { Suspense, useEffect, useState } from 'react'
import SkeletonElement from 'src/components/skeletons/SkeletonElement'

import 'src/styles/icons.scss'

interface Props<C> {
  icon: C
}

function LazyIcon<C extends ElementType>({
  icon: Icon,
  ...props
}: PropsWithChildren<Props<C> & ComponentPropsWithoutRef<C>>) {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return (
      <div className={`icon__${props?.size ?? 24}`}>
        <SkeletonElement type="text" shimmer loading />
      </div>
    )
  }

  return (
    <Suspense fallback={null}>
      <Icon {...(props as any)} />
    </Suspense>
  )
}

export default LazyIcon
