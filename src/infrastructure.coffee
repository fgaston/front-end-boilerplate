# require Vendors
window.$ = window.jQuery  = require 'jquery'
window._                  = require 'underscore'
window.Backbone           = require 'backbone'
window.Backbone.$         = $
window.Marionette         = require 'backbone.marionette'

# require Plugins
require 'bootstrap'
require 'backbone.intercept'
require 'backbone.modal'
require 'jquery.cookie'

# require custom Libraries/Toolkits
require 'lib/marionette.eventobject'
require 'lib/backbone.credentials'
require 'lib/sprint'