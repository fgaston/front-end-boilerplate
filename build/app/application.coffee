Controller  = require 'controller.coffee'
Router      = require 'router.coffee'
require 'handlebars/helpers/index.coffee'

module.exports = App = new Marionette.Application()

App.addRegions
  header:  '#header-region'
  main:    '#main-region'
  dialogs: '#dialog-region'

App.addInitializer ->
  Router = App.Router = new Router
    controller: new Controller
      App: App
  Backbone.history.start pushState: true

$(document).on 'click', 'a', (e) ->
  if !$(@).attr('data-toggle')
    href = $(@).attr('href') || '/'
    App.Router.navigate href, true
    return false

$(document).ready ->
  App.start()
