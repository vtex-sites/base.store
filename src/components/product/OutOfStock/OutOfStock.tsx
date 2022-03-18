import type { ReactElement } from 'react'
import React, { useState } from 'react'
import { Input } from '@faststore/ui'
import Button from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'

import './out-of-stock.scss'

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
   * @default <Icon name="BellRinging" />
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
    buttonTxt = 'Notify Me',
    icon = <Icon name="BellRinging" weight="bold" width={16} height={16} />,
    onSubmit,
    testId = 'store-out-of-stock',
  } = props

  const [email, setEmail] = useState('')

  return (
    <div data-store-out-of-stock data-testid={testId} aria-live="polite">
      <div className="title-subsection">{title}</div>
      <div>
        {icon} {notificationMsg}
      </div>
      <div className="out-of-stock_icon">
        <Input
          data-store-out-of-stock-input
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Button
          data-store-out-of-stock-button
          variant="primary"
          icon={icon}
          iconPosition="left"
          onClick={() => onSubmit(email)}
        >
          {buttonTxt}
        </Button>
      </div>
      {/* TODO: Display success alert if onSubmit succeed */}
    </div>
  )
}

export default OutOfStock
