module.exports = task

var modernizr = require('modernizr')
  , fs = require('fs')
  , path = require('path')
  , join = path.join

function task(pliers) {

  pliers('buildModernizr', function (done) {
    fs.readFile(join(pliers.cwd, 'modernizr.json'), function(err, config) {
      if (err) return done(err)

      modernizr.build(JSON.parse(config), function(result) {
        var script = 'Modernizr.js'
          , js = result.min
        fs.writeFile(join(pliers.cwd, 'assets', 'js', 'lib', 'vendor', script), js, 'utf-8', function (err) {
          if (err) return done(err)
          done()
        })

      })
    })
  })

}
