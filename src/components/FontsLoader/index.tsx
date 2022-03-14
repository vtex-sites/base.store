import React from 'react'

const FONT_ID = 'font-load'

export function LoadFauxFont() {
  return (
    <div
      aria-hidden="true"
      id={FONT_ID}
      style={{
        position: 'absolute',
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        height: 1,
        width: 1,
        margin: -1,
        padding: 0,
        border: 0,
        fontFamily: 'Lato',
      }}
    >
      <div style={{ fontWeight: 400 }}>&nbsp;</div>
      <div style={{ fontWeight: 700 }}>&nbsp;</div>
      <div style={{ fontWeight: 900 }}>&nbsp;</div>
    </div>
  )
}

export function RemoveFauxFont() {
  return (
    <script
      id="remove-faux"
      dangerouslySetInnerHTML={{
        __html: `let timeout=null;function loadFont(){document.body.classList.add("body-font")}function attempLoadFond(){let o=!1;try{o=document.fonts.check("16px Lato")}catch(t){o=!0,console.log(t)}o?loadFont():timeout=setTimeout(attempLoadFond,100)}attempLoadFond();
`,
      }}
    />
  )
}
