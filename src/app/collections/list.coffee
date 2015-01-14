module.exports = Backbone.Collection.extend
  model: require 'models/item.coffee'
  initialize: ->
    @listenTo @, 'all', @check
  check: ->
    if @length > 3
      @reset()
