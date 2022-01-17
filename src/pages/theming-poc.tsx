import React from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'

import '../styles/theming-poc.scss'

function Page() {
  return (
    <div className="theming-poc">
      <GatsbySeo
        title="UI Theming: Proof of Concept"
        language="en"
        noindex
        nofollow
      />
      <div className="theming-poc-content">
        <header />
        <main>
          <InputToggle />
          <InputToggle2 />
          <InputToggle3 />
          <InputToggle4 />
        </main>
        <aside>
          <h3>Elements</h3>
          <code>bkg (background)</code>
          <code>border</code>
          <code>knob</code>
        </aside>
        <aside>
          <h3>Design Tokens</h3>
          <code>border-style</code>
          <code>border-width</code>
          <br />
          <code>color-bkg-active</code>
          <code>color-bkg</code>
          <code>color-border-active-knob</code>
          <code>color-border-active</code>
          <code>color-border-knob</code>
          <code>color-border</code>
          <code>color-knob-active</code>
          <code>color-knob</code>
          <code>color-focus</code>
          <br />
          <code>height-desk</code>
          <code>height-mob</code>
          <br />
          <code>radius-knob</code>
          <code>radius</code>
          <br />
          <code>shadow-knob</code>
          <br />
          <code>transition-function</code>
          <code>transition-property</code>
          <code>transition-timing</code>
        </aside>
      </div>
    </div>
  )
}

function InputToggle() {
  return (
    <div className="input-toggle theme-1">
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

function InputToggle4() {
  return (
    <div className="input-toggle theme-4">
      <label htmlFor="input-toggle">How about this?</label>
      <div className="container">
        <input id="input-toggle-3" name="input-toggle" type="checkbox" />
        <span className="knob" />
      </div>
    </div>
  )
}

export default Page
