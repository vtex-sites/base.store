import type { ReactElement } from 'react'
import React, { useState } from 'react'
import { Button, Icon, Input } from '@faststore/ui'

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
   */
  icon?: ReactElement
  /**
   *
   */
  onSubmit: (value: string) => void
}

const defaultIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.50283 2.32082C5.85309 2.0997 5.95778 1.63651 5.73667 1.28625C5.51555 0.935997 5.05236 0.831307 4.7021 1.05242C3.44065 1.84877 2.42377 2.97821 1.76373 4.31604C1.58046 4.6875 1.73302 5.1372 2.10449 5.32047C2.47595 5.50374 2.92565 5.35118 3.10892 4.97971C3.64666 3.88977 4.47512 2.96961 5.50283 2.32082ZM12.2636 1.28626C12.4847 0.935999 12.9479 0.83131 13.2981 1.05243C14.5596 1.84878 15.5764 2.97821 16.2365 4.31604C16.4198 4.68751 16.2672 5.13721 15.8957 5.32047C15.5243 5.50374 15.0746 5.35118 14.8913 4.97971C14.3536 3.88977 13.5251 2.96961 12.4974 2.32082C12.1471 2.0997 12.0424 1.63651 12.2636 1.28626ZM7.35246 3.89067C7.87476 3.6739 8.43471 3.56232 9.00021 3.56232C9.56571 3.56232 10.1257 3.6739 10.648 3.89067C11.1703 4.10745 11.6447 4.42515 12.044 4.82558C12.4433 5.226 12.7596 5.70128 12.975 6.22419C13.1903 6.7471 13.3003 7.30735 13.2987 7.87285L14.0488 7.87494H13.2987C13.2987 10.2533 13.7503 11.7879 14.239 12.7499L11.25 12.7499H6.75005L3.76095 12.7499C4.2498 11.788 4.70154 10.2538 4.7017 7.87623L4.7017 7.87285C4.70012 7.30735 4.81014 6.7471 5.02545 6.22419C5.24077 5.70128 5.55714 5.226 5.95645 4.82558C6.35576 4.42515 6.83016 4.10745 7.35246 3.89067ZM6.00591 14.2499H3.44409L3.44216 14.2499C3.21133 14.2493 2.98476 14.1879 2.78528 14.0718C2.5858 13.9557 2.42047 13.789 2.30597 13.5886C2.19147 13.3881 2.13185 13.1611 2.13312 12.9303C2.13439 12.7 2.19623 12.4741 2.31242 12.2753C2.69791 11.6117 3.2017 10.2862 3.2017 7.87494C3.19985 7.11282 3.34825 6.3578 3.63843 5.65307C3.92888 4.94769 4.35566 4.30656 4.89431 3.7664C5.43296 3.22624 6.0729 2.79767 6.77747 2.50526C7.48203 2.21284 8.23737 2.06232 9.00021 2.06232C9.76304 2.06232 10.5184 2.21284 11.2229 2.50526C11.9275 2.79767 12.5675 3.22624 13.1061 3.7664C13.6448 4.30656 14.0715 4.94769 14.362 5.65307C14.6523 6.35812 14.8007 7.1135 14.7987 7.87597C14.7989 10.2868 15.3024 11.6122 15.6876 12.2757L15.6868 12.2742L15.0397 12.6532L15.6881 12.2765L15.6876 12.2757C15.8037 12.4744 15.8655 12.7003 15.8667 12.9305C15.868 13.1613 15.8083 13.3883 15.6938 13.5887C15.5793 13.7891 15.414 13.9557 15.2145 14.0718C15.015 14.1879 14.7885 14.2493 14.5577 14.2499L14.5558 14.2499H11.9942C11.9487 14.9772 11.6396 15.6655 11.1214 16.1838C10.5588 16.7464 9.7957 17.0624 9.00005 17.0624C8.2044 17.0624 7.44133 16.7464 6.87873 16.1838C6.36047 15.6655 6.05142 14.9772 6.00591 14.2499ZM10.4883 14.2499C10.4469 14.5786 10.2974 14.8864 10.0607 15.1231C9.7794 15.4044 9.39787 15.5624 9.00005 15.5624C8.60222 15.5624 8.22069 15.4044 7.93938 15.1231C7.70264 14.8864 7.55321 14.5786 7.5118 14.2499H10.4883Z"
      fill="#323845"
    />
  </svg>
)

function OutOfStock(props: OutOfStockProps) {
  const {
    title = 'Out of Stock',
    notificationMsg = 'Notify me when available',
    buttonTxt = 'Send',
    icon = defaultIcon,
    onSubmit,
    testId = 'store-out-of-stock',
  } = props

  const [email, setEmail] = useState('')

  return (
    <div data-store-out-of-stock data-testid={testId}>
      {/* TODO: This component seems to fit in Aria live Regions, this is just a reminder to handle this in the future
      https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions */}
      <p>{title}</p>
      <p>
        <Icon component={icon} /> {notificationMsg}
      </p>
      <Input
        aria-label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {/* TODO: Add icon to button */}
      <Button onClick={() => onSubmit(email)}>{buttonTxt}</Button>
      {/* TODO: Display success alert if onSubmit succeed */}
    </div>
  )
}

export default OutOfStock
