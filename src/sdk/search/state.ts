import { navigate } from 'gatsby'

export const applySearchState = (url: URL) => {
  const link = `${url.pathname}${url.search}`

  navigate(link)
}
