(function(e,t){"use strict";if(typeof exports!=="undefined"){module.exports=t(require("underscore"),require("backbone"))}else if(typeof define==="function"&&define.amd){define(["underscore","backbone"],t)}else{t(e._,e.Backbone)}})(this,function(e,t){"use strict";var n=t.Ribs={version:"0.4.2"};var r=function(e,t,n){return e._super.prototype[t].apply(e,n)};var i=function(e){if(e.indexOf("!.")===-1){return e.split(".")}var t=[],n,r,i,s,o,u,a;e=e.split("!.");n=e.length;for(u=0;u<n;u++){o=e[u].split(".");r=o.length;if(s!==undefined){s+="."+o[0];if(r>1){t.push(s)}else{if(u+1===n){t.push(s)}continue}a=1}else{a=0}if(u+1<n){i=r-1;s=o[r-1]}else{i=r}for(;a<i;a++){t.push(o[a])}}return t};var s=function(e,t){var n,r,s;if(typeof e==="string"){e=i(e)}for(r=0,s=e.length;r<s;r++){n=e[r];if(t.hasOwnProperty(n)){t=t[n]}else{if(s>r+1){throw new Error("can't get \""+e[r+1]+'" of "'+n+'", "'+n+'" is undefined')}else{return undefined}}}return t};var o=function(e,t){var n;for(var r=0,i=e.length;r<i;r++){n=e[r];if(r+1===i){delete t[n]}else{if(t.hasOwnProperty(n)){t=t[n]}else{break}}}};var u=function(e){var t=e.match(/^(?:!\.|[^.])+/),n,r;try{n=t[0];r=e.slice(n.length+1);if(!r.length||!n.length){throw""}}catch(i){throw new Error('wrong binging data"'+e+'"')}return{model:n,attr:r}};var a=function(e,t,n){this.name=t;if(typeof e==="function"){this.get=function(){return e.apply(n)};this.set=function(){throw new Error('set: computed "'+t+'" has no set method')};this._simple=true;return this}this._deps=e.deps;this._get=e.get;this.set=function(){return e.set.apply(n,arguments)};this._model=n;return this};e.extend(a.prototype,{update:function(t){if(this._simple){return}var n=[],r;this._previous=this.value;if(this._deps instanceof Array){for(var i=0,s=this._deps.length;i<s;i++){try{r=this._model.get(this._deps[i])}catch(o){r=undefined}n.push(r)}}this.value=this._get.apply(this._model,n);if(!e.isEqual(this._previous,this.value)){this._model.trigger("change:"+this.name,this._model,this.value,t)}},get:function(){return this.value}});var f=function(e,t,n){var r;this.selector=t;this.view=e;this.mods={};this._hasInDOMHandler=n.hasOwnProperty("inDOM");this._setEl();this.handlers={};for(var i in n){if(n.hasOwnProperty(i)){r=n[i];if(r instanceof Array){for(var s=0,o=r.length;s<o;s++){this._addHandler(i,r[s])}}else{this._addHandler(i,r)}}}};e.extend(f.prototype,{_addHandler:function(e,t){var n=this.view.handlers[e],r=e==="collection";if(!r&&!n){throw new Error('unknown handler type "'+e+'"')}if(!r&&n.multiple){for(var i in t){if(t.hasOwnProperty(i)){this.addHandler(e,t[i],i)}}}else{if(r){this.addColHandler(t)}else{this.addHandler(e,t)}}},addColHandler:function(e){var t=this.view,n=typeof e.view==="string"?t[e.view]:e.view,r=typeof e.col==="string"?t[e.col]:e.col,i=e.data||{},s=this.selector,o={},u=this,a;if(s==="el"){a=t.$el}else{a=t.$(s)}r.on("sort",this._onsort,this);r.on("add",this._onaddView,this);r.on("remove",this._removeView,this);r.on("reset",this._onReset,this);this.handlers.collection={collection:r,$el:a,View:n,data:i,views:o};var f=r.set;r.set=function(){var e=f.apply(r,arguments);if(u._toAdd){u._fillElByCollection()}u._toAdd=undefined;return e};this._fillElByCollection()},_fillElByCollection:function(n){var r=this.handlers.collection,i=r.collection,s=r.views,o=r.data,u=r.View,a=r.$el,f=document.createDocumentFragment(),l=this._toAdd,c,h,p,d,v;n=n||{};for(d=0,v=i.length;d<v;d++){h=i.at(d);p=h.cid;c=s[p];if(!c&&!n.withoutNewView&&(!l||l[p])){c=new u(e.extend(o,{model:h,collection:i}));s[p]=c}if(c){f.appendChild(c instanceof t.Ribs.View?c.getEl()[0]:c.el)}}a.append(f)},addHandler:function(e,n,r){var s=n.data,o=n.filter,a=n.events||"change",f=this.view.filters,l=[],c=[],h=[],p={},d=this,v={changeAttrs:p},m=this.view.handlers[e],g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_;if(typeof m!=="function"){g=m.get;m=m.set}if(typeof n==="string"){l.push(u(n))}else{if(typeof s==="string"){l.push(u(s))}else if(s instanceof Array){for(A=0,O=s.length;A<O;A++){l.push(u(s[A]))}}else{throw new Error("wrong binging format "+JSON.stringify(n))}}if(o){if(typeof o==="string"){if(!f.hasOwnProperty(o)){throw new Error('unknown filter "'+o+'"')}o=f[o]}if(typeof o==="function"){y=o}else{y=o.get;b=o.set}}if(m){k=function(){var e=[],i=d.view,s,o,u,a,f;for(a=0,f=l.length;a<f;a++){u=l[a];s=u.model;o=u.attr;if(i[s]instanceof t.Collection){e.push(i[s].pluck(o))}else{e.push(i[s].get(o))}}if(y){o=y.apply(i,e)}else{o=e[0]}m.call(d,d.$el,o,r,n)}}if(g){if(l.length>1){throw new Error("wrong binging format "+JSON.stringify(n))}L=function(){var e=g.call(d,d.$el);if(b){e=b.call(d.view,e)}d.view[l[0].model].set(S,e)}}for(A=0,O=l.length;A<O;A++){w=l[A];E=w.model;S=w.attr;x=i(S);N="";C=p[E]=[];if(this.view[E]instanceof t.Collection){c.push(this.view[E].pluck(S));if(m){if(h.indexOf(E)===-1){h.push(E);this.view[E].on("add remove reset sort",k)}}}else{c.push(this.view[E].get(S))}if(m){for(M=0,_=x.length;M<_;M++){if(N){N+="."}N+=x[M];C.push(N);this.view[E].on("change:"+N,k)}}}if(y){T=y.apply(this.view,c)}else{T=c[0]}if(m){m.call(this,this.$el,T,r,n);v.setter=k}if(g){this.view.$el.on(a+".bindingHandlers",this.selector,L);v.getter=L;v.events=a}this.handlers[e]=v},unbind:function(e){var n=this.handlers,r=[],i,s,o,u,a,f,l,c;for(var h in n){if(n.hasOwnProperty(h)&&!(e&&e.indexOf("all")===-1&&e.indexOf(h)===-1)){o=n[h];u=o.setter;a=o.events;if(a){this.view.$el.off(a+".bindingHandlers",this.selector,o.getter)}if(typeof u==="function"){i=o.changeAttrs;for(f in i){if(i.hasOwnProperty(f)){if(this.view[f]instanceof t.Collection){if(r.indexOf(f)===-1){r.push(f);this.view[f].off("add remove reset sort",u)}}s=i[f];for(l=0,c=s.length;l<c;l++){this.view[f].off("change:"+s[l],u)}}}}if(h==="collection"){var p=o.collection,d=o.views,v;p.off("sort",this._onsort,this);p.off("add",this._onaddView,this);p.off("remove",this._removeView,this);p.off("reset",this._onReset,this);for(v in d){if(d.hasOwnProperty(v)){d[v].remove()}}}if(h==="inDOM"){var m=this.$el,g=this.dummies,y,b;for(l=0,c=m.length;l<c;l++){y=m[l];b=g[l];if(!y.parentNode&&b.parentNode){b.parentNode.replaceChild(y,b)}}if(this.selector==="el"){this.view._ribs.outOfDOM=false}this.dummies=[]}delete n[h]}}},update:function(e){var t=this.handlers,n,r;for(var i in t){if(t.hasOwnProperty(i)&&!(e&&e.indexOf("all")===-1&&e.indexOf(i)===-1)){n=t[i];r=n.setter;if(typeof r==="function"){this._setEl();r()}if(i==="collection"){this._fillElByCollection()}}}},_setEl:function(){var e=this.selector,t;if(e==="el"){this.$el=this.view.$el}else{this.$el=this.view.$(e)}if(this._hasInDOMHandler){this.dummies=[];for(var n=0;n<this.$el.length;n++){t=document.createElement("div");t.style.display="none";t.className="ribsDummy";this.dummies.push(t)}if(e==="el"){this.view._$el=$(this.dummies[0]);this.view._el=this.view._$el[0]}else{this.view._$el=null;this.view._el=null}}},_onsort:function(){if(!this._toAdd){this._fillElByCollection({withoutNewView:true})}},_onaddView:function(e){if(!this._toAdd){this._toAdd={}}this._toAdd[e.cid]=e},_removeView:function(e){var t=this.handlers.collection,n=t.views[e.cid];n.remove();delete t.views[e.cid]},_onReset:function(){var e=this.handlers.collection,t=e.views,n;for(n in t){if(t.hasOwnProperty(n)){t[n].remove()}}e.views={};this._fillElByCollection()}});var l={not:function(e){return!e},length:function(e){if(e.hasOwnProperty("length")){return e.length}else{return 0}}};var c={text:function(e,t){e.text(t)},value:{set:function(e,t){if(e.val()!==t){e.val(t)}},get:function(e){return e.val()}},css:{set:function(e,t,n){e.css(n,t)},multiple:true},attr:{set:function(e,t,n){e.attr(n,t)},multiple:true},classes:{set:function(e,t,n){e.toggleClass(n,!!t)},multiple:true},html:function(e,t){e.html(t)},inDOM:function(e,t){var n,r;if(this.selector==="el"){this.view._ribs.outOfDOM=!t}for(var i=0;i<e.length;i++){r=e[i];n=this.dummies[i];if(t){if(!r.parentNode&&n.parentNode){n.parentNode.replaceChild(r,n)}}else{if(r.parentNode){r.parentNode.replaceChild(n,r)}}}},toggle:function(e,t){e.toggle(!!t)},disabled:function(e,t){e.prop("disabled",!!t)},enabled:function(e,t){e.prop("disabled",!t)},checked:{set:function(e,t){e.prop("checked",false);if(t instanceof Array){for(var n=0,r=t.length;n<r;n++){e.filter('[value="'+t[n]+'"]').prop("checked",true)}}else if(typeof t==="boolean"){e.prop("checked",t)}else{e.filter('[value="'+t+'"]').prop("checked",true)}},get:function(e){var t=e.attr("type"),n=e.filter(":checked");if(e.length===1){return!!n.length}if(t==="checkbox"){var r=[];n.each(function(e,t){r.push($(t).val())});return r}else{return n.val()}}},options:{set:function(e,t){e.val(t)},get:function(e){return e.val()||[]}},mod:{set:function(e,t,n,r){var i=this.mods[r];if(i){e.removeClass(i)}i=n+t;this.mods[r]=i;e.addClass(i)},multiple:true}};n.Model=t.Model.extend({_super:t.Model,constructor:function(t,n){this._ribs={computeds:{},computedsDeps:{}};var r=t||{};n=n||{};this.cid=e.uniqueId("c");this.attributes={};if(n.collection){this.collection=n.collection}if(n.parse){r=this.parse(r,n)||{}}r=e.defaults({},r,e.result(this,"defaults"));var i={};for(var s in r){if(r.hasOwnProperty(s)){i[s.replace(/\./g,"!.")]=r[s]}}this.set(i,n);this.changed={};this._initComputeds();this.initialize.apply(this,arguments)},get:function(e){if(typeof e!=="string"){return undefined}var t=this._ribs.computeds;if(e in t){return t[e].get()}var n=i(e);if(n.length===1){return this.attributes[n[0]]}else{return s(n,this.attributes)}},set:function(t,n,r){if(t==null){return this}var u,a,f,l,c,h,p,d,v,m,g,y,b;if(typeof t==="object"){u=t;r=n}else{u={};u[t]=n}r||(r={});if(!this._validate(u,r)){return false}p=r.unset;h=r.silent;a=[];f=this._changing;this._changing=true;var w=this._ribs.computeds,E=e.clone(u),S={},x,T=true,N=true;while(T){T=false;x={};for(m in u){if(u.hasOwnProperty(m)){if(m in w){T=true;e.extend(x,w[m].set(u[m]));if(N){S[m]=u[m]}delete u[m];e.extend(u,x)}}}N=false}if(!f){this._previousAttributes=e.clone(this.attributes);var C={};for(m in w){if(w.hasOwnProperty(m)){C[m]=w[m].value}}e.extend(this._previousAttributes,C);this.changed={}}l=this.attributes;c=this._previousAttributes;if(this.idAttribute in u){this.id=u[this.idAttribute]}for(m in u){if(u.hasOwnProperty(m)){n=u[m];d=i(m);if(!e.isEqual(s(d,l),n)){v=d.slice();for(g=0;g<v.length;g++){v[g]=v[g].replace(/\./g,"!.")}a.push({path:d,escapedPath:v,attr:m,val:n})}if(!e.isEqual(s(d,c),n)){this.changed[m]=n}else{delete this.changed[m]}if(p&&m in E){o(d,l)}else{this._setPath(d,n)}}}for(m in S){if(S.hasOwnProperty(m)&&p){this.removeComputed(m);delete S[m]}}var k=this._ribs.computedsDeps,L=[],A,O;for(g=0,b=a.length;g<b;g++){m=a[g].attr;A=k["change:"+m];if(A){for(y=0;y<A.length;y++){O=A[y];if(L.indexOf(O)===-1){L.push(O)}}}}if(!h){b=a.length;if(b){this._pending=r}for(g=0;g<b;g++){this.trigger("change:"+a[g].attr,this,a[g].val,r);if(r.propagation){v=a[g].escapedPath.slice();if(v.length){while(v.length-1){v.length--;this.trigger("change:"+v.join("."),this,undefined,r)}}}}}for(g=0;g<L.length;g++){w[L[g]].update(r)}if(f){return this}if(!h){while(this._pending){r=this._pending;this._pending=false;this.trigger("change",this,r)}}this._pending=false;this._changing=false;return this},trigger:function(e){var t=this._ribs.computedsDeps,n=arguments[3],i,s;if(typeof e==="string"&&e in t){var o=this._ribs.computeds,u=t[e],a;for(i=0,s=u.length;i<s;i++){a=o[u[i]];a.update(n)}}if(n&&n.silent){return this}return r(this,"trigger",arguments)},_setPath:function(e,t){var n=this.attributes,r;e=e.slice();while(e.length){r=e.shift();if(e.length){if(!(n.hasOwnProperty(r)&&n[r]instanceof Object)){throw new Error("set: can't set anything to \""+r+'", typeof == "'+typeof n[r]+'"')}n=n[r]}else{n[r]=t}}},_initComputeds:function(){var e=this.computeds,t;for(t in e){if(e.hasOwnProperty(t)){this.addComputeds(t,e[t],{silent:true})}}for(t in e){if(e.hasOwnProperty(t)){this._ribs.computeds[t].update()}}},addComputeds:function(e,t,n){var r=this._ribs.computedsDeps,s,o,u,f,l,c,h,p,d,v,m,g,y;if(typeof e==="string"){d={};d[e]=t}else{n=t;d=e}l=n&&n.silent;for(p in d){if(d.hasOwnProperty(p)){if(this.attributes[p]||this._ribs.computeds[p]){throw new Error('addComputeds: computed name "'+p+'" is already used')}u=d[p];s=u.deps;if(s instanceof Array){for(v=0,g=s.length;v<g;v++){c=i(s[v]);o="change:"+c[0].replace(/\./g,"!.");for(m=0,y=c.length;m<y;m++){f=r[o];if(f){if(f.indexOf(p)===-1){f.push(p)}}else{r[o]=[p]}h=c[m+1];if(h){o+="."+h.replace(/\./g,"!.")}}}}u=this._ribs.computeds[p]=new a(u,p,this);if(!l){u.update()}}}return this},addComputed:function(){this.addComputeds.apply(this,arguments)},removeComputed:function(e){this.removeComputeds(e)},removeComputeds:function(e){if(!e){this._ribs.computedsDeps={};this._ribs.computeds={};return this}if(!(e instanceof Array)){e=[e]}var t=this._ribs.computedsDeps,n,r,i,s,o,u;for(o=0,u=e.length;o<u;o++){s=e[o];for(r in t){if(t.hasOwnProperty(r)){n=t[r];i=n.indexOf(s);if(i!==-1){n.splice(i,1)}if(!n.length){delete t[r]}}}delete this._ribs.computeds[s]}return this},toJSON:function(e){var t=r(this,"toJSON",arguments);if(e&&e.computeds){var n=this._ribs.computeds,i;for(var s in n){if(n.hasOwnProperty(s)){i=n[s];t[s]=i._simple?i.get():i.value}}}return t}});n.View=t.View.extend({_super:t.View,constructor:function(t,n){this._ribs={_bindings:e.clone(this.bindings)||{},bindings:{},collections:{}};this.filters=this.filters||{};this.handlers=this.handlers||{};e.extend(this.filters,l);e.extend(this.handlers,c);r(this,"constructor",arguments);if(!this._ribs.preventBindings){this.applyBindings()}},getEl:function(){return this._ribs.outOfDOM?this._$el:this.$el},appendTo:function(e){if(!(e instanceof $)){e=$(e)}e.append(this.getEl())},preventBindings:function(){this._ribs.preventBindings=true},applyBindings:function(){this.addBindings(this._ribs._bindings)},addBindings:function(t,n){var r=this._ribs.bindings,i,s,o,u;if(typeof t==="string"){u={};u[t]=n}else{u=t}for(s in u){if(u.hasOwnProperty(s)){i=u[s];if(typeof i!=="object"||e.isEmpty(i)){throw new Error('wrong binging format for "'+s+'" - '+JSON.stringify(i))}if(r.hasOwnProperty(s)){o=[];for(var a in i){if(i.hasOwnProperty(a)){o.push(a)}}this.removeBindings(s,o)}r[s]=new f(this,s,i)}}},addBinding:function(e,t){this.addBindings.apply(this,arguments)},removeBindings:function(t,n){var r=this._ribs.bindings,i,s;if(typeof t==="string"){s={};s[t]=n}else{s=t}for(var o in r){if(r.hasOwnProperty(o)){if(s){if(s.hasOwnProperty(o)){i=s[o];if(typeof i==="string"){i=[i]}}else{continue}}r[o].unbind(i);if(e.isEmpty(r[o].handlers)){delete r[o]}}}},updateBindings:function(e,t){var n=this._ribs.bindings,r,i;if(typeof e==="string"){i={};i[e]=t}else{i=e}for(var s in n){if(n.hasOwnProperty(s)&&!(i&&!i.hasOwnProperty(s))){if(i){if(i.hasOwnProperty(s)){r=i[s];if(typeof r==="string"){r=[r]}}else{continue}}n[s].update(r)}}},applyCollection:function(e,t,n,r){this.addBindings(e,{collection:{col:t,view:n,data:r}})},renderCollection:function(e,t){var n=this._ribs.bindings,r,i;for(var s in n){if(n.hasOwnProperty(s)&&(!t||t===s)){r=n[s];i=r.handlers.collection;if(i&&(!e||i.collection===e)){r.update(["collection"])}}}},getCollectionViews:function(e){var t=this._ribs.bindings[e];if(t&&t.handlers.collection){return t.handlers.collection.views}return undefined}});return n});Backbone.Model=Backbone.Ribs.Model;

