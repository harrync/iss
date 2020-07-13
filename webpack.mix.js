/* global require __dirname */

/**
 * -----------------------
 * Un.titled - Laravel Mix
 * -----------------------
 */

/**
 * Dependencies
 */
const mix = require('laravel-mix'),
  copyWebpackPlugin = require('copy-webpack-plugin'),
  imageminPlugin = require('imagemin-webpack-plugin').default,
  path = require('path'),
  mixGlob = require('laravel-mix-glob');

/**
 * Variables
 */
const hostname = 'iss.local',
  basePath = './sass',
  glob = new mixGlob({ mix });

/**
 * Config
 */
mix.setPublicPath('css');
mix.disableSuccessNotifications();

mix.options({
  processCssUrls: false,
});

mix.browserSync({
  proxy: `https://${hostname}`,
  ghostMode: false,
  files: ['templates/**/*.+(html|twig|php)', 'assets/sass/**/*.scss', 'assets/js/*.js'],
});

if (mix.inProduction()) {
  mix.version();
  mix.disableNotifications();
} else {
  mix.sourceMaps();
  mix.webpackConfig({ devtool: 'inline-source-map' });
}

mix.webpackConfig({
  stats: 'errors-warnings',
});

/**
 * Assets
 */
glob.sass(`${basePath}/*.scss`, 'css');
