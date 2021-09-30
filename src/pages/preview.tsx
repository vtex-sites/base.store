import React, { useEffect, useState } from 'react'

function Preview() {
  const [state, setState] = useState(0)

  useEffect(() => {
    let cancel = false

    const doFetch = async () => {
      const response = await fetch(
        'https://webhook.gatsbyjs.com/hooks/data_source/f1331ba0-47b1-421b-a890-e52717a57768',
        {
          method: 'POST',
          body: JSON.stringify({}),
        }
      )

      if (!response.ok && !cancel) {
        setState(state + 1)
      } else {
        window.location.href = '/'
      }
    }

    doFetch()

    return () => {
      cancel = true
    }
  }, [state])

  return <div>...loading: {state}x</div>
}

export default Preview
