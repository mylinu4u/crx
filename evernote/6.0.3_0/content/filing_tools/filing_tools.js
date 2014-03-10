var title,notebookControl,tags,comment,url,notebooks,persNotebooks,sharedNotebooks,persNotebookElts,sharedNotebookElts,stackElts,tagControl,linkedAuths={},persTags,bizTags,currentAutoCompleteTagType,relatedNotes,userId,userType,defaultNB,recNB,recentNotebooks,smartFilingNB,smartFilingNBType,keyboardShortcutsEnabled;
function addNotebook(b,a,c,d){var e;a.bizUsername?e=a.bizUsername:a.linkedUsername&&(e=a.linkedUsername);d=d?notebookControl.addNotebookToStack(a.name,a.guid,a.type,e,a.shareKey,a.linkedNotebookGuid,d):notebookControl.addNotebookToAll(a.name,a.guid,a.type,e,a.shareKey,a.linkedNotebookGuid);setDialogHeight();"pers"==b?persNotebookElts.push(d):"shared"==b&&sharedNotebookElts.push(d);a.defaultNotebook&&(defaultNB=d);c&&c==a.guid&&(recNB=d);"shared"==b&&a.auth&&(linkedAuths[a.guid]=a.auth)}
function buildNote(b){var a={},c=GlobalUtils.removeControlCharacters(title.value);a.title=c.trim();a.title||(a.title=Browser.i18n.getMessage("quickNote_untitledNote"));if(c=GlobalUtils.removeControlCharacters(comment.value).trim())a.comment=GlobalUtils.escapeXML(c).replace(/\n/g,"<br/>");b?(a.notebookGuid=defaultNB.id,a.notebookName=defaultNB.textContent||defaultNB.innerText,a.type=defaultNB.getAttribute("pers")||"pers"):(a.notebookGuid=notebookControl.getSelected().guid,a.notebookName=notebookControl.getSelected().name,
a.type=notebookControl.getSelected().type);"linked"==a.type&&(a.auth=linkedAuths[a.notebookGuid],a.shareKey=notebookControl.getSelected().shareKey);if("linked"==a.type||"biz"==a.type)a.linkedNotebookGuid=notebookControl.getSelected().linkedGuid;"linked"!=a.type&&(a.tagNames=tagControl.getSelectedTags());a.relatedNotes=relatedNotes;a.url=url.innerText;return a}
function calcBodyHeight(){var b=document.querySelector("#main").offsetHeight+10,a=b-document.querySelector("#tags").offsetTop,c=document.querySelector("#tagsAutocompleteContainer");return Math.max(b+(c.offsetHeight+c.offsetTop+7)-a,b)}function handleEscape(){window.parent.focus();window.parent.postMessage({name:"toggleFilingTools"},"*")}function handleShortcut(b){keyboardShortcutsEnabled&&b()}
function insertNotebook(b,a,c,d,e){var f=null;c.bizUsername?f=c.bizUsername:c.linkedUsername&&(f=c.linkedUsername);a=e?notebookControl.insertNotebookIntoStack(a,c.name,c.guid,c.type,f,c.shareKey,c.linkedNotebookGuid,e):notebookControl.insertNotebook(a,c.name,c.guid,c.type,f,c.shareKey,c.linkedNotebookGuid);setDialogHeight();"pers"==b?persNotebookElts.push(a):"shared"==b&&sharedNotebookElts.push(a);c.defaultNotebook&&(defaultNB=a);d&&d==c.guid&&(recNB=a)}
function mergeNotebooks(b,a){if(0<b.length){notebooks=b.concat(notebooks).sort(sortAlphabetically);for(var c=[],d=0;d<b.length;d++){var e=notebooks.indexOf(b[d]);-1<e&&c.push(e)}var c=c.sort(function(a,b){return a>b?1:a==b?0:-1}),f;recentNotebooks&&recentNotebooks[userId]&&(f=recentNotebooks[userId]);for(var g=0,d=0;d<c.length;d++)if(e=c[d],"notebook"==notebooks[e].class)insertNotebook(a,e-g,notebooks[e],f);else if("stack"==notebooks[e].class)if(notebooks[e-1]&&"stack"==notebooks[e-1].class&&notebooks[e-
1].name==notebooks[e].name)g++,mergeStacks(notebooks[e-1],notebooks[e],a,f);else if(notebooks[e+1]&&"stack"==notebooks[e+1].class&&notebooks[e+1].name==notebooks[e].name)g++,mergeStacks(notebooks[e+1],notebooks[e],a,f);else{var h=notebookControl.insertStackIfNeeded(e-g,notebooks[e].name);h&&stackElts.push(h);notebooks[e].notebooks=notebooks[e].notebooks.sort(sortAlphabetically);for(h=0;h<notebooks[e].notebooks.length;h++)addNotebook(a,notebooks[e].notebooks[h],f,notebooks[e].name)}}}
function mergeStacks(b,a,c,d){b=b.notebooks.concat(a.notebooks).sort(sortAlphabetically);for(var e=[],f=0;f<a.notebooks.length;f++){var g=b.indexOf(a.notebooks[f]);-1<g&&e.push(g)}e=e.sort(function(a,b){return a>b?1:a==b?0:-1});for(f=0;f<e.length;f++)g=e[f],insertNotebook(c,g,b[g],d,a.name)}
function notebookSelectorCallback(b){"selectedNotebook"==b.name&&("biz"==b.type?(tagControl.setDisabled(!1),bizTags&&"biz"!=currentAutoCompleteTagType&&(currentAutoCompleteTagType="biz",tagControl.setAutoCompleteList(bizTags))):"linked"==b.type?tagControl.setDisabled(!0):(tagControl.setDisabled(!1),persTags&&"pers"!=currentAutoCompleteTagType&&(currentAutoCompleteTagType="pers",tagControl.setAutoCompleteList(persTags))),window.parent.postMessage({name:"setNotebook",notebook:b.notebookName,smart:b.smart},
"*"))}function receiveBizTags(b,a,c){bizTags=b.tags;notebookControl.getSelected()&&"biz"==notebookControl.getSelected().type&&(currentAutoCompleteTagType="biz",tagControl.setAutoCompleteList(bizTags))}
function receivePersNotebooks(b,a,c){b.notebooks=b.notebooks.sort(sortAlphabetically);recentNotebooks=b.recentNotebooks;if(persNotebooks){c=!1;if(persNotebooks.length==b.notebooks.length)for(a=0;a<b.notebooks.length;a++)if(persNotebooks[a].class!==b.notebooks[a].class||persNotebooks[a].name!==b.notebooks[a].name){c=!0;break}else if("notebook"===persNotebooks[a].class){if(persNotebooks[a].guid!==b.notebooks[a].guid){c=!0;break}}else{if("stack"===persNotebooks[a].class)if(persNotebooks[a].notebooks.length==
b.notebooks[a].notebooks.length)for(var d=0;d<b.notebooks[a].notebooks.length;d++){if(persNotebooks[a].notebooks[d].name!==b.notebooks[a].notebooks[d].name||persNotebooks[a].notebooks[d].guid!==b.notebooks[a].notebooks[d].guid){c=!0;break}}else{c=!0;break}}else c=!0;if(c){for(c=persNotebookElts.pop();c;)c.parentNode&&c.parentNode.removeChild(c),c=persNotebookElts.pop();notebookControl.setListHeight();setDialogHeight();d=notebooks.length-1;for(a=persNotebooks.length-1;0<=a;a--)for(;0<=d;)if(persNotebooks[a].name==
notebooks[d].name&&persNotebooks[a].guid==notebooks[d].guid){notebooks.splice(d,1);d--;break}else d--}else return}else persNotebooks=b.notebooks.concat(),persNotebookElts=[];if(notebooks)mergeNotebooks(b.notebooks,"pers");else{notebooks=b.notebooks;var e;recentNotebooks&&recentNotebooks[userId]&&(e=recentNotebooks[userId]);stackElts=[];for(a=0;a<notebooks.length;a++)if("notebook"==notebooks[a].class)addNotebook("pers",notebooks[a],e);else if("stack"==notebooks[a].class)for((c=notebookControl.addStackIfNeeded(notebooks[a].name))&&
stackElts.push(c),notebooks[a].notebooks=notebooks[a].notebooks.sort(sortAlphabetically),d=0;d<notebooks[a].notebooks.length;d++)addNotebook("pers",notebooks[a].notebooks[d],e,notebooks[a].name)}notebookControl.overridable()?recNB?notebookControl.select(recNB,!1):defaultNB&&notebookControl.select(defaultNB,!1):notebookControl.hasNotChangedSmartFiling()&&selectSmartNotebookInList()}
function receivePersTags(b,a,c){persTags=b.tags;notebookControl.getSelected()&&"pers"==notebookControl.getSelected().type&&(currentAutoCompleteTagType="pers",tagControl.setAutoCompleteList(persTags))}
function receiveSharedNotebooks(b,a,c){b.notebooks=b.notebooks.sort(sortAlphabetically);recentNotebooks=b.recentNotebooks;if(sharedNotebooks){c=!1;if(sharedNotebooks.length==b.notebooks.length)for(a=0;a<b.notebooks.length;a++){if(sharedNotebooks[a].guid!=b.notebooks[a].guid||sharedNotebooks[a].name!=b.notebooks[a].name){c=!0;break}}else c=!0;if(c){for(c=sharedNotebookElts.pop();c;)c.parentNode&&c.parentNode.removeChild(c),c=sharedNotebookElts.pop();notebookControl.setListHeight();setDialogHeight();
c=notebooks.length-1;for(a=sharedNotebooks.length-1;0<=a;a--)for(;0<=c;)if(sharedNotebooks[a].name==notebooks[c].name&&sharedNotebooks[a].guid==notebooks[c].guid){notebooks.splice(c,1);c--;break}else c--}else return}else sharedNotebooks=b.notebooks.concat(),sharedNotebookElts=[];if(notebooks)for(mergeNotebooks(b.notebooks,"shared"),a=0;a<b.notebooks.length;a++)b.notebooks[a].auth&&(linkedAuths[b.notebooks[a].guid]=b.notebooks[a].auth);else{notebooks=b.notebooks.sort(sortAlphabetically);var d;recentNotebooks&&
recentNotebooks[userId]&&(d=recentNotebooks[userId]);stackElts=[];for(a=0;a<notebooks.length;a++)if("notebook"==notebooks[a].class)addNotebook("shared",notebooks[a],d);else if("stack"==notebooks[a].class)for((c=notebookControl.addStackIfNeeded(notebooks[a].name))&&stackElts.push(c),notebooks[a].notebooks=notebooks[a].notebooks.sort(sortAlphabetically),c=0;c<notebooks[a].notebooks.length;c++)addNotebook("shared",notebooks[a].notebooks[c],d,notebooks[a].name)}notebookControl.overridable()?recNB?notebookControl.select(recNB,
!1):defaultNB&&notebookControl.select(defaultNB,!1):notebookControl.hasNotChangedSmartFiling()&&selectSmartNotebookInList()}
function receiveSmartFilingInfo(b,a,c){notebookControl.overridable()&&b.filingInfo.notebook&&(smartFilingNB=b.filingInfo.notebook.guid,a={id:b.filingInfo.notebook.guid,innerText:b.filingInfo.notebook.name},b.filingInfo.notebook.biz?(smartFilingNBType="business",a.type="biz"):(smartFilingNBType="personal",a.type="pers"),notebookControl.select(a,!0));if(b.filingInfo.tags&&b.filingInfo.tags.list)for(a=0;a<b.filingInfo.tags.list.length;a++)tagControl.addTag(b.filingInfo.tags.list[a].name,!1,!0);b.filingInfo.relatedNotes&&
b.filingInfo.relatedNotes.list&&0<b.filingInfo.relatedNotes.list.length&&(relatedNotes=b.filingInfo.relatedNotes.list)}function reset(){notebookControl.reset();smartFilingNBType=smartFilingNB=recNB=defaultNB=stackElts=sharedNotebookElts=persNotebookElts=sharedNotebooks=persNotebooks=notebooks=null;tagControl.clearAll();relatedNotes=currentAutoCompleteTagType=bizTags=persTags=null;comment.value="";setDialogHeight()}
function saveLastNotebook(){recentNotebooks||(recentNotebooks={});recentNotebooks[userId]=notebookControl.getSelected().guid;Browser.sendToExtension({name:"setPersistentValue",key:"recentNotebooks",value:recentNotebooks})}function selectSmartNotebookInList(){var b=notebookControl.getSelected().guid;b&&(b=notebookControl.getNotebook(b))&&notebookControl.select(b,!0)}function setDialogHeight(){window.parent.postMessage({name:"setFilingToolsHeight",height:calcBodyHeight()},"*")}
function sortAlphabetically(b,a){var c=b.name.toLowerCase(),d=a.name.toLowerCase();return c.localeCompare(d)}function tagControlCallback(b){setDialogHeight();-1<["createTag","clearTag","clearTags"].indexOf(b.name)&&window.parent.postMessage(b,"*")}
window.addEventListener("DOMContentLoaded",function(){title=document.querySelector("#title textarea");notebookControl=new NotebookSelector(document.querySelector("#notebook .search input"),document.querySelector("#notebook .search .cancel"),document.querySelector("#notebook .list"),notebookSelectorCallback);tags=document.querySelector("#tags input");tagControl=new TagEntryBox(document.querySelector("#existingTags"),tags,document.querySelector("#clearTags"),document.querySelector("#tagsAutocomplete"),
document.querySelector("#tagsAutocompleteContainer"),tagControlCallback);comment=document.querySelector("#comment textarea");url=document.querySelector("#url");GlobalUtils.localize(document.body);title.placeholder=Browser.i18n.getMessage("quickNote_untitledNote");comment.placeholder=Browser.i18n.getMessage("commentIconTooltip");document.querySelector("#notebook input").placeholder=Browser.i18n.getMessage("findANotebook");title.addEventListener("input",function(){title.value=title.value.replace(/\n/g,
"");document.querySelector("#title .expandingArea pre span").innerText=title.value;setDialogHeight()});title.addEventListener("blur",function(){title.scrollTop=0});comment.addEventListener("input",function(){document.querySelector("#comment .expandingArea pre span").innerText=comment.value;setDialogHeight()});comment.addEventListener("blur",function(){comment.scrollTop=0});window.parent.postMessage({name:"uiReady"},"*")});
Browser.addMessageHandlers({receiveBizTags:receiveBizTags,receivePersNotebooks:receivePersNotebooks,receivePersTags:receivePersTags,receiveSharedNotebooks:receiveSharedNotebooks,receiveSmartFilingInfo:receiveSmartFilingInfo});
window.addEventListener("message",function(b){if("initialize"==b.data.name){title.value=b.data.title;b.data.gmailThread&&/^(.+) - (.+) - (.+)$/.test(title.value)&&(title.value=/^(.+) - (.+) - (.+)$/.exec(title.value)[1]);title.value=title.value.slice(0,255);document.querySelector("#title .expandingArea pre span").innerText=title.value;setDialogHeight();url.innerText=b.data.url;userId=b.data.userId;userType=b.data.userType;if(b.data.alwaysTags)for(var a=b.data.alwaysTags.split(/\s*,\s*/),c=0;c<a.length;c++)""!=
a[c].trim()&&tagControl.addTag(a[c]);keyboardShortcutsEnabled=b.data.keyboardShortcutsEnabled}else if("sendFilingInfo"==b.data.name)notebookControl.changedNotebook()&&saveLastNotebook(),c=buildNote(b.data.useDefaultNotebook),Browser.sendToExtension({name:"receiveNoteFilingInfo",noteFilingInfo:c,pendingNoteKey:b.data.pendingNoteKey,userId:userId,userType:userType}),(b=recNB)||(b=defaultNB),smartFilingNB&&b.id!=smartFilingNB&&Browser.sendToExtension({name:"trackEvent",userId:userId,category:"Smart Filing",
action:smartFilingNBType+" notebook -> "+(c.notebookGuid==smartFilingNB?"kept suggestion":c.notebookGuid==b.id?"biz"==c.type?"changed to default or last selected notebook (business)":"changed to default or last selected notebook (personal)":"biz"==c.type?"changed to another notebook (business)":"changed to another notebook (personal)"),label:userType});else if("reset"==b.data.name)reset();else if("setFocus"==b.data.name)"notebook"==b.data.focus?notebookControl.focusEntry():"tags"==b.data.focus&&tagControl.focusEntry();
else if("setKeyboardHandlers"==b.data.name){var a={},d;for(d in b.data.handlers)for(c=0;c<b.data.handlers[d].length;c++)switch(d){case "closeWebClipperShortcut":a[b.data.handlers[d][c]]=function(){handleShortcut(handleEscape)}}Browser.addKeyboardHandlers(a);tagControl.setKeyboardHandlers(b.data.handlers)}});
