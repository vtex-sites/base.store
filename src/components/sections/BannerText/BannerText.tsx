import { Banner, BannerContent, BannerLink } from '@faststore/ui'
import { ButtonLink } from 'src/components/ui/Button'
import type { HTMLAttributes } from 'react'

import Section from '../Section'

type BannerTextVariant =
  | {
      variant?: 'primary'
      /**
       * The content for the h2 tag.
       */
      title: string
      caption?: never
    }
  | {
      variant: 'secondary'
      /**
       * The content for the h2 tag.
       */
      title: string
      /**
       * The content for the p tag below the h2.
       */
      caption: string
    }

interface BaseProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The href used at the link
   */
  actionPath: string
  /**
   * The label used at the link
   */
  actionLabel: string
}

export type BannerTextProps = BaseProps & BannerTextVariant

function BannerText({
  title,
  caption,
  actionPath,
  actionLabel,
  variant = 'primary',
}: BannerTextProps) {
  return (
    <Section className="layout__section">
      <Banner data-fs-banner-text data-fs-banner-text-variant={variant}>
        <BannerContent data-fs-banner-text-content className="layout__content">
          <div>
            <h2>{title}</h2>
            {variant === 'secondary' && caption && <p>{caption}</p>}
          </div>
          <BannerLink data-fs-banner-text-link>
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
