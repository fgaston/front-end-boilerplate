class CollectionView extends Marionette.CollectionView
  childView: require 'views/list/item.coffee'
  emptyView: require 'views/list/empty.coffee'
  tagName: 'ul'
  className: 'list-group'
  onShow: ->
    if @interval
      clearInterval @interval
    @interval = setInterval =>
      @collection.add
        name: 'test'
        price: 100
    , 500
  onDestroy: ->
    if @interval
      clearInterval @interval

module.exports = CollectionView
