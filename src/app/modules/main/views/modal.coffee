class Modal extends Backbone.Modal
  template: require './modal.hbs'
  events:
    'click .destroy': 'destroy'

module.exports = Modal