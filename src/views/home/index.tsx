import React, { useState } from 'react'
import type { Props as PageProps } from 'src/pages/index'
import { Modal, Button } from '@vtex/store-ui'

import Seo from './Seo'
import './index.module.css'

export type Props = PageProps

function View(props: Props) {
  // Send event to analytics
  // usePixelSendEvent(() => {
  //   const event: PageViewData = {
  //     pageType: 'home',
  //     pageUrl: window.location.href,
  //     pageTitle: document.title,
  //     referrer: '',
  //     accountName: process.env.GATSBY_STORE_ID!,
  //   }

  //   return { type: 'vtex:pageView', data: event }
  // })
  const [isModalOpen, setModalOpen] = useState(false)

  if (typeof window === 'undefined') {
    return null
  }

  const title = props.data.site?.siteMetadata?.title ?? ''

  return (
    <>
      {/* Seo Components */}
      <Seo {...props} title={title} />

      {/* Visual Sections */}
      <h1 className="absolute top-[-100px]">{title}</h1>
      <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setModalOpen(false)}
        className="absolute"
      >
        asasasas
      </Modal>
    </>
  )
}

export default View
