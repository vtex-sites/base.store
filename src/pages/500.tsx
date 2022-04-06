import { useMemo } from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import type { PageProps } from 'gatsby'

type Props = PageProps

const useErrorState = (location: Location) =>
  useMemo(() => {
    const params = new URLSearchParams(location.search)
    const errorId = params.get('errorId')
    const fromUrl = params.get('from')

    return {
      errorId,
      fromUrl,
    }
  }, [location.search])

function Page({ location }: Props) {
  const { errorId, fromUrl } = useErrorState(location)

  return (
    <>
      <GatsbySeo noindex nofollow />

      <h1>500</h1>
      <h2>Internal Server Error</h2>

      <div>
        The server errored with id {errorId} when visiting page {fromUrl}
      </div>
    </>
  )
}

export default Page
