import React from 'react'
import Icon from 'src/components/ui/Icon'
import { useSession } from '@faststore/sdk'

import { LinkButton } from '../Button'

const SignInLink: React.FC = () => {
  const { user } = useSession()

  const isAuthenticated = user !== null

  return (
    <LinkButton
      data-button-signin-link
      to="/"
      className="title-sub-subsection signin-link"
      variant="tertiary"
    >
      <Icon name="User" width={18} height={18} weight="bold" />
      <span>{isAuthenticated ? 'My Account' : 'Sign In'}</span>
    </LinkButton>
  )
}

export default SignInLink
