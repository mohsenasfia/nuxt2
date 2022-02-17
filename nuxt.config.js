import path from 'path'
const CopyWebpackPlugin = require('copy-webpack-plugin')

export default {
  head: {
    title: 'nuxt2',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [],
  plugins: [
    { src: '~/plugins/lit-ssr.js', mode: 'server' }
  ],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
  ],
  modules: [],
  build: {
    transpile: [
      'lit',
    ],
    extend(config) {
      config.module.rules.push({
        test: /\.js$/,
        loader: require.resolve('./webpack/webpack-import-meta-loader/index.js'),
      });
    },
    babel: {
      presets: ['@babel/preset-env'],
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/transform-runtime',
      ],
    },
  },
}
