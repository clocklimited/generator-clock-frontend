module.exports = createMiddleware

var _ = require('lodash')

function createMiddleware(serviceLocator) {

  return function middleware(err, req, res, next) {

    /* jshint unused: false */

    serviceLocator.logger.error('Error occurred while handling request:\n'
      , _.pick(req, 'method', 'url', 'query', 'headers', 'ip', 'ips'))

    serviceLocator.logger.error(err.message)
    serviceLocator.logger.error(err.stack)

    res.statusCode = err.status || 500
    res.send('Server error')

  }
}
