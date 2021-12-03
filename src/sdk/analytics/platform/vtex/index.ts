import type { AnalyticsEvent } from '../..'
import { sendISEvent } from './IntelligentSearch'
import { sendRCEvent } from './RequestCapture'

export default function sendVTEXEvents(event: AnalyticsEvent) {
  // Use setTimeout to break those sendEvents into small tasks
  setTimeout(() => sendRCEvent(event), 0)
  setTimeout(() => sendISEvent(event), 0)
}
