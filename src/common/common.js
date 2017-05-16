(function(a,b,c,d){var e=a(b);a.fn.lazyload=function(c){function i(){var b=0;f.each(function(){var c=a(this);if(h.skip_invisible&&!c.is(":visible"))return;if(!a.abovethetop(this,h)&&!a.leftofbegin(this,h))if(!a.belowthefold(this,h)&&!a.rightoffold(this,h))c.trigger("appear"),b=0;else if(++b>h.failure_limit)return!1})}var f=this,g,h={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null};return c&&(d!==c.failurelimit&&(c.failure_limit=c.failurelimit,delete c.failurelimit),d!==c.effectspeed&&(c.effect_speed=c.effectspeed,delete c.effectspeed),a.extend(h,c)),g=h.container===d||h.container===b?e:a(h.container),0===h.event.indexOf("scroll")&&g.bind(h.event,function(a){return i()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,c.one("appear",function(){if(!this.loaded){if(h.appear){var d=f.length;h.appear.call(b,d,h)}a("<img />").bind("load",function(){c.hide().attr("src",c.data(h.data_attribute))[h.effect](h.effect_speed),b.loaded=!0;var d=a.grep(f,function(a){return!a.loaded});f=a(d);if(h.load){var e=f.length;h.load.call(b,e,h)}}).attr("src",c.data(h.data_attribute))}}),0!==h.event.indexOf("scroll")&&c.bind(h.event,function(a){b.loaded||c.trigger("appear")})}),e.bind("resize",function(a){i()}),/iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent.persisted&&f.each(function(){a(this).trigger("appear")})}),a(b).load(function(){i()}),this},a.belowthefold=function(c,f){var g;return f.container===d||f.container===b?g=e.height()+e.scrollTop():g=a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return f.container===d||f.container===b?g=e.width()+e.scrollLeft():g=a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return f.container===d||f.container===b?g=e.scrollTop():g=a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return f.container===d||f.container===b?g=e.scrollLeft():g=a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!a.rightoffold(b,c)&&!a.leftofbegin(b,c)&&!a.belowthefold(b,c)&&!a.abovethetop(b,c)},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})})(jQuery,window,document)
/**
 * Created by Publish Team on 2017-04-26.
 */
;(function ($, win) {
	'use strict';
	var $win = $(win);

	/**
	 * [uuid - unique id 명 생성]
	 * @param null
	 * @return {String} 고유한 id 값을 반환한다.
	 */
	$.uuid = function () {
		var lut = []; for (var i=0; i<256; ++i) { lut[i] = (i<16?'0':'')+(i).toString(16); }

		var d0 = Math.random()*0xffffffff|0,
			d1 = Math.random()*0xffffffff|0,
			d2 = Math.random()*0xffffffff|0,
			d3 = Math.random()*0xffffffff|0
		;
		return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
			lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
			lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
			lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
	};

	/**
	 * [ inScreen 뷰포트 영역캐치]
	 * @param  {jQuery}  $el           [위치 확인 대상 - 뷰포트 영역에 들어갔는지 여부를 확인하고 싶은 대상 객체.]
	 * @return {Boolean} true/false    [ 대상 객체가 스크린에 보이는지 아닌지에 대한 여부 ]
	 */
	$.inScreen = function ($el) {
		if(!$el.length) return;

		var scrollLeft  = $win.scrollLeft(),
			scrollTop   = $win.scrollTop(),
			offset      = $el.offset(),
			offsetY     = 10,
			rect1 = { x1: scrollLeft, y1: scrollTop + offsetY, x2: scrollLeft + $win.width(), y2: scrollTop + $win.height() - offsetY },
			rect2 = { x1: offset.left, y1: offset.top, x2: offset.left + $el.width(), y2: offset.top + $el.height() }
		;
		var stance = {
			left: offset.left - scrollLeft,
			top: offset.top - scrollTop,
			insideViewport: rect1.x1 < rect2.x2 && rect1.x2 > rect2.x1 && rect1.y1 < rect2.y1 && rect1.y2 > rect2.y1,
			crossAtTop: rect2.y1 < rect1.y1 && rect2.y1 < rect1.y2 && rect2.y2 > rect1.y1 && rect2.y1 < rect1.y2,
			crossAtBottom: rect2.y1 > rect1.y1 && rect2.y1 < rect1.y2 && rect2.y2 > rect1.y1 && rect2.y2 > rect1.y2
		};
		return stance.insideViewport || stance.crossAtTop || stance.crossAtBottom;
	};

	/**
	 * preventActions
	 * @param {Dom Events} ev
	 * @description		이벤트 기본 behavior 차단 함수
	 * @return 			null
	 */
	$.preventActions = function (ev) {
		ev = ev || window.event;
		if (ev.stopPropagation && ev.preventDefault) {
			ev.stopPropagation();
			ev.preventDefault();
		}
		else {
			ev.cancelBubble = true;
			ev.returnValue = false;
		}
	};

	/**
	 * [ loadLazyed bx 슬라이더용 lazyload 설정 ]
	 * @param {Object} settings
	 * 					{String} originAttr       : 원래 이미지의 path 를 가지고 있는 속성명
	 * 					{String} lazySelector     : lazy 가 적용 될 dom(img) 노드의 jQuery 선택자 문자열
	 * 					{String} shouldRemoveAttr : lazy 적용후 삭제 해야할 dom 속성명
	 * 					{Function} onComplete     : lazy 적용후 실행 callback
	 * @returns {Object} jQuery self
	 */
	$.fn.loadLazyed = function (settings) {
		var options = $.extend(true, {
			exposeAll: false,
			dataAttrName: 'data-original',
			lazySelector: '.bx-lazy',
			shouldRemoveAttr: 'width height style',
			onComplete: null
		}, settings || {});

		return this.each(function () {
			var $this = $(this),
				$lazyTarget, path
			;
			if(!$this.is('img')) {
				$lazyTarget = $this.find(options.lazySelector);
			}
			else { $lazyTarget = $this; }

			path = $lazyTarget.attr(options.dataAttrName);
			if(path) {
				$lazyTarget.attr('src', path).removeAttr(options.dataAttrName+' '+options.shouldRemoveAttr);
			}
			if($.type(options.onComplete) === 'function') {
				$lazyTarget.load(function() {
					options.onComplete.call($this);
				})
			}
		});
	};

	$.waitJwplayer = function (callback) {
		var findJwplayer = function() {
			var d = $.Deferred();
			setTimeout( function () {
				if(window.jwplayer!== void 0) {
					d.resolve('get jwplayer');
				}
				else {
					findJwplayer();
					d.fail();
				}
			}, 200);
			return d;
		};
		findJwplayer().done( function () {
			if(callback) callback();
		}).fail( function () {
			console.warn('Not Find Jwplayer.js');
		})
	};

	$.timer = function (duration) {
		$.clock = setInterval( function () {
			$win.trigger('scroll');
		}, duration || 500);

		$win.load(function () {
			// clearInterval($.clock);
		})
	};
})(jQuery, window);
$.timer();
