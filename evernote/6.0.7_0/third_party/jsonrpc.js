var escapeJSONString=function(){var a=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,c={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};return function(b){a.lastIndex=0;return a.test(b)?'"'+b.replace(a,function(a){var b=c[a];return"string"===typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+b+'"'}}();
function toJSON(a){function c(){for(var a;e;)a=e[d].prev,delete e[d],e=a}function b(a,k,l){var q=[],h,r;if(null===a||void 0===a)return"null";if("string"===typeof a)return escapeJSONString(a);if("number"===typeof a||"boolean"===typeof a)return a.toString();if(a[d]){for(l=[l];k;)h&&h.unshift(k[d].ref),k===a&&(r=k,h=[r[d].ref]),l.unshift(k[d].ref),k=k[d].parent;if(r){if(JSONRpcClient.fixupCircRefs)return l.shift(),h.shift(),f.push([l,h]),p;c();throw Error("circular reference detected!");}if(JSONRpcClient.fixupDuplicates){h=
[a[d].ref];for(k=a[d].parent;k;)h.unshift(k[d].ref),k=k[d].parent;l.shift();h.shift();f.push([l,h]);return p}}else a[d]={parent:k,prev:e,ref:l},e=a;if(a.constructor===Date)return a.javaClass?'{javaClass: "'+a.javaClass+'", time: '+a.valueOf()+"}":'{javaClass: "java.util.Date", time: '+a.valueOf()+"}";if(a.constructor===Array||"[object Array]"===Object.prototype.toString.call(a)){for(h=0;h<a.length;h++)g=b(a[h],a,h),q.push(g===p?null:g);return"["+q.join(", ")+"]"}for(var n in a)n!==d&&(null===a[n]||
void 0===a[n]?q.push('"'+n+'": null'):"function"!=typeof a[n]&&(g=b(a[n],a,n),g!==p&&q.push(escapeJSONString(n)+": "+g)));return"{"+q.join(", ")+"}"}var d="$_$jabsorbed$813492",e,f=[],p={},g;g=b(a,null,"root");c();return f.length?{json:g,fixups:f}:{json:g}}
function JSONRpcClient(){var a=0,c,b=typeof arguments[0],d=!0;"function"===b?(this.readyCB=arguments[0],a++):arguments[0]&&"object"===b&&arguments[0].length&&(this._addMethods(arguments[0]),a++,d=!1);this.serverURL=arguments[a];this.user=arguments[a+1];this.pass=arguments[a+2];this.objectID=0;d&&(this._addMethods(["system.listMethods"]),a=JSONRpcClient._makeRequest(this,"system.listMethods",[]),this.readyCB&&(c=this,a.cb=function(a,b){b||c._addMethods(a);c.readyCB(a,b)}),this.readyCB?(JSONRpcClient.async_requests.push(a),
JSONRpcClient.kick_async()):(a=JSONRpcClient._sendRequest(this,a),this._addMethods(a)))}JSONRpcClient.prototype.createCallableProxy=function(a,c){var b,d;b=new JSONRPCCallableProxy(a,c);for(d in JSONRpcClient.knownClasses[c])b[d]=JSONRpcClient.bind(JSONRpcClient.knownClasses[c][d],b);return b};function JSONRPCCallableProxy(a,c){this.objectID=a;this.javaClass=c;this.JSONRPCType="CallableReference"}JSONRpcClient.knownClasses={};
JSONRpcClient.Exception=function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);this.trace&&(a=this.trace.match(/^([^:]*)/))&&(this.name=a[0]);this.name||(this.name="JSONRpcClientException")};JSONRpcClient.Exception.CODE_REMOTE_EXCEPTION=490;JSONRpcClient.Exception.CODE_ERR_CLIENT=550;JSONRpcClient.Exception.CODE_ERR_PARSE=590;JSONRpcClient.Exception.CODE_ERR_NOMETHOD=591;JSONRpcClient.Exception.CODE_ERR_UNMARSHALL=592;JSONRpcClient.Exception.CODE_ERR_MARSHALL=593;
JSONRpcClient.Exception.prototype=Error();JSONRpcClient.Exception.prototype.toString=function(a,c){var b="";this.name&&(b+=this.name);this.message&&(b+=": "+this.message);0==b.length&&(b="no exception information given");return b};JSONRpcClient.default_ex_handler=function(a){var c,b="";for(c in a)b+=c+"\t"+a[c]+"\n";alert(b)};JSONRpcClient.toplevel_ex_handler=JSONRpcClient.default_ex_handler;JSONRpcClient.profile_async=!1;JSONRpcClient.max_req_active=2;JSONRpcClient.requestId=1;
JSONRpcClient.fixupCircRefs=!0;JSONRpcClient.fixupDuplicates=!0;JSONRpcClient.transformDates=!1;JSONRpcClient.transformDateWithoutHint=!1;JSONRpcClient.javaDateClasses={"java.util.Date":!0,"java.sql.Date":!0,"java.sql.Time":!0,"java.sql.Timestamp":!0};JSONRpcClient.bind=function(a,c){return function(){return a.apply(c,arguments)}};
JSONRpcClient._createMethod=function(a,c){return function(){for(var b=[],d,e=0;e<arguments.length;e++)b.push(arguments[e]);"function"==typeof b[0]&&(d=b.shift());b=JSONRpcClient._makeRequest(this,c,b,this.objectID,d);return d?(JSONRpcClient.async_requests.push(b),JSONRpcClient.kick_async(),b.requestId):JSONRpcClient._sendRequest(a,b)}};
JSONRpcClient.prototype.createObject=function(){for(var a=[],c=null,b=0;b<arguments.length;b++)a.push(arguments[b]);"function"==typeof a[0]&&(c=a.shift());a=JSONRpcClient._makeRequest(this,a[0]+".$constructor",a[1],0,c);if(null===c)return JSONRpcClient._sendRequest(this,a);JSONRpcClient.async_requests.push(a);JSONRpcClient.kick_async();return a.requestId};JSONRpcClient.CALLABLE_REFERENCE_METHOD_PREFIX=".ref";
JSONRpcClient.prototype._addMethods=function(a,c){for(var b,d,e,f,p=[],g,m=0;m<a.length;m++){d=this;e=a[m].split(".");b=a[m].indexOf("[");f=a[m].indexOf("]");if(a[m].substring(0,JSONRpcClient.CALLABLE_REFERENCE_METHOD_PREFIX.length)==JSONRpcClient.CALLABLE_REFERENCE_METHOD_PREFIX&&-1!=b&&-1!=f&&b<f)g=a[m].substring(b+1,f);else for(f=0;f<e.length-1;f++)b=e[f],d[b]||(d[b]={}),d=d[b];b=e[e.length-1];g?(e=JSONRpcClient._createMethod(this,b),JSONRpcClient.knownClasses[g]||(JSONRpcClient.knownClasses[g]=
{}),JSONRpcClient.knownClasses[g][b]=e):(e=JSONRpcClient._createMethod(this,a[m]),d[b]||c||(d[b]=JSONRpcClient.bind(e,this)),p.push(e));g=null}return p};JSONRpcClient._getCharsetFromHeaders=function(a){var c,b,d;try{for(c=a.getResponseHeader("Content-type"),b=c.split(/\s*;\s*/),d=0;d<b.length;d++)if("charset="==b[d].substring(0,8))return b[d].substring(8,b[d].length)}catch(e){}return"UTF-8"};JSONRpcClient.async_requests=[];JSONRpcClient.async_inflight={};JSONRpcClient.async_responses=[];
JSONRpcClient.async_timeout=null;JSONRpcClient.num_req_active=0;
JSONRpcClient._async_handler=function(){var a;for(JSONRpcClient.async_timeout=null;0<JSONRpcClient.async_responses.length;)if(a=JSONRpcClient.async_responses.shift(),!a.canceled){a.profile&&(a.profile.dispatch=new Date);try{a.cb(a.result,a.ex,a.profile)}catch(c){JSONRpcClient.toplevel_ex_handler(c)}}for(;0<JSONRpcClient.async_requests.length&&JSONRpcClient.num_req_active<JSONRpcClient.max_req_active;)a=JSONRpcClient.async_requests.shift(),a.canceled||JSONRpcClient._sendRequest(a.client,a)};
JSONRpcClient.kick_async=function(){JSONRpcClient.async_timeout||(JSONRpcClient.async_timeout=setTimeout(JSONRpcClient._async_handler,0))};
JSONRpcClient.cancelRequest=function(a){if(JSONRpcClient.async_inflight[a])return JSONRpcClient.async_inflight[a].canceled=!0;for(var c in JSONRpcClient.async_requests)if(JSONRpcClient.async_requests[c].requestId==a)return JSONRpcClient.async_requests[c].canceled=!0;for(c in JSONRpcClient.async_responses)if(JSONRpcClient.async_responses[c].requestId==a)return JSONRpcClient.async_responses[c].canceled=!0;return!1};
JSONRpcClient._makeRequest=function(a,c,b,d,e){var f={};f.client=a;f.requestId=JSONRpcClient.requestId++;a="{id:"+f.requestId+",method:";a=d&&0<d?a+('".obj['+d+"]."+c+'"'):a+('"'+c+'"');e&&(f.cb=e);JSONRpcClient.profile_async&&(f.profile={submit:new Date});c=toJSON(b);a+=",params:"+c.json;c.fixups&&(a+=",fixups:"+toJSON(c.fixups).json);f.data=a+"}";return f};
JSONRpcClient._sendRequest=function(a,c){var b;c.profile&&(c.profile.start=new Date);b=JSONRpcClient.poolGetHTTPRequest();JSONRpcClient.num_req_active++;b.open("POST",a.serverURL,!!c.cb,a.user,a.pass);try{b.setRequestHeader("Content-type","text/plain")}catch(d){}try{b.setRequestHeader("X-Evernote-Agent",Browser.getAgent())}catch(e){}b.onreadystatechange=c.cb?function(){var d;if(4==b.readyState){b.onreadystatechange=function(){};d={cb:c.cb,result:null,ex:null};c.profile?(d.profile=c.profile,d.profile.end=
new Date):d.profile=!1;try{d.result=a._handleResponse(b)}catch(f){d.ex=f}JSONRpcClient.async_inflight[c.requestId].canceled||JSONRpcClient.async_responses.push(d);delete JSONRpcClient.async_inflight[c.requestId];JSONRpcClient.kick_async()}}:function(){};JSONRpcClient.async_inflight[c.requestId]=c;try{b.send(c.data)}catch(f){throw JSONRpcClient.poolReturnHTTPRequest(b),JSONRpcClient.num_req_active--,new JSONRpcClient.Exception({code:JSONRpcClient.Exception.CODE_ERR_CLIENT,message:"Connection failed"});
}return c.cb?null:(delete JSONRpcClient.async_inflight[c.requestId],a._handleResponse(b))};
JSONRpcClient.prototype._handleResponse=function(a){this.charset||(this.charset=JSONRpcClient._getCharsetFromHeaders(a));var c,b,d;try{c=a.status,b=a.statusText,d=a.responseText}catch(e){throw JSONRpcClient.poolReturnHTTPRequest(a),JSONRpcClient.num_req_active--,JSONRpcClient.kick_async(),new JSONRpcClient.Exception({code:JSONRpcClient.Exception.CODE_ERR_CLIENT,message:"Connection failed"});}JSONRpcClient.poolReturnHTTPRequest(a);JSONRpcClient.num_req_active--;if(200!=c)throw new JSONRpcClient.Exception({code:c,
message:b});return this.unmarshallResponse(d)};
JSONRpcClient.prototype.unmarshallResponse=function(a){function c(a,b){function c(a,b){for(var d=0,f=b.length;d<f;d++)a=a[b[d]];return a}function d(a,b,c){for(var f=b.length-1,e=0;e<f;e++)a=a[b[e]];a[b[f]]=c}for(var e=0,l=b.length;e<l;e++)d(a,b[e][0],c(a,b[e][1]))}function b(a){var c;if(a&&"object"===typeof a){if(a.javaClass&&JSONRpcClient.javaDateClasses[a.javaClass])return c=new Date(a.time),"java.util.Date"!==a.javaClass&&(c.javaClass=a.javaClass),c;var d;if(d=JSONRpcClient.transformDateWithoutHint)a:{var e;
d=0;if(a.hasOwnProperty("time")){for(e in a)if(a.hasOwnProperty(e)&&(d++,1<d)){d=void 0;break a}d=!0}else d=void 0}if(d)return new Date(a.time);for(c in a)a.hasOwnProperty(c)&&(a[c]=b(a[c]))}return a}var d;try{d=JSON.parse(a)}catch(e){throw new JSONRpcClient.Exception({code:550,message:"error parsing result",data:a});}if(d.error)throw new JSONRpcClient.Exception(d.error);if(a=d.result){if(a.objectID&&"CallableReference"==a.JSONRPCType)return this.createCallableProxy(a.objectID,a.javaClass);a=JSONRpcClient.extractCallableReferences(this,
JSONRpcClient.transformDates?b(a):a);d.fixups&&c(a,d.fixups)}return a};JSONRpcClient.extractCallableReferences=function(a,c){var b,d,e;for(b in c)"object"==typeof c[b]&&((d=JSONRpcClient.makeCallableReference(a,c[b]))||(d=JSONRpcClient.extractCallableReferences(a,c[b])),c[b]=d),"object"==typeof b&&((d=JSONRpcClient.makeCallableReference(a,b))||(d=JSONRpcClient.extractCallableReferences(a,b)),e=c[b],delete c[b],c[d]=e);return c};
JSONRpcClient.makeCallableReference=function(a,c){return c&&c.objectID&&c.javaClass&&"CallableReference"==c.JSONRPCType?a.createCallableProxy(c.objectID,c.javaClass):null};JSONRpcClient.http_spare=[];JSONRpcClient.http_max_spare=8;JSONRpcClient.poolGetHTTPRequest=function(){var a=JSONRpcClient.http_spare.pop();return a?a:JSONRpcClient.getHTTPRequest()};JSONRpcClient.poolReturnHTTPRequest=function(a){JSONRpcClient.http_spare.length>=JSONRpcClient.http_max_spare?delete a:JSONRpcClient.http_spare.push(a)};
JSONRpcClient.msxmlNames="MSXML2.XMLHTTP.6.0 MSXML2.XMLHTTP.3.0 MSXML2.XMLHTTP MSXML2.XMLHTTP.5.0 MSXML2.XMLHTTP.4.0 Microsoft.XMLHTTP".split(" ");
JSONRpcClient.getHTTPRequest=function(){try{return JSONRpcClient.httpObjectName="XMLHttpRequest",new XMLHttpRequest}catch(a){}for(var c=0;c<JSONRpcClient.msxmlNames.length;c++)try{return JSONRpcClient.httpObjectName=JSONRpcClient.msxmlNames[c],new ActiveXObject(JSONRpcClient.msxmlNames[c])}catch(b){}JSONRpcClient.httpObjectName=null;throw new JSONRpcClient.Exception({code:0,message:"Can't create XMLHttpRequest object"});};
