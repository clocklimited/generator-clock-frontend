module.exports = initSite

var createController = require('./controllers/controller')

function initSite() {
  return { notFound: [ 'article', 'section', 'sectionService', init ] }
}

function init(serviceLocator, done) {
  createController(serviceLocator)
  done()
}
