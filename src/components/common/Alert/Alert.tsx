import React, { useCallback, useState } from 'react'
import UIAlert from 'src/components/ui/Alert'
import { mark } from 'src/sdk/tests/mark'
import type { PropsWithChildren } from 'react'

import IconSVG from '../IconSVG'

function Alert({ children }: PropsWithChildren<unknown>) {
  const [displayAlert, setDisplayAlert] = useState(true)

  const onAlertClose = useCallback(
    () => setDisplayAlert(false),
    [setDisplayAlert]
  )

  if (displayAlert === false) {
    return null
  }

  return (
    <UIAlert
      className="alert"
      icon={
        <IconSVG
          data-icon
          name="BellRinging"
          width="24px"
          height="24px"
          loading="eager"
        />
      }
      dismissible
      onClose={onAlertClose}
    >
      {children}
    </UIAlert>
  )
}

Alert.displayName = 'Alert'

export default mark(Alert)
