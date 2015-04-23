Layout = require './views/layout.coffee'

class Module extends Marionette.Module
  startWithParent: false
  onStart: (options) ->
    @region = options.region

    # si el inbox mandado no es un modelo/objeto
    # crea el modelo
    if (typeof options.inbox != 'object')
      #inbox = new InboxModel
    else
      inbox = options.inbox

    # hay que hacer un fetch aqui?

    Backbone.history.navigate '/inbox/' + @inboxId
    @region.show new Layout

App.module 'form', Module