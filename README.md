[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Dependencies](https://david-dm.org/elgubenis/front-end-boilerplate.svg)](https://david-dm.org/)

Front-end Boilerplate
=========================

Technologies used:
-
- HTML5 + CSS3
- JavaScript/CoffeeScript(Iced)

Third party tools and libraries used:
-
- jQuery as '$'
- Sprint as 'S'
- Bootstrap
- Grunt (watch, concat and uglify)
- Browserify (transforms: icsify, hbsfy)
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
open http://localhost:3000 --fresh
```

Production
-
```sh
grunt build
# push "./build.zip" to AWS Elastic Beanstalk
```
