class Debugger
  constructor: (app, appName) ->
    @app = app
    @appName = appName
  debug: (type, str) =>
    if !str
      str = type
      type = 'log'
    return console[type] '[' + @appName.toUpperCase() + '] ' + str

module.exports = Debugger