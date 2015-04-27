TestModal = require './views/modal.coffee'

class Main extends Marionette.Module
  startWithParent: true
  onStart: ->
    App.getRegion('main').show new TestModal

App.module 'Main', Main