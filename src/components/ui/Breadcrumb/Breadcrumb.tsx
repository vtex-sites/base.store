import React from 'react'
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
  const buildUrl = (url: string) => {
    const parsedUrl = url.split('/')

    return `/${parsedUrl[parsedUrl.length - 1]}`
  }

  return (
    <UIBreadcrumb divider="">
      <Link aria-label="home" href="/">
        <HouseIcon size={18} weight="bold" />
      </Link>

      {breadcrumbList.map(({ item, name }, index) => {
        return breadcrumbList.length === index + 1 ? (
          <span key={String(index)}>{name}</span>
        ) : (
          <Link href={buildUrl(item)} key={String(index)}>
            {name}
          </Link>
        )
      })}
    </UIBreadcrumb>
  )
}

export default Breadcrumb
