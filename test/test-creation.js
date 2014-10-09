var path = require('path')
  , helpers = require('yeoman-generator').test
  , assert = require('yeoman-generator').assert

describe('clock-frontend generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err)
      }

      this.app = helpers.createGenerator('clock-frontend:app', [
        '../../app'
      ])
      done()
    }.bind(this))
  })

  it('creates expected files', function (done) {
    var expected =
      [ '.jshintrc'
      , '.jscsrc'
      , 'package.json'
      , 'config.json'
      ]

    helpers.mockPrompt(this.app, {
      'projectName': 'My New Project'
    })
    this.app.options['skip-install'] = true
    this.app.run({}, function () {
      assert.file(expected)
      assert.fileContent('config.json', /My New Project/)
      assert.fileContent('config.json', /"projectId": "my-new-project"/)
      done()
    })
  })
})
