import { useSession } from '@faststore/sdk'
import { graphql } from 'gatsby'
import { GatsbySeo, JsonLd } from 'gatsby-plugin-next-seo'
import React from 'react'
import type { PageProps } from 'gatsby'
import type { HomePageQueryQuery } from '@generated/graphql'
import Hero, { HeroContent, HeroImage, HeroLink } from 'src/components/ui/Hero'
import { StaticImage } from 'gatsby-plugin-image'
import BannerText from 'src/components/sections/BannerText'

export type Props = PageProps<HomePageQueryQuery>

function Page(props: Props) {
  const {
    data: { site },
    location: { pathname, host },
  } = props

  const { locale } = useSession()

  const title = site?.siteMetadata?.title ?? ''
  const siteUrl = `https://${host}${pathname}`

  return (
    <>
      {/* SEO */}
      <GatsbySeo
        title={title}
        description={site?.siteMetadata?.description ?? ''}
        titleTemplate={site?.siteMetadata?.titleTemplate ?? ''}
        language={locale}
        canonical={siteUrl}
        openGraph={{
          type: 'website',
          url: siteUrl,
          title: title ?? '',
          description: site?.siteMetadata?.description ?? '',
        }}
      />
      <JsonLd
        json={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: siteUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/s/?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      {/*
        Sections: Components imported from '../components/sections' only.
        Do not import or render components from any other folder in here.
      */}
      <Hero>
        <HeroContent aria-labelledby="hero-heading">
          <div>
            <h1 id="hero-heading">New Products Available</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum.
            </p>
          </div>
          <HeroLink>
            <a href="/">See all</a>
          </HeroLink>
        </HeroContent>
        <HeroImage>
          <StaticImage
            src="https://storecomponents.vtex.app/assets/fit-in/1280x613/center/middle/https%3A%2F%2Fstorecomponents.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2Fedce348c-068c-4fb9-91f2-7d235d596e0f___b2822f893b14f87337d08f07f0e520ab.jpg"
            alt="A person with hands on the pocket, carrying a round straw bag"
            placeholder="blurred"
            layout="constrained"
            width={800}
            height={600}
          />
        </HeroImage>
      </Hero>
      <BannerText />
    </>
  )
}

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
        description
        titleTemplate
      }
    }
  }
`

export default Page
