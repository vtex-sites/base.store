import { graphql, useStaticQuery } from 'gatsby'
import type { StoreCollectionQuery } from '@generated/graphql'

export const useStoreCollection = () => {
  const {
    allStoreCollection: { edges: collections },
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

  return collections
}
