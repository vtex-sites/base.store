import React from 'react'
import type { FC } from 'react'

const GuaranteeIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m12 7 1-1 1-1 1-1h2l1 1 1 1 1 1h5v5l1 1 1 1 1 1v2a6 6 0 0 1-1 1l-1 1-1 1v5h-5l-1 1-1 1-1 1h-2a6 6 0 0 1-1-1l-1-1-1-1H7v-5l-1-1-1-1a39 39 0 0 1-1-1v-2l1-1 1-1 1-1V7h5Zm4-5-2 1a7 7 0 0 0-1 1l-1 1v1-1H9L6 6 5 9v3l-1 1-1 1-1 2 1 2a7 7 0 0 0 1 1l1 1h1-1v3l1 3 3 1h3l1 1 1 1 2 1 2-1a7 7 0 0 0 1-1l1-1h3l3-1 1-3v-3l1-1 1-1 1-2-1-2a7 7 0 0 0-1-1l-1-1V9l-1-3-3-1h-3l-1-1-1-1-2-1Zm6 12a1 1 0 0 0-1-2l-7 7-3-3a1 1 0 0 0-1 1l4 4h1l7-7Z"
      fill="#323845"
    />
  </svg>
)

const QualityIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm7 17a11 11 0 1 0-14 0v10a1 1 0 0 0 1 1l6-3 6 3a1 1 0 0 0 1-1V20Zm-2 1a11 11 0 0 1-10 0v8l5-3 5 3v-8ZM16 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-7 5a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z"
      fill="#323845"
    />
  </svg>
)

const SafetyIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 7h20v7c0 10-8 14-10 14S6 24 6 14V7Zm0-2a2 2 0 0 0-2 2v7c0 11 10 15 11 16h2c1-1 11-5 11-16V7a2 2 0 0 0-2-2H6Zm16 9a1 1 0 0 0-1-2l-7 7-3-3a1 1 0 0 0-1 1l4 4h1l7-7Z"
      fill="#323845"
    />
  </svg>
)

const ShippingIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 9v8h18V9H3Zm20 5h6l-1-3h-5v3Zm8 1-2-5a2 2 0 0 0-2-1h-4V8l-1-1H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2a4 4 0 0 0 7 0h8a4 4 0 0 0 7 0h2a2 2 0 0 0 2-2v-8m-2 1h-6v4a4 4 0 0 1 4 3h2v-7Zm-3 8a2 2 0 0 0-4-2 2 2 0 1 0 4 2Zm-5-3v-2H3v4h2a4 4 0 0 1 7 0h8l1-2ZM9 26a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
      fill="#323845"
    />
  </svg>
)

const StoreIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="35"
    fill="#000000"
    viewBox="0 0 256 256"
  >
    <rect width="256" height="256" fill="none" />
    <path
      d="M48,139.6V208a8,8,0,0,0,8,8H200a8,8,0,0,0,8-8V139.6"
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <path
      d="M54,40H202a8.1,8.1,0,0,1,7.7,5.8L224,96H32L46.3,45.8A8.1,8.1,0,0,1,54,40Z"
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <path
      d="M96,96v16a32,32,0,0,1-64,0V96"
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <path
      d="M160,96v16a32,32,0,0,1-64,0V96"
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <path
      d="M224,96v16a32,32,0,0,1-64,0V96"
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
  </svg>
)

export { ShippingIcon, QualityIcon, SafetyIcon, GuaranteeIcon, StoreIcon }
