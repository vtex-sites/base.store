import type { HTMLAttributes } from 'react'
import React, { useState } from 'react'
import RegionalizationModal from 'src/components/regionalization/RegionalizationModal'
import Button from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'

interface PostalCodeBarProps extends HTMLAttributes<HTMLDivElement> {
  content?: string
  classes: string
}

export default function PostalCodeBar({
  content,
  classes,
  ...otherProps
}: PostalCodeBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div data-fs-postal-code-bar className={classes} {...otherProps}>
      <Button onClick={() => setIsModalOpen(true)}>
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
      <RegionalizationModal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
      />
    </div>
  )
}
