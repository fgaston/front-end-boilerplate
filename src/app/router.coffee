Components = require 'components/index.coffee'

module.exports = Marionette.AppRouter.extend
  appRoutes:
    ''            : 'home'
    'shop'        : 'showShop'
  initialize: ->
    @listenTo @, 'route', ->
      _.defer ->
        Components.setActiveLinks Backbone.history.location.pathname
