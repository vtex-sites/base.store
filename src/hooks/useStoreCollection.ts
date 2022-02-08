import type { StoreCollectionQuery } from '@generated/graphql'
import { graphql, useStaticQuery } from 'gatsby'
import { useMemo } from 'react'

export const useStoreCollection = () => {
  const {
    allStoreCollection: { edges },
  } = useStaticQuery<StoreCollectionQuery>(graphql`
    query StoreCollection {
      allStoreCollection(filter: { type: { eq: Department } }) {
        edges {
          node {
            slug
            seo {
              title
            }
          }
        }
      }
    }
  `)

  return useMemo(
    () =>
      edges.map((e) => ({
        name: e.node.seo.title,
        href: `/${e.node.slug}`,
      })),
    [edges]
  )
}
