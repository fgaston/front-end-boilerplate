class View extends Marionette.ItemView
  template: require 'templates/list/item.hbs'
  tagName: 'li'
  className: 'list-group-item animated fadeIn'

module.exports = View
