import { Banner, BannerContent, BannerLink } from '@faststore/ui'
import React from 'react'

function BannerText() {
  return (
    <Banner>
      <BannerContent>
        <div>
          <h2>Receive our news and promotions in advance.</h2>
          <p>Enjoy and get 10% off your first purchase.</p>
        </div>
        <BannerLink>
          <a href="/">Call to action</a>
        </BannerLink>
      </BannerContent>
    </Banner>
  )
}

export default BannerText
