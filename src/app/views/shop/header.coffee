Components = require 'components/index.coffee'
Item = require 'models/item.coffee'

module.exports = Marionette.ItemView.extend
  template: require 'templates/shop/header.hbs'
  events:
    'click .add': '_addItem'
    'keyup input': '_filterItems'
  _addItem: ->
    item = new Item()
    item.set('name', prompt('Name:'))
    App.items.add(item)
  _filterItems: (evt) ->
    $target = $(evt.currentTarget)
    query = $target.val()
    App.vent.trigger('search:items', query)
