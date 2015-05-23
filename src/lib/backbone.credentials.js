!function() {
  var proxiedSync = Backbone.sync;
  /**
   * Prepend some additional object options to the Backbone.sync method
   * @param  {String}
   * @param  {Object}
   * @param  {Object}
   * @return {Backbone.sync}
   */
  Backbone.sync = function(method, model, options) {
    options = options || {};

    options.xhrFields = {
      withCredentials: true
    };
    
    options.crossDomain = true;

    return proxiedSync(method, model, options);
  };


  $.ajaxSetup({
    /**
     * Change the url of any ajax request, prepend the global API_URL constant.
     * Adds a timeout of 30 seconds to every request. Searches for elements with
     * the .api-loader class (like spinners and so on) and shows them.
     * @param  {XHRObject}
     * @param  {Object}
     * @return {null}
     */
    beforeSend: function(jqXHR, settings) {
      if (!settings.api !== false) {
        settings.url = API_URL + settings.url;
      }

      jqXHR.url = settings.url;
      settings.timeout = settings.timeout || 30000;

      var apiloaders = $('.api-loader');
      apiloaders.show();
    },
    /**
     * Method which executes after an jQuery ajaxRequest is completed.
     * Hides any elements with the .api-loader class (spinners and so on)
     * @return {null}
     */
    complete: function() {
      var apiloaders = $('.api-loader');
      apiloaders.hide();
    }
  });

  /**
   * Global jQuery Ajax Error catching, we are going to send an event into
   * the App's scope, the event contains an object of the actual error.
   * @param  {Event}
   * @param  {XHRObject}
   * @param  {Object}
   * @return {Backbone.Wreqr.EventAggregator.trigger}
   */
  // $(document).ajaxError(function(evt, xhr, options) {
  //   var responseText = xhr.responseText || 'The server did not respond on time.';
  //   var status = xhr.status || 408;
  //   var statusText = xhr.statusText || 'Request Timeout';
    
  //   var err = {
  //     body: JSON.parse(responseText),
  //     code: status,
  //     url: xhr.url,
  //     status: statusText
  //   };
    
  //   App.vent.trigger('error:raise:ajax', err);
  // });
}();