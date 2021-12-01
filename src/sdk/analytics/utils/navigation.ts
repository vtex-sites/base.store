const THIRTY_MINUTES_IN_MS = 1_800_000
const ONE_YEAR_IN_MS = 31_536_000_000
const SESSION_ID = 'VtexRCSessionIdv7'
const MAC_ID = 'VtexRCMacIdv7'

/**
 * Generates an Universally Unique Identifier (UUID) that is a 128-bit number, with the encoding in the
 * format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. For this, the algorithm is based on version 4 of RFC4122,
 * which can be better understood in the following documentation: https://www.ietf.org/rfc/rfc4122.txt.
 *
 */
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0

    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
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
  const formattedValue = encodeURI(cookieValue)
  const host = window.location.hostname
  const expirationDate = new Date(Date.now() + expirationTime)

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
  const match = document.cookie.match(regex)

  if (!match) {
    return
  }

  return decodeURI(match[2])
}

export interface NavigationData {
  sessionID: string
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

function renewSessionId() {
  const newSessionId = uuidv4()

  setVtexCookie(SESSION_ID, newSessionId, THIRTY_MINUTES_IN_MS)

  return newSessionId
}

/**
 * Get session id value that is stored in cookie.
 *
 * @returns {string} Session id value.
 */
function getSessionID(): string {
  return getVtexCookie(SESSION_ID) ?? renewSessionId()
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
 * Get account name from the environment variable GATSBY_STORE_ID.
 *
 * @returns {string | undefined} Account name.
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
