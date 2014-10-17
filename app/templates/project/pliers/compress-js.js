var UglifyJS = require('uglify-js')
  , fs = require('fs')
  , join = require('path').join

module.exports = function compress(path, filename, sourceMapWebPath, sourceMapsEnabled) {

  var options = {}

  // Only if sourceMapsEnabled is explicitely false
  if (sourceMapsEnabled !== false) {

    options =
      { outSourceMap: sourceMapWebPath
      // I can't get this to add the original source to sourcesContent: []
      // in the output sourcemap with inSourceMap switched on. It just adds a
      // a load of nulls to the array. Ideally you'd be able to fire up the
      // browser on production and have all of the files mapped,
      // but the result of this is that you only get the mapping to inside the
      // unminified but concatenated build file.
      // , inSourceMap: path + '/' + filename + '.map'
      , sourceMapIncludeSources: true
      }
  }

  var result = UglifyJS.minify(join(path, filename), options)
  fs.writeFileSync(join(path, filename), result.code, 'utf8')
  if (sourceMapsEnabled !== false) fs.writeFileSync(join(path, filename) + '.map', result.map, 'utf8')

}
