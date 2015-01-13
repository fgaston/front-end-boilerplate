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
      app: App
  Backbone.history.start
    pushState: true

$('main').on 'click', 'a', (e) ->
  if !$(@).attr('data-toggle')
    href = $(@).attr('href') || '/'
    App.Router.navigate(href, true)
    return false

$('main').ready ->
  App.start()
