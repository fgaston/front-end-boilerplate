Controller = require 'controller.coffee'
Router = require 'router.coffee'
require 'handlebars/helpers/index.coffee'
require 'handlebars/partials/index.coffee'
require 'app-bootstrapper.coffee'
debug = require 'debug.coffee'

module.exports = window.App = new Marionette.Application
  initialize: ->
    @debug = true
    @controller = new Controller()
    @Vent = new Backbone.Wreqr.EventAggregator()
    @router = new Router
      controller: @controller
    @listenTo @, 'start', ->
      debug 'timeEnd', 'app:start'
      Backbone.history.start
        pushState: true
  regions:
    header:  '#header-region'
    main:    '#main-region'
    dialogs: '#dialog-region'
