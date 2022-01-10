import type { PropsWithChildren } from 'react'
import React from 'react'

import { LinkButton } from '../Button'
import './show-more-link.scss'

type Props = {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  href: string
}

function ShowMoreLink({
  onClick,
  href,
  children,
  ...otherProps
}: PropsWithChildren<Props>) {
  return (
    <LinkButton
      data-testid="show-more"
      data-store-link-show-more
      onClick={onClick}
      href={href}
      rel="next"
      variant="secondary"
      className="show-more-link"
      {...otherProps}
    >
      {children}
    </LinkButton>
  )
}

export default ShowMoreLink
