function OptionsController(){function m(a){if(a=q[this.id]){c();var b={};b[a]=this.checked;"useSearchHelper"==a?Browser.sendToExtension({name:"main_isAuthenticated",type:"options",option:"useSearchHelper"}):"enableKeyboardShortcuts"==a&&(this.checked?document.getElementById("shortcutsContainer").className=document.getElementById("shortcutsContainer").className.replace(/\s*disabled/g,""):document.getElementById("shortcutsContainer").className+=" disabled",t=this.checked,Browser.sendToExtension({name:"bounceToAll",
message:{name:"receiveKeyboardShortcutsEnabled",keyboardShortcutsEnabled:this.checked}}));Browser.sendToExtension({name:"main_setOption",options:b})}g()}function r(a){if(a=s[this.id]){c();var b={};b[a]=this.options[this.selectedIndex].value;Browser.sendToExtension({name:"main_setOption",options:b})}g()}function u(a){if(a=p[this.id]){c();var b={};b[a]=this.value;console.log("Sending options change:");console.log(b);Browser.sendToExtension({name:"main_setOption",options:b})}g()}function v(){var a=l[this.name];
if(a){c();var b={};b[a]=this.value;"client"==a?"DESKTOP"==this.value?document.querySelector("#clientSelectionDescription").style.display="block":document.querySelector("#clientSelectionDescription").style.display="none":"notebookSelection"==a&&("smartFiling"==this.value?Browser.sendToExtension({name:"main_isAuthenticated",type:"options",option:"notebookSelection"}):document.querySelector("#bizSmartFilingCheckbox").style.display="");Browser.sendToExtension({name:"main_setOption",options:b})}g()}function c(){window.setTimeout(function(){document.querySelector("#savingContainer").className=
"invisible"},500);document.querySelector("#savingContainer").className="visible"}function g(){var a=document.querySelector("#optionsContainer");a.style.height="";a=a.scrollHeight;document.querySelector(".pinch").style.height=a+"px";window.parent.postMessage({name:"setOptionsHeight",height:221+a},"*")}var t;window.addEventListener("DOMContentLoaded",function(){var a={},b;for(b in q)a[b]=!1;for(b in s)a[b]=!1;for(b in p)a[b]=!1;for(b in l)a[b]=!1;Browser.sendToExtension({name:"main_getConfig",options:a,
returnName:"options_config"})});Browser.addMessageHandlers({options_config:function(a){if(a.options){GlobalUtils.localize(document.body);GlobalUtils.localize(document.getElementsByTagName("title")[0]);for(var b in q){var e=document.getElementById(b);e.checked=a.options[q[b]];"enableKeyboardShortcuts"==b&&(e.checked||(document.getElementById("shortcutsContainer").className+=" disabled"),t=e.checked);e.addEventListener("change",m)}for(b in s){var e=document.getElementById(b),d=a.options[s[b]];for(b=
0;b<e.options.length;b++)if(e.options[b].value==d){e.selectedIndex=b;break}e.addEventListener("change",r)}for(b in p){e=document.getElementById(b);if(document.getElementById("shortcutsContainer").contains(e)){for(var c=a.options[p[b]].split("|"),d=[],f=0;f<c.length;f++){var h=c[f].split(","),h=parseInt(h[1]);27==h?d.push("ESC"):13==h?d.push("Enter"):18==h?d.push("ALT"):91==h?/windows/i.test(window.navigator.userAgent)?d.push("CTRL"):d.push("CMD"):16==h?d.push("SHIFT"):43==h?d.push("\u2018+\u2019"):
45==h?d.push("\u2018-\u2019"):d.push(String.fromCharCode(h))}f=d.indexOf("CTRL");-1<f&&(d[f]=d[0],d[0]="CTRL");c=d.indexOf("CMD");-1<c&&(d[c]=d[-1<f?1:0],d[-1<f?1:0]="CMD");h=d.indexOf("ALT");if(-1<h){var k=(-1<f?1:0)+(-1<c?1:0);d[h]=d[k];d[k]="ALT"}var n=d.indexOf("SHIFT");-1<n&&(k=(-1<f?1:0)+(-1<c?1:0)+(-1<h?1:0),d[n]=d[k],d[k]="SHIFT");e.value=d.join(" + ")}else e.value=a.options[p[b]];e.addEventListener("change",u)}for(b in l)for("client"==l[b]&&"DESKTOP"==a.options[l[b]]?document.querySelector("#clientSelectionDescription").style.display=
"block":"notebookSelection"==l[b]&&"smartFiling"==a.options[l[b]]&&Browser.sendToExtension({name:"main_isAuthenticated",type:"options",option:"notebookSelection"}),e=document.getElementsByName(b),f=0;f<e.length;f++)e.item(f).value==a.options[l[b]]&&(e.item(f).checked=!0),e.item(f).addEventListener("change",v);g()}},options_isAuthenticated:function(a){a&&a.auth&&("useSearchHelper"==a.option?Persistent.set(a.auth.userId+"_turnedOffSearchHelper",!0):"notebookSelection"==a.option&&a.auth.bizAuthenticationToken&&
(document.querySelector("#bizSmartFilingCheckbox").style.display="block",g()))}});var q={smartFilingTags:"smartFilingTags",alwaysTagWith:"alwaysTagWith",useSearchHelper:"useSearchHelper",simulateSimplifiedChinese:"simulateSimplifiedChinese",useStage:"useStage",enableKeyboardShortcuts:"enableKeyboardShortcuts",bizSmartFilingEnabled:"bizSmartFilingEnabled"},s={clipAction:"clipAction",readingSpeed:"readingSpeed",voice:"voice"},p={alwaysTags:"alwaysTags",insecureProto:"insecureProto",secureProto:"secureProto",
overrideServiceURL:"overrideServiceURL",startWebClipperShortcut:"startWebClipperShortcut",closeWebClipperShortcut:"closeWebClipperShortcut",previewArticleShortcut:"previewArticleShortcut",previewFullPageShortcut:"previewFullPageShortcut",previewUrlShortcut:"previewUrlShortcut",selectionModeShortcut:"selectionModeShortcut",takeScreenshotShortcut:"takeScreenshotShortcut",clearlyShortcut:"clearlyShortcut",pdfShortcut:"pdfShortcut",emailShortcut:"emailShortcut",expandArticleShortcut:"expandArticleShortcut",
contractArticleShortcut:"contractArticleShortcut",moveArticleUpShortcut:"moveArticleUpShortcut",moveArticleDownShortcut:"moveArticleDownShortcut",selectNotebookShortcut:"selectNotebookShortcut",addTagsShortcut:"addTagsShortcut",saveShortcut:"saveShortcut",selectAllMarkupShortcut:"selectAllMarkupShortcut",arrowShortcut:"arrowShortcut",textShortcut:"textShortcut",rectangleShortcut:"rectangleShortcut",roundedRectangleShortcut:"roundedRectangleShortcut",ellipseShortcut:"ellipseShortcut",lineShortcut:"lineShortcut",
markerShortcut:"markerShortcut",highlighterShortcut:"highlighterShortcut",stampShortcut:"stampShortcut",pixelateShortcut:"pixelateShortcut",cropShortcut:"cropShortcut",zoomInShortcut:"zoomInShortcut",zoomOutShortcut:"zoomOutShortcut",zoomToFitShortcut:"zoomToFitShortcut",zoomToOriginalShortcut:"zoomToOriginalShortcut",undoShortcut:"undoShortcut",redoShortcut:"redoShortcut"},l={notebookSelection:"notebookSelection",defaultClipAction:"defaultClipAction",client:"client"};window.addEventListener("keydown",
function(a){event.keyCode==w[k]?k++:k=0;k==w.length&&(k=0,"none"==document.getElementById(n).style.display?document.getElementById(n).style.display="block":document.getElementById(n).style.display="none",g())});var w=[38,38,40,40,37,39,37,39,66,65],k=0,n="developerContainer";window.addEventListener("message",function(a){if("setPinchHeight"==a.data.name)document.querySelector(".pinch").style.height=a.data.totalHeight-221+"px",document.querySelector("#optionsContainer").style.height=a.data.totalHeight-
221+"px";else if("setKeyboardHandlers"==a.data.name){var b={},c;for(c in a.data.handlers)for(var d=0;d<a.data.handlers[c].length;d++)switch(c){case "closeWebClipperShortcut":b[a.data.handlers[c][d]]=function(){t&&(window.parent.focus(),window.parent.postMessage({name:"hideOptions"},"*"))}}Browser.addKeyboardHandlers(b)}});Object.preventExtensions(this)}Object.preventExtensions(OptionsController);var optionsController=new OptionsController;
window.addEventListener("DOMContentLoaded",function(){SAFARI&&(document.body.className+=" safari");/iframe/.test(document.location.hash)&&(document.body.className+=" iframe");Browser.addMessageHandlers({options_config:function(c){if(c.bootstrapInfo&&c.bootstrapInfo.name){var g=document.querySelector("#logo");c.bootstrapInfo.name.match(/china/i)&&(g.className="china");c=document.querySelector("#secureProto").value+c.bootstrapInfo.serviceHost;document.querySelector("#copyright").innerHTML=Browser.i18n.getMessage("copyright",
[c]);c=document.querySelectorAll(".tab");for(g=0;g<c.length;g++)c.item(g).addEventListener("click",function(){var c=document.querySelector(".tab.pressed");c&&(c.className=c.className.replace(/\s*pressed/g,""));c=document.querySelector(".pinch");c.className=c.className.replace(/\s*(options|shortcuts|legal)/g,"");this.className+=" pressed";"optionsTab"==this.id?c.className+=" options":"shortcutsTab"==this.id?c.className+=" shortcuts":"legalTab"==this.id&&(c.className+=" legal")});document.getElementById("done").addEventListener("click",
function(){window.parent.postMessage({name:"hideOptions"},"*")})}},receivePersistentValue:function(c,g,m){"EVERNOTE_VERSION"==c.key&&(document.querySelector("#versionInfo").textContent=Browser.i18n.getMessage("options_buildId")+" "+c.value+"/0")}});Browser.sendToExtension({name:"main_getConfig",bootstrapInfo:{name:null,serviceHost:null},returnName:"options_config"});try{var m=Browser.i18n.getMessage("options_buildId"),r=BUILD_VERSION,u=SKITCH_BUILD_VERSION;0===r?Browser.sendToExtension({name:"getPersistentValue",
key:"EVERNOTE_VERSION"}):document.querySelector("#versionInfo").textContent=m+" "+r+"/"+u}catch(v){console.warn("Couldn't set build version."),console.log(v)}});window.addEventListener("error",function(m){log.error(JSON.stringify(m))});
