Cars = require './collections/cars.coffee'
Router = require './router.coffee'
Controller = require './controller.coffee'

module.exports = App.module 'cars', (module, App) ->
  @startWithParent = false

  # start
  @listenTo @, 'start', ->
    debug 'Module ' + module.moduleName + ' started'
    @started = true

  # stop
  @listenTo @, 'stop', ->
    delete @started
    @controller.destroy()
    @cars.reset()
    debug 'Module ' + module.moduleName + ' stopped'

  # define
  @cars = new Cars()
  @controller = new Controller()
  @router = new Router
    controller: @controller