!function(e,t){"function"==typeof define&&define.amd?define(["exports","backbone","underscore"],t):"undefined"!=typeof exports?t(exports,require("backbone"),require("underscore")):t(e,e.Backbone,e._)}(this,function(e,t,i){"use strict";t.Relational={showWarnings:!0},t.Semaphore={_permitsAvailable:null,_permitsUsed:0,acquire:function(){if(this._permitsAvailable&&this._permitsUsed>=this._permitsAvailable)throw new Error("Max permits acquired");this._permitsUsed++},release:function(){if(0===this._permitsUsed)throw new Error("All permits released");this._permitsUsed--},isLocked:function(){return this._permitsUsed>0},setAvailablePermits:function(e){if(this._permitsUsed>e)throw new Error("Available permits cannot be less than used permits");this._permitsAvailable=e}},t.BlockingQueue=function(){this._queue=[]},i.extend(t.BlockingQueue.prototype,t.Semaphore,{_queue:null,add:function(e){this.isBlocked()?this._queue.push(e):e()},process:function(){var e=this._queue;for(this._queue=[];e&&e.length;)e.shift()()},block:function(){this.acquire()},unblock:function(){this.release(),this.isBlocked()||this.process()},isBlocked:function(){return this.isLocked()}}),t.Relational.eventQueue=new t.BlockingQueue,t.Store=function(){this._collections=[],this._reverseRelations=[],this._orphanRelations=[],this._subModels=[],this._modelScopes=[e]},i.extend(t.Store.prototype,t.Events,{initializeRelation:function(e,o,n){var s=i.isString(o.type)?t[o.type]||this.getObjectByName(o.type):o.type;if(s&&s.prototype instanceof t.Relation){new s(e,o,n)}else t.Relational.showWarnings&&"undefined"!=typeof console&&console.warn("Relation=%o; missing or invalid relation type!",o)},addModelScope:function(e){this._modelScopes.push(e)},removeModelScope:function(e){this._modelScopes=i.without(this._modelScopes,e)},addSubModels:function(e,t){this._subModels.push({superModelType:t,subModels:e})},setupSuperModel:function(e){i.find(this._subModels,function(t){return i.filter(t.subModels||[],function(i,o){var n=this.getObjectByName(i);return e===n?(t.superModelType._subModels[o]=e,e._superModel=t.superModelType,e._subModelTypeValue=o,e._subModelTypeAttribute=t.superModelType.prototype.subModelTypeAttribute,!0):void 0},this).length},this)},addReverseRelation:function(e){var t=i.any(this._reverseRelations,function(t){return i.all(e||[],function(e,i){return e===t[i]})});!t&&e.model&&e.type&&(this._reverseRelations.push(e),this._addRelation(e.model,e),this.retroFitRelation(e))},addOrphanRelation:function(e){var t=i.any(this._orphanRelations,function(t){return i.all(e||[],function(e,i){return e===t[i]})});!t&&e.model&&e.type&&this._orphanRelations.push(e)},processOrphanRelations:function(){i.each(this._orphanRelations.slice(0),function(e){var o=t.Relational.store.getObjectByName(e.relatedModel);o&&(this.initializeRelation(null,e),this._orphanRelations=i.without(this._orphanRelations,e))},this)},_addRelation:function(e,t){e.prototype.relations||(e.prototype.relations=[]),e.prototype.relations.push(t),i.each(e._subModels||[],function(e){this._addRelation(e,t)},this)},retroFitRelation:function(e){var t=this.getCollection(e.model,!1);t&&t.each(function(t){if(t instanceof e.model){new e.type(t,e)}},this)},getCollection:function(e,o){e instanceof t.RelationalModel&&(e=e.constructor);for(var n=e;n._superModel;)n=n._superModel;var s=i.find(this._collections,function(e){return e.model===n});return s||o===!1||(s=this._createCollection(n)),s},getObjectByName:function(e){var t=e.split("."),o=null;return i.find(this._modelScopes,function(e){return o=i.reduce(t||[],function(e,t){return e?e[t]:void 0},e),o&&o!==e?!0:void 0},this),o},_createCollection:function(e){var i;return e instanceof t.RelationalModel&&(e=e.constructor),e.prototype instanceof t.RelationalModel&&(i=new t.Collection,i.model=e,this._collections.push(i)),i},resolveIdForItem:function(e,o){var n=i.isString(o)||i.isNumber(o)?o:null;return null===n&&(o instanceof t.RelationalModel?n=o.id:i.isObject(o)&&(n=o[e.prototype.idAttribute])),n||0===n||(n=null),n},find:function(e,t){var i=this.resolveIdForItem(e,t),o=this.getCollection(e);if(o){var n=o.get(i);if(n instanceof e)return n}return null},register:function(e){var t=this.getCollection(e);if(t){var i=e.collection;t.add(e),e.collection=i}},checkId:function(e,i){var o=this.getCollection(e),n=o&&o.get(i);if(n&&e!==n)throw t.Relational.showWarnings&&"undefined"!=typeof console&&console.warn("Duplicate id! Old RelationalModel=%o, new RelationalModel=%o",n,e),new Error("Cannot instantiate more than one Backbone.RelationalModel with the same id per type!")},update:function(e){var t=this.getCollection(e);t.contains(e)||this.register(e),t._onModelEvent("change:"+e.idAttribute,e,t),e.trigger("relational:change:id",e,t)},unregister:function(e){var o,n;e instanceof t.Model?(o=this.getCollection(e),n=[e]):e instanceof t.Collection?(o=this.getCollection(e.model),n=i.clone(e.models)):(o=this.getCollection(e),n=i.clone(o.models)),i.each(n,function(e){this.stopListening(e),i.invoke(e.getRelations(),"stopListening")},this),i.contains(this._collections,e)?o.reset([]):i.each(n,function(e){o.get(e)?o.remove(e):o.trigger("relational:remove",e,o)},this)},reset:function(){this.stopListening(),i.each(this._collections,function(e){this.unregister(e)},this),this._collections=[],this._subModels=[],this._modelScopes=[e]}}),t.Relational.store=new t.Store,t.Relation=function(e,o,n){if(this.instance=e,o=i.isObject(o)?o:{},this.reverseRelation=i.defaults(o.reverseRelation||{},this.options.reverseRelation),this.options=i.defaults(o,this.options,t.Relation.prototype.options),this.reverseRelation.type=i.isString(this.reverseRelation.type)?t[this.reverseRelation.type]||t.Relational.store.getObjectByName(this.reverseRelation.type):this.reverseRelation.type,this.key=this.options.key,this.keySource=this.options.keySource||this.key,this.keyDestination=this.options.keyDestination||this.keySource||this.key,this.model=this.options.model||this.instance.constructor,this.relatedModel=this.options.relatedModel,i.isUndefined(this.relatedModel)&&(this.relatedModel=this.model),!i.isFunction(this.relatedModel)||this.relatedModel.prototype instanceof t.RelationalModel||(this.relatedModel=i.result(this,"relatedModel")),i.isString(this.relatedModel)&&(this.relatedModel=t.Relational.store.getObjectByName(this.relatedModel)),this.checkPreconditions()&&(!this.options.isAutoRelation&&this.reverseRelation.type&&this.reverseRelation.key&&t.Relational.store.addReverseRelation(i.defaults({isAutoRelation:!0,model:this.relatedModel,relatedModel:this.model,reverseRelation:this.options},this.reverseRelation)),e)){var s=this.keySource;s!==this.key&&i.isObject(this.instance.get(this.key))&&(s=this.key),this.setKeyContents(this.instance.get(s)),this.relatedCollection=t.Relational.store.getCollection(this.relatedModel),this.keySource!==this.key&&delete this.instance.attributes[this.keySource],this.instance._relations[this.key]=this,this.initialize(n),this.options.autoFetch&&this.instance.getAsync(this.key,i.isObject(this.options.autoFetch)?this.options.autoFetch:{}),this.listenTo(this.instance,"destroy",this.destroy).listenTo(this.relatedCollection,"relational:add relational:change:id",this.tryAddRelated).listenTo(this.relatedCollection,"relational:remove",this.removeRelated)}},t.Relation.extend=t.Model.extend,i.extend(t.Relation.prototype,t.Events,t.Semaphore,{options:{createModels:!0,includeInJSON:!0,isAutoRelation:!1,autoFetch:!1,parse:!1},instance:null,key:null,keyContents:null,relatedModel:null,relatedCollection:null,reverseRelation:null,related:null,checkPreconditions:function(){var e=this.instance,o=this.key,n=this.model,s=this.relatedModel,l=t.Relational.showWarnings&&"undefined"!=typeof console;if(!n||!o||!s)return l&&console.warn("Relation=%o: missing model, key or relatedModel (%o, %o, %o).",this,n,o,s),!1;if(!(n.prototype instanceof t.RelationalModel))return l&&console.warn("Relation=%o: model does not inherit from Backbone.RelationalModel (%o).",this,e),!1;if(!(s.prototype instanceof t.RelationalModel))return l&&console.warn("Relation=%o: relatedModel does not inherit from Backbone.RelationalModel (%o).",this,s),!1;if(this instanceof t.HasMany&&this.reverseRelation.type===t.HasMany)return l&&console.warn("Relation=%o: relation is a HasMany, and the reverseRelation is HasMany as well.",this),!1;if(e&&i.keys(e._relations).length){var r=i.find(e._relations,function(e){return e.key===o},this);if(r)return l&&console.warn("Cannot create relation=%o on %o for model=%o: already taken by relation=%o.",this,o,e,r),!1}return!0},setRelated:function(e){this.related=e,this.instance.attributes[this.key]=e},_isReverseRelation:function(e){return e.instance instanceof this.relatedModel&&this.reverseRelation.key===e.key&&this.key===e.reverseRelation.key},getReverseRelations:function(e){for(var t=[],o=i.isUndefined(e)?this.related&&(this.related.models||[this.related]):[e],n=null,s=null,l=0;l<(o||[]).length;l++){n=o[l].getRelations()||[];for(var r=0;r<n.length;r++)s=n[r],this._isReverseRelation(s)&&t.push(s)}return t},destroy:function(){this.stopListening(),this instanceof t.HasOne?this.setRelated(null):this instanceof t.HasMany&&this.setRelated(this._prepareCollection()),i.each(this.getReverseRelations(),function(e){e.removeRelated(this.instance)},this)}}),t.HasOne=t.Relation.extend({options:{reverseRelation:{type:"HasMany"}},initialize:function(e){this.listenTo(this.instance,"relational:change:"+this.key,this.onChange);var t=this.findRelated(e);this.setRelated(t),i.each(this.getReverseRelations(),function(t){t.addRelated(this.instance,e)},this)},findRelated:function(e){var t=null;if(e=i.defaults({parse:this.options.parse},e),this.keyContents instanceof this.relatedModel)t=this.keyContents;else if(this.keyContents||0===this.keyContents){var o=i.defaults({create:this.options.createModels},e);t=this.relatedModel.findOrCreate(this.keyContents,o)}return t&&(this.keyId=null),t},setKeyContents:function(e){this.keyContents=e,this.keyId=t.Relational.store.resolveIdForItem(this.relatedModel,this.keyContents)},onChange:function(e,o,n){if(!this.isLocked()){this.acquire(),n=n?i.clone(n):{};var s=i.isUndefined(n.__related),l=s?this.related:n.__related;if(s){this.setKeyContents(o);var r=this.findRelated(n);this.setRelated(r)}if(l&&this.related!==l&&i.each(this.getReverseRelations(l),function(e){e.removeRelated(this.instance,null,n)},this),i.each(this.getReverseRelations(),function(e){e.addRelated(this.instance,n)},this),!n.silent&&this.related!==l){var a=this;this.changed=!0,t.Relational.eventQueue.add(function(){a.instance.trigger("change:"+a.key,a.instance,a.related,n,!0),a.changed=!1})}this.release()}},tryAddRelated:function(e,t,i){!this.keyId&&0!==this.keyId||e.id!==this.keyId||(this.addRelated(e,i),this.keyId=null)},addRelated:function(e,t){var o=this;e.queue(function(){if(e!==o.related){var n=o.related||null;o.setRelated(e),o.onChange(o.instance,e,i.defaults({__related:n},t))}})},removeRelated:function(e,t,o){if(this.related&&e===this.related){var n=this.related||null;this.setRelated(null),this.onChange(this.instance,e,i.defaults({__related:n},o))}}}),t.HasMany=t.Relation.extend({collectionType:null,options:{reverseRelation:{type:"HasOne"},collectionType:t.Collection,collectionKey:!0,collectionOptions:{}},initialize:function(e){if(this.listenTo(this.instance,"relational:change:"+this.key,this.onChange),this.collectionType=this.options.collectionType,!i.isFunction(this.collectionType)||this.collectionType===t.Collection||this.collectionType.prototype instanceof t.Collection||(this.collectionType=i.result(this,"collectionType")),i.isString(this.collectionType)&&(this.collectionType=t.Relational.store.getObjectByName(this.collectionType)),this.collectionType!==t.Collection&&!(this.collectionType.prototype instanceof t.Collection))throw new Error("`collectionType` must inherit from Backbone.Collection");var o=this.findRelated(e);this.setRelated(o)},_prepareCollection:function(e){if(this.related&&this.stopListening(this.related),!(e&&e instanceof t.Collection)){var o=i.isFunction(this.options.collectionOptions)?this.options.collectionOptions(this.instance):this.options.collectionOptions;e=new this.collectionType(null,o)}if(e.model=this.relatedModel,this.options.collectionKey){var n=this.options.collectionKey===!0?this.options.reverseRelation.key:this.options.collectionKey;e[n]&&e[n]!==this.instance?t.Relational.showWarnings&&"undefined"!=typeof console&&console.warn("Relation=%o; collectionKey=%s already exists on collection=%o",this,n,this.options.collectionKey):n&&(e[n]=this.instance)}return this.listenTo(e,"relational:add",this.handleAddition).listenTo(e,"relational:remove",this.handleRemoval).listenTo(e,"relational:reset",this.handleReset),e},findRelated:function(e){var o=null;if(e=i.defaults({parse:this.options.parse},e),this.keyContents instanceof t.Collection)this._prepareCollection(this.keyContents),o=this.keyContents;else{var n=[];i.each(this.keyContents,function(t){var o=null;o=t instanceof this.relatedModel?t:this.relatedModel.findOrCreate(t,i.extend({merge:!0},e,{create:this.options.createModels})),o&&n.push(o)},this),o=this.related instanceof t.Collection?this.related:this._prepareCollection(),o.set(n,i.defaults({merge:!1,parse:!1},e))}return this.keyIds=i.difference(this.keyIds,i.pluck(o.models,"id")),o},setKeyContents:function(e){this.keyContents=e instanceof t.Collection?e:null,this.keyIds=[],this.keyContents||!e&&0!==e||(this.keyContents=i.isArray(e)?e:[e],i.each(this.keyContents,function(e){var i=t.Relational.store.resolveIdForItem(this.relatedModel,e);(i||0===i)&&this.keyIds.push(i)},this))},onChange:function(e,o,n){n=n?i.clone(n):{},this.setKeyContents(o),this.changed=!1;var s=this.findRelated(n);if(this.setRelated(s),!n.silent){var l=this;t.Relational.eventQueue.add(function(){l.changed&&(l.instance.trigger("change:"+l.key,l.instance,l.related,n,!0),l.changed=!1)})}},handleAddition:function(e,o,n){n=n?i.clone(n):{},this.changed=!0,i.each(this.getReverseRelations(e),function(e){e.addRelated(this.instance,n)},this);var s=this;!n.silent&&t.Relational.eventQueue.add(function(){s.instance.trigger("add:"+s.key,e,s.related,n)})},handleRemoval:function(e,o,n){n=n?i.clone(n):{},this.changed=!0,i.each(this.getReverseRelations(e),function(e){e.removeRelated(this.instance,null,n)},this);var s=this;!n.silent&&t.Relational.eventQueue.add(function(){s.instance.trigger("remove:"+s.key,e,s.related,n)})},handleReset:function(e,o){var n=this;o=o?i.clone(o):{},!o.silent&&t.Relational.eventQueue.add(function(){n.instance.trigger("reset:"+n.key,n.related,o)})},tryAddRelated:function(e,t,o){var n=i.contains(this.keyIds,e.id);n&&(this.addRelated(e,o),this.keyIds=i.without(this.keyIds,e.id))},addRelated:function(e,t){var o=this;e.queue(function(){o.related&&!o.related.get(e)&&o.related.add(e,i.defaults({parse:!1},t))})},removeRelated:function(e,t,i){this.related.get(e)&&this.related.remove(e,i)}}),t.RelationalModel=t.Model.extend({relations:null,_relations:null,_isInitialized:!1,_deferProcessing:!1,_queue:null,_attributeChangeFired:!1,subModelTypeAttribute:"type",subModelTypes:null,constructor:function(e,o){if(o&&o.collection){var n=this,s=this.collection=o.collection;delete o.collection,this._deferProcessing=!0;var l=function(e){e===n&&(n._deferProcessing=!1,n.processQueue(),s.off("relational:add",l))};s.on("relational:add",l),i.defer(function(){l(n)})}t.Relational.store.processOrphanRelations(),t.Relational.store.listenTo(this,"relational:unregister",t.Relational.store.unregister),this._queue=new t.BlockingQueue,this._queue.block(),t.Relational.eventQueue.block();try{t.Model.apply(this,arguments)}finally{t.Relational.eventQueue.unblock()}},trigger:function(e){if(e.length>5&&0===e.indexOf("change")){var i=this,o=arguments;t.Relational.eventQueue.isLocked()?t.Relational.eventQueue.add(function(){var n=!0;if("change"===e)n=i.hasChanged()||i._attributeChangeFired,i._attributeChangeFired=!1;else{var s=e.slice(7),l=i.getRelation(s);l?(n=o[4]===!0,n?i.changed[s]=o[2]:l.changed||delete i.changed[s]):n&&(i._attributeChangeFired=!0)}n&&t.Model.prototype.trigger.apply(i,o)}):t.Model.prototype.trigger.apply(i,o)}else"destroy"===e?(t.Model.prototype.trigger.apply(this,arguments),t.Relational.store.unregister(this)):t.Model.prototype.trigger.apply(this,arguments);return this},initializeRelations:function(e){this.acquire(),this._relations={},i.each(this.relations||[],function(i){t.Relational.store.initializeRelation(this,i,e)},this),this._isInitialized=!0,this.release(),this.processQueue()},updateRelations:function(e,t){this._isInitialized&&!this.isLocked()&&i.each(this._relations,function(i){if(!e||i.keySource in e||i.key in e){var o=this.attributes[i.keySource]||this.attributes[i.key],n=e&&(e[i.keySource]||e[i.key]);(i.related!==o||null===o&&null===n)&&this.trigger("relational:change:"+i.key,this,o,t||{})}i.keySource!==i.key&&delete this.attributes[i.keySource]},this)},queue:function(e){this._queue.add(e)},processQueue:function(){this._isInitialized&&!this._deferProcessing&&this._queue.isBlocked()&&this._queue.unblock()},getRelation:function(e){return this._relations[e]},getRelations:function(){return i.values(this._relations)},getIdsToFetch:function(e,o){var n=e instanceof t.Relation?e:this.getRelation(e),s=n?n.keyIds&&n.keyIds.slice(0)||(n.keyId||0===n.keyId?[n.keyId]:[]):[];if(o){var l=n.related&&(n.related.models||[n.related]);i.each(l,function(e){(e.id||0===e.id)&&s.push(e.id)})}return s},getAsync:function(e,o){o=i.extend({add:!0,remove:!1,refresh:!1},o);var n=this,s=[],l=this.getRelation(e),r=l&&this.getIdsToFetch(l,o.refresh),a=l.related instanceof t.Collection?l.related:l.relatedCollection;if(r&&r.length){var h,c=[],d=[],u=function(){c=i.map(r,function(e){var t=l.relatedModel.findModel(e);if(!t){var i={};i[l.relatedModel.prototype.idAttribute]=e,t=l.relatedModel.findOrCreate(i,o),d.push(t)}return t},this)};if(a instanceof t.Collection&&i.isFunction(a.url)){var p=a.url();h=a.url(r),h===p&&(u(),h=a.url(c),h===p&&(h=null))}if(h){var f=i.defaults({error:function(){i.each(d,function(e){e.trigger("destroy",e,e.collection,o)}),o.error&&o.error.apply(c,arguments)},url:h},o);s=[a.fetch(f)]}else c.length||u(),s=i.map(c,function(e){var t=i.defaults({error:function(){i.contains(d,e)&&e.trigger("destroy",e,e.collection,o),o.error&&o.error.apply(c,arguments)}},o);return e.fetch(t)},this)}return $.when.apply(null,s).then(function(){return t.Model.prototype.get.call(n,e)})},set:function(e,o,n){t.Relational.eventQueue.block();var s,l;i.isObject(e)||null==e?(s=e,n=o):(s={},s[e]=o);try{var r=this.id,a=s&&this.idAttribute in s&&s[this.idAttribute];t.Relational.store.checkId(this,a),l=t.Model.prototype.set.apply(this,arguments),this._isInitialized||this.isLocked()?a&&a!==r&&t.Relational.store.update(this):(this.constructor.initializeModelHierarchy(),(a||0===a)&&t.Relational.store.register(this),this.initializeRelations(n)),s&&this.updateRelations(s,n)}finally{t.Relational.eventQueue.unblock()}return l},clone:function(){var e=i.clone(this.attributes);return i.isUndefined(e[this.idAttribute])||(e[this.idAttribute]=null),i.each(this.getRelations(),function(t){delete e[t.key]}),new this.constructor(e)},toJSON:function(e){if(this.isLocked())return this.id;this.acquire();var o=t.Model.prototype.toJSON.call(this,e);return!this.constructor._superModel||this.constructor._subModelTypeAttribute in o||(o[this.constructor._subModelTypeAttribute]=this.constructor._subModelTypeValue),i.each(this._relations,function(n){var s=o[n.key],l=n.options.includeInJSON,r=null;l===!0?s&&i.isFunction(s.toJSON)&&(r=s.toJSON(e)):i.isString(l)?(s instanceof t.Collection?r=s.pluck(l):s instanceof t.Model&&(r=s.get(l)),l===n.relatedModel.prototype.idAttribute&&(n instanceof t.HasMany?r=r.concat(n.keyIds):n instanceof t.HasOne&&(r=r||n.keyId,r||i.isObject(n.keyContents)||(r=n.keyContents||null)))):i.isArray(l)?s instanceof t.Collection?(r=[],s.each(function(e){var t={};i.each(l,function(i){t[i]=e.get(i)}),r.push(t)})):s instanceof t.Model&&(r={},i.each(l,function(e){r[e]=s.get(e)})):delete o[n.key],null===r&&e&&e.wait&&(r=s),l&&(o[n.keyDestination]=r),n.keyDestination!==n.key&&delete o[n.key]}),this.release(),o}},{setup:function(){return this.prototype.relations=(this.prototype.relations||[]).slice(0),this._subModels={},this._superModel=null,this.prototype.hasOwnProperty("subModelTypes")?t.Relational.store.addSubModels(this.prototype.subModelTypes,this):this.prototype.subModelTypes=null,i.each(this.prototype.relations||[],function(e){if(e.model||(e.model=this),e.reverseRelation&&e.model===this){var o=!0;if(i.isString(e.relatedModel)){var n=t.Relational.store.getObjectByName(e.relatedModel);o=n&&n.prototype instanceof t.RelationalModel}o?t.Relational.store.initializeRelation(null,e):i.isString(e.relatedModel)&&t.Relational.store.addOrphanRelation(e)}},this),this},build:function(e,t){this.initializeModelHierarchy();var i=this._findSubModelType(this,e)||this;return new i(e,t)},_findSubModelType:function(e,t){if(e._subModels&&e.prototype.subModelTypeAttribute in t){var i=t[e.prototype.subModelTypeAttribute],o=e._subModels[i];if(o)return o;for(i in e._subModels)if(o=this._findSubModelType(e._subModels[i],t))return o}return null},initializeModelHierarchy:function(){if(this.inheritRelations(),this.prototype.subModelTypes){var e=i.keys(this._subModels),o=i.omit(this.prototype.subModelTypes,e);i.each(o,function(e){var i=t.Relational.store.getObjectByName(e);i&&i.initializeModelHierarchy()})}},inheritRelations:function(){if(i.isUndefined(this._superModel)||i.isNull(this._superModel))if(t.Relational.store.setupSuperModel(this),this._superModel){if(this._superModel.inheritRelations(),this._superModel.prototype.relations){var e=i.filter(this._superModel.prototype.relations||[],function(e){return!i.any(this.prototype.relations||[],function(t){return e.relatedModel===t.relatedModel&&e.key===t.key},this)},this);this.prototype.relations=e.concat(this.prototype.relations)}}else this._superModel=!1},findOrCreate:function(e,t){t||(t={});var o=i.isObject(e)&&t.parse&&this.prototype.parse?this.prototype.parse(i.clone(e)):e,n=this.findModel(o);return i.isObject(e)&&(n&&t.merge!==!1?(delete t.collection,delete t.url,n.set(o,t)):n||t.create===!1||(n=this.build(o,i.defaults({parse:!1},t)))),n},find:function(e,t){return t||(t={}),t.create=!1,this.findOrCreate(e,t)},findModel:function(e){return t.Relational.store.find(this,e)}}),i.extend(t.RelationalModel.prototype,t.Semaphore),t.Collection.prototype.__prepareModel=t.Collection.prototype._prepareModel,t.Collection.prototype._prepareModel=function(e,o){var n;return e instanceof t.Model?(e.collection||(e.collection=this),n=e):(o=o?i.clone(o):{},o.collection=this,n="undefined"!=typeof this.model.findOrCreate?this.model.findOrCreate(e,o):new this.model(e,o),n&&n.validationError&&(this.trigger("invalid",this,e,o),n=!1)),n};var o=t.Collection.prototype.__set=t.Collection.prototype.set;t.Collection.prototype.set=function(e,n){if(!(this.model.prototype instanceof t.RelationalModel))return o.call(this,e,n);n&&n.parse&&(e=this.parse(e,n));var s=!i.isArray(e),l=[],r=[],a=null;e=s?e?[e]:[]:i.clone(e);for(var h=0;h<e.length;h++)a=e[h],a instanceof t.Model||(a=t.Collection.prototype._prepareModel.call(this,a,n)),a&&(r.push(a),this.get(a)||this.get(a.cid)?null!==a.id&&void 0!==a.id&&(this._byId[a.id]=a):l.push(a));r=s?r.length?r[0]:null:r;var c=o.call(this,r,i.defaults({merge:!1,parse:!1},n));for(h=0;h<l.length;h++)a=l[h],(this.get(a)||this.get(a.cid))&&this.trigger("relational:add",a,this,n);return c};var n=t.Collection.prototype.__remove=t.Collection.prototype.remove;t.Collection.prototype.remove=function(e,o){if(!(this.model.prototype instanceof t.RelationalModel))return n.call(this,e,o);var s=!i.isArray(e),l=[];e=s?e?[e]:[]:i.clone(e),o||(o={}),i.each(e,function(e){e=this.get(e)||e&&this.get(e.cid),e&&l.push(e)},this);var r=n.call(this,s?l.length?l[0]:null:l,o);return i.each(l,function(e){this.trigger("relational:remove",e,this,o)},this),r};var s=t.Collection.prototype.__reset=t.Collection.prototype.reset;t.Collection.prototype.reset=function(e,o){o=i.extend({merge:!0},o);var n=s.call(this,e,o);return this.model.prototype instanceof t.RelationalModel&&this.trigger("relational:reset",this,o),n};var l=t.Collection.prototype.__sort=t.Collection.prototype.sort;t.Collection.prototype.sort=function(e){var i=l.call(this,e);return this.model.prototype instanceof t.RelationalModel&&this.trigger("relational:reset",this,e),i};var r=t.Collection.prototype.__trigger=t.Collection.prototype.trigger;t.Collection.prototype.trigger=function(e){if(!(this.model.prototype instanceof t.RelationalModel))return r.apply(this,arguments);if("add"===e||"remove"===e||"reset"===e||"sort"===e){var o=this,n=arguments;i.isObject(n[3])&&(n=i.toArray(n),n[3]=i.clone(n[3])),t.Relational.eventQueue.add(function(){r.apply(o,n)})}else r.apply(this,arguments);return this},t.RelationalModel.extend=function(e,i){var o=t.Model.extend.call(this,e,i);return o.setup(this),o}});

