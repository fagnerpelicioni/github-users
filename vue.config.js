/* eslint-disable import/no-extraneous-dependencies */

// Webpack
const webpack = require('webpack');

// Git Version
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
  pwa: {
    themeColor: '#0366d6',
    name: 'Github Users',
    msTileColor: '#0366d6',
    appleMobileWebAppCapable: 'true',
    workboxPluginMode: 'InjectManifest',
    manifestOptions: {
      name: 'Github Users',
      short_name: 'Github Users',
      start_url: '/',
      display: 'standalone',
      theme_color: '#0366d6',
      background_color: '#ffffff',
      description: 'Search for a user in Github.',
      orientation: 'portrait',
    },
    workboxOptions: {
      swSrc: 'public/service-worker.js',
    },
  },
  configureWebpack: {
    plugins: [
      GitRevisionPlugin,
      new webpack.DefinePlugin({
        APP_VERSION: JSON.stringify(gitRevisionPlugin.version()),
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 9000,
        maxSize: 140000,
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/base/_colors.scss";
        @import "@/assets/base/_variables.scss";
        @import "@/assets/base/_breakpoints.scss";
        @import "@/assets/base/_mixins.scss";
        `,
      },
    },
  },
};
