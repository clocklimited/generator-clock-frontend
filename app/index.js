var yeoman = require('yeoman-generator')
  , yosay = require('yosay')
  , ClockNodeProject
  , createConfigury = require('configury')

function requiredPrompt (value) {
  return value !== ''
}

ClockNodeProject = yeoman.generators.Base.extend(
   { prompting: function () {
      var packageJson

      if (!this.options.hideWelcome) {
        this.log(yosay('Welcome to the Clock Node Project Generator'))
      }
      this.log('Setting up node project defaults')

      try {
        packageJson = require(this.destinationRoot() + '/package.json')
        this.log('package.json found. Assuming this is an existing project')
        this.projectName = packageJson.name
        this.projectDir = this._.slugify(this.projectName)
        this.projectDescription = packageJson.description
        this.organization = packageJson.organization
      } catch (e) {
        var done = this.async()
        , prompts =
          [ { name: 'projectName'
            , message: 'What is your project name?'
            , validate: requiredPrompt
            }
          , { name: 'projectDescription'
            , message: 'Describe the project:'
            }
          , { name: 'organization'
            , message: 'Organization:'
            , default: 'Clock Limited'
            , validate: requiredPrompt
            }
          ]

        this.prompt(prompts, function (props) {
          this.projectName = props.projectName
          this.projectDir = this._.slugify(this.projectName)
          this.projectDescription = props.projectDescription
          this.organization = props.organization
          done()
        }.bind(this))
      }
    }

  , writing: function () {
      this.directory('project', '.')
      this.template('_package.json', 'package.json')
      this.template('_LICENSE', 'LICENSE'
        , { year: (new Date()).getFullYear(), copyRightHolder: this.organization })
      this.copy('jshintrc', '.jshintrc')
      this.copy('jscsrc', '.jscsrc')
      this.copy('jshintignore', '.jshintignore')
      this.copy('gitignore', '.gitignore')
      this.directory('jscsrc', '.jscsrc')
      this.mkdir('test')
      this.mkdir('lib')

      var configury = createConfigury(this.destinationRoot() + '/config.json')
      configury.set('projectName', this.projectName)
      configury.set('projectId', this._.slugify(this.projectName))
      configury.write()
    }
  , end: function () {
      if (!this.options['skip-install']) {
        this.installDependencies()
      }
    }
})

module.exports = ClockNodeProject
