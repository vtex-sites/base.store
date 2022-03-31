import type { PropsWithChildren } from 'react'

interface Props {
  className?: string
}

function Section({ children, className = '' }: PropsWithChildren<Props>) {
  return <section className={`section ${className}`}>{children}</section>
}

export default Section
