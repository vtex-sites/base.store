function VTEX() {
  return (
    <>
      <script
        type="text/partytown"
        dangerouslySetInnerHTML={{
          __html: `
    window.sendrc=function(en,ed){window.NavigationCapture&&window.NavigationCapture.sendEvent(en,ed)};
    `,
        }}
      />
      <script
        type="text/partytown"
        async
        src="https://io.vtex.com.br/rc/rc.js"
      />
    </>
  )
}

export default VTEX
