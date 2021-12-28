interface Window extends Window {
  dataLayer: any[];
  NavigationCapture: {
    sendEvent: (eventName: string, eventValues?: any) => void
  }
}
