import React, { useState } from 'react'
import type { Props as PageProps } from 'src/pages/index'
import { Button, Modal } from '@vtex/store-ui'

import Seo from './Seo'

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

  const [isOpen, setModalOpen] = useState(false)

  return (
    <>
      {/* Seo Components */}
      <Seo {...props} />

      {/* Visual Sections */}
      <div>TODO</div>
      <Button onClick={() => setModalOpen(true)}>open modal</Button>
      <Modal isOpen={isOpen} onDismiss={() => setModalOpen(false)}>
        My content here
      </Modal>
    </>
  )
}

export default View
