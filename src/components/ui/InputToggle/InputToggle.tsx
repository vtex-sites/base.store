import React from 'react'

import './input-toggle.scss'

function InputToggle() {
  return (
    <div data-toggle>
      <label htmlFor="input-toggle">How about this?</label>
      <div data-toggle-container>
        <input id="" name="input-toggle" type="checkbox" />
        <span data-toggle-knob />
      </div>
    </div>
  )
}

export default InputToggle
