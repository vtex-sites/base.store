import type { AnalyticsEvent } from '@faststore/sdk'
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import type { NavigationData } from 'src/sdk/analytics/utils/navigation'

interface RCRequestData {
  event: AnalyticsEvent
  rcExtraData: NavigationData
}

const parseEventToRC = ({ event, rcExtraData }: RCRequestData) => {
  return {
    ...event,
    DataType: 'Event',
    RequestType: event.type,
    SessionId: rcExtraData.sessionID,
    MacId: rcExtraData.userSessionInfo.macID,
    IsNewUser: rcExtraData.userSessionInfo.isNewUser,
    Url: rcExtraData.url,
    Ref: rcExtraData.ref,
    Path: rcExtraData.path,
    HostName: rcExtraData.hostName,
    pageTitle: rcExtraData.pageTitle,
    accountName: rcExtraData.accountName,
  }
}

const sendRCEvent = async (
  req: GatsbyFunctionRequest,
  _: GatsbyFunctionResponse
) => {
  const { body: data } = req

  fetch('https://rc.vtex.com.br/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parseEventToRC(data)),
  })
}

export default sendRCEvent
