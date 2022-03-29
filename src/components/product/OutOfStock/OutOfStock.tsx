import type { ReactElement, FormEvent } from 'react'
import React, { useState } from 'react'
import { Form, Input } from '@faststore/ui'
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
  buttonText?: string
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
   * Notification icon.
   * @default <Icon name="BellRinging" />
   */
  notificationIcon?: ReactElement
  /**
   *
   */
  onSubmit: (value: string) => void
}

function OutOfStock(props: OutOfStockProps) {
  const defaultButtonText = 'Notify me'
  const defaultIcon = (
    <Icon name="BellRinging" weight="bold" width={16} height={16} />
  )

  const [btText, setBtText] = useState(defaultButtonText)
  const [disabled, setDisabled] = useState(false)
  const [iconButton, setIconButton] = useState(defaultIcon)
  const [email, setEmail] = useState('')

  const {
    title = 'Out of Stock',
    notificationMsg = 'Notify me when available',
    buttonText = btText,
    icon = iconButton,
    notificationIcon = defaultIcon,
    onSubmit,
    testId = 'store-out-of-stock',
  } = props

  const reset = () => {
    setIconButton(defaultIcon)
    setBtText(defaultButtonText)
    setDisabled(false)

    setEmail('')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    setDisabled(true)
    setIconButton(<Icon name="Ellipsis" weight="bold" width={16} height={16} />)

    try {
      onSubmit(email)
      setIconButton(
        <Icon name="Checked" weight="bold" width={16} height={16} />
      )
      setBtText('Subscribed successfully')

      // Return to original state after 2s
      await new Promise((r) => setTimeout(r, 2000)).then(reset)
    } catch (err) {
      // TODO: Display error below Input component
      console.error(err.message)
      reset()
    }
  }

  return (
    <section data-store-out-of-stock data-testid={testId} aria-live="polite">
      <Form data-out-of-stock-form onSubmit={handleSubmit}>
        <div className="text__title-subsection">{title}</div>
        <div data-store-out-of-stock-subtitle>
          {notificationIcon} {notificationMsg}
        </div>
        <div>
          <Input
            data-store-out-of-stock-input
            aria-label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Button
            type="submit"
            disabled={disabled}
            data-store-out-of-stock-button
            variant="primary"
            icon={icon}
            iconPosition="left"
          >
            {buttonText}
          </Button>
        </div>
      </Form>
    </section>
  )
}

export default OutOfStock
