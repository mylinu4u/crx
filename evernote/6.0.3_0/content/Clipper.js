function Clipper(){function r(a,e){g(document.body,null,a,function(a){a=k(document.body,a);e(a)})}function s(a){a('<embed src="'+pageInfo.getPdfUrl()+'" type="application/pdf"></embed>')}function t(a,e,f){function d(a){a=k(c.commonAncestorContainer,a);f(a,c.commonAncestorContainer.scrollWidth+"px")}if(e&&document.querySelector("embed[type='application/pdf']"))f(e);else{var b,c;try{if(b=contentPreview.ensureSelectionIsShown())if(c=b.getRangeAt(0))if(c.commonAncestorContainer.nodeType==Node.TEXT_NODE){var h=
c.commonAncestorContainer.textContent.substring(c.startOffset,c.endOffset);f(x(h))}else g(c.commonAncestorContainer,c,a,d)}catch(y){f("")}}}function u(a,e){e(k(document.body,'<img src="'+a+'" />',!0))}function v(a){var e=contentPreview.getUrlElement(function(e){a(e)});e&&a(e)}function g(a,e,f,d,b){m=a;n=e;p=f;q=d;if(b)w.serialize(m,n,p,q,null,b);else{a=function(a){w.serialize(m,n,p,q,a)};try{serializeFrames(a)}catch(c){log.error("serializeFrames failed")}}}function k(a,e,f){a=a.querySelectorAll("img");
for(var d=0;d<a.length;d++){var b=a.item(d);if(b.getAttribute("src")&&""!=b.getAttribute("src").trim()&&/^https?:\/\//.test(b.src)){var c=/^(https?:\/\/.[^\/]+)\/?/.exec(b.src)[1],h=/^(https?:\/\/.[^\/]+)\/?/.exec(document.location.href)[1];if(c==h&&(c=document.createElement("canvas"),f?(c.width=b.naturalWidth||1,c.height=b.naturalHeight||1):(c.width=b.width||1,c.height=b.height||1),h=c.getContext("2d"),b.naturalWidth||b.naturalHeight)){f?h.drawImage(b,0,0,b.naturalWidth,b.naturalHeight):h.drawImage(b,
0,0,b.width,b.height);try{e=/\.jpe?g$/.test(b.src)?e.replace(b.src,c.toDataURL("image/jpeg")):e.replace(b.src,c.toDataURL("image/png"))}catch(g){if(18!=g.code)throw g;}}}}return e}function x(a){a=a.replace(/&/g,"&amp;");a=a.replace(/</g,"&lt;");return a=a.replace(/>/g,"&gt;")}var w=new HtmlSerializer,m,n,p,q;Browser.addMessageHandlers({clipFullPage:function(a,e,f){var d=UUID.generateGuid();clipResultCoordinator.showClipResult(d,function(){Browser.sendToExtension({name:"receiveNoteFilingInfo",noteFilingInfo:{title:document.title||
Browser.i18n.getMessage("quickNote_untitledNote"),type:"pers",url:document.location.href},pendingNoteKey:d,userId:a.userId,userType:a.userType});r(!0,function(b){Browser.sendToExtension({name:"receiveNoteContent",clipType:"fullPage",html:b,pendingNoteKey:d,recommendationText:pageInfo.getRecommendationText(!1),userId:a.userId,userType:a.userType});contentPreview.reset()})})},clipSelection:function(a,e,f){var d=UUID.generateGuid();clipResultCoordinator.showClipResult(d,function(){Browser.sendToExtension({name:"receiveNoteFilingInfo",
noteFilingInfo:{title:document.title||Browser.i18n.getMessage("quickNote_untitledNote"),type:"pers",url:document.location.href},pendingNoteKey:d,userId:a.userId,userType:a.userType});t(!0,a.selectionText,function(b,c){Browser.sendToExtension({name:"receiveNoteContent",clipType:"selection",html:b,pendingNoteKey:d,recommendationText:pageInfo.getRecommendationText(!1),userId:a.userId,userType:a.userType,width:c});contentPreview.reset()})})},clipImage:function(a,e,f){var d=UUID.generateGuid();clipResultCoordinator.showClipResult(d,
function(){Browser.sendToExtension({name:"receiveNoteFilingInfo",noteFilingInfo:{title:document.title||Browser.i18n.getMessage("quickNote_untitledNote"),type:"pers",url:document.location.href},pendingNoteKey:d,userId:a.userId,userType:a.userType});u(a.imageUrl,function(b){Browser.sendToExtension({name:"receiveNoteContent",clipType:"image",html:b,pendingNoteKey:d,recommendationText:pageInfo.getRecommendationText(!1),userId:a.userId,userType:a.userType});contentPreview.reset()})})},clipPdf:function(a,
e,f){var d=UUID.generateGuid();clipResultCoordinator.showClipResult(d,function(){Browser.sendToExtension({name:"receiveNoteFilingInfo",noteFilingInfo:{title:document.title||Browser.i18n.getMessage("quickNote_untitledNote"),type:"pers",url:document.location.href},pendingNoteKey:d,userId:a.userId,userType:a.userType});s(function(b){Browser.sendToExtension({name:"receiveNoteContent",clipType:"pdf",html:b,pendingNoteKey:d,recommendationText:pageInfo.getRecommendationText(!1),userId:a.userId,userType:a.userType});
contentPreview.reset()})})},clipUrl:function(a,e,f){var d=UUID.generateGuid();clipResultCoordinator.showClipResult(d,function(){Browser.sendToExtension({name:"receiveNoteFilingInfo",noteFilingInfo:{title:document.title||Browser.i18n.getMessage("quickNote_untitledNote"),type:"pers",url:document.location.href},pendingNoteKey:d,userId:a.userId,userType:a.userType});v(function(b){Browser.sendToExtension({name:"receiveNoteContent",clipType:"url",html:b,pendingNoteKey:d,recommendationText:pageInfo.getRecommendationText(!1),
userId:a.userId,userType:a.userType});contentPreview.reset()})})}});this.clipArticle=function(a,e){function f(l){h+=l;c<b.length?g(b[c++],null,a,f):(l=h,l=k(d,l),e(l,window.getComputedStyle(d).width))}var d,b=pageInfo.getAdditionalPages(),c=0,h="";try{if(d=contentPreview.getArticleElement()){g(d,null,a,f);return}}catch(m){log.warn("Couldn't get preview from contentPreview. Trying pageInfo.")}try{pageInfo.getDefaultArticle(function(b){d=b;g(d,null,a,f)});return}catch(n){log.warn("Couldn't get article from pageInfo. Trying default.")}d=
document.body;g(d,null,a,f)};this.clipEmail=function(a){var e=contentPreview.getEmailElement();g(e,null,!0,function(f){f=k(e,f);a(f)})};this.clipImage=u;this.clipFullPage=r;this.clipPdf=s;this.clipSelection=t;this.clipUrl=v;this.clipClearly=function(a,e,f){for(var d=a.cloneNode(!0),b=d.querySelectorAll("sup"),c=0;c<b.length;c++)b.item(c).parentNode.removeChild(b.item(c));b=d.querySelectorAll("span");for(c=0;c<b.length;c++)b.item(c).parentNode.removeChild(b.item(c));b=d.querySelectorAll("a."+e.ClearlyComponent__highlight.settings.highlightElementDeleteCSSClass);
for(c=0;c<b.length;c++)b.item(c).parentNode.removeChild(b.item(c));b=d.querySelectorAll("em."+e.ClearlyComponent__highlight.settings.highlightElementCSSClass);for(c=0;c<b.length;c++)b.item(c).outerHTML="<highlight>"+b.item(c).innerHTML+"</highlight>";g(d,null,!1,function(b){b=k(a,b);f(b)},e)};Object.preventExtensions(this)}Object.preventExtensions(Clipper);
