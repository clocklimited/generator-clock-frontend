module.exports = createRoutes

var notFoundView = require('../views/not-found')

function createRoutes(serviceLocator) {

  serviceLocator.router.all('*', function (req, res, next) {
    notFoundView(serviceLocator, req, function (err, html) {
      if (err) return next(err)
      res.send(404, html)
    })
  })

}
