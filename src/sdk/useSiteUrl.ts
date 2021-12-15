export const useSiteUrl = () => {
  if (typeof window !== 'undefined') {
    return `https://${window.location.host}`
  }

  return ''
}
