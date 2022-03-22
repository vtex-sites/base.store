import React from 'react'

// Reference: https://css-tricks.com/the-best-font-loading-strategies-and-how-to-execute-them/#aa-critical-foft
export function LoadFonts() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `"fonts"in document?setTimeout(()=>{document.fonts.load("400 1em Lato"),document.fonts.load("700 1em Lato"),document.fonts.load("900 1em Lato"),document.body.classList.add("body-font")},0):document.body.classList.add("body-font");
`,
      }}
    />
  )
}