(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},b={}.hasOwnProperty,c=function(a,c){function d(){this.constructor=a}for(var e in c)b.call(c,e)&&(a[e]=c[e]);return d.prototype=c.prototype,a.prototype=new d,a.__super__=c.prototype,a};!function(a){return"function"==typeof define&&define.amd?define(["underscore","backbone","backbone.marionette","exports"],a):"object"==typeof exports?a(require("underscore"),require("backbone"),require("backbone.marionette"),exports):a(_,Backbone,Backbone.Marionette,{})}(function(b,d,e,f){return f=function(f){function g(){return this.destroy=a(this.destroy,this),g.__super__.constructor.apply(this,arguments)}return c(g,f),g.prototype.modals=[],g.prototype.zIndex=0,g.prototype.show=function(a,c){var f,g,h,i,j,k,l,m,n;for(null==c&&(c={}),this._ensureElement(),d.$("body").css({overflow:"hidden"}),this.modals.length>0&&(f=b.last(this.modals),f.modalEl.addClass(""+f.prefix+"-view--stacked"),h=this.modals[this.modals.length-1],null!=h&&h.modalEl.removeClass(""+h.prefix+"-modal--stacked-reverse")),a.render(c),a.regionEnabled=!0,this.triggerMethod("before:swap",a),this.triggerMethod("before:show",a),e.triggerMethodOn(a,"before:show"),this.triggerMethod("swapOut",this.currentView),this.$el.append(a.el),this.currentView=a,this.triggerMethod("swap",a),this.triggerMethod("show",a),e.triggerMethodOn(a,"show"),m=this.modals,i=0,k=m.length;k>i;i++)g=m[i],g.undelegateModalEvents();for(n=this.modals,j=0,l=n.length;l>j;j++)g=n[j],g.$el.css({background:"none"});return a.on("modal:destroy",this.destroy),this.modals.push(a),this.zIndex++},g.prototype.destroy=function(){var a,c;return(c=this.currentView)?(c.destroy&&!c.isDestroyed?c.destroy():c.remove&&c.remove(),c.off("modal:destroy",this.destroy),this.modals.splice(b.indexOf(this.modals,c),1),this.zIndex--,this.currentView=this.modals[this.zIndex-1],a=b.last(this.modals),a&&(a.$el.removeAttr("style"),a.modalEl.addClass(""+a.prefix+"-modal--stacked-reverse"),b.delay(function(){return function(){return a.modalEl.removeClass(""+a.prefix+"-modal--stacked")}}(this),300),0!==this.zIndex&&a.delegateModalEvents()),0===this.zIndex&&d.$("body").css({overflow:"visible"}),this.triggerMethod("modal:destroy",c)):void 0},g.prototype.destroyAll=function(){var a,b,c,d,e;for(d=this.modals,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(this.destroy());return e},g}(e.Region),e.Modals=f,e.Modals})}).call(this);
(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},b={}.hasOwnProperty,c=function(a,c){function d(){this.constructor=a}for(var e in c)b.call(c,e)&&(a[e]=c[e]);return d.prototype=c.prototype,a.prototype=new d,a.__super__=c.prototype,a},d=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};!function(a){return"function"==typeof define&&define.amd?define(["underscore","backbone","exports"],a):"object"==typeof exports?a(require("underscore"),require("backbone"),exports):a(_,Backbone,{})}(function(b,e,f){return f=function(f){function g(){this.triggerCancel=a(this.triggerCancel,this),this.triggerSubmit=a(this.triggerSubmit,this),this.triggerView=a(this.triggerView,this),this.clickOutside=a(this.clickOutside,this),this.checkKey=a(this.checkKey,this),this.rendererCompleted=a(this.rendererCompleted,this),this.args=Array.prototype.slice.apply(arguments),e.View.prototype.constructor.apply(this,this.args),this.setUIElements()}return c(g,f),g.prototype.prefix="bbm",g.prototype.animate=!0,g.prototype.keyControl=!0,g.prototype.showViewOnRender=!0,g.prototype.render=function(a){var c,d;return c=this.serializeData(),(!a||b.isEmpty(a))&&(a=0),this.$el.addClass(""+this.prefix+"-wrapper"),this.modalEl=e.$("<div />").addClass(""+this.prefix+"-modal"),this.template&&this.modalEl.html(this.template(c)),this.$el.html(this.modalEl),this.viewContainer?(this.viewContainerEl=this.modalEl.find(this.viewContainer),this.viewContainerEl.addClass(""+this.prefix+"-modal__views")):this.viewContainerEl=this.modalEl,$(":focus").blur(),(null!=(d=this.views)?d.length:void 0)>0&&this.showViewOnRender&&this.openAt(a),"function"==typeof this.onRender&&this.onRender(),this.delegateModalEvents(),this.trigger("modal:open"),this.$el.fadeIn&&this.animate?(this.modalEl.css({opacity:0}),this.$el.fadeIn({duration:100,complete:this.rendererCompleted})):this.rendererCompleted(),this},g.prototype.rendererCompleted=function(){var a;return this.keyControl&&(e.$("body").on("keyup",this.checkKey),e.$("body").on("click",this.clickOutside)),this.modalEl.css({opacity:1}).addClass(""+this.prefix+"-modal--open"),"function"==typeof this.onShow&&this.onShow(),null!=(a=this.currentView)&&"function"==typeof a.onShow?a.onShow():void 0},g.prototype.setUIElements=function(){var a;if(this.template=this.getOption("template"),this.views=this.getOption("views"),null!=(a=this.views)&&(a.length=b.size(this.views)),this.viewContainer=this.getOption("viewContainer"),this.animate=this.getOption("animate"),b.isUndefined(this.template)&&b.isUndefined(this.views))throw new Error("No template or views defined for Backbone.Modal");if(this.template&&this.views&&b.isUndefined(this.viewContainer))throw new Error("No viewContainer defined for Backbone.Modal")},g.prototype.getOption=function(a){return a?this.options&&d.call(this.options,a)>=0&&null!=this.options[a]?this.options[a]:this[a]:void 0},g.prototype.serializeData=function(){var a;return a={},this.model&&(a=b.extend(a,this.model.toJSON())),this.collection&&(a=b.extend(a,{items:this.collection.toJSON()})),a},g.prototype.delegateModalEvents=function(){var a,c,d,e,f,g,h;this.active=!0,a=this.getOption("cancelEl"),f=this.getOption("submitEl"),f&&this.$el.on("click",f,this.triggerSubmit),a&&this.$el.on("click",a,this.triggerCancel),h=[];for(c in this.views)b.isString(c)&&"length"!==c?(d=c.match(/^(\S+)\s*(.*)$/),g=d[1],e=d[2],h.push(this.$el.on(g,e,this.views[c],this.triggerView))):h.push(void 0);return h},g.prototype.undelegateModalEvents=function(){var a,c,d,e,f,g,h;this.active=!1,a=this.getOption("cancelEl"),f=this.getOption("submitEl"),f&&this.$el.off("click",f,this.triggerSubmit),a&&this.$el.off("click",a,this.triggerCancel),h=[];for(c in this.views)b.isString(c)&&"length"!==c?(d=c.match(/^(\S+)\s*(.*)$/),g=d[1],e=d[2],h.push(this.$el.off(g,e,this.views[c],this.triggerView))):h.push(void 0);return h},g.prototype.checkKey=function(a){if(this.active)switch(a.keyCode){case 27:return this.triggerCancel(a);case 13:return this.triggerSubmit(a)}},g.prototype.clickOutside=function(a){return e.$(a.target).hasClass(""+this.prefix+"-wrapper")&&this.active?this.triggerCancel():void 0},g.prototype.buildView=function(a,c){var d;if(a)return c&&b.isFunction(c)&&(c=c()),b.isFunction(a)?(d=new a(c||this.args[0]),d instanceof e.View?{el:d.render().$el,view:d}:{el:a(c||this.args[0])}):{view:a,el:a.$el}},g.prototype.triggerView=function(a){var c,d,e,f,g,h,i;if(null!=a&&"function"==typeof a.preventDefault&&a.preventDefault(),f=a.data,d=this.buildView(f.view,f.viewOptions),this.currentView&&(this.previousView=this.currentView,!(null!=(i=f.openOptions)?i.skipSubmit:void 0))){if(("function"==typeof(g=this.previousView).beforeSubmit?g.beforeSubmit():void 0)===!1)return;"function"==typeof(h=this.previousView).submit&&h.submit()}this.currentView=d.view||d.el,c=0;for(e in this.views)f.view===this.views[e].view&&(this.currentIndex=c),c++;return f.onActive&&(b.isFunction(f.onActive)?f.onActive(this):b.isString(f.onActive)&&this[f.onActive].call(this,f)),this.shouldAnimate?this.animateToView(d.el):(this.shouldAnimate=!0,this.$(this.viewContainerEl).html(d.el))},g.prototype.animateToView=function(a){var b,c,d,f,g,h,i;return f={position:"relative",top:-9999,left:-9999},g=e.$("<tester/>").css(f),g.html(this.$el.clone().css(f)),0!==e.$("tester").length?e.$("tester").replaceWith(g):e.$("body").append(g),b=g.find(this.viewContainer?this.viewContainer:"."+this.prefix+"-modal"),b.removeAttr("style"),d=b.outerHeight(),b.html(a),c=b.outerHeight(),d===c?(this.$(this.viewContainerEl).html(a),"function"==typeof(h=this.currentView).onShow&&h.onShow(),null!=(i=this.previousView)&&"function"==typeof i.destroy?i.destroy():void 0):this.animate?(this.$(this.viewContainerEl).css({opacity:0}),this.$(this.viewContainerEl).animate({height:c},100,function(b){return function(){var c,d;return b.$(b.viewContainerEl).css({opacity:1}).removeAttr("style"),b.$(b.viewContainerEl).html(a),"function"==typeof(c=b.currentView).onShow&&c.onShow(),null!=(d=b.previousView)&&"function"==typeof d.destroy?d.destroy():void 0}}(this))):this.$(this.viewContainerEl).css({height:c}).html(a)},g.prototype.triggerSubmit=function(a){var b,c;return null!=a&&a.preventDefault(),this.beforeSubmit&&this.beforeSubmit()===!1||this.currentView&&this.currentView.beforeSubmit&&this.currentView.beforeSubmit()===!1?void 0:this.submit||(null!=(b=this.currentView)?b.submit:void 0)||this.getOption("submitEl")?(null!=(c=this.currentView)&&"function"==typeof c.submit&&c.submit(),"function"==typeof this.submit&&this.submit(),this.regionEnabled?this.trigger("modal:destroy"):this.destroy()):this.triggerCancel()},g.prototype.triggerCancel=function(a){return null!=a&&a.preventDefault(),this.beforeCancel&&this.beforeCancel()===!1?void 0:("function"==typeof this.cancel&&this.cancel(),this.regionEnabled?this.trigger("modal:destroy"):this.destroy())},g.prototype.destroy=function(){var a;return e.$("body").off("keyup",this.checkKey),e.$("body").off("click",this.clickOutside),"function"==typeof this.onDestroy&&this.onDestroy(),this.shouldAnimate=!1,this.modalEl.addClass(""+this.prefix+"-modal--destroy"),a=function(a){return function(){var b;return null!=(b=a.currentView)&&"function"==typeof b.remove&&b.remove(),a.remove()}}(this),this.$el.fadeOut&&this.animate?(this.$el.fadeOut({duration:200}),b.delay(function(){return a()},200)):a()},g.prototype.openAt=function(a){var c,d,e,f,g;b.isNumber(a)?c=a:b.isNumber(a._index)&&(c=a._index),e=0;for(f in this.views)if("length"!==f)if(b.isNumber(c))e===c&&(g=this.views[f]),e++;else if(b.isObject(a))for(d in this.views[f])a[d]===this.views[f][d]&&(g=this.views[f]);return g&&(this.currentIndex=b.indexOf(this.views,g),this.triggerView({data:b.extend(g,{openOptions:a})})),this},g.prototype.next=function(a){return null==a&&(a={}),this.currentIndex+1<this.views.length?this.openAt(b.extend(a,{_index:this.currentIndex+1})):void 0},g.prototype.previous=function(a){return null==a&&(a={}),this.currentIndex-1<this.views.length-1?this.openAt(b.extend(a,{_index:this.currentIndex-1})):void 0},g}(e.View),e.Modal=f,e.Modal})}).call(this);
/*! BigText - v0.1.8 - 2015-02-28
 * https://github.com/zachleat/bigtext
 * Copyright (c) 2015 Zach Leatherman (@zachleat)
 * MIT License */

