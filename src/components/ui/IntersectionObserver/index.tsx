import type { ReactNode } from 'react'
import React from 'react'
import { useInView } from 'react-intersection-observer'

type IntersectionObserverProps = {
  children: ReactNode
}

const IntersectionObserver = ({ children }: IntersectionObserverProps) => {
  const { ref, inView } = useInView()

  return (
    <>
      <div ref={ref} />
      {inView && children}
    </>
  )
}

export default IntersectionObserver
