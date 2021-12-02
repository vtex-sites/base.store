import type { AnalyticsEvent } from '../..'
import { sendISEvent } from './IntelligentSearch'
import { sendRCEvent } from './RequestCapture'

export default function sendVTEXEvents(event: AnalyticsEvent) {
  sendRCEvent(event)
  sendISEvent(event)
}
