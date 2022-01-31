import React from 'react'
import { IconButton as UIIconButton } from '@faststore/ui'
import type { IconButtonProps as UIIconButtonProps } from '@faststore/ui'

import './icon-button.scss'

interface IconButtonProps {
  classes?: string
}

type Props = IconButtonProps & UIIconButtonProps

function IconButton({ icon, classes, ...props }: Props) {
  return (
    <UIIconButton className={`icon-button ${classes}`} icon={icon} {...props} />
  )
}

export default IconButton
