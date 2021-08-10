import { OAuthProvider } from '@vtex/store-ui'
import React from 'react'
import type { AuthProviderComponentProps } from '@vtex/store-ui'
import type { FC } from 'react'
import {
  oAuthCallbackUrl,
  oAuthRedirectUrl,
  useStartLogin,
} from '@vtex/gatsby-theme-store'

const External: FC<AuthProviderComponentProps> = ({
  providerName = 'Google' as const,
  ...rest
}) => {
  const startLogin = useStartLogin()

  const myStartLogin = async () => {
    await startLogin({
      callbackUrl: oAuthCallbackUrl(),
    })

    window.location.href = oAuthRedirectUrl({ providerName })
  }

  return (
    <OAuthProvider
      {...rest}
      startLogin={myStartLogin}
      providerName={providerName}
    />
  )
}

export default External
