export const pages = {
  pdp: '/organza-sleeve-top-138/p',
  collection: '/women',
  collection_filtered:
    '/women/?category-1=women&color=red&facets=category-1%2Ccolor',
  search: '/s?q=shirt',
  home: '/',
  brand_name: 'lacoste',
}

export const options = {
  onBeforeLoad: () => {
    if (window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister()
        })
      })
    }
  },
}
