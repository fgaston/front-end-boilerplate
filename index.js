var server = require('superstatic/lib/server');
var Handlebars = require('handlebars');
var fs = require('fs');

var options = {
  gzip: process.env.gzip || true,
  port: process.env.port || 8315,
  config: {
    root: './dist',
    routes: {
      '**': 'index.html'
    }
  }
};

var index = require('./dist/index.hbs')({ env: process.env });
fs.writeFileSync('./dist/index.html', index, 'utf-8');

server(options).listen(function() {
  console.info('[INFO]', 'running on port:', options.port);
});
