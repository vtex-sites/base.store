import React from 'react'
import { Icon as UIIcon, List as UIList } from '@faststore/ui'
import Button from 'src/components/ui/Button'
import './SearchHistory.scss'
import Link from 'src/components/ui/Link'
import Icon from 'src/components/ui/Icon'
import useSearchHistory from 'src/sdk/search/useSeachHistory'
import { formatSearchState, initSearchState } from '@faststore/sdk'

interface SearchHistoryProps {
  onClear: () => void
}

const doSearch = (term: string) => {
  const { pathname, search } = formatSearchState(
    initSearchState({
      term,
      base: '/s',
    })
  )

  return `${pathname}${search}`
}

const SearchHistory = ({ onClear }: SearchHistoryProps) => {
  const { searchHistory } = useSearchHistory()

  return (
    <section data-store-search-history>
      <div className="history__header">
        <p className="history__title">History</p>
        <Button variant="tertiary" onClick={onClear}>
          Clear
        </Button>
      </div>
      <UIList variant="ordered">
        {searchHistory.map((item, index) => (
          <li key={index}>
            <Link variant="display" to={doSearch(item)}>
              <div>
                <UIIcon
                  component={<Icon name="Clock" width={18} height={18} />}
                />
                {item}
              </div>
              <UIIcon
                component={
                  <Icon name="ArrowUpRight" width={13.5} height={13.5} />
                }
              />
            </Link>
          </li>
        ))}
      </UIList>
    </section>
  )
}

export default SearchHistory
