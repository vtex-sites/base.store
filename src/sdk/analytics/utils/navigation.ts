const ONE_YEAR_IN_MS = 31536000000
const SESSION_ID = 'VtexRCSessionIdv7'
const MAC_ID = 'VtexRCMacIdv7'

/**
 * Generates an Universally Unique Identifier (UUID) that is a 128-bit number, with the encoding in the
 * format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. For this, the algorithm is based on version 4 of RFC4122,
 * which can be better understood in the following documentation: https://www.ietf.org/rfc/rfc4122.txt.
 *
 */
function uuidv4() {
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8

    return v.toString(16)
  })

  return uuid
}

/**
 * Create or replace a cookie.
 *
 * @param {string} cookieId Cookie ID.
 * @param {string} cookieValue Cookie's value.
 * @param {number} expirationTime Time for the cookie to expire.
 */
function setVtexCookie(
  cookieId: string,
  cookieValue: string,
  expirationTime: number
) {
  const formattedValue = encodeURIComponent(cookieValue)
  const host = window.location.hostname
  const expirationDate = new Date()

  expirationDate.setTime(expirationDate.getTime() + expirationTime)

  const formattedExpirationDate = expirationDate.toUTCString()

  document.cookie = `${cookieId}=${formattedValue}; expires=${formattedExpirationDate}; path=/; domain=${host}`
}

/**
 * Returns value of cookie according the cookie ID, if it doesn't exist, returns undefined.
 *
 * @param {string} cookieId Cookie ID.
 * @returns {string | undefined} Value of cookie or undefined if cookie doesn't exist.
 */
function getVtexCookie(cookieId: string): string | undefined {
  const regex = new RegExp(`(^| )${cookieId}=([^;]+)`)
  const [match] = regex.exec(document.cookie) ?? []

  if (!match) return

  return decodeURIComponent(match)
}

export interface NavigationData {
  sessionID?: string
  userSessionInfo: {
    macID: string
    isNewUser: boolean
  }
  pageTitle: string
  url: string
  ref: string
  path: string
  hostName: string
  accountName?: string
}

/**
 * Get session id value that is stored in cookie.
 *
 * @returns {string} Session id value.
 */
function getSessionID(): string | undefined {
  return getVtexCookie(SESSION_ID)
}

/**
 * Get Mac id value that is stored in cookie.
 *
 * @returns {string} Mac id value.
 */
function getMacID(): string | undefined {
  return getVtexCookie(MAC_ID)
}

/**
 * Get the location object's URL.
 *
 * @returns {string} URL.
 */
function getUrl(): string {
  return window.location.href
}

/**
 * Get the URL of the location that referred the user to the current page.
 *
 * @returns {string} URL's referrer.
 */
function getRef(): string {
  return window.document.referrer
}

/**
 * Get the location object URL's path.
 *
 * @returns {string} URL's path.
 */
function getPathName(): string {
  return window.location.pathname
}

/**
 * Get the location object's URL's host.
 *
 * @returns {string} URL's host.
 */
function getHostName(): string {
  return window.location.hostname
}

/**
 * Get title of the page.
 *
 * @returns {String} Page title.
 */
function getPageTitle(): string {
  return document.title
}

/**
 * Get account name of store created in License Manager.
 * If store is into IO environment, so the account name is into `window.__RUNTIME__.account`, otherwise
 * if the store is into Portal environment, so its account name is into `window.jsnomeLoja`.
 *
 * @returns {string | null} Account name.
 */
function getAccountName(): string | undefined {
  return process.env.GATSBY_STORE_ID
}

function renewOrCreateUserSessionInfo() {
  const macIDValueInCookie = getMacID()
  const macID = macIDValueInCookie ?? uuidv4()

  setVtexCookie(MAC_ID, macID, ONE_YEAR_IN_MS)

  return {
    macID,
    isNewUser: !macIDValueInCookie,
  }
}

/**
 * Get data about navigation: session id, page title, URL, ref, path,
 * hostname, accountName and UTM data.
 *
 * @returns {NavigationData} Navigation data.
 */
export function getNavigationData(): NavigationData {
  return {
    sessionID: getSessionID(),
    userSessionInfo: renewOrCreateUserSessionInfo(),
    pageTitle: getPageTitle(),
    url: getUrl(),
    ref: getRef(),
    path: getPathName(),
    hostName: getHostName(),
    accountName: getAccountName(),
  }
}
