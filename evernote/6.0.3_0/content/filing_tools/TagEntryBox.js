function TagEntryBox(g,c,n,b,h,e){function y(){for(var a=m.length-1;0<=a;a--)z(m[a]);c.focus();e&&e({name:"clearTags"})}function A(){B.call(c,{keyCode:9,nonUserEvent:!0});m.length==v?(c.placeholder=Browser.i18n.getMessage(p.FULL),c.disabled=!0):(c.placeholder=Browser.i18n.getMessage(p.ADD),c.disabled=!1);k()}function E(a,b){var f=document.createComment("\n"),d=document.createElement("div"),h=document.createElement("div"),l=document.createComment("\n"),k=document.createElement("div");d.className="tag";
d.className=b?d.className+" green":d.className+" gray";k.className="lozenge";h.innerText=a;d.appendChild(h);d.appendChild(l);d.appendChild(k);k.addEventListener("click",function(){z(a);c.focus();e&&e({name:"clearTag",tagName:a})});w[a.toLowerCase()]=d;m.push(a);r[a.toLowerCase()]=!0;g.insertBefore(d,n);g.insertBefore(f,d);g.className="visible";n.className="visible";e&&e({name:"createTag",tagName:a,smart:b})}function z(a){if(a){var b=m.indexOf(a);if(-1!=b){s=!0;var f=w[a.toLowerCase()];f&&(f.parentNode.removeChild(f.previousSibling),
f.parentNode.removeChild(f),delete w[a.toLowerCase()]);m.splice(b,1);delete r[a.toLowerCase()];m.length<v&&(c.disabled=!1,c.placeholder=Browser.i18n.getMessage(p.ADD));0==m.length&&(g.className="",n.className="")}}}function F(a){s=!0;a.srcElement.firstChild.nodeType==Node.ELEMENT_NODE?t(a.srcElement.firstChild.textContent,!0,!1):a.srcElement.firstChild.nodeType==Node.TEXT_NODE&&t(a.srcElement.textContent,!0,!1);c.value="";k()}function G(){var a=l;a&&(a.className=a.className.replace(/\s*selected/g,
""));this.className+=" selected";l=this}function t(a,b,f){a&&(a=a.trim(),r[a.toLowerCase()]||(E(a,f),m.length==v?(c.value="",c.disabled=!0,c.placeholder=Browser.i18n.getMessage(p.FULL)):b&&c.focus()))}function H(a){a=a.toLowerCase();a=x.getMatching(a);if(a.length){var c=document.createDocumentFragment();a=a.sort(function(a,b){return a[0]===b[0]?0:a[0]<b[0]?-1:1});for(var f=0,d=0;d<a.length;d++)r[a[d][0]]||(c.appendChild(a[d][1]),f++);for(;b.hasChildNodes();)b.removeChild(b.lastChild);b.appendChild(c);
f?(q=!0,h.className="visible",e&&e({name:"toggleAutoComplete"})):k()}else k()}function k(){q=u=!1;l=null;var a=h.className;h.className="";e&&a!=h.className&&e({name:"toggleAutoComplete"})}function C(a){a.keyCode&&27==a.keyCode&&q&&(k(),c.focus())}function B(a){var c=this.value.replace(/^\s*/,"");""!=c?H(c):k();C(a);c=!0;9==a.keyCode&&(c=!1);if(9==a.keyCode||13==a.keyCode)q&&l&&(l.firstChild.nodeType==Node.ELEMENT_NODE?this.value=l.firstChild.textContent:l.firstChild.nodeType==Node.TEXT_NODE&&(this.value=
l.textContent)),this.value+=",";if((38==a.keyCode||40==a.keyCode)&&q){var f=38==a.keyCode,d=l;if(d){var e=d;(d=f?d.previousSibling:d.nextSibling)||(d=e);d&&(e.className=e.className.replace(/\s*selected/g,""),d.className=" selected",l=d,d.scrollIntoViewIfNeeded(!1))}else if(d=b.firstChild)d.className+=" selected",l=d}if(this.value.match(/,/)){f=this.value.split(/\s*,\s*/);for(d=0;d<f.length-1;d++)t(f[d],c,!1),a&&!a.nonUserEvent&&(s=!0),k();this.value=f[f.length-1].trim()}a.stopPropagation&&a.keyCode!=
D&&a.stopPropagation()}var s=!1,v=20,D=27,x=new TagTrie,p={ADD:"quickNote_addTags",DISABLED:"quickNote_tagsDisabled",FULL:"tagNamesNotInRange"},u=!1,q=!1,l=null;c.placeholder=Browser.i18n.getMessage(p.ADD);c.addEventListener("keyup",B);c.addEventListener("blur",function(a){q&&u||c.disabled||A()});n.addEventListener("click",y);b.addEventListener("click",function(a){a.stopPropagation()});b.addEventListener("mouseover",function(a){u=!0});b.addEventListener("mouseout",function(a){u=!1});window.addEventListener("click",
k);window.addEventListener("keyup",C);var m=[],r={},w={};this.focusEntry=function(a){c.focus()};this.setAutoCompleteList=function(a){k();x=new TagTrie;for(var b=0;b<a.length;b++){var c=document.createElement("div");c.textContent=a[b];c.addEventListener("click",F);c.addEventListener("mouseover",G);x.insert(a[b],c)}};this.getSelectedTags=function(){var a=[],b;for(b in m)a.push(m[b]);return a};this.addTag=t;this.setDisabled=function(a){var b=g.querySelectorAll(".tag");a?(c.disabled=!0,c.placeholder=
Browser.i18n.getMessage(p.DISABLED),g.className=""):(c.disabled=!1,A(),0<b.length&&(g.className="visible"))};this.overridable=function(){return!s};this.clearAll=y;this.setKeyboardHandlers=function(a){for(var b in a)switch(b){case "closeWebClipperShortcut":D=a[b][0]}};Object.preventExtensions(this)}Object.preventExtensions(TagEntryBox);
function TagTrie(){function g(b){b.name&&b.value&&n.push([b.name,b.value]);for(var c in b)"name"!==c&&"value"!==c&&g(b[c])}var c={},n=[];this.insert=function(b,h){if(b){b=b.toLowerCase();for(var e=c,g=0;g<b.length;g++)e[b[g]]||(e[b[g]]={}),e=e[b[g]];e.name=b;e.value=h}};this.getMatching=function(b){n=[];if(!b)return n;b=b.toLowerCase();for(var h=c,e=0;e<b.length;e++){if(!h[b[e]])return n;h=h[b[e]]}g(h);return n};this.trie=c;Object.preventExtensions(this)}Object.preventExtensions(TagTrie);