(function(window, $) {
  "use strict";

  var counter = 0,
    $headCache = $('head'),
    oldBigText = window.BigText,
    oldjQueryMethod = $.fn.bigtext,
    BigText = {
      DEBUG_MODE: false,
      DEFAULT_MIN_FONT_SIZE_PX: null,
      DEFAULT_MAX_FONT_SIZE_PX: 528,
      GLOBAL_STYLE_ID: 'bigtext-style',
      STYLE_ID: 'bigtext-id',
      LINE_CLASS_PREFIX: 'bigtext-line',
      EXEMPT_CLASS: 'bigtext-exempt',
      noConflict: function(restore)
      {
        if(restore) {
          $.fn.bigtext = oldjQueryMethod;
          window.BigText = oldBigText;
        }
        return BigText;
      },
      supports: {
        wholeNumberFontSizeOnly: (function() {
          if( !( 'getComputedStyle' in window ) ) {
            return true;
          }
          var test = $('<div/>').css({
              position: 'absolute',
              'font-size': '14.1px'
            }).insertBefore( $('script').eq(0) ),
            computedStyle = window.getComputedStyle( test[0], null );

          var ret = computedStyle && computedStyle.getPropertyValue( 'font-size' ) === '14px';
          test.remove();
          return ret;
        })()
      },
      init: function() {
        if(!$('#'+BigText.GLOBAL_STYLE_ID).length) {
          $headCache.append(BigText.generateStyleTag(BigText.GLOBAL_STYLE_ID, ['.bigtext * { white-space: nowrap; } .bigtext > * { display: block; }',
                                          '.bigtext .' + BigText.EXEMPT_CLASS + ', .bigtext .' + BigText.EXEMPT_CLASS + ' * { white-space: normal; }']));
        }
      },
      bindResize: function(eventName, resizeFunction) {
        var timeoutId;
        $(window).unbind(eventName).bind(eventName, function() {
          if( timeoutId ) {
            clearTimeout( timeoutId );
          }
          timeoutId = setTimeout( resizeFunction, 100 );
        });
      },
      getStyleId: function(id)
      {
        return BigText.STYLE_ID + '-' + id;
      },
      generateStyleTag: function(id, css)
      {
        return $('<style>' + css.join('\n') + '</style>').attr('id', id);
      },
      clearCss: function(id)
      {
        var styleId = BigText.getStyleId(id);
        $('#' + styleId).remove();
      },
      generateCss: function(id, linesFontSizes, lineWordSpacings, minFontSizes)
      {
        var css = [];

        BigText.clearCss(id);

        for(var j=0, k=linesFontSizes.length; j<k; j++) {
          css.push('#' + id + ' .' + BigText.LINE_CLASS_PREFIX + j + ' {' +
            (minFontSizes[j] ? ' white-space: normal;' : '') +
            (linesFontSizes[j] ? ' font-size: ' + linesFontSizes[j] + 'px;' : '') +
            (lineWordSpacings[j] ? ' word-spacing: ' + lineWordSpacings[j] + 'px;' : '') +
            '}');
        }

        return BigText.generateStyleTag(BigText.getStyleId(id), css);
      },
      jQueryMethod: function(options)
      {
        BigText.init();

        options = $.extend({
          minfontsize: BigText.DEFAULT_MIN_FONT_SIZE_PX,
          maxfontsize: BigText.DEFAULT_MAX_FONT_SIZE_PX,
          childSelector: '',
          resize: true
        }, options || {});

        this.each(function()
        {
          var $t = $(this).addClass('bigtext'),
            maxWidth = $t.width(),
            id = $t.attr('id'),
            $children = options.childSelector ? $t.find( options.childSelector ) : $t.children();

          if(!id) {
            id = 'bigtext-id' + (counter++);
            $t.attr('id', id);
          }

          if(options.resize) {
            BigText.bindResize('resize.bigtext-event-' + id, function()
            {
              // TODO only call this if the width has changed.
              BigText.jQueryMethod.call($('#' + id), options);
            });
          }

          BigText.clearCss(id);

          $children.addClass(function(lineNumber, className)
          {
            // remove existing line classes.
            return [className.replace(new RegExp('\\b' + BigText.LINE_CLASS_PREFIX + '\\d+\\b'), ''),
                BigText.LINE_CLASS_PREFIX + lineNumber].join(' ');
          });

          var sizes = calculateSizes($t, $children, maxWidth, options.maxfontsize, options.minfontsize);
          $headCache.append(BigText.generateCss(id, sizes.fontSizes, sizes.wordSpacings, sizes.minFontSizes));
        });

        return this.trigger('bigtext:complete');
      }
    };

  function testLineDimensions($line, maxWidth, property, size, interval, units, previousWidth)
  {
    var width;
    previousWidth = typeof previousWidth === 'number' ? previousWidth : 0;
    $line.css(property, size + units);

    width = $line.width();

    if(width >= maxWidth) {
// console.log(width, ' previous: ' + previousWidth, property + ' at ' + interval, 'prior: ' + (parseFloat(size) - interval), 'new:' + parseFloat(size));
      $line.css(property, '');

      if(width === maxWidth) {
        return {
          match: 'exact',
          size: parseFloat((parseFloat(size) - 0.1).toFixed(3))
        };
      }

      // Since this is an estimate, we calculate how far over the width we went with the new value.
      // If this is word-spacing (our last resort guess) and the over is less than the under, we keep the higher value.
      // Otherwise, we revert to the underestimate.
      var under = maxWidth - previousWidth,
        over = width - maxWidth;

      return {
        match: 'estimate',
        size: parseFloat((parseFloat(size) - (property === 'word-spacing' && previousWidth && ( over < under ) ? 0 : interval)).toFixed(3))
      };
    }

    return width;
  }

  function calculateSizes($t, $children, maxWidth, maxFontSize, minFontSize)
  {
    var $c = $t.clone(true)
      .addClass('bigtext-cloned')
      .css({
        fontFamily: $t.css('font-family'),
        textTransform: $t.css('text-transform'),
        wordSpacing: $t.css('word-spacing'),
        letterSpacing: $t.css('letter-spacing'),
        position: 'absolute',
        left: BigText.DEBUG_MODE ? 0 : -9999,
        top: BigText.DEBUG_MODE ? 0 : -9999
      })
      .appendTo(document.body);

    // font-size isn't the only thing we can modify, we can also mess with:
    // word-spacing and letter-spacing. WebKit does not respect subpixel
    // letter-spacing, word-spacing, or font-size.
    // TODO try -webkit-transform: scale() as a workaround.
    var fontSizes = [],
      wordSpacings = [],
      minFontSizes = [],
      ratios = [];

    $children.css('float', 'left').each(function() {
      var $line = $(this),
        // TODO replace 8, 4 with a proportional size to the calculated font-size.
        intervals = BigText.supports.wholeNumberFontSizeOnly ? [8, 4, 1] : [8, 4, 1, 0.1],
        lineMax,
        newFontSize;

      if($line.hasClass(BigText.EXEMPT_CLASS)) {
        fontSizes.push(null);
        ratios.push(null);
        minFontSizes.push(false);
        return;
      }

      // TODO we can cache this ratio?
      var autoGuessSubtraction = 32, // font size in px
        currentFontSize = parseFloat($line.css('font-size')),
        ratio = ( $line.width() / currentFontSize ).toFixed(6);

      newFontSize = parseInt( maxWidth / ratio, 10 ) - autoGuessSubtraction;

      outer: for(var m=0, n=intervals.length; m<n; m++) {
        inner: for(var j=1, k=10; j<=k; j++) {
          if(newFontSize + j*intervals[m] > maxFontSize) {
            newFontSize = maxFontSize;
            break outer;
          }

          lineMax = testLineDimensions($line, maxWidth, 'font-size', newFontSize + j*intervals[m], intervals[m], 'px', lineMax);
          if(typeof lineMax !== 'number') {
            newFontSize = lineMax.size;

            if(lineMax.match === 'exact') {
              break outer;
            }
            break inner;
          }
        }
      }

      ratios.push(maxWidth / newFontSize);

      if(newFontSize > maxFontSize) {
        fontSizes.push(maxFontSize);
        minFontSizes.push(false);
      } else if(!!minFontSize && newFontSize < minFontSize) {
        fontSizes.push(minFontSize);
        minFontSizes.push(true);
      } else {
        fontSizes.push(newFontSize);
        minFontSizes.push(false);
      }
    }).each(function(lineNumber) {
      var $line = $(this),
        wordSpacing = 0,
        interval = 1,
        maxWordSpacing;

      if($line.hasClass(BigText.EXEMPT_CLASS)) {
        wordSpacings.push(null);
        return;
      }

      // must re-use font-size, even though it was removed above.
      $line.css('font-size', fontSizes[lineNumber] + 'px');

      for(var m=1, n=3; m<n; m+=interval) {
        maxWordSpacing = testLineDimensions($line, maxWidth, 'word-spacing', m, interval, 'px', maxWordSpacing);
        if(typeof maxWordSpacing !== 'number') {
          wordSpacing = maxWordSpacing.size;
          break;
        }
      }

      $line.css('font-size', '');
      wordSpacings.push(wordSpacing);
    }).removeAttr('style');

    if( !BigText.DEBUG_MODE ) {
      $c.remove();
    } else {
      $c.css({
        'background-color': 'rgba(255,255,255,.4)'
      });
    }

    return {
      fontSizes: fontSizes,
      wordSpacings: wordSpacings,
      ratios: ratios,
      minFontSizes: minFontSizes
    };
  }

  $.fn.bigtext = BigText.jQueryMethod;
  window.BigText = BigText;

})(this, jQuery);

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):a(jQuery)}(function(a){function b(a){return h.raw?a:encodeURIComponent(a)}function c(a){return h.raw?a:decodeURIComponent(a)}function d(a){return b(h.json?JSON.stringify(a):String(a))}function e(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return a=decodeURIComponent(a.replace(g," ")),h.json?JSON.parse(a):a}catch(b){}}function f(b,c){var d=h.raw?b:e(b);return a.isFunction(c)?c(d):d}var g=/\+/g,h=a.cookie=function(e,g,i){if(void 0!==g&&!a.isFunction(g)){if(i=a.extend({},h.defaults,i),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setTime(+k+864e5*j)}return document.cookie=[b(e),"=",d(g),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=e?void 0:{},m=document.cookie?document.cookie.split("; "):[],n=0,o=m.length;o>n;n++){var p=m[n].split("="),q=c(p.shift()),r=p.join("=");if(e&&e===q){l=f(r,g);break}e||void 0===(r=f(r))||(l[q]=r)}return l};h.defaults={},a.removeCookie=function(b,c){return void 0===a.cookie(b)?!1:(a.cookie(b,"",a.extend({},c,{expires:-1})),!a.cookie(b))}});

/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );
