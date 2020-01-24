const watchOptions =
  process.env.NODE_ENV === 'production'
    ? {}
    : { poll: 800, aggregateTimeout: 300 }

module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = watchOptions
    return config
  },
}
