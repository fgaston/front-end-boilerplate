require 'handlebars/index'
window.debug = new Debugger('Main App').debug
Layout = require './views/layout'

window.App = new Marionette.Application
  initialize: ->
    @layout = new Layout @
  onStart: ->
    debug 'starting'
    @layout.render()

    Backbone.Intercept.start()
    Backbone.history.start
      pushState: true
    
    # send message to start demo module
    App.channel.commands.execute 'module:demo:start'

# include modules
require './modules'

App.start()