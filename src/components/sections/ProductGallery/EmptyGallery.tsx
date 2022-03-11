import React from 'react'
import { LinkButton } from 'src/components/ui/Button'
import EmptyState from 'src/components/common/EmptyState'
import IconSVG from 'src/components/common/IconSVG'

function EmptyGallery() {
  return (
    <EmptyState>
      <header>
        <IconSVG
          name="CircleWavyWarning"
          width={56}
          height={56}
          weight="thin"
        />
        <p>Nothing matches with your search</p>
      </header>

      <LinkButton
        to="/office"
        variant="secondary"
        icon={
          <IconSVG
            name="CircleWavyWarning"
            width={18}
            height={18}
            weight="bold"
          />
        }
        iconPosition="left"
      >
        Browse Offers
      </LinkButton>
      <LinkButton
        to="/technology"
        variant="secondary"
        icon={
          <IconSVG name="RocketLaunch" width={18} height={18} weight="bold" />
        }
        iconPosition="left"
      >
        Just Arrived
      </LinkButton>
    </EmptyState>
  )
}

export default EmptyGallery
