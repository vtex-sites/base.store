import React from 'react'
import Button from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'
import './postal-code.scss'

interface PostalCodeBarProps {
  content?: string
}

export default function PostalCodeInput({ content }: PostalCodeBarProps) {
  return (
    <div data-postal-code-bar>
      <Button>
        <Icon name="MapPin" width={24} height={24} />
        {content ? (
          <>
            <span>{content}</span>
            <span>Edit</span>
          </>
        ) : (
          <span>Set your location</span>
        )}
        <Icon name="CaretRight" width={24} height={24} />
      </Button>
      </Button>
    </div>
  )
}
