function ClipResultCoordinator(){function c(b){a&&a.parentNode&&(b?(a.addEventListener("webkitAnimationEnd",function(){a.parentNode.removeChild(a);a=null},!1),a.className="hide"):(a.parentNode.removeChild(a),a=null))}function e(b,g){f=g;c(!1);d=new MessageChannel;d.port1.addEventListener("message",h);d.port1.addEventListener("message",feedbackFormCoordinator.onMessage);d.port1.start();a=document.createElement("iframe");a.id="evernoteClipperResult";/^frameset$/i.test(document.body.nodeName)?document.body.parentNode.insertBefore(a,
null):document.body.insertBefore(a,null);a.src=Browser.extension.getURL("content/clip_result/clip_result.html#"+b);window.focus()}function h(b){"setClipResultHeight"==b.data.name?a&&a.style.setProperty("height",b.data.height+"px","important"):"hideClipResult"==b.data.name?c(!0):b.data.name==CLIP_RESULT_NAME+"Ready"&&f()}var f,a,d;window.addEventListener("click",c);this.hideClipResult=c;this.showClipResult=e;Browser.addMessageHandlers({receiveSecret:function(b,c,e){b.for===CLIP_RESULT_NAME&&a.contentWindow.postMessage({name:"receivePort",
secret:b.secret},Browser.extension.getURL(""),[d.port2])},showClipResult:function(a,c,d){e(a.pendingNoteKey,function(){document.body.style.overflow="";Browser.sendToExtension({name:"clipResultShown",pendingNoteKey:a.pendingNoteKey,userId:a.userId,userType:a.userType})})}});Object.preventExtensions(this)}Object.preventExtensions(ClipResultCoordinator);
