const storeId = process.env.GATSBY_STORE_ID as string

export const VTEX_ID_ROUTES = {
  pub: {
    authentication: {
      startLogin: `/api/vtexid/pub/authentication/startlogin`,
      accessKey: {
        send: `/api/vtexid/pub/authentication/accesskey/send`,
        validate: `/api/vtexid/pub/authentication/accesskey/validate`,
      },
      oauth: {
        redirect: `/api/vtexid/pub/authentication/oauth/redirect`,
      },
      classic: {
        validate: `/api/vtexid/pub/authentication/classic/validate`,
        setPassword: `/api/vtexid/pub/authentication/classic/setpassword`,
      },
      providers: `/api/vtexid/pub/authentication/providers`,
    },
  },
  oauth: {
    error: `/api/vtexid/oauth/error`,
    finish: `/api/vtexid/oauth/finish`,
  },
}

interface StartLoginOptions {
  fingerprint?: string
  callbackUrl?: string
  user?: string
}

export const oAuthErrorFallbackUrl = () =>
  new URL(VTEX_ID_ROUTES.oauth.error, window.location.origin).href

export const oAuthCallbackUrl = () =>
  new URL(VTEX_ID_ROUTES.oauth.finish, window.location.origin).href

const OAuthRedirectUrl = ({ providerName }: { providerName: string }) => {
  const errorFallbackUrl = oAuthErrorFallbackUrl
  const search = new URLSearchParams()

  search.append('providerName', providerName)
  search.append('errorFallbackUrl', errorFallbackUrl())

  return `${
    VTEX_ID_ROUTES.pub.authentication.oauth.redirect
  }?${search.toString()}`
}

export async function startLogin({
  callbackUrl = '',
  fingerprint = '',
  user = '',
}: StartLoginOptions) {
  const returnUrl = `${window.origin}/account`

  const form = new FormData()

  form.append('fingerprint', fingerprint)
  form.append('callbackUrl', callbackUrl)
  form.append('returnUrl', returnUrl)
  form.append('accountName', storeId)
  form.append('scope', storeId)
  form.append('user', user)

  const response = await fetch(VTEX_ID_ROUTES.pub.authentication.startLogin, {
    method: 'POST',
    credentials: 'include',
    headers: {
      accept: 'application/json',
    },
    body: form,
  })

  if (response.status > 300) {
    throw new Error('Something went wrong while logging in')
  }

  window.location.href = OAuthRedirectUrl({ providerName: 'Google' })
}
