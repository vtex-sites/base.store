import React from 'react'
import { graphql } from 'gatsby'
import View from 'src/views/home'
import type { PageProps } from 'gatsby'
import type { HomePageQueryQuery } from '@generated/HomePageQuery.graphql'

export type Props = PageProps<HomePageQueryQuery>

function Page(props: Props) {
  return <View {...props} />
}

export const query = graphql`
  query HomePageQuery {
    cmsHome {
      sections {
        name
        props
      }
    }
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
