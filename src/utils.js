/**
 * Returns the index of regex matched loaders. null if not found
 */
const findLoaderIndex = (useArray, loaderNamesRegex) => {
  const index = useArray.findIndex((loaderObject) => {
    let loaderName = ''

    if (typeof loaderObject === 'string') {
      loaderName = loaderObject
    } else if (
      'loader' in loaderObject &&
      typeof loaderObject.loader === 'string'
    ) {
      loaderName = loaderObject.loader
    }

    return loaderNamesRegex.exec(loaderName) !== null
  })

  return index === -1 ? undefined : index
}

/**
 * Returns the index of regex matched loaders. null if not found
 */
const findLoader = (useArray, loaderNamesRegex) => {
  const index = useArray.findIndex((loaderObject) => {
    let loaderName = ''

    if (typeof loaderObject === 'string') {
      loaderName = loaderObject
    } else if (
      'loader' in loaderObject &&
      typeof loaderObject.loader === 'string'
    ) {
      loaderName = loaderObject.loader
    }

    return loaderNamesRegex.exec(loaderName) !== null
  })

  return index
}

/**
 * Insert given loader at the specified index
 */
const insertLoader = (useArray, index, loader) => {
  if (index === undefined) {
    return
  }

  useArray.splice(index, 1, loader)
}

module.exports = { findLoader, findLoaderIndex, insertLoader }
