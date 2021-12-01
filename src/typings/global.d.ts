interface Window extends Window {
  dataLayer: any[];
  /**
   * This is a global script added by VTEX Request Capture
   */
  vtexrca: {
        /**
     * event list
     */
    q: any[]
  }
  /**
   * This is a global function added by VTEX Request Capture
   */
  NavigationCapture: {
    sendEvent: (...args: any[]) => void
  }
}
