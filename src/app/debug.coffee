module.exports = (type, str) ->
  if window && window.App && window.App.debug
    return console[type](str)
