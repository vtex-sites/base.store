import { GatsbySeo, JsonLd } from 'gatsby-plugin-next-seo'
import React from 'react'
import useAddHead from 'src/utils/hooks/useAddHead'

import type { Props as ViewProps } from '../index'
import { useMetadata } from './hooks/useMetadata'
import { useSiteLinksSearchBoxJsonLd } from './hooks/useSiteLinksSearchBoxJsonLd'

export type Props = ViewProps

function Seo(props: Props) {
  const metadata = useMetadata(props)
  const siteLinksSearchBox = useSiteLinksSearchBoxJsonLd(props)

  useAddHead({ title: metadata.title ?? '' })

  return (
    <>
      <GatsbySeo {...metadata} defer />
      <JsonLd json={siteLinksSearchBox} defer />
    </>
  )
}

export default Seo
