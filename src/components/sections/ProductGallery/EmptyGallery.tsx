import React from 'react'
import {
  CircleWavyWarning as CircleWavyWarningIcon,
  RocketLaunch as RocketLaunchIcon,
} from 'phosphor-react'
import Button from 'src/components/ui/Button'
import EmptyState from 'src/components/common/EmptyState'

function EmptyGallery() {
  return (
    <EmptyState>
      <header>
        <CircleWavyWarningIcon size={46} weight="thin" />
        <p>Nothing matches with your search</p>
      </header>

      <Button
        variant="secondary"
        icon={<CircleWavyWarningIcon size={18} />}
        iconPosition="left"
      >
        Browse Offers
      </Button>
      <Button
        variant="secondary"
        icon={<RocketLaunchIcon size={18} />}
        iconPosition="left"
      >
        Just Arrived
      </Button>
    </EmptyState>
  )
}

export default EmptyGallery
