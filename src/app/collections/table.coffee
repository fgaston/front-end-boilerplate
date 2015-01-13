module.exports = Backbone.Collection.extend
  model: require 'models/tr.coffee'
  initialize: ->
    @listenTo @, 'all', @check
  check: ->
    if @length > 5
      @reset()
