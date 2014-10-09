module.exports = render

var renderJade = require('../../../../site/lib/render-jade')
  , template = renderJade(__dirname + '/not-found.jade')
  , navigationView = require('../../navigation/views/navigation')

function render(serviceLocator, req, cb) {

  navigationView(serviceLocator, req, null, function (err, navigation) {
    if (err) return cb(err)
    try {
      var html = template({ config: serviceLocator.config, navigation: navigation })
      return cb(null, html)
    } catch (e) {
      cb(e)
    }
  })

}
