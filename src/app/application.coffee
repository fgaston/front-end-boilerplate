Controller = require 'controller.coffee'
Router = require 'router.coffee'
require 'handlebars/helpers/index.coffee'
require 'handlebars/partials/index.coffee'
window.debug = require 'debug.coffee'
window.ensureModules = require 'ensure-modules.coffee'

App = new Marionette.Application
  initialize: ->
    @debug = true
    @controller = new Controller @
    @router = new Router
      controller: @controller
    @listenTo @, 'start', ->
      debug 'App started'
      debug 'timeEnd', 'app:start'
      Backbone.history.start
        pushState: true
  regions:
    header:  '#header-region'
    main:    '#main-region'
    dialogs: '#dialog-region'

window.App = App

require('modules/index.coffee')

App.start()

require 'bootstrap.coffee'
