import React from 'react'
import { Button as UIButton } from '@faststore/ui'

import '../styles/pattern-library.scss'

function Page() {
  return (
    <>
      <h1 className="title-section grid-content">Pattern Library</h1>

      <section className="grid-section grid-content">
        <h2 className="title-subsection">Buttons</h2>
        <ul>
          <li>
            <UIButton>Call to Action</UIButton>
          </li>
          <li>
            <UIButton>Call to Action</UIButton>
          </li>
          <li>
            <UIButton>Call to Action</UIButton>
          </li>
        </ul>
      </section>
    </>
  )
}

export default Page
