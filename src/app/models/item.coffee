module.exports = Backbone.Model.extend
  idAttribute: 'sku'
  defaults: ->
    return {
      sku: ''
      name: ''
      description: ''
      image: ''
      price: ''
      availability: 0
    }
