class Debugger
  constructor: (label) ->
    @label = label
  debug: (type, str) =>
    if !str
      str = type
      type = 'log'
    return console[type] '[' + @label.toUpperCase() + '] ' + str

module.exports = Debugger