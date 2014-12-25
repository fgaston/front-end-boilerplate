Handlebars.registerHelper 'grid', (str) ->
  if !isNaN str
    returnValue = ['col-xs-'+str, 'col-sm-'+str, 'col-md-'+str, 'col-lg-'+str]
  else
    splittr = str.split ' '
    returnValue = ['col-xs-'+splittr[0], 'col-sm-'+splittr[1], 'col-md-'+splittr[2], 'col-lg-'+splittr[3]]
  return returnValue.join ' '
