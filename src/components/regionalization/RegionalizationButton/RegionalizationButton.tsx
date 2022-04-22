import type { HTMLAttributes } from 'react'
import { useModal } from 'src/sdk/ui/modal/Provider'
import Button from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'
import { useSession } from '@faststore/sdk'

interface RegionalizationButtonProps extends HTMLAttributes<HTMLDivElement> {
  classes: string
}

export default function RegionalizationButton({
  classes,
  ...otherProps
}: RegionalizationButtonProps) {
  const { setIsRegionalizationModalOpen } = useModal()
  const { postalCode } = useSession()

  return (
    <div data-fs-regionalization-button className={classes} {...otherProps}>
      <Button
        variant="tertiary"
        size="small"
        icon={<Icon name="MapPin" width={24} height={24} />}
        iconPosition="left"
        onClick={() => setIsRegionalizationModalOpen(true)}
      >
        {postalCode ? (
          <>
            <span>{postalCode}</span>
          </>
        ) : (
          <span>Set your location</span>
        )}
      </Button>
    </div>
  )
}
