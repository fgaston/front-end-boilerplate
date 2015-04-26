Components = require 'components/index.coffee'

class Router extends Marionette.AppRouter
  appRoutes:
    '':       'home'
    'other':  'other'
    'list':   'list'
    'logout': 'logout'
    'table':  'table'
  onRoute: (a, b) ->
    console.log(a, b)

module.exports = Router
