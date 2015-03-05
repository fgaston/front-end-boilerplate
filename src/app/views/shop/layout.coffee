HeaderView = require 'views/shop/header.coffee'
ItemsView = require 'views/shop/items.coffee'

# Collections
Items = require 'collections/items.coffee'

module.exports = Marionette.LayoutView.extend
  template: require('templates/shop/layout.hbs')
  tagName: 'section'
  regions:
    'header': '#header'
    'items': '#items'
  onShow: ->
    App.items = new Items()
    @getRegion('header').show(new HeaderView())
    @getRegion('items').show new ItemsView
      collection: App.items
