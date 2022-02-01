import React from 'react'

import './input-toggle.scss'

type Structure = 'horizontal' | 'vertical'

interface Props {
  structure?: Structure
  text?: string
  classes?: string
}

function InputToggle({ structure = 'horizontal', text, classes = '' }: Props) {
  return (
    <div className={classes} data-base-toggle data-toggle-structure={structure}>
      <label htmlFor="input-toggle">{text}</label>
      <div data-base-toggle-container>
        <input id="input-toggle" name="input-toggle" type="checkbox" />
        <span data-base-toggle-knob />
      </div>
    </div>
  )
}

export default InputToggle
