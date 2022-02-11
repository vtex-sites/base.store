import { useStorage } from '@faststore/sdk'
import { BellRinging as BellRingingIcon } from 'phosphor-react'
import React, { useCallback } from 'react'
import UIAlert from 'src/components/ui/Alert'
import { mark } from 'src/sdk/tests/mark'
import type { PropsWithChildren } from 'react'

function Alert({ children }: PropsWithChildren<unknown>) {
  const [displayAlert, setDisplayAlert] = useStorage('alert', true)

  const onAlertClose = useCallback(
    () => setDisplayAlert(false),
    [setDisplayAlert]
  )

  if (displayAlert === false) {
    return null
  }

  return (
    <UIAlert
      icon={<BellRingingIcon size={24} />}
      dismissible
      onClose={onAlertClose}
    >
      {children}
    </UIAlert>
  )
}

Alert.displayName = 'Alert'

export default mark(Alert)
