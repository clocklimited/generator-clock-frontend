module.exports = createController

var renderJade = require('../../../../site/lib/render-jade')
  , urlFormatter = require('../../../../site/lib/url-formatter.js')
  , customClass = 'style-guide'

function createController(serviceLocator) {

  var baseGuides =
    { typography: 'Typography'
    , form: 'Form'
    , misc: 'Misc' }

  Object.keys(baseGuides).forEach(function (key) {
    serviceLocator.router.get('/style-guide/' + key, function (req, res) {
      var template = renderJade(__dirname + '/../templates/base/' + key + '.jade')
        , formattedUrls = urlFormatter(req)

      res.send(template(
        { config: serviceLocator.config
        , initialUrl: formattedUrls.initialUrl
        , canonicalUrl: formattedUrls.canonicalUrl
        , slugUrl: formattedUrls.slugUrl
        , slugSection: formattedUrls.slugSection
        , pageTitle: baseGuides[key]
        , bodyClass: customClass
        }
      ))
    })
  })

  serviceLocator.router.get('/style-guide', function (req, res) {
    var template = renderJade(__dirname + '/../templates/base/index.jade')

    res.send(template(
      { config: serviceLocator.config
      , pageTitle: 'Typography'
      , bodyClass: customClass
      , guides: baseGuides
      }
    ))
  })
}
