import { google } from 'googleapis'
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

// https://developers.google.com/tag-platform/tag-manager/api/v2/authorization
const TAG_MANAGER_SCOPES = [
  'https://www.googleapis.com/auth/tagmanager.readonly',
]

// https://github.com/googleapis/google-api-nodejs-client#using-the-keyfile-property
const auth = new google.auth.GoogleAuth({
  keyFile: '/Users/igorbrasileiroduarte/dev/gtm-key.json',
  scopes: TAG_MANAGER_SCOPES,
})

const tagmanager = google.tagmanager({
  version: 'v2',
  auth,
})

const handler = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  const { body } = req

  const accs = await tagmanager.accounts.list()

  res.setHeader('content-type', 'application/json')
  res.send(JSON.stringify({ success: true, body, accs }))
}

export default handler
