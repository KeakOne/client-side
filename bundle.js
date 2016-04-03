(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var xhr=require("xhr"),example=require("./views/homeview.hbs"),app=require("express"),cats=require("./json-cats/routes/cats.js"),tx="b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da",query="https://api.wheretheiss.at/v1/satellites/25544";xhr.get(query,function(e,s){e&&console.log(e),console.log(s.body),document.body.innerHTML=example({name:"fluffy"})}),app.use("/v1/cats",cats),app.use(function(e,s,a){var r=new Error("Not Found");r.status=404,a(r)});
},{"./json-cats/routes/cats.js":65,"./views/homeview.hbs":301,"express":163,"xhr":298}],2:[function(require,module,exports){
"use strict";function Accepts(t){return this instanceof Accepts?(this.headers=t.headers,void(this.negotiator=new Negotiator(t))):new Accepts(t)}function extToMime(t){return-1===t.indexOf("/")?mime.lookup(t):t}function validMime(t){return"string"==typeof t}var Negotiator=require("negotiator"),mime=require("mime-types");module.exports=Accepts,Accepts.prototype.type=Accepts.prototype.types=function(t){var e=t;if(e&&!Array.isArray(e)){e=new Array(arguments.length);for(var r=0;r<e.length;r++)e[r]=arguments[r]}if(!e||0===e.length)return this.negotiator.mediaTypes();if(!this.headers.accept)return e[0];var n=e.map(extToMime),o=this.negotiator.mediaTypes(n.filter(validMime)),i=o[0];return i?e[n.indexOf(i)]:!1},Accepts.prototype.encoding=Accepts.prototype.encodings=function(t){var e=t;if(e&&!Array.isArray(e)){e=new Array(arguments.length);for(var r=0;r<e.length;r++)e[r]=arguments[r]}return e&&0!==e.length?this.negotiator.encodings(e)[0]||!1:this.negotiator.encodings()},Accepts.prototype.charset=Accepts.prototype.charsets=function(t){var e=t;if(e&&!Array.isArray(e)){e=new Array(arguments.length);for(var r=0;r<e.length;r++)e[r]=arguments[r]}return e&&0!==e.length?this.negotiator.charsets(e)[0]||!1:this.negotiator.charsets()},Accepts.prototype.lang=Accepts.prototype.langs=Accepts.prototype.language=Accepts.prototype.languages=function(t){var e=t;if(e&&!Array.isArray(e)){e=new Array(arguments.length);for(var r=0;r<e.length;r++)e[r]=arguments[r]}return e&&0!==e.length?this.negotiator.languages(e)[0]||!1:this.negotiator.languages()};

},{"mime-types":38,"negotiator":42}],3:[function(require,module,exports){
"use strict";function flattenWithDepth(t,r,e){for(var a=0;a<t.length;a++){var n=t[a];e>0&&Array.isArray(n)?flattenWithDepth(n,r,e-1):r.push(n)}return r}function flattenForever(t,r){for(var e=0;e<t.length;e++){var a=t[e];Array.isArray(a)?flattenForever(a,r):r.push(a)}return r}function arrayFlatten(t,r){return null==r?flattenForever(t,[]):flattenWithDepth(t,[],r)}module.exports=arrayFlatten;

},{}],4:[function(require,module,exports){
(function (Buffer){
"use strict";function contentDisposition(e,t){var r=t||{},n=r.type||"attachment",a=createparams(e,r.fallback);return format(new ContentDisposition(n,a))}function createparams(e,t){if(void 0!==e){var r={};if("string"!=typeof e)throw new TypeError("filename must be a string");if(void 0===t&&(t=!0),"string"!=typeof t&&"boolean"!=typeof t)throw new TypeError("fallback must be a string or boolean");if("string"==typeof t&&nonLatin1RegExp.test(t))throw new TypeError("fallback must be ISO-8859-1 string");var n=basename(e),a=textRegExp.test(n),o="string"!=typeof t?t&&getlatin1(n):basename(t),i="string"==typeof o&&o!==n;return(i||!a||hexEscapeRegExp.test(n))&&(r["filename*"]=n),(a||i)&&(r.filename=i?o:n),r}}function format(e){var t=e.parameters,r=e.type;if(!r||"string"!=typeof r||!tokenRegExp.test(r))throw new TypeError("invalid type");var n=String(r).toLowerCase();if(t&&"object"==typeof t)for(var a,o=Object.keys(t).sort(),i=0;i<o.length;i++){a=o[i];var p="*"===a.substr(-1)?ustring(t[a]):qstring(t[a]);n+="; "+a+"="+p}return n}function decodefield(e){var t=extValueRegExp.exec(e);if(!t)throw new TypeError("invalid extended field value");var r,n=t[1].toLowerCase(),a=t[2],o=a.replace(hexEscapeReplaceRegExp,pdecode);switch(n){case"iso-8859-1":r=getlatin1(o);break;case"utf-8":r=new Buffer(o,"binary").toString("utf8");break;default:throw new TypeError("unsupported charset in extended field")}return r}function getlatin1(e){return String(e).replace(nonLatin1RegExp,"?")}function parse(e){if(!e||"string"!=typeof e)throw new TypeError("argument string is required");var t=dispositionTypeRegExp.exec(e);if(!t)throw new TypeError("invalid type format");var r,n,a=t[0].length,o=t[1].toLowerCase(),i=[],p={};for(a=paramRegExp.lastIndex=";"===t[0].substr(-1)?a-1:a;t=paramRegExp.exec(e);){if(t.index!==a)throw new TypeError("invalid parameter format");if(a+=t[0].length,r=t[1].toLowerCase(),n=t[2],-1!==i.indexOf(r))throw new TypeError("invalid duplicate parameter");i.push(r),r.indexOf("*")+1!==r.length?"string"!=typeof p[r]&&('"'===n[0]&&(n=n.substr(1,n.length-2).replace(qescRegExp,"$1")),p[r]=n):(r=r.slice(0,-1),n=decodefield(n),p[r]=n)}if(-1!==a&&a!==e.length)throw new TypeError("invalid parameter format");return new ContentDisposition(o,p)}function pdecode(e,t){return String.fromCharCode(parseInt(t,16))}function pencode(e){var t=String(e).charCodeAt(0).toString(16).toUpperCase();return 1===t.length?"%0"+t:"%"+t}function qstring(e){var t=String(e);return'"'+t.replace(quoteRegExp,"\\$1")+'"'}function ustring(e){var t=String(e),r=encodeURIComponent(t).replace(encodeUriAttrCharRegExp,pencode);return"UTF-8''"+r}function ContentDisposition(e,t){this.type=e,this.parameters=t}module.exports=contentDisposition,module.exports.parse=parse;var basename=require("path").basename,encodeUriAttrCharRegExp=/[\x00-\x20"'\(\)*,\/:;<=>?@\[\\\]\{\}\x7f]/g,hexEscapeRegExp=/%[0-9A-Fa-f]{2}/,hexEscapeReplaceRegExp=/%([0-9A-Fa-f]{2})/g,nonLatin1RegExp=/[^\x20-\x7e\xa0-\xff]/g,qescRegExp=/\\([\u0000-\u007f])/g,quoteRegExp=/([\\"])/g,paramRegExp=/; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\x20-\x7e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g,textRegExp=/^[\x20-\x7e\x80-\xff]+$/,tokenRegExp=/^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/,extValueRegExp=/^([A-Za-z0-9!#$%&+\-^_`{}~]+)'(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}|[A-Za-z]{4,8}|)'((?:%[0-9A-Fa-f]{2}|[A-Za-z0-9!#$&+\-\.^_`|~])+)$/,dispositionTypeRegExp=/^([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *(?:$|;)/;

}).call(this,require("buffer").Buffer)
},{"buffer":112,"path":240}],5:[function(require,module,exports){
function format(e){if(!e||"object"!=typeof e)throw new TypeError("argument obj is required");var t=e.parameters,r=e.type;if(!r||!typeRegExp.test(r))throw new TypeError("invalid type");var n=r;if(t&&"object"==typeof t)for(var o,a=Object.keys(t).sort(),p=0;p<a.length;p++){if(o=a[p],!tokenRegExp.test(o))throw new TypeError("invalid parameter name");n+="; "+o+"="+qstring(t[o])}return n}function parse(e){if(!e)throw new TypeError("argument string is required");if("object"==typeof e&&(e=getcontenttype(e),"string"!=typeof e))throw new TypeError("content-type header is missing from object");if("string"!=typeof e)throw new TypeError("argument string is required to be a string");var t=e.indexOf(";"),r=-1!==t?e.substr(0,t).trim():e.trim();if(!typeRegExp.test(r))throw new TypeError("invalid media type");var n,o,a,p=new ContentType(r.toLowerCase());for(paramRegExp.lastIndex=t;o=paramRegExp.exec(e);){if(o.index!==t)throw new TypeError("invalid parameter format");t+=o[0].length,n=o[1].toLowerCase(),a=o[2],'"'===a[0]&&(a=a.substr(1,a.length-2).replace(qescRegExp,"$1")),p.parameters[n]=a}if(-1!==t&&t!==e.length)throw new TypeError("invalid parameter format");return p}function getcontenttype(e){return"function"==typeof e.getHeader?e.getHeader("content-type"):"object"==typeof e.headers?e.headers&&e.headers["content-type"]:void 0}function qstring(e){var t=String(e);if(tokenRegExp.test(t))return t;if(t.length>0&&!textRegExp.test(t))throw new TypeError("invalid parameter value");return'"'+t.replace(quoteRegExp,"\\$1")+'"'}function ContentType(e){this.parameters=Object.create(null),this.type=e}var paramRegExp=/; *([!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) */g,textRegExp=/^[\u000b\u0020-\u007e\u0080-\u00ff]+$/,tokenRegExp=/^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/,qescRegExp=/\\([\u000b\u0020-\u00ff])/g,quoteRegExp=/([\\"])/g,typeRegExp=/^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+\/[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/;exports.format=format,exports.parse=parse;

},{}],6:[function(require,module,exports){
function sha1(e){return crypto.createHash("sha1").update(e).digest("hex")}var crypto=require("crypto");exports.sign=function(e,r){if("string"!=typeof e)throw new TypeError("Cookie value must be provided as a string.");if("string"!=typeof r)throw new TypeError("Secret string must be provided.");return e+"."+crypto.createHmac("sha256",r).update(e).digest("base64").replace(/\=+$/,"")},exports.unsign=function(e,r){if("string"!=typeof e)throw new TypeError("Signed cookie string must be provided.");if("string"!=typeof r)throw new TypeError("Secret string must be provided.");var t=e.slice(0,e.lastIndexOf(".")),o=exports.sign(t,r);return sha1(o)==sha1(e)?t:!1};

},{"crypto":126}],7:[function(require,module,exports){
function useColors(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function formatArgs(){var o=arguments,e=this.useColors;if(o[0]=(e?"%c":"")+this.namespace+(e?" %c":" ")+o[0]+(e?"%c ":" ")+"+"+exports.humanize(this.diff),!e)return o;var r="color: "+this.color;o=[o[0],r,"color: inherit"].concat(Array.prototype.slice.call(o,1));var t=0,s=0;return o[0].replace(/%[a-z%]/g,function(o){"%%"!==o&&(t++,"%c"===o&&(s=t))}),o.splice(s,0,r),o}function log(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function save(o){try{null==o?exports.storage.removeItem("debug"):exports.storage.debug=o}catch(e){}}function load(){var o;try{o=exports.storage.debug}catch(e){}return o}function localstorage(){try{return window.localStorage}catch(o){}}exports=module.exports=require("./debug"),exports.log=log,exports.formatArgs=formatArgs,exports.save=save,exports.load=load,exports.useColors=useColors,exports.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:localstorage(),exports.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],exports.formatters.j=function(o){return JSON.stringify(o)},exports.enable(load());

},{"./debug":8}],8:[function(require,module,exports){
function selectColor(){return exports.colors[prevColor++%exports.colors.length]}function debug(e){function r(){}function o(){var e=o,r=+new Date,s=r-(prevTime||r);e.diff=s,e.prev=prevTime,e.curr=r,prevTime=r,null==e.useColors&&(e.useColors=exports.useColors()),null==e.color&&e.useColors&&(e.color=selectColor());var t=Array.prototype.slice.call(arguments);t[0]=exports.coerce(t[0]),"string"!=typeof t[0]&&(t=["%o"].concat(t));var n=0;t[0]=t[0].replace(/%([a-z%])/g,function(r,o){if("%%"===r)return r;n++;var s=exports.formatters[o];if("function"==typeof s){var p=t[n];r=s.call(e,p),t.splice(n,1),n--}return r}),"function"==typeof exports.formatArgs&&(t=exports.formatArgs.apply(e,t));var p=o.log||exports.log||console.log.bind(console);p.apply(e,t)}r.enabled=!1,o.enabled=!0;var s=exports.enabled(e)?o:r;return s.namespace=e,s}function enable(e){exports.save(e);for(var r=(e||"").split(/[\s,]+/),o=r.length,s=0;o>s;s++)r[s]&&(e=r[s].replace(/\*/g,".*?"),"-"===e[0]?exports.skips.push(new RegExp("^"+e.substr(1)+"$")):exports.names.push(new RegExp("^"+e+"$")))}function disable(){exports.enable("")}function enabled(e){var r,o;for(r=0,o=exports.skips.length;o>r;r++)if(exports.skips[r].test(e))return!1;for(r=0,o=exports.names.length;o>r;r++)if(exports.names[r].test(e))return!0;return!1}function coerce(e){return e instanceof Error?e.stack||e.message:e}exports=module.exports=debug,exports.coerce=coerce,exports.disable=disable,exports.enable=enable,exports.enabled=enabled,exports.humanize=require("ms"),exports.names=[],exports.skips=[],exports.formatters={};var prevColor=0,prevTime;

},{"ms":41}],9:[function(require,module,exports){
"use strict";function destroy(e){return e instanceof ReadStream?destroyReadStream(e):e instanceof Stream?("function"==typeof e.destroy&&e.destroy(),e):e}function destroyReadStream(e){return e.destroy(),"function"==typeof e.close&&e.on("open",onOpenClose),e}function onOpenClose(){"number"==typeof this.fd&&this.close()}var ReadStream=require("fs").ReadStream,Stream=require("stream");module.exports=destroy;

},{"fs":110,"stream":282}],10:[function(require,module,exports){
"use strict";function first(r,e){function n(){t(),e.apply(null,arguments)}function t(){for(var r,e=0;e<o.length;e++)r=o[e],r.ee.removeListener(r.event,r.fn)}function a(r){e=r}if(!Array.isArray(r))throw new TypeError("arg must be an array of [ee, events...] arrays");for(var o=[],f=0;f<r.length;f++){var i=r[f];if(!Array.isArray(i)||i.length<2)throw new TypeError("each array member must be [ee, events...]");for(var s=i[0],l=1;l<i.length;l++){var u=i[l],h=listener(u,n);s.on(u,h),o.push({ee:s,event:u,fn:h})}}return a.cancel=t,a}function listener(r,e){return function(n){for(var t=new Array(arguments.length),a=this,o="error"===r?n:null,f=0;f<t.length;f++)t[f]=arguments[f];e(o,a,r,t)}}module.exports=first;

},{}],11:[function(require,module,exports){
"use strict";function escapeHtml(e){var t=""+e,a=matchHtmlRegExp.exec(t);if(!a)return t;var r,c="",s=0,n=0;for(s=a.index;s<t.length;s++){switch(t.charCodeAt(s)){case 34:r="&quot;";break;case 38:r="&amp;";break;case 39:r="&#39;";break;case 60:r="&lt;";break;case 62:r="&gt;";break;default:continue}n!==s&&(c+=t.substring(n,s)),n=s+1,c+=r}return n!==s?c+t.substring(n,s):c}var matchHtmlRegExp=/["'&<>]/;module.exports=escapeHtml;

},{}],12:[function(require,module,exports){
(function (Buffer){
"use strict";function entitytag(t){if(0===t.length)return'"0-1B2M2Y8AsgTpgAmY7PhCfg"';var e=crypto.createHash("md5").update(t,"utf8").digest("base64").replace(base64PadCharRegExp,""),r="string"==typeof t?Buffer.byteLength(t,"utf8"):t.length;return'"'+r.toString(16)+"-"+e+'"'}function etag(t,e){if(null==t)throw new TypeError("argument entity is required");var r=isstats(t),n=e&&"boolean"==typeof e.weak?e.weak:r;if(!r&&"string"!=typeof t&&!Buffer.isBuffer(t))throw new TypeError("argument entity must be string, Buffer, or fs.Stats");var i=r?stattag(t):entitytag(t);return n?"W/"+i:i}function isstats(t){return"function"==typeof Stats&&t instanceof Stats?!0:t&&"object"==typeof t&&"ctime"in t&&"[object Date]"===toString.call(t.ctime)&&"mtime"in t&&"[object Date]"===toString.call(t.mtime)&&"ino"in t&&"number"==typeof t.ino&&"size"in t&&"number"==typeof t.size}function stattag(t){var e=t.mtime.getTime().toString(16),r=t.size.toString(16);return'"'+r+"-"+e+'"'}module.exports=etag;var crypto=require("crypto"),Stats=require("fs").Stats,base64PadCharRegExp=/=+$/,toString=Object.prototype.toString;

}).call(this,require("buffer").Buffer)
},{"buffer":112,"crypto":126,"fs":110}],13:[function(require,module,exports){
"use strict";module.exports=require("./lib/express");

},{"./lib/express":15}],14:[function(require,module,exports){
(function (process){
"use strict";function logerror(e){"test"!==this.get("env")&&console.error(e.stack||e.toString())}function tryRender(e,t,r){try{e.render(t,r)}catch(i){r(i)}}var finalhandler=require("finalhandler"),Router=require("./router"),methods=require("methods"),middleware=require("./middleware/init"),query=require("./middleware/query"),debug=require("debug")("express:application"),View=require("./view"),http=require("http"),compileETag=require("./utils").compileETag,compileQueryParser=require("./utils").compileQueryParser,compileTrust=require("./utils").compileTrust,deprecate=require("depd")("express"),flatten=require("array-flatten"),merge=require("utils-merge"),resolve=require("path").resolve,slice=Array.prototype.slice,app=exports=module.exports={},trustProxyDefaultSymbol="@@symbol:trust_proxy_default";app.init=function(){this.cache={},this.engines={},this.settings={},this.defaultConfiguration()},app.defaultConfiguration=function(){var e=process.env.NODE_ENV||"development";this.enable("x-powered-by"),this.set("etag","weak"),this.set("env",e),this.set("query parser","extended"),this.set("subdomain offset",2),this.set("trust proxy",!1),Object.defineProperty(this.settings,trustProxyDefaultSymbol,{configurable:!0,value:!0}),debug("booting in %s mode",e),this.on("mount",function(e){this.settings[trustProxyDefaultSymbol]===!0&&"function"==typeof e.settings["trust proxy fn"]&&(delete this.settings["trust proxy"],delete this.settings["trust proxy fn"]),this.request.__proto__=e.request,this.response.__proto__=e.response,this.engines.__proto__=e.engines,this.settings.__proto__=e.settings}),this.locals=Object.create(null),this.mountpath="/",this.locals.settings=this.settings,this.set("view",View),this.set("views",resolve("views")),this.set("jsonp callback name","callback"),"production"===e&&this.enable("view cache"),Object.defineProperty(this,"router",{get:function(){throw new Error("'app.router' is deprecated!\nPlease see the 3.x to 4.x migration guide for details on how to update your app.")}})},app.lazyrouter=function(){this._router||(this._router=new Router({caseSensitive:this.enabled("case sensitive routing"),strict:this.enabled("strict routing")}),this._router.use(query(this.get("query parser fn"))),this._router.use(middleware.init(this)))},app.handle=function(e,t,r){var i=this._router,s=r||finalhandler(e,t,{env:this.get("env"),onerror:logerror.bind(this)});return i?void i.handle(e,t,s):(debug("no routes defined on app"),void s())},app.use=function(e){var t=0,r="/";if("function"!=typeof e){for(var i=e;Array.isArray(i)&&0!==i.length;)i=i[0];"function"!=typeof i&&(t=1,r=e)}var s=flatten(slice.call(arguments,t));if(0===s.length)throw new TypeError("app.use() requires middleware functions");this.lazyrouter();var n=this._router;return s.forEach(function(e){return e&&e.handle&&e.set?(debug(".use app under %s",r),e.mountpath=r,e.parent=this,n.use(r,function(t,r,i){var s=t.app;e.handle(t,r,function(e){t.__proto__=s.request,r.__proto__=s.response,i(e)})}),void e.emit("mount",this)):n.use(r,e)},this),this},app.route=function(e){return this.lazyrouter(),this._router.route(e)},app.engine=function(e,t){if("function"!=typeof t)throw new Error("callback function required");var r="."!==e[0]?"."+e:e;return this.engines[r]=t,this},app.param=function(e,t){if(this.lazyrouter(),Array.isArray(e)){for(var r=0;r<e.length;r++)this.param(e[r],t);return this}return this._router.param(e,t),this},app.set=function(e,t){if(1===arguments.length)return this.settings[e];switch(debug('set "%s" to %o',e,t),this.settings[e]=t,e){case"etag":this.set("etag fn",compileETag(t));break;case"query parser":this.set("query parser fn",compileQueryParser(t));break;case"trust proxy":this.set("trust proxy fn",compileTrust(t)),Object.defineProperty(this.settings,trustProxyDefaultSymbol,{configurable:!0,value:!1})}return this},app.path=function(){return this.parent?this.parent.path()+this.mountpath:""},app.enabled=function(e){return Boolean(this.set(e))},app.disabled=function(e){return!this.set(e)},app.enable=function(e){return this.set(e,!0)},app.disable=function(e){return this.set(e,!1)},methods.forEach(function(e){app[e]=function(t){if("get"===e&&1===arguments.length)return this.set(t);this.lazyrouter();var r=this._router.route(t);return r[e].apply(r,slice.call(arguments,1)),this}}),app.all=function(e){this.lazyrouter();for(var t=this._router.route(e),r=slice.call(arguments,1),i=0;i<methods.length;i++)t[methods[i]].apply(t,r);return this},app.del=deprecate["function"](app["delete"],"app.del: Use app.delete instead"),app.render=function(e,t,r){var i,s=this.cache,n=r,o=this.engines,a=t,u={};if("function"==typeof t&&(n=t,a={}),merge(u,this.locals),a._locals&&merge(u,a._locals),merge(u,a),null==u.cache&&(u.cache=this.enabled("view cache")),u.cache&&(i=s[e]),!i){var p=this.get("view");if(i=new p(e,{defaultEngine:this.get("view engine"),root:this.get("views"),engines:o}),!i.path){var h=Array.isArray(i.root)&&i.root.length>1?'directories "'+i.root.slice(0,-1).join('", "')+'" or "'+i.root[i.root.length-1]+'"':'directory "'+i.root+'"',l=new Error('Failed to lookup view "'+e+'" in views '+h);return l.view=i,n(l)}u.cache&&(s[e]=i)}tryRender(i,u,n)},app.listen=function(){var e=http.createServer(this);return e.listen.apply(e,arguments)};

}).call(this,require('_process'))
},{"./middleware/init":16,"./middleware/query":17,"./router":20,"./utils":23,"./view":24,"_process":244,"array-flatten":3,"debug":7,"depd":26,"finalhandler":27,"http":283,"methods":35,"path":240,"utils-merge":63}],15:[function(require,module,exports){
"use strict";function createApplication(){var e=function(r,t,o){e.handle(r,t,o)};return mixin(e,EventEmitter.prototype,!1),mixin(e,proto,!1),e.request={__proto__:req,app:e},e.response={__proto__:res,app:e},e.init(),e}var EventEmitter=require("events").EventEmitter,mixin=require("merge-descriptors"),proto=require("./application"),Route=require("./router/route"),Router=require("./router"),req=require("./request"),res=require("./response");exports=module.exports=createApplication,exports.application=proto,exports.request=req,exports.response=res,exports.Route=Route,exports.Router=Router,exports.query=require("./middleware/query"),exports["static"]=require("serve-static"),["json","urlencoded","bodyParser","compress","cookieSession","session","logger","cookieParser","favicon","responseTime","errorHandler","timeout","methodOverride","vhost","csrf","directory","limit","multipart","staticCache"].forEach(function(e){Object.defineProperty(exports,e,{get:function(){throw new Error("Most middleware (like "+e+") is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.")},configurable:!0})});

},{"./application":14,"./middleware/query":17,"./request":18,"./response":19,"./router":20,"./router/route":22,"events":161,"merge-descriptors":34,"serve-static":58}],16:[function(require,module,exports){
"use strict";exports.init=function(e){return function(r,t,o){e.enabled("x-powered-by")&&t.setHeader("X-Powered-By","Express"),r.res=t,t.req=r,r.next=o,r.__proto__=e.request,t.__proto__=e.response,t.locals=t.locals||Object.create(null),o()}};

},{}],17:[function(require,module,exports){
"use strict";var parseUrl=require("parseurl"),qs=require("qs");module.exports=function(r){var e=Object.create(r||null),o=qs.parse;return"function"==typeof r&&(o=r,e=void 0),void 0!==e&&(void 0===e.allowDots&&(e.allowDots=!1),void 0===e.allowPrototypes&&(e.allowPrototypes=!0)),function(r,t,l){if(!r.query){var s=parseUrl(r).query;r.query=o(s,e)}l()}};

},{"parseurl":48,"qs":51}],18:[function(require,module,exports){
"use strict";function defineGetter(e,r,t){Object.defineProperty(e,r,{configurable:!0,enumerable:!0,get:t})}var accepts=require("accepts"),deprecate=require("depd")("express"),isIP=require("net").isIP,typeis=require("type-is"),http=require("http"),fresh=require("fresh"),parseRange=require("range-parser"),parse=require("parseurl"),proxyaddr=require("proxy-addr"),req=exports=module.exports={__proto__:http.IncomingMessage.prototype};req.get=req.header=function(e){var r=e.toLowerCase();switch(r){case"referer":case"referrer":return this.headers.referrer||this.headers.referer;default:return this.headers[r]}},req.accepts=function(){var e=accepts(this);return e.types.apply(e,arguments)},req.acceptsEncodings=function(){var e=accepts(this);return e.encodings.apply(e,arguments)},req.acceptsEncoding=deprecate["function"](req.acceptsEncodings,"req.acceptsEncoding: Use acceptsEncodings instead"),req.acceptsCharsets=function(){var e=accepts(this);return e.charsets.apply(e,arguments)},req.acceptsCharset=deprecate["function"](req.acceptsCharsets,"req.acceptsCharset: Use acceptsCharsets instead"),req.acceptsLanguages=function(){var e=accepts(this);return e.languages.apply(e,arguments)},req.acceptsLanguage=deprecate["function"](req.acceptsLanguages,"req.acceptsLanguage: Use acceptsLanguages instead"),req.range=function(e){var r=this.get("Range");if(r)return parseRange(e,r)},req.param=function(e,r){var t=this.params||{},s=this.body||{},n=this.query||{},a=1===arguments.length?"name":"name, default";return deprecate("req.param("+a+"): Use req.params, req.body, or req.query instead"),null!=t[e]&&t.hasOwnProperty(e)?t[e]:null!=s[e]?s[e]:null!=n[e]?n[e]:r},req.is=function(e){var r=e;if(!Array.isArray(e)){r=new Array(arguments.length);for(var t=0;t<r.length;t++)r[t]=arguments[t]}return typeis(this,r)},defineGetter(req,"protocol",function(){var e=this.connection.encrypted?"https":"http",r=this.app.get("trust proxy fn");return r(this.connection.remoteAddress,0)?(e=this.get("X-Forwarded-Proto")||e,e.split(/\s*,\s*/)[0]):e}),defineGetter(req,"secure",function(){return"https"===this.protocol}),defineGetter(req,"ip",function(){var e=this.app.get("trust proxy fn");return proxyaddr(this,e)}),defineGetter(req,"ips",function(){var e=this.app.get("trust proxy fn"),r=proxyaddr.all(this,e);return r.slice(1).reverse()}),defineGetter(req,"subdomains",function e(){var r=this.hostname;if(!r)return[];var t=this.app.get("subdomain offset"),e=isIP(r)?[r]:r.split(".").reverse();return e.slice(t)}),defineGetter(req,"path",function(){return parse(this).pathname}),defineGetter(req,"hostname",function(){var e=this.app.get("trust proxy fn"),r=this.get("X-Forwarded-Host");if(r&&e(this.connection.remoteAddress,0)||(r=this.get("Host")),r){var t="["===r[0]?r.indexOf("]")+1:0,s=r.indexOf(":",t);return-1!==s?r.substring(0,s):r}}),defineGetter(req,"host",deprecate["function"](function(){return this.hostname},"req.host: Use req.hostname instead")),defineGetter(req,"fresh",function(){var e=this.method,r=this.res.statusCode;return"GET"!=e&&"HEAD"!=e?!1:r>=200&&300>r||304==r?fresh(this.headers,this.res._headers||{}):!1}),defineGetter(req,"stale",function(){return!this.fresh}),defineGetter(req,"xhr",function(){var e=this.get("X-Requested-With")||"";return"xmlhttprequest"===e.toLowerCase()});

},{"accepts":2,"depd":26,"fresh":29,"http":283,"net":110,"parseurl":48,"proxy-addr":50,"range-parser":55,"type-is":61}],19:[function(require,module,exports){
(function (Buffer){
"use strict";function sendfile(e,t,s,r){function n(){if(!p){p=!0;var e=new Error("Request aborted");e.code="ECONNABORTED",r(e)}}function i(){if(!p){p=!0;var e=new Error("EISDIR, read");e.code="EISDIR",r(e)}}function o(e){p||(p=!0,r(e))}function a(){p||(p=!0,r())}function u(){d=!1}function h(e){return e&&"ECONNRESET"===e.code?n():e?o(e):void(p||setImmediate(function(){return d===!1||p?void(p||(p=!0,r())):void n()}))}function c(){d=!0}var d,p=!1;t.on("directory",i),t.on("end",a),t.on("error",o),t.on("file",u),t.on("stream",c),onFinished(e,h),s.headers&&t.on("headers",function(e){for(var t=s.headers,r=Object.keys(t),n=0;n<r.length;n++){var i=r[n];e.setHeader(i,t[i])}}),t.pipe(e)}var contentDisposition=require("content-disposition"),deprecate=require("depd")("express"),escapeHtml=require("escape-html"),http=require("http"),isAbsolute=require("./utils").isAbsolute,onFinished=require("on-finished"),path=require("path"),merge=require("utils-merge"),sign=require("cookie-signature").sign,normalizeType=require("./utils").normalizeType,normalizeTypes=require("./utils").normalizeTypes,setCharset=require("./utils").setCharset,statusCodes=http.STATUS_CODES,cookie=require("cookie"),send=require("send"),extname=path.extname,mime=send.mime,resolve=path.resolve,vary=require("vary"),res=module.exports={__proto__:http.ServerResponse.prototype},charsetRegExp=/;\s*charset\s*=/;res.status=function(e){return this.statusCode=e,this},res.links=function(e){var t=this.get("Link")||"";return t&&(t+=", "),this.set("Link",t+Object.keys(e).map(function(t){return"<"+e[t]+'>; rel="'+t+'"'}).join(", "))},res.send=function(e){var t,s,r,n=e,i=this.req,o=this.app;switch(2===arguments.length&&("number"!=typeof arguments[0]&&"number"==typeof arguments[1]?(deprecate("res.send(body, status): Use res.status(status).send(body) instead"),this.statusCode=arguments[1]):(deprecate("res.send(status, body): Use res.status(status).send(body) instead"),this.statusCode=arguments[0],n=arguments[1])),"number"==typeof n&&1===arguments.length&&(this.get("Content-Type")||this.type("txt"),deprecate("res.send(status): Use res.sendStatus(status) instead"),this.statusCode=n,n=statusCodes[n]),typeof n){case"string":this.get("Content-Type")||this.type("html");break;case"boolean":case"number":case"object":if(null===n)n="";else{if(!Buffer.isBuffer(n))return this.json(n);this.get("Content-Type")||this.type("bin")}}"string"==typeof n&&(t="utf8",r=this.get("Content-Type"),"string"==typeof r&&this.set("Content-Type",setCharset(r,"utf-8"))),void 0!==n&&(Buffer.isBuffer(n)||(n=new Buffer(n,t),t=void 0),s=n.length,this.set("Content-Length",s));var a,u=void 0!==s&&o.get("etag fn");return"function"!=typeof u||this.get("ETag")||(a=u(n,t))&&this.set("ETag",a),i.fresh&&(this.statusCode=304),204!=this.statusCode&&304!=this.statusCode||(this.removeHeader("Content-Type"),this.removeHeader("Content-Length"),this.removeHeader("Transfer-Encoding"),n=""),"HEAD"===i.method?this.end():this.end(n,t),this},res.json=function(e){var t=e;2===arguments.length&&("number"==typeof arguments[1]?(deprecate("res.json(obj, status): Use res.status(status).json(obj) instead"),this.statusCode=arguments[1]):(deprecate("res.json(status, obj): Use res.status(status).json(obj) instead"),this.statusCode=arguments[0],t=arguments[1]));var s=this.app,r=s.get("json replacer"),n=s.get("json spaces"),i=JSON.stringify(t,r,n);return this.get("Content-Type")||this.set("Content-Type","application/json"),this.send(i)},res.jsonp=function(e){var t=e;2===arguments.length&&("number"==typeof arguments[1]?(deprecate("res.jsonp(obj, status): Use res.status(status).json(obj) instead"),this.statusCode=arguments[1]):(deprecate("res.jsonp(status, obj): Use res.status(status).jsonp(obj) instead"),this.statusCode=arguments[0],t=arguments[1]));var s=this.app,r=s.get("json replacer"),n=s.get("json spaces"),i=JSON.stringify(t,r,n),o=this.req.query[s.get("jsonp callback name")];return this.get("Content-Type")||(this.set("X-Content-Type-Options","nosniff"),this.set("Content-Type","application/json")),Array.isArray(o)&&(o=o[0]),"string"==typeof o&&0!==o.length&&(this.charset="utf-8",this.set("X-Content-Type-Options","nosniff"),this.set("Content-Type","text/javascript"),o=o.replace(/[^\[\]\w$.]/g,""),i=i.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029"),i="/**/ typeof "+o+" === 'function' && "+o+"("+i+");"),this.send(i)},res.sendStatus=function(e){var t=statusCodes[e]||String(e);return this.statusCode=e,this.type("txt"),this.send(t)},res.sendFile=function(e,t,s){var r=s,n=this.req,i=this,o=n.next,a=t||{};if(!e)throw new TypeError("path argument is required to res.sendFile");if("function"==typeof t&&(r=t,a={}),!a.root&&!isAbsolute(e))throw new TypeError("path must be absolute or specify root to res.sendFile");var u=encodeURI(e),h=send(n,u,a);sendfile(i,h,a,function(e){return r?r(e):e&&"EISDIR"===e.code?o():void(e&&"ECONNABORTED"!==e.code&&"write"!==e.syscall&&o(e))})},res.sendfile=function(e,t,s){var r=s,n=this.req,i=this,o=n.next,a=t||{};"function"==typeof t&&(r=t,a={});var u=send(n,e,a);sendfile(i,u,a,function(e){return r?r(e):e&&"EISDIR"===e.code?o():void(e&&"ECONNABORT"!==e.code&&"write"!==e.syscall&&o(e))})},res.sendfile=deprecate["function"](res.sendfile,"res.sendfile: Use res.sendFile instead"),res.download=function(e,t,s){var r=s,n=t;"function"==typeof t&&(r=t,n=null);var i={"Content-Disposition":contentDisposition(n||e)},o=resolve(e);return this.sendFile(o,{headers:i},r)},res.contentType=res.type=function(e){var t=-1===e.indexOf("/")?mime.lookup(e):e;return this.set("Content-Type",t)},res.format=function(e){var t=this.req,s=t.next,r=e["default"];r&&delete e["default"];var n=Object.keys(e),i=n.length>0?t.accepts(n):!1;if(this.vary("Accept"),i)this.set("Content-Type",normalizeType(i).value),e[i](t,this,s);else if(r)r();else{var o=new Error("Not Acceptable");o.status=o.statusCode=406,o.types=normalizeTypes(n).map(function(e){return e.value}),s(o)}return this},res.attachment=function(e){return e&&this.type(extname(e)),this.set("Content-Disposition",contentDisposition(e)),this},res.append=function(e,t){var s=this.get(e),r=t;return s&&(r=Array.isArray(s)?s.concat(t):Array.isArray(t)?[s].concat(t):[s,t]),this.set(e,r)},res.set=res.header=function(e,t){if(2===arguments.length){var s=Array.isArray(t)?t.map(String):String(t);if("content-type"===e.toLowerCase()&&!charsetRegExp.test(s)){var r=mime.charsets.lookup(s.split(";")[0]);r&&(s+="; charset="+r.toLowerCase())}this.setHeader(e,s)}else for(var n in e)this.set(n,e[n]);return this},res.get=function(e){return this.getHeader(e)},res.clearCookie=function(e,t){var s=merge({expires:new Date(1),path:"/"},t);return this.cookie(e,"",s)},res.cookie=function(e,t,s){var r=merge({},s),n=this.req.secret,i=r.signed;if(i&&!n)throw new Error('cookieParser("secret") required for signed cookies');var o="object"==typeof t?"j:"+JSON.stringify(t):String(t);return i&&(o="s:"+sign(o,n)),"maxAge"in r&&(r.expires=new Date(Date.now()+r.maxAge),r.maxAge/=1e3),null==r.path&&(r.path="/"),this.append("Set-Cookie",cookie.serialize(e,String(o),r)),this},res.location=function(e){var t=e;return"back"===e&&(t=this.req.get("Referrer")||"/"),this.set("Location",t),this},res.redirect=function(e){var t,s=e,r=302;2===arguments.length&&("number"==typeof arguments[0]?(r=arguments[0],s=arguments[1]):(deprecate("res.redirect(url, status): Use res.redirect(status, url) instead"),r=arguments[1])),this.location(s),s=this.get("Location"),this.format({text:function(){t=statusCodes[r]+". Redirecting to "+encodeURI(s)},html:function(){var e=escapeHtml(s);t="<p>"+statusCodes[r]+'. Redirecting to <a href="'+e+'">'+e+"</a></p>"},"default":function(){t=""}}),this.statusCode=r,this.set("Content-Length",Buffer.byteLength(t)),"HEAD"===this.req.method?this.end():this.end(t)},res.vary=function(e){return!e||Array.isArray(e)&&!e.length?(deprecate("res.vary(): Provide a field name"),this):(vary(this,e),this)},res.render=function(e,t,s){var r=this.req.app,n=s,i=t||{},o=this.req,a=this;"function"==typeof t&&(n=t,i={}),i._locals=a.locals,n=n||function(e,t){return e?o.next(e):void a.send(t)},r.render(e,i,n)};

}).call(this,require("buffer").Buffer)
},{"./utils":23,"buffer":112,"content-disposition":4,"cookie":25,"cookie-signature":6,"depd":26,"escape-html":11,"http":283,"on-finished":47,"path":240,"send":56,"utils-merge":63,"vary":64}],20:[function(require,module,exports){
"use strict";function appendMethods(r,e){for(var t=0;t<e.length;t++){var n=e[t];-1===r.indexOf(n)&&r.push(n)}}function getPathname(r){try{return parseUrl(r).pathname}catch(e){return}}function gettype(r){var e=typeof r;return"object"!==e?e:toString.call(r).replace(objectRegExp,"$1")}function matchLayer(r,e){try{return r.match(e)}catch(t){return t}}function mergeParams(r,e){if("object"!=typeof e||!e)return r;var t=mixin({},e);if(!(0 in r&&0 in e))return mixin(t,r);for(var n=0,a=0;n in r;)n++;for(;a in e;)a++;for(n--;n>=0;n--)r[n+a]=r[n],a>n&&delete r[n];return mixin(t,r)}function restore(r,e){for(var t=new Array(arguments.length-2),n=new Array(arguments.length-2),a=0;a<t.length;a++)t[a]=arguments[a+2],n[a]=e[t[a]];return function(a){for(var o=0;o<t.length;o++)e[t[o]]=n[o];return r.apply(this,arguments)}}function sendOptionsResponse(r,e,t){try{var n=e.join(",");r.set("Allow",n),r.send(n)}catch(a){t(a)}}function wrap(r,e){return function(){var t=new Array(arguments.length+1);t[0]=r;for(var n=0,a=arguments.length;a>n;n++)t[n+1]=arguments[n];e.apply(this,t)}}var Route=require("./route"),Layer=require("./layer"),methods=require("methods"),mixin=require("utils-merge"),debug=require("debug")("express:router"),deprecate=require("depd")("express"),flatten=require("array-flatten"),parseUrl=require("parseurl"),objectRegExp=/^\[object (\S+)\]$/,slice=Array.prototype.slice,toString=Object.prototype.toString,proto=module.exports=function(r){function e(r,t,n){e.handle(r,t,n)}var t=r||{};return e.__proto__=proto,e.params={},e._params=[],e.caseSensitive=t.caseSensitive,e.mergeParams=t.mergeParams,e.strict=t.strict,e.stack=[],e};proto.param=function(r,e){if("function"==typeof r)return deprecate("router.param(fn): Refactor to use path params"),void this._params.push(r);var t,n=this._params,a=n.length;":"===r[0]&&(deprecate("router.param("+JSON.stringify(r)+", fn): Use router.param("+JSON.stringify(r.substr(1))+", fn) instead"),r=r.substr(1));for(var o=0;a>o;++o)(t=n[o](r,e))&&(e=t);if("function"!=typeof e)throw new Error("invalid param() call for "+r+", got "+e);return(this.params[r]=this.params[r]||[]).push(e),this},proto.handle=function(r,e,t){function n(t){var s="route"===t?null:t;if(f&&(r.url=r.url.substr(1),f=!1),0!==c.length&&(r.baseUrl=v,r.url=l+c+r.url.substr(l.length),c=""),p>=d.length)return void setImmediate(y,s);var i=getPathname(r);if(null==i)return y(s);for(var u,b,w;b!==!0&&p<d.length;)if(u=d[p++],b=matchLayer(u,i),w=u.route,"boolean"!=typeof b&&(s=s||b),b===!0&&w)if(s)b=!1;else{var x=r.method,_=w._handles_method(x);_||"OPTIONS"!==x||appendMethods(m,w._options()),_||"HEAD"===x||(b=!1)}if(b!==!0)return y(s);w&&(r.route=w),r.params=o.mergeParams?mergeParams(u.params,g):u.params;var O=u.path;o.process_params(u,h,r,e,function(t){return t?n(s||t):w?u.handle_request(r,e,n):void a(u,s,O,i)})}function a(t,a,o,s){var i=s[o.length];return i&&"/"!==i&&"."!==i?n(a):(0!==o.length&&(debug("trim prefix (%s) from url %s",o,r.url),c=o,r.url=l+r.url.substr(l.length+c.length),u||"/"===r.url[0]||(r.url="/"+r.url,f=!0),r.baseUrl=v+("/"===c[c.length-1]?c.substring(0,c.length-1):c)),debug("%s %s : %s",t.name,o,r.originalUrl),void(a?t.handle_error(a,r,e,n):t.handle_request(r,e,n)))}var o=this;debug("dispatching %s %s",r.method,r.url);var s=1+r.url.indexOf("?"),i=s?s-1:r.url.length,u="/"!==r.url[0]&&1+r.url.substr(0,i).indexOf("://"),l=u?r.url.substr(0,r.url.indexOf("/",2+u)):"",p=0,c="",f=!1,h={},m=[],d=o.stack,g=r.params,v=r.baseUrl||"",y=restore(t,r,"baseUrl","next","params");r.next=n,"OPTIONS"===r.method&&(y=wrap(y,function(r,t){return t||0===m.length?r(t):void sendOptionsResponse(e,m,r)})),r.baseUrl=v,r.originalUrl=r.originalUrl||r.url,n()},proto.process_params=function(r,e,t,n,a){function o(r){return r?a(r):m>=u.length?a():(d=0,(p=u[m++])?(l=p.name,c=t.params[l],f=i[l],h=e[l],void 0!==c&&f?h&&(h.match===c||h.error&&"route"!==h.error)?(t.params[l]=h.value,o(h.error)):(e[l]=h={error:null,match:c,value:c},void s()):o()):a())}function s(r){var e=f[d++];if(h.value=t.params[p.name],r)return h.error=r,void o(r);if(!e)return o();try{e(t,n,s,c,p.name)}catch(a){s(a)}}var i=this.params,u=r.keys;if(!u||0===u.length)return a();var l,p,c,f,h,m=0,d=0;o()},proto.use=function(r){var e=0,t="/";if("function"!=typeof r){for(var n=r;Array.isArray(n)&&0!==n.length;)n=n[0];"function"!=typeof n&&(e=1,t=r)}var a=flatten(slice.call(arguments,e));if(0===a.length)throw new TypeError("Router.use() requires middleware functions");for(var o=0;o<a.length;o++){var r=a[o];if("function"!=typeof r)throw new TypeError("Router.use() requires middleware function but got a "+gettype(r));debug("use %s %s",t,r.name||"<anonymous>");var s=new Layer(t,{sensitive:this.caseSensitive,strict:!1,end:!1},r);s.route=void 0,this.stack.push(s)}return this},proto.route=function r(e){var r=new Route(e),t=new Layer(e,{sensitive:this.caseSensitive,strict:this.strict,end:!0},r.dispatch.bind(r));return t.route=r,this.stack.push(t),r},methods.concat("all").forEach(function(r){proto[r]=function(e){var t=this.route(e);return t[r].apply(t,slice.call(arguments,1)),this}});

},{"./layer":21,"./route":22,"array-flatten":3,"debug":7,"depd":26,"methods":35,"parseurl":48,"utils-merge":63}],21:[function(require,module,exports){
"use strict";function Layer(e,t,r){if(!(this instanceof Layer))return new Layer(e,t,r);debug("new %s",e);var a=t||{};this.handle=r,this.name=r.name||"<anonymous>",this.params=void 0,this.path=void 0,this.regexp=pathRegexp(e,this.keys=[],a),"/"===e&&a.end===!1&&(this.regexp.fast_slash=!0)}function decode_param(e){if("string"!=typeof e||0===e.length)return e;try{return decodeURIComponent(e)}catch(t){throw t instanceof URIError&&(t.message="Failed to decode param '"+e+"'",t.status=t.statusCode=400),t}}var pathRegexp=require("path-to-regexp"),debug=require("debug")("express:router:layer"),hasOwnProperty=Object.prototype.hasOwnProperty;module.exports=Layer,Layer.prototype.handle_error=function(e,t,r,a){var s=this.handle;if(4!==s.length)return a(e);try{s(e,t,r,a)}catch(h){a(h)}},Layer.prototype.handle_request=function(e,t,r){var a=this.handle;if(a.length>3)return r();try{a(e,t,r)}catch(s){r(s)}},Layer.prototype.match=function(e){if(null==e)return this.params=void 0,this.path=void 0,!1;if(this.regexp.fast_slash)return this.params={},this.path="",!0;var t=this.regexp.exec(e);if(!t)return this.params=void 0,this.path=void 0,!1;this.params={},this.path=t[0];for(var r=this.keys,a=this.params,s=1;s<t.length;s++){var h=r[s-1],i=h.name,n=decode_param(t[s]);void 0===n&&hasOwnProperty.call(a,i)||(a[i]=n)}return!0};

},{"debug":7,"path-to-regexp":49}],22:[function(require,module,exports){
"use strict";function Route(t){this.path=t,this.stack=[],debug("new %s",t),this.methods={}}var debug=require("debug")("express:router:route"),flatten=require("array-flatten"),Layer=require("./layer"),methods=require("methods"),slice=Array.prototype.slice,toString=Object.prototype.toString;module.exports=Route,Route.prototype._handles_method=function(t){if(this.methods._all)return!0;var e=t.toLowerCase();return"head"!==e||this.methods.head||(e="get"),Boolean(this.methods[e])},Route.prototype._options=function(){var t=Object.keys(this.methods);this.methods.get&&!this.methods.head&&t.push("head");for(var e=0;e<t.length;e++)t[e]=t[e].toUpperCase();return t},Route.prototype.dispatch=function(t,e,r){function o(i){if(i&&"route"===i)return r();var n=a[s++];return n?n.method&&n.method!==h?o(i):void(i?n.handle_error(i,t,e,o):n.handle_request(t,e,o)):r(i)}var s=0,a=this.stack;if(0===a.length)return r();var h=t.method.toLowerCase();"head"!==h||this.methods.head||(h="get"),t.route=this,o()},Route.prototype.all=function(){for(var t=flatten(slice.call(arguments)),e=0;e<t.length;e++){var r=t[e];if("function"!=typeof r){var o=toString.call(r),s="Route.all() requires callback functions but got a "+o;throw new TypeError(s)}var a=Layer("/",{},r);a.method=void 0,this.methods._all=!0,this.stack.push(a)}return this},methods.forEach(function(t){Route.prototype[t]=function(){for(var e=flatten(slice.call(arguments)),r=0;r<e.length;r++){var o=e[r];if("function"!=typeof o){var s=toString.call(o),a="Route."+t+"() requires callback functions but got a "+s;throw new Error(a)}debug("%s %s",t,this.path);var h=Layer("/",{},o);h.method=t,this.methods[t]=!0,this.stack.push(h)}return this}});

},{"./layer":21,"array-flatten":3,"debug":7,"methods":35}],23:[function(require,module,exports){
(function (Buffer){
"use strict";function acceptParams(e,r){for(var t=e.split(/ *; */),n={value:t[0],quality:1,params:{},originalIndex:r},a=1;a<t.length;++a){var o=t[a].split(/ *= */);"q"==o[0]?n.quality=parseFloat(o[1]):n.params[o[0]]=o[1]}return n}function parseExtendedQueryString(e){return qs.parse(e,{allowDots:!1,allowPrototypes:!0})}function newObject(){return{}}var contentDisposition=require("content-disposition"),contentType=require("content-type"),deprecate=require("depd")("express"),flatten=require("array-flatten"),mime=require("send").mime,basename=require("path").basename,etag=require("etag"),proxyaddr=require("proxy-addr"),qs=require("qs"),querystring=require("querystring");exports.etag=function(e,r){var t=Buffer.isBuffer(e)?e:new Buffer(e,r);return etag(t,{weak:!1})},exports.wetag=function(e,r){var t=Buffer.isBuffer(e)?e:new Buffer(e,r);return etag(t,{weak:!0})},exports.isAbsolute=function(e){return"/"==e[0]?!0:":"==e[1]&&"\\"==e[2]?!0:"\\\\"==e.substring(0,2)?!0:void 0},exports.flatten=deprecate["function"](flatten,"utils.flatten: use array-flatten npm module instead"),exports.normalizeType=function(e){return~e.indexOf("/")?acceptParams(e):{value:mime.lookup(e),params:{}}},exports.normalizeTypes=function(e){for(var r=[],t=0;t<e.length;++t)r.push(exports.normalizeType(e[t]));return r},exports.contentDisposition=deprecate["function"](contentDisposition,"utils.contentDisposition: use content-disposition npm module instead"),exports.compileETag=function(e){var r;if("function"==typeof e)return e;switch(e){case!0:r=exports.wetag;break;case!1:break;case"strong":r=exports.etag;break;case"weak":r=exports.wetag;break;default:throw new TypeError("unknown value for etag function: "+e)}return r},exports.compileQueryParser=function(e){var r;if("function"==typeof e)return e;switch(e){case!0:r=querystring.parse;break;case!1:r=newObject;break;case"extended":r=parseExtendedQueryString;break;case"simple":r=querystring.parse;break;default:throw new TypeError("unknown value for query parser function: "+e)}return r},exports.compileTrust=function(e){return"function"==typeof e?e:e===!0?function(){return!0}:"number"==typeof e?function(r,t){return e>t}:("string"==typeof e&&(e=e.split(/ *, */)),proxyaddr.compile(e||[]))},exports.setCharset=function(e,r){if(!e||!r)return e;var t=contentType.parse(e);return t.parameters.charset=r,contentType.format(t)};

}).call(this,require("buffer").Buffer)
},{"array-flatten":3,"buffer":112,"content-disposition":4,"content-type":5,"depd":26,"etag":12,"path":240,"proxy-addr":50,"qs":51,"querystring":255,"send":56}],24:[function(require,module,exports){
"use strict";function View(e,t){var i=t||{};if(this.defaultEngine=i.defaultEngine,this.ext=extname(e),this.name=e,this.root=i.root,!this.ext&&!this.defaultEngine)throw new Error("No default engine was specified and no extension was provided.");var n=e;this.ext||(this.ext="."!==this.defaultEngine[0]?"."+this.defaultEngine:this.defaultEngine,n+=this.ext),i.engines[this.ext]||(i.engines[this.ext]=require(this.ext.substr(1)).__express),this.engine=i.engines[this.ext],this.path=this.lookup(n)}function tryStat(e){debug('stat "%s"',e);try{return fs.statSync(e)}catch(t){return}}var debug=require("debug")("express:view"),path=require("path"),fs=require("fs"),utils=require("./utils"),dirname=path.dirname,basename=path.basename,extname=path.extname,join=path.join,resolve=path.resolve;module.exports=View,View.prototype.lookup=function(e){var t,i=[].concat(this.root);debug('lookup "%s"',e);for(var n=0;n<i.length&&!t;n++){var s=i[n],r=resolve(s,e),a=dirname(r),o=basename(r);t=this.resolve(a,o)}return t},View.prototype.render=function(e,t){debug('render "%s"',this.path),this.engine(this.path,e,t)},View.prototype.resolve=function(e,t){var i=this.ext,n=join(e,t),s=tryStat(n);return s&&s.isFile()?n:(n=join(e,basename(t,i),"index"+i),s=tryStat(n),s&&s.isFile()?n:void 0)};

},{"./utils":23,"debug":7,"fs":110,"path":240}],25:[function(require,module,exports){
function parse(e,r){if("string"!=typeof e)throw new TypeError("argument str must be a string");var t={},n=r||{},i=e.split(/; */),o=n.decode||decode;return i.forEach(function(e){var r=e.indexOf("=");if(!(0>r)){var n=e.substr(0,r).trim(),i=e.substr(++r,e.length).trim();'"'==i[0]&&(i=i.slice(1,-1)),void 0==t[n]&&(t[n]=tryDecode(i,o))}}),t}function serialize(e,r,t){var n=t||{},i=n.encode||encode;if(!fieldContentRegExp.test(e))throw new TypeError("argument name is invalid");var o=i(r);if(o&&!fieldContentRegExp.test(o))throw new TypeError("argument val is invalid");var a=[e+"="+o];if(null!=n.maxAge){var s=n.maxAge-0;if(isNaN(s))throw new Error("maxAge should be a Number");a.push("Max-Age="+s)}if(n.domain){if(!fieldContentRegExp.test(n.domain))throw new TypeError("option domain is invalid");a.push("Domain="+n.domain)}if(n.path){if(!fieldContentRegExp.test(n.path))throw new TypeError("option path is invalid");a.push("Path="+n.path)}return n.expires&&a.push("Expires="+n.expires.toUTCString()),n.httpOnly&&a.push("HttpOnly"),n.secure&&a.push("Secure"),a.join("; ")}function tryDecode(e,r){try{return r(e)}catch(t){return e}}exports.parse=parse,exports.serialize=serialize;var decode=decodeURIComponent,encode=encodeURIComponent,fieldContentRegExp=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

},{}],26:[function(require,module,exports){
"use strict";function depd(r){function e(r){}if(!r)throw new TypeError("argument namespace is required");return e._file=void 0,e._ignored=!0,e._namespace=r,e._traced=!1,e._warned=Object.create(null),e["function"]=wrapfunction,e.property=wrapproperty,e}function wrapfunction(r,e){if("function"!=typeof r)throw new TypeError("argument fn must be a function");return r}function wrapproperty(r,e,t){if(!r||"object"!=typeof r&&"function"!=typeof r)throw new TypeError("argument obj must be object");var o=Object.getOwnPropertyDescriptor(r,e);if(!o)throw new TypeError("must call property on owner object");if(!o.configurable)throw new TypeError("property must be configurable")}module.exports=depd;

},{}],27:[function(require,module,exports){
(function (process,Buffer){
"use strict";function finalhandler(e,t,n){var r=n||{},i=r.env||process.env.NODE_ENV||"development",s=r.onerror;return function(n){var r=t.statusCode;if(!n&&t._header)return void debug("cannot 404 after headers sent");if(n){n.statusCode&&(r=n.statusCode),n.status&&(r=n.status),(!r||400>r)&&(r=500);var d="production"===i?http.STATUS_CODES[r]:n.stack||n.toString();d=escapeHtml(d).replace(/\n/g,"<br>").replace(/  /g," &nbsp;")+"\n"}else r=404,d="Cannot "+escapeHtml(e.method)+" "+escapeHtml(e.originalUrl||e.url)+"\n";return debug("default %s",r),n&&s&&defer(s,n,e,t),t._header?e.socket.destroy():void send(e,t,r,d)}}function send(e,t,n,r){function i(){return t.statusCode=n,t.setHeader("X-Content-Type-Options","nosniff"),t.setHeader("Content-Type","text/html; charset=utf-8"),t.setHeader("Content-Length",Buffer.byteLength(r,"utf8")),"HEAD"===e.method?void t.end():void t.end(r,"utf8")}return isFinished(e)?void i():(unpipe(e),onFinished(e,i),void e.resume())}var debug=require("debug")("finalhandler"),escapeHtml=require("escape-html"),http=require("http"),onFinished=require("on-finished"),unpipe=require("unpipe"),defer="function"==typeof setImmediate?setImmediate:function(e){process.nextTick(e.bind.apply(e,arguments))},isFinished=onFinished.isFinished;module.exports=finalhandler;

}).call(this,require('_process'),require("buffer").Buffer)
},{"_process":244,"buffer":112,"debug":7,"escape-html":11,"http":283,"on-finished":47,"unpipe":62}],28:[function(require,module,exports){
function forwarded(r){if(!r)throw new TypeError("argument req is required");var e=(r.headers["x-forwarded-for"]||"").split(/ *, */).filter(Boolean).reverse(),o=r.connection.remoteAddress,d=[o].concat(e);return d}module.exports=forwarded;

},{}],29:[function(require,module,exports){
function fresh(e,n){var t=!0,i=!0,o=e["if-modified-since"],c=e["if-none-match"],f=n["last-modified"],r=n.etag,a=e["cache-control"];return o||c?a&&-1!==a.indexOf("no-cache")?!1:(c&&(c=c.split(/ *, */)),c&&(t=c.some(function(e){return"*"===e||e===r||e==="W/"+r})),o&&(o=new Date(o),f=new Date(f),i=o>=f),!(!t||!i)):!1}module.exports=fresh;

},{}],30:[function(require,module,exports){
function toIdentifier(e){return e.split(" ").map(function(e){return e.slice(0,1).toUpperCase()+e.slice(1)}).join("").replace(/[^ _0-9a-z]/gi,"")}var statuses=require("statuses"),inherits=require("inherits");exports=module.exports=function e(){for(var r,t,o=500,s={},a=0;a<arguments.length;a++){var n=arguments[a];if(n instanceof Error)r=n,o=r.status||r.statusCode||o;else switch(typeof n){case"string":t=n;break;case"number":o=n;break;case"object":s=n}}"number"==typeof o&&statuses[o]||(o=500);var u=exports[o];r||(r=u?new u(t):new Error(t||statuses[o]),Error.captureStackTrace(r,e)),u&&r instanceof u||(r.expose=500>o,r.status=r.statusCode=o);for(var p in s)"status"!==p&&"statusCode"!==p&&(r[p]=s[p]);return r};var codes=statuses.codes.filter(function(e){return e>=400});codes.forEach(function(e){var r=toIdentifier(statuses[e]),t=r.match(/Error$/)?r:r+"Error";if(e>=500){var o=function a(r){var o=new Error(null!=r?r:statuses[e]);return Error.captureStackTrace(o,a),o.__proto__=a.prototype,Object.defineProperty(o,"name",{enumerable:!1,configurable:!0,value:t,writable:!0}),o};return inherits(o,Error),o.prototype.status=o.prototype.statusCode=e,o.prototype.expose=!1,void(exports[e]=exports[r]=o)}var s=function n(r){var o=new Error(null!=r?r:statuses[e]);return Error.captureStackTrace(o,n),o.__proto__=n.prototype,Object.defineProperty(o,"name",{enumerable:!1,configurable:!0,value:t,writable:!0}),o};inherits(s,Error),s.prototype.status=s.prototype.statusCode=e,s.prototype.expose=!0,exports[e]=exports[r]=s}),exports["I'mateapot"]=exports.ImATeapot;

},{"inherits":31,"statuses":60}],31:[function(require,module,exports){
"function"==typeof Object.create?module.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:module.exports=function(t,e){t.super_=e;var o=function(){};o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t};

},{}],32:[function(require,module,exports){
(function(){var r,t,n,e,i,o,a,s;t={},s=this,"undefined"!=typeof module&&null!==module&&module.exports?module.exports=t:s.ipaddr=t,a=function(r,t,n,e){var i,o;if(r.length!==t.length)throw new Error("ipaddr: cannot match CIDR for objects with different lengths");for(i=0;e>0;){if(o=n-e,0>o&&(o=0),r[i]>>o!==t[i]>>o)return!1;e-=n,i+=1}return!0},t.subnetMatch=function(r,t,n){var e,i,o,a,s;null==n&&(n="unicast");for(e in t)for(i=t[e],!i[0]||i[0]instanceof Array||(i=[i]),a=0,s=i.length;s>a;a++)if(o=i[a],r.match.apply(r,o))return e;return n},t.IPv4=function(){function r(r){var t,n,e;if(4!==r.length)throw new Error("ipaddr: ipv4 octet count should be 4");for(n=0,e=r.length;e>n;n++)if(t=r[n],!(t>=0&&255>=t))throw new Error("ipaddr: ipv4 octet is a byte");this.octets=r}return r.prototype.kind=function(){return"ipv4"},r.prototype.toString=function(){return this.octets.join(".")},r.prototype.toByteArray=function(){return this.octets.slice(0)},r.prototype.match=function(r,t){var n;if(void 0===t&&(n=r,r=n[0],t=n[1]),"ipv4"!==r.kind())throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");return a(this.octets,r.octets,8,t)},r.prototype.SpecialRanges={unspecified:[[new r([0,0,0,0]),8]],broadcast:[[new r([255,255,255,255]),32]],multicast:[[new r([224,0,0,0]),4]],linkLocal:[[new r([169,254,0,0]),16]],loopback:[[new r([127,0,0,0]),8]],"private":[[new r([10,0,0,0]),8],[new r([172,16,0,0]),12],[new r([192,168,0,0]),16]],reserved:[[new r([192,0,0,0]),24],[new r([192,0,2,0]),24],[new r([192,88,99,0]),24],[new r([198,51,100,0]),24],[new r([203,0,113,0]),24],[new r([240,0,0,0]),4]]},r.prototype.range=function(){return t.subnetMatch(this,this.SpecialRanges)},r.prototype.toIPv4MappedAddress=function(){return t.IPv6.parse("::ffff:"+this.toString())},r}(),n="(0?\\d+|0x[a-f0-9]+)",e={fourOctet:new RegExp("^"+n+"\\."+n+"\\."+n+"\\."+n+"$","i"),longValue:new RegExp("^"+n+"$","i")},t.IPv4.parser=function(r){var t,n,i,o,a;if(n=function(r){return"0"===r[0]&&"x"!==r[1]?parseInt(r,8):parseInt(r)},t=r.match(e.fourOctet))return function(){var r,e,o,a;for(o=t.slice(1,6),a=[],r=0,e=o.length;e>r;r++)i=o[r],a.push(n(i));return a}();if(t=r.match(e.longValue)){if(a=n(t[1]),a>4294967295||0>a)throw new Error("ipaddr: address outside defined range");return function(){var r,t;for(t=[],o=r=0;24>=r;o=r+=8)t.push(a>>o&255);return t}().reverse()}return null},t.IPv6=function(){function r(r){var t,n,e;if(8!==r.length)throw new Error("ipaddr: ipv6 part count should be 8");for(n=0,e=r.length;e>n;n++)if(t=r[n],!(t>=0&&65535>=t))throw new Error("ipaddr: ipv6 part should fit to two octets");this.parts=r}return r.prototype.kind=function(){return"ipv6"},r.prototype.toString=function(){var r,t,n,e,i,o,a;for(i=function(){var r,n,e,i;for(e=this.parts,i=[],r=0,n=e.length;n>r;r++)t=e[r],i.push(t.toString(16));return i}.call(this),r=[],n=function(t){return r.push(t)},e=0,o=0,a=i.length;a>o;o++)switch(t=i[o],e){case 0:n("0"===t?"":t),e=1;break;case 1:"0"===t?e=2:n(t);break;case 2:"0"!==t&&(n(""),n(t),e=3);break;case 3:n(t)}return 2===e&&(n(""),n("")),r.join(":")},r.prototype.toByteArray=function(){var r,t,n,e,i;for(r=[],i=this.parts,n=0,e=i.length;e>n;n++)t=i[n],r.push(t>>8),r.push(255&t);return r},r.prototype.toNormalizedString=function(){var r;return function(){var t,n,e,i;for(e=this.parts,i=[],t=0,n=e.length;n>t;t++)r=e[t],i.push(r.toString(16));return i}.call(this).join(":")},r.prototype.match=function(r,t){var n;if(void 0===t&&(n=r,r=n[0],t=n[1]),"ipv6"!==r.kind())throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");return a(this.parts,r.parts,16,t)},r.prototype.SpecialRanges={unspecified:[new r([0,0,0,0,0,0,0,0]),128],linkLocal:[new r([65152,0,0,0,0,0,0,0]),10],multicast:[new r([65280,0,0,0,0,0,0,0]),8],loopback:[new r([0,0,0,0,0,0,0,1]),128],uniqueLocal:[new r([64512,0,0,0,0,0,0,0]),7],ipv4Mapped:[new r([0,0,0,0,0,65535,0,0]),96],rfc6145:[new r([0,0,0,0,65535,0,0,0]),96],rfc6052:[new r([100,65435,0,0,0,0,0,0]),96],"6to4":[new r([8194,0,0,0,0,0,0,0]),16],teredo:[new r([8193,0,0,0,0,0,0,0]),32],reserved:[[new r([8193,3512,0,0,0,0,0,0]),32]]},r.prototype.range=function(){return t.subnetMatch(this,this.SpecialRanges)},r.prototype.isIPv4MappedAddress=function(){return"ipv4Mapped"===this.range()},r.prototype.toIPv4Address=function(){var r,n,e;if(!this.isIPv4MappedAddress())throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");return e=this.parts.slice(-2),r=e[0],n=e[1],new t.IPv4([r>>8,255&r,n>>8,255&n])},r}(),i="(?:[0-9a-f]+::?)+",o={"native":new RegExp("^(::)?("+i+")?([0-9a-f]+)?(::)?$","i"),transitional:new RegExp("^((?:"+i+")|(?:::)(?:"+i+")?)"+(""+n+"\\."+n+"\\."+n+"\\."+n+"$"),"i")},r=function(r,t){var n,e,i,o,a;if(r.indexOf("::")!==r.lastIndexOf("::"))return null;for(n=0,e=-1;(e=r.indexOf(":",e+1))>=0;)n++;if("::"===r.substr(0,2)&&n--,"::"===r.substr(-2,2)&&n--,n>t)return null;for(a=t-n,o=":";a--;)o+="0:";return r=r.replace("::",o),":"===r[0]&&(r=r.slice(1)),":"===r[r.length-1]&&(r=r.slice(0,-1)),function(){var t,n,e,o;for(e=r.split(":"),o=[],t=0,n=e.length;n>t;t++)i=e[t],o.push(parseInt(i,16));return o}()},t.IPv6.parser=function(t){var n,e;return t.match(o["native"])?r(t,8):(n=t.match(o.transitional))&&(e=r(n[1].slice(0,-1),6))?(e.push(parseInt(n[2])<<8|parseInt(n[3])),e.push(parseInt(n[4])<<8|parseInt(n[5])),e):null},t.IPv4.isIPv4=t.IPv6.isIPv6=function(r){return null!==this.parser(r)},t.IPv4.isValid=function(r){var t;try{return new this(this.parser(r)),!0}catch(n){return t=n,!1}},t.IPv6.isValid=function(r){var t;if("string"==typeof r&&-1===r.indexOf(":"))return!1;try{return new this(this.parser(r)),!0}catch(n){return t=n,!1}},t.IPv4.parse=t.IPv6.parse=function(r){var t;if(t=this.parser(r),null===t)throw new Error("ipaddr: string is not formatted like ip address");return new this(t)},t.IPv4.parseCIDR=function(r){var t,n;if((n=r.match(/^(.+)\/(\d+)$/))&&(t=parseInt(n[2]),t>=0&&32>=t))return[this.parse(n[1]),t];throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range")},t.IPv6.parseCIDR=function(r){var t,n;if((n=r.match(/^(.+)\/(\d+)$/))&&(t=parseInt(n[2]),t>=0&&128>=t))return[this.parse(n[1]),t];throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range")},t.isValid=function(r){return t.IPv6.isValid(r)||t.IPv4.isValid(r)},t.parse=function(r){if(t.IPv6.isValid(r))return t.IPv6.parse(r);if(t.IPv4.isValid(r))return t.IPv4.parse(r);throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format")},t.parseCIDR=function(r){var n;try{return t.IPv6.parseCIDR(r)}catch(e){n=e;try{return t.IPv4.parseCIDR(r)}catch(e){throw n=e,new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format")}}},t.process=function(r){var t;return t=this.parse(r),"ipv6"===t.kind()&&t.isIPv4MappedAddress()?t.toIPv4Address():t}}).call(this);

},{}],33:[function(require,module,exports){
function format(e){if(!e||"object"!=typeof e)throw new TypeError("argument obj is required");var t=e.parameters,r=e.subtype,a=e.suffix,p=e.type;if(!p||!typeNameRegExp.test(p))throw new TypeError("invalid type");if(!r||!subtypeNameRegExp.test(r))throw new TypeError("invalid subtype");var n=p+"/"+r;if(a){if(!typeNameRegExp.test(a))throw new TypeError("invalid suffix");n+="+"+a}if(t&&"object"==typeof t)for(var o,i=Object.keys(t).sort(),s=0;s<i.length;s++){if(o=i[s],!tokenRegExp.test(o))throw new TypeError("invalid parameter name");n+="; "+o+"="+qstring(t[o])}return n}function parse(e){if(!e)throw new TypeError("argument string is required");if("object"==typeof e&&(e=getcontenttype(e)),"string"!=typeof e)throw new TypeError("argument string is required to be a string");var t,r,a,p=e.indexOf(";"),n=-1!==p?e.substr(0,p):e,o=splitType(n),i={};for(paramRegExp.lastIndex=p;r=paramRegExp.exec(e);){if(r.index!==p)throw new TypeError("invalid parameter format");p+=r[0].length,t=r[1].toLowerCase(),a=r[2],'"'===a[0]&&(a=a.substr(1,a.length-2).replace(qescRegExp,"$1")),i[t]=a}if(-1!==p&&p!==e.length)throw new TypeError("invalid parameter format");return o.parameters=i,o}function getcontenttype(e){return"function"==typeof e.getHeader?e.getHeader("content-type"):"object"==typeof e.headers?e.headers&&e.headers["content-type"]:void 0}function qstring(e){var t=String(e);if(tokenRegExp.test(t))return t;if(t.length>0&&!textRegExp.test(t))throw new TypeError("invalid parameter value");return'"'+t.replace(quoteRegExp,"\\$1")+'"'}function splitType(e){var t=typeRegExp.exec(e.toLowerCase());if(!t)throw new TypeError("invalid media type");var r,a=t[1],p=t[2],n=p.lastIndexOf("+");-1!==n&&(r=p.substr(n+1),p=p.substr(0,n));var o={type:a,subtype:p,suffix:r};return o}var paramRegExp=/; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u0020-\u007e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g,textRegExp=/^[\u0020-\u007e\u0080-\u00ff]+$/,tokenRegExp=/^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/,qescRegExp=/\\([\u0000-\u007f])/g,quoteRegExp=/([\\"])/g,subtypeNameRegExp=/^[A-Za-z0-9][A-Za-z0-9!#$&^_.-]{0,126}$/,typeNameRegExp=/^[A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126}$/,typeRegExp=/^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;exports.format=format,exports.parse=parse;

},{}],34:[function(require,module,exports){
"use strict";function merge(r,e,t){if(!r)throw new TypeError("argument dest is required");if(!e)throw new TypeError("argument src is required");return void 0===t&&(t=!0),Object.getOwnPropertyNames(e).forEach(function(o){if(t||!hasOwnProperty.call(r,o)){var n=Object.getOwnPropertyDescriptor(e,o);Object.defineProperty(r,o,n)}}),r}module.exports=merge;var hasOwnProperty=Object.prototype.hasOwnProperty;

},{}],35:[function(require,module,exports){
"use strict";function getCurrentNodeMethods(){return http.METHODS&&http.METHODS.map(function(t){return t.toLowerCase()})}function getBasicNodeMethods(){return["get","post","put","head","delete","options","trace","copy","lock","mkcol","move","purge","propfind","proppatch","unlock","report","mkactivity","checkout","merge","m-search","notify","subscribe","unsubscribe","patch","search","connect"]}var http=require("http");module.exports=getCurrentNodeMethods()||getBasicNodeMethods();

},{"http":85}],36:[function(require,module,exports){
module.exports={
  "application/1d-interleaved-parityfec": {
    "source": "iana"
  },
  "application/3gpdash-qoe-report+xml": {
    "source": "iana"
  },
  "application/3gpp-ims+xml": {
    "source": "iana"
  },
  "application/a2l": {
    "source": "iana"
  },
  "application/activemessage": {
    "source": "iana"
  },
  "application/alto-costmap+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-costmapfilter+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-directory+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-endpointcost+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-endpointcostparams+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-endpointprop+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-endpointpropparams+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-error+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-networkmap+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-networkmapfilter+json": {
    "source": "iana",
    "compressible": true
  },
  "application/aml": {
    "source": "iana"
  },
  "application/andrew-inset": {
    "source": "iana",
    "extensions": ["ez"]
  },
  "application/applefile": {
    "source": "iana"
  },
  "application/applixware": {
    "source": "apache",
    "extensions": ["aw"]
  },
  "application/atf": {
    "source": "iana"
  },
  "application/atfx": {
    "source": "iana"
  },
  "application/atom+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["atom"]
  },
  "application/atomcat+xml": {
    "source": "iana",
    "extensions": ["atomcat"]
  },
  "application/atomdeleted+xml": {
    "source": "iana"
  },
  "application/atomicmail": {
    "source": "iana"
  },
  "application/atomsvc+xml": {
    "source": "iana",
    "extensions": ["atomsvc"]
  },
  "application/atxml": {
    "source": "iana"
  },
  "application/auth-policy+xml": {
    "source": "iana"
  },
  "application/bacnet-xdd+zip": {
    "source": "iana"
  },
  "application/batch-smtp": {
    "source": "iana"
  },
  "application/bdoc": {
    "compressible": false,
    "extensions": ["bdoc"]
  },
  "application/beep+xml": {
    "source": "iana"
  },
  "application/calendar+json": {
    "source": "iana",
    "compressible": true
  },
  "application/calendar+xml": {
    "source": "iana"
  },
  "application/call-completion": {
    "source": "iana"
  },
  "application/cals-1840": {
    "source": "iana"
  },
  "application/cbor": {
    "source": "iana"
  },
  "application/ccmp+xml": {
    "source": "iana"
  },
  "application/ccxml+xml": {
    "source": "iana",
    "extensions": ["ccxml"]
  },
  "application/cdfx+xml": {
    "source": "iana"
  },
  "application/cdmi-capability": {
    "source": "iana",
    "extensions": ["cdmia"]
  },
  "application/cdmi-container": {
    "source": "iana",
    "extensions": ["cdmic"]
  },
  "application/cdmi-domain": {
    "source": "iana",
    "extensions": ["cdmid"]
  },
  "application/cdmi-object": {
    "source": "iana",
    "extensions": ["cdmio"]
  },
  "application/cdmi-queue": {
    "source": "iana",
    "extensions": ["cdmiq"]
  },
  "application/cdni": {
    "source": "iana"
  },
  "application/cea": {
    "source": "iana"
  },
  "application/cea-2018+xml": {
    "source": "iana"
  },
  "application/cellml+xml": {
    "source": "iana"
  },
  "application/cfw": {
    "source": "iana"
  },
  "application/cms": {
    "source": "iana"
  },
  "application/cnrp+xml": {
    "source": "iana"
  },
  "application/coap-group+json": {
    "source": "iana",
    "compressible": true
  },
  "application/commonground": {
    "source": "iana"
  },
  "application/conference-info+xml": {
    "source": "iana"
  },
  "application/cpl+xml": {
    "source": "iana"
  },
  "application/csrattrs": {
    "source": "iana"
  },
  "application/csta+xml": {
    "source": "iana"
  },
  "application/cstadata+xml": {
    "source": "iana"
  },
  "application/csvm+json": {
    "source": "iana",
    "compressible": true
  },
  "application/cu-seeme": {
    "source": "apache",
    "extensions": ["cu"]
  },
  "application/cybercash": {
    "source": "iana"
  },
  "application/dart": {
    "compressible": true
  },
  "application/dash+xml": {
    "source": "iana",
    "extensions": ["mpd"]
  },
  "application/dashdelta": {
    "source": "iana"
  },
  "application/davmount+xml": {
    "source": "iana",
    "extensions": ["davmount"]
  },
  "application/dca-rft": {
    "source": "iana"
  },
  "application/dcd": {
    "source": "iana"
  },
  "application/dec-dx": {
    "source": "iana"
  },
  "application/dialog-info+xml": {
    "source": "iana"
  },
  "application/dicom": {
    "source": "iana"
  },
  "application/dii": {
    "source": "iana"
  },
  "application/dit": {
    "source": "iana"
  },
  "application/dns": {
    "source": "iana"
  },
  "application/docbook+xml": {
    "source": "apache",
    "extensions": ["dbk"]
  },
  "application/dskpp+xml": {
    "source": "iana"
  },
  "application/dssc+der": {
    "source": "iana",
    "extensions": ["dssc"]
  },
  "application/dssc+xml": {
    "source": "iana",
    "extensions": ["xdssc"]
  },
  "application/dvcs": {
    "source": "iana"
  },
  "application/ecmascript": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ecma"]
  },
  "application/edi-consent": {
    "source": "iana"
  },
  "application/edi-x12": {
    "source": "iana",
    "compressible": false
  },
  "application/edifact": {
    "source": "iana",
    "compressible": false
  },
  "application/emergencycalldata.comment+xml": {
    "source": "iana"
  },
  "application/emergencycalldata.deviceinfo+xml": {
    "source": "iana"
  },
  "application/emergencycalldata.providerinfo+xml": {
    "source": "iana"
  },
  "application/emergencycalldata.serviceinfo+xml": {
    "source": "iana"
  },
  "application/emergencycalldata.subscriberinfo+xml": {
    "source": "iana"
  },
  "application/emma+xml": {
    "source": "iana",
    "extensions": ["emma"]
  },
  "application/emotionml+xml": {
    "source": "iana"
  },
  "application/encaprtp": {
    "source": "iana"
  },
  "application/epp+xml": {
    "source": "iana"
  },
  "application/epub+zip": {
    "source": "iana",
    "extensions": ["epub"]
  },
  "application/eshop": {
    "source": "iana"
  },
  "application/exi": {
    "source": "iana",
    "extensions": ["exi"]
  },
  "application/fastinfoset": {
    "source": "iana"
  },
  "application/fastsoap": {
    "source": "iana"
  },
  "application/fdt+xml": {
    "source": "iana"
  },
  "application/fits": {
    "source": "iana"
  },
  "application/font-sfnt": {
    "source": "iana"
  },
  "application/font-tdpfr": {
    "source": "iana",
    "extensions": ["pfr"]
  },
  "application/font-woff": {
    "source": "iana",
    "compressible": false,
    "extensions": ["woff"]
  },
  "application/font-woff2": {
    "compressible": false,
    "extensions": ["woff2"]
  },
  "application/framework-attributes+xml": {
    "source": "iana"
  },
  "application/gml+xml": {
    "source": "apache",
    "extensions": ["gml"]
  },
  "application/gpx+xml": {
    "source": "apache",
    "extensions": ["gpx"]
  },
  "application/gxf": {
    "source": "apache",
    "extensions": ["gxf"]
  },
  "application/gzip": {
    "source": "iana",
    "compressible": false
  },
  "application/h224": {
    "source": "iana"
  },
  "application/held+xml": {
    "source": "iana"
  },
  "application/http": {
    "source": "iana"
  },
  "application/hyperstudio": {
    "source": "iana",
    "extensions": ["stk"]
  },
  "application/ibe-key-request+xml": {
    "source": "iana"
  },
  "application/ibe-pkg-reply+xml": {
    "source": "iana"
  },
  "application/ibe-pp-data": {
    "source": "iana"
  },
  "application/iges": {
    "source": "iana"
  },
  "application/im-iscomposing+xml": {
    "source": "iana"
  },
  "application/index": {
    "source": "iana"
  },
  "application/index.cmd": {
    "source": "iana"
  },
  "application/index.obj": {
    "source": "iana"
  },
  "application/index.response": {
    "source": "iana"
  },
  "application/index.vnd": {
    "source": "iana"
  },
  "application/inkml+xml": {
    "source": "iana",
    "extensions": ["ink","inkml"]
  },
  "application/iotp": {
    "source": "iana"
  },
  "application/ipfix": {
    "source": "iana",
    "extensions": ["ipfix"]
  },
  "application/ipp": {
    "source": "iana"
  },
  "application/isup": {
    "source": "iana"
  },
  "application/its+xml": {
    "source": "iana"
  },
  "application/java-archive": {
    "source": "apache",
    "compressible": false,
    "extensions": ["jar","war","ear"]
  },
  "application/java-serialized-object": {
    "source": "apache",
    "compressible": false,
    "extensions": ["ser"]
  },
  "application/java-vm": {
    "source": "apache",
    "compressible": false,
    "extensions": ["class"]
  },
  "application/javascript": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["js"]
  },
  "application/jose": {
    "source": "iana"
  },
  "application/jose+json": {
    "source": "iana",
    "compressible": true
  },
  "application/jrd+json": {
    "source": "iana",
    "compressible": true
  },
  "application/json": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["json","map"]
  },
  "application/json-patch+json": {
    "source": "iana",
    "compressible": true
  },
  "application/json-seq": {
    "source": "iana"
  },
  "application/json5": {
    "extensions": ["json5"]
  },
  "application/jsonml+json": {
    "source": "apache",
    "compressible": true,
    "extensions": ["jsonml"]
  },
  "application/jwk+json": {
    "source": "iana",
    "compressible": true
  },
  "application/jwk-set+json": {
    "source": "iana",
    "compressible": true
  },
  "application/jwt": {
    "source": "iana"
  },
  "application/kpml-request+xml": {
    "source": "iana"
  },
  "application/kpml-response+xml": {
    "source": "iana"
  },
  "application/ld+json": {
    "source": "iana",
    "compressible": true,
    "extensions": ["jsonld"]
  },
  "application/link-format": {
    "source": "iana"
  },
  "application/load-control+xml": {
    "source": "iana"
  },
  "application/lost+xml": {
    "source": "iana",
    "extensions": ["lostxml"]
  },
  "application/lostsync+xml": {
    "source": "iana"
  },
  "application/lxf": {
    "source": "iana"
  },
  "application/mac-binhex40": {
    "source": "iana",
    "extensions": ["hqx"]
  },
  "application/mac-compactpro": {
    "source": "apache",
    "extensions": ["cpt"]
  },
  "application/macwriteii": {
    "source": "iana"
  },
  "application/mads+xml": {
    "source": "iana",
    "extensions": ["mads"]
  },
  "application/manifest+json": {
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["webmanifest"]
  },
  "application/marc": {
    "source": "iana",
    "extensions": ["mrc"]
  },
  "application/marcxml+xml": {
    "source": "iana",
    "extensions": ["mrcx"]
  },
  "application/mathematica": {
    "source": "iana",
    "extensions": ["ma","nb","mb"]
  },
  "application/mathml+xml": {
    "source": "iana",
    "extensions": ["mathml"]
  },
  "application/mathml-content+xml": {
    "source": "iana"
  },
  "application/mathml-presentation+xml": {
    "source": "iana"
  },
  "application/mbms-associated-procedure-description+xml": {
    "source": "iana"
  },
  "application/mbms-deregister+xml": {
    "source": "iana"
  },
  "application/mbms-envelope+xml": {
    "source": "iana"
  },
  "application/mbms-msk+xml": {
    "source": "iana"
  },
  "application/mbms-msk-response+xml": {
    "source": "iana"
  },
  "application/mbms-protection-description+xml": {
    "source": "iana"
  },
  "application/mbms-reception-report+xml": {
    "source": "iana"
  },
  "application/mbms-register+xml": {
    "source": "iana"
  },
  "application/mbms-register-response+xml": {
    "source": "iana"
  },
  "application/mbms-schedule+xml": {
    "source": "iana"
  },
  "application/mbms-user-service-description+xml": {
    "source": "iana"
  },
  "application/mbox": {
    "source": "iana",
    "extensions": ["mbox"]
  },
  "application/media-policy-dataset+xml": {
    "source": "iana"
  },
  "application/media_control+xml": {
    "source": "iana"
  },
  "application/mediaservercontrol+xml": {
    "source": "iana",
    "extensions": ["mscml"]
  },
  "application/merge-patch+json": {
    "source": "iana",
    "compressible": true
  },
  "application/metalink+xml": {
    "source": "apache",
    "extensions": ["metalink"]
  },
  "application/metalink4+xml": {
    "source": "iana",
    "extensions": ["meta4"]
  },
  "application/mets+xml": {
    "source": "iana",
    "extensions": ["mets"]
  },
  "application/mf4": {
    "source": "iana"
  },
  "application/mikey": {
    "source": "iana"
  },
  "application/mods+xml": {
    "source": "iana",
    "extensions": ["mods"]
  },
  "application/moss-keys": {
    "source": "iana"
  },
  "application/moss-signature": {
    "source": "iana"
  },
  "application/mosskey-data": {
    "source": "iana"
  },
  "application/mosskey-request": {
    "source": "iana"
  },
  "application/mp21": {
    "source": "iana",
    "extensions": ["m21","mp21"]
  },
  "application/mp4": {
    "source": "iana",
    "extensions": ["mp4s","m4p"]
  },
  "application/mpeg4-generic": {
    "source": "iana"
  },
  "application/mpeg4-iod": {
    "source": "iana"
  },
  "application/mpeg4-iod-xmt": {
    "source": "iana"
  },
  "application/mrb-consumer+xml": {
    "source": "iana"
  },
  "application/mrb-publish+xml": {
    "source": "iana"
  },
  "application/msc-ivr+xml": {
    "source": "iana"
  },
  "application/msc-mixer+xml": {
    "source": "iana"
  },
  "application/msword": {
    "source": "iana",
    "compressible": false,
    "extensions": ["doc","dot"]
  },
  "application/mxf": {
    "source": "iana",
    "extensions": ["mxf"]
  },
  "application/nasdata": {
    "source": "iana"
  },
  "application/news-checkgroups": {
    "source": "iana"
  },
  "application/news-groupinfo": {
    "source": "iana"
  },
  "application/news-transmission": {
    "source": "iana"
  },
  "application/nlsml+xml": {
    "source": "iana"
  },
  "application/nss": {
    "source": "iana"
  },
  "application/ocsp-request": {
    "source": "iana"
  },
  "application/ocsp-response": {
    "source": "iana"
  },
  "application/octet-stream": {
    "source": "iana",
    "compressible": false,
    "extensions": ["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]
  },
  "application/oda": {
    "source": "iana",
    "extensions": ["oda"]
  },
  "application/odx": {
    "source": "iana"
  },
  "application/oebps-package+xml": {
    "source": "iana",
    "extensions": ["opf"]
  },
  "application/ogg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ogx"]
  },
  "application/omdoc+xml": {
    "source": "apache",
    "extensions": ["omdoc"]
  },
  "application/onenote": {
    "source": "apache",
    "extensions": ["onetoc","onetoc2","onetmp","onepkg"]
  },
  "application/oxps": {
    "source": "iana",
    "extensions": ["oxps"]
  },
  "application/p2p-overlay+xml": {
    "source": "iana"
  },
  "application/parityfec": {
    "source": "iana"
  },
  "application/patch-ops-error+xml": {
    "source": "iana",
    "extensions": ["xer"]
  },
  "application/pdf": {
    "source": "iana",
    "compressible": false,
    "extensions": ["pdf"]
  },
  "application/pdx": {
    "source": "iana"
  },
  "application/pgp-encrypted": {
    "source": "iana",
    "compressible": false,
    "extensions": ["pgp"]
  },
  "application/pgp-keys": {
    "source": "iana"
  },
  "application/pgp-signature": {
    "source": "iana",
    "extensions": ["asc","sig"]
  },
  "application/pics-rules": {
    "source": "apache",
    "extensions": ["prf"]
  },
  "application/pidf+xml": {
    "source": "iana"
  },
  "application/pidf-diff+xml": {
    "source": "iana"
  },
  "application/pkcs10": {
    "source": "iana",
    "extensions": ["p10"]
  },
  "application/pkcs12": {
    "source": "iana"
  },
  "application/pkcs7-mime": {
    "source": "iana",
    "extensions": ["p7m","p7c"]
  },
  "application/pkcs7-signature": {
    "source": "iana",
    "extensions": ["p7s"]
  },
  "application/pkcs8": {
    "source": "iana",
    "extensions": ["p8"]
  },
  "application/pkix-attr-cert": {
    "source": "iana",
    "extensions": ["ac"]
  },
  "application/pkix-cert": {
    "source": "iana",
    "extensions": ["cer"]
  },
  "application/pkix-crl": {
    "source": "iana",
    "extensions": ["crl"]
  },
  "application/pkix-pkipath": {
    "source": "iana",
    "extensions": ["pkipath"]
  },
  "application/pkixcmp": {
    "source": "iana",
    "extensions": ["pki"]
  },
  "application/pls+xml": {
    "source": "iana",
    "extensions": ["pls"]
  },
  "application/poc-settings+xml": {
    "source": "iana"
  },
  "application/postscript": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ai","eps","ps"]
  },
  "application/ppsp-tracker+json": {
    "source": "iana",
    "compressible": true
  },
  "application/problem+json": {
    "source": "iana",
    "compressible": true
  },
  "application/problem+xml": {
    "source": "iana"
  },
  "application/provenance+xml": {
    "source": "iana"
  },
  "application/prs.alvestrand.titrax-sheet": {
    "source": "iana"
  },
  "application/prs.cww": {
    "source": "iana",
    "extensions": ["cww"]
  },
  "application/prs.hpub+zip": {
    "source": "iana"
  },
  "application/prs.nprend": {
    "source": "iana"
  },
  "application/prs.plucker": {
    "source": "iana"
  },
  "application/prs.rdf-xml-crypt": {
    "source": "iana"
  },
  "application/prs.xsf+xml": {
    "source": "iana"
  },
  "application/pskc+xml": {
    "source": "iana",
    "extensions": ["pskcxml"]
  },
  "application/qsig": {
    "source": "iana"
  },
  "application/raptorfec": {
    "source": "iana"
  },
  "application/rdap+json": {
    "source": "iana",
    "compressible": true
  },
  "application/rdf+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rdf"]
  },
  "application/reginfo+xml": {
    "source": "iana",
    "extensions": ["rif"]
  },
  "application/relax-ng-compact-syntax": {
    "source": "iana",
    "extensions": ["rnc"]
  },
  "application/remote-printing": {
    "source": "iana"
  },
  "application/reputon+json": {
    "source": "iana",
    "compressible": true
  },
  "application/resource-lists+xml": {
    "source": "iana",
    "extensions": ["rl"]
  },
  "application/resource-lists-diff+xml": {
    "source": "iana",
    "extensions": ["rld"]
  },
  "application/rfc+xml": {
    "source": "iana"
  },
  "application/riscos": {
    "source": "iana"
  },
  "application/rlmi+xml": {
    "source": "iana"
  },
  "application/rls-services+xml": {
    "source": "iana",
    "extensions": ["rs"]
  },
  "application/rpki-ghostbusters": {
    "source": "iana",
    "extensions": ["gbr"]
  },
  "application/rpki-manifest": {
    "source": "iana",
    "extensions": ["mft"]
  },
  "application/rpki-roa": {
    "source": "iana",
    "extensions": ["roa"]
  },
  "application/rpki-updown": {
    "source": "iana"
  },
  "application/rsd+xml": {
    "source": "apache",
    "extensions": ["rsd"]
  },
  "application/rss+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["rss"]
  },
  "application/rtf": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rtf"]
  },
  "application/rtploopback": {
    "source": "iana"
  },
  "application/rtx": {
    "source": "iana"
  },
  "application/samlassertion+xml": {
    "source": "iana"
  },
  "application/samlmetadata+xml": {
    "source": "iana"
  },
  "application/sbml+xml": {
    "source": "iana",
    "extensions": ["sbml"]
  },
  "application/scaip+xml": {
    "source": "iana"
  },
  "application/scim+json": {
    "source": "iana",
    "compressible": true
  },
  "application/scvp-cv-request": {
    "source": "iana",
    "extensions": ["scq"]
  },
  "application/scvp-cv-response": {
    "source": "iana",
    "extensions": ["scs"]
  },
  "application/scvp-vp-request": {
    "source": "iana",
    "extensions": ["spq"]
  },
  "application/scvp-vp-response": {
    "source": "iana",
    "extensions": ["spp"]
  },
  "application/sdp": {
    "source": "iana",
    "extensions": ["sdp"]
  },
  "application/sep+xml": {
    "source": "iana"
  },
  "application/sep-exi": {
    "source": "iana"
  },
  "application/session-info": {
    "source": "iana"
  },
  "application/set-payment": {
    "source": "iana"
  },
  "application/set-payment-initiation": {
    "source": "iana",
    "extensions": ["setpay"]
  },
  "application/set-registration": {
    "source": "iana"
  },
  "application/set-registration-initiation": {
    "source": "iana",
    "extensions": ["setreg"]
  },
  "application/sgml": {
    "source": "iana"
  },
  "application/sgml-open-catalog": {
    "source": "iana"
  },
  "application/shf+xml": {
    "source": "iana",
    "extensions": ["shf"]
  },
  "application/sieve": {
    "source": "iana"
  },
  "application/simple-filter+xml": {
    "source": "iana"
  },
  "application/simple-message-summary": {
    "source": "iana"
  },
  "application/simplesymbolcontainer": {
    "source": "iana"
  },
  "application/slate": {
    "source": "iana"
  },
  "application/smil": {
    "source": "iana"
  },
  "application/smil+xml": {
    "source": "iana",
    "extensions": ["smi","smil"]
  },
  "application/smpte336m": {
    "source": "iana"
  },
  "application/soap+fastinfoset": {
    "source": "iana"
  },
  "application/soap+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/sparql-query": {
    "source": "iana",
    "extensions": ["rq"]
  },
  "application/sparql-results+xml": {
    "source": "iana",
    "extensions": ["srx"]
  },
  "application/spirits-event+xml": {
    "source": "iana"
  },
  "application/sql": {
    "source": "iana"
  },
  "application/srgs": {
    "source": "iana",
    "extensions": ["gram"]
  },
  "application/srgs+xml": {
    "source": "iana",
    "extensions": ["grxml"]
  },
  "application/sru+xml": {
    "source": "iana",
    "extensions": ["sru"]
  },
  "application/ssdl+xml": {
    "source": "apache",
    "extensions": ["ssdl"]
  },
  "application/ssml+xml": {
    "source": "iana",
    "extensions": ["ssml"]
  },
  "application/tamp-apex-update": {
    "source": "iana"
  },
  "application/tamp-apex-update-confirm": {
    "source": "iana"
  },
  "application/tamp-community-update": {
    "source": "iana"
  },
  "application/tamp-community-update-confirm": {
    "source": "iana"
  },
  "application/tamp-error": {
    "source": "iana"
  },
  "application/tamp-sequence-adjust": {
    "source": "iana"
  },
  "application/tamp-sequence-adjust-confirm": {
    "source": "iana"
  },
  "application/tamp-status-query": {
    "source": "iana"
  },
  "application/tamp-status-response": {
    "source": "iana"
  },
  "application/tamp-update": {
    "source": "iana"
  },
  "application/tamp-update-confirm": {
    "source": "iana"
  },
  "application/tar": {
    "compressible": true
  },
  "application/tei+xml": {
    "source": "iana",
    "extensions": ["tei","teicorpus"]
  },
  "application/thraud+xml": {
    "source": "iana",
    "extensions": ["tfi"]
  },
  "application/timestamp-query": {
    "source": "iana"
  },
  "application/timestamp-reply": {
    "source": "iana"
  },
  "application/timestamped-data": {
    "source": "iana",
    "extensions": ["tsd"]
  },
  "application/ttml+xml": {
    "source": "iana"
  },
  "application/tve-trigger": {
    "source": "iana"
  },
  "application/ulpfec": {
    "source": "iana"
  },
  "application/urc-grpsheet+xml": {
    "source": "iana"
  },
  "application/urc-ressheet+xml": {
    "source": "iana"
  },
  "application/urc-targetdesc+xml": {
    "source": "iana"
  },
  "application/urc-uisocketdesc+xml": {
    "source": "iana"
  },
  "application/vcard+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vcard+xml": {
    "source": "iana"
  },
  "application/vemmi": {
    "source": "iana"
  },
  "application/vividence.scriptfile": {
    "source": "apache"
  },
  "application/vnd.3gpp-prose+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp-prose-pc3ch+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp.access-transfer-events+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp.bsf+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp.mid-call+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp.pic-bw-large": {
    "source": "iana",
    "extensions": ["plb"]
  },
  "application/vnd.3gpp.pic-bw-small": {
    "source": "iana",
    "extensions": ["psb"]
  },
  "application/vnd.3gpp.pic-bw-var": {
    "source": "iana",
    "extensions": ["pvb"]
  },
  "application/vnd.3gpp.sms": {
    "source": "iana"
  },
  "application/vnd.3gpp.srvcc-ext+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp.srvcc-info+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp.state-and-event-info+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp.ussd+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp2.bcmcsinfo+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp2.sms": {
    "source": "iana"
  },
  "application/vnd.3gpp2.tcap": {
    "source": "iana",
    "extensions": ["tcap"]
  },
  "application/vnd.3m.post-it-notes": {
    "source": "iana",
    "extensions": ["pwn"]
  },
  "application/vnd.accpac.simply.aso": {
    "source": "iana",
    "extensions": ["aso"]
  },
  "application/vnd.accpac.simply.imp": {
    "source": "iana",
    "extensions": ["imp"]
  },
  "application/vnd.acucobol": {
    "source": "iana",
    "extensions": ["acu"]
  },
  "application/vnd.acucorp": {
    "source": "iana",
    "extensions": ["atc","acutc"]
  },
  "application/vnd.adobe.air-application-installer-package+zip": {
    "source": "apache",
    "extensions": ["air"]
  },
  "application/vnd.adobe.flash.movie": {
    "source": "iana"
  },
  "application/vnd.adobe.formscentral.fcdt": {
    "source": "iana",
    "extensions": ["fcdt"]
  },
  "application/vnd.adobe.fxp": {
    "source": "iana",
    "extensions": ["fxp","fxpl"]
  },
  "application/vnd.adobe.partial-upload": {
    "source": "iana"
  },
  "application/vnd.adobe.xdp+xml": {
    "source": "iana",
    "extensions": ["xdp"]
  },
  "application/vnd.adobe.xfdf": {
    "source": "iana",
    "extensions": ["xfdf"]
  },
  "application/vnd.aether.imp": {
    "source": "iana"
  },
  "application/vnd.ah-barcode": {
    "source": "iana"
  },
  "application/vnd.ahead.space": {
    "source": "iana",
    "extensions": ["ahead"]
  },
  "application/vnd.airzip.filesecure.azf": {
    "source": "iana",
    "extensions": ["azf"]
  },
  "application/vnd.airzip.filesecure.azs": {
    "source": "iana",
    "extensions": ["azs"]
  },
  "application/vnd.amazon.ebook": {
    "source": "apache",
    "extensions": ["azw"]
  },
  "application/vnd.americandynamics.acc": {
    "source": "iana",
    "extensions": ["acc"]
  },
  "application/vnd.amiga.ami": {
    "source": "iana",
    "extensions": ["ami"]
  },
  "application/vnd.amundsen.maze+xml": {
    "source": "iana"
  },
  "application/vnd.android.package-archive": {
    "source": "apache",
    "compressible": false,
    "extensions": ["apk"]
  },
  "application/vnd.anki": {
    "source": "iana"
  },
  "application/vnd.anser-web-certificate-issue-initiation": {
    "source": "iana",
    "extensions": ["cii"]
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    "source": "apache",
    "extensions": ["fti"]
  },
  "application/vnd.antix.game-component": {
    "source": "iana",
    "extensions": ["atx"]
  },
  "application/vnd.apache.thrift.binary": {
    "source": "iana"
  },
  "application/vnd.apache.thrift.compact": {
    "source": "iana"
  },
  "application/vnd.apache.thrift.json": {
    "source": "iana"
  },
  "application/vnd.api+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.apple.installer+xml": {
    "source": "iana",
    "extensions": ["mpkg"]
  },
  "application/vnd.apple.mpegurl": {
    "source": "iana",
    "extensions": ["m3u8"]
  },
  "application/vnd.apple.pkpass": {
    "compressible": false,
    "extensions": ["pkpass"]
  },
  "application/vnd.arastra.swi": {
    "source": "iana"
  },
  "application/vnd.aristanetworks.swi": {
    "source": "iana",
    "extensions": ["swi"]
  },
  "application/vnd.artsquare": {
    "source": "iana"
  },
  "application/vnd.astraea-software.iota": {
    "source": "iana",
    "extensions": ["iota"]
  },
  "application/vnd.audiograph": {
    "source": "iana",
    "extensions": ["aep"]
  },
  "application/vnd.autopackage": {
    "source": "iana"
  },
  "application/vnd.avistar+xml": {
    "source": "iana"
  },
  "application/vnd.balsamiq.bmml+xml": {
    "source": "iana"
  },
  "application/vnd.balsamiq.bmpr": {
    "source": "iana"
  },
  "application/vnd.bekitzur-stech+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.biopax.rdf+xml": {
    "source": "iana"
  },
  "application/vnd.blueice.multipass": {
    "source": "iana",
    "extensions": ["mpm"]
  },
  "application/vnd.bluetooth.ep.oob": {
    "source": "iana"
  },
  "application/vnd.bluetooth.le.oob": {
    "source": "iana"
  },
  "application/vnd.bmi": {
    "source": "iana",
    "extensions": ["bmi"]
  },
  "application/vnd.businessobjects": {
    "source": "iana",
    "extensions": ["rep"]
  },
  "application/vnd.cab-jscript": {
    "source": "iana"
  },
  "application/vnd.canon-cpdl": {
    "source": "iana"
  },
  "application/vnd.canon-lips": {
    "source": "iana"
  },
  "application/vnd.cendio.thinlinc.clientconf": {
    "source": "iana"
  },
  "application/vnd.century-systems.tcp_stream": {
    "source": "iana"
  },
  "application/vnd.chemdraw+xml": {
    "source": "iana",
    "extensions": ["cdxml"]
  },
  "application/vnd.chipnuts.karaoke-mmd": {
    "source": "iana",
    "extensions": ["mmd"]
  },
  "application/vnd.cinderella": {
    "source": "iana",
    "extensions": ["cdy"]
  },
  "application/vnd.cirpack.isdn-ext": {
    "source": "iana"
  },
  "application/vnd.citationstyles.style+xml": {
    "source": "iana"
  },
  "application/vnd.claymore": {
    "source": "iana",
    "extensions": ["cla"]
  },
  "application/vnd.cloanto.rp9": {
    "source": "iana",
    "extensions": ["rp9"]
  },
  "application/vnd.clonk.c4group": {
    "source": "iana",
    "extensions": ["c4g","c4d","c4f","c4p","c4u"]
  },
  "application/vnd.cluetrust.cartomobile-config": {
    "source": "iana",
    "extensions": ["c11amc"]
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    "source": "iana",
    "extensions": ["c11amz"]
  },
  "application/vnd.coffeescript": {
    "source": "iana"
  },
  "application/vnd.collection+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.collection.doc+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.collection.next+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.commerce-battelle": {
    "source": "iana"
  },
  "application/vnd.commonspace": {
    "source": "iana",
    "extensions": ["csp"]
  },
  "application/vnd.contact.cmsg": {
    "source": "iana",
    "extensions": ["cdbcmsg"]
  },
  "application/vnd.cosmocaller": {
    "source": "iana",
    "extensions": ["cmc"]
  },
  "application/vnd.crick.clicker": {
    "source": "iana",
    "extensions": ["clkx"]
  },
  "application/vnd.crick.clicker.keyboard": {
    "source": "iana",
    "extensions": ["clkk"]
  },
  "application/vnd.crick.clicker.palette": {
    "source": "iana",
    "extensions": ["clkp"]
  },
  "application/vnd.crick.clicker.template": {
    "source": "iana",
    "extensions": ["clkt"]
  },
  "application/vnd.crick.clicker.wordbank": {
    "source": "iana",
    "extensions": ["clkw"]
  },
  "application/vnd.criticaltools.wbs+xml": {
    "source": "iana",
    "extensions": ["wbs"]
  },
  "application/vnd.ctc-posml": {
    "source": "iana",
    "extensions": ["pml"]
  },
  "application/vnd.ctct.ws+xml": {
    "source": "iana"
  },
  "application/vnd.cups-pdf": {
    "source": "iana"
  },
  "application/vnd.cups-postscript": {
    "source": "iana"
  },
  "application/vnd.cups-ppd": {
    "source": "iana",
    "extensions": ["ppd"]
  },
  "application/vnd.cups-raster": {
    "source": "iana"
  },
  "application/vnd.cups-raw": {
    "source": "iana"
  },
  "application/vnd.curl": {
    "source": "iana"
  },
  "application/vnd.curl.car": {
    "source": "apache",
    "extensions": ["car"]
  },
  "application/vnd.curl.pcurl": {
    "source": "apache",
    "extensions": ["pcurl"]
  },
  "application/vnd.cyan.dean.root+xml": {
    "source": "iana"
  },
  "application/vnd.cybank": {
    "source": "iana"
  },
  "application/vnd.dart": {
    "source": "iana",
    "compressible": true,
    "extensions": ["dart"]
  },
  "application/vnd.data-vision.rdz": {
    "source": "iana",
    "extensions": ["rdz"]
  },
  "application/vnd.debian.binary-package": {
    "source": "iana"
  },
  "application/vnd.dece.data": {
    "source": "iana",
    "extensions": ["uvf","uvvf","uvd","uvvd"]
  },
  "application/vnd.dece.ttml+xml": {
    "source": "iana",
    "extensions": ["uvt","uvvt"]
  },
  "application/vnd.dece.unspecified": {
    "source": "iana",
    "extensions": ["uvx","uvvx"]
  },
  "application/vnd.dece.zip": {
    "source": "iana",
    "extensions": ["uvz","uvvz"]
  },
  "application/vnd.denovo.fcselayout-link": {
    "source": "iana",
    "extensions": ["fe_launch"]
  },
  "application/vnd.desmume-movie": {
    "source": "iana"
  },
  "application/vnd.dir-bi.plate-dl-nosuffix": {
    "source": "iana"
  },
  "application/vnd.dm.delegation+xml": {
    "source": "iana"
  },
  "application/vnd.dna": {
    "source": "iana",
    "extensions": ["dna"]
  },
  "application/vnd.document+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.dolby.mlp": {
    "source": "apache",
    "extensions": ["mlp"]
  },
  "application/vnd.dolby.mobile.1": {
    "source": "iana"
  },
  "application/vnd.dolby.mobile.2": {
    "source": "iana"
  },
  "application/vnd.doremir.scorecloud-binary-document": {
    "source": "iana"
  },
  "application/vnd.dpgraph": {
    "source": "iana",
    "extensions": ["dpg"]
  },
  "application/vnd.dreamfactory": {
    "source": "iana",
    "extensions": ["dfac"]
  },
  "application/vnd.drive+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ds-keypoint": {
    "source": "apache",
    "extensions": ["kpxx"]
  },
  "application/vnd.dtg.local": {
    "source": "iana"
  },
  "application/vnd.dtg.local.flash": {
    "source": "iana"
  },
  "application/vnd.dtg.local.html": {
    "source": "iana"
  },
  "application/vnd.dvb.ait": {
    "source": "iana",
    "extensions": ["ait"]
  },
  "application/vnd.dvb.dvbj": {
    "source": "iana"
  },
  "application/vnd.dvb.esgcontainer": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcdftnotifaccess": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcesgaccess": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcesgaccess2": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcesgpdd": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcroaming": {
    "source": "iana"
  },
  "application/vnd.dvb.iptv.alfec-base": {
    "source": "iana"
  },
  "application/vnd.dvb.iptv.alfec-enhancement": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-container+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-generic+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-init+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.pfr": {
    "source": "iana"
  },
  "application/vnd.dvb.service": {
    "source": "iana",
    "extensions": ["svc"]
  },
  "application/vnd.dxr": {
    "source": "iana"
  },
  "application/vnd.dynageo": {
    "source": "iana",
    "extensions": ["geo"]
  },
  "application/vnd.dzr": {
    "source": "iana"
  },
  "application/vnd.easykaraoke.cdgdownload": {
    "source": "iana"
  },
  "application/vnd.ecdis-update": {
    "source": "iana"
  },
  "application/vnd.ecowin.chart": {
    "source": "iana",
    "extensions": ["mag"]
  },
  "application/vnd.ecowin.filerequest": {
    "source": "iana"
  },
  "application/vnd.ecowin.fileupdate": {
    "source": "iana"
  },
  "application/vnd.ecowin.series": {
    "source": "iana"
  },
  "application/vnd.ecowin.seriesrequest": {
    "source": "iana"
  },
  "application/vnd.ecowin.seriesupdate": {
    "source": "iana"
  },
  "application/vnd.emclient.accessrequest+xml": {
    "source": "iana"
  },
  "application/vnd.enliven": {
    "source": "iana",
    "extensions": ["nml"]
  },
  "application/vnd.enphase.envoy": {
    "source": "iana"
  },
  "application/vnd.eprints.data+xml": {
    "source": "iana"
  },
  "application/vnd.epson.esf": {
    "source": "iana",
    "extensions": ["esf"]
  },
  "application/vnd.epson.msf": {
    "source": "iana",
    "extensions": ["msf"]
  },
  "application/vnd.epson.quickanime": {
    "source": "iana",
    "extensions": ["qam"]
  },
  "application/vnd.epson.salt": {
    "source": "iana",
    "extensions": ["slt"]
  },
  "application/vnd.epson.ssf": {
    "source": "iana",
    "extensions": ["ssf"]
  },
  "application/vnd.ericsson.quickcall": {
    "source": "iana"
  },
  "application/vnd.eszigno3+xml": {
    "source": "iana",
    "extensions": ["es3","et3"]
  },
  "application/vnd.etsi.aoc+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.asic-e+zip": {
    "source": "iana"
  },
  "application/vnd.etsi.asic-s+zip": {
    "source": "iana"
  },
  "application/vnd.etsi.cug+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvcommand+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvdiscovery+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvprofile+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvsad-bc+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvsad-cod+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvsad-npvr+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvservice+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvsync+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvueprofile+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.mcid+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.mheg5": {
    "source": "iana"
  },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.pstn+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.sci+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.simservs+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.timestamp-token": {
    "source": "iana"
  },
  "application/vnd.etsi.tsl+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.tsl.der": {
    "source": "iana"
  },
  "application/vnd.eudora.data": {
    "source": "iana"
  },
  "application/vnd.ezpix-album": {
    "source": "iana",
    "extensions": ["ez2"]
  },
  "application/vnd.ezpix-package": {
    "source": "iana",
    "extensions": ["ez3"]
  },
  "application/vnd.f-secure.mobile": {
    "source": "iana"
  },
  "application/vnd.fastcopy-disk-image": {
    "source": "iana"
  },
  "application/vnd.fdf": {
    "source": "iana",
    "extensions": ["fdf"]
  },
  "application/vnd.fdsn.mseed": {
    "source": "iana",
    "extensions": ["mseed"]
  },
  "application/vnd.fdsn.seed": {
    "source": "iana",
    "extensions": ["seed","dataless"]
  },
  "application/vnd.ffsns": {
    "source": "iana"
  },
  "application/vnd.filmit.zfc": {
    "source": "iana"
  },
  "application/vnd.fints": {
    "source": "iana"
  },
  "application/vnd.firemonkeys.cloudcell": {
    "source": "iana"
  },
  "application/vnd.flographit": {
    "source": "iana",
    "extensions": ["gph"]
  },
  "application/vnd.fluxtime.clip": {
    "source": "iana",
    "extensions": ["ftc"]
  },
  "application/vnd.font-fontforge-sfd": {
    "source": "iana"
  },
  "application/vnd.framemaker": {
    "source": "iana",
    "extensions": ["fm","frame","maker","book"]
  },
  "application/vnd.frogans.fnc": {
    "source": "iana",
    "extensions": ["fnc"]
  },
  "application/vnd.frogans.ltf": {
    "source": "iana",
    "extensions": ["ltf"]
  },
  "application/vnd.fsc.weblaunch": {
    "source": "iana",
    "extensions": ["fsc"]
  },
  "application/vnd.fujitsu.oasys": {
    "source": "iana",
    "extensions": ["oas"]
  },
  "application/vnd.fujitsu.oasys2": {
    "source": "iana",
    "extensions": ["oa2"]
  },
  "application/vnd.fujitsu.oasys3": {
    "source": "iana",
    "extensions": ["oa3"]
  },
  "application/vnd.fujitsu.oasysgp": {
    "source": "iana",
    "extensions": ["fg5"]
  },
  "application/vnd.fujitsu.oasysprs": {
    "source": "iana",
    "extensions": ["bh2"]
  },
  "application/vnd.fujixerox.art-ex": {
    "source": "iana"
  },
  "application/vnd.fujixerox.art4": {
    "source": "iana"
  },
  "application/vnd.fujixerox.ddd": {
    "source": "iana",
    "extensions": ["ddd"]
  },
  "application/vnd.fujixerox.docuworks": {
    "source": "iana",
    "extensions": ["xdw"]
  },
  "application/vnd.fujixerox.docuworks.binder": {
    "source": "iana",
    "extensions": ["xbd"]
  },
  "application/vnd.fujixerox.docuworks.container": {
    "source": "iana"
  },
  "application/vnd.fujixerox.hbpl": {
    "source": "iana"
  },
  "application/vnd.fut-misnet": {
    "source": "iana"
  },
  "application/vnd.fuzzysheet": {
    "source": "iana",
    "extensions": ["fzs"]
  },
  "application/vnd.genomatix.tuxedo": {
    "source": "iana",
    "extensions": ["txd"]
  },
  "application/vnd.geo+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.geocube+xml": {
    "source": "iana"
  },
  "application/vnd.geogebra.file": {
    "source": "iana",
    "extensions": ["ggb"]
  },
  "application/vnd.geogebra.tool": {
    "source": "iana",
    "extensions": ["ggt"]
  },
  "application/vnd.geometry-explorer": {
    "source": "iana",
    "extensions": ["gex","gre"]
  },
  "application/vnd.geonext": {
    "source": "iana",
    "extensions": ["gxt"]
  },
  "application/vnd.geoplan": {
    "source": "iana",
    "extensions": ["g2w"]
  },
  "application/vnd.geospace": {
    "source": "iana",
    "extensions": ["g3w"]
  },
  "application/vnd.gerber": {
    "source": "iana"
  },
  "application/vnd.globalplatform.card-content-mgt": {
    "source": "iana"
  },
  "application/vnd.globalplatform.card-content-mgt-response": {
    "source": "iana"
  },
  "application/vnd.gmx": {
    "source": "iana",
    "extensions": ["gmx"]
  },
  "application/vnd.google-apps.document": {
    "compressible": false,
    "extensions": ["gdoc"]
  },
  "application/vnd.google-apps.presentation": {
    "compressible": false,
    "extensions": ["gslides"]
  },
  "application/vnd.google-apps.spreadsheet": {
    "compressible": false,
    "extensions": ["gsheet"]
  },
  "application/vnd.google-earth.kml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["kml"]
  },
  "application/vnd.google-earth.kmz": {
    "source": "iana",
    "compressible": false,
    "extensions": ["kmz"]
  },
  "application/vnd.gov.sk.e-form+xml": {
    "source": "iana"
  },
  "application/vnd.gov.sk.e-form+zip": {
    "source": "iana"
  },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    "source": "iana"
  },
  "application/vnd.grafeq": {
    "source": "iana",
    "extensions": ["gqf","gqs"]
  },
  "application/vnd.gridmp": {
    "source": "iana"
  },
  "application/vnd.groove-account": {
    "source": "iana",
    "extensions": ["gac"]
  },
  "application/vnd.groove-help": {
    "source": "iana",
    "extensions": ["ghf"]
  },
  "application/vnd.groove-identity-message": {
    "source": "iana",
    "extensions": ["gim"]
  },
  "application/vnd.groove-injector": {
    "source": "iana",
    "extensions": ["grv"]
  },
  "application/vnd.groove-tool-message": {
    "source": "iana",
    "extensions": ["gtm"]
  },
  "application/vnd.groove-tool-template": {
    "source": "iana",
    "extensions": ["tpl"]
  },
  "application/vnd.groove-vcard": {
    "source": "iana",
    "extensions": ["vcg"]
  },
  "application/vnd.hal+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.hal+xml": {
    "source": "iana",
    "extensions": ["hal"]
  },
  "application/vnd.handheld-entertainment+xml": {
    "source": "iana",
    "extensions": ["zmm"]
  },
  "application/vnd.hbci": {
    "source": "iana",
    "extensions": ["hbci"]
  },
  "application/vnd.hcl-bireports": {
    "source": "iana"
  },
  "application/vnd.hdt": {
    "source": "iana"
  },
  "application/vnd.heroku+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.hhe.lesson-player": {
    "source": "iana",
    "extensions": ["les"]
  },
  "application/vnd.hp-hpgl": {
    "source": "iana",
    "extensions": ["hpgl"]
  },
  "application/vnd.hp-hpid": {
    "source": "iana",
    "extensions": ["hpid"]
  },
  "application/vnd.hp-hps": {
    "source": "iana",
    "extensions": ["hps"]
  },
  "application/vnd.hp-jlyt": {
    "source": "iana",
    "extensions": ["jlt"]
  },
  "application/vnd.hp-pcl": {
    "source": "iana",
    "extensions": ["pcl"]
  },
  "application/vnd.hp-pclxl": {
    "source": "iana",
    "extensions": ["pclxl"]
  },
  "application/vnd.httphone": {
    "source": "iana"
  },
  "application/vnd.hydrostatix.sof-data": {
    "source": "iana",
    "extensions": ["sfd-hdstx"]
  },
  "application/vnd.hyperdrive+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.hzn-3d-crossword": {
    "source": "iana"
  },
  "application/vnd.ibm.afplinedata": {
    "source": "iana"
  },
  "application/vnd.ibm.electronic-media": {
    "source": "iana"
  },
  "application/vnd.ibm.minipay": {
    "source": "iana",
    "extensions": ["mpy"]
  },
  "application/vnd.ibm.modcap": {
    "source": "iana",
    "extensions": ["afp","listafp","list3820"]
  },
  "application/vnd.ibm.rights-management": {
    "source": "iana",
    "extensions": ["irm"]
  },
  "application/vnd.ibm.secure-container": {
    "source": "iana",
    "extensions": ["sc"]
  },
  "application/vnd.iccprofile": {
    "source": "iana",
    "extensions": ["icc","icm"]
  },
  "application/vnd.ieee.1905": {
    "source": "iana"
  },
  "application/vnd.igloader": {
    "source": "iana",
    "extensions": ["igl"]
  },
  "application/vnd.immervision-ivp": {
    "source": "iana",
    "extensions": ["ivp"]
  },
  "application/vnd.immervision-ivu": {
    "source": "iana",
    "extensions": ["ivu"]
  },
  "application/vnd.ims.imsccv1p1": {
    "source": "iana"
  },
  "application/vnd.ims.imsccv1p2": {
    "source": "iana"
  },
  "application/vnd.ims.imsccv1p3": {
    "source": "iana"
  },
  "application/vnd.ims.lis.v2.result+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.informedcontrol.rms+xml": {
    "source": "iana"
  },
  "application/vnd.informix-visionary": {
    "source": "iana"
  },
  "application/vnd.infotech.project": {
    "source": "iana"
  },
  "application/vnd.infotech.project+xml": {
    "source": "iana"
  },
  "application/vnd.innopath.wamp.notification": {
    "source": "iana"
  },
  "application/vnd.insors.igm": {
    "source": "iana",
    "extensions": ["igm"]
  },
  "application/vnd.intercon.formnet": {
    "source": "iana",
    "extensions": ["xpw","xpx"]
  },
  "application/vnd.intergeo": {
    "source": "iana",
    "extensions": ["i2g"]
  },
  "application/vnd.intertrust.digibox": {
    "source": "iana"
  },
  "application/vnd.intertrust.nncp": {
    "source": "iana"
  },
  "application/vnd.intu.qbo": {
    "source": "iana",
    "extensions": ["qbo"]
  },
  "application/vnd.intu.qfx": {
    "source": "iana",
    "extensions": ["qfx"]
  },
  "application/vnd.iptc.g2.catalogitem+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.newsitem+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.newsmessage+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    "source": "iana"
  },
  "application/vnd.ipunplugged.rcprofile": {
    "source": "iana",
    "extensions": ["rcprofile"]
  },
  "application/vnd.irepository.package+xml": {
    "source": "iana",
    "extensions": ["irp"]
  },
  "application/vnd.is-xpr": {
    "source": "iana",
    "extensions": ["xpr"]
  },
  "application/vnd.isac.fcs": {
    "source": "iana",
    "extensions": ["fcs"]
  },
  "application/vnd.jam": {
    "source": "iana",
    "extensions": ["jam"]
  },
  "application/vnd.japannet-directory-service": {
    "source": "iana"
  },
  "application/vnd.japannet-jpnstore-wakeup": {
    "source": "iana"
  },
  "application/vnd.japannet-payment-wakeup": {
    "source": "iana"
  },
  "application/vnd.japannet-registration": {
    "source": "iana"
  },
  "application/vnd.japannet-registration-wakeup": {
    "source": "iana"
  },
  "application/vnd.japannet-setstore-wakeup": {
    "source": "iana"
  },
  "application/vnd.japannet-verification": {
    "source": "iana"
  },
  "application/vnd.japannet-verification-wakeup": {
    "source": "iana"
  },
  "application/vnd.jcp.javame.midlet-rms": {
    "source": "iana",
    "extensions": ["rms"]
  },
  "application/vnd.jisp": {
    "source": "iana",
    "extensions": ["jisp"]
  },
  "application/vnd.joost.joda-archive": {
    "source": "iana",
    "extensions": ["joda"]
  },
  "application/vnd.jsk.isdn-ngn": {
    "source": "iana"
  },
  "application/vnd.kahootz": {
    "source": "iana",
    "extensions": ["ktz","ktr"]
  },
  "application/vnd.kde.karbon": {
    "source": "iana",
    "extensions": ["karbon"]
  },
  "application/vnd.kde.kchart": {
    "source": "iana",
    "extensions": ["chrt"]
  },
  "application/vnd.kde.kformula": {
    "source": "iana",
    "extensions": ["kfo"]
  },
  "application/vnd.kde.kivio": {
    "source": "iana",
    "extensions": ["flw"]
  },
  "application/vnd.kde.kontour": {
    "source": "iana",
    "extensions": ["kon"]
  },
  "application/vnd.kde.kpresenter": {
    "source": "iana",
    "extensions": ["kpr","kpt"]
  },
  "application/vnd.kde.kspread": {
    "source": "iana",
    "extensions": ["ksp"]
  },
  "application/vnd.kde.kword": {
    "source": "iana",
    "extensions": ["kwd","kwt"]
  },
  "application/vnd.kenameaapp": {
    "source": "iana",
    "extensions": ["htke"]
  },
  "application/vnd.kidspiration": {
    "source": "iana",
    "extensions": ["kia"]
  },
  "application/vnd.kinar": {
    "source": "iana",
    "extensions": ["kne","knp"]
  },
  "application/vnd.koan": {
    "source": "iana",
    "extensions": ["skp","skd","skt","skm"]
  },
  "application/vnd.kodak-descriptor": {
    "source": "iana",
    "extensions": ["sse"]
  },
  "application/vnd.las.las+xml": {
    "source": "iana",
    "extensions": ["lasxml"]
  },
  "application/vnd.liberty-request+xml": {
    "source": "iana"
  },
  "application/vnd.llamagraphics.life-balance.desktop": {
    "source": "iana",
    "extensions": ["lbd"]
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    "source": "iana",
    "extensions": ["lbe"]
  },
  "application/vnd.lotus-1-2-3": {
    "source": "iana",
    "extensions": ["123"]
  },
  "application/vnd.lotus-approach": {
    "source": "iana",
    "extensions": ["apr"]
  },
  "application/vnd.lotus-freelance": {
    "source": "iana",
    "extensions": ["pre"]
  },
  "application/vnd.lotus-notes": {
    "source": "iana",
    "extensions": ["nsf"]
  },
  "application/vnd.lotus-organizer": {
    "source": "iana",
    "extensions": ["org"]
  },
  "application/vnd.lotus-screencam": {
    "source": "iana",
    "extensions": ["scm"]
  },
  "application/vnd.lotus-wordpro": {
    "source": "iana",
    "extensions": ["lwp"]
  },
  "application/vnd.macports.portpkg": {
    "source": "iana",
    "extensions": ["portpkg"]
  },
  "application/vnd.mapbox-vector-tile": {
    "source": "iana"
  },
  "application/vnd.marlin.drm.actiontoken+xml": {
    "source": "iana"
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    "source": "iana"
  },
  "application/vnd.marlin.drm.license+xml": {
    "source": "iana"
  },
  "application/vnd.marlin.drm.mdcf": {
    "source": "iana"
  },
  "application/vnd.mason+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.maxmind.maxmind-db": {
    "source": "iana"
  },
  "application/vnd.mcd": {
    "source": "iana",
    "extensions": ["mcd"]
  },
  "application/vnd.medcalcdata": {
    "source": "iana",
    "extensions": ["mc1"]
  },
  "application/vnd.mediastation.cdkey": {
    "source": "iana",
    "extensions": ["cdkey"]
  },
  "application/vnd.meridian-slingshot": {
    "source": "iana"
  },
  "application/vnd.mfer": {
    "source": "iana",
    "extensions": ["mwf"]
  },
  "application/vnd.mfmp": {
    "source": "iana",
    "extensions": ["mfm"]
  },
  "application/vnd.micro+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.micrografx.flo": {
    "source": "iana",
    "extensions": ["flo"]
  },
  "application/vnd.micrografx.igx": {
    "source": "iana",
    "extensions": ["igx"]
  },
  "application/vnd.microsoft.portable-executable": {
    "source": "iana"
  },
  "application/vnd.miele+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.mif": {
    "source": "iana",
    "extensions": ["mif"]
  },
  "application/vnd.minisoft-hp3000-save": {
    "source": "iana"
  },
  "application/vnd.mitsubishi.misty-guard.trustweb": {
    "source": "iana"
  },
  "application/vnd.mobius.daf": {
    "source": "iana",
    "extensions": ["daf"]
  },
  "application/vnd.mobius.dis": {
    "source": "iana",
    "extensions": ["dis"]
  },
  "application/vnd.mobius.mbk": {
    "source": "iana",
    "extensions": ["mbk"]
  },
  "application/vnd.mobius.mqy": {
    "source": "iana",
    "extensions": ["mqy"]
  },
  "application/vnd.mobius.msl": {
    "source": "iana",
    "extensions": ["msl"]
  },
  "application/vnd.mobius.plc": {
    "source": "iana",
    "extensions": ["plc"]
  },
  "application/vnd.mobius.txf": {
    "source": "iana",
    "extensions": ["txf"]
  },
  "application/vnd.mophun.application": {
    "source": "iana",
    "extensions": ["mpn"]
  },
  "application/vnd.mophun.certificate": {
    "source": "iana",
    "extensions": ["mpc"]
  },
  "application/vnd.motorola.flexsuite": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.adsi": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.fis": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.gotap": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.kmr": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.ttc": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.wem": {
    "source": "iana"
  },
  "application/vnd.motorola.iprm": {
    "source": "iana"
  },
  "application/vnd.mozilla.xul+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xul"]
  },
  "application/vnd.ms-3mfdocument": {
    "source": "iana"
  },
  "application/vnd.ms-artgalry": {
    "source": "iana",
    "extensions": ["cil"]
  },
  "application/vnd.ms-asf": {
    "source": "iana"
  },
  "application/vnd.ms-cab-compressed": {
    "source": "iana",
    "extensions": ["cab"]
  },
  "application/vnd.ms-color.iccprofile": {
    "source": "apache"
  },
  "application/vnd.ms-excel": {
    "source": "iana",
    "compressible": false,
    "extensions": ["xls","xlm","xla","xlc","xlt","xlw"]
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    "source": "iana",
    "extensions": ["xlam"]
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    "source": "iana",
    "extensions": ["xlsb"]
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    "source": "iana",
    "extensions": ["xlsm"]
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    "source": "iana",
    "extensions": ["xltm"]
  },
  "application/vnd.ms-fontobject": {
    "source": "iana",
    "compressible": true,
    "extensions": ["eot"]
  },
  "application/vnd.ms-htmlhelp": {
    "source": "iana",
    "extensions": ["chm"]
  },
  "application/vnd.ms-ims": {
    "source": "iana",
    "extensions": ["ims"]
  },
  "application/vnd.ms-lrm": {
    "source": "iana",
    "extensions": ["lrm"]
  },
  "application/vnd.ms-office.activex+xml": {
    "source": "iana"
  },
  "application/vnd.ms-officetheme": {
    "source": "iana",
    "extensions": ["thmx"]
  },
  "application/vnd.ms-opentype": {
    "source": "apache",
    "compressible": true
  },
  "application/vnd.ms-package.obfuscated-opentype": {
    "source": "apache"
  },
  "application/vnd.ms-pki.seccat": {
    "source": "apache",
    "extensions": ["cat"]
  },
  "application/vnd.ms-pki.stl": {
    "source": "apache",
    "extensions": ["stl"]
  },
  "application/vnd.ms-playready.initiator+xml": {
    "source": "iana"
  },
  "application/vnd.ms-powerpoint": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ppt","pps","pot"]
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    "source": "iana",
    "extensions": ["ppam"]
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    "source": "iana",
    "extensions": ["pptm"]
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    "source": "iana",
    "extensions": ["sldm"]
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    "source": "iana",
    "extensions": ["ppsm"]
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    "source": "iana",
    "extensions": ["potm"]
  },
  "application/vnd.ms-printdevicecapabilities+xml": {
    "source": "iana"
  },
  "application/vnd.ms-printing.printticket+xml": {
    "source": "apache"
  },
  "application/vnd.ms-printschematicket+xml": {
    "source": "iana"
  },
  "application/vnd.ms-project": {
    "source": "iana",
    "extensions": ["mpp","mpt"]
  },
  "application/vnd.ms-tnef": {
    "source": "iana"
  },
  "application/vnd.ms-windows.devicepairing": {
    "source": "iana"
  },
  "application/vnd.ms-windows.nwprinting.oob": {
    "source": "iana"
  },
  "application/vnd.ms-windows.printerpairing": {
    "source": "iana"
  },
  "application/vnd.ms-windows.wsd.oob": {
    "source": "iana"
  },
  "application/vnd.ms-wmdrm.lic-chlg-req": {
    "source": "iana"
  },
  "application/vnd.ms-wmdrm.lic-resp": {
    "source": "iana"
  },
  "application/vnd.ms-wmdrm.meter-chlg-req": {
    "source": "iana"
  },
  "application/vnd.ms-wmdrm.meter-resp": {
    "source": "iana"
  },
  "application/vnd.ms-word.document.macroenabled.12": {
    "source": "iana",
    "extensions": ["docm"]
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    "source": "iana",
    "extensions": ["dotm"]
  },
  "application/vnd.ms-works": {
    "source": "iana",
    "extensions": ["wps","wks","wcm","wdb"]
  },
  "application/vnd.ms-wpl": {
    "source": "iana",
    "extensions": ["wpl"]
  },
  "application/vnd.ms-xpsdocument": {
    "source": "iana",
    "compressible": false,
    "extensions": ["xps"]
  },
  "application/vnd.msa-disk-image": {
    "source": "iana"
  },
  "application/vnd.mseq": {
    "source": "iana",
    "extensions": ["mseq"]
  },
  "application/vnd.msign": {
    "source": "iana"
  },
  "application/vnd.multiad.creator": {
    "source": "iana"
  },
  "application/vnd.multiad.creator.cif": {
    "source": "iana"
  },
  "application/vnd.music-niff": {
    "source": "iana"
  },
  "application/vnd.musician": {
    "source": "iana",
    "extensions": ["mus"]
  },
  "application/vnd.muvee.style": {
    "source": "iana",
    "extensions": ["msty"]
  },
  "application/vnd.mynfc": {
    "source": "iana",
    "extensions": ["taglet"]
  },
  "application/vnd.ncd.control": {
    "source": "iana"
  },
  "application/vnd.ncd.reference": {
    "source": "iana"
  },
  "application/vnd.nervana": {
    "source": "iana"
  },
  "application/vnd.netfpx": {
    "source": "iana"
  },
  "application/vnd.neurolanguage.nlu": {
    "source": "iana",
    "extensions": ["nlu"]
  },
  "application/vnd.nintendo.nitro.rom": {
    "source": "iana"
  },
  "application/vnd.nintendo.snes.rom": {
    "source": "iana"
  },
  "application/vnd.nitf": {
    "source": "iana",
    "extensions": ["ntf","nitf"]
  },
  "application/vnd.noblenet-directory": {
    "source": "iana",
    "extensions": ["nnd"]
  },
  "application/vnd.noblenet-sealer": {
    "source": "iana",
    "extensions": ["nns"]
  },
  "application/vnd.noblenet-web": {
    "source": "iana",
    "extensions": ["nnw"]
  },
  "application/vnd.nokia.catalogs": {
    "source": "iana"
  },
  "application/vnd.nokia.conml+wbxml": {
    "source": "iana"
  },
  "application/vnd.nokia.conml+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.iptv.config+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.isds-radio-presets": {
    "source": "iana"
  },
  "application/vnd.nokia.landmark+wbxml": {
    "source": "iana"
  },
  "application/vnd.nokia.landmark+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.landmarkcollection+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.n-gage.data": {
    "source": "iana",
    "extensions": ["ngdat"]
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    "source": "iana",
    "extensions": ["n-gage"]
  },
  "application/vnd.nokia.ncd": {
    "source": "iana"
  },
  "application/vnd.nokia.pcd+wbxml": {
    "source": "iana"
  },
  "application/vnd.nokia.pcd+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.radio-preset": {
    "source": "iana",
    "extensions": ["rpst"]
  },
  "application/vnd.nokia.radio-presets": {
    "source": "iana",
    "extensions": ["rpss"]
  },
  "application/vnd.novadigm.edm": {
    "source": "iana",
    "extensions": ["edm"]
  },
  "application/vnd.novadigm.edx": {
    "source": "iana",
    "extensions": ["edx"]
  },
  "application/vnd.novadigm.ext": {
    "source": "iana",
    "extensions": ["ext"]
  },
  "application/vnd.ntt-local.content-share": {
    "source": "iana"
  },
  "application/vnd.ntt-local.file-transfer": {
    "source": "iana"
  },
  "application/vnd.ntt-local.ogw_remote-access": {
    "source": "iana"
  },
  "application/vnd.ntt-local.sip-ta_remote": {
    "source": "iana"
  },
  "application/vnd.ntt-local.sip-ta_tcp_stream": {
    "source": "iana"
  },
  "application/vnd.oasis.opendocument.chart": {
    "source": "iana",
    "extensions": ["odc"]
  },
  "application/vnd.oasis.opendocument.chart-template": {
    "source": "iana",
    "extensions": ["otc"]
  },
  "application/vnd.oasis.opendocument.database": {
    "source": "iana",
    "extensions": ["odb"]
  },
  "application/vnd.oasis.opendocument.formula": {
    "source": "iana",
    "extensions": ["odf"]
  },
  "application/vnd.oasis.opendocument.formula-template": {
    "source": "iana",
    "extensions": ["odft"]
  },
  "application/vnd.oasis.opendocument.graphics": {
    "source": "iana",
    "compressible": false,
    "extensions": ["odg"]
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    "source": "iana",
    "extensions": ["otg"]
  },
  "application/vnd.oasis.opendocument.image": {
    "source": "iana",
    "extensions": ["odi"]
  },
  "application/vnd.oasis.opendocument.image-template": {
    "source": "iana",
    "extensions": ["oti"]
  },
  "application/vnd.oasis.opendocument.presentation": {
    "source": "iana",
    "compressible": false,
    "extensions": ["odp"]
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    "source": "iana",
    "extensions": ["otp"]
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ods"]
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    "source": "iana",
    "extensions": ["ots"]
  },
  "application/vnd.oasis.opendocument.text": {
    "source": "iana",
    "compressible": false,
    "extensions": ["odt"]
  },
  "application/vnd.oasis.opendocument.text-master": {
    "source": "iana",
    "extensions": ["odm"]
  },
  "application/vnd.oasis.opendocument.text-template": {
    "source": "iana",
    "extensions": ["ott"]
  },
  "application/vnd.oasis.opendocument.text-web": {
    "source": "iana",
    "extensions": ["oth"]
  },
  "application/vnd.obn": {
    "source": "iana"
  },
  "application/vnd.oftn.l10n+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oipf.contentaccessdownload+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.cspg-hexbinary": {
    "source": "iana"
  },
  "application/vnd.oipf.dae.svg+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.dae.xhtml+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.pae.gem": {
    "source": "iana"
  },
  "application/vnd.oipf.spdiscovery+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.spdlist+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.ueprofile+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.userprofile+xml": {
    "source": "iana"
  },
  "application/vnd.olpc-sugar": {
    "source": "iana",
    "extensions": ["xo"]
  },
  "application/vnd.oma-scws-config": {
    "source": "iana"
  },
  "application/vnd.oma-scws-http-request": {
    "source": "iana"
  },
  "application/vnd.oma-scws-http-response": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.imd+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.ltkm": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.notification+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.provisioningtrigger": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.sgboot": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.sgdd+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.sgdu": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.simple-symbol-container": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.sprov+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.stkm": {
    "source": "iana"
  },
  "application/vnd.oma.cab-address-book+xml": {
    "source": "iana"
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    "source": "iana"
  },
  "application/vnd.oma.cab-pcc+xml": {
    "source": "iana"
  },
  "application/vnd.oma.cab-subs-invite+xml": {
    "source": "iana"
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    "source": "iana"
  },
  "application/vnd.oma.dcd": {
    "source": "iana"
  },
  "application/vnd.oma.dcdc": {
    "source": "iana"
  },
  "application/vnd.oma.dd2+xml": {
    "source": "iana",
    "extensions": ["dd2"]
  },
  "application/vnd.oma.drm.risd+xml": {
    "source": "iana"
  },
  "application/vnd.oma.group-usage-list+xml": {
    "source": "iana"
  },
  "application/vnd.oma.pal+xml": {
    "source": "iana"
  },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    "source": "iana"
  },
  "application/vnd.oma.poc.final-report+xml": {
    "source": "iana"
  },
  "application/vnd.oma.poc.groups+xml": {
    "source": "iana"
  },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    "source": "iana"
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    "source": "iana"
  },
  "application/vnd.oma.push": {
    "source": "iana"
  },
  "application/vnd.oma.scidm.messages+xml": {
    "source": "iana"
  },
  "application/vnd.oma.xcap-directory+xml": {
    "source": "iana"
  },
  "application/vnd.omads-email+xml": {
    "source": "iana"
  },
  "application/vnd.omads-file+xml": {
    "source": "iana"
  },
  "application/vnd.omads-folder+xml": {
    "source": "iana"
  },
  "application/vnd.omaloc-supl-init": {
    "source": "iana"
  },
  "application/vnd.openblox.game+xml": {
    "source": "iana"
  },
  "application/vnd.openblox.game-binary": {
    "source": "iana"
  },
  "application/vnd.openeye.oeb": {
    "source": "iana"
  },
  "application/vnd.openofficeorg.extension": {
    "source": "apache",
    "extensions": ["oxt"]
  },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml-template": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    "source": "iana",
    "compressible": false,
    "extensions": ["pptx"]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    "source": "iana",
    "extensions": ["sldx"]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    "source": "iana",
    "extensions": ["ppsx"]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    "source": "apache",
    "extensions": ["potx"]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml-template": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    "source": "iana",
    "compressible": false,
    "extensions": ["xlsx"]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    "source": "apache",
    "extensions": ["xltx"]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml-template": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    "source": "iana",
    "compressible": false,
    "extensions": ["docx"]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    "source": "apache",
    "extensions": ["dotx"]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    "source": "iana"
  },
  "application/vnd.oracle.resource+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.orange.indata": {
    "source": "iana"
  },
  "application/vnd.osa.netdeploy": {
    "source": "iana"
  },
  "application/vnd.osgeo.mapguide.package": {
    "source": "iana",
    "extensions": ["mgp"]
  },
  "application/vnd.osgi.bundle": {
    "source": "iana"
  },
  "application/vnd.osgi.dp": {
    "source": "iana",
    "extensions": ["dp"]
  },
  "application/vnd.osgi.subsystem": {
    "source": "iana",
    "extensions": ["esa"]
  },
  "application/vnd.otps.ct-kip+xml": {
    "source": "iana"
  },
  "application/vnd.oxli.countgraph": {
    "source": "iana"
  },
  "application/vnd.pagerduty+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.palm": {
    "source": "iana",
    "extensions": ["pdb","pqa","oprc"]
  },
  "application/vnd.panoply": {
    "source": "iana"
  },
  "application/vnd.paos+xml": {
    "source": "iana"
  },
  "application/vnd.paos.xml": {
    "source": "apache"
  },
  "application/vnd.pawaafile": {
    "source": "iana",
    "extensions": ["paw"]
  },
  "application/vnd.pcos": {
    "source": "iana"
  },
  "application/vnd.pg.format": {
    "source": "iana",
    "extensions": ["str"]
  },
  "application/vnd.pg.osasli": {
    "source": "iana",
    "extensions": ["ei6"]
  },
  "application/vnd.piaccess.application-licence": {
    "source": "iana"
  },
  "application/vnd.picsel": {
    "source": "iana",
    "extensions": ["efif"]
  },
  "application/vnd.pmi.widget": {
    "source": "iana",
    "extensions": ["wg"]
  },
  "application/vnd.poc.group-advertisement+xml": {
    "source": "iana"
  },
  "application/vnd.pocketlearn": {
    "source": "iana",
    "extensions": ["plf"]
  },
  "application/vnd.powerbuilder6": {
    "source": "iana",
    "extensions": ["pbd"]
  },
  "application/vnd.powerbuilder6-s": {
    "source": "iana"
  },
  "application/vnd.powerbuilder7": {
    "source": "iana"
  },
  "application/vnd.powerbuilder7-s": {
    "source": "iana"
  },
  "application/vnd.powerbuilder75": {
    "source": "iana"
  },
  "application/vnd.powerbuilder75-s": {
    "source": "iana"
  },
  "application/vnd.preminet": {
    "source": "iana"
  },
  "application/vnd.previewsystems.box": {
    "source": "iana",
    "extensions": ["box"]
  },
  "application/vnd.proteus.magazine": {
    "source": "iana",
    "extensions": ["mgz"]
  },
  "application/vnd.publishare-delta-tree": {
    "source": "iana",
    "extensions": ["qps"]
  },
  "application/vnd.pvi.ptid1": {
    "source": "iana",
    "extensions": ["ptid"]
  },
  "application/vnd.pwg-multiplexed": {
    "source": "iana"
  },
  "application/vnd.pwg-xhtml-print+xml": {
    "source": "iana"
  },
  "application/vnd.qualcomm.brew-app-res": {
    "source": "iana"
  },
  "application/vnd.quark.quarkxpress": {
    "source": "iana",
    "extensions": ["qxd","qxt","qwd","qwt","qxl","qxb"]
  },
  "application/vnd.quobject-quoxdocument": {
    "source": "iana"
  },
  "application/vnd.radisys.moml+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-audit+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-conf+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    "source": "iana"
  },
  "application/vnd.rainstor.data": {
    "source": "iana"
  },
  "application/vnd.rapid": {
    "source": "iana"
  },
  "application/vnd.realvnc.bed": {
    "source": "iana",
    "extensions": ["bed"]
  },
  "application/vnd.recordare.musicxml": {
    "source": "iana",
    "extensions": ["mxl"]
  },
  "application/vnd.recordare.musicxml+xml": {
    "source": "iana",
    "extensions": ["musicxml"]
  },
  "application/vnd.renlearn.rlprint": {
    "source": "iana"
  },
  "application/vnd.rig.cryptonote": {
    "source": "iana",
    "extensions": ["cryptonote"]
  },
  "application/vnd.rim.cod": {
    "source": "apache",
    "extensions": ["cod"]
  },
  "application/vnd.rn-realmedia": {
    "source": "apache",
    "extensions": ["rm"]
  },
  "application/vnd.rn-realmedia-vbr": {
    "source": "apache",
    "extensions": ["rmvb"]
  },
  "application/vnd.route66.link66+xml": {
    "source": "iana",
    "extensions": ["link66"]
  },
  "application/vnd.rs-274x": {
    "source": "iana"
  },
  "application/vnd.ruckus.download": {
    "source": "iana"
  },
  "application/vnd.s3sms": {
    "source": "iana"
  },
  "application/vnd.sailingtracker.track": {
    "source": "iana",
    "extensions": ["st"]
  },
  "application/vnd.sbm.cid": {
    "source": "iana"
  },
  "application/vnd.sbm.mid2": {
    "source": "iana"
  },
  "application/vnd.scribus": {
    "source": "iana"
  },
  "application/vnd.sealed.3df": {
    "source": "iana"
  },
  "application/vnd.sealed.csf": {
    "source": "iana"
  },
  "application/vnd.sealed.doc": {
    "source": "iana"
  },
  "application/vnd.sealed.eml": {
    "source": "iana"
  },
  "application/vnd.sealed.mht": {
    "source": "iana"
  },
  "application/vnd.sealed.net": {
    "source": "iana"
  },
  "application/vnd.sealed.ppt": {
    "source": "iana"
  },
  "application/vnd.sealed.tiff": {
    "source": "iana"
  },
  "application/vnd.sealed.xls": {
    "source": "iana"
  },
  "application/vnd.sealedmedia.softseal.html": {
    "source": "iana"
  },
  "application/vnd.sealedmedia.softseal.pdf": {
    "source": "iana"
  },
  "application/vnd.seemail": {
    "source": "iana",
    "extensions": ["see"]
  },
  "application/vnd.sema": {
    "source": "iana",
    "extensions": ["sema"]
  },
  "application/vnd.semd": {
    "source": "iana",
    "extensions": ["semd"]
  },
  "application/vnd.semf": {
    "source": "iana",
    "extensions": ["semf"]
  },
  "application/vnd.shana.informed.formdata": {
    "source": "iana",
    "extensions": ["ifm"]
  },
  "application/vnd.shana.informed.formtemplate": {
    "source": "iana",
    "extensions": ["itp"]
  },
  "application/vnd.shana.informed.interchange": {
    "source": "iana",
    "extensions": ["iif"]
  },
  "application/vnd.shana.informed.package": {
    "source": "iana",
    "extensions": ["ipk"]
  },
  "application/vnd.simtech-mindmapper": {
    "source": "iana",
    "extensions": ["twd","twds"]
  },
  "application/vnd.siren+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.smaf": {
    "source": "iana",
    "extensions": ["mmf"]
  },
  "application/vnd.smart.notebook": {
    "source": "iana"
  },
  "application/vnd.smart.teacher": {
    "source": "iana",
    "extensions": ["teacher"]
  },
  "application/vnd.software602.filler.form+xml": {
    "source": "iana"
  },
  "application/vnd.software602.filler.form-xml-zip": {
    "source": "iana"
  },
  "application/vnd.solent.sdkm+xml": {
    "source": "iana",
    "extensions": ["sdkm","sdkd"]
  },
  "application/vnd.spotfire.dxp": {
    "source": "iana",
    "extensions": ["dxp"]
  },
  "application/vnd.spotfire.sfs": {
    "source": "iana",
    "extensions": ["sfs"]
  },
  "application/vnd.sss-cod": {
    "source": "iana"
  },
  "application/vnd.sss-dtf": {
    "source": "iana"
  },
  "application/vnd.sss-ntf": {
    "source": "iana"
  },
  "application/vnd.stardivision.calc": {
    "source": "apache",
    "extensions": ["sdc"]
  },
  "application/vnd.stardivision.draw": {
    "source": "apache",
    "extensions": ["sda"]
  },
  "application/vnd.stardivision.impress": {
    "source": "apache",
    "extensions": ["sdd"]
  },
  "application/vnd.stardivision.math": {
    "source": "apache",
    "extensions": ["smf"]
  },
  "application/vnd.stardivision.writer": {
    "source": "apache",
    "extensions": ["sdw","vor"]
  },
  "application/vnd.stardivision.writer-global": {
    "source": "apache",
    "extensions": ["sgl"]
  },
  "application/vnd.stepmania.package": {
    "source": "iana",
    "extensions": ["smzip"]
  },
  "application/vnd.stepmania.stepchart": {
    "source": "iana",
    "extensions": ["sm"]
  },
  "application/vnd.street-stream": {
    "source": "iana"
  },
  "application/vnd.sun.wadl+xml": {
    "source": "iana"
  },
  "application/vnd.sun.xml.calc": {
    "source": "apache",
    "extensions": ["sxc"]
  },
  "application/vnd.sun.xml.calc.template": {
    "source": "apache",
    "extensions": ["stc"]
  },
  "application/vnd.sun.xml.draw": {
    "source": "apache",
    "extensions": ["sxd"]
  },
  "application/vnd.sun.xml.draw.template": {
    "source": "apache",
    "extensions": ["std"]
  },
  "application/vnd.sun.xml.impress": {
    "source": "apache",
    "extensions": ["sxi"]
  },
  "application/vnd.sun.xml.impress.template": {
    "source": "apache",
    "extensions": ["sti"]
  },
  "application/vnd.sun.xml.math": {
    "source": "apache",
    "extensions": ["sxm"]
  },
  "application/vnd.sun.xml.writer": {
    "source": "apache",
    "extensions": ["sxw"]
  },
  "application/vnd.sun.xml.writer.global": {
    "source": "apache",
    "extensions": ["sxg"]
  },
  "application/vnd.sun.xml.writer.template": {
    "source": "apache",
    "extensions": ["stw"]
  },
  "application/vnd.sus-calendar": {
    "source": "iana",
    "extensions": ["sus","susp"]
  },
  "application/vnd.svd": {
    "source": "iana",
    "extensions": ["svd"]
  },
  "application/vnd.swiftview-ics": {
    "source": "iana"
  },
  "application/vnd.symbian.install": {
    "source": "apache",
    "extensions": ["sis","sisx"]
  },
  "application/vnd.syncml+xml": {
    "source": "iana",
    "extensions": ["xsm"]
  },
  "application/vnd.syncml.dm+wbxml": {
    "source": "iana",
    "extensions": ["bdm"]
  },
  "application/vnd.syncml.dm+xml": {
    "source": "iana",
    "extensions": ["xdm"]
  },
  "application/vnd.syncml.dm.notification": {
    "source": "iana"
  },
  "application/vnd.syncml.dmddf+wbxml": {
    "source": "iana"
  },
  "application/vnd.syncml.dmddf+xml": {
    "source": "iana"
  },
  "application/vnd.syncml.dmtnds+wbxml": {
    "source": "iana"
  },
  "application/vnd.syncml.dmtnds+xml": {
    "source": "iana"
  },
  "application/vnd.syncml.ds.notification": {
    "source": "iana"
  },
  "application/vnd.tao.intent-module-archive": {
    "source": "iana",
    "extensions": ["tao"]
  },
  "application/vnd.tcpdump.pcap": {
    "source": "iana",
    "extensions": ["pcap","cap","dmp"]
  },
  "application/vnd.tmd.mediaflex.api+xml": {
    "source": "iana"
  },
  "application/vnd.tml": {
    "source": "iana"
  },
  "application/vnd.tmobile-livetv": {
    "source": "iana",
    "extensions": ["tmo"]
  },
  "application/vnd.trid.tpt": {
    "source": "iana",
    "extensions": ["tpt"]
  },
  "application/vnd.triscape.mxs": {
    "source": "iana",
    "extensions": ["mxs"]
  },
  "application/vnd.trueapp": {
    "source": "iana",
    "extensions": ["tra"]
  },
  "application/vnd.truedoc": {
    "source": "iana"
  },
  "application/vnd.ubisoft.webplayer": {
    "source": "iana"
  },
  "application/vnd.ufdl": {
    "source": "iana",
    "extensions": ["ufd","ufdl"]
  },
  "application/vnd.uiq.theme": {
    "source": "iana",
    "extensions": ["utz"]
  },
  "application/vnd.umajin": {
    "source": "iana",
    "extensions": ["umj"]
  },
  "application/vnd.unity": {
    "source": "iana",
    "extensions": ["unityweb"]
  },
  "application/vnd.uoml+xml": {
    "source": "iana",
    "extensions": ["uoml"]
  },
  "application/vnd.uplanet.alert": {
    "source": "iana"
  },
  "application/vnd.uplanet.alert-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.bearer-choice": {
    "source": "iana"
  },
  "application/vnd.uplanet.bearer-choice-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.cacheop": {
    "source": "iana"
  },
  "application/vnd.uplanet.cacheop-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.channel": {
    "source": "iana"
  },
  "application/vnd.uplanet.channel-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.list": {
    "source": "iana"
  },
  "application/vnd.uplanet.list-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.listcmd": {
    "source": "iana"
  },
  "application/vnd.uplanet.listcmd-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.signal": {
    "source": "iana"
  },
  "application/vnd.uri-map": {
    "source": "iana"
  },
  "application/vnd.valve.source.material": {
    "source": "iana"
  },
  "application/vnd.vcx": {
    "source": "iana",
    "extensions": ["vcx"]
  },
  "application/vnd.vd-study": {
    "source": "iana"
  },
  "application/vnd.vectorworks": {
    "source": "iana"
  },
  "application/vnd.verimatrix.vcas": {
    "source": "iana"
  },
  "application/vnd.vidsoft.vidconference": {
    "source": "iana"
  },
  "application/vnd.visio": {
    "source": "iana",
    "extensions": ["vsd","vst","vss","vsw"]
  },
  "application/vnd.visionary": {
    "source": "iana",
    "extensions": ["vis"]
  },
  "application/vnd.vividence.scriptfile": {
    "source": "iana"
  },
  "application/vnd.vsf": {
    "source": "iana",
    "extensions": ["vsf"]
  },
  "application/vnd.wap.sic": {
    "source": "iana"
  },
  "application/vnd.wap.slc": {
    "source": "iana"
  },
  "application/vnd.wap.wbxml": {
    "source": "iana",
    "extensions": ["wbxml"]
  },
  "application/vnd.wap.wmlc": {
    "source": "iana",
    "extensions": ["wmlc"]
  },
  "application/vnd.wap.wmlscriptc": {
    "source": "iana",
    "extensions": ["wmlsc"]
  },
  "application/vnd.webturbo": {
    "source": "iana",
    "extensions": ["wtb"]
  },
  "application/vnd.wfa.p2p": {
    "source": "iana"
  },
  "application/vnd.wfa.wsc": {
    "source": "iana"
  },
  "application/vnd.windows.devicepairing": {
    "source": "iana"
  },
  "application/vnd.wmc": {
    "source": "iana"
  },
  "application/vnd.wmf.bootstrap": {
    "source": "iana"
  },
  "application/vnd.wolfram.mathematica": {
    "source": "iana"
  },
  "application/vnd.wolfram.mathematica.package": {
    "source": "iana"
  },
  "application/vnd.wolfram.player": {
    "source": "iana",
    "extensions": ["nbp"]
  },
  "application/vnd.wordperfect": {
    "source": "iana",
    "extensions": ["wpd"]
  },
  "application/vnd.wqd": {
    "source": "iana",
    "extensions": ["wqd"]
  },
  "application/vnd.wrq-hp3000-labelled": {
    "source": "iana"
  },
  "application/vnd.wt.stf": {
    "source": "iana",
    "extensions": ["stf"]
  },
  "application/vnd.wv.csp+wbxml": {
    "source": "iana"
  },
  "application/vnd.wv.csp+xml": {
    "source": "iana"
  },
  "application/vnd.wv.ssp+xml": {
    "source": "iana"
  },
  "application/vnd.xacml+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.xara": {
    "source": "iana",
    "extensions": ["xar"]
  },
  "application/vnd.xfdl": {
    "source": "iana",
    "extensions": ["xfdl"]
  },
  "application/vnd.xfdl.webform": {
    "source": "iana"
  },
  "application/vnd.xmi+xml": {
    "source": "iana"
  },
  "application/vnd.xmpie.cpkg": {
    "source": "iana"
  },
  "application/vnd.xmpie.dpkg": {
    "source": "iana"
  },
  "application/vnd.xmpie.plan": {
    "source": "iana"
  },
  "application/vnd.xmpie.ppkg": {
    "source": "iana"
  },
  "application/vnd.xmpie.xlim": {
    "source": "iana"
  },
  "application/vnd.yamaha.hv-dic": {
    "source": "iana",
    "extensions": ["hvd"]
  },
  "application/vnd.yamaha.hv-script": {
    "source": "iana",
    "extensions": ["hvs"]
  },
  "application/vnd.yamaha.hv-voice": {
    "source": "iana",
    "extensions": ["hvp"]
  },
  "application/vnd.yamaha.openscoreformat": {
    "source": "iana",
    "extensions": ["osf"]
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    "source": "iana",
    "extensions": ["osfpvg"]
  },
  "application/vnd.yamaha.remote-setup": {
    "source": "iana"
  },
  "application/vnd.yamaha.smaf-audio": {
    "source": "iana",
    "extensions": ["saf"]
  },
  "application/vnd.yamaha.smaf-phrase": {
    "source": "iana",
    "extensions": ["spf"]
  },
  "application/vnd.yamaha.through-ngn": {
    "source": "iana"
  },
  "application/vnd.yamaha.tunnel-udpencap": {
    "source": "iana"
  },
  "application/vnd.yaoweme": {
    "source": "iana"
  },
  "application/vnd.yellowriver-custom-menu": {
    "source": "iana",
    "extensions": ["cmp"]
  },
  "application/vnd.zul": {
    "source": "iana",
    "extensions": ["zir","zirz"]
  },
  "application/vnd.zzazz.deck+xml": {
    "source": "iana",
    "extensions": ["zaz"]
  },
  "application/voicexml+xml": {
    "source": "iana",
    "extensions": ["vxml"]
  },
  "application/vq-rtcpxr": {
    "source": "iana"
  },
  "application/watcherinfo+xml": {
    "source": "iana"
  },
  "application/whoispp-query": {
    "source": "iana"
  },
  "application/whoispp-response": {
    "source": "iana"
  },
  "application/widget": {
    "source": "iana",
    "extensions": ["wgt"]
  },
  "application/winhlp": {
    "source": "apache",
    "extensions": ["hlp"]
  },
  "application/wita": {
    "source": "iana"
  },
  "application/wordperfect5.1": {
    "source": "iana"
  },
  "application/wsdl+xml": {
    "source": "iana",
    "extensions": ["wsdl"]
  },
  "application/wspolicy+xml": {
    "source": "iana",
    "extensions": ["wspolicy"]
  },
  "application/x-7z-compressed": {
    "source": "apache",
    "compressible": false,
    "extensions": ["7z"]
  },
  "application/x-abiword": {
    "source": "apache",
    "extensions": ["abw"]
  },
  "application/x-ace-compressed": {
    "source": "apache",
    "extensions": ["ace"]
  },
  "application/x-amf": {
    "source": "apache"
  },
  "application/x-apple-diskimage": {
    "source": "apache",
    "extensions": ["dmg"]
  },
  "application/x-authorware-bin": {
    "source": "apache",
    "extensions": ["aab","x32","u32","vox"]
  },
  "application/x-authorware-map": {
    "source": "apache",
    "extensions": ["aam"]
  },
  "application/x-authorware-seg": {
    "source": "apache",
    "extensions": ["aas"]
  },
  "application/x-bcpio": {
    "source": "apache",
    "extensions": ["bcpio"]
  },
  "application/x-bdoc": {
    "compressible": false,
    "extensions": ["bdoc"]
  },
  "application/x-bittorrent": {
    "source": "apache",
    "extensions": ["torrent"]
  },
  "application/x-blorb": {
    "source": "apache",
    "extensions": ["blb","blorb"]
  },
  "application/x-bzip": {
    "source": "apache",
    "compressible": false,
    "extensions": ["bz"]
  },
  "application/x-bzip2": {
    "source": "apache",
    "compressible": false,
    "extensions": ["bz2","boz"]
  },
  "application/x-cbr": {
    "source": "apache",
    "extensions": ["cbr","cba","cbt","cbz","cb7"]
  },
  "application/x-cdlink": {
    "source": "apache",
    "extensions": ["vcd"]
  },
  "application/x-cfs-compressed": {
    "source": "apache",
    "extensions": ["cfs"]
  },
  "application/x-chat": {
    "source": "apache",
    "extensions": ["chat"]
  },
  "application/x-chess-pgn": {
    "source": "apache",
    "extensions": ["pgn"]
  },
  "application/x-chrome-extension": {
    "extensions": ["crx"]
  },
  "application/x-cocoa": {
    "source": "nginx",
    "extensions": ["cco"]
  },
  "application/x-compress": {
    "source": "apache"
  },
  "application/x-conference": {
    "source": "apache",
    "extensions": ["nsc"]
  },
  "application/x-cpio": {
    "source": "apache",
    "extensions": ["cpio"]
  },
  "application/x-csh": {
    "source": "apache",
    "extensions": ["csh"]
  },
  "application/x-deb": {
    "compressible": false
  },
  "application/x-debian-package": {
    "source": "apache",
    "extensions": ["deb","udeb"]
  },
  "application/x-dgc-compressed": {
    "source": "apache",
    "extensions": ["dgc"]
  },
  "application/x-director": {
    "source": "apache",
    "extensions": ["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]
  },
  "application/x-doom": {
    "source": "apache",
    "extensions": ["wad"]
  },
  "application/x-dtbncx+xml": {
    "source": "apache",
    "extensions": ["ncx"]
  },
  "application/x-dtbook+xml": {
    "source": "apache",
    "extensions": ["dtb"]
  },
  "application/x-dtbresource+xml": {
    "source": "apache",
    "extensions": ["res"]
  },
  "application/x-dvi": {
    "source": "apache",
    "compressible": false,
    "extensions": ["dvi"]
  },
  "application/x-envoy": {
    "source": "apache",
    "extensions": ["evy"]
  },
  "application/x-eva": {
    "source": "apache",
    "extensions": ["eva"]
  },
  "application/x-font-bdf": {
    "source": "apache",
    "extensions": ["bdf"]
  },
  "application/x-font-dos": {
    "source": "apache"
  },
  "application/x-font-framemaker": {
    "source": "apache"
  },
  "application/x-font-ghostscript": {
    "source": "apache",
    "extensions": ["gsf"]
  },
  "application/x-font-libgrx": {
    "source": "apache"
  },
  "application/x-font-linux-psf": {
    "source": "apache",
    "extensions": ["psf"]
  },
  "application/x-font-otf": {
    "source": "apache",
    "compressible": true,
    "extensions": ["otf"]
  },
  "application/x-font-pcf": {
    "source": "apache",
    "extensions": ["pcf"]
  },
  "application/x-font-snf": {
    "source": "apache",
    "extensions": ["snf"]
  },
  "application/x-font-speedo": {
    "source": "apache"
  },
  "application/x-font-sunos-news": {
    "source": "apache"
  },
  "application/x-font-ttf": {
    "source": "apache",
    "compressible": true,
    "extensions": ["ttf","ttc"]
  },
  "application/x-font-type1": {
    "source": "apache",
    "extensions": ["pfa","pfb","pfm","afm"]
  },
  "application/x-font-vfont": {
    "source": "apache"
  },
  "application/x-freearc": {
    "source": "apache",
    "extensions": ["arc"]
  },
  "application/x-futuresplash": {
    "source": "apache",
    "extensions": ["spl"]
  },
  "application/x-gca-compressed": {
    "source": "apache",
    "extensions": ["gca"]
  },
  "application/x-glulx": {
    "source": "apache",
    "extensions": ["ulx"]
  },
  "application/x-gnumeric": {
    "source": "apache",
    "extensions": ["gnumeric"]
  },
  "application/x-gramps-xml": {
    "source": "apache",
    "extensions": ["gramps"]
  },
  "application/x-gtar": {
    "source": "apache",
    "extensions": ["gtar"]
  },
  "application/x-gzip": {
    "source": "apache"
  },
  "application/x-hdf": {
    "source": "apache",
    "extensions": ["hdf"]
  },
  "application/x-httpd-php": {
    "compressible": true,
    "extensions": ["php"]
  },
  "application/x-install-instructions": {
    "source": "apache",
    "extensions": ["install"]
  },
  "application/x-iso9660-image": {
    "source": "apache",
    "extensions": ["iso"]
  },
  "application/x-java-archive-diff": {
    "source": "nginx",
    "extensions": ["jardiff"]
  },
  "application/x-java-jnlp-file": {
    "source": "apache",
    "compressible": false,
    "extensions": ["jnlp"]
  },
  "application/x-javascript": {
    "compressible": true
  },
  "application/x-latex": {
    "source": "apache",
    "compressible": false,
    "extensions": ["latex"]
  },
  "application/x-lua-bytecode": {
    "extensions": ["luac"]
  },
  "application/x-lzh-compressed": {
    "source": "apache",
    "extensions": ["lzh","lha"]
  },
  "application/x-makeself": {
    "source": "nginx",
    "extensions": ["run"]
  },
  "application/x-mie": {
    "source": "apache",
    "extensions": ["mie"]
  },
  "application/x-mobipocket-ebook": {
    "source": "apache",
    "extensions": ["prc","mobi"]
  },
  "application/x-mpegurl": {
    "compressible": false
  },
  "application/x-ms-application": {
    "source": "apache",
    "extensions": ["application"]
  },
  "application/x-ms-shortcut": {
    "source": "apache",
    "extensions": ["lnk"]
  },
  "application/x-ms-wmd": {
    "source": "apache",
    "extensions": ["wmd"]
  },
  "application/x-ms-wmz": {
    "source": "apache",
    "extensions": ["wmz"]
  },
  "application/x-ms-xbap": {
    "source": "apache",
    "extensions": ["xbap"]
  },
  "application/x-msaccess": {
    "source": "apache",
    "extensions": ["mdb"]
  },
  "application/x-msbinder": {
    "source": "apache",
    "extensions": ["obd"]
  },
  "application/x-mscardfile": {
    "source": "apache",
    "extensions": ["crd"]
  },
  "application/x-msclip": {
    "source": "apache",
    "extensions": ["clp"]
  },
  "application/x-msdos-program": {
    "extensions": ["exe"]
  },
  "application/x-msdownload": {
    "source": "apache",
    "extensions": ["exe","dll","com","bat","msi"]
  },
  "application/x-msmediaview": {
    "source": "apache",
    "extensions": ["mvb","m13","m14"]
  },
  "application/x-msmetafile": {
    "source": "apache",
    "extensions": ["wmf","wmz","emf","emz"]
  },
  "application/x-msmoney": {
    "source": "apache",
    "extensions": ["mny"]
  },
  "application/x-mspublisher": {
    "source": "apache",
    "extensions": ["pub"]
  },
  "application/x-msschedule": {
    "source": "apache",
    "extensions": ["scd"]
  },
  "application/x-msterminal": {
    "source": "apache",
    "extensions": ["trm"]
  },
  "application/x-mswrite": {
    "source": "apache",
    "extensions": ["wri"]
  },
  "application/x-netcdf": {
    "source": "apache",
    "extensions": ["nc","cdf"]
  },
  "application/x-ns-proxy-autoconfig": {
    "compressible": true,
    "extensions": ["pac"]
  },
  "application/x-nzb": {
    "source": "apache",
    "extensions": ["nzb"]
  },
  "application/x-perl": {
    "source": "nginx",
    "extensions": ["pl","pm"]
  },
  "application/x-pilot": {
    "source": "nginx",
    "extensions": ["prc","pdb"]
  },
  "application/x-pkcs12": {
    "source": "apache",
    "compressible": false,
    "extensions": ["p12","pfx"]
  },
  "application/x-pkcs7-certificates": {
    "source": "apache",
    "extensions": ["p7b","spc"]
  },
  "application/x-pkcs7-certreqresp": {
    "source": "apache",
    "extensions": ["p7r"]
  },
  "application/x-rar-compressed": {
    "source": "apache",
    "compressible": false,
    "extensions": ["rar"]
  },
  "application/x-redhat-package-manager": {
    "source": "nginx",
    "extensions": ["rpm"]
  },
  "application/x-research-info-systems": {
    "source": "apache",
    "extensions": ["ris"]
  },
  "application/x-sea": {
    "source": "nginx",
    "extensions": ["sea"]
  },
  "application/x-sh": {
    "source": "apache",
    "compressible": true,
    "extensions": ["sh"]
  },
  "application/x-shar": {
    "source": "apache",
    "extensions": ["shar"]
  },
  "application/x-shockwave-flash": {
    "source": "apache",
    "compressible": false,
    "extensions": ["swf"]
  },
  "application/x-silverlight-app": {
    "source": "apache",
    "extensions": ["xap"]
  },
  "application/x-sql": {
    "source": "apache",
    "extensions": ["sql"]
  },
  "application/x-stuffit": {
    "source": "apache",
    "compressible": false,
    "extensions": ["sit"]
  },
  "application/x-stuffitx": {
    "source": "apache",
    "extensions": ["sitx"]
  },
  "application/x-subrip": {
    "source": "apache",
    "extensions": ["srt"]
  },
  "application/x-sv4cpio": {
    "source": "apache",
    "extensions": ["sv4cpio"]
  },
  "application/x-sv4crc": {
    "source": "apache",
    "extensions": ["sv4crc"]
  },
  "application/x-t3vm-image": {
    "source": "apache",
    "extensions": ["t3"]
  },
  "application/x-tads": {
    "source": "apache",
    "extensions": ["gam"]
  },
  "application/x-tar": {
    "source": "apache",
    "compressible": true,
    "extensions": ["tar"]
  },
  "application/x-tcl": {
    "source": "apache",
    "extensions": ["tcl","tk"]
  },
  "application/x-tex": {
    "source": "apache",
    "extensions": ["tex"]
  },
  "application/x-tex-tfm": {
    "source": "apache",
    "extensions": ["tfm"]
  },
  "application/x-texinfo": {
    "source": "apache",
    "extensions": ["texinfo","texi"]
  },
  "application/x-tgif": {
    "source": "apache",
    "extensions": ["obj"]
  },
  "application/x-ustar": {
    "source": "apache",
    "extensions": ["ustar"]
  },
  "application/x-wais-source": {
    "source": "apache",
    "extensions": ["src"]
  },
  "application/x-web-app-manifest+json": {
    "compressible": true,
    "extensions": ["webapp"]
  },
  "application/x-www-form-urlencoded": {
    "source": "iana",
    "compressible": true
  },
  "application/x-x509-ca-cert": {
    "source": "apache",
    "extensions": ["der","crt","pem"]
  },
  "application/x-xfig": {
    "source": "apache",
    "extensions": ["fig"]
  },
  "application/x-xliff+xml": {
    "source": "apache",
    "extensions": ["xlf"]
  },
  "application/x-xpinstall": {
    "source": "apache",
    "compressible": false,
    "extensions": ["xpi"]
  },
  "application/x-xz": {
    "source": "apache",
    "extensions": ["xz"]
  },
  "application/x-zmachine": {
    "source": "apache",
    "extensions": ["z1","z2","z3","z4","z5","z6","z7","z8"]
  },
  "application/x400-bp": {
    "source": "iana"
  },
  "application/xacml+xml": {
    "source": "iana"
  },
  "application/xaml+xml": {
    "source": "apache",
    "extensions": ["xaml"]
  },
  "application/xcap-att+xml": {
    "source": "iana"
  },
  "application/xcap-caps+xml": {
    "source": "iana"
  },
  "application/xcap-diff+xml": {
    "source": "iana",
    "extensions": ["xdf"]
  },
  "application/xcap-el+xml": {
    "source": "iana"
  },
  "application/xcap-error+xml": {
    "source": "iana"
  },
  "application/xcap-ns+xml": {
    "source": "iana"
  },
  "application/xcon-conference-info+xml": {
    "source": "iana"
  },
  "application/xcon-conference-info-diff+xml": {
    "source": "iana"
  },
  "application/xenc+xml": {
    "source": "iana",
    "extensions": ["xenc"]
  },
  "application/xhtml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xhtml","xht"]
  },
  "application/xhtml-voice+xml": {
    "source": "apache"
  },
  "application/xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xml","xsl","xsd","rng"]
  },
  "application/xml-dtd": {
    "source": "iana",
    "compressible": true,
    "extensions": ["dtd"]
  },
  "application/xml-external-parsed-entity": {
    "source": "iana"
  },
  "application/xml-patch+xml": {
    "source": "iana"
  },
  "application/xmpp+xml": {
    "source": "iana"
  },
  "application/xop+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xop"]
  },
  "application/xproc+xml": {
    "source": "apache",
    "extensions": ["xpl"]
  },
  "application/xslt+xml": {
    "source": "iana",
    "extensions": ["xslt"]
  },
  "application/xspf+xml": {
    "source": "apache",
    "extensions": ["xspf"]
  },
  "application/xv+xml": {
    "source": "iana",
    "extensions": ["mxml","xhvml","xvml","xvm"]
  },
  "application/yang": {
    "source": "iana",
    "extensions": ["yang"]
  },
  "application/yin+xml": {
    "source": "iana",
    "extensions": ["yin"]
  },
  "application/zip": {
    "source": "iana",
    "compressible": false,
    "extensions": ["zip"]
  },
  "application/zlib": {
    "source": "iana"
  },
  "audio/1d-interleaved-parityfec": {
    "source": "iana"
  },
  "audio/32kadpcm": {
    "source": "iana"
  },
  "audio/3gpp": {
    "source": "iana"
  },
  "audio/3gpp2": {
    "source": "iana"
  },
  "audio/ac3": {
    "source": "iana"
  },
  "audio/adpcm": {
    "source": "apache",
    "extensions": ["adp"]
  },
  "audio/amr": {
    "source": "iana"
  },
  "audio/amr-wb": {
    "source": "iana"
  },
  "audio/amr-wb+": {
    "source": "iana"
  },
  "audio/aptx": {
    "source": "iana"
  },
  "audio/asc": {
    "source": "iana"
  },
  "audio/atrac-advanced-lossless": {
    "source": "iana"
  },
  "audio/atrac-x": {
    "source": "iana"
  },
  "audio/atrac3": {
    "source": "iana"
  },
  "audio/basic": {
    "source": "iana",
    "compressible": false,
    "extensions": ["au","snd"]
  },
  "audio/bv16": {
    "source": "iana"
  },
  "audio/bv32": {
    "source": "iana"
  },
  "audio/clearmode": {
    "source": "iana"
  },
  "audio/cn": {
    "source": "iana"
  },
  "audio/dat12": {
    "source": "iana"
  },
  "audio/dls": {
    "source": "iana"
  },
  "audio/dsr-es201108": {
    "source": "iana"
  },
  "audio/dsr-es202050": {
    "source": "iana"
  },
  "audio/dsr-es202211": {
    "source": "iana"
  },
  "audio/dsr-es202212": {
    "source": "iana"
  },
  "audio/dv": {
    "source": "iana"
  },
  "audio/dvi4": {
    "source": "iana"
  },
  "audio/eac3": {
    "source": "iana"
  },
  "audio/encaprtp": {
    "source": "iana"
  },
  "audio/evrc": {
    "source": "iana"
  },
  "audio/evrc-qcp": {
    "source": "iana"
  },
  "audio/evrc0": {
    "source": "iana"
  },
  "audio/evrc1": {
    "source": "iana"
  },
  "audio/evrcb": {
    "source": "iana"
  },
  "audio/evrcb0": {
    "source": "iana"
  },
  "audio/evrcb1": {
    "source": "iana"
  },
  "audio/evrcnw": {
    "source": "iana"
  },
  "audio/evrcnw0": {
    "source": "iana"
  },
  "audio/evrcnw1": {
    "source": "iana"
  },
  "audio/evrcwb": {
    "source": "iana"
  },
  "audio/evrcwb0": {
    "source": "iana"
  },
  "audio/evrcwb1": {
    "source": "iana"
  },
  "audio/evs": {
    "source": "iana"
  },
  "audio/fwdred": {
    "source": "iana"
  },
  "audio/g711-0": {
    "source": "iana"
  },
  "audio/g719": {
    "source": "iana"
  },
  "audio/g722": {
    "source": "iana"
  },
  "audio/g7221": {
    "source": "iana"
  },
  "audio/g723": {
    "source": "iana"
  },
  "audio/g726-16": {
    "source": "iana"
  },
  "audio/g726-24": {
    "source": "iana"
  },
  "audio/g726-32": {
    "source": "iana"
  },
  "audio/g726-40": {
    "source": "iana"
  },
  "audio/g728": {
    "source": "iana"
  },
  "audio/g729": {
    "source": "iana"
  },
  "audio/g7291": {
    "source": "iana"
  },
  "audio/g729d": {
    "source": "iana"
  },
  "audio/g729e": {
    "source": "iana"
  },
  "audio/gsm": {
    "source": "iana"
  },
  "audio/gsm-efr": {
    "source": "iana"
  },
  "audio/gsm-hr-08": {
    "source": "iana"
  },
  "audio/ilbc": {
    "source": "iana"
  },
  "audio/ip-mr_v2.5": {
    "source": "iana"
  },
  "audio/isac": {
    "source": "apache"
  },
  "audio/l16": {
    "source": "iana"
  },
  "audio/l20": {
    "source": "iana"
  },
  "audio/l24": {
    "source": "iana",
    "compressible": false
  },
  "audio/l8": {
    "source": "iana"
  },
  "audio/lpc": {
    "source": "iana"
  },
  "audio/midi": {
    "source": "apache",
    "extensions": ["mid","midi","kar","rmi"]
  },
  "audio/mobile-xmf": {
    "source": "iana"
  },
  "audio/mp4": {
    "source": "iana",
    "compressible": false,
    "extensions": ["m4a","mp4a"]
  },
  "audio/mp4a-latm": {
    "source": "iana"
  },
  "audio/mpa": {
    "source": "iana"
  },
  "audio/mpa-robust": {
    "source": "iana"
  },
  "audio/mpeg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["mpga","mp2","mp2a","mp3","m2a","m3a"]
  },
  "audio/mpeg4-generic": {
    "source": "iana"
  },
  "audio/musepack": {
    "source": "apache"
  },
  "audio/ogg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["oga","ogg","spx"]
  },
  "audio/opus": {
    "source": "iana"
  },
  "audio/parityfec": {
    "source": "iana"
  },
  "audio/pcma": {
    "source": "iana"
  },
  "audio/pcma-wb": {
    "source": "iana"
  },
  "audio/pcmu": {
    "source": "iana"
  },
  "audio/pcmu-wb": {
    "source": "iana"
  },
  "audio/prs.sid": {
    "source": "iana"
  },
  "audio/qcelp": {
    "source": "iana"
  },
  "audio/raptorfec": {
    "source": "iana"
  },
  "audio/red": {
    "source": "iana"
  },
  "audio/rtp-enc-aescm128": {
    "source": "iana"
  },
  "audio/rtp-midi": {
    "source": "iana"
  },
  "audio/rtploopback": {
    "source": "iana"
  },
  "audio/rtx": {
    "source": "iana"
  },
  "audio/s3m": {
    "source": "apache",
    "extensions": ["s3m"]
  },
  "audio/silk": {
    "source": "apache",
    "extensions": ["sil"]
  },
  "audio/smv": {
    "source": "iana"
  },
  "audio/smv-qcp": {
    "source": "iana"
  },
  "audio/smv0": {
    "source": "iana"
  },
  "audio/sp-midi": {
    "source": "iana"
  },
  "audio/speex": {
    "source": "iana"
  },
  "audio/t140c": {
    "source": "iana"
  },
  "audio/t38": {
    "source": "iana"
  },
  "audio/telephone-event": {
    "source": "iana"
  },
  "audio/tone": {
    "source": "iana"
  },
  "audio/uemclip": {
    "source": "iana"
  },
  "audio/ulpfec": {
    "source": "iana"
  },
  "audio/vdvi": {
    "source": "iana"
  },
  "audio/vmr-wb": {
    "source": "iana"
  },
  "audio/vnd.3gpp.iufp": {
    "source": "iana"
  },
  "audio/vnd.4sb": {
    "source": "iana"
  },
  "audio/vnd.audiokoz": {
    "source": "iana"
  },
  "audio/vnd.celp": {
    "source": "iana"
  },
  "audio/vnd.cisco.nse": {
    "source": "iana"
  },
  "audio/vnd.cmles.radio-events": {
    "source": "iana"
  },
  "audio/vnd.cns.anp1": {
    "source": "iana"
  },
  "audio/vnd.cns.inf1": {
    "source": "iana"
  },
  "audio/vnd.dece.audio": {
    "source": "iana",
    "extensions": ["uva","uvva"]
  },
  "audio/vnd.digital-winds": {
    "source": "iana",
    "extensions": ["eol"]
  },
  "audio/vnd.dlna.adts": {
    "source": "iana"
  },
  "audio/vnd.dolby.heaac.1": {
    "source": "iana"
  },
  "audio/vnd.dolby.heaac.2": {
    "source": "iana"
  },
  "audio/vnd.dolby.mlp": {
    "source": "iana"
  },
  "audio/vnd.dolby.mps": {
    "source": "iana"
  },
  "audio/vnd.dolby.pl2": {
    "source": "iana"
  },
  "audio/vnd.dolby.pl2x": {
    "source": "iana"
  },
  "audio/vnd.dolby.pl2z": {
    "source": "iana"
  },
  "audio/vnd.dolby.pulse.1": {
    "source": "iana"
  },
  "audio/vnd.dra": {
    "source": "iana",
    "extensions": ["dra"]
  },
  "audio/vnd.dts": {
    "source": "iana",
    "extensions": ["dts"]
  },
  "audio/vnd.dts.hd": {
    "source": "iana",
    "extensions": ["dtshd"]
  },
  "audio/vnd.dvb.file": {
    "source": "iana"
  },
  "audio/vnd.everad.plj": {
    "source": "iana"
  },
  "audio/vnd.hns.audio": {
    "source": "iana"
  },
  "audio/vnd.lucent.voice": {
    "source": "iana",
    "extensions": ["lvp"]
  },
  "audio/vnd.ms-playready.media.pya": {
    "source": "iana",
    "extensions": ["pya"]
  },
  "audio/vnd.nokia.mobile-xmf": {
    "source": "iana"
  },
  "audio/vnd.nortel.vbk": {
    "source": "iana"
  },
  "audio/vnd.nuera.ecelp4800": {
    "source": "iana",
    "extensions": ["ecelp4800"]
  },
  "audio/vnd.nuera.ecelp7470": {
    "source": "iana",
    "extensions": ["ecelp7470"]
  },
  "audio/vnd.nuera.ecelp9600": {
    "source": "iana",
    "extensions": ["ecelp9600"]
  },
  "audio/vnd.octel.sbc": {
    "source": "iana"
  },
  "audio/vnd.qcelp": {
    "source": "iana"
  },
  "audio/vnd.rhetorex.32kadpcm": {
    "source": "iana"
  },
  "audio/vnd.rip": {
    "source": "iana",
    "extensions": ["rip"]
  },
  "audio/vnd.rn-realaudio": {
    "compressible": false
  },
  "audio/vnd.sealedmedia.softseal.mpeg": {
    "source": "iana"
  },
  "audio/vnd.vmx.cvsd": {
    "source": "iana"
  },
  "audio/vnd.wave": {
    "compressible": false
  },
  "audio/vorbis": {
    "source": "iana",
    "compressible": false
  },
  "audio/vorbis-config": {
    "source": "iana"
  },
  "audio/wav": {
    "compressible": false,
    "extensions": ["wav"]
  },
  "audio/wave": {
    "compressible": false,
    "extensions": ["wav"]
  },
  "audio/webm": {
    "source": "apache",
    "compressible": false,
    "extensions": ["weba"]
  },
  "audio/x-aac": {
    "source": "apache",
    "compressible": false,
    "extensions": ["aac"]
  },
  "audio/x-aiff": {
    "source": "apache",
    "extensions": ["aif","aiff","aifc"]
  },
  "audio/x-caf": {
    "source": "apache",
    "compressible": false,
    "extensions": ["caf"]
  },
  "audio/x-flac": {
    "source": "apache",
    "extensions": ["flac"]
  },
  "audio/x-m4a": {
    "source": "nginx",
    "extensions": ["m4a"]
  },
  "audio/x-matroska": {
    "source": "apache",
    "extensions": ["mka"]
  },
  "audio/x-mpegurl": {
    "source": "apache",
    "extensions": ["m3u"]
  },
  "audio/x-ms-wax": {
    "source": "apache",
    "extensions": ["wax"]
  },
  "audio/x-ms-wma": {
    "source": "apache",
    "extensions": ["wma"]
  },
  "audio/x-pn-realaudio": {
    "source": "apache",
    "extensions": ["ram","ra"]
  },
  "audio/x-pn-realaudio-plugin": {
    "source": "apache",
    "extensions": ["rmp"]
  },
  "audio/x-realaudio": {
    "source": "nginx",
    "extensions": ["ra"]
  },
  "audio/x-tta": {
    "source": "apache"
  },
  "audio/x-wav": {
    "source": "apache",
    "extensions": ["wav"]
  },
  "audio/xm": {
    "source": "apache",
    "extensions": ["xm"]
  },
  "chemical/x-cdx": {
    "source": "apache",
    "extensions": ["cdx"]
  },
  "chemical/x-cif": {
    "source": "apache",
    "extensions": ["cif"]
  },
  "chemical/x-cmdf": {
    "source": "apache",
    "extensions": ["cmdf"]
  },
  "chemical/x-cml": {
    "source": "apache",
    "extensions": ["cml"]
  },
  "chemical/x-csml": {
    "source": "apache",
    "extensions": ["csml"]
  },
  "chemical/x-pdb": {
    "source": "apache"
  },
  "chemical/x-xyz": {
    "source": "apache",
    "extensions": ["xyz"]
  },
  "font/opentype": {
    "compressible": true,
    "extensions": ["otf"]
  },
  "image/bmp": {
    "source": "apache",
    "compressible": true,
    "extensions": ["bmp"]
  },
  "image/cgm": {
    "source": "iana",
    "extensions": ["cgm"]
  },
  "image/fits": {
    "source": "iana"
  },
  "image/g3fax": {
    "source": "iana",
    "extensions": ["g3"]
  },
  "image/gif": {
    "source": "iana",
    "compressible": false,
    "extensions": ["gif"]
  },
  "image/ief": {
    "source": "iana",
    "extensions": ["ief"]
  },
  "image/jp2": {
    "source": "iana"
  },
  "image/jpeg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["jpeg","jpg","jpe"]
  },
  "image/jpm": {
    "source": "iana"
  },
  "image/jpx": {
    "source": "iana"
  },
  "image/ktx": {
    "source": "iana",
    "extensions": ["ktx"]
  },
  "image/naplps": {
    "source": "iana"
  },
  "image/pjpeg": {
    "compressible": false
  },
  "image/png": {
    "source": "iana",
    "compressible": false,
    "extensions": ["png"]
  },
  "image/prs.btif": {
    "source": "iana",
    "extensions": ["btif"]
  },
  "image/prs.pti": {
    "source": "iana"
  },
  "image/pwg-raster": {
    "source": "iana"
  },
  "image/sgi": {
    "source": "apache",
    "extensions": ["sgi"]
  },
  "image/svg+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["svg","svgz"]
  },
  "image/t38": {
    "source": "iana"
  },
  "image/tiff": {
    "source": "iana",
    "compressible": false,
    "extensions": ["tiff","tif"]
  },
  "image/tiff-fx": {
    "source": "iana"
  },
  "image/vnd.adobe.photoshop": {
    "source": "iana",
    "compressible": true,
    "extensions": ["psd"]
  },
  "image/vnd.airzip.accelerator.azv": {
    "source": "iana"
  },
  "image/vnd.cns.inf2": {
    "source": "iana"
  },
  "image/vnd.dece.graphic": {
    "source": "iana",
    "extensions": ["uvi","uvvi","uvg","uvvg"]
  },
  "image/vnd.djvu": {
    "source": "iana",
    "extensions": ["djvu","djv"]
  },
  "image/vnd.dvb.subtitle": {
    "source": "iana",
    "extensions": ["sub"]
  },
  "image/vnd.dwg": {
    "source": "iana",
    "extensions": ["dwg"]
  },
  "image/vnd.dxf": {
    "source": "iana",
    "extensions": ["dxf"]
  },
  "image/vnd.fastbidsheet": {
    "source": "iana",
    "extensions": ["fbs"]
  },
  "image/vnd.fpx": {
    "source": "iana",
    "extensions": ["fpx"]
  },
  "image/vnd.fst": {
    "source": "iana",
    "extensions": ["fst"]
  },
  "image/vnd.fujixerox.edmics-mmr": {
    "source": "iana",
    "extensions": ["mmr"]
  },
  "image/vnd.fujixerox.edmics-rlc": {
    "source": "iana",
    "extensions": ["rlc"]
  },
  "image/vnd.globalgraphics.pgb": {
    "source": "iana"
  },
  "image/vnd.microsoft.icon": {
    "source": "iana"
  },
  "image/vnd.mix": {
    "source": "iana"
  },
  "image/vnd.mozilla.apng": {
    "source": "iana"
  },
  "image/vnd.ms-modi": {
    "source": "iana",
    "extensions": ["mdi"]
  },
  "image/vnd.ms-photo": {
    "source": "apache",
    "extensions": ["wdp"]
  },
  "image/vnd.net-fpx": {
    "source": "iana",
    "extensions": ["npx"]
  },
  "image/vnd.radiance": {
    "source": "iana"
  },
  "image/vnd.sealed.png": {
    "source": "iana"
  },
  "image/vnd.sealedmedia.softseal.gif": {
    "source": "iana"
  },
  "image/vnd.sealedmedia.softseal.jpg": {
    "source": "iana"
  },
  "image/vnd.svf": {
    "source": "iana"
  },
  "image/vnd.tencent.tap": {
    "source": "iana"
  },
  "image/vnd.valve.source.texture": {
    "source": "iana"
  },
  "image/vnd.wap.wbmp": {
    "source": "iana",
    "extensions": ["wbmp"]
  },
  "image/vnd.xiff": {
    "source": "iana",
    "extensions": ["xif"]
  },
  "image/vnd.zbrush.pcx": {
    "source": "iana"
  },
  "image/webp": {
    "source": "apache",
    "extensions": ["webp"]
  },
  "image/x-3ds": {
    "source": "apache",
    "extensions": ["3ds"]
  },
  "image/x-cmu-raster": {
    "source": "apache",
    "extensions": ["ras"]
  },
  "image/x-cmx": {
    "source": "apache",
    "extensions": ["cmx"]
  },
  "image/x-freehand": {
    "source": "apache",
    "extensions": ["fh","fhc","fh4","fh5","fh7"]
  },
  "image/x-icon": {
    "source": "apache",
    "compressible": true,
    "extensions": ["ico"]
  },
  "image/x-jng": {
    "source": "nginx",
    "extensions": ["jng"]
  },
  "image/x-mrsid-image": {
    "source": "apache",
    "extensions": ["sid"]
  },
  "image/x-ms-bmp": {
    "source": "nginx",
    "compressible": true,
    "extensions": ["bmp"]
  },
  "image/x-pcx": {
    "source": "apache",
    "extensions": ["pcx"]
  },
  "image/x-pict": {
    "source": "apache",
    "extensions": ["pic","pct"]
  },
  "image/x-portable-anymap": {
    "source": "apache",
    "extensions": ["pnm"]
  },
  "image/x-portable-bitmap": {
    "source": "apache",
    "extensions": ["pbm"]
  },
  "image/x-portable-graymap": {
    "source": "apache",
    "extensions": ["pgm"]
  },
  "image/x-portable-pixmap": {
    "source": "apache",
    "extensions": ["ppm"]
  },
  "image/x-rgb": {
    "source": "apache",
    "extensions": ["rgb"]
  },
  "image/x-tga": {
    "source": "apache",
    "extensions": ["tga"]
  },
  "image/x-xbitmap": {
    "source": "apache",
    "extensions": ["xbm"]
  },
  "image/x-xcf": {
    "compressible": false
  },
  "image/x-xpixmap": {
    "source": "apache",
    "extensions": ["xpm"]
  },
  "image/x-xwindowdump": {
    "source": "apache",
    "extensions": ["xwd"]
  },
  "message/cpim": {
    "source": "iana"
  },
  "message/delivery-status": {
    "source": "iana"
  },
  "message/disposition-notification": {
    "source": "iana"
  },
  "message/external-body": {
    "source": "iana"
  },
  "message/feedback-report": {
    "source": "iana"
  },
  "message/global": {
    "source": "iana"
  },
  "message/global-delivery-status": {
    "source": "iana"
  },
  "message/global-disposition-notification": {
    "source": "iana"
  },
  "message/global-headers": {
    "source": "iana"
  },
  "message/http": {
    "source": "iana",
    "compressible": false
  },
  "message/imdn+xml": {
    "source": "iana",
    "compressible": true
  },
  "message/news": {
    "source": "iana"
  },
  "message/partial": {
    "source": "iana",
    "compressible": false
  },
  "message/rfc822": {
    "source": "iana",
    "compressible": true,
    "extensions": ["eml","mime"]
  },
  "message/s-http": {
    "source": "iana"
  },
  "message/sip": {
    "source": "iana"
  },
  "message/sipfrag": {
    "source": "iana"
  },
  "message/tracking-status": {
    "source": "iana"
  },
  "message/vnd.si.simp": {
    "source": "iana"
  },
  "message/vnd.wfa.wsc": {
    "source": "iana"
  },
  "model/iges": {
    "source": "iana",
    "compressible": false,
    "extensions": ["igs","iges"]
  },
  "model/mesh": {
    "source": "iana",
    "compressible": false,
    "extensions": ["msh","mesh","silo"]
  },
  "model/vnd.collada+xml": {
    "source": "iana",
    "extensions": ["dae"]
  },
  "model/vnd.dwf": {
    "source": "iana",
    "extensions": ["dwf"]
  },
  "model/vnd.flatland.3dml": {
    "source": "iana"
  },
  "model/vnd.gdl": {
    "source": "iana",
    "extensions": ["gdl"]
  },
  "model/vnd.gs-gdl": {
    "source": "apache"
  },
  "model/vnd.gs.gdl": {
    "source": "iana"
  },
  "model/vnd.gtw": {
    "source": "iana",
    "extensions": ["gtw"]
  },
  "model/vnd.moml+xml": {
    "source": "iana"
  },
  "model/vnd.mts": {
    "source": "iana",
    "extensions": ["mts"]
  },
  "model/vnd.opengex": {
    "source": "iana"
  },
  "model/vnd.parasolid.transmit.binary": {
    "source": "iana"
  },
  "model/vnd.parasolid.transmit.text": {
    "source": "iana"
  },
  "model/vnd.rosette.annotated-data-model": {
    "source": "iana"
  },
  "model/vnd.valve.source.compiled-map": {
    "source": "iana"
  },
  "model/vnd.vtu": {
    "source": "iana",
    "extensions": ["vtu"]
  },
  "model/vrml": {
    "source": "iana",
    "compressible": false,
    "extensions": ["wrl","vrml"]
  },
  "model/x3d+binary": {
    "source": "apache",
    "compressible": false,
    "extensions": ["x3db","x3dbz"]
  },
  "model/x3d+fastinfoset": {
    "source": "iana"
  },
  "model/x3d+vrml": {
    "source": "apache",
    "compressible": false,
    "extensions": ["x3dv","x3dvz"]
  },
  "model/x3d+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["x3d","x3dz"]
  },
  "model/x3d-vrml": {
    "source": "iana"
  },
  "multipart/alternative": {
    "source": "iana",
    "compressible": false
  },
  "multipart/appledouble": {
    "source": "iana"
  },
  "multipart/byteranges": {
    "source": "iana"
  },
  "multipart/digest": {
    "source": "iana"
  },
  "multipart/encrypted": {
    "source": "iana",
    "compressible": false
  },
  "multipart/form-data": {
    "source": "iana",
    "compressible": false
  },
  "multipart/header-set": {
    "source": "iana"
  },
  "multipart/mixed": {
    "source": "iana",
    "compressible": false
  },
  "multipart/parallel": {
    "source": "iana"
  },
  "multipart/related": {
    "source": "iana",
    "compressible": false
  },
  "multipart/report": {
    "source": "iana"
  },
  "multipart/signed": {
    "source": "iana",
    "compressible": false
  },
  "multipart/voice-message": {
    "source": "iana"
  },
  "multipart/x-mixed-replace": {
    "source": "iana"
  },
  "text/1d-interleaved-parityfec": {
    "source": "iana"
  },
  "text/cache-manifest": {
    "source": "iana",
    "compressible": true,
    "extensions": ["appcache","manifest"]
  },
  "text/calendar": {
    "source": "iana",
    "extensions": ["ics","ifb"]
  },
  "text/calender": {
    "compressible": true
  },
  "text/cmd": {
    "compressible": true
  },
  "text/coffeescript": {
    "extensions": ["coffee","litcoffee"]
  },
  "text/css": {
    "source": "iana",
    "compressible": true,
    "extensions": ["css"]
  },
  "text/csv": {
    "source": "iana",
    "compressible": true,
    "extensions": ["csv"]
  },
  "text/csv-schema": {
    "source": "iana"
  },
  "text/directory": {
    "source": "iana"
  },
  "text/dns": {
    "source": "iana"
  },
  "text/ecmascript": {
    "source": "iana"
  },
  "text/encaprtp": {
    "source": "iana"
  },
  "text/enriched": {
    "source": "iana"
  },
  "text/fwdred": {
    "source": "iana"
  },
  "text/grammar-ref-list": {
    "source": "iana"
  },
  "text/hjson": {
    "extensions": ["hjson"]
  },
  "text/html": {
    "source": "iana",
    "compressible": true,
    "extensions": ["html","htm","shtml"]
  },
  "text/jade": {
    "extensions": ["jade"]
  },
  "text/javascript": {
    "source": "iana",
    "compressible": true
  },
  "text/jcr-cnd": {
    "source": "iana"
  },
  "text/jsx": {
    "compressible": true,
    "extensions": ["jsx"]
  },
  "text/less": {
    "extensions": ["less"]
  },
  "text/markdown": {
    "source": "iana"
  },
  "text/mathml": {
    "source": "nginx",
    "extensions": ["mml"]
  },
  "text/mizar": {
    "source": "iana"
  },
  "text/n3": {
    "source": "iana",
    "compressible": true,
    "extensions": ["n3"]
  },
  "text/parameters": {
    "source": "iana"
  },
  "text/parityfec": {
    "source": "iana"
  },
  "text/plain": {
    "source": "iana",
    "compressible": true,
    "extensions": ["txt","text","conf","def","list","log","in","ini"]
  },
  "text/provenance-notation": {
    "source": "iana"
  },
  "text/prs.fallenstein.rst": {
    "source": "iana"
  },
  "text/prs.lines.tag": {
    "source": "iana",
    "extensions": ["dsc"]
  },
  "text/raptorfec": {
    "source": "iana"
  },
  "text/red": {
    "source": "iana"
  },
  "text/rfc822-headers": {
    "source": "iana"
  },
  "text/richtext": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rtx"]
  },
  "text/rtf": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rtf"]
  },
  "text/rtp-enc-aescm128": {
    "source": "iana"
  },
  "text/rtploopback": {
    "source": "iana"
  },
  "text/rtx": {
    "source": "iana"
  },
  "text/sgml": {
    "source": "iana",
    "extensions": ["sgml","sgm"]
  },
  "text/slim": {
    "extensions": ["slim","slm"]
  },
  "text/stylus": {
    "extensions": ["stylus","styl"]
  },
  "text/t140": {
    "source": "iana"
  },
  "text/tab-separated-values": {
    "source": "iana",
    "compressible": true,
    "extensions": ["tsv"]
  },
  "text/troff": {
    "source": "iana",
    "extensions": ["t","tr","roff","man","me","ms"]
  },
  "text/turtle": {
    "source": "iana",
    "extensions": ["ttl"]
  },
  "text/ulpfec": {
    "source": "iana"
  },
  "text/uri-list": {
    "source": "iana",
    "compressible": true,
    "extensions": ["uri","uris","urls"]
  },
  "text/vcard": {
    "source": "iana",
    "compressible": true,
    "extensions": ["vcard"]
  },
  "text/vnd.a": {
    "source": "iana"
  },
  "text/vnd.abc": {
    "source": "iana"
  },
  "text/vnd.curl": {
    "source": "iana",
    "extensions": ["curl"]
  },
  "text/vnd.curl.dcurl": {
    "source": "apache",
    "extensions": ["dcurl"]
  },
  "text/vnd.curl.mcurl": {
    "source": "apache",
    "extensions": ["mcurl"]
  },
  "text/vnd.curl.scurl": {
    "source": "apache",
    "extensions": ["scurl"]
  },
  "text/vnd.debian.copyright": {
    "source": "iana"
  },
  "text/vnd.dmclientscript": {
    "source": "iana"
  },
  "text/vnd.dvb.subtitle": {
    "source": "iana",
    "extensions": ["sub"]
  },
  "text/vnd.esmertec.theme-descriptor": {
    "source": "iana"
  },
  "text/vnd.fly": {
    "source": "iana",
    "extensions": ["fly"]
  },
  "text/vnd.fmi.flexstor": {
    "source": "iana",
    "extensions": ["flx"]
  },
  "text/vnd.graphviz": {
    "source": "iana",
    "extensions": ["gv"]
  },
  "text/vnd.in3d.3dml": {
    "source": "iana",
    "extensions": ["3dml"]
  },
  "text/vnd.in3d.spot": {
    "source": "iana",
    "extensions": ["spot"]
  },
  "text/vnd.iptc.newsml": {
    "source": "iana"
  },
  "text/vnd.iptc.nitf": {
    "source": "iana"
  },
  "text/vnd.latex-z": {
    "source": "iana"
  },
  "text/vnd.motorola.reflex": {
    "source": "iana"
  },
  "text/vnd.ms-mediapackage": {
    "source": "iana"
  },
  "text/vnd.net2phone.commcenter.command": {
    "source": "iana"
  },
  "text/vnd.radisys.msml-basic-layout": {
    "source": "iana"
  },
  "text/vnd.si.uricatalogue": {
    "source": "iana"
  },
  "text/vnd.sun.j2me.app-descriptor": {
    "source": "iana",
    "extensions": ["jad"]
  },
  "text/vnd.trolltech.linguist": {
    "source": "iana"
  },
  "text/vnd.wap.si": {
    "source": "iana"
  },
  "text/vnd.wap.sl": {
    "source": "iana"
  },
  "text/vnd.wap.wml": {
    "source": "iana",
    "extensions": ["wml"]
  },
  "text/vnd.wap.wmlscript": {
    "source": "iana",
    "extensions": ["wmls"]
  },
  "text/vtt": {
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["vtt"]
  },
  "text/x-asm": {
    "source": "apache",
    "extensions": ["s","asm"]
  },
  "text/x-c": {
    "source": "apache",
    "extensions": ["c","cc","cxx","cpp","h","hh","dic"]
  },
  "text/x-component": {
    "source": "nginx",
    "extensions": ["htc"]
  },
  "text/x-fortran": {
    "source": "apache",
    "extensions": ["f","for","f77","f90"]
  },
  "text/x-gwt-rpc": {
    "compressible": true
  },
  "text/x-handlebars-template": {
    "extensions": ["hbs"]
  },
  "text/x-java-source": {
    "source": "apache",
    "extensions": ["java"]
  },
  "text/x-jquery-tmpl": {
    "compressible": true
  },
  "text/x-lua": {
    "extensions": ["lua"]
  },
  "text/x-markdown": {
    "compressible": true,
    "extensions": ["markdown","md","mkd"]
  },
  "text/x-nfo": {
    "source": "apache",
    "extensions": ["nfo"]
  },
  "text/x-opml": {
    "source": "apache",
    "extensions": ["opml"]
  },
  "text/x-pascal": {
    "source": "apache",
    "extensions": ["p","pas"]
  },
  "text/x-processing": {
    "compressible": true,
    "extensions": ["pde"]
  },
  "text/x-sass": {
    "extensions": ["sass"]
  },
  "text/x-scss": {
    "extensions": ["scss"]
  },
  "text/x-setext": {
    "source": "apache",
    "extensions": ["etx"]
  },
  "text/x-sfv": {
    "source": "apache",
    "extensions": ["sfv"]
  },
  "text/x-suse-ymp": {
    "compressible": true,
    "extensions": ["ymp"]
  },
  "text/x-uuencode": {
    "source": "apache",
    "extensions": ["uu"]
  },
  "text/x-vcalendar": {
    "source": "apache",
    "extensions": ["vcs"]
  },
  "text/x-vcard": {
    "source": "apache",
    "extensions": ["vcf"]
  },
  "text/xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xml"]
  },
  "text/xml-external-parsed-entity": {
    "source": "iana"
  },
  "text/yaml": {
    "extensions": ["yaml","yml"]
  },
  "video/1d-interleaved-parityfec": {
    "source": "apache"
  },
  "video/3gpp": {
    "source": "apache",
    "extensions": ["3gp","3gpp"]
  },
  "video/3gpp-tt": {
    "source": "apache"
  },
  "video/3gpp2": {
    "source": "apache",
    "extensions": ["3g2"]
  },
  "video/bmpeg": {
    "source": "apache"
  },
  "video/bt656": {
    "source": "apache"
  },
  "video/celb": {
    "source": "apache"
  },
  "video/dv": {
    "source": "apache"
  },
  "video/h261": {
    "source": "apache",
    "extensions": ["h261"]
  },
  "video/h263": {
    "source": "apache",
    "extensions": ["h263"]
  },
  "video/h263-1998": {
    "source": "apache"
  },
  "video/h263-2000": {
    "source": "apache"
  },
  "video/h264": {
    "source": "apache",
    "extensions": ["h264"]
  },
  "video/h264-rcdo": {
    "source": "apache"
  },
  "video/h264-svc": {
    "source": "apache"
  },
  "video/jpeg": {
    "source": "apache",
    "extensions": ["jpgv"]
  },
  "video/jpeg2000": {
    "source": "apache"
  },
  "video/jpm": {
    "source": "apache",
    "extensions": ["jpm","jpgm"]
  },
  "video/mj2": {
    "source": "apache",
    "extensions": ["mj2","mjp2"]
  },
  "video/mp1s": {
    "source": "apache"
  },
  "video/mp2p": {
    "source": "apache"
  },
  "video/mp2t": {
    "source": "apache",
    "extensions": ["ts"]
  },
  "video/mp4": {
    "source": "apache",
    "compressible": false,
    "extensions": ["mp4","mp4v","mpg4"]
  },
  "video/mp4v-es": {
    "source": "apache"
  },
  "video/mpeg": {
    "source": "apache",
    "compressible": false,
    "extensions": ["mpeg","mpg","mpe","m1v","m2v"]
  },
  "video/mpeg4-generic": {
    "source": "apache"
  },
  "video/mpv": {
    "source": "apache"
  },
  "video/nv": {
    "source": "apache"
  },
  "video/ogg": {
    "source": "apache",
    "compressible": false,
    "extensions": ["ogv"]
  },
  "video/parityfec": {
    "source": "apache"
  },
  "video/pointer": {
    "source": "apache"
  },
  "video/quicktime": {
    "source": "apache",
    "compressible": false,
    "extensions": ["qt","mov"]
  },
  "video/raw": {
    "source": "apache"
  },
  "video/rtp-enc-aescm128": {
    "source": "apache"
  },
  "video/rtx": {
    "source": "apache"
  },
  "video/smpte292m": {
    "source": "apache"
  },
  "video/ulpfec": {
    "source": "apache"
  },
  "video/vc1": {
    "source": "apache"
  },
  "video/vnd.cctv": {
    "source": "apache"
  },
  "video/vnd.dece.hd": {
    "source": "apache",
    "extensions": ["uvh","uvvh"]
  },
  "video/vnd.dece.mobile": {
    "source": "apache",
    "extensions": ["uvm","uvvm"]
  },
  "video/vnd.dece.mp4": {
    "source": "apache"
  },
  "video/vnd.dece.pd": {
    "source": "apache",
    "extensions": ["uvp","uvvp"]
  },
  "video/vnd.dece.sd": {
    "source": "apache",
    "extensions": ["uvs","uvvs"]
  },
  "video/vnd.dece.video": {
    "source": "apache",
    "extensions": ["uvv","uvvv"]
  },
  "video/vnd.directv.mpeg": {
    "source": "apache"
  },
  "video/vnd.directv.mpeg-tts": {
    "source": "apache"
  },
  "video/vnd.dlna.mpeg-tts": {
    "source": "apache"
  },
  "video/vnd.dvb.file": {
    "source": "apache",
    "extensions": ["dvb"]
  },
  "video/vnd.fvt": {
    "source": "apache",
    "extensions": ["fvt"]
  },
  "video/vnd.hns.video": {
    "source": "apache"
  },
  "video/vnd.iptvforum.1dparityfec-1010": {
    "source": "apache"
  },
  "video/vnd.iptvforum.1dparityfec-2005": {
    "source": "apache"
  },
  "video/vnd.iptvforum.2dparityfec-1010": {
    "source": "apache"
  },
  "video/vnd.iptvforum.2dparityfec-2005": {
    "source": "apache"
  },
  "video/vnd.iptvforum.ttsavc": {
    "source": "apache"
  },
  "video/vnd.iptvforum.ttsmpeg2": {
    "source": "apache"
  },
  "video/vnd.motorola.video": {
    "source": "apache"
  },
  "video/vnd.motorola.videop": {
    "source": "apache"
  },
  "video/vnd.mpegurl": {
    "source": "apache",
    "extensions": ["mxu","m4u"]
  },
  "video/vnd.ms-playready.media.pyv": {
    "source": "apache",
    "extensions": ["pyv"]
  },
  "video/vnd.nokia.interleaved-multimedia": {
    "source": "apache"
  },
  "video/vnd.nokia.videovoip": {
    "source": "apache"
  },
  "video/vnd.objectvideo": {
    "source": "apache"
  },
  "video/vnd.sealed.mpeg1": {
    "source": "apache"
  },
  "video/vnd.sealed.mpeg4": {
    "source": "apache"
  },
  "video/vnd.sealed.swf": {
    "source": "apache"
  },
  "video/vnd.sealedmedia.softseal.mov": {
    "source": "apache"
  },
  "video/vnd.uvvu.mp4": {
    "source": "apache",
    "extensions": ["uvu","uvvu"]
  },
  "video/vnd.vivo": {
    "source": "apache",
    "extensions": ["viv"]
  },
  "video/webm": {
    "source": "apache",
    "compressible": false,
    "extensions": ["webm"]
  },
  "video/x-f4v": {
    "source": "apache",
    "extensions": ["f4v"]
  },
  "video/x-fli": {
    "source": "apache",
    "extensions": ["fli"]
  },
  "video/x-flv": {
    "source": "apache",
    "compressible": false,
    "extensions": ["flv"]
  },
  "video/x-m4v": {
    "source": "apache",
    "extensions": ["m4v"]
  },
  "video/x-matroska": {
    "source": "apache",
    "compressible": false,
    "extensions": ["mkv","mk3d","mks"]
  },
  "video/x-mng": {
    "source": "apache",
    "extensions": ["mng"]
  },
  "video/x-ms-asf": {
    "source": "apache",
    "extensions": ["asf","asx"]
  },
  "video/x-ms-vob": {
    "source": "apache",
    "extensions": ["vob"]
  },
  "video/x-ms-wm": {
    "source": "apache",
    "extensions": ["wm"]
  },
  "video/x-ms-wmv": {
    "source": "apache",
    "compressible": false,
    "extensions": ["wmv"]
  },
  "video/x-ms-wmx": {
    "source": "apache",
    "extensions": ["wmx"]
  },
  "video/x-ms-wvx": {
    "source": "apache",
    "extensions": ["wvx"]
  },
  "video/x-msvideo": {
    "source": "apache",
    "extensions": ["avi"]
  },
  "video/x-sgi-movie": {
    "source": "apache",
    "extensions": ["movie"]
  },
  "video/x-smv": {
    "source": "apache",
    "extensions": ["smv"]
  },
  "x-conference/x-cooltalk": {
    "source": "apache",
    "extensions": ["ice"]
  },
  "x-shader/x-fragment": {
    "compressible": true
  },
  "x-shader/x-vertex": {
    "compressible": true
  }
}

},{}],37:[function(require,module,exports){
module.exports=require("./db.json");

},{"./db.json":36}],38:[function(require,module,exports){
"use strict";function charset(e){if(!e||"string"!=typeof e)return!1;var t=extractTypeRegExp.exec(e),r=t&&db[t[1].toLowerCase()];return r&&r.charset?r.charset:t&&textTypeRegExp.test(t[1])?"UTF-8":!1}function contentType(e){if(!e||"string"!=typeof e)return!1;var t=-1===e.indexOf("/")?exports.lookup(e):e;if(!t)return!1;if(-1===t.indexOf("charset")){var r=exports.charset(t);r&&(t+="; charset="+r.toLowerCase())}return t}function extension(e){if(!e||"string"!=typeof e)return!1;var t=extractTypeRegExp.exec(e),r=t&&exports.extensions[t[1].toLowerCase()];return r&&r.length?r[0]:!1}function lookup(e){if(!e||"string"!=typeof e)return!1;var t=extname("x."+e).toLowerCase().substr(1);return t?exports.types[t]||!1:!1}function populateMaps(e,t){var r=["nginx","apache",void 0,"iana"];Object.keys(db).forEach(function(n){var o=db[n],s=o.extensions;if(s&&s.length){e[n]=s;for(var p=0;p<s.length;p++){var a=s[p];if(t[a]){var i=r.indexOf(db[t[a]].source),x=r.indexOf(o.source);if("application/octet-stream"!==t[a]&&i>x||i===x&&"application/"===t[a].substr(0,12))continue}t[a]=n}}})}var db=require("mime-db"),extname=require("path").extname,extractTypeRegExp=/^\s*([^;\s]*)(?:;|\s|$)/,textTypeRegExp=/^text\//i;exports.charset=charset,exports.charsets={lookup:charset},exports.contentType=contentType,exports.extension=extension,exports.extensions=Object.create(null),exports.lookup=lookup,exports.types=Object.create(null),populateMaps(exports.extensions,exports.types);

},{"mime-db":37,"path":240}],39:[function(require,module,exports){
(function (process){
function Mime(){this.types=Object.create(null),this.extensions=Object.create(null)}var path=require("path"),fs=require("fs");Mime.prototype.define=function(e){for(var t in e){for(var i=e[t],s=0;s<i.length;s++)process.env.DEBUG_MIME&&this.types[i]&&console.warn(this._loading.replace(/.*\//,""),'changes "'+i[s]+'" extension type from '+this.types[i]+" to "+t),this.types[i[s]]=t;this.extensions[t]||(this.extensions[t]=i[0])}},Mime.prototype.load=function(e){this._loading=e;var t={},i=fs.readFileSync(e,"ascii"),s=i.split(/[\r\n]+/);s.forEach(function(e){var i=e.replace(/\s*#.*|^\s*|\s*$/g,"").split(/\s+/);t[i.shift()]=i}),this.define(t),this._loading=null},Mime.prototype.lookup=function(e,t){var i=e.replace(/.*[\.\/\\]/,"").toLowerCase();return this.types[i]||t||this.default_type},Mime.prototype.extension=function(e){var t=e.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();return this.extensions[t]};var mime=new Mime;mime.define(require("./types.json")),mime.default_type=mime.lookup("bin"),mime.Mime=Mime,mime.charsets={lookup:function(e,t){return/^text\//.test(e)?"UTF-8":t}},module.exports=mime;

}).call(this,require('_process'))
},{"./types.json":40,"_process":244,"fs":110,"path":240}],40:[function(require,module,exports){
module.exports={"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomsvc+xml":["atomsvc"],"application/ccxml+xml":["ccxml"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mdp"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma"],"application/emma+xml":["emma"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/font-tdpfr":["pfr"],"application/font-woff":["woff"],"application/font-woff2":["woff2"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/java-archive":["jar"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/prs.cww":["cww"],"application/pskc+xml":["pskcxml"],"application/rdf+xml":["rdf"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/vnd.3gpp.pic-bw-large":["plb"],"application/vnd.3gpp.pic-bw-small":["psb"],"application/vnd.3gpp.pic-bw-var":["pvb"],"application/vnd.3gpp2.tcap":["tcap"],"application/vnd.3m.post-it-notes":["pwn"],"application/vnd.accpac.simply.aso":["aso"],"application/vnd.accpac.simply.imp":["imp"],"application/vnd.acucobol":["acu"],"application/vnd.acucorp":["atc","acutc"],"application/vnd.adobe.air-application-installer-package+zip":["air"],"application/vnd.adobe.formscentral.fcdt":["fcdt"],"application/vnd.adobe.fxp":["fxp","fxpl"],"application/vnd.adobe.xdp+xml":["xdp"],"application/vnd.adobe.xfdf":["xfdf"],"application/vnd.ahead.space":["ahead"],"application/vnd.airzip.filesecure.azf":["azf"],"application/vnd.airzip.filesecure.azs":["azs"],"application/vnd.amazon.ebook":["azw"],"application/vnd.americandynamics.acc":["acc"],"application/vnd.amiga.ami":["ami"],"application/vnd.android.package-archive":["apk"],"application/vnd.anser-web-certificate-issue-initiation":["cii"],"application/vnd.anser-web-funds-transfer-initiation":["fti"],"application/vnd.antix.game-component":["atx"],"application/vnd.apple.installer+xml":["mpkg"],"application/vnd.apple.mpegurl":["m3u8"],"application/vnd.aristanetworks.swi":["swi"],"application/vnd.astraea-software.iota":["iota"],"application/vnd.audiograph":["aep"],"application/vnd.blueice.multipass":["mpm"],"application/vnd.bmi":["bmi"],"application/vnd.businessobjects":["rep"],"application/vnd.chemdraw+xml":["cdxml"],"application/vnd.chipnuts.karaoke-mmd":["mmd"],"application/vnd.cinderella":["cdy"],"application/vnd.claymore":["cla"],"application/vnd.cloanto.rp9":["rp9"],"application/vnd.clonk.c4group":["c4g","c4d","c4f","c4p","c4u"],"application/vnd.cluetrust.cartomobile-config":["c11amc"],"application/vnd.cluetrust.cartomobile-config-pkg":["c11amz"],"application/vnd.commonspace":["csp"],"application/vnd.contact.cmsg":["cdbcmsg"],"application/vnd.cosmocaller":["cmc"],"application/vnd.crick.clicker":["clkx"],"application/vnd.crick.clicker.keyboard":["clkk"],"application/vnd.crick.clicker.palette":["clkp"],"application/vnd.crick.clicker.template":["clkt"],"application/vnd.crick.clicker.wordbank":["clkw"],"application/vnd.criticaltools.wbs+xml":["wbs"],"application/vnd.ctc-posml":["pml"],"application/vnd.cups-ppd":["ppd"],"application/vnd.curl.car":["car"],"application/vnd.curl.pcurl":["pcurl"],"application/vnd.dart":["dart"],"application/vnd.data-vision.rdz":["rdz"],"application/vnd.dece.data":["uvf","uvvf","uvd","uvvd"],"application/vnd.dece.ttml+xml":["uvt","uvvt"],"application/vnd.dece.unspecified":["uvx","uvvx"],"application/vnd.dece.zip":["uvz","uvvz"],"application/vnd.denovo.fcselayout-link":["fe_launch"],"application/vnd.dna":["dna"],"application/vnd.dolby.mlp":["mlp"],"application/vnd.dpgraph":["dpg"],"application/vnd.dreamfactory":["dfac"],"application/vnd.ds-keypoint":["kpxx"],"application/vnd.dvb.ait":["ait"],"application/vnd.dvb.service":["svc"],"application/vnd.dynageo":["geo"],"application/vnd.ecowin.chart":["mag"],"application/vnd.enliven":["nml"],"application/vnd.epson.esf":["esf"],"application/vnd.epson.msf":["msf"],"application/vnd.epson.quickanime":["qam"],"application/vnd.epson.salt":["slt"],"application/vnd.epson.ssf":["ssf"],"application/vnd.eszigno3+xml":["es3","et3"],"application/vnd.ezpix-album":["ez2"],"application/vnd.ezpix-package":["ez3"],"application/vnd.fdf":["fdf"],"application/vnd.fdsn.mseed":["mseed"],"application/vnd.fdsn.seed":["seed","dataless"],"application/vnd.flographit":["gph"],"application/vnd.fluxtime.clip":["ftc"],"application/vnd.framemaker":["fm","frame","maker","book"],"application/vnd.frogans.fnc":["fnc"],"application/vnd.frogans.ltf":["ltf"],"application/vnd.fsc.weblaunch":["fsc"],"application/vnd.fujitsu.oasys":["oas"],"application/vnd.fujitsu.oasys2":["oa2"],"application/vnd.fujitsu.oasys3":["oa3"],"application/vnd.fujitsu.oasysgp":["fg5"],"application/vnd.fujitsu.oasysprs":["bh2"],"application/vnd.fujixerox.ddd":["ddd"],"application/vnd.fujixerox.docuworks":["xdw"],"application/vnd.fujixerox.docuworks.binder":["xbd"],"application/vnd.fuzzysheet":["fzs"],"application/vnd.genomatix.tuxedo":["txd"],"application/vnd.geogebra.file":["ggb"],"application/vnd.geogebra.tool":["ggt"],"application/vnd.geometry-explorer":["gex","gre"],"application/vnd.geonext":["gxt"],"application/vnd.geoplan":["g2w"],"application/vnd.geospace":["g3w"],"application/vnd.gmx":["gmx"],"application/vnd.google-earth.kml+xml":["kml"],"application/vnd.google-earth.kmz":["kmz"],"application/vnd.grafeq":["gqf","gqs"],"application/vnd.groove-account":["gac"],"application/vnd.groove-help":["ghf"],"application/vnd.groove-identity-message":["gim"],"application/vnd.groove-injector":["grv"],"application/vnd.groove-tool-message":["gtm"],"application/vnd.groove-tool-template":["tpl"],"application/vnd.groove-vcard":["vcg"],"application/vnd.hal+xml":["hal"],"application/vnd.handheld-entertainment+xml":["zmm"],"application/vnd.hbci":["hbci"],"application/vnd.hhe.lesson-player":["les"],"application/vnd.hp-hpgl":["hpgl"],"application/vnd.hp-hpid":["hpid"],"application/vnd.hp-hps":["hps"],"application/vnd.hp-jlyt":["jlt"],"application/vnd.hp-pcl":["pcl"],"application/vnd.hp-pclxl":["pclxl"],"application/vnd.ibm.minipay":["mpy"],"application/vnd.ibm.modcap":["afp","listafp","list3820"],"application/vnd.ibm.rights-management":["irm"],"application/vnd.ibm.secure-container":["sc"],"application/vnd.iccprofile":["icc","icm"],"application/vnd.igloader":["igl"],"application/vnd.immervision-ivp":["ivp"],"application/vnd.immervision-ivu":["ivu"],"application/vnd.insors.igm":["igm"],"application/vnd.intercon.formnet":["xpw","xpx"],"application/vnd.intergeo":["i2g"],"application/vnd.intu.qbo":["qbo"],"application/vnd.intu.qfx":["qfx"],"application/vnd.ipunplugged.rcprofile":["rcprofile"],"application/vnd.irepository.package+xml":["irp"],"application/vnd.is-xpr":["xpr"],"application/vnd.isac.fcs":["fcs"],"application/vnd.jam":["jam"],"application/vnd.jcp.javame.midlet-rms":["rms"],"application/vnd.jisp":["jisp"],"application/vnd.joost.joda-archive":["joda"],"application/vnd.kahootz":["ktz","ktr"],"application/vnd.kde.karbon":["karbon"],"application/vnd.kde.kchart":["chrt"],"application/vnd.kde.kformula":["kfo"],"application/vnd.kde.kivio":["flw"],"application/vnd.kde.kontour":["kon"],"application/vnd.kde.kpresenter":["kpr","kpt"],"application/vnd.kde.kspread":["ksp"],"application/vnd.kde.kword":["kwd","kwt"],"application/vnd.kenameaapp":["htke"],"application/vnd.kidspiration":["kia"],"application/vnd.kinar":["kne","knp"],"application/vnd.koan":["skp","skd","skt","skm"],"application/vnd.kodak-descriptor":["sse"],"application/vnd.las.las+xml":["lasxml"],"application/vnd.llamagraphics.life-balance.desktop":["lbd"],"application/vnd.llamagraphics.life-balance.exchange+xml":["lbe"],"application/vnd.lotus-1-2-3":["123"],"application/vnd.lotus-approach":["apr"],"application/vnd.lotus-freelance":["pre"],"application/vnd.lotus-notes":["nsf"],"application/vnd.lotus-organizer":["org"],"application/vnd.lotus-screencam":["scm"],"application/vnd.lotus-wordpro":["lwp"],"application/vnd.macports.portpkg":["portpkg"],"application/vnd.mcd":["mcd"],"application/vnd.medcalcdata":["mc1"],"application/vnd.mediastation.cdkey":["cdkey"],"application/vnd.mfer":["mwf"],"application/vnd.mfmp":["mfm"],"application/vnd.micrografx.flo":["flo"],"application/vnd.micrografx.igx":["igx"],"application/vnd.mif":["mif"],"application/vnd.mobius.daf":["daf"],"application/vnd.mobius.dis":["dis"],"application/vnd.mobius.mbk":["mbk"],"application/vnd.mobius.mqy":["mqy"],"application/vnd.mobius.msl":["msl"],"application/vnd.mobius.plc":["plc"],"application/vnd.mobius.txf":["txf"],"application/vnd.mophun.application":["mpn"],"application/vnd.mophun.certificate":["mpc"],"application/vnd.mozilla.xul+xml":["xul"],"application/vnd.ms-artgalry":["cil"],"application/vnd.ms-cab-compressed":["cab"],"application/vnd.ms-excel":["xls","xlm","xla","xlc","xlt","xlw"],"application/vnd.ms-excel.addin.macroenabled.12":["xlam"],"application/vnd.ms-excel.sheet.binary.macroenabled.12":["xlsb"],"application/vnd.ms-excel.sheet.macroenabled.12":["xlsm"],"application/vnd.ms-excel.template.macroenabled.12":["xltm"],"application/vnd.ms-fontobject":["eot"],"application/vnd.ms-htmlhelp":["chm"],"application/vnd.ms-ims":["ims"],"application/vnd.ms-lrm":["lrm"],"application/vnd.ms-officetheme":["thmx"],"application/vnd.ms-pki.seccat":["cat"],"application/vnd.ms-pki.stl":["stl"],"application/vnd.ms-powerpoint":["ppt","pps","pot"],"application/vnd.ms-powerpoint.addin.macroenabled.12":["ppam"],"application/vnd.ms-powerpoint.presentation.macroenabled.12":["pptm"],"application/vnd.ms-powerpoint.slide.macroenabled.12":["sldm"],"application/vnd.ms-powerpoint.slideshow.macroenabled.12":["ppsm"],"application/vnd.ms-powerpoint.template.macroenabled.12":["potm"],"application/vnd.ms-project":["mpp","mpt"],"application/vnd.ms-word.document.macroenabled.12":["docm"],"application/vnd.ms-word.template.macroenabled.12":["dotm"],"application/vnd.ms-works":["wps","wks","wcm","wdb"],"application/vnd.ms-wpl":["wpl"],"application/vnd.ms-xpsdocument":["xps"],"application/vnd.mseq":["mseq"],"application/vnd.musician":["mus"],"application/vnd.muvee.style":["msty"],"application/vnd.mynfc":["taglet"],"application/vnd.neurolanguage.nlu":["nlu"],"application/vnd.nitf":["ntf","nitf"],"application/vnd.noblenet-directory":["nnd"],"application/vnd.noblenet-sealer":["nns"],"application/vnd.noblenet-web":["nnw"],"application/vnd.nokia.n-gage.data":["ngdat"],"application/vnd.nokia.radio-preset":["rpst"],"application/vnd.nokia.radio-presets":["rpss"],"application/vnd.novadigm.edm":["edm"],"application/vnd.novadigm.edx":["edx"],"application/vnd.novadigm.ext":["ext"],"application/vnd.oasis.opendocument.chart":["odc"],"application/vnd.oasis.opendocument.chart-template":["otc"],"application/vnd.oasis.opendocument.database":["odb"],"application/vnd.oasis.opendocument.formula":["odf"],"application/vnd.oasis.opendocument.formula-template":["odft"],"application/vnd.oasis.opendocument.graphics":["odg"],"application/vnd.oasis.opendocument.graphics-template":["otg"],"application/vnd.oasis.opendocument.image":["odi"],"application/vnd.oasis.opendocument.image-template":["oti"],"application/vnd.oasis.opendocument.presentation":["odp"],"application/vnd.oasis.opendocument.presentation-template":["otp"],"application/vnd.oasis.opendocument.spreadsheet":["ods"],"application/vnd.oasis.opendocument.spreadsheet-template":["ots"],"application/vnd.oasis.opendocument.text":["odt"],"application/vnd.oasis.opendocument.text-master":["odm"],"application/vnd.oasis.opendocument.text-template":["ott"],"application/vnd.oasis.opendocument.text-web":["oth"],"application/vnd.olpc-sugar":["xo"],"application/vnd.oma.dd2+xml":["dd2"],"application/vnd.openofficeorg.extension":["oxt"],"application/vnd.openxmlformats-officedocument.presentationml.presentation":["pptx"],"application/vnd.openxmlformats-officedocument.presentationml.slide":["sldx"],"application/vnd.openxmlformats-officedocument.presentationml.slideshow":["ppsx"],"application/vnd.openxmlformats-officedocument.presentationml.template":["potx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":["xlsx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.template":["xltx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.document":["docx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.template":["dotx"],"application/vnd.osgeo.mapguide.package":["mgp"],"application/vnd.osgi.dp":["dp"],"application/vnd.osgi.subsystem":["esa"],"application/vnd.palm":["pdb","pqa","oprc"],"application/vnd.pawaafile":["paw"],"application/vnd.pg.format":["str"],"application/vnd.pg.osasli":["ei6"],"application/vnd.picsel":["efif"],"application/vnd.pmi.widget":["wg"],"application/vnd.pocketlearn":["plf"],"application/vnd.powerbuilder6":["pbd"],"application/vnd.previewsystems.box":["box"],"application/vnd.proteus.magazine":["mgz"],"application/vnd.publishare-delta-tree":["qps"],"application/vnd.pvi.ptid1":["ptid"],"application/vnd.quark.quarkxpress":["qxd","qxt","qwd","qwt","qxl","qxb"],"application/vnd.realvnc.bed":["bed"],"application/vnd.recordare.musicxml":["mxl"],"application/vnd.recordare.musicxml+xml":["musicxml"],"application/vnd.rig.cryptonote":["cryptonote"],"application/vnd.rim.cod":["cod"],"application/vnd.rn-realmedia":["rm"],"application/vnd.rn-realmedia-vbr":["rmvb"],"application/vnd.route66.link66+xml":["link66"],"application/vnd.sailingtracker.track":["st"],"application/vnd.seemail":["see"],"application/vnd.sema":["sema"],"application/vnd.semd":["semd"],"application/vnd.semf":["semf"],"application/vnd.shana.informed.formdata":["ifm"],"application/vnd.shana.informed.formtemplate":["itp"],"application/vnd.shana.informed.interchange":["iif"],"application/vnd.shana.informed.package":["ipk"],"application/vnd.simtech-mindmapper":["twd","twds"],"application/vnd.smaf":["mmf"],"application/vnd.smart.teacher":["teacher"],"application/vnd.solent.sdkm+xml":["sdkm","sdkd"],"application/vnd.spotfire.dxp":["dxp"],"application/vnd.spotfire.sfs":["sfs"],"application/vnd.stardivision.calc":["sdc"],"application/vnd.stardivision.draw":["sda"],"application/vnd.stardivision.impress":["sdd"],"application/vnd.stardivision.math":["smf"],"application/vnd.stardivision.writer":["sdw","vor"],"application/vnd.stardivision.writer-global":["sgl"],"application/vnd.stepmania.package":["smzip"],"application/vnd.stepmania.stepchart":["sm"],"application/vnd.sun.xml.calc":["sxc"],"application/vnd.sun.xml.calc.template":["stc"],"application/vnd.sun.xml.draw":["sxd"],"application/vnd.sun.xml.draw.template":["std"],"application/vnd.sun.xml.impress":["sxi"],"application/vnd.sun.xml.impress.template":["sti"],"application/vnd.sun.xml.math":["sxm"],"application/vnd.sun.xml.writer":["sxw"],"application/vnd.sun.xml.writer.global":["sxg"],"application/vnd.sun.xml.writer.template":["stw"],"application/vnd.sus-calendar":["sus","susp"],"application/vnd.svd":["svd"],"application/vnd.symbian.install":["sis","sisx"],"application/vnd.syncml+xml":["xsm"],"application/vnd.syncml.dm+wbxml":["bdm"],"application/vnd.syncml.dm+xml":["xdm"],"application/vnd.tao.intent-module-archive":["tao"],"application/vnd.tcpdump.pcap":["pcap","cap","dmp"],"application/vnd.tmobile-livetv":["tmo"],"application/vnd.trid.tpt":["tpt"],"application/vnd.triscape.mxs":["mxs"],"application/vnd.trueapp":["tra"],"application/vnd.ufdl":["ufd","ufdl"],"application/vnd.uiq.theme":["utz"],"application/vnd.umajin":["umj"],"application/vnd.unity":["unityweb"],"application/vnd.uoml+xml":["uoml"],"application/vnd.vcx":["vcx"],"application/vnd.visio":["vsd","vst","vss","vsw"],"application/vnd.visionary":["vis"],"application/vnd.vsf":["vsf"],"application/vnd.wap.wbxml":["wbxml"],"application/vnd.wap.wmlc":["wmlc"],"application/vnd.wap.wmlscriptc":["wmlsc"],"application/vnd.webturbo":["wtb"],"application/vnd.wolfram.player":["nbp"],"application/vnd.wordperfect":["wpd"],"application/vnd.wqd":["wqd"],"application/vnd.wt.stf":["stf"],"application/vnd.xara":["xar"],"application/vnd.xfdl":["xfdl"],"application/vnd.yamaha.hv-dic":["hvd"],"application/vnd.yamaha.hv-script":["hvs"],"application/vnd.yamaha.hv-voice":["hvp"],"application/vnd.yamaha.openscoreformat":["osf"],"application/vnd.yamaha.openscoreformat.osfpvg+xml":["osfpvg"],"application/vnd.yamaha.smaf-audio":["saf"],"application/vnd.yamaha.smaf-phrase":["spf"],"application/vnd.yellowriver-custom-menu":["cmp"],"application/vnd.zul":["zir","zirz"],"application/vnd.zzazz.deck+xml":["zaz"],"application/voicexml+xml":["vxml"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/x-7z-compressed":["7z"],"application/x-abiword":["abw"],"application/x-ace-compressed":["ace"],"application/x-apple-diskimage":["dmg"],"application/x-authorware-bin":["aab","x32","u32","vox"],"application/x-authorware-map":["aam"],"application/x-authorware-seg":["aas"],"application/x-bcpio":["bcpio"],"application/x-bittorrent":["torrent"],"application/x-blorb":["blb","blorb"],"application/x-bzip":["bz"],"application/x-bzip2":["bz2","boz"],"application/x-cbr":["cbr","cba","cbt","cbz","cb7"],"application/x-cdlink":["vcd"],"application/x-cfs-compressed":["cfs"],"application/x-chat":["chat"],"application/x-chess-pgn":["pgn"],"application/x-chrome-extension":["crx"],"application/x-conference":["nsc"],"application/x-cpio":["cpio"],"application/x-csh":["csh"],"application/x-debian-package":["deb","udeb"],"application/x-dgc-compressed":["dgc"],"application/x-director":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"],"application/x-doom":["wad"],"application/x-dtbncx+xml":["ncx"],"application/x-dtbook+xml":["dtb"],"application/x-dtbresource+xml":["res"],"application/x-dvi":["dvi"],"application/x-envoy":["evy"],"application/x-eva":["eva"],"application/x-font-bdf":["bdf"],"application/x-font-ghostscript":["gsf"],"application/x-font-linux-psf":["psf"],"application/x-font-otf":["otf"],"application/x-font-pcf":["pcf"],"application/x-font-snf":["snf"],"application/x-font-ttf":["ttf","ttc"],"application/x-font-type1":["pfa","pfb","pfm","afm"],"application/x-freearc":["arc"],"application/x-futuresplash":["spl"],"application/x-gca-compressed":["gca"],"application/x-glulx":["ulx"],"application/x-gnumeric":["gnumeric"],"application/x-gramps-xml":["gramps"],"application/x-gtar":["gtar"],"application/x-hdf":["hdf"],"application/x-install-instructions":["install"],"application/x-iso9660-image":["iso"],"application/x-java-jnlp-file":["jnlp"],"application/x-latex":["latex"],"application/x-lua-bytecode":["luac"],"application/x-lzh-compressed":["lzh","lha"],"application/x-mie":["mie"],"application/x-mobipocket-ebook":["prc","mobi"],"application/x-ms-application":["application"],"application/x-ms-shortcut":["lnk"],"application/x-ms-wmd":["wmd"],"application/x-ms-wmz":["wmz"],"application/x-ms-xbap":["xbap"],"application/x-msaccess":["mdb"],"application/x-msbinder":["obd"],"application/x-mscardfile":["crd"],"application/x-msclip":["clp"],"application/x-msdownload":["exe","dll","com","bat","msi"],"application/x-msmediaview":["mvb","m13","m14"],"application/x-msmetafile":["wmf","wmz","emf","emz"],"application/x-msmoney":["mny"],"application/x-mspublisher":["pub"],"application/x-msschedule":["scd"],"application/x-msterminal":["trm"],"application/x-mswrite":["wri"],"application/x-netcdf":["nc","cdf"],"application/x-nzb":["nzb"],"application/x-pkcs12":["p12","pfx"],"application/x-pkcs7-certificates":["p7b","spc"],"application/x-pkcs7-certreqresp":["p7r"],"application/x-rar-compressed":["rar"],"application/x-research-info-systems":["ris"],"application/x-sh":["sh"],"application/x-shar":["shar"],"application/x-shockwave-flash":["swf"],"application/x-silverlight-app":["xap"],"application/x-sql":["sql"],"application/x-stuffit":["sit"],"application/x-stuffitx":["sitx"],"application/x-subrip":["srt"],"application/x-sv4cpio":["sv4cpio"],"application/x-sv4crc":["sv4crc"],"application/x-t3vm-image":["t3"],"application/x-tads":["gam"],"application/x-tar":["tar"],"application/x-tcl":["tcl"],"application/x-tex":["tex"],"application/x-tex-tfm":["tfm"],"application/x-texinfo":["texinfo","texi"],"application/x-tgif":["obj"],"application/x-ustar":["ustar"],"application/x-wais-source":["src"],"application/x-web-app-manifest+json":["webapp"],"application/x-x509-ca-cert":["der","crt"],"application/x-xfig":["fig"],"application/x-xliff+xml":["xlf"],"application/x-xpinstall":["xpi"],"application/x-xz":["xz"],"application/x-zmachine":["z1","z2","z3","z4","z5","z6","z7","z8"],"application/xaml+xml":["xaml"],"application/xcap-diff+xml":["xdf"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xml":["xml","xsl","xsd"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mp4":["mp4a","m4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/vnd.dece.audio":["uva","uvva"],"audio/vnd.digital-winds":["eol"],"audio/vnd.dra":["dra"],"audio/vnd.dts":["dts"],"audio/vnd.dts.hd":["dtshd"],"audio/vnd.lucent.voice":["lvp"],"audio/vnd.ms-playready.media.pya":["pya"],"audio/vnd.nuera.ecelp4800":["ecelp4800"],"audio/vnd.nuera.ecelp7470":["ecelp7470"],"audio/vnd.nuera.ecelp9600":["ecelp9600"],"audio/vnd.rip":["rip"],"audio/webm":["weba"],"audio/x-aac":["aac"],"audio/x-aiff":["aif","aiff","aifc"],"audio/x-caf":["caf"],"audio/x-flac":["flac"],"audio/x-matroska":["mka"],"audio/x-mpegurl":["m3u"],"audio/x-ms-wax":["wax"],"audio/x-ms-wma":["wma"],"audio/x-pn-realaudio":["ram","ra"],"audio/x-pn-realaudio-plugin":["rmp"],"audio/x-wav":["wav"],"audio/xm":["xm"],"chemical/x-cdx":["cdx"],"chemical/x-cif":["cif"],"chemical/x-cmdf":["cmdf"],"chemical/x-cml":["cml"],"chemical/x-csml":["csml"],"chemical/x-xyz":["xyz"],"font/opentype":["otf"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/g3fax":["g3"],"image/gif":["gif"],"image/ief":["ief"],"image/jpeg":["jpeg","jpg","jpe"],"image/ktx":["ktx"],"image/png":["png"],"image/prs.btif":["btif"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/tiff":["tiff","tif"],"image/vnd.adobe.photoshop":["psd"],"image/vnd.dece.graphic":["uvi","uvvi","uvg","uvvg"],"image/vnd.djvu":["djvu","djv"],"image/vnd.dvb.subtitle":["sub"],"image/vnd.dwg":["dwg"],"image/vnd.dxf":["dxf"],"image/vnd.fastbidsheet":["fbs"],"image/vnd.fpx":["fpx"],"image/vnd.fst":["fst"],"image/vnd.fujixerox.edmics-mmr":["mmr"],"image/vnd.fujixerox.edmics-rlc":["rlc"],"image/vnd.ms-modi":["mdi"],"image/vnd.ms-photo":["wdp"],"image/vnd.net-fpx":["npx"],"image/vnd.wap.wbmp":["wbmp"],"image/vnd.xiff":["xif"],"image/webp":["webp"],"image/x-3ds":["3ds"],"image/x-cmu-raster":["ras"],"image/x-cmx":["cmx"],"image/x-freehand":["fh","fhc","fh4","fh5","fh7"],"image/x-icon":["ico"],"image/x-mrsid-image":["sid"],"image/x-pcx":["pcx"],"image/x-pict":["pic","pct"],"image/x-portable-anymap":["pnm"],"image/x-portable-bitmap":["pbm"],"image/x-portable-graymap":["pgm"],"image/x-portable-pixmap":["ppm"],"image/x-rgb":["rgb"],"image/x-tga":["tga"],"image/x-xbitmap":["xbm"],"image/x-xpixmap":["xpm"],"image/x-xwindowdump":["xwd"],"message/rfc822":["eml","mime"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/vnd.collada+xml":["dae"],"model/vnd.dwf":["dwf"],"model/vnd.gdl":["gdl"],"model/vnd.gtw":["gtw"],"model/vnd.mts":["mts"],"model/vnd.vtu":["vtu"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["x3db","x3dbz"],"model/x3d+vrml":["x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee"],"text/css":["css"],"text/csv":["csv"],"text/hjson":["hjson"],"text/html":["html","htm"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/prs.lines.tag":["dsc"],"text/richtext":["rtx"],"text/sgml":["sgml","sgm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vnd.curl":["curl"],"text/vnd.curl.dcurl":["dcurl"],"text/vnd.curl.mcurl":["mcurl"],"text/vnd.curl.scurl":["scurl"],"text/vnd.dvb.subtitle":["sub"],"text/vnd.fly":["fly"],"text/vnd.fmi.flexstor":["flx"],"text/vnd.graphviz":["gv"],"text/vnd.in3d.3dml":["3dml"],"text/vnd.in3d.spot":["spot"],"text/vnd.sun.j2me.app-descriptor":["jad"],"text/vnd.wap.wml":["wml"],"text/vnd.wap.wmlscript":["wmls"],"text/vtt":["vtt"],"text/x-asm":["s","asm"],"text/x-c":["c","cc","cxx","cpp","h","hh","dic"],"text/x-component":["htc"],"text/x-fortran":["f","for","f77","f90"],"text/x-handlebars-template":["hbs"],"text/x-java-source":["java"],"text/x-lua":["lua"],"text/x-markdown":["markdown","md","mkd"],"text/x-nfo":["nfo"],"text/x-opml":["opml"],"text/x-pascal":["p","pas"],"text/x-sass":["sass"],"text/x-scss":["scss"],"text/x-setext":["etx"],"text/x-sfv":["sfv"],"text/x-uuencode":["uu"],"text/x-vcalendar":["vcs"],"text/x-vcard":["vcf"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/vnd.dece.hd":["uvh","uvvh"],"video/vnd.dece.mobile":["uvm","uvvm"],"video/vnd.dece.pd":["uvp","uvvp"],"video/vnd.dece.sd":["uvs","uvvs"],"video/vnd.dece.video":["uvv","uvvv"],"video/vnd.dvb.file":["dvb"],"video/vnd.fvt":["fvt"],"video/vnd.mpegurl":["mxu","m4u"],"video/vnd.ms-playready.media.pyv":["pyv"],"video/vnd.uvvu.mp4":["uvu","uvvu"],"video/vnd.vivo":["viv"],"video/webm":["webm"],"video/x-f4v":["f4v"],"video/x-fli":["fli"],"video/x-flv":["flv"],"video/x-m4v":["m4v"],"video/x-matroska":["mkv","mk3d","mks"],"video/x-mng":["mng"],"video/x-ms-asf":["asf","asx"],"video/x-ms-vob":["vob"],"video/x-ms-wm":["wm"],"video/x-ms-wmv":["wmv"],"video/x-ms-wmx":["wmx"],"video/x-ms-wvx":["wvx"],"video/x-msvideo":["avi"],"video/x-sgi-movie":["movie"],"video/x-smv":["smv"],"x-conference/x-cooltalk":["ice"]}

},{}],41:[function(require,module,exports){
function parse(e){if(e=""+e,!(e.length>1e4)){var a=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(a){var r=parseFloat(a[1]),c=(a[2]||"ms").toLowerCase();switch(c){case"years":case"year":case"yrs":case"yr":case"y":return r*y;case"days":case"day":case"d":return r*d;case"hours":case"hour":case"hrs":case"hr":case"h":return r*h;case"minutes":case"minute":case"mins":case"min":case"m":return r*m;case"seconds":case"second":case"secs":case"sec":case"s":return r*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r}}}}function short(e){return e>=d?Math.round(e/d)+"d":e>=h?Math.round(e/h)+"h":e>=m?Math.round(e/m)+"m":e>=s?Math.round(e/s)+"s":e+"ms"}function long(e){return plural(e,d,"day")||plural(e,h,"hour")||plural(e,m,"minute")||plural(e,s,"second")||e+" ms"}function plural(s,e,a){return e>s?void 0:1.5*e>s?Math.floor(s/e)+" "+a:Math.ceil(s/e)+" "+a+"s"}var s=1e3,m=60*s,h=60*m,d=24*h,y=365.25*d;module.exports=function(s,e){return e=e||{},"string"==typeof s?parse(s):e["long"]?long(s):short(s)};

},{}],42:[function(require,module,exports){
function Negotiator(e){return this instanceof Negotiator?void(this.request=e):new Negotiator(e)}var preferredCharsets=require("./lib/charset"),preferredEncodings=require("./lib/encoding"),preferredLanguages=require("./lib/language"),preferredMediaTypes=require("./lib/mediaType");module.exports=Negotiator,Negotiator.Negotiator=Negotiator,Negotiator.prototype.charset=function(e){var t=this.charsets(e);return t&&t[0]},Negotiator.prototype.charsets=function(e){return preferredCharsets(this.request.headers["accept-charset"],e)},Negotiator.prototype.encoding=function(e){var t=this.encodings(e);return t&&t[0]},Negotiator.prototype.encodings=function(e){return preferredEncodings(this.request.headers["accept-encoding"],e)},Negotiator.prototype.language=function(e){var t=this.languages(e);return t&&t[0]},Negotiator.prototype.languages=function(e){return preferredLanguages(this.request.headers["accept-language"],e)},Negotiator.prototype.mediaType=function(e){var t=this.mediaTypes(e);return t&&t[0]},Negotiator.prototype.mediaTypes=function(e){return preferredMediaTypes(this.request.headers.accept,e)},Negotiator.prototype.preferredCharset=Negotiator.prototype.charset,Negotiator.prototype.preferredCharsets=Negotiator.prototype.charsets,Negotiator.prototype.preferredEncoding=Negotiator.prototype.encoding,Negotiator.prototype.preferredEncodings=Negotiator.prototype.encodings,Negotiator.prototype.preferredLanguage=Negotiator.prototype.language,Negotiator.prototype.preferredLanguages=Negotiator.prototype.languages,Negotiator.prototype.preferredMediaType=Negotiator.prototype.mediaType,Negotiator.prototype.preferredMediaTypes=Negotiator.prototype.mediaTypes;

},{"./lib/charset":43,"./lib/encoding":44,"./lib/language":45,"./lib/mediaType":46}],43:[function(require,module,exports){
function parseAcceptCharset(r){for(var e=r.split(","),t=0,s=0;t<e.length;t++){var a=parseCharset(e[t].trim(),t);a&&(e[s++]=a)}return e.length=s,e}function parseCharset(r,e){var t=r.match(/^\s*(\S+?)\s*(?:;(.*))?$/);if(!t)return null;var s=t[1],a=1;if(t[2])for(var i=t[2].split(";"),e=0;e<i.length;e++){var n=i[e].trim().split("=");if("q"===n[0]){a=parseFloat(n[1]);break}}return{charset:s,q:a,i:e}}function getCharsetPriority(r,e,t){for(var s={o:-1,q:0,s:0},a=0;a<e.length;a++){var i=specify(r,e[a],t);i&&(s.s-i.s||s.q-i.q||s.o-i.o)<0&&(s=i)}return s}function specify(r,e,t){var s=0;if(e.charset.toLowerCase()===r.toLowerCase())s|=1;else if("*"!==e.charset)return null;return{i:t,o:e.i,q:e.q,s:s}}function preferredCharsets(r,e){var t=parseAcceptCharset(void 0===r?"*":r||"");if(!e)return t.filter(isQuality).sort(compareSpecs).map(function(r){return r.charset});var s=e.map(function(r,e){return getCharsetPriority(r,t,e)});return s.filter(isQuality).sort(compareSpecs).map(function(r){return e[s.indexOf(r)]})}function compareSpecs(r,e){return e.q-r.q||e.s-r.s||r.o-e.o||r.i-e.i||0}function isQuality(r){return r.q>0}module.exports=preferredCharsets,preferredCharsets.preferredCharsets=preferredCharsets;

},{}],44:[function(require,module,exports){
function parseAcceptEncoding(r){for(var n=r.split(","),e=!1,i=1,t=0,o=0;t<n.length;t++){var c=parseEncoding(n[t].trim(),t);c&&(n[o++]=c,e=e||specify("identity",c),i=Math.min(i,c.q||1))}return e||(n[o++]={encoding:"identity",q:i,i:t}),n.length=o,n}function parseEncoding(r,n){var e=r.match(/^\s*(\S+?)\s*(?:;(.*))?$/);if(!e)return null;var i=e[1],t=1;if(e[2])for(var o=e[2].split(";"),n=0;n<o.length;n++){var c=o[n].trim().split("=");if("q"===c[0]){t=parseFloat(c[1]);break}}return{encoding:i,q:t,i:n}}function getEncodingPriority(r,n,e){for(var i={o:-1,q:0,s:0},t=0;t<n.length;t++){var o=specify(r,n[t],e);o&&(i.s-o.s||i.q-o.q||i.o-o.o)<0&&(i=o)}return i}function specify(r,n,e){var i=0;if(n.encoding.toLowerCase()===r.toLowerCase())i|=1;else if("*"!==n.encoding)return null;return{i:e,o:n.i,q:n.q,s:i}}function preferredEncodings(r,n){var e=parseAcceptEncoding(r||"");if(!n)return e.filter(isQuality).sort(compareSpecs).map(function(r){return r.encoding});var i=n.map(function(r,n){return getEncodingPriority(r,e,n)});return i.filter(isQuality).sort(compareSpecs).map(function(r){return n[i.indexOf(r)]})}function compareSpecs(r,n){return n.q-r.q||n.s-r.s||r.o-n.o||r.i-n.i||0}function isQuality(r){return r.q>0}module.exports=preferredEncodings,preferredEncodings.preferredEncodings=preferredEncodings;

},{}],45:[function(require,module,exports){
function parseAcceptLanguage(e){for(var r=e.split(","),a=0,n=0;a<r.length;a++){var t=parseLanguage(r[a].trim(),a);t&&(r[n++]=t)}return r.length=n,r}function parseLanguage(e,r){var a=e.match(/^\s*(\S+?)(?:-(\S+?))?\s*(?:;(.*))?$/);if(!a)return null;var n=a[1],t=a[2],u=n;t&&(u+="-"+t);var i=1;if(a[3])for(var f=a[3].split(";"),r=0;r<f.length;r++){var s=f[r].split("=");"q"===s[0]&&(i=parseFloat(s[1]))}return{prefix:n,suffix:t,q:i,i:r,full:u}}function getLanguagePriority(e,r,a){for(var n={o:-1,q:0,s:0},t=0;t<r.length;t++){var u=specify(e,r[t],a);u&&(n.s-u.s||n.q-u.q||n.o-u.o)<0&&(n=u)}return n}function specify(e,r,a){var n=parseLanguage(e);if(!n)return null;var t=0;if(r.full.toLowerCase()===n.full.toLowerCase())t|=4;else if(r.prefix.toLowerCase()===n.full.toLowerCase())t|=2;else if(r.full.toLowerCase()===n.prefix.toLowerCase())t|=1;else if("*"!==r.full)return null;return{i:a,o:r.i,q:r.q,s:t}}function preferredLanguages(e,r){var a=parseAcceptLanguage(void 0===e?"*":e||"");if(!r)return a.filter(isQuality).sort(compareSpecs).map(function(e){return e.full});var n=r.map(function(e,r){return getLanguagePriority(e,a,r)});return n.filter(isQuality).sort(compareSpecs).map(function(e){return r[n.indexOf(e)]})}function compareSpecs(e,r){return r.q-e.q||r.s-e.s||e.o-r.o||e.i-r.i||0}function isQuality(e){return e.q>0}module.exports=preferredLanguages,preferredLanguages.preferredLanguages=preferredLanguages;

},{}],46:[function(require,module,exports){
function parseAccept(e){for(var r=splitMediaTypes(e),t=0,n=0;t<r.length;t++){var i=parseMediaType(r[t].trim(),t);i&&(r[n++]=i)}return r.length=n,r}function parseMediaType(e,r){var t=e.match(/\s*(\S+?)\/([^;\s]+)\s*(?:;(.*))?/);if(!t)return null;var n=t[1],i=t[2],a=""+n+"/"+i,s={},u=1;return t[3]&&(s=t[3].split(";").map(function(e){return e.trim().split("=")}).reduce(function(e,r){var t=r[0].toLowerCase(),n=r[1];return e[t]=n&&'"'===n[0]&&'"'===n[n.length-1]?n.substr(1,n.length-2):n,e},s),null!=s.q&&(u=parseFloat(s.q),delete s.q)),{type:n,subtype:i,params:s,q:u,i:r,full:a}}function getMediaTypePriority(e,r,t){for(var n={o:-1,q:0,s:0},i=0;i<r.length;i++){var a=specify(e,r[i],t);a&&(n.s-a.s||n.q-a.q||n.o-a.o)<0&&(n=a)}return n}function specify(e,r,t){var n=parseMediaType(e),i=0;if(!n)return null;if(r.type.toLowerCase()==n.type.toLowerCase())i|=4;else if("*"!=r.type)return null;if(r.subtype.toLowerCase()==n.subtype.toLowerCase())i|=2;else if("*"!=r.subtype)return null;var a=Object.keys(r.params);if(a.length>0){if(!a.every(function(e){return"*"==r.params[e]||(r.params[e]||"").toLowerCase()==(n.params[e]||"").toLowerCase()}))return null;i|=1}return{i:t,o:r.i,q:r.q,s:i}}function preferredMediaTypes(e,r){var t=parseAccept(void 0===e?"*/*":e||"");if(!r)return t.filter(isQuality).sort(compareSpecs).map(function(e){return e.full});var n=r.map(function(e,r){return getMediaTypePriority(e,t,r)});return n.filter(isQuality).sort(compareSpecs).map(function(e){return r[n.indexOf(e)]})}function compareSpecs(e,r){return r.q-e.q||r.s-e.s||e.o-r.o||e.i-r.i||0}function isQuality(e){return e.q>0}function quoteCount(e){for(var r=0,t=0;-1!==(t=e.indexOf('"',t));)r++,t++;return r}function splitMediaTypes(e){for(var r=e.split(","),t=1,n=0;t<r.length;t++)quoteCount(r[n])%2==0?r[++n]=r[t]:r[n]+=","+r[t];return r.length=n+1,r}module.exports=preferredMediaTypes,preferredMediaTypes.preferredMediaTypes=preferredMediaTypes;

},{}],47:[function(require,module,exports){
(function (process){
"use strict";function onFinished(e,n){return isFinished(e)!==!1?(defer(n,null,e),e):(attachListener(e,n),e)}function isFinished(e){var n=e.socket;return"boolean"==typeof e.finished?Boolean(e.finished||n&&!n.writable):"boolean"==typeof e.complete?Boolean(e.upgrade||!n||!n.readable||e.complete&&!e.readable):void 0}function attachFinishedListener(e,n){function i(e){o.cancel(),s.cancel(),r=!0,n(e)}function t(n){e.removeListener("socket",t),r||o===s&&(s=first([[n,"error","close"]],i))}var o,s,r=!1;return o=s=first([[e,"end","finish"]],i),e.socket?void t(e.socket):(e.on("socket",t),void(void 0===e.socket&&patchAssignSocket(e,t)))}function attachListener(e,n){var i=e.__onFinished;i&&i.queue||(i=e.__onFinished=createListener(e),attachFinishedListener(e,i)),i.queue.push(n)}function createListener(e){function n(i){if(e.__onFinished===n&&(e.__onFinished=null),n.queue){var t=n.queue;n.queue=null;for(var o=0;o<t.length;o++)t[o](i,e)}}return n.queue=[],n}function patchAssignSocket(e,n){var i=e.assignSocket;"function"==typeof i&&(e.assignSocket=function(e){i.call(this,e),n(e)})}module.exports=onFinished,module.exports.isFinished=isFinished;var first=require("ee-first"),defer="function"==typeof setImmediate?setImmediate:function(e){process.nextTick(e.bind.apply(e,arguments))};

}).call(this,require('_process'))
},{"_process":244,"ee-first":10}],48:[function(require,module,exports){
"use strict";function parseurl(r){var e=r.url;if(void 0!==e){var a=r._parsedUrl;return fresh(e,a)?a:(a=fastparse(e),a._raw=e,r._parsedUrl=a)}}function originalurl(r){var e=r.originalUrl;if("string"!=typeof e)return parseurl(r);var a=r._parsedOriginalUrl;return fresh(e,a)?a:(a=fastparse(e),a._raw=e,r._parsedOriginalUrl=a)}function fastparse(r){var e="string"==typeof r&&simplePathRegExp.exec(r);if(e){var a=e[1],l=e[2]||null,s=void 0!==Url?new Url:{};return s.path=r,s.href=r,s.pathname=a,s.search=l,s.query=l&&l.substr(1),s}return parse(r)}function fresh(r,e){return"object"==typeof e&&null!==e&&(void 0===Url||e instanceof Url)&&e._raw===r}var url=require("url"),parse=url.parse,Url=url.Url,simplePathRegExp=/^(\/\/?(?!\/)[^\?#\s]*)(\?[^#\s]*)?$/;module.exports=parseurl,module.exports.original=originalurl;

},{"url":292}],49:[function(require,module,exports){
function pathtoRegexp(e,n,t){t=t||{},n=n||[];var r,o=t.strict,a=t.end!==!1,f=t.sensitive?"":"i",i=0,p=n.length,g=0,s=0;if(e instanceof RegExp){for(;r=MATCHING_GROUP_REGEXP.exec(e.source);)n.push({name:s++,optional:!1,offset:r.index});return e}if(Array.isArray(e))return e=e.map(function(e){return pathtoRegexp(e,n,t).source}),new RegExp("(?:"+e.join("|")+")",f);for(e=("^"+e+(o?"":"/"===e[e.length-1]?"?":"/?")).replace(/\/\(/g,"/(?:").replace(/([\/\.])/g,"\\$1").replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g,function(e,t,r,o,a,f,p,g){t=t||"",r=r||"",a=a||"([^\\/"+r+"]+?)",p=p||"",n.push({name:o,optional:!!p,offset:g+i});var s=""+(p?"":t)+"(?:"+r+(p?t:"")+a+(f?"((?:[\\/"+r+"].+?)?)":"")+")"+p;return i+=s.length-e.length,s}).replace(/\*/g,function(e,t){for(var r=n.length;r-- >p&&n[r].offset>t;)n[r].offset+=3;return"(.*)"});r=MATCHING_GROUP_REGEXP.exec(e);){for(var c=0,l=r.index;"\\"===e.charAt(--l);)c++;c%2!==1&&((p+g===n.length||n[p+g].offset>r.index)&&n.splice(p+g,0,{name:s++,optional:!1,offset:r.index}),g++)}return e+=a?"$":"/"===e[e.length-1]?"":"(?=\\/|$)",new RegExp(e,f)}module.exports=pathtoRegexp;var MATCHING_GROUP_REGEXP=/\((?!\?)/g;

},{}],50:[function(require,module,exports){
"use strict";function alladdrs(r,e){var i=forwarded(r);if(!e)return i;"function"!=typeof e&&(e=compile(e));for(var t=0;t<i.length-1;t++)e(i[t],t)||(i.length=t+1);return i}function compile(r){if(!r)throw new TypeError("argument is required");var e="string"==typeof r?[r]:r;if(!Array.isArray(e))throw new TypeError("unsupported trust argument");for(var i=0;i<e.length;i++)r=e[i],ipranges.hasOwnProperty(r)&&(r=ipranges[r],e.splice.apply(e,[i,1].concat(r)),i+=r.length-1);return compileTrust(compileRangeSubnets(e))}function compileRangeSubnets(r){for(var e=new Array(r.length),i=0;i<r.length;i++)e[i]=parseipNotation(r[i]);return e}function compileTrust(r){var e=r.length;return 0===e?trustNone:1===e?trustSingle(r[0]):trustMulti(r)}function parseipNotation(r){var e,i,t,n,a=r.lastIndexOf("/");if(e=-1!==a?r.substring(0,a):r,!isip(e))throw new TypeError("invalid IP address: "+e);if(e=parseip(e),i=e.kind(),t="ipv6"===i?128:32,n=-1!==a?r.substring(a+1,r.length):t,"number"!=typeof n&&(n=digitre.test(n)?parseInt(n,10):isip(n)?parseNetmask(n):0),"ipv6"===e.kind()&&e.isIPv4MappedAddress()&&(e=e.toIPv4Address(),n=t>=n?n-96:n),0>=n||n>t)throw new TypeError("invalid range on address: "+r);return[e,n]}function parseNetmask(r){var e,i,t=parseip(r);switch(t.kind()){case"ipv4":e=t.octets,i=8;break;case"ipv6":e=t.parts,i=16}for(var n,a=Math.pow(2,i)-1,s=0,p=0;p<e.length;p++){n=e[p]&a;{if(n!==a){for(;n;)n=n<<1&a,s+=1;break}s+=i}}return s}function proxyaddr(r,e){if(!r)throw new TypeError("req argument is required");if(!e)throw new TypeError("trust argument is required");var i=alladdrs(r,e),t=i[i.length-1];return t}function trustNone(){return!1}function trustMulti(r){return function(e){if(!isip(e))return!1;for(var i,t,n,a,s,p,o=parseip(e),u=o.kind(),d=0;d<r.length;d++){if(t=r[d],n=t[0],a=n.kind(),s=t[1],p=o,u!==a){if("ipv6"!==u||"ipv4"!==a||!o.isIPv4MappedAddress())continue;i=i||o.toIPv4Address(),p=i}if(p.match(n,s))return!0}return!1}}function trustSingle(r){var e=r[0],i=e.kind(),t="ipv4"===i,n=r[1];return function(r){if(!isip(r))return!1;var a=parseip(r),s=a.kind();return s===i?a.match(e,n):t&&"ipv6"===s&&a.isIPv4MappedAddress()?a.toIPv4Address().match(e,n):!1}}module.exports=proxyaddr,module.exports.all=alladdrs,module.exports.compile=compile;var forwarded=require("forwarded"),ipaddr=require("ipaddr.js"),digitre=/^[0-9]+$/,isip=ipaddr.isValid,parseip=ipaddr.parse,ipranges={linklocal:["169.254.0.0/16","fe80::/10"],loopback:["127.0.0.1/8","::1/128"],uniquelocal:["10.0.0.0/8","172.16.0.0/12","192.168.0.0/16","fc00::/7"]};

},{"forwarded":28,"ipaddr.js":32}],51:[function(require,module,exports){
var Stringify=require("./stringify"),Parse=require("./parse"),internals={};module.exports={stringify:Stringify,parse:Parse};

},{"./parse":52,"./stringify":53}],52:[function(require,module,exports){
var Utils=require("./utils"),internals={delimiter:"&",depth:5,arrayLimit:20,parameterLimit:1e3,strictNullHandling:!1,plainObjects:!1,allowPrototypes:!1};internals.parseValues=function(e,t){for(var r={},i=e.split(t.delimiter,t.parameterLimit===1/0?void 0:t.parameterLimit),l=0,a=i.length;a>l;++l){var n=i[l],s=-1===n.indexOf("]=")?n.indexOf("="):n.indexOf("]=")+1;if(-1===s)r[Utils.decode(n)]="",t.strictNullHandling&&(r[Utils.decode(n)]=null);else{var p=Utils.decode(n.slice(0,s)),o=Utils.decode(n.slice(s+1));Object.prototype.hasOwnProperty.call(r,p)?r[p]=[].concat(r[p]).concat(o):r[p]=o}}return r},internals.parseObject=function(e,t,r){if(!e.length)return t;var i,l=e.shift();if("[]"===l)i=[],i=i.concat(internals.parseObject(e,t,r));else{i=r.plainObjects?Object.create(null):{};var a="["===l[0]&&"]"===l[l.length-1]?l.slice(1,l.length-1):l,n=parseInt(a,10),s=""+n;!isNaN(n)&&l!==a&&s===a&&n>=0&&r.parseArrays&&n<=r.arrayLimit?(i=[],i[n]=internals.parseObject(e,t,r)):i[a]=internals.parseObject(e,t,r)}return i},internals.parseKeys=function(e,t,r){if(e){r.allowDots&&(e=e.replace(/\.([^\.\[]+)/g,"[$1]"));var i=/^([^\[\]]*)/,l=/(\[[^\[\]]*\])/g,a=i.exec(e),n=[];if(a[1]){if(!r.plainObjects&&Object.prototype.hasOwnProperty(a[1])&&!r.allowPrototypes)return;n.push(a[1])}for(var s=0;null!==(a=l.exec(e))&&s<r.depth;)++s,(r.plainObjects||!Object.prototype.hasOwnProperty(a[1].replace(/\[|\]/g,""))||r.allowPrototypes)&&n.push(a[1]);return a&&n.push("["+e.slice(a.index)+"]"),internals.parseObject(n,t,r)}},module.exports=function(e,t){if(t=t||{},t.delimiter="string"==typeof t.delimiter||Utils.isRegExp(t.delimiter)?t.delimiter:internals.delimiter,t.depth="number"==typeof t.depth?t.depth:internals.depth,t.arrayLimit="number"==typeof t.arrayLimit?t.arrayLimit:internals.arrayLimit,t.parseArrays=t.parseArrays!==!1,t.allowDots=t.allowDots!==!1,t.plainObjects="boolean"==typeof t.plainObjects?t.plainObjects:internals.plainObjects,t.allowPrototypes="boolean"==typeof t.allowPrototypes?t.allowPrototypes:internals.allowPrototypes,t.parameterLimit="number"==typeof t.parameterLimit?t.parameterLimit:internals.parameterLimit,t.strictNullHandling="boolean"==typeof t.strictNullHandling?t.strictNullHandling:internals.strictNullHandling,""===e||null===e||"undefined"==typeof e)return t.plainObjects?Object.create(null):{};for(var r="string"==typeof e?internals.parseValues(e,t):e,i=t.plainObjects?Object.create(null):{},l=Object.keys(r),a=0,n=l.length;n>a;++a){var s=l[a],p=internals.parseKeys(s,r[s],t);i=Utils.merge(i,p,t)}return Utils.compact(i)};

},{"./utils":54}],53:[function(require,module,exports){
var Utils=require("./utils"),internals={delimiter:"&",arrayPrefixGenerators:{brackets:function(r,e){return r+"[]"},indices:function(r,e){return r+"["+e+"]"},repeat:function(r,e){return r}},strictNullHandling:!1};internals.stringify=function(r,e,n,i,t){if("function"==typeof t)r=t(e,r);else if(Utils.isBuffer(r))r=r.toString();else if(r instanceof Date)r=r.toISOString();else if(null===r){if(i)return Utils.encode(e);r=""}if("string"==typeof r||"number"==typeof r||"boolean"==typeof r)return[Utils.encode(e)+"="+Utils.encode(r)];var a=[];if("undefined"==typeof r)return a;for(var l=Array.isArray(t)?t:Object.keys(r),s=0,f=l.length;f>s;++s){var o=l[s];a=Array.isArray(r)?a.concat(internals.stringify(r[o],n(e,o),n,i,t)):a.concat(internals.stringify(r[o],e+"["+o+"]",n,i,t))}return a},module.exports=function(r,e){e=e||{};var n,i,t="undefined"==typeof e.delimiter?internals.delimiter:e.delimiter,a="boolean"==typeof e.strictNullHandling?e.strictNullHandling:internals.strictNullHandling;"function"==typeof e.filter?(i=e.filter,r=i("",r)):Array.isArray(e.filter)&&(n=i=e.filter);var l=[];if("object"!=typeof r||null===r)return"";var s;s=e.arrayFormat in internals.arrayPrefixGenerators?e.arrayFormat:"indices"in e?e.indices?"indices":"repeat":"indices";var f=internals.arrayPrefixGenerators[s];n||(n=Object.keys(r));for(var o=0,c=n.length;c>o;++o){var u=n[o];l=l.concat(internals.stringify(r[u],u,f,a,i))}return l.join(t)};

},{"./utils":54}],54:[function(require,module,exports){
var internals={};internals.hexTable=new Array(256);for(var h=0;256>h;++h)internals.hexTable[h]="%"+((16>h?"0":"")+h.toString(16)).toUpperCase();exports.arrayToObject=function(e,r){for(var t=r.plainObjects?Object.create(null):{},n=0,a=e.length;a>n;++n)"undefined"!=typeof e[n]&&(t[n]=e[n]);return t},exports.merge=function(e,r,t){if(!r)return e;if("object"!=typeof r)return Array.isArray(e)?e.push(r):"object"==typeof e?e[r]=!0:e=[e,r],e;if("object"!=typeof e)return e=[e].concat(r);Array.isArray(e)&&!Array.isArray(r)&&(e=exports.arrayToObject(e,t));for(var n=Object.keys(r),a=0,o=n.length;o>a;++a){var c=n[a],i=r[c];Object.prototype.hasOwnProperty.call(e,c)?e[c]=exports.merge(e[c],i,t):e[c]=i}return e},exports.decode=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(r){return e}},exports.encode=function(e){if(0===e.length)return e;"string"!=typeof e&&(e=""+e);for(var r="",t=0,n=e.length;n>t;++t){var a=e.charCodeAt(t);45===a||46===a||95===a||126===a||a>=48&&57>=a||a>=65&&90>=a||a>=97&&122>=a?r+=e[t]:128>a?r+=internals.hexTable[a]:2048>a?r+=internals.hexTable[192|a>>6]+internals.hexTable[128|63&a]:55296>a||a>=57344?r+=internals.hexTable[224|a>>12]+internals.hexTable[128|a>>6&63]+internals.hexTable[128|63&a]:(++t,a=65536+((1023&a)<<10|1023&e.charCodeAt(t)),r+=internals.hexTable[240|a>>18]+internals.hexTable[128|a>>12&63]+internals.hexTable[128|a>>6&63]+internals.hexTable[128|63&a])}return r},exports.compact=function(e,r){if("object"!=typeof e||null===e)return e;r=r||[];var t=r.indexOf(e);if(-1!==t)return r[t];if(r.push(e),Array.isArray(e)){for(var n=[],a=0,o=e.length;o>a;++a)"undefined"!=typeof e[a]&&n.push(e[a]);return n}var c=Object.keys(e);for(a=0,o=c.length;o>a;++a){var i=c[a];e[i]=exports.compact(e[i],r)}return e},exports.isRegExp=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},exports.isBuffer=function(e){return null===e||"undefined"==typeof e?!1:!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))};

},{}],55:[function(require,module,exports){
"use strict";function rangeParser(r,e){var s=!0,a=e.indexOf("=");if(-1==a)return-2;var t=e.slice(a+1).split(",").map(function(e){var e=e.split("-"),a=parseInt(e[0],10),t=parseInt(e[1],10);return isNaN(a)?(a=r-t,t=r-1):isNaN(t)&&(t=r-1),t>r-1&&(t=r-1),(isNaN(a)||isNaN(t)||a>t||0>a)&&(s=!1),{start:a,end:t}});return t.type=e.slice(0,a),s?t:-1}module.exports=rangeParser;

},{}],56:[function(require,module,exports){
(function (Buffer){
"use strict";function send(e,t,r){return new SendStream(e,t,r)}function SendStream(e,t,r){var i=r||{};if(this.options=i,this.path=t,this.req=e,this._etag=void 0!==i.etag?Boolean(i.etag):!0,this._dotfiles=void 0!==i.dotfiles?i.dotfiles:"ignore","ignore"!==this._dotfiles&&"allow"!==this._dotfiles&&"deny"!==this._dotfiles)throw new TypeError('dotfiles option must be "allow", "deny", or "ignore"');this._hidden=Boolean(i.hidden),void 0!==i.hidden&&deprecate("hidden: use dotfiles: '"+(this._hidden?"allow":"ignore")+"' instead"),void 0===i.dotfiles&&(this._dotfiles=void 0),this._extensions=void 0!==i.extensions?normalizeList(i.extensions,"extensions option"):[],this._index=void 0!==i.index?normalizeList(i.index,"index option"):["index.html"],this._lastModified=void 0!==i.lastModified?Boolean(i.lastModified):!0,this._maxage=i.maxAge||i.maxage,this._maxage="string"==typeof this._maxage?ms(this._maxage):Number(this._maxage),this._maxage=isNaN(this._maxage)?0:Math.min(Math.max(0,this._maxage),maxMaxAge),this._root=i.root?resolve(i.root):null,!this._root&&i.from&&this.from(i.from)}function containsDotFile(e){for(var t=0;t<e.length;t++)if("."===e[t][0])return!0;return!1}function decode(e){try{return decodeURIComponent(e)}catch(t){return-1}}function normalizeList(e,t){for(var r=[].concat(e||[]),i=0;i<r.length;i++)if("string"!=typeof r[i])throw new TypeError(t+" must be array of strings or false");return r}var createError=require("http-errors"),debug=require("debug")("send"),deprecate=require("depd")("send"),destroy=require("destroy"),escapeHtml=require("escape-html"),parseRange=require("range-parser"),Stream=require("stream"),mime=require("mime"),fresh=require("fresh"),path=require("path"),fs=require("fs"),normalize=path.normalize,join=path.join,etag=require("etag"),EventEmitter=require("events").EventEmitter,ms=require("ms"),onFinished=require("on-finished"),statuses=require("statuses"),extname=path.extname,maxMaxAge=31536e6,resolve=path.resolve,sep=path.sep,toString=Object.prototype.toString,upPathRegexp=/(?:^|[\\\/])\.\.(?:[\\\/]|$)/;module.exports=send,module.exports.mime=mime;var listenerCount=EventEmitter.listenerCount||function(e,t){return e.listeners(t).length};SendStream.prototype.__proto__=Stream.prototype,SendStream.prototype.etag=deprecate["function"](function(e){return e=Boolean(e),debug("etag %s",e),this._etag=e,this},"send.etag: pass etag as option"),SendStream.prototype.hidden=deprecate["function"](function(e){return e=Boolean(e),debug("hidden %s",e),this._hidden=e,this._dotfiles=void 0,this},"send.hidden: use dotfiles option"),SendStream.prototype.index=deprecate["function"](function e(t){var e=t?normalizeList(t,"paths argument"):[];return debug("index %o",t),this._index=e,this},"send.index: pass index as option"),SendStream.prototype.root=function(e){return e=String(e),this._root=resolve(e),this},SendStream.prototype.from=deprecate["function"](SendStream.prototype.root,"send.from: pass root as option"),SendStream.prototype.root=deprecate["function"](SendStream.prototype.root,"send.root: pass root as option"),SendStream.prototype.maxage=deprecate["function"](function(e){return e="string"==typeof e?ms(e):Number(e),isNaN(e)&&(e=0),1/0==e&&(e=31536e6),debug("max-age %d",e),this._maxage=e,this},"send.maxage: pass maxAge as option"),SendStream.prototype.error=function t(e,t){if(0!==listenerCount(this,"error"))return this.emit("error",createError(t,e,{expose:!1}));var r=this.res,i=statuses[e];r._headers=null,r.statusCode=e,r.setHeader("Content-Type","text/plain; charset=UTF-8"),r.setHeader("Content-Length",Buffer.byteLength(i)),r.setHeader("X-Content-Type-Options","nosniff"),r.end(i)},SendStream.prototype.hasTrailingSlash=function(){return"/"==this.path[this.path.length-1]},SendStream.prototype.isConditionalGET=function(){return this.req.headers["if-none-match"]||this.req.headers["if-modified-since"]},SendStream.prototype.removeContentHeaderFields=function(){for(var e=this.res,t=Object.keys(e._headers||{}),r=0;r<t.length;r++){var i=t[r];"content-"===i.substr(0,8)&&"content-location"!==i&&e.removeHeader(i)}},SendStream.prototype.notModified=function(){var e=this.res;debug("not modified"),this.removeContentHeaderFields(),e.statusCode=304,e.end()},SendStream.prototype.headersAlreadySent=function(){var e=new Error("Can't set headers after they are sent.");debug("headers already sent"),this.error(500,e)},SendStream.prototype.isCachable=function(){var e=this.res;return e.statusCode>=200&&e.statusCode<300||304==e.statusCode},SendStream.prototype.onStatError=function(e){switch(e.code){case"ENAMETOOLONG":case"ENOENT":case"ENOTDIR":this.error(404,e);break;default:this.error(500,e)}},SendStream.prototype.isFresh=function(){return fresh(this.req.headers,this.res._headers)},SendStream.prototype.isRangeFresh=function(){var e=this.req.headers["if-range"];return e?~e.indexOf('"')?~e.indexOf(this.res._headers.etag):Date.parse(this.res._headers["last-modified"])<=Date.parse(e):!0},SendStream.prototype.redirect=function(e){if(0!==listenerCount(this,"directory"))return void this.emit("directory");if(this.hasTrailingSlash())return void this.error(403);var t=e+"/",r='Redirecting to <a href="'+escapeHtml(t)+'">'+escapeHtml(t)+"</a>\n",i=this.res;i.statusCode=301,i.setHeader("Content-Type","text/html; charset=UTF-8"),i.setHeader("Content-Length",Buffer.byteLength(r)),i.setHeader("X-Content-Type-Options","nosniff"),i.setHeader("Location",t),i.end(r)},SendStream.prototype.pipe=function(e){var t=this._root;this.res=e;var r=decode(this.path);if(-1===r)return this.error(400);if(~r.indexOf("\x00"))return this.error(400);var i;if(null!==t){if(upPathRegexp.test(normalize("."+sep+r)))return debug('malicious path "%s"',r),this.error(403);r=normalize(join(t,r)),t=normalize(t+sep),i=r.substr(t.length).split(sep)}else{if(upPathRegexp.test(r))return debug('malicious path "%s"',r),this.error(403);i=normalize(r).split(sep),r=resolve(r)}if(containsDotFile(i)){var n=this._dotfiles;switch(void 0===n&&(n="."===i[i.length-1][0]?this._hidden?"allow":"ignore":"allow"),debug('%s dotfile "%s"',n,r),n){case"allow":break;case"deny":return this.error(403);case"ignore":default:return this.error(404)}}return this._index.length&&"/"===this.path[this.path.length-1]?(this.sendIndex(r),e):(this.sendFile(r),e)},SendStream.prototype.send=function(e,t){var r=t.size,i=this.options,n={},s=this.res,o=this.req,a=o.headers.range,d=i.start||0;if(s._header)return this.headersAlreadySent();if(debug('pipe "%s"',e),this.setHeader(e,t),this.type(e),this.isConditionalGET()&&this.isCachable()&&this.isFresh())return this.notModified();if(r=Math.max(0,r-d),void 0!==i.end){var h=i.end-d+1;r>h&&(r=h)}if(a){if(a=parseRange(r,a),this.isRangeFresh()||(debug("range stale"),a=-2),-1==a)return debug("range unsatisfiable"),s.setHeader("Content-Range","bytes */"+t.size),this.error(416);-2!=a&&1===a.length&&(debug("range %j",a),s.statusCode=206,s.setHeader("Content-Range","bytes "+a[0].start+"-"+a[0].end+"/"+r),d+=a[0].start,r=a[0].end-a[0].start+1)}for(var p in i)n[p]=i[p];return n.start=d,n.end=Math.max(d,d+r-1),s.setHeader("Content-Length",r),"HEAD"==o.method?s.end():void this.stream(e,n)},SendStream.prototype.sendFile=function(e){function t(n){if(i._extensions.length<=r)return n?i.onStatError(n):i.error(404);var s=e+"."+i._extensions[r++];debug('stat "%s"',s),fs.stat(s,function(e,r){return e?t(e):r.isDirectory()?t():(i.emit("file",s,r),void i.send(s,r))})}var r=0,i=this;debug('stat "%s"',e),fs.stat(e,function(r,n){return r&&"ENOENT"===r.code&&!extname(e)&&e[e.length-1]!==sep?t(r):r?i.onStatError(r):n.isDirectory()?i.redirect(i.path):(i.emit("file",e,n),void i.send(e,n))})},SendStream.prototype.sendIndex=function(e){function t(n){if(++r>=i._index.length)return n?i.onStatError(n):i.error(404);var s=join(e,i._index[r]);debug('stat "%s"',s),fs.stat(s,function(e,r){return e?t(e):r.isDirectory()?t():(i.emit("file",s,r),void i.send(s,r))})}var r=-1,i=this;t()},SendStream.prototype.stream=function(e,t){var r=!1,i=this,n=this.res,s=(this.req,fs.createReadStream(e,t));this.emit("stream",s),s.pipe(n),onFinished(n,function(){r=!0,destroy(s)}),s.on("error",function(e){r||(r=!0,destroy(s),i.onStatError(e))}),s.on("end",function(){i.emit("end")})},SendStream.prototype.type=function(e){var t=this.res;if(!t.getHeader("Content-Type")){var r=mime.lookup(e),i=mime.charsets.lookup(r);debug("content-type %s",r),t.setHeader("Content-Type",r+(i?"; charset="+i:""))}},SendStream.prototype.setHeader=function(e,t){var r=this.res;if(this.emit("headers",r,e,t),r.getHeader("Accept-Ranges")||r.setHeader("Accept-Ranges","bytes"),r.getHeader("Cache-Control")||r.setHeader("Cache-Control","public, max-age="+Math.floor(this._maxage/1e3)),this._lastModified&&!r.getHeader("Last-Modified")){var i=t.mtime.toUTCString();debug("modified %s",i),r.setHeader("Last-Modified",i)}if(this._etag&&!r.getHeader("ETag")){var n=etag(t);debug("etag %s",n),r.setHeader("ETag",n)}};

}).call(this,require("buffer").Buffer)
},{"buffer":112,"debug":7,"depd":57,"destroy":9,"escape-html":11,"etag":12,"events":161,"fresh":29,"fs":110,"http-errors":30,"mime":39,"ms":41,"on-finished":47,"path":240,"range-parser":55,"statuses":60,"stream":282}],57:[function(require,module,exports){
"use strict";function depd(r){function e(r){}if(!r)throw new TypeError("argument namespace is required");return e._file=void 0,e._ignored=!0,e._namespace=r,e._traced=!1,e._warned=Object.create(null),e["function"]=wrapfunction,e.property=wrapproperty,e}function wrapfunction(r,e){if("function"!=typeof r)throw new TypeError("argument fn must be a function");return r}function wrapproperty(r,e,t){if(!r||"object"!=typeof r&&"function"!=typeof r)throw new TypeError("argument obj must be object");var o=Object.getOwnPropertyDescriptor(r,e);if(!o)throw new TypeError("must call property on owner object");if(!o.configurable)throw new TypeError("property must be configurable")}module.exports=depd;

},{}],58:[function(require,module,exports){
(function (Buffer){
"use strict";function serveStatic(e,r){if(!e)throw new TypeError("root path required");if("string"!=typeof e)throw new TypeError("root path must be a string");var t=Object.create(r||null),n=t.fallthrough!==!1,o=t.redirect!==!1,a=t.setHeaders;if(a&&"function"!=typeof a)throw new TypeError("option setHeaders must be function");t.maxage=t.maxage||t.maxAge||0,t.root=resolve(e);var s=o?createRedirectDirectoryListener():createNotFoundDirectoryListener();return function(e,r,o){if("GET"!==e.method&&"HEAD"!==e.method)return n?o():(r.statusCode=405,r.setHeader("Allow","GET, HEAD"),r.setHeader("Content-Length","0"),void r.end());var i=!n,u=parseUrl.original(e),l=parseUrl(e).pathname;"/"===l&&"/"!==u.pathname.substr(-1)&&(l="");var c=send(e,l,t);c.on("directory",s),a&&c.on("headers",a),n&&c.on("file",function(){i=!0}),c.on("error",function(e){return!i&&e.statusCode<500?void o():void o(e)}),c.pipe(r)}}function collapseLeadingSlashes(e){for(var r=0;r<e.length&&"/"===e[r];r++);return r>1?"/"+e.substr(r):e}function createNotFoundDirectoryListener(){return function(){this.error(404)}}function createRedirectDirectoryListener(){return function(){if(this.hasTrailingSlash())return void this.error(404);var e=parseUrl.original(this.req);e.path=null,e.pathname=collapseLeadingSlashes(e.pathname+"/");var r=url.format(e),t='Redirecting to <a href="'+escapeHtml(r)+'">'+escapeHtml(r)+"</a>\n",n=this.res;n.statusCode=303,n.setHeader("Content-Type","text/html; charset=UTF-8"),n.setHeader("Content-Length",Buffer.byteLength(t)),n.setHeader("X-Content-Type-Options","nosniff"),n.setHeader("Location",r),n.end(t)}}var escapeHtml=require("escape-html"),parseUrl=require("parseurl"),resolve=require("path").resolve,send=require("send"),url=require("url");module.exports=serveStatic,module.exports.mime=send.mime;

}).call(this,require("buffer").Buffer)
},{"buffer":112,"escape-html":11,"parseurl":48,"path":240,"send":56,"url":292}],59:[function(require,module,exports){
module.exports={
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "306": "(Unused)",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Unordered Collection",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required"
}
},{}],60:[function(require,module,exports){
function status(t){if("number"==typeof t){if(!status[t])throw new Error("invalid status code: "+t);return t}if("string"!=typeof t)throw new TypeError("code must be a number or string");var s=parseInt(t,10);if(!isNaN(s)){if(!status[s])throw new Error("invalid status code: "+s);return s}if(s=status[t.toLowerCase()],!s)throw new Error('invalid status message: "'+t+'"');return s}var codes=require("./codes.json");module.exports=status,status.codes=Object.keys(codes).map(function(t){t=~~t;var s=codes[t];return status[t]=s,status[s]=status[s.toLowerCase()]=t,t}),status.redirect={300:!0,301:!0,302:!0,303:!0,305:!0,307:!0,308:!0},status.empty={204:!0,205:!0,304:!0},status.retry={502:!0,503:!0,504:!0};

},{"./codes.json":59}],61:[function(require,module,exports){
"use strict";function typeis(e,r){var t,n=r,i=tryNormalizeType(e);if(!i)return!1;if(n&&!Array.isArray(n))for(n=new Array(arguments.length-1),t=0;t<n.length;t++)n[t]=arguments[t+1];if(!n||!n.length)return i;var o;for(t=0;t<n.length;t++)if(mimeMatch(normalize(o=n[t]),i))return"+"===o[0]||-1!==o.indexOf("*")?i:o;return!1}function hasbody(e){return void 0!==e.headers["transfer-encoding"]||!isNaN(e.headers["content-length"])}function typeofrequest(e,r){var t=r;if(!hasbody(e))return null;if(arguments.length>2){t=new Array(arguments.length-1);for(var n=0;n<t.length;n++)t[n]=arguments[n+1]}var i=e.headers["content-type"];return typeis(i,t)}function normalize(e){if("string"!=typeof e)return!1;switch(e){case"urlencoded":return"application/x-www-form-urlencoded";case"multipart":return"multipart/*"}return"+"===e[0]?"*/*"+e:-1===e.indexOf("/")?mime.lookup(e):e}function mimeMatch(e,r){if(e===!1)return!1;var t=r.split("/"),n=e.split("/");return 2!==t.length||2!==n.length?!1:"*"!==n[0]&&n[0]!==t[0]?!1:"*+"===n[1].substr(0,2)?n[1].length<=t[1].length+1&&n[1].substr(1)===t[1].substr(1-n[1].length):"*"===n[1]||n[1]===t[1]}function normalizeType(e){var r=typer.parse(e);return r.parameters=void 0,typer.format(r)}function tryNormalizeType(e){try{return normalizeType(e)}catch(r){return null}}var typer=require("media-typer"),mime=require("mime-types");module.exports=typeofrequest,module.exports.is=typeis,module.exports.hasBody=hasbody,module.exports.normalize=normalize,module.exports.match=mimeMatch;

},{"media-typer":33,"mime-types":38}],62:[function(require,module,exports){
"use strict";function hasPipeDataListeners(e){for(var n=e.listeners("data"),r=0;r<n.length;r++)if("ondata"===n[r].name)return!0;return!1}function unpipe(e){if(!e)throw new TypeError("argument stream is required");if("function"==typeof e.unpipe)return void e.unpipe();if(hasPipeDataListeners(e))for(var n,r=e.listeners("close"),t=0;t<r.length;t++)n=r[t],"cleanup"!==n.name&&"onclose"!==n.name||n.call(e)}module.exports=unpipe;

},{}],63:[function(require,module,exports){
exports=module.exports=function(r,o){if(r&&o)for(var e in o)r[e]=o[e];return r};

},{}],64:[function(require,module,exports){
"use strict";function append(r,e){if("string"!=typeof r)throw new TypeError("header argument is required");if(!e)throw new TypeError("field argument is required");for(var a=Array.isArray(e)?e:parse(String(e)),t=0;t<a.length;t++)if(separators.test(a[t]))throw new TypeError("field argument contains an invalid header");if("*"===r)return r;var n=r,i=parse(r.toLowerCase());if(-1!==a.indexOf("*")||-1!==i.indexOf("*"))return"*";for(var t=0;t<a.length;t++){var o=a[t].toLowerCase();-1===i.indexOf(o)&&(i.push(o),n=n?n+", "+a[t]:a[t])}return n}function parse(r){return r.trim().split(/ *, */)}function vary(r,e){if(!r||!r.getHeader||!r.setHeader)throw new TypeError("res argument is required");var a=r.getHeader("Vary")||"",t=Array.isArray(a)?a.join(", "):String(a);(a=append(t,e))&&r.setHeader("Vary",a)}module.exports=vary,module.exports.append=append;var separators=/[\(\)<>@,;:\\"\/\[\]\?=\{\}\u0020\u0009]/;

},{}],65:[function(require,module,exports){
var express=require("express"),router=express.Router();router.get("/",function(e,r,s){r.status(200),r.json({cats:[{name:"piet"}]})}),module.exports=router;

},{"express":13}],66:[function(require,module,exports){
"use strict";function Accepts(t){return this instanceof Accepts?(this.headers=t.headers,void(this.negotiator=new Negotiator(t))):new Accepts(t)}function extToMime(t){return-1===t.indexOf("/")?mime.lookup(t):t}function validMime(t){return"string"==typeof t}var Negotiator=require("negotiator"),mime=require("mime-types");module.exports=Accepts,Accepts.prototype.type=Accepts.prototype.types=function(t){var e=t;if(e&&!Array.isArray(e)){e=new Array(arguments.length);for(var r=0;r<e.length;r++)e[r]=arguments[r]}if(!e||0===e.length)return this.negotiator.mediaTypes();if(!this.headers.accept)return e[0];var n=e.map(extToMime),o=this.negotiator.mediaTypes(n.filter(validMime)),i=o[0];return i?e[n.indexOf(i)]:!1},Accepts.prototype.encoding=Accepts.prototype.encodings=function(t){var e=t;if(e&&!Array.isArray(e)){e=new Array(arguments.length);for(var r=0;r<e.length;r++)e[r]=arguments[r]}return e&&0!==e.length?this.negotiator.encodings(e)[0]||!1:this.negotiator.encodings()},Accepts.prototype.charset=Accepts.prototype.charsets=function(t){var e=t;if(e&&!Array.isArray(e)){e=new Array(arguments.length);for(var r=0;r<e.length;r++)e[r]=arguments[r]}return e&&0!==e.length?this.negotiator.charsets(e)[0]||!1:this.negotiator.charsets()},Accepts.prototype.lang=Accepts.prototype.langs=Accepts.prototype.language=Accepts.prototype.languages=function(t){var e=t;if(e&&!Array.isArray(e)){e=new Array(arguments.length);for(var r=0;r<e.length;r++)e[r]=arguments[r]}return e&&0!==e.length?this.negotiator.languages(e)[0]||!1:this.negotiator.languages()};

},{"mime-types":223,"negotiator":228}],67:[function(require,module,exports){
"use strict";function flattenWithDepth(t,r,e){for(var a=0;a<t.length;a++){var n=t[a];e>0&&Array.isArray(n)?flattenWithDepth(n,r,e-1):r.push(n)}return r}function flattenForever(t,r){for(var e=0;e<t.length;e++){var a=t[e];Array.isArray(a)?flattenForever(a,r):r.push(a)}return r}function arrayFlatten(t,r){return null==r?flattenForever(t,[]):flattenWithDepth(t,[],r)}module.exports=arrayFlatten;

},{}],68:[function(require,module,exports){
var asn1=exports;asn1.bignum=require("bn.js"),asn1.define=require("./asn1/api").define,asn1.base=require("./asn1/base"),asn1.constants=require("./asn1/constants"),asn1.decoders=require("./asn1/decoders"),asn1.encoders=require("./asn1/encoders");

},{"./asn1/api":69,"./asn1/base":71,"./asn1/constants":75,"./asn1/decoders":77,"./asn1/encoders":80,"bn.js":83}],69:[function(require,module,exports){
function Entity(t,e){this.name=t,this.body=e,this.decoders={},this.encoders={}}var asn1=require("../asn1"),inherits=require("inherits"),api=exports;api.define=function(t,e){return new Entity(t,e)},Entity.prototype._createNamed=function(t){var e;try{e=require("vm").runInThisContext("(function "+this.name+"(entity) {\n  this._initNamed(entity);\n})")}catch(n){e=function(t){this._initNamed(t)}}return inherits(e,t),e.prototype._initNamed=function(e){t.call(this,e)},new e(this)},Entity.prototype._getDecoder=function(t){return this.decoders.hasOwnProperty(t)||(this.decoders[t]=this._createNamed(asn1.decoders[t])),this.decoders[t]},Entity.prototype.decode=function(t,e,n){return this._getDecoder(e).decode(t,n)},Entity.prototype._getEncoder=function(t){return this.encoders.hasOwnProperty(t)||(this.encoders[t]=this._createNamed(asn1.encoders[t])),this.encoders[t]},Entity.prototype.encode=function(t,e,n){return this._getEncoder(e).encode(t,n)};

},{"../asn1":68,"inherits":213,"vm":297}],70:[function(require,module,exports){
function DecoderBuffer(e,t){return Reporter.call(this,t),Buffer.isBuffer(e)?(this.base=e,this.offset=0,void(this.length=e.length)):void this.error("Input not Buffer")}function EncoderBuffer(e,t){if(Array.isArray(e))this.length=0,this.value=e.map(function(e){return e instanceof EncoderBuffer||(e=new EncoderBuffer(e,t)),this.length+=e.length,e},this);else if("number"==typeof e){if(!(e>=0&&255>=e))return t.error("non-byte EncoderBuffer value");this.value=e,this.length=1}else if("string"==typeof e)this.value=e,this.length=Buffer.byteLength(e);else{if(!Buffer.isBuffer(e))return t.error("Unsupported type: "+typeof e);this.value=e,this.length=e.length}}var inherits=require("inherits"),Reporter=require("../base").Reporter,Buffer=require("buffer").Buffer;inherits(DecoderBuffer,Reporter),exports.DecoderBuffer=DecoderBuffer,DecoderBuffer.prototype.save=function(){return{offset:this.offset,reporter:Reporter.prototype.save.call(this)}},DecoderBuffer.prototype.restore=function(e){var t=new DecoderBuffer(this.base);return t.offset=e.offset,t.length=this.offset,this.offset=e.offset,Reporter.prototype.restore.call(this,e.reporter),t},DecoderBuffer.prototype.isEmpty=function(){return this.offset===this.length},DecoderBuffer.prototype.readUInt8=function(e){return this.offset+1<=this.length?this.base.readUInt8(this.offset++,!0):this.error(e||"DecoderBuffer overrun")},DecoderBuffer.prototype.skip=function(e,t){if(!(this.offset+e<=this.length))return this.error(t||"DecoderBuffer overrun");var r=new DecoderBuffer(this.base);return r._reporterState=this._reporterState,r.offset=this.offset,r.length=this.offset+e,this.offset+=e,r},DecoderBuffer.prototype.raw=function(e){return this.base.slice(e?e.offset:this.offset,this.length)},exports.EncoderBuffer=EncoderBuffer,EncoderBuffer.prototype.join=function(e,t){return e||(e=new Buffer(this.length)),t||(t=0),0===this.length?e:(Array.isArray(this.value)?this.value.forEach(function(r){r.join(e,t),t+=r.length}):("number"==typeof this.value?e[t]=this.value:"string"==typeof this.value?e.write(this.value,t):Buffer.isBuffer(this.value)&&this.value.copy(e,t),t+=this.length),e)};

},{"../base":71,"buffer":112,"inherits":213}],71:[function(require,module,exports){
var base=exports;base.Reporter=require("./reporter").Reporter,base.DecoderBuffer=require("./buffer").DecoderBuffer,base.EncoderBuffer=require("./buffer").EncoderBuffer,base.Node=require("./node");

},{"./buffer":70,"./node":72,"./reporter":73}],72:[function(require,module,exports){
function Node(e,t){var r={};this._baseState=r,r.enc=e,r.parent=t||null,r.children=null,r.tag=null,r.args=null,r.reverseArgs=null,r.choice=null,r.optional=!1,r.any=!1,r.obj=!1,r.use=null,r.useDecoder=null,r.key=null,r["default"]=null,r.explicit=null,r.implicit=null,r.contains=null,r.parent||(r.children=[],this._wrap())}var Reporter=require("../base").Reporter,EncoderBuffer=require("../base").EncoderBuffer,DecoderBuffer=require("../base").DecoderBuffer,assert=require("minimalistic-assert"),tags=["seq","seqof","set","setof","objid","bool","gentime","utctime","null_","enum","int","bitstr","bmpstr","charstr","genstr","graphstr","ia5str","iso646str","numstr","octstr","printstr","t61str","unistr","utf8str","videostr"],methods=["key","obj","use","optional","explicit","implicit","def","choice","any","contains"].concat(tags),overrided=["_peekTag","_decodeTag","_use","_decodeStr","_decodeObjid","_decodeTime","_decodeNull","_decodeInt","_decodeBool","_decodeList","_encodeComposite","_encodeStr","_encodeObjid","_encodeTime","_encodeNull","_encodeInt","_encodeBool"];module.exports=Node;var stateProps=["enc","parent","children","tag","args","reverseArgs","choice","optional","any","obj","use","alteredUse","key","default","explicit","implicit"];Node.prototype.clone=function(){var e=this._baseState,t={};stateProps.forEach(function(r){t[r]=e[r]});var r=new this.constructor(t.parent);return r._baseState=t,r},Node.prototype._wrap=function(){var e=this._baseState;methods.forEach(function(t){this[t]=function(){var r=new this.constructor(this);return e.children.push(r),r[t].apply(r,arguments)}},this)},Node.prototype._init=function(e){var t=this._baseState;assert(null===t.parent),e.call(this),t.children=t.children.filter(function(e){return e._baseState.parent===this},this),assert.equal(t.children.length,1,"Root node can have only one child")},Node.prototype._useArgs=function(e){var t=this._baseState,r=e.filter(function(e){return e instanceof this.constructor},this);e=e.filter(function(e){return!(e instanceof this.constructor)},this),0!==r.length&&(assert(null===t.children),t.children=r,r.forEach(function(e){e._baseState.parent=this},this)),0!==e.length&&(assert(null===t.args),t.args=e,t.reverseArgs=e.map(function(e){if("object"!=typeof e||e.constructor!==Object)return e;var t={};return Object.keys(e).forEach(function(r){r==(0|r)&&(r|=0);var i=e[r];t[i]=r}),t}))},overrided.forEach(function(e){Node.prototype[e]=function(){var t=this._baseState;throw new Error(e+" not implemented for encoding: "+t.enc)}}),tags.forEach(function(e){Node.prototype[e]=function(){var t=this._baseState,r=Array.prototype.slice.call(arguments);return assert(null===t.tag),t.tag=e,this._useArgs(r),this}}),Node.prototype.use=function(e){var t=this._baseState;return assert(null===t.use),t.use=e,this},Node.prototype.optional=function(){var e=this._baseState;return e.optional=!0,this},Node.prototype.def=function(e){var t=this._baseState;return assert(null===t["default"]),t["default"]=e,t.optional=!0,this},Node.prototype.explicit=function(e){var t=this._baseState;return assert(null===t.explicit&&null===t.implicit),t.explicit=e,this},Node.prototype.implicit=function(e){var t=this._baseState;return assert(null===t.explicit&&null===t.implicit),t.implicit=e,this},Node.prototype.obj=function(){var e=this._baseState,t=Array.prototype.slice.call(arguments);return e.obj=!0,0!==t.length&&this._useArgs(t),this},Node.prototype.key=function(e){var t=this._baseState;return assert(null===t.key),t.key=e,this},Node.prototype.any=function(){var e=this._baseState;return e.any=!0,this},Node.prototype.choice=function(e){var t=this._baseState;return assert(null===t.choice),t.choice=e,this._useArgs(Object.keys(e).map(function(t){return e[t]})),this},Node.prototype.contains=function(e){var t=this._baseState;return assert(null===t.use),t.contains=e,this},Node.prototype._decode=function(e){var t=this._baseState;if(null===t.parent)return e.wrapResult(t.children[0]._decode(e));var r,i=t["default"],n=!0;if(null!==t.key&&(r=e.enterKey(t.key)),t.optional){var o=null;if(null!==t.explicit?o=t.explicit:null!==t.implicit?o=t.implicit:null!==t.tag&&(o=t.tag),null!==o||t.any){if(n=this._peekTag(e,o,t.any),e.isError(n))return n}else{var s=e.save();try{null===t.choice?this._decodeGeneric(t.tag,e):this._decodeChoice(e),n=!0}catch(a){n=!1}e.restore(s)}}var c;if(t.obj&&n&&(c=e.enterObject()),n){if(null!==t.explicit){var l=this._decodeTag(e,t.explicit);if(e.isError(l))return l;e=l}if(null===t.use&&null===t.choice){if(t.any)var s=e.save();var u=this._decodeTag(e,null!==t.implicit?t.implicit:t.tag,t.any);if(e.isError(u))return u;t.any?i=e.raw(s):e=u}if(i=t.any?i:null===t.choice?this._decodeGeneric(t.tag,e):this._decodeChoice(e),e.isError(i))return i;if(t.any||null!==t.choice||null===t.children||t.children.forEach(function(t){t._decode(e)}),t.contains&&("octstr"===t.tag||"bitstr"===t.tag)){var d=new DecoderBuffer(i);i=this._getUse(t.contains,e._reporterState.obj)._decode(d)}}return t.obj&&n&&(i=e.leaveObject(c)),null===t.key||null===i&&n!==!0||e.leaveKey(r,t.key,i),i},Node.prototype._decodeGeneric=function(e,t){var r=this._baseState;return"seq"===e||"set"===e?null:"seqof"===e||"setof"===e?this._decodeList(t,e,r.args[0]):/str$/.test(e)?this._decodeStr(t,e):"objid"===e&&r.args?this._decodeObjid(t,r.args[0],r.args[1]):"objid"===e?this._decodeObjid(t,null,null):"gentime"===e||"utctime"===e?this._decodeTime(t,e):"null_"===e?this._decodeNull(t):"bool"===e?this._decodeBool(t):"int"===e||"enum"===e?this._decodeInt(t,r.args&&r.args[0]):null!==r.use?this._getUse(r.use,t._reporterState.obj)._decode(t):t.error("unknown tag: "+e)},Node.prototype._getUse=function(e,t){var r=this._baseState;return r.useDecoder=this._use(e,t),assert(null===r.useDecoder._baseState.parent),r.useDecoder=r.useDecoder._baseState.children[0],r.implicit!==r.useDecoder._baseState.implicit&&(r.useDecoder=r.useDecoder.clone(),r.useDecoder._baseState.implicit=r.implicit),r.useDecoder},Node.prototype._decodeChoice=function(e){var t=this._baseState,r=null,i=!1;return Object.keys(t.choice).some(function(n){var o=e.save(),s=t.choice[n];try{var a=s._decode(e);if(e.isError(a))return!1;r={type:n,value:a},i=!0}catch(c){return e.restore(o),!1}return!0},this),i?r:e.error("Choice not matched")},Node.prototype._createEncoderBuffer=function(e){return new EncoderBuffer(e,this.reporter)},Node.prototype._encode=function(e,t,r){var i=this._baseState;if(null===i["default"]||i["default"]!==e){var n=this._encodeValue(e,t,r);if(void 0!==n&&!this._skipDefault(n,t,r))return n}},Node.prototype._encodeValue=function(e,t,r){var i=this._baseState;if(null===i.parent)return i.children[0]._encode(e,t||new Reporter);var n=null;if(this.reporter=t,i.optional&&void 0===e){if(null===i["default"])return;e=i["default"]}var o=null,s=!1;if(i.any)n=this._createEncoderBuffer(e);else if(i.choice)n=this._encodeChoice(e,t);else if(i.contains)o=this._getUse(i.contains,r)._encode(e,t),s=!0;else if(i.children)o=i.children.map(function(r){if("null_"===r._baseState.tag)return r._encode(null,t,e);if(null===r._baseState.key)return t.error("Child should have a key");var i=t.enterKey(r._baseState.key);if("object"!=typeof e)return t.error("Child expected, but input is not object");var n=r._encode(e[r._baseState.key],t,e);return t.leaveKey(i),n},this).filter(function(e){return e}),o=this._createEncoderBuffer(o);else if("seqof"===i.tag||"setof"===i.tag){if(!i.args||1!==i.args.length)return t.error("Too many args for : "+i.tag);if(!Array.isArray(e))return t.error("seqof/setof, but data is not Array");var a=this.clone();a._baseState.implicit=null,o=this._createEncoderBuffer(e.map(function(r){var i=this._baseState;return this._getUse(i.args[0],e)._encode(r,t)},a))}else null!==i.use?n=this._getUse(i.use,r)._encode(e,t):(o=this._encodePrimitive(i.tag,e),s=!0);var n;if(!i.any&&null===i.choice){var c=null!==i.implicit?i.implicit:i.tag,l=null===i.implicit?"universal":"context";null===c?null===i.use&&t.error("Tag could be ommited only for .use()"):null===i.use&&(n=this._encodeComposite(c,s,l,o))}return null!==i.explicit&&(n=this._encodeComposite(i.explicit,!1,"context",n)),n},Node.prototype._encodeChoice=function(e,t){var r=this._baseState,i=r.choice[e.type];return i||assert(!1,e.type+" not found in "+JSON.stringify(Object.keys(r.choice))),i._encode(e.value,t)},Node.prototype._encodePrimitive=function(e,t){var r=this._baseState;if(/str$/.test(e))return this._encodeStr(t,e);if("objid"===e&&r.args)return this._encodeObjid(t,r.reverseArgs[0],r.args[1]);if("objid"===e)return this._encodeObjid(t,null,null);if("gentime"===e||"utctime"===e)return this._encodeTime(t,e);if("null_"===e)return this._encodeNull();if("int"===e||"enum"===e)return this._encodeInt(t,r.args&&r.reverseArgs[0]);if("bool"===e)return this._encodeBool(t);throw new Error("Unsupported tag: "+e)},Node.prototype._isNumstr=function(e){return/^[0-9 ]*$/.test(e)},Node.prototype._isPrintstr=function(e){return/^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(e)};

},{"../base":71,"minimalistic-assert":226}],73:[function(require,module,exports){
function Reporter(r){this._reporterState={obj:null,path:[],options:r||{},errors:[]}}function ReporterError(r,t){this.path=r,this.rethrow(t)}var inherits=require("inherits");exports.Reporter=Reporter,Reporter.prototype.isError=function(r){return r instanceof ReporterError},Reporter.prototype.save=function(){var r=this._reporterState;return{obj:r.obj,pathLen:r.path.length}},Reporter.prototype.restore=function(r){var t=this._reporterState;t.obj=r.obj,t.path=t.path.slice(0,r.pathLen)},Reporter.prototype.enterKey=function(r){return this._reporterState.path.push(r)},Reporter.prototype.leaveKey=function(r,t,e){var o=this._reporterState;o.path=o.path.slice(0,r-1),null!==o.obj&&(o.obj[t]=e)},Reporter.prototype.enterObject=function(){var r=this._reporterState,t=r.obj;return r.obj={},t},Reporter.prototype.leaveObject=function(r){var t=this._reporterState,e=t.obj;return t.obj=r,e},Reporter.prototype.error=function(r){var t,e=this._reporterState,o=r instanceof ReporterError;if(t=o?r:new ReporterError(e.path.map(function(r){return"["+JSON.stringify(r)+"]"}).join(""),r.message||r,r.stack),!e.options.partial)throw t;return o||e.errors.push(t),t},Reporter.prototype.wrapResult=function(r){var t=this._reporterState;return t.options.partial?{result:this.isError(r)?null:r,errors:t.errors}:r},inherits(ReporterError,Error),ReporterError.prototype.rethrow=function(r){return this.message=r+" at: "+(this.path||"(shallow)"),Error.captureStackTrace(this,ReporterError),this};

},{"inherits":213}],74:[function(require,module,exports){
var constants=require("../constants");exports.tagClass={0:"universal",1:"application",2:"context",3:"private"},exports.tagClassByName=constants._reverse(exports.tagClass),exports.tag={0:"end",1:"bool",2:"int",3:"bitstr",4:"octstr",5:"null_",6:"objid",7:"objDesc",8:"external",9:"real",10:"enum",11:"embed",12:"utf8str",13:"relativeOid",16:"seq",17:"set",18:"numstr",19:"printstr",20:"t61str",21:"videostr",22:"ia5str",23:"utctime",24:"gentime",25:"graphstr",26:"iso646str",27:"genstr",28:"unistr",29:"charstr",30:"bmpstr"},exports.tagByName=constants._reverse(exports.tag);

},{"../constants":75}],75:[function(require,module,exports){
var constants=exports;constants._reverse=function(r){var e={};return Object.keys(r).forEach(function(n){(0|n)==n&&(n=0|n);var t=r[n];e[t]=n}),e},constants.der=require("./der");

},{"./der":74}],76:[function(require,module,exports){
function DERDecoder(r){this.enc="der",this.name=r.name,this.entity=r,this.tree=new DERNode,this.tree._init(r.body)}function DERNode(r){base.Node.call(this,"der",r)}function derDecodeTag(r,e){var t=r.readUInt8(e);if(r.isError(t))return t;var i=der.tagClass[t>>6],o=0===(32&t);if(31===(31&t)){var n=t;for(t=0;128===(128&n);){if(n=r.readUInt8(e),r.isError(n))return n;t<<=7,t|=127&n}}else t&=31;var s=der.tag[t];return{cls:i,primitive:o,tag:t,tagStr:s}}function derDecodeLen(r,e,t){var i=r.readUInt8(t);if(r.isError(i))return i;if(!e&&128===i)return null;if(0===(128&i))return i;var o=127&i;if(o>=4)return r.error("length octect is too long");i=0;for(var n=0;o>n;n++){i<<=8;var s=r.readUInt8(t);if(r.isError(s))return s;i|=s}return i}var inherits=require("inherits"),asn1=require("../../asn1"),base=asn1.base,bignum=asn1.bignum,der=asn1.constants.der;module.exports=DERDecoder,DERDecoder.prototype.decode=function(r,e){return r instanceof base.DecoderBuffer||(r=new base.DecoderBuffer(r,e)),this.tree._decode(r,e)},inherits(DERNode,base.Node),DERNode.prototype._peekTag=function(r,e,t){if(r.isEmpty())return!1;var i=r.save(),o=derDecodeTag(r,'Failed to peek tag: "'+e+'"');return r.isError(o)?o:(r.restore(i),o.tag===e||o.tagStr===e||o.tagStr+"of"===e||t)},DERNode.prototype._decodeTag=function(r,e,t){var i=derDecodeTag(r,'Failed to decode tag of "'+e+'"');if(r.isError(i))return i;var o=derDecodeLen(r,i.primitive,'Failed to get length of "'+e+'"');if(r.isError(o))return o;if(!t&&i.tag!==e&&i.tagStr!==e&&i.tagStr+"of"!==e)return r.error('Failed to match tag: "'+e+'"');if(i.primitive||null!==o)return r.skip(o,'Failed to match body of: "'+e+'"');var n=r.save(),s=this._skipUntilEnd(r,'Failed to skip indefinite length body: "'+this.tag+'"');return r.isError(s)?s:(o=r.offset-n.offset,r.restore(n),r.skip(o,'Failed to match body of: "'+e+'"'))},DERNode.prototype._skipUntilEnd=function(r,e){for(;;){var t=derDecodeTag(r,e);if(r.isError(t))return t;var i=derDecodeLen(r,t.primitive,e);if(r.isError(i))return i;var o;if(o=t.primitive||null!==i?r.skip(i):this._skipUntilEnd(r,e),r.isError(o))return o;if("end"===t.tagStr)break}},DERNode.prototype._decodeList=function(r,e,t){for(var i=[];!r.isEmpty();){var o=this._peekTag(r,"end");if(r.isError(o))return o;var n=t.decode(r,"der");if(r.isError(n)&&o)break;i.push(n)}return i},DERNode.prototype._decodeStr=function(r,e){if("bitstr"===e){var t=r.readUInt8();return r.isError(t)?t:{unused:t,data:r.raw()}}if("bmpstr"===e){var i=r.raw();if(i.length%2===1)return r.error("Decoding of string type: bmpstr length mismatch");for(var o="",n=0;n<i.length/2;n++)o+=String.fromCharCode(i.readUInt16BE(2*n));return o}if("numstr"===e){var s=r.raw().toString("ascii");return this._isNumstr(s)?s:r.error("Decoding of string type: numstr unsupported characters")}if("octstr"===e)return r.raw();if("printstr"===e){var a=r.raw().toString("ascii");return this._isPrintstr(a)?a:r.error("Decoding of string type: printstr unsupported characters")}return/str$/.test(e)?r.raw().toString():r.error("Decoding of string type: "+e+" unsupported")},DERNode.prototype._decodeObjid=function(r,e,t){for(var i,o=[],n=0;!r.isEmpty();){var s=r.readUInt8();n<<=7,n|=127&s,0===(128&s)&&(o.push(n),n=0)}128&s&&o.push(n);var a=o[0]/40|0,d=o[0]%40;if(i=t?o:[a,d].concat(o.slice(1)),e){var u=e[i.join(" ")];void 0===u&&(u=e[i.join(".")]),void 0!==u&&(i=u)}return i},DERNode.prototype._decodeTime=function(r,e){var t=r.raw().toString();if("gentime"===e)var i=0|t.slice(0,4),o=0|t.slice(4,6),n=0|t.slice(6,8),s=0|t.slice(8,10),a=0|t.slice(10,12),d=0|t.slice(12,14);else{if("utctime"!==e)return r.error("Decoding "+e+" time is not supported yet");var i=0|t.slice(0,2),o=0|t.slice(2,4),n=0|t.slice(4,6),s=0|t.slice(6,8),a=0|t.slice(8,10),d=0|t.slice(10,12);i=70>i?2e3+i:1900+i}return Date.UTC(i,o-1,n,s,a,d,0)},DERNode.prototype._decodeNull=function(r){return null},DERNode.prototype._decodeBool=function(r){var e=r.readUInt8();return r.isError(e)?e:0!==e},DERNode.prototype._decodeInt=function(r,e){var t=r.raw(),i=new bignum(t);return e&&(i=e[i.toString(10)]||i),i},DERNode.prototype._use=function(r,e){return"function"==typeof r&&(r=r(e)),r._getDecoder("der").tree};

},{"../../asn1":68,"inherits":213}],77:[function(require,module,exports){
var decoders=exports;decoders.der=require("./der"),decoders.pem=require("./pem");

},{"./der":76,"./pem":78}],78:[function(require,module,exports){
function PEMDecoder(e){DERDecoder.call(this,e),this.enc="pem"}var inherits=require("inherits"),Buffer=require("buffer").Buffer,asn1=require("../../asn1"),DERDecoder=require("./der");inherits(PEMDecoder,DERDecoder),module.exports=PEMDecoder,PEMDecoder.prototype.decode=function(e,r){for(var o=e.toString().split(/[\r\n]+/g),i=r.label.toUpperCase(),t=/^-----(BEGIN|END) ([^-]+)-----$/,n=-1,c=-1,a=0;a<o.length;a++){var f=o[a].match(t);if(null!==f&&f[2]===i){if(-1!==n){if("END"!==f[1])break;c=a;break}if("BEGIN"!==f[1])break;n=a}}if(-1===n||-1===c)throw new Error("PEM section not found for: "+i);var d=o.slice(n+1,c).join("");d.replace(/[^a-z0-9\+\/=]+/gi,"");var s=new Buffer(d,"base64");return DERDecoder.prototype.decode.call(this,s,r)};

},{"../../asn1":68,"./der":76,"buffer":112,"inherits":213}],79:[function(require,module,exports){
function DEREncoder(e){this.enc="der",this.name=e.name,this.entity=e,this.tree=new DERNode,this.tree._init(e.body)}function DERNode(e){base.Node.call(this,"der",e)}function two(e){return 10>e?"0"+e:e}function encodeTag(e,r,t,n){var o;if("seqof"===e?e="seq":"setof"===e&&(e="set"),der.tagByName.hasOwnProperty(e))o=der.tagByName[e];else{if("number"!=typeof e||(0|e)!==e)return n.error("Unknown tag: "+e);o=e}return o>=31?n.error("Multi-octet tag encoding unsupported"):(r||(o|=32),o|=der.tagClassByName[t||"universal"]<<6)}var inherits=require("inherits"),Buffer=require("buffer").Buffer,asn1=require("../../asn1"),base=asn1.base,bignum=asn1.bignum,der=asn1.constants.der;module.exports=DEREncoder,DEREncoder.prototype.encode=function(e,r){return this.tree._encode(e,r).join()},inherits(DERNode,base.Node),DERNode.prototype._encodeComposite=function(e,r,t,n){var o=encodeTag(e,r,t,this.reporter);if(n.length<128){var i=new Buffer(2);return i[0]=o,i[1]=n.length,this._createEncoderBuffer([i,n])}for(var f=1,s=n.length;s>=256;s>>=8)f++;var i=new Buffer(2+f);i[0]=o,i[1]=128|f;for(var s=1+f,u=n.length;u>0;s--,u>>=8)i[s]=255&u;return this._createEncoderBuffer([i,n])},DERNode.prototype._encodeStr=function(e,r){if("bitstr"===r)return this._createEncoderBuffer([0|e.unused,e.data]);if("bmpstr"===r){for(var t=new Buffer(2*e.length),n=0;n<e.length;n++)t.writeUInt16BE(e.charCodeAt(n),2*n);return this._createEncoderBuffer(t)}return"numstr"===r?this._isNumstr(e)?this._createEncoderBuffer(e):this.reporter.error("Encoding of string type: numstr supports only digits and space"):"printstr"===r?this._isPrintstr(e)?this._createEncoderBuffer(e):this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark"):/str$/.test(r)?this._createEncoderBuffer(e):this.reporter.error("Encoding of string type: "+r+" unsupported")},DERNode.prototype._encodeObjid=function(e,r,t){if("string"==typeof e){if(!r)return this.reporter.error("string objid given, but no values map found");if(!r.hasOwnProperty(e))return this.reporter.error("objid not found in values map");e=r[e].split(/[\s\.]+/g);for(var n=0;n<e.length;n++)e[n]|=0}else if(Array.isArray(e)){e=e.slice();for(var n=0;n<e.length;n++)e[n]|=0}if(!Array.isArray(e))return this.reporter.error("objid() should be either array or string, got: "+JSON.stringify(e));if(!t){if(e[1]>=40)return this.reporter.error("Second objid identifier OOB");e.splice(0,2,40*e[0]+e[1])}for(var o=0,n=0;n<e.length;n++){var i=e[n];for(o++;i>=128;i>>=7)o++}for(var f=new Buffer(o),s=f.length-1,n=e.length-1;n>=0;n--){var i=e[n];for(f[s--]=127&i;(i>>=7)>0;)f[s--]=128|127&i}return this._createEncoderBuffer(f)},DERNode.prototype._encodeTime=function(e,r){var t,n=new Date(e);return"gentime"===r?t=[two(n.getFullYear()),two(n.getUTCMonth()+1),two(n.getUTCDate()),two(n.getUTCHours()),two(n.getUTCMinutes()),two(n.getUTCSeconds()),"Z"].join(""):"utctime"===r?t=[two(n.getFullYear()%100),two(n.getUTCMonth()+1),two(n.getUTCDate()),two(n.getUTCHours()),two(n.getUTCMinutes()),two(n.getUTCSeconds()),"Z"].join(""):this.reporter.error("Encoding "+r+" time is not supported yet"),this._encodeStr(t,"octstr")},DERNode.prototype._encodeNull=function(){return this._createEncoderBuffer("")},DERNode.prototype._encodeInt=function(e,r){if("string"==typeof e){if(!r)return this.reporter.error("String int or enum given, but no values map");if(!r.hasOwnProperty(e))return this.reporter.error("Values map doesn't contain: "+JSON.stringify(e));e=r[e]}if("number"!=typeof e&&!Buffer.isBuffer(e)){var t=e.toArray();!e.sign&&128&t[0]&&t.unshift(0),e=new Buffer(t)}if(Buffer.isBuffer(e)){var n=e.length;0===e.length&&n++;var o=new Buffer(n);return e.copy(o),0===e.length&&(o[0]=0),this._createEncoderBuffer(o)}if(128>e)return this._createEncoderBuffer(e);if(256>e)return this._createEncoderBuffer([0,e]);for(var n=1,i=e;i>=256;i>>=8)n++;for(var o=new Array(n),i=o.length-1;i>=0;i--)o[i]=255&e,e>>=8;return 128&o[0]&&o.unshift(0),this._createEncoderBuffer(new Buffer(o))},DERNode.prototype._encodeBool=function(e){return this._createEncoderBuffer(e?255:0)},DERNode.prototype._use=function(e,r){return"function"==typeof e&&(e=e(r)),e._getEncoder("der").tree},DERNode.prototype._skipDefault=function(e,r,t){var n,o=this._baseState;if(null===o["default"])return!1;var i=e.join();if(void 0===o.defaultBuffer&&(o.defaultBuffer=this._encodeValue(o["default"],r,t).join()),i.length!==o.defaultBuffer.length)return!1;for(n=0;n<i.length;n++)if(i[n]!==o.defaultBuffer[n])return!1;return!0};

},{"../../asn1":68,"buffer":112,"inherits":213}],80:[function(require,module,exports){
var encoders=exports;encoders.der=require("./der"),encoders.pem=require("./pem");

},{"./der":79,"./pem":81}],81:[function(require,module,exports){
function PEMEncoder(e){DEREncoder.call(this,e),this.enc="pem"}var inherits=require("inherits"),Buffer=require("buffer").Buffer,asn1=require("../../asn1"),DEREncoder=require("./der");inherits(PEMEncoder,DEREncoder),module.exports=PEMEncoder,PEMEncoder.prototype.encode=function(e,r){for(var n=DEREncoder.prototype.encode.call(this,e),o=n.toString("base64"),i=["-----BEGIN "+r.label+"-----"],E=0;E<o.length;E+=64)i.push(o.slice(E,E+64));return i.push("-----END "+r.label+"-----"),i.join("\n")};

},{"../../asn1":68,"./der":79,"buffer":112,"inherits":213}],82:[function(require,module,exports){
"use strict";function init(){for(var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r=0,e=o.length;e>r;++r)lookup[r]=o[r],revLookup[o.charCodeAt(r)]=r;revLookup["-".charCodeAt(0)]=62,revLookup["_".charCodeAt(0)]=63}function toByteArray(o){var r,e,t,u,n,p,a=o.length;if(a%4>0)throw new Error("Invalid string. Length must be a multiple of 4");n="="===o[a-2]?2:"="===o[a-1]?1:0,p=new Arr(3*a/4-n),t=n>0?a-4:a;var k=0;for(r=0,e=0;t>r;r+=4,e+=3)u=revLookup[o.charCodeAt(r)]<<18|revLookup[o.charCodeAt(r+1)]<<12|revLookup[o.charCodeAt(r+2)]<<6|revLookup[o.charCodeAt(r+3)],p[k++]=u>>16&255,p[k++]=u>>8&255,p[k++]=255&u;return 2===n?(u=revLookup[o.charCodeAt(r)]<<2|revLookup[o.charCodeAt(r+1)]>>4,p[k++]=255&u):1===n&&(u=revLookup[o.charCodeAt(r)]<<10|revLookup[o.charCodeAt(r+1)]<<4|revLookup[o.charCodeAt(r+2)]>>2,p[k++]=u>>8&255,p[k++]=255&u),p}function tripletToBase64(o){return lookup[o>>18&63]+lookup[o>>12&63]+lookup[o>>6&63]+lookup[63&o]}function encodeChunk(o,r,e){for(var t,u=[],n=r;e>n;n+=3)t=(o[n]<<16)+(o[n+1]<<8)+o[n+2],u.push(tripletToBase64(t));return u.join("")}function fromByteArray(o){for(var r,e=o.length,t=e%3,u="",n=[],p=16383,a=0,k=e-t;k>a;a+=p)n.push(encodeChunk(o,a,a+p>k?k:a+p));return 1===t?(r=o[e-1],u+=lookup[r>>2],u+=lookup[r<<4&63],u+="=="):2===t&&(r=(o[e-2]<<8)+o[e-1],u+=lookup[r>>10],u+=lookup[r>>4&63],u+=lookup[r<<2&63],u+="="),n.push(u),n.join("")}exports.toByteArray=toByteArray,exports.fromByteArray=fromByteArray;var lookup=[],revLookup=[],Arr="undefined"!=typeof Uint8Array?Uint8Array:Array;init();

},{}],83:[function(require,module,exports){
!function(t,i){"use strict";function r(t,i){if(!t)throw new Error(i||"Assertion failed")}function h(t,i){t.super_=i;var r=function(){};r.prototype=i.prototype,t.prototype=new r,t.prototype.constructor=t}function n(t,i,r){return n.isBN(t)?t:(this.negative=0,this.words=null,this.length=0,this.red=null,void(null!==t&&("le"!==i&&"be"!==i||(r=i,i=10),this._init(t||0,i||10,r||"be"))))}function e(t,i,r){for(var h=0,n=Math.min(t.length,r),e=i;n>e;e++){var o=t.charCodeAt(e)-48;h<<=4,h|=o>=49&&54>=o?o-49+10:o>=17&&22>=o?o-17+10:15&o}return h}function o(t,i,r,h){for(var n=0,e=Math.min(t.length,r),o=i;e>o;o++){var s=t.charCodeAt(o)-48;n*=h,n+=s>=49?s-49+10:s>=17?s-17+10:s}return n}function s(t){for(var i=new Array(t.bitLength()),r=0;r<i.length;r++){var h=r/26|0,n=r%26;i[r]=(t.words[h]&1<<n)>>>n}return i}function u(t,i,r){r.negative=i.negative^t.negative;var h=t.length+i.length|0;r.length=h,h=h-1|0;var n=0|t.words[0],e=0|i.words[0],o=n*e,s=67108863&o,u=o/67108864|0;r.words[0]=s;for(var a=1;h>a;a++){for(var l=u>>>26,m=67108863&u,f=Math.min(a,i.length-1),d=Math.max(0,a-t.length+1);f>=d;d++){var p=a-d|0;n=0|t.words[p],e=0|i.words[d],o=n*e+m,l+=o/67108864|0,m=67108863&o}r.words[a]=0|m,u=0|l}return 0!==u?r.words[a]=0|u:r.length--,r.strip()}function a(t,i,r){r.negative=i.negative^t.negative,r.length=t.length+i.length;for(var h=0,n=0,e=0;e<r.length-1;e++){var o=n;n=0;for(var s=67108863&h,u=Math.min(e,i.length-1),a=Math.max(0,e-t.length+1);u>=a;a++){var l=e-a,m=0|t.words[l],f=0|i.words[a],d=m*f,p=67108863&d;o=o+(d/67108864|0)|0,p=p+s|0,s=67108863&p,o=o+(p>>>26)|0,n+=o>>>26,o&=67108863}r.words[e]=s,h=o,o=n}return 0!==h?r.words[e]=h:r.length--,r.strip()}function l(t,i,r){var h=new m;return h.mulp(t,i,r)}function m(t,i){this.x=t,this.y=i}function f(t,i){this.name=t,this.p=new n(i,16),this.n=this.p.bitLength(),this.k=new n(1).iushln(this.n).isub(this.p),this.tmp=this._tmp()}function d(){f.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function p(){f.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function M(){f.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function v(){f.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function g(t){if("string"==typeof t){var i=n._prime(t);this.m=i.p,this.prime=i}else this.m=t,this.prime=null}function c(t){g.call(this,t),this.shift=this.m.bitLength(),this.shift%26!==0&&(this.shift+=26-this.shift%26),this.r=new n(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv)}"object"==typeof t?t.exports=n:i.BN=n,n.BN=n,n.wordSize=26;var w;try{w=require("buffer").Buffer}catch(y){}n.isBN=function(t){return null!==t&&"object"==typeof t&&"BN"===t.constructor.name&&Array.isArray(t.words)},n.max=function(t,i){return t.cmp(i)>0?t:i},n.min=function(t,i){return t.cmp(i)<0?t:i},n.prototype._init=function(t,i,h){if("number"==typeof t)return this._initNumber(t,i,h);if("object"==typeof t)return this._initArray(t,i,h);"hex"===i&&(i=16),r(i===(0|i)&&i>=2&&36>=i),t=t.toString().replace(/\s+/g,"");var n=0;"-"===t[0]&&n++,16===i?this._parseHex(t,n):this._parseBase(t,i,n),"-"===t[0]&&(this.negative=1),this.strip(),"le"===h&&this._initArray(this.toArray(),i,h)},n.prototype._initNumber=function(t,i,h){0>t&&(this.negative=1,t=-t),67108864>t?(this.words=[67108863&t],this.length=1):4503599627370496>t?(this.words=[67108863&t,t/67108864&67108863],this.length=2):(r(9007199254740992>t),this.words=[67108863&t,t/67108864&67108863,1],this.length=3),"le"===h&&this._initArray(this.toArray(),i,h)},n.prototype._initArray=function(t,i,h){if(r("number"==typeof t.length),t.length<=0)return this.words=[0],this.length=1,this;this.length=Math.ceil(t.length/3),this.words=new Array(this.length);for(var n=0;n<this.length;n++)this.words[n]=0;var e,o,s=0;if("be"===h)for(n=t.length-1,e=0;n>=0;n-=3)o=t[n]|t[n-1]<<8|t[n-2]<<16,this.words[e]|=o<<s&67108863,this.words[e+1]=o>>>26-s&67108863,s+=24,s>=26&&(s-=26,e++);else if("le"===h)for(n=0,e=0;n<t.length;n+=3)o=t[n]|t[n+1]<<8|t[n+2]<<16,this.words[e]|=o<<s&67108863,this.words[e+1]=o>>>26-s&67108863,s+=24,s>=26&&(s-=26,e++);return this.strip()},n.prototype._parseHex=function(t,i){this.length=Math.ceil((t.length-i)/6),this.words=new Array(this.length);for(var r=0;r<this.length;r++)this.words[r]=0;var h,n,o=0;for(r=t.length-6,h=0;r>=i;r-=6)n=e(t,r,r+6),this.words[h]|=n<<o&67108863,this.words[h+1]|=n>>>26-o&4194303,o+=24,o>=26&&(o-=26,h++);r+6!==i&&(n=e(t,i,r+6),this.words[h]|=n<<o&67108863,this.words[h+1]|=n>>>26-o&4194303),this.strip()},n.prototype._parseBase=function(t,i,r){this.words=[0],this.length=1;for(var h=0,n=1;67108863>=n;n*=i)h++;h--,n=n/i|0;for(var e=t.length-r,s=e%h,u=Math.min(e,e-s)+r,a=0,l=r;u>l;l+=h)a=o(t,l,l+h,i),this.imuln(n),this.words[0]+a<67108864?this.words[0]+=a:this._iaddn(a);if(0!==s){var m=1;for(a=o(t,l,t.length,i),l=0;s>l;l++)m*=i;this.imuln(m),this.words[0]+a<67108864?this.words[0]+=a:this._iaddn(a)}},n.prototype.copy=function(t){t.words=new Array(this.length);for(var i=0;i<this.length;i++)t.words[i]=this.words[i];t.length=this.length,t.negative=this.negative,t.red=this.red},n.prototype.clone=function(){var t=new n(null);return this.copy(t),t},n.prototype._expand=function(t){for(;this.length<t;)this.words[this.length++]=0;return this},n.prototype.strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},n.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.negative=0),this},n.prototype.inspect=function(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"};var b=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],_=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],k=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];n.prototype.toString=function(t,i){t=t||10,i=0|i||1;var h;if(16===t||"hex"===t){h="";for(var n=0,e=0,o=0;o<this.length;o++){var s=this.words[o],u=(16777215&(s<<n|e)).toString(16);e=s>>>24-n&16777215,h=0!==e||o!==this.length-1?b[6-u.length]+u+h:u+h,n+=2,n>=26&&(n-=26,o--)}for(0!==e&&(h=e.toString(16)+h);h.length%i!==0;)h="0"+h;return 0!==this.negative&&(h="-"+h),h}if(t===(0|t)&&t>=2&&36>=t){var a=_[t],l=k[t];h="";var m=this.clone();for(m.negative=0;!m.isZero();){var f=m.modn(l).toString(t);m=m.idivn(l),h=m.isZero()?f+h:b[a-f.length]+f+h}for(this.isZero()&&(h="0"+h);h.length%i!==0;)h="0"+h;return 0!==this.negative&&(h="-"+h),h}r(!1,"Base should be between 2 and 36")},n.prototype.toNumber=function(){var t,i=this.bitLength();return 26>=i?t=this.words[0]:52>=i?t=67108864*this.words[1]+this.words[0]:53===i?t=4503599627370496+67108864*this.words[1]+this.words[0]:r(!1,"Number can only safely store up to 53 bits"),0!==this.negative?-t:t},n.prototype.toJSON=function(){return this.toString(16)},n.prototype.toBuffer=function(t,i){return r("undefined"!=typeof w),this.toArrayLike(w,t,i)},n.prototype.toArray=function(t,i){return this.toArrayLike(Array,t,i)},n.prototype.toArrayLike=function(t,i,h){var n=this.byteLength(),e=h||Math.max(1,n);r(e>=n,"byte array longer than desired length"),r(e>0,"Requested array length <= 0"),this.strip();var o,s,u="le"===i,a=new t(e),l=this.clone();if(u){for(s=0;!l.isZero();s++)o=l.andln(255),l.iushrn(8),a[s]=o;for(;e>s;s++)a[s]=0}else{for(s=0;e-n>s;s++)a[s]=0;for(s=0;!l.isZero();s++)o=l.andln(255),l.iushrn(8),a[e-s-1]=o}return a},Math.clz32?n.prototype._countBits=function(t){return 32-Math.clz32(t)}:n.prototype._countBits=function(t){var i=t,r=0;return i>=4096&&(r+=13,i>>>=13),i>=64&&(r+=7,i>>>=7),i>=8&&(r+=4,i>>>=4),i>=2&&(r+=2,i>>>=2),r+i},n.prototype._zeroBits=function(t){if(0===t)return 26;var i=t,r=0;return 0===(8191&i)&&(r+=13,i>>>=13),0===(127&i)&&(r+=7,i>>>=7),0===(15&i)&&(r+=4,i>>>=4),0===(3&i)&&(r+=2,i>>>=2),0===(1&i)&&r++,r},n.prototype.bitLength=function(){var t=this.words[this.length-1],i=this._countBits(t);return 26*(this.length-1)+i},n.prototype.zeroBits=function(){if(this.isZero())return 0;for(var t=0,i=0;i<this.length;i++){var r=this._zeroBits(this.words[i]);if(t+=r,26!==r)break}return t},n.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},n.prototype.toTwos=function(t){return 0!==this.negative?this.abs().inotn(t).iaddn(1):this.clone()},n.prototype.fromTwos=function(t){return this.testn(t-1)?this.notn(t).iaddn(1).ineg():this.clone()},n.prototype.isNeg=function(){return 0!==this.negative},n.prototype.neg=function(){return this.clone().ineg()},n.prototype.ineg=function(){return this.isZero()||(this.negative^=1),this},n.prototype.iuor=function(t){for(;this.length<t.length;)this.words[this.length++]=0;for(var i=0;i<t.length;i++)this.words[i]=this.words[i]|t.words[i];return this.strip()},n.prototype.ior=function(t){return r(0===(this.negative|t.negative)),this.iuor(t)},n.prototype.or=function(t){return this.length>t.length?this.clone().ior(t):t.clone().ior(this)},n.prototype.uor=function(t){return this.length>t.length?this.clone().iuor(t):t.clone().iuor(this)},n.prototype.iuand=function(t){var i;i=this.length>t.length?t:this;for(var r=0;r<i.length;r++)this.words[r]=this.words[r]&t.words[r];return this.length=i.length,this.strip()},n.prototype.iand=function(t){return r(0===(this.negative|t.negative)),this.iuand(t)},n.prototype.and=function(t){return this.length>t.length?this.clone().iand(t):t.clone().iand(this)},n.prototype.uand=function(t){return this.length>t.length?this.clone().iuand(t):t.clone().iuand(this)},n.prototype.iuxor=function(t){var i,r;this.length>t.length?(i=this,r=t):(i=t,r=this);for(var h=0;h<r.length;h++)this.words[h]=i.words[h]^r.words[h];if(this!==i)for(;h<i.length;h++)this.words[h]=i.words[h];return this.length=i.length,this.strip()},n.prototype.ixor=function(t){return r(0===(this.negative|t.negative)),this.iuxor(t)},n.prototype.xor=function(t){return this.length>t.length?this.clone().ixor(t):t.clone().ixor(this)},n.prototype.uxor=function(t){return this.length>t.length?this.clone().iuxor(t):t.clone().iuxor(this)},n.prototype.inotn=function(t){r("number"==typeof t&&t>=0);var i=0|Math.ceil(t/26),h=t%26;this._expand(i),h>0&&i--;for(var n=0;i>n;n++)this.words[n]=67108863&~this.words[n];return h>0&&(this.words[n]=~this.words[n]&67108863>>26-h),this.strip()},n.prototype.notn=function(t){return this.clone().inotn(t)},n.prototype.setn=function(t,i){r("number"==typeof t&&t>=0);var h=t/26|0,n=t%26;return this._expand(h+1),i?this.words[h]=this.words[h]|1<<n:this.words[h]=this.words[h]&~(1<<n),this.strip()},n.prototype.iadd=function(t){var i;if(0!==this.negative&&0===t.negative)return this.negative=0,i=this.isub(t),this.negative^=1,this._normSign();if(0===this.negative&&0!==t.negative)return t.negative=0,i=this.isub(t),t.negative=1,i._normSign();var r,h;this.length>t.length?(r=this,h=t):(r=t,h=this);for(var n=0,e=0;e<h.length;e++)i=(0|r.words[e])+(0|h.words[e])+n,this.words[e]=67108863&i,n=i>>>26;for(;0!==n&&e<r.length;e++)i=(0|r.words[e])+n,this.words[e]=67108863&i,n=i>>>26;if(this.length=r.length,0!==n)this.words[this.length]=n,this.length++;else if(r!==this)for(;e<r.length;e++)this.words[e]=r.words[e];return this},n.prototype.add=function(t){var i;return 0!==t.negative&&0===this.negative?(t.negative=0,i=this.sub(t),t.negative^=1,i):0===t.negative&&0!==this.negative?(this.negative=0,i=t.sub(this),this.negative=1,i):this.length>t.length?this.clone().iadd(t):t.clone().iadd(this)},n.prototype.isub=function(t){if(0!==t.negative){t.negative=0;var i=this.iadd(t);return t.negative=1,i._normSign()}if(0!==this.negative)return this.negative=0,this.iadd(t),this.negative=1,this._normSign();var r=this.cmp(t);if(0===r)return this.negative=0,this.length=1,this.words[0]=0,this;var h,n;r>0?(h=this,n=t):(h=t,n=this);for(var e=0,o=0;o<n.length;o++)i=(0|h.words[o])-(0|n.words[o])+e,e=i>>26,this.words[o]=67108863&i;for(;0!==e&&o<h.length;o++)i=(0|h.words[o])+e,e=i>>26,this.words[o]=67108863&i;if(0===e&&o<h.length&&h!==this)for(;o<h.length;o++)this.words[o]=h.words[o];return this.length=Math.max(this.length,o),h!==this&&(this.negative=1),this.strip()},n.prototype.sub=function(t){return this.clone().isub(t)};var A=function(t,i,r){var h,n,e,o=t.words,s=i.words,u=r.words,a=0,l=0|o[0],m=8191&l,f=l>>>13,d=0|o[1],p=8191&d,M=d>>>13,v=0|o[2],g=8191&v,c=v>>>13,w=0|o[3],y=8191&w,b=w>>>13,_=0|o[4],k=8191&_,A=_>>>13,x=0|o[5],S=8191&x,Z=x>>>13,q=0|o[6],B=8191&q,R=q>>>13,N=0|o[7],L=8191&N,I=N>>>13,T=0|o[8],E=8191&T,z=T>>>13,O=0|o[9],j=8191&O,K=O>>>13,P=0|s[0],F=8191&P,C=P>>>13,D=0|s[1],H=8191&D,J=D>>>13,U=0|s[2],G=8191&U,Q=U>>>13,V=0|s[3],W=8191&V,X=V>>>13,Y=0|s[4],$=8191&Y,tt=Y>>>13,it=0|s[5],rt=8191&it,ht=it>>>13,nt=0|s[6],et=8191&nt,ot=nt>>>13,st=0|s[7],ut=8191&st,at=st>>>13,lt=0|s[8],mt=8191&lt,ft=lt>>>13,dt=0|s[9],pt=8191&dt,Mt=dt>>>13;r.negative=t.negative^i.negative,r.length=19,h=Math.imul(m,F),n=Math.imul(m,C),n+=Math.imul(f,F),e=Math.imul(f,C);var vt=a+h+((8191&n)<<13);a=e+(n>>>13)+(vt>>>26),vt&=67108863,h=Math.imul(p,F),n=Math.imul(p,C),n+=Math.imul(M,F),e=Math.imul(M,C),h+=Math.imul(m,H),n+=Math.imul(m,J),n+=Math.imul(f,H),e+=Math.imul(f,J);var gt=a+h+((8191&n)<<13);a=e+(n>>>13)+(gt>>>26),gt&=67108863,h=Math.imul(g,F),n=Math.imul(g,C),n+=Math.imul(c,F),e=Math.imul(c,C),h+=Math.imul(p,H),n+=Math.imul(p,J),n+=Math.imul(M,H),e+=Math.imul(M,J),h+=Math.imul(m,G),n+=Math.imul(m,Q),n+=Math.imul(f,G),e+=Math.imul(f,Q);var ct=a+h+((8191&n)<<13);a=e+(n>>>13)+(ct>>>26),ct&=67108863,h=Math.imul(y,F),n=Math.imul(y,C),n+=Math.imul(b,F),e=Math.imul(b,C),h+=Math.imul(g,H),n+=Math.imul(g,J),n+=Math.imul(c,H),e+=Math.imul(c,J),h+=Math.imul(p,G),n+=Math.imul(p,Q),n+=Math.imul(M,G),e+=Math.imul(M,Q),h+=Math.imul(m,W),n+=Math.imul(m,X),n+=Math.imul(f,W),e+=Math.imul(f,X);var wt=a+h+((8191&n)<<13);a=e+(n>>>13)+(wt>>>26),wt&=67108863,h=Math.imul(k,F),n=Math.imul(k,C),n+=Math.imul(A,F),e=Math.imul(A,C),h+=Math.imul(y,H),n+=Math.imul(y,J),n+=Math.imul(b,H),e+=Math.imul(b,J),h+=Math.imul(g,G),n+=Math.imul(g,Q),n+=Math.imul(c,G),e+=Math.imul(c,Q),h+=Math.imul(p,W),n+=Math.imul(p,X),n+=Math.imul(M,W),e+=Math.imul(M,X),h+=Math.imul(m,$),n+=Math.imul(m,tt),n+=Math.imul(f,$),e+=Math.imul(f,tt);var yt=a+h+((8191&n)<<13);a=e+(n>>>13)+(yt>>>26),yt&=67108863,h=Math.imul(S,F),n=Math.imul(S,C),n+=Math.imul(Z,F),e=Math.imul(Z,C),h+=Math.imul(k,H),n+=Math.imul(k,J),n+=Math.imul(A,H),e+=Math.imul(A,J),h+=Math.imul(y,G),n+=Math.imul(y,Q),n+=Math.imul(b,G),e+=Math.imul(b,Q),h+=Math.imul(g,W),n+=Math.imul(g,X),n+=Math.imul(c,W),e+=Math.imul(c,X),h+=Math.imul(p,$),n+=Math.imul(p,tt),n+=Math.imul(M,$),e+=Math.imul(M,tt),h+=Math.imul(m,rt),n+=Math.imul(m,ht),n+=Math.imul(f,rt),e+=Math.imul(f,ht);var bt=a+h+((8191&n)<<13);a=e+(n>>>13)+(bt>>>26),bt&=67108863,h=Math.imul(B,F),n=Math.imul(B,C),n+=Math.imul(R,F),e=Math.imul(R,C),h+=Math.imul(S,H),n+=Math.imul(S,J),n+=Math.imul(Z,H),e+=Math.imul(Z,J),h+=Math.imul(k,G),n+=Math.imul(k,Q),n+=Math.imul(A,G),e+=Math.imul(A,Q),h+=Math.imul(y,W),n+=Math.imul(y,X),n+=Math.imul(b,W),e+=Math.imul(b,X),h+=Math.imul(g,$),n+=Math.imul(g,tt),n+=Math.imul(c,$),e+=Math.imul(c,tt),h+=Math.imul(p,rt),n+=Math.imul(p,ht),n+=Math.imul(M,rt),e+=Math.imul(M,ht),h+=Math.imul(m,et),n+=Math.imul(m,ot),n+=Math.imul(f,et),e+=Math.imul(f,ot);var _t=a+h+((8191&n)<<13);a=e+(n>>>13)+(_t>>>26),_t&=67108863,h=Math.imul(L,F),n=Math.imul(L,C),n+=Math.imul(I,F),e=Math.imul(I,C),h+=Math.imul(B,H),n+=Math.imul(B,J),n+=Math.imul(R,H),e+=Math.imul(R,J),h+=Math.imul(S,G),n+=Math.imul(S,Q),n+=Math.imul(Z,G),e+=Math.imul(Z,Q),h+=Math.imul(k,W),n+=Math.imul(k,X),n+=Math.imul(A,W),e+=Math.imul(A,X),h+=Math.imul(y,$),n+=Math.imul(y,tt),n+=Math.imul(b,$),e+=Math.imul(b,tt),h+=Math.imul(g,rt),n+=Math.imul(g,ht),n+=Math.imul(c,rt),e+=Math.imul(c,ht),h+=Math.imul(p,et),n+=Math.imul(p,ot),n+=Math.imul(M,et),e+=Math.imul(M,ot),h+=Math.imul(m,ut),n+=Math.imul(m,at),n+=Math.imul(f,ut),e+=Math.imul(f,at);var kt=a+h+((8191&n)<<13);a=e+(n>>>13)+(kt>>>26),kt&=67108863,h=Math.imul(E,F),n=Math.imul(E,C),n+=Math.imul(z,F),e=Math.imul(z,C),h+=Math.imul(L,H),n+=Math.imul(L,J),n+=Math.imul(I,H),e+=Math.imul(I,J),h+=Math.imul(B,G),n+=Math.imul(B,Q),n+=Math.imul(R,G),e+=Math.imul(R,Q),h+=Math.imul(S,W),n+=Math.imul(S,X),n+=Math.imul(Z,W),e+=Math.imul(Z,X),h+=Math.imul(k,$),n+=Math.imul(k,tt),n+=Math.imul(A,$),e+=Math.imul(A,tt),h+=Math.imul(y,rt),n+=Math.imul(y,ht),n+=Math.imul(b,rt),e+=Math.imul(b,ht),h+=Math.imul(g,et),n+=Math.imul(g,ot),n+=Math.imul(c,et),e+=Math.imul(c,ot),h+=Math.imul(p,ut),n+=Math.imul(p,at),n+=Math.imul(M,ut),e+=Math.imul(M,at),h+=Math.imul(m,mt),n+=Math.imul(m,ft),n+=Math.imul(f,mt),e+=Math.imul(f,ft);var At=a+h+((8191&n)<<13);a=e+(n>>>13)+(At>>>26),At&=67108863,h=Math.imul(j,F),n=Math.imul(j,C),n+=Math.imul(K,F),e=Math.imul(K,C),h+=Math.imul(E,H),n+=Math.imul(E,J),n+=Math.imul(z,H),e+=Math.imul(z,J),h+=Math.imul(L,G),n+=Math.imul(L,Q),n+=Math.imul(I,G),e+=Math.imul(I,Q),h+=Math.imul(B,W),n+=Math.imul(B,X),n+=Math.imul(R,W),e+=Math.imul(R,X),h+=Math.imul(S,$),n+=Math.imul(S,tt),n+=Math.imul(Z,$),e+=Math.imul(Z,tt),h+=Math.imul(k,rt),n+=Math.imul(k,ht),n+=Math.imul(A,rt),e+=Math.imul(A,ht),h+=Math.imul(y,et),n+=Math.imul(y,ot),n+=Math.imul(b,et),e+=Math.imul(b,ot),h+=Math.imul(g,ut),n+=Math.imul(g,at),n+=Math.imul(c,ut),e+=Math.imul(c,at),h+=Math.imul(p,mt),n+=Math.imul(p,ft),n+=Math.imul(M,mt),e+=Math.imul(M,ft),h+=Math.imul(m,pt),n+=Math.imul(m,Mt),n+=Math.imul(f,pt),e+=Math.imul(f,Mt);var xt=a+h+((8191&n)<<13);a=e+(n>>>13)+(xt>>>26),xt&=67108863,h=Math.imul(j,H),n=Math.imul(j,J),n+=Math.imul(K,H),e=Math.imul(K,J),h+=Math.imul(E,G),n+=Math.imul(E,Q),n+=Math.imul(z,G),e+=Math.imul(z,Q),h+=Math.imul(L,W),n+=Math.imul(L,X),n+=Math.imul(I,W),e+=Math.imul(I,X),h+=Math.imul(B,$),n+=Math.imul(B,tt),n+=Math.imul(R,$),e+=Math.imul(R,tt),h+=Math.imul(S,rt),n+=Math.imul(S,ht),n+=Math.imul(Z,rt),e+=Math.imul(Z,ht),h+=Math.imul(k,et),n+=Math.imul(k,ot),n+=Math.imul(A,et),e+=Math.imul(A,ot),h+=Math.imul(y,ut),n+=Math.imul(y,at),n+=Math.imul(b,ut),e+=Math.imul(b,at),h+=Math.imul(g,mt),n+=Math.imul(g,ft),n+=Math.imul(c,mt),e+=Math.imul(c,ft),h+=Math.imul(p,pt),n+=Math.imul(p,Mt),n+=Math.imul(M,pt),e+=Math.imul(M,Mt);var St=a+h+((8191&n)<<13);a=e+(n>>>13)+(St>>>26),St&=67108863,h=Math.imul(j,G),n=Math.imul(j,Q),n+=Math.imul(K,G),e=Math.imul(K,Q),h+=Math.imul(E,W),n+=Math.imul(E,X),n+=Math.imul(z,W),e+=Math.imul(z,X),h+=Math.imul(L,$),n+=Math.imul(L,tt),n+=Math.imul(I,$),e+=Math.imul(I,tt),h+=Math.imul(B,rt),n+=Math.imul(B,ht),n+=Math.imul(R,rt),e+=Math.imul(R,ht),h+=Math.imul(S,et),n+=Math.imul(S,ot),n+=Math.imul(Z,et),e+=Math.imul(Z,ot),h+=Math.imul(k,ut),n+=Math.imul(k,at),n+=Math.imul(A,ut),e+=Math.imul(A,at),h+=Math.imul(y,mt),n+=Math.imul(y,ft),n+=Math.imul(b,mt),e+=Math.imul(b,ft),h+=Math.imul(g,pt),n+=Math.imul(g,Mt),n+=Math.imul(c,pt),e+=Math.imul(c,Mt);var Zt=a+h+((8191&n)<<13);a=e+(n>>>13)+(Zt>>>26),Zt&=67108863,h=Math.imul(j,W),n=Math.imul(j,X),n+=Math.imul(K,W),e=Math.imul(K,X),h+=Math.imul(E,$),n+=Math.imul(E,tt),n+=Math.imul(z,$),e+=Math.imul(z,tt),h+=Math.imul(L,rt),n+=Math.imul(L,ht),n+=Math.imul(I,rt),e+=Math.imul(I,ht),h+=Math.imul(B,et),n+=Math.imul(B,ot),n+=Math.imul(R,et),e+=Math.imul(R,ot),h+=Math.imul(S,ut),n+=Math.imul(S,at),n+=Math.imul(Z,ut),e+=Math.imul(Z,at),h+=Math.imul(k,mt),n+=Math.imul(k,ft),n+=Math.imul(A,mt),e+=Math.imul(A,ft),h+=Math.imul(y,pt),n+=Math.imul(y,Mt),n+=Math.imul(b,pt),e+=Math.imul(b,Mt);var qt=a+h+((8191&n)<<13);a=e+(n>>>13)+(qt>>>26),qt&=67108863,h=Math.imul(j,$),n=Math.imul(j,tt),n+=Math.imul(K,$),e=Math.imul(K,tt),h+=Math.imul(E,rt),n+=Math.imul(E,ht),n+=Math.imul(z,rt),e+=Math.imul(z,ht),h+=Math.imul(L,et),n+=Math.imul(L,ot),n+=Math.imul(I,et),e+=Math.imul(I,ot),h+=Math.imul(B,ut),n+=Math.imul(B,at),n+=Math.imul(R,ut),e+=Math.imul(R,at),h+=Math.imul(S,mt),n+=Math.imul(S,ft),n+=Math.imul(Z,mt),e+=Math.imul(Z,ft),h+=Math.imul(k,pt),n+=Math.imul(k,Mt),n+=Math.imul(A,pt),e+=Math.imul(A,Mt);var Bt=a+h+((8191&n)<<13);a=e+(n>>>13)+(Bt>>>26),Bt&=67108863,h=Math.imul(j,rt),n=Math.imul(j,ht),n+=Math.imul(K,rt),e=Math.imul(K,ht),h+=Math.imul(E,et),n+=Math.imul(E,ot),n+=Math.imul(z,et),e+=Math.imul(z,ot),h+=Math.imul(L,ut),n+=Math.imul(L,at),n+=Math.imul(I,ut),e+=Math.imul(I,at),h+=Math.imul(B,mt),n+=Math.imul(B,ft),n+=Math.imul(R,mt),e+=Math.imul(R,ft),h+=Math.imul(S,pt),n+=Math.imul(S,Mt),n+=Math.imul(Z,pt),e+=Math.imul(Z,Mt);var Rt=a+h+((8191&n)<<13);a=e+(n>>>13)+(Rt>>>26),Rt&=67108863,h=Math.imul(j,et),n=Math.imul(j,ot),n+=Math.imul(K,et),e=Math.imul(K,ot),h+=Math.imul(E,ut),n+=Math.imul(E,at),n+=Math.imul(z,ut),e+=Math.imul(z,at),h+=Math.imul(L,mt),n+=Math.imul(L,ft),n+=Math.imul(I,mt),e+=Math.imul(I,ft),h+=Math.imul(B,pt),n+=Math.imul(B,Mt),n+=Math.imul(R,pt),e+=Math.imul(R,Mt);var Nt=a+h+((8191&n)<<13);a=e+(n>>>13)+(Nt>>>26),Nt&=67108863,h=Math.imul(j,ut),n=Math.imul(j,at),n+=Math.imul(K,ut),e=Math.imul(K,at),h+=Math.imul(E,mt),n+=Math.imul(E,ft),n+=Math.imul(z,mt),e+=Math.imul(z,ft),h+=Math.imul(L,pt),n+=Math.imul(L,Mt),n+=Math.imul(I,pt),e+=Math.imul(I,Mt);var Lt=a+h+((8191&n)<<13);a=e+(n>>>13)+(Lt>>>26),Lt&=67108863,h=Math.imul(j,mt),n=Math.imul(j,ft),n+=Math.imul(K,mt),e=Math.imul(K,ft),h+=Math.imul(E,pt),n+=Math.imul(E,Mt),n+=Math.imul(z,pt),e+=Math.imul(z,Mt);var It=a+h+((8191&n)<<13);a=e+(n>>>13)+(It>>>26),It&=67108863,h=Math.imul(j,pt),n=Math.imul(j,Mt),n+=Math.imul(K,pt),e=Math.imul(K,Mt);var Tt=a+h+((8191&n)<<13);return a=e+(n>>>13)+(Tt>>>26),Tt&=67108863,u[0]=vt,u[1]=gt,u[2]=ct,u[3]=wt,u[4]=yt,u[5]=bt,u[6]=_t,u[7]=kt,u[8]=At,u[9]=xt,u[10]=St,u[11]=Zt,u[12]=qt,u[13]=Bt,u[14]=Rt,u[15]=Nt,u[16]=Lt,u[17]=It,u[18]=Tt,0!==a&&(u[19]=a,r.length++),r};Math.imul||(A=u),n.prototype.mulTo=function(t,i){var r,h=this.length+t.length;return r=10===this.length&&10===t.length?A(this,t,i):63>h?u(this,t,i):1024>h?a(this,t,i):l(this,t,i)},m.prototype.makeRBT=function(t){for(var i=new Array(t),r=n.prototype._countBits(t)-1,h=0;t>h;h++)i[h]=this.revBin(h,r,t);return i},m.prototype.revBin=function(t,i,r){if(0===t||t===r-1)return t;for(var h=0,n=0;i>n;n++)h|=(1&t)<<i-n-1,t>>=1;return h},m.prototype.permute=function(t,i,r,h,n,e){for(var o=0;e>o;o++)h[o]=i[t[o]],n[o]=r[t[o]]},m.prototype.transform=function(t,i,r,h,n,e){this.permute(e,t,i,r,h,n);for(var o=1;n>o;o<<=1)for(var s=o<<1,u=Math.cos(2*Math.PI/s),a=Math.sin(2*Math.PI/s),l=0;n>l;l+=s)for(var m=u,f=a,d=0;o>d;d++){var p=r[l+d],M=h[l+d],v=r[l+d+o],g=h[l+d+o],c=m*v-f*g;g=m*g+f*v,v=c,r[l+d]=p+v,h[l+d]=M+g,r[l+d+o]=p-v,h[l+d+o]=M-g,d!==s&&(c=u*m-a*f,f=u*f+a*m,m=c)}},m.prototype.guessLen13b=function(t,i){var r=1|Math.max(i,t),h=1&r,n=0;for(r=r/2|0;r;r>>>=1)n++;return 1<<n+1+h},m.prototype.conjugate=function(t,i,r){if(!(1>=r))for(var h=0;r/2>h;h++){var n=t[h];t[h]=t[r-h-1],t[r-h-1]=n,n=i[h],i[h]=-i[r-h-1],i[r-h-1]=-n}},m.prototype.normalize13b=function(t,i){for(var r=0,h=0;i/2>h;h++){var n=8192*Math.round(t[2*h+1]/i)+Math.round(t[2*h]/i)+r;t[h]=67108863&n,r=67108864>n?0:n/67108864|0}return t},m.prototype.convert13b=function(t,i,h,n){for(var e=0,o=0;i>o;o++)e+=0|t[o],h[2*o]=8191&e,e>>>=13,h[2*o+1]=8191&e,e>>>=13;for(o=2*i;n>o;++o)h[o]=0;r(0===e),r(0===(-8192&e))},m.prototype.stub=function(t){for(var i=new Array(t),r=0;t>r;r++)i[r]=0;return i},m.prototype.mulp=function(t,i,r){var h=2*this.guessLen13b(t.length,i.length),n=this.makeRBT(h),e=this.stub(h),o=new Array(h),s=new Array(h),u=new Array(h),a=new Array(h),l=new Array(h),m=new Array(h),f=r.words;f.length=h,this.convert13b(t.words,t.length,o,h),this.convert13b(i.words,i.length,a,h),this.transform(o,e,s,u,h,n),this.transform(a,e,l,m,h,n);for(var d=0;h>d;d++){var p=s[d]*l[d]-u[d]*m[d];u[d]=s[d]*m[d]+u[d]*l[d],s[d]=p}return this.conjugate(s,u,h),this.transform(s,u,f,e,h,n),this.conjugate(f,e,h),this.normalize13b(f,h),r.negative=t.negative^i.negative,r.length=t.length+i.length,r.strip()},n.prototype.mul=function(t){var i=new n(null);return i.words=new Array(this.length+t.length),this.mulTo(t,i)},n.prototype.mulf=function(t){var i=new n(null);return i.words=new Array(this.length+t.length),l(this,t,i)},n.prototype.imul=function(t){return this.clone().mulTo(t,this)},n.prototype.imuln=function(t){r("number"==typeof t),r(67108864>t);for(var i=0,h=0;h<this.length;h++){var n=(0|this.words[h])*t,e=(67108863&n)+(67108863&i);i>>=26,i+=n/67108864|0,i+=e>>>26,this.words[h]=67108863&e}return 0!==i&&(this.words[h]=i,this.length++),this},n.prototype.muln=function(t){return this.clone().imuln(t)},n.prototype.sqr=function(){return this.mul(this)},n.prototype.isqr=function(){return this.imul(this.clone())},n.prototype.pow=function(t){var i=s(t);if(0===i.length)return new n(1);for(var r=this,h=0;h<i.length&&0===i[h];h++,r=r.sqr());if(++h<i.length)for(var e=r.sqr();h<i.length;h++,e=e.sqr())0!==i[h]&&(r=r.mul(e));return r},n.prototype.iushln=function(t){r("number"==typeof t&&t>=0);var i,h=t%26,n=(t-h)/26,e=67108863>>>26-h<<26-h;if(0!==h){var o=0;for(i=0;i<this.length;i++){var s=this.words[i]&e,u=(0|this.words[i])-s<<h;this.words[i]=u|o,o=s>>>26-h}o&&(this.words[i]=o,this.length++)}if(0!==n){for(i=this.length-1;i>=0;i--)this.words[i+n]=this.words[i];for(i=0;n>i;i++)this.words[i]=0;this.length+=n}return this.strip()},n.prototype.ishln=function(t){return r(0===this.negative),this.iushln(t)},n.prototype.iushrn=function(t,i,h){r("number"==typeof t&&t>=0);var n;n=i?(i-i%26)/26:0;var e=t%26,o=Math.min((t-e)/26,this.length),s=67108863^67108863>>>e<<e,u=h;if(n-=o,n=Math.max(0,n),u){for(var a=0;o>a;a++)u.words[a]=this.words[a];u.length=o}if(0===o);else if(this.length>o)for(this.length-=o,a=0;a<this.length;a++)this.words[a]=this.words[a+o];else this.words[0]=0,this.length=1;var l=0;for(a=this.length-1;a>=0&&(0!==l||a>=n);a--){var m=0|this.words[a];this.words[a]=l<<26-e|m>>>e,l=m&s}return u&&0!==l&&(u.words[u.length++]=l),0===this.length&&(this.words[0]=0,this.length=1),this.strip()},n.prototype.ishrn=function(t,i,h){return r(0===this.negative),this.iushrn(t,i,h)},n.prototype.shln=function(t){return this.clone().ishln(t)},n.prototype.ushln=function(t){return this.clone().iushln(t)},n.prototype.shrn=function(t){return this.clone().ishrn(t)},n.prototype.ushrn=function(t){return this.clone().iushrn(t)},n.prototype.testn=function(t){r("number"==typeof t&&t>=0);var i=t%26,h=(t-i)/26,n=1<<i;if(this.length<=h)return!1;var e=this.words[h];return!!(e&n)},n.prototype.imaskn=function(t){r("number"==typeof t&&t>=0);var i=t%26,h=(t-i)/26;if(r(0===this.negative,"imaskn works only with positive numbers"),0!==i&&h++,this.length=Math.min(h,this.length),0!==i){var n=67108863^67108863>>>i<<i;this.words[this.length-1]&=n}return this.strip()},n.prototype.maskn=function(t){return this.clone().imaskn(t)},n.prototype.iaddn=function(t){return r("number"==typeof t),r(67108864>t),0>t?this.isubn(-t):0!==this.negative?1===this.length&&(0|this.words[0])<t?(this.words[0]=t-(0|this.words[0]),this.negative=0,this):(this.negative=0,this.isubn(t),this.negative=1,this):this._iaddn(t)},n.prototype._iaddn=function(t){this.words[0]+=t;for(var i=0;i<this.length&&this.words[i]>=67108864;i++)this.words[i]-=67108864,i===this.length-1?this.words[i+1]=1:this.words[i+1]++;return this.length=Math.max(this.length,i+1),this},n.prototype.isubn=function(t){if(r("number"==typeof t),r(67108864>t),0>t)return this.iaddn(-t);if(0!==this.negative)return this.negative=0,this.iaddn(t),this.negative=1,this;if(this.words[0]-=t,1===this.length&&this.words[0]<0)this.words[0]=-this.words[0],this.negative=1;else for(var i=0;i<this.length&&this.words[i]<0;i++)this.words[i]+=67108864,this.words[i+1]-=1;return this.strip()},n.prototype.addn=function(t){return this.clone().iaddn(t)},n.prototype.subn=function(t){return this.clone().isubn(t)},n.prototype.iabs=function(){return this.negative=0,this},n.prototype.abs=function(){return this.clone().iabs()},n.prototype._ishlnsubmul=function(t,i,h){var n,e=t.length+h;this._expand(e);var o,s=0;for(n=0;n<t.length;n++){o=(0|this.words[n+h])+s;var u=(0|t.words[n])*i;o-=67108863&u,s=(o>>26)-(u/67108864|0),this.words[n+h]=67108863&o}for(;n<this.length-h;n++)o=(0|this.words[n+h])+s,s=o>>26,this.words[n+h]=67108863&o;if(0===s)return this.strip();for(r(-1===s),s=0,n=0;n<this.length;n++)o=-(0|this.words[n])+s,s=o>>26,this.words[n]=67108863&o;return this.negative=1,this.strip()},n.prototype._wordDiv=function(t,i){var r=this.length-t.length,h=this.clone(),e=t,o=0|e.words[e.length-1],s=this._countBits(o);r=26-s,0!==r&&(e=e.ushln(r),h.iushln(r),o=0|e.words[e.length-1]);var u,a=h.length-e.length;if("mod"!==i){u=new n(null),u.length=a+1,u.words=new Array(u.length);for(var l=0;l<u.length;l++)u.words[l]=0}var m=h.clone()._ishlnsubmul(e,1,a);0===m.negative&&(h=m,u&&(u.words[a]=1));for(var f=a-1;f>=0;f--){var d=67108864*(0|h.words[e.length+f])+(0|h.words[e.length+f-1]);for(d=Math.min(d/o|0,67108863),h._ishlnsubmul(e,d,f);0!==h.negative;)d--,h.negative=0,h._ishlnsubmul(e,1,f),h.isZero()||(h.negative^=1);u&&(u.words[f]=d)}return u&&u.strip(),h.strip(),"div"!==i&&0!==r&&h.iushrn(r),{div:u||null,mod:h}},n.prototype.divmod=function(t,i,h){if(r(!t.isZero()),this.isZero())return{div:new n(0),mod:new n(0)};var e,o,s;return 0!==this.negative&&0===t.negative?(s=this.neg().divmod(t,i),"mod"!==i&&(e=s.div.neg()),"div"!==i&&(o=s.mod.neg(),h&&0!==o.negative&&o.iadd(t)),{div:e,mod:o}):0===this.negative&&0!==t.negative?(s=this.divmod(t.neg(),i),"mod"!==i&&(e=s.div.neg()),{div:e,mod:s.mod}):0!==(this.negative&t.negative)?(s=this.neg().divmod(t.neg(),i),"div"!==i&&(o=s.mod.neg(),h&&0!==o.negative&&o.isub(t)),{div:s.div,mod:o}):t.length>this.length||this.cmp(t)<0?{div:new n(0),mod:this}:1===t.length?"div"===i?{div:this.divn(t.words[0]),mod:null}:"mod"===i?{div:null,mod:new n(this.modn(t.words[0]))}:{div:this.divn(t.words[0]),mod:new n(this.modn(t.words[0]))}:this._wordDiv(t,i)},n.prototype.div=function(t){return this.divmod(t,"div",!1).div},n.prototype.mod=function(t){return this.divmod(t,"mod",!1).mod},n.prototype.umod=function(t){return this.divmod(t,"mod",!0).mod},n.prototype.divRound=function(t){var i=this.divmod(t);if(i.mod.isZero())return i.div;var r=0!==i.div.negative?i.mod.isub(t):i.mod,h=t.ushrn(1),n=t.andln(1),e=r.cmp(h);return 0>e||1===n&&0===e?i.div:0!==i.div.negative?i.div.isubn(1):i.div.iaddn(1)},n.prototype.modn=function(t){r(67108863>=t);for(var i=(1<<26)%t,h=0,n=this.length-1;n>=0;n--)h=(i*h+(0|this.words[n]))%t;return h},n.prototype.idivn=function(t){r(67108863>=t);for(var i=0,h=this.length-1;h>=0;h--){var n=(0|this.words[h])+67108864*i;this.words[h]=n/t|0,i=n%t}return this.strip()},n.prototype.divn=function(t){return this.clone().idivn(t)},n.prototype.egcd=function(t){r(0===t.negative),r(!t.isZero());var i=this,h=t.clone();i=0!==i.negative?i.umod(t):i.clone();for(var e=new n(1),o=new n(0),s=new n(0),u=new n(1),a=0;i.isEven()&&h.isEven();)i.iushrn(1),h.iushrn(1),++a;for(var l=h.clone(),m=i.clone();!i.isZero();){for(var f=0,d=1;0===(i.words[0]&d)&&26>f;++f,d<<=1);if(f>0)for(i.iushrn(f);f-- >0;)(e.isOdd()||o.isOdd())&&(e.iadd(l),o.isub(m)),e.iushrn(1),o.iushrn(1);for(var p=0,M=1;0===(h.words[0]&M)&&26>p;++p,M<<=1);if(p>0)for(h.iushrn(p);p-- >0;)(s.isOdd()||u.isOdd())&&(s.iadd(l),u.isub(m)),s.iushrn(1),u.iushrn(1);i.cmp(h)>=0?(i.isub(h),e.isub(s),o.isub(u)):(h.isub(i),s.isub(e),u.isub(o))}return{a:s,b:u,gcd:h.iushln(a)}},n.prototype._invmp=function(t){r(0===t.negative),r(!t.isZero());var i=this,h=t.clone();i=0!==i.negative?i.umod(t):i.clone();for(var e=new n(1),o=new n(0),s=h.clone();i.cmpn(1)>0&&h.cmpn(1)>0;){for(var u=0,a=1;0===(i.words[0]&a)&&26>u;++u,
a<<=1);if(u>0)for(i.iushrn(u);u-- >0;)e.isOdd()&&e.iadd(s),e.iushrn(1);for(var l=0,m=1;0===(h.words[0]&m)&&26>l;++l,m<<=1);if(l>0)for(h.iushrn(l);l-- >0;)o.isOdd()&&o.iadd(s),o.iushrn(1);i.cmp(h)>=0?(i.isub(h),e.isub(o)):(h.isub(i),o.isub(e))}var f;return f=0===i.cmpn(1)?e:o,f.cmpn(0)<0&&f.iadd(t),f},n.prototype.gcd=function(t){if(this.isZero())return t.abs();if(t.isZero())return this.abs();var i=this.clone(),r=t.clone();i.negative=0,r.negative=0;for(var h=0;i.isEven()&&r.isEven();h++)i.iushrn(1),r.iushrn(1);for(;;){for(;i.isEven();)i.iushrn(1);for(;r.isEven();)r.iushrn(1);var n=i.cmp(r);if(0>n){var e=i;i=r,r=e}else if(0===n||0===r.cmpn(1))break;i.isub(r)}return r.iushln(h)},n.prototype.invm=function(t){return this.egcd(t).a.umod(t)},n.prototype.isEven=function(){return 0===(1&this.words[0])},n.prototype.isOdd=function(){return 1===(1&this.words[0])},n.prototype.andln=function(t){return this.words[0]&t},n.prototype.bincn=function(t){r("number"==typeof t);var i=t%26,h=(t-i)/26,n=1<<i;if(this.length<=h)return this._expand(h+1),this.words[h]|=n,this;for(var e=n,o=h;0!==e&&o<this.length;o++){var s=0|this.words[o];s+=e,e=s>>>26,s&=67108863,this.words[o]=s}return 0!==e&&(this.words[o]=e,this.length++),this},n.prototype.isZero=function(){return 1===this.length&&0===this.words[0]},n.prototype.cmpn=function(t){var i=0>t;if(0!==this.negative&&!i)return-1;if(0===this.negative&&i)return 1;this.strip();var h;if(this.length>1)h=1;else{i&&(t=-t),r(67108863>=t,"Number is too big");var n=0|this.words[0];h=n===t?0:t>n?-1:1}return 0!==this.negative?0|-h:h},n.prototype.cmp=function(t){if(0!==this.negative&&0===t.negative)return-1;if(0===this.negative&&0!==t.negative)return 1;var i=this.ucmp(t);return 0!==this.negative?0|-i:i},n.prototype.ucmp=function(t){if(this.length>t.length)return 1;if(this.length<t.length)return-1;for(var i=0,r=this.length-1;r>=0;r--){var h=0|this.words[r],n=0|t.words[r];if(h!==n){n>h?i=-1:h>n&&(i=1);break}}return i},n.prototype.gtn=function(t){return 1===this.cmpn(t)},n.prototype.gt=function(t){return 1===this.cmp(t)},n.prototype.gten=function(t){return this.cmpn(t)>=0},n.prototype.gte=function(t){return this.cmp(t)>=0},n.prototype.ltn=function(t){return-1===this.cmpn(t)},n.prototype.lt=function(t){return-1===this.cmp(t)},n.prototype.lten=function(t){return this.cmpn(t)<=0},n.prototype.lte=function(t){return this.cmp(t)<=0},n.prototype.eqn=function(t){return 0===this.cmpn(t)},n.prototype.eq=function(t){return 0===this.cmp(t)},n.red=function(t){return new g(t)},n.prototype.toRed=function(t){return r(!this.red,"Already a number in reduction context"),r(0===this.negative,"red works only with positives"),t.convertTo(this)._forceRed(t)},n.prototype.fromRed=function(){return r(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},n.prototype._forceRed=function(t){return this.red=t,this},n.prototype.forceRed=function(t){return r(!this.red,"Already a number in reduction context"),this._forceRed(t)},n.prototype.redAdd=function(t){return r(this.red,"redAdd works only with red numbers"),this.red.add(this,t)},n.prototype.redIAdd=function(t){return r(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,t)},n.prototype.redSub=function(t){return r(this.red,"redSub works only with red numbers"),this.red.sub(this,t)},n.prototype.redISub=function(t){return r(this.red,"redISub works only with red numbers"),this.red.isub(this,t)},n.prototype.redShl=function(t){return r(this.red,"redShl works only with red numbers"),this.red.shl(this,t)},n.prototype.redMul=function(t){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.mul(this,t)},n.prototype.redIMul=function(t){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.imul(this,t)},n.prototype.redSqr=function(){return r(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},n.prototype.redISqr=function(){return r(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},n.prototype.redSqrt=function(){return r(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},n.prototype.redInvm=function(){return r(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},n.prototype.redNeg=function(){return r(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},n.prototype.redPow=function(t){return r(this.red&&!t.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,t)};var x={k256:null,p224:null,p192:null,p25519:null};f.prototype._tmp=function(){var t=new n(null);return t.words=new Array(Math.ceil(this.n/13)),t},f.prototype.ireduce=function(t){var i,r=t;do this.split(r,this.tmp),r=this.imulK(r),r=r.iadd(this.tmp),i=r.bitLength();while(i>this.n);var h=i<this.n?-1:r.ucmp(this.p);return 0===h?(r.words[0]=0,r.length=1):h>0?r.isub(this.p):r.strip(),r},f.prototype.split=function(t,i){t.iushrn(this.n,0,i)},f.prototype.imulK=function(t){return t.imul(this.k)},h(d,f),d.prototype.split=function(t,i){for(var r=4194303,h=Math.min(t.length,9),n=0;h>n;n++)i.words[n]=t.words[n];if(i.length=h,t.length<=9)return t.words[0]=0,void(t.length=1);var e=t.words[9];for(i.words[i.length++]=e&r,n=10;n<t.length;n++){var o=0|t.words[n];t.words[n-10]=(o&r)<<4|e>>>22,e=o}e>>>=22,t.words[n-10]=e,0===e&&t.length>10?t.length-=10:t.length-=9},d.prototype.imulK=function(t){t.words[t.length]=0,t.words[t.length+1]=0,t.length+=2;for(var i=0,r=0;r<t.length;r++){var h=0|t.words[r];i+=977*h,t.words[r]=67108863&i,i=64*h+(i/67108864|0)}return 0===t.words[t.length-1]&&(t.length--,0===t.words[t.length-1]&&t.length--),t},h(p,f),h(M,f),h(v,f),v.prototype.imulK=function(t){for(var i=0,r=0;r<t.length;r++){var h=19*(0|t.words[r])+i,n=67108863&h;h>>>=26,t.words[r]=n,i=h}return 0!==i&&(t.words[t.length++]=i),t},n._prime=function S(t){if(x[t])return x[t];var S;if("k256"===t)S=new d;else if("p224"===t)S=new p;else if("p192"===t)S=new M;else{if("p25519"!==t)throw new Error("Unknown prime "+t);S=new v}return x[t]=S,S},g.prototype._verify1=function(t){r(0===t.negative,"red works only with positives"),r(t.red,"red works only with red numbers")},g.prototype._verify2=function(t,i){r(0===(t.negative|i.negative),"red works only with positives"),r(t.red&&t.red===i.red,"red works only with red numbers")},g.prototype.imod=function(t){return this.prime?this.prime.ireduce(t)._forceRed(this):t.umod(this.m)._forceRed(this)},g.prototype.neg=function(t){return t.isZero()?t.clone():this.m.sub(t)._forceRed(this)},g.prototype.add=function(t,i){this._verify2(t,i);var r=t.add(i);return r.cmp(this.m)>=0&&r.isub(this.m),r._forceRed(this)},g.prototype.iadd=function(t,i){this._verify2(t,i);var r=t.iadd(i);return r.cmp(this.m)>=0&&r.isub(this.m),r},g.prototype.sub=function(t,i){this._verify2(t,i);var r=t.sub(i);return r.cmpn(0)<0&&r.iadd(this.m),r._forceRed(this)},g.prototype.isub=function(t,i){this._verify2(t,i);var r=t.isub(i);return r.cmpn(0)<0&&r.iadd(this.m),r},g.prototype.shl=function(t,i){return this._verify1(t),this.imod(t.ushln(i))},g.prototype.imul=function(t,i){return this._verify2(t,i),this.imod(t.imul(i))},g.prototype.mul=function(t,i){return this._verify2(t,i),this.imod(t.mul(i))},g.prototype.isqr=function(t){return this.imul(t,t.clone())},g.prototype.sqr=function(t){return this.mul(t,t)},g.prototype.sqrt=function(t){if(t.isZero())return t.clone();var i=this.m.andln(3);if(r(i%2===1),3===i){var h=this.m.add(new n(1)).iushrn(2);return this.pow(t,h)}for(var e=this.m.subn(1),o=0;!e.isZero()&&0===e.andln(1);)o++,e.iushrn(1);r(!e.isZero());var s=new n(1).toRed(this),u=s.redNeg(),a=this.m.subn(1).iushrn(1),l=this.m.bitLength();for(l=new n(2*l*l).toRed(this);0!==this.pow(l,a).cmp(u);)l.redIAdd(u);for(var m=this.pow(l,e),f=this.pow(t,e.addn(1).iushrn(1)),d=this.pow(t,e),p=o;0!==d.cmp(s);){for(var M=d,v=0;0!==M.cmp(s);v++)M=M.redSqr();r(p>v);var g=this.pow(m,new n(1).iushln(p-v-1));f=f.redMul(g),m=g.redSqr(),d=d.redMul(m),p=v}return f},g.prototype.invm=function(t){var i=t._invmp(this.m);return 0!==i.negative?(i.negative=0,this.imod(i).redNeg()):this.imod(i)},g.prototype.pow=function(t,i){if(i.isZero())return new n(1);if(0===i.cmpn(1))return t.clone();var r=4,h=new Array(1<<r);h[0]=new n(1).toRed(this),h[1]=t;for(var e=2;e<h.length;e++)h[e]=this.mul(h[e-1],t);var o=h[0],s=0,u=0,a=i.bitLength()%26;for(0===a&&(a=26),e=i.length-1;e>=0;e--){for(var l=i.words[e],m=a-1;m>=0;m--){var f=l>>m&1;o!==h[0]&&(o=this.sqr(o)),0!==f||0!==s?(s<<=1,s|=f,u++,(u===r||0===e&&0===m)&&(o=this.mul(o,h[s]),u=0,s=0)):u=0}a=26}return o},g.prototype.convertTo=function(t){var i=t.umod(this.m);return i===t?i.clone():i},g.prototype.convertFrom=function(t){var i=t.clone();return i.red=null,i},n.mont=function(t){return new c(t)},h(c,g),c.prototype.convertTo=function(t){return this.imod(t.ushln(this.shift))},c.prototype.convertFrom=function(t){var i=this.imod(t.mul(this.rinv));return i.red=null,i},c.prototype.imul=function(t,i){if(t.isZero()||i.isZero())return t.words[0]=0,t.length=1,t;var r=t.imul(i),h=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),n=r.isub(h).iushrn(this.shift),e=n;return n.cmp(this.m)>=0?e=n.isub(this.m):n.cmpn(0)<0&&(e=n.iadd(this.m)),e._forceRed(this)},c.prototype.mul=function(t,i){if(t.isZero()||i.isZero())return new n(0)._forceRed(this);var r=t.mul(i),h=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),e=r.isub(h).iushrn(this.shift),o=e;return e.cmp(this.m)>=0?o=e.isub(this.m):e.cmpn(0)<0&&(o=e.iadd(this.m)),o._forceRed(this)},c.prototype.invm=function(t){var i=this.imod(t._invmp(this.m).mul(this.r2));return i._forceRed(this)}}("undefined"==typeof module||module,this);

},{"buffer":112}],84:[function(require,module,exports){
function Rand(n){this.rand=n}var r;if(module.exports=function(n){return r||(r=new Rand(null)),r.generate(n)},module.exports.Rand=Rand,Rand.prototype.generate=function(n){return this._rand(n)},"object"==typeof window)window.crypto&&window.crypto.getRandomValues?Rand.prototype._rand=function(n){var r=new Uint8Array(n);return window.crypto.getRandomValues(r),r}:window.msCrypto&&window.msCrypto.getRandomValues?Rand.prototype._rand=function(n){var r=new Uint8Array(n);return window.msCrypto.getRandomValues(r),r}:Rand.prototype._rand=function(){throw new Error("Not implemented yet")};else try{var crypto=require("crypto");Rand.prototype._rand=function(n){return crypto.randomBytes(n)}}catch(e){Rand.prototype._rand=function(n){for(var r=new Uint8Array(n),t=0;t<r.length;t++)r[t]=this.rand.getByte();return r}}

},{"crypto":126}],85:[function(require,module,exports){

},{}],86:[function(require,module,exports){
(function (Buffer){
function fixup_uint32(t){var e,i;return e=t>uint_max||0>t?(i=Math.abs(t)%uint_max,0>t?uint_max-i:i):t}function scrub_vec(t){for(var e=0;e<t.length;t++)t[e]=0;return!1}function Global(){this.SBOX=[],this.INV_SBOX=[],this.SUB_MIX=[[],[],[],[]],this.INV_SUB_MIX=[[],[],[],[]],this.init(),this.RCON=[0,1,2,4,8,16,32,64,128,27,54]}function bufferToArray(t){for(var e=t.length/4,i=new Array(e),r=-1;++r<e;)i[r]=t.readUInt32BE(4*r);return i}function AES(t){this._key=bufferToArray(t),this._doReset()}var uint_max=Math.pow(2,32);Global.prototype.init=function(){var t,e,i,r,n,S,u,_,o,h;for(t=function(){var t,i;for(i=[],e=t=0;256>t;e=++t)128>e?i.push(e<<1):i.push(e<<1^283);return i}(),n=0,o=0,e=h=0;256>h;e=++h)i=o^o<<1^o<<2^o<<3^o<<4,i=i>>>8^255&i^99,this.SBOX[n]=i,this.INV_SBOX[i]=n,S=t[n],u=t[S],_=t[u],r=257*t[i]^16843008*i,this.SUB_MIX[0][n]=r<<24|r>>>8,this.SUB_MIX[1][n]=r<<16|r>>>16,this.SUB_MIX[2][n]=r<<8|r>>>24,this.SUB_MIX[3][n]=r,r=16843009*_^65537*u^257*S^16843008*n,this.INV_SUB_MIX[0][i]=r<<24|r>>>8,this.INV_SUB_MIX[1][i]=r<<16|r>>>16,this.INV_SUB_MIX[2][i]=r<<8|r>>>24,this.INV_SUB_MIX[3][i]=r,0===n?n=o=1:(n=S^t[t[t[_^S]]],o^=t[t[o]]);return!0};var G=new Global;AES.blockSize=16,AES.prototype.blockSize=AES.blockSize,AES.keySize=32,AES.prototype.keySize=AES.keySize,AES.prototype._doReset=function(){var t,e,i,r,n,S;for(i=this._key,e=i.length,this._nRounds=e+6,n=4*(this._nRounds+1),this._keySchedule=[],r=0;n>r;r++)this._keySchedule[r]=e>r?i[r]:(S=this._keySchedule[r-1],r%e===0?(S=S<<8|S>>>24,S=G.SBOX[S>>>24]<<24|G.SBOX[S>>>16&255]<<16|G.SBOX[S>>>8&255]<<8|G.SBOX[255&S],S^=G.RCON[r/e|0]<<24):e>6&&r%e===4?S=G.SBOX[S>>>24]<<24|G.SBOX[S>>>16&255]<<16|G.SBOX[S>>>8&255]<<8|G.SBOX[255&S]:void 0,this._keySchedule[r-e]^S);for(this._invKeySchedule=[],t=0;n>t;t++)r=n-t,S=this._keySchedule[r-(t%4?0:4)],this._invKeySchedule[t]=4>t||4>=r?S:G.INV_SUB_MIX[0][G.SBOX[S>>>24]]^G.INV_SUB_MIX[1][G.SBOX[S>>>16&255]]^G.INV_SUB_MIX[2][G.SBOX[S>>>8&255]]^G.INV_SUB_MIX[3][G.SBOX[255&S]];return!0},AES.prototype.encryptBlock=function(t){t=bufferToArray(new Buffer(t));var e=this._doCryptBlock(t,this._keySchedule,G.SUB_MIX,G.SBOX),i=new Buffer(16);return i.writeUInt32BE(e[0],0),i.writeUInt32BE(e[1],4),i.writeUInt32BE(e[2],8),i.writeUInt32BE(e[3],12),i},AES.prototype.decryptBlock=function(t){t=bufferToArray(new Buffer(t));var e=[t[3],t[1]];t[1]=e[0],t[3]=e[1];var i=this._doCryptBlock(t,this._invKeySchedule,G.INV_SUB_MIX,G.INV_SBOX),r=new Buffer(16);return r.writeUInt32BE(i[0],0),r.writeUInt32BE(i[3],4),r.writeUInt32BE(i[2],8),r.writeUInt32BE(i[1],12),r},AES.prototype.scrub=function(){scrub_vec(this._keySchedule),scrub_vec(this._invKeySchedule),scrub_vec(this._key)},AES.prototype._doCryptBlock=function(t,e,i,r){var n,S,u,_,o,h,B,s,c;S=t[0]^e[0],u=t[1]^e[1],_=t[2]^e[2],o=t[3]^e[3],n=4;for(var f=1;f<this._nRounds;f++)h=i[0][S>>>24]^i[1][u>>>16&255]^i[2][_>>>8&255]^i[3][255&o]^e[n++],B=i[0][u>>>24]^i[1][_>>>16&255]^i[2][o>>>8&255]^i[3][255&S]^e[n++],s=i[0][_>>>24]^i[1][o>>>16&255]^i[2][S>>>8&255]^i[3][255&u]^e[n++],c=i[0][o>>>24]^i[1][S>>>16&255]^i[2][u>>>8&255]^i[3][255&_]^e[n++],S=h,u=B,_=s,o=c;return h=(r[S>>>24]<<24|r[u>>>16&255]<<16|r[_>>>8&255]<<8|r[255&o])^e[n++],B=(r[u>>>24]<<24|r[_>>>16&255]<<16|r[o>>>8&255]<<8|r[255&S])^e[n++],s=(r[_>>>24]<<24|r[o>>>16&255]<<16|r[S>>>8&255]<<8|r[255&u])^e[n++],c=(r[o>>>24]<<24|r[S>>>16&255]<<16|r[u>>>8&255]<<8|r[255&_])^e[n++],[fixup_uint32(h),fixup_uint32(B),fixup_uint32(s),fixup_uint32(c)]},exports.AES=AES;

}).call(this,require("buffer").Buffer)
},{"buffer":112}],87:[function(require,module,exports){
(function (Buffer){
function StreamCipher(t,e,r,h){if(!(this instanceof StreamCipher))return new StreamCipher(t,e,r);Transform.call(this),this._finID=Buffer.concat([r,new Buffer([0,0,0,1])]),r=Buffer.concat([r,new Buffer([0,0,0,2])]),this._cipher=new aes.AES(e),this._prev=new Buffer(r.length),this._cache=new Buffer(""),this._secCache=new Buffer(""),this._decrypt=h,this._alen=0,this._len=0,r.copy(this._prev),this._mode=t;var i=new Buffer(4);i.fill(0),this._ghash=new GHASH(this._cipher.encryptBlock(i)),this._authTag=null,this._called=!1}function xorTest(t,e){var r=0;t.length!==e.length&&r++;for(var h=Math.min(t.length,e.length),i=-1;++i<h;)r+=t[i]^e[i];return r}var aes=require("./aes"),Transform=require("cipher-base"),inherits=require("inherits"),GHASH=require("./ghash"),xor=require("buffer-xor");inherits(StreamCipher,Transform),module.exports=StreamCipher,StreamCipher.prototype._update=function(t){if(!this._called&&this._alen){var e=16-this._alen%16;16>e&&(e=new Buffer(e),e.fill(0),this._ghash.update(e))}this._called=!0;var r=this._mode.encrypt(this,t);return this._decrypt?this._ghash.update(t):this._ghash.update(r),this._len+=t.length,r},StreamCipher.prototype._final=function(){if(this._decrypt&&!this._authTag)throw new Error("Unsupported state or unable to authenticate data");var t=xor(this._ghash["final"](8*this._alen,8*this._len),this._cipher.encryptBlock(this._finID));if(this._decrypt){if(xorTest(t,this._authTag))throw new Error("Unsupported state or unable to authenticate data")}else this._authTag=t;this._cipher.scrub()},StreamCipher.prototype.getAuthTag=function(){if(!this._decrypt&&Buffer.isBuffer(this._authTag))return this._authTag;throw new Error("Attempting to get auth tag in unsupported state")},StreamCipher.prototype.setAuthTag=function(t){if(!this._decrypt)throw new Error("Attempting to set auth tag in unsupported state");this._authTag=t},StreamCipher.prototype.setAAD=function(t){if(this._called)throw new Error("Attempting to set AAD in unsupported state");this._ghash.update(t),this._alen+=t.length};

}).call(this,require("buffer").Buffer)
},{"./aes":86,"./ghash":91,"buffer":112,"buffer-xor":111,"cipher-base":115,"inherits":213}],88:[function(require,module,exports){
function getCiphers(){return Object.keys(modes)}var ciphers=require("./encrypter");exports.createCipher=exports.Cipher=ciphers.createCipher,exports.createCipheriv=exports.Cipheriv=ciphers.createCipheriv;var deciphers=require("./decrypter");exports.createDecipher=exports.Decipher=deciphers.createDecipher,exports.createDecipheriv=exports.Decipheriv=deciphers.createDecipheriv;var modes=require("./modes");exports.listCiphers=exports.getCiphers=getCiphers;

},{"./decrypter":89,"./encrypter":90,"./modes":92}],89:[function(require,module,exports){
(function (Buffer){
function Decipher(e,r,t){return this instanceof Decipher?(Transform.call(this),this._cache=new Splitter,this._last=void 0,this._cipher=new aes.AES(r),this._prev=new Buffer(t.length),t.copy(this._prev),this._mode=e,void(this._autopadding=!0)):new Decipher(e,r,t)}function Splitter(){return this instanceof Splitter?void(this.cache=new Buffer("")):new Splitter}function unpad(e){for(var r=e[15],t=-1;++t<r;)if(e[t+(16-r)]!==r)throw new Error("unable to decrypt data");return 16!==r?e.slice(0,16-r):void 0}function createDecipheriv(e,r,t){var i=modes[e.toLowerCase()];if(!i)throw new TypeError("invalid suite type");if("string"==typeof t&&(t=new Buffer(t)),"string"==typeof r&&(r=new Buffer(r)),r.length!==i.key/8)throw new TypeError("invalid key length "+r.length);if(t.length!==i.iv)throw new TypeError("invalid iv length "+t.length);return"stream"===i.type?new StreamCipher(modelist[i.mode],r,t,!0):"auth"===i.type?new AuthCipher(modelist[i.mode],r,t,!0):new Decipher(modelist[i.mode],r,t)}function createDecipher(e,r){var t=modes[e.toLowerCase()];if(!t)throw new TypeError("invalid suite type");var i=ebtk(r,!1,t.key,t.iv);return createDecipheriv(e,i.key,i.iv)}var aes=require("./aes"),Transform=require("cipher-base"),inherits=require("inherits"),modes=require("./modes"),StreamCipher=require("./streamCipher"),AuthCipher=require("./authCipher"),ebtk=require("evp_bytestokey");inherits(Decipher,Transform),Decipher.prototype._update=function(e){this._cache.add(e);for(var r,t,i=[];r=this._cache.get(this._autopadding);)t=this._mode.decrypt(this,r),i.push(t);return Buffer.concat(i)},Decipher.prototype._final=function(){var e=this._cache.flush();if(this._autopadding)return unpad(this._mode.decrypt(this,e));if(e)throw new Error("data not multiple of block length")},Decipher.prototype.setAutoPadding=function(e){return this._autopadding=!!e,this},Splitter.prototype.add=function(e){this.cache=Buffer.concat([this.cache,e])},Splitter.prototype.get=function(e){var r;if(e){if(this.cache.length>16)return r=this.cache.slice(0,16),this.cache=this.cache.slice(16),r}else if(this.cache.length>=16)return r=this.cache.slice(0,16),this.cache=this.cache.slice(16),r;return null},Splitter.prototype.flush=function(){return this.cache.length?this.cache:void 0};var modelist={ECB:require("./modes/ecb"),CBC:require("./modes/cbc"),CFB:require("./modes/cfb"),CFB8:require("./modes/cfb8"),CFB1:require("./modes/cfb1"),OFB:require("./modes/ofb"),CTR:require("./modes/ctr"),GCM:require("./modes/ctr")};exports.createDecipher=createDecipher,exports.createDecipheriv=createDecipheriv;

}).call(this,require("buffer").Buffer)
},{"./aes":86,"./authCipher":87,"./modes":92,"./modes/cbc":93,"./modes/cfb":94,"./modes/cfb1":95,"./modes/cfb8":96,"./modes/ctr":97,"./modes/ecb":98,"./modes/ofb":99,"./streamCipher":100,"buffer":112,"cipher-base":115,"evp_bytestokey":162,"inherits":213}],90:[function(require,module,exports){
(function (Buffer){
function Cipher(e,r,t){return this instanceof Cipher?(Transform.call(this),this._cache=new Splitter,this._cipher=new aes.AES(r),this._prev=new Buffer(t.length),t.copy(this._prev),this._mode=e,void(this._autopadding=!0)):new Cipher(e,r,t)}function Splitter(){return this instanceof Splitter?void(this.cache=new Buffer("")):new Splitter}function createCipheriv(e,r,t){var i=modes[e.toLowerCase()];if(!i)throw new TypeError("invalid suite type");if("string"==typeof t&&(t=new Buffer(t)),"string"==typeof r&&(r=new Buffer(r)),r.length!==i.key/8)throw new TypeError("invalid key length "+r.length);if(t.length!==i.iv)throw new TypeError("invalid iv length "+t.length);return"stream"===i.type?new StreamCipher(modelist[i.mode],r,t):"auth"===i.type?new AuthCipher(modelist[i.mode],r,t):new Cipher(modelist[i.mode],r,t)}function createCipher(e,r){var t=modes[e.toLowerCase()];if(!t)throw new TypeError("invalid suite type");var i=ebtk(r,!1,t.key,t.iv);return createCipheriv(e,i.key,i.iv)}var aes=require("./aes"),Transform=require("cipher-base"),inherits=require("inherits"),modes=require("./modes"),ebtk=require("evp_bytestokey"),StreamCipher=require("./streamCipher"),AuthCipher=require("./authCipher");inherits(Cipher,Transform),Cipher.prototype._update=function(e){this._cache.add(e);for(var r,t,i=[];r=this._cache.get();)t=this._mode.encrypt(this,r),i.push(t);return Buffer.concat(i)},Cipher.prototype._final=function(){var e=this._cache.flush();if(this._autopadding)return e=this._mode.encrypt(this,e),this._cipher.scrub(),e;if("10101010101010101010101010101010"!==e.toString("hex"))throw this._cipher.scrub(),new Error("data not multiple of block length")},Cipher.prototype.setAutoPadding=function(e){return this._autopadding=!!e,this},Splitter.prototype.add=function(e){this.cache=Buffer.concat([this.cache,e])},Splitter.prototype.get=function(){if(this.cache.length>15){var e=this.cache.slice(0,16);return this.cache=this.cache.slice(16),e}return null},Splitter.prototype.flush=function(){for(var e=16-this.cache.length,r=new Buffer(e),t=-1;++t<e;)r.writeUInt8(e,t);var i=Buffer.concat([this.cache,r]);return i};var modelist={ECB:require("./modes/ecb"),CBC:require("./modes/cbc"),CFB:require("./modes/cfb"),CFB8:require("./modes/cfb8"),CFB1:require("./modes/cfb1"),OFB:require("./modes/ofb"),CTR:require("./modes/ctr"),GCM:require("./modes/ctr")};exports.createCipheriv=createCipheriv,exports.createCipher=createCipher;

}).call(this,require("buffer").Buffer)
},{"./aes":86,"./authCipher":87,"./modes":92,"./modes/cbc":93,"./modes/cfb":94,"./modes/cfb1":95,"./modes/cfb8":96,"./modes/ctr":97,"./modes/ecb":98,"./modes/ofb":99,"./streamCipher":100,"buffer":112,"cipher-base":115,"evp_bytestokey":162,"inherits":213}],91:[function(require,module,exports){
(function (Buffer){
function GHASH(t){this.h=t,this.state=new Buffer(16),this.state.fill(0),this.cache=new Buffer("")}function toArray(t){return[t.readUInt32BE(0),t.readUInt32BE(4),t.readUInt32BE(8),t.readUInt32BE(12)]}function fromArray(t){t=t.map(fixup_uint32);var r=new Buffer(16);return r.writeUInt32BE(t[0],0),r.writeUInt32BE(t[1],4),r.writeUInt32BE(t[2],8),r.writeUInt32BE(t[3],12),r}function fixup_uint32(t){var r,e;return r=t>uint_max||0>t?(e=Math.abs(t)%uint_max,0>t?uint_max-e:e):t}function xor(t,r){return[t[0]^r[0],t[1]^r[1],t[2]^r[2],t[3]^r[3]]}var zeros=new Buffer(16);zeros.fill(0),module.exports=GHASH,GHASH.prototype.ghash=function(t){for(var r=-1;++r<t.length;)this.state[r]^=t[r];this._multiply()},GHASH.prototype._multiply=function(){for(var t,r,e,i=toArray(this.h),a=[0,0,0,0],n=-1;++n<128;){for(r=0!==(this.state[~~(n/8)]&1<<7-n%8),r&&(a=xor(a,i)),e=0!==(1&i[3]),t=3;t>0;t--)i[t]=i[t]>>>1|(1&i[t-1])<<31;i[0]=i[0]>>>1,e&&(i[0]=i[0]^225<<24)}this.state=fromArray(a)},GHASH.prototype.update=function(t){this.cache=Buffer.concat([this.cache,t]);for(var r;this.cache.length>=16;)r=this.cache.slice(0,16),this.cache=this.cache.slice(16),this.ghash(r)},GHASH.prototype["final"]=function(t,r){return this.cache.length&&this.ghash(Buffer.concat([this.cache,zeros],16)),this.ghash(fromArray([0,t,0,r])),this.state};var uint_max=Math.pow(2,32);

}).call(this,require("buffer").Buffer)
},{"buffer":112}],92:[function(require,module,exports){
exports["aes-128-ecb"]={cipher:"AES",key:128,iv:0,mode:"ECB",type:"block"},exports["aes-192-ecb"]={cipher:"AES",key:192,iv:0,mode:"ECB",type:"block"},exports["aes-256-ecb"]={cipher:"AES",key:256,iv:0,mode:"ECB",type:"block"},exports["aes-128-cbc"]={cipher:"AES",key:128,iv:16,mode:"CBC",type:"block"},exports["aes-192-cbc"]={cipher:"AES",key:192,iv:16,mode:"CBC",type:"block"},exports["aes-256-cbc"]={cipher:"AES",key:256,iv:16,mode:"CBC",type:"block"},exports.aes128=exports["aes-128-cbc"],exports.aes192=exports["aes-192-cbc"],exports.aes256=exports["aes-256-cbc"],exports["aes-128-cfb"]={cipher:"AES",key:128,iv:16,mode:"CFB",type:"stream"},exports["aes-192-cfb"]={cipher:"AES",key:192,iv:16,mode:"CFB",type:"stream"},exports["aes-256-cfb"]={cipher:"AES",key:256,iv:16,mode:"CFB",type:"stream"},exports["aes-128-cfb8"]={cipher:"AES",key:128,iv:16,mode:"CFB8",type:"stream"},exports["aes-192-cfb8"]={cipher:"AES",key:192,iv:16,mode:"CFB8",type:"stream"},exports["aes-256-cfb8"]={cipher:"AES",key:256,iv:16,mode:"CFB8",type:"stream"},exports["aes-128-cfb1"]={cipher:"AES",key:128,iv:16,mode:"CFB1",type:"stream"},exports["aes-192-cfb1"]={cipher:"AES",key:192,iv:16,mode:"CFB1",type:"stream"},exports["aes-256-cfb1"]={cipher:"AES",key:256,iv:16,mode:"CFB1",type:"stream"},exports["aes-128-ofb"]={cipher:"AES",key:128,iv:16,mode:"OFB",type:"stream"},exports["aes-192-ofb"]={cipher:"AES",key:192,iv:16,mode:"OFB",type:"stream"},exports["aes-256-ofb"]={cipher:"AES",key:256,iv:16,mode:"OFB",type:"stream"},exports["aes-128-ctr"]={cipher:"AES",key:128,iv:16,mode:"CTR",type:"stream"},exports["aes-192-ctr"]={cipher:"AES",key:192,iv:16,mode:"CTR",type:"stream"},exports["aes-256-ctr"]={cipher:"AES",key:256,iv:16,mode:"CTR",type:"stream"},exports["aes-128-gcm"]={cipher:"AES",key:128,iv:12,mode:"GCM",type:"auth"},exports["aes-192-gcm"]={cipher:"AES",key:192,iv:12,mode:"GCM",type:"auth"},exports["aes-256-gcm"]={cipher:"AES",key:256,iv:12,mode:"GCM",type:"auth"};

},{}],93:[function(require,module,exports){
var xor=require("buffer-xor");exports.encrypt=function(r,e){var p=xor(e,r._prev);return r._prev=r._cipher.encryptBlock(p),r._prev},exports.decrypt=function(r,e){var p=r._prev;r._prev=e;var c=r._cipher.decryptBlock(e);return xor(c,p)};

},{"buffer-xor":111}],94:[function(require,module,exports){
(function (Buffer){
function encryptStart(e,r,c){var t=r.length,n=xor(r,e._cache);return e._cache=e._cache.slice(t),e._prev=Buffer.concat([e._prev,c?r:n]),n}var xor=require("buffer-xor");exports.encrypt=function(e,r,c){for(var t,n=new Buffer("");r.length;){if(0===e._cache.length&&(e._cache=e._cipher.encryptBlock(e._prev),e._prev=new Buffer("")),!(e._cache.length<=r.length)){n=Buffer.concat([n,encryptStart(e,r,c)]);break}t=e._cache.length,n=Buffer.concat([n,encryptStart(e,r.slice(0,t),c)]),r=r.slice(t)}return n};

}).call(this,require("buffer").Buffer)
},{"buffer":112,"buffer-xor":111}],95:[function(require,module,exports){
(function (Buffer){
function encryptByte(r,e,n){for(var t,f,c,u=-1,o=8,p=0;++u<o;)t=r._cipher.encryptBlock(r._prev),f=e&1<<7-u?128:0,c=t[0]^f,p+=(128&c)>>u%8,r._prev=shiftIn(r._prev,n?f:c);return p}function shiftIn(r,e){var n=r.length,t=-1,f=new Buffer(r.length);for(r=Buffer.concat([r,new Buffer([e])]);++t<n;)f[t]=r[t]<<1|r[t+1]>>7;return f}exports.encrypt=function(r,e,n){for(var t=e.length,f=new Buffer(t),c=-1;++c<t;)f[c]=encryptByte(r,e[c],n);return f};

}).call(this,require("buffer").Buffer)
},{"buffer":112}],96:[function(require,module,exports){
(function (Buffer){
function encryptByte(e,r,n){var t=e._cipher.encryptBlock(e._prev),c=t[0]^r;return e._prev=Buffer.concat([e._prev.slice(1),new Buffer([n?r:c])]),c}exports.encrypt=function(e,r,n){for(var t=r.length,c=new Buffer(t),f=-1;++f<t;)c[f]=encryptByte(e,r[f],n);return c};

}).call(this,require("buffer").Buffer)
},{"buffer":112}],97:[function(require,module,exports){
(function (Buffer){
function incr32(e){for(var r,c=e.length;c--;){if(r=e.readUInt8(c),255!==r){r++,e.writeUInt8(r,c);break}e.writeUInt8(0,c)}}function getBlock(e){var r=e._cipher.encryptBlock(e._prev);return incr32(e._prev),r}var xor=require("buffer-xor");exports.encrypt=function(e,r){for(;e._cache.length<r.length;)e._cache=Buffer.concat([e._cache,getBlock(e)]);var c=e._cache.slice(0,r.length);return e._cache=e._cache.slice(r.length),xor(r,c)};

}).call(this,require("buffer").Buffer)
},{"buffer":112,"buffer-xor":111}],98:[function(require,module,exports){
exports.encrypt=function(r,c){return r._cipher.encryptBlock(c)},exports.decrypt=function(r,c){return r._cipher.decryptBlock(c)};

},{}],99:[function(require,module,exports){
(function (Buffer){
function getBlock(e){return e._prev=e._cipher.encryptBlock(e._prev),e._prev}var xor=require("buffer-xor");exports.encrypt=function(e,c){for(;e._cache.length<c.length;)e._cache=Buffer.concat([e._cache,getBlock(e)]);var r=e._cache.slice(0,c.length);return e._cache=e._cache.slice(c.length),xor(c,r)};

}).call(this,require("buffer").Buffer)
},{"buffer":112,"buffer-xor":111}],100:[function(require,module,exports){
(function (Buffer){
function StreamCipher(e,r,t,i){return this instanceof StreamCipher?(Transform.call(this),this._cipher=new aes.AES(r),this._prev=new Buffer(t.length),this._cache=new Buffer(""),this._secCache=new Buffer(""),this._decrypt=i,t.copy(this._prev),void(this._mode=e)):new StreamCipher(e,r,t)}var aes=require("./aes"),Transform=require("cipher-base"),inherits=require("inherits");inherits(StreamCipher,Transform),module.exports=StreamCipher,StreamCipher.prototype._update=function(e){return this._mode.encrypt(this,e,this._decrypt)},StreamCipher.prototype._final=function(){this._cipher.scrub()};

}).call(this,require("buffer").Buffer)
},{"./aes":86,"buffer":112,"cipher-base":115,"inherits":213}],101:[function(require,module,exports){
function createCipher(e,r){var s,i;if(e=e.toLowerCase(),aesModes[e])s=aesModes[e].key,i=aesModes[e].iv;else{if(!desModes[e])throw new TypeError("invalid suite type");s=8*desModes[e].key,i=desModes[e].iv}var t=ebtk(r,!1,s,i);return createCipheriv(e,t.key,t.iv)}function createDecipher(e,r){var s,i;if(e=e.toLowerCase(),aesModes[e])s=aesModes[e].key,i=aesModes[e].iv;else{if(!desModes[e])throw new TypeError("invalid suite type");s=8*desModes[e].key,i=desModes[e].iv}var t=ebtk(r,!1,s,i);return createDecipheriv(e,t.key,t.iv)}function createCipheriv(e,r,s){if(e=e.toLowerCase(),aesModes[e])return aes.createCipheriv(e,r,s);if(desModes[e])return new DES({key:r,iv:s,mode:e});throw new TypeError("invalid suite type")}function createDecipheriv(e,r,s){if(e=e.toLowerCase(),aesModes[e])return aes.createDecipheriv(e,r,s);if(desModes[e])return new DES({key:r,iv:s,mode:e,decrypt:!0});throw new TypeError("invalid suite type")}function getCiphers(){return Object.keys(desModes).concat(aes.getCiphers())}var ebtk=require("evp_bytestokey"),aes=require("browserify-aes/browser"),DES=require("browserify-des"),desModes=require("browserify-des/modes"),aesModes=require("browserify-aes/modes");exports.createCipher=exports.Cipher=createCipher,exports.createCipheriv=exports.Cipheriv=createCipheriv,exports.createDecipher=exports.Decipher=createDecipher,exports.createDecipheriv=exports.Decipheriv=createDecipheriv,exports.listCiphers=exports.getCiphers=getCiphers;

},{"browserify-aes/browser":88,"browserify-aes/modes":92,"browserify-des":102,"browserify-des/modes":103,"evp_bytestokey":162}],102:[function(require,module,exports){
(function (Buffer){
function DES(e){CipherBase.call(this);var s,d=e.mode.toLowerCase(),t=modes[d];s=e.decrypt?"decrypt":"encrypt";var r=e.key;"des-ede"!==d&&"des-ede-cbc"!==d||(r=Buffer.concat([r,r.slice(0,8)]));var i=e.iv;this._des=t.create({key:r,iv:i,type:s})}var CipherBase=require("cipher-base"),des=require("des.js"),inherits=require("inherits"),modes={"des-ede3-cbc":des.CBC.instantiate(des.EDE),"des-ede3":des.EDE,"des-ede-cbc":des.CBC.instantiate(des.EDE),"des-ede":des.EDE,"des-cbc":des.CBC.instantiate(des.DES),"des-ecb":des.DES};modes.des=modes["des-cbc"],modes.des3=modes["des-ede3-cbc"],module.exports=DES,inherits(DES,CipherBase),DES.prototype._update=function(e){return new Buffer(this._des.update(e))},DES.prototype._final=function(){return new Buffer(this._des["final"]())};

}).call(this,require("buffer").Buffer)
},{"buffer":112,"cipher-base":115,"des.js":130,"inherits":213}],103:[function(require,module,exports){
exports["des-ecb"]={key:8,iv:0},exports["des-cbc"]=exports.des={key:8,iv:8},exports["des-ede3-cbc"]=exports.des3={key:24,iv:8},exports["des-ede3"]={key:24,iv:0},exports["des-ede-cbc"]={key:16,iv:8},exports["des-ede"]={key:16,iv:0};

},{}],104:[function(require,module,exports){
(function (Buffer){
function blind(e){var n=getr(e),r=n.toRed(bn.mont(e.modulus)).redPow(new bn(e.publicExponent)).fromRed();return{blinder:r,unblinder:n.invm(e.modulus)}}function crt(e,n){var r=blind(n),o=n.modulus.byteLength(),u=(bn.mont(n.modulus),new bn(e).mul(r.blinder).umod(n.modulus)),m=u.toRed(bn.mont(n.prime1)),d=u.toRed(bn.mont(n.prime2)),t=n.coefficient,i=n.prime1,b=n.prime2,l=m.redPow(n.exponent1),s=d.redPow(n.exponent2);l=l.fromRed(),s=s.fromRed();var p=l.isub(s).imul(t).umod(i);return p.imul(b),s.iadd(p),new Buffer(s.imul(r.unblinder).umod(n.modulus).toArray(!1,o))}function getr(e){for(var n=e.modulus.byteLength(),r=new bn(randomBytes(n));r.cmp(e.modulus)>=0||!r.umod(e.prime1)||!r.umod(e.prime2);)r=new bn(randomBytes(n));return r}var bn=require("bn.js"),randomBytes=require("randombytes");module.exports=crt,crt.getr=getr;

}).call(this,require("buffer").Buffer)
},{"bn.js":83,"buffer":112,"randombytes":256}],105:[function(require,module,exports){
(function (Buffer){
"use strict";exports["RSA-SHA224"]=exports.sha224WithRSAEncryption={sign:"rsa",hash:"sha224",id:new Buffer("302d300d06096086480165030402040500041c","hex")},exports["RSA-SHA256"]=exports.sha256WithRSAEncryption={sign:"rsa",hash:"sha256",id:new Buffer("3031300d060960864801650304020105000420","hex")},exports["RSA-SHA384"]=exports.sha384WithRSAEncryption={sign:"rsa",hash:"sha384",id:new Buffer("3041300d060960864801650304020205000430","hex")},exports["RSA-SHA512"]=exports.sha512WithRSAEncryption={sign:"rsa",hash:"sha512",id:new Buffer("3051300d060960864801650304020305000440","hex")},exports["RSA-SHA1"]={sign:"rsa",hash:"sha1",id:new Buffer("3021300906052b0e03021a05000414","hex")},exports["ecdsa-with-SHA1"]={sign:"ecdsa",hash:"sha1",id:new Buffer("","hex")},exports.DSA=exports["DSA-SHA1"]=exports["DSA-SHA"]={sign:"dsa",hash:"sha1",id:new Buffer("","hex")},exports["DSA-SHA224"]=exports["DSA-WITH-SHA224"]={sign:"dsa",hash:"sha224",id:new Buffer("","hex")},exports["DSA-SHA256"]=exports["DSA-WITH-SHA256"]={sign:"dsa",hash:"sha256",id:new Buffer("","hex")},exports["DSA-SHA384"]=exports["DSA-WITH-SHA384"]={sign:"dsa",hash:"sha384",id:new Buffer("","hex")},exports["DSA-SHA512"]=exports["DSA-WITH-SHA512"]={sign:"dsa",hash:"sha512",id:new Buffer("","hex")},exports["DSA-RIPEMD160"]={sign:"dsa",hash:"rmd160",id:new Buffer("","hex")},exports["RSA-RIPEMD160"]=exports.ripemd160WithRSA={sign:"rsa",hash:"rmd160",id:new Buffer("3021300906052b2403020105000414","hex")},exports["RSA-MD5"]=exports.md5WithRSAEncryption={sign:"rsa",hash:"md5",id:new Buffer("3020300c06082a864886f70d020505000410","hex")};

}).call(this,require("buffer").Buffer)
},{"buffer":112}],106:[function(require,module,exports){
(function (Buffer){
function Sign(e){stream.Writable.call(this);var t=algos[e];if(!t)throw new Error("Unknown message digest");this._hashType=t.hash,this._hash=createHash(t.hash),this._tag=t.id,this._signType=t.sign}function Verify(e){stream.Writable.call(this);var t=algos[e];if(!t)throw new Error("Unknown message digest");this._hash=createHash(t.hash),this._tag=t.id,this._signType=t.sign}function createSign(e){return new Sign(e)}function createVerify(e){return new Verify(e)}var _algos=require("./algos"),createHash=require("create-hash"),inherits=require("inherits"),sign=require("./sign"),stream=require("stream"),verify=require("./verify"),algos={};Object.keys(_algos).forEach(function(e){algos[e]=algos[e.toLowerCase()]=_algos[e]}),inherits(Sign,stream.Writable),Sign.prototype._write=function(e,t,i){this._hash.update(e),i()},Sign.prototype.update=function(e,t){return"string"==typeof e&&(e=new Buffer(e,t)),this._hash.update(e),this},Sign.prototype.sign=function(e,t){this.end();var i=this._hash.digest(),r=sign(Buffer.concat([this._tag,i]),e,this._hashType,this._signType);return t?r.toString(t):r},inherits(Verify,stream.Writable),Verify.prototype._write=function(e,t,i){this._hash.update(e),i()},Verify.prototype.update=function(e,t){return"string"==typeof e&&(e=new Buffer(e,t)),this._hash.update(e),this},Verify.prototype.verify=function(e,t,i){"string"==typeof t&&(t=new Buffer(t,i)),this.end();var r=this._hash.digest();return verify(t,Buffer.concat([this._tag,r]),e,this._signType)},module.exports={Sign:createSign,Verify:createVerify,createSign:createSign,createVerify:createVerify};

}).call(this,require("buffer").Buffer)
},{"./algos":105,"./sign":108,"./verify":109,"buffer":112,"create-hash":122,"inherits":213,"stream":282}],107:[function(require,module,exports){
"use strict";exports["1.3.132.0.10"]="secp256k1",exports["1.3.132.0.33"]="p224",exports["1.2.840.10045.3.1.1"]="p192",exports["1.2.840.10045.3.1.7"]="p256",exports["1.3.132.0.34"]="p384",exports["1.3.132.0.35"]="p521";

},{}],108:[function(require,module,exports){
(function (Buffer){
function sign(e,r,t,n){var a=parseKeys(r);if(a.curve){if("ecdsa"!==n)throw new Error("wrong private key type");return ecSign(e,a)}if("dsa"===a.type){if("dsa"!==n)throw new Error("wrong private key type");return dsaSign(e,a,t)}if("rsa"!==n)throw new Error("wrong private key type");for(var i=a.modulus.byteLength(),u=[0,1];e.length+u.length+1<i;)u.push(255);u.push(0);for(var o=-1;++o<e.length;)u.push(e[o]);var c=crt(u,a);return c}function ecSign(e,r){var t=curves[r.curve.join(".")];if(!t)throw new Error("unknown curve "+r.curve.join("."));var n=new EC(t),a=n.genKeyPair();a._importPrivate(r.privateKey);var i=a.sign(e);return new Buffer(i.toDER())}function dsaSign(e,r,t){for(var n,a=r.params.priv_key,i=r.params.p,u=r.params.q,o=r.params.g,c=new BN(0),f=bits2int(e,u).mod(u),s=!1,g=getKey(a,u,e,t);s===!1;)n=makeKey(u,g,t),c=makeR(o,n,i,u),s=n.invm(u).imul(f.add(a.mul(c))).mod(u),s.cmpn(0)||(s=!1,c=new BN(0));return toDER(c,s)}function toDER(e,r){e=e.toArray(),r=r.toArray(),128&e[0]&&(e=[0].concat(e)),128&r[0]&&(r=[0].concat(r));var t=e.length+r.length+4,n=[48,t,2,e.length];return n=n.concat(e,[2,r.length],r),new Buffer(n)}function getKey(e,r,t,n){if(e=new Buffer(e.toArray()),e.length<r.byteLength()){var a=new Buffer(r.byteLength()-e.length);a.fill(0),e=Buffer.concat([a,e])}var i=t.length,u=bits2octets(t,r),o=new Buffer(i);o.fill(1);var c=new Buffer(i);return c.fill(0),c=createHmac(n,c).update(o).update(new Buffer([0])).update(e).update(u).digest(),o=createHmac(n,c).update(o).digest(),c=createHmac(n,c).update(o).update(new Buffer([1])).update(e).update(u).digest(),o=createHmac(n,c).update(o).digest(),{k:c,v:o}}function bits2int(e,r){var t=new BN(e),n=(e.length<<3)-r.bitLength();return n>0&&t.ishrn(n),t}function bits2octets(e,r){e=bits2int(e,r),e=e.mod(r);var t=new Buffer(e.toArray());if(t.length<r.byteLength()){var n=new Buffer(r.byteLength()-t.length);n.fill(0),t=Buffer.concat([n,t])}return t}function makeKey(e,r,t){var n,a;do{for(n=new Buffer("");8*n.length<e.bitLength();)r.v=createHmac(t,r.k).update(r.v).digest(),n=Buffer.concat([n,r.v]);a=bits2int(n,e),r.k=createHmac(t,r.k).update(r.v).update(new Buffer([0])).digest(),r.v=createHmac(t,r.k).update(r.v).digest()}while(-1!==a.cmp(e));return a}function makeR(e,r,t,n){return e.toRed(BN.mont(t)).redPow(r).fromRed().mod(n)}var createHmac=require("create-hmac"),crt=require("browserify-rsa"),curves=require("./curves"),elliptic=require("elliptic"),parseKeys=require("parse-asn1"),BN=require("bn.js"),EC=elliptic.ec;module.exports=sign,module.exports.getKey=getKey,module.exports.makeKey=makeKey;

}).call(this,require("buffer").Buffer)
},{"./curves":107,"bn.js":83,"browserify-rsa":104,"buffer":112,"create-hmac":125,"elliptic":142,"parse-asn1":237}],109:[function(require,module,exports){
(function (Buffer){
function verify(e,r,t,n){var o=parseKeys(t);if("ec"===o.type){if("ecdsa"!==n)throw new Error("wrong public key type");return ecVerify(e,r,o)}if("dsa"===o.type){if("dsa"!==n)throw new Error("wrong public key type");return dsaVerify(e,r,o)}if("rsa"!==n)throw new Error("wrong public key type");for(var a=o.modulus.byteLength(),i=[1],u=0;r.length+i.length+2<a;)i.push(255),u++;i.push(0);for(var d=-1;++d<r.length;)i.push(r[d]);i=new Buffer(i);var c=BN.mont(o.modulus);e=new BN(e).toRed(c),e=e.redPow(new BN(o.publicExponent)),e=new Buffer(e.fromRed().toArray());var l=0;for(8>u&&(l=1),a=Math.min(e.length,i.length),e.length!==i.length&&(l=1),d=-1;++d<a;)l|=e[d]^i[d];return 0===l}function ecVerify(e,r,t){var n=curves[t.data.algorithm.curve.join(".")];if(!n)throw new Error("unknown curve "+t.data.algorithm.curve.join("."));var o=new EC(n),a=t.data.subjectPrivateKey.data;return o.verify(r,e,a)}function dsaVerify(e,r,t){var n=t.data.p,o=t.data.q,a=t.data.g,i=t.data.pub_key,u=parseKeys.signature.decode(e,"der"),d=u.s,c=u.r;checkValue(d,o),checkValue(c,o);var l=BN.mont(n),f=d.invm(o),s=a.toRed(l).redPow(new BN(r).mul(f).mod(o)).fromRed().mul(i.toRed(l).redPow(c.mul(f).mod(o)).fromRed()).mod(n).mod(o);return!s.cmp(c)}function checkValue(e,r){if(e.cmpn(0)<=0)throw new Error("invalid sig");if(e.cmp(r)>=r)throw new Error("invalid sig")}var curves=require("./curves"),elliptic=require("elliptic"),parseKeys=require("parse-asn1"),BN=require("bn.js"),EC=elliptic.ec;module.exports=verify;

}).call(this,require("buffer").Buffer)
},{"./curves":107,"bn.js":83,"buffer":112,"elliptic":142,"parse-asn1":237}],110:[function(require,module,exports){

},{}],111:[function(require,module,exports){
(function (Buffer){
module.exports=function(e,n){for(var r=Math.min(e.length,n.length),t=new Buffer(r),f=0;r>f;++f)t[f]=e[f]^n[f];return t};

}).call(this,require("buffer").Buffer)
},{"buffer":112}],112:[function(require,module,exports){
(function (global){
"use strict";function typedArraySupport(){try{var t=new Uint8Array(1);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(e){return!1}}function kMaxLength(){return Buffer.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function Buffer(t){return this instanceof Buffer?(Buffer.TYPED_ARRAY_SUPPORT||(this.length=0,this.parent=void 0),"number"==typeof t?fromNumber(this,t):"string"==typeof t?fromString(this,t,arguments.length>1?arguments[1]:"utf8"):fromObject(this,t)):arguments.length>1?new Buffer(t,arguments[1]):new Buffer(t)}function fromNumber(t,e){if(t=allocate(t,0>e?0:0|checked(e)),!Buffer.TYPED_ARRAY_SUPPORT)for(var r=0;e>r;r++)t[r]=0;return t}function fromString(t,e,r){"string"==typeof r&&""!==r||(r="utf8");var n=0|byteLength(e,r);return t=allocate(t,n),t.write(e,r),t}function fromObject(t,e){if(Buffer.isBuffer(e))return fromBuffer(t,e);if(isArray(e))return fromArray(t,e);if(null==e)throw new TypeError("must start with number, buffer, array or string");if("undefined"!=typeof ArrayBuffer){if(e.buffer instanceof ArrayBuffer)return fromTypedArray(t,e);if(e instanceof ArrayBuffer)return fromArrayBuffer(t,e)}return e.length?fromArrayLike(t,e):fromJsonObject(t,e)}function fromBuffer(t,e){var r=0|checked(e.length);return t=allocate(t,r),e.copy(t,0,0,r),t}function fromArray(t,e){var r=0|checked(e.length);t=allocate(t,r);for(var n=0;r>n;n+=1)t[n]=255&e[n];return t}function fromTypedArray(t,e){var r=0|checked(e.length);t=allocate(t,r);for(var n=0;r>n;n+=1)t[n]=255&e[n];return t}function fromArrayBuffer(t,e){return e.byteLength,Buffer.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e),t.__proto__=Buffer.prototype):t=fromTypedArray(t,new Uint8Array(e)),t}function fromArrayLike(t,e){var r=0|checked(e.length);t=allocate(t,r);for(var n=0;r>n;n+=1)t[n]=255&e[n];return t}function fromJsonObject(t,e){var r,n=0;"Buffer"===e.type&&isArray(e.data)&&(r=e.data,n=0|checked(r.length)),t=allocate(t,n);for(var f=0;n>f;f+=1)t[f]=255&r[f];return t}function allocate(t,e){Buffer.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e),t.__proto__=Buffer.prototype):t.length=e;var r=0!==e&&e<=Buffer.poolSize>>>1;return r&&(t.parent=rootParent),t}function checked(t){if(t>=kMaxLength())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+kMaxLength().toString(16)+" bytes");return 0|t}function SlowBuffer(t,e){if(!(this instanceof SlowBuffer))return new SlowBuffer(t,e);var r=new Buffer(t,e);return delete r.parent,r}function byteLength(t,e){"string"!=typeof t&&(t=""+t);var r=t.length;if(0===r)return 0;for(var n=!1;;)switch(e){case"ascii":case"binary":case"raw":case"raws":return r;case"utf8":case"utf-8":return utf8ToBytes(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return base64ToBytes(t).length;default:if(n)return utf8ToBytes(t).length;e=(""+e).toLowerCase(),n=!0}}function slowToString(t,e,r){var n=!1;if(e=0|e,r=void 0===r||r===1/0?this.length:0|r,t||(t="utf8"),0>e&&(e=0),r>this.length&&(r=this.length),e>=r)return"";for(;;)switch(t){case"hex":return hexSlice(this,e,r);case"utf8":case"utf-8":return utf8Slice(this,e,r);case"ascii":return asciiSlice(this,e,r);case"binary":return binarySlice(this,e,r);case"base64":return base64Slice(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function hexWrite(t,e,r,n){r=Number(r)||0;var f=t.length-r;n?(n=Number(n),n>f&&(n=f)):n=f;var i=e.length;if(i%2!==0)throw new Error("Invalid hex string");n>i/2&&(n=i/2);for(var o=0;n>o;o++){var u=parseInt(e.substr(2*o,2),16);if(isNaN(u))throw new Error("Invalid hex string");t[r+o]=u}return o}function utf8Write(t,e,r,n){return blitBuffer(utf8ToBytes(e,t.length-r),t,r,n)}function asciiWrite(t,e,r,n){return blitBuffer(asciiToBytes(e),t,r,n)}function binaryWrite(t,e,r,n){return asciiWrite(t,e,r,n)}function base64Write(t,e,r,n){return blitBuffer(base64ToBytes(e),t,r,n)}function ucs2Write(t,e,r,n){return blitBuffer(utf16leToBytes(e,t.length-r),t,r,n)}function base64Slice(t,e,r){return 0===e&&r===t.length?base64.fromByteArray(t):base64.fromByteArray(t.slice(e,r))}function utf8Slice(t,e,r){r=Math.min(t.length,r);for(var n=[],f=e;r>f;){var i=t[f],o=null,u=i>239?4:i>223?3:i>191?2:1;if(r>=f+u){var s,h,a,c;switch(u){case 1:128>i&&(o=i);break;case 2:s=t[f+1],128===(192&s)&&(c=(31&i)<<6|63&s,c>127&&(o=c));break;case 3:s=t[f+1],h=t[f+2],128===(192&s)&&128===(192&h)&&(c=(15&i)<<12|(63&s)<<6|63&h,c>2047&&(55296>c||c>57343)&&(o=c));break;case 4:s=t[f+1],h=t[f+2],a=t[f+3],128===(192&s)&&128===(192&h)&&128===(192&a)&&(c=(15&i)<<18|(63&s)<<12|(63&h)<<6|63&a,c>65535&&1114112>c&&(o=c))}}null===o?(o=65533,u=1):o>65535&&(o-=65536,n.push(o>>>10&1023|55296),o=56320|1023&o),n.push(o),f+=u}return decodeCodePointsArray(n)}function decodeCodePointsArray(t){var e=t.length;if(MAX_ARGUMENTS_LENGTH>=e)return String.fromCharCode.apply(String,t);for(var r="",n=0;e>n;)r+=String.fromCharCode.apply(String,t.slice(n,n+=MAX_ARGUMENTS_LENGTH));return r}function asciiSlice(t,e,r){var n="";r=Math.min(t.length,r);for(var f=e;r>f;f++)n+=String.fromCharCode(127&t[f]);return n}function binarySlice(t,e,r){var n="";r=Math.min(t.length,r);for(var f=e;r>f;f++)n+=String.fromCharCode(t[f]);return n}function hexSlice(t,e,r){var n=t.length;(!e||0>e)&&(e=0),(!r||0>r||r>n)&&(r=n);for(var f="",i=e;r>i;i++)f+=toHex(t[i]);return f}function utf16leSlice(t,e,r){for(var n=t.slice(e,r),f="",i=0;i<n.length;i+=2)f+=String.fromCharCode(n[i]+256*n[i+1]);return f}function checkOffset(t,e,r){if(t%1!==0||0>t)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function checkInt(t,e,r,n,f,i){if(!Buffer.isBuffer(t))throw new TypeError("buffer must be a Buffer instance");if(e>f||i>e)throw new RangeError("value is out of bounds");if(r+n>t.length)throw new RangeError("index out of range")}function objectWriteUInt16(t,e,r,n){0>e&&(e=65535+e+1);for(var f=0,i=Math.min(t.length-r,2);i>f;f++)t[r+f]=(e&255<<8*(n?f:1-f))>>>8*(n?f:1-f)}function objectWriteUInt32(t,e,r,n){0>e&&(e=4294967295+e+1);for(var f=0,i=Math.min(t.length-r,4);i>f;f++)t[r+f]=e>>>8*(n?f:3-f)&255}function checkIEEE754(t,e,r,n,f,i){if(r+n>t.length)throw new RangeError("index out of range");if(0>r)throw new RangeError("index out of range")}function writeFloat(t,e,r,n,f){return f||checkIEEE754(t,e,r,4,3.4028234663852886e38,-3.4028234663852886e38),ieee754.write(t,e,r,n,23,4),r+4}function writeDouble(t,e,r,n,f){return f||checkIEEE754(t,e,r,8,1.7976931348623157e308,-1.7976931348623157e308),ieee754.write(t,e,r,n,52,8),r+8}function base64clean(t){if(t=stringtrim(t).replace(INVALID_BASE64_RE,""),t.length<2)return"";for(;t.length%4!==0;)t+="=";return t}function stringtrim(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function toHex(t){return 16>t?"0"+t.toString(16):t.toString(16)}function utf8ToBytes(t,e){e=e||1/0;for(var r,n=t.length,f=null,i=[],o=0;n>o;o++){if(r=t.charCodeAt(o),r>55295&&57344>r){if(!f){if(r>56319){(e-=3)>-1&&i.push(239,191,189);continue}if(o+1===n){(e-=3)>-1&&i.push(239,191,189);continue}f=r;continue}if(56320>r){(e-=3)>-1&&i.push(239,191,189),f=r;continue}r=(f-55296<<10|r-56320)+65536}else f&&(e-=3)>-1&&i.push(239,191,189);if(f=null,128>r){if((e-=1)<0)break;i.push(r)}else if(2048>r){if((e-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(65536>r){if((e-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(1114112>r))throw new Error("Invalid code point");if((e-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return i}function asciiToBytes(t){for(var e=[],r=0;r<t.length;r++)e.push(255&t.charCodeAt(r));return e}function utf16leToBytes(t,e){for(var r,n,f,i=[],o=0;o<t.length&&!((e-=2)<0);o++)r=t.charCodeAt(o),n=r>>8,f=r%256,i.push(f),i.push(n);return i}function base64ToBytes(t){return base64.toByteArray(base64clean(t))}function blitBuffer(t,e,r,n){for(var f=0;n>f&&!(f+r>=e.length||f>=t.length);f++)e[f+r]=t[f];return f}var base64=require("base64-js"),ieee754=require("ieee754"),isArray=require("isarray");exports.Buffer=Buffer,exports.SlowBuffer=SlowBuffer,exports.INSPECT_MAX_BYTES=50,Buffer.poolSize=8192;var rootParent={};Buffer.TYPED_ARRAY_SUPPORT=void 0!==global.TYPED_ARRAY_SUPPORT?global.TYPED_ARRAY_SUPPORT:typedArraySupport(),Buffer._augment=function(t){return t.__proto__=Buffer.prototype,t},Buffer.TYPED_ARRAY_SUPPORT?(Buffer.prototype.__proto__=Uint8Array.prototype,Buffer.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&Buffer[Symbol.species]===Buffer&&Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:!0})):(Buffer.prototype.length=void 0,Buffer.prototype.parent=void 0),Buffer.isBuffer=function(t){return!(null==t||!t._isBuffer)},Buffer.compare=function(t,e){if(!Buffer.isBuffer(t)||!Buffer.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var r=t.length,n=e.length,f=0,i=Math.min(r,n);i>f;++f)if(t[f]!==e[f]){r=t[f],n=e[f];break}return n>r?-1:r>n?1:0},Buffer.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Buffer.concat=function(t,e){if(!isArray(t))throw new TypeError("list argument must be an Array of Buffers.");if(0===t.length)return new Buffer(0);var r;if(void 0===e)for(e=0,r=0;r<t.length;r++)e+=t[r].length;var n=new Buffer(e),f=0;for(r=0;r<t.length;r++){var i=t[r];i.copy(n,f),f+=i.length}return n},Buffer.byteLength=byteLength,Buffer.prototype._isBuffer=!0,Buffer.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?utf8Slice(this,0,t):slowToString.apply(this,arguments)},Buffer.prototype.equals=function(t){if(!Buffer.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t?!0:0===Buffer.compare(this,t)},Buffer.prototype.inspect=function(){var t="",e=exports.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,e).match(/.{2}/g).join(" "),this.length>e&&(t+=" ... ")),"<Buffer "+t+">"},Buffer.prototype.compare=function(t){if(!Buffer.isBuffer(t))throw new TypeError("Argument must be a Buffer");return Buffer.compare(this,t)},Buffer.prototype.indexOf=function(t,e){function r(t,e,r){for(var n=-1,f=0;r+f<t.length;f++)if(t[r+f]===e[-1===n?0:f-n]){if(-1===n&&(n=f),f-n+1===e.length)return r+n}else n=-1;return-1}if(e>2147483647?e=2147483647:-2147483648>e&&(e=-2147483648),e>>=0,0===this.length)return-1;if(e>=this.length)return-1;if(0>e&&(e=Math.max(this.length+e,0)),"string"==typeof t)return 0===t.length?-1:String.prototype.indexOf.call(this,t,e);if(Buffer.isBuffer(t))return r(this,t,e);if("number"==typeof t)return Buffer.TYPED_ARRAY_SUPPORT&&"function"===Uint8Array.prototype.indexOf?Uint8Array.prototype.indexOf.call(this,t,e):r(this,[t],e);throw new TypeError("val must be string, number or Buffer")},Buffer.prototype.write=function(t,e,r,n){if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else if(isFinite(e))e=0|e,isFinite(r)?(r=0|r,void 0===n&&(n="utf8")):(n=r,r=void 0);else{var f=n;n=e,e=0|r,r=f}var i=this.length-e;if((void 0===r||r>i)&&(r=i),t.length>0&&(0>r||0>e)||e>this.length)throw new RangeError("attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return hexWrite(this,t,e,r);case"utf8":case"utf-8":return utf8Write(this,t,e,r);case"ascii":return asciiWrite(this,t,e,r);case"binary":return binaryWrite(this,t,e,r);case"base64":return base64Write(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,t,e,r);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},Buffer.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var MAX_ARGUMENTS_LENGTH=4096;Buffer.prototype.slice=function(t,e){var r=this.length;t=~~t,e=void 0===e?r:~~e,0>t?(t+=r,0>t&&(t=0)):t>r&&(t=r),0>e?(e+=r,0>e&&(e=0)):e>r&&(e=r),t>e&&(e=t);var n;if(Buffer.TYPED_ARRAY_SUPPORT)n=this.subarray(t,e),n.__proto__=Buffer.prototype;else{var f=e-t;n=new Buffer(f,void 0);for(var i=0;f>i;i++)n[i]=this[i+t]}return n.length&&(n.parent=this.parent||this),n},Buffer.prototype.readUIntLE=function(t,e,r){t=0|t,e=0|e,r||checkOffset(t,e,this.length);for(var n=this[t],f=1,i=0;++i<e&&(f*=256);)n+=this[t+i]*f;return n},Buffer.prototype.readUIntBE=function(t,e,r){t=0|t,e=0|e,r||checkOffset(t,e,this.length);for(var n=this[t+--e],f=1;e>0&&(f*=256);)n+=this[t+--e]*f;return n},Buffer.prototype.readUInt8=function(t,e){return e||checkOffset(t,1,this.length),this[t]},Buffer.prototype.readUInt16LE=function(t,e){return e||checkOffset(t,2,this.length),this[t]|this[t+1]<<8},Buffer.prototype.readUInt16BE=function(t,e){return e||checkOffset(t,2,this.length),this[t]<<8|this[t+1]},Buffer.prototype.readUInt32LE=function(t,e){return e||checkOffset(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},Buffer.prototype.readUInt32BE=function(t,e){return e||checkOffset(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},Buffer.prototype.readIntLE=function(t,e,r){t=0|t,e=0|e,r||checkOffset(t,e,this.length);for(var n=this[t],f=1,i=0;++i<e&&(f*=256);)n+=this[t+i]*f;return f*=128,n>=f&&(n-=Math.pow(2,8*e)),n},Buffer.prototype.readIntBE=function(t,e,r){t=0|t,e=0|e,r||checkOffset(t,e,this.length);for(var n=e,f=1,i=this[t+--n];n>0&&(f*=256);)i+=this[t+--n]*f;return f*=128,i>=f&&(i-=Math.pow(2,8*e)),i},Buffer.prototype.readInt8=function(t,e){return e||checkOffset(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},Buffer.prototype.readInt16LE=function(t,e){e||checkOffset(t,2,this.length);var r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt16BE=function(t,e){e||checkOffset(t,2,this.length);var r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt32LE=function(t,e){return e||checkOffset(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},Buffer.prototype.readInt32BE=function(t,e){return e||checkOffset(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},Buffer.prototype.readFloatLE=function(t,e){return e||checkOffset(t,4,this.length),ieee754.read(this,t,!0,23,4)},Buffer.prototype.readFloatBE=function(t,e){return e||checkOffset(t,4,this.length),ieee754.read(this,t,!1,23,4)},Buffer.prototype.readDoubleLE=function(t,e){return e||checkOffset(t,8,this.length),ieee754.read(this,t,!0,52,8)},Buffer.prototype.readDoubleBE=function(t,e){return e||checkOffset(t,8,this.length),ieee754.read(this,t,!1,52,8)},Buffer.prototype.writeUIntLE=function(t,e,r,n){t=+t,e=0|e,r=0|r,n||checkInt(this,t,e,r,Math.pow(2,8*r),0);var f=1,i=0;for(this[e]=255&t;++i<r&&(f*=256);)this[e+i]=t/f&255;return e+r},Buffer.prototype.writeUIntBE=function(t,e,r,n){t=+t,e=0|e,r=0|r,n||checkInt(this,t,e,r,Math.pow(2,8*r),0);var f=r-1,i=1;for(this[e+f]=255&t;--f>=0&&(i*=256);)this[e+f]=t/i&255;return e+r},Buffer.prototype.writeUInt8=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,1,255,0),Buffer.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=255&t,e+1},Buffer.prototype.writeUInt16LE=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):objectWriteUInt16(this,t,e,!0),e+2},Buffer.prototype.writeUInt16BE=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):objectWriteUInt16(this,t,e,!1),e+2},Buffer.prototype.writeUInt32LE=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t):objectWriteUInt32(this,t,e,!0),e+4},Buffer.prototype.writeUInt32BE=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):objectWriteUInt32(this,t,e,!1),e+4},Buffer.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e=0|e,!n){var f=Math.pow(2,8*r-1);checkInt(this,t,e,r,f-1,-f)}var i=0,o=1,u=0>t?1:0;for(this[e]=255&t;++i<r&&(o*=256);)this[e+i]=(t/o>>0)-u&255;return e+r},Buffer.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e=0|e,!n){var f=Math.pow(2,8*r-1);checkInt(this,t,e,r,f-1,-f)}var i=r-1,o=1,u=0>t?1:0;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=(t/o>>0)-u&255;return e+r},Buffer.prototype.writeInt8=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,1,127,-128),Buffer.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),0>t&&(t=255+t+1),this[e]=255&t,e+1},Buffer.prototype.writeInt16LE=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):objectWriteUInt16(this,t,e,!0),e+2},Buffer.prototype.writeInt16BE=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):objectWriteUInt16(this,t,e,!1),e+2},Buffer.prototype.writeInt32LE=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,4,2147483647,-2147483648),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):objectWriteUInt32(this,t,e,!0),e+4},Buffer.prototype.writeInt32BE=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,4,2147483647,-2147483648),0>t&&(t=4294967295+t+1),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):objectWriteUInt32(this,t,e,!1),e+4},Buffer.prototype.writeFloatLE=function(t,e,r){return writeFloat(this,t,e,!0,r)},Buffer.prototype.writeFloatBE=function(t,e,r){return writeFloat(this,t,e,!1,r)},Buffer.prototype.writeDoubleLE=function(t,e,r){return writeDouble(this,t,e,!0,r)},Buffer.prototype.writeDoubleBE=function(t,e,r){return writeDouble(this,t,e,!1,r)},Buffer.prototype.copy=function(t,e,r,n){if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&r>n&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(0>e)throw new RangeError("targetStart out of bounds");if(0>r||r>=this.length)throw new RangeError("sourceStart out of bounds");if(0>n)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var f,i=n-r;if(this===t&&e>r&&n>e)for(f=i-1;f>=0;f--)t[f+e]=this[f+r];else if(1e3>i||!Buffer.TYPED_ARRAY_SUPPORT)for(f=0;i>f;f++)t[f+e]=this[f+r];else Uint8Array.prototype.set.call(t,this.subarray(r,r+i),e);return i},Buffer.prototype.fill=function(t,e,r){if(t||(t=0),e||(e=0),r||(r=this.length),e>r)throw new RangeError("end < start");if(r!==e&&0!==this.length){if(0>e||e>=this.length)throw new RangeError("start out of bounds");if(0>r||r>this.length)throw new RangeError("end out of bounds");var n;if("number"==typeof t)for(n=e;r>n;n++)this[n]=t;else{var f=utf8ToBytes(t.toString()),i=f.length;for(n=e;r>n;n++)this[n]=f[n%i]}return this}};var INVALID_BASE64_RE=/[^+\/0-9A-Za-z-_]/g;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"base64-js":82,"ieee754":211,"isarray":113}],113:[function(require,module,exports){
var toString={}.toString;module.exports=Array.isArray||function(r){return"[object Array]"==toString.call(r)};

},{}],114:[function(require,module,exports){
module.exports={100:"Continue",101:"Switching Protocols",102:"Processing",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",208:"Already Reported",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",307:"Temporary Redirect",308:"Permanent Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",418:"I'm a teapot",421:"Misdirected Request",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Unordered Collection",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",508:"Loop Detected",509:"Bandwidth Limit Exceeded",510:"Not Extended",511:"Network Authentication Required"};

},{}],115:[function(require,module,exports){
(function (Buffer){
function CipherBase(t){Transform.call(this),this.hashMode="string"==typeof t,this.hashMode?this[t]=this._finalOrDigest:this["final"]=this._finalOrDigest,this._decoder=null,this._encoding=null}var Transform=require("stream").Transform,inherits=require("inherits"),StringDecoder=require("string_decoder").StringDecoder;module.exports=CipherBase,inherits(CipherBase,Transform),CipherBase.prototype.update=function(t,e,r){"string"==typeof t&&(t=new Buffer(t,e));var i=this._update(t);return this.hashMode?this:(r&&(i=this._toString(i,r)),i)},CipherBase.prototype.setAutoPadding=function(){},CipherBase.prototype.getAuthTag=function(){throw new Error("trying to get auth tag in unsupported state")},CipherBase.prototype.setAuthTag=function(){throw new Error("trying to set auth tag in unsupported state")},CipherBase.prototype.setAAD=function(){throw new Error("trying to set aad in unsupported state")},CipherBase.prototype._transform=function(t,e,r){var i;try{this.hashMode?this._update(t):this.push(this._update(t))}catch(n){i=n}finally{r(i)}},CipherBase.prototype._flush=function(t){var e;try{this.push(this._final())}catch(r){e=r}finally{t(e)}},CipherBase.prototype._finalOrDigest=function(t){var e=this._final()||new Buffer("");return t&&(e=this._toString(e,t,!0)),e},CipherBase.prototype._toString=function(t,e,r){if(this._decoder||(this._decoder=new StringDecoder(e),this._encoding=e),this._encoding!==e)throw new Error("can't switch encodings");var i=this._decoder.write(t);return r&&(i+=this._decoder.end()),i};

}).call(this,require("buffer").Buffer)
},{"buffer":112,"inherits":213,"stream":282,"string_decoder":287}],116:[function(require,module,exports){
(function (Buffer){
"use strict";function contentDisposition(e,t){var r=t||{},n=r.type||"attachment",a=createparams(e,r.fallback);return format(new ContentDisposition(n,a))}function createparams(e,t){if(void 0!==e){var r={};if("string"!=typeof e)throw new TypeError("filename must be a string");if(void 0===t&&(t=!0),"string"!=typeof t&&"boolean"!=typeof t)throw new TypeError("fallback must be a string or boolean");if("string"==typeof t&&nonLatin1RegExp.test(t))throw new TypeError("fallback must be ISO-8859-1 string");var n=basename(e),a=textRegExp.test(n),o="string"!=typeof t?t&&getlatin1(n):basename(t),i="string"==typeof o&&o!==n;return(i||!a||hexEscapeRegExp.test(n))&&(r["filename*"]=n),(a||i)&&(r.filename=i?o:n),r}}function format(e){var t=e.parameters,r=e.type;if(!r||"string"!=typeof r||!tokenRegExp.test(r))throw new TypeError("invalid type");var n=String(r).toLowerCase();if(t&&"object"==typeof t)for(var a,o=Object.keys(t).sort(),i=0;i<o.length;i++){a=o[i];var p="*"===a.substr(-1)?ustring(t[a]):qstring(t[a]);n+="; "+a+"="+p}return n}function decodefield(e){var t=extValueRegExp.exec(e);if(!t)throw new TypeError("invalid extended field value");var r,n=t[1].toLowerCase(),a=t[2],o=a.replace(hexEscapeReplaceRegExp,pdecode);switch(n){case"iso-8859-1":r=getlatin1(o);break;case"utf-8":r=new Buffer(o,"binary").toString("utf8");break;default:throw new TypeError("unsupported charset in extended field")}return r}function getlatin1(e){return String(e).replace(nonLatin1RegExp,"?")}function parse(e){if(!e||"string"!=typeof e)throw new TypeError("argument string is required");var t=dispositionTypeRegExp.exec(e);if(!t)throw new TypeError("invalid type format");var r,n,a=t[0].length,o=t[1].toLowerCase(),i=[],p={};for(a=paramRegExp.lastIndex=";"===t[0].substr(-1)?a-1:a;t=paramRegExp.exec(e);){if(t.index!==a)throw new TypeError("invalid parameter format");if(a+=t[0].length,r=t[1].toLowerCase(),n=t[2],-1!==i.indexOf(r))throw new TypeError("invalid duplicate parameter");i.push(r),r.indexOf("*")+1!==r.length?"string"!=typeof p[r]&&('"'===n[0]&&(n=n.substr(1,n.length-2).replace(qescRegExp,"$1")),p[r]=n):(r=r.slice(0,-1),n=decodefield(n),p[r]=n)}if(-1!==a&&a!==e.length)throw new TypeError("invalid parameter format");return new ContentDisposition(o,p)}function pdecode(e,t){return String.fromCharCode(parseInt(t,16))}function pencode(e){var t=String(e).charCodeAt(0).toString(16).toUpperCase();return 1===t.length?"%0"+t:"%"+t}function qstring(e){var t=String(e);return'"'+t.replace(quoteRegExp,"\\$1")+'"'}function ustring(e){var t=String(e),r=encodeURIComponent(t).replace(encodeUriAttrCharRegExp,pencode);return"UTF-8''"+r}function ContentDisposition(e,t){this.type=e,this.parameters=t}module.exports=contentDisposition,module.exports.parse=parse;var basename=require("path").basename,encodeUriAttrCharRegExp=/[\x00-\x20"'\(\)*,\/:;<=>?@\[\\\]\{\}\x7f]/g,hexEscapeRegExp=/%[0-9A-Fa-f]{2}/,hexEscapeReplaceRegExp=/%([0-9A-Fa-f]{2})/g,nonLatin1RegExp=/[^\x20-\x7e\xa0-\xff]/g,qescRegExp=/\\([\u0000-\u007f])/g,quoteRegExp=/([\\"])/g,paramRegExp=/; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\x20-\x7e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g,textRegExp=/^[\x20-\x7e\x80-\xff]+$/,tokenRegExp=/^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/,extValueRegExp=/^([A-Za-z0-9!#$%&+\-^_`{}~]+)'(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}|[A-Za-z]{4,8}|)'((?:%[0-9A-Fa-f]{2}|[A-Za-z0-9!#$&+\-\.^_`|~])+)$/,dispositionTypeRegExp=/^([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *(?:$|;)/;

}).call(this,require("buffer").Buffer)
},{"buffer":112,"path":240}],117:[function(require,module,exports){
function format(e){if(!e||"object"!=typeof e)throw new TypeError("argument obj is required");var t=e.parameters,r=e.type;if(!r||!typeRegExp.test(r))throw new TypeError("invalid type");var n=r;if(t&&"object"==typeof t)for(var o,a=Object.keys(t).sort(),p=0;p<a.length;p++){if(o=a[p],!tokenRegExp.test(o))throw new TypeError("invalid parameter name");n+="; "+o+"="+qstring(t[o])}return n}function parse(e){if(!e)throw new TypeError("argument string is required");if("object"==typeof e&&(e=getcontenttype(e),"string"!=typeof e))throw new TypeError("content-type header is missing from object");if("string"!=typeof e)throw new TypeError("argument string is required to be a string");var t=e.indexOf(";"),r=-1!==t?e.substr(0,t).trim():e.trim();if(!typeRegExp.test(r))throw new TypeError("invalid media type");var n,o,a,p=new ContentType(r.toLowerCase());for(paramRegExp.lastIndex=t;o=paramRegExp.exec(e);){if(o.index!==t)throw new TypeError("invalid parameter format");t+=o[0].length,n=o[1].toLowerCase(),a=o[2],'"'===a[0]&&(a=a.substr(1,a.length-2).replace(qescRegExp,"$1")),p.parameters[n]=a}if(-1!==t&&t!==e.length)throw new TypeError("invalid parameter format");return p}function getcontenttype(e){return"function"==typeof e.getHeader?e.getHeader("content-type"):"object"==typeof e.headers?e.headers&&e.headers["content-type"]:void 0}function qstring(e){var t=String(e);if(tokenRegExp.test(t))return t;if(t.length>0&&!textRegExp.test(t))throw new TypeError("invalid parameter value");return'"'+t.replace(quoteRegExp,"\\$1")+'"'}function ContentType(e){this.parameters=Object.create(null),this.type=e}var paramRegExp=/; *([!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) */g,textRegExp=/^[\u000b\u0020-\u007e\u0080-\u00ff]+$/,tokenRegExp=/^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/,qescRegExp=/\\([\u000b\u0020-\u00ff])/g,quoteRegExp=/([\\"])/g,typeRegExp=/^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+\/[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/;exports.format=format,exports.parse=parse;

},{}],118:[function(require,module,exports){
function sha1(e){return crypto.createHash("sha1").update(e).digest("hex")}var crypto=require("crypto");exports.sign=function(e,r){if("string"!=typeof e)throw new TypeError("Cookie value must be provided as a string.");if("string"!=typeof r)throw new TypeError("Secret string must be provided.");return e+"."+crypto.createHmac("sha256",r).update(e).digest("base64").replace(/\=+$/,"")},exports.unsign=function(e,r){if("string"!=typeof e)throw new TypeError("Signed cookie string must be provided.");if("string"!=typeof r)throw new TypeError("Secret string must be provided.");var t=e.slice(0,e.lastIndexOf(".")),o=exports.sign(t,r);return sha1(o)==sha1(e)?t:!1};

},{"crypto":126}],119:[function(require,module,exports){
function parse(e,r){if("string"!=typeof e)throw new TypeError("argument str must be a string");var t={},n=r||{},i=e.split(/; */),o=n.decode||decode;return i.forEach(function(e){var r=e.indexOf("=");if(!(0>r)){var n=e.substr(0,r).trim(),i=e.substr(++r,e.length).trim();'"'==i[0]&&(i=i.slice(1,-1)),void 0==t[n]&&(t[n]=tryDecode(i,o))}}),t}function serialize(e,r,t){var n=t||{},i=n.encode||encode;if(!fieldContentRegExp.test(e))throw new TypeError("argument name is invalid");var o=i(r);if(o&&!fieldContentRegExp.test(o))throw new TypeError("argument val is invalid");var a=[e+"="+o];if(null!=n.maxAge){var s=n.maxAge-0;if(isNaN(s))throw new Error("maxAge should be a Number");a.push("Max-Age="+s)}if(n.domain){if(!fieldContentRegExp.test(n.domain))throw new TypeError("option domain is invalid");a.push("Domain="+n.domain)}if(n.path){if(!fieldContentRegExp.test(n.path))throw new TypeError("option path is invalid");a.push("Path="+n.path)}return n.expires&&a.push("Expires="+n.expires.toUTCString()),n.httpOnly&&a.push("HttpOnly"),n.secure&&a.push("Secure"),a.join("; ")}function tryDecode(e,r){try{return r(e)}catch(t){return e}}exports.parse=parse,exports.serialize=serialize;var decode=decodeURIComponent,encode=encodeURIComponent,fieldContentRegExp=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

},{}],120:[function(require,module,exports){
(function (Buffer){
function isArray(r){return Array.isArray?Array.isArray(r):"[object Array]"===objectToString(r)}function isBoolean(r){return"boolean"==typeof r}function isNull(r){return null===r}function isNullOrUndefined(r){return null==r}function isNumber(r){return"number"==typeof r}function isString(r){return"string"==typeof r}function isSymbol(r){return"symbol"==typeof r}function isUndefined(r){return void 0===r}function isRegExp(r){return"[object RegExp]"===objectToString(r)}function isObject(r){return"object"==typeof r&&null!==r}function isDate(r){return"[object Date]"===objectToString(r)}function isError(r){return"[object Error]"===objectToString(r)||r instanceof Error}function isFunction(r){return"function"==typeof r}function isPrimitive(r){return null===r||"boolean"==typeof r||"number"==typeof r||"string"==typeof r||"symbol"==typeof r||"undefined"==typeof r}function objectToString(r){return Object.prototype.toString.call(r)}exports.isArray=isArray,exports.isBoolean=isBoolean,exports.isNull=isNull,exports.isNullOrUndefined=isNullOrUndefined,exports.isNumber=isNumber,exports.isString=isString,exports.isSymbol=isSymbol,exports.isUndefined=isUndefined,exports.isRegExp=isRegExp,exports.isObject=isObject,exports.isDate=isDate,exports.isError=isError,exports.isFunction=isFunction,exports.isPrimitive=isPrimitive,exports.isBuffer=Buffer.isBuffer;

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
},{"../../is-buffer/index.js":215}],121:[function(require,module,exports){
(function (Buffer){
function ECDH(e){this.curveType=aliases[e],this.curveType||(this.curveType={name:e}),this.curve=new elliptic.ec(this.curveType.name),this.keys=void 0}function formatReturnValue(e,t,r){Array.isArray(e)||(e=e.toArray());var i=new Buffer(e);if(r&&i.length<r){var s=new Buffer(r-i.length);s.fill(0),i=Buffer.concat([s,i])}return t?i.toString(t):i}var elliptic=require("elliptic"),BN=require("bn.js");module.exports=function(e){return new ECDH(e)};var aliases={secp256k1:{name:"secp256k1",byteLength:32},secp224r1:{name:"p224",byteLength:28},prime256v1:{name:"p256",byteLength:32},prime192v1:{name:"p192",byteLength:24},ed25519:{name:"ed25519",byteLength:32},secp384r1:{name:"p384",byteLength:48},secp521r1:{name:"p521",byteLength:66}};aliases.p224=aliases.secp224r1,aliases.p256=aliases.secp256r1=aliases.prime256v1,aliases.p192=aliases.secp192r1=aliases.prime192v1,aliases.p384=aliases.secp384r1,aliases.p521=aliases.secp521r1,ECDH.prototype.generateKeys=function(e,t){return this.keys=this.curve.genKeyPair(),this.getPublicKey(e,t)},ECDH.prototype.computeSecret=function(e,t,r){t=t||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,t));var i=this.curve.keyFromPublic(e).getPublic(),s=i.mul(this.keys.getPrivate()).getX();return formatReturnValue(s,r,this.curveType.byteLength)},ECDH.prototype.getPublicKey=function(e,t){var r=this.keys.getPublic("compressed"===t,!0);return"hybrid"===t&&(r[r.length-1]%2?r[0]=7:r[0]=6),formatReturnValue(r,e)},ECDH.prototype.getPrivateKey=function(e){return formatReturnValue(this.keys.getPrivate(),e)},ECDH.prototype.setPublicKey=function(e,t){return t=t||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,t)),this.keys._importPublic(e),this},ECDH.prototype.setPrivateKey=function(e,t){t=t||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,t));var r=new BN(e);return r=r.toString(16),this.keys._importPrivate(r),this};

}).call(this,require("buffer").Buffer)
},{"bn.js":83,"buffer":112,"elliptic":142}],122:[function(require,module,exports){
(function (Buffer){
"use strict";function HashNoConstructor(s){Base.call(this,"digest"),this._hash=s,this.buffers=[]}function Hash(s){Base.call(this,"digest"),this._hash=s}var inherits=require("inherits"),md5=require("./md5"),rmd160=require("ripemd160"),sha=require("sha.js"),Base=require("cipher-base");inherits(HashNoConstructor,Base),HashNoConstructor.prototype._update=function(s){this.buffers.push(s)},HashNoConstructor.prototype._final=function(){var s=Buffer.concat(this.buffers),t=this._hash(s);return this.buffers=null,t},inherits(Hash,Base),Hash.prototype._update=function(s){this._hash.update(s)},Hash.prototype._final=function(){return this._hash.digest()},module.exports=function(s){return s=s.toLowerCase(),"md5"===s?new HashNoConstructor(md5):"rmd160"===s||"ripemd160"===s?new HashNoConstructor(rmd160):new Hash(sha(s))};

}).call(this,require("buffer").Buffer)
},{"./md5":124,"buffer":112,"cipher-base":115,"inherits":213,"ripemd160":269,"sha.js":273}],123:[function(require,module,exports){
(function (Buffer){
"use strict";function toArray(r,e){if(r.length%intSize!==0){var t=r.length+(intSize-r.length%intSize);r=Buffer.concat([r,zeroBuffer],t)}for(var f=[],n=e?r.readInt32BE:r.readInt32LE,i=0;i<r.length;i+=intSize)f.push(n.call(r,i));return f}function toBuffer(r,e,t){for(var f=new Buffer(e),n=t?f.writeInt32BE:f.writeInt32LE,i=0;i<r.length;i++)n.call(f,r[i],4*i,!0);return f}function hash(r,e,t,f){Buffer.isBuffer(r)||(r=new Buffer(r));var n=e(toArray(r,f),r.length*chrsz);return toBuffer(n,t,f)}var intSize=4,zeroBuffer=new Buffer(intSize);zeroBuffer.fill(0);var chrsz=8;exports.hash=hash;

}).call(this,require("buffer").Buffer)
},{"buffer":112}],124:[function(require,module,exports){
"use strict";function core_md5(d,_){d[_>>5]|=128<<_%32,d[(_+64>>>9<<4)+14]=_;for(var m=1732584193,f=-271733879,i=-1732584194,h=271733878,r=0;r<d.length;r+=16){var g=m,n=f,e=i,a=h;m=md5_ff(m,f,i,h,d[r+0],7,-680876936),h=md5_ff(h,m,f,i,d[r+1],12,-389564586),i=md5_ff(i,h,m,f,d[r+2],17,606105819),f=md5_ff(f,i,h,m,d[r+3],22,-1044525330),m=md5_ff(m,f,i,h,d[r+4],7,-176418897),h=md5_ff(h,m,f,i,d[r+5],12,1200080426),i=md5_ff(i,h,m,f,d[r+6],17,-1473231341),f=md5_ff(f,i,h,m,d[r+7],22,-45705983),m=md5_ff(m,f,i,h,d[r+8],7,1770035416),h=md5_ff(h,m,f,i,d[r+9],12,-1958414417),i=md5_ff(i,h,m,f,d[r+10],17,-42063),f=md5_ff(f,i,h,m,d[r+11],22,-1990404162),m=md5_ff(m,f,i,h,d[r+12],7,1804603682),h=md5_ff(h,m,f,i,d[r+13],12,-40341101),i=md5_ff(i,h,m,f,d[r+14],17,-1502002290),f=md5_ff(f,i,h,m,d[r+15],22,1236535329),m=md5_gg(m,f,i,h,d[r+1],5,-165796510),h=md5_gg(h,m,f,i,d[r+6],9,-1069501632),i=md5_gg(i,h,m,f,d[r+11],14,643717713),f=md5_gg(f,i,h,m,d[r+0],20,-373897302),m=md5_gg(m,f,i,h,d[r+5],5,-701558691),h=md5_gg(h,m,f,i,d[r+10],9,38016083),i=md5_gg(i,h,m,f,d[r+15],14,-660478335),f=md5_gg(f,i,h,m,d[r+4],20,-405537848),m=md5_gg(m,f,i,h,d[r+9],5,568446438),h=md5_gg(h,m,f,i,d[r+14],9,-1019803690),i=md5_gg(i,h,m,f,d[r+3],14,-187363961),f=md5_gg(f,i,h,m,d[r+8],20,1163531501),m=md5_gg(m,f,i,h,d[r+13],5,-1444681467),h=md5_gg(h,m,f,i,d[r+2],9,-51403784),i=md5_gg(i,h,m,f,d[r+7],14,1735328473),f=md5_gg(f,i,h,m,d[r+12],20,-1926607734),m=md5_hh(m,f,i,h,d[r+5],4,-378558),h=md5_hh(h,m,f,i,d[r+8],11,-2022574463),i=md5_hh(i,h,m,f,d[r+11],16,1839030562),f=md5_hh(f,i,h,m,d[r+14],23,-35309556),m=md5_hh(m,f,i,h,d[r+1],4,-1530992060),h=md5_hh(h,m,f,i,d[r+4],11,1272893353),i=md5_hh(i,h,m,f,d[r+7],16,-155497632),f=md5_hh(f,i,h,m,d[r+10],23,-1094730640),m=md5_hh(m,f,i,h,d[r+13],4,681279174),h=md5_hh(h,m,f,i,d[r+0],11,-358537222),i=md5_hh(i,h,m,f,d[r+3],16,-722521979),f=md5_hh(f,i,h,m,d[r+6],23,76029189),m=md5_hh(m,f,i,h,d[r+9],4,-640364487),h=md5_hh(h,m,f,i,d[r+12],11,-421815835),i=md5_hh(i,h,m,f,d[r+15],16,530742520),f=md5_hh(f,i,h,m,d[r+2],23,-995338651),m=md5_ii(m,f,i,h,d[r+0],6,-198630844),h=md5_ii(h,m,f,i,d[r+7],10,1126891415),i=md5_ii(i,h,m,f,d[r+14],15,-1416354905),f=md5_ii(f,i,h,m,d[r+5],21,-57434055),m=md5_ii(m,f,i,h,d[r+12],6,1700485571),h=md5_ii(h,m,f,i,d[r+3],10,-1894986606),i=md5_ii(i,h,m,f,d[r+10],15,-1051523),f=md5_ii(f,i,h,m,d[r+1],21,-2054922799),m=md5_ii(m,f,i,h,d[r+8],6,1873313359),h=md5_ii(h,m,f,i,d[r+15],10,-30611744),i=md5_ii(i,h,m,f,d[r+6],15,-1560198380),f=md5_ii(f,i,h,m,d[r+13],21,1309151649),m=md5_ii(m,f,i,h,d[r+4],6,-145523070),h=md5_ii(h,m,f,i,d[r+11],10,-1120210379),i=md5_ii(i,h,m,f,d[r+2],15,718787259),f=md5_ii(f,i,h,m,d[r+9],21,-343485551),m=safe_add(m,g),f=safe_add(f,n),i=safe_add(i,e),h=safe_add(h,a)}return Array(m,f,i,h)}function md5_cmn(d,_,m,f,i,h){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,h)),i),m)}function md5_ff(d,_,m,f,i,h,r){return md5_cmn(_&m|~_&f,d,_,i,h,r)}function md5_gg(d,_,m,f,i,h,r){return md5_cmn(_&f|m&~f,d,_,i,h,r)}function md5_hh(d,_,m,f,i,h,r){return md5_cmn(_^m^f,d,_,i,h,r)}function md5_ii(d,_,m,f,i,h,r){return md5_cmn(m^(_|~f),d,_,i,h,r)}function safe_add(d,_){var m=(65535&d)+(65535&_),f=(d>>16)+(_>>16)+(m>>16);return f<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}var helpers=require("./helpers");module.exports=function(d){return helpers.hash(d,core_md5,16)};

},{"./helpers":123}],125:[function(require,module,exports){
(function (Buffer){
"use strict";function Hmac(t,e){Transform.call(this),t=t.toLowerCase(),"string"==typeof e&&(e=new Buffer(e));var r="sha512"===t||"sha384"===t?128:64;this._alg=t,this._key=e,e.length>r?e=createHash(t).update(e).digest():e.length<r&&(e=Buffer.concat([e,ZEROS],r));for(var a=this._ipad=new Buffer(r),s=this._opad=new Buffer(r),i=0;r>i;i++)a[i]=54^e[i],s[i]=92^e[i];this._hash=createHash(t).update(a)}var createHash=require("create-hash/browser"),inherits=require("inherits"),Transform=require("stream").Transform,ZEROS=new Buffer(128);ZEROS.fill(0),inherits(Hmac,Transform),Hmac.prototype.update=function(t,e){return this._hash.update(t,e),this},Hmac.prototype._transform=function(t,e,r){this._hash.update(t),r()},Hmac.prototype._flush=function(t){this.push(this.digest()),t()},Hmac.prototype.digest=function(t){var e=this._hash.digest();return createHash(this._alg).update(this._opad).update(e).digest(t)},module.exports=function(t,e){return new Hmac(t,e)};

}).call(this,require("buffer").Buffer)
},{"buffer":112,"create-hash/browser":122,"inherits":213,"stream":282}],126:[function(require,module,exports){
"use strict";exports.randomBytes=exports.rng=exports.pseudoRandomBytes=exports.prng=require("randombytes"),exports.createHash=exports.Hash=require("create-hash"),exports.createHmac=exports.Hmac=require("create-hmac");var hashes=["sha1","sha224","sha256","sha384","sha512","md5","rmd160"].concat(Object.keys(require("browserify-sign/algos")));exports.getHashes=function(){return hashes};var p=require("pbkdf2");exports.pbkdf2=p.pbkdf2,exports.pbkdf2Sync=p.pbkdf2Sync;var aes=require("browserify-cipher");["Cipher","createCipher","Cipheriv","createCipheriv","Decipher","createDecipher","Decipheriv","createDecipheriv","getCiphers","listCiphers"].forEach(function(e){exports[e]=aes[e]});var dh=require("diffie-hellman");["DiffieHellmanGroup","createDiffieHellmanGroup","getDiffieHellman","createDiffieHellman","DiffieHellman"].forEach(function(e){exports[e]=dh[e]});var sign=require("browserify-sign");["createSign","Sign","createVerify","Verify"].forEach(function(e){exports[e]=sign[e]}),exports.createECDH=require("create-ecdh");var publicEncrypt=require("public-encrypt");["publicEncrypt","privateEncrypt","publicDecrypt","privateDecrypt"].forEach(function(e){exports[e]=publicEncrypt[e]}),["createCredentials"].forEach(function(e){exports[e]=function(){throw new Error(["sorry, "+e+" is not implemented yet","we accept pull requests","https://github.com/crypto-browserify/crypto-browserify"].join("\n"))}});

},{"browserify-cipher":101,"browserify-sign":106,"browserify-sign/algos":105,"create-ecdh":121,"create-hash":122,"create-hmac":125,"diffie-hellman":137,"pbkdf2":242,"public-encrypt":246,"randombytes":256}],127:[function(require,module,exports){
function useColors(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function formatArgs(){var o=arguments,e=this.useColors;if(o[0]=(e?"%c":"")+this.namespace+(e?" %c":" ")+o[0]+(e?"%c ":" ")+"+"+exports.humanize(this.diff),!e)return o;var r="color: "+this.color;o=[o[0],r,"color: inherit"].concat(Array.prototype.slice.call(o,1));var t=0,s=0;return o[0].replace(/%[a-z%]/g,function(o){"%%"!==o&&(t++,"%c"===o&&(s=t))}),o.splice(s,0,r),o}function log(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function save(o){try{null==o?exports.storage.removeItem("debug"):exports.storage.debug=o}catch(e){}}function load(){var o;try{o=exports.storage.debug}catch(e){}return o}function localstorage(){try{return window.localStorage}catch(o){}}exports=module.exports=require("./debug"),exports.log=log,exports.formatArgs=formatArgs,exports.save=save,exports.load=load,exports.useColors=useColors,exports.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:localstorage(),exports.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],exports.formatters.j=function(o){return JSON.stringify(o)},exports.enable(load());

},{"./debug":128}],128:[function(require,module,exports){
function selectColor(){return exports.colors[prevColor++%exports.colors.length]}function debug(e){function r(){}function o(){var e=o,r=+new Date,s=r-(prevTime||r);e.diff=s,e.prev=prevTime,e.curr=r,prevTime=r,null==e.useColors&&(e.useColors=exports.useColors()),null==e.color&&e.useColors&&(e.color=selectColor());var t=Array.prototype.slice.call(arguments);t[0]=exports.coerce(t[0]),"string"!=typeof t[0]&&(t=["%o"].concat(t));var n=0;t[0]=t[0].replace(/%([a-z%])/g,function(r,o){if("%%"===r)return r;n++;var s=exports.formatters[o];if("function"==typeof s){var p=t[n];r=s.call(e,p),t.splice(n,1),n--}return r}),"function"==typeof exports.formatArgs&&(t=exports.formatArgs.apply(e,t));var p=o.log||exports.log||console.log.bind(console);p.apply(e,t)}r.enabled=!1,o.enabled=!0;var s=exports.enabled(e)?o:r;return s.namespace=e,s}function enable(e){exports.save(e);for(var r=(e||"").split(/[\s,]+/),o=r.length,s=0;o>s;s++)r[s]&&(e=r[s].replace(/\*/g,".*?"),"-"===e[0]?exports.skips.push(new RegExp("^"+e.substr(1)+"$")):exports.names.push(new RegExp("^"+e+"$")))}function disable(){exports.enable("")}function enabled(e){var r,o;for(r=0,o=exports.skips.length;o>r;r++)if(exports.skips[r].test(e))return!1;for(r=0,o=exports.names.length;o>r;r++)if(exports.names[r].test(e))return!0;return!1}function coerce(e){return e instanceof Error?e.stack||e.message:e}exports=module.exports=debug,exports.coerce=coerce,exports.disable=disable,exports.enable=enable,exports.enabled=enabled,exports.humanize=require("ms"),exports.names=[],exports.skips=[],exports.formatters={};var prevColor=0,prevTime;

},{"ms":227}],129:[function(require,module,exports){
"use strict";function depd(r){function e(r){}if(!r)throw new TypeError("argument namespace is required");return e._file=void 0,e._ignored=!0,e._namespace=r,e._traced=!1,e._warned=Object.create(null),e["function"]=wrapfunction,e.property=wrapproperty,e}function wrapfunction(r,e){if("function"!=typeof r)throw new TypeError("argument fn must be a function");return r}function wrapproperty(r,e,t){if(!r||"object"!=typeof r&&"function"!=typeof r)throw new TypeError("argument obj must be object");var o=Object.getOwnPropertyDescriptor(r,e);if(!o)throw new TypeError("must call property on owner object");if(!o.configurable)throw new TypeError("property must be configurable")}module.exports=depd;

},{}],130:[function(require,module,exports){
"use strict";exports.utils=require("./des/utils"),exports.Cipher=require("./des/cipher"),exports.DES=require("./des/des"),exports.CBC=require("./des/cbc"),exports.EDE=require("./des/ede");

},{"./des/cbc":131,"./des/cipher":132,"./des/des":133,"./des/ede":134,"./des/utils":135}],131:[function(require,module,exports){
"use strict";function CBCState(t){assert.equal(t.length,8,"Invalid IV length"),this.iv=new Array(8);for(var i=0;i<this.iv.length;i++)this.iv[i]=t[i]}function instantiate(t){function i(i){t.call(this,i),this._cbcInit()}inherits(i,t);for(var e=Object.keys(proto),r=0;r<e.length;r++){var n=e[r];i.prototype[n]=proto[n]}return i.create=function(t){return new i(t)},i}var assert=require("minimalistic-assert"),inherits=require("inherits"),proto={};exports.instantiate=instantiate,proto._cbcInit=function(){var t=new CBCState(this.options.iv);this._cbcState=t},proto._update=function(t,i,e,r){var n=this._cbcState,s=this.constructor.super_.prototype,o=n.iv;if("encrypt"===this.type){for(var a=0;a<this.blockSize;a++)o[a]^=t[i+a];s._update.call(this,o,0,e,r);for(var a=0;a<this.blockSize;a++)o[a]=e[r+a]}else{s._update.call(this,t,i,e,r);for(var a=0;a<this.blockSize;a++)e[r+a]^=o[a];for(var a=0;a<this.blockSize;a++)o[a]=t[i+a]}};

},{"inherits":213,"minimalistic-assert":226}],132:[function(require,module,exports){
"use strict";function Cipher(t){this.options=t,this.type=this.options.type,this.blockSize=8,this._init(),this.buffer=new Array(this.blockSize),this.bufferOff=0}var assert=require("minimalistic-assert");module.exports=Cipher,Cipher.prototype._init=function(){},Cipher.prototype.update=function(t){return 0===t.length?[]:"decrypt"===this.type?this._updateDecrypt(t):this._updateEncrypt(t)},Cipher.prototype._buffer=function(t,e){for(var r=Math.min(this.buffer.length-this.bufferOff,t.length-e),i=0;r>i;i++)this.buffer[this.bufferOff+i]=t[e+i];return this.bufferOff+=r,r},Cipher.prototype._flushBuffer=function(t,e){return this._update(this.buffer,0,t,e),this.bufferOff=0,this.blockSize},Cipher.prototype._updateEncrypt=function(t){var e=0,r=0,i=(this.bufferOff+t.length)/this.blockSize|0,f=new Array(i*this.blockSize);0!==this.bufferOff&&(e+=this._buffer(t,e),this.bufferOff===this.buffer.length&&(r+=this._flushBuffer(f,r)));for(var h=t.length-(t.length-e)%this.blockSize;h>e;e+=this.blockSize)this._update(t,e,f,r),r+=this.blockSize;for(;e<t.length;e++,this.bufferOff++)this.buffer[this.bufferOff]=t[e];return f},Cipher.prototype._updateDecrypt=function(t){for(var e=0,r=0,i=Math.ceil((this.bufferOff+t.length)/this.blockSize)-1,f=new Array(i*this.blockSize);i>0;i--)e+=this._buffer(t,e),r+=this._flushBuffer(f,r);return e+=this._buffer(t,e),f},Cipher.prototype["final"]=function(t){var e;t&&(e=this.update(t));var r;return r="encrypt"===this.type?this._finalEncrypt():this._finalDecrypt(),e?e.concat(r):r},Cipher.prototype._pad=function(t,e){if(0===e)return!1;for(;e<t.length;)t[e++]=0;return!0},Cipher.prototype._finalEncrypt=function(){if(!this._pad(this.buffer,this.bufferOff))return[];var t=new Array(this.blockSize);return this._update(this.buffer,0,t,0),t},Cipher.prototype._unpad=function(t){return t},Cipher.prototype._finalDecrypt=function(){assert.equal(this.bufferOff,this.blockSize,"Not enough data to decrypt");var t=new Array(this.blockSize);return this._flushBuffer(t,0),this._unpad(t)};

},{"minimalistic-assert":226}],133:[function(require,module,exports){
"use strict";function DESState(){this.tmp=new Array(2),this.keys=null}function DES(t){Cipher.call(this,t);var e=new DESState;this._desState=e,this.deriveKeys(e,t.key)}var assert=require("minimalistic-assert"),inherits=require("inherits"),des=require("../des"),utils=des.utils,Cipher=des.Cipher;inherits(DES,Cipher),module.exports=DES,DES.create=function(t){return new DES(t)};var shiftTable=[1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1];DES.prototype.deriveKeys=function(t,e){t.keys=new Array(32),assert.equal(e.length,this.blockSize,"Invalid key length");var r=utils.readUInt32BE(e,0),s=utils.readUInt32BE(e,4);utils.pc1(r,s,t.tmp,0),r=t.tmp[0],s=t.tmp[1];for(var i=0;i<t.keys.length;i+=2){var n=shiftTable[i>>>1];r=utils.r28shl(r,n),s=utils.r28shl(s,n),utils.pc2(r,s,t.keys,i)}},DES.prototype._update=function(t,e,r,s){var i=this._desState,n=utils.readUInt32BE(t,e),p=utils.readUInt32BE(t,e+4);utils.ip(n,p,i.tmp,0),n=i.tmp[0],p=i.tmp[1],"encrypt"===this.type?this._encrypt(i,n,p,i.tmp,0):this._decrypt(i,n,p,i.tmp,0),n=i.tmp[0],p=i.tmp[1],utils.writeUInt32BE(r,n,s),utils.writeUInt32BE(r,p,s+4)},DES.prototype._pad=function(t,e){for(var r=t.length-e,s=e;s<t.length;s++)t[s]=r;return!0},DES.prototype._unpad=function(t){for(var e=t[t.length-1],r=t.length-e;r<t.length;r++)assert.equal(t[r],e);return t.slice(0,t.length-e)},DES.prototype._encrypt=function(t,e,r,s,i){for(var n=e,p=r,u=0;u<t.keys.length;u+=2){var l=t.keys[u],a=t.keys[u+1];utils.expand(p,t.tmp,0),l^=t.tmp[0],a^=t.tmp[1];var h=utils.substitute(l,a),o=utils.permute(h),y=p;p=(n^o)>>>0,n=y}utils.rip(p,n,s,i)},DES.prototype._decrypt=function(t,e,r,s,i){for(var n=r,p=e,u=t.keys.length-2;u>=0;u-=2){var l=t.keys[u],a=t.keys[u+1];utils.expand(n,t.tmp,0),l^=t.tmp[0],a^=t.tmp[1];var h=utils.substitute(l,a),o=utils.permute(h),y=n;n=(p^o)>>>0,p=y}utils.rip(n,p,s,i)};

},{"../des":130,"inherits":213,"minimalistic-assert":226}],134:[function(require,module,exports){
"use strict";function EDEState(e,t){assert.equal(t.length,24,"Invalid key length");var r=t.slice(0,8),p=t.slice(8,16),i=t.slice(16,24);"encrypt"===e?this.ciphers=[DES.create({type:"encrypt",key:r}),DES.create({type:"decrypt",key:p}),DES.create({type:"encrypt",key:i})]:this.ciphers=[DES.create({type:"decrypt",key:i}),DES.create({type:"encrypt",key:p}),DES.create({type:"decrypt",key:r})]}function EDE(e){Cipher.call(this,e);var t=new EDEState(this.type,this.options.key);this._edeState=t}var assert=require("minimalistic-assert"),inherits=require("inherits"),des=require("../des"),Cipher=des.Cipher,DES=des.DES;inherits(EDE,Cipher),module.exports=EDE,EDE.create=function(e){return new EDE(e)},EDE.prototype._update=function(e,t,r,p){var i=this._edeState;i.ciphers[0]._update(e,t,r,p),i.ciphers[1]._update(r,p,r,p),i.ciphers[2]._update(r,p,r,p)},EDE.prototype._pad=DES.prototype._pad,EDE.prototype._unpad=DES.prototype._unpad;

},{"../des":130,"inherits":213,"minimalistic-assert":226}],135:[function(require,module,exports){
"use strict";exports.readUInt32BE=function(r,o){var t=r[0+o]<<24|r[1+o]<<16|r[2+o]<<8|r[3+o];return t>>>0},exports.writeUInt32BE=function(r,o,t){r[0+t]=o>>>24,r[1+t]=o>>>16&255,r[2+t]=o>>>8&255,r[3+t]=255&o},exports.ip=function(r,o,t,a){for(var e=0,f=0,n=6;n>=0;n-=2){for(var v=0;24>=v;v+=8)e<<=1,e|=o>>>v+n&1;for(var v=0;24>=v;v+=8)e<<=1,e|=r>>>v+n&1}for(var n=6;n>=0;n-=2){for(var v=1;25>=v;v+=8)f<<=1,f|=o>>>v+n&1;for(var v=1;25>=v;v+=8)f<<=1,f|=r>>>v+n&1}t[a+0]=e>>>0,t[a+1]=f>>>0},exports.rip=function(r,o,t,a){for(var e=0,f=0,n=0;4>n;n++)for(var v=24;v>=0;v-=8)e<<=1,e|=o>>>v+n&1,e<<=1,e|=r>>>v+n&1;for(var n=4;8>n;n++)for(var v=24;v>=0;v-=8)f<<=1,f|=o>>>v+n&1,f<<=1,f|=r>>>v+n&1;t[a+0]=e>>>0,t[a+1]=f>>>0},exports.pc1=function(r,o,t,a){for(var e=0,f=0,n=7;n>=5;n--){for(var v=0;24>=v;v+=8)e<<=1,e|=o>>v+n&1;for(var v=0;24>=v;v+=8)e<<=1,e|=r>>v+n&1}for(var v=0;24>=v;v+=8)e<<=1,e|=o>>v+n&1;for(var n=1;3>=n;n++){for(var v=0;24>=v;v+=8)f<<=1,f|=o>>v+n&1;for(var v=0;24>=v;v+=8)f<<=1,f|=r>>v+n&1}for(var v=0;24>=v;v+=8)f<<=1,f|=r>>v+n&1;t[a+0]=e>>>0,t[a+1]=f>>>0},exports.r28shl=function(r,o){return r<<o&268435455|r>>>28-o};var pc2table=[14,11,17,4,27,23,25,0,13,22,7,18,5,9,16,24,2,20,12,21,1,8,15,26,15,4,25,19,9,1,26,16,5,11,23,8,12,7,17,0,22,3,10,14,6,20,27,24];exports.pc2=function(r,o,t,a){for(var e=0,f=0,n=pc2table.length>>>1,v=0;n>v;v++)e<<=1,e|=r>>>pc2table[v]&1;for(var v=n;v<pc2table.length;v++)f<<=1,f|=o>>>pc2table[v]&1;t[a+0]=e>>>0,t[a+1]=f>>>0},exports.expand=function(r,o,t){var a=0,e=0;a=(1&r)<<5|r>>>27;for(var f=23;f>=15;f-=4)a<<=6,a|=r>>>f&63;for(var f=11;f>=3;f-=4)e|=r>>>f&63,e<<=6;e|=(31&r)<<1|r>>>31,o[t+0]=a>>>0,o[t+1]=e>>>0};var sTable=[14,0,4,15,13,7,1,4,2,14,15,2,11,13,8,1,3,10,10,6,6,12,12,11,5,9,9,5,0,3,7,8,4,15,1,12,14,8,8,2,13,4,6,9,2,1,11,7,15,5,12,11,9,3,7,14,3,10,10,0,5,6,0,13,15,3,1,13,8,4,14,7,6,15,11,2,3,8,4,14,9,12,7,0,2,1,13,10,12,6,0,9,5,11,10,5,0,13,14,8,7,10,11,1,10,3,4,15,13,4,1,2,5,11,8,6,12,7,6,12,9,0,3,5,2,14,15,9,10,13,0,7,9,0,14,9,6,3,3,4,15,6,5,10,1,2,13,8,12,5,7,14,11,12,4,11,2,15,8,1,13,1,6,10,4,13,9,0,8,6,15,9,3,8,0,7,11,4,1,15,2,14,12,3,5,11,10,5,14,2,7,12,7,13,13,8,14,11,3,5,0,6,6,15,9,0,10,3,1,4,2,7,8,2,5,12,11,1,12,10,4,14,15,9,10,3,6,15,9,0,0,6,12,10,11,1,7,13,13,8,15,9,1,4,3,5,14,11,5,12,2,7,8,2,4,14,2,14,12,11,4,2,1,12,7,4,10,7,11,13,6,1,8,5,5,0,3,15,15,10,13,3,0,9,14,8,9,6,4,11,2,8,1,12,11,7,10,1,13,14,7,2,8,13,15,6,9,15,12,0,5,9,6,10,3,4,0,5,14,3,12,10,1,15,10,4,15,2,9,7,2,12,6,9,8,5,0,6,13,1,3,13,4,14,14,0,7,11,5,3,11,8,9,4,14,3,15,2,5,12,2,9,8,5,12,15,3,10,7,11,0,14,4,1,10,7,1,6,13,0,11,8,6,13,4,13,11,0,2,11,14,7,15,4,0,9,8,1,13,10,3,14,12,3,9,5,7,12,5,2,10,15,6,8,1,6,1,6,4,11,11,13,13,8,12,1,3,4,7,10,14,7,10,9,15,5,6,0,8,15,0,14,5,2,9,3,2,12,13,1,2,15,8,13,4,8,6,10,15,3,11,7,1,4,10,12,9,5,3,6,14,11,5,0,0,14,12,9,7,2,7,2,11,1,4,14,1,7,9,4,12,10,14,8,2,13,0,15,6,12,10,9,13,0,15,3,3,5,5,6,8,11];exports.substitute=function(r,o){for(var t=0,a=0;4>a;a++){var e=r>>>18-6*a&63,f=sTable[64*a+e];t<<=4,t|=f}for(var a=0;4>a;a++){var e=o>>>18-6*a&63,f=sTable[256+64*a+e];t<<=4,t|=f}return t>>>0};var permuteTable=[16,25,12,11,3,20,4,15,31,17,9,6,27,14,1,22,30,24,8,18,0,5,29,23,13,19,2,26,10,21,28,7];exports.permute=function(r){for(var o=0,t=0;t<permuteTable.length;t++)o<<=1,o|=r>>>permuteTable[t]&1;return o>>>0},exports.padSplit=function(r,o,t){for(var a=r.toString(2);a.length<o;)a="0"+a;for(var e=[],f=0;o>f;f+=t)e.push(a.slice(f,f+t));return e.join(" ")};

},{}],136:[function(require,module,exports){
"use strict";function destroy(e){return e instanceof ReadStream?destroyReadStream(e):e instanceof Stream?("function"==typeof e.destroy&&e.destroy(),e):e}function destroyReadStream(e){return e.destroy(),"function"==typeof e.close&&e.on("open",onOpenClose),e}function onOpenClose(){"number"==typeof this.fd&&this.close()}var ReadStream=require("fs").ReadStream,Stream=require("stream");module.exports=destroy;

},{"fs":110,"stream":282}],137:[function(require,module,exports){
(function (Buffer){
function getDiffieHellman(e){var r=new Buffer(primes[e].prime,"hex"),f=new Buffer(primes[e].gen,"hex");return new DH(r,f)}function createDiffieHellman(e,r,f,i){return Buffer.isBuffer(r)||void 0===ENCODINGS[r]?createDiffieHellman(e,"binary",r,f):(r=r||"binary",i=i||"binary",f=f||new Buffer([2]),Buffer.isBuffer(f)||(f=new Buffer(f,i)),"number"==typeof e?new DH(generatePrime(e,f),f,!0):(Buffer.isBuffer(e)||(e=new Buffer(e,r)),new DH(e,f,!0)))}var generatePrime=require("./lib/generatePrime"),primes=require("./lib/primes.json"),DH=require("./lib/dh"),ENCODINGS={binary:!0,hex:!0,base64:!0};exports.DiffieHellmanGroup=exports.createDiffieHellmanGroup=exports.getDiffieHellman=getDiffieHellman,exports.createDiffieHellman=exports.DiffieHellman=createDiffieHellman;

}).call(this,require("buffer").Buffer)
},{"./lib/dh":138,"./lib/generatePrime":139,"./lib/primes.json":140,"buffer":112}],138:[function(require,module,exports){
(function (Buffer){
function setPublicKey(e,r){return r=r||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,r)),this._pub=new BN(e),this}function setPrivateKey(e,r){return r=r||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,r)),this._priv=new BN(e),this}function checkPrime(e,r){var t=r.toString("hex"),i=[t,e.toString(16)].join("_");if(i in primeCache)return primeCache[i];var n=0;if(e.isEven()||!primes.simpleSieve||!primes.fermatTest(e)||!millerRabin.test(e))return n+=1,n+="02"===t||"05"===t?8:4,primeCache[i]=n,n;millerRabin.test(e.shrn(1))||(n+=2);var u;switch(t){case"02":e.mod(TWENTYFOUR).cmp(ELEVEN)&&(n+=8);break;case"05":u=e.mod(TEN),u.cmp(THREE)&&u.cmp(SEVEN)&&(n+=8);break;default:n+=4}return primeCache[i]=n,n}function DH(e,r,t){this.setGenerator(r),this.__prime=new BN(e),this._prime=BN.mont(this.__prime),this._primeLen=e.length,this._pub=void 0,this._priv=void 0,this._primeCode=void 0,t?(this.setPublicKey=setPublicKey,this.setPrivateKey=setPrivateKey):this._primeCode=8}function formatReturnValue(e,r){var t=new Buffer(e.toArray());return r?t.toString(r):t}var BN=require("bn.js"),MillerRabin=require("miller-rabin"),millerRabin=new MillerRabin,TWENTYFOUR=new BN(24),ELEVEN=new BN(11),TEN=new BN(10),THREE=new BN(3),SEVEN=new BN(7),primes=require("./generatePrime"),randomBytes=require("randombytes");module.exports=DH;var primeCache={};Object.defineProperty(DH.prototype,"verifyError",{enumerable:!0,get:function(){return"number"!=typeof this._primeCode&&(this._primeCode=checkPrime(this.__prime,this.__gen)),this._primeCode}}),DH.prototype.generateKeys=function(){return this._priv||(this._priv=new BN(randomBytes(this._primeLen))),this._pub=this._gen.toRed(this._prime).redPow(this._priv).fromRed(),this.getPublicKey()},DH.prototype.computeSecret=function(e){e=new BN(e),e=e.toRed(this._prime);var r=e.redPow(this._priv).fromRed(),t=new Buffer(r.toArray()),i=this.getPrime();if(t.length<i.length){var n=new Buffer(i.length-t.length);n.fill(0),t=Buffer.concat([n,t])}return t},DH.prototype.getPublicKey=function(e){return formatReturnValue(this._pub,e)},DH.prototype.getPrivateKey=function(e){return formatReturnValue(this._priv,e)},DH.prototype.getPrime=function(e){return formatReturnValue(this.__prime,e)},DH.prototype.getGenerator=function(e){return formatReturnValue(this._gen,e)},DH.prototype.setGenerator=function(e,r){return r=r||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,r)),this.__gen=e,this._gen=new BN(e),this};

}).call(this,require("buffer").Buffer)
},{"./generatePrime":139,"bn.js":83,"buffer":112,"miller-rabin":220,"randombytes":256}],139:[function(require,module,exports){
function _getPrimes(){if(null!==primes)return primes;var e=1048576,r=[];r[0]=2;for(var i=1,n=3;e>n;n+=2){for(var t=Math.ceil(Math.sqrt(n)),m=0;i>m&&r[m]<=t&&n%r[m]!==0;m++);i!==m&&r[m]<=t||(r[i++]=n)}return primes=r,r}function simpleSieve(e){for(var r=_getPrimes(),i=0;i<r.length;i++)if(0===e.modn(r[i]))return 0===e.cmpn(r[i]);return!0}function fermatTest(e){var r=BN.mont(e);return 0===TWO.toRed(r).redPow(e.subn(1)).fromRed().cmpn(1)}function findPrime(e,r){if(16>e)return new BN(2===r||5===r?[140,123]:[140,39]);r=new BN(r);for(var i,n;;){for(i=new BN(randomBytes(Math.ceil(e/8)));i.bitLength()>e;)i.ishrn(1);if(i.isEven()&&i.iadd(ONE),i.testn(1)||i.iadd(TWO),r.cmp(TWO)){if(!r.cmp(FIVE))for(;i.mod(TEN).cmp(THREE);)i.iadd(FOUR)}else for(;i.mod(TWENTYFOUR).cmp(ELEVEN);)i.iadd(FOUR);if(n=i.shrn(1),simpleSieve(n)&&simpleSieve(i)&&fermatTest(n)&&fermatTest(i)&&millerRabin.test(n)&&millerRabin.test(i))return i}}var randomBytes=require("randombytes");module.exports=findPrime,findPrime.simpleSieve=simpleSieve,findPrime.fermatTest=fermatTest;var BN=require("bn.js"),TWENTYFOUR=new BN(24),MillerRabin=require("miller-rabin"),millerRabin=new MillerRabin,ONE=new BN(1),TWO=new BN(2),FIVE=new BN(5),SIXTEEN=new BN(16),EIGHT=new BN(8),TEN=new BN(10),THREE=new BN(3),SEVEN=new BN(7),ELEVEN=new BN(11),FOUR=new BN(4),TWELVE=new BN(12),primes=null;

},{"bn.js":83,"miller-rabin":220,"randombytes":256}],140:[function(require,module,exports){
module.exports={
    "modp1": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"
    },
    "modp2": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"
    },
    "modp5": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"
    },
    "modp14": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"
    },
    "modp15": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"
    },
    "modp16": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"
    },
    "modp17": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"
    },
    "modp18": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"
    }
}
},{}],141:[function(require,module,exports){
"use strict";function first(r,e){function n(){t(),e.apply(null,arguments)}function t(){for(var r,e=0;e<o.length;e++)r=o[e],r.ee.removeListener(r.event,r.fn)}function a(r){e=r}if(!Array.isArray(r))throw new TypeError("arg must be an array of [ee, events...] arrays");for(var o=[],f=0;f<r.length;f++){var i=r[f];if(!Array.isArray(i)||i.length<2)throw new TypeError("each array member must be [ee, events...]");for(var s=i[0],l=1;l<i.length;l++){var u=i[l],h=listener(u,n);s.on(u,h),o.push({ee:s,event:u,fn:h})}}return a.cancel=t,a}function listener(r,e){return function(n){for(var t=new Array(arguments.length),a=this,o="error"===r?n:null,f=0;f<t.length;f++)t[f]=arguments[f];e(o,a,r,t)}}module.exports=first;

},{}],142:[function(require,module,exports){
"use strict";var elliptic=exports;elliptic.version=require("../package.json").version,elliptic.utils=require("./elliptic/utils"),elliptic.rand=require("brorand"),elliptic.hmacDRBG=require("./elliptic/hmac-drbg"),elliptic.curve=require("./elliptic/curve"),elliptic.curves=require("./elliptic/curves"),elliptic.ec=require("./elliptic/ec"),elliptic.eddsa=require("./elliptic/eddsa");

},{"../package.json":158,"./elliptic/curve":145,"./elliptic/curves":148,"./elliptic/ec":149,"./elliptic/eddsa":152,"./elliptic/hmac-drbg":155,"./elliptic/utils":157,"brorand":84}],143:[function(require,module,exports){
"use strict";function BaseCurve(t,e){this.type=t,this.p=new BN(e.p,16),this.red=e.prime?BN.red(e.prime):BN.mont(this.p),this.zero=new BN(0).toRed(this.red),this.one=new BN(1).toRed(this.red),this.two=new BN(2).toRed(this.red),this.n=e.n&&new BN(e.n,16),this.g=e.g&&this.pointFromJSON(e.g,e.gRed),this._wnafT1=new Array(4),this._wnafT2=new Array(4),this._wnafT3=new Array(4),this._wnafT4=new Array(4)}function BasePoint(t,e){this.curve=t,this.type=e,this.precomputed=null}var BN=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,getNAF=utils.getNAF,getJSF=utils.getJSF,assert=utils.assert;module.exports=BaseCurve,BaseCurve.prototype.point=function(){throw new Error("Not implemented")},BaseCurve.prototype.validate=function(){throw new Error("Not implemented")},BaseCurve.prototype._fixedNafMul=function(t,e){assert(t.precomputed);var r=t._getDoubles(),n=getNAF(e,1),o=(1<<r.step+1)-(r.step%2===0?2:1);o/=3;for(var i=[],s=0;s<n.length;s+=r.step){for(var a=0,e=s+r.step-1;e>=s;e--)a=(a<<1)+n[e];i.push(a)}for(var p=this.jpoint(null,null,null),u=this.jpoint(null,null,null),d=o;d>0;d--){for(var s=0;s<i.length;s++){var a=i[s];a===d?u=u.mixedAdd(r.points[s]):a===-d&&(u=u.mixedAdd(r.points[s].neg()))}p=p.add(u)}return p.toP()},BaseCurve.prototype._wnafMul=function(t,e){var r=4,n=t._getNAFPoints(r);r=n.wnd;for(var o=n.points,i=getNAF(e,r),s=this.jpoint(null,null,null),a=i.length-1;a>=0;a--){for(var e=0;a>=0&&0===i[a];a--)e++;if(a>=0&&e++,s=s.dblp(e),0>a)break;var p=i[a];assert(0!==p),s="affine"===t.type?p>0?s.mixedAdd(o[p-1>>1]):s.mixedAdd(o[-p-1>>1].neg()):p>0?s.add(o[p-1>>1]):s.add(o[-p-1>>1].neg())}return"affine"===t.type?s.toP():s},BaseCurve.prototype._wnafMulAdd=function(t,e,r,n){for(var o=this._wnafT1,i=this._wnafT2,s=this._wnafT3,a=0,p=0;n>p;p++){var u=e[p],d=u._getNAFPoints(t);o[p]=d.wnd,i[p]=d.points}for(var p=n-1;p>=1;p-=2){var l=p-1,h=p;if(1===o[l]&&1===o[h]){var f=[e[l],null,null,e[h]];0===e[l].y.cmp(e[h].y)?(f[1]=e[l].add(e[h]),f[2]=e[l].toJ().mixedAdd(e[h].neg())):0===e[l].y.cmp(e[h].y.redNeg())?(f[1]=e[l].toJ().mixedAdd(e[h]),f[2]=e[l].add(e[h].neg())):(f[1]=e[l].toJ().mixedAdd(e[h]),f[2]=e[l].toJ().mixedAdd(e[h].neg()));var c=[-3,-1,-5,-7,0,7,5,1,3],v=getJSF(r[l],r[h]);a=Math.max(v[0].length,a),s[l]=new Array(a),s[h]=new Array(a);for(var g=0;a>g;g++){var m=0|v[0][g],y=0|v[1][g];s[l][g]=c[3*(m+1)+(y+1)],s[h][g]=0,i[l]=f}}else s[l]=getNAF(r[l],o[l]),s[h]=getNAF(r[h],o[h]),a=Math.max(s[l].length,a),a=Math.max(s[h].length,a)}for(var w=this.jpoint(null,null,null),B=this._wnafT4,p=a;p>=0;p--){for(var A=0;p>=0;){for(var b=!0,g=0;n>g;g++)B[g]=0|s[g][p],0!==B[g]&&(b=!1);if(!b)break;A++,p--}if(p>=0&&A++,w=w.dblp(A),0>p)break;for(var g=0;n>g;g++){var u,N=B[g];0!==N&&(N>0?u=i[g][N-1>>1]:0>N&&(u=i[g][-N-1>>1].neg()),w="affine"===u.type?w.mixedAdd(u):w.add(u))}}for(var p=0;n>p;p++)i[p]=null;return w.toP()},BaseCurve.BasePoint=BasePoint,BasePoint.prototype.eq=function(){throw new Error("Not implemented")},BasePoint.prototype.validate=function(){return this.curve.validate(this)},BaseCurve.prototype.decodePoint=function(t,e){t=utils.toArray(t,e);var r=this.p.byteLength();if(4===t[0]&&t.length-1===2*r)return this.point(t.slice(1,1+r),t.slice(1+r,1+2*r));if((2===t[0]||3===t[0])&&t.length-1===r)return this.pointFromX(t.slice(1,1+r),3===t[0]);throw new Error("Unknown point format")},BasePoint.prototype.encodeCompressed=function(t){return this.encode(t,!0)},BasePoint.prototype._encode=function(t){var e=this.curve.p.byteLength(),r=this.getX().toArray("be",e);return t?[this.getY().isEven()?2:3].concat(r):[4].concat(r,this.getY().toArray("be",e))},BasePoint.prototype.encode=function(t,e){return utils.encode(this._encode(e),t)},BasePoint.prototype.precompute=function(t){if(this.precomputed)return this;var e={doubles:null,naf:null,beta:null};return e.naf=this._getNAFPoints(8),e.doubles=this._getDoubles(4,t),e.beta=this._getBeta(),this.precomputed=e,this},BasePoint.prototype._hasDoubles=function(t){if(!this.precomputed)return!1;var e=this.precomputed.doubles;return e?e.points.length>=Math.ceil((t.bitLength()+1)/e.step):!1},BasePoint.prototype._getDoubles=function(t,e){if(this.precomputed&&this.precomputed.doubles)return this.precomputed.doubles;for(var r=[this],n=this,o=0;e>o;o+=t){for(var i=0;t>i;i++)n=n.dbl();r.push(n)}return{step:t,points:r}},BasePoint.prototype._getNAFPoints=function(t){if(this.precomputed&&this.precomputed.naf)return this.precomputed.naf;for(var e=[this],r=(1<<t)-1,n=1===r?null:this.dbl(),o=1;r>o;o++)e[o]=e[o-1].add(n);return{wnd:t,points:e}},BasePoint.prototype._getBeta=function(){return null},BasePoint.prototype.dblp=function(t){for(var e=this,r=0;t>r;r++)e=e.dbl();return e};

},{"../../elliptic":142,"bn.js":83}],144:[function(require,module,exports){
"use strict";function EdwardsCurve(t){this.twisted=1!==(0|t.a),this.mOneA=this.twisted&&-1===(0|t.a),this.extended=this.mOneA,Base.call(this,"edwards",t),this.a=new BN(t.a,16).umod(this.red.m),this.a=this.a.toRed(this.red),this.c=new BN(t.c,16).toRed(this.red),this.c2=this.c.redSqr(),this.d=new BN(t.d,16).toRed(this.red),this.dd=this.d.redAdd(this.d),assert(!this.twisted||0===this.c.fromRed().cmpn(1)),this.oneC=1===(0|t.c)}function Point(t,e,r,i,d){Base.BasePoint.call(this,t,"projective"),null===e&&null===r&&null===i?(this.x=this.curve.zero,this.y=this.curve.one,this.z=this.curve.one,this.t=this.curve.zero,this.zOne=!0):(this.x=new BN(e,16),this.y=new BN(r,16),this.z=i?new BN(i,16):this.curve.one,this.t=d&&new BN(d,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.t&&!this.t.red&&(this.t=this.t.toRed(this.curve.red)),this.zOne=this.z===this.curve.one,this.curve.extended&&!this.t&&(this.t=this.x.redMul(this.y),this.zOne||(this.t=this.t.redMul(this.z.redInvm()))))}var curve=require("../curve"),elliptic=require("../../elliptic"),BN=require("bn.js"),inherits=require("inherits"),Base=curve.base,assert=elliptic.utils.assert;inherits(EdwardsCurve,Base),module.exports=EdwardsCurve,EdwardsCurve.prototype._mulA=function(t){return this.mOneA?t.redNeg():this.a.redMul(t)},EdwardsCurve.prototype._mulC=function(t){return this.oneC?t:this.c.redMul(t)},EdwardsCurve.prototype.jpoint=function(t,e,r,i){return this.point(t,e,r,i)},EdwardsCurve.prototype.pointFromX=function(t,e){t=new BN(t,16),t.red||(t=t.toRed(this.red));var r=t.redSqr(),i=this.c2.redSub(this.a.redMul(r)),d=this.one.redSub(this.c2.redMul(this.d).redMul(r)),s=i.redMul(d.redInvm()),u=s.redSqrt();if(0!==u.redSqr().redSub(s).cmp(this.zero))throw new Error("invalid point");var n=u.fromRed().isOdd();return(e&&!n||!e&&n)&&(u=u.redNeg()),this.point(t,u)},EdwardsCurve.prototype.pointFromY=function(t,e){t=new BN(t,16),t.red||(t=t.toRed(this.red));var r=t.redSqr(),i=r.redSub(this.one),d=r.redMul(this.d).redAdd(this.one),s=i.redMul(d.redInvm());if(0===s.cmp(this.zero)){if(e)throw new Error("invalid point");return this.point(this.zero,t)}var u=s.redSqrt();if(0!==u.redSqr().redSub(s).cmp(this.zero))throw new Error("invalid point");return u.isOdd()!==e&&(u=u.redNeg()),this.point(u,t)},EdwardsCurve.prototype.validate=function(t){if(t.isInfinity())return!0;t.normalize();var e=t.x.redSqr(),r=t.y.redSqr(),i=e.redMul(this.a).redAdd(r),d=this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(r)));return 0===i.cmp(d)},inherits(Point,Base.BasePoint),EdwardsCurve.prototype.pointFromJSON=function(t){return Point.fromJSON(this,t)},EdwardsCurve.prototype.point=function(t,e,r,i){return new Point(this,t,e,r,i)},Point.fromJSON=function(t,e){return new Point(t,e[0],e[1],e[2])},Point.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},Point.prototype.isInfinity=function(){return 0===this.x.cmpn(0)&&0===this.y.cmp(this.z)},Point.prototype._extDbl=function(){var t=this.x.redSqr(),e=this.y.redSqr(),r=this.z.redSqr();r=r.redIAdd(r);var i=this.curve._mulA(t),d=this.x.redAdd(this.y).redSqr().redISub(t).redISub(e),s=i.redAdd(e),u=s.redSub(r),n=i.redSub(e),h=d.redMul(u),o=s.redMul(n),l=d.redMul(n),c=u.redMul(s);return this.curve.point(h,o,c,l)},Point.prototype._projDbl=function(){var t,e,r,i=this.x.redAdd(this.y).redSqr(),d=this.x.redSqr(),s=this.y.redSqr();if(this.curve.twisted){var u=this.curve._mulA(d),n=u.redAdd(s);if(this.zOne)t=i.redSub(d).redSub(s).redMul(n.redSub(this.curve.two)),e=n.redMul(u.redSub(s)),r=n.redSqr().redSub(n).redSub(n);else{var h=this.z.redSqr(),o=n.redSub(h).redISub(h);t=i.redSub(d).redISub(s).redMul(o),e=n.redMul(u.redSub(s)),r=n.redMul(o)}}else{var u=d.redAdd(s),h=this.curve._mulC(this.c.redMul(this.z)).redSqr(),o=u.redSub(h).redSub(h);t=this.curve._mulC(i.redISub(u)).redMul(o),e=this.curve._mulC(u).redMul(d.redISub(s)),r=u.redMul(o)}return this.curve.point(t,e,r)},Point.prototype.dbl=function(){return this.isInfinity()?this:this.curve.extended?this._extDbl():this._projDbl()},Point.prototype._extAdd=function(t){var e=this.y.redSub(this.x).redMul(t.y.redSub(t.x)),r=this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),i=this.t.redMul(this.curve.dd).redMul(t.t),d=this.z.redMul(t.z.redAdd(t.z)),s=r.redSub(e),u=d.redSub(i),n=d.redAdd(i),h=r.redAdd(e),o=s.redMul(u),l=n.redMul(h),c=s.redMul(h),p=u.redMul(n);return this.curve.point(o,l,p,c)},Point.prototype._projAdd=function(t){var e,r,i=this.z.redMul(t.z),d=i.redSqr(),s=this.x.redMul(t.x),u=this.y.redMul(t.y),n=this.curve.d.redMul(s).redMul(u),h=d.redSub(n),o=d.redAdd(n),l=this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(s).redISub(u),c=i.redMul(h).redMul(l);return this.curve.twisted?(e=i.redMul(o).redMul(u.redSub(this.curve._mulA(s))),r=h.redMul(o)):(e=i.redMul(o).redMul(u.redSub(s)),r=this.curve._mulC(h).redMul(o)),this.curve.point(c,e,r)},Point.prototype.add=function(t){return this.isInfinity()?t:t.isInfinity()?this:this.curve.extended?this._extAdd(t):this._projAdd(t)},Point.prototype.mul=function(t){return this._hasDoubles(t)?this.curve._fixedNafMul(this,t):this.curve._wnafMul(this,t)},Point.prototype.mulAdd=function(t,e,r){return this.curve._wnafMulAdd(1,[this,e],[t,r],2)},Point.prototype.normalize=function(){if(this.zOne)return this;var t=this.z.redInvm();return this.x=this.x.redMul(t),this.y=this.y.redMul(t),this.t&&(this.t=this.t.redMul(t)),this.z=this.curve.one,this.zOne=!0,this},Point.prototype.neg=function(){return this.curve.point(this.x.redNeg(),this.y,this.z,this.t&&this.t.redNeg())},Point.prototype.getX=function(){return this.normalize(),this.x.fromRed()},Point.prototype.getY=function(){return this.normalize(),this.y.fromRed()},Point.prototype.eq=function(t){return this===t||0===this.getX().cmp(t.getX())&&0===this.getY().cmp(t.getY())},Point.prototype.toP=Point.prototype.normalize,Point.prototype.mixedAdd=Point.prototype.add;

},{"../../elliptic":142,"../curve":145,"bn.js":83,"inherits":213}],145:[function(require,module,exports){
"use strict";var curve=exports;curve.base=require("./base"),curve["short"]=require("./short"),curve.mont=require("./mont"),curve.edwards=require("./edwards");

},{"./base":143,"./edwards":144,"./mont":146,"./short":147}],146:[function(require,module,exports){
"use strict";function MontCurve(t){Base.call(this,"mont",t),this.a=new BN(t.a,16).toRed(this.red),this.b=new BN(t.b,16).toRed(this.red),this.i4=new BN(4).toRed(this.red).redInvm(),this.two=new BN(2).toRed(this.red),this.a24=this.i4.redMul(this.a.redAdd(this.two))}function Point(t,e,r){Base.BasePoint.call(this,t,"projective"),null===e&&null===r?(this.x=this.curve.one,this.z=this.curve.zero):(this.x=new BN(e,16),this.z=new BN(r,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)))}var curve=require("../curve"),BN=require("bn.js"),inherits=require("inherits"),Base=curve.base,elliptic=require("../../elliptic"),utils=elliptic.utils;inherits(MontCurve,Base),module.exports=MontCurve,MontCurve.prototype.validate=function(t){var e=t.normalize().x,r=e.redSqr(),i=r.redMul(e).redAdd(r.redMul(this.a)).redAdd(e),n=i.redSqrt();return 0===n.redSqr().cmp(i)},inherits(Point,Base.BasePoint),MontCurve.prototype.decodePoint=function(t,e){return this.point(utils.toArray(t,e),1)},MontCurve.prototype.point=function(t,e){return new Point(this,t,e)},MontCurve.prototype.pointFromJSON=function(t){return Point.fromJSON(this,t)},Point.prototype.precompute=function(){},Point.prototype._encode=function(){return this.getX().toArray("be",this.curve.p.byteLength())},Point.fromJSON=function(t,e){return new Point(t,e[0],e[1]||t.one)},Point.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},Point.prototype.isInfinity=function(){return 0===this.z.cmpn(0)},Point.prototype.dbl=function(){var t=this.x.redAdd(this.z),e=t.redSqr(),r=this.x.redSub(this.z),i=r.redSqr(),n=e.redSub(i),o=e.redMul(i),u=n.redMul(i.redAdd(this.curve.a24.redMul(n)));return this.curve.point(o,u)},Point.prototype.add=function(){throw new Error("Not supported on Montgomery curve")},Point.prototype.diffAdd=function(t,e){var r=this.x.redAdd(this.z),i=this.x.redSub(this.z),n=t.x.redAdd(t.z),o=t.x.redSub(t.z),u=o.redMul(r),d=n.redMul(i),s=e.z.redMul(u.redAdd(d).redSqr()),h=e.x.redMul(u.redISub(d).redSqr());return this.curve.point(s,h)},Point.prototype.mul=function(t){for(var e=t.clone(),r=this,i=this.curve.point(null,null),n=this,o=[];0!==e.cmpn(0);e.iushrn(1))o.push(e.andln(1));for(var u=o.length-1;u>=0;u--)0===o[u]?(r=r.diffAdd(i,n),i=i.dbl()):(i=r.diffAdd(i,n),r=r.dbl());return i},Point.prototype.mulAdd=function(){throw new Error("Not supported on Montgomery curve")},Point.prototype.eq=function(t){return 0===this.getX().cmp(t.getX())},Point.prototype.normalize=function(){return this.x=this.x.redMul(this.z.redInvm()),this.z=this.curve.one,this},Point.prototype.getX=function(){return this.normalize(),this.x.fromRed()};

},{"../../elliptic":142,"../curve":145,"bn.js":83,"inherits":213}],147:[function(require,module,exports){
"use strict";function ShortCurve(r){Base.call(this,"short",r),this.a=new BN(r.a,16).toRed(this.red),this.b=new BN(r.b,16).toRed(this.red),this.tinv=this.two.redInvm(),this.zeroA=0===this.a.fromRed().cmpn(0),this.threeA=0===this.a.fromRed().sub(this.p).cmpn(-3),this.endo=this._getEndomorphism(r),this._endoWnafT1=new Array(4),this._endoWnafT2=new Array(4)}function Point(r,e,t,d){Base.BasePoint.call(this,r,"affine"),null===e&&null===t?(this.x=null,this.y=null,this.inf=!0):(this.x=new BN(e,16),this.y=new BN(t,16),d&&(this.x.forceRed(this.curve.red),this.y.forceRed(this.curve.red)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.inf=!1)}function JPoint(r,e,t,d){Base.BasePoint.call(this,r,"jacobian"),null===e&&null===t&&null===d?(this.x=this.curve.one,this.y=this.curve.one,this.z=new BN(0)):(this.x=new BN(e,16),this.y=new BN(t,16),this.z=new BN(d,16)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.zOne=this.z===this.curve.one}var curve=require("../curve"),elliptic=require("../../elliptic"),BN=require("bn.js"),inherits=require("inherits"),Base=curve.base,assert=elliptic.utils.assert;inherits(ShortCurve,Base),module.exports=ShortCurve,ShortCurve.prototype._getEndomorphism=function(r){if(this.zeroA&&this.g&&this.n&&1===this.p.modn(3)){var e,t;if(r.beta)e=new BN(r.beta,16).toRed(this.red);else{var d=this._getEndoRoots(this.p);e=d[0].cmp(d[1])<0?d[0]:d[1],e=e.toRed(this.red)}if(r.lambda)t=new BN(r.lambda,16);else{var i=this._getEndoRoots(this.n);0===this.g.mul(i[0]).x.cmp(this.g.x.redMul(e))?t=i[0]:(t=i[1],assert(0===this.g.mul(t).x.cmp(this.g.x.redMul(e))))}var n;return n=r.basis?r.basis.map(function(r){return{a:new BN(r.a,16),b:new BN(r.b,16)}}):this._getEndoBasis(t),{beta:e,lambda:t,basis:n}}},ShortCurve.prototype._getEndoRoots=function(r){var e=r===this.p?this.red:BN.mont(r),t=new BN(2).toRed(e).redInvm(),d=t.redNeg(),i=new BN(3).toRed(e).redNeg().redSqrt().redMul(t),n=d.redAdd(i).fromRed(),u=d.redSub(i).fromRed();return[n,u]},ShortCurve.prototype._getEndoBasis=function(r){for(var e,t,d,i,n,u,s,o,h,l=this.n.ushrn(Math.floor(this.n.bitLength()/2)),p=r,a=this.n.clone(),f=new BN(1),c=new BN(0),S=new BN(0),v=new BN(1),b=0;0!==p.cmpn(0);){var I=a.div(p);o=a.sub(I.mul(p)),h=S.sub(I.mul(f));var y=v.sub(I.mul(c));if(!d&&o.cmp(l)<0)e=s.neg(),t=f,d=o.neg(),i=h;else if(d&&2===++b)break;s=o,a=p,p=o,S=f,f=h,v=c,c=y}n=o.neg(),u=h;var A=d.sqr().add(i.sqr()),m=n.sqr().add(u.sqr());return m.cmp(A)>=0&&(n=e,u=t),d.negative&&(d=d.neg(),i=i.neg()),n.negative&&(n=n.neg(),u=u.neg()),[{a:d,b:i},{a:n,b:u}]},ShortCurve.prototype._endoSplit=function(r){var e=this.endo.basis,t=e[0],d=e[1],i=d.b.mul(r).divRound(this.n),n=t.b.neg().mul(r).divRound(this.n),u=i.mul(t.a),s=n.mul(d.a),o=i.mul(t.b),h=n.mul(d.b),l=r.sub(u).sub(s),p=o.add(h).neg();return{k1:l,k2:p}},ShortCurve.prototype.pointFromX=function(r,e){r=new BN(r,16),r.red||(r=r.toRed(this.red));var t=r.redSqr().redMul(r).redIAdd(r.redMul(this.a)).redIAdd(this.b),d=t.redSqrt();if(0!==d.redSqr().redSub(t).cmp(this.zero))throw new Error("invalid point");var i=d.fromRed().isOdd();return(e&&!i||!e&&i)&&(d=d.redNeg()),this.point(r,d)},ShortCurve.prototype.validate=function(r){if(r.inf)return!0;var e=r.x,t=r.y,d=this.a.redMul(e),i=e.redSqr().redMul(e).redIAdd(d).redIAdd(this.b);return 0===t.redSqr().redISub(i).cmpn(0)},ShortCurve.prototype._endoWnafMulAdd=function(r,e){for(var t=this._endoWnafT1,d=this._endoWnafT2,i=0;i<r.length;i++){var n=this._endoSplit(e[i]),u=r[i],s=u._getBeta();n.k1.negative&&(n.k1.ineg(),u=u.neg(!0)),n.k2.negative&&(n.k2.ineg(),s=s.neg(!0)),t[2*i]=u,t[2*i+1]=s,d[2*i]=n.k1,d[2*i+1]=n.k2}for(var o=this._wnafMulAdd(1,t,d,2*i),h=0;2*i>h;h++)t[h]=null,d[h]=null;return o},inherits(Point,Base.BasePoint),ShortCurve.prototype.point=function(r,e,t){return new Point(this,r,e,t)},ShortCurve.prototype.pointFromJSON=function(r,e){return Point.fromJSON(this,r,e)},Point.prototype._getBeta=function(){if(this.curve.endo){var r=this.precomputed;if(r&&r.beta)return r.beta;var e=this.curve.point(this.x.redMul(this.curve.endo.beta),this.y);if(r){var t=this.curve,d=function(r){return t.point(r.x.redMul(t.endo.beta),r.y)};r.beta=e,e.precomputed={beta:null,naf:r.naf&&{wnd:r.naf.wnd,points:r.naf.points.map(d)},doubles:r.doubles&&{step:r.doubles.step,points:r.doubles.points.map(d)}}}return e}},Point.prototype.toJSON=function(){return this.precomputed?[this.x,this.y,this.precomputed&&{doubles:this.precomputed.doubles&&{step:this.precomputed.doubles.step,points:this.precomputed.doubles.points.slice(1)},naf:this.precomputed.naf&&{wnd:this.precomputed.naf.wnd,points:this.precomputed.naf.points.slice(1)}}]:[this.x,this.y]},Point.fromJSON=function(r,e,t){function d(e){return r.point(e[0],e[1],t)}"string"==typeof e&&(e=JSON.parse(e));var i=r.point(e[0],e[1],t);if(!e[2])return i;var n=e[2];return i.precomputed={beta:null,doubles:n.doubles&&{step:n.doubles.step,points:[i].concat(n.doubles.points.map(d))},naf:n.naf&&{wnd:n.naf.wnd,points:[i].concat(n.naf.points.map(d))}},i},Point.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+">"},Point.prototype.isInfinity=function(){return this.inf},Point.prototype.add=function(r){if(this.inf)return r;if(r.inf)return this;if(this.eq(r))return this.dbl();if(this.neg().eq(r))return this.curve.point(null,null);if(0===this.x.cmp(r.x))return this.curve.point(null,null);var e=this.y.redSub(r.y);0!==e.cmpn(0)&&(e=e.redMul(this.x.redSub(r.x).redInvm()));var t=e.redSqr().redISub(this.x).redISub(r.x),d=e.redMul(this.x.redSub(t)).redISub(this.y);return this.curve.point(t,d)},Point.prototype.dbl=function(){if(this.inf)return this;var r=this.y.redAdd(this.y);if(0===r.cmpn(0))return this.curve.point(null,null);var e=this.curve.a,t=this.x.redSqr(),d=r.redInvm(),i=t.redAdd(t).redIAdd(t).redIAdd(e).redMul(d),n=i.redSqr().redISub(this.x.redAdd(this.x)),u=i.redMul(this.x.redSub(n)).redISub(this.y);return this.curve.point(n,u)},Point.prototype.getX=function(){return this.x.fromRed()},Point.prototype.getY=function(){return this.y.fromRed()},Point.prototype.mul=function(r){return r=new BN(r,16),this._hasDoubles(r)?this.curve._fixedNafMul(this,r):this.curve.endo?this.curve._endoWnafMulAdd([this],[r]):this.curve._wnafMul(this,r)},Point.prototype.mulAdd=function(r,e,t){var d=[this,e],i=[r,t];return this.curve.endo?this.curve._endoWnafMulAdd(d,i):this.curve._wnafMulAdd(1,d,i,2)},Point.prototype.eq=function(r){return this===r||this.inf===r.inf&&(this.inf||0===this.x.cmp(r.x)&&0===this.y.cmp(r.y))},Point.prototype.neg=function(r){if(this.inf)return this;var e=this.curve.point(this.x,this.y.redNeg());if(r&&this.precomputed){var t=this.precomputed,d=function(r){return r.neg()};e.precomputed={naf:t.naf&&{wnd:t.naf.wnd,points:t.naf.points.map(d)},doubles:t.doubles&&{step:t.doubles.step,points:t.doubles.points.map(d)}}}return e},Point.prototype.toJ=function(){if(this.inf)return this.curve.jpoint(null,null,null);var r=this.curve.jpoint(this.x,this.y,this.curve.one);return r},inherits(JPoint,Base.BasePoint),ShortCurve.prototype.jpoint=function(r,e,t){return new JPoint(this,r,e,t)},JPoint.prototype.toP=function(){if(this.isInfinity())return this.curve.point(null,null);var r=this.z.redInvm(),e=r.redSqr(),t=this.x.redMul(e),d=this.y.redMul(e).redMul(r);return this.curve.point(t,d)},JPoint.prototype.neg=function(){return this.curve.jpoint(this.x,this.y.redNeg(),this.z)},JPoint.prototype.add=function(r){if(this.isInfinity())return r;if(r.isInfinity())return this;var e=r.z.redSqr(),t=this.z.redSqr(),d=this.x.redMul(e),i=r.x.redMul(t),n=this.y.redMul(e.redMul(r.z)),u=r.y.redMul(t.redMul(this.z)),s=d.redSub(i),o=n.redSub(u);if(0===s.cmpn(0))return 0!==o.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var h=s.redSqr(),l=h.redMul(s),p=d.redMul(h),a=o.redSqr().redIAdd(l).redISub(p).redISub(p),f=o.redMul(p.redISub(a)).redISub(n.redMul(l)),c=this.z.redMul(r.z).redMul(s);return this.curve.jpoint(a,f,c)},JPoint.prototype.mixedAdd=function(r){if(this.isInfinity())return r.toJ();if(r.isInfinity())return this;var e=this.z.redSqr(),t=this.x,d=r.x.redMul(e),i=this.y,n=r.y.redMul(e).redMul(this.z),u=t.redSub(d),s=i.redSub(n);if(0===u.cmpn(0))return 0!==s.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var o=u.redSqr(),h=o.redMul(u),l=t.redMul(o),p=s.redSqr().redIAdd(h).redISub(l).redISub(l),a=s.redMul(l.redISub(p)).redISub(i.redMul(h)),f=this.z.redMul(u);return this.curve.jpoint(p,a,f)},JPoint.prototype.dblp=function(r){if(0===r)return this;if(this.isInfinity())return this;if(!r)return this.dbl();if(this.curve.zeroA||this.curve.threeA){for(var e=this,t=0;r>t;t++)e=e.dbl();return e}for(var d=this.curve.a,i=this.curve.tinv,n=this.x,u=this.y,s=this.z,o=s.redSqr().redSqr(),h=u.redAdd(u),t=0;r>t;t++){var l=n.redSqr(),p=h.redSqr(),a=p.redSqr(),f=l.redAdd(l).redIAdd(l).redIAdd(d.redMul(o)),c=n.redMul(p),S=f.redSqr().redISub(c.redAdd(c)),v=c.redISub(S),b=f.redMul(v);b=b.redIAdd(b).redISub(a);var I=h.redMul(s);r>t+1&&(o=o.redMul(a)),n=S,s=I,h=b}return this.curve.jpoint(n,h.redMul(i),s)},JPoint.prototype.dbl=function(){return this.isInfinity()?this:this.curve.zeroA?this._zeroDbl():this.curve.threeA?this._threeDbl():this._dbl()},JPoint.prototype._zeroDbl=function(){var r,e,t;if(this.zOne){var d=this.x.redSqr(),i=this.y.redSqr(),n=i.redSqr(),u=this.x.redAdd(i).redSqr().redISub(d).redISub(n);u=u.redIAdd(u);var s=d.redAdd(d).redIAdd(d),o=s.redSqr().redISub(u).redISub(u),h=n.redIAdd(n);h=h.redIAdd(h),h=h.redIAdd(h),r=o,e=s.redMul(u.redISub(o)).redISub(h),t=this.y.redAdd(this.y)}else{var l=this.x.redSqr(),p=this.y.redSqr(),a=p.redSqr(),f=this.x.redAdd(p).redSqr().redISub(l).redISub(a);f=f.redIAdd(f);var c=l.redAdd(l).redIAdd(l),S=c.redSqr(),v=a.redIAdd(a);v=v.redIAdd(v),v=v.redIAdd(v),r=S.redISub(f).redISub(f),e=c.redMul(f.redISub(r)).redISub(v),t=this.y.redMul(this.z),t=t.redIAdd(t)}return this.curve.jpoint(r,e,t)},JPoint.prototype._threeDbl=function(){var r,e,t;if(this.zOne){var d=this.x.redSqr(),i=this.y.redSqr(),n=i.redSqr(),u=this.x.redAdd(i).redSqr().redISub(d).redISub(n);u=u.redIAdd(u);var s=d.redAdd(d).redIAdd(d).redIAdd(this.curve.a),o=s.redSqr().redISub(u).redISub(u);r=o;var h=n.redIAdd(n);h=h.redIAdd(h),h=h.redIAdd(h),e=s.redMul(u.redISub(o)).redISub(h),t=this.y.redAdd(this.y)}else{var l=this.z.redSqr(),p=this.y.redSqr(),a=this.x.redMul(p),f=this.x.redSub(l).redMul(this.x.redAdd(l));f=f.redAdd(f).redIAdd(f);var c=a.redIAdd(a);c=c.redIAdd(c);var S=c.redAdd(c);r=f.redSqr().redISub(S),t=this.y.redAdd(this.z).redSqr().redISub(p).redISub(l);var v=p.redSqr();v=v.redIAdd(v),v=v.redIAdd(v),v=v.redIAdd(v),e=f.redMul(c.redISub(r)).redISub(v)}return this.curve.jpoint(r,e,t)},JPoint.prototype._dbl=function(){var r=this.curve.a,e=this.x,t=this.y,d=this.z,i=d.redSqr().redSqr(),n=e.redSqr(),u=t.redSqr(),s=n.redAdd(n).redIAdd(n).redIAdd(r.redMul(i)),o=e.redAdd(e);o=o.redIAdd(o);var h=o.redMul(u),l=s.redSqr().redISub(h.redAdd(h)),p=h.redISub(l),a=u.redSqr();a=a.redIAdd(a),a=a.redIAdd(a),a=a.redIAdd(a);var f=s.redMul(p).redISub(a),c=t.redAdd(t).redMul(d);return this.curve.jpoint(l,f,c)},JPoint.prototype.trpl=function(){if(!this.curve.zeroA)return this.dbl().add(this);var r=this.x.redSqr(),e=this.y.redSqr(),t=this.z.redSqr(),d=e.redSqr(),i=r.redAdd(r).redIAdd(r),n=i.redSqr(),u=this.x.redAdd(e).redSqr().redISub(r).redISub(d);u=u.redIAdd(u),u=u.redAdd(u).redIAdd(u),u=u.redISub(n);var s=u.redSqr(),o=d.redIAdd(d);o=o.redIAdd(o),o=o.redIAdd(o),o=o.redIAdd(o);var h=i.redIAdd(u).redSqr().redISub(n).redISub(s).redISub(o),l=e.redMul(h);l=l.redIAdd(l),l=l.redIAdd(l);var p=this.x.redMul(s).redISub(l);p=p.redIAdd(p),p=p.redIAdd(p);var a=this.y.redMul(h.redMul(o.redISub(h)).redISub(u.redMul(s)));a=a.redIAdd(a),a=a.redIAdd(a),a=a.redIAdd(a);var f=this.z.redAdd(u).redSqr().redISub(t).redISub(s);return this.curve.jpoint(p,a,f)},JPoint.prototype.mul=function(r,e){return r=new BN(r,e),this.curve._wnafMul(this,r)},JPoint.prototype.eq=function(r){if("affine"===r.type)return this.eq(r.toJ());if(this===r)return!0;var e=this.z.redSqr(),t=r.z.redSqr();if(0!==this.x.redMul(t).redISub(r.x.redMul(e)).cmpn(0))return!1;var d=e.redMul(this.z),i=t.redMul(r.z);return 0===this.y.redMul(i).redISub(r.y.redMul(d)).cmpn(0)},JPoint.prototype.inspect=function(){return this.isInfinity()?"<EC JPoint Infinity>":"<EC JPoint x: "+this.x.toString(16,2)+" y: "+this.y.toString(16,2)+" z: "+this.z.toString(16,2)+">"},JPoint.prototype.isInfinity=function(){return 0===this.z.cmpn(0)};

},{"../../elliptic":142,"../curve":145,"bn.js":83,"inherits":213}],148:[function(require,module,exports){
"use strict";function PresetCurve(f){"short"===f.type?this.curve=new elliptic.curve["short"](f):"edwards"===f.type?this.curve=new elliptic.curve.edwards(f):this.curve=new elliptic.curve.mont(f),this.g=this.curve.g,this.n=this.curve.n,this.hash=f.hash,assert(this.g.validate(),"Invalid curve"),assert(this.g.mul(this.n).isInfinity(),"Invalid curve, G*N != O")}function defineCurve(f,e){Object.defineProperty(curves,f,{configurable:!0,enumerable:!0,get:function(){var a=new PresetCurve(e);return Object.defineProperty(curves,f,{configurable:!0,enumerable:!0,value:a}),a}})}var curves=exports,hash=require("hash.js"),elliptic=require("../elliptic"),assert=elliptic.utils.assert;curves.PresetCurve=PresetCurve,defineCurve("p192",{type:"short",prime:"p192",p:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",a:"ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",b:"64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",n:"ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",hash:hash.sha256,gRed:!1,g:["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012","07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]}),defineCurve("p224",{type:"short",prime:"p224",p:"ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",a:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",b:"b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",n:"ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",hash:hash.sha256,gRed:!1,g:["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21","bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]}),defineCurve("p256",{type:"short",prime:null,p:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",a:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",b:"5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",n:"ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",hash:hash.sha256,gRed:!1,g:["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296","4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]}),defineCurve("p384",{type:"short",prime:null,p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",a:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",b:"b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",n:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",hash:hash.sha384,gRed:!1,g:["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7","3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]}),defineCurve("p521",{type:"short",prime:null,p:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",a:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",b:"00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",n:"000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",hash:hash.sha512,gRed:!1,g:["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66","00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]}),defineCurve("curve25519",{type:"mont",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"76d06",b:"0",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:hash.sha256,gRed:!1,g:["9"]}),defineCurve("ed25519",{type:"edwards",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"-1",c:"1",d:"52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:hash.sha256,gRed:!1,g:["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a","6666666666666666666666666666666666666666666666666666666666666658"]});var pre;try{pre=require("./precomputed/secp256k1")}catch(e){pre=void 0}defineCurve("secp256k1",{type:"short",prime:"k256",p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",a:"0",b:"7",n:"ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",h:"1",hash:hash.sha256,beta:"7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",lambda:"5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",basis:[{a:"3086d221a7d46bcde86c90e49284eb15",b:"-e4437ed6010e88286f547fa90abfe4c3"},{a:"114ca50f7a8e2f3f657c1108d9d44cfd8",b:"3086d221a7d46bcde86c90e49284eb15"}],gRed:!1,g:["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",pre]});

},{"../elliptic":142,"./precomputed/secp256k1":156,"hash.js":203}],149:[function(require,module,exports){
"use strict";function EC(e){return this instanceof EC?("string"==typeof e&&(assert(elliptic.curves.hasOwnProperty(e),"Unknown curve "+e),e=elliptic.curves[e]),e instanceof elliptic.curves.PresetCurve&&(e={curve:e}),this.curve=e.curve.curve,this.n=this.curve.n,this.nh=this.n.ushrn(1),this.g=this.curve.g,this.g=e.curve.g,this.g.precompute(e.curve.n.bitLength()+1),void(this.hash=e.hash||e.curve.hash)):new EC(e)}var BN=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert,KeyPair=require("./key"),Signature=require("./signature");module.exports=EC,EC.prototype.keyPair=function(e){return new KeyPair(this,e)},EC.prototype.keyFromPrivate=function(e,t){return KeyPair.fromPrivate(this,e,t)},EC.prototype.keyFromPublic=function(e,t){return KeyPair.fromPublic(this,e,t)},EC.prototype.genKeyPair=function(e){e||(e={});for(var t=new elliptic.hmacDRBG({hash:this.hash,pers:e.pers,entropy:e.entropy||elliptic.rand(this.hash.hmacStrength),nonce:this.n.toArray()}),r=this.n.byteLength(),i=this.n.sub(new BN(2));;){var n=new BN(t.generate(r));if(!(n.cmp(i)>0))return n.iaddn(1),this.keyFromPrivate(n)}},EC.prototype._truncateToN=function(e,t){var r=8*e.byteLength()-this.n.bitLength();return r>0&&(e=e.ushrn(r)),!t&&e.cmp(this.n)>=0?e.sub(this.n):e},EC.prototype.sign=function(e,t,r,i){"object"==typeof r&&(i=r,r=null),i||(i={}),t=this.keyFromPrivate(t,r),e=this._truncateToN(new BN(e,16));for(var n=this.n.byteLength(),s=t.getPrivate().toArray("be",n),u=e.toArray("be",n),o=new elliptic.hmacDRBG({hash:this.hash,entropy:s,nonce:u,pers:i.pers,persEnc:i.persEnc}),h=this.n.sub(new BN(1)),c=0;!0;c++){var a=i.k?i.k(c):new BN(o.generate(this.n.byteLength()));if(a=this._truncateToN(a,!0),!(a.cmpn(1)<=0||a.cmp(h)>=0)){var p=this.g.mul(a);if(!p.isInfinity()){var v=p.getX(),m=v.umod(this.n);if(0!==m.cmpn(0)){var y=a.invm(this.n).mul(m.mul(t.getPrivate()).iadd(e));if(y=y.umod(this.n),0!==y.cmpn(0)){var l=(p.getY().isOdd()?1:0)|(0!==v.cmp(m)?2:0);return i.canonical&&y.cmp(this.nh)>0&&(y=this.n.sub(y),l^=1),new Signature({r:m,s:y,recoveryParam:l})}}}}}},EC.prototype.verify=function(e,t,r,i){e=this._truncateToN(new BN(e,16)),r=this.keyFromPublic(r,i),t=new Signature(t,"hex");var n=t.r,s=t.s;if(n.cmpn(1)<0||n.cmp(this.n)>=0)return!1;if(s.cmpn(1)<0||s.cmp(this.n)>=0)return!1;var u=s.invm(this.n),o=u.mul(e).umod(this.n),h=u.mul(n).umod(this.n),c=this.g.mulAdd(o,r.getPublic(),h);return c.isInfinity()?!1:0===c.getX().umod(this.n).cmp(n)},EC.prototype.recoverPubKey=function(e,t,r,i){assert((3&r)===r,"The recovery param is more than two bits"),t=new Signature(t,i);var n=this.n,s=new BN(e),u=t.r,o=t.s,h=1&r,c=r>>1;if(u.cmp(this.curve.p.umod(this.curve.n))>=0&&c)throw new Error("Unable to find sencond key candinate");u=c?this.curve.pointFromX(u.add(this.curve.n),h):this.curve.pointFromX(u,h);var a=n.sub(s),p=t.r.invm(n);return this.g.mulAdd(a,u,o).mul(p)},EC.prototype.getKeyRecoveryParam=function(e,t,r,i){if(t=new Signature(t,i),null!==t.recoveryParam)return t.recoveryParam;for(var n=0;4>n;n++){var s;try{s=this.recoverPubKey(e,t,n)}catch(e){continue}if(s.eq(r))return n}throw new Error("Unable to find valid recovery factor")};

},{"../../elliptic":142,"./key":150,"./signature":151,"bn.js":83}],150:[function(require,module,exports){
"use strict";function KeyPair(i,t){this.ec=i,this.priv=null,this.pub=null,t.priv&&this._importPrivate(t.priv,t.privEnc),t.pub&&this._importPublic(t.pub,t.pubEnc)}var BN=require("bn.js");module.exports=KeyPair,KeyPair.fromPublic=function(i,t,r){return t instanceof KeyPair?t:new KeyPair(i,{pub:t,pubEnc:r})},KeyPair.fromPrivate=function(i,t,r){return t instanceof KeyPair?t:new KeyPair(i,{priv:t,privEnc:r})},KeyPair.prototype.validate=function(){var i=this.getPublic();return i.isInfinity()?{result:!1,reason:"Invalid public key"}:i.validate()?i.mul(this.ec.curve.n).isInfinity()?{result:!0,reason:null}:{result:!1,reason:"Public key * N != O"}:{result:!1,reason:"Public key is not a point"}},KeyPair.prototype.getPublic=function(i,t){return"string"==typeof i&&(t=i,i=null),this.pub||(this.pub=this.ec.g.mul(this.priv)),t?this.pub.encode(t,i):this.pub},KeyPair.prototype.getPrivate=function(i){return"hex"===i?this.priv.toString(16,2):this.priv},KeyPair.prototype._importPrivate=function(i,t){this.priv=new BN(i,t||16),this.priv=this.priv.umod(this.ec.curve.n)},KeyPair.prototype._importPublic=function(i,t){return i.x||i.y?void(this.pub=this.ec.curve.point(i.x,i.y)):void(this.pub=this.ec.curve.decodePoint(i,t))},KeyPair.prototype.derive=function(i){return i.mul(this.priv).getX()},KeyPair.prototype.sign=function(i,t,r){return this.ec.sign(i,this,t,r)},KeyPair.prototype.verify=function(i,t){return this.ec.verify(i,t,this)},KeyPair.prototype.inspect=function(){return"<Key priv: "+(this.priv&&this.priv.toString(16,2))+" pub: "+(this.pub&&this.pub.inspect())+" >"};

},{"bn.js":83}],151:[function(require,module,exports){
"use strict";function Signature(t,r){return t instanceof Signature?t:void(this._importDER(t,r)||(assert(t.r&&t.s,"Signature without r or s"),this.r=new BN(t.r,16),this.s=new BN(t.s,16),void 0===t.recoveryParam?this.recoveryParam=null:this.recoveryParam=t.recoveryParam))}function Position(){this.place=0}function getLength(t,r){var e=t[r.place++];if(!(128&e))return e;for(var n=15&e,i=0,a=0,c=r.place;n>a;a++,c++)i<<=8,i|=t[c];return r.place=c,i}function rmPadding(t){for(var r=0,e=t.length-1;!t[r]&&!(128&t[r+1])&&e>r;)r++;return 0===r?t:t.slice(r)}function constructLength(t,r){if(128>r)return void t.push(r);var e=1+(Math.log(r)/Math.LN2>>>3);for(t.push(128|e);--e;)t.push(r>>>(e<<3)&255);t.push(r)}var BN=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert;module.exports=Signature,Signature.prototype._importDER=function(t,r){t=utils.toArray(t,r);var e=new Position;if(48!==t[e.place++])return!1;var n=getLength(t,e);if(n+e.place!==t.length)return!1;if(2!==t[e.place++])return!1;var i=getLength(t,e),a=t.slice(e.place,i+e.place);if(e.place+=i,2!==t[e.place++])return!1;var c=getLength(t,e);if(t.length!==c+e.place)return!1;var s=t.slice(e.place,c+e.place);return 0===a[0]&&128&a[1]&&(a=a.slice(1)),0===s[0]&&128&s[1]&&(s=s.slice(1)),this.r=new BN(a),this.s=new BN(s),this.recoveryParam=null,!0},Signature.prototype.toDER=function(t){var r=this.r.toArray(),e=this.s.toArray();for(128&r[0]&&(r=[0].concat(r)),128&e[0]&&(e=[0].concat(e)),r=rmPadding(r),e=rmPadding(e);!(e[0]||128&e[1]);)e=e.slice(1);var n=[2];constructLength(n,r.length),n=n.concat(r),n.push(2),constructLength(n,e.length);var i=n.concat(e),a=[48];return constructLength(a,i.length),a=a.concat(i),utils.encode(a,t)};

},{"../../elliptic":142,"bn.js":83}],152:[function(require,module,exports){
"use strict";function EDDSA(t){if(assert("ed25519"===t,"only tested with ed25519 so far"),!(this instanceof EDDSA))return new EDDSA(t);var t=elliptic.curves[t].curve;this.curve=t,this.g=t.g,this.g.precompute(t.n.bitLength()+1),this.pointClass=t.point().constructor,this.encodingLength=Math.ceil(t.n.bitLength()/8),this.hash=hash.sha512}var hash=require("hash.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert,parseBytes=utils.parseBytes,KeyPair=require("./key"),Signature=require("./signature");module.exports=EDDSA,EDDSA.prototype.sign=function(t,e){t=parseBytes(t);var i=this.keyFromSecret(e),r=this.hashInt(i.messagePrefix(),t),n=this.g.mul(r),s=this.encodePoint(n),o=this.hashInt(s,i.pubBytes(),t).mul(i.priv()),u=r.add(o).umod(this.curve.n);return this.makeSignature({R:n,S:u,Rencoded:s})},EDDSA.prototype.verify=function(t,e,i){t=parseBytes(t),e=this.makeSignature(e);var r=this.keyFromPublic(i),n=this.hashInt(e.Rencoded(),r.pubBytes(),t),s=this.g.mul(e.S()),o=e.R().add(r.pub().mul(n));return o.eq(s)},EDDSA.prototype.hashInt=function(){for(var t=this.hash(),e=0;e<arguments.length;e++)t.update(arguments[e]);return utils.intFromLE(t.digest()).umod(this.curve.n)},EDDSA.prototype.keyFromPublic=function(t){return KeyPair.fromPublic(this,t)},EDDSA.prototype.keyFromSecret=function(t){return KeyPair.fromSecret(this,t)},EDDSA.prototype.makeSignature=function(t){return t instanceof Signature?t:new Signature(this,t)},EDDSA.prototype.encodePoint=function(t){var e=t.getY().toArray("le",this.encodingLength);return e[this.encodingLength-1]|=t.getX().isOdd()?128:0,e},EDDSA.prototype.decodePoint=function(t){t=utils.parseBytes(t);var e=t.length-1,i=t.slice(0,e).concat(-129&t[e]),r=0!==(128&t[e]),n=utils.intFromLE(i);return this.curve.pointFromY(n,r)},EDDSA.prototype.encodeInt=function(t){return t.toArray("le",this.encodingLength)},EDDSA.prototype.decodeInt=function(t){return utils.intFromLE(t)},EDDSA.prototype.isPoint=function(t){return t instanceof this.pointClass};

},{"../../elliptic":142,"./key":153,"./signature":154,"hash.js":203}],153:[function(require,module,exports){
"use strict";function KeyPair(e,t){this.eddsa=e,this._secret=parseBytes(t.secret),e.isPoint(t.pub)?this._pub=t.pub:this._pubBytes=parseBytes(t.pub)}var elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert,parseBytes=utils.parseBytes,cachedProperty=utils.cachedProperty;KeyPair.fromPublic=function(e,t){return t instanceof KeyPair?t:new KeyPair(e,{pub:t})},KeyPair.fromSecret=function(e,t){return t instanceof KeyPair?t:new KeyPair(e,{secret:t})},KeyPair.prototype.secret=function(){return this._secret},cachedProperty(KeyPair,function(){return this.eddsa.encodePoint(this.pub())}),cachedProperty(KeyPair,function(){return this._pubBytes?this.eddsa.decodePoint(this._pubBytes):this.eddsa.g.mul(this.priv())}),cachedProperty(KeyPair,function(){var e=this.eddsa,t=this.hash(),i=e.encodingLength-1,r=t.slice(0,e.encodingLength);return r[0]&=248,r[i]&=127,r[i]|=64,r}),cachedProperty(KeyPair,function(){return this.eddsa.decodeInt(this.privBytes())}),cachedProperty(KeyPair,function(){return this.eddsa.hash().update(this.secret()).digest()}),cachedProperty(KeyPair,function(){return this.hash().slice(this.eddsa.encodingLength)}),KeyPair.prototype.sign=function(e){return assert(this._secret,"KeyPair can only verify"),this.eddsa.sign(e,this)},KeyPair.prototype.verify=function(e,t){return this.eddsa.verify(e,t,this)},KeyPair.prototype.getSecret=function(e){return assert(this._secret,"KeyPair is public only"),utils.encode(this.secret(),e)},KeyPair.prototype.getPublic=function(e){return utils.encode(this.pubBytes(),e)},module.exports=KeyPair;

},{"../../elliptic":142}],154:[function(require,module,exports){
"use strict";function Signature(e,t){this.eddsa=e,"object"!=typeof t&&(t=parseBytes(t)),Array.isArray(t)&&(t={R:t.slice(0,e.encodingLength),S:t.slice(e.encodingLength)}),assert(t.R&&t.S,"Signature without R or S"),e.isPoint(t.R)&&(this._R=t.R),t.S instanceof BN&&(this._S=t.S),this._Rencoded=Array.isArray(t.R)?t.R:t.Rencoded,this._Sencoded=Array.isArray(t.S)?t.S:t.Sencoded}var BN=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert,cachedProperty=utils.cachedProperty,parseBytes=utils.parseBytes;cachedProperty(Signature,function(){return this.eddsa.decodeInt(this.Sencoded())}),cachedProperty(Signature,function(){return this.eddsa.decodePoint(this.Rencoded())}),cachedProperty(Signature,function(){return this.eddsa.encodePoint(this.R())}),cachedProperty(Signature,function(){return this.eddsa.encodeInt(this.S())}),Signature.prototype.toBytes=function(){return this.Rencoded().concat(this.Sencoded())},Signature.prototype.toHex=function(){return utils.encode(this.toBytes(),"hex").toUpperCase()},module.exports=Signature;

},{"../../elliptic":142,"bn.js":83}],155:[function(require,module,exports){
"use strict";function HmacDRBG(t){if(!(this instanceof HmacDRBG))return new HmacDRBG(t);this.hash=t.hash,this.predResist=!!t.predResist,this.outLen=this.hash.outSize,this.minEntropy=t.minEntropy||this.hash.hmacStrength,this.reseed=null,this.reseedInterval=null,this.K=null,this.V=null;var e=utils.toArray(t.entropy,t.entropyEnc),s=utils.toArray(t.nonce,t.nonceEnc),i=utils.toArray(t.pers,t.persEnc);assert(e.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._init(e,s,i)}var hash=require("hash.js"),elliptic=require("../elliptic"),utils=elliptic.utils,assert=utils.assert;module.exports=HmacDRBG,HmacDRBG.prototype._init=function(t,e,s){var i=t.concat(e).concat(s);this.K=new Array(this.outLen/8),this.V=new Array(this.outLen/8);for(var h=0;h<this.V.length;h++)this.K[h]=0,this.V[h]=1;this._update(i),this.reseed=1,this.reseedInterval=281474976710656},HmacDRBG.prototype._hmac=function(){return new hash.hmac(this.hash,this.K)},HmacDRBG.prototype._update=function(t){var e=this._hmac().update(this.V).update([0]);t&&(e=e.update(t)),this.K=e.digest(),this.V=this._hmac().update(this.V).digest(),t&&(this.K=this._hmac().update(this.V).update([1]).update(t).digest(),this.V=this._hmac().update(this.V).digest())},HmacDRBG.prototype.reseed=function(t,e,s,i){"string"!=typeof e&&(i=s,s=e,e=null),t=utils.toBuffer(t,e),s=utils.toBuffer(s,i),assert(t.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._update(t.concat(s||[])),this.reseed=1},HmacDRBG.prototype.generate=function(t,e,s,i){if(this.reseed>this.reseedInterval)throw new Error("Reseed is required");"string"!=typeof e&&(i=s,s=e,e=null),s&&(s=utils.toArray(s,i),this._update(s));for(var h=[];h.length<t;)this.V=this._hmac().update(this.V).digest(),h=h.concat(this.V);var r=h.slice(0,t);return this._update(s),this.reseed++,utils.encode(r,e)};

},{"../elliptic":142,"hash.js":203}],156:[function(require,module,exports){
module.exports={doubles:{step:4,points:[["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a","f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"],["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508","11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"],["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739","d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"],["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640","4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"],["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c","4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"],["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda","96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"],["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa","5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"],["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0","cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"],["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d","9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"],["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d","e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"],["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1","9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"],["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0","5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"],["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047","10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"],["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862","283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"],["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7","7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"],["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd","56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"],["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83","7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"],["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a","53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"],["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8","bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"],["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d","4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"],["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725","7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"],["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754","4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"],["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c","17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"],["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6","6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"],["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39","c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"],["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891","893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"],["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b","febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"],["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03","2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"],["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d","eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"],["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070","7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"],["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4","e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"],["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da","662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"],["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11","1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"],["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e","efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"],["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41","2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"],["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef","67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"],["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8","db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"],["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d","648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"],["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96","35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"],["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd","ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"],["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5","9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"],["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266","40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"],["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71","34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"],["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac","c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"],["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751","1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"],["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e","493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"],["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241","c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"],["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3","be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"],["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f","4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"],["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19","aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"],["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be","b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"],["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9","6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"],["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2","8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"],["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13","7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"],["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c","ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"],["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba","2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"],["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151","e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"],["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073","d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"],["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458","38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"],["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b","69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"],["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366","d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"],["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa","40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"],["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0","620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"],["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787","7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"],["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e","ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]]},naf:{wnd:7,points:[["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9","388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"],["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4","d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"],["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc","6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"],["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe","cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"],["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb","d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"],["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8","ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"],["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e","581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"],["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34","4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"],["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c","85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"],["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5","321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"],["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f","2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"],["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714","73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"],["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729","a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"],["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db","2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"],["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4","e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"],["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5","b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"],["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479","2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"],["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d","80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"],["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f","1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"],["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb","d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"],["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9","eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"],["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963","758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"],["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74","958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"],["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530","e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"],["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b","5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"],["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247","cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"],["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1","cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"],["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120","4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"],["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435","91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"],["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18","673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"],["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8","59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"],["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb","3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"],["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f","55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"],["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143","efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"],["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba","e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"],["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45","f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"],["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a","744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"],["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e","c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"],["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8","e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"],["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c","30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"],["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519","e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"],["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab","100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"],["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca","ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"],["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf","8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"],["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610","68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"],["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4","f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"],["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c","d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"],["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940","edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"],["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980","a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"],["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3","66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"],["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf","9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"],["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63","4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"],["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448","fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"],["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf","5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"],["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5","8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"],["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6","8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"],["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5","5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"],["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99","f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"],["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51","f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"],["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5","42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"],["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5","204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"],["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997","4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"],["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881","73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"],["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5","39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"],["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66","d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"],["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726","ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"],["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede","6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"],["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94","60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"],["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31","3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"],["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51","b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"],["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252","ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"],["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5","cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"],["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b","6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"],["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4","322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"],["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f","6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"],["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889","2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"],["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246","b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"],["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984","998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"],["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a","b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"],["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030","bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"],["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197","6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"],["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593","c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"],["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef","21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"],["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38","60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"],["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a","49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"],["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111","5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"],["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502","7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"],["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea","be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"],["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26","8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"],["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986","39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"],["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e","62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"],["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4","25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"],["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda","ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"],["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859","cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"],["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f","f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"],["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c","6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"],["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942","fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"],["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a","1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"],["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80","5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"],["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d","438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"],["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1","cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"],["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63","c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"],["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352","6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"],["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193","ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"],["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00","9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"],["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58","ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"],["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7","d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"],["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8","c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"],["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e","67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"],["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d","cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"],["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b","299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"],["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f","f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"],["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6","462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"],["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297","62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"],["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a","7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"],["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c","ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"],["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52","4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"],["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb","bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"],["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065","bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"],["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917","603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"],["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9","cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"],["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3","553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"],["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57","712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"],["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66","ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"],["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8","9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"],["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721","9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"],["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180","4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]]}};

},{}],157:[function(require,module,exports){
"use strict";function toArray(r,t){if(Array.isArray(r))return r.slice();if(!r)return[];var e=[];if("string"!=typeof r){for(var n=0;n<r.length;n++)e[n]=0|r[n];return e}if(t){if("hex"===t){r=r.replace(/[^a-z0-9]+/gi,""),r.length%2!==0&&(r="0"+r);for(var n=0;n<r.length;n+=2)e.push(parseInt(r[n]+r[n+1],16))}}else for(var n=0;n<r.length;n++){var i=r.charCodeAt(n),o=i>>8,s=255&i;o?e.push(o,s):e.push(s)}return e}function zero2(r){return 1===r.length?"0"+r:r}function toHex(r){for(var t="",e=0;e<r.length;e++)t+=zero2(r[e].toString(16));return t}function getNAF(r,t){for(var e=[],n=1<<t+1,i=r.clone();i.cmpn(1)>=0;){var o;if(i.isOdd()){var s=i.andln(n-1);o=s>(n>>1)-1?(n>>1)-s:s,i.isubn(o)}else o=0;e.push(o);for(var u=0!==i.cmpn(0)&&0===i.andln(n-1)?t+1:1,a=1;u>a;a++)e.push(0);i.iushrn(u)}return e}function getJSF(r,t){var e=[[],[]];r=r.clone(),t=t.clone();for(var n=0,i=0;r.cmpn(-n)>0||t.cmpn(-i)>0;){var o=r.andln(3)+n&3,s=t.andln(3)+i&3;3===o&&(o=-1),3===s&&(s=-1);var u;if(0===(1&o))u=0;else{var a=r.andln(7)+n&7;u=3!==a&&5!==a||2!==s?o:-o}e[0].push(u);var l;if(0===(1&s))l=0;else{var a=t.andln(7)+i&7;l=3!==a&&5!==a||2!==o?s:-s}e[1].push(l),2*n===u+1&&(n=1-n),2*i===l+1&&(i=1-i),r.iushrn(1),t.iushrn(1)}return e}function cachedProperty(r,t){var e=t.name,n="_"+e;r.prototype[e]=function(){return void 0!==this[n]?this[n]:this[n]=t.call(this)}}function parseBytes(r){return"string"==typeof r?utils.toArray(r,"hex"):r}function intFromLE(r){return new BN(r,"hex","le")}var utils=exports,BN=require("bn.js");utils.assert=function(r,t){if(!r)throw new Error(t||"Assertion failed")},utils.toArray=toArray,utils.zero2=zero2,utils.toHex=toHex,utils.encode=function(r,t){return"hex"===t?toHex(r):r},utils.getNAF=getNAF,utils.getJSF=getJSF,utils.cachedProperty=cachedProperty,utils.parseBytes=parseBytes,utils.intFromLE=intFromLE;

},{"bn.js":83}],158:[function(require,module,exports){
module.exports={
  "_args": [
    [
      "elliptic@^6.0.0",
      "/Users/apprentice/Desktop/client-side/node_modules/browserify-sign"
    ]
  ],
  "_from": "elliptic@>=6.0.0 <7.0.0",
  "_id": "elliptic@6.2.3",
  "_inCache": true,
  "_installable": true,
  "_location": "/elliptic",
  "_nodeVersion": "5.4.1",
  "_npmUser": {
    "email": "fedor@indutny.com",
    "name": "indutny"
  },
  "_npmVersion": "3.3.12",
  "_phantomChildren": {},
  "_requested": {
    "name": "elliptic",
    "raw": "elliptic@^6.0.0",
    "rawSpec": "^6.0.0",
    "scope": null,
    "spec": ">=6.0.0 <7.0.0",
    "type": "range"
  },
  "_requiredBy": [
    "/browserify-sign",
    "/create-ecdh"
  ],
  "_resolved": "https://registry.npmjs.org/elliptic/-/elliptic-6.2.3.tgz",
  "_shasum": "18e46d7306b0951275a2d42063270a14b74ebe99",
  "_shrinkwrap": null,
  "_spec": "elliptic@^6.0.0",
  "_where": "/Users/apprentice/Desktop/client-side/node_modules/browserify-sign",
  "author": {
    "email": "fedor@indutny.com",
    "name": "Fedor Indutny"
  },
  "bugs": {
    "url": "https://github.com/indutny/elliptic/issues"
  },
  "dependencies": {
    "bn.js": "^4.0.0",
    "brorand": "^1.0.1",
    "hash.js": "^1.0.0",
    "inherits": "^2.0.1"
  },
  "description": "EC cryptography",
  "devDependencies": {
    "coveralls": "^2.11.3",
    "istanbul": "^0.4.2",
    "jscs": "^2.9.0",
    "jshint": "^2.6.0",
    "mocha": "^2.1.0"
  },
  "directories": {},
  "dist": {
    "shasum": "18e46d7306b0951275a2d42063270a14b74ebe99",
    "tarball": "http://registry.npmjs.org/elliptic/-/elliptic-6.2.3.tgz"
  },
  "files": [
    "lib"
  ],
  "gitHead": "c32f20b22b420eb6af3c6dda28963deb7facf823",
  "homepage": "https://github.com/indutny/elliptic",
  "keywords": [
    "Cryptography",
    "EC",
    "Elliptic",
    "curve"
  ],
  "license": "MIT",
  "main": "lib/elliptic.js",
  "maintainers": [
    {
      "name": "indutny",
      "email": "fedor@indutny.com"
    }
  ],
  "name": "elliptic",
  "optionalDependencies": {},
  "readme": "ERROR: No README data found!",
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/indutny/elliptic.git"
  },
  "scripts": {
    "coverage": "npm run unit --coverage",
    "coveralls": "npm run coverage && cat ./coverage/lcov.info | coveralls",
    "jscs": "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/*.js",
    "jshint": "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/*.js",
    "lint": "npm run jscs && npm run jshint",
    "test": "npm run lint && npm run unit",
    "unit": "istanbul test _mocha --reporter=spec test/*-test.js"
  },
  "version": "6.2.3"
}

},{}],159:[function(require,module,exports){
"use strict";function escapeHtml(e){var t=""+e,a=matchHtmlRegExp.exec(t);if(!a)return t;var r,c="",s=0,n=0;for(s=a.index;s<t.length;s++){switch(t.charCodeAt(s)){case 34:r="&quot;";break;case 38:r="&amp;";break;case 39:r="&#39;";break;case 60:r="&lt;";break;case 62:r="&gt;";break;default:continue}n!==s&&(c+=t.substring(n,s)),n=s+1,c+=r}return n!==s?c+t.substring(n,s):c}var matchHtmlRegExp=/["'&<>]/;module.exports=escapeHtml;

},{}],160:[function(require,module,exports){
(function (Buffer){
"use strict";function entitytag(t){if(0===t.length)return'"0-1B2M2Y8AsgTpgAmY7PhCfg"';var e=crypto.createHash("md5").update(t,"utf8").digest("base64").replace(base64PadCharRegExp,""),r="string"==typeof t?Buffer.byteLength(t,"utf8"):t.length;return'"'+r.toString(16)+"-"+e+'"'}function etag(t,e){if(null==t)throw new TypeError("argument entity is required");var r=isstats(t),n=e&&"boolean"==typeof e.weak?e.weak:r;if(!r&&"string"!=typeof t&&!Buffer.isBuffer(t))throw new TypeError("argument entity must be string, Buffer, or fs.Stats");var i=r?stattag(t):entitytag(t);return n?"W/"+i:i}function isstats(t){return"function"==typeof Stats&&t instanceof Stats?!0:t&&"object"==typeof t&&"ctime"in t&&"[object Date]"===toString.call(t.ctime)&&"mtime"in t&&"[object Date]"===toString.call(t.mtime)&&"ino"in t&&"number"==typeof t.ino&&"size"in t&&"number"==typeof t.size}function stattag(t){var e=t.mtime.getTime().toString(16),r=t.size.toString(16);return'"'+r+"-"+e+'"'}module.exports=etag;var crypto=require("crypto"),Stats=require("fs").Stats,base64PadCharRegExp=/=+$/,toString=Object.prototype.toString;

}).call(this,require("buffer").Buffer)
},{"buffer":112,"crypto":126,"fs":110}],161:[function(require,module,exports){
function EventEmitter(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function isFunction(e){return"function"==typeof e}function isNumber(e){return"number"==typeof e}function isObject(e){return"object"==typeof e&&null!==e}function isUndefined(e){return void 0===e}module.exports=EventEmitter,EventEmitter.EventEmitter=EventEmitter,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0,EventEmitter.defaultMaxListeners=10,EventEmitter.prototype.setMaxListeners=function(e){if(!isNumber(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},EventEmitter.prototype.emit=function(e){var t,i,n,s,r,o;if(this._events||(this._events={}),"error"===e&&(!this._events.error||isObject(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(i=this._events[e],isUndefined(i))return!1;if(isFunction(i))switch(arguments.length){case 1:i.call(this);break;case 2:i.call(this,arguments[1]);break;case 3:i.call(this,arguments[1],arguments[2]);break;default:s=Array.prototype.slice.call(arguments,1),i.apply(this,s)}else if(isObject(i))for(s=Array.prototype.slice.call(arguments,1),o=i.slice(),n=o.length,r=0;n>r;r++)o[r].apply(this,s);return!0},EventEmitter.prototype.addListener=function(e,t){var i;if(!isFunction(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,isFunction(t.listener)?t.listener:t),this._events[e]?isObject(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,isObject(this._events[e])&&!this._events[e].warned&&(i=isUndefined(this._maxListeners)?EventEmitter.defaultMaxListeners:this._maxListeners,i&&i>0&&this._events[e].length>i&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.once=function(e,t){function i(){this.removeListener(e,i),n||(n=!0,t.apply(this,arguments))}if(!isFunction(t))throw TypeError("listener must be a function");var n=!1;return i.listener=t,this.on(e,i),this},EventEmitter.prototype.removeListener=function(e,t){var i,n,s,r;if(!isFunction(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(i=this._events[e],s=i.length,n=-1,i===t||isFunction(i.listener)&&i.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(isObject(i)){for(r=s;r-- >0;)if(i[r]===t||i[r].listener&&i[r].listener===t){n=r;break}if(0>n)return this;1===i.length?(i.length=0,delete this._events[e]):i.splice(n,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},EventEmitter.prototype.removeAllListeners=function(e){var t,i;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(i=this._events[e],isFunction(i))this.removeListener(e,i);else if(i)for(;i.length;)this.removeListener(e,i[i.length-1]);return delete this._events[e],this},EventEmitter.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?isFunction(this._events[e])?[this._events[e]]:this._events[e].slice():[]},EventEmitter.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(isFunction(t))return 1;if(t)return t.length}return 0},EventEmitter.listenerCount=function(e,t){return e.listenerCount(t)};

},{}],162:[function(require,module,exports){
(function (Buffer){
function EVP_BytesToKey(e,f,r,u){Buffer.isBuffer(e)||(e=new Buffer(e,"binary")),f&&!Buffer.isBuffer(f)&&(f=new Buffer(f,"binary")),r/=8,u=u||0;for(var i,n,a=0,t=0,B=new Buffer(r),o=new Buffer(u),h=0,s=[];;){if(h++>0&&s.push(i),s.push(e),f&&s.push(f),i=md5(Buffer.concat(s)),s=[],n=0,r>0)for(;;){if(0===r)break;if(n===i.length)break;B[a++]=i[n],r--,n++}if(u>0&&n!==i.length)for(;;){if(0===u)break;if(n===i.length)break;o[t++]=i[n],u--,n++}if(0===r&&0===u)break}for(n=0;n<i.length;n++)i[n]=0;return{key:B,iv:o}}var md5=require("create-hash/md5");module.exports=EVP_BytesToKey;

}).call(this,require("buffer").Buffer)
},{"buffer":112,"create-hash/md5":124}],163:[function(require,module,exports){
"use strict";module.exports=require("./lib/express");

},{"./lib/express":165}],164:[function(require,module,exports){
(function (process){
"use strict";function logerror(e){"test"!==this.get("env")&&console.error(e.stack||e.toString())}function tryRender(e,t,r){try{e.render(t,r)}catch(i){r(i)}}var finalhandler=require("finalhandler"),Router=require("./router"),methods=require("methods"),middleware=require("./middleware/init"),query=require("./middleware/query"),debug=require("debug")("express:application"),View=require("./view"),http=require("http"),compileETag=require("./utils").compileETag,compileQueryParser=require("./utils").compileQueryParser,compileTrust=require("./utils").compileTrust,deprecate=require("depd")("express"),flatten=require("array-flatten"),merge=require("utils-merge"),resolve=require("path").resolve,slice=Array.prototype.slice,app=exports=module.exports={},trustProxyDefaultSymbol="@@symbol:trust_proxy_default";app.init=function(){this.cache={},this.engines={},this.settings={},this.defaultConfiguration()},app.defaultConfiguration=function(){var e=process.env.NODE_ENV||"development";this.enable("x-powered-by"),this.set("etag","weak"),this.set("env",e),this.set("query parser","extended"),this.set("subdomain offset",2),this.set("trust proxy",!1),Object.defineProperty(this.settings,trustProxyDefaultSymbol,{configurable:!0,value:!0}),debug("booting in %s mode",e),this.on("mount",function(e){this.settings[trustProxyDefaultSymbol]===!0&&"function"==typeof e.settings["trust proxy fn"]&&(delete this.settings["trust proxy"],delete this.settings["trust proxy fn"]),this.request.__proto__=e.request,this.response.__proto__=e.response,this.engines.__proto__=e.engines,this.settings.__proto__=e.settings}),this.locals=Object.create(null),this.mountpath="/",this.locals.settings=this.settings,this.set("view",View),this.set("views",resolve("views")),this.set("jsonp callback name","callback"),"production"===e&&this.enable("view cache"),Object.defineProperty(this,"router",{get:function(){throw new Error("'app.router' is deprecated!\nPlease see the 3.x to 4.x migration guide for details on how to update your app.")}})},app.lazyrouter=function(){this._router||(this._router=new Router({caseSensitive:this.enabled("case sensitive routing"),strict:this.enabled("strict routing")}),this._router.use(query(this.get("query parser fn"))),this._router.use(middleware.init(this)))},app.handle=function(e,t,r){var i=this._router,s=r||finalhandler(e,t,{env:this.get("env"),onerror:logerror.bind(this)});return i?void i.handle(e,t,s):(debug("no routes defined on app"),void s())},app.use=function(e){var t=0,r="/";if("function"!=typeof e){for(var i=e;Array.isArray(i)&&0!==i.length;)i=i[0];"function"!=typeof i&&(t=1,r=e)}var s=flatten(slice.call(arguments,t));if(0===s.length)throw new TypeError("app.use() requires middleware functions");this.lazyrouter();var n=this._router;return s.forEach(function(e){return e&&e.handle&&e.set?(debug(".use app under %s",r),e.mountpath=r,e.parent=this,n.use(r,function(t,r,i){var s=t.app;e.handle(t,r,function(e){t.__proto__=s.request,r.__proto__=s.response,i(e)})}),void e.emit("mount",this)):n.use(r,e)},this),this},app.route=function(e){return this.lazyrouter(),this._router.route(e)},app.engine=function(e,t){if("function"!=typeof t)throw new Error("callback function required");var r="."!==e[0]?"."+e:e;return this.engines[r]=t,this},app.param=function(e,t){if(this.lazyrouter(),Array.isArray(e)){for(var r=0;r<e.length;r++)this.param(e[r],t);return this}return this._router.param(e,t),this},app.set=function(e,t){if(1===arguments.length)return this.settings[e];switch(debug('set "%s" to %o',e,t),this.settings[e]=t,e){case"etag":this.set("etag fn",compileETag(t));break;case"query parser":this.set("query parser fn",compileQueryParser(t));break;case"trust proxy":this.set("trust proxy fn",compileTrust(t)),Object.defineProperty(this.settings,trustProxyDefaultSymbol,{configurable:!0,value:!1})}return this},app.path=function(){return this.parent?this.parent.path()+this.mountpath:""},app.enabled=function(e){return Boolean(this.set(e))},app.disabled=function(e){return!this.set(e)},app.enable=function(e){return this.set(e,!0)},app.disable=function(e){return this.set(e,!1)},methods.forEach(function(e){app[e]=function(t){if("get"===e&&1===arguments.length)return this.set(t);this.lazyrouter();var r=this._router.route(t);return r[e].apply(r,slice.call(arguments,1)),this}}),app.all=function(e){this.lazyrouter();for(var t=this._router.route(e),r=slice.call(arguments,1),i=0;i<methods.length;i++)t[methods[i]].apply(t,r);return this},app.del=deprecate["function"](app["delete"],"app.del: Use app.delete instead"),app.render=function(e,t,r){var i,s=this.cache,n=r,o=this.engines,a=t,u={};if("function"==typeof t&&(n=t,a={}),merge(u,this.locals),a._locals&&merge(u,a._locals),merge(u,a),null==u.cache&&(u.cache=this.enabled("view cache")),u.cache&&(i=s[e]),!i){var p=this.get("view");if(i=new p(e,{defaultEngine:this.get("view engine"),root:this.get("views"),engines:o}),!i.path){var h=Array.isArray(i.root)&&i.root.length>1?'directories "'+i.root.slice(0,-1).join('", "')+'" or "'+i.root[i.root.length-1]+'"':'directory "'+i.root+'"',l=new Error('Failed to lookup view "'+e+'" in views '+h);return l.view=i,n(l)}u.cache&&(s[e]=i)}tryRender(i,u,n)},app.listen=function(){var e=http.createServer(this);return e.listen.apply(e,arguments)};

}).call(this,require('_process'))
},{"./middleware/init":166,"./middleware/query":167,"./router":170,"./utils":173,"./view":174,"_process":244,"array-flatten":67,"debug":127,"depd":129,"finalhandler":179,"http":283,"methods":219,"path":240,"utils-merge":295}],165:[function(require,module,exports){
"use strict";function createApplication(){var e=function(r,t,o){e.handle(r,t,o)};return mixin(e,EventEmitter.prototype,!1),mixin(e,proto,!1),e.request={__proto__:req,app:e},e.response={__proto__:res,app:e},e.init(),e}var EventEmitter=require("events").EventEmitter,mixin=require("merge-descriptors"),proto=require("./application"),Route=require("./router/route"),Router=require("./router"),req=require("./request"),res=require("./response");exports=module.exports=createApplication,exports.application=proto,exports.request=req,exports.response=res,exports.Route=Route,exports.Router=Router,exports.query=require("./middleware/query"),exports["static"]=require("serve-static"),["json","urlencoded","bodyParser","compress","cookieSession","session","logger","cookieParser","favicon","responseTime","errorHandler","timeout","methodOverride","vhost","csrf","directory","limit","multipart","staticCache"].forEach(function(e){Object.defineProperty(exports,e,{get:function(){throw new Error("Most middleware (like "+e+") is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.")},configurable:!0})});

},{"./application":164,"./middleware/query":167,"./request":168,"./response":169,"./router":170,"./router/route":172,"events":161,"merge-descriptors":218,"serve-static":271}],166:[function(require,module,exports){
"use strict";exports.init=function(e){return function(r,t,o){e.enabled("x-powered-by")&&t.setHeader("X-Powered-By","Express"),r.res=t,t.req=r,r.next=o,r.__proto__=e.request,t.__proto__=e.response,t.locals=t.locals||Object.create(null),o()}};

},{}],167:[function(require,module,exports){
"use strict";var parseUrl=require("parseurl"),qs=require("qs");module.exports=function(r){var e=Object.create(r||null),o=qs.parse;return"function"==typeof r&&(o=r,e=void 0),void 0!==e&&(void 0===e.allowDots&&(e.allowDots=!1),void 0===e.allowPrototypes&&(e.allowPrototypes=!0)),function(r,t,l){if(!r.query){var s=parseUrl(r).query;r.query=o(s,e)}l()}};

},{"parseurl":239,"qs":175}],168:[function(require,module,exports){
"use strict";function defineGetter(e,r,t){Object.defineProperty(e,r,{configurable:!0,enumerable:!0,get:t})}var accepts=require("accepts"),deprecate=require("depd")("express"),isIP=require("net").isIP,typeis=require("type-is"),http=require("http"),fresh=require("fresh"),parseRange=require("range-parser"),parse=require("parseurl"),proxyaddr=require("proxy-addr"),req=exports=module.exports={__proto__:http.IncomingMessage.prototype};req.get=req.header=function(e){var r=e.toLowerCase();switch(r){case"referer":case"referrer":return this.headers.referrer||this.headers.referer;default:return this.headers[r]}},req.accepts=function(){var e=accepts(this);return e.types.apply(e,arguments)},req.acceptsEncodings=function(){var e=accepts(this);return e.encodings.apply(e,arguments)},req.acceptsEncoding=deprecate["function"](req.acceptsEncodings,"req.acceptsEncoding: Use acceptsEncodings instead"),req.acceptsCharsets=function(){var e=accepts(this);return e.charsets.apply(e,arguments)},req.acceptsCharset=deprecate["function"](req.acceptsCharsets,"req.acceptsCharset: Use acceptsCharsets instead"),req.acceptsLanguages=function(){var e=accepts(this);return e.languages.apply(e,arguments)},req.acceptsLanguage=deprecate["function"](req.acceptsLanguages,"req.acceptsLanguage: Use acceptsLanguages instead"),req.range=function(e){var r=this.get("Range");if(r)return parseRange(e,r)},req.param=function(e,r){var t=this.params||{},s=this.body||{},n=this.query||{},a=1===arguments.length?"name":"name, default";return deprecate("req.param("+a+"): Use req.params, req.body, or req.query instead"),null!=t[e]&&t.hasOwnProperty(e)?t[e]:null!=s[e]?s[e]:null!=n[e]?n[e]:r},req.is=function(e){var r=e;if(!Array.isArray(e)){r=new Array(arguments.length);for(var t=0;t<r.length;t++)r[t]=arguments[t]}return typeis(this,r)},defineGetter(req,"protocol",function(){var e=this.connection.encrypted?"https":"http",r=this.app.get("trust proxy fn");return r(this.connection.remoteAddress,0)?(e=this.get("X-Forwarded-Proto")||e,e.split(/\s*,\s*/)[0]):e}),defineGetter(req,"secure",function(){return"https"===this.protocol}),defineGetter(req,"ip",function(){var e=this.app.get("trust proxy fn");return proxyaddr(this,e)}),defineGetter(req,"ips",function(){var e=this.app.get("trust proxy fn"),r=proxyaddr.all(this,e);return r.slice(1).reverse()}),defineGetter(req,"subdomains",function e(){var r=this.hostname;if(!r)return[];var t=this.app.get("subdomain offset"),e=isIP(r)?[r]:r.split(".").reverse();return e.slice(t)}),defineGetter(req,"path",function(){return parse(this).pathname}),defineGetter(req,"hostname",function(){var e=this.app.get("trust proxy fn"),r=this.get("X-Forwarded-Host");if(r&&e(this.connection.remoteAddress,0)||(r=this.get("Host")),r){var t="["===r[0]?r.indexOf("]")+1:0,s=r.indexOf(":",t);return-1!==s?r.substring(0,s):r}}),defineGetter(req,"host",deprecate["function"](function(){return this.hostname},"req.host: Use req.hostname instead")),defineGetter(req,"fresh",function(){var e=this.method,r=this.res.statusCode;return"GET"!=e&&"HEAD"!=e?!1:r>=200&&300>r||304==r?fresh(this.headers,this.res._headers||{}):!1}),defineGetter(req,"stale",function(){return!this.fresh}),defineGetter(req,"xhr",function(){var e=this.get("X-Requested-With")||"";return"xmlhttprequest"===e.toLowerCase()});

},{"accepts":66,"depd":129,"fresh":182,"http":283,"net":110,"parseurl":239,"proxy-addr":245,"range-parser":257,"type-is":290}],169:[function(require,module,exports){
(function (Buffer){
"use strict";function sendfile(e,t,s,r){function n(){if(!p){p=!0;var e=new Error("Request aborted");e.code="ECONNABORTED",r(e)}}function i(){if(!p){p=!0;var e=new Error("EISDIR, read");e.code="EISDIR",r(e)}}function o(e){p||(p=!0,r(e))}function a(){p||(p=!0,r())}function u(){d=!1}function h(e){return e&&"ECONNRESET"===e.code?n():e?o(e):void(p||setImmediate(function(){return d===!1||p?void(p||(p=!0,r())):void n()}))}function c(){d=!0}var d,p=!1;t.on("directory",i),t.on("end",a),t.on("error",o),t.on("file",u),t.on("stream",c),onFinished(e,h),s.headers&&t.on("headers",function(e){for(var t=s.headers,r=Object.keys(t),n=0;n<r.length;n++){var i=r[n];e.setHeader(i,t[i])}}),t.pipe(e)}var contentDisposition=require("content-disposition"),deprecate=require("depd")("express"),escapeHtml=require("escape-html"),http=require("http"),isAbsolute=require("./utils").isAbsolute,onFinished=require("on-finished"),path=require("path"),merge=require("utils-merge"),sign=require("cookie-signature").sign,normalizeType=require("./utils").normalizeType,normalizeTypes=require("./utils").normalizeTypes,setCharset=require("./utils").setCharset,statusCodes=http.STATUS_CODES,cookie=require("cookie"),send=require("send"),extname=path.extname,mime=send.mime,resolve=path.resolve,vary=require("vary"),res=module.exports={__proto__:http.ServerResponse.prototype},charsetRegExp=/;\s*charset\s*=/;res.status=function(e){return this.statusCode=e,this},res.links=function(e){var t=this.get("Link")||"";return t&&(t+=", "),this.set("Link",t+Object.keys(e).map(function(t){return"<"+e[t]+'>; rel="'+t+'"'}).join(", "))},res.send=function(e){var t,s,r,n=e,i=this.req,o=this.app;switch(2===arguments.length&&("number"!=typeof arguments[0]&&"number"==typeof arguments[1]?(deprecate("res.send(body, status): Use res.status(status).send(body) instead"),this.statusCode=arguments[1]):(deprecate("res.send(status, body): Use res.status(status).send(body) instead"),this.statusCode=arguments[0],n=arguments[1])),"number"==typeof n&&1===arguments.length&&(this.get("Content-Type")||this.type("txt"),deprecate("res.send(status): Use res.sendStatus(status) instead"),this.statusCode=n,n=statusCodes[n]),typeof n){case"string":this.get("Content-Type")||this.type("html");break;case"boolean":case"number":case"object":if(null===n)n="";else{if(!Buffer.isBuffer(n))return this.json(n);this.get("Content-Type")||this.type("bin")}}"string"==typeof n&&(t="utf8",r=this.get("Content-Type"),"string"==typeof r&&this.set("Content-Type",setCharset(r,"utf-8"))),void 0!==n&&(Buffer.isBuffer(n)||(n=new Buffer(n,t),t=void 0),s=n.length,this.set("Content-Length",s));var a,u=void 0!==s&&o.get("etag fn");return"function"!=typeof u||this.get("ETag")||(a=u(n,t))&&this.set("ETag",a),i.fresh&&(this.statusCode=304),204!=this.statusCode&&304!=this.statusCode||(this.removeHeader("Content-Type"),this.removeHeader("Content-Length"),this.removeHeader("Transfer-Encoding"),n=""),"HEAD"===i.method?this.end():this.end(n,t),this},res.json=function(e){var t=e;2===arguments.length&&("number"==typeof arguments[1]?(deprecate("res.json(obj, status): Use res.status(status).json(obj) instead"),this.statusCode=arguments[1]):(deprecate("res.json(status, obj): Use res.status(status).json(obj) instead"),this.statusCode=arguments[0],t=arguments[1]));var s=this.app,r=s.get("json replacer"),n=s.get("json spaces"),i=JSON.stringify(t,r,n);return this.get("Content-Type")||this.set("Content-Type","application/json"),this.send(i)},res.jsonp=function(e){var t=e;2===arguments.length&&("number"==typeof arguments[1]?(deprecate("res.jsonp(obj, status): Use res.status(status).json(obj) instead"),this.statusCode=arguments[1]):(deprecate("res.jsonp(status, obj): Use res.status(status).jsonp(obj) instead"),this.statusCode=arguments[0],t=arguments[1]));var s=this.app,r=s.get("json replacer"),n=s.get("json spaces"),i=JSON.stringify(t,r,n),o=this.req.query[s.get("jsonp callback name")];return this.get("Content-Type")||(this.set("X-Content-Type-Options","nosniff"),this.set("Content-Type","application/json")),Array.isArray(o)&&(o=o[0]),"string"==typeof o&&0!==o.length&&(this.charset="utf-8",this.set("X-Content-Type-Options","nosniff"),this.set("Content-Type","text/javascript"),o=o.replace(/[^\[\]\w$.]/g,""),i=i.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029"),i="/**/ typeof "+o+" === 'function' && "+o+"("+i+");"),this.send(i)},res.sendStatus=function(e){var t=statusCodes[e]||String(e);return this.statusCode=e,this.type("txt"),this.send(t)},res.sendFile=function(e,t,s){var r=s,n=this.req,i=this,o=n.next,a=t||{};if(!e)throw new TypeError("path argument is required to res.sendFile");if("function"==typeof t&&(r=t,a={}),!a.root&&!isAbsolute(e))throw new TypeError("path must be absolute or specify root to res.sendFile");var u=encodeURI(e),h=send(n,u,a);sendfile(i,h,a,function(e){return r?r(e):e&&"EISDIR"===e.code?o():void(e&&"ECONNABORTED"!==e.code&&"write"!==e.syscall&&o(e))})},res.sendfile=function(e,t,s){var r=s,n=this.req,i=this,o=n.next,a=t||{};"function"==typeof t&&(r=t,a={});var u=send(n,e,a);sendfile(i,u,a,function(e){return r?r(e):e&&"EISDIR"===e.code?o():void(e&&"ECONNABORT"!==e.code&&"write"!==e.syscall&&o(e))})},res.sendfile=deprecate["function"](res.sendfile,"res.sendfile: Use res.sendFile instead"),res.download=function(e,t,s){var r=s,n=t;"function"==typeof t&&(r=t,n=null);var i={"Content-Disposition":contentDisposition(n||e)},o=resolve(e);return this.sendFile(o,{headers:i},r)},res.contentType=res.type=function(e){var t=-1===e.indexOf("/")?mime.lookup(e):e;return this.set("Content-Type",t)},res.format=function(e){var t=this.req,s=t.next,r=e["default"];r&&delete e["default"];var n=Object.keys(e),i=n.length>0?t.accepts(n):!1;if(this.vary("Accept"),i)this.set("Content-Type",normalizeType(i).value),e[i](t,this,s);else if(r)r();else{var o=new Error("Not Acceptable");o.status=o.statusCode=406,o.types=normalizeTypes(n).map(function(e){return e.value}),s(o)}return this},res.attachment=function(e){return e&&this.type(extname(e)),this.set("Content-Disposition",contentDisposition(e)),this},res.append=function(e,t){var s=this.get(e),r=t;return s&&(r=Array.isArray(s)?s.concat(t):Array.isArray(t)?[s].concat(t):[s,t]),this.set(e,r)},res.set=res.header=function(e,t){if(2===arguments.length){var s=Array.isArray(t)?t.map(String):String(t);if("content-type"===e.toLowerCase()&&!charsetRegExp.test(s)){var r=mime.charsets.lookup(s.split(";")[0]);r&&(s+="; charset="+r.toLowerCase())}this.setHeader(e,s)}else for(var n in e)this.set(n,e[n]);return this},res.get=function(e){return this.getHeader(e)},res.clearCookie=function(e,t){var s=merge({expires:new Date(1),path:"/"},t);return this.cookie(e,"",s)},res.cookie=function(e,t,s){var r=merge({},s),n=this.req.secret,i=r.signed;if(i&&!n)throw new Error('cookieParser("secret") required for signed cookies');var o="object"==typeof t?"j:"+JSON.stringify(t):String(t);return i&&(o="s:"+sign(o,n)),"maxAge"in r&&(r.expires=new Date(Date.now()+r.maxAge),r.maxAge/=1e3),null==r.path&&(r.path="/"),this.append("Set-Cookie",cookie.serialize(e,String(o),r)),this},res.location=function(e){var t=e;return"back"===e&&(t=this.req.get("Referrer")||"/"),this.set("Location",t),this},res.redirect=function(e){var t,s=e,r=302;2===arguments.length&&("number"==typeof arguments[0]?(r=arguments[0],s=arguments[1]):(deprecate("res.redirect(url, status): Use res.redirect(status, url) instead"),r=arguments[1])),this.location(s),s=this.get("Location"),this.format({text:function(){t=statusCodes[r]+". Redirecting to "+encodeURI(s)},html:function(){var e=escapeHtml(s);t="<p>"+statusCodes[r]+'. Redirecting to <a href="'+e+'">'+e+"</a></p>"},"default":function(){t=""}}),this.statusCode=r,this.set("Content-Length",Buffer.byteLength(t)),"HEAD"===this.req.method?this.end():this.end(t)},res.vary=function(e){return!e||Array.isArray(e)&&!e.length?(deprecate("res.vary(): Provide a field name"),this):(vary(this,e),this)},res.render=function(e,t,s){var r=this.req.app,n=s,i=t||{},o=this.req,a=this;"function"==typeof t&&(n=t,i={}),i._locals=a.locals,n=n||function(e,t){return e?o.next(e):void a.send(t)},r.render(e,i,n)};

}).call(this,require("buffer").Buffer)
},{"./utils":173,"buffer":112,"content-disposition":116,"cookie":119,"cookie-signature":118,"depd":129,"escape-html":159,"http":283,"on-finished":233,"path":240,"send":270,"utils-merge":295,"vary":296}],170:[function(require,module,exports){
"use strict";function appendMethods(r,e){for(var t=0;t<e.length;t++){var n=e[t];-1===r.indexOf(n)&&r.push(n)}}function getPathname(r){try{return parseUrl(r).pathname}catch(e){return}}function gettype(r){var e=typeof r;return"object"!==e?e:toString.call(r).replace(objectRegExp,"$1")}function matchLayer(r,e){try{return r.match(e)}catch(t){return t}}function mergeParams(r,e){if("object"!=typeof e||!e)return r;var t=mixin({},e);if(!(0 in r&&0 in e))return mixin(t,r);for(var n=0,a=0;n in r;)n++;for(;a in e;)a++;for(n--;n>=0;n--)r[n+a]=r[n],a>n&&delete r[n];return mixin(t,r)}function restore(r,e){for(var t=new Array(arguments.length-2),n=new Array(arguments.length-2),a=0;a<t.length;a++)t[a]=arguments[a+2],n[a]=e[t[a]];return function(a){for(var o=0;o<t.length;o++)e[t[o]]=n[o];return r.apply(this,arguments)}}function sendOptionsResponse(r,e,t){try{var n=e.join(",");r.set("Allow",n),r.send(n)}catch(a){t(a)}}function wrap(r,e){return function(){var t=new Array(arguments.length+1);t[0]=r;for(var n=0,a=arguments.length;a>n;n++)t[n+1]=arguments[n];e.apply(this,t)}}var Route=require("./route"),Layer=require("./layer"),methods=require("methods"),mixin=require("utils-merge"),debug=require("debug")("express:router"),deprecate=require("depd")("express"),flatten=require("array-flatten"),parseUrl=require("parseurl"),objectRegExp=/^\[object (\S+)\]$/,slice=Array.prototype.slice,toString=Object.prototype.toString,proto=module.exports=function(r){function e(r,t,n){e.handle(r,t,n)}var t=r||{};return e.__proto__=proto,e.params={},e._params=[],e.caseSensitive=t.caseSensitive,e.mergeParams=t.mergeParams,e.strict=t.strict,e.stack=[],e};proto.param=function(r,e){if("function"==typeof r)return deprecate("router.param(fn): Refactor to use path params"),void this._params.push(r);var t,n=this._params,a=n.length;":"===r[0]&&(deprecate("router.param("+JSON.stringify(r)+", fn): Use router.param("+JSON.stringify(r.substr(1))+", fn) instead"),r=r.substr(1));for(var o=0;a>o;++o)(t=n[o](r,e))&&(e=t);if("function"!=typeof e)throw new Error("invalid param() call for "+r+", got "+e);return(this.params[r]=this.params[r]||[]).push(e),this},proto.handle=function(r,e,t){function n(t){var s="route"===t?null:t;if(f&&(r.url=r.url.substr(1),f=!1),0!==c.length&&(r.baseUrl=v,r.url=l+c+r.url.substr(l.length),c=""),p>=d.length)return void setImmediate(y,s);var i=getPathname(r);if(null==i)return y(s);for(var u,b,w;b!==!0&&p<d.length;)if(u=d[p++],b=matchLayer(u,i),w=u.route,"boolean"!=typeof b&&(s=s||b),b===!0&&w)if(s)b=!1;else{var x=r.method,_=w._handles_method(x);_||"OPTIONS"!==x||appendMethods(m,w._options()),_||"HEAD"===x||(b=!1)}if(b!==!0)return y(s);w&&(r.route=w),r.params=o.mergeParams?mergeParams(u.params,g):u.params;var O=u.path;o.process_params(u,h,r,e,function(t){return t?n(s||t):w?u.handle_request(r,e,n):void a(u,s,O,i)})}function a(t,a,o,s){var i=s[o.length];return i&&"/"!==i&&"."!==i?n(a):(0!==o.length&&(debug("trim prefix (%s) from url %s",o,r.url),c=o,r.url=l+r.url.substr(l.length+c.length),u||"/"===r.url[0]||(r.url="/"+r.url,f=!0),r.baseUrl=v+("/"===c[c.length-1]?c.substring(0,c.length-1):c)),debug("%s %s : %s",t.name,o,r.originalUrl),void(a?t.handle_error(a,r,e,n):t.handle_request(r,e,n)))}var o=this;debug("dispatching %s %s",r.method,r.url);var s=1+r.url.indexOf("?"),i=s?s-1:r.url.length,u="/"!==r.url[0]&&1+r.url.substr(0,i).indexOf("://"),l=u?r.url.substr(0,r.url.indexOf("/",2+u)):"",p=0,c="",f=!1,h={},m=[],d=o.stack,g=r.params,v=r.baseUrl||"",y=restore(t,r,"baseUrl","next","params");r.next=n,"OPTIONS"===r.method&&(y=wrap(y,function(r,t){return t||0===m.length?r(t):void sendOptionsResponse(e,m,r)})),r.baseUrl=v,r.originalUrl=r.originalUrl||r.url,n()},proto.process_params=function(r,e,t,n,a){function o(r){return r?a(r):m>=u.length?a():(d=0,(p=u[m++])?(l=p.name,c=t.params[l],f=i[l],h=e[l],void 0!==c&&f?h&&(h.match===c||h.error&&"route"!==h.error)?(t.params[l]=h.value,o(h.error)):(e[l]=h={error:null,match:c,value:c},void s()):o()):a())}function s(r){var e=f[d++];if(h.value=t.params[p.name],r)return h.error=r,void o(r);if(!e)return o();try{e(t,n,s,c,p.name)}catch(a){s(a)}}var i=this.params,u=r.keys;if(!u||0===u.length)return a();var l,p,c,f,h,m=0,d=0;o()},proto.use=function(r){var e=0,t="/";if("function"!=typeof r){for(var n=r;Array.isArray(n)&&0!==n.length;)n=n[0];"function"!=typeof n&&(e=1,t=r)}var a=flatten(slice.call(arguments,e));if(0===a.length)throw new TypeError("Router.use() requires middleware functions");for(var o=0;o<a.length;o++){var r=a[o];if("function"!=typeof r)throw new TypeError("Router.use() requires middleware function but got a "+gettype(r));debug("use %s %s",t,r.name||"<anonymous>");var s=new Layer(t,{sensitive:this.caseSensitive,strict:!1,end:!1},r);s.route=void 0,this.stack.push(s)}return this},proto.route=function r(e){var r=new Route(e),t=new Layer(e,{sensitive:this.caseSensitive,strict:this.strict,end:!0},r.dispatch.bind(r));return t.route=r,this.stack.push(t),r},methods.concat("all").forEach(function(r){proto[r]=function(e){var t=this.route(e);return t[r].apply(t,slice.call(arguments,1)),this}});

},{"./layer":171,"./route":172,"array-flatten":67,"debug":127,"depd":129,"methods":219,"parseurl":239,"utils-merge":295}],171:[function(require,module,exports){
"use strict";function Layer(e,t,r){if(!(this instanceof Layer))return new Layer(e,t,r);debug("new %s",e);var a=t||{};this.handle=r,this.name=r.name||"<anonymous>",this.params=void 0,this.path=void 0,this.regexp=pathRegexp(e,this.keys=[],a),"/"===e&&a.end===!1&&(this.regexp.fast_slash=!0)}function decode_param(e){if("string"!=typeof e||0===e.length)return e;try{return decodeURIComponent(e)}catch(t){throw t instanceof URIError&&(t.message="Failed to decode param '"+e+"'",t.status=t.statusCode=400),t}}var pathRegexp=require("path-to-regexp"),debug=require("debug")("express:router:layer"),hasOwnProperty=Object.prototype.hasOwnProperty;module.exports=Layer,Layer.prototype.handle_error=function(e,t,r,a){var s=this.handle;if(4!==s.length)return a(e);try{s(e,t,r,a)}catch(h){a(h)}},Layer.prototype.handle_request=function(e,t,r){var a=this.handle;if(a.length>3)return r();try{a(e,t,r)}catch(s){r(s)}},Layer.prototype.match=function(e){if(null==e)return this.params=void 0,this.path=void 0,!1;if(this.regexp.fast_slash)return this.params={},this.path="",!0;var t=this.regexp.exec(e);if(!t)return this.params=void 0,this.path=void 0,!1;this.params={},this.path=t[0];for(var r=this.keys,a=this.params,s=1;s<t.length;s++){var h=r[s-1],i=h.name,n=decode_param(t[s]);void 0===n&&hasOwnProperty.call(a,i)||(a[i]=n)}return!0};

},{"debug":127,"path-to-regexp":241}],172:[function(require,module,exports){
"use strict";function Route(t){this.path=t,this.stack=[],debug("new %s",t),this.methods={}}var debug=require("debug")("express:router:route"),flatten=require("array-flatten"),Layer=require("./layer"),methods=require("methods"),slice=Array.prototype.slice,toString=Object.prototype.toString;module.exports=Route,Route.prototype._handles_method=function(t){if(this.methods._all)return!0;var e=t.toLowerCase();return"head"!==e||this.methods.head||(e="get"),Boolean(this.methods[e])},Route.prototype._options=function(){var t=Object.keys(this.methods);this.methods.get&&!this.methods.head&&t.push("head");for(var e=0;e<t.length;e++)t[e]=t[e].toUpperCase();return t},Route.prototype.dispatch=function(t,e,r){function o(i){if(i&&"route"===i)return r();var n=a[s++];return n?n.method&&n.method!==h?o(i):void(i?n.handle_error(i,t,e,o):n.handle_request(t,e,o)):r(i)}var s=0,a=this.stack;if(0===a.length)return r();var h=t.method.toLowerCase();"head"!==h||this.methods.head||(h="get"),t.route=this,o()},Route.prototype.all=function(){for(var t=flatten(slice.call(arguments)),e=0;e<t.length;e++){var r=t[e];if("function"!=typeof r){var o=toString.call(r),s="Route.all() requires callback functions but got a "+o;throw new TypeError(s)}var a=Layer("/",{},r);a.method=void 0,this.methods._all=!0,this.stack.push(a)}return this},methods.forEach(function(t){Route.prototype[t]=function(){for(var e=flatten(slice.call(arguments)),r=0;r<e.length;r++){var o=e[r];if("function"!=typeof o){var s=toString.call(o),a="Route."+t+"() requires callback functions but got a "+s;throw new Error(a)}debug("%s %s",t,this.path);var h=Layer("/",{},o);h.method=t,this.methods[t]=!0,this.stack.push(h)}return this}});

},{"./layer":171,"array-flatten":67,"debug":127,"methods":219}],173:[function(require,module,exports){
(function (Buffer){
"use strict";function acceptParams(e,r){for(var t=e.split(/ *; */),n={value:t[0],quality:1,params:{},originalIndex:r},a=1;a<t.length;++a){var o=t[a].split(/ *= */);"q"==o[0]?n.quality=parseFloat(o[1]):n.params[o[0]]=o[1]}return n}function parseExtendedQueryString(e){return qs.parse(e,{allowDots:!1,allowPrototypes:!0})}function newObject(){return{}}var contentDisposition=require("content-disposition"),contentType=require("content-type"),deprecate=require("depd")("express"),flatten=require("array-flatten"),mime=require("send").mime,basename=require("path").basename,etag=require("etag"),proxyaddr=require("proxy-addr"),qs=require("qs"),querystring=require("querystring");exports.etag=function(e,r){var t=Buffer.isBuffer(e)?e:new Buffer(e,r);return etag(t,{weak:!1})},exports.wetag=function(e,r){var t=Buffer.isBuffer(e)?e:new Buffer(e,r);return etag(t,{weak:!0})},exports.isAbsolute=function(e){return"/"==e[0]?!0:":"==e[1]&&"\\"==e[2]?!0:"\\\\"==e.substring(0,2)?!0:void 0},exports.flatten=deprecate["function"](flatten,"utils.flatten: use array-flatten npm module instead"),exports.normalizeType=function(e){return~e.indexOf("/")?acceptParams(e):{value:mime.lookup(e),params:{}}},exports.normalizeTypes=function(e){for(var r=[],t=0;t<e.length;++t)r.push(exports.normalizeType(e[t]));return r},exports.contentDisposition=deprecate["function"](contentDisposition,"utils.contentDisposition: use content-disposition npm module instead"),exports.compileETag=function(e){var r;if("function"==typeof e)return e;switch(e){case!0:r=exports.wetag;break;case!1:break;case"strong":r=exports.etag;break;case"weak":r=exports.wetag;break;default:throw new TypeError("unknown value for etag function: "+e)}return r},exports.compileQueryParser=function(e){var r;if("function"==typeof e)return e;switch(e){case!0:r=querystring.parse;break;case!1:r=newObject;break;case"extended":r=parseExtendedQueryString;break;case"simple":r=querystring.parse;break;default:throw new TypeError("unknown value for query parser function: "+e)}return r},exports.compileTrust=function(e){return"function"==typeof e?e:e===!0?function(){return!0}:"number"==typeof e?function(r,t){return e>t}:("string"==typeof e&&(e=e.split(/ *, */)),proxyaddr.compile(e||[]))},exports.setCharset=function(e,r){if(!e||!r)return e;var t=contentType.parse(e);return t.parameters.charset=r,contentType.format(t)};

}).call(this,require("buffer").Buffer)
},{"array-flatten":67,"buffer":112,"content-disposition":116,"content-type":117,"depd":129,"etag":160,"path":240,"proxy-addr":245,"qs":175,"querystring":255,"send":270}],174:[function(require,module,exports){
"use strict";function View(e,t){var i=t||{};if(this.defaultEngine=i.defaultEngine,this.ext=extname(e),this.name=e,this.root=i.root,!this.ext&&!this.defaultEngine)throw new Error("No default engine was specified and no extension was provided.");var n=e;this.ext||(this.ext="."!==this.defaultEngine[0]?"."+this.defaultEngine:this.defaultEngine,n+=this.ext),i.engines[this.ext]||(i.engines[this.ext]=require(this.ext.substr(1)).__express),this.engine=i.engines[this.ext],this.path=this.lookup(n)}function tryStat(e){debug('stat "%s"',e);try{return fs.statSync(e)}catch(t){return}}var debug=require("debug")("express:view"),path=require("path"),fs=require("fs"),utils=require("./utils"),dirname=path.dirname,basename=path.basename,extname=path.extname,join=path.join,resolve=path.resolve;module.exports=View,View.prototype.lookup=function(e){var t,i=[].concat(this.root);debug('lookup "%s"',e);for(var n=0;n<i.length&&!t;n++){var s=i[n],r=resolve(s,e),a=dirname(r),o=basename(r);t=this.resolve(a,o)}return t},View.prototype.render=function(e,t){debug('render "%s"',this.path),this.engine(this.path,e,t)},View.prototype.resolve=function(e,t){var i=this.ext,n=join(e,t),s=tryStat(n);return s&&s.isFile()?n:(n=join(e,basename(t,i),"index"+i),s=tryStat(n),s&&s.isFile()?n:void 0)};

},{"./utils":173,"debug":127,"fs":110,"path":240}],175:[function(require,module,exports){
var Stringify=require("./stringify"),Parse=require("./parse"),internals={};module.exports={stringify:Stringify,parse:Parse};

},{"./parse":176,"./stringify":177}],176:[function(require,module,exports){
var Utils=require("./utils"),internals={delimiter:"&",depth:5,arrayLimit:20,parameterLimit:1e3,strictNullHandling:!1,plainObjects:!1,allowPrototypes:!1};internals.parseValues=function(e,t){for(var r={},i=e.split(t.delimiter,t.parameterLimit===1/0?void 0:t.parameterLimit),l=0,a=i.length;a>l;++l){var n=i[l],s=-1===n.indexOf("]=")?n.indexOf("="):n.indexOf("]=")+1;if(-1===s)r[Utils.decode(n)]="",t.strictNullHandling&&(r[Utils.decode(n)]=null);else{var p=Utils.decode(n.slice(0,s)),o=Utils.decode(n.slice(s+1));Object.prototype.hasOwnProperty.call(r,p)?r[p]=[].concat(r[p]).concat(o):r[p]=o}}return r},internals.parseObject=function(e,t,r){if(!e.length)return t;var i,l=e.shift();if("[]"===l)i=[],i=i.concat(internals.parseObject(e,t,r));else{i=r.plainObjects?Object.create(null):{};var a="["===l[0]&&"]"===l[l.length-1]?l.slice(1,l.length-1):l,n=parseInt(a,10),s=""+n;!isNaN(n)&&l!==a&&s===a&&n>=0&&r.parseArrays&&n<=r.arrayLimit?(i=[],i[n]=internals.parseObject(e,t,r)):i[a]=internals.parseObject(e,t,r)}return i},internals.parseKeys=function(e,t,r){if(e){r.allowDots&&(e=e.replace(/\.([^\.\[]+)/g,"[$1]"));var i=/^([^\[\]]*)/,l=/(\[[^\[\]]*\])/g,a=i.exec(e),n=[];if(a[1]){if(!r.plainObjects&&Object.prototype.hasOwnProperty(a[1])&&!r.allowPrototypes)return;n.push(a[1])}for(var s=0;null!==(a=l.exec(e))&&s<r.depth;)++s,(r.plainObjects||!Object.prototype.hasOwnProperty(a[1].replace(/\[|\]/g,""))||r.allowPrototypes)&&n.push(a[1]);return a&&n.push("["+e.slice(a.index)+"]"),internals.parseObject(n,t,r)}},module.exports=function(e,t){if(t=t||{},t.delimiter="string"==typeof t.delimiter||Utils.isRegExp(t.delimiter)?t.delimiter:internals.delimiter,t.depth="number"==typeof t.depth?t.depth:internals.depth,t.arrayLimit="number"==typeof t.arrayLimit?t.arrayLimit:internals.arrayLimit,t.parseArrays=t.parseArrays!==!1,t.allowDots=t.allowDots!==!1,t.plainObjects="boolean"==typeof t.plainObjects?t.plainObjects:internals.plainObjects,t.allowPrototypes="boolean"==typeof t.allowPrototypes?t.allowPrototypes:internals.allowPrototypes,t.parameterLimit="number"==typeof t.parameterLimit?t.parameterLimit:internals.parameterLimit,t.strictNullHandling="boolean"==typeof t.strictNullHandling?t.strictNullHandling:internals.strictNullHandling,""===e||null===e||"undefined"==typeof e)return t.plainObjects?Object.create(null):{};for(var r="string"==typeof e?internals.parseValues(e,t):e,i=t.plainObjects?Object.create(null):{},l=Object.keys(r),a=0,n=l.length;n>a;++a){var s=l[a],p=internals.parseKeys(s,r[s],t);i=Utils.merge(i,p,t)}return Utils.compact(i)};

},{"./utils":178}],177:[function(require,module,exports){
var Utils=require("./utils"),internals={delimiter:"&",arrayPrefixGenerators:{brackets:function(r,e){return r+"[]"},indices:function(r,e){return r+"["+e+"]"},repeat:function(r,e){return r}},strictNullHandling:!1};internals.stringify=function(r,e,n,i,t){if("function"==typeof t)r=t(e,r);else if(Utils.isBuffer(r))r=r.toString();else if(r instanceof Date)r=r.toISOString();else if(null===r){if(i)return Utils.encode(e);r=""}if("string"==typeof r||"number"==typeof r||"boolean"==typeof r)return[Utils.encode(e)+"="+Utils.encode(r)];var a=[];if("undefined"==typeof r)return a;for(var l=Array.isArray(t)?t:Object.keys(r),s=0,f=l.length;f>s;++s){var o=l[s];a=Array.isArray(r)?a.concat(internals.stringify(r[o],n(e,o),n,i,t)):a.concat(internals.stringify(r[o],e+"["+o+"]",n,i,t))}return a},module.exports=function(r,e){e=e||{};var n,i,t="undefined"==typeof e.delimiter?internals.delimiter:e.delimiter,a="boolean"==typeof e.strictNullHandling?e.strictNullHandling:internals.strictNullHandling;"function"==typeof e.filter?(i=e.filter,r=i("",r)):Array.isArray(e.filter)&&(n=i=e.filter);var l=[];if("object"!=typeof r||null===r)return"";var s;s=e.arrayFormat in internals.arrayPrefixGenerators?e.arrayFormat:"indices"in e?e.indices?"indices":"repeat":"indices";var f=internals.arrayPrefixGenerators[s];n||(n=Object.keys(r));for(var o=0,c=n.length;c>o;++o){var u=n[o];l=l.concat(internals.stringify(r[u],u,f,a,i))}return l.join(t)};

},{"./utils":178}],178:[function(require,module,exports){
var internals={};internals.hexTable=new Array(256);for(var h=0;256>h;++h)internals.hexTable[h]="%"+((16>h?"0":"")+h.toString(16)).toUpperCase();exports.arrayToObject=function(e,r){for(var t=r.plainObjects?Object.create(null):{},n=0,a=e.length;a>n;++n)"undefined"!=typeof e[n]&&(t[n]=e[n]);return t},exports.merge=function(e,r,t){if(!r)return e;if("object"!=typeof r)return Array.isArray(e)?e.push(r):"object"==typeof e?e[r]=!0:e=[e,r],e;if("object"!=typeof e)return e=[e].concat(r);Array.isArray(e)&&!Array.isArray(r)&&(e=exports.arrayToObject(e,t));for(var n=Object.keys(r),a=0,o=n.length;o>a;++a){var c=n[a],i=r[c];Object.prototype.hasOwnProperty.call(e,c)?e[c]=exports.merge(e[c],i,t):e[c]=i}return e},exports.decode=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(r){return e}},exports.encode=function(e){if(0===e.length)return e;"string"!=typeof e&&(e=""+e);for(var r="",t=0,n=e.length;n>t;++t){var a=e.charCodeAt(t);45===a||46===a||95===a||126===a||a>=48&&57>=a||a>=65&&90>=a||a>=97&&122>=a?r+=e[t]:128>a?r+=internals.hexTable[a]:2048>a?r+=internals.hexTable[192|a>>6]+internals.hexTable[128|63&a]:55296>a||a>=57344?r+=internals.hexTable[224|a>>12]+internals.hexTable[128|a>>6&63]+internals.hexTable[128|63&a]:(++t,a=65536+((1023&a)<<10|1023&e.charCodeAt(t)),r+=internals.hexTable[240|a>>18]+internals.hexTable[128|a>>12&63]+internals.hexTable[128|a>>6&63]+internals.hexTable[128|63&a])}return r},exports.compact=function(e,r){if("object"!=typeof e||null===e)return e;r=r||[];var t=r.indexOf(e);if(-1!==t)return r[t];if(r.push(e),Array.isArray(e)){for(var n=[],a=0,o=e.length;o>a;++a)"undefined"!=typeof e[a]&&n.push(e[a]);return n}var c=Object.keys(e);for(a=0,o=c.length;o>a;++a){var i=c[a];e[i]=exports.compact(e[i],r)}return e},exports.isRegExp=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},exports.isBuffer=function(e){return null===e||"undefined"==typeof e?!1:!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))};

},{}],179:[function(require,module,exports){
(function (process,Buffer){
"use strict";function finalhandler(e,t,n){var r=n||{},i=r.env||process.env.NODE_ENV||"development",s=r.onerror;return function(n){var r=t.statusCode;if(!n&&t._header)return void debug("cannot 404 after headers sent");if(n){n.statusCode&&(r=n.statusCode),n.status&&(r=n.status),(!r||400>r)&&(r=500);var d="production"===i?http.STATUS_CODES[r]:n.stack||n.toString();d=escapeHtml(d).replace(/\n/g,"<br>").replace(/  /g," &nbsp;")+"\n"}else r=404,d="Cannot "+escapeHtml(e.method)+" "+escapeHtml(e.originalUrl||e.url)+"\n";return debug("default %s",r),n&&s&&defer(s,n,e,t),t._header?e.socket.destroy():void send(e,t,r,d)}}function send(e,t,n,r){function i(){return t.statusCode=n,t.setHeader("X-Content-Type-Options","nosniff"),t.setHeader("Content-Type","text/html; charset=utf-8"),t.setHeader("Content-Length",Buffer.byteLength(r,"utf8")),"HEAD"===e.method?void t.end():void t.end(r,"utf8")}return isFinished(e)?void i():(unpipe(e),onFinished(e,i),void e.resume())}var debug=require("debug")("finalhandler"),escapeHtml=require("escape-html"),http=require("http"),onFinished=require("on-finished"),unpipe=require("unpipe"),defer="function"==typeof setImmediate?setImmediate:function(e){process.nextTick(e.bind.apply(e,arguments))},isFinished=onFinished.isFinished;module.exports=finalhandler;

}).call(this,require('_process'),require("buffer").Buffer)
},{"_process":244,"buffer":112,"debug":127,"escape-html":159,"http":283,"on-finished":233,"unpipe":291}],180:[function(require,module,exports){
function forEach(r,t,o){if(!isFunction(t))throw new TypeError("iterator must be a function");arguments.length<3&&(o=this),"[object Array]"===toString.call(r)?forEachArray(r,t,o):"string"==typeof r?forEachString(r,t,o):forEachObject(r,t,o)}function forEachArray(r,t,o){for(var n=0,a=r.length;a>n;n++)hasOwnProperty.call(r,n)&&t.call(o,r[n],n,r)}function forEachString(r,t,o){for(var n=0,a=r.length;a>n;n++)t.call(o,r.charAt(n),n,r)}function forEachObject(r,t,o){for(var n in r)hasOwnProperty.call(r,n)&&t.call(o,r[n],n,r)}var isFunction=require("is-function");module.exports=forEach;var toString=Object.prototype.toString,hasOwnProperty=Object.prototype.hasOwnProperty;

},{"is-function":216}],181:[function(require,module,exports){
function forwarded(r){if(!r)throw new TypeError("argument req is required");var e=(r.headers["x-forwarded-for"]||"").split(/ *, */).filter(Boolean).reverse(),o=r.connection.remoteAddress,d=[o].concat(e);return d}module.exports=forwarded;

},{}],182:[function(require,module,exports){
function fresh(e,n){var t=!0,i=!0,o=e["if-modified-since"],c=e["if-none-match"],f=n["last-modified"],r=n.etag,a=e["cache-control"];return o||c?a&&-1!==a.indexOf("no-cache")?!1:(c&&(c=c.split(/ *, */)),c&&(t=c.some(function(e){return"*"===e||e===r||e==="W/"+r})),o&&(o=new Date(o),f=new Date(f),i=o>=f),!(!t||!i)):!1}module.exports=fresh;

},{}],183:[function(require,module,exports){
(function (global){
"undefined"!=typeof window?module.exports=window:"undefined"!=typeof global?module.exports=global:"undefined"!=typeof self?module.exports=self:module.exports={};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],184:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(r[a]=e[a]);return r["default"]=e,r}function create(){var e=new base.HandlebarsEnvironment;return Utils.extend(e,base),e.SafeString=_handlebarsSafeString2["default"],e.Exception=_handlebarsException2["default"],e.Utils=Utils,e.escapeExpression=Utils.escapeExpression,e.VM=runtime,e.template=function(r){return runtime.template(r,e)},e}exports.__esModule=!0;var _handlebarsBase=require("./handlebars/base"),base=_interopRequireWildcard(_handlebarsBase),_handlebarsSafeString=require("./handlebars/safe-string"),_handlebarsSafeString2=_interopRequireDefault(_handlebarsSafeString),_handlebarsException=require("./handlebars/exception"),_handlebarsException2=_interopRequireDefault(_handlebarsException),_handlebarsUtils=require("./handlebars/utils"),Utils=_interopRequireWildcard(_handlebarsUtils),_handlebarsRuntime=require("./handlebars/runtime"),runtime=_interopRequireWildcard(_handlebarsRuntime),_handlebarsNoConflict=require("./handlebars/no-conflict"),_handlebarsNoConflict2=_interopRequireDefault(_handlebarsNoConflict),inst=create();inst.create=create,_handlebarsNoConflict2["default"](inst),inst["default"]=inst,exports["default"]=inst,module.exports=exports["default"];

},{"./handlebars/base":185,"./handlebars/exception":188,"./handlebars/no-conflict":198,"./handlebars/runtime":199,"./handlebars/safe-string":200,"./handlebars/utils":201}],185:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function HandlebarsEnvironment(e,t,r){this.helpers=e||{},this.partials=t||{},this.decorators=r||{},_helpers.registerDefaultHelpers(this),_decorators.registerDefaultDecorators(this)}exports.__esModule=!0,exports.HandlebarsEnvironment=HandlebarsEnvironment;var _utils=require("./utils"),_exception=require("./exception"),_exception2=_interopRequireDefault(_exception),_helpers=require("./helpers"),_decorators=require("./decorators"),_logger=require("./logger"),_logger2=_interopRequireDefault(_logger),VERSION="4.0.5";exports.VERSION=VERSION;var COMPILER_REVISION=7;exports.COMPILER_REVISION=COMPILER_REVISION;var REVISION_CHANGES={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0"};exports.REVISION_CHANGES=REVISION_CHANGES;var objectType="[object Object]";HandlebarsEnvironment.prototype={constructor:HandlebarsEnvironment,logger:_logger2["default"],log:_logger2["default"].log,registerHelper:function(e,t){if(_utils.toString.call(e)===objectType){if(t)throw new _exception2["default"]("Arg not supported with multiple helpers");_utils.extend(this.helpers,e)}else this.helpers[e]=t},unregisterHelper:function(e){delete this.helpers[e]},registerPartial:function(e,t){if(_utils.toString.call(e)===objectType)_utils.extend(this.partials,e);else{if("undefined"==typeof t)throw new _exception2["default"]('Attempting to register a partial called "'+e+'" as undefined');this.partials[e]=t}},unregisterPartial:function(e){delete this.partials[e]},registerDecorator:function(e,t){if(_utils.toString.call(e)===objectType){if(t)throw new _exception2["default"]("Arg not supported with multiple decorators");_utils.extend(this.decorators,e)}else this.decorators[e]=t},unregisterDecorator:function(e){delete this.decorators[e]}};var log=_logger2["default"].log;exports.log=log,exports.createFrame=_utils.createFrame,exports.logger=_logger2["default"];

},{"./decorators":186,"./exception":188,"./helpers":189,"./logger":197,"./utils":201}],186:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function registerDefaultDecorators(e){_decoratorsInline2["default"](e)}exports.__esModule=!0,exports.registerDefaultDecorators=registerDefaultDecorators;var _decoratorsInline=require("./decorators/inline"),_decoratorsInline2=_interopRequireDefault(_decoratorsInline);

},{"./decorators/inline":187}],187:[function(require,module,exports){
"use strict";exports.__esModule=!0;var _utils=require("../utils");exports["default"]=function(r){r.registerDecorator("inline",function(r,t,a,e){var s=r;return t.partials||(t.partials={},s=function(e,s){var i=a.partials;a.partials=_utils.extend({},i,t.partials);var l=r(e,s);return a.partials=i,l}),t.partials[e.args[0]]=e.fn,s})},module.exports=exports["default"];

},{"../utils":201}],188:[function(require,module,exports){
"use strict";function Exception(r,e){var o=e&&e.loc,t=void 0,s=void 0;o&&(t=o.start.line,s=o.start.column,r+=" - "+t+":"+s);for(var c=Error.prototype.constructor.call(this,r),i=0;i<errorProps.length;i++)this[errorProps[i]]=c[errorProps[i]];Error.captureStackTrace&&Error.captureStackTrace(this,Exception),o&&(this.lineNumber=t,this.column=s)}exports.__esModule=!0;var errorProps=["description","fileName","lineNumber","message","name","number","stack"];Exception.prototype=new Error,exports["default"]=Exception,module.exports=exports["default"];

},{}],189:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function registerDefaultHelpers(e){_helpersBlockHelperMissing2["default"](e),_helpersEach2["default"](e),_helpersHelperMissing2["default"](e),_helpersIf2["default"](e),_helpersLog2["default"](e),_helpersLookup2["default"](e),_helpersWith2["default"](e)}exports.__esModule=!0,exports.registerDefaultHelpers=registerDefaultHelpers;var _helpersBlockHelperMissing=require("./helpers/block-helper-missing"),_helpersBlockHelperMissing2=_interopRequireDefault(_helpersBlockHelperMissing),_helpersEach=require("./helpers/each"),_helpersEach2=_interopRequireDefault(_helpersEach),_helpersHelperMissing=require("./helpers/helper-missing"),_helpersHelperMissing2=_interopRequireDefault(_helpersHelperMissing),_helpersIf=require("./helpers/if"),_helpersIf2=_interopRequireDefault(_helpersIf),_helpersLog=require("./helpers/log"),_helpersLog2=_interopRequireDefault(_helpersLog),_helpersLookup=require("./helpers/lookup"),_helpersLookup2=_interopRequireDefault(_helpersLookup),_helpersWith=require("./helpers/with"),_helpersWith2=_interopRequireDefault(_helpersWith);

},{"./helpers/block-helper-missing":190,"./helpers/each":191,"./helpers/helper-missing":192,"./helpers/if":193,"./helpers/log":194,"./helpers/lookup":195,"./helpers/with":196}],190:[function(require,module,exports){
"use strict";exports.__esModule=!0;var _utils=require("../utils");exports["default"]=function(t){t.registerHelper("blockHelperMissing",function(e,r){var i=r.inverse,s=r.fn;if(e===!0)return s(this);if(e===!1||null==e)return i(this);if(_utils.isArray(e))return e.length>0?(r.ids&&(r.ids=[r.name]),t.helpers.each(e,r)):i(this);if(r.data&&r.ids){var a=_utils.createFrame(r.data);a.contextPath=_utils.appendContextPath(r.data.contextPath,r.name),r={data:a}}return s(e,r)})},module.exports=exports["default"];

},{"../utils":201}],191:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _utils=require("../utils"),_exception=require("../exception"),_exception2=_interopRequireDefault(_exception);exports["default"]=function(e){e.registerHelper("each",function(e,t){function i(t,i,a){s&&(s.key=t,s.index=i,s.first=0===i,s.last=!!a,u&&(s.contextPath=u+t)),n+=r(e[t],{data:s,blockParams:_utils.blockParams([e[t],t],[u+t,null])})}if(!t)throw new _exception2["default"]("Must pass iterator to #each");var r=t.fn,a=t.inverse,o=0,n="",s=void 0,u=void 0;if(t.data&&t.ids&&(u=_utils.appendContextPath(t.data.contextPath,t.ids[0])+"."),_utils.isFunction(e)&&(e=e.call(this)),t.data&&(s=_utils.createFrame(t.data)),e&&"object"==typeof e)if(_utils.isArray(e))for(var l=e.length;l>o;o++)o in e&&i(o,o,o===e.length-1);else{var d=void 0;for(var c in e)e.hasOwnProperty(c)&&(void 0!==d&&i(d,o-1),d=c,o++);void 0!==d&&i(d,o-1,!0)}return 0===o&&(n=a(this)),n})},module.exports=exports["default"];

},{"../exception":188,"../utils":201}],192:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _exception=require("../exception"),_exception2=_interopRequireDefault(_exception);exports["default"]=function(e){e.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new _exception2["default"]('Missing helper: "'+arguments[arguments.length-1].name+'"')})},module.exports=exports["default"];

},{"../exception":188}],193:[function(require,module,exports){
"use strict";exports.__esModule=!0;var _utils=require("../utils");exports["default"]=function(e){e.registerHelper("if",function(e,s){return _utils.isFunction(e)&&(e=e.call(this)),!s.hash.includeZero&&!e||_utils.isEmpty(e)?s.inverse(this):s.fn(this)}),e.registerHelper("unless",function(s,t){return e.helpers["if"].call(this,s,{fn:t.inverse,inverse:t.fn,hash:t.hash})})},module.exports=exports["default"];

},{"../utils":201}],194:[function(require,module,exports){
"use strict";exports.__esModule=!0,exports["default"]=function(e){e.registerHelper("log",function(){for(var l=[void 0],t=arguments[arguments.length-1],a=0;a<arguments.length-1;a++)l.push(arguments[a]);var o=1;null!=t.hash.level?o=t.hash.level:t.data&&null!=t.data.level&&(o=t.data.level),l[0]=o,e.log.apply(e,l)})},module.exports=exports["default"];

},{}],195:[function(require,module,exports){
"use strict";exports.__esModule=!0,exports["default"]=function(e){e.registerHelper("lookup",function(e,t){return e&&e[t]})},module.exports=exports["default"];

},{}],196:[function(require,module,exports){
"use strict";exports.__esModule=!0;var _utils=require("../utils");exports["default"]=function(t){t.registerHelper("with",function(t,e){_utils.isFunction(t)&&(t=t.call(this));var a=e.fn;if(_utils.isEmpty(t))return e.inverse(this);var s=e.data;return e.data&&e.ids&&(s=_utils.createFrame(e.data),s.contextPath=_utils.appendContextPath(e.data.contextPath,e.ids[0])),a(t,{data:s,blockParams:_utils.blockParams([t],[s&&s.contextPath])})})},module.exports=exports["default"];

},{"../utils":201}],197:[function(require,module,exports){
"use strict";exports.__esModule=!0;var _utils=require("./utils"),logger={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(e){if("string"==typeof e){var o=_utils.indexOf(logger.methodMap,e.toLowerCase());e=o>=0?o:parseInt(e,10)}return e},log:function(e){if(e=logger.lookupLevel(e),"undefined"!=typeof console&&logger.lookupLevel(logger.level)<=e){var o=logger.methodMap[e];console[o]||(o="log");for(var l=arguments.length,r=Array(l>1?l-1:0),t=1;l>t;t++)r[t-1]=arguments[t];console[o].apply(console,r)}}};exports["default"]=logger,module.exports=exports["default"];

},{"./utils":201}],198:[function(require,module,exports){
(function (global){
"use strict";exports.__esModule=!0,exports["default"]=function(e){var o="undefined"!=typeof global?global:window,n=o.Handlebars;e.noConflict=function(){return o.Handlebars===e&&(o.Handlebars=n),e}},module.exports=exports["default"];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],199:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function checkRevision(e){var t=e&&e[0]||1,r=_base.COMPILER_REVISION;if(t!==r){if(r>t){var a=_base.REVISION_CHANGES[r],n=_base.REVISION_CHANGES[t];throw new _exception2["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+a+") or downgrade your runtime to an older version ("+n+").")}throw new _exception2["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+e[1]+").")}}function template(e,t){function r(r,a,n){n.hash&&(a=Utils.extend({},a,n.hash),n.ids&&(n.ids[0]=!0)),r=t.VM.resolvePartial.call(this,r,a,n);var o=t.VM.invokePartial.call(this,r,a,n);if(null==o&&t.compile&&(n.partials[n.name]=t.compile(r,e.compilerOptions,t),o=n.partials[n.name](a,n)),null!=o){if(n.indent){for(var i=o.split("\n"),s=0,l=i.length;l>s&&(i[s]||s+1!==l);s++)i[s]=n.indent+i[s];o=i.join("\n")}return o}throw new _exception2["default"]("The partial "+n.name+" could not be compiled when running in runtime-only mode")}function a(t){function r(t){return""+e.main(n,t,n.helpers,n.partials,i,l,s)}var o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=o.data;a._setup(o),!o.partial&&e.useData&&(i=initData(t,i));var s=void 0,l=e.useBlockParams?[]:void 0;return e.useDepths&&(s=o.depths?t!==o.depths[0]?[t].concat(o.depths):o.depths:[t]),(r=executeDecorators(e.main,r,n,o.depths||[],i,l))(t,o)}if(!t)throw new _exception2["default"]("No environment passed to template");if(!e||!e.main)throw new _exception2["default"]("Unknown template object: "+typeof e);e.main.decorator=e.main_d,t.VM.checkRevision(e.compiler);var n={strict:function(e,t){if(!(t in e))throw new _exception2["default"]('"'+t+'" not defined in '+e);return e[t]},lookup:function(e,t){for(var r=e.length,a=0;r>a;a++)if(e[a]&&null!=e[a][t])return e[a][t]},lambda:function(e,t){return"function"==typeof e?e.call(t):e},escapeExpression:Utils.escapeExpression,invokePartial:r,fn:function(t){var r=e[t];return r.decorator=e[t+"_d"],r},programs:[],program:function(e,t,r,a,n){var o=this.programs[e],i=this.fn(e);return t||n||a||r?o=wrapProgram(this,e,i,t,r,a,n):o||(o=this.programs[e]=wrapProgram(this,e,i)),o},data:function(e,t){for(;e&&t--;)e=e._parent;return e},merge:function(e,t){var r=e||t;return e&&t&&e!==t&&(r=Utils.extend({},t,e)),r},noop:t.VM.noop,compilerInfo:e.compiler};return a.isTop=!0,a._setup=function(r){r.partial?(n.helpers=r.helpers,n.partials=r.partials,n.decorators=r.decorators):(n.helpers=n.merge(r.helpers,t.helpers),e.usePartial&&(n.partials=n.merge(r.partials,t.partials)),(e.usePartial||e.useDecorators)&&(n.decorators=n.merge(r.decorators,t.decorators)))},a._child=function(t,r,a,o){if(e.useBlockParams&&!a)throw new _exception2["default"]("must pass block params");if(e.useDepths&&!o)throw new _exception2["default"]("must pass parent depths");return wrapProgram(n,t,e[t],r,0,a,o)},a}function wrapProgram(e,t,r,a,n,o,i){function s(t){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],s=i;return i&&t!==i[0]&&(s=[t].concat(i)),r(e,t,e.helpers,e.partials,n.data||a,o&&[n.blockParams].concat(o),s)}return s=executeDecorators(r,s,e,i,a,o),s.program=t,s.depth=i?i.length:0,s.blockParams=n||0,s}function resolvePartial(e,t,r){return e?e.call||r.name||(r.name=e,e=r.partials[e]):e="@partial-block"===r.name?r.data["partial-block"]:r.partials[r.name],e}function invokePartial(e,t,r){r.partial=!0,r.ids&&(r.data.contextPath=r.ids[0]||r.data.contextPath);var a=void 0;if(r.fn&&r.fn!==noop&&(r.data=_base.createFrame(r.data),a=r.data["partial-block"]=r.fn,a.partials&&(r.partials=Utils.extend({},r.partials,a.partials))),void 0===e&&a&&(e=a),void 0===e)throw new _exception2["default"]("The partial "+r.name+" could not be found");return e instanceof Function?e(t,r):void 0}function noop(){return""}function initData(e,t){return t&&"root"in t||(t=t?_base.createFrame(t):{},t.root=e),t}function executeDecorators(e,t,r,a,n,o){if(e.decorator){var i={};t=e.decorator(t,i,r,a&&a[0],n,o,a),Utils.extend(t,i)}return t}exports.__esModule=!0,exports.checkRevision=checkRevision,exports.template=template,exports.wrapProgram=wrapProgram,exports.resolvePartial=resolvePartial,exports.invokePartial=invokePartial,exports.noop=noop;var _utils=require("./utils"),Utils=_interopRequireWildcard(_utils),_exception=require("./exception"),_exception2=_interopRequireDefault(_exception),_base=require("./base");

},{"./base":185,"./exception":188,"./utils":201}],200:[function(require,module,exports){
"use strict";function SafeString(t){this.string=t}exports.__esModule=!0,SafeString.prototype.toString=SafeString.prototype.toHTML=function(){return""+this.string},exports["default"]=SafeString,module.exports=exports["default"];

},{}],201:[function(require,module,exports){
"use strict";function escapeChar(t){return escape[t]}function extend(t){for(var r=1;r<arguments.length;r++)for(var e in arguments[r])Object.prototype.hasOwnProperty.call(arguments[r],e)&&(t[e]=arguments[r][e]);return t}function indexOf(t,r){for(var e=0,n=t.length;n>e;e++)if(t[e]===r)return e;return-1}function escapeExpression(t){if("string"!=typeof t){if(t&&t.toHTML)return t.toHTML();if(null==t)return"";if(!t)return t+"";t=""+t}return possible.test(t)?t.replace(badChars,escapeChar):t}function isEmpty(t){return t||0===t?!(!isArray(t)||0!==t.length):!0}function createFrame(t){var r=extend({},t);return r._parent=t,r}function blockParams(t,r){return t.path=r,t}function appendContextPath(t,r){return(t?t+".":"")+r}exports.__esModule=!0,exports.extend=extend,exports.indexOf=indexOf,exports.escapeExpression=escapeExpression,exports.isEmpty=isEmpty,exports.createFrame=createFrame,exports.blockParams=blockParams,exports.appendContextPath=appendContextPath;var escape={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},badChars=/[&<>"'`=]/g,possible=/[&<>"'`=]/,toString=Object.prototype.toString;exports.toString=toString;var isFunction=function(t){return"function"==typeof t};isFunction(/x/)&&(exports.isFunction=isFunction=function(t){return"function"==typeof t&&"[object Function]"===toString.call(t)}),exports.isFunction=isFunction;var isArray=Array.isArray||function(t){return t&&"object"==typeof t?"[object Array]"===toString.call(t):!1};exports.isArray=isArray;

},{}],202:[function(require,module,exports){
module.exports=require("./dist/cjs/handlebars.runtime")["default"];

},{"./dist/cjs/handlebars.runtime":184}],203:[function(require,module,exports){
var hash=exports;hash.utils=require("./hash/utils"),hash.common=require("./hash/common"),hash.sha=require("./hash/sha"),hash.ripemd=require("./hash/ripemd"),hash.hmac=require("./hash/hmac"),hash.sha1=hash.sha.sha1,hash.sha256=hash.sha.sha256,hash.sha224=hash.sha.sha224,hash.sha384=hash.sha.sha384,hash.sha512=hash.sha.sha512,hash.ripemd160=hash.ripemd.ripemd160;

},{"./hash/common":204,"./hash/hmac":205,"./hash/ripemd":206,"./hash/sha":207,"./hash/utils":208}],204:[function(require,module,exports){
function BlockHash(){this.pending=null,this.pendingTotal=0,this.blockSize=this.constructor.blockSize,this.outSize=this.constructor.outSize,this.hmacStrength=this.constructor.hmacStrength,this.padLength=this.constructor.padLength/8,this.endian="big",this._delta8=this.blockSize/8,this._delta32=this.blockSize/32}var hash=require("../hash"),utils=hash.utils,assert=utils.assert;exports.BlockHash=BlockHash,BlockHash.prototype.update=function(t,i){if(t=utils.toArray(t,i),this.pending?this.pending=this.pending.concat(t):this.pending=t,this.pendingTotal+=t.length,this.pending.length>=this._delta8){t=this.pending;var h=t.length%this._delta8;this.pending=t.slice(t.length-h,t.length),0===this.pending.length&&(this.pending=null),t=utils.join32(t,0,t.length-h,this.endian);for(var s=0;s<t.length;s+=this._delta32)this._update(t,s,s+this._delta32)}return this},BlockHash.prototype.digest=function(t){return this.update(this._pad()),assert(null===this.pending),this._digest(t)},BlockHash.prototype._pad=function(){var t=this.pendingTotal,i=this._delta8,h=i-(t+this.padLength)%i,s=new Array(h+this.padLength);s[0]=128;for(var n=1;h>n;n++)s[n]=0;if(t<<=3,"big"===this.endian){for(var e=8;e<this.padLength;e++)s[n++]=0;s[n++]=0,s[n++]=0,s[n++]=0,s[n++]=0,s[n++]=t>>>24&255,s[n++]=t>>>16&255,s[n++]=t>>>8&255,s[n++]=255&t}else{s[n++]=255&t,s[n++]=t>>>8&255,s[n++]=t>>>16&255,s[n++]=t>>>24&255,s[n++]=0,s[n++]=0,s[n++]=0,s[n++]=0;for(var e=8;e<this.padLength;e++)s[n++]=0}return s};

},{"../hash":203}],205:[function(require,module,exports){
function Hmac(t,i,e){return this instanceof Hmac?(this.Hash=t,this.blockSize=t.blockSize/8,this.outSize=t.outSize/8,this.inner=null,this.outer=null,void this._init(utils.toArray(i,e))):new Hmac(t,i,e)}var hmac=exports,hash=require("../hash"),utils=hash.utils,assert=utils.assert;module.exports=Hmac,Hmac.prototype._init=function(t){t.length>this.blockSize&&(t=(new this.Hash).update(t).digest()),assert(t.length<=this.blockSize);for(var i=t.length;i<this.blockSize;i++)t.push(0);for(var i=0;i<t.length;i++)t[i]^=54;this.inner=(new this.Hash).update(t);for(var i=0;i<t.length;i++)t[i]^=106;this.outer=(new this.Hash).update(t)},Hmac.prototype.update=function(t,i){return this.inner.update(t,i),this},Hmac.prototype.digest=function(t){return this.outer.update(this.inner.digest()),this.outer.digest(t)};

},{"../hash":203}],206:[function(require,module,exports){
function RIPEMD160(){return this instanceof RIPEMD160?(BlockHash.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],void(this.endian="little")):new RIPEMD160}function f(t,h,s,i){return 15>=t?h^s^i:31>=t?h&s|~h&i:47>=t?(h|~s)^i:63>=t?h&i|s&~i:h^(s|~i)}function K(t){return 15>=t?0:31>=t?1518500249:47>=t?1859775393:63>=t?2400959708:2840853838}function Kh(t){return 15>=t?1352829926:31>=t?1548603684:47>=t?1836072691:63>=t?2053994217:0}var hash=require("../hash"),utils=hash.utils,rotl32=utils.rotl32,sum32=utils.sum32,sum32_3=utils.sum32_3,sum32_4=utils.sum32_4,BlockHash=hash.common.BlockHash;utils.inherits(RIPEMD160,BlockHash),exports.ripemd160=RIPEMD160,RIPEMD160.blockSize=512,RIPEMD160.outSize=160,RIPEMD160.hmacStrength=192,RIPEMD160.padLength=64,RIPEMD160.prototype._update=function(t,h){for(var i=this.h[0],u=this.h[1],l=this.h[2],o=this.h[3],e=this.h[4],n=i,m=u,a=l,c=o,_=e,D=0;80>D;D++){var E=sum32(rotl32(sum32_4(i,f(D,u,l,o),t[r[D]+h],K(D)),s[D]),e);i=e,e=o,o=rotl32(l,10),l=u,u=E,E=sum32(rotl32(sum32_4(n,f(79-D,m,a,c),t[rh[D]+h],Kh(D)),sh[D]),_),n=_,_=c,c=rotl32(a,10),a=m,m=E}E=sum32_3(this.h[1],l,c),this.h[1]=sum32_3(this.h[2],o,_),this.h[2]=sum32_3(this.h[3],e,n),this.h[3]=sum32_3(this.h[4],i,m),this.h[4]=sum32_3(this.h[0],u,a),this.h[0]=E},RIPEMD160.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"little"):utils.split32(this.h,"little")};var r=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],rh=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],s=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],sh=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11];

},{"../hash":203}],207:[function(require,module,exports){
function SHA256(){return this instanceof SHA256?(BlockHash.call(this),this.h=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],this.k=sha256_K,void(this.W=new Array(64))):new SHA256}function SHA224(){return this instanceof SHA224?(SHA256.call(this),void(this.h=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])):new SHA224}function SHA512(){return this instanceof SHA512?(BlockHash.call(this),this.h=[1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209],this.k=sha512_K,void(this.W=new Array(160))):new SHA512}function SHA384(){return this instanceof SHA384?(SHA512.call(this),void(this.h=[3418070365,3238371032,1654270250,914150663,2438529370,812702999,355462360,4144912697,1731405415,4290775857,2394180231,1750603025,3675008525,1694076839,1203062813,3204075428])):new SHA384}function SHA1(){return this instanceof SHA1?(BlockHash.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],void(this.W=new Array(80))):new SHA1}function ch32(t,h,s){return t&h^~t&s}function maj32(t,h,s){return t&h^t&s^h&s}function p32(t,h,s){return t^h^s}function s0_256(t){return rotr32(t,2)^rotr32(t,13)^rotr32(t,22)}function s1_256(t){return rotr32(t,6)^rotr32(t,11)^rotr32(t,25)}function g0_256(t){return rotr32(t,7)^rotr32(t,18)^t>>>3}function g1_256(t){return rotr32(t,17)^rotr32(t,19)^t>>>10}function ft_1(t,h,s,i){return 0===t?ch32(h,s,i):1===t||3===t?p32(h,s,i):2===t?maj32(h,s,i):void 0}function ch64_hi(t,h,s,i,r,o){var u=t&s^~t&r;return 0>u&&(u+=4294967296),u}function ch64_lo(t,h,s,i,r,o){var u=h&i^~h&o;return 0>u&&(u+=4294967296),u}function maj64_hi(t,h,s,i,r,o){var u=t&s^t&r^s&r;return 0>u&&(u+=4294967296),u}function maj64_lo(t,h,s,i,r,o){var u=h&i^h&o^i&o;return 0>u&&(u+=4294967296),u}function s0_512_hi(t,h){var s=rotr64_hi(t,h,28),i=rotr64_hi(h,t,2),r=rotr64_hi(h,t,7),o=s^i^r;return 0>o&&(o+=4294967296),o}function s0_512_lo(t,h){var s=rotr64_lo(t,h,28),i=rotr64_lo(h,t,2),r=rotr64_lo(h,t,7),o=s^i^r;return 0>o&&(o+=4294967296),o}function s1_512_hi(t,h){var s=rotr64_hi(t,h,14),i=rotr64_hi(t,h,18),r=rotr64_hi(h,t,9),o=s^i^r;return 0>o&&(o+=4294967296),o}function s1_512_lo(t,h){var s=rotr64_lo(t,h,14),i=rotr64_lo(t,h,18),r=rotr64_lo(h,t,9),o=s^i^r;return 0>o&&(o+=4294967296),o}function g0_512_hi(t,h){var s=rotr64_hi(t,h,1),i=rotr64_hi(t,h,8),r=shr64_hi(t,h,7),o=s^i^r;return 0>o&&(o+=4294967296),o}function g0_512_lo(t,h){var s=rotr64_lo(t,h,1),i=rotr64_lo(t,h,8),r=shr64_lo(t,h,7),o=s^i^r;return 0>o&&(o+=4294967296),o}function g1_512_hi(t,h){var s=rotr64_hi(t,h,19),i=rotr64_hi(h,t,29),r=shr64_hi(t,h,6),o=s^i^r;return 0>o&&(o+=4294967296),o}function g1_512_lo(t,h){var s=rotr64_lo(t,h,19),i=rotr64_lo(h,t,29),r=shr64_lo(t,h,6),o=s^i^r;return 0>o&&(o+=4294967296),o}var hash=require("../hash"),utils=hash.utils,assert=utils.assert,rotr32=utils.rotr32,rotl32=utils.rotl32,sum32=utils.sum32,sum32_4=utils.sum32_4,sum32_5=utils.sum32_5,rotr64_hi=utils.rotr64_hi,rotr64_lo=utils.rotr64_lo,shr64_hi=utils.shr64_hi,shr64_lo=utils.shr64_lo,sum64=utils.sum64,sum64_hi=utils.sum64_hi,sum64_lo=utils.sum64_lo,sum64_4_hi=utils.sum64_4_hi,sum64_4_lo=utils.sum64_4_lo,sum64_5_hi=utils.sum64_5_hi,sum64_5_lo=utils.sum64_5_lo,BlockHash=hash.common.BlockHash,sha256_K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],sha512_K=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],sha1_K=[1518500249,1859775393,2400959708,3395469782];utils.inherits(SHA256,BlockHash),exports.sha256=SHA256,SHA256.blockSize=512,SHA256.outSize=256,SHA256.hmacStrength=192,SHA256.padLength=64,SHA256.prototype._update=function(t,h){for(var s=this.W,i=0;16>i;i++)s[i]=t[h+i];for(;i<s.length;i++)s[i]=sum32_4(g1_256(s[i-2]),s[i-7],g0_256(s[i-15]),s[i-16]);var r=this.h[0],o=this.h[1],u=this.h[2],n=this.h[3],_=this.h[4],e=this.h[5],l=this.h[6],a=this.h[7];assert(this.k.length===s.length);for(var i=0;i<s.length;i++){var c=sum32_5(a,s1_256(_),ch32(_,e,l),this.k[i],s[i]),S=sum32(s0_256(r),maj32(r,o,u));a=l,l=e,e=_,_=sum32(n,c),n=u,u=o,o=r,r=sum32(c,S)}this.h[0]=sum32(this.h[0],r),this.h[1]=sum32(this.h[1],o),this.h[2]=sum32(this.h[2],u),this.h[3]=sum32(this.h[3],n),this.h[4]=sum32(this.h[4],_),this.h[5]=sum32(this.h[5],e),this.h[6]=sum32(this.h[6],l),this.h[7]=sum32(this.h[7],a)},SHA256.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"big"):utils.split32(this.h,"big")},utils.inherits(SHA224,SHA256),exports.sha224=SHA224,SHA224.blockSize=512,SHA224.outSize=224,SHA224.hmacStrength=192,SHA224.padLength=64,SHA224.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h.slice(0,7),"big"):utils.split32(this.h.slice(0,7),"big")},utils.inherits(SHA512,BlockHash),exports.sha512=SHA512,SHA512.blockSize=1024,SHA512.outSize=512,SHA512.hmacStrength=192,SHA512.padLength=128,SHA512.prototype._prepareBlock=function(t,h){for(var s=this.W,i=0;32>i;i++)s[i]=t[h+i];for(;i<s.length;i+=2){var r=g1_512_hi(s[i-4],s[i-3]),o=g1_512_lo(s[i-4],s[i-3]),u=s[i-14],n=s[i-13],_=g0_512_hi(s[i-30],s[i-29]),e=g0_512_lo(s[i-30],s[i-29]),l=s[i-32],a=s[i-31];s[i]=sum64_4_hi(r,o,u,n,_,e,l,a),s[i+1]=sum64_4_lo(r,o,u,n,_,e,l,a)}},SHA512.prototype._update=function(t,h){this._prepareBlock(t,h);var s=this.W,i=this.h[0],r=this.h[1],o=this.h[2],u=this.h[3],n=this.h[4],_=this.h[5],e=this.h[6],l=this.h[7],a=this.h[8],c=this.h[9],S=this.h[10],m=this.h[11],H=this.h[12],A=this.h[13],f=this.h[14],g=this.h[15];assert(this.k.length===s.length);for(var p=0;p<s.length;p+=2){var v=f,k=g,d=s1_512_hi(a,c),b=s1_512_lo(a,c),x=ch64_hi(a,c,S,m,H,A),y=ch64_lo(a,c,S,m,H,A),z=this.k[p],B=this.k[p+1],w=s[p],j=s[p+1],W=sum64_5_hi(v,k,d,b,x,y,z,B,w,j),K=sum64_5_lo(v,k,d,b,x,y,z,B,w,j),v=s0_512_hi(i,r),k=s0_512_lo(i,r),d=maj64_hi(i,r,o,u,n,_),b=maj64_lo(i,r,o,u,n,_),L=sum64_hi(v,k,d,b),q=sum64_lo(v,k,d,b);f=H,g=A,H=S,A=m,S=a,m=c,a=sum64_hi(e,l,W,K),c=sum64_lo(l,l,W,K),e=n,l=_,n=o,_=u,o=i,u=r,i=sum64_hi(W,K,L,q),r=sum64_lo(W,K,L,q)}sum64(this.h,0,i,r),sum64(this.h,2,o,u),sum64(this.h,4,n,_),sum64(this.h,6,e,l),sum64(this.h,8,a,c),sum64(this.h,10,S,m),sum64(this.h,12,H,A),sum64(this.h,14,f,g)},SHA512.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"big"):utils.split32(this.h,"big")},utils.inherits(SHA384,SHA512),exports.sha384=SHA384,SHA384.blockSize=1024,SHA384.outSize=384,SHA384.hmacStrength=192,SHA384.padLength=128,SHA384.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h.slice(0,12),"big"):utils.split32(this.h.slice(0,12),"big")},utils.inherits(SHA1,BlockHash),exports.sha1=SHA1,SHA1.blockSize=512,SHA1.outSize=160,SHA1.hmacStrength=80,SHA1.padLength=64,SHA1.prototype._update=function(t,h){for(var s=this.W,i=0;16>i;i++)s[i]=t[h+i];for(;i<s.length;i++)s[i]=rotl32(s[i-3]^s[i-8]^s[i-14]^s[i-16],1);for(var r=this.h[0],o=this.h[1],u=this.h[2],n=this.h[3],_=this.h[4],i=0;i<s.length;i++){var e=~~(i/20),l=sum32_5(rotl32(r,5),ft_1(e,o,u,n),_,s[i],sha1_K[e]);_=n,n=u,u=rotl32(o,30),o=r,r=l}this.h[0]=sum32(this.h[0],r),this.h[1]=sum32(this.h[1],o),this.h[2]=sum32(this.h[2],u),this.h[3]=sum32(this.h[3],n),this.h[4]=sum32(this.h[4],_)},SHA1.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"big"):utils.split32(this.h,"big")};

},{"../hash":203}],208:[function(require,module,exports){
function toArray(r,t){if(Array.isArray(r))return r.slice();if(!r)return[];var n=[];if("string"==typeof r)if(t){if("hex"===t){r=r.replace(/[^a-z0-9]+/gi,""),r.length%2!==0&&(r="0"+r);for(var u=0;u<r.length;u+=2)n.push(parseInt(r[u]+r[u+1],16))}}else for(var u=0;u<r.length;u++){var o=r.charCodeAt(u),e=o>>8,s=255&o;e?n.push(e,s):n.push(s)}else for(var u=0;u<r.length;u++)n[u]=0|r[u];return n}function toHex(r){for(var t="",n=0;n<r.length;n++)t+=zero2(r[n].toString(16));return t}function htonl(r){var t=r>>>24|r>>>8&65280|r<<8&16711680|(255&r)<<24;return t>>>0}function toHex32(r,t){for(var n="",u=0;u<r.length;u++){var o=r[u];"little"===t&&(o=htonl(o)),n+=zero8(o.toString(16))}return n}function zero2(r){return 1===r.length?"0"+r:r}function zero8(r){return 7===r.length?"0"+r:6===r.length?"00"+r:5===r.length?"000"+r:4===r.length?"0000"+r:3===r.length?"00000"+r:2===r.length?"000000"+r:1===r.length?"0000000"+r:r}function join32(r,t,n,u){var o=n-t;assert(o%4===0);for(var e=new Array(o/4),s=0,i=t;s<e.length;s++,i+=4){var l;l="big"===u?r[i]<<24|r[i+1]<<16|r[i+2]<<8|r[i+3]:r[i+3]<<24|r[i+2]<<16|r[i+1]<<8|r[i],e[s]=l>>>0}return e}function split32(r,t){for(var n=new Array(4*r.length),u=0,o=0;u<r.length;u++,o+=4){var e=r[u];"big"===t?(n[o]=e>>>24,n[o+1]=e>>>16&255,n[o+2]=e>>>8&255,n[o+3]=255&e):(n[o+3]=e>>>24,n[o+2]=e>>>16&255,n[o+1]=e>>>8&255,n[o]=255&e)}return n}function rotr32(r,t){return r>>>t|r<<32-t}function rotl32(r,t){return r<<t|r>>>32-t}function sum32(r,t){return r+t>>>0}function sum32_3(r,t,n){return r+t+n>>>0}function sum32_4(r,t,n,u){return r+t+n+u>>>0}function sum32_5(r,t,n,u,o){return r+t+n+u+o>>>0}function assert(r,t){if(!r)throw new Error(t||"Assertion failed")}function sum64(r,t,n,u){var o=r[t],e=r[t+1],s=u+e>>>0,i=(u>s?1:0)+n+o;r[t]=i>>>0,r[t+1]=s}function sum64_hi(r,t,n,u){var o=t+u>>>0,e=(t>o?1:0)+r+n;return e>>>0}function sum64_lo(r,t,n,u){var o=t+u;return o>>>0}function sum64_4_hi(r,t,n,u,o,e,s,i){var l=0,h=t;h=h+u>>>0,l+=t>h?1:0,h=h+e>>>0,l+=e>h?1:0,h=h+i>>>0,l+=i>h?1:0;var _=r+n+o+s+l;return _>>>0}function sum64_4_lo(r,t,n,u,o,e,s,i){var l=t+u+e+i;return l>>>0}function sum64_5_hi(r,t,n,u,o,e,s,i,l,h){var _=0,a=t;a=a+u>>>0,_+=t>a?1:0,a=a+e>>>0,_+=e>a?1:0,a=a+i>>>0,_+=i>a?1:0,a=a+h>>>0,_+=h>a?1:0;var f=r+n+o+s+l+_;return f>>>0}function sum64_5_lo(r,t,n,u,o,e,s,i,l,h){var _=t+u+e+i+h;return _>>>0}function rotr64_hi(r,t,n){var u=t<<32-n|r>>>n;return u>>>0}function rotr64_lo(r,t,n){var u=r<<32-n|t>>>n;return u>>>0}function shr64_hi(r,t,n){return r>>>n}function shr64_lo(r,t,n){var u=r<<32-n|t>>>n;return u>>>0}var utils=exports,inherits=require("inherits");utils.toArray=toArray,utils.toHex=toHex,utils.htonl=htonl,utils.toHex32=toHex32,utils.zero2=zero2,utils.zero8=zero8,utils.join32=join32,utils.split32=split32,utils.rotr32=rotr32,utils.rotl32=rotl32,utils.sum32=sum32,utils.sum32_3=sum32_3,utils.sum32_4=sum32_4,utils.sum32_5=sum32_5,utils.assert=assert,utils.inherits=inherits,exports.sum64=sum64,exports.sum64_hi=sum64_hi,exports.sum64_lo=sum64_lo,exports.sum64_4_hi=sum64_4_hi,exports.sum64_4_lo=sum64_4_lo,exports.sum64_5_hi=sum64_5_hi,exports.sum64_5_lo=sum64_5_lo,exports.rotr64_hi=rotr64_hi,exports.rotr64_lo=rotr64_lo,exports.shr64_hi=shr64_hi,exports.shr64_lo=shr64_lo;

},{"inherits":213}],209:[function(require,module,exports){
module.exports=require("handlebars/runtime")["default"];

},{"handlebars/runtime":202}],210:[function(require,module,exports){
function toIdentifier(e){return e.split(" ").map(function(e){return e.slice(0,1).toUpperCase()+e.slice(1)}).join("").replace(/[^ _0-9a-z]/gi,"")}var statuses=require("statuses"),inherits=require("inherits");exports=module.exports=function e(){for(var r,t,o=500,s={},a=0;a<arguments.length;a++){var n=arguments[a];if(n instanceof Error)r=n,o=r.status||r.statusCode||o;else switch(typeof n){case"string":t=n;break;case"number":o=n;break;case"object":s=n}}"number"==typeof o&&statuses[o]||(o=500);var u=exports[o];r||(r=u?new u(t):new Error(t||statuses[o]),Error.captureStackTrace(r,e)),u&&r instanceof u||(r.expose=500>o,r.status=r.statusCode=o);for(var p in s)"status"!==p&&"statusCode"!==p&&(r[p]=s[p]);return r};var codes=statuses.codes.filter(function(e){return e>=400});codes.forEach(function(e){var r=toIdentifier(statuses[e]),t=r.match(/Error$/)?r:r+"Error";if(e>=500){var o=function a(r){var o=new Error(null!=r?r:statuses[e]);return Error.captureStackTrace(o,a),o.__proto__=a.prototype,Object.defineProperty(o,"name",{enumerable:!1,configurable:!0,value:t,writable:!0}),o};return inherits(o,Error),o.prototype.status=o.prototype.statusCode=e,o.prototype.expose=!1,void(exports[e]=exports[r]=o)}var s=function n(r){var o=new Error(null!=r?r:statuses[e]);return Error.captureStackTrace(o,n),o.__proto__=n.prototype,Object.defineProperty(o,"name",{enumerable:!1,configurable:!0,value:t,writable:!0}),o};inherits(s,Error),s.prototype.status=s.prototype.statusCode=e,s.prototype.expose=!0,exports[e]=exports[r]=s}),exports["I'mateapot"]=exports.ImATeapot;

},{"inherits":213,"statuses":281}],211:[function(require,module,exports){
exports.read=function(a,o,t,r,h){var M,p,w=8*h-r-1,f=(1<<w)-1,e=f>>1,i=-7,N=t?h-1:0,n=t?-1:1,s=a[o+N];for(N+=n,M=s&(1<<-i)-1,s>>=-i,i+=w;i>0;M=256*M+a[o+N],N+=n,i-=8);for(p=M&(1<<-i)-1,M>>=-i,i+=r;i>0;p=256*p+a[o+N],N+=n,i-=8);if(0===M)M=1-e;else{if(M===f)return p?NaN:(s?-1:1)*(1/0);p+=Math.pow(2,r),M-=e}return(s?-1:1)*p*Math.pow(2,M-r)},exports.write=function(a,o,t,r,h,M){var p,w,f,e=8*M-h-1,i=(1<<e)-1,N=i>>1,n=23===h?Math.pow(2,-24)-Math.pow(2,-77):0,s=r?0:M-1,u=r?1:-1,l=0>o||0===o&&0>1/o?1:0;for(o=Math.abs(o),isNaN(o)||o===1/0?(w=isNaN(o)?1:0,p=i):(p=Math.floor(Math.log(o)/Math.LN2),o*(f=Math.pow(2,-p))<1&&(p--,f*=2),o+=p+N>=1?n/f:n*Math.pow(2,1-N),o*f>=2&&(p++,f/=2),p+N>=i?(w=0,p=i):p+N>=1?(w=(o*f-1)*Math.pow(2,h),p+=N):(w=o*Math.pow(2,N-1)*Math.pow(2,h),p=0));h>=8;a[t+s]=255&w,s+=u,w/=256,h-=8);for(p=p<<h|w,e+=h;e>0;a[t+s]=255&p,s+=u,p/=256,e-=8);a[t+s-u]|=128*l};

},{}],212:[function(require,module,exports){
var indexOf=[].indexOf;module.exports=function(e,n){if(indexOf)return e.indexOf(n);for(var r=0;r<e.length;++r)if(e[r]===n)return r;return-1};

},{}],213:[function(require,module,exports){
"function"==typeof Object.create?module.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:module.exports=function(t,e){t.super_=e;var o=function(){};o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t};

},{}],214:[function(require,module,exports){
(function(){var r,t,n,e,i,o,a,s;t={},s=this,"undefined"!=typeof module&&null!==module&&module.exports?module.exports=t:s.ipaddr=t,a=function(r,t,n,e){var i,o;if(r.length!==t.length)throw new Error("ipaddr: cannot match CIDR for objects with different lengths");for(i=0;e>0;){if(o=n-e,0>o&&(o=0),r[i]>>o!==t[i]>>o)return!1;e-=n,i+=1}return!0},t.subnetMatch=function(r,t,n){var e,i,o,a,s;null==n&&(n="unicast");for(e in t)for(i=t[e],!i[0]||i[0]instanceof Array||(i=[i]),a=0,s=i.length;s>a;a++)if(o=i[a],r.match.apply(r,o))return e;return n},t.IPv4=function(){function r(r){var t,n,e;if(4!==r.length)throw new Error("ipaddr: ipv4 octet count should be 4");for(n=0,e=r.length;e>n;n++)if(t=r[n],!(t>=0&&255>=t))throw new Error("ipaddr: ipv4 octet is a byte");this.octets=r}return r.prototype.kind=function(){return"ipv4"},r.prototype.toString=function(){return this.octets.join(".")},r.prototype.toByteArray=function(){return this.octets.slice(0)},r.prototype.match=function(r,t){var n;if(void 0===t&&(n=r,r=n[0],t=n[1]),"ipv4"!==r.kind())throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");return a(this.octets,r.octets,8,t)},r.prototype.SpecialRanges={unspecified:[[new r([0,0,0,0]),8]],broadcast:[[new r([255,255,255,255]),32]],multicast:[[new r([224,0,0,0]),4]],linkLocal:[[new r([169,254,0,0]),16]],loopback:[[new r([127,0,0,0]),8]],"private":[[new r([10,0,0,0]),8],[new r([172,16,0,0]),12],[new r([192,168,0,0]),16]],reserved:[[new r([192,0,0,0]),24],[new r([192,0,2,0]),24],[new r([192,88,99,0]),24],[new r([198,51,100,0]),24],[new r([203,0,113,0]),24],[new r([240,0,0,0]),4]]},r.prototype.range=function(){return t.subnetMatch(this,this.SpecialRanges)},r.prototype.toIPv4MappedAddress=function(){return t.IPv6.parse("::ffff:"+this.toString())},r}(),n="(0?\\d+|0x[a-f0-9]+)",e={fourOctet:new RegExp("^"+n+"\\."+n+"\\."+n+"\\."+n+"$","i"),longValue:new RegExp("^"+n+"$","i")},t.IPv4.parser=function(r){var t,n,i,o,a;if(n=function(r){return"0"===r[0]&&"x"!==r[1]?parseInt(r,8):parseInt(r)},t=r.match(e.fourOctet))return function(){var r,e,o,a;for(o=t.slice(1,6),a=[],r=0,e=o.length;e>r;r++)i=o[r],a.push(n(i));return a}();if(t=r.match(e.longValue)){if(a=n(t[1]),a>4294967295||0>a)throw new Error("ipaddr: address outside defined range");return function(){var r,t;for(t=[],o=r=0;24>=r;o=r+=8)t.push(a>>o&255);return t}().reverse()}return null},t.IPv6=function(){function r(r){var t,n,e;if(8!==r.length)throw new Error("ipaddr: ipv6 part count should be 8");for(n=0,e=r.length;e>n;n++)if(t=r[n],!(t>=0&&65535>=t))throw new Error("ipaddr: ipv6 part should fit to two octets");this.parts=r}return r.prototype.kind=function(){return"ipv6"},r.prototype.toString=function(){var r,t,n,e,i,o,a;for(i=function(){var r,n,e,i;for(e=this.parts,i=[],r=0,n=e.length;n>r;r++)t=e[r],i.push(t.toString(16));return i}.call(this),r=[],n=function(t){return r.push(t)},e=0,o=0,a=i.length;a>o;o++)switch(t=i[o],e){case 0:n("0"===t?"":t),e=1;break;case 1:"0"===t?e=2:n(t);break;case 2:"0"!==t&&(n(""),n(t),e=3);break;case 3:n(t)}return 2===e&&(n(""),n("")),r.join(":")},r.prototype.toByteArray=function(){var r,t,n,e,i;for(r=[],i=this.parts,n=0,e=i.length;e>n;n++)t=i[n],r.push(t>>8),r.push(255&t);return r},r.prototype.toNormalizedString=function(){var r;return function(){var t,n,e,i;for(e=this.parts,i=[],t=0,n=e.length;n>t;t++)r=e[t],i.push(r.toString(16));return i}.call(this).join(":")},r.prototype.match=function(r,t){var n;if(void 0===t&&(n=r,r=n[0],t=n[1]),"ipv6"!==r.kind())throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");return a(this.parts,r.parts,16,t)},r.prototype.SpecialRanges={unspecified:[new r([0,0,0,0,0,0,0,0]),128],linkLocal:[new r([65152,0,0,0,0,0,0,0]),10],multicast:[new r([65280,0,0,0,0,0,0,0]),8],loopback:[new r([0,0,0,0,0,0,0,1]),128],uniqueLocal:[new r([64512,0,0,0,0,0,0,0]),7],ipv4Mapped:[new r([0,0,0,0,0,65535,0,0]),96],rfc6145:[new r([0,0,0,0,65535,0,0,0]),96],rfc6052:[new r([100,65435,0,0,0,0,0,0]),96],"6to4":[new r([8194,0,0,0,0,0,0,0]),16],teredo:[new r([8193,0,0,0,0,0,0,0]),32],reserved:[[new r([8193,3512,0,0,0,0,0,0]),32]]},r.prototype.range=function(){return t.subnetMatch(this,this.SpecialRanges)},r.prototype.isIPv4MappedAddress=function(){return"ipv4Mapped"===this.range()},r.prototype.toIPv4Address=function(){var r,n,e;if(!this.isIPv4MappedAddress())throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");return e=this.parts.slice(-2),r=e[0],n=e[1],new t.IPv4([r>>8,255&r,n>>8,255&n])},r}(),i="(?:[0-9a-f]+::?)+",o={"native":new RegExp("^(::)?("+i+")?([0-9a-f]+)?(::)?$","i"),transitional:new RegExp("^((?:"+i+")|(?:::)(?:"+i+")?)"+(""+n+"\\."+n+"\\."+n+"\\."+n+"$"),"i")},r=function(r,t){var n,e,i,o,a;if(r.indexOf("::")!==r.lastIndexOf("::"))return null;for(n=0,e=-1;(e=r.indexOf(":",e+1))>=0;)n++;if("::"===r.substr(0,2)&&n--,"::"===r.substr(-2,2)&&n--,n>t)return null;for(a=t-n,o=":";a--;)o+="0:";return r=r.replace("::",o),":"===r[0]&&(r=r.slice(1)),":"===r[r.length-1]&&(r=r.slice(0,-1)),function(){var t,n,e,o;for(e=r.split(":"),o=[],t=0,n=e.length;n>t;t++)i=e[t],o.push(parseInt(i,16));return o}()},t.IPv6.parser=function(t){var n,e;return t.match(o["native"])?r(t,8):(n=t.match(o.transitional))&&(e=r(n[1].slice(0,-1),6))?(e.push(parseInt(n[2])<<8|parseInt(n[3])),e.push(parseInt(n[4])<<8|parseInt(n[5])),e):null},t.IPv4.isIPv4=t.IPv6.isIPv6=function(r){return null!==this.parser(r)},t.IPv4.isValid=function(r){var t;try{return new this(this.parser(r)),!0}catch(n){return t=n,!1}},t.IPv6.isValid=function(r){var t;if("string"==typeof r&&-1===r.indexOf(":"))return!1;try{return new this(this.parser(r)),!0}catch(n){return t=n,!1}},t.IPv4.parse=t.IPv6.parse=function(r){var t;if(t=this.parser(r),null===t)throw new Error("ipaddr: string is not formatted like ip address");return new this(t)},t.IPv4.parseCIDR=function(r){var t,n;if((n=r.match(/^(.+)\/(\d+)$/))&&(t=parseInt(n[2]),t>=0&&32>=t))return[this.parse(n[1]),t];throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range")},t.IPv6.parseCIDR=function(r){var t,n;if((n=r.match(/^(.+)\/(\d+)$/))&&(t=parseInt(n[2]),t>=0&&128>=t))return[this.parse(n[1]),t];throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range")},t.isValid=function(r){return t.IPv6.isValid(r)||t.IPv4.isValid(r)},t.parse=function(r){if(t.IPv6.isValid(r))return t.IPv6.parse(r);if(t.IPv4.isValid(r))return t.IPv4.parse(r);throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format")},t.parseCIDR=function(r){var n;try{return t.IPv6.parseCIDR(r)}catch(e){n=e;try{return t.IPv4.parseCIDR(r)}catch(e){throw n=e,new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format")}}},t.process=function(r){var t;return t=this.parse(r),"ipv6"===t.kind()&&t.isIPv4MappedAddress()?t.toIPv4Address():t}}).call(this);

},{}],215:[function(require,module,exports){
module.exports=function(r){return!(null==r||!(r._isBuffer||r.constructor&&"function"==typeof r.constructor.isBuffer&&r.constructor.isBuffer(r)))};

},{}],216:[function(require,module,exports){
function isFunction(o){var t=toString.call(o);return"[object Function]"===t||"function"==typeof o&&"[object RegExp]"!==t||"undefined"!=typeof window&&(o===window.setTimeout||o===window.alert||o===window.confirm||o===window.prompt)}module.exports=isFunction;var toString=Object.prototype.toString;

},{}],217:[function(require,module,exports){
function format(e){if(!e||"object"!=typeof e)throw new TypeError("argument obj is required");var t=e.parameters,r=e.subtype,a=e.suffix,p=e.type;if(!p||!typeNameRegExp.test(p))throw new TypeError("invalid type");if(!r||!subtypeNameRegExp.test(r))throw new TypeError("invalid subtype");var n=p+"/"+r;if(a){if(!typeNameRegExp.test(a))throw new TypeError("invalid suffix");n+="+"+a}if(t&&"object"==typeof t)for(var o,i=Object.keys(t).sort(),s=0;s<i.length;s++){if(o=i[s],!tokenRegExp.test(o))throw new TypeError("invalid parameter name");n+="; "+o+"="+qstring(t[o])}return n}function parse(e){if(!e)throw new TypeError("argument string is required");if("object"==typeof e&&(e=getcontenttype(e)),"string"!=typeof e)throw new TypeError("argument string is required to be a string");var t,r,a,p=e.indexOf(";"),n=-1!==p?e.substr(0,p):e,o=splitType(n),i={};for(paramRegExp.lastIndex=p;r=paramRegExp.exec(e);){if(r.index!==p)throw new TypeError("invalid parameter format");p+=r[0].length,t=r[1].toLowerCase(),a=r[2],'"'===a[0]&&(a=a.substr(1,a.length-2).replace(qescRegExp,"$1")),i[t]=a}if(-1!==p&&p!==e.length)throw new TypeError("invalid parameter format");return o.parameters=i,o}function getcontenttype(e){return"function"==typeof e.getHeader?e.getHeader("content-type"):"object"==typeof e.headers?e.headers&&e.headers["content-type"]:void 0}function qstring(e){var t=String(e);if(tokenRegExp.test(t))return t;if(t.length>0&&!textRegExp.test(t))throw new TypeError("invalid parameter value");return'"'+t.replace(quoteRegExp,"\\$1")+'"'}function splitType(e){var t=typeRegExp.exec(e.toLowerCase());if(!t)throw new TypeError("invalid media type");var r,a=t[1],p=t[2],n=p.lastIndexOf("+");-1!==n&&(r=p.substr(n+1),p=p.substr(0,n));var o={type:a,subtype:p,suffix:r};return o}var paramRegExp=/; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u0020-\u007e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g,textRegExp=/^[\u0020-\u007e\u0080-\u00ff]+$/,tokenRegExp=/^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/,qescRegExp=/\\([\u0000-\u007f])/g,quoteRegExp=/([\\"])/g,subtypeNameRegExp=/^[A-Za-z0-9][A-Za-z0-9!#$&^_.-]{0,126}$/,typeNameRegExp=/^[A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126}$/,typeRegExp=/^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;exports.format=format,exports.parse=parse;

},{}],218:[function(require,module,exports){
"use strict";function merge(r,e,t){if(!r)throw new TypeError("argument dest is required");if(!e)throw new TypeError("argument src is required");return void 0===t&&(t=!0),Object.getOwnPropertyNames(e).forEach(function(o){if(t||!hasOwnProperty.call(r,o)){var n=Object.getOwnPropertyDescriptor(e,o);Object.defineProperty(r,o,n)}}),r}module.exports=merge;var hasOwnProperty=Object.prototype.hasOwnProperty;

},{}],219:[function(require,module,exports){
"use strict";function getCurrentNodeMethods(){return http.METHODS&&http.METHODS.map(function(t){return t.toLowerCase()})}function getBasicNodeMethods(){return["get","post","put","head","delete","options","trace","copy","lock","mkcol","move","purge","propfind","proppatch","unlock","report","mkactivity","checkout","merge","m-search","notify","subscribe","unsubscribe","patch","search","connect"]}var http=require("http");module.exports=getCurrentNodeMethods()||getBasicNodeMethods();

},{"http":85}],220:[function(require,module,exports){
function MillerRabin(r){this.rand=r||new brorand.Rand}var bn=require("bn.js"),brorand=require("brorand");module.exports=MillerRabin,MillerRabin.create=function(r){return new MillerRabin(r)},MillerRabin.prototype._rand=function(r){var n=r.bitLength(),e=this.rand.generate(Math.ceil(n/8));e[0]|=3;var t=7&n;return 0!==t&&(e[e.length-1]>>=7-t),new bn(e)},MillerRabin.prototype.test=function(r,n,e){var t=r.bitLength(),a=bn.mont(r),i=new bn(1).toRed(a);n||(n=Math.max(1,t/48|0));for(var o=r.subn(1),b=o.subn(1),d=0;!o.testn(d);d++);for(var u=r.shrn(d),f=o.toRed(a),c=!0;n>0;n--){var s=this._rand(b);e&&e(s);var l=s.toRed(a).redPow(u);if(0!==l.cmp(i)&&0!==l.cmp(f)){for(var m=1;d>m;m++){if(l=l.redSqr(),0===l.cmp(i))return!1;if(0===l.cmp(f))break}if(m===d)return!1}}return c},MillerRabin.prototype.getDivisor=function(r,n){var e=r.bitLength(),t=bn.mont(r),a=new bn(1).toRed(t);n||(n=Math.max(1,e/48|0));for(var i=r.subn(1),o=i.subn(1),b=0;!i.testn(b);b++);for(var d=r.shrn(b),u=i.toRed(t);n>0;n--){var f=this._rand(o),c=r.gcd(f);if(0!==c.cmpn(1))return c;var s=f.toRed(t).redPow(d);if(0!==s.cmp(a)&&0!==s.cmp(u)){for(var l=1;b>l;l++){if(s=s.redSqr(),0===s.cmp(a))return s.fromRed().subn(1).gcd(r);if(0===s.cmp(u))break}if(l===b)return s=s.redSqr(),s.fromRed().subn(1).gcd(r)}}return!1};

},{"bn.js":83,"brorand":84}],221:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],222:[function(require,module,exports){
module.exports=require("./db.json");

},{"./db.json":221}],223:[function(require,module,exports){
"use strict";function charset(e){if(!e||"string"!=typeof e)return!1;var t=extractTypeRegExp.exec(e),r=t&&db[t[1].toLowerCase()];return r&&r.charset?r.charset:t&&textTypeRegExp.test(t[1])?"UTF-8":!1}function contentType(e){if(!e||"string"!=typeof e)return!1;var t=-1===e.indexOf("/")?exports.lookup(e):e;if(!t)return!1;if(-1===t.indexOf("charset")){var r=exports.charset(t);r&&(t+="; charset="+r.toLowerCase())}return t}function extension(e){if(!e||"string"!=typeof e)return!1;var t=extractTypeRegExp.exec(e),r=t&&exports.extensions[t[1].toLowerCase()];return r&&r.length?r[0]:!1}function lookup(e){if(!e||"string"!=typeof e)return!1;var t=extname("x."+e).toLowerCase().substr(1);return t?exports.types[t]||!1:!1}function populateMaps(e,t){var r=["nginx","apache",void 0,"iana"];Object.keys(db).forEach(function(n){var o=db[n],s=o.extensions;if(s&&s.length){e[n]=s;for(var p=0;p<s.length;p++){var a=s[p];if(t[a]){var i=r.indexOf(db[t[a]].source),x=r.indexOf(o.source);if("application/octet-stream"!==t[a]&&i>x||i===x&&"application/"===t[a].substr(0,12))continue}t[a]=n}}})}var db=require("mime-db"),extname=require("path").extname,extractTypeRegExp=/^\s*([^;\s]*)(?:;|\s|$)/,textTypeRegExp=/^text\//i;exports.charset=charset,exports.charsets={lookup:charset},exports.contentType=contentType,exports.extension=extension,exports.extensions=Object.create(null),exports.lookup=lookup,exports.types=Object.create(null),populateMaps(exports.extensions,exports.types);

},{"mime-db":222,"path":240}],224:[function(require,module,exports){
(function (process){
function Mime(){this.types=Object.create(null),this.extensions=Object.create(null)}var path=require("path"),fs=require("fs");Mime.prototype.define=function(e){for(var t in e){for(var i=e[t],s=0;s<i.length;s++)process.env.DEBUG_MIME&&this.types[i]&&console.warn(this._loading.replace(/.*\//,""),'changes "'+i[s]+'" extension type from '+this.types[i]+" to "+t),this.types[i[s]]=t;this.extensions[t]||(this.extensions[t]=i[0])}},Mime.prototype.load=function(e){this._loading=e;var t={},i=fs.readFileSync(e,"ascii"),s=i.split(/[\r\n]+/);s.forEach(function(e){var i=e.replace(/\s*#.*|^\s*|\s*$/g,"").split(/\s+/);t[i.shift()]=i}),this.define(t),this._loading=null},Mime.prototype.lookup=function(e,t){var i=e.replace(/.*[\.\/\\]/,"").toLowerCase();return this.types[i]||t||this.default_type},Mime.prototype.extension=function(e){var t=e.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();return this.extensions[t]};var mime=new Mime;mime.define(require("./types.json")),mime.default_type=mime.lookup("bin"),mime.Mime=Mime,mime.charsets={lookup:function(e,t){return/^text\//.test(e)?"UTF-8":t}},module.exports=mime;

}).call(this,require('_process'))
},{"./types.json":225,"_process":244,"fs":110,"path":240}],225:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],226:[function(require,module,exports){
function assert(r,e){if(!r)throw new Error(e||"Assertion failed")}module.exports=assert,assert.equal=function(r,e,s){if(r!=e)throw new Error(s||"Assertion failed: "+r+" != "+e)};

},{}],227:[function(require,module,exports){
function parse(e){if(e=""+e,!(e.length>1e4)){var a=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(a){var r=parseFloat(a[1]),c=(a[2]||"ms").toLowerCase();switch(c){case"years":case"year":case"yrs":case"yr":case"y":return r*y;case"days":case"day":case"d":return r*d;case"hours":case"hour":case"hrs":case"hr":case"h":return r*h;case"minutes":case"minute":case"mins":case"min":case"m":return r*m;case"seconds":case"second":case"secs":case"sec":case"s":return r*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r}}}}function short(e){return e>=d?Math.round(e/d)+"d":e>=h?Math.round(e/h)+"h":e>=m?Math.round(e/m)+"m":e>=s?Math.round(e/s)+"s":e+"ms"}function long(e){return plural(e,d,"day")||plural(e,h,"hour")||plural(e,m,"minute")||plural(e,s,"second")||e+" ms"}function plural(s,e,a){return e>s?void 0:1.5*e>s?Math.floor(s/e)+" "+a:Math.ceil(s/e)+" "+a+"s"}var s=1e3,m=60*s,h=60*m,d=24*h,y=365.25*d;module.exports=function(s,e){return e=e||{},"string"==typeof s?parse(s):e["long"]?long(s):short(s)};

},{}],228:[function(require,module,exports){
function Negotiator(e){return this instanceof Negotiator?void(this.request=e):new Negotiator(e)}var preferredCharsets=require("./lib/charset"),preferredEncodings=require("./lib/encoding"),preferredLanguages=require("./lib/language"),preferredMediaTypes=require("./lib/mediaType");module.exports=Negotiator,Negotiator.Negotiator=Negotiator,Negotiator.prototype.charset=function(e){var t=this.charsets(e);return t&&t[0]},Negotiator.prototype.charsets=function(e){return preferredCharsets(this.request.headers["accept-charset"],e)},Negotiator.prototype.encoding=function(e){var t=this.encodings(e);return t&&t[0]},Negotiator.prototype.encodings=function(e){return preferredEncodings(this.request.headers["accept-encoding"],e)},Negotiator.prototype.language=function(e){var t=this.languages(e);return t&&t[0]},Negotiator.prototype.languages=function(e){return preferredLanguages(this.request.headers["accept-language"],e)},Negotiator.prototype.mediaType=function(e){var t=this.mediaTypes(e);return t&&t[0]},Negotiator.prototype.mediaTypes=function(e){return preferredMediaTypes(this.request.headers.accept,e)},Negotiator.prototype.preferredCharset=Negotiator.prototype.charset,Negotiator.prototype.preferredCharsets=Negotiator.prototype.charsets,Negotiator.prototype.preferredEncoding=Negotiator.prototype.encoding,Negotiator.prototype.preferredEncodings=Negotiator.prototype.encodings,Negotiator.prototype.preferredLanguage=Negotiator.prototype.language,Negotiator.prototype.preferredLanguages=Negotiator.prototype.languages,Negotiator.prototype.preferredMediaType=Negotiator.prototype.mediaType,Negotiator.prototype.preferredMediaTypes=Negotiator.prototype.mediaTypes;

},{"./lib/charset":229,"./lib/encoding":230,"./lib/language":231,"./lib/mediaType":232}],229:[function(require,module,exports){
function parseAcceptCharset(r){for(var e=r.split(","),t=0,s=0;t<e.length;t++){var a=parseCharset(e[t].trim(),t);a&&(e[s++]=a)}return e.length=s,e}function parseCharset(r,e){var t=r.match(/^\s*(\S+?)\s*(?:;(.*))?$/);if(!t)return null;var s=t[1],a=1;if(t[2])for(var i=t[2].split(";"),e=0;e<i.length;e++){var n=i[e].trim().split("=");if("q"===n[0]){a=parseFloat(n[1]);break}}return{charset:s,q:a,i:e}}function getCharsetPriority(r,e,t){for(var s={o:-1,q:0,s:0},a=0;a<e.length;a++){var i=specify(r,e[a],t);i&&(s.s-i.s||s.q-i.q||s.o-i.o)<0&&(s=i)}return s}function specify(r,e,t){var s=0;if(e.charset.toLowerCase()===r.toLowerCase())s|=1;else if("*"!==e.charset)return null;return{i:t,o:e.i,q:e.q,s:s}}function preferredCharsets(r,e){var t=parseAcceptCharset(void 0===r?"*":r||"");if(!e)return t.filter(isQuality).sort(compareSpecs).map(function(r){return r.charset});var s=e.map(function(r,e){return getCharsetPriority(r,t,e)});return s.filter(isQuality).sort(compareSpecs).map(function(r){return e[s.indexOf(r)]})}function compareSpecs(r,e){return e.q-r.q||e.s-r.s||r.o-e.o||r.i-e.i||0}function isQuality(r){return r.q>0}module.exports=preferredCharsets,preferredCharsets.preferredCharsets=preferredCharsets;

},{}],230:[function(require,module,exports){
function parseAcceptEncoding(r){for(var n=r.split(","),e=!1,i=1,t=0,o=0;t<n.length;t++){var c=parseEncoding(n[t].trim(),t);c&&(n[o++]=c,e=e||specify("identity",c),i=Math.min(i,c.q||1))}return e||(n[o++]={encoding:"identity",q:i,i:t}),n.length=o,n}function parseEncoding(r,n){var e=r.match(/^\s*(\S+?)\s*(?:;(.*))?$/);if(!e)return null;var i=e[1],t=1;if(e[2])for(var o=e[2].split(";"),n=0;n<o.length;n++){var c=o[n].trim().split("=");if("q"===c[0]){t=parseFloat(c[1]);break}}return{encoding:i,q:t,i:n}}function getEncodingPriority(r,n,e){for(var i={o:-1,q:0,s:0},t=0;t<n.length;t++){var o=specify(r,n[t],e);o&&(i.s-o.s||i.q-o.q||i.o-o.o)<0&&(i=o)}return i}function specify(r,n,e){var i=0;if(n.encoding.toLowerCase()===r.toLowerCase())i|=1;else if("*"!==n.encoding)return null;return{i:e,o:n.i,q:n.q,s:i}}function preferredEncodings(r,n){var e=parseAcceptEncoding(r||"");if(!n)return e.filter(isQuality).sort(compareSpecs).map(function(r){return r.encoding});var i=n.map(function(r,n){return getEncodingPriority(r,e,n)});return i.filter(isQuality).sort(compareSpecs).map(function(r){return n[i.indexOf(r)]})}function compareSpecs(r,n){return n.q-r.q||n.s-r.s||r.o-n.o||r.i-n.i||0}function isQuality(r){return r.q>0}module.exports=preferredEncodings,preferredEncodings.preferredEncodings=preferredEncodings;

},{}],231:[function(require,module,exports){
function parseAcceptLanguage(e){for(var r=e.split(","),a=0,n=0;a<r.length;a++){var t=parseLanguage(r[a].trim(),a);t&&(r[n++]=t)}return r.length=n,r}function parseLanguage(e,r){var a=e.match(/^\s*(\S+?)(?:-(\S+?))?\s*(?:;(.*))?$/);if(!a)return null;var n=a[1],t=a[2],u=n;t&&(u+="-"+t);var i=1;if(a[3])for(var f=a[3].split(";"),r=0;r<f.length;r++){var s=f[r].split("=");"q"===s[0]&&(i=parseFloat(s[1]))}return{prefix:n,suffix:t,q:i,i:r,full:u}}function getLanguagePriority(e,r,a){for(var n={o:-1,q:0,s:0},t=0;t<r.length;t++){var u=specify(e,r[t],a);u&&(n.s-u.s||n.q-u.q||n.o-u.o)<0&&(n=u)}return n}function specify(e,r,a){var n=parseLanguage(e);if(!n)return null;var t=0;if(r.full.toLowerCase()===n.full.toLowerCase())t|=4;else if(r.prefix.toLowerCase()===n.full.toLowerCase())t|=2;else if(r.full.toLowerCase()===n.prefix.toLowerCase())t|=1;else if("*"!==r.full)return null;return{i:a,o:r.i,q:r.q,s:t}}function preferredLanguages(e,r){var a=parseAcceptLanguage(void 0===e?"*":e||"");if(!r)return a.filter(isQuality).sort(compareSpecs).map(function(e){return e.full});var n=r.map(function(e,r){return getLanguagePriority(e,a,r)});return n.filter(isQuality).sort(compareSpecs).map(function(e){return r[n.indexOf(e)]})}function compareSpecs(e,r){return r.q-e.q||r.s-e.s||e.o-r.o||e.i-r.i||0}function isQuality(e){return e.q>0}module.exports=preferredLanguages,preferredLanguages.preferredLanguages=preferredLanguages;

},{}],232:[function(require,module,exports){
function parseAccept(e){for(var r=splitMediaTypes(e),t=0,n=0;t<r.length;t++){var i=parseMediaType(r[t].trim(),t);i&&(r[n++]=i)}return r.length=n,r}function parseMediaType(e,r){var t=e.match(/\s*(\S+?)\/([^;\s]+)\s*(?:;(.*))?/);if(!t)return null;var n=t[1],i=t[2],a=""+n+"/"+i,s={},u=1;return t[3]&&(s=t[3].split(";").map(function(e){return e.trim().split("=")}).reduce(function(e,r){var t=r[0].toLowerCase(),n=r[1];return e[t]=n&&'"'===n[0]&&'"'===n[n.length-1]?n.substr(1,n.length-2):n,e},s),null!=s.q&&(u=parseFloat(s.q),delete s.q)),{type:n,subtype:i,params:s,q:u,i:r,full:a}}function getMediaTypePriority(e,r,t){for(var n={o:-1,q:0,s:0},i=0;i<r.length;i++){var a=specify(e,r[i],t);a&&(n.s-a.s||n.q-a.q||n.o-a.o)<0&&(n=a)}return n}function specify(e,r,t){var n=parseMediaType(e),i=0;if(!n)return null;if(r.type.toLowerCase()==n.type.toLowerCase())i|=4;else if("*"!=r.type)return null;if(r.subtype.toLowerCase()==n.subtype.toLowerCase())i|=2;else if("*"!=r.subtype)return null;var a=Object.keys(r.params);if(a.length>0){if(!a.every(function(e){return"*"==r.params[e]||(r.params[e]||"").toLowerCase()==(n.params[e]||"").toLowerCase()}))return null;i|=1}return{i:t,o:r.i,q:r.q,s:i}}function preferredMediaTypes(e,r){var t=parseAccept(void 0===e?"*/*":e||"");if(!r)return t.filter(isQuality).sort(compareSpecs).map(function(e){return e.full});var n=r.map(function(e,r){return getMediaTypePriority(e,t,r)});return n.filter(isQuality).sort(compareSpecs).map(function(e){return r[n.indexOf(e)]})}function compareSpecs(e,r){return r.q-e.q||r.s-e.s||e.o-r.o||e.i-r.i||0}function isQuality(e){return e.q>0}function quoteCount(e){for(var r=0,t=0;-1!==(t=e.indexOf('"',t));)r++,t++;return r}function splitMediaTypes(e){for(var r=e.split(","),t=1,n=0;t<r.length;t++)quoteCount(r[n])%2==0?r[++n]=r[t]:r[n]+=","+r[t];return r.length=n+1,r}module.exports=preferredMediaTypes,preferredMediaTypes.preferredMediaTypes=preferredMediaTypes;

},{}],233:[function(require,module,exports){
(function (process){
"use strict";function onFinished(e,n){return isFinished(e)!==!1?(defer(n,null,e),e):(attachListener(e,n),e)}function isFinished(e){var n=e.socket;return"boolean"==typeof e.finished?Boolean(e.finished||n&&!n.writable):"boolean"==typeof e.complete?Boolean(e.upgrade||!n||!n.readable||e.complete&&!e.readable):void 0}function attachFinishedListener(e,n){function i(e){o.cancel(),s.cancel(),r=!0,n(e)}function t(n){e.removeListener("socket",t),r||o===s&&(s=first([[n,"error","close"]],i))}var o,s,r=!1;return o=s=first([[e,"end","finish"]],i),e.socket?void t(e.socket):(e.on("socket",t),void(void 0===e.socket&&patchAssignSocket(e,t)))}function attachListener(e,n){var i=e.__onFinished;i&&i.queue||(i=e.__onFinished=createListener(e),attachFinishedListener(e,i)),i.queue.push(n)}function createListener(e){function n(i){if(e.__onFinished===n&&(e.__onFinished=null),n.queue){var t=n.queue;n.queue=null;for(var o=0;o<t.length;o++)t[o](i,e)}}return n.queue=[],n}function patchAssignSocket(e,n){var i=e.assignSocket;"function"==typeof i&&(e.assignSocket=function(e){i.call(this,e),n(e)})}module.exports=onFinished,module.exports.isFinished=isFinished;var first=require("ee-first"),defer="function"==typeof setImmediate?setImmediate:function(e){process.nextTick(e.bind.apply(e,arguments))};

}).call(this,require('_process'))
},{"_process":244,"ee-first":141}],234:[function(require,module,exports){
module.exports={"2.16.840.1.101.3.4.1.1": "aes-128-ecb",
"2.16.840.1.101.3.4.1.2": "aes-128-cbc",
"2.16.840.1.101.3.4.1.3": "aes-128-ofb",
"2.16.840.1.101.3.4.1.4": "aes-128-cfb",
"2.16.840.1.101.3.4.1.21": "aes-192-ecb",
"2.16.840.1.101.3.4.1.22": "aes-192-cbc",
"2.16.840.1.101.3.4.1.23": "aes-192-ofb",
"2.16.840.1.101.3.4.1.24": "aes-192-cfb",
"2.16.840.1.101.3.4.1.41": "aes-256-ecb",
"2.16.840.1.101.3.4.1.42": "aes-256-cbc",
"2.16.840.1.101.3.4.1.43": "aes-256-ofb",
"2.16.840.1.101.3.4.1.44": "aes-256-cfb"
}
},{}],235:[function(require,module,exports){
var asn1=require("asn1.js"),RSAPrivateKey=asn1.define("RSAPrivateKey",function(){this.seq().obj(this.key("version")["int"](),this.key("modulus")["int"](),this.key("publicExponent")["int"](),this.key("privateExponent")["int"](),this.key("prime1")["int"](),this.key("prime2")["int"](),this.key("exponent1")["int"](),this.key("exponent2")["int"](),this.key("coefficient")["int"]())});exports.RSAPrivateKey=RSAPrivateKey;var RSAPublicKey=asn1.define("RSAPublicKey",function(){this.seq().obj(this.key("modulus")["int"](),this.key("publicExponent")["int"]())});exports.RSAPublicKey=RSAPublicKey;var PublicKey=asn1.define("SubjectPublicKeyInfo",function(){this.seq().obj(this.key("algorithm").use(AlgorithmIdentifier),this.key("subjectPublicKey").bitstr())});exports.PublicKey=PublicKey;var AlgorithmIdentifier=asn1.define("AlgorithmIdentifier",function(){this.seq().obj(this.key("algorithm").objid(),this.key("none").null_().optional(),this.key("curve").objid().optional(),this.key("params").seq().obj(this.key("p")["int"](),this.key("q")["int"](),this.key("g")["int"]()).optional())}),PrivateKeyInfo=asn1.define("PrivateKeyInfo",function(){this.seq().obj(this.key("version")["int"](),this.key("algorithm").use(AlgorithmIdentifier),this.key("subjectPrivateKey").octstr())});exports.PrivateKey=PrivateKeyInfo;var EncryptedPrivateKeyInfo=asn1.define("EncryptedPrivateKeyInfo",function(){this.seq().obj(this.key("algorithm").seq().obj(this.key("id").objid(),this.key("decrypt").seq().obj(this.key("kde").seq().obj(this.key("id").objid(),this.key("kdeparams").seq().obj(this.key("salt").octstr(),this.key("iters")["int"]())),this.key("cipher").seq().obj(this.key("algo").objid(),this.key("iv").octstr()))),this.key("subjectPrivateKey").octstr())});exports.EncryptedPrivateKey=EncryptedPrivateKeyInfo;var DSAPrivateKey=asn1.define("DSAPrivateKey",function(){this.seq().obj(this.key("version")["int"](),this.key("p")["int"](),this.key("q")["int"](),this.key("g")["int"](),this.key("pub_key")["int"](),this.key("priv_key")["int"]())});exports.DSAPrivateKey=DSAPrivateKey,exports.DSAparam=asn1.define("DSAparam",function(){this["int"]()});var ECPrivateKey=asn1.define("ECPrivateKey",function(){this.seq().obj(this.key("version")["int"](),this.key("privateKey").octstr(),this.key("parameters").optional().explicit(0).use(ECParameters),this.key("publicKey").optional().explicit(1).bitstr())});exports.ECPrivateKey=ECPrivateKey;var ECParameters=asn1.define("ECParameters",function(){this.choice({namedCurve:this.objid()})});exports.signature=asn1.define("signature",function(){this.seq().obj(this.key("r")["int"](),this.key("s")["int"]())});

},{"asn1.js":68}],236:[function(require,module,exports){
(function (Buffer){
var findProc=/Proc-Type: 4,ENCRYPTED\r?\nDEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)\r?\n\r?\n([0-9A-z\n\r\+\/\=]+)\r?\n/m,startRegex=/^-----BEGIN (.*) KEY-----\r?\n/m,fullRegex=/^-----BEGIN (.*) KEY-----\r?\n([0-9A-z\n\r\+\/\=]+)\r?\n-----END \1 KEY-----$/m,evp=require("evp_bytestokey"),ciphers=require("browserify-aes");module.exports=function(e,r){var a,n=e.toString(),t=n.match(findProc);if(t){var f="aes"+t[1],c=new Buffer(t[2],"hex"),s=new Buffer(t[3].replace(/\r?\n/g,""),"base64"),i=evp(r,c.slice(0,8),parseInt(t[1],10)).key,p=[],u=ciphers.createDecipheriv(f,i,c);p.push(u.update(s)),p.push(u["final"]()),a=Buffer.concat(p)}else{var o=n.match(fullRegex);a=new Buffer(o[2].replace(/\r?\n/g,""),"base64")}var E=n.match(startRegex)[1]+" KEY";return{tag:E,data:a}};

}).call(this,require("buffer").Buffer)
},{"browserify-aes":88,"buffer":112,"evp_bytestokey":162}],237:[function(require,module,exports){
(function (Buffer){
function parseKeys(e){var r;"object"!=typeof e||Buffer.isBuffer(e)||(r=e.passphrase,e=e.key),"string"==typeof e&&(e=new Buffer(e));var a,t,s=fixProc(e,r),i=s.tag,c=s.data;switch(i){case"PUBLIC KEY":switch(t=asn1.PublicKey.decode(c,"der"),a=t.algorithm.algorithm.join(".")){case"1.2.840.113549.1.1.1":return asn1.RSAPublicKey.decode(t.subjectPublicKey.data,"der");case"1.2.840.10045.2.1":return t.subjectPrivateKey=t.subjectPublicKey,{type:"ec",data:t};case"1.2.840.10040.4.1":return t.algorithm.params.pub_key=asn1.DSAparam.decode(t.subjectPublicKey.data,"der"),{type:"dsa",data:t.algorithm.params};default:throw new Error("unknown key id "+a)}throw new Error("unknown key type "+i);case"ENCRYPTED PRIVATE KEY":c=asn1.EncryptedPrivateKey.decode(c,"der"),c=decrypt(c,r);case"PRIVATE KEY":switch(t=asn1.PrivateKey.decode(c,"der"),a=t.algorithm.algorithm.join(".")){case"1.2.840.113549.1.1.1":return asn1.RSAPrivateKey.decode(t.subjectPrivateKey,"der");case"1.2.840.10045.2.1":return{curve:t.algorithm.curve,privateKey:asn1.ECPrivateKey.decode(t.subjectPrivateKey,"der").privateKey};case"1.2.840.10040.4.1":return t.algorithm.params.priv_key=asn1.DSAparam.decode(t.subjectPrivateKey,"der"),{type:"dsa",params:t.algorithm.params};default:throw new Error("unknown key id "+a)}throw new Error("unknown key type "+i);case"RSA PUBLIC KEY":return asn1.RSAPublicKey.decode(c,"der");case"RSA PRIVATE KEY":return asn1.RSAPrivateKey.decode(c,"der");case"DSA PRIVATE KEY":return{type:"dsa",params:asn1.DSAPrivateKey.decode(c,"der")};case"EC PRIVATE KEY":return c=asn1.ECPrivateKey.decode(c,"der"),{curve:c.parameters.value,privateKey:c.privateKey};default:throw new Error("unknown key type "+i)}}function decrypt(e,r){var a=e.algorithm.decrypt.kde.kdeparams.salt,t=parseInt(e.algorithm.decrypt.kde.kdeparams.iters.toString(),10),s=aesid[e.algorithm.decrypt.cipher.algo.join(".")],i=e.algorithm.decrypt.cipher.iv,c=e.subjectPrivateKey,d=parseInt(s.split("-")[1],10)/8,n=compat.pbkdf2Sync(r,a,t,d),o=ciphers.createDecipheriv(s,n,i),u=[];return u.push(o.update(c)),u.push(o["final"]()),Buffer.concat(u)}var asn1=require("./asn1"),aesid=require("./aesid.json"),fixProc=require("./fixProc"),ciphers=require("browserify-aes"),compat=require("pbkdf2");module.exports=parseKeys,parseKeys.signature=asn1.signature;

}).call(this,require("buffer").Buffer)
},{"./aesid.json":234,"./asn1":235,"./fixProc":236,"browserify-aes":88,"buffer":112,"pbkdf2":242}],238:[function(require,module,exports){
var trim=require("trim"),forEach=require("for-each"),isArray=function(r){return"[object Array]"===Object.prototype.toString.call(r)};module.exports=function(r){if(!r)return{};var e={};return forEach(trim(r).split("\n"),function(r){var t=r.indexOf(":"),i=trim(r.slice(0,t)).toLowerCase(),o=trim(r.slice(t+1));"undefined"==typeof e[i]?e[i]=o:isArray(e[i])?e[i].push(o):e[i]=[e[i],o]}),e};

},{"for-each":180,"trim":289}],239:[function(require,module,exports){
"use strict";function parseurl(r){var e=r.url;if(void 0!==e){var a=r._parsedUrl;return fresh(e,a)?a:(a=fastparse(e),a._raw=e,r._parsedUrl=a)}}function originalurl(r){var e=r.originalUrl;if("string"!=typeof e)return parseurl(r);var a=r._parsedOriginalUrl;return fresh(e,a)?a:(a=fastparse(e),a._raw=e,r._parsedOriginalUrl=a)}function fastparse(r){var e="string"==typeof r&&simplePathRegExp.exec(r);if(e){var a=e[1],l=e[2]||null,s=void 0!==Url?new Url:{};return s.path=r,s.href=r,s.pathname=a,s.search=l,s.query=l&&l.substr(1),s}return parse(r)}function fresh(r,e){return"object"==typeof e&&null!==e&&(void 0===Url||e instanceof Url)&&e._raw===r}var url=require("url"),parse=url.parse,Url=url.Url,simplePathRegExp=/^(\/\/?(?!\/)[^\?#\s]*)(\?[^#\s]*)?$/;module.exports=parseurl,module.exports.original=originalurl;

},{"url":292}],240:[function(require,module,exports){
(function (process){
function normalizeArray(r,t){for(var e=0,n=r.length-1;n>=0;n--){var s=r[n];"."===s?r.splice(n,1):".."===s?(r.splice(n,1),e++):e&&(r.splice(n,1),e--)}if(t)for(;e--;e)r.unshift("..");return r}function filter(r,t){if(r.filter)return r.filter(t);for(var e=[],n=0;n<r.length;n++)t(r[n],n,r)&&e.push(r[n]);return e}var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,splitPath=function(r){return splitPathRe.exec(r).slice(1)};exports.resolve=function(){for(var r="",t=!1,e=arguments.length-1;e>=-1&&!t;e--){var n=e>=0?arguments[e]:process.cwd();if("string"!=typeof n)throw new TypeError("Arguments to path.resolve must be strings");n&&(r=n+"/"+r,t="/"===n.charAt(0))}return r=normalizeArray(filter(r.split("/"),function(r){return!!r}),!t).join("/"),(t?"/":"")+r||"."},exports.normalize=function(r){var t=exports.isAbsolute(r),e="/"===substr(r,-1);return r=normalizeArray(filter(r.split("/"),function(r){return!!r}),!t).join("/"),r||t||(r="."),r&&e&&(r+="/"),(t?"/":"")+r},exports.isAbsolute=function(r){return"/"===r.charAt(0)},exports.join=function(){var r=Array.prototype.slice.call(arguments,0);return exports.normalize(filter(r,function(r,t){if("string"!=typeof r)throw new TypeError("Arguments to path.join must be strings");return r}).join("/"))},exports.relative=function(r,t){function e(r){for(var t=0;t<r.length&&""===r[t];t++);for(var e=r.length-1;e>=0&&""===r[e];e--);return t>e?[]:r.slice(t,e-t+1)}r=exports.resolve(r).substr(1),t=exports.resolve(t).substr(1);for(var n=e(r.split("/")),s=e(t.split("/")),i=Math.min(n.length,s.length),o=i,u=0;i>u;u++)if(n[u]!==s[u]){o=u;break}for(var l=[],u=o;u<n.length;u++)l.push("..");return l=l.concat(s.slice(o)),l.join("/")},exports.sep="/",exports.delimiter=":",exports.dirname=function(r){var t=splitPath(r),e=t[0],n=t[1];return e||n?(n&&(n=n.substr(0,n.length-1)),e+n):"."},exports.basename=function(r,t){var e=splitPath(r)[2];return t&&e.substr(-1*t.length)===t&&(e=e.substr(0,e.length-t.length)),e},exports.extname=function(r){return splitPath(r)[3]};var substr="b"==="ab".substr(-1)?function(r,t,e){return r.substr(t,e)}:function(r,t,e){return 0>t&&(t=r.length+t),r.substr(t,e)};

}).call(this,require('_process'))
},{"_process":244}],241:[function(require,module,exports){
function pathtoRegexp(e,n,t){t=t||{},n=n||[];var r,o=t.strict,a=t.end!==!1,f=t.sensitive?"":"i",i=0,p=n.length,g=0,s=0;if(e instanceof RegExp){for(;r=MATCHING_GROUP_REGEXP.exec(e.source);)n.push({name:s++,optional:!1,offset:r.index});return e}if(Array.isArray(e))return e=e.map(function(e){return pathtoRegexp(e,n,t).source}),new RegExp("(?:"+e.join("|")+")",f);for(e=("^"+e+(o?"":"/"===e[e.length-1]?"?":"/?")).replace(/\/\(/g,"/(?:").replace(/([\/\.])/g,"\\$1").replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g,function(e,t,r,o,a,f,p,g){t=t||"",r=r||"",a=a||"([^\\/"+r+"]+?)",p=p||"",n.push({name:o,optional:!!p,offset:g+i});var s=""+(p?"":t)+"(?:"+r+(p?t:"")+a+(f?"((?:[\\/"+r+"].+?)?)":"")+")"+p;return i+=s.length-e.length,s}).replace(/\*/g,function(e,t){for(var r=n.length;r-- >p&&n[r].offset>t;)n[r].offset+=3;return"(.*)"});r=MATCHING_GROUP_REGEXP.exec(e);){for(var c=0,l=r.index;"\\"===e.charAt(--l);)c++;c%2!==1&&((p+g===n.length||n[p+g].offset>r.index)&&n.splice(p+g,0,{name:s++,optional:!1,offset:r.index}),g++)}return e+=a?"$":"/"===e[e.length-1]?"":"(?=\\/|$)",new RegExp(e,f)}module.exports=pathtoRegexp;var MATCHING_GROUP_REGEXP=/\((?!\?)/g;

},{}],242:[function(require,module,exports){
(function (Buffer){
function pbkdf2(e,r,t,f,n,o){if("function"==typeof n&&(o=n,n=void 0),"function"!=typeof o)throw new Error("No callback provided to pbkdf2");var a=pbkdf2Sync(e,r,t,f,n);setTimeout(function(){o(void 0,a)})}function pbkdf2Sync(e,r,t,f,n){if("number"!=typeof t)throw new TypeError("Iterations not a number");if(0>t)throw new TypeError("Bad iterations");if("number"!=typeof f)throw new TypeError("Key length not a number");if(0>f||f>MAX_ALLOC)throw new TypeError("Bad key length");n=n||"sha1",Buffer.isBuffer(e)||(e=new Buffer(e,"binary")),Buffer.isBuffer(r)||(r=new Buffer(r,"binary"));var o,a=1,i=new Buffer(f),p=new Buffer(r.length+4);r.copy(p,0,0,r.length);for(var c,u,y=1;a>=y;y++){p.writeUInt32BE(y,r.length);var d=createHmac(n,e).update(p).digest();o||(o=d.length,u=new Buffer(o),a=Math.ceil(f/o),c=f-(a-1)*o),d.copy(u,0,0,o);for(var w=1;t>w;w++){d=createHmac(n,e).update(d).digest();for(var b=0;o>b;b++)u[b]^=d[b]}var h=(y-1)*o,B=y===a?c:o;u.copy(i,h,0,B)}return i}var createHmac=require("create-hmac"),MAX_ALLOC=Math.pow(2,30)-1;exports.pbkdf2=pbkdf2,exports.pbkdf2Sync=pbkdf2Sync;

}).call(this,require("buffer").Buffer)
},{"buffer":112,"create-hmac":125}],243:[function(require,module,exports){
(function (process){
"use strict";function nextTick(e){for(var s=new Array(arguments.length-1),n=0;n<s.length;)s[n++]=arguments[n];process.nextTick(function(){e.apply(null,s)})}!process.version||0===process.version.indexOf("v0.")||0===process.version.indexOf("v1.")&&0!==process.version.indexOf("v1.8.")?module.exports=nextTick:module.exports=process.nextTick;

}).call(this,require('_process'))
},{"_process":244}],244:[function(require,module,exports){
function cleanUpNextTick(){draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue()}function drainQueue(){if(!draining){var e=setTimeout(cleanUpNextTick);draining=!0;for(var n=queue.length;n;){for(currentQueue=queue,queue=[];++queueIndex<n;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,n=queue.length}currentQueue=null,draining=!1,clearTimeout(e)}}function Item(e,n){this.fun=e,this.array=n}function noop(){}var process=module.exports={},queue=[],draining=!1,currentQueue,queueIndex=-1;process.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)n[r-1]=arguments[r];queue.push(new Item(e,n)),1!==queue.length||draining||setTimeout(drainQueue,0)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};

},{}],245:[function(require,module,exports){
"use strict";function alladdrs(r,e){var i=forwarded(r);if(!e)return i;"function"!=typeof e&&(e=compile(e));for(var t=0;t<i.length-1;t++)e(i[t],t)||(i.length=t+1);return i}function compile(r){if(!r)throw new TypeError("argument is required");var e="string"==typeof r?[r]:r;if(!Array.isArray(e))throw new TypeError("unsupported trust argument");for(var i=0;i<e.length;i++)r=e[i],ipranges.hasOwnProperty(r)&&(r=ipranges[r],e.splice.apply(e,[i,1].concat(r)),i+=r.length-1);return compileTrust(compileRangeSubnets(e))}function compileRangeSubnets(r){for(var e=new Array(r.length),i=0;i<r.length;i++)e[i]=parseipNotation(r[i]);return e}function compileTrust(r){var e=r.length;return 0===e?trustNone:1===e?trustSingle(r[0]):trustMulti(r)}function parseipNotation(r){var e,i,t,n,a=r.lastIndexOf("/");if(e=-1!==a?r.substring(0,a):r,!isip(e))throw new TypeError("invalid IP address: "+e);if(e=parseip(e),i=e.kind(),t="ipv6"===i?128:32,n=-1!==a?r.substring(a+1,r.length):t,"number"!=typeof n&&(n=digitre.test(n)?parseInt(n,10):isip(n)?parseNetmask(n):0),"ipv6"===e.kind()&&e.isIPv4MappedAddress()&&(e=e.toIPv4Address(),n=t>=n?n-96:n),0>=n||n>t)throw new TypeError("invalid range on address: "+r);return[e,n]}function parseNetmask(r){var e,i,t=parseip(r);switch(t.kind()){case"ipv4":e=t.octets,i=8;break;case"ipv6":e=t.parts,i=16}for(var n,a=Math.pow(2,i)-1,s=0,p=0;p<e.length;p++){n=e[p]&a;{if(n!==a){for(;n;)n=n<<1&a,s+=1;break}s+=i}}return s}function proxyaddr(r,e){if(!r)throw new TypeError("req argument is required");if(!e)throw new TypeError("trust argument is required");var i=alladdrs(r,e),t=i[i.length-1];return t}function trustNone(){return!1}function trustMulti(r){return function(e){if(!isip(e))return!1;for(var i,t,n,a,s,p,o=parseip(e),u=o.kind(),d=0;d<r.length;d++){if(t=r[d],n=t[0],a=n.kind(),s=t[1],p=o,u!==a){if("ipv6"!==u||"ipv4"!==a||!o.isIPv4MappedAddress())continue;i=i||o.toIPv4Address(),p=i}if(p.match(n,s))return!0}return!1}}function trustSingle(r){var e=r[0],i=e.kind(),t="ipv4"===i,n=r[1];return function(r){if(!isip(r))return!1;var a=parseip(r),s=a.kind();return s===i?a.match(e,n):t&&"ipv6"===s&&a.isIPv4MappedAddress()?a.toIPv4Address().match(e,n):!1}}module.exports=proxyaddr,module.exports.all=alladdrs,module.exports.compile=compile;var forwarded=require("forwarded"),ipaddr=require("ipaddr.js"),digitre=/^[0-9]+$/,isip=ipaddr.isValid,parseip=ipaddr.parse,ipranges={linklocal:["169.254.0.0/16","fe80::/10"],loopback:["127.0.0.1/8","::1/128"],uniquelocal:["10.0.0.0/8","172.16.0.0/12","192.168.0.0/16","fc00::/7"]};

},{"forwarded":181,"ipaddr.js":214}],246:[function(require,module,exports){
exports.publicEncrypt=require("./publicEncrypt"),exports.privateDecrypt=require("./privateDecrypt"),exports.privateEncrypt=function(r,p){return exports.publicEncrypt(r,p,!0)},exports.publicDecrypt=function(r,p){return exports.privateDecrypt(r,p,!0)};

},{"./privateDecrypt":248,"./publicEncrypt":249}],247:[function(require,module,exports){
(function (Buffer){
function i2ops(e){var r=new Buffer(4);return r.writeUInt32BE(e,0),r}var createHash=require("create-hash");module.exports=function(e,r){for(var t,a=new Buffer(""),n=0;a.length<r;)t=i2ops(n++),a=Buffer.concat([a,createHash("sha1").update(e).update(t).digest()]);return a.slice(0,r)};

}).call(this,require("buffer").Buffer)
},{"buffer":112,"create-hash":122}],248:[function(require,module,exports){
(function (Buffer){
function oaep(r,e){var n=(r.modulus,r.modulus.byteLength()),t=(e.length,createHash("sha1").update(new Buffer("")).digest()),i=t.length;if(0!==e[0])throw new Error("decryption error");var o=e.slice(1,i+1),u=e.slice(i+1),a=xor(o,mgf(u,i)),c=xor(u,mgf(a,n-i-1));if(compare(t,c.slice(0,i)))throw new Error("decryption error");for(var f=i;0===c[f];)f++;if(1!==c[f++])throw new Error("decryption error");return c.slice(f)}function pkcs1(r,e,n){for(var t=e.slice(0,2),i=2,o=0;0!==e[i++];)if(i>=e.length){o++;break}var u=e.slice(2,i-1);e.slice(i-1,i);if(("0002"!==t.toString("hex")&&!n||"0001"!==t.toString("hex")&&n)&&o++,u.length<8&&o++,o)throw new Error("decryption error");return e.slice(i)}function compare(r,e){r=new Buffer(r),e=new Buffer(e);var n=0,t=r.length;r.length!==e.length&&(n++,t=Math.min(r.length,e.length));for(var i=-1;++i<t;)n+=r[i]^e[i];return n}var parseKeys=require("parse-asn1"),mgf=require("./mgf"),xor=require("./xor"),bn=require("bn.js"),crt=require("browserify-rsa"),createHash=require("create-hash"),withPublic=require("./withPublic");module.exports=function(r,e,n){var t;t=r.padding?r.padding:n?1:4;var i=parseKeys(r),o=i.modulus.byteLength();if(e.length>o||new bn(e).cmp(i.modulus)>=0)throw new Error("decryption error");var u;u=n?withPublic(new bn(e),i):crt(e,i);var a=new Buffer(o-u.length);if(a.fill(0),u=Buffer.concat([a,u],o),4===t)return oaep(i,u);if(1===t)return pkcs1(i,u,n);if(3===t)return u;throw new Error("unknown padding")};

}).call(this,require("buffer").Buffer)
},{"./mgf":247,"./withPublic":250,"./xor":251,"bn.js":83,"browserify-rsa":104,"buffer":112,"create-hash":122,"parse-asn1":237}],249:[function(require,module,exports){
(function (Buffer){
function oaep(e,r){var n=e.modulus.byteLength(),o=r.length,t=createHash("sha1").update(new Buffer("")).digest(),f=t.length,u=2*f;if(o>n-u-2)throw new Error("message too long");var a=new Buffer(n-o-u-2);a.fill(0);var s=n-f-1,i=randomBytes(f),w=xor(Buffer.concat([t,a,new Buffer([1]),r],s),mgf(i,s)),c=xor(i,mgf(w,f));return new bn(Buffer.concat([new Buffer([0]),c,w],n))}function pkcs1(e,r,n){var o=r.length,t=e.modulus.byteLength();if(o>t-11)throw new Error("message too long");var f;return n?(f=new Buffer(t-o-3),f.fill(255)):f=nonZero(t-o-3),new bn(Buffer.concat([new Buffer([0,n?1:2]),f,new Buffer([0]),r],t))}function nonZero(e,r){for(var n,o=new Buffer(e),t=0,f=randomBytes(2*e),u=0;e>t;)u===f.length&&(f=randomBytes(2*e),u=0),n=f[u++],n&&(o[t++]=n);return o}var parseKeys=require("parse-asn1"),randomBytes=require("randombytes"),createHash=require("create-hash"),mgf=require("./mgf"),xor=require("./xor"),bn=require("bn.js"),withPublic=require("./withPublic"),crt=require("browserify-rsa"),constants={RSA_PKCS1_OAEP_PADDING:4,RSA_PKCS1_PADDIN:1,RSA_NO_PADDING:3};module.exports=function(e,r,n){var o;o=e.padding?e.padding:n?1:4;var t,f=parseKeys(e);if(4===o)t=oaep(f,r);else if(1===o)t=pkcs1(f,r,n);else{if(3!==o)throw new Error("unknown padding");if(t=new bn(r),t.cmp(f.modulus)>=0)throw new Error("data too long for modulus")}return n?crt(t,f):withPublic(t,f)};

}).call(this,require("buffer").Buffer)
},{"./mgf":247,"./withPublic":250,"./xor":251,"bn.js":83,"browserify-rsa":104,"buffer":112,"create-hash":122,"parse-asn1":237,"randombytes":256}],250:[function(require,module,exports){
(function (Buffer){
function withPublic(e,n){return new Buffer(e.toRed(bn.mont(n.modulus)).redPow(new bn(n.publicExponent)).fromRed().toArray())}var bn=require("bn.js");module.exports=withPublic;

}).call(this,require("buffer").Buffer)
},{"bn.js":83,"buffer":112}],251:[function(require,module,exports){
module.exports=function(r,e){for(var n=r.length,o=-1;++o<n;)r[o]^=e[o];return r};

},{}],252:[function(require,module,exports){
(function (global){
!function(e){function o(e){throw new RangeError(T[e])}function n(e,o){for(var n=e.length,r=[];n--;)r[n]=o(e[n]);return r}function r(e,o){var r=e.split("@"),t="";r.length>1&&(t=r[0]+"@",e=r[1]),e=e.replace(S,".");var u=e.split("."),i=n(u,o).join(".");return t+i}function t(e){for(var o,n,r=[],t=0,u=e.length;u>t;)o=e.charCodeAt(t++),o>=55296&&56319>=o&&u>t?(n=e.charCodeAt(t++),56320==(64512&n)?r.push(((1023&o)<<10)+(1023&n)+65536):(r.push(o),t--)):r.push(o);return r}function u(e){return n(e,function(e){var o="";return e>65535&&(e-=65536,o+=P(e>>>10&1023|55296),e=56320|1023&e),o+=P(e)}).join("")}function i(e){return 10>e-48?e-22:26>e-65?e-65:26>e-97?e-97:b}function f(e,o){return e+22+75*(26>e)-((0!=o)<<5)}function c(e,o,n){var r=0;for(e=n?M(e/j):e>>1,e+=M(e/o);e>L*C>>1;r+=b)e=M(e/L);return M(r+(L+1)*e/(e+m))}function l(e){var n,r,t,f,l,s,d,a,p,h,v=[],g=e.length,w=0,m=I,j=A;for(r=e.lastIndexOf(E),0>r&&(r=0),t=0;r>t;++t)e.charCodeAt(t)>=128&&o("not-basic"),v.push(e.charCodeAt(t));for(f=r>0?r+1:0;g>f;){for(l=w,s=1,d=b;f>=g&&o("invalid-input"),a=i(e.charCodeAt(f++)),(a>=b||a>M((x-w)/s))&&o("overflow"),w+=a*s,p=j>=d?y:d>=j+C?C:d-j,!(p>a);d+=b)h=b-p,s>M(x/h)&&o("overflow"),s*=h;n=v.length+1,j=c(w-l,n,0==l),M(w/n)>x-m&&o("overflow"),m+=M(w/n),w%=n,v.splice(w++,0,m)}return u(v)}function s(e){var n,r,u,i,l,s,d,a,p,h,v,g,w,m,j,F=[];for(e=t(e),g=e.length,n=I,r=0,l=A,s=0;g>s;++s)v=e[s],128>v&&F.push(P(v));for(u=i=F.length,i&&F.push(E);g>u;){for(d=x,s=0;g>s;++s)v=e[s],v>=n&&d>v&&(d=v);for(w=u+1,d-n>M((x-r)/w)&&o("overflow"),r+=(d-n)*w,n=d,s=0;g>s;++s)if(v=e[s],n>v&&++r>x&&o("overflow"),v==n){for(a=r,p=b;h=l>=p?y:p>=l+C?C:p-l,!(h>a);p+=b)j=a-h,m=b-h,F.push(P(f(h+j%m,0))),a=M(j/m);F.push(P(f(a,0))),l=c(r,w,u==i),r=0,++u}++r,++n}return F.join("")}function d(e){return r(e,function(e){return F.test(e)?l(e.slice(4).toLowerCase()):e})}function a(e){return r(e,function(e){return O.test(e)?"xn--"+s(e):e})}var p="object"==typeof exports&&exports&&!exports.nodeType&&exports,h="object"==typeof module&&module&&!module.nodeType&&module,v="object"==typeof global&&global;v.global!==v&&v.window!==v&&v.self!==v||(e=v);var g,w,x=2147483647,b=36,y=1,C=26,m=38,j=700,A=72,I=128,E="-",F=/^xn--/,O=/[^\x20-\x7E]/,S=/[\x2E\u3002\uFF0E\uFF61]/g,T={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},L=b-y,M=Math.floor,P=String.fromCharCode;if(g={version:"1.4.1",ucs2:{decode:t,encode:u},decode:l,encode:s,toASCII:a,toUnicode:d},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return g});else if(p&&h)if(module.exports==p)h.exports=g;else for(w in g)g.hasOwnProperty(w)&&(p[w]=g[w]);else e.punycode=g}(this);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],253:[function(require,module,exports){
"use strict";function hasOwnProperty(r,e){return Object.prototype.hasOwnProperty.call(r,e)}module.exports=function(r,e,t,n){e=e||"&",t=t||"=";var o={};if("string"!=typeof r||0===r.length)return o;var a=/\+/g;r=r.split(e);var s=1e3;n&&"number"==typeof n.maxKeys&&(s=n.maxKeys);var p=r.length;s>0&&p>s&&(p=s);for(var y=0;p>y;++y){var u,c,i,l,f=r[y].replace(a,"%20"),v=f.indexOf(t);v>=0?(u=f.substr(0,v),c=f.substr(v+1)):(u=f,c=""),i=decodeURIComponent(u),l=decodeURIComponent(c),hasOwnProperty(o,i)?isArray(o[i])?o[i].push(l):o[i]=[o[i],l]:o[i]=l}return o};var isArray=Array.isArray||function(r){return"[object Array]"===Object.prototype.toString.call(r)};

},{}],254:[function(require,module,exports){
"use strict";function map(r,e){if(r.map)return r.map(e);for(var t=[],n=0;n<r.length;n++)t.push(e(r[n],n));return t}var stringifyPrimitive=function(r){switch(typeof r){case"string":return r;case"boolean":return r?"true":"false";case"number":return isFinite(r)?r:"";default:return""}};module.exports=function(r,e,t,n){return e=e||"&",t=t||"=",null===r&&(r=void 0),"object"==typeof r?map(objectKeys(r),function(n){var i=encodeURIComponent(stringifyPrimitive(n))+t;return isArray(r[n])?map(r[n],function(r){return i+encodeURIComponent(stringifyPrimitive(r))}).join(e):i+encodeURIComponent(stringifyPrimitive(r[n]))}).join(e):n?encodeURIComponent(stringifyPrimitive(n))+t+encodeURIComponent(stringifyPrimitive(r)):""};var isArray=Array.isArray||function(r){return"[object Array]"===Object.prototype.toString.call(r)},objectKeys=Object.keys||function(r){var e=[];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&e.push(t);return e};

},{}],255:[function(require,module,exports){
"use strict";exports.decode=exports.parse=require("./decode"),exports.encode=exports.stringify=require("./encode");

},{"./decode":253,"./encode":254}],256:[function(require,module,exports){
(function (process,global,Buffer){
"use strict";function oldBrowser(){throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")}function randomBytes(r,o){if(r>65536)throw new Error("requested too many random bytes");var e=new global.Uint8Array(r);r>0&&crypto.getRandomValues(e);var t=new Buffer(e.buffer);return"function"==typeof o?process.nextTick(function(){o(null,t)}):t}var crypto=global.crypto||global.msCrypto;crypto&&crypto.getRandomValues?module.exports=randomBytes:module.exports=oldBrowser;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"_process":244,"buffer":112}],257:[function(require,module,exports){
"use strict";function rangeParser(r,e){var s=!0,a=e.indexOf("=");if(-1==a)return-2;var t=e.slice(a+1).split(",").map(function(e){var e=e.split("-"),a=parseInt(e[0],10),t=parseInt(e[1],10);return isNaN(a)?(a=r-t,t=r-1):isNaN(t)&&(t=r-1),t>r-1&&(t=r-1),(isNaN(a)||isNaN(t)||a>t||0>a)&&(s=!1),{start:a,end:t}});return t.type=e.slice(0,a),s?t:-1}module.exports=rangeParser;

},{}],258:[function(require,module,exports){
module.exports=require("./lib/_stream_duplex.js");

},{"./lib/_stream_duplex.js":259}],259:[function(require,module,exports){
"use strict";function Duplex(e){return this instanceof Duplex?(Readable.call(this,e),Writable.call(this,e),e&&e.readable===!1&&(this.readable=!1),e&&e.writable===!1&&(this.writable=!1),this.allowHalfOpen=!0,e&&e.allowHalfOpen===!1&&(this.allowHalfOpen=!1),void this.once("end",onend)):new Duplex(e)}function onend(){this.allowHalfOpen||this._writableState.ended||processNextTick(onEndNT,this)}function onEndNT(e){e.end()}function forEach(e,t){for(var r=0,i=e.length;i>r;r++)t(e[r],r)}var objectKeys=Object.keys||function(e){var t=[];for(var r in e)t.push(r);return t};module.exports=Duplex;var processNextTick=require("process-nextick-args"),util=require("core-util-is");util.inherits=require("inherits");var Readable=require("./_stream_readable"),Writable=require("./_stream_writable");util.inherits(Duplex,Readable);for(var keys=objectKeys(Writable.prototype),v=0;v<keys.length;v++){var method=keys[v];Duplex.prototype[method]||(Duplex.prototype[method]=Writable.prototype[method])}

},{"./_stream_readable":261,"./_stream_writable":263,"core-util-is":120,"inherits":213,"process-nextick-args":243}],260:[function(require,module,exports){
"use strict";function PassThrough(r){return this instanceof PassThrough?void Transform.call(this,r):new PassThrough(r)}module.exports=PassThrough;var Transform=require("./_stream_transform"),util=require("core-util-is");util.inherits=require("inherits"),util.inherits(PassThrough,Transform),PassThrough.prototype._transform=function(r,s,i){i(null,r)};

},{"./_stream_transform":262,"core-util-is":120,"inherits":213}],261:[function(require,module,exports){
(function (process){
"use strict";function ReadableState(e,t){Duplex=Duplex||require("./_stream_duplex"),e=e||{},this.objectMode=!!e.objectMode,t instanceof Duplex&&(this.objectMode=this.objectMode||!!e.readableObjectMode);var r=e.highWaterMark,n=this.objectMode?16:16384;this.highWaterMark=r||0===r?r:n,this.highWaterMark=~~this.highWaterMark,this.buffer=[],this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.defaultEncoding=e.defaultEncoding||"utf8",this.ranOut=!1,this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,e.encoding&&(StringDecoder||(StringDecoder=require("string_decoder/").StringDecoder),this.decoder=new StringDecoder(e.encoding),this.encoding=e.encoding)}function Readable(e){return Duplex=Duplex||require("./_stream_duplex"),this instanceof Readable?(this._readableState=new ReadableState(e,this),this.readable=!0,e&&"function"==typeof e.read&&(this._read=e.read),void Stream.call(this)):new Readable(e)}function readableAddChunk(e,t,r,n,a){var i=chunkInvalid(t,r);if(i)e.emit("error",i);else if(null===r)t.reading=!1,onEofChunk(e,t);else if(t.objectMode||r&&r.length>0)if(t.ended&&!a){var d=new Error("stream.push() after EOF");e.emit("error",d)}else if(t.endEmitted&&a){var d=new Error("stream.unshift() after end event");e.emit("error",d)}else{var o;!t.decoder||a||n||(r=t.decoder.write(r),o=!t.objectMode&&0===r.length),a||(t.reading=!1),o||(t.flowing&&0===t.length&&!t.sync?(e.emit("data",r),e.read(0)):(t.length+=t.objectMode?1:r.length,a?t.buffer.unshift(r):t.buffer.push(r),t.needReadable&&emitReadable(e))),maybeReadMore(e,t)}else a||(t.reading=!1);return needMoreData(t)}function needMoreData(e){return!e.ended&&(e.needReadable||e.length<e.highWaterMark||0===e.length)}function computeNewHighWaterMark(e){return e>=MAX_HWM?e=MAX_HWM:(e--,e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,e++),e}function howMuchToRead(e,t){return 0===t.length&&t.ended?0:t.objectMode?0===e?0:1:null===e||isNaN(e)?t.flowing&&t.buffer.length?t.buffer[0].length:t.length:0>=e?0:(e>t.highWaterMark&&(t.highWaterMark=computeNewHighWaterMark(e)),e>t.length?t.ended?t.length:(t.needReadable=!0,0):e)}function chunkInvalid(e,t){var r=null;return Buffer.isBuffer(t)||"string"==typeof t||null===t||void 0===t||e.objectMode||(r=new TypeError("Invalid non-string/buffer chunk")),r}function onEofChunk(e,t){if(!t.ended){if(t.decoder){var r=t.decoder.end();r&&r.length&&(t.buffer.push(r),t.length+=t.objectMode?1:r.length)}t.ended=!0,emitReadable(e)}}function emitReadable(e){var t=e._readableState;t.needReadable=!1,t.emittedReadable||(debug("emitReadable",t.flowing),t.emittedReadable=!0,t.sync?processNextTick(emitReadable_,e):emitReadable_(e))}function emitReadable_(e){debug("emit readable"),e.emit("readable"),flow(e)}function maybeReadMore(e,t){t.readingMore||(t.readingMore=!0,processNextTick(maybeReadMore_,e,t))}function maybeReadMore_(e,t){for(var r=t.length;!t.reading&&!t.flowing&&!t.ended&&t.length<t.highWaterMark&&(debug("maybeReadMore read 0"),e.read(0),r!==t.length);)r=t.length;t.readingMore=!1}function pipeOnDrain(e){return function(){var t=e._readableState;debug("pipeOnDrain",t.awaitDrain),t.awaitDrain&&t.awaitDrain--,0===t.awaitDrain&&EElistenerCount(e,"data")&&(t.flowing=!0,flow(e))}}function nReadingNextTick(e){debug("readable nexttick read 0"),e.read(0)}function resume(e,t){t.resumeScheduled||(t.resumeScheduled=!0,processNextTick(resume_,e,t))}function resume_(e,t){t.reading||(debug("resume read 0"),e.read(0)),t.resumeScheduled=!1,e.emit("resume"),flow(e),t.flowing&&!t.reading&&e.read(0)}function flow(e){var t=e._readableState;if(debug("flow",t.flowing),t.flowing)do var r=e.read();while(null!==r&&t.flowing)}function fromList(e,t){var r,n=t.buffer,a=t.length,i=!!t.decoder,d=!!t.objectMode;if(0===n.length)return null;if(0===a)r=null;else if(d)r=n.shift();else if(!e||e>=a)r=i?n.join(""):1===n.length?n[0]:Buffer.concat(n,a),n.length=0;else if(e<n[0].length){var o=n[0];r=o.slice(0,e),n[0]=o.slice(e)}else if(e===n[0].length)r=n.shift();else{r=i?"":new Buffer(e);for(var l=0,u=0,s=n.length;s>u&&e>l;u++){var o=n[0],h=Math.min(e-l,o.length);i?r+=o.slice(0,h):o.copy(r,l,0,h),h<o.length?n[0]=o.slice(h):n.shift(),l+=h}}return r}function endReadable(e){var t=e._readableState;if(t.length>0)throw new Error("endReadable called on non-empty stream");t.endEmitted||(t.ended=!0,processNextTick(endReadableNT,t,e))}function endReadableNT(e,t){e.endEmitted||0!==e.length||(e.endEmitted=!0,t.readable=!1,t.emit("end"))}function forEach(e,t){for(var r=0,n=e.length;n>r;r++)t(e[r],r)}function indexOf(e,t){for(var r=0,n=e.length;n>r;r++)if(e[r]===t)return r;return-1}module.exports=Readable;var processNextTick=require("process-nextick-args"),isArray=require("isarray"),Buffer=require("buffer").Buffer;Readable.ReadableState=ReadableState;var EE=require("events"),EElistenerCount=function(e,t){return e.listeners(t).length},Stream;!function(){try{Stream=require("stream")}catch(e){}finally{Stream||(Stream=require("events").EventEmitter)}}();var Buffer=require("buffer").Buffer,util=require("core-util-is");util.inherits=require("inherits");var debugUtil=require("util"),debug=void 0;debug=debugUtil&&debugUtil.debuglog?debugUtil.debuglog("stream"):function(){};var StringDecoder;util.inherits(Readable,Stream);var Duplex,Duplex;Readable.prototype.push=function(e,t){var r=this._readableState;return r.objectMode||"string"!=typeof e||(t=t||r.defaultEncoding,t!==r.encoding&&(e=new Buffer(e,t),t="")),readableAddChunk(this,r,e,t,!1)},Readable.prototype.unshift=function(e){var t=this._readableState;return readableAddChunk(this,t,e,"",!0)},Readable.prototype.isPaused=function(){return this._readableState.flowing===!1},Readable.prototype.setEncoding=function(e){return StringDecoder||(StringDecoder=require("string_decoder/").StringDecoder),this._readableState.decoder=new StringDecoder(e),this._readableState.encoding=e,this};var MAX_HWM=8388608;Readable.prototype.read=function(e){debug("read",e);var t=this._readableState,r=e;if(("number"!=typeof e||e>0)&&(t.emittedReadable=!1),0===e&&t.needReadable&&(t.length>=t.highWaterMark||t.ended))return debug("read: emitReadable",t.length,t.ended),0===t.length&&t.ended?endReadable(this):emitReadable(this),null;if(e=howMuchToRead(e,t),0===e&&t.ended)return 0===t.length&&endReadable(this),null;var n=t.needReadable;debug("need readable",n),(0===t.length||t.length-e<t.highWaterMark)&&(n=!0,debug("length less than watermark",n)),(t.ended||t.reading)&&(n=!1,debug("reading or ended",n)),n&&(debug("do read"),t.reading=!0,t.sync=!0,0===t.length&&(t.needReadable=!0),this._read(t.highWaterMark),t.sync=!1),n&&!t.reading&&(e=howMuchToRead(r,t));var a;return a=e>0?fromList(e,t):null,null===a&&(t.needReadable=!0,e=0),t.length-=e,0!==t.length||t.ended||(t.needReadable=!0),r!==e&&t.ended&&0===t.length&&endReadable(this),null!==a&&this.emit("data",a),a},Readable.prototype._read=function(e){this.emit("error",new Error("not implemented"))},Readable.prototype.pipe=function(e,t){function r(e){debug("onunpipe"),e===s&&a()}function n(){debug("onend"),e.end()}function a(){debug("cleanup"),e.removeListener("close",o),e.removeListener("finish",l),e.removeListener("drain",c),e.removeListener("error",d),e.removeListener("unpipe",r),s.removeListener("end",n),s.removeListener("end",a),s.removeListener("data",i),b=!0,!h.awaitDrain||e._writableState&&!e._writableState.needDrain||c()}function i(t){debug("ondata");var r=e.write(t);!1===r&&(1!==h.pipesCount||h.pipes[0]!==e||1!==s.listenerCount("data")||b||(debug("false write response, pause",s._readableState.awaitDrain),s._readableState.awaitDrain++),s.pause())}function d(t){debug("onerror",t),u(),e.removeListener("error",d),0===EElistenerCount(e,"error")&&e.emit("error",t)}function o(){e.removeListener("finish",l),u()}function l(){debug("onfinish"),e.removeListener("close",o),u()}function u(){debug("unpipe"),s.unpipe(e)}var s=this,h=this._readableState;switch(h.pipesCount){case 0:h.pipes=e;break;case 1:h.pipes=[h.pipes,e];break;default:h.pipes.push(e)}h.pipesCount+=1,debug("pipe count=%d opts=%j",h.pipesCount,t);var f=(!t||t.end!==!1)&&e!==process.stdout&&e!==process.stderr,p=f?n:a;h.endEmitted?processNextTick(p):s.once("end",p),e.on("unpipe",r);var c=pipeOnDrain(s);e.on("drain",c);var b=!1;return s.on("data",i),e._events&&e._events.error?isArray(e._events.error)?e._events.error.unshift(d):e._events.error=[d,e._events.error]:e.on("error",d),e.once("close",o),e.once("finish",l),e.emit("pipe",s),h.flowing||(debug("pipe resume"),s.resume()),e},Readable.prototype.unpipe=function(e){var t=this._readableState;if(0===t.pipesCount)return this;if(1===t.pipesCount)return e&&e!==t.pipes?this:(e||(e=t.pipes),t.pipes=null,t.pipesCount=0,t.flowing=!1,e&&e.emit("unpipe",this),this);if(!e){var r=t.pipes,n=t.pipesCount;t.pipes=null,t.pipesCount=0,t.flowing=!1;for(var a=0;n>a;a++)r[a].emit("unpipe",this);return this}var i=indexOf(t.pipes,e);return-1===i?this:(t.pipes.splice(i,1),t.pipesCount-=1,1===t.pipesCount&&(t.pipes=t.pipes[0]),e.emit("unpipe",this),this)},Readable.prototype.on=function(e,t){var r=Stream.prototype.on.call(this,e,t);if("data"===e&&!1!==this._readableState.flowing&&this.resume(),"readable"===e&&!this._readableState.endEmitted){var n=this._readableState;n.readableListening||(n.readableListening=!0,n.emittedReadable=!1,n.needReadable=!0,n.reading?n.length&&emitReadable(this,n):processNextTick(nReadingNextTick,this))}return r},Readable.prototype.addListener=Readable.prototype.on,Readable.prototype.resume=function(){var e=this._readableState;return e.flowing||(debug("resume"),e.flowing=!0,resume(this,e)),this},Readable.prototype.pause=function(){return debug("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(debug("pause"),this._readableState.flowing=!1,this.emit("pause")),this},Readable.prototype.wrap=function(e){var t=this._readableState,r=!1,n=this;e.on("end",function(){if(debug("wrapped end"),t.decoder&&!t.ended){var e=t.decoder.end();e&&e.length&&n.push(e)}n.push(null)}),e.on("data",function(a){if(debug("wrapped data"),t.decoder&&(a=t.decoder.write(a)),(!t.objectMode||null!==a&&void 0!==a)&&(t.objectMode||a&&a.length)){var i=n.push(a);i||(r=!0,e.pause())}});for(var a in e)void 0===this[a]&&"function"==typeof e[a]&&(this[a]=function(t){return function(){return e[t].apply(e,arguments)}}(a));var i=["error","close","destroy","pause","resume"];return forEach(i,function(t){e.on(t,n.emit.bind(n,t))}),n._read=function(t){debug("wrapped _read",t),r&&(r=!1,e.resume())},n},Readable._fromList=fromList;

}).call(this,require('_process'))
},{"./_stream_duplex":259,"_process":244,"buffer":112,"core-util-is":120,"events":161,"inherits":213,"isarray":264,"process-nextick-args":243,"stream":282,"string_decoder/":287,"util":85}],262:[function(require,module,exports){
"use strict";function TransformState(r){this.afterTransform=function(t,n){return afterTransform(r,t,n)},this.needTransform=!1,this.transforming=!1,this.writecb=null,this.writechunk=null,this.writeencoding=null}function afterTransform(r,t,n){var e=r._transformState;e.transforming=!1;var i=e.writecb;if(!i)return r.emit("error",new Error("no writecb in Transform class"));e.writechunk=null,e.writecb=null,null!==n&&void 0!==n&&r.push(n),i(t);var a=r._readableState;a.reading=!1,(a.needReadable||a.length<a.highWaterMark)&&r._read(a.highWaterMark)}function Transform(r){if(!(this instanceof Transform))return new Transform(r);Duplex.call(this,r),this._transformState=new TransformState(this);var t=this;this._readableState.needReadable=!0,this._readableState.sync=!1,r&&("function"==typeof r.transform&&(this._transform=r.transform),"function"==typeof r.flush&&(this._flush=r.flush)),this.once("prefinish",function(){"function"==typeof this._flush?this._flush(function(r){done(t,r)}):done(t)})}function done(r,t){if(t)return r.emit("error",t);var n=r._writableState,e=r._transformState;if(n.length)throw new Error("calling transform done when ws.length != 0");if(e.transforming)throw new Error("calling transform done when still transforming");return r.push(null)}module.exports=Transform;var Duplex=require("./_stream_duplex"),util=require("core-util-is");util.inherits=require("inherits"),util.inherits(Transform,Duplex),Transform.prototype.push=function(r,t){return this._transformState.needTransform=!1,Duplex.prototype.push.call(this,r,t)},Transform.prototype._transform=function(r,t,n){throw new Error("not implemented")},Transform.prototype._write=function(r,t,n){var e=this._transformState;if(e.writecb=n,e.writechunk=r,e.writeencoding=t,!e.transforming){var i=this._readableState;(e.needTransform||i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}},Transform.prototype._read=function(r){var t=this._transformState;null!==t.writechunk&&t.writecb&&!t.transforming?(t.transforming=!0,this._transform(t.writechunk,t.writeencoding,t.afterTransform)):t.needTransform=!0};

},{"./_stream_duplex":259,"core-util-is":120,"inherits":213}],263:[function(require,module,exports){
(function (process){
"use strict";function nop(){}function WriteReq(e,t,r){this.chunk=e,this.encoding=t,this.callback=r,this.next=null}function WritableState(e,t){Duplex=Duplex||require("./_stream_duplex"),e=e||{},this.objectMode=!!e.objectMode,t instanceof Duplex&&(this.objectMode=this.objectMode||!!e.writableObjectMode);var r=e.highWaterMark,i=this.objectMode?16:16384;this.highWaterMark=r||0===r?r:i,this.highWaterMark=~~this.highWaterMark,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1;var n=e.decodeStrings===!1;this.decodeStrings=!n,this.defaultEncoding=e.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(e){onwrite(t,e)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.bufferedRequestCount=0,this.corkedRequestsFree=new CorkedRequest(this),this.corkedRequestsFree.next=new CorkedRequest(this)}function Writable(e){return Duplex=Duplex||require("./_stream_duplex"),this instanceof Writable||this instanceof Duplex?(this._writableState=new WritableState(e,this),this.writable=!0,e&&("function"==typeof e.write&&(this._write=e.write),"function"==typeof e.writev&&(this._writev=e.writev)),void Stream.call(this)):new Writable(e)}function writeAfterEnd(e,t){var r=new Error("write after end");e.emit("error",r),processNextTick(t,r)}function validChunk(e,t,r,i){var n=!0;if(!Buffer.isBuffer(r)&&"string"!=typeof r&&null!==r&&void 0!==r&&!t.objectMode){var s=new TypeError("Invalid non-string/buffer chunk");e.emit("error",s),processNextTick(i,s),n=!1}return n}function decodeChunk(e,t,r){return e.objectMode||e.decodeStrings===!1||"string"!=typeof t||(t=new Buffer(t,r)),t}function writeOrBuffer(e,t,r,i,n){r=decodeChunk(t,r,i),Buffer.isBuffer(r)&&(i="buffer");var s=t.objectMode?1:r.length;t.length+=s;var f=t.length<t.highWaterMark;if(f||(t.needDrain=!0),t.writing||t.corked){var u=t.lastBufferedRequest;t.lastBufferedRequest=new WriteReq(r,i,n),u?u.next=t.lastBufferedRequest:t.bufferedRequest=t.lastBufferedRequest,t.bufferedRequestCount+=1}else doWrite(e,t,!1,s,r,i,n);return f}function doWrite(e,t,r,i,n,s,f){t.writelen=i,t.writecb=f,t.writing=!0,t.sync=!0,r?e._writev(n,t.onwrite):e._write(n,s,t.onwrite),t.sync=!1}function onwriteError(e,t,r,i,n){--t.pendingcb,r?processNextTick(n,i):n(i),e._writableState.errorEmitted=!0,e.emit("error",i)}function onwriteStateUpdate(e){e.writing=!1,e.writecb=null,e.length-=e.writelen,e.writelen=0}function onwrite(e,t){var r=e._writableState,i=r.sync,n=r.writecb;if(onwriteStateUpdate(r),t)onwriteError(e,r,i,t,n);else{var s=needFinish(r);s||r.corked||r.bufferProcessing||!r.bufferedRequest||clearBuffer(e,r),i?asyncWrite(afterWrite,e,r,s,n):afterWrite(e,r,s,n)}}function afterWrite(e,t,r,i){r||onwriteDrain(e,t),t.pendingcb--,i(),finishMaybe(e,t)}function onwriteDrain(e,t){0===t.length&&t.needDrain&&(t.needDrain=!1,e.emit("drain"))}function clearBuffer(e,t){t.bufferProcessing=!0;var r=t.bufferedRequest;if(e._writev&&r&&r.next){var i=t.bufferedRequestCount,n=new Array(i),s=t.corkedRequestsFree;s.entry=r;for(var f=0;r;)n[f]=r,r=r.next,f+=1;doWrite(e,t,!0,t.length,n,"",s.finish),t.pendingcb++,t.lastBufferedRequest=null,t.corkedRequestsFree=s.next,s.next=null}else{for(;r;){var u=r.chunk,o=r.encoding,a=r.callback,c=t.objectMode?1:u.length;if(doWrite(e,t,!1,c,u,o,a),r=r.next,t.writing)break}null===r&&(t.lastBufferedRequest=null)}t.bufferedRequestCount=0,t.bufferedRequest=r,t.bufferProcessing=!1}function needFinish(e){return e.ending&&0===e.length&&null===e.bufferedRequest&&!e.finished&&!e.writing}function prefinish(e,t){t.prefinished||(t.prefinished=!0,e.emit("prefinish"))}function finishMaybe(e,t){var r=needFinish(t);return r&&(0===t.pendingcb?(prefinish(e,t),t.finished=!0,e.emit("finish")):prefinish(e,t)),r}function endWritable(e,t,r){t.ending=!0,finishMaybe(e,t),r&&(t.finished?processNextTick(r):e.once("finish",r)),t.ended=!0,e.writable=!1}function CorkedRequest(e){var t=this;this.next=null,this.entry=null,this.finish=function(r){var i=t.entry;for(t.entry=null;i;){var n=i.callback;e.pendingcb--,n(r),i=i.next}e.corkedRequestsFree?e.corkedRequestsFree.next=t:e.corkedRequestsFree=t}}module.exports=Writable;var processNextTick=require("process-nextick-args"),asyncWrite=!process.browser&&["v0.10","v0.9."].indexOf(process.version.slice(0,5))>-1?setImmediate:processNextTick,Buffer=require("buffer").Buffer;Writable.WritableState=WritableState;var util=require("core-util-is");util.inherits=require("inherits");var internalUtil={deprecate:require("util-deprecate")},Stream;!function(){try{Stream=require("stream")}catch(e){}finally{Stream||(Stream=require("events").EventEmitter)}}();var Buffer=require("buffer").Buffer;util.inherits(Writable,Stream);var Duplex;WritableState.prototype.getBuffer=function(){for(var e=this.bufferedRequest,t=[];e;)t.push(e),e=e.next;return t},function(){try{Object.defineProperty(WritableState.prototype,"buffer",{get:internalUtil.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")})}catch(e){}}();var Duplex;Writable.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe. Not readable."))},Writable.prototype.write=function(e,t,r){var i=this._writableState,n=!1;return"function"==typeof t&&(r=t,t=null),Buffer.isBuffer(e)?t="buffer":t||(t=i.defaultEncoding),"function"!=typeof r&&(r=nop),i.ended?writeAfterEnd(this,r):validChunk(this,i,e,r)&&(i.pendingcb++,n=writeOrBuffer(this,i,e,t,r)),n},Writable.prototype.cork=function(){var e=this._writableState;e.corked++},Writable.prototype.uncork=function(){var e=this._writableState;e.corked&&(e.corked--,e.writing||e.corked||e.finished||e.bufferProcessing||!e.bufferedRequest||clearBuffer(this,e))},Writable.prototype.setDefaultEncoding=function(e){if("string"==typeof e&&(e=e.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((e+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+e);this._writableState.defaultEncoding=e},Writable.prototype._write=function(e,t,r){r(new Error("not implemented"))},Writable.prototype._writev=null,Writable.prototype.end=function(e,t,r){var i=this._writableState;"function"==typeof e?(r=e,e=null,t=null):"function"==typeof t&&(r=t,t=null),null!==e&&void 0!==e&&this.write(e,t),i.corked&&(i.corked=1,this.uncork()),i.ending||i.finished||endWritable(this,i,r)};

}).call(this,require('_process'))
},{"./_stream_duplex":259,"_process":244,"buffer":112,"core-util-is":120,"events":161,"inherits":213,"process-nextick-args":243,"stream":282,"util-deprecate":294}],264:[function(require,module,exports){
var toString={}.toString;module.exports=Array.isArray||function(r){return"[object Array]"==toString.call(r)};

},{}],265:[function(require,module,exports){
module.exports=require("./lib/_stream_passthrough.js");

},{"./lib/_stream_passthrough.js":260}],266:[function(require,module,exports){
var Stream=function(){try{return require("stream")}catch(r){}}();exports=module.exports=require("./lib/_stream_readable.js"),exports.Stream=Stream||exports,exports.Readable=exports,exports.Writable=require("./lib/_stream_writable.js"),exports.Duplex=require("./lib/_stream_duplex.js"),exports.Transform=require("./lib/_stream_transform.js"),exports.PassThrough=require("./lib/_stream_passthrough.js");

},{"./lib/_stream_duplex.js":259,"./lib/_stream_passthrough.js":260,"./lib/_stream_readable.js":261,"./lib/_stream_transform.js":262,"./lib/_stream_writable.js":263,"stream":282}],267:[function(require,module,exports){
module.exports=require("./lib/_stream_transform.js");

},{"./lib/_stream_transform.js":262}],268:[function(require,module,exports){
module.exports=require("./lib/_stream_writable.js");

},{"./lib/_stream_writable.js":263}],269:[function(require,module,exports){
(function (Buffer){
function bytesToWords(r){for(var f=[],n=0,t=0;n<r.length;n++,t+=8)f[t>>>5]|=r[n]<<24-t%32;return f}function wordsToBytes(r){for(var f=[],n=0;n<32*r.length;n+=8)f.push(r[n>>>5]>>>24-n%32&255);return f}function processBlock(r,f,n){for(var t=0;16>t;t++){var o=n+t,e=f[o];f[o]=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8)}var u,l,s,h,c,i,a,v,d,p;i=u=r[0],a=l=r[1],v=s=r[2],d=h=r[3],p=c=r[4];var g;for(t=0;80>t;t+=1)g=u+f[n+zl[t]]|0,g+=16>t?f1(l,s,h)+hl[0]:32>t?f2(l,s,h)+hl[1]:48>t?f3(l,s,h)+hl[2]:64>t?f4(l,s,h)+hl[3]:f5(l,s,h)+hl[4],g=0|g,g=rotl(g,sl[t]),g=g+c|0,u=c,c=h,h=rotl(s,10),s=l,l=g,g=i+f[n+zr[t]]|0,g+=16>t?f5(a,v,d)+hr[0]:32>t?f4(a,v,d)+hr[1]:48>t?f3(a,v,d)+hr[2]:64>t?f2(a,v,d)+hr[3]:f1(a,v,d)+hr[4],g=0|g,g=rotl(g,sr[t]),g=g+p|0,i=p,p=d,d=rotl(v,10),v=a,a=g;g=r[1]+s+d|0,r[1]=r[2]+h+p|0,r[2]=r[3]+c+i|0,r[3]=r[4]+u+a|0,r[4]=r[0]+l+v|0,r[0]=g}function f1(r,f,n){return r^f^n}function f2(r,f,n){return r&f|~r&n}function f3(r,f,n){return(r|~f)^n}function f4(r,f,n){return r&n|f&~n}function f5(r,f,n){return r^(f|~n)}function rotl(r,f){return r<<f|r>>>32-f}function ripemd160(r){var f=[1732584193,4023233417,2562383102,271733878,3285377520];"string"==typeof r&&(r=new Buffer(r,"utf8"));var n=bytesToWords(r),t=8*r.length,o=8*r.length;n[t>>>5]|=128<<24-t%32,n[(t+64>>>9<<4)+14]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8);for(var e=0;e<n.length;e+=16)processBlock(f,n,e);for(e=0;5>e;e++){var u=f[e];f[e]=16711935&(u<<8|u>>>24)|4278255360&(u<<24|u>>>8)}var l=wordsToBytes(f);return new Buffer(l)}var zl=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],zr=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],sl=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],sr=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11],hl=[0,1518500249,1859775393,2400959708,2840853838],hr=[1352829926,1548603684,1836072691,2053994217,0];module.exports=ripemd160;

}).call(this,require("buffer").Buffer)
},{"buffer":112}],270:[function(require,module,exports){
(function (Buffer){
"use strict";function send(e,t,r){return new SendStream(e,t,r)}function SendStream(e,t,r){var i=r||{};if(this.options=i,this.path=t,this.req=e,this._etag=void 0!==i.etag?Boolean(i.etag):!0,this._dotfiles=void 0!==i.dotfiles?i.dotfiles:"ignore","ignore"!==this._dotfiles&&"allow"!==this._dotfiles&&"deny"!==this._dotfiles)throw new TypeError('dotfiles option must be "allow", "deny", or "ignore"');this._hidden=Boolean(i.hidden),void 0!==i.hidden&&deprecate("hidden: use dotfiles: '"+(this._hidden?"allow":"ignore")+"' instead"),void 0===i.dotfiles&&(this._dotfiles=void 0),this._extensions=void 0!==i.extensions?normalizeList(i.extensions,"extensions option"):[],this._index=void 0!==i.index?normalizeList(i.index,"index option"):["index.html"],this._lastModified=void 0!==i.lastModified?Boolean(i.lastModified):!0,this._maxage=i.maxAge||i.maxage,this._maxage="string"==typeof this._maxage?ms(this._maxage):Number(this._maxage),this._maxage=isNaN(this._maxage)?0:Math.min(Math.max(0,this._maxage),maxMaxAge),this._root=i.root?resolve(i.root):null,!this._root&&i.from&&this.from(i.from)}function containsDotFile(e){for(var t=0;t<e.length;t++)if("."===e[t][0])return!0;return!1}function decode(e){try{return decodeURIComponent(e)}catch(t){return-1}}function normalizeList(e,t){for(var r=[].concat(e||[]),i=0;i<r.length;i++)if("string"!=typeof r[i])throw new TypeError(t+" must be array of strings or false");return r}var createError=require("http-errors"),debug=require("debug")("send"),deprecate=require("depd")("send"),destroy=require("destroy"),escapeHtml=require("escape-html"),parseRange=require("range-parser"),Stream=require("stream"),mime=require("mime"),fresh=require("fresh"),path=require("path"),fs=require("fs"),normalize=path.normalize,join=path.join,etag=require("etag"),EventEmitter=require("events").EventEmitter,ms=require("ms"),onFinished=require("on-finished"),statuses=require("statuses"),extname=path.extname,maxMaxAge=31536e6,resolve=path.resolve,sep=path.sep,toString=Object.prototype.toString,upPathRegexp=/(?:^|[\\\/])\.\.(?:[\\\/]|$)/;module.exports=send,module.exports.mime=mime;var listenerCount=EventEmitter.listenerCount||function(e,t){return e.listeners(t).length};SendStream.prototype.__proto__=Stream.prototype,SendStream.prototype.etag=deprecate["function"](function(e){return e=Boolean(e),debug("etag %s",e),this._etag=e,this},"send.etag: pass etag as option"),SendStream.prototype.hidden=deprecate["function"](function(e){return e=Boolean(e),debug("hidden %s",e),this._hidden=e,this._dotfiles=void 0,this},"send.hidden: use dotfiles option"),SendStream.prototype.index=deprecate["function"](function e(t){var e=t?normalizeList(t,"paths argument"):[];return debug("index %o",t),this._index=e,this},"send.index: pass index as option"),SendStream.prototype.root=function(e){return e=String(e),this._root=resolve(e),this},SendStream.prototype.from=deprecate["function"](SendStream.prototype.root,"send.from: pass root as option"),SendStream.prototype.root=deprecate["function"](SendStream.prototype.root,"send.root: pass root as option"),SendStream.prototype.maxage=deprecate["function"](function(e){return e="string"==typeof e?ms(e):Number(e),isNaN(e)&&(e=0),1/0==e&&(e=31536e6),debug("max-age %d",e),this._maxage=e,this},"send.maxage: pass maxAge as option"),SendStream.prototype.error=function t(e,t){if(0!==listenerCount(this,"error"))return this.emit("error",createError(t,e,{expose:!1}));var r=this.res,i=statuses[e];r._headers=null,r.statusCode=e,r.setHeader("Content-Type","text/plain; charset=UTF-8"),r.setHeader("Content-Length",Buffer.byteLength(i)),r.setHeader("X-Content-Type-Options","nosniff"),r.end(i)},SendStream.prototype.hasTrailingSlash=function(){return"/"==this.path[this.path.length-1]},SendStream.prototype.isConditionalGET=function(){return this.req.headers["if-none-match"]||this.req.headers["if-modified-since"]},SendStream.prototype.removeContentHeaderFields=function(){for(var e=this.res,t=Object.keys(e._headers||{}),r=0;r<t.length;r++){var i=t[r];"content-"===i.substr(0,8)&&"content-location"!==i&&e.removeHeader(i)}},SendStream.prototype.notModified=function(){var e=this.res;debug("not modified"),this.removeContentHeaderFields(),e.statusCode=304,e.end()},SendStream.prototype.headersAlreadySent=function(){var e=new Error("Can't set headers after they are sent.");debug("headers already sent"),this.error(500,e)},SendStream.prototype.isCachable=function(){var e=this.res;return e.statusCode>=200&&e.statusCode<300||304==e.statusCode},SendStream.prototype.onStatError=function(e){switch(e.code){case"ENAMETOOLONG":case"ENOENT":case"ENOTDIR":this.error(404,e);break;default:this.error(500,e)}},SendStream.prototype.isFresh=function(){return fresh(this.req.headers,this.res._headers)},SendStream.prototype.isRangeFresh=function(){var e=this.req.headers["if-range"];return e?~e.indexOf('"')?~e.indexOf(this.res._headers.etag):Date.parse(this.res._headers["last-modified"])<=Date.parse(e):!0},SendStream.prototype.redirect=function(e){if(0!==listenerCount(this,"directory"))return void this.emit("directory");if(this.hasTrailingSlash())return void this.error(403);var t=e+"/",r='Redirecting to <a href="'+escapeHtml(t)+'">'+escapeHtml(t)+"</a>\n",i=this.res;i.statusCode=301,i.setHeader("Content-Type","text/html; charset=UTF-8"),i.setHeader("Content-Length",Buffer.byteLength(r)),i.setHeader("X-Content-Type-Options","nosniff"),i.setHeader("Location",t),i.end(r)},SendStream.prototype.pipe=function(e){var t=this._root;this.res=e;var r=decode(this.path);if(-1===r)return this.error(400);if(~r.indexOf("\x00"))return this.error(400);var i;if(null!==t){if(upPathRegexp.test(normalize("."+sep+r)))return debug('malicious path "%s"',r),this.error(403);r=normalize(join(t,r)),t=normalize(t+sep),i=r.substr(t.length).split(sep)}else{if(upPathRegexp.test(r))return debug('malicious path "%s"',r),this.error(403);i=normalize(r).split(sep),r=resolve(r)}if(containsDotFile(i)){var n=this._dotfiles;switch(void 0===n&&(n="."===i[i.length-1][0]?this._hidden?"allow":"ignore":"allow"),debug('%s dotfile "%s"',n,r),n){case"allow":break;case"deny":return this.error(403);case"ignore":default:return this.error(404)}}return this._index.length&&"/"===this.path[this.path.length-1]?(this.sendIndex(r),e):(this.sendFile(r),e)},SendStream.prototype.send=function(e,t){var r=t.size,i=this.options,n={},s=this.res,o=this.req,a=o.headers.range,d=i.start||0;if(s._header)return this.headersAlreadySent();if(debug('pipe "%s"',e),this.setHeader(e,t),this.type(e),this.isConditionalGET()&&this.isCachable()&&this.isFresh())return this.notModified();if(r=Math.max(0,r-d),void 0!==i.end){var h=i.end-d+1;r>h&&(r=h)}if(a){if(a=parseRange(r,a),this.isRangeFresh()||(debug("range stale"),a=-2),-1==a)return debug("range unsatisfiable"),s.setHeader("Content-Range","bytes */"+t.size),this.error(416);-2!=a&&1===a.length&&(debug("range %j",a),s.statusCode=206,s.setHeader("Content-Range","bytes "+a[0].start+"-"+a[0].end+"/"+r),d+=a[0].start,r=a[0].end-a[0].start+1)}for(var p in i)n[p]=i[p];return n.start=d,n.end=Math.max(d,d+r-1),s.setHeader("Content-Length",r),"HEAD"==o.method?s.end():void this.stream(e,n)},SendStream.prototype.sendFile=function(e){function t(n){if(i._extensions.length<=r)return n?i.onStatError(n):i.error(404);var s=e+"."+i._extensions[r++];debug('stat "%s"',s),fs.stat(s,function(e,r){return e?t(e):r.isDirectory()?t():(i.emit("file",s,r),void i.send(s,r))})}var r=0,i=this;debug('stat "%s"',e),fs.stat(e,function(r,n){return r&&"ENOENT"===r.code&&!extname(e)&&e[e.length-1]!==sep?t(r):r?i.onStatError(r):n.isDirectory()?i.redirect(i.path):(i.emit("file",e,n),void i.send(e,n))})},SendStream.prototype.sendIndex=function(e){function t(n){if(++r>=i._index.length)return n?i.onStatError(n):i.error(404);var s=join(e,i._index[r]);debug('stat "%s"',s),fs.stat(s,function(e,r){return e?t(e):r.isDirectory()?t():(i.emit("file",s,r),void i.send(s,r))})}var r=-1,i=this;t()},SendStream.prototype.stream=function(e,t){var r=!1,i=this,n=this.res,s=(this.req,fs.createReadStream(e,t));this.emit("stream",s),s.pipe(n),onFinished(n,function(){r=!0,destroy(s)}),s.on("error",function(e){r||(r=!0,destroy(s),i.onStatError(e))}),s.on("end",function(){i.emit("end")})},SendStream.prototype.type=function(e){var t=this.res;if(!t.getHeader("Content-Type")){var r=mime.lookup(e),i=mime.charsets.lookup(r);debug("content-type %s",r),t.setHeader("Content-Type",r+(i?"; charset="+i:""))}},SendStream.prototype.setHeader=function(e,t){var r=this.res;if(this.emit("headers",r,e,t),r.getHeader("Accept-Ranges")||r.setHeader("Accept-Ranges","bytes"),r.getHeader("Cache-Control")||r.setHeader("Cache-Control","public, max-age="+Math.floor(this._maxage/1e3)),this._lastModified&&!r.getHeader("Last-Modified")){var i=t.mtime.toUTCString();debug("modified %s",i),r.setHeader("Last-Modified",i)}if(this._etag&&!r.getHeader("ETag")){var n=etag(t);debug("etag %s",n),r.setHeader("ETag",n)}};

}).call(this,require("buffer").Buffer)
},{"buffer":112,"debug":127,"depd":129,"destroy":136,"escape-html":159,"etag":160,"events":161,"fresh":182,"fs":110,"http-errors":210,"mime":224,"ms":227,"on-finished":233,"path":240,"range-parser":257,"statuses":281,"stream":282}],271:[function(require,module,exports){
(function (Buffer){
"use strict";function serveStatic(e,r){if(!e)throw new TypeError("root path required");if("string"!=typeof e)throw new TypeError("root path must be a string");var t=Object.create(r||null),n=t.fallthrough!==!1,o=t.redirect!==!1,a=t.setHeaders;if(a&&"function"!=typeof a)throw new TypeError("option setHeaders must be function");t.maxage=t.maxage||t.maxAge||0,t.root=resolve(e);var s=o?createRedirectDirectoryListener():createNotFoundDirectoryListener();return function(e,r,o){if("GET"!==e.method&&"HEAD"!==e.method)return n?o():(r.statusCode=405,r.setHeader("Allow","GET, HEAD"),r.setHeader("Content-Length","0"),void r.end());var i=!n,u=parseUrl.original(e),l=parseUrl(e).pathname;"/"===l&&"/"!==u.pathname.substr(-1)&&(l="");var c=send(e,l,t);c.on("directory",s),a&&c.on("headers",a),n&&c.on("file",function(){i=!0}),c.on("error",function(e){return!i&&e.statusCode<500?void o():void o(e)}),c.pipe(r)}}function collapseLeadingSlashes(e){for(var r=0;r<e.length&&"/"===e[r];r++);return r>1?"/"+e.substr(r):e}function createNotFoundDirectoryListener(){return function(){this.error(404)}}function createRedirectDirectoryListener(){return function(){if(this.hasTrailingSlash())return void this.error(404);var e=parseUrl.original(this.req);e.path=null,e.pathname=collapseLeadingSlashes(e.pathname+"/");var r=url.format(e),t='Redirecting to <a href="'+escapeHtml(r)+'">'+escapeHtml(r)+"</a>\n",n=this.res;n.statusCode=303,n.setHeader("Content-Type","text/html; charset=UTF-8"),n.setHeader("Content-Length",Buffer.byteLength(t)),n.setHeader("X-Content-Type-Options","nosniff"),n.setHeader("Location",r),n.end(t)}}var escapeHtml=require("escape-html"),parseUrl=require("parseurl"),resolve=require("path").resolve,send=require("send"),url=require("url");module.exports=serveStatic,module.exports.mime=send.mime;

}).call(this,require("buffer").Buffer)
},{"buffer":112,"escape-html":159,"parseurl":239,"path":240,"send":270,"url":292}],272:[function(require,module,exports){
(function (Buffer){
function Hash(t,i){this._block=new Buffer(t),this._finalSize=i,this._blockSize=t,this._len=0,this._s=0}Hash.prototype.update=function(t,i){"string"==typeof t&&(i=i||"utf8",t=new Buffer(t,i));for(var s=this._len+=t.length,e=this._s||0,h=0,o=this._block;s>e;){for(var l=Math.min(t.length,h+this._blockSize-e%this._blockSize),_=l-h,n=0;_>n;n++)o[e%this._blockSize+n]=t[n+h];e+=_,h+=_,e%this._blockSize===0&&this._update(o)}return this._s=e,this},Hash.prototype.digest=function(t){var i=8*this._len;this._block[this._len%this._blockSize]=128,this._block.fill(0,this._len%this._blockSize+1),i%(8*this._blockSize)>=8*this._finalSize&&(this._update(this._block),this._block.fill(0)),this._block.writeInt32BE(i,this._blockSize-4);var s=this._update(this._block)||this._hash();return t?s.toString(t):s},Hash.prototype._update=function(){throw new Error("_update must be implemented by subclass")},module.exports=Hash;

}).call(this,require("buffer").Buffer)
},{"buffer":112}],273:[function(require,module,exports){
var exports=module.exports=function(e){e=e.toLowerCase();var r=exports[e];if(!r)throw new Error(e+" is not supported (we accept pull requests)");return new r};exports.sha=require("./sha"),exports.sha1=require("./sha1"),exports.sha224=require("./sha224"),exports.sha256=require("./sha256"),exports.sha384=require("./sha384"),exports.sha512=require("./sha512");

},{"./sha":274,"./sha1":275,"./sha224":276,"./sha256":277,"./sha384":278,"./sha512":279}],274:[function(require,module,exports){
(function (Buffer){
function Sha(){this.init(),this._w=W,Hash.call(this,64,56)}function rotl5(t){return t<<5|t>>>27}function rotl30(t){return t<<30|t>>>2}function ft(t,i,h,r){return 0===t?i&h|~i&r:2===t?i&h|i&r|h&r:i^h^r}var inherits=require("inherits"),Hash=require("./hash"),K=[1518500249,1859775393,-1894007588,-899497514],W=new Array(80);inherits(Sha,Hash),Sha.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},Sha.prototype._update=function(t){for(var i=this._w,h=0|this._a,r=0|this._b,s=0|this._c,e=0|this._d,n=0|this._e,_=0;16>_;++_)i[_]=t.readInt32BE(4*_);for(;80>_;++_)i[_]=i[_-3]^i[_-8]^i[_-14]^i[_-16];for(var a=0;80>a;++a){var o=~~(a/20),u=rotl5(h)+ft(o,r,s,e)+n+i[a]+K[o]|0;n=e,e=s,s=rotl30(r),r=h,h=u}this._a=h+this._a|0,this._b=r+this._b|0,this._c=s+this._c|0,this._d=e+this._d|0,this._e=n+this._e|0},Sha.prototype._hash=function(){var t=new Buffer(20);return t.writeInt32BE(0|this._a,0),t.writeInt32BE(0|this._b,4),t.writeInt32BE(0|this._c,8),t.writeInt32BE(0|this._d,12),t.writeInt32BE(0|this._e,16),t},module.exports=Sha;

}).call(this,require("buffer").Buffer)
},{"./hash":272,"buffer":112,"inherits":213}],275:[function(require,module,exports){
(function (Buffer){
function Sha1(){this.init(),this._w=W,Hash.call(this,64,56)}function rotl1(t){return t<<1|t>>>31}function rotl5(t){return t<<5|t>>>27}function rotl30(t){return t<<30|t>>>2}function ft(t,i,h,r){return 0===t?i&h|~i&r:2===t?i&h|i&r|h&r:i^h^r}var inherits=require("inherits"),Hash=require("./hash"),K=[1518500249,1859775393,-1894007588,-899497514],W=new Array(80);inherits(Sha1,Hash),Sha1.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},Sha1.prototype._update=function(t){for(var i=this._w,h=0|this._a,r=0|this._b,s=0|this._c,n=0|this._d,e=0|this._e,_=0;16>_;++_)i[_]=t.readInt32BE(4*_);for(;80>_;++_)i[_]=rotl1(i[_-3]^i[_-8]^i[_-14]^i[_-16]);for(var a=0;80>a;++a){var o=~~(a/20),u=rotl5(h)+ft(o,r,s,n)+e+i[a]+K[o]|0;e=n,n=s,s=rotl30(r),r=h,h=u}this._a=h+this._a|0,this._b=r+this._b|0,this._c=s+this._c|0,this._d=n+this._d|0,this._e=e+this._e|0},Sha1.prototype._hash=function(){var t=new Buffer(20);return t.writeInt32BE(0|this._a,0),t.writeInt32BE(0|this._b,4),t.writeInt32BE(0|this._c,8),t.writeInt32BE(0|this._d,12),t.writeInt32BE(0|this._e,16),t},module.exports=Sha1;

}).call(this,require("buffer").Buffer)
},{"./hash":272,"buffer":112,"inherits":213}],276:[function(require,module,exports){
(function (Buffer){
function Sha224(){this.init(),this._w=W,Hash.call(this,64,56)}var inherits=require("inherits"),Sha256=require("./sha256"),Hash=require("./hash"),W=new Array(64);inherits(Sha224,Sha256),Sha224.prototype.init=function(){return this._a=3238371032,this._b=914150663,this._c=812702999,this._d=4144912697,this._e=4290775857,this._f=1750603025,this._g=1694076839,this._h=3204075428,this},Sha224.prototype._hash=function(){var t=new Buffer(28);return t.writeInt32BE(this._a,0),t.writeInt32BE(this._b,4),t.writeInt32BE(this._c,8),t.writeInt32BE(this._d,12),t.writeInt32BE(this._e,16),t.writeInt32BE(this._f,20),t.writeInt32BE(this._g,24),t},module.exports=Sha224;

}).call(this,require("buffer").Buffer)
},{"./hash":272,"./sha256":277,"buffer":112,"inherits":213}],277:[function(require,module,exports){
(function (Buffer){
function Sha256(){this.init(),this._w=W,Hash.call(this,64,56)}function ch(t,i,h){return h^t&(i^h)}function maj(t,i,h){return t&i|h&(t|i)}function sigma0(t){return(t>>>2|t<<30)^(t>>>13|t<<19)^(t>>>22|t<<10)}function sigma1(t){return(t>>>6|t<<26)^(t>>>11|t<<21)^(t>>>25|t<<7)}function gamma0(t){return(t>>>7|t<<25)^(t>>>18|t<<14)^t>>>3}function gamma1(t){return(t>>>17|t<<15)^(t>>>19|t<<13)^t>>>10}var inherits=require("inherits"),Hash=require("./hash"),K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],W=new Array(64);inherits(Sha256,Hash),Sha256.prototype.init=function(){return this._a=1779033703,this._b=3144134277,this._c=1013904242,this._d=2773480762,this._e=1359893119,this._f=2600822924,this._g=528734635,this._h=1541459225,this},Sha256.prototype._update=function(t){for(var i=this._w,h=0|this._a,s=0|this._b,r=0|this._c,n=0|this._d,_=0|this._e,a=0|this._f,e=0|this._g,u=0|this._h,o=0;16>o;++o)i[o]=t.readInt32BE(4*o);for(;64>o;++o)i[o]=gamma1(i[o-2])+i[o-7]+gamma0(i[o-15])+i[o-16]|0;for(var f=0;64>f;++f){var c=u+sigma1(_)+ch(_,a,e)+K[f]+i[f]|0,m=sigma0(h)+maj(h,s,r)|0;u=e,e=a,a=_,_=n+c|0,n=r,r=s,s=h,h=c+m|0}this._a=h+this._a|0,this._b=s+this._b|0,this._c=r+this._c|0,this._d=n+this._d|0,this._e=_+this._e|0,this._f=a+this._f|0,this._g=e+this._g|0,this._h=u+this._h|0},Sha256.prototype._hash=function(){var t=new Buffer(32);return t.writeInt32BE(this._a,0),t.writeInt32BE(this._b,4),t.writeInt32BE(this._c,8),t.writeInt32BE(this._d,12),t.writeInt32BE(this._e,16),t.writeInt32BE(this._f,20),t.writeInt32BE(this._g,24),t.writeInt32BE(this._h,28),t},module.exports=Sha256;

}).call(this,require("buffer").Buffer)
},{"./hash":272,"buffer":112,"inherits":213}],278:[function(require,module,exports){
(function (Buffer){
function Sha384(){this.init(),this._w=W,Hash.call(this,128,112)}var inherits=require("inherits"),SHA512=require("./sha512"),Hash=require("./hash"),W=new Array(160);inherits(Sha384,SHA512),Sha384.prototype.init=function(){return this._ah=3418070365,this._bh=1654270250,this._ch=2438529370,this._dh=355462360,this._eh=1731405415,this._fh=2394180231,this._gh=3675008525,this._hh=1203062813,this._al=3238371032,this._bl=914150663,this._cl=812702999,this._dl=4144912697,this._el=4290775857,this._fl=1750603025,this._gl=1694076839,this._hl=3204075428,this},Sha384.prototype._hash=function(){function h(h,i,s){t.writeInt32BE(h,s),t.writeInt32BE(i,s+4)}var t=new Buffer(48);return h(this._ah,this._al,0),h(this._bh,this._bl,8),h(this._ch,this._cl,16),h(this._dh,this._dl,24),h(this._eh,this._el,32),h(this._fh,this._fl,40),t},module.exports=Sha384;

}).call(this,require("buffer").Buffer)
},{"./hash":272,"./sha512":279,"buffer":112,"inherits":213}],279:[function(require,module,exports){
(function (Buffer){
function Sha512(){this.init(),this._w=W,Hash.call(this,128,112)}function Ch(h,t,i){return i^h&(t^i)}function maj(h,t,i){return h&t|i&(h|t)}function sigma0(h,t){return(h>>>28|t<<4)^(t>>>2|h<<30)^(t>>>7|h<<25)}function sigma1(h,t){return(h>>>14|t<<18)^(h>>>18|t<<14)^(t>>>9|h<<23)}function Gamma0(h,t){return(h>>>1|t<<31)^(h>>>8|t<<24)^h>>>7}function Gamma0l(h,t){return(h>>>1|t<<31)^(h>>>8|t<<24)^(h>>>7|t<<25)}function Gamma1(h,t){return(h>>>19|t<<13)^(t>>>29|h<<3)^h>>>6}function Gamma1l(h,t){return(h>>>19|t<<13)^(t>>>29|h<<3)^(h>>>6|t<<26)}function getCarry(h,t){return t>>>0>h>>>0?1:0}var inherits=require("inherits"),Hash=require("./hash"),K=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],W=new Array(160);inherits(Sha512,Hash),Sha512.prototype.init=function(){return this._ah=1779033703,this._bh=3144134277,this._ch=1013904242,this._dh=2773480762,this._eh=1359893119,this._fh=2600822924,this._gh=528734635,this._hh=1541459225,this._al=4089235720,this._bl=2227873595,this._cl=4271175723,this._dl=1595750129,this._el=2917565137,this._fl=725511199,this._gl=4215389547,this._hl=327033209,this},Sha512.prototype._update=function(h){for(var t=this._w,i=0|this._ah,s=0|this._bh,_=0|this._ch,r=0|this._dh,a=0|this._eh,e=0|this._fh,l=0|this._gh,n=0|this._hh,g=0|this._al,f=0|this._bl,u=0|this._cl,c=0|this._dl,m=0|this._el,o=0|this._fl,y=0|this._gl,C=0|this._hl,d=0;32>d;d+=2)t[d]=h.readInt32BE(4*d),t[d+1]=h.readInt32BE(4*d+4);for(;160>d;d+=2){var b=t[d-30],p=t[d-30+1],v=Gamma0(b,p),G=Gamma0l(p,b);b=t[d-4],p=t[d-4+1];var w=Gamma1(b,p),S=Gamma1l(p,b),B=t[d-14],E=t[d-14+1],I=t[d-32],j=t[d-32+1],H=G+E|0,q=v+B+getCarry(H,G)|0;H=H+S|0,q=q+w+getCarry(H,S)|0,H=H+j|0,q=q+I+getCarry(H,j)|0,t[d]=q,t[d+1]=H}for(var W=0;160>W;W+=2){q=t[W],H=t[W+1];var x=maj(i,s,_),A=maj(g,f,u),k=sigma0(i,g),z=sigma0(g,i),D=sigma1(a,m),F=sigma1(m,a),J=K[W],L=K[W+1],M=Ch(a,e,l),N=Ch(m,o,y),O=C+F|0,P=n+D+getCarry(O,C)|0;O=O+N|0,P=P+M+getCarry(O,N)|0,O=O+L|0,P=P+J+getCarry(O,L)|0,O=O+H|0,P=P+q+getCarry(O,H)|0;var Q=z+A|0,R=k+x+getCarry(Q,z)|0;n=l,C=y,l=e,y=o,e=a,o=m,m=c+O|0,a=r+P+getCarry(m,c)|0,r=_,c=u,_=s,u=f,s=i,f=g,g=O+Q|0,i=P+R+getCarry(g,O)|0}this._al=this._al+g|0,this._bl=this._bl+f|0,this._cl=this._cl+u|0,this._dl=this._dl+c|0,this._el=this._el+m|0,this._fl=this._fl+o|0,this._gl=this._gl+y|0,this._hl=this._hl+C|0,this._ah=this._ah+i+getCarry(this._al,g)|0,this._bh=this._bh+s+getCarry(this._bl,f)|0,this._ch=this._ch+_+getCarry(this._cl,u)|0,this._dh=this._dh+r+getCarry(this._dl,c)|0,this._eh=this._eh+a+getCarry(this._el,m)|0,this._fh=this._fh+e+getCarry(this._fl,o)|0,this._gh=this._gh+l+getCarry(this._gl,y)|0,this._hh=this._hh+n+getCarry(this._hl,C)|0},Sha512.prototype._hash=function(){function h(h,i,s){t.writeInt32BE(h,s),t.writeInt32BE(i,s+4)}var t=new Buffer(64);return h(this._ah,this._al,0),h(this._bh,this._bl,8),h(this._ch,this._cl,16),h(this._dh,this._dl,24),h(this._eh,this._el,32),h(this._fh,this._fl,40),h(this._gh,this._gl,48),h(this._hh,this._hl,56),t},module.exports=Sha512;

}).call(this,require("buffer").Buffer)
},{"./hash":272,"buffer":112,"inherits":213}],280:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"dup":59}],281:[function(require,module,exports){
function status(t){if("number"==typeof t){if(!status[t])throw new Error("invalid status code: "+t);return t}if("string"!=typeof t)throw new TypeError("code must be a number or string");var s=parseInt(t,10);if(!isNaN(s)){if(!status[s])throw new Error("invalid status code: "+s);return s}if(s=status[t.toLowerCase()],!s)throw new Error('invalid status message: "'+t+'"');return s}var codes=require("./codes.json");module.exports=status,status.codes=Object.keys(codes).map(function(t){t=~~t;var s=codes[t];return status[t]=s,status[s]=status[s.toLowerCase()]=t,t}),status.redirect={300:!0,301:!0,302:!0,303:!0,305:!0,307:!0,308:!0},status.empty={204:!0,205:!0,304:!0},status.retry={502:!0,503:!0,504:!0};

},{"./codes.json":280}],282:[function(require,module,exports){
function Stream(){EE.call(this)}module.exports=Stream;var EE=require("events").EventEmitter,inherits=require("inherits");inherits(Stream,EE),Stream.Readable=require("readable-stream/readable.js"),Stream.Writable=require("readable-stream/writable.js"),Stream.Duplex=require("readable-stream/duplex.js"),Stream.Transform=require("readable-stream/transform.js"),Stream.PassThrough=require("readable-stream/passthrough.js"),Stream.Stream=Stream,Stream.prototype.pipe=function(e,r){function t(r){e.writable&&!1===e.write(r)&&m.pause&&m.pause()}function n(){m.readable&&m.resume&&m.resume()}function a(){u||(u=!0,e.end())}function o(){u||(u=!0,"function"==typeof e.destroy&&e.destroy())}function i(e){if(s(),0===EE.listenerCount(this,"error"))throw e}function s(){m.removeListener("data",t),e.removeListener("drain",n),m.removeListener("end",a),m.removeListener("close",o),m.removeListener("error",i),e.removeListener("error",i),m.removeListener("end",s),m.removeListener("close",s),e.removeListener("close",s)}var m=this;m.on("data",t),e.on("drain",n),e._isStdio||r&&r.end===!1||(m.on("end",a),m.on("close",o));var u=!1;return m.on("error",i),e.on("error",i),m.on("end",s),m.on("close",s),e.on("close",s),e.emit("pipe",m),e};

},{"events":161,"inherits":213,"readable-stream/duplex.js":258,"readable-stream/passthrough.js":265,"readable-stream/readable.js":266,"readable-stream/transform.js":267,"readable-stream/writable.js":268}],283:[function(require,module,exports){
(function (global){
var ClientRequest=require("./lib/request"),extend=require("xtend"),statusCodes=require("builtin-status-codes"),url=require("url"),http=exports;http.request=function(t,e){t="string"==typeof t?url.parse(t):extend(t);var r=-1===global.location.protocol.search(/^https?:$/)?"http:":"",s=t.protocol||r,o=t.hostname||t.host,n=t.port,u=t.path||"/";o&&-1!==o.indexOf(":")&&(o="["+o+"]"),t.url=(o?s+"//"+o:"")+(n?":"+n:"")+u,t.method=(t.method||"GET").toUpperCase(),t.headers=t.headers||{};var C=new ClientRequest(t);return e&&C.on("response",e),C},http.get=function(t,e){var r=http.request(t,e);return r.end(),r},http.Agent=function(){},http.Agent.defaultMaxSockets=4,http.STATUS_CODES=statusCodes,http.METHODS=["CHECKOUT","CONNECT","COPY","DELETE","GET","HEAD","LOCK","M-SEARCH","MERGE","MKACTIVITY","MKCOL","MOVE","NOTIFY","OPTIONS","PATCH","POST","PROPFIND","PROPPATCH","PURGE","PUT","REPORT","SEARCH","SUBSCRIBE","TRACE","UNLOCK","UNSUBSCRIBE"];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./lib/request":285,"builtin-status-codes":114,"url":292,"xtend":300}],284:[function(require,module,exports){
(function (global){
function checkTypeSupport(e){try{return xhr.responseType=e,xhr.responseType===e}catch(r){}return!1}function isFunction(e){return"function"==typeof e}exports.fetch=isFunction(global.fetch)&&isFunction(global.ReadableByteStream),exports.blobConstructor=!1;try{new Blob([new ArrayBuffer(1)]),exports.blobConstructor=!0}catch(e){}var xhr=new global.XMLHttpRequest;xhr.open("GET",global.location.host?"/":"https://example.com");var haveArrayBuffer="undefined"!=typeof global.ArrayBuffer,haveSlice=haveArrayBuffer&&isFunction(global.ArrayBuffer.prototype.slice);exports.arraybuffer=haveArrayBuffer&&checkTypeSupport("arraybuffer"),exports.msstream=!exports.fetch&&haveSlice&&checkTypeSupport("ms-stream"),exports.mozchunkedarraybuffer=!exports.fetch&&haveArrayBuffer&&checkTypeSupport("moz-chunked-arraybuffer"),exports.overrideMimeType=isFunction(xhr.overrideMimeType),exports.vbArray=isFunction(global.VBArray),xhr=null;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],285:[function(require,module,exports){
(function (process,global,Buffer){
function decideMode(e){return capability.fetch?"fetch":capability.mozchunkedarraybuffer?"moz-chunked-arraybuffer":capability.msstream?"ms-stream":capability.arraybuffer&&e?"arraybuffer":capability.vbArray&&e?"text:vbarray":"text"}function statusValid(e){try{var t=e.status;return null!==t&&0!==t}catch(r){return!1}}var capability=require("./capability"),inherits=require("inherits"),response=require("./response"),stream=require("stream"),toArrayBuffer=require("to-arraybuffer"),IncomingMessage=response.IncomingMessage,rStates=response.readyStates,ClientRequest=module.exports=function(e){var t=this;stream.Writable.call(t),t._opts=e,t._body=[],t._headers={},e.auth&&t.setHeader("Authorization","Basic "+new Buffer(e.auth).toString("base64")),Object.keys(e.headers).forEach(function(r){t.setHeader(r,e.headers[r])});var r;if("prefer-streaming"===e.mode)r=!1;else if("allow-wrong-content-type"===e.mode)r=!capability.overrideMimeType;else{if(e.mode&&"default"!==e.mode&&"prefer-fast"!==e.mode)throw new Error("Invalid value for opts.mode");r=!0}t._mode=decideMode(r),t.on("finish",function(){t._onFinish()})};inherits(ClientRequest,stream.Writable),ClientRequest.prototype.setHeader=function(e,t){var r=this,o=e.toLowerCase();-1===unsafeHeaders.indexOf(o)&&(r._headers[o]={name:e,value:t})},ClientRequest.prototype.getHeader=function(e){var t=this;return t._headers[e.toLowerCase()].value},ClientRequest.prototype.removeHeader=function(e){var t=this;delete t._headers[e.toLowerCase()]},ClientRequest.prototype._onFinish=function(){var e=this;if(!e._destroyed){var t,r=e._opts,o=e._headers;if("POST"!==r.method&&"PUT"!==r.method&&"PATCH"!==r.method||(t=capability.blobConstructor?new global.Blob(e._body.map(function(e){return toArrayBuffer(e)}),{type:(o["content-type"]||{}).value||""}):Buffer.concat(e._body).toString()),"fetch"===e._mode){var n=Object.keys(o).map(function(e){return[o[e].name,o[e].value]});global.fetch(e._opts.url,{method:e._opts.method,headers:n,body:t,mode:"cors",credentials:r.withCredentials?"include":"same-origin"}).then(function(t){e._fetchResponse=t,e._connect()},function(t){e.emit("error",t)})}else{var s=e._xhr=new global.XMLHttpRequest;try{s.open(e._opts.method,e._opts.url,!0)}catch(i){return void process.nextTick(function(){e.emit("error",i)})}"responseType"in s&&(s.responseType=e._mode.split(":")[0]),"withCredentials"in s&&(s.withCredentials=!!r.withCredentials),"text"===e._mode&&"overrideMimeType"in s&&s.overrideMimeType("text/plain; charset=x-user-defined"),Object.keys(o).forEach(function(e){s.setRequestHeader(o[e].name,o[e].value)}),e._response=null,s.onreadystatechange=function(){switch(s.readyState){case rStates.LOADING:case rStates.DONE:e._onXHRProgress()}},"moz-chunked-arraybuffer"===e._mode&&(s.onprogress=function(){e._onXHRProgress()}),s.onerror=function(){e._destroyed||e.emit("error",new Error("XHR error"))};try{s.send(t)}catch(i){return void process.nextTick(function(){e.emit("error",i)})}}}},ClientRequest.prototype._onXHRProgress=function(){var e=this;statusValid(e._xhr)&&!e._destroyed&&(e._response||e._connect(),e._response._onXHRProgress())},ClientRequest.prototype._connect=function(){var e=this;e._destroyed||(e._response=new IncomingMessage(e._xhr,e._fetchResponse,e._mode),e.emit("response",e._response))},ClientRequest.prototype._write=function(e,t,r){var o=this;o._body.push(e),r()},ClientRequest.prototype.abort=ClientRequest.prototype.destroy=function(){var e=this;e._destroyed=!0,e._response&&(e._response._destroyed=!0),e._xhr&&e._xhr.abort()},ClientRequest.prototype.end=function(e,t,r){var o=this;"function"==typeof e&&(r=e,e=void 0),stream.Writable.prototype.end.call(o,e,t,r)},ClientRequest.prototype.flushHeaders=function(){},ClientRequest.prototype.setTimeout=function(){},ClientRequest.prototype.setNoDelay=function(){},ClientRequest.prototype.setSocketKeepAlive=function(){};var unsafeHeaders=["accept-charset","accept-encoding","access-control-request-headers","access-control-request-method","connection","content-length","cookie","cookie2","date","dnt","expect","host","keep-alive","origin","referer","te","trailer","transfer-encoding","upgrade","user-agent","via"];

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"./capability":284,"./response":286,"_process":244,"buffer":112,"inherits":213,"stream":282,"to-arraybuffer":288}],286:[function(require,module,exports){
(function (process,global,Buffer){
var capability=require("./capability"),inherits=require("inherits"),stream=require("stream"),rStates=exports.readyStates={UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4},IncomingMessage=exports.IncomingMessage=function(e,r,s){function a(){u.read().then(function(e){if(!t._destroyed){if(e.done)return void t.push(null);t.push(new Buffer(e.value)),a()}})}var t=this;if(stream.Readable.call(t),t._mode=s,t.headers={},t.rawHeaders=[],t.trailers={},t.rawTrailers=[],t.on("end",function(){process.nextTick(function(){t.emit("close")})}),"fetch"===s){t._fetchResponse=r,t.statusCode=r.status,t.statusMessage=r.statusText;for(var n,o,i=r.headers[Symbol.iterator]();n=(o=i.next()).value,!o.done;)t.headers[n[0].toLowerCase()]=n[1],t.rawHeaders.push(n[0],n[1]);var u=r.body.getReader();a()}else{t._xhr=e,t._pos=0,t.statusCode=e.status,t.statusMessage=e.statusText;var h=e.getAllResponseHeaders().split(/\r?\n/);if(h.forEach(function(e){var r=e.match(/^([^:]+):\s*(.*)/);if(r){var s=r[1].toLowerCase();"set-cookie"===s?(void 0===t.headers[s]&&(t.headers[s]=[]),t.headers[s].push(r[2])):void 0!==t.headers[s]?t.headers[s]+=", "+r[2]:t.headers[s]=r[2],t.rawHeaders.push(r[1],r[2])}}),t._charset="x-user-defined",!capability.overrideMimeType){var d=t.rawHeaders["mime-type"];if(d){var f=d.match(/;\s*charset=([^;])(;|$)/);f&&(t._charset=f[1].toLowerCase())}t._charset||(t._charset="utf-8")}}};inherits(IncomingMessage,stream.Readable),IncomingMessage.prototype._read=function(){},IncomingMessage.prototype._onXHRProgress=function(){var e=this,r=e._xhr,s=null;switch(e._mode){case"text:vbarray":if(r.readyState!==rStates.DONE)break;try{s=new global.VBArray(r.responseBody).toArray()}catch(a){}if(null!==s){e.push(new Buffer(s));break}case"text":try{s=r.responseText}catch(a){e._mode="text:vbarray";break}if(s.length>e._pos){var t=s.substr(e._pos);if("x-user-defined"===e._charset){for(var n=new Buffer(t.length),o=0;o<t.length;o++)n[o]=255&t.charCodeAt(o);e.push(n)}else e.push(t,e._charset);e._pos=s.length}break;case"arraybuffer":if(r.readyState!==rStates.DONE)break;s=r.response,e.push(new Buffer(new Uint8Array(s)));break;case"moz-chunked-arraybuffer":if(s=r.response,r.readyState!==rStates.LOADING||!s)break;e.push(new Buffer(new Uint8Array(s)));break;case"ms-stream":if(s=r.response,r.readyState!==rStates.LOADING)break;var i=new global.MSStreamReader;i.onprogress=function(){i.result.byteLength>e._pos&&(e.push(new Buffer(new Uint8Array(i.result.slice(e._pos)))),e._pos=i.result.byteLength)},i.onload=function(){e.push(null)},i.readAsArrayBuffer(s)}e._xhr.readyState===rStates.DONE&&"ms-stream"!==e._mode&&e.push(null)};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"./capability":284,"_process":244,"buffer":112,"inherits":213,"stream":282}],287:[function(require,module,exports){
function assertEncoding(e){if(e&&!isBufferEncoding(e))throw new Error("Unknown encoding: "+e)}function passThroughWrite(e){return e.toString(this.encoding)}function utf16DetectIncompleteChar(e){this.charReceived=e.length%2,this.charLength=this.charReceived?2:0}function base64DetectIncompleteChar(e){this.charReceived=e.length%3,this.charLength=this.charReceived?3:0}var Buffer=require("buffer").Buffer,isBufferEncoding=Buffer.isEncoding||function(e){switch(e&&e.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}},StringDecoder=exports.StringDecoder=function(e){switch(this.encoding=(e||"utf8").toLowerCase().replace(/[-_]/,""),assertEncoding(e),this.encoding){case"utf8":this.surrogateSize=3;break;case"ucs2":case"utf16le":this.surrogateSize=2,this.detectIncompleteChar=utf16DetectIncompleteChar;break;case"base64":this.surrogateSize=3,this.detectIncompleteChar=base64DetectIncompleteChar;break;default:return void(this.write=passThroughWrite)}this.charBuffer=new Buffer(6),this.charReceived=0,this.charLength=0};StringDecoder.prototype.write=function(e){for(var t="";this.charLength;){var r=e.length>=this.charLength-this.charReceived?this.charLength-this.charReceived:e.length;if(e.copy(this.charBuffer,this.charReceived,0,r),this.charReceived+=r,this.charReceived<this.charLength)return"";e=e.slice(r,e.length),t=this.charBuffer.slice(0,this.charLength).toString(this.encoding);var h=t.charCodeAt(t.length-1);if(!(h>=55296&&56319>=h)){if(this.charReceived=this.charLength=0,0===e.length)return t;break}this.charLength+=this.surrogateSize,t=""}this.detectIncompleteChar(e);var i=e.length;this.charLength&&(e.copy(this.charBuffer,0,e.length-this.charReceived,i),i-=this.charReceived),t+=e.toString(this.encoding,0,i);var i=t.length-1,h=t.charCodeAt(i);if(h>=55296&&56319>=h){var c=this.surrogateSize;return this.charLength+=c,this.charReceived+=c,this.charBuffer.copy(this.charBuffer,c,0,c),e.copy(this.charBuffer,0,0,c),t.substring(0,i)}return t},StringDecoder.prototype.detectIncompleteChar=function(e){for(var t=e.length>=3?3:e.length;t>0;t--){var r=e[e.length-t];if(1==t&&r>>5==6){this.charLength=2;break}if(2>=t&&r>>4==14){this.charLength=3;break}if(3>=t&&r>>3==30){this.charLength=4;break}}this.charReceived=t},StringDecoder.prototype.end=function(e){var t="";if(e&&e.length&&(t=this.write(e)),this.charReceived){var r=this.charReceived,h=this.charBuffer,i=this.encoding;t+=h.slice(0,r).toString(i)}return t};

},{"buffer":112}],288:[function(require,module,exports){
var Buffer=require("buffer").Buffer;module.exports=function(e){if(e instanceof Uint8Array){if(0===e.byteOffset&&e.byteLength===e.buffer.byteLength)return e.buffer;if("function"==typeof e.buffer.slice)return e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}if(Buffer.isBuffer(e)){for(var f=new Uint8Array(e.length),r=e.length,t=0;r>t;t++)f[t]=e[t];return f.buffer}throw new Error("Argument must be a Buffer")};

},{"buffer":112}],289:[function(require,module,exports){
function trim(r){return r.replace(/^\s*|\s*$/g,"")}exports=module.exports=trim,exports.left=function(r){return r.replace(/^\s*/,"")},exports.right=function(r){return r.replace(/\s*$/,"")};

},{}],290:[function(require,module,exports){
"use strict";function typeis(e,r){var t,n=r,i=tryNormalizeType(e);if(!i)return!1;if(n&&!Array.isArray(n))for(n=new Array(arguments.length-1),t=0;t<n.length;t++)n[t]=arguments[t+1];if(!n||!n.length)return i;var o;for(t=0;t<n.length;t++)if(mimeMatch(normalize(o=n[t]),i))return"+"===o[0]||-1!==o.indexOf("*")?i:o;return!1}function hasbody(e){return void 0!==e.headers["transfer-encoding"]||!isNaN(e.headers["content-length"])}function typeofrequest(e,r){var t=r;if(!hasbody(e))return null;if(arguments.length>2){t=new Array(arguments.length-1);for(var n=0;n<t.length;n++)t[n]=arguments[n+1]}var i=e.headers["content-type"];return typeis(i,t)}function normalize(e){if("string"!=typeof e)return!1;switch(e){case"urlencoded":return"application/x-www-form-urlencoded";case"multipart":return"multipart/*"}return"+"===e[0]?"*/*"+e:-1===e.indexOf("/")?mime.lookup(e):e}function mimeMatch(e,r){if(e===!1)return!1;var t=r.split("/"),n=e.split("/");return 2!==t.length||2!==n.length?!1:"*"!==n[0]&&n[0]!==t[0]?!1:"*+"===n[1].substr(0,2)?n[1].length<=t[1].length+1&&n[1].substr(1)===t[1].substr(1-n[1].length):"*"===n[1]||n[1]===t[1]}function normalizeType(e){var r=typer.parse(e);return r.parameters=void 0,typer.format(r)}function tryNormalizeType(e){try{return normalizeType(e)}catch(r){return null}}var typer=require("media-typer"),mime=require("mime-types");module.exports=typeofrequest,module.exports.is=typeis,module.exports.hasBody=hasbody,module.exports.normalize=normalize,module.exports.match=mimeMatch;

},{"media-typer":217,"mime-types":223}],291:[function(require,module,exports){
"use strict";function hasPipeDataListeners(e){for(var n=e.listeners("data"),r=0;r<n.length;r++)if("ondata"===n[r].name)return!0;return!1}function unpipe(e){if(!e)throw new TypeError("argument stream is required");if("function"==typeof e.unpipe)return void e.unpipe();if(hasPipeDataListeners(e))for(var n,r=e.listeners("close"),t=0;t<r.length;t++)n=r[t],"cleanup"!==n.name&&"onclose"!==n.name||n.call(e)}module.exports=unpipe;

},{}],292:[function(require,module,exports){
"use strict";function Url(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function urlParse(t,s,e){if(t&&util.isObject(t)&&t instanceof Url)return t;var h=new Url;return h.parse(t,s,e),h}function urlFormat(t){return util.isString(t)&&(t=urlParse(t)),t instanceof Url?t.format():Url.prototype.format.call(t)}function urlResolve(t,s){return urlParse(t,!1,!0).resolve(s)}function urlResolveObject(t,s){return t?urlParse(t,!1,!0).resolveObject(s):s}var punycode=require("punycode"),util=require("./util");exports.parse=urlParse,exports.resolve=urlResolve,exports.resolveObject=urlResolveObject,exports.format=urlFormat,exports.Url=Url;var protocolPattern=/^([a-z0-9.+-]+:)/i,portPattern=/:[0-9]*$/,simplePathPattern=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,delims=["<",">",'"',"`"," ","\r","\n","	"],unwise=["{","}","|","\\","^","`"].concat(delims),autoEscape=["'"].concat(unwise),nonHostChars=["%","/","?",";","#"].concat(autoEscape),hostEndingChars=["/","?","#"],hostnameMaxLen=255,hostnamePartPattern=/^[+a-z0-9A-Z_-]{0,63}$/,hostnamePartStart=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,unsafeProtocol={javascript:!0,"javascript:":!0},hostlessProtocol={javascript:!0,"javascript:":!0},slashedProtocol={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},querystring=require("querystring");Url.prototype.parse=function(t,s,e){if(!util.isString(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var h=t.indexOf("?"),r=-1!==h&&h<t.indexOf("#")?"?":"#",a=t.split(r),o=/\\/g;a[0]=a[0].replace(o,"/"),t=a.join(r);var n=t;if(n=n.trim(),!e&&1===t.split("#").length){var i=simplePathPattern.exec(n);if(i)return this.path=n,this.href=n,this.pathname=i[1],i[2]?(this.search=i[2],s?this.query=querystring.parse(this.search.substr(1)):this.query=this.search.substr(1)):s&&(this.search="",this.query={}),this}var l=protocolPattern.exec(n);if(l){l=l[0];var u=l.toLowerCase();this.protocol=u,n=n.substr(l.length)}if(e||l||n.match(/^\/\/[^@\/]+@[^@\/]+/)){var p="//"===n.substr(0,2);!p||l&&hostlessProtocol[l]||(n=n.substr(2),this.slashes=!0)}if(!hostlessProtocol[l]&&(p||l&&!slashedProtocol[l])){for(var c=-1,f=0;f<hostEndingChars.length;f++){var m=n.indexOf(hostEndingChars[f]);-1!==m&&(-1===c||c>m)&&(c=m)}var v,g;g=-1===c?n.lastIndexOf("@"):n.lastIndexOf("@",c),-1!==g&&(v=n.slice(0,g),n=n.slice(g+1),this.auth=decodeURIComponent(v)),c=-1;for(var f=0;f<nonHostChars.length;f++){var m=n.indexOf(nonHostChars[f]);-1!==m&&(-1===c||c>m)&&(c=m)}-1===c&&(c=n.length),this.host=n.slice(0,c),n=n.slice(c),this.parseHost(),this.hostname=this.hostname||"";var y="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!y)for(var P=this.hostname.split(/\./),f=0,d=P.length;d>f;f++){var q=P[f];if(q&&!q.match(hostnamePartPattern)){for(var b="",O=0,j=q.length;j>O;O++)b+=q.charCodeAt(O)>127?"x":q[O];if(!b.match(hostnamePartPattern)){var x=P.slice(0,f),U=P.slice(f+1),C=q.match(hostnamePartStart);C&&(x.push(C[1]),U.unshift(C[2])),U.length&&(n="/"+U.join(".")+n),this.hostname=x.join(".");break}}}this.hostname.length>hostnameMaxLen?this.hostname="":this.hostname=this.hostname.toLowerCase(),y||(this.hostname=punycode.toASCII(this.hostname));var A=this.port?":"+this.port:"",w=this.hostname||"";this.host=w+A,this.href+=this.host,y&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==n[0]&&(n="/"+n))}if(!unsafeProtocol[u])for(var f=0,d=autoEscape.length;d>f;f++){var E=autoEscape[f];if(-1!==n.indexOf(E)){var I=encodeURIComponent(E);I===E&&(I=escape(E)),n=n.split(E).join(I)}}var R=n.indexOf("#");-1!==R&&(this.hash=n.substr(R),n=n.slice(0,R));var S=n.indexOf("?");if(-1!==S?(this.search=n.substr(S),this.query=n.substr(S+1),s&&(this.query=querystring.parse(this.query)),n=n.slice(0,S)):s&&(this.search="",this.query={}),n&&(this.pathname=n),slashedProtocol[u]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var A=this.pathname||"",k=this.search||"";this.path=A+k}return this.href=this.format(),this},Url.prototype.format=function(){var t=this.auth||"";t&&(t=encodeURIComponent(t),t=t.replace(/%3A/i,":"),t+="@");var s=this.protocol||"",e=this.pathname||"",h=this.hash||"",r=!1,a="";this.host?r=t+this.host:this.hostname&&(r=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(r+=":"+this.port)),this.query&&util.isObject(this.query)&&Object.keys(this.query).length&&(a=querystring.stringify(this.query));var o=this.search||a&&"?"+a||"";return s&&":"!==s.substr(-1)&&(s+=":"),this.slashes||(!s||slashedProtocol[s])&&r!==!1?(r="//"+(r||""),e&&"/"!==e.charAt(0)&&(e="/"+e)):r||(r=""),h&&"#"!==h.charAt(0)&&(h="#"+h),o&&"?"!==o.charAt(0)&&(o="?"+o),e=e.replace(/[?#]/g,function(t){return encodeURIComponent(t)}),o=o.replace("#","%23"),s+r+e+o+h},Url.prototype.resolve=function(t){return this.resolveObject(urlParse(t,!1,!0)).format()},Url.prototype.resolveObject=function(t){if(util.isString(t)){var s=new Url;s.parse(t,!1,!0),t=s}for(var e=new Url,h=Object.keys(this),r=0;r<h.length;r++){var a=h[r];e[a]=this[a]}if(e.hash=t.hash,""===t.href)return e.href=e.format(),e;if(t.slashes&&!t.protocol){for(var o=Object.keys(t),n=0;n<o.length;n++){var i=o[n];"protocol"!==i&&(e[i]=t[i])}return slashedProtocol[e.protocol]&&e.hostname&&!e.pathname&&(e.path=e.pathname="/"),e.href=e.format(),e}if(t.protocol&&t.protocol!==e.protocol){if(!slashedProtocol[t.protocol]){for(var l=Object.keys(t),u=0;u<l.length;u++){var p=l[u];e[p]=t[p]}return e.href=e.format(),e}if(e.protocol=t.protocol,t.host||hostlessProtocol[t.protocol])e.pathname=t.pathname;else{for(var c=(t.pathname||"").split("/");c.length&&!(t.host=c.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==c[0]&&c.unshift(""),c.length<2&&c.unshift(""),e.pathname=c.join("/")}if(e.search=t.search,e.query=t.query,e.host=t.host||"",e.auth=t.auth,e.hostname=t.hostname||t.host,e.port=t.port,e.pathname||e.search){var f=e.pathname||"",m=e.search||"";e.path=f+m}return e.slashes=e.slashes||t.slashes,e.href=e.format(),e}var v=e.pathname&&"/"===e.pathname.charAt(0),g=t.host||t.pathname&&"/"===t.pathname.charAt(0),y=g||v||e.host&&t.pathname,P=y,d=e.pathname&&e.pathname.split("/")||[],c=t.pathname&&t.pathname.split("/")||[],q=e.protocol&&!slashedProtocol[e.protocol];if(q&&(e.hostname="",e.port=null,e.host&&(""===d[0]?d[0]=e.host:d.unshift(e.host)),e.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===c[0]?c[0]=t.host:c.unshift(t.host)),t.host=null),y=y&&(""===c[0]||""===d[0])),g)e.host=t.host||""===t.host?t.host:e.host,e.hostname=t.hostname||""===t.hostname?t.hostname:e.hostname,e.search=t.search,e.query=t.query,d=c;else if(c.length)d||(d=[]),d.pop(),d=d.concat(c),e.search=t.search,e.query=t.query;else if(!util.isNullOrUndefined(t.search)){if(q){e.hostname=e.host=d.shift();var b=e.host&&e.host.indexOf("@")>0?e.host.split("@"):!1;b&&(e.auth=b.shift(),e.host=e.hostname=b.shift())}return e.search=t.search,e.query=t.query,util.isNull(e.pathname)&&util.isNull(e.search)||(e.path=(e.pathname?e.pathname:"")+(e.search?e.search:"")),e.href=e.format(),e}if(!d.length)return e.pathname=null,e.search?e.path="/"+e.search:e.path=null,e.href=e.format(),e;for(var O=d.slice(-1)[0],j=(e.host||t.host||d.length>1)&&("."===O||".."===O)||""===O,x=0,U=d.length;U>=0;U--)O=d[U],"."===O?d.splice(U,1):".."===O?(d.splice(U,1),x++):x&&(d.splice(U,1),x--);if(!y&&!P)for(;x--;x)d.unshift("..");!y||""===d[0]||d[0]&&"/"===d[0].charAt(0)||d.unshift(""),j&&"/"!==d.join("/").substr(-1)&&d.push("");var C=""===d[0]||d[0]&&"/"===d[0].charAt(0);if(q){e.hostname=e.host=C?"":d.length?d.shift():"";var b=e.host&&e.host.indexOf("@")>0?e.host.split("@"):!1;b&&(e.auth=b.shift(),e.host=e.hostname=b.shift())}return y=y||e.host&&d.length,y&&!C&&d.unshift(""),d.length?e.pathname=d.join("/"):(e.pathname=null,e.path=null),util.isNull(e.pathname)&&util.isNull(e.search)||(e.path=(e.pathname?e.pathname:"")+(e.search?e.search:"")),e.auth=t.auth||e.auth,e.slashes=e.slashes||t.slashes,e.href=e.format(),e},Url.prototype.parseHost=function(){var t=this.host,s=portPattern.exec(t);s&&(s=s[0],":"!==s&&(this.port=s.substr(1)),t=t.substr(0,t.length-s.length)),t&&(this.hostname=t)};

},{"./util":293,"punycode":252,"querystring":255}],293:[function(require,module,exports){
"use strict";module.exports={isString:function(n){return"string"==typeof n},isObject:function(n){return"object"==typeof n&&null!==n},isNull:function(n){return null===n},isNullOrUndefined:function(n){return null==n}};

},{}],294:[function(require,module,exports){
(function (global){
function deprecate(r,e){function o(){if(!t){if(config("throwDeprecation"))throw new Error(e);config("traceDeprecation")?console.trace(e):console.warn(e),t=!0}return r.apply(this,arguments)}if(config("noDeprecation"))return r;var t=!1;return o}function config(r){try{if(!global.localStorage)return!1}catch(e){return!1}var o=global.localStorage[r];return null==o?!1:"true"===String(o).toLowerCase()}module.exports=deprecate;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],295:[function(require,module,exports){
exports=module.exports=function(r,o){if(r&&o)for(var e in o)r[e]=o[e];return r};

},{}],296:[function(require,module,exports){
"use strict";function append(r,e){if("string"!=typeof r)throw new TypeError("header argument is required");if(!e)throw new TypeError("field argument is required");for(var a=Array.isArray(e)?e:parse(String(e)),t=0;t<a.length;t++)if(separators.test(a[t]))throw new TypeError("field argument contains an invalid header");if("*"===r)return r;var n=r,i=parse(r.toLowerCase());if(-1!==a.indexOf("*")||-1!==i.indexOf("*"))return"*";for(var t=0;t<a.length;t++){var o=a[t].toLowerCase();-1===i.indexOf(o)&&(i.push(o),n=n?n+", "+a[t]:a[t])}return n}function parse(r){return r.trim().split(/ *, */)}function vary(r,e){if(!r||!r.getHeader||!r.setHeader)throw new TypeError("res argument is required");var a=r.getHeader("Vary")||"",t=Array.isArray(a)?a.join(", "):String(a);(a=append(t,e))&&r.setHeader("Vary",a)}module.exports=vary,module.exports.append=append;var separators=/[\(\)<>@,;:\\"\/\[\]\?=\{\}\u0020\u0009]/;

},{}],297:[function(require,module,exports){
function Context(){}var indexOf=require("indexof"),Object_keys=function(e){if(Object.keys)return Object.keys(e);var t=[];for(var r in e)t.push(r);return t},forEach=function(e,t){if(e.forEach)return e.forEach(t);for(var r=0;r<e.length;r++)t(e[r],r,e)},defineProp=function(){try{return Object.defineProperty({},"_",{}),function(e,t,r){Object.defineProperty(e,t,{writable:!0,enumerable:!1,configurable:!0,value:r})}}catch(e){return function(e,t,r){e[t]=r}}}(),globals=["Array","Boolean","Date","Error","EvalError","Function","Infinity","JSON","Math","NaN","Number","Object","RangeError","ReferenceError","RegExp","String","SyntaxError","TypeError","URIError","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","eval","isFinite","isNaN","parseFloat","parseInt","undefined","unescape"];Context.prototype={};var Script=exports.Script=function(e){return this instanceof Script?void(this.code=e):new Script(e)};Script.prototype.runInContext=function(e){if(!(e instanceof Context))throw new TypeError("needs a 'context' argument.");var t=document.createElement("iframe");t.style||(t.style={}),t.style.display="none",document.body.appendChild(t);var r=t.contentWindow,n=r.eval,o=r.execScript;!n&&o&&(o.call(r,"null"),n=r.eval),forEach(Object_keys(e),function(t){r[t]=e[t]}),forEach(globals,function(t){e[t]&&(r[t]=e[t])});var c=Object_keys(r),i=n.call(r,this.code);return forEach(Object_keys(r),function(t){(t in e||-1===indexOf(c,t))&&(e[t]=r[t])}),forEach(globals,function(t){t in e||defineProp(e,t,r[t])}),document.body.removeChild(t),i},Script.prototype.runInThisContext=function(){return eval(this.code)},Script.prototype.runInNewContext=function(e){var t=Script.createContext(e),r=this.runInContext(t);return forEach(Object_keys(t),function(r){e[r]=t[r]}),r},forEach(Object_keys(Script.prototype),function(e){exports[e]=Script[e]=function(t){var r=Script(t);return r[e].apply(r,[].slice.call(arguments,1))}}),exports.createScript=function(e){return exports.Script(e)},exports.createContext=Script.createContext=function(e){var t=new Context;return"object"==typeof e&&forEach(Object_keys(e),function(r){t[r]=e[r]}),t};

},{"indexof":212}],298:[function(require,module,exports){
"use strict";function forEachArray(e,t){for(var r=0;r<e.length;r++)t(e[r])}function isEmpty(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0}function initParams(e,t,r){var n=e;return isFunction(t)?(r=t,"string"==typeof e&&(n={uri:e})):n=xtend(t,{uri:e}),n.callback=r,n}function createXHR(e,t,r){return t=initParams(e,t,r),_createXHR(t)}function _createXHR(e){function t(){4===i.readyState&&o()}function r(){var e=void 0;if(i.response?e=i.response:"text"!==i.responseType&&i.responseType||(e=i.responseText||i.responseXML),H)try{e=JSON.parse(e)}catch(t){}return e}function n(e){clearTimeout(d),e instanceof Error||(e=new Error(""+(e||"Unknown XMLHttpRequest Error"))),e.statusCode=0,s(e,a)}function o(){if(!c){var t;clearTimeout(d),t=e.useXDR&&void 0===i.status?200:1223===i.status?204:i.status;var n=a,o=null;0!==t?(n={body:r(),statusCode:t,method:l,headers:{},url:p,rawRequest:i},i.getAllResponseHeaders&&(n.headers=parseHeaders(i.getAllResponseHeaders()))):o=new Error("Internal XMLHttpRequest Error"),s(o,n,n.body)}}var s=e.callback;if("undefined"==typeof s)throw new Error("callback argument missing");s=once(s);var a={body:void 0,headers:{},statusCode:0,method:l,url:p,rawRequest:i},i=e.xhr||null;i||(i=e.cors||e.useXDR?new createXHR.XDomainRequest:new createXHR.XMLHttpRequest);var u,c,d,p=i.url=e.uri||e.url,l=i.method=e.method||"GET",f=e.body||e.data||null,R=i.headers=e.headers||{},h=!!e.sync,H=!1;if("json"in e&&(H=!0,R.accept||R.Accept||(R.Accept="application/json"),"GET"!==l&&"HEAD"!==l&&(R["content-type"]||R["Content-Type"]||(R["Content-Type"]="application/json"),f=JSON.stringify(e.json))),i.onreadystatechange=t,i.onload=o,i.onerror=n,i.onprogress=function(){},i.ontimeout=n,i.open(l,p,!h,e.username,e.password),h||(i.withCredentials=!!e.withCredentials),!h&&e.timeout>0&&(d=setTimeout(function(){c=!0,i.abort("timeout");var e=new Error("XMLHttpRequest timeout");e.code="ETIMEDOUT",n(e)},e.timeout)),i.setRequestHeader)for(u in R)R.hasOwnProperty(u)&&i.setRequestHeader(u,R[u]);else if(e.headers&&!isEmpty(e.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in e&&(i.responseType=e.responseType),"beforeSend"in e&&"function"==typeof e.beforeSend&&e.beforeSend(i),i.send(f),i}function noop(){}var window=require("global/window"),once=require("once"),isFunction=require("is-function"),parseHeaders=require("parse-headers"),xtend=require("xtend");module.exports=createXHR,createXHR.XMLHttpRequest=window.XMLHttpRequest||noop,createXHR.XDomainRequest="withCredentials"in new createXHR.XMLHttpRequest?createXHR.XMLHttpRequest:window.XDomainRequest,forEachArray(["get","put","post","patch","head","delete"],function(e){createXHR["delete"===e?"del":e]=function(t,r,n){return r=initParams(t,r,n),r.method=e.toUpperCase(),_createXHR(r)}});

},{"global/window":183,"is-function":216,"once":299,"parse-headers":238,"xtend":300}],299:[function(require,module,exports){
function once(n){var o=!1;return function(){return o?void 0:(o=!0,n.apply(this,arguments))}}module.exports=once,once.proto=once(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return once(this)},configurable:!0})});

},{}],300:[function(require,module,exports){
function extend(){for(var r={},e=0;e<arguments.length;e++){var t=arguments[e];for(var n in t)hasOwnProperty.call(t,n)&&(r[n]=t[n])}return r}module.exports=extend;var hasOwnProperty=Object.prototype.hasOwnProperty;

},{}],301:[function(require,module,exports){
var HandlebarsCompiler=require("hbsfy/runtime");module.exports=HandlebarsCompiler.template({compiler:[7,">= 4.0.0"],main:function(e,a,n,l,r){var i;return"<h1>Hello "+e.escapeExpression((i=null!=(i=n.name||(null!=a?a.name:a))?i:n.helperMissing,"function"==typeof i?i.call(null!=a?a:{},{name:"name",hash:{},data:r}):i))+"!</h1>\n"},useData:!0});

},{"hbsfy/runtime":209}]},{},[1]);
