import React from 'react'

import './input-toggle.scss'

function InputToggle() {
  return (
    <div data-base-toggle>
      <label htmlFor="input-toggle">How about this?</label>
      <div data-base-toggle-container>
        <input id="" name="input-toggle" type="checkbox" />
        <span data-base-toggle-knob />
      </div>
    </div>
  )
}

export default InputToggle
