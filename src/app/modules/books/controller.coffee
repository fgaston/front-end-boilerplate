module.exports = Marionette.Controller.extend
  showIndex: ->
    ensureModules ['books']
    App.controller.displayNavigation()
    debug 'show index'
