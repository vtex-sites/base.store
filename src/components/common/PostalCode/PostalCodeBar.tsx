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
    <div data-postal-code-bar className={classes} {...otherProps}>
      <Button
        variant="tertiary"
        icon={<Icon name="MapPin" width={24} height={24} />}
        iconPosition="left"
        onClick={() => setIsModalOpen(true)}
      >
        {content ? (
          <>
            <span>{content}</span>
            <span className="display-mobile">Edit</span>
          </>
        ) : (
          <span>Set your location</span>
        )}
        <Icon
          className="display-mobile"
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
