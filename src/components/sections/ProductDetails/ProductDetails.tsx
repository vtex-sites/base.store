import { graphql } from 'gatsby'
import React from 'react'
import Button from 'src/components/ui/Button'
import { Image } from 'src/components/ui/Image'
import SkuSelector from 'src/components/ui/SkuSelector'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProduct } from 'src/sdk/product/useProduct'
import type { ProductDetailsFragment_ProductFragment } from '@generated/graphql'
import Breadcrumb from 'src/components/ui/Breadcrumb'

interface Props {
  product: ProductDetailsFragment_ProductFragment
}

function ProductDetails({ product: staleProduct }: Props) {
  // Stale while revalidate the product for fetching the new price etc
  const { data, isValidating } = useProduct(staleProduct.id, {
    product: staleProduct,
  })

  if (!data) {
    throw new Error('NotFound')
  }

  const {
    product: {
      id,
      sku,
      gtin: referenceId,
      name: variantName,
      brand: { name: brandName },
      isVariantOf: { name, productGroupID: productId },
      image: [img],
      offers: {
        offers: [{ price, listPrice, seller }],
      },
      breadcrumbList,
    },
  } = data

  const breadcrumbs = breadcrumbList ?? staleProduct.breadcrumbList

  const formattedPrice = useFormattedPrice(price)
  const formattedListPrice = useFormattedPrice(listPrice)

  const buyProps = useBuyButton({
    id,
    name,
    brand: brandName,
    price,
    listPrice,
    seller,
    quantity: 1,
    referenceId,
    productId,
    itemOffered: {
      image: [img],
      name: variantName,
      sku,
    },
  })

  return (
    <div>
      <Breadcrumb breadcrumbList={breadcrumbs.itemListElement} />
      <h2>{variantName}</h2>
      <Image
        src={img.url}
        variant="product.details"
        alt={img.alternateName}
        loading="eager"
      />
      <div className="line-through">{formattedListPrice}</div>
      <div className="min-h-[2rem]">{isValidating ? '' : formattedPrice}</div>
      <SkuSelector
        label="Size"
        variant="label"
        options={[
          { label: 'P', value: 'p' },
          { label: 'M', value: 'm' },
          { label: 'G', value: 'g' },
        ]}
      />
      {/* NOTE: A loading skeleton had to be used to avoid a Lighthouse's
      non-composited animation violation due to the button transitioning its
      background color when changing from its initial disabled to active state.
      See full explanation on commit https://git.io/JyXV5. */}
      {isValidating ? (
        <AddToCartLoadingSkeleton />
      ) : (
        <Button {...buyProps}>Add to cart</Button>
      )}
    </div>
  )
}

function AddToCartLoadingSkeleton() {
  // Generated via https://skeletonreact.com/.
  return (
    <svg
      role="img"
      width="112"
      height="48"
      aria-labelledby="loading-aria"
      viewBox="0 0 112 48"
      preserveAspectRatio="none"
    >
      <title id="loading-aria">Loading...</title>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        clipPath="url(#clip-path)"
        style={{ fill: 'url("#fill")' }}
      />
      <defs>
        <clipPath id="clip-path">
          <rect x="0" y="0" rx="2" ry="2" width="112" height="48" />
        </clipPath>
        <linearGradient id="fill">
          <stop offset="0.599964" stopColor="#f3f3f3" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="1.59996" stopColor="#ecebeb" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="2.59996" stopColor="#f3f3f3" stopOpacity="1">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  )
}

export const fragment = graphql`
  fragment ProductDetailsFragment_product on StoreProduct {
    id: productID
    sku
    name
    gtin

    isVariantOf {
      productGroupID
      name
    }

    image {
      url
      alternateName
    }

    brand {
      name
    }

    offers {
      offers {
        price
        listPrice
        seller {
          identifier
        }
      }
    }

    breadcrumbList {
      itemListElement {
        item
        name
        position
      }
    }
  }
`

export default ProductDetails
