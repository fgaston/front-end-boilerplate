module.exports.setActiveLinks = (href) ->
  fragment = '/'+href.split('/')[1]
  $('li').removeClass 'active'
  $('li a[href="'+fragment+'"]').parent().addClass 'active'
