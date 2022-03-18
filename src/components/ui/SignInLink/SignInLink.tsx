import React from 'react'
import Icon from 'src/components/ui/Icon'

import { LinkButton } from '../Button'

const SignInLink: React.FC = () => {
  return (
    <LinkButton
      data-button-signin-link
      to="/"
      className="title-sub-subsection signin-link"
      variant="tertiary"
    >
      <Icon name="User" width={18} height={18} weight="bold" />
      <span>Sign In</span>
    </LinkButton>
  )
}

export default SignInLink
