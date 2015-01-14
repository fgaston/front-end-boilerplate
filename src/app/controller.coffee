# views
NavigationView  = require 'views/navigation.coffee'
HomeView        = require 'views/home.coffee'
OtherView       = require 'views/other.coffee'
LogoutView      = require 'views/logout.coffee'
ListView        = require 'views/list/index.coffee'
TableView       = require 'views/table/index.coffee'

# collections
ListCollection  = require 'collections/list.coffee'
TableCollection = require 'collections/table.coffee'

module.exports = Marionette.Controller.extend
  initialize: (app) ->
    @app = app
  displayNavigation: ->
    @navigationView = @navigationView || new NavigationView
    @app.getRegion('header').show @navigationView
  home: ->
    @displayNavigation()
    @app.getRegion('main').show new HomeView
  other: ->
    @displayNavigation()
    @app.getRegion('main').show new OtherView
  logout: ->
    @displayNavigation()
    @app.getRegion('main').show new LogoutView
  list: ->
    @displayNavigation()
    @app.getRegion('main').show new ListView
      collection: new ListCollection
  table: ->
    @displayNavigation()
    @app.getRegion('main').show new TableView
      collection: new TableCollection
