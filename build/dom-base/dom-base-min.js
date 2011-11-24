YUI.add("dom-base",function(b){var o=b.config.doc.documentElement,g=b.DOM,m="tagName",a="ownerDocument",c="",n=b.Features.add,k=b.Features.test;b.mix(g,{getText:(o.textContent!==undefined)?function(s){var r="";if(s){r=s.textContent;}return r||"";}:function(s){var r="";if(s){r=s.innerText||s.nodeValue;}return r||"";},setText:(o.textContent!==undefined)?function(r,s){if(r){r.textContent=s;}}:function(r,s){if("innerText" in r){r.innerText=s;}else{if("nodeValue" in r){r.nodeValue=s;}}},CUSTOM_ATTRIBUTES:(!o.hasAttribute)?{"for":"htmlFor","class":"className"}:{"htmlFor":"for","className":"class"},setAttribute:function(t,r,u,s){if(t&&r&&t.setAttribute){r=g.CUSTOM_ATTRIBUTES[r]||r;t.setAttribute(r,u,s);}},getAttribute:function(u,r,t){t=(t!==undefined)?t:2;var s="";if(u&&r&&u.getAttribute){r=g.CUSTOM_ATTRIBUTES[r]||r;s=u.getAttribute(r,t);if(s===null){s="";}}return s;},VALUE_SETTERS:{},VALUE_GETTERS:{},getValue:function(t){var s="",r;if(t&&t[m]){r=g.VALUE_GETTERS[t[m].toLowerCase()];if(r){s=r(t);}else{s=t.value;}}if(s===c){s=c;}return(typeof s==="string")?s:"";},setValue:function(r,s){var t;if(r&&r[m]){t=g.VALUE_SETTERS[r[m].toLowerCase()];if(t){t(r,s);}else{r.value=s;}}},creators:{}});n("value-set","select",{test:function(){var r=b.config.doc.createElement("select");r.innerHTML="<option>1</option><option>2</option>";r.value="2";return(r.value&&r.value==="2");}});if(!k("value-set","select")){g.VALUE_SETTERS.select=function(u,v){for(var s=0,r=u.getElementsByTagName("option"),t;t=r[s++];){if(g.getValue(t)===v){t.selected=true;break;}}};}b.mix(g.VALUE_GETTERS,{button:function(r){return(r.attributes&&r.attributes.value)?r.attributes.value.value:"";}});b.mix(g.VALUE_SETTERS,{button:function(s,t){var r=s.attributes.value;if(!r){r=s[a].createAttribute("value");s.setAttributeNode(r);}r.value=t;}});b.mix(g.VALUE_GETTERS,{option:function(s){var r=s.attributes;return(r.value&&r.value.specified)?s.value:s.text;},select:function(s){var t=s.value,r=s.options;if(r&&r.length){if(s.multiple){}else{t=g.getValue(r[s.selectedIndex]);}}return t;}});var h,f,q;b.mix(b.DOM,{hasClass:function(t,s){var r=b.DOM._getRegExp("(?:^|\\s+)"+s+"(?:\\s+|$)");return r.test(t.className);},addClass:function(s,r){if(!b.DOM.hasClass(s,r)){s.className=b.Lang.trim([s.className,r].join(" "));}},removeClass:function(s,r){if(r&&f(s,r)){s.className=b.Lang.trim(s.className.replace(b.DOM._getRegExp("(?:^|\\s+)"+r+"(?:\\s+|$)")," "));if(f(s,r)){q(s,r);}}},replaceClass:function(s,r,t){q(s,r);h(s,t);},toggleClass:function(s,r,t){var u=(t!==undefined)?t:!(f(s,r));if(u){h(s,r);}else{q(s,r);}}});f=b.DOM.hasClass;q=b.DOM.removeClass;h=b.DOM.addClass;var e=/<([a-z]+)/i,g=b.DOM,n=b.Features.add,k=b.Features.test,j={},i=function(t,r){var u=b.config.doc.createElement("div"),s=true;u.innerHTML=t;if(!u.firstChild||u.firstChild.tagName!==r.toUpperCase()){s=false;}return s;},p=/(?:\/(?:thead|tfoot|tbody|caption|col|colgroup)>)+\s*<tbody/,d="<table>",l="</table>";b.mix(b.DOM,{_fragClones:{},_create:function(s,t,r){r=r||"div";var u=g._fragClones[r];if(u){u=u.cloneNode(false);}else{u=g._fragClones[r]=t.createElement(r);}u.innerHTML=s;return u;},create:function(v,y){if(typeof v==="string"){v=b.Lang.trim(v);}y=y||b.config.doc;var u=e.exec(v),w=g._create,s=j,x=null,t,z,r;if(v!=undefined){if(u&&u[1]){t=s[u[1].toLowerCase()];if(typeof t==="function"){w=t;}else{z=t;}}r=w(v,y,z).childNodes;if(r.length===1){x=r[0].parentNode.removeChild(r[0]);}else{if(r[0]&&r[0].className==="yui3-big-dummy"){if(r.length===2){x=r[0].nextSibling;}else{r[0].parentNode.removeChild(r[0]);x=g._nl2frag(r,y);}}else{x=g._nl2frag(r,y);}}}return x;},_nl2frag:function(s,v){var t=null,u,r;if(s&&(s.push||s.item)&&s[0]){v=v||s[0].ownerDocument;t=v.createDocumentFragment();if(s.item){s=b.Array(s,0,true);}for(u=0,r=s.length;u<r;u++){t.appendChild(s[u]);}}return t;},addHTML:function(y,x,t){var r=y.parentNode,v=0,w,s=x,u;if(x!=undefined){if(x.nodeType){u=x;}else{if(typeof x=="string"||typeof x=="number"){s=u=g.create(x);}else{if(x[0]&&x[0].nodeType){u=b.config.doc.createDocumentFragment();while((w=x[v++])){u.appendChild(w);}}}}}if(t){if(u&&t.parentNode){t.parentNode.insertBefore(u,t);}else{switch(t){case"replace":while(y.firstChild){y.removeChild(y.firstChild);}if(u){y.appendChild(u);}break;case"before":if(u){r.insertBefore(u,y);}break;case"after":if(u){if(y.nextSibling){r.insertBefore(u,y.nextSibling);}else{r.appendChild(u);}}break;default:if(u){y.appendChild(u);}}}}else{if(u){y.appendChild(u);}}return s;},wrap:function(u,s){var t=(s&&s.nodeType)?s:b.DOM.create(s),r=t.getElementsByTagName("*");if(r.length){t=r[r.length-1];}if(u.parentNode){u.parentNode.replaceChild(t,u);}t.appendChild(u);},unwrap:function(u){var s=u.parentNode,t=s.lastChild,r=u,v;if(s){v=s.parentNode;if(v){u=s.firstChild;while(u!==t){r=u.nextSibling;v.insertBefore(u,s);u=r;}v.replaceChild(t,s);}else{s.removeChild(u);}}}});n("innerhtml","table",{test:function(){var r=b.config.doc.createElement("table");try{r.innerHTML="<tbody></tbody>";}catch(s){return false;}return(r.firstChild&&r.firstChild.nodeName==="TBODY");}});n("innerhtml-div","tr",{test:function(){return i("<tr></tr>","tr");}});n("innerhtml-div","script",{test:function(){return i("<script><\/script>","script");}});if(!k("innerhtml","table")){j.tbody=function(s,t){var u=g.create(d+s+l,t),r=u.children.tags("tbody")[0];if(u.children.length>1&&r&&!p.test(s)){r.parentNode.removeChild(r);}return u;};}if(!k("innerhtml-div","script")){j.script=function(r,s){var t=s.createElement("div");t.innerHTML="-"+r;t.removeChild(t.firstChild);return t;};j.link=j.style=j.script;}if(!k("innerhtml-div","tr")){b.mix(j,{option:function(r,s){return g.create('<select><option class="yui3-big-dummy" selected></option>'+r+"</select>",s);},tr:function(r,s){return g.create("<tbody>"+r+"</tbody>",s);},td:function(r,s){return g.create("<tr>"+r+"</tr>",s);},col:function(r,s){return g.create("<colgroup>"+r+"</colgroup>",s);},tbody:"table"});b.mix(j,{legend:"fieldset",th:j.td,thead:j.tbody,tfoot:j.tbody,caption:j.tbody,colgroup:j.tbody,optgroup:j.option});
}g.creators=j;b.mix(b.DOM,{setWidth:function(s,r){b.DOM._setSize(s,"width",r);},setHeight:function(s,r){b.DOM._setSize(s,"height",r);},_setSize:function(s,u,t){t=(t>0)?t:0;var r=0;s.style[u]=t+"px";r=(u==="height")?s.offsetHeight:s.offsetWidth;if(r>t){t=t-(r-t);if(t<0){t=0;}s.style[u]=t+"px";}}});},"@VERSION@",{requires:["dom-core"]});