import React from 'react'
import Icon from 'src/components/ui/Icon'
import usePersonQuery from 'src/sdk/person/usePersonQuery'

import { LinkButton } from '../Button'

const SignInLink: React.FC = () => {
  const person = usePersonQuery()

  return (
    <LinkButton
      data-button-signin-link
      to={person?.id ? '/account' : '/login'}
      className="title-sub-subsection signin-link"
      variant="tertiary"
    >
      <Icon name="User" width={18} height={18} weight="bold" />
      <span>{person?.id ? 'My Account' : 'Sign In'}</span>
    </LinkButton>
  )
}

export default SignInLink
