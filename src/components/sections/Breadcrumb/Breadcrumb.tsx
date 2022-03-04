import React, { memo } from 'react'
import UIBreadcrumb from 'src/components/ui/Breadcrumb'
import type { BreadcrumbProps } from 'src/components/ui/Breadcrumb'

import './breadcrumb.scss'

interface BreadcrumbWrapperProps
  extends Partial<Pick<BreadcrumbProps, 'breadcrumbList'>> {
  name: string
}

function Breadcrumb({ breadcrumbList, name }: BreadcrumbWrapperProps) {
  const fallback = [{ item: '/', name, position: 1 }]
  const list = breadcrumbList ?? fallback

  return (
    <div className="breadcrumb grid-content">
      <UIBreadcrumb breadcrumbList={list} />
    </div>
  )
}

export default memo(Breadcrumb)
