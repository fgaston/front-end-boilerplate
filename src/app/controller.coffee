# views
NavigationView  = require 'views/navigation.coffee'
HomeView        = require 'views/home.coffee'

# layouts
ShopLayout      = require 'views/shop/layout.coffee'

module.exports = Marionette.Controller.extend
  displayNavigation: ->
    @navigationView = @navigationView || new NavigationView()
    App.getRegion('header').show @navigationView
  home: ->
    @displayNavigation()
    App.getRegion('main').show new HomeView()
  showShop: ->
    @displayNavigation()
    App.getRegion('main').show new ShopLayout()
