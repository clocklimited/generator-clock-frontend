module.exports = initApi

var createController = require('./controllers/controller')

function initApi() {
  return { staticPages: init }
}

function init(serviceLocator, done) {
  createController(serviceLocator)
  done()
}
