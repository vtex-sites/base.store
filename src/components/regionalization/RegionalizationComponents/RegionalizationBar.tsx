import type { HTMLAttributes } from 'react'
import { useRegionalization } from 'src/components/regionalization/RegionalizationProvider'
import Button from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'

interface RegionalizationBarProps extends HTMLAttributes<HTMLDivElement> {
  content?: string
  classes: string
}

export default function RegionalizationBar({
  content,
  classes,
  ...otherProps
}: RegionalizationBarProps) {
  const { setIsModalOpen } = useRegionalization()

  return (
    <div data-fs-regionalization-bar className={classes} {...otherProps}>
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
    </div>
  )
}
