module.exports = task

var fs = require('fs')
  , bundle = require('../../pliers/lib/bundle-js')
  , async = require('async')
  , anyNewerFiles = require('any-newer-files')
  , join = require('path').join

function getSiteList() {
  return fs.readdirSync(__dirname + '/../../configs')
    .filter(function (file) {
      return file.indexOf('.') !== 0 && file !== 'base.json'
    })
    .map(function (file) {
      return file.replace('.json', '')
    })
}

function task(pliers) {

  pliers('buildMainAppJs', function (done) {

    if (!anyNewerFiles(pliers.filesets.browserJs.concat(pliers.filesets.browserTemplates)
      , pliers.filesets.compiledBrowserJs)) {
      pliers.logger.warn('No Browser JS changes found. No recompile required')
      return done()
    }

    var sites = getSiteList()
    pliers.mkdirp(__dirname + '/../assets/js/build')
    sites.forEach(function (site) {
      pliers.mkdirp(__dirname + '/../assets/js/build/' + site)
    })
    async.each(sites, function (site, done) {
      var sourceDir = join(__dirname, '..', 'assets/js/app')
        , destDir = join(__dirname, '..', 'assets/js/build', site)
      bundle(sourceDir, destDir, 'index.js', site, pliers.filesets.vendorJs, pliers.logger, done)
    }, done)
  })

  pliers('buildBrowserJs', 'buildMainAppJs', 'createStaticMap')

}
