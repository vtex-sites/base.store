import React, { memo } from 'react'

import type { BreadcrumbProps } from '.'
import Breadcrumb from '.'

interface BreadcrumbWrapperProps
  extends Partial<Pick<BreadcrumbProps, 'breadcrumbList'>> {
  name: string
}

const BreadcrumbWrapper = ({
  breadcrumbList,
  name,
}: BreadcrumbWrapperProps) => {
  const fallback = [{ item: '/', name, position: 1 }]
  const list = breadcrumbList ?? fallback

  return <Breadcrumb breadcrumbList={list} />
}

export default memo(BreadcrumbWrapper)
