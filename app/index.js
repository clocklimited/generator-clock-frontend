var yeoman = require('yeoman-generator')
  , async = require('async')
  , ClockFrontend

ClockFrontend = yeoman.generators.Base.extend(
   { writing: function () {
      this.directory('project', '.')
    }
  , end: function () {

       if (!this.options['skip-install']) {
         var done = this.async()
         async.parallel(
           [ this.npmInstall.bind(this
             , [ 'pliers-modernizr@0.0.1'
               , 'watchify@^1.0.6'
               , 'browjadify@^2.3.5'
               , 'exorcist@^0.1.6'
               , 'browjadify-compile@0.0.2'
               , 'browserify@^5.12.0'
               ], { 'save': true })
            // , this.npmInstall.bind(this
            //    , [
            //      ], { 'save-dev': true })
           ], function() {
             done()
           })
       }
     }
})

module.exports = ClockFrontend
