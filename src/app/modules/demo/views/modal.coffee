class Modal extends Backbone.Modal
  template: require './modal.hbs'
  keyControl: false
  events:
    'click .destroy': ->
      App.module('demo').stop()

module.exports = Modal