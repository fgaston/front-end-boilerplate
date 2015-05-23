class Marionette.EventObject extends Marionette.Object
  constructor: (options) ->
    this.options = options || {}
    @vent = new Backbone.Wreqr.EventAggregator
    Marionette.Object.call(this, options)