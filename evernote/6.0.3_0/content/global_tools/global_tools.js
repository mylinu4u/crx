var tooltipTimeout,skitchStarted=!1,subtoolPanelWasOpen=!1,article,clearly,fullPage,selection,pdf,email,url,hideTab,notebook,tags,shareButton,saveButton,filingDialogArrow,filingDialogSliver,shareDialogArrow,shareDialogSliver,userToolsArrow,userToolsSliver,eventFilter;function isAllowed(a){return"object"!==typeof eventFilter||a in eventFilter&&eventFilter[a]?(window.parent.postMessage({name:"eventDetected",wnd:"globalTools",type:a},"*"),!0):!1}
window.addEventListener("DOMContentLoaded",function(){article=document.querySelector(".clipper#article");clearly=document.querySelector(".clipper#clearly");fullPage=document.querySelector(".clipper#fullPage");selection=document.querySelector(".clipper#selection");pdf=document.querySelector(".clipper#pdf");email=document.querySelector(".clipper#email");url=document.querySelector(".clipper#url");hideTab=document.querySelector("#hideTab");notebook=document.querySelector("#notebook");tags=document.querySelector("#tags");
shareButton=document.querySelector("#shareButton");saveButton=document.querySelector("#saveButton");filingDialogArrow=document.querySelector("#filingDialogArrow");filingDialogSliver=document.querySelector("#filingDialogSliver");shareDialogArrow=document.querySelector("#shareDialogArrow");shareDialogSliver=document.querySelector("#shareDialogSliver");userToolsArrow=document.querySelector("#userToolsArrow");userToolsSliver=document.querySelector("#userToolsSliver");GlobalUtils.localize(document.body);
tags.setAttribute("data-placeholder",Browser.i18n.getMessage("quickNote_addTags"));for(var a=document.querySelectorAll(".clipper"),b=0;b<a.length;b++)a.item(b).addEventListener("click",handleClipperToolClick);a=document.querySelectorAll(".skitch");for(b=0;b<a.length;b++){"highlighter"==a.item(b).id?a.item(b).addEventListener("click",handleHighlighterClick):a.item(b).addEventListener("click",handleSkitchToolClick);a.item(b).addEventListener("mousemove",handleSkitchToolMousemove);a.item(b).addEventListener("mouseout",
handleSkitchToolMouseout);var c=a.item(b).id;"highlighter"==c?a.item(b).setAttribute("tooltip",Browser.i18n.getMessage("htmlHighlighter")):"arrow"==c?a.item(b).setAttribute("tooltip",Browser.i18n.getMessage("arrowTool")):/^stamp/.test(c)?a.item(b).setAttribute("tooltip",Browser.i18n.getMessage("stampTool")):-1<["rectangle","line","ellipse","roundedRectangle","rectangle"].indexOf(c)?a.item(b).setAttribute("tooltip",Browser.i18n.getMessage("shapeTool")):"text"==c?a.item(b).setAttribute("tooltip",Browser.i18n.getMessage("typeTool")):
"pixelate"==c?a.item(b).setAttribute("tooltip",Browser.i18n.getMessage("pixelatorTool")):"marker"==c?a.item(b).setAttribute("tooltip",Browser.i18n.getMessage("markerTool")):"color"==c?a.item(b).setAttribute("tooltip",Browser.i18n.getMessage("colors")):"crop"==c?a.item(b).setAttribute("tooltip",Browser.i18n.getMessage("crop")):"zoomin"==c?a.item(b).setAttribute("tooltip",Browser.i18n.getMessage("zoomin")):"zoomout"==c&&a.item(b).setAttribute("tooltip",Browser.i18n.getMessage("zoomout"))}a=document.querySelectorAll(".subtool");
for(b=0;b<a.length;b++)a.item(b).addEventListener("click",handleSubtoolClick);hideTab.addEventListener("click",function(){/tempHidden/.test(document.body.className)?(document.body.className=document.body.className.replace(/\s*tempHidden/g,""),window.parent.postMessage({name:"untempHideGlobalTools"},"*")):tempHide()});notebook.addEventListener("click",toggleFilingTools);tags.addEventListener("click",toggleFilingTools);shareButton.addEventListener("click",share);saveButton.addEventListener("click",
save);Browser.sendToExtension({name:"getPersistentValue",key:"lastSkitchStamp"});document.querySelector("#userMenu").addEventListener("click",function(){isAllowed("userMenu")&&window.parent.postMessage({name:"toggleUserTools"},"*")});window.parent.postMessage({name:"uiReady"},"*")});
window.addEventListener("click",function(a){notebook.contains(a.srcElement)||tags.contains(a.srcElement)||shareButton.contains(a.srcElement)||saveButton.contains(a.srcElement)||userMenu.contains(a.srcElement)||!isAllowed("hideAllTools")||window.parent.postMessage({name:"hideAllTools"},"*")});
window.addEventListener("mousedown",function(a){var b=window.innerWidth-a.pageX,c=window.innerHeight-a.pageY,d=document.querySelector(".subtool_panel.visible");d&&!d.contains(a.srcElement)&&154<b&&(subtoolPanelWasOpen=!0,window.parent.postMessage({name:"setToolbarWidth",width:calcBodyWidth()+"px"},"*"),window.parent.postMessage({name:"dispatchEvent",type:"pointerdown",x:b,y:c},"*"),window.parent.postMessage({name:"dispatchEvent",type:"transformstart",x:b,y:c},"*"),closeSubtools())});
window.addEventListener("mousemove",function(a){subtoolPanelWasOpen&&(window.parent.postMessage({name:"dispatchEvent",type:"pointermove",x:document.width-a.pageX,y:document.height-a.pageY},"*"),window.parent.postMessage({name:"dispatchEvent",type:"transform",x:document.width-a.pageX,y:document.height-a.pageY},"*"))});
window.addEventListener("mouseup",function(a){subtoolPanelWasOpen&&(window.parent.postMessage({name:"dispatchEvent",type:"pointerup",x:document.width-a.pageX,y:document.height-a.pageY},"*"),window.parent.postMessage({name:"dispatchEvent",type:"transformend",x:document.width-a.pageX,y:document.height-a.pageY},"*"));subtoolPanelWasOpen=!1});
window.addEventListener("message",function(a){if("setUsername"==a.data.name)document.querySelector("#userMenu").innerText=a.data.fullName;else if("stopSkitch"==a.data.name)stopSkitch();else if("closeSubtools"==a.data.name)closeSubtools();else if("setPossibleClipTypes"==a.data.name)setPossibleClipTypes(a.data);else if("hideExtras"==a.data.name)hideExtras();else if("postCrop"==a.data.name){var b=document.querySelector(".precrop");b.className=b.className.replace(/\s*precrop/g,"");handleSkitchToolClick({srcElement:b,
clickFromKeyboard:a.data.fromKeyboard})}else"switchMode"==a.data.name?switchMode(a.data):"save"==a.data.name?save():"switchSkitchTool"==a.data.name?"shape"==a.data.tool?(document.querySelector("[tool='"+a.data.subtool+"']").click(),handleSkitchToolClick({srcElement:document.querySelector("#"+a.data.subtool),clickFromKeyboard:!0})):handleSkitchToolClick({srcElement:document.querySelector("[id^='"+a.data.tool+"']"),clickFromKeyboard:!0,location:a.data.location,charCode:a.data.charCode}):"setNotebook"==
a.data.name?msgHandlerSetNotebook(a.data):"createTag"==a.data.name?(b="<span",""!=tags.innerHTML&&(b=", "+b),a.data.smart&&(b+=' class="smart"'),b+=">"+a.data.tagName+"</span>",tags.innerHTML+=b,50<tags.scrollHeight&&(tags.className+=" overflow")):"clearTag"==a.data.name?(tags.innerHTML=tags.innerHTML.replace(RegExp(",?\\s?<span[^,]*>"+a.data.tagName+"</span>"),"").replace(/^,\s/,""),50>=tags.scrollHeight&&(tags.className=tags.className.replace(/\s*overflow/g,""))):"clearTags"==a.data.name?(tags.innerHTML=
"",tags.className=tags.className.replace(/\s*overflow/g,"")):"showFilingDialogHacks"==a.data.name?(filingDialogArrow.className+=" visible",filingDialogSliver.className+=" visible",filingDialogArrow.style.top=notebook.offsetTop+"px",filingDialogSliver.style.height=a.data.height+"px",filingDialogSliver.style.top=a.data.top+"px"):"hideFilingDialogHacks"==a.data.name?(filingDialogArrow.className=filingDialogArrow.className.replace(/\s*visible/g,""),filingDialogSliver.className=filingDialogSliver.className.replace(/\s*visible/g,
"")):"showShareDialogHacks"==a.data.name?(shareDialogArrow.className+=" visible",shareDialogSliver.className+=" visible",shareDialogArrow.style.bottom=window.innerHeight-shareButton.offsetTop-28+"px",shareDialogSliver.style.height=a.data.height+"px"):"hideShareDialogHacks"==a.data.name?(shareDialogArrow.className=filingDialogArrow.className.replace(/\s*visible/g,""),shareDialogSliver.className=filingDialogSliver.className.replace(/\s*visible/g,"")):"showUserToolsHacks"==a.data.name?(userToolsArrow.className+=
" visible",userToolsSliver.className+=" visible",userToolsSliver.style.height=a.data.height+"px"):"hideUserToolsHacks"==a.data.name?(userToolsArrow.className=userToolsArrow.className.replace(/\s*visible/g,""),userToolsSliver.className=userToolsSliver.className.replace(/\s*visible/g,"")):"reset"==a.data.name?reset():"reactivateClipperTool"==a.data.name?handleClipperToolClick({srcElement:document.querySelector(".clipper.active")}):"makeHidable"==a.data.name?makeHidable():"unmakeHidable"==a.data.name?
unmakeHidable():"tempHide"==a.data.name?tempHide():"eventFilter"==a.data.name?eventFilter=a.data.allowed:"eventClick"==a.data.name?document.querySelector(a.data.select).click():"getFilingTop"==a.data.name&&window.parent.postMessage({name:"receiveFilingTop",top:document.querySelector("#fileHeader").offsetTop},"*")});Browser.addMessageHandlers({doneSharing:doneSharing,receiveOption:receiveOption,receivePersistentValue:receivePersistentValue,receiveScreenshot:msgHandlerScreenshotDone});
function calcBodyWidth(){var a=154;/hidable/.test(document.body.className)&&(a=172);var b=0,c=document.querySelector(".tooltipon:first-child");c&&(b=parseInt(window.getComputedStyle(c,":before").width)+23,b-=25);if(c=document.querySelector(".tooltipon:last-child"))b=parseInt(window.getComputedStyle(c,":before").width)+23,b=Math.max(b-78,0);return document.querySelector(".subtool_panel.visible")?Math.max(a+b,330):a+b}
function closeSubtools(){var a=document.querySelector(".subtool_panel.visible");a&&(a.className=a.className.replace(/\s*visible/g,""))}function doneSharing(a,b,c){shareButton.className+=" doneSharing";saveButton.innerText=Browser.i18n.getMessage("update")}
function handleClipperToolClick(a){var b=document.querySelector(".clipper.active");b&&(b.className=b.className.replace(/\s*active/g,""));a.srcElement.className+=" active";if(isAllowed(a.srcElement.id))switch(a.srcElement.id){case "article":eventFilter||Browser.sendToExtension({name:"setPersistentValue",key:"lastUsedAction",value:"ARTICLE"});pauseSkitch();window.parent.postMessage({name:"hideSkitch"},"*");window.parent.postMessage({name:"hideClearly",after:"previewArticle"},"*");break;case "clearly":eventFilter||
Browser.sendToExtension({name:"setPersistentValue",key:"lastUsedAction",value:"CLEARLY"});window.parent.postMessage({name:"clearPreview"},"*");pauseSkitch();window.parent.postMessage({name:"hideSkitch"},"*");window.parent.postMessage({name:"showClearly"},"*");break;case "fullPage":eventFilter||Browser.sendToExtension({name:"setPersistentValue",key:"lastUsedAction",value:"FULL_PAGE"});pauseSkitch();window.parent.postMessage({name:"hideSkitch"},"*");window.parent.postMessage({name:"hideClearly",after:"previewFullPage"},
"*");break;case "pdf":window.parent.postMessage({name:"clearPreview"},"*");pauseSkitch();window.parent.postMessage({name:"hideSkitch"},"*");break;case "url":eventFilter||Browser.sendToExtension({name:"setPersistentValue",key:"lastUsedAction",value:"URL"});pauseSkitch("url");window.parent.postMessage({name:"hideSkitch"},"*");window.parent.postMessage({name:"hideClearly",after:"previewUrl"},"*");break;case "screenshot":eventFilter||Browser.sendToExtension({name:"setPersistentValue",key:"lastUsedAction",
value:"SKITCH"});handleSkitchToolClick({srcElement:document.querySelector(".subtool_panel.shapes").previousElementSibling});break;case "email":pauseSkitch();window.parent.postMessage({name:"hideSkitch"},"*");window.parent.postMessage({name:"hideClearly",after:"previewEmail"},"*");break;case "selection":pauseSkitch(),window.parent.postMessage({name:"hideSkitch"},"*"),window.parent.postMessage({name:"hideClearly",after:"previewSelection"},"*")}window.parent.focus()}
function handleHighlighterClick(){if(isAllowed("highlighter")){var a=document.querySelector(".skitch.active");a&&(a.className=a.className.replace(/\s*active/g,""));this.className+=" active";window.parent.postMessage({name:"useHighlighter"},"*")}}
function handleSkitchToolClick(a){if(isAllowed(a.srcElement.id)){if(!a.clickFromKeyboard){var b=document.querySelector(".clipper.active");b&&(b.className=b.className.replace(/\s*active/g,""));document.querySelector("#screenshot").className+=" active"}if("color"!=a.srcElement.id){if(b=document.querySelector(".skitch.active"))b.className=b.className.replace(/\s*active/g,""),"crop"==a.srcElement.id&&(b.className+=" precrop");a.srcElement.className+=" active"}a.clickFromKeyboard||window.parent.postMessage({name:"clearPreview"},
"*");b=a.srcElement.id;if(skitchStarted){var c=document.querySelector(".subtool_panel.visible");c&&a.srcElement.nextElementSibling!=c&&(c.className=c.className.replace(/\s*visible/g,""));0>["color","zoomin","zoomout"].indexOf(b)?window.parent.postMessage({name:"useSkitchTool",tool:b,location:a.location,charCode:a.charCode},"*"):/zoom/.test(b)&&window.parent.postMessage({name:b},"*");a.clickFromKeyboard||msgHandlerScreenshotDone({tool:b,showSubtools:a.constructor&&a.constructor==MouseEvent});makeHidable()}else skitchStarted=
!0,unmakeHidable(),Browser.sendToExtension({name:"prepareScreenshot",tool:b,showSubtools:/skitch/.test(a.srcElement.className)&&a.constructor&&a.constructor==MouseEvent})}window.parent.focus()}function handleSkitchToolMousemove(){clearTimeout(tooltipTimeout);var a=this;tooltipTimeout=setTimeout(function(){document.querySelector("#"+a.id+"+.subtool_panel.visible")||(a.className+=" tooltipon",window.parent.postMessage({name:"setToolbarWidth",width:calcBodyWidth()+"px"},"*"))},250)}
function handleSkitchToolMouseout(){clearTimeout(tooltipTimeout);this.className=this.className.replace(/\s*tooltipon/g,"");window.parent.postMessage({name:"setToolbarWidth",width:calcBodyWidth()+"px"},"*")}
function handleSubtoolClick(a){var b=a.srcElement.getAttribute("tool");isAllowed(b)&&(/colors/.test(a.srcElement.parentNode.className)?(a.srcElement.parentNode.previousElementSibling.setAttribute("color",b),Browser.sendToExtension({name:"setPersistentValue",key:"lastSkitchColor",value:b}),window.parent.postMessage({name:"useSkitchColor",color:b},"*")):(a.srcElement.parentNode.previousElementSibling.id=b,/stamps/.test(a.srcElement.parentNode.className)?Browser.sendToExtension({name:"setPersistentValue",
key:"lastSkitchStamp",value:b}):/shapes/.test(a.srcElement.parentNode.className)&&("arrow"==b?a.srcElement.parentNode.previousElementSibling.setAttribute("tooltip",Browser.i18n.getMessage("arrowTool")):a.srcElement.parentNode.previousElementSibling.setAttribute("tooltip",Browser.i18n.getMessage("shapeTool"))),window.parent.postMessage({name:"useSkitchTool",tool:b},"*")));a.srcElement.parentNode.className=a.srcElement.parentNode.className.replace(/\s*visible/g,"");window.parent.postMessage({name:"setToolbarWidth",
width:calcBodyWidth()+"px"},"*");window.parent.focus()}function hideExtras(){clearTimeout(tooltipTimeout);for(var a=document.querySelectorAll(".subtool_panel.visible"),b=0;b<a.length;b++)a.item(b).className=a.item(b).className.replace(/\s*visible/g,"");a=document.querySelectorAll(".tooltipon");for(b=0;b<a.length;b++)a.item(b).className=a.item(b).className.replace(/\s*tooltipon/g,"")}
function makeHidable(){/hidable/.test(document.body.className)||(document.body.className+=" hidable",window.parent.postMessage({name:"makeGlobalToolsHidable"},"*"))}
function receiveOption(a,b,c){"clipAction"==a.key&&(document.querySelector("#selection:not(.hidden)")?handleClipperToolClick({srcElement:document.querySelector("#selection")}):document.querySelector("#email:not(.hidden)")?handleClipperToolClick({srcElement:document.querySelector("#email")}):"ARTICLE"==a.value&&document.querySelector("#article:not(.hidden)")?handleClipperToolClick({srcElement:document.querySelector("#article")}):"CLEARLY"==a.value&&document.querySelector("#clearly:not(.hidden)")?handleClipperToolClick({srcElement:document.querySelector("#clearly")}):
"FULL_PAGE"==a.value&&document.querySelector("#fullPage:not(.hidden)")?handleClipperToolClick({srcElement:document.querySelector("#fullPage")}):"URL"==a.value&&document.querySelector("#url:not(.hidden)")?handleClipperToolClick({srcElement:document.querySelector("#url")}):"SKITCH"==a.value&&document.querySelector("#screenshot:not(.hidden)")?handleClipperToolClick({srcElement:document.querySelector("#screenshot")}):document.querySelector("#pdf:not(.hidden)")?handleClipperToolClick({srcElement:document.querySelector("#pdf")}):
document.querySelector("#article:not(.hidden)")?handleClipperToolClick({srcElement:document.querySelector("#article")}):document.querySelector("#fullPage:not(.hidden)")?handleClipperToolClick({srcElement:document.querySelector("#fullPage")}):document.querySelector("#url:not(.hidden)")&&handleClipperToolClick({srcElement:document.querySelector("#url")}))}
function receivePersistentValue(a,b,c){"lastSkitchStamp"==a.key&&a.value?document.querySelector(".stamps").previousElementSibling.id=a.value:"lastSkitchColor"==a.key&&a.value&&(document.querySelector("#color").setAttribute("color",a.value),window.parent.postMessage({name:"useSkitchColor",color:a.value},"*"))}
function reset(){article.className=article.className.replace(/\s*hidden/g,"");clearly.className=clearly.className.replace(/\s*hidden/g,"");fullPage.className=fullPage.className.replace(/\s*hidden/g,"");selection.className=selection.className.replace(/\s*hidden/g,"");pdf.className=pdf.className.replace(/\s*hidden/g,"");email.className=email.className.replace(/\s*hidden/g,"");url.className=url.className.replace(/\s*hidden/g,"");var a=document.querySelector(".clipper.active");a&&(a.className=a.className.replace(/\s*active/g,
""));shareButton.className=shareButton.className.replace(/\s*doneSharing/g,"");saveButton.innerText=Browser.i18n.getMessage("quickNote_submit")}
function msgHandlerScreenshotDone(a,b,c){b=document.querySelectorAll(".skitch_pair.conditional");for(c=0;c<b.length;c++)b.item(c).className=b.item(c).className.replace(/\s*hidden/g,"");a.showSubtools&&showSubtoolChooser(a);document.querySelector("#highlighter").setAttribute("tooltip",Browser.i18n.getMessage("imageHighlighter"));Browser.sendToExtension({name:"getPersistentValue",key:"lastSkitchColor"})}
function msgHandlerSetNotebook(a){var b="<span";a.smart&&(b+=' class="smart"');b+=' title="'+a.notebook+'">'+a.notebook+"</span>";notebook.innerHTML=b}
function pauseSkitch(a){if(a=document.querySelector(".skitch.active"))"highlighter"==a.id&&window.parent.postMessage({name:"turnOffHTMLHighlighter"},"*"),a.className=a.className.replace(/\s*active/g,"");a=document.querySelectorAll(".skitch_pair.conditional");for(var b=0;b<a.length;b++)a.item(b).className+=" hidden";document.querySelector("#highlighter").setAttribute("tooltip",Browser.i18n.getMessage("htmlHighlighter"));document.body.className=document.body.className.replace(/\s*tempHidden/g,"");unmakeHidable()}
function save(){isAllowed("saveButton")&&(stopSkitch(),window.parent.postMessage({name:"startSubmission",type:document.querySelector(".clipper.active").id},"*"))}
function setPossibleClipTypes(a){if(a.pageInfo.pdf||a.pageInfo.gmail){article.className+=" hidden";clearly.className+=" hidden";fullPage.className+=" hidden";selection.className+=" hidden";if(a.pageInfo.pdf||a.pageInfo.gmail&&!a.pageInfo.gmailThread)email.className+=" hidden";a.pageInfo.gmail&&(pdf.className+=" hidden",url.className+=" hidden")}else pdf.className+=" hidden",email.className+=" hidden",a.pageInfo.documentIsFrameset&&(fullPage.className+=" hidden"),a.pageInfo.selection||(selection.className+=
" hidden")}function share(){isAllowed("shareButton")&&window.parent.postMessage({name:"startSubmission",type:document.querySelector(".clipper.active").id,share:!0},"*")}
function showSubtoolChooser(a,b,c){b=document.querySelector("#"+a.tool);/expandable/.test(b.className)&&(a=document.querySelector("#"+a.tool+"+.subtool_panel"),/visible/.test(a.className)?a.className=a.className.replace(/\s*visible/g,""):(a.className+=" visible",b.className=b.className.replace(/\s*tooltipon/g,"")),window.parent.postMessage({name:"setToolbarWidth",width:calcBodyWidth()+"px"},"*"))}function stopSkitch(){skitchStarted=!1;pauseSkitch()}
function switchMode(a){a.mode?(a=document.querySelector("#"+a.mode+":not(.hidden)"))&&a.click():a.direction&&"next"==a.direction&&((a=document.querySelector(".clipper.active~.clipper:not(.hidden)"))?a.click():(a=document.querySelector(".clipper:not(.hidden)"))&&a.click())}function tempHide(){document.body.className+=" tempHidden";window.parent.postMessage({name:"tempHideGlobalTools"},"*")}
function toggleFilingTools(){isAllowed("toggleFilingTools")&&window.parent.postMessage({name:"toggleFilingTools",focus:this.id},"*")}function unmakeHidable(){document.body.className=document.body.className.replace(/\s*hidable/g,"")};