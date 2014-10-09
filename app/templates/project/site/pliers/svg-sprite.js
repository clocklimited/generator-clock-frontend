module.exports = task

var path = require('path')
  , join = path.join
  , SVGSprite = require('svg-sprite')
  , svgToPng = require('svg-to-png')
  , anyNewerFiles = require('any-newer-files')
  , fs = require('fs')

// Added to stop the SVGSprite hijacking the uncaughtException handler. Nasty :(
// process.removeAllListeners()

function task(pliers, config) {
  pliers('buildSprite', function (done) {

    var spriteDirectory = join(pliers.cwd, 'assets', 'stylus', config.projectId, 'sprite')

    pliers.mkdirp(spriteDirectory)
    if (!fs.existsSync(join(spriteDirectory, 'sprite-generated.styl'))) {
      pliers.logger.info('No sprite Stylus found. Recompiling sprite')
    } else if (!anyNewerFiles(pliers.filesets.singleSvgs, pliers.filesets.compiledSprites)) {
      pliers.logger.warn('No sprite changes found. No recompile required')
      return done()
    }

    var imageSrcDir = join(pliers.cwd, 'assets', 'img', config.projectId, 'sprite', 'raw')
      , imageOutDir = join(pliers.cwd, 'assets', 'img', config.projectId, 'sprite', 'generated')
      , options =
        { render:
          { css: false
          , styl:
            { dest: join(pliers.cwd, 'assets', 'stylus', config.projectId, 'sprite', 'sprite-generated.styl')
            , template: join(pliers.cwd, 'assets', 'stylus', 'common', 'sprite', 'sprite-template.styl')
            }
          }
        , variables:
          { replacedExpression: function () {
              if ( this.expression.indexOf('--hover') !== -1 ) {
                return '.btn:hover .' + this.expression.replace('--hover', '') +
                  ', .btn:focus .' + this.expression.replace('--hover', '') +
                  ', .text-btn:hover .' + this.expression.replace('--hover', '') +
                  ', .text-btn:focus .' + this.expression.replace('--hover', '')
              } else {
                return '.' + this.expression
              }
            }
          }
        , verbose: 0
        , padding: 2
        , common: 'icon'
        , prefix: 'icon-'
        , sprite: 'icon-sprite'
        , spritedir: ''
        }
      , callback = function(err, results) {
          if (err) throw err
          pliers.logger.info('SVG Sprite Created')
          pliers.logger.debug('Compiled SVG sprite from ' + results.data.svg.length + ' images')
          svgToPng.convert(imageOutDir, imageOutDir).then( function() {
            pliers.logger.info('PNG Sprite Created')
            done()
          })
        }

    SVGSprite.createSprite(imageSrcDir, imageOutDir, options, callback)

  })
}
