var PartialEvaluator=function(){function v(c,f,b,a){this.state=new EvalState;this.stateStack=[];this.xref=c;this.handler=f;this.pageIndex=b;this.uniquePrefix=a;this.fontIdCounter=this.objIdCounter=0}var A={w:"setLineWidth",J:"setLineCap",j:"setLineJoin",M:"setMiterLimit",d:"setDash",ri:"setRenderingIntent",i:"setFlatness",gs:"setGState",q:"save",Q:"restore",cm:"transform",m:"moveTo",l:"lineTo",c:"curveTo",v:"curveTo2",y:"curveTo3",h:"closePath",re:"rectangle",S:"stroke",s:"closeStroke",f:"fill",F:"fill",
"f*":"eoFill",B:"fillStroke","B*":"eoFillStroke",b:"closeFillStroke","b*":"closeEOFillStroke",n:"endPath",W:"clip","W*":"eoClip",BT:"beginText",ET:"endText",Tc:"setCharSpacing",Tw:"setWordSpacing",Tz:"setHScale",TL:"setLeading",Tf:"setFont",Tr:"setTextRenderingMode",Ts:"setTextRise",Td:"moveText",TD:"setLeadingMoveText",Tm:"setTextMatrix","T*":"nextLine",Tj:"showText",TJ:"showSpacedText","'":"nextLineShowText",'"':"nextLineSetSpacingShowText",d0:"setCharWidth",d1:"setCharWidthAndBounds",CS:"setStrokeColorSpace",
cs:"setFillColorSpace",SC:"setStrokeColor",SCN:"setStrokeColorN",sc:"setFillColor",scn:"setFillColorN",G:"setStrokeGray",g:"setFillGray",RG:"setStrokeRGBColor",rg:"setFillRGBColor",K:"setStrokeCMYKColor",k:"setFillCMYKColor",sh:"shadingFill",BI:"beginInlineImage",ID:"beginImageData",EI:"endInlineImage",Do:"paintXObject",MP:"markPoint",DP:"markPointProps",BMC:"beginMarkedContent",BDC:"beginMarkedContentProps",EMC:"endMarkedContent",BX:"beginCompat",EX:"endCompat",BM:null,BD:null,"true":null,fa:null,
fal:null,fals:null,"false":null,nu:null,nul:null,"null":null};v.prototype={loadFont:function(c,f,b,a,g){var m=a.get("Font");assert(m,"fontRes not available");++this.fontIdCounter;f=b.fetchIfRef(f)||m.get(c);if(!isDict(f))return{translated:new ErrorFont("Font "+c+" is not available"),loadedName:"g_font_"+this.uniquePrefix+this.fontIdCounter};c=f.loadedName;if(!c){c="g_font_"+this.uniquePrefix+this.fontIdCounter;f.loadedName=c;var e;try{e=this.translateFont(f,b,a,g)}catch(k){e=new ErrorFont(k instanceof
Error?k.message:k)}b=f.translated=e;if(b.loadCharProcs){delete b.loadCharProcs;e=f.get("CharProcs").getAll();a=f.get("Resources")||a;c={};for(var d in e)c[d]=this.getOperatorList(e[d],a,g);b.charProcOperatorList=c}}return f},getOperatorList:function(c,f,b,a){function g(c){t.push("dependency");l.push(c);for(var a=0,d=c.length;a<d;a++)-1==b.indexOf(c[a])&&b.push(c[a])}function m(c,a){a=k.loadFont(c,a,d,f,b);var e=a.loadedName;if(!a.sent){var l=a.translated.exportData();h.send("commonobj",[e,"Font",
l]);a.sent=!0}g([e]);return e}function e(b,c){var a=b.dict,e=a.get("Width","W"),l=a.get("Height","H");if(a.get("ImageMask","IM")){var e=a.get("Width","W"),l=a.get("Height","H"),m=b.getBytes((e+7>>3)*l),a=a.get("Decode","D"),a=!!a&&0<a[0];x="paintImageMaskXObject";r=[m,a,e,l]}else if(m=a.get("SMask","SM")||!1,a=a.get("Mask")||!1,c&&!(m||a||b instanceof JpegStream)&&200>e+l)a=(new PDFImage(d,f,b,c,null,null)).getImageData(),x="paintInlineImageXObject",r=[a];else{var n="img_"+p+ ++k.objIdCounter;g([n]);
r=[n,e,l];!m&&!a&&b instanceof JpegStream&&b.isNativelySupported(d,f)?(x="paintJpegXObject",h.send("obj",[n,q,"JpegStream",b.getIR()])):(x="paintImageXObject",PDFImage.buildImage(function(a){a=a.getImageData();h.send("obj",[n,q,"Image",a])},h,d,f,b,c))}}var k=this,d=this.xref,h=this.handler,q=this.pageIndex,p=this.uniquePrefix||"";a||(a={});a.argsArray||(a.argsArray=[]);a.fnArray||(a.fnArray=[]);var t=a.fnArray,l=a.argsArray,w=b||[];f=f||new Dict;var B=f.get("XObject")||new Dict,v=f.get("Pattern")||
new Dict;c=new Parser(new Lexer(c,A),!1,d);for(var y=f,r=[],n;;){n=c.getObj();if(isEOF(n))break;if(isCmd(n)){n=n.cmd;var x=A[n];assertWellFormed(x,'Unknown command "'+n+'"');if("SCN"!=n&&"scn"!=n||r[r.length-1].code)if("Do"!=n||r[0].code)"Tf"==n?r[0]=m(r[0].name):"EI"==n&&e(r[0],!0);else{if(n=B.get(r[0].name)){assertWellFormed(isStream(n),"XObject should be a stream");var s=n.dict.get("Subtype");assertWellFormed(isName(s),"XObject should have a Name subtype");if("Form"==s.name){var s=n.dict.get("Matrix"),
u=n.dict.get("BBox");t.push("paintFormXObjectBegin");l.push([s,u]);s=w.length;this.getOperatorList(n,n.dict.get("Resources")||f,w,a);g(w.slice(s));x="paintFormXObjectEnd";r=[]}else"Image"==s.name?e(n,!1):error("Unhandled XObject subtype "+s.name)}}else if(n=r[r.length-1],isName(n)&&(u=v.get(n.name)))n=isStream(u)?u.dict:u,s=n.get("PatternType"),1==s?(s=w.length,u=this.getOperatorList(u,n.get("Resources")||f,w),g(w.slice(s)),r=TilingPattern.getIR(u,n,r)):2==s?(u=n.get("Shading"),s=n.get("Matrix"),
u=Pattern.parseShading(u,s,d,y),r=u.getIR()):error("Unkown PatternType "+s);switch(x){case "setFillColorSpace":case "setStrokeColorSpace":r=[ColorSpace.parseToIR(r[0],d,f)];break;case "shadingFill":(n=y.get("Shading"))||error("No shading resource found");(u=n.get(r[0].name))||error("No shading object found");r=[Pattern.parseShading(u,null,d,y).getIR()];x="shadingFill";break;case "setGState":n=r[0];s=f.get("ExtGState");if(!isDict(s)||!s.has(n.name))break;var z=[];s.get(n.name).forEach(function(a,b){switch(a){case "Type":break;
case "LW":case "LC":case "LJ":case "ML":case "D":case "RI":case "FL":case "CA":case "ca":z.push([a,b]);break;case "Font":z.push(["Font",m(null,b[0]),b[1]]);break;case "BM":isName(b)&&"Normal"==b.name||TODO("graphic state operator "+a);break;case "SMask":isName(b)&&"None"==b.name||TODO("graphic state operator "+a);break;case "OP":case "op":case "OPM":case "BG":case "BG2":case "UCR":case "UCR2":case "TR":case "TR2":case "HT":case "SM":case "SA":case "AIS":case "TK":info("graphic state operator "+a);
break;default:info("Unknown graphic state operator "+a)}});r=[z]}t.push(x);l.push(r);r=[]}else null!=n&&(assertWellFormed(33>=r.length,"Too many arguments"),r.push(n instanceof Dict?n.getAll():n))}return a},optimizeQueue:function(c){var f=c.fnArray;c=c.argsArray;for(var b=0,a=f.length;b<a;b++)if("paintInlineImageXObject"===f[b]&&"save"===f[b-2]&&"transform"===f[b-1]&&"restore"===f[b+1]){for(var g=b-2,b=b+2;b<a&&f[b-4]===f[b];b++);var m=Math.min(b-g>>2,200);if(!(10>m)){for(var e=0,a=[],k=0,d=1,h=1,
b=0;b<m;b++){var q=c[g+(b<<2)+1],p=c[g+(b<<2)+2][0];1E3<d+p.width&&(e=Math.max(e,d),h+=k+2,k=d=0);a.push({transform:q,x:d,y:h,w:p.width,h:p.height});d+=p.width+2;k=Math.max(k,p.height)}q=Math.max(e,d)+1;k=h+k+1;h=new Uint8Array(4*q*k);e=q<<2;for(b=0;b<m;b++){var d=c[g+(b<<2)+2][0].data,p=a[b].w<<2,t=0,l=a[b].x+a[b].y*q<<2;h.set(d.subarray(0,p),l-e);for(var w=0,v=a[b].h;w<v;w++)h.set(d.subarray(t,t+p),l),t+=p,l+=e;for(h.set(d.subarray(t-p,t),l);0<=l;)d[l-4]=d[l],d[l-3]=d[l+1],d[l-2]=d[l+2],d[l-1]=
d[l+3],d[l+p]=d[l+p-4],d[l+p+1]=d[l+p-3],d[l+p+2]=d[l+p-2],d[l+p+3]=d[l+p-1],l-=e}f.splice(g,4*m,["paintInlineImageXObjectGroup"]);c.splice(g,4*m,[{width:q,height:k,data:h},a]);b=g;a=f.length}}b=0;for(a=f.length;b<a;b++)if("paintImageMaskXObject"===f[b]&&"save"===f[b-2]&&"transform"===f[b-1]&&"restore"===f[b+1]){g=b-2;for(b+=2;b<a&&f[b-4]===f[b];b++);m=Math.min(b-g>>2,100);if(!(10>m)){a=[];for(b=0;b<m;b++)q=c[g+(b<<2)+1],k=c[g+(b<<2)+2],a.push({data:k[0],width:k[2],height:k[3],transform:q,inverseDecode:k[1]});
f.splice(g,4*m,["paintImageMaskXObjectGroup"]);c.splice(g,4*m,[a]);b=g;a=f.length}}},getTextContent:function(c,f,b){var a;a=b?b.bidiTexts:"";var g=this.xref;f=g.fetchIfRef(f)||new Dict;var m=null;c=new Parser(new Lexer(c),!1);for(var e=[],k,d="",h=null;!isEOF(k=c.getObj());)if(isCmd(k)){switch(k.cmd){case "Tf":h=this.loadFont(e[0].name,void 0,g,f,null).translated;break;case "TJ":e=e[0];k=0;for(var q=e.length;k<q;k++)if("string"===typeof e[k])d+=fontCharsToUnicode(e[k],h);else if(0>e[k]&&0<h.spaceWidth){var p=
-e[k]/h.spaceWidth;if(1.5<p)for(p=Math.round(p);p--;)d+=" ";else 0.35<p&&(d+=" ")}break;case "Tj":d+=fontCharsToUnicode(e[0],h);break;case "'":d+=fontCharsToUnicode(e[0],h);break;case '"':d+=fontCharsToUnicode(e[2],h);break;case "Do":d="";if(e[0].code)break;m||(m=f.get("XObject")||new Dict);e=m.get(e[0].name);if(!e)break;assertWellFormed(isStream(e),"XObject should be a stream");k=e.dict.get("Subtype");assertWellFormed(isName(k),"XObject should have a Name subtype");if("Form"!==k.name)break;b=this.getTextContent(e,
e.dict.get("Resources")||f,b);break;case "gs":k=e[0];q=f.get("ExtGState");if(!isDict(q)||!q.has(k.name))break;k=q.get(k.name);for(q=0;q<k.length;q++)"Font"===k[q]&&(h=this.loadFont(e[0].name,void 0,g,f,null).translated)}""!==d&&(a+=" "+d,d="");e=[]}else null!=k&&(assertWellFormed(33>=e.length,"Too many arguments"),e.push(k));return b={bidiTexts:a}},extractDataStructures:function(c,f,b,a){if(f=c.get("ToUnicode")||f.get("ToUnicode"))a.toUnicode=this.readToUnicode(f,b,a);a.composite&&(b=c.get("CIDSystemInfo"),
isDict(b)&&(a.cidSystemInfo={registry:b.get("Registry"),ordering:b.get("Ordering"),supplement:b.get("Supplement")}),b=c.get("CIDToGIDMap"),isStream(b)&&(a.cidToGidMap=this.readCidToGidMap(b)));b=[];f=Encodings.StandardEncoding;a.flags&FontFlags.Symbolic&&(f=a.file?Encodings.MacRomanEncoding:Encodings.symbolsEncoding);var g=c.has("Encoding");if(g)if(c=c.get("Encoding"),isDict(c)){var m=c.get("BaseEncoding");m?f=Encodings[m.name]:g=!1;if(c.has("Differences")){c=c.get("Differences");for(var e=m=0,k=
c.length;e<k;e++){var d=c[e];isNum(d)?m=d:b[m++]=d.name}}}else isName(c)?f=Encodings[c.name]:error("Encoding is not a Name nor a Dict");a.differences=b;a.baseEncoding=f;a.hasEncoding=g},readToUnicode:function(c,f,b){f=[];if(isName(c))"Identity-"!=c.name.substr(0,9)&&error("ToUnicode file cmap translation not implemented");else if(isStream(c)){var a=[],g="",m={};c=c.getBytes(c.length);for(var e=0,k=c.length;e<k;e++){var d=c[e];if(32==d||13==d||10==d||60==d||91==d||93==d){switch(g){case "usecmap":error("usecmap is not implemented");
break;case "beginbfchar":case "beginbfrange":case "begincidchar":case "begincidrange":g="";a=[];break;case "endcidrange":case "endbfrange":for(var h=0,q=a.length;h<q;h+=3){var p=a[h],t=a[h+1],l=a[h+2];65535==l&&(l=p);if(isArray(l))for(var w=0;p<=t;)f[p]=l[w++],++p;else for(;p<=t;)f[p]=l++,++p}break;case "endcidchar":case "endbfchar":h=0;for(q=a.length;h<q;h+=2)p=a[h],l=a[h+1],f[p]=l;break;case "":break;default:"0"<=g[0]&&"9">=g[0]&&(g=parseInt(g,10)),a.push(g),g=""}switch(d){case 91:a.push(m);break;
case 93:for(var d=[],v;a.length&&(v=a.pop())!=m;)d.unshift(v);a.push(d)}}else if(62==d){if(g.length){2==g.length&&b.composite&&(b.wideChars=!1);if(4>=g.length)a.push(parseInt(g,16));else{d=[];h=0;for(q=g.length;h<q;h+=4){l=parseInt(g.substr(h,4),16);if(16>=l){h+=4;l=l<<16|parseInt(g.substr(h,4),16);l-=65536;d.push(55296|l>>10);d.push(56320|l&1023);break}d.push(l)}a.push(String.fromCharCode.apply(String,d))}g=""}}else g+=String.fromCharCode(d)}}return f},readCidToGidMap:function(c){c=c.getBytes();
for(var f=[],b=0,a=c.length;b<a;b++){var g=c[b++]<<8|c[b];0!=g&&(f[b>>1]=g)}return f},extractWidths:function(c,f,b,a){var g=[],m=0;if(a.composite){var m=c.get("DW")||1E3,e=c.get("W");if(e){c=b=0;for(var k=e.length;c<k;c++){var d=f.fetchIfRef(e[c]);if(isArray(d)){for(var h=0,q=d.length;h<q;h++)g[b++]=d[h];b=0}else if(b){q=e[++c];for(h=b;h<=d;h++)g[h]=q;b=0}else b=d}}}else if(f=a.firstChar,e=c.get("Widths")){h=f;c=0;for(k=e.length;c<k;c++)g[h++]=e[c];m=parseFloat(b.get("MissingWidth"))||0}else e=c.get("BaseFont"),
isName(e)&&(m=this.getBaseFontMetrics(e.name),g=m.widths,m=m.defaultWidth);e=!0;f=m;for(var p in g)if(c=g[p])if(!f)f=c;else if(f!=c){e=!1;break}e&&(a.flags|=FontFlags.FixedPitch);a.defaultWidth=m;a.widths=g},getBaseFontMetrics:function(c){var f=0,b=[],a=!1;c=Metrics[stdFontMap[c]||c];isNum(c)?(f=c,a=!0):b=c;return{defaultWidth:f,monospace:a,widths:b}},translateFont:function(c,f,b,a){var g=c;b=c.get("Subtype");assertWellFormed(isName(b),"invalid font Subtype");var m=!1;"Type0"==b.name&&((c=c.get("DescendantFonts"))||
error("Descendant fonts are not specified"),c=isArray(c)?f.fetchIfRef(c[0]):c,b=c.get("Subtype"),assertWellFormed(isName(b),"invalid font Subtype"),m=!0);a=m?65535:255;var e=c.get("FontDescriptor");if(!e)if("Type3"==b.name)e=new Dict,e.set("FontName",new Name(b.name));else{var k=c.get("BaseFont");isName(k)||error("Base font is not specified");var k=k.name.replace(/[,_]/g,"-"),d=this.getBaseFontMetrics(k),h=k.split("-")[0],h=(serifFonts[h]||-1!=h.search(/serif/gi)?FontFlags.Serif:0)|(d.monospace?FontFlags.FixedPitch:
0)|(symbolsFonts[h]?FontFlags.Symbolic:FontFlags.Nonsymbolic);a={type:b.name,widths:d.widths,defaultWidth:d.defaultWidth,flags:h,firstChar:0,lastChar:a};this.extractDataStructures(c,c,f,a);return new Font(k,null,a)}var q=c.get("FirstChar")||0,p=c.get("LastChar")||a,t=e.get("FontName");isString(t)&&(t=new Name(t));assertWellFormed(isName(t),"invalid font name");var l=e.get("FontFile","FontFile2","FontFile3");if(l&&l.dict){if(k=l.dict.get("Subtype"))k=k.name;d=l.dict.get("Length1");h=l.dict.get("Length2")}a=
{type:b.name,subtype:k,file:l,length1:d,length2:h,loadedName:g.loadedName,composite:m,wideChars:m,fixedPitch:!1,fontMatrix:c.get("FontMatrix")||IDENTITY_MATRIX,firstChar:q||0,lastChar:p||a,bbox:e.get("FontBBox"),ascent:e.get("Ascent"),descent:e.get("Descent"),xHeight:e.get("XHeight"),capHeight:e.get("CapHeight"),flags:e.get("Flags"),italicAngle:e.get("ItalicAngle"),coded:!1};this.extractWidths(c,f,e,a);this.extractDataStructures(c,g,f,a);"Type3"===b.name&&(a.coded=!0);return new Font(t.name,l,a)}};
return v}(),EvalState=function(){function v(){this.alphaIsShape=!1;this.fontSize=0;this.textMatrix=IDENTITY_MATRIX;this.wordSpacing=this.charSpacing=this.lineY=this.lineX=this.leading=0;this.textHScale=1;this.strokeColorSpace=this.fillColorSpace=null}v.prototype={};return v}();
