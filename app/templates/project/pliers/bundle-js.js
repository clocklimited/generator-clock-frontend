module.exports = bundle

var browserify = require('browserify')
  , browjadify = require('browjadify')
  , join = require('path').join

function bundle(sourceDir, filename, site, noParse) {

  var b = browserify(join(sourceDir, filename)
    , { noParse: noParse
      , debug: true
      , insertGlobals: true
      , cache: {}
      , packageCache: {}
      , fullPaths: true
      })

  b.transform(browjadify({ noParse: noParse, quiet: true }))

  return b

}
