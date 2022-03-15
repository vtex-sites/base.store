import React, { memo } from 'react'
import UIBreadcrumb from 'src/components/ui/Breadcrumb'
import type { BreadcrumbProps } from 'src/components/ui/Breadcrumb'

import Section from '../Section'
import * as style from './breadcrumb.module.scss'

interface BreadcrumbWrapperProps
  extends Partial<Pick<BreadcrumbProps, 'breadcrumbList'>> {
  name: string
}

function Breadcrumb({ breadcrumbList, name }: BreadcrumbWrapperProps) {
  const fallback = [{ item: '/', name, position: 1 }]
  const list = breadcrumbList ?? fallback

  return (
    <Section className={`${style.breadcrumb} / grid-content`}>
      <UIBreadcrumb breadcrumbList={list} />
    </Section>
  )
}

export default memo(Breadcrumb)
