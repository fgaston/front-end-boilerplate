TestModal = require './views/modal'

class Demo extends Marionette.Module
  startWithParent: false
  initialize: (moduleName, app) ->
    commands = App.channel.commands

    commands.setHandler 'module:' + moduleName + ':start', (options) =>
      @start options

    commands.setHandler 'module:' + moduleName + ':stop', (options) =>
      @stop options

  onStart: (options) ->
    @region = options.region
    @view = new TestModal
    @region.show @view
  onStop: ->
    @view.destroy()
    App.channel.commands.execute 'module:demo:start',
      region: @region

App.module 'demo', Demo