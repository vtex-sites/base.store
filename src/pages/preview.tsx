import React, { useEffect } from 'react'

function Page() {
  useEffect(() => {
    window.location.href = '/'
  }, [])

  return <div>loading...</div>
}

export default Page
