import { ShelfQuery } from '@generated/ShelfQuery.graphql'
import { gql } from '@vtex/gatsby-plugin-graphql'
import React from 'react'
import { useQuery } from 'src/sdk/graphql/useQuery'
import type {
  ShelfQueryQuery,
  ShelfQueryQueryVariables,
} from '@generated/ShelfQuery.graphql'
import ProductSummary from 'src/components/product/ProductSummary'

interface Props {
  searchParams: {
    collection: string
    from: number
    to: number
    hideUnavailableItems: boolean
  }
  title: string
}

const useProductList = (variables: ShelfQueryQueryVariables) => {
  const { data } = useQuery<ShelfQueryQuery, ShelfQueryQueryVariables>({
    ...ShelfQuery,
    variables,
  })

  return data?.search.products
}

function Shelf(props: Props) {
  const {
    title,
    searchParams: { to, from, collection },
  } = props

  const products = useProductList({
    first: to,
    after: from.toString(),
    selectedFacets: [{ key: 'productCLusterIds', value: collection }],
    sort: 'orders_desc',
  })

  return (
    <>
      <div className="flex w-full items-center justify-center text-2xl font-bold">
        {title}
      </div>
      <div className="flex flex-nowrap overflow-x-auto">
        {products?.edges.map(({ node: product }, index) => (
          <div key={`shelf-item-${index}`} className="min-w-[250px] m-3">
            <ProductSummary product={product} />
          </div>
        ))}
      </div>
    </>
  )
}

export const query = gql`
  query ShelfQuery(
    $first: Int!
    $after: String
    $sort: StoreSort
    $selectedFacets: [StoreSelectedFacet!]!
  ) {
    search(
      first: $first
      after: $after
      sort: $sort
      selectedFacets: $selectedFacets
    ) {
      products {
        ...ProductGallery_products
        edges {
          node {
            ...ProductSummary_product
          }
        }
      }
    }
  }
`

export default Shelf
