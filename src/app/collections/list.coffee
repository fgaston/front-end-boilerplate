class Collection extends Backbone.Collection
  model: require 'models/item.coffee'
  initialize: ->
    @listenTo @, 'all', @check
  check: ->
    if @length > 3
      @reset()

module.exports = Collection
