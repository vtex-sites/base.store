import React, { lazy } from 'react'
import LazyIcon from 'src/components/common/LazyIcon'

import { LinkButton } from '../Button'

const UserIcon = lazy(() => import('phosphor-react/src/icons/User'))

const SignInLink: React.FC = () => {
  return (
    <LinkButton
      data-button-signin-link
      to="/"
      className="title-sub-subsection signin-link"
      variant="tertiary"
      icon={<LazyIcon icon={UserIcon} size={18} weight="bold" />}
      iconPosition="left"
    >
      <span>Sign In</span>
    </LinkButton>
  )
}

export default SignInLink
