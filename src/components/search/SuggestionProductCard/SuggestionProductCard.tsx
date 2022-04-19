import { Card, CardContent, CardImage } from '@faststore/ui'
import { Link } from 'gatsby'
import { Image } from 'src/components/ui/Image'
import Price from 'src/components/ui/Price'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProductLink } from 'src/sdk/product/useProductLink'

type SuggestionProductCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any
  index: number
}

function SuggestionProductCard({ product, index }: SuggestionProductCardProps) {
  const linkProps = useProductLink({ product, selectedOffer: 0, index })
  const {
    isVariantOf: { name },
    image: [img],
    offers: {
      lowPrice: spotPrice,
      offers: [{ listPrice }],
    },
  } = product

  return (
    <Card
      className="suggestion-product-card"
      data-testid="suggestion-product-card"
    >
      {' '}
      <Link {...linkProps} title={name}>
        <CardContent>
          <CardImage>
            <Image
              src={img.url}
              alt={img.alternateName}
              width={56}
              height={56}
            />
          </CardImage>
          <div data-suggestion-product-card-summary>
            <p className="text__title-mini" data-suggestion-product-card-title>
              {name}
            </p>
            <span data-suggestion-product-card-prices>
              <Price
                value={listPrice}
                formatter={useFormattedPrice}
                testId="list-price"
                data-value={listPrice}
                variant="listing"
                classes="text__legend"
                SRText="Original price:"
              />
              <Price
                value={spotPrice}
                formatter={useFormattedPrice}
                testId="price"
                data-value={spotPrice}
                variant="spot"
                classes="text__title-mini"
                SRText="Price:"
              />
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

export default SuggestionProductCard
