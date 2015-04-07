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

class Controller extends Marionette.Controller
  displayNavigation: ->
    @navigationView = @navigationView || new NavigationView
    App.getRegion('header').show(@navigationView)
  home: ->
    ensureModules []
    @displayNavigation()
    App.getRegion('main').show(new HomeView)
  other: ->
    ensureModules []
    @displayNavigation()
    App.getRegion('main').show(new OtherView)
  logout: ->
    ensureModules []
    @displayNavigation()
    App.getRegion('main').show(new LogoutView)
  list: ->
    ensureModules []
    @displayNavigation()
    App.getRegion('main').show new ListView
      collection: new ListCollection
  table: ->
    ensureModules []
    @displayNavigation()
    App.getRegion('main').show new TableView
      collection: new TableCollection

module.exports = Controller
