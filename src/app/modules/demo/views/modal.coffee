class Modal extends Backbone.Modal
  template: require './modal.hbs'
  className: 'animated fadeIn'
  keyControl: false
  events:
    'click .destroy': ->
      App.module('demo').stop()

module.exports = Modal