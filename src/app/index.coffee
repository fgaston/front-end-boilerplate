class Layout extends Marionette.LayoutView
  template: require './layout.hbs'
  tagName: 'main'
  el: 'body'
  initialize: ->
    @render()
  regions:
    main: 'main'
    dialogs: 'dialogs'

App = new Marionette.Application
  initialize: ->
    @debug = new Debugger(@, 'Main App').debug
  onStart: ->
    @debug 'starting'
    Backbone.Intercept.start()
    Backbone.history.start
      pushState: true
    @layout = new Layout
    App.module('demo').start()

window.App = App

require './modules/index.coffee'

App.start()