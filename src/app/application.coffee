require 'handlebars/helpers/index.coffee'
require 'handlebars/partials/index.coffee'
window.debug = require 'debug.coffee'

App = new Marionette.Application
  initialize: ->
    @debug = true
    @listenTo @, 'start', ->
      debug 'App started'
      debug 'timeEnd', 'app:start'
      Backbone.history.start
        pushState: true
  regions:
    'main': 'main'

window.App = App

require 'modules/index.coffee'

App.start()
