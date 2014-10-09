module.exports = task

var path = require('path')
  , join = path.join
  , renderStylus = require('stylus-renderer')
  , stylus = require('stylus')
  , autoprefixer = require('autoprefixer-stylus')
  , versionator = require('versionator')
  , stylusMixins = require('stylus-mixins')
  , responsiveGrid = require('responsive-grid')
  , cleancss = require('./lib/clean-css')
  , env = process.env.NODE_ENV || 'development'
  , debug = env === 'development'
  , fs = require('fs')
  , middleware = [ autoprefixer(), stylusMixins(), responsiveGrid() ]

if (!debug) {
  middleware.push(cleancss())
}

function task(pliers) {

  pliers('buildCss', function (done) {
    var mappedVersion = versionator.createMapped(require(__dirname + '/../static-file-map.json'))
      , stylesheets = [ 'index.styl', 'index-ie8.styl' ]

    try {
      fs.mkdirSync(join(__dirname, '..', 'assets', 'css'))
    } catch (e) {
      if (e.code !== 'EEXIST') {
        throw e
      }
    }

    renderStylus(stylesheets
      , { src: join(__dirname, '..', 'assets', 'stylus')
        , dest: join(__dirname, '..', 'assets', 'css')
        , use: middleware
        , stylusOptions: { compress: false }
        , define:
          { $ENV: env
          , versionPath: function (urlPath) {
              return new stylus.nodes.Literal('url(' + mappedVersion.versionPath(urlPath.val) + ')')
            }
          }
        }
        , function (err) {
          if (err) {
            pliers.logger.error('Failed to render stylus')
            pliers.logger.error(err.stack)
          }
          done()
        }).on('log', function (msg, level) { pliers.logger[level](msg) })
  })
}
