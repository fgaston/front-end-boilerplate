class Layout extends Marionette.LayoutView
  template: require './layout.hbs'
  el: 'body'
  initialize: (App) ->
    @render()
    @listenTo App.vent, 'layout:content:show', @getRegion('content').show
    @listenTo App.vent, 'layout:dialogs:show', @getRegion('dialogs').show
  regions:
    content: '#content'
    dialogs:
      selector: '#dialogs',
      regionClass: Backbone.Marionette.Modals

module.exports = Layout