import { GatsbySeo, JsonLd } from 'gatsby-plugin-next-seo'
import React from 'react'

import { useMetadata } from './hooks/useMetadata'
import { useSiteLinksSearchBoxJsonLd } from './hooks/useSiteLinksSearchBoxJsonLd'
import type { Props as ViewProps } from '../index'

export type Props = ViewProps & { title: string }

function Seo(props: Props) {
  const metadata = useMetadata(props)
  const siteLinksSearchBox = useSiteLinksSearchBoxJsonLd(props)

  return (
    <>
      <GatsbySeo {...metadata} defer />
      <JsonLd json={siteLinksSearchBox} defer />
    </>
  )
}

export default Seo
