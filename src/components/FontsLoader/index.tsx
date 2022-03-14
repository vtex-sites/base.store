import React from 'react'

export function LoadFonts() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `"fonts"in document?Promise.all([document.fonts.load("400 1em Lato"),document.fonts.load("700 1em Lato"),document.fonts.load("900 1em Lato")]).then(()=>{document.body.classList.add("body-font")}):document.body.classList.add("body-font");
`,
      }}
    />
  )
}
