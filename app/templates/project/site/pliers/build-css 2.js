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
  , anyNewerFiles = require('any-newer-files')
  , env = process.env.NODE_ENV || 'development'
  , debug = env === 'development'
  , middleware = [ autoprefixer(), stylusMixins(), responsiveGrid() ]

if (!debug) {
  middleware.push(cleancss())
}

function task(pliers, config) {

  pliers('buildCss', function (done) {
    var mappedVersion = versionator.createMapped(require(__dirname + '/../static-file-map.json'))
      , stylesheets =
        [ 'index.styl'
        , 'index-ie8.styl'
        , 'index-fixed.styl'
        ]

    pliers.mkdirp(join(__dirname, '..', 'assets', 'css'))
    pliers.mkdirp(join(__dirname, '..', 'assets', 'css', config.projectId))

    // Only compile css if there is a styl that is newer than the oldest css file
    if (!anyNewerFiles(pliers.filesets.stylus, pliers.filesets.css)) {
      pliers.logger.warn('No stylus changes found. No css recompile')
      return done()
    }

    renderStylus(stylesheets
      , { src: join(__dirname, '..', 'assets', 'stylus', config.projectId)
        , dest: join(__dirname, '..', 'assets', 'css', config.projectId)
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
            pliers.logger.error(err)
          }
          done()
        }).on('log', function (msg, level) { pliers.logger[level](msg) })
  })
}
