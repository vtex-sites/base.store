import React from 'react'
import { User as UserIcon } from 'phosphor-react'

import { LinkButton } from '../Button'

const SignInLink: React.FC = () => {
  return (
    <LinkButton
      href="/"
      className="title-sub-subsection"
      data-button-variant="primary"
      data-button-inverse="true"
    >
      <UserIcon size={32} />
      <span>Sign In</span>
    </LinkButton>
  )
}

export default SignInLink
