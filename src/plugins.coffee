# require Debugger
window.Debugger = require 'lib/debugger'

# require Vendors
window.$          = require 'jquery'
window.jQuery     = window.$
window._          = require 'underscore'
window.Backbone   = require 'backbone'
window.Backbone.$ = window.$
window.Marionette = require 'backbone.marionette'

# require Plugins
require 'bootstrap'
require 'backbone.intercept'
require 'backbone.modal'
require 'jquery.cookie'
require 'lib/ensure-modules'
require 'lib/backbone.credentials.js'