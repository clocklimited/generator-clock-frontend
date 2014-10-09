module.exports = createController

var renderJade = require('../../../../site/lib/render-jade')
  , pages = require('../pages.json')

function createController(serviceLocator) {

  pages.forEach(function(page) {
    serviceLocator.router.get(page.route, function (req, res) {
      var template = renderJade(__dirname + '/../templates/' + page.template + '.jade')
      res.send(template(
        { config: serviceLocator.config
        }
      ))
    })
  })
}
