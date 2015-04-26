


XSCollection = new Backbone.Collection

XSCollection.add
  x: 0
XSCollection.add
  x: 1
XSCollection.add
  x: 2
XSCollection.add
  x: 3
XSCollection.add
  x: 4
XSCollection.add
  x: 5
 XSCollection.add
  x: 6
 XSCollection.add
  x: 7
 XSCollection.add
  x: 8
 XSCollection.add
  x: 9
 XSCollection.add
  x: 10
 XSCollection.add
  x: 11

class XItemView extends Marionette.ItemView
  initialize: ->
    @model.set 'y', @options.y
  template: require '../templates/x-item.hbs'
  className: 'col-sm-1 panel'
  onRender: ->
    if @model.get('x') == 3
      @$el.empty().removeClass('panel')

class XCollectionView extends Marionette.CollectionView
  childView: XItemView
  childViewOptions: =>
    return {
      y: @options.y
    }
  initialize: ->
    @render()

class YItemView extends Marionette.ItemView
  template: require '../templates/y-item.hbs'
  className: 'col-sm-12'
  onRender: ->
    _.defer =>
      new XCollectionView
        y: @model.get('y')
        collection: XSCollection
        el: '.grid-x-' + @options.y

class YCollectionView extends Marionette.CollectionView
  childView: YItemView
  childViewOptions: (model, index) ->
    return {
      y: index
    }
  initialize: ->
    @render()











YSCollection = new Backbone.Collection

YSCollection.add
  y: 0
YSCollection.add
  y: 1
YSCollection.add
  y: 2

class View extends Marionette.ItemView
  template: require 'templates/other.hbs'
  onShow: ->
    new YCollectionView
      collection: YSCollection
      el: '#grid-y'

module.exports = View
