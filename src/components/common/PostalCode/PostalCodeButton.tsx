import type { HTMLAttributes } from 'react'
import { useRegionalization } from 'src/components/regionalization/RegionalizationProvider'
import Button from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'

interface PostalCodeButtonProps extends HTMLAttributes<HTMLDivElement> {
  content?: string
  classes: string
}

export default function PostalCodeButton({
  content,
  classes,
  ...otherProps
}: PostalCodeBarProps) {
  const { setIsModalOpen } = useRegionalization()

  return (
    <div data-fs-postal-code-button className={classes} {...otherProps}>
      <Button
        variant="tertiary"
        size="small"
        icon={<Icon name="MapPin" width={24} height={24} />}
        iconPosition="left"
        onClick={() => setIsModalOpen(true)}
      >
        {content ? (
          <>
            <span>{content}</span>
          </>
        ) : (
          <span>Set your location</span>
        )}
      </Button>
    </div>
  )
}
