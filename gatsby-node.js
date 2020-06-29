exports.onCreateWebpackConfig = ({ actions: { setWebpackConfig } }) => {
  setWebpackConfig({
    resolve: {
      alias: {
        react: require.resolve('react'),
        'react-dom': require.resolve('react-dom'),
        '@loadable/component': require.resolve('@loadable/component'),
        '@loadable/server': require.resolve('@loadable/server'),
      },
    },
  })
}
