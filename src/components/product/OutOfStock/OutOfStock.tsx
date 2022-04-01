import { useSession } from '@faststore/sdk'
import type { ReactElement, FormEvent } from 'react'
import React, { useState } from 'react'
import { Form, Input } from '@faststore/ui'
import Button from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'

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
  const { postalCode } = useSession()

  const defaultButtonText = 'Notify me'
  const defaultIconName = 'BellRinging'

  const [btnText, setBtnText] = useState(defaultButtonText)
  const [buttonIconName, setButtonIconName] = useState(defaultIconName)
  const [disabled, setDisabled] = useState(false)
  const [email, setEmail] = useState('')

  const {
    title = postalCode ? 'Unavailable in your location' : 'Out of Stock',
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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    setDisabled(true)
    setButtonIconName('Ellipsis')

    try {
      onSubmit(email)
      setButtonIconName('Checked')
      setBtnText('Subscribed successfully')
    } catch (err) {
      // TODO: Display error below Input component when Input is ready for that
      console.error(err.message)
    } finally {
      // Return to original state after 2s
      setTimeout(reset, 2000)
    }
  }

  return (
    <section data-store-out-of-stock data-testid={testId} aria-live="polite">
      <Form data-out-of-stock-form onSubmit={handleSubmit}>
        <p className="text__title-subsection">{title}</p>
        <p data-store-out-of-stock-subtitle>
          {notificationMsgIcon} {notificationMsg}
        </p>
        <div>
          <Input
            data-store-out-of-stock-input
            aria-label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Button
            data-store-out-of-stock-button
            type="submit"
            disabled={disabled}
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
