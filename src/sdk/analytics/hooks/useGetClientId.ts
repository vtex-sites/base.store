import { useRef } from 'react'

const GA_CLIENT_ID_KEY = 'main::store::ga::client_id'

// https://gist.github.com/kindy/35ccd6c60b650e7fd261
function generateClientId() {
  return `${Math.floor(Math.random() * 0x7fffffff)}.${Math.floor(
    Date.now() / 1000
  )}`
}

const getClientId = () => {
  let localClientId = ''

  try {
    localClientId = localStorage.getItem(GA_CLIENT_ID_KEY) ?? ''
  } catch (e) {
    console.error(e)
  }

  if (!localClientId) {
    localClientId = generateClientId()

    try {
      localStorage.setItem(GA_CLIENT_ID_KEY, localClientId)
    } catch (e) {
      localClientId = ''
    }
  }

  return localClientId
}

const useGetClientId = () => {
  const clientIdRef = useRef(getClientId())

  return clientIdRef.current
}

export default useGetClientId
