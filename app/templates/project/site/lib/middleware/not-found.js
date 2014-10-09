module.exports = setup

var renderJade = require('../render-jade')
  , template = renderJade(__dirname + '/../../../components/site/static/templates/error/not-found.jade')

function setup (serviceLocator) {

  return function render(req, res) {
    res.send(template({ config: serviceLocator.config }))
  }

}
