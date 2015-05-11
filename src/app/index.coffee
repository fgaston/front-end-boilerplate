require 'handlebars/index.coffee'
window.debug = new Debugger('Main App').debug
Layout = require './views/layout.coffee'

window.App = new Marionette.Application
  initialize: ->
    @layout = new Layout
  onStart: ->
    debug 'starting'
    @layout.render()

    Backbone.Intercept.start()
    Backbone.history.start
      pushState: true
    
    # send message to start demo module
    App.channel.commands.execute 'module:demo:start',
      region: @layout.getRegion('dialogs') # pass modules region

# include modules
require './modules/index.coffee'

App.start()