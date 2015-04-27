ensureModules = (app, modules) ->

  _.each app.submodules, (module) ->
    if (modules.indexOf(module.moduleName) == -1 && module.started)
      app.debug 'stopping module:', module.moduleName
      module.stop()

  _.each app.submodules, (module) ->
    if (modules.indexOf(module.moduleName) > -1 && !module.started)
      app.debug 'starting module:', module.moduleName
      module.start()

window.ensureModules = ensureModules