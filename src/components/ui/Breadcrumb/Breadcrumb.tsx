import { Breadcrumb as UIBreadcrumb } from '@faststore/ui'
import React, { memo } from 'react'
import Icon from 'src/components/ui/Icon'
import Link from 'src/components/ui/Link'
import type { BreadcrumbProps as UIBreadcrumbProps } from '@faststore/ui'

type ItemElement = {
  item: string
  name: string
  position: number
}
export interface BreadcrumbProps extends UIBreadcrumbProps {
  breadcrumbList: ItemElement[]
}

function Breadcrumb({ breadcrumbList }: BreadcrumbProps) {
  return (
    <UIBreadcrumb divider="">
      <Link aria-label="home" to="/">
        <Icon name="House" width={18} height={18} weight="bold" />
      </Link>

      {breadcrumbList.map(({ item, name }, index) => {
        return breadcrumbList.length === index + 1 ? (
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
