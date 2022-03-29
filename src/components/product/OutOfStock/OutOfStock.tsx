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
   * The Out of Stock Section's title.
   */
  title?: string
  /**
   * The button text.
   */
  buttonText?: string
  /**
   * Icon displayed inside the button.
   * @default <Icon name="BellRinging" />
   */
  buttonIcon?: ReactElement
  /**
   * Message describing when the user will be notified.
   */
  notificationMsg?: string
  /**
   * Icon displayed inside the message.
   * @default <Icon name="BellRinging" />
   */
  notificationMsgIcon?: ReactElement
  /**
   *
   */
  onSubmit: (value: string) => void
}

function OutOfStock(props: OutOfStockProps) {
  const defaultButtonText = 'Notify me'
  const defaultIconName = 'BellRinging'

  const [btnText, setBtnText] = useState(defaultButtonText)
  const [buttonIconName, setButtonIconName] = useState(defaultIconName)
  const [disabled, setDisabled] = useState(false)
  const [email, setEmail] = useState('')

  const {
    title = 'Out of Stock',
    notificationMsg = 'Notify me when available',
    buttonText = btnText,
    buttonIcon = <Icon name={buttonIconName} width={16} height={16} />,
    notificationMsgIcon = (
      <Icon name={defaultIconName} width={16} height={16} />
    ),
    onSubmit,
    testId = 'store-out-of-stock',
  } = props

  const reset = () => {
    setButtonIconName(defaultIconName)
    setBtnText(defaultButtonText)
    setDisabled(false)

    setEmail('')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    setDisabled(true)
    setButtonIconName('Ellipsis')

    try {
      onSubmit(email)
      setButtonIconName('Checked')
      setBtnText('Subscribed successfully')

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
          {notificationMsgIcon} {notificationMsg}
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
            icon={buttonIcon}
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
