YUI.add("autocomplete-sources",function(g){var a=g.AutoCompleteBase,f=g.Lang,b="_sourceSuccess",d="maxResults",e="requestTemplate",c="resultListLocator";g.mix(a.prototype,{_YQL_SOURCE_REGEX:/^(?:select|set|use)\s+/i,_beforeCreateObjectSource:function(h){if(h instanceof g.Node&&h.get("nodeName").toLowerCase()==="select"){return this._createSelectSource(h);}if(g.JSONPRequest&&h instanceof g.JSONPRequest){return this._createJSONPSource(h);}return this._createObjectSource(h);},_createIOSource:function(l){var j={type:"io"},k=this,n,i,m;function h(o){var q=o.request,p=o.query;if(k._cache&&q in k._cache){k[b](k._cache[q],o);return;}if(n&&n.isInProgress()){n.abort();}n=g.io(k._getXHRUrl(l,o),{on:{success:function(u,r){var t;try{t=g.JSON.parse(r.responseText);}catch(s){g.error("JSON parse error",s);}if(t){k._cache&&(k._cache[q]=t);k[b](t,o);}}}});}j.sendRequest=function(o){i=o;if(m){return;}m=true;g.use("io-base","json-parse",function(){j.sendRequest=h;h(i);});};return j;},_createJSONPSource:function(l){var j={type:"jsonp"},k=this,i,m;function h(n){var p=n.request,o=n.query;if(k._cache&&p in k._cache){k[b](k._cache[p],n);return;}l._config.on.success=function(q){k._cache&&(k._cache[p]=q);k[b](q,n);};l.send(o);}j.sendRequest=function(n){i=n;if(m){return;}m=true;g.use("jsonp",function(){if(!(l instanceof g.JSONPRequest)){l=new g.JSONPRequest(l,{format:g.bind(k._jsonpFormatter,k)});}j.sendRequest=h;h(i);});};return j;},_createSelectSource:function(i){var h=this;return{type:"select",sendRequest:function(k){var j=[];i.get("options").each(function(l){j.push({html:l.get("innerHTML"),index:l.get("index"),node:l,selected:l.get("selected"),text:l.get("text"),value:l.get("value")});});h[b](j,k);}};},_createStringSource:function(h){if(this._YQL_SOURCE_REGEX.test(h)){return this._createYQLSource(h);}else{if(h.indexOf("{callback}")!==-1){return this._createJSONPSource(h);}else{return this._createIOSource(h);}}},_createYQLSource:function(l){var k=this,m={type:"yql"},i,n,j;if(!k.get(c)){k.set(c,k._defaultYQLLocator);}function h(s){var t=s.query,q=k.get("yqlEnv"),o=k.get(d),u,r,p;p=f.sub(l,{maxResults:o>0?o:1000,request:s.request,query:t});if(k._cache&&p in k._cache){k[b](k._cache[p],s);return;}u=function(v){k._cache&&(k._cache[p]=v);k[b](v,s);};r={proto:k.get("yqlProtocol")};if(j){j._callback=u;j._opts=r;j._params.q=p;if(q){j._params.env=q;}}else{j=new g.YQLRequest(p,{on:{success:u},allowCache:false},q?{env:q}:null,r);}j.send();}m.sendRequest=function(o){i=o;if(!n){n=true;g.use("yql",function(){m.sendRequest=h;h(i);});}};return m;},_defaultYQLLocator:function(i){var j=i&&i.query&&i.query.results,h;if(j&&f.isObject(j)){h=g.Object.values(j)||[];j=h.length===1?h[0]:h;if(!f.isArray(j)){j=[j];}}else{j=[];}return j;},_getXHRUrl:function(i,j){var h=this.get(d);if(j.query!==j.request){i+=j.request;}return f.sub(i,{maxResults:h>0?h:1000,query:encodeURIComponent(j.query)});},_jsonpFormatter:function(i,j,k){var h=this.get(d),l=this.get(e);if(l){i+=l(k);}return f.sub(i,{callback:j,maxResults:h>0?h:1000,query:encodeURIComponent(k)});}});g.mix(a.ATTRS,{yqlEnv:{value:null},yqlProtocol:{value:"http"}});g.mix(a.SOURCE_TYPES,{io:"_createIOSource",jsonp:"_createJSONPSource",object:"_beforeCreateObjectSource",select:"_createSelectSource",string:"_createStringSource",yql:"_createYQLSource"},true);},"@VERSION@",{requires:["autocomplete-base"],optional:["io-base","json-parse","jsonp","yql"]});