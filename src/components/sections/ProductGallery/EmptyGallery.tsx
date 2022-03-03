import React from 'react'
import {
  CircleWavyWarning as CircleWavyWarningIcon,
  RocketLaunch as RocketLaunchIcon,
} from 'phosphor-react'
import { LinkButton } from 'src/components/ui/Button'
import EmptyState from 'src/components/common/EmptyState'

function EmptyGallery() {
  return (
    <EmptyState>
      <header>
        <CircleWavyWarningIcon size={56} weight="thin" />
        <p>Nothing matches with your search</p>
      </header>

      <LinkButton
        to="/office"
        variant="secondary"
        icon={<CircleWavyWarningIcon size={18} weight="bold" />}
        iconPosition="left"
      >
        Browse Offers
      </LinkButton>
      <LinkButton
        to="/technology"
        variant="secondary"
        icon={<RocketLaunchIcon size={18} weight="bold" />}
        iconPosition="left"
      >
        Just Arrived
      </LinkButton>
    </EmptyState>
  )
}

export default EmptyGallery
