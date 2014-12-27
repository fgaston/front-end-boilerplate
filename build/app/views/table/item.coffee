module.exports = Marionette.ItemView.extend
  template: require 'templates/table/item.hbs'
  tagName: 'tr'
  events:
    'click .delete-item': 'deleteItem'
  deleteItem: ->
    @model.destroy()
