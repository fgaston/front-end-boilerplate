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
  displayNavigation: ->
    @navigationView = @navigationView || new NavigationView
    App.getRegion('header').show(@navigationView)
  home: ->
    @displayNavigation()
    App.getRegion('main').show(new HomeView)
  other: ->
    @displayNavigation()
    App.getRegion('main').show(new OtherView)
  logout: ->
    @displayNavigation()
    App.getRegion('main').show(new LogoutView)
  list: ->
    @displayNavigation()
    App.getRegion('main').show new ListView
      collection: new ListCollection
  table: ->
    @displayNavigation()
    App.getRegion('main').show new TableView
      collection: new TableCollection
