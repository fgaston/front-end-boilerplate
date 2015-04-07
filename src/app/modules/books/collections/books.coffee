Book = require './../models/book.coffee'

module.exports = Backbone.Collection.extend
  model: Book
