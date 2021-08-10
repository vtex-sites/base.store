/** @jsx jsx */
import { jsx } from '@vtex/store-ui'
import type { FC } from 'react'

import styles from './styles.json'

interface Props {
  html: string | undefined | null
}

const SearchBanner: FC<Props> = ({ html }) =>
  typeof html === 'string' ? (
    <div
      sx={styles.banner.container}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : null

export default SearchBanner
