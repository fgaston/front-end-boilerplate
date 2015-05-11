[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Dependencies](https://david-dm.org/elgubenis/front-end-boilerplate.svg)](https://david-dm.org/)

Front-end Boilerplate
=========================

Demo:
-
- http://front-end-boilerplate.elasticbeanstalk.com
- http://front-end-boilerplate.elgubenis.com [CNAME]


Technologies used:
-
- HTML5 + CSS3
- JavaScript/CoffeeScript

Third party tools and libraries used:
-
- jQuery
- Bootstrap
- Grunt (watch, concat and uglify)
- Browserify (caching-coffeeify, hbsfy and uglifify)
- Underscore
- Backbone
- Marionette

Setup
=====

Pre-Requisites
-
```sh
npm install grunt-cli -g
npm install
grunt build
```

Development
-
```sh
grunt
npm start
open http://localhost:8315 --fresh
```

Production
-
```sh
grunt build
# push to AWS Elastic Beanstalk
```
