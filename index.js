var superstatic = require('superstatic/lib/server');

var spec = {
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

superstatic(spec).listen();
