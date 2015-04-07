Components = require 'components/index.coffee'

class CompositeView extends Marionette.CompositeView
  template:       require 'templates/table/index.hbs'
  childView:      require 'views/table/item.coffee'
  emptyView:      require 'views/table/empty.coffee'
  childViewContainer: '.collection'
  events:
    'click #add-item': 'addItem'
  addItem: ->
    @collection.add
      name:   'Article',
      price:  (Math.floor((Math.random() * 10000) + 1))
      age:    (Math.floor((Math.random() * 99) + 1))

module.exports = CompositeView
