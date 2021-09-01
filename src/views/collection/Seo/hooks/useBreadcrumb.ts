import { useMemo } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import type { BreadcrumbJsonLd } from 'gatsby-plugin-next-seo'
import type { CollectionSeoFragment_BreadcrumbFragment } from '@generated/CollectionSeoFragment_breadcrumb.graphql'

export interface Options {
  breadcrumb: CollectionSeoFragment_BreadcrumbFragment[]
}

type BreadcrumbJSONLD = ComponentPropsWithoutRef<typeof BreadcrumbJsonLd>

export const useBreadcrumb = ({
  breadcrumb,
}: Options): BreadcrumbJSONLD | null =>
  useMemo(() => {
    if (breadcrumb?.length === 0) {
      return null
    }

    return {
      itemListElements: breadcrumb.map((item, index: number) => ({
        position: index + 1,
        name: item.name!,
        item: item.href!,
      })),
    }
  }, [breadcrumb])
