import { useStorage } from '@faststore/sdk'

const storageKey = 'main::store::searchHistory'

export default function useSearchHistory() {
  const MAX_HISTORY_SIZE = 5
  const [searchHistory, setSearchHistory] = useStorage<string[]>(storageKey, [])

  function addToSearchHistory(term: string) {
    const historySet = new Set(searchHistory)

    historySet.delete(term)

    const newHistory = [term, ...historySet]

    if (newHistory.length > MAX_HISTORY_SIZE) {
      newHistory.pop()
    }

    setSearchHistory(newHistory)
  }

  function clearSearchHistory() {
    setSearchHistory([])
  }

  return {
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
  }
}
