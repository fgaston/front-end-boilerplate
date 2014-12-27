(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App, Components, Controller, Router;

Controller = require('controller.coffee');

Router = require('router.coffee');

Components = require('components/index.coffee');

require('handlebars/helpers/index.coffee');

module.exports = App = new Marionette.Application();

App.addRegions({
  header: '#header-region',
  main: '#main-region',
  dialogs: '#dialog-region'
});

App.addInitializer(function() {
  Router = App.Router = new Router({
    controller: new Controller({
      App: App
    })
  });
  return Backbone.history.start({
    pushState: true
  });
});

$(document).on('click', 'a', function(e) {
  var href;
  if (!$(this).attr('data-toggle')) {
    href = $(this).attr('href') || '/';
    App.Router.navigate(href, true);
    return false;
  }
});

$(document).ready(function() {
  return App.start();
});


},{"components/index.coffee":4,"controller.coffee":5,"handlebars/helpers/index.coffee":6,"router.coffee":9}],2:[function(require,module,exports){
module.exports = Backbone.Collection.extend({
  model: require('models/item.coffee'),
  initialize: function() {
    return this.listenTo(this, 'all', this.check);
  },
  check: function() {

    /*
    $('#header-region > nav').toggleClass('navbar-inverse');
     */
    if (this.length > 3) {
      return this.reset();
    }
  }
});


},{"models/item.coffee":7}],3:[function(require,module,exports){
module.exports = Backbone.Collection.extend({
  model: require('models/tr.coffee'),
  initialize: function() {
    return this.listenTo(this, 'all', this.check);
  },
  check: function() {
    if (this.length > 5) {
      return this.reset();
    }
  }
});


},{"models/tr.coffee":8}],4:[function(require,module,exports){
module.exports.setActiveLinks = function(href) {
  var fragment;
  fragment = '/' + href.split('/')[1];
  $('li').removeClass('active');
  return $('li a[href="' + fragment + '"]').parent().addClass('active');
};


},{}],5:[function(require,module,exports){
var HomeView, ListCollection, ListView, LogoutView, NavigationView, OtherView, TableCollection, TableView;

NavigationView = require('views/navigation.coffee');

HomeView = require('views/home.coffee');

OtherView = require('views/other.coffee');

LogoutView = require('views/logout.coffee');

ListView = require('views/list/index.coffee');

TableView = require('views/table/index.coffee');

ListCollection = require('collections/list.coffee');

TableCollection = require('collections/table.coffee');

module.exports = Marionette.Controller.extend({
  initialize: function(options) {
    return this.App = options.App;
  },
  displayNavigation: function() {
    this.NavigationView = this.NavigationView || new NavigationView;
    return this.App.header.show(this.NavigationView);
  },
  home: function() {
    this.displayNavigation();
    return this.App.main.show(new HomeView);
  },
  other: function() {
    this.displayNavigation();
    return this.App.main.show(new OtherView);
  },
  logout: function() {
    this.displayNavigation();
    return this.App.main.show(new LogoutView);
  },
  list: function() {
    this.displayNavigation();
    return this.App.main.show(new ListView({
      collection: new ListCollection
    }));
  },
  table: function() {
    this.displayNavigation();
    return this.App.main.show(new TableView({
      collection: new TableCollection
    }));
  }
});


},{"collections/list.coffee":2,"collections/table.coffee":3,"views/home.coffee":19,"views/list/index.coffee":21,"views/logout.coffee":23,"views/navigation.coffee":24,"views/other.coffee":25,"views/table/index.coffee":27}],6:[function(require,module,exports){
var Handlebars;

Handlebars = require('hbsfy/runtime');

Handlebars.registerHelper('grid', function(str) {
  var returnValue, splittr;
  if (!isNaN(str)) {
    returnValue = ['col-xs-' + str, 'col-sm-' + str, 'col-md-' + str, 'col-lg-' + str];
  } else {
    splittr = str.split(' ');
    returnValue = ['col-xs-' + splittr[0], 'col-sm-' + splittr[1], 'col-md-' + splittr[2], 'col-lg-' + splittr[3]];
  }
  return returnValue.join(' ');
});


},{"hbsfy/runtime":36}],7:[function(require,module,exports){
module.exports = Backbone.Ribs.Model.extend({
  defaults: {
    name: void 0,
    price: 0
  }
});


},{}],8:[function(require,module,exports){
module.exports = Backbone.Ribs.Model.extend({
  defaults: {
    name: void 0,
    price: 0
  }
});


},{}],9:[function(require,module,exports){
var Components;

Components = require('components/index.coffee');

module.exports = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'home',
    'other': 'other',
    'list': 'list',
    'logout': 'logout',
    'table': 'table'
  },
  initialize: function() {
    return this.listenTo(this, 'route', function() {
      return _.defer(function() {
        return Components.setActiveLinks(Backbone.history.location.pathname);
      });
    });
  }
});


},{"components/index.coffee":4}],10:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h1>Home</h1>\n";
  },"useData":true});

},{"hbsfy/runtime":36}],11:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "No items yet\n";
  },"useData":true});

},{"hbsfy/runtime":36}],12:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " <strong>costs</strong> "
    + escapeExpression(((helper = (helper = helpers.price || (depth0 != null ? depth0.price : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"price","hash":{},"data":data}) : helper)))
    + "\n";
},"useData":true});

},{"hbsfy/runtime":36}],13:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h1>Logout</h1>\n";
  },"useData":true});

},{"hbsfy/runtime":36}],14:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"container\">\n\n  <div class=\"navbar-header\">\n    <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n      <span class=\"sr-only\">Toggle navigation</span>\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n    </button>\n  </div>\n\n  <div id=\"navbar\" class=\"navbar-collapse collapse\">\n    <ul class=\"nav navbar-nav\">\n      <li><a href=\"/\"><i class=\"fa fa-fw fa-cube m-r-xs\"></i> Home</a></li>\n      <li><a href=\"/other\"><i class=\"fa fa-fw fa-cog m-r-xs\"></i> Other</a></li>\n      <li><a href=\"/list\"><i class=\"fa fa-fw fa-list m-r-xs\"></i> List</a></li>\n      <li><a href=\"/table\"><i class=\"fa fa-fw fa-table m-r-xs\"></i> Table</a></li>\n      <li><a href=\"/benchmark\"><i class=\"fa fa-fw fa-clock-o m-r-xs\"></i> Benchmark</a></li>\n    </ul>\n    <ul class=\"nav navbar-nav navbar-right\">\n      <li><a href=\"/logout\"><i class=\"fa fa-fw fa-sign-out m-r-xs\"></i> Logout</a></li>\n    </ul>\n  </div>\n\n</div>\n";
  },"useData":true});

},{"hbsfy/runtime":36}],15:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h1>Other</h1>\n";
  },"useData":true});

},{"hbsfy/runtime":36}],16:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<td colspan=\"99\">\n  <center>no items yet</center>\n</td>\n";
  },"useData":true});

},{"hbsfy/runtime":36}],17:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<thead>\n  <tr>\n    <td class=\""
    + escapeExpression(((helpers.grid || (depth0 && depth0.grid) || helperMissing).call(depth0, 5, {"name":"grid","hash":{},"data":data})))
    + "\">Name</td>\n    <td class=\""
    + escapeExpression(((helpers.grid || (depth0 && depth0.grid) || helperMissing).call(depth0, 5, {"name":"grid","hash":{},"data":data})))
    + "\">Price</td>\n    <td class=\""
    + escapeExpression(((helpers.grid || (depth0 && depth0.grid) || helperMissing).call(depth0, 2, {"name":"grid","hash":{},"data":data})))
    + "\"></td>\n  </tr>\n</thead>\n<tbody class=\"collection\">\n</tbody>\n<tfoot>\n  <tr>\n    <td colspan=\"99\">\n        <button id=\"add-item\" class=\"pull-right btn btn-xs btn-success\">\n          <i class=\"fa fa-fw fa-plus\"></i> add\n        </button>\n    </td>\n  </tr>\n</tfoot>\n";
},"useData":true});

},{"hbsfy/runtime":36}],18:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<td>\n  "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\n</td>\n<td>\n  "
    + escapeExpression(((helper = (helper = helpers.price || (depth0 != null ? depth0.price : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"price","hash":{},"data":data}) : helper)))
    + "\n</td>\n<td>\n  <button class=\"delete-item pull-right btn btn-xs btn-danger\">\n    <i class=\"fa fa-fw fa-times\"></i> delete\n  </button>\n</td>\n";
},"useData":true});

},{"hbsfy/runtime":36}],19:[function(require,module,exports){
module.exports = Marionette.ItemView.extend({
  template: require('templates/home.hbs')
});


},{"templates/home.hbs":10}],20:[function(require,module,exports){
module.exports = Marionette.ItemView.extend({
  template: require('templates/list/empty.hbs'),
  tagName: 'li',
  className: 'list-group-item'
});


},{"templates/list/empty.hbs":11}],21:[function(require,module,exports){
module.exports = Marionette.CollectionView.extend({
  childView: require('views/list/item.coffee'),
  emptyView: require('views/list/empty.coffee'),
  tagName: 'ul',
  className: 'list-group',
  onShow: function() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    return this.interval = setInterval((function(_this) {
      return function() {
        return _this.collection.add({
          name: 'test',
          price: 100
        });
      };
    })(this), 500);
  },
  onDestroy: function() {
    if (this.interval) {
      return clearInterval(this.interval);
    }
  }
});


},{"views/list/empty.coffee":20,"views/list/item.coffee":22}],22:[function(require,module,exports){
module.exports = Marionette.ItemView.extend({
  template: require('templates/list/item.hbs'),
  tagName: 'li',
  className: 'list-group-item'
});


},{"templates/list/item.hbs":12}],23:[function(require,module,exports){
module.exports = Marionette.ItemView.extend({
  template: require('templates/logout.hbs')
});


},{"templates/logout.hbs":13}],24:[function(require,module,exports){
module.exports = Marionette.ItemView.extend({
  template: require('templates/navigation.hbs'),
  tagName: 'nav',
  className: 'navbar navbar-default navbar-inverse navbar-fixed-top'
});


},{"templates/navigation.hbs":14}],25:[function(require,module,exports){
module.exports = Marionette.ItemView.extend({
  template: require('templates/other.hbs')
});


},{"templates/other.hbs":15}],26:[function(require,module,exports){
module.exports = Marionette.ItemView.extend({
  template: require('templates/table/empty.hbs'),
  tagName: 'tr'
});


},{"templates/table/empty.hbs":16}],27:[function(require,module,exports){
module.exports = Marionette.CompositeView.extend({
  template: require('templates/table/index.hbs'),
  tagName: 'table',
  childView: require('views/table/item.coffee'),
  emptyView: require('views/table/empty.coffee'),
  childContainer: '.collection',
  className: 'table bg-white table-bordered table-striped table-hover',
  events: {
    'click #add-item': 'addItem'
  },
  addItem: function() {
    return this.collection.add({
      name: 'Article',
      price: 150
    });
  }
});


},{"templates/table/index.hbs":17,"views/table/empty.coffee":26,"views/table/item.coffee":28}],28:[function(require,module,exports){
module.exports = Marionette.ItemView.extend({
  template: require('templates/table/item.hbs'),
  tagName: 'tr',
  events: {
    'click .delete-item': 'deleteItem'
  },
  deleteItem: function() {
    return this.model.destroy();
  }
});


},{"templates/table/item.hbs":18}],29:[function(require,module,exports){
"use strict";
/*globals Handlebars: true */
var base = require("./handlebars/base");

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)
var SafeString = require("./handlebars/safe-string")["default"];
var Exception = require("./handlebars/exception")["default"];
var Utils = require("./handlebars/utils");
var runtime = require("./handlebars/runtime");

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
var create = function() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = SafeString;
  hb.Exception = Exception;
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function(spec) {
    return runtime.template(spec, hb);
  };

  return hb;
};

