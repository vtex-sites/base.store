import type { ReactNode } from 'react'
import React, { memo } from 'react'

import './product-title.scss'

interface ProductTitleProp {
  /**
   * A text such as the product's name.
   */
  title: ReactNode
  /**
   * A text to be used with a label such to be used with a label
   */
  label?: ReactNode
  /**
   * A text to be used below such as the product's reference number.
   */
  refNumber?: string
}

function ProductTitle({ title, label, refNumber }: ProductTitleProp) {
  return (
    <div className="product-title">
      <div className="product-title__header">
        {title}
        {!!label && label}
      </div>

      {refNumber && (
        <div className="product-title__addendum / text-body-small">
          Ref.: {refNumber}
        </div>
      )}
    </div>
  )
}

export default memo(ProductTitle)
