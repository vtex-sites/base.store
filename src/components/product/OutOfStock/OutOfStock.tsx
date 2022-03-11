import type { ReactElement } from 'react'
import React, { useState } from 'react'
import { Input } from '@faststore/ui'
import Button from 'src/components/ui/Button'
import IconSVG from 'src/components/common/IconSVG'

export interface OutOfStockProps {
  /**
   * ID to find this component in testing tools (e.g.: cypress,
   * testing-library, and jest).
   */
  testId?: string
  /**
   * The text tha goes inside the notification button.
   */
  buttonTxt?: string
  /**
   * Message describing how the user will be notified.
   */
  notificationMsg?: string
  /**
   * The Out of Stock Section's title.
   */
  title?: string
  /**
   * Notification icon.
   * @default <IconSVG name="Bell" />
   */
  icon?: ReactElement
  /**
   *
   */
  onSubmit: (value: string) => void
}

function OutOfStock(props: OutOfStockProps) {
  const {
    title = 'Out of Stock',
    notificationMsg = 'Notify me when available',
    buttonTxt = 'Send',
    icon = <IconSVG name="Bell" />,
    onSubmit,
    testId = 'store-out-of-stock',
  } = props

  const [email, setEmail] = useState('')

  return (
    <div data-store-out-of-stock data-testid={testId} aria-live="polite">
      <p>{title}</p>
      <p>
        {icon} {notificationMsg}
      </p>
      <Input
        aria-label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Button
        variant="primary"
        icon={<IconSVG name="Bell" width={16} height={16} />}
        iconPosition="left"
        onClick={() => onSubmit(email)}
      >
        {buttonTxt}
      </Button>
      {/* TODO: Display success alert if onSubmit succeed */}
    </div>
  )
}

export default OutOfStock
