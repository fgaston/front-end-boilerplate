module.exports = Marionette.Controller.extend
  showIndex: ->
    ensureModules ['cars']
    App.controller.displayNavigation()
    debug 'show index'
  addCar: ->
    ensureModules ['cars']
    App.controller.displayNavigation()
    debug 'show form to add a car'
