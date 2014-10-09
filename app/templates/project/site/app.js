var bootstrap = require('./bootstrap')
  , createConfigury = require('configury')
  , configury = createConfigury(__dirname + '/../config.json')
  , config = configury(process.env.NODE_ENV)
  , serviceLocator = require('service-locator')()
  , createServerCluster = require('express-server-cluster')
  , env = process.env.NODE_ENV || 'development'
  , inDevelopmentMode = env === 'development'
  // Only have debug logging on development
  , logLevel = process.env.LOG_LEVEL || (inDevelopmentMode ? 'debug' : 'info')
  , bunyan = require('bunyan')
  , mailer = require('../lib/mailer')
  , Lynx = require('lynx')

serviceLocator
  .register('env', env)
  .register('config', config)
  .register('logger', bunyan.createLogger({ name: 'site', stream: process.stdout, level: logLevel }))
  .register('mailer', mailer(serviceLocator.config.mailAuth))
  .register('metrics', new Lynx(config.statsdHost
      , null
      , { scope: config.projectId
          + '.' + process.NODE_ENV + '.' + 'site'
        /*jshint camelcase: false */
        , on_error: function (err) {
            serviceLocator.logger.warn(err, 'metrics')
          }
        }
      )
    )

bootstrap(serviceLocator, function (error) {
  if (error) throw error

  serviceLocator.server.on('started', function () {
    serviceLocator.logger.info('Server running: ' + config.url)
  })

  serviceLocator.server.on('requestError', function (error, req) {
    serviceLocator.logger.error('Request Error', error.stack, req.url)
  })

  var options =
    { port: process.env.PORT || serviceLocator.config.port
    , numProcesses: serviceLocator.config.numProcesses
    }

  createServerCluster(serviceLocator.server, serviceLocator.logger, options)
})
