interface Window extends Window {
  dataLayer: any[];
  /**
   * This is a global script added by VTEX Request Capture
   */
  vtexrca: {
    (...args: any[]): void
    /**
     * event list
     */
    q: any[]
    /**
     * Script initialization datetime
     */
    l: number
  }
}
