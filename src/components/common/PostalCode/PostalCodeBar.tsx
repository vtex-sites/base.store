import { IconButton } from '@faststore/ui'
import React from 'react'
import Alert from 'src/components/ui/Alert'
import Icon from 'src/components/ui/Icon'
import './postal-code.scss'

interface PostalCodeBarProps {
  content?: string
}

export default function PostalCodeInput({ content }: PostalCodeBarProps) {
  return (
    <div className="postal-code-bar">
      <Alert
        data-store-alert
        icon={<Icon name="MapPin" width={24} height={24} />}
      >
        {content ? (
          <>
            {content}
            <IconButton
              icon={<Icon name="CaretRight" width={24} height={24} />}
              aria-label="Set location"
              onClick={() => {
                window.scrollTo(0, 1000)
              }}
            />
          </>
        ) : (
          <>
            <span>Set your location</span>
            <IconButton
              icon={<Icon name="CaretRight" width={24} height={24} />}
              aria-label="Set location"
              onClick={() => {
                window.scrollTo(0, 1000)
              }}
            />
          </>
        )}
      </Alert>
    </div>
  )
}
