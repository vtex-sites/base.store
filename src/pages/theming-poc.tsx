import React from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'

import '../styles/theming-poc.scss'

function Page() {
  return (
    <>
      <GatsbySeo
        title="UI Theming: Proof of Concept"
        language="en"
        noindex
        nofollow
      />
      <div className="theming-poc">
        <header />
        <main>
          <InputToggle />
          <InputToggle2 />
          <InputToggle3 />
        </main>
      </div>
    </>
  )
}

function InputToggle() {
  return (
    <div className="input-toggle">
      <label htmlFor="input-toggle">How about this?</label>
      <div className="container">
        <input id="input-toggle" name="input-toggle" type="checkbox" />
        <span className="knob" />
      </div>
    </div>
  )
}

function InputToggle2() {
  return (
    <div className="input-toggle theme-2">
      <label htmlFor="input-toggle">How about this?</label>
      <div className="container">
        <input id="input-toggle-1" name="input-toggle" type="checkbox" />
        <span className="knob" />
      </div>
    </div>
  )
}

function InputToggle3() {
  return (
    <div className="input-toggle theme-3">
      <label htmlFor="input-toggle">How about this?</label>
      <div className="container">
        <input id="input-toggle-2" name="input-toggle" type="checkbox" />
        <span className="knob" />
      </div>
    </div>
  )
}

export default Page
