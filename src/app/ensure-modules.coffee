ensureModules = (modules) ->
  _.each App.submodules, (module) ->
    if modules.indexOf(module.moduleName) == -1 && module.started
      module.stop()
  for module in modules
    module = App[module]
    if module && module.started
      return
    module.start()

module.exports = ensureModules
