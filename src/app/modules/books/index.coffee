Books = require './collections/books.coffee'
Router = require './router.coffee'
Controller = require './controller.coffee'

module.exports = App.module 'books', (module, App) ->
  @startWithParent = false

  # start
  @listenTo @, 'start', ->
    debug 'Module ' + module.moduleName + ' started'
    @started = true

  # stop
  @listenTo @, 'stop', ->
    delete @started
    @controller.destroy()
    @books.reset()
    debug 'Module ' + module.moduleName + ' stopped'

  # define
  @books = new Books()
  @controller = new Controller()
  @router = new Router
    controller: @controller
