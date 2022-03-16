import React from 'react'
import { LinkButton } from 'src/components/ui/Button'
import EmptyState from 'src/components/ui/EmptyState'
import Icon from 'src/components/ui/Icon'

function EmptyGallery({ searchTerm }: { searchTerm: string }) {
  return (
    <EmptyState>
      <header>
        <p>
          We couldn&apos;t find results for <span>{searchTerm}</span>
        </p>
        <p>Try searching for a shorter term: Brand, Name or Feature.</p>
      </header>

      <div>
        <LinkButton
          to="/office"
          variant="secondary"
          icon={
            <Icon
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
            <Icon name="RocketLaunch" width={18} height={18} weight="bold" />
          }
          iconPosition="left"
        >
          Just Arrived
        </LinkButton>
      </div>
    </EmptyState>
  )
}

export default EmptyGallery
