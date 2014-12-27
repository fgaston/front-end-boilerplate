module.exports = Marionette.CompositeView.extend
  template:       require 'templates/table/index.hbs'
  tagName:        'table'
  childView:      require 'views/table/item.coffee'
  emptyView:      require 'views/table/empty.coffee'
  childContainer: '.collection'
  className:      'table bg-white table-bordered table-striped table-hover'
  events:
    'click #add-item': 'addItem'
  addItem: ->
    @collection.add
      name: 'Article',
      price: 150
