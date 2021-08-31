module.exports = {
  'product.summary': {
    sourceWidth: 480,
    aspectRatio: 1,
    width: 360,
    breakpoints: [250, 360, 480],
    layout: 'constrained',
    fadeIn: false,
    backgroundColor: '#f0f0f0',
    options: {
      fitIn: true,
    },
  },
  'product.details': {
    sourceWidth: 720,
    aspectRatio: 1,
    width: 720,
    breakpoints: [250, 360, 480, 720],
    layout: 'constrained',
    backgroundColor: '#f0f0f0',
    options: {
      fitIn: true,
    },
  },
  'product.miniature': {
    sourceWidth: 720,
    aspectRatio: 1,
    width: 100,
    breakpoints: [50, 100, 150],
    layout: 'constrained',
    backgroundColor: '#f0f0f0',
    options: {
      fitIn: true,
    },
  },
}
