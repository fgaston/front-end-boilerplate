Item = require 'models/item.coffee'

module.exports = Backbone.Collection.extend
  model: Item
  url: 'http://www.json-generator.com/api/json/get/bVpSNqBSBe?indent=2'
  initialize: ->
    @fetch()
  _filter: (query) ->
    return new module.exports @filter (item) ->
      queryPattern = query.replace /\*/g, '\\w'
      queryRegex = new RegExp queryPattern, 'i'
      return item.get('name').match(queryRegex)
