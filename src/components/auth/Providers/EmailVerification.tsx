import {
  isValidAccessCode,
  isValidEmail,
  sendAccessKey,
  useOnLoginSuccessful,
  useStartLogin,
  validateAccessKey,
} from '@vtex/gatsby-theme-store'
import type { AuthProviderComponentProps } from '@vtex/store-ui'
import { EmailVerificationProvider } from '@vtex/store-ui'
import type { FC } from 'react'
import React from 'react'

const EmailVerification: FC<AuthProviderComponentProps> = ({ ...rest }) => {
  const onLoginSuccessful = useOnLoginSuccessful()
  const startLogin = useStartLogin()

  return (
    <EmailVerificationProvider
      {...rest}
      sendAccessKey={sendAccessKey}
      validateAccessKey={validateAccessKey}
      isValidAccessCode={isValidAccessCode}
      isValidEmail={isValidEmail}
      startLogin={startLogin}
      onLoginSuccessful={onLoginSuccessful}
    />
  )
}

export default EmailVerification
