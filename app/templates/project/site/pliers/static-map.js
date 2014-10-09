var fs = require('fs')

module.exports = function createStaticMap(pliers) {
  pliers('createStaticMap', function (done) {
    var versionator = require('versionator')
    versionator.createMapFromPath(__dirname + '/../assets', function(error, staticFileMap) {
      var prefixMap = {}
      for (var key in staticFileMap) {
        prefixMap['/assets' + key] = '/assets' + staticFileMap[key]
      }
      fs.writeFileSync(__dirname + '/../static-file-map.json', JSON.stringify(prefixMap, null, true))
      done()
    })
  })
}
