# import dependencies
dependencies          = {}
dependencies.Debugger = require 'lib/debugger.coffee'
$                     = require 'jquery'
_                     = require 'underscore'
Backbone              = require 'backbone'
Backbone.$            = $
Marionette            = require 'backbone.marionette'

# create export
dependencies.$          = $
dependencies.jQuery     = dependencies.$
dependencies._          = _
dependencies.Backbone   = Backbone
dependencies.Marionette = Marionette

# export dependencies
_.extend window, dependencies
dependencies = null

# require plugins
require 'bootstrap'
require 'backbone.intercept'
require 'backbone.modal'
require 'jquery.cookie'
require 'lib/ensure-modules.coffee'
require 'lib/backbone.credentials.js'