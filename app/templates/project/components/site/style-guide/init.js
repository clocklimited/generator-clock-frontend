module.exports = initApi

var createController = require('./controllers/controller')

function initApi() {
  return { styleGuide: init }
}

function init(serviceLocator, done) {
  if ([ 'development', 'testing' ].indexOf(serviceLocator.env) === -1) return done()
  createController(serviceLocator)
  done()
}
