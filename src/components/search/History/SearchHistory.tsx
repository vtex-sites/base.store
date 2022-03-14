import React from 'react'
// import IconSVG from 'src/components/common/IconSVG'
import { Icon as UIIcon, List as UIList } from '@faststore/ui'
import Button from 'src/components/ui/Button'
import './SearchHistory.scss'
import Link from 'src/components/ui/Link'
import IconSVG from 'src/components/common/IconSVG'
import useSearchHistory from 'src/sdk/search/useSeachHistory'

const SearchHistory = () => {
  const { searchHistory, clearSearchHistory } = useSearchHistory()

  return (
    <section className="history__section">
      <div className="history__header">
        <p className="history__title">History</p>
        <Button variant="tertiary" onClick={clearSearchHistory}>
          Clear
        </Button>
      </div>
      <UIList variant="ordered">
        {searchHistory.map((item, index) => (
          <li key={index}>
            <Link variant="display" to="/">
              <UIIcon
                component={<IconSVG name="Clock" width={18} height={18} />}
              />
              {item}
              <UIIcon
                component={
                  <IconSVG name="ArrowUpRight" width={13.5} height={13.5} />
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
