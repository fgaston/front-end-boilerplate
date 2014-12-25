NavigationView  = require 'views/navigation.coffee'
HomeView        = require 'views/home.coffee'
OtherView       = require 'views/other.coffee'
LogoutView      = require 'views/logout.coffee'
ListView        = require 'views/list/index.coffee'
ListCollection  = require 'collections/list.coffee'

module.exports = Marionette.Controller.extend
  initialize: (options) ->
    @App = options.App
  displayNavigation: ->
    @NavigationView = @NavigationView || new NavigationView
    @App.header.show @NavigationView
  home: ->
    @displayNavigation()
    @App.main.show new HomeView
  other: ->
    @displayNavigation()
    @App.main.show new OtherView
  logout: ->
    @displayNavigation()
    @App.main.show new LogoutView
  list: ->
    @displayNavigation()
    @App.main.show new ListView
      collection: new ListCollection
