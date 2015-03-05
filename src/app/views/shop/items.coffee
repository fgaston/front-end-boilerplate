Components = require 'components/index.coffee'

ShopItem = Marionette.ItemView.extend
  template: require 'templates/shop/item.hbs'
  className: Components.grid(1) + ' item'

ShopEmpty = Marionette.ItemView.extend
  template: require 'templates/shop/empty.hbs'

module.exports = Marionette.CollectionView.extend
  childView: ShopItem
  emptyView: ShopEmpty
  tagName: 'section'
  initialize: ->
    @listenTo App.vent, 'search:items', (query) ->
      @collection = @collection._filter(query)
      @render()
