import React, { memo } from 'react'
import { Breadcrumb as UIBreadcrumb } from '@faststore/ui'
import Link from 'src/components/ui/Link'
import type { BreadcrumbProps as UIBreadcrumbProps } from '@faststore/ui'
import { House as HouseIcon } from 'phosphor-react'

import './breadcrumb.scss'

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
        <HouseIcon size={18} weight="bold" />
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
