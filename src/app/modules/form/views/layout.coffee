class Layout extends Marionette.LayoutView
  template: require './layout.hbs'
  className: 'animated fadeIn'
  regions:
    'header': '.header'
    'page': '.page'
    'footer': '.footer'

module.exports = Layout