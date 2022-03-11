import React, { memo } from 'react'
import type { BreadcrumbProps } from 'src/components/ui/Breadcrumb'
import UIBreadcrumb from 'src/components/ui/Breadcrumb'

interface BreadcrumbWrapperProps
  extends Partial<Pick<BreadcrumbProps, 'breadcrumbList'>> {
  name: string
}

function Breadcrumb({ breadcrumbList, name }: BreadcrumbWrapperProps) {
  const fallback = [{ item: '/', name, position: 1 }]
  const list = breadcrumbList ?? fallback

  return <UIBreadcrumb breadcrumbList={list} />
}

export default memo(Breadcrumb)
