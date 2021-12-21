import { graphql } from 'gatsby'
import React from 'react'
import Button from 'src/components/ui/Button'
import { ImageGallery } from 'src/components/ui/ImageGallery'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProduct } from 'src/sdk/product/useProduct'
import type { ProductDetailsFragment_ProductFragment } from '@generated/graphql'

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
    },
  } = data

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
      <h2>{variantName}</h2>
      <ImageGallery
        images={[
          'https://thumbor-dev-server.vtex.io/unsafe/fit-in/360x360/center/middle/http%3A%2F%2Fstoreframework.vtexassets.com%2Farquivos%2Fids%2F176529%2Fin.jpg',
          'https://a-static.mlcdn.com.br/618x463/camisa-polo-masculina-marca-toq-ref/toqref/e20bc1ce128611ec940d4201ac185013/b73fb33386423bef5adab8ced7b4db51.jpg',
          'https://i5.walmartimages.com/asr/b20a7928-fc8a-4b9f-a923-27448facface.c9df6f17cdf584784c1c40fbfc6354af.jpeg?odnHeight=612odnWidth=612odnBg=FFFFFF',
          'https://placekitten.com/408/287',
          'https://placekitten.com/200/287',
          'https://placekitten.com/200/286',
          'https://thumbor-dev-server.vtex.io/unsafe/fit-in/360x360/center/middle/http%3A%2F%2Fstoreframework.vtexassets.com%2Farquivos%2Fids%2F177402%2Fneque.jpg',
          'https://thumbor-dev-server.vtex.io/unsafe/fit-in/360x360/center/middle/http%3A%2F%2Fstoreframework.vtexassets.com%2Farquivos%2Fids%2F155949%2Fvoluptas.jpg',
          'https://thumbor-dev-server.vtex.io/unsafe/fit-in/360x360/center/middle/http%3A%2F%2Fstoreframework.vtexassets.com%2Farquivos%2Fids%2F158554%2Fquasi.jpg',
          'https://thumbor-dev-server.vtex.io/unsafe/fit-in/360x360/center/middle/http%3A%2F%2Fstoreframework.vtexassets.com%2Farquivos%2Fids%2F176494%2Fsuscipit.jpg',
        ]}
      />
      <div className="line-through">{formattedListPrice}</div>
      <div className="min-h-[2rem]">{isValidating ? '' : formattedPrice}</div>
      <Button {...buyProps} disabled={isValidating}>
        Add to cart
      </Button>
    </div>
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
  }
`

export default ProductDetails
