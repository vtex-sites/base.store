export const pages = {
  pdp: '/camiseta-azul-marinho/p',
  collection: '/masculino',
  collection_filtered: '/masculino/preta?map=c,cor',
  search: '/s/camisa?map=term',
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
