import { useStorage } from '@faststore/sdk'

const storageKey = 'main::store::postalCode'

export default function useRegion() {
  const postalCodeStateAndDispatcher = useStorage<string>(storageKey, '')

  // TODO: get region id here

  return postalCodeStateAndDispatcher
}
