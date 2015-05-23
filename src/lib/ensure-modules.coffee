ensureModules = (app, modules) ->

  _.each app.submodules, (module) ->
    if (modules.indexOf(module.moduleName) == -1 && module.started)
      app.debug 'stopping module:', module.moduleName
      delete module.started
      module.stop()

  _.each app.submodules, (module) ->
    if (modules.indexOf(module.moduleName) > -1 && !module.started)
      app.debug 'starting module:', module.moduleName
      module.started = new Date
      module.start()

window.ensureModules = ensureModules