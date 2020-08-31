import {
  createTheme,
  headerTheme,
  infoCardTheme,
  minicartTheme,
  searchControlsTheme,
} from '@vtex/store-ui'

import { base } from './base'
import { custom } from './custom'
import { searchTheme } from './searchFilter'
import { breadcrumb } from './breadcrumb'

export default createTheme(
  base,
  breadcrumb,
  infoCardTheme,
  headerTheme,
  minicartTheme,
  searchControlsTheme,
  searchTheme,
  custom
)
