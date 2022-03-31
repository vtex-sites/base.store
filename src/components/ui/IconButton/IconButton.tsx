import { IconButton as UIIconButton } from '@faststore/ui'
import React from 'react'
import type { IconButtonProps as UIIconButtonProps } from '@faststore/ui'

interface IconButtonProps {
  classes?: string
}

type Props = IconButtonProps & UIIconButtonProps

function IconButton({ icon, classes, ...otherProps }: Props) {
  return (
    <UIIconButton
      className={`icon-button ${classes}`}
      icon={icon}
      {...otherProps}
    />
  )
}

export default IconButton
