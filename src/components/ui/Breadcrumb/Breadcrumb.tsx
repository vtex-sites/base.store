import React, { memo } from 'react'
import {
  Breadcrumb as UIBreadcrumb,
  Dropdown as UIDropdown,
  DropdownButton as UIDropdownButton,
  DropdownItem as UIDropdownItem,
  DropdownMenu as UIDropdownMenu,
} from '@faststore/ui'
import Link from 'src/components/ui/Link'
import type { BreadcrumbProps as UIBreadcrumbProps } from '@faststore/ui'
import Icon from 'src/components/ui/Icon'
import { navigate } from 'gatsby'

import './breadcrumb.scss'

const NOTEBOOK_WIDTH = 1280

type ItemElement = {
  item: string
  name: string
  position: number
}
export interface BreadcrumbProps extends UIBreadcrumbProps {
  breadcrumbList: ItemElement[]
}

function Breadcrumb({ breadcrumbList }: BreadcrumbProps) {
  const isBrowser = typeof window !== 'undefined'

  const isDesktop = isBrowser ? window?.outerWidth >= NOTEBOOK_WIDTH : false

  const firstItem = isDesktop ? breadcrumbList[0] : null
  const mediumItems = isDesktop
    ? breadcrumbList.slice(1, -2)
    : breadcrumbList.slice(0, -2)

  const lastItems = breadcrumbList.slice(-2)

  const shouldUseDropdown = breadcrumbList.length > 4

  return (
    <UIBreadcrumb divider="">
      <Link aria-label="home" to="/">
        <Icon name="House" width={18} height={18} weight="bold" />
      </Link>

      {!shouldUseDropdown &&
        breadcrumbList.map(({ item, name }, index) => {
          return breadcrumbList.length === index + 1 ? (
            <span key={String(index)}>{name}</span>
          ) : (
            <Link to={item} key={String(index)}>
              {name}
            </Link>
          )
        })}

      {shouldUseDropdown && firstItem && (
        <Link to={firstItem.item}>{firstItem.name}</Link>
      )}

      {shouldUseDropdown && (
        <UIDropdown>
          <UIDropdownButton>
            <span>...</span>
          </UIDropdownButton>
          <UIDropdownMenu data-menu-height>
            {mediumItems.map(({ item, name }, index) => (
              <UIDropdownItem
                onClick={() => navigate(item)}
                key={String(index)}
              >
                <Icon name="ArrowElbowDownRight" width={24} height={24} />
                <span>{name}</span>
              </UIDropdownItem>
            ))}
          </UIDropdownMenu>
        </UIDropdown>
      )}

      {shouldUseDropdown &&
        lastItems.map(({ item, name }, index) => {
          return lastItems.length === index + 1 ? (
            <span key={String(index)}>{name}</span>
          ) : (
            <Link to={item} key={String(index)}>
              {name}
            </Link>
          )
        })}
    </UIBreadcrumb>
  )
}

export default memo(Breadcrumb)
