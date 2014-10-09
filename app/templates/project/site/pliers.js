module.exports = tasks

var path = require('path')
  , join = path.join
  , child
  , Notification = require('node-notifier')
  , notifier = new Notification()
  , glob = require('glob')
  , createConfigury = require('configury')
  , configury = createConfigury(__dirname + '/../config.json')
  , config = configury(process.NODE_ENV)
  , pliersModernizr = require('pliers-modernizr')

function tasks(pliers) {

  pliersModernizr(pliers, join(__dirname, 'assets', 'js', 'lib', 'vendor'))

  function notify(message, title) {
    title = title || config.projectName
    notifier.notify(
      { title: title
      , message: message
      })
    pliers.logger.info(message)
  }

  // Load pliers plugins
  glob.sync(__dirname + '/pliers/*.js').forEach(function (file) {
    require(file)(pliers, config)
  })

  // Define the filesets
  pliers.filesets('serverJs'
    , [ join(__dirname, '**/*.js')
      , '../components/site/**/*.js'
      , '../components/site/**/*.jade'
      , '../components/service/**/*.js'
      , '../config.json'
      ])

  pliers.filesets('stylus', join(__dirname, 'assets', 'stylus',  '**/*.styl'))
  pliers.filesets('css', join(__dirname, 'assets', 'css', '**/*.css'))

  // Any building that is needed before running the application
  pliers('build', 'createStaticMap', 'buildCss', [ 'createStaticMap' ] ,function (done) {
    done()
  })

  // Start the app and hold onto the process reference for restarting
  pliers('start', function (done) {
    if (child) child.kill()
    child = pliers.exec('node app', { haltOnFailure: false })
    done()
  })

  pliers('watch', function () {

    pliers.watch(pliers.filesets.serverJs, function () {
      notify('Restarting Server...')
      pliers.run('start', function () {
        notify('Server Restarted')
      })
    })

    pliers.logger.info('Watching for Stylus changes')
    pliers.watch(pliers.filesets.stylus, function () {
      pliers.run('buildCss', function () {
        notify('CSS rendered')
      })
    })

  })

  pliers('go', 'build', 'start', 'watch')
}
