this["Templates"] = this["Templates"] || {};

this["Templates"]["home"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h1>Home</h1>\n";
  },"useData":true});



this["Templates"]["logout"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h1>Logout</h1>\n";
  },"useData":true});



this["Templates"]["navigation"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"container\">\n\n  <div class=\"navbar-header\">\n    <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n      <span class=\"sr-only\">Toggle navigation</span>\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n    </button>\n  </div>\n\n  <div id=\"navbar\" class=\"navbar-collapse collapse\">\n    <ul class=\"nav navbar-nav\">\n      <li><a href=\"/\"><i class=\"fa fa-fw fa-cube m-r-xs\"></i> Home</a></li>\n      <li><a href=\"/other\"><i class=\"fa fa-fw fa-cog m-r-xs\"></i> Other</a></li>\n    </ul>\n    <ul class=\"nav navbar-nav navbar-right\">\n      <li><a href=\"/logout\"><i class=\"fa fa-fw fa-sign-out m-r-xs\"></i> Logout</a></li>\n    </ul>\n  </div>\n\n</div>\n";
  },"useData":true});



this["Templates"]["other"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h1>Other</h1>\n";
  },"useData":true});