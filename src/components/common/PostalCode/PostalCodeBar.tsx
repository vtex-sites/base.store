import React from 'react'
import Button from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'

interface PostalCodeBarProps {
  content?: string
}

export default function PostalCodeInput({ content }: PostalCodeBarProps) {
  return (
    <div data-postal-code-bar>
      <Button
        variant="tertiary"
        icon={<Icon name="MapPin" width={24} height={24} />}
        iconPosition="left"
      >
        {content ? (
          <>
            <span>{content}</span>
            <span id="postal-code-bar-edit">Edit</span>
          </>
        ) : (
          <span>Set your location</span>
        )}
        <Icon name="CaretRight" width={24} height={24} />
      </Button>
    </div>
  )
}
