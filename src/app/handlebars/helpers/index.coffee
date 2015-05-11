# --------------------------------------------------------
# please only define global handlebars helpers in here.
# stuff that works for every module, not module specific.
# --------------------------------------------------------

# include handlebars runtime
Handlebars = require 'hbsfy/runtime'

# shuffle in swag
require './swag.js'
for helperName, helperFunction of Swag.helpers
  Handlebars.registerHelper helperName, helperFunction

# custom helpers
Handlebars.registerHelper 'grid', (str) ->
  if !isNaN str
    returnValue = ['col-xs-'+str, 'col-sm-'+str, 'col-md-'+str, 'col-lg-'+str]
  else
    splittr = str.split ' '
    returnValue = [
      'col-xs-'+splittr[0]
      'col-sm-'+splittr[1]
      'col-md-'+splittr[2]
      'col-lg-'+splittr[3]
    ]
  returnValue.join ' '