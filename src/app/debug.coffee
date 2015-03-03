module.exports = (type, str) ->
  if window && window.App && window.App.debug
    if (!str)
      str = type
      type = 'log'
    return console[type](str)
