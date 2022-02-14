/* eslint-disable react-hooks/rules-of-hooks */
/**
 * This file is a just a pointer to a TS file that contains the actual
 * Gatsby configuration. This is required since Gatsby doesn't support
 * `.ts` configuration files.
 */
const { useGatsbyConfig } = require('gatsby-plugin-ts-config')

module.exports = useGatsbyConfig('./src/gatsby-config')
