import { Banner, BannerContent, BannerLink } from '@faststore/ui'
import React from 'react'
import { ButtonLink } from 'src/components/ui/Button'
import type { InputHTMLAttributes } from 'react'

import Section from '../Section'

export interface BannerTextProps extends InputHTMLAttributes<HTMLDivElement> {
  /**
   * The content for the h2 tag.
   */
  title: string

  /**
   * The content for the p tag below the h2.
   */
  caption: string

  /**
   * The href used at the link
   */
  actionPath: string

  /**
   * The label used at the link
   */
  actionLabel: string
}

function BannerText({
  title,
  caption,
  actionPath,
  actionLabel,
}: BannerTextProps) {
  return (
    <Section className="layout__section">
      <Banner>
        <BannerContent className="layout__content">
          <div data-banner-text>
            <h2>{title}</h2>
            <p>{caption}</p>
          </div>
          <BannerLink>
            <ButtonLink to={actionPath} inverse>
              {actionLabel}
            </ButtonLink>
          </BannerLink>
        </BannerContent>
      </Banner>
    </Section>
  )
}

export default BannerText
