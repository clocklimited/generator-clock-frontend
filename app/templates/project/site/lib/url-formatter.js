module.exports = urlFormatter

var url = require('url')

function urlFormatter(req) {

  var initialUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    , canonicalUrl = cleanUrl(initialUrl)
    , slugUrl = cleanUrl(req.originalUrl)
    , formattedUrls =
        { initialUrl: initialUrl
        , canonicalUrl: canonicalUrl
        , slugUrl: slugUrl
        }

  return formattedUrls

}

function cleanUrl(dirtyUrl) {

  // Strip query string and hashes from passed URLs
  var cleanedUrl = dirtyUrl
                    .replace(url.parse(dirtyUrl, true).search, '')
                    .replace(url.parse(dirtyUrl, true).hash, '')
  return cleanedUrl

}
