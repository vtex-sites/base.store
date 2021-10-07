

/**
 * Warning: This is an autogenerated file.
 *
 * Changes in this file won't take effect and will be overwritten
 */


// Operation related types
export type ProductPageQueryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProductPageQueryQuery = { site: Maybe<{ siteMetadata: Maybe<{ title: Maybe<string>, description: Maybe<string>, titleTemplate: Maybe<string>, siteUrl: Maybe<string> }> }>, product: Maybe<{ slug: string, sku: string, gtin: string, name: string, description: string, id: string, seo: { title: string, description: string }, brand: { name: string }, breadcrumbList: { itemListElement: Array<{ item: string, name: string, position: number }> }, image: Array<{ url: string, alternateName: string }>, offers: { lowPrice: number, highPrice: number, priceCurrency: string, offers: Array<{ price: number, priceValidUntil: string, priceCurrency: string, availability: string, itemCondition: string, listPrice: number, seller: { identifier: string } }> } }> };


// Query Related Code

export const ProductPageQuery = {
  query: process.env.NODE_ENV === 'production' ? undefined : "query ProductPageQuery($id: String!) {\n  site {\n    siteMetadata {\n      title\n      description\n      titleTemplate\n      siteUrl\n    }\n  }\n  product: storeProduct(id: {eq: $id}) {\n    id: productID\n    slug\n    seo {\n      title\n      description\n    }\n    brand {\n      name\n    }\n    sku\n    gtin\n    name\n    description\n    breadcrumbList {\n      itemListElement {\n        item\n        name\n        position\n      }\n    }\n    image {\n      url\n      alternateName\n    }\n    offers {\n      lowPrice\n      highPrice\n      priceCurrency\n      offers {\n        price\n        priceValidUntil\n        priceCurrency\n        availability\n        itemCondition\n        seller {\n          identifier\n        }\n        listPrice\n      }\n    }\n  }\n}\n",
  sha256Hash: "f0cfe08f1cf0ec92292d2d27530492f1b0e7500a100548a0ec4b411e02d89d64",
  operationName: "ProductPageQuery",
}

