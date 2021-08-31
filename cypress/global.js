export const pages = {
  pdp: '/camiseta-azul-marinho/p',
  collection: '/women',
  collection_filtered: '/women/red?map=c,color',
  search: '/s/shirt?map=term',
  home: '/',
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
