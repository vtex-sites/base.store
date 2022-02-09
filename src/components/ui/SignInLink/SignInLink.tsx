import React from 'react'
import Icon from 'src/components/ui/Icon'
import { useSessionQuery } from 'src/sdk/session/useSessionQuery'

import { LinkButton } from '../Button'

const SignInLink: React.FC = () => {
  const session = useSessionQuery()

  return (
    <LinkButton
      data-button-signin-link
      to="/"
      className="title-sub-subsection signin-link"
      variant="tertiary"
    >
      <Icon name="User" width={18} height={18} weight="bold" />
      <span>{session ? 'My Account' : 'Sign In'}</span>
    </LinkButton>
  )
}

export default SignInLink
