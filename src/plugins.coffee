# import dependencies
dependencies          = {}
dependencies.Debugger = require 'lib/debugger'

# include vendors
$                     = require 'jquery'
_                     = require 'underscore'
Backbone              = require 'backbone'
Backbone.$            = $
Marionette            = require 'backbone.marionette'

# build temporary dependencies object
dependencies.$          = $
dependencies.jQuery     = dependencies.$
dependencies._          = _
dependencies.Backbone   = Backbone
dependencies.Marionette = Marionette

# export dependencies to global scope
_.extend window, dependencies
dependencies = null # free up temporary object

# require plugins
require 'bootstrap'
require 'backbone.intercept'
require 'backbone.modal'
require 'jquery.cookie'
require 'lib/ensure-modules'
require 'lib/backbone.credentials.js'