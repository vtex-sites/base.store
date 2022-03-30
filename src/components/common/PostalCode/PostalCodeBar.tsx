import React from 'react'
import Button from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'
import './postal-code.scss'

interface PostalCodeBarProps {
  content?: string
}

export default function PostalCodeInput({ content }: PostalCodeBarProps) {
  return (
    <div className="postal-code-bar">
      <Button
        onClick={() => {
          window.scrollTo(0, 1000)
        }}
      >
        {content ? (
          <>
            <Icon name="MapPin" width={24} height={24} />
            <span>{content}</span>
            <span>Edit</span>
            <Icon name="CaretRight" width={24} height={24} />
          </>
        ) : (
          <>
            <Icon name="MapPin" width={24} height={24} />
            <span>Set your location</span>
            <Icon name="CaretRight" width={24} height={24} />
          </>
        )}
      </Button>
    </div>
  )
}
