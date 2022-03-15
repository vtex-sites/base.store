import React, { memo } from 'react'
import { Breadcrumb as UIBreadcrumb } from '@faststore/ui'
import Link from 'src/components/ui/Link'
import type { BreadcrumbProps as UIBreadcrumbProps } from '@faststore/ui'
import IconSVG from 'src/components/common/IconSVG'

import * as style from './breadcrumb.module.scss'

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
    <UIBreadcrumb divider="" className={style.container}>
      <Link className={style.link} aria-label="home" to="/">
        <IconSVG name="House" width={18} height={18} weight="bold" />
      </Link>

      {breadcrumbList.map(({ item, name }, index) => {
        return breadcrumbList.length === index + 1 ? (
          <span key={String(index)}>{name}</span>
        ) : (
          <Link className={style.link} to={item} key={String(index)}>
            {name}
          </Link>
        )
      })}
    </UIBreadcrumb>
  )
}

export default memo(Breadcrumb)
