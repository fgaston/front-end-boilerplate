class Layout extends Marionette.LayoutView
  template: require './layout.hbs'
  tagName: 'main'
  el: 'body'
  initialize: (App) ->
    @listenTo App.vent, 'app:layout:main:show', (view) =>
      @getRegion('main').show view
    @listenTo App.vent, 'app:layout:dialogs:show', (view) =>
      @getRegion('dialogs').show view
  regions:
    main: 'main'
    dialogs: 'dialogs'

module.exports = Layout