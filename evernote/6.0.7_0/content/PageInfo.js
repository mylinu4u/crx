function PageInfo(){function w(a){for(var b=[];a;)b.unshift(a),a=a.parentNode;return b}function t(a,b){var c;c=(c=document.location.href.match(/^.*?:\/\/(www\.)?(.*?)(\/|$)/))?c[2]:null;if(x[c]){var d=document.querySelector(x[c].container);if(d){var k=d.querySelectorAll(x[c].include);if(k&&0<k.length){var f=k[k.length-1].nextElementSibling;e=document.createElement("div");for(d=0;d<k.length;d++)e.appendChild(k[d]);f.parentNode.insertBefore(e,f)}}}if(!e&&y[c])for(d=0;d<y[c].length;d++){if(k=document.querySelector(y[c][d])){e=
k;break}}else if(-1!=P.indexOf(c)){c=document.getElementsByTagName("img");d=null;for(f=k=0;f<c.length;f++){var g=window.getComputedStyle(c[f]),h=g.width.replace(/[^0-9.-]/g,""),g=g.height.replace(/[^0-9.-]/g,""),h=h*g;if(!d||h>k)d=c[f],k=h}e=d}!e&&l&&(e=document.querySelector(n[l].content),e&&""!=e.textContent.trim()||(e=document.createElement("div"),document.body.insertBefore(e,document.body.firstChild)));e||(c=["jpeg","jpg","gif","png"],(d=document.location.href.replace(/^.*\.(\w+)$/,"$1"))&&-1!=
c.indexOf(d)&&(k=document.querySelector("body > img"))&&(e=k));if(!e&&"frameset"==document.body.nodeName.toLowerCase()){z=!0;c=document.getElementsByTagName("frame");d=null;for(f=k=0;f<c.length;f++)c[f].width&&c[f].height&&(h=c[f].width*c[f].height,h>k&&(d=c[f],k=h));(c=d)&&c.contentDocument&&c.contentDocument.documentElement&&(A=c,e=c.contentDocument.documentElement)}if(!e&&a&&a._elements&&a._elements.length){e=a._elements[0];if(1<a._elements.length)if(c=a._elements,c.length)if(1==c.length)e=c[0];
else{d=w(c[0]);f=null;for(k=1;k<c.length;k++){f=w(c[k]);h=null;for(g=0;g<d.length;g++)if(d[g]===f[g])h=d[g];else break;f=h;d=w(f)}e=f}else e=null;e.nodeType===Node.TEXT_NODE&&(e=e.parentNode)}e||(e=document.body);B=!0;b()}function Q(){!e||e.parentNode&&e.getBoundingClientRect&&0!=e.getBoundingClientRect().width||(e=null,C=[],q=[],B=!1);B?1048576<document.body.innerHTML.length?(log.warn("Page over 1mb, skipping article detection."),t(null,m)):m():"function"==typeof initClearlyComponent__detect&&"function"==
typeof initClearlyComponent__next?(window.ClearlyComponent__detect={callbacks:{finished:function(a){a&&a._html&&q.push(a._html);window.ClearlyComponent__next.start();t(a,m)}},window:window,document:document,jQuery:window.jQuery},window.ClearlyComponent__detect=initClearlyComponent__detect(window.ClearlyComponent__detect),window.ClearlyComponent__detect?(window.ClearlyComponent__next={callbacks:{newPageFound:function(a){q.push(a._html);C.push(a._elements[0]);r&&r(a._html,a._url,q.length)}},settings:{onCreateNextPagesContainerUseThisId:"evernoteClearlyNextContainer"},
detectComponentInstance:window.ClearlyComponent__detect},window.ClearlyComponent__next=initClearlyComponent__next(window.ClearlyComponent__next),window.ClearlyComponent__next?(window.ClearlyComponent__next.createNextPagesContainer(),window.ClearlyComponent__detect.start()):(log.warn("failed to initiate clearly next component"),t(null,m))):(log.warn("failed to initiate clearly detect component"),t(null,m))):(log.warn("Couldn't find clearly!"),t(null,m))}function D(a){m=a;Q()}function E(a,b){r=b;D(function(){a(e);
r&&r(null,null,q.length)});if(e)return e}function H(){var a=u();s=[];if(a)for(var b=0;b<a.rangeCount;b++){var c=a.getRangeAt(b);s[b]=c}}function u(){var a=window.getSelection();if(a&&a.rangeCount&&!a.isCollapsed)return a;for(var a=[],b=document.getElementsByTagName("iframe"),c=0;c<b.length;c++)a.push(b[c]);b=document.getElementsByTagName("frame");for(c=0;c<b.length;c++)a.push(b[c]);b=document.location.href.replace(/^(https?:\/\/.*?)\/.*/i,"$1").toLowerCase();for(c=0;c<a.length;c++)if(!a[c].src||a[c].src.toLowerCase().substr(0,
b.length)===b){var d=a[c].contentDocument;if(d){if((d=d.getSelection())&&d.rangeCount&&!d.isCollapsed)return I=!0,A=a[c],d}else log.warn("iframe contained no Document object.")}return null}function R(){var a=window.getSelection();a.removeAllRanges();for(var b=0;b<s.length;b++)a.addRange(s[b])}function p(a,b,c,d,e,f){if(a.nodeType==Node.TEXT_NODE)return d||!l?(a=S(a,e),f=f?GlobalUtils.removePunctuation(a.trim()).replace(/\s+/g," "):a.trim().replace(/\s+/g," ")," "===f||""===f?b:b+" "+f):b;var g=["script",
"noscript","style"];if(a.nodeType==Node.ELEMENT_NODE&&-1==g.indexOf(a.nodeName.toLowerCase())){if(/^evernote.+Tools$/.test(a.id))return b;for(g=0;g<a.childNodes.length;g++){if(l){var h;h=a.childNodes[g];var m=n[l].bannedSubelements;h=m&&h.webkitMatchesSelector&&h.webkitMatchesSelector(m)?!0:!1;if(h)continue;h=n[l].allowedElements;h=a.webkitMatchesSelector&&a.webkitMatchesSelector(h)?!0:!1;b=h||d?e?p(a.childNodes[g],b,c,!0,e,f):p(a.childNodes[g],b,c,!0,a,f):p(a.childNodes[g],b,c,!1,null,f)}else b=
p(a.childNodes[g],b,c,!1,null,f);if(b.length>c)break}}return b}function S(a,b){var c=a.textContent;if(l){var d;if("Baidu"==l){if(d=b.parentNode.parentNode.querySelector(".g"))d=d.textContent}else if("Yandex"==l||"YandexRU"==l){if(d=b.parentNode.querySelector(".b-serp-item__title-link, .serp-item__title-link"))d=d.href}else d=b.href;if(d){var e={wikipedia:/(.*)[-|\u2013|\u2014]/,youtube:/(.*)[-|\u2013|\u2014]/,facebook:/(.*)\|/,wiktionary:/(.*)-\sWiktionary/,stumbleupon:/(.*)\|\sStumbleUpon\.com/},
f;for(f in e)if(RegExp(f).test(d)){var g=e[f].exec(c);if(g)return b.setAttribute("sawdivider",!0),g[1];if(b.getAttribute("sawdivider"))return""}}if(/(\d+\slikes)|(\d+\stalking\sabout\sthis)/.test(c))return c.replace(/(\d+\slikes)|(\d+\stalking\sabout\sthis)/g," ");if(/Definition from Wiktionary, the free dictionary. Jump to: navigation, search/.test(c))return c.replace(/Definition from Wiktionary, the free dictionary. Jump to: navigation, search/g," ")}return c}function T(){var a=document.title;if(l)if(n[l].titleTrim)a=
n[l].titleTrim(a);else var b=a.split(" - "),a=a.replace(" - "+b[b.length-1],"");return a}function J(){if(l&&document.querySelector(n[l].searchBox)){var a=document.querySelector(n[l].searchBox).value.trim();if(0<a.length)return a}return null}function K(a,b){var c="",c=u();if(a)E(function(a){b(p(a,"",510,!1,null,!1))});else{if(c){var c=c.getRangeAt(0).cloneContents(),d=document.createElement("div");d.appendChild(c);c=p(d,"",5E3,!1,null,!0)}else c=e?p(e,"",5E3,!1,null,!0):p(document.body,"",5E3,!1,null,
!0);return c=T()+" "+c}}function L(a,b,c,d){a=u();a={containsImages:U,documentWidth:V,documentHeight:W,url:X,selection:null!==a||0<s.length,selectionIsInFrame:I,documentLength:document.body.textContent.length,article:null!=e,recommendationText:K(!1),query:J(),searchEngine:l,favIconUrl:F,documentIsFrameset:z,pdf:M(),gmailThread:N(),gmail:v()};b.sendToTab?d(a,!0):d(a,!1)}function Y(a,b){"undefined"!=typeof Browser&&(b?Browser.sendToExtension({name:"simSearch_receivePageInfo",info:a}):Browser.sendToExtension({name:"popup_receivePageInfo",
info:a}))}function Z(a,b,c){"undefined"!=typeof SAFARI&&SAFARI&&!a.sendToTab&&0<s.length&&null==u()&&R();D(function(c){L(c,a,b,Y)})}function O(){"undefined"!=typeof Browser&&Browser.sendToExtension({name:"popup_pageInfoReadyToGo",url:document.location.href})}function M(){if(document.querySelector("embed[type='application/pdf']"))return document.querySelector("embed[type='application/pdf']").src;if(/^https?:\/\/docs\.google\.com\/viewer\?url=.+/.test(document.location.href))for(var a=0;a<document.scripts.length;a++)if(/gviewApp\.setFileData/.test(document.scripts[a].innerText)){if(/mimeType.+application\/pdf/.test(document.scripts[a].innerText))return a=
/^https?:\/\/docs\.google\.com\/viewer\?url=(.+)/.exec(document.location.href),decodeURIComponent(a[1]);break}return null}function v(){return/^https:\/\/mail\.google\.com\/mail\//.test(document.location.href)?!0:!1}function N(){return v()&&0<document.querySelectorAll("span > div > span > [src='images/cleardot.gif']").length?!0:!1}function $(a,b,c){F=a.favIconUrl}var m,r,y={"penny-arcade.com":["div.contentArea > div.comic > img"],"aspicyperspective.com":["div.entry-content"],"thewirecutter.com":["div#content"],
"katespade.com":["div#pdpMain"],"threadless.com":["section.product_section"],"yelp.com":["div#bizBox"],"flickr.com":["div#photo"],"instagr.am":["div.stage > div.stage-inner"],"stackoverflow.com":["div#mainbar"],"makeprojects.com":["div#guideMain"],"cookpad.com":["div#main #recipe"],"imgur.com":["div.image"],"smittenkitchen.com":["div.entry"],"allrecipes.com":["div#content-wrapper"],"qwantz.com":["img.comic"],"questionablecontent.net":["img#strip"],"cad-comic.com":["div#content"],"twitter.com":[".permalink",
"div.content-main"],"blog.evernote.com":[".post"]},x={"blog.evernote.com":{container:"#page-wrap > section > article",include:"h2, .p-meta, .post-meta, .thumbnail, .art-content"},"kirei.biglobe.ne.jp":{container:"div#main",include:".recipeTitle, .recipeMain, #howTo"},"nomnompaleo.com":{container:"section article.text",include:"header, section"},"foodnetwork.com":{container:"#fn-w",include:".rcp-head, .tabnav, #recipe-lead, .w-inner, .body-text"}},P=["xkcd.com"],n={Baidu:{regex:/^https?:\/\/([^.\/]+\.)?baidu\.(com|cn)\/s/i,
content:"#container",searchBox:"input[name=wd]",allowedElements:"h3.t a[data-click], .f font[size='-1']",bannedSubelements:"span.g, .m, .c",titleTrim:function(a){var b=/(.+)_\u767E\u5EA6\u641C\u7D22/;return b.test(a)?b.exec(a)[1]:a}},Bing:{regex:/^https?:\/\/([^.\/]+\.)?bing\.com\/search/i,content:"#results_container, #b_results",searchBox:"input[name=q]",allowedElements:"div.sb_tlst a, div.sa_mc p, .b_algo h2 a, .b_algo .b_caption p"},Daum:{regex:/^https?:\/\/search\.daum\.net\/search/i,content:"#mArticle .inner_article",
searchBox:"input[name=q]",allowedElements:".coll_cont ul .wrap_tit a, .coll_cont ul .f_eb.desc",titleTrim:function(a){var b=/(.+)\s\u2013/;return b.test(a)?b.exec(a)[1]:a}},Google:{regex:GlobalUtils.buildGoogleRegEx(),content:"#rso",searchBox:"input[name=q][type=hidden]",allowedElements:"a.l, span.st",bannedSubelements:"span.f"},Naver:{regex:/^https?:\/\/search\.naver\.com\/search\.naver/i,content:"#content",searchBox:"input[name=query]",allowedElements:".type01 dt a, .type01 dd:not(.txt_inline):not(.txt_block):not(.review):not([style*='display:none'])",
titleTrim:function(a){var b=/(.+)\s\u003A/;return b.test(a)?b.exec(a)[1]:a}},Yahoo:{regex:/^https?:\/\/([^.\/]+\.)*yahoo\.com\/s(earch|\?)/i,content:"#main",searchBox:"input[name=p]",allowedElements:".yschttl.spt[id], .abstr"},YahooCN:{regex:/^https?:\/\/([^.\/]+\.)*yahoo\.cn\/s(earch|\?)/i,content:".content",searchBox:"input[name=q]",allowedElements:"h3.title a, .desc",titleTrim:function(a){var b=/(.+)_\u7F51\u9875\u641C\u7D22/;return b.test(a)?b.exec(a)[1]:a}},YahooJP:{regex:/^https?:\/\/([^.\/]+\.)*yahoo\.co\.jp\/s(earch|\?)/i,
content:"#WS2m ul",searchBox:"input[name=p]",allowedElements:"#WS2m .hd h3 a, #WS2m .bd p",bannedSubelements:"#WS2m .bd p.dlink",titleTrim:function(a){var b=/\u300C(.+)\u300D/;return b.test(a)?b.exec(a)[1]:a}},Yandex:{regex:/^https?:\/\/([^.\/]+\.)?yandex\.com\/yandsearch/,content:".b-serp2-list.b-serp.i-bem.b-serp_js_inited.b-serp2-list_js_inited",searchBox:"input[name=text]",allowedElements:".b-serp2-item__title-link, .b-serp2-item__text",bannedSubelements:".b-serp2-item__from",titleTrim:function(a){var b=
/(.+)\s+\u2014/;return b.test(a)?b.exec(a)[1]:a}},YandexRU:{regex:/^https?:\/\/([^.\/]+\.)?yandex\.ru\/yandsearch/,content:".b-serp-list",searchBox:"input[name=text]",allowedElements:".b-serp-item__wrapper .b-serp-item__title-link, .b-serp-item__text",bannedSubelements:".b-serp-item__from",titleTrim:function(a){var b=/(.+)\s+\u2014/;return b.test(a)?b.exec(a)[1]:a}}},U=Boolean(0<document.getElementsByTagName("img").length),V=document.width,W=document.height,X=document.location.href,e=null,C=[],q=
[],I=!1,z=!1,A=null,F=null,B=!1,s=[],l=null,G;for(G in n)if(n[G].regex.test(document.location.href)){l=G;break}"undefined"!=typeof Browser?Browser.addMessageHandlers({getInfo:Z,content_ready_6_0_7:O,setFavIconUrl:$}):window.addEventListener("message",function(a){"getInfo"==a.data.name&&L(null,a.data,null,function(a){document.title=a.recommendationText})});"undefined"!=typeof SAFARI&&SAFARI&&(window.addEventListener("mouseup",H),Browser.addKeyboardHandlers({"65 + 91":H}));O();this.getBiggestImage=
function(a){E(function(b){b=b?b.querySelectorAll("img"):document.querySelectorAll("img");for(var c=0,d=0,e,f=0;f<b.length;f++){var g=b.item(f).width,h=b.item(f).height;g*h>d*c&&(c=h,d=g,e=b.item(f).src)}a({src:e,width:d,height:c})})};this.getDefaultArticle=E;this.getCanonicalUrl=function(){if(!v()){var a=document.querySelector("link[rel='canonical']");if(a)return a.href}return null};this.getCleanArticle=function(a,b){r=b;D(function(){a(q)})};this.getAdditionalPages=function(a){return C};this.getSelection=
u;this.getSelectionFrame=function(){return A};this.getPdfUrl=M;this.getRecommendationText=K;this.getSearchQuery=J;this.isGmail=v;this.isGmailThread=N;this.__defineGetter__("documentIsFrameset",function(){return z});this.__defineGetter__("favIconUrl",function(){return F});Object.preventExtensions(this)}Object.preventExtensions(PageInfo);
