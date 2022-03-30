import React from 'react'
import { IconButton as UIIconButton } from '@faststore/ui'
import type { IconButtonProps as UIIconButtonProps } from '@faststore/ui'

import '../Button/buttons.scss'

type Props = UIIconButtonProps

function IconButton({ icon, ...otherProps }: Props) {
  return (
    <UIIconButton
      data-fs-button="true"
      data-fs-button-icon="true"
      data-fs-button-variant="primary"
      data-fs-button-inverse="true"
      icon={icon}
      {...otherProps}
    />
  )
}

export default IconButton
