!function(t,e,i,n){var r=t(e);t.fn.lazyload=function(i){function a(){var e=0;l.each(function(){var i=t(this);if((!s.skip_invisible||i.is(":visible"))&&!t.abovethetop(this,s)&&!t.leftofbegin(this,s))if(t.belowthefold(this,s)||t.rightoffold(this,s)){if(++e>s.failure_limit)return!1}else i.trigger("appear"),e=0})}var o,l=this,s={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:e,data_attribute:"original",skip_invisible:!0,appear:null,load:null};return i&&(n!==i.failurelimit&&(i.failure_limit=i.failurelimit,delete i.failurelimit),n!==i.effectspeed&&(i.effect_speed=i.effectspeed,delete i.effectspeed),t.extend(s,i)),o=s.container===n||s.container===e?r:t(s.container),0===s.event.indexOf("scroll")&&o.bind(s.event,function(t){return a()}),this.each(function(){var e=this,i=t(e);e.loaded=!1,i.one("appear",function(){if(!this.loaded){if(s.appear){var n=l.length;s.appear.call(e,n,s)}t("<img />").bind("load",function(){i.hide().attr("src",i.data(s.data_attribute))[s.effect](s.effect_speed),e.loaded=!0;var n=t.grep(l,function(t){return!t.loaded});if(l=t(n),s.load){var r=l.length;s.load.call(e,r,s)}}).attr("src",i.data(s.data_attribute))}}),0!==s.event.indexOf("scroll")&&i.bind(s.event,function(t){e.loaded||i.trigger("appear")})}),r.bind("resize",function(t){a()}),/iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion)&&r.bind("pageshow",function(e){e.originalEvent.persisted&&l.each(function(){t(this).trigger("appear")})}),t(e).load(function(){a()}),this},t.belowthefold=function(i,a){return(a.container===n||a.container===e?r.height()+r.scrollTop():t(a.container).offset().top+t(a.container).height())<=t(i).offset().top-a.threshold},t.rightoffold=function(i,a){return(a.container===n||a.container===e?r.width()+r.scrollLeft():t(a.container).offset().left+t(a.container).width())<=t(i).offset().left-a.threshold},t.abovethetop=function(i,a){return(a.container===n||a.container===e?r.scrollTop():t(a.container).offset().top)>=t(i).offset().top+a.threshold+t(i).height()},t.leftofbegin=function(i,a){return(a.container===n||a.container===e?r.scrollLeft():t(a.container).offset().left)>=t(i).offset().left+a.threshold+t(i).width()},t.inviewport=function(e,i){return!(t.rightoffold(e,i)||t.leftofbegin(e,i)||t.belowthefold(e,i)||t.abovethetop(e,i))},t.extend(t.expr[":"],{"below-the-fold":function(e){return t.belowthefold(e,{threshold:0})},"above-the-top":function(e){return!t.belowthefold(e,{threshold:0})},"right-of-screen":function(e){return t.rightoffold(e,{threshold:0})},"left-of-screen":function(e){return!t.rightoffold(e,{threshold:0})},"in-viewport":function(e){return t.inviewport(e,{threshold:0})},"above-the-fold":function(e){return!t.belowthefold(e,{threshold:0})},"right-of-fold":function(e){return t.rightoffold(e,{threshold:0})},"left-of-fold":function(e){return!t.rightoffold(e,{threshold:0})}})}(jQuery,window,document),function(t,e){"use strict";var i=t(e);t.uuid=function(){for(var t=[],e=0;e<256;++e)t[e]=(e<16?"0":"")+e.toString(16);var i=4294967295*Math.random()|0,n=4294967295*Math.random()|0,r=4294967295*Math.random()|0,a=4294967295*Math.random()|0;return t[255&i]+t[i>>8&255]+t[i>>16&255]+t[i>>24&255]+"-"+t[255&n]+t[n>>8&255]+"-"+t[n>>16&15|64]+t[n>>24&255]+"-"+t[63&r|128]+t[r>>8&255]+"-"+t[r>>16&255]+t[r>>24&255]+t[255&a]+t[a>>8&255]+t[a>>16&255]+t[a>>24&255]},t.inScreen=function(t){if(t.length){var e=i.scrollLeft(),n=i.scrollTop(),r=t.offset(),a={x1:e,y1:n+10,x2:e+i.width(),y2:n+i.height()-10},o={x1:r.left,y1:r.top,x2:r.left+t.width(),y2:r.top+t.height()},l={left:r.left-e,top:r.top-n,insideViewport:a.x1<o.x2&&a.x2>o.x1&&a.y1<o.y1&&a.y2>o.y1,crossAtTop:o.y1<a.y1&&o.y1<a.y2&&o.y2>a.y1&&o.y1<a.y2,crossAtBottom:o.y1>a.y1&&o.y1<a.y2&&o.y2>a.y1&&o.y2>a.y2};return l.insideViewport||l.crossAtTop||l.crossAtBottom}},t.preventActions=function(t){t=t||window.event,t.stopPropagation&&t.preventDefault?(t.stopPropagation(),t.preventDefault()):(t.cancelBubble=!0,t.returnValue=!1)},t.fn.loadLazyed=function(e){var i=t.extend(!0,{exposeAll:!1,dataAttrName:"data-original",lazySelector:".bx-lazy",shouldRemoveAttr:"width height style",onComplete:null},e||{});return this.each(function(){var e,n,r=t(this);e=r.is("img")?r:r.find(i.lazySelector),n=e.attr(i.dataAttrName),n&&e.attr("src",n).removeAttr(i.dataAttrName+" "+i.shouldRemoveAttr),"function"===t.type(i.onComplete)&&e.load(function(){i.onComplete.call(r)})})},t.waitJwplayer=function(e){var i=function(){var e=t.Deferred();return setTimeout(function(){void 0!==window.jwplayer?e.resolve("get jwplayer"):(i(),e.fail())},200),e};i().done(function(){e&&e()}).fail(function(){console.warn("Not Find Jwplayer.js")})}}(jQuery,window),function(t,e){"use strict";var i=t(e);t.fn.setBxSlider=function(e){t.sliders=t.sliders||[];t.extend(!0,{},e||{});return this.each(function(){var e=t(this),n=e.find("li"),r={initialize:!1,lazy:!0,hasPager:!1,slider:"",init:function(){e.attr("id",t.uuid());var i=n.length,a=1===i,o=e.attr("data-mode");o=o||"horizontal";var l=e.attr("data-maxSlides");l=l&&!isNaN(parseInt(l))?parseInt(l):1;var s=e.attr("data-slideMargin");s=s&&!isNaN(parseInt(s))?parseInt(l):0;var c=e.attr("data-delay");c=c&&!isNaN(parseInt(c))?parseInt(c):4e3;var f=e.attr("data-speed");f=f&&!isNaN(parseInt(f))?parseInt(f):400;var d=e.attr("data-autoBtn");d=!(!d||"true"!=d);var u=e.attr("data-auto");u=!(!u||"true"!=u);var h=e.attr("data-pager");h=!(!h||"true"!=h||a),this.hasPager=h;var g=e.attr("data-controls");g=!(!g||"true"!=g),r.lazy=e.attr("data-lazy"),r.lazy=!(void 0!==r.lazy&&!isNaN(r.lazy))||r.lazy,e=e.bxSlider({slideWidth:n.width(),slideMargin:s,minSlides:1,maxSlides:l,speed:f,pause:c,mode:o,autoControls:d,auto:u,pager:h,controls:g,preventDefaultSwipeX:!0,infiniteLoop:!0,loadComplete:!1,onSliderLoad:function(){e.css("visibility","visible")},onSliderResize:function(){e.reloadSlider()},onSlideBefore:function(t,e,a){r.hasPager?n.loadLazyed():(a>0||a===i-1)&&t.loadLazyed()}}),u&&!a&&e.on("mouseover touchstart",function(){e.stopAuto()}).on("mouseout touchend",function(){e.startAuto()}),r.initialized=!0,r.showImage()},onScroll:function(){t.inScreen(e)?r.initialized?e.startAuto():r.init():r.initilized&&e.stopAuto()},showImage:function(){if(r.lazy){var i=n.length-1;n.filter(function(e){0!=e&&e!=i||t(this).loadLazyed()})}else n.each(function(){t(this).loadLazyed()});e.find(".bx-clone").loadLazyed()},reloadSlider:function(){r.initialized?e.reloadSlider():r.init()}};i.on("scroll",r.onScroll),e.data("slider",r),i.trigger("scroll")})}}(jQuery,window),function(t,e){"use strict";var i=t(e);t.lazy=function(e){var n=t(e),r={$cur:"",inProgress:!1,check:function(){if(r.inProgress)return!1;n.each(function(){var e=t(this);if(t.inScreen(e))return r.inProgress=!0,e.loadLazyed({onComplete:function(){t(n.splice(0,1)).removeClass("lazy").removeAttr("data-original"),r.inProgress=!1,r.check()}}),!1})}};i.scroll(function(){r.check()})},t.fn.lazyload3=function(e){var n=t.extend(!0,{minHeight:i.height(),forceSize:!1},e||{});return this.each(function(){var e=t(this);n.forceSize||e.height(n.minHeight).css("display","block"),e.lazyload().load(function(){e.removeAttr("style data-original")})})}}(jQuery,window),function(t,e){"use strict";var i=t(e);t.fn.tab=function(e){var n=t.extend(!0,{default:1,triggers:"a",triggerAttr:"href",contents:"",activeClassName:"on",oldTabPrefix:"js-tab-type",sliders:[".bxslider"],players:"",onChange:null,onRollOver:null,onRollOut:null,onInit:null},e||{});return this.each(function(){var e=t(this),r={$triggers:"",$contents:"",$sliders:"",$cur:"",$jwplayers:[],$activeClassTarget:"",init:function(){t.when(this.setTriggers(n.triggers),this.setContents(n.contents)).done(r.setActiveClassTarget(n.activeClassTarget)),this.setPlayers(),this.disableOldTab(),e.on("click",n.triggers,function(e){t.preventActions(e),r.show(t(this))}),this.setDefault(n.default),e.trigger("init"),r.checkCallBack(n.onInit)&&n.onInit.call(e,r)},setTriggers:function(i){return"array"===t.type(i)&&i.length&&(i=i.join(",")),n.triggers=i,this.$triggers=e.find(i),n.triggers},setContents:function(e){return"array"===t.type(e)&&e.length?e=e.join(","):this.$triggers.each(function(){var i=t(this);e+=i.attr(n.triggerAttr)+","}),n.contents=e,this.$contents=t(e.slice(0,-1)),n.contents},setActiveClassTarget:function(i){i="array"===t.type(i)&&i.length?i.join(","):n.triggers,this.$activeClassTarget=e.find(i)},disableOldTab:function(){var e=n.oldTabPrefix;if(e&&e.length){var r=t('ul[class*="'+e+'"]');r.length&&r.find("a").off("click")}i.on("old-tab",function(){var i=t("ul[class*='"+e+"']");i.length&&i.find("a").off("click")})},setPlayers:function(){n.players.length&&t.waitJwplayer(function(){n.players&&n.players.length&&t.each(n.players,function(e,i){r.$jwplayers=r.$jwplayers.length?r.$jwplayers:[],r.$jwplayers[e]=t(i)})})},show:function(a){this.$triggers.removeClass(n.activeClassName),a.addClass(n.activeClassName),this.$contents.hide().removeClass(n.activeClassName),this.$cur=t(a.attr(n.triggerAttr)).show().addClass(n.activeClassName),n.sliders.length&&this.reloadSlider(this.$cur),n.players.length&&t.waitJwplayer(function(){n.players&&n.players.length&&(t.each(n.players,function(t,e){jwplayer(n.players[t].slice(1)).pause(!0)}),t.each(n.players,function(t,e){r.$cur.find(e).length&&jwplayer(e.slice(1)).play(!0)}))}),e.trigger("onChange"),i.trigger("scroll"),r.checkCallBack(n.onChange)&&n.onChange.call(this.$cur,r)},setDefault:function(t){t&&this.$triggers.eq(t-1).trigger("click")},reloadSlider:function(e){e.find(n.sliders.join(",")).each(function(){var e=t(this).data("slider");e.reloadSlider&&e.reloadSlider()})},destory:function(){e.off("click").clearQueue().data("tab",null),r=null},checkCallBack:function(e){return"function"===t.type(e)&&e}};r.init(),e.data("tab",r)})}}(jQuery,window);
//# sourceMappingURL=dist/modules.map