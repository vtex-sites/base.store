import { useStorage } from '@faststore/sdk'

const storageKey = 'main::store::postalCode'

export default function useRegion() {
  return useStorage<string>(storageKey, '')
  // TODO: get region id here
}
