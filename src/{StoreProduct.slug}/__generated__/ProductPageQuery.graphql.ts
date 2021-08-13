
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
export type ProductPageQueryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProductPageQueryQuery = { cmsSeo: Maybe<{ seo: Maybe<{ siteMetadata: Maybe<{ title: Maybe<string>, description: Maybe<string>, titleTemplate: Maybe<string> }> }> }>, product: Maybe<{ titleTag: Maybe<string>, metaTagDescription: Maybe<string>, brand: Maybe<string>, linkText: Maybe<string>, productName: Maybe<string>, description: Maybe<string>, id: Maybe<string>, categoryTree: Maybe<Array<Maybe<{ name: Maybe<string>, href: Maybe<string> }>>>, items: Maybe<Array<Maybe<{ name: Maybe<string>, itemId: Maybe<string>, images: Maybe<Array<Maybe<{ imageUrl: Maybe<string>, imageText: Maybe<string> }>>>, videos: Maybe<Array<Maybe<{ videoUrl: Maybe<string> }>>>, sellers: Maybe<Array<Maybe<{ commercialOffer: Maybe<{ spotPrice: Maybe<number>, price: Maybe<number>, listPrice: Maybe<number>, availableQuantity: Maybe<number>, priceValidUntil: Maybe<string> }> }>>> }>>> }> };


// Query Related Code

export const ProductPageQuery = {
  query: process.env.NODE_ENV === 'production' ? undefined : "query ProductPageQuery($id: String!) {\n  cmsSeo {\n    seo {\n      siteMetadata {\n        title\n        description\n        titleTemplate\n      }\n    }\n  }\n  product: storeProduct(id: {eq: $id}) {\n    id: productId\n    titleTag\n    metaTagDescription\n    brand\n    linkText\n    productName\n    description\n    categoryTree {\n      name\n      href\n    }\n    items {\n      name\n      itemId\n      images {\n        imageUrl\n        imageText\n      }\n      videos {\n        videoUrl\n      }\n      sellers {\n        commercialOffer: commertialOffer {\n          price: Price\n          listPrice: ListPrice\n          availableQuantity: AvailableQuantity\n          priceValidUntil: PriceValidUntil\n          spotPrice\n        }\n      }\n    }\n  }\n}\n",
  sha256Hash: "c1fe5e4853c87ab8dc8e39f880194989aed3038f093dfb82f1acf82c02f0989c",
  operationName: "ProductPageQuery",
}

