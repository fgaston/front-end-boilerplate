$('main').on 'click', 'a', ->
  if !$(@).attr 'data-toggle'
    return false

$('main').on 'mousedown', 'a', ->
  if !$(@).attr 'data-toggle'
    href = $(@).attr 'href' || '/'
    App.router.navigate href, true
    return false

$ ->
  App.start()
