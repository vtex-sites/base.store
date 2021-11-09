import type { UnknownEvent } from '@faststore/sdk'
import { sendAnalyticsEvent } from '@faststore/sdk'
import React, { useEffect } from 'react'
import type { Props as PageProps } from 'src/pages/index'

import Seo from './Seo'

export type Props = PageProps

function View(props: Props) {
  const title = props.data.site?.siteMetadata?.title ?? ''

  useEffect(() => {
    sendAnalyticsEvent<UnknownEvent & { event: string }>({
      type: 'pageview',
      event: 'pageview',
      data: {},
    })
  }, [])

  return (
    <>
      {/* Seo Components */}
      <Seo {...props} title={title} />

      {/* Visual Sections */}
      <h1 className="absolute top-[-100px]">{title}</h1>
    </>
  )
}

export default View
