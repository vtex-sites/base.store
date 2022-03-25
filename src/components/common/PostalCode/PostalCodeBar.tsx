import { IconButton } from '@faststore/ui'
import React from 'react'
import Alert from 'src/components/ui/Alert'
import Icon from 'src/components/ui/Icon'
import './postal-code.scss'

export default function PostalCodeInput() {
  return (
    <Alert
      data-store-alert
      icon={<Icon name="MapPin" width={24} height={24} />}
    >
      Set your location
      <IconButton
        icon={<Icon name="CaretRight" width={24} height={24} />}
        aria-label="Set location"
        onClick={() => {
          window.scrollTo(0, 1000)
        }}
      />
    </Alert>
  )
}
