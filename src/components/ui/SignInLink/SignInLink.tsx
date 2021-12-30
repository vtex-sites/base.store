import React from 'react'
import { User as UserIcon } from 'phosphor-react'

import { LinkButton } from '../Button'

const SignInLink: React.FC = () => {
  return (
    <LinkButton
      data-button-signin-link
      href="/"
      className="title-sub-subsection signin-link"
      variant="tertiary"
    >
      <UserIcon size={24} />
      <span>Sign In</span>
    </LinkButton>
  )
}

export default SignInLink
