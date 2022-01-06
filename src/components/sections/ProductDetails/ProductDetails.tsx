import { graphql } from 'gatsby'
import React, { useMemo } from 'react'
import BuyButton from 'src/components/ui/BuyButton'
import { Image } from 'src/components/ui/Image'
import Price from 'src/components/ui/Price'
import SkuSelector from 'src/components/ui/SkuSelector'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProduct } from 'src/sdk/product/useProduct'
import type { ProductDetailsFragment_ProductFragment } from '@generated/graphql'
import Breadcrumb from 'src/components/ui/Breadcrumb'
import ProductTitle from 'src/components/ui/ProductTitle'
import DiscountBadge from 'src/components/ui/DiscountBadge'
import QuantitySelector from 'src/components/ui/QuantitySelector'

import './product-details.scss'

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
      description: productDescription,
      gtin: referenceId,
      name: variantName,
      brand: { name: brandName },
      isVariantOf: { name, productGroupID: productId },
      image: productImages,
      offers: { lowPrice: spotPrice, offers },
      breadcrumbList,
    },
  } = data

  const { listPrice, seller } = useMemo(() => {
    const lowestPriceOffer = offers.find((x) => x.price === spotPrice)

    if (!lowestPriceOffer) {
      return offers[0]
    }

    return lowestPriceOffer
  }, [spotPrice, offers])

  const breadcrumbs = breadcrumbList ?? staleProduct.breadcrumbList
  const description = productDescription ?? staleProduct.description
  const lowPrice = spotPrice ?? staleProduct.offers.lowPrice

  const buyProps = useBuyButton({
    id,
    name,
    brand: brandName,
    price: spotPrice,
    listPrice,
    seller,
    quantity: 1,
    referenceId,
    productId,
    itemOffered: {
      image: productImages,
      name: variantName,
      sku,
    },
  })

  return (
    <div className="grid-content product-details">
      <Breadcrumb breadcrumbList={breadcrumbs.itemListElement} />

      <section className="product-details__body">
        <header className="product-details__title">
          <ProductTitle
            title={<h2 className="title-product">{name}</h2>}
            label={<DiscountBadge listPrice={listPrice} spotPrice={lowPrice} />}
            refNumber={productId}
          />
        </header>

        <section className="product-details__image">
          <Image
            src={productImages[0].url}
            variant="product.details"
            alt={productImages[0].alternateName}
            loading="eager"
          />
        </section>

        <section className="product-details__settings">
          <section className="product-details__values">
            <div className="product-details__prices">
              <Price
                value={listPrice}
                formatter={useFormattedPrice}
                testId="list-price"
                data-value={listPrice}
                variant="listing"
                classes="text-body-small"
                SRText="Original price:"
              />
              <Price
                value={lowPrice}
                formatter={useFormattedPrice}
                testId="price"
                data-value={lowPrice}
                variant="spot"
                classes="title-display"
                SRText="Sale Price:"
              />
            </div>
            {/* <div className="prices">
              <p className="price__old text-body-small">{formattedListPrice}</p>
              <p className="price__new">{isValidating ? '' : formattedPrice}</p>
            </div> */}
            <QuantitySelector min={1} max={10} disabled={false} />
          </section>

          <SkuSelector
            label="Size"
            variant="label"
            options={[
              { label: 'P', value: 'p' },
              { label: 'M', value: 'm' },
              { label: 'G', value: 'g' },
            ]}
          />
          <SkuSelector
            label="Color"
            variant="color"
            options={[
              { label: 'Yellow', value: '#f1d096' },
              { label: 'Pink', value: '#eed0d0' },
              { label: 'Green', value: '#b2dbcb' },
              { label: 'Blue', value: '#bacbec' },
              { label: 'Lilac', value: '#ebdcff', disabled: true },
            ]}
          />
          {/* NOTE: A loading skeleton had to be used to avoid a Lighthouse's
              non-composited animation violation due to the button transitioning its
              background color when changing from its initial disabled to active state.
              See full explanation on commit https://git.io/JyXV5. */}
          {isValidating ? (
            <AddToCartLoadingSkeleton />
          ) : (
            <BuyButton {...buyProps}>Buy Now</BuyButton>
          )}
        </section>

        <section className="product-details__content">
          <article className="product-details__description">
            <h3 className="title-subsection">Description</h3>
            <p className="text-body">{description}</p>
          </article>
        </section>
      </section>
    </div>
  )
}

function AddToCartLoadingSkeleton() {
  // Generated via https://skeletonreact.com/.
  return (
    <svg
      role="img"
      width="100%"
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
    description

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
      lowPrice
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
