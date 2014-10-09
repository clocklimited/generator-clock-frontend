/*! modernizr 3.0.0-pre (Custom Build) | MIT */!function(a,b,c){function d(a,b){return typeof a===b}function e(){var a,b,c,e,f,g,h;for(var i in n){if(a=[],b=n[i],b.name&&(a.push(b.name.toLowerCase()),b.options&&b.options.aliases&&b.options.aliases.length))for(c=0;c<b.options.aliases.length;c++)a.push(b.options.aliases[c].toLowerCase());for(e=d(b.fn,"function")?b.fn():b.fn,f=0;f<a.length;f++)g=a[f],h=g.split("."),1===h.length?Modernizr[h[0]]=e:2===h.length&&(!Modernizr[h[0]]||Modernizr[h[0]]instanceof Boolean||(Modernizr[h[0]]=new Boolean(Modernizr[h[0]])),Modernizr[h[0]][h[1]]=e),p.push((e?"":"no-")+h.join("-"))}}function f(a){var b=q.className,c=Modernizr._config.classPrefix||"",d=new RegExp("(^|\\s)"+c+"no-js(\\s|$)");b=b.replace(d,"$1"+c+"js$2"),Modernizr._config.enableClasses&&(b+=" "+c+a.join(" "+c),q.className=b)}function g(a,b){return!!~(""+a).indexOf(b)}function h(){var a=b.body;return a||(a=r("body"),a.fake=!0),a}function i(a,b,c,d){var e,f,g,i,j="modernizr",k=r("div"),l=h();if(parseInt(c,10))for(;c--;)g=r("div"),g.id=d?d[c]:j+(c+1),k.appendChild(g);return e=["&#173;",'<style id="s',j,'">',a,"</style>"].join(""),k.id=j,(l.fake?l:k).innerHTML+=e,l.appendChild(k),l.fake&&(l.style.background="",l.style.overflow="hidden",i=q.style.overflow,q.style.overflow="hidden",q.appendChild(l)),f=b(k,a),l.fake?(l.parentNode.removeChild(l),q.style.overflow=i,q.offsetHeight):k.parentNode.removeChild(k),!!f}function j(a){return a.replace(/([A-Z])/g,function(a,b){return"-"+b.toLowerCase()}).replace(/^ms-/,"-ms-")}function k(b,d){var e=b.length;if("CSS"in a&&"supports"in a.CSS){for(;e--;)if(a.CSS.supports(j(b[e]),d))return!0;return!1}if("CSSSupportsRule"in a){for(var f=[];e--;)f.push("("+j(b[e])+":"+d+")");return f=f.join(" or "),i("@supports ("+f+") { #modernizr { position: absolute; } }",function(b){return"absolute"==(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle).position})}return c}function l(a){return a.replace(/([a-z])-([a-z])/g,function(a,b,c){return b+c.toUpperCase()}).replace(/^-/,"")}function m(a,b,e,f){function h(){j&&(delete t.style,delete t.modElem)}if(f=d(f,"undefined")?!1:f,!d(e,"undefined")){var i=k(a,e);if(!d(i,"undefined"))return i}var j,m,n,o,p;for(t.style||(j=!0,t.modElem=r("modernizr"),t.style=t.modElem.style),n=a.length,m=0;n>m;m++)if(o=a[m],p=t.style[o],g(o,"-")&&(o=l(o)),t.style[o]!==c){if(f||d(e,"undefined"))return h(),"pfx"==b?o:!0;try{t.style[o]=e}catch(q){}if(t.style[o]!=p)return h(),"pfx"==b?o:!0}return h(),!1}var n=[],o={_version:"v3.0.0pre",_config:{classPrefix:"",enableClasses:!0,usePrefixes:!0},_q:[],on:function(a,b){var c=this;setTimeout(function(){b(c[a])},0)},addTest:function(a,b,c){n.push({name:a,fn:b,options:c})},addAsyncTest:function(a){n.push({name:null,fn:a})}},Modernizr=function(){};Modernizr.prototype=o,Modernizr=new Modernizr;var p=[],q=b.documentElement,r=function(){return"function"!=typeof b.createElement?b.createElement(arguments[0]):b.createElement.apply(b,arguments)},s={elem:r("modernizr")};Modernizr._q.push(function(){delete s.elem});var t={style:s.elem.style};Modernizr._q.unshift(function(){delete t.style});o.testProp=function(a,b,d){return m([a],c,b,d)};Modernizr.addTest("svg",!!b.createElementNS&&!!b.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),Modernizr.addTest("fileinput",function(){if(navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/))return!1;var a=r("input");return a.type="file",!a.disabled}),e(),f(p),delete o.addTest,delete o.addAsyncTest;for(var u=0;u<Modernizr._q.length;u++)Modernizr._q[u]();a.Modernizr=Modernizr}(this,document);