var Handlebars = create();
Handlebars.create = create;

Handlebars['default'] = Handlebars;

exports["default"] = Handlebars;
},{"./handlebars/base":30,"./handlebars/exception":31,"./handlebars/runtime":32,"./handlebars/safe-string":33,"./handlebars/utils":34}],30:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];

var VERSION = "2.0.0";
exports.VERSION = VERSION;var COMPILER_REVISION = 6;
exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1'
};
exports.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
    isFunction = Utils.isFunction,
    toString = Utils.toString,
    objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials) {
  this.helpers = helpers || {};
  this.partials = partials || {};

  registerDefaultHelpers(this);
}

exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: logger,
  log: log,

  registerHelper: function(name, fn) {
    if (toString.call(name) === objectType) {
      if (fn) { throw new Exception('Arg not supported with multiple helpers'); }
      Utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function(name) {
    delete this.helpers[name];
  },

  registerPartial: function(name, partial) {
    if (toString.call(name) === objectType) {
      Utils.extend(this.partials,  name);
    } else {
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function(name) {
    delete this.partials[name];
  }
};

function registerDefaultHelpers(instance) {
  instance.registerHelper('helperMissing', function(/* [args, ]options */) {
    if(arguments.length === 1) {
      // A missing field in a {{foo}} constuct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new Exception("Missing helper: '" + arguments[arguments.length-1].name + "'");
    }
  });

  instance.registerHelper('blockHelperMissing', function(context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if(context === true) {
      return fn(this);
    } else if(context === false || context == null) {
      return inverse(this);
    } else if (isArray(context)) {
      if(context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
        options = {data: data};
      }

      return fn(context, options);
    }
  });

  instance.registerHelper('each', function(context, options) {
    if (!options) {
      throw new Exception('Must pass iterator to #each');
    }

    var fn = options.fn, inverse = options.inverse;
    var i = 0, ret = "", data;

    var contextPath;
    if (options.data && options.ids) {
      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (isFunction(context)) { context = context.call(this); }

    if (options.data) {
      data = createFrame(options.data);
    }

    if(context && typeof context === 'object') {
      if (isArray(context)) {
        for(var j = context.length; i<j; i++) {
          if (data) {
            data.index = i;
            data.first = (i === 0);
            data.last  = (i === (context.length-1));

            if (contextPath) {
              data.contextPath = contextPath + i;
            }
          }
          ret = ret + fn(context[i], { data: data });
        }
      } else {
        for(var key in context) {
          if(context.hasOwnProperty(key)) {
            if(data) {
              data.key = key;
              data.index = i;
              data.first = (i === 0);

              if (contextPath) {
                data.contextPath = contextPath + key;
              }
            }
            ret = ret + fn(context[key], {data: data});
            i++;
          }
        }
      }
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
  });

  instance.registerHelper('if', function(conditional, options) {
    if (isFunction(conditional)) { conditional = conditional.call(this); }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function(conditional, options) {
    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
  });

  instance.registerHelper('with', function(context, options) {
    if (isFunction(context)) { context = context.call(this); }

    var fn = options.fn;

    if (!Utils.isEmpty(context)) {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
        options = {data:data};
      }

      return fn(context, options);
    } else {
      return options.inverse(this);
    }
  });

  instance.registerHelper('log', function(message, options) {
    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
    instance.log(level, message);
  });

  instance.registerHelper('lookup', function(obj, field) {
    return obj && obj[field];
  });
}

var logger = {
  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  // State enum
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  level: 3,

  // can be overridden in the host environment
  log: function(level, message) {
    if (logger.level <= level) {
      var method = logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, message);
      }
    }
  }
};
exports.logger = logger;
var log = logger.log;
exports.log = log;
var createFrame = function(object) {
  var frame = Utils.extend({}, object);
  frame._parent = object;
  return frame;
};
exports.createFrame = createFrame;
},{"./exception":31,"./utils":34}],31:[function(require,module,exports){
"use strict";

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var line;
  if (node && node.firstLine) {
    line = node.firstLine;

    message += ' - ' + line + ':' + node.firstColumn;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  if (line) {
    this.lineNumber = line;
    this.column = node.firstColumn;
  }
}

Exception.prototype = new Error();

exports["default"] = Exception;
},{}],32:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];
var COMPILER_REVISION = require("./base").COMPILER_REVISION;
var REVISION_CHANGES = require("./base").REVISION_CHANGES;
var createFrame = require("./base").createFrame;

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = REVISION_CHANGES[currentRevision],
          compilerVersions = REVISION_CHANGES[compilerRevision];
      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
    }
  }
}

exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new Exception("No environment passed to template");
  }
  if (!templateSpec || !templateSpec.main) {
    throw new Exception('Unknown template object: ' + typeof templateSpec);
  }

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  var invokePartialWrapper = function(partial, indent, name, context, hash, helpers, partials, data, depths) {
    if (hash) {
      context = Utils.extend({}, context, hash);
    }

    var result = env.VM.invokePartial.call(this, partial, name, context, helpers, partials, data, depths);

    if (result == null && env.compile) {
      var options = { helpers: helpers, partials: partials, data: data, depths: depths };
      partials[name] = env.compile(partial, { data: data !== undefined, compat: templateSpec.compat }, env);
      result = partials[name](context, options);
    }
    if (result != null) {
      if (indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    }
  };

  // Just add water
  var container = {
    lookup: function(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function(i) {
      return templateSpec[i];
    },

    programs: [],
    program: function(i, data, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths) {
        programWrapper = program(this, i, fn, data, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = program(this, i, fn);
      }
      return programWrapper;
    },

    data: function(data, depth) {
      while (data && depth--) {
        data = data._parent;
      }
      return data;
    },
    merge: function(param, common) {
      var ret = param || common;

      if (param && common && (param !== common)) {
        ret = Utils.extend({}, common, param);
      }

      return ret;
    },

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  var ret = function(context, options) {
    options = options || {};
    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths;
    if (templateSpec.useDepths) {
      depths = options.depths ? [context].concat(options.depths) : [context];
    }

    return templateSpec.main.call(container, context, container.helpers, container.partials, data, depths);
  };
  ret.isTop = true;

  ret._setup = function(options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
    }
  };

  ret._child = function(i, data, depths) {
    if (templateSpec.useDepths && !depths) {
      throw new Exception('must pass parent depths');
    }

    return program(container, i, templateSpec[i], data, depths);
  };
  return ret;
}

exports.template = template;function program(container, i, fn, data, depths) {
  var prog = function(context, options) {
    options = options || {};

    return fn.call(container, context, container.helpers, container.partials, options.data || data, depths && [context].concat(depths));
  };
  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  return prog;
}

exports.program = program;function invokePartial(partial, name, context, helpers, partials, data, depths) {
  var options = { partial: true, helpers: helpers, partials: partials, data: data, depths: depths };

  if(partial === undefined) {
    throw new Exception("The partial " + name + " could not be found");
  } else if(partial instanceof Function) {
    return partial(context, options);
  }
}

exports.invokePartial = invokePartial;function noop() { return ""; }

exports.noop = noop;function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? createFrame(data) : {};
    data.root = context;
  }
  return data;
}
},{"./base":30,"./exception":31,"./utils":34}],33:[function(require,module,exports){
"use strict";
// Build out our basic SafeString type
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = function() {
  return "" + this.string;
};

exports["default"] = SafeString;
},{}],34:[function(require,module,exports){
"use strict";
/*jshint -W004 */
var SafeString = require("./safe-string")["default"];

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

exports.extend = extend;var toString = Object.prototype.toString;
exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
var isFunction = function(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
var isFunction;
exports.isFunction = isFunction;
/* istanbul ignore next */
var isArray = Array.isArray || function(value) {
  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
};
exports.isArray = isArray;

function escapeExpression(string) {
  // don't escape SafeStrings, since they're already safe
  if (string instanceof SafeString) {
    return string.toString();
  } else if (string == null) {
    return "";
  } else if (!string) {
    return string + '';
  }

  // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.
  string = "" + string;

  if(!possible.test(string)) { return string; }
  return string.replace(badChars, escapeChar);
}

exports.escapeExpression = escapeExpression;function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.isEmpty = isEmpty;function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

exports.appendContextPath = appendContextPath;
},{"./safe-string":33}],35:[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime');

},{"./dist/cjs/handlebars.runtime":29}],36:[function(require,module,exports){
module.exports = require("handlebars/runtime")["default"];

},{"handlebars/runtime":35}]},{},[1]);
