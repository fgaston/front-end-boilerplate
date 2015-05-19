window.Debugger = require 'lib/debugger'

# build temporary dependencies object
window.$          = require 'jquery'
window.jQuery     = window.$
window._          = require 'underscore'
window.Backbone   = require 'backbone'
window.Backbone.$ = window.$
window.Marionette = require 'backbone.marionette'

# require plugins
require 'bootstrap'
require 'backbone.intercept'
require 'backbone.modal'
require 'jquery.cookie'
require 'lib/ensure-modules'
require 'lib/backbone.credentials.js'