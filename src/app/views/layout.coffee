class Layout extends Marionette.LayoutView
  template: require './layout.hbs'
  tagName: 'main'
  el: 'body'
  regions:
    main: 'main'
    dialogs: 'dialogs'

module.exports = Layout