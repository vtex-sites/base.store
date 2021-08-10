import { EmailAndPasswordProvider } from '@vtex/store-ui'
import React from 'react'
import type { AuthProviderComponentProps } from '@vtex/store-ui'
import type { FC } from 'react'
import {
  useStartLogin,
  useOnLoginSuccessful,
  setPassword,
  validatePassword,
  isValidAccessCode,
  isValidEmail,
  isValidPassword,
  sendAccessKey,
} from '@vtex/gatsby-theme-store'

const EmailAndPassword: FC<AuthProviderComponentProps> = (props) => {
  const startLogin = useStartLogin()
  const onLoginSuccessful = useOnLoginSuccessful()

  return (
    <EmailAndPasswordProvider
      {...props}
      setPassword={setPassword}
      validatePassword={validatePassword}
      isValidAccessCode={isValidAccessCode}
      isValidEmail={isValidEmail}
      isValidPassword={isValidPassword}
      sendAccessKey={sendAccessKey}
      startLogin={startLogin}
      onLoginSuccessful={onLoginSuccessful}
    />
  )
}

export default EmailAndPassword
