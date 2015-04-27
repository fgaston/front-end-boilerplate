TestModal = require './views/modal.coffee'

class Demo extends Marionette.Module
  startWithParent: false
  onStart: ->
    @view = new TestModal
    App.getRegion('main').show @view
  onStop: ->
    @view.destroy()
    @start()

App.module 'demo', Demo