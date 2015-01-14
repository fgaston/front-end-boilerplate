Controller  = require 'controller.coffee'
Router      = require 'router.coffee'
require 'handlebars/helpers/index.coffee'

module.exports = App = new Marionette.Application
  initialize: ->
    @listenTo @, 'start', ->
      Router = App.Router = new Router
        controller: new Controller @
      Backbone.history.start
        pushState: true

App.addRegions
  header:  '#header-region'
  main:    '#main-region'
  dialogs: '#dialog-region'

$('main').on 'click', 'a', (e) ->
  if !$(@).attr('data-toggle')
    href = $(@).attr('href') || '/'
    App.Router.navigate(href, true)
    return false

$ ->
  App.start()
