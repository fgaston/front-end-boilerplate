var server = require('superstatic/lib/server');

var options = {
  gzip: true,
  port: 8315,
  config: {
    root: './dist',
    routes: {
      '**': './dist/index.html'
    }
  },
  errorPage: './dist/index.html'
};

server(options).listen(function() {
  console.info('[INFO]', 'running on port:', options.port);
});
