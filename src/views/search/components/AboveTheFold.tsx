/** @jsx jsx */
import { SuspenseDevice, Breadcrumb, Container, jsx } from '@vtex/store-ui'
import PageList from '@vtex/gatsby-theme-store/src/components/Search/List'
import Controls from '@vtex/gatsby-theme-store/src/components/Search/Controls'
import {
  SearchTemplateContainer,
  SearchTemplateAside,
  SearchTemplateMain,
} from '@vtex/gatsby-theme-store/src/components/Search/SearchTemplate'
import SearchBanner from 'src/components/search/Banner'
import { lazy } from 'react'
import type { FC } from 'react'
import type { BreadcrumbItem } from '@vtex/store-ui'

import type { SearchViewProps } from '..'

const DesktopSearchFilters = lazy(
  () => import('@vtex/gatsby-theme-store/src/components/Search/Filters/Desktop')
)

const COLUMNS = [2, 3, 4]

type Props = SearchViewProps

const AboveTheFold: FC<Props> = ({
  data,
  data: {
    vtex: { facets, banners },
  },
}) => {
  const breadcrumb = (facets?.breadcrumb ?? []) as BreadcrumbItem[]

  return (
    <Container>
      <Breadcrumb breadcrumb={breadcrumb} type="SEARCH" />

      <SearchBanner html={banners?.banners?.[0]?.html} />

      <SearchTemplateContainer>
        <SearchTemplateAside>
          <SuspenseDevice device="desktop" fallback={null}>
            <DesktopSearchFilters
              isActive={(index: number) => index < 5}
              variant="desktop"
            />
          </SuspenseDevice>
        </SearchTemplateAside>

        <SearchTemplateMain>
          <Controls data={data} />
          <PageList initialData={data as any} columns={COLUMNS} />
        </SearchTemplateMain>
      </SearchTemplateContainer>
    </Container>
  )
}

export default AboveTheFold
