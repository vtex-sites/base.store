import React, { lazy, memo } from 'react'
import { Breadcrumb as UIBreadcrumb } from '@faststore/ui'
import Link from 'src/components/ui/Link'
import type { BreadcrumbProps as UIBreadcrumbProps } from '@faststore/ui'
import LazyIcon from 'src/components/common/LazyIcon'

import 'src/styles/icons.scss'
import './breadcrumb.scss'

const HouseIcon = lazy(() => import('phosphor-react/src/icons/House'))

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
        <span className="icon__18">
          <LazyIcon icon={HouseIcon} size={18} weight="bold" />
        </span>
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
