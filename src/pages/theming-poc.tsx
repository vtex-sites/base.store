import React from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'

function Page() {
  return (
    <>
      <GatsbySeo title="Pattern Library" language="en" noindex nofollow />
      <div className="pattern-library">
        <header>
          <h1 className="title-section grid-content">
            UI Theming Proof of Concept
          </h1>
        </header>
      </div>
    </>
  )
}

export default Page
