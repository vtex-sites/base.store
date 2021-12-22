import { Banner, BannerContent, BannerLink } from '@faststore/ui'
import { Link } from 'gatsby'
import type { InputHTMLAttributes } from 'react'
import React from 'react'

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
    <Banner>
      <BannerContent>
        <div>
          <h2>{title}</h2>
          <p>{caption}</p>
        </div>
        <BannerLink>
          <Link to={actionPath}>{actionLabel}</Link>
        </BannerLink>
      </BannerContent>
    </Banner>
  )
}

export default BannerText
