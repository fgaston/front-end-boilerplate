class View extends Marionette.ItemView
  template: require 'templates/table/item.hbs'
  tagName: 'tr'
  className: 'animated fadeIn'
  events:
    'click .delete-item': 'deleteItem'
  deleteItem: ->
    @model.destroy()

module.exports = View
