import React from 'react'
import { Breadcrumb as UIBreadcrumb } from '@faststore/ui'
import Link from 'src/components/ui/Link'
import type { BreadcrumbProps as UIBreadcrumbProps } from '@faststore/ui'
import { House as HouseIcon } from 'phosphor-react'

type ItemElement = {
  item: string
  name: string
  position: number
}
export interface BreadcrumbProps extends UIBreadcrumbProps {
  breadcrumbList: ItemElement[]
}

function Breadcrumb({ breadcrumbList, divider }: BreadcrumbProps) {
  return (
    <UIBreadcrumb divider={divider}>
      <Link aria-label="home" href="/">
        <HouseIcon />
      </Link>

      {breadcrumbList.map(({ item, name }, index) => {
        return breadcrumbList.length === index + 1 ? (
          <span>{name}</span>
        ) : (
          <Link href={item} key={String(index)}>
            {name}
          </Link>
        )
      })}
    </UIBreadcrumb>
  )
}

export default Breadcrumb
