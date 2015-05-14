class Debugger
  constructor: (label) ->
    @label = label
  debug: (str...) =>
    return console.log '%c[' + @label + '] ' + str.join(''), 'background: #FFF; color: #999'

module.exports = Debugger