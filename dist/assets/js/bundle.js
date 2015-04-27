(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App;

App = new Marionette.Application({
  initialize: function() {
    return this.debug = new Debugger(this, 'Main App').debug;
  },
  onStart: function() {
    return this.listenTo(this, 'start', function() {
      this.debug('started');
      return Backbone.history.start({
        pushState: true
      });
    });
  },
  regions: {
    'main': 'main'
  }
});

module.exports = App;



},{}],2:[function(require,module,exports){
window.App = require('app.coffee');

App.start();



},{"app.coffee":1}]},{},[2]);
