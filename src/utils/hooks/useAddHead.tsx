import { useEffect } from 'react'

interface AddHeadProps {
  title: string
}

const useAddHead = ({ title }: AddHeadProps) => {
  useEffect(() => {
    // Add h1 with the title page to fix a11y page-has-heading-one error.
    const h1 = document.createElement('h1')

    h1.textContent = title
    // remove visually, but remain "visible" for screen readers.
    h1.style.position = 'absolute'
    h1.style.top = '-100px'

    const main = document.querySelector('main')

    main?.insertBefore(h1, main.childNodes[0])

    return () => {
      h1.remove()
    }
  }, [title])
}

export default useAddHead
