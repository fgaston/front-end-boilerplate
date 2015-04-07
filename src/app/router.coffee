Components = require 'components/index.coffee'

class Router extends Marionette.AppRouter
  appRoutes:
    '':       'home'
    'other':  'other'
    'list':   'list'
    'logout': 'logout'
    'table':  'table'
  initialize: ->
    @listenTo @, 'route', ->
      _.defer ->
        Components.setActiveLinks Backbone.history.location.pathname

module.exports = Router
