/** @jsx jsx */
import { Grid, Skeleton, Container, SuspenseDevice, jsx } from '@vtex/store-ui'
import type { FC } from 'react'
import styles from 'src/components/common/FacetedProductList/styles.json'

const array = new Array(10).fill(true)

const AboveTheFoldPreview: FC = () => (
  <Container>
    <div sx={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
      <Skeleton width="500px" height="45px" />
    </div>

    <div sx={styles.container}>
      <aside sx={styles.aside}>
        <SuspenseDevice device="desktop" fallback={null}>
          <Skeleton width="230px" height="1000px" />
        </SuspenseDevice>
      </aside>

      <div sx={styles.main}>
        <div sx={{ my: '32px' }}>
          <Skeleton height="33px" />
        </div>

        <Grid my={4} gap={3} columns={[2, 2, 3, 5]}>
          {array.map((_, id) => (
            <Skeleton key={`${id}.preview`} height="470px" />
          ))}
        </Grid>
      </div>
    </div>
  </Container>
)

export default AboveTheFoldPreview
