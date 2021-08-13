module.exports = {
  'product.summary': {
    sourceWidth: 480,
    aspectRatio: 1,
    breakpoints: [250, 360, 480],
    options: {
      fitIn: true,
    },
  },
  'product.details': {
    sourceWidth: 720,
    aspectRatio: 1,
    breakpoints: [250, 360, 480, 720],
    layout: 'constrained',
    options: {
      fitIn: true,
    },
  },
}
