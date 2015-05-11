!function() {
  var proxiedSync = Backbone.sync;
  Backbone.sync = function(method, model, options) {
    options = options || {};

    options.xhrFields = {
      withCredentials: true
    };
    options.crossDomain = true;

    return proxiedSync(method, model, options);
  };
}();