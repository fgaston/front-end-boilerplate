# load global Handlebars Helpers and Partials
require 'handlebars/index'

# Define App's Layout, Router + Controller
Layout      = require './views/layout'
Router      = require './router'
Controller  = require './controller'

# Define the App
window.App = new Marionette.Application
  initialize: ->
    @router = new Router
      controller: new Controller
  onStart: ->
    new Layout @
    Backbone.Intercept.start()
    Backbone.history.start
      pushState: true

# Start App
App.start()