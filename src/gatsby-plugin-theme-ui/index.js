export default {
  loadMore: {
    cursor: 'pointer',
    '&:disabled': {
      cursor: 'default',
      background: '#fff',
      color: 'text',
    },
  },
  productTitle: {
    mb: 4,
  },
  forms: {
    input: {
      background: '#fff',
      border: '2px solid #e3e4e6',
      px: 3,
      '&:hover': {
        borderColor: '#cacbcc',
      },
    },
  },
  breakpoints: ['40em', '56em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body:
      'San Francisco, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#3f3f40',
    textMuted: '#979899',
    background: '#fff',
    primary: '#0f3e99',
    muted: '#f6f6f6',
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    img: {
      maxWidth: '100%',
    },
  },
}
