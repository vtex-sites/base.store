import { navigate } from 'gatsby'

export const setSearchState = (url: URL) => {
  navigate(`${url.pathname}${url.search}`)
}
