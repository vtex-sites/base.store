import Icon from 'src/components/ui/Icon'
import usePersonQuery from 'src/sdk/person/usePersonQuery'
import type { FC } from 'react'

import { LinkButton } from '../Button'

const SignInLink: FC = () => {
  const person = usePersonQuery()

  return (
    <LinkButton
      data-button-signin-link
      to={person?.id ? '/account' : '/login'}
      className="text__title-mini signin-link"
      variant="tertiary"
    >
      <Icon name="User" width={18} height={18} weight="bold" />
      <span>{person?.id ? 'My Account' : 'Sign In'}</span>
    </LinkButton>
  )
}

export default SignInLink
