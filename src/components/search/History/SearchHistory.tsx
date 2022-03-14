import React from 'react'
// import IconSVG from 'src/components/common/IconSVG'
import { Icon as UIIcon, List as UIList } from '@faststore/ui'
import Button from 'src/components/ui/Button'
import './SearchHistory.scss'
import Link from 'src/components/ui/Link'
import IconSVG from 'src/components/common/IconSVG'

const SearchHistory = () => {
  return (
    <section className="history__section">
      <div className="history__header">
        <p className="history__title">History</p>
        <Button variant="tertiary">Clear</Button>
      </div>
      <UIList variant="ordered">
        <li key="testando">
          <Link variant="display" to="/">
            <UIIcon
              component={<IconSVG name="Clock" width={18} height={18} />}
            />
            {'Headphone'}
            <UIIcon
              component={
                <IconSVG name="ArrowUpRight" width={13.5} height={13.5} />
              }
            />
          </Link>
        </li>
        <li key="testando">
          <Link variant="display" to="/">
            <UIIcon
              component={<IconSVG name="Clock" width={18} height={18} />}
            />
            {'Audio & Video'}
            <UIIcon
              component={
                <IconSVG name="ArrowUpRight" width={13.5} height={13.5} />
              }
            />
          </Link>
        </li>
        <li key="testando">
          <Link variant="display" to="/">
            <UIIcon
              component={<IconSVG name="Clock" width={18} height={18} />}
            />
            {'MH-7000'}
            <UIIcon
              component={
                <IconSVG name="ArrowUpRight" width={13.5} height={13.5} />
              }
            />
          </Link>
        </li>
      </UIList>
    </section>
  )
}

export default SearchHistory
