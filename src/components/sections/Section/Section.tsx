import type { DetailedHTMLProps } from 'react'

type Props = DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

function Section({ className = '', ...otherProps }: Props) {
  return <section className={`section ${className}`} {...otherProps} />
}

export default Section
