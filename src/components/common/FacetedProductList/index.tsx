/** @jsx jsx */
import { lazy } from 'react'
import { SuspenseDevice, jsx } from '@vtex/store-ui'
import type { FC } from 'react'

import Controls from './Controls'
import PageList from './List'
import styles from './styles.json'

const DesktopSearchFilters = lazy(() => import('./Filters/Desktop'))

const COLUMNS = [2, 3, 4]

interface Props {
  data: any
}

const FacetedProductList: FC<Props> = ({ data }) => (
  <div sx={styles.container}>
    <aside sx={styles.aside}>
      <SuspenseDevice device="desktop" fallback={null}>
        <DesktopSearchFilters
          isActive={(index: number) => index < 5}
          variant="desktop"
        />
      </SuspenseDevice>
    </aside>
    <div sx={styles.main}>
      <Controls data={data} />
      <PageList initialData={data} columns={COLUMNS} />
    </div>
  </div>
)

export default FacetedProductList
