
/**
 * Warning: This is an autogenerated file.
 *
 * Changes in this file won't take effect and will be overwritten
 */

// Base Types
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type Maybe<T> = T | null | undefined
type Scalars = {
  Boolean: boolean
  String: string
  Float: number
  Int: number
  ID: string
}

// Operation related types
export type FullTextSearchQueryQueryVariables = Exact<{
  from: Scalars['Int'];
  to: Scalars['Int'];
  fullText: Maybe<Scalars['String']>;
  selectedFacets: Array<Vtex_SelectedFacetInput> | Vtex_SelectedFacetInput;
  sort: Scalars['String'];
}>;


export type FullTextSearchQueryQuery = { vtex: { productSearch: Maybe<{ totalCount: Maybe<number>, products: Maybe<Array<Maybe<{ productId: Maybe<string>, productName: Maybe<string> }>>> }>, facets: Maybe<{ breadcrumb: Maybe<Array<Maybe<{ href: Maybe<string>, name: Maybe<string> }>>>, facets: Maybe<Array<Maybe<{ name: Maybe<string>, type: Maybe<Vtex_FilterType>, values: Maybe<Array<Maybe<{ key: Maybe<string>, name: Maybe<string>, value: Maybe<string>, selected: Maybe<boolean>, quantity: number, range: Maybe<{ from: Maybe<number>, to: Maybe<number> }> }>>> }>>> }> } };


// Query Related Code

export const FullTextSearchQuery = {
  query: process.env.NODE_ENV === 'production' ? undefined : "query FullTextSearchQuery($from: Int!, $to: Int!, $fullText: String, $selectedFacets: [VTEX_SelectedFacetInput!]!, $sort: String!) {\n  vtex {\n    productSearch(\n      from: $from\n      to: $to\n      orderBy: $sort\n      fullText: $fullText\n      selectedFacets: $selectedFacets\n      hideUnavailableItems: false\n      simulationBehavior: skip\n    ) {\n      products {\n        productId\n        productName\n      }\n      totalCount: recordsFiltered\n    }\n    facets(\n      fullText: $fullText\n      selectedFacets: $selectedFacets\n      operator: or\n      behavior: \"Static\"\n      removeHiddenFacets: true\n    ) {\n      breadcrumb {\n        href\n        name\n      }\n      facets {\n        name\n        type\n        values {\n          key\n          name\n          value\n          selected\n          quantity\n          range {\n            from\n            to\n          }\n        }\n      }\n    }\n  }\n}\n",
  sha256Hash: "8699770a0c9b3fe8649e59bf28b8eee27ecdaca8e6ffe86f564bd8e0db43544d",
  operationName: "FullTextSearchQuery",
}

