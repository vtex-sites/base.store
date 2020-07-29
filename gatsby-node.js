exports.onCreateWebpackConfig = ({ actions: { setWebpackConfig } }) => {
  setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            { loader: require.resolve('html-loader') },
            { loader: require.resolve('markdown-loader') },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        react: require.resolve('react'),
        'react-dom': require.resolve('react-dom'),
      },
    },
  })
}
