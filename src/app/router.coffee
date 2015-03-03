Components = require 'components/index.coffee'

module.exports = Marionette.AppRouter.extend
  appRoutes:
    ''            : 'home'
    'other'       : 'other'
    'list'        : 'list'
    'logout'      : 'logout'
    'table'       : 'table'
  initialize: ->
    @listenTo @, 'route', ->
      _.defer ->
        Components.setActiveLinks Backbone.history.location.pathname
