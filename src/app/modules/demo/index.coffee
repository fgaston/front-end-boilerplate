require './handlebars'

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
    App.vent.trigger 'app:layout:dialogs:show', new TestModal
  onStop: ->
    App.channel.commands.execute 'module:demo:start'

App.module 'demo', Demo