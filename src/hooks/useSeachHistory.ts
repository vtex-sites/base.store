import { useStorage } from '@faststore/sdk'

const storageKey = 'main::store::searchHistory'

const MAX_HISTORY_SIZE = 5

export default function useSearchHistory(
  maxHistorySize: number = MAX_HISTORY_SIZE
) {
  const [searchHistory, setSearchHistory] = useStorage<string[]>(storageKey, [])

  function addToSearchHistory(term: string) {
    const historySet = new Set(searchHistory)

    historySet.delete(term)

    const newHistory = [term, ...historySet]

    if (newHistory.length > maxHistorySize) {
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
