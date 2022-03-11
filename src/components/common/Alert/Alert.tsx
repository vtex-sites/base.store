import React, { useCallback, useState } from 'react'
import UIAlert from 'src/components/ui/Alert'
import { mark } from 'src/sdk/tests/mark'
import type { PropsWithChildren } from 'react'
import IconSVG from 'src/components/common/IconSVG'

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
      icon={<IconSVG name="BellRinging" width={24} height={24} />}
      dismissible
      onClose={onAlertClose}
    >
      {children}
    </UIAlert>
  )
}

Alert.displayName = 'Alert'

export default mark(Alert)
