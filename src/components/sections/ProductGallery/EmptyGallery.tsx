import React from 'react'
import { LinkButton } from 'src/components/ui/Button'
import EmptyState from 'src/components/ui/EmptyState'
import Icon from 'src/components/ui/Icon'

function EmptyGallery() {
  return (
    <EmptyState>
      <header>
        <Icon name="CircleWavyWarning" width={56} height={56} weight="thin" />

        <p>Nothing matches with your search</p>
      </header>

      <LinkButton
        to="/office"
        variant="secondary"
        icon={
          <Icon name="CircleWavyWarning" width={18} height={18} weight="bold" />
        }
        iconPosition="left"
      >
        Browse Offers
      </LinkButton>
      <LinkButton
        to="/technology"
        variant="secondary"
        icon={<Icon name="RocketLaunch" width={18} height={18} weight="bold" />}
        iconPosition="left"
      >
        Just Arrived
      </LinkButton>
    </EmptyState>
  )
}

export default EmptyGallery
