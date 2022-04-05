import React, { useState } from 'react'
import RegionalizationModal from 'src/components/regionalization/RegionalizationModal'
import Button from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'

interface PostalCodeBarProps {
  content?: string
  classes: string
}

export default function PostalCodeInput({
  content,
  classes,
}: PostalCodeBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div data-postal-code-bar className={classes}>
      <Button
        variant="tertiary"
        icon={<Icon name="MapPin" width={24} height={24} />}
        iconPosition="left"
        onClick={() => setIsModalOpen(true)}
      >
        {content ? (
          <>
            <span>{content}</span>
            <span id="postal-code-bar-edit">Edit</span>
          </>
        ) : (
          <span>Set your location</span>
        )}
        <Icon
          id="postal-code-bar-caret"
          name="CaretRight"
          width={24}
          height={24}
        />
      </Button>
      <RegionalizationModal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
      />
    </div>
  )
}
