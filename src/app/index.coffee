App = new Marionette.Application
  initialize: ->
    @debug = new Debugger(@, 'Main App').debug
  onStart: ->
    Backbone.Intercept.start()
    @debug 'started'
    Backbone.history.start
      pushState: true
    App.module('demo').start()
  regions:
    'main': 'main'

window.App = App

require './modules/index.coffee'

App.start()