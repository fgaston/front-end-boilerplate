module.exports = Backbone.Collection.extend
  model: require 'models/item.coffee'
  initialize: ->
    @listenTo @, 'all', @check
  check: ->
    ###
    $('#header-region > nav').toggleClass('navbar-inverse');
    ###
    if @length > 3
      @reset()
