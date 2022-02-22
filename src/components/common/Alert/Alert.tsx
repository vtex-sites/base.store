import React, { lazy, useCallback, useState } from 'react'
import UIAlert from 'src/components/ui/Alert'
import { mark } from 'src/sdk/tests/mark'
import type { PropsWithChildren } from 'react'
import LazyIcon from 'src/components/common/LazyIcon'

const BellRingingIcon = lazy(
  () => import('phosphor-react/src/icons/BellRinging')
)

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
      icon={<LazyIcon icon={BellRingingIcon} size={24} />}
      dismissible
      onClose={onAlertClose}
    >
      {children}
    </UIAlert>
  )
}

Alert.displayName = 'Alert'

export default mark(Alert)
