import { useStorage } from '@faststore/sdk'

const storageKey = 'main::store::postalCode'

export default function usePostalCode() {
  return useStorage<string>(storageKey, '')
}
