import React from 'react'

import './toggle.scss'

type Structure = 'horizontal' | 'vertical'

interface Props {
  structure?: Structure
  text?: string
  classes?: string
}

function Toggle({ structure = 'horizontal', text, classes = '' }: Props) {
  return (
    <div className={classes} data-base-toggle data-toggle-structure={structure}>
      <label htmlFor="toggle">{text}</label>
      <div data-base-toggle-container>
        <input id="toggle" name="toggle" type="checkbox" />
        <span data-base-toggle-knob />
      </div>
    </div>
  )
}

export default Toggle
