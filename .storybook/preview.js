import '!style-loader!css-loader!sass-loader!../src/styles/fonts.css'
import '!style-loader!css-loader!sass-loader!../src/styles/global/tokens.scss'
import '!style-loader!css-loader!sass-loader!../src/styles/global/resets.scss'
import '!style-loader!css-loader!sass-loader!../src/styles/global/typography.scss'
import '!style-loader!css-loader!sass-loader!../src/styles/global/layout.scss'
import '!style-loader!css-loader!sass-loader!../src/styles/global/components.scss'

import { action } from '@storybook/addon-actions'
import SBTheme from './theme'

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// This global variable prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = '/'
// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook, it makes more sense to log an action than doing an actual navigate. Check out the actions addon docs for more info: https://storybook.js.org/docs/react/essentials/actions
window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname)
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    theme: SBTheme,
  },
  docs: {
    theme: SBTheme,
  },
}
