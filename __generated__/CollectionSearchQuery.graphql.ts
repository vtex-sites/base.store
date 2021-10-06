

/**
 * Warning: This is an autogenerated file.
 *
 * Changes in this file won't take effect and will be overwritten
 */


// Operation related types
export type CollectionSearchQueryQueryVariables = Exact<{
  first: Scalars['Int'];
  after: Maybe<Scalars['String']>;
  sort: Maybe<StoreSort>;
  selectedFacets: Array<IStoreSelectedFacet> | IStoreSelectedFacet;
}>;


export type CollectionSearchQueryQuery = { search: { products: { pageInfo: { totalCount: number }, edges: Array<{ node: { slug: string, sku: string, name: string, id: string, brand: { brandName: string }, isVariantOf: { name: string }, image: Array<{ url: string, alternateName: string }>, offers: { lowPrice: number, offers: Array<{ price: number, listPrice: number, seller: { identifier: string } }> } } }> }, facets: Array<{ key: string, label: string, type: StoreFacetType, values: Array<{ label: string, value: string, selected: boolean, quantity: number }> }> } };


// Query Related Code

export const CollectionSearchQuery = {
  query: process.env.NODE_ENV === 'production' ? undefined : "query CollectionSearchQuery($first: Int!, $after: String, $sort: StoreSort, $selectedFacets: [IStoreSelectedFacet!]!) {\n  search(\n    first: $first\n    after: $after\n    sort: $sort\n    selectedFacets: $selectedFacets\n  ) {\n    products {\n      pageInfo {\n        totalCount\n      }\n      edges {\n        node {\n          id: productID\n          slug\n          sku\n          name\n          brand {\n            brandName: name\n          }\n          isVariantOf {\n            name\n          }\n          image {\n            url\n            alternateName\n          }\n          offers {\n            lowPrice\n            offers {\n              price\n              listPrice\n              seller {\n                identifier\n              }\n            }\n          }\n        }\n      }\n    }\n    facets {\n      key\n      label\n      type\n      values {\n        label\n        value\n        selected\n        quantity\n      }\n    }\n  }\n}\n",
  sha256Hash: "5ac0254b76d6d01c274253edc6f24186343a28fd886e05d817a272e816385aa4",
  operationName: "CollectionSearchQuery",
}

