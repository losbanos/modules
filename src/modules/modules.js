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
			rect1 = { x1: scrollLeft, y1: scrollTop, x2: scrollLeft + $win.width(), y2: scrollTop + $win.height() },
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
	 * [ lazyload2 bx 슬라이더용 lazyload 설정 ]
	 * @param {Object} settings
	 * 					{String} originAttr       : 원래 이미지의 path 를 가지고 있는 속성명
	 * 					{String} lazySelector     : lazy 가 적용 될 dom(img) 노드의 jQuery 선택자 문자열
	 * 					{String} shouldRemoveAttr : lazy 적용후 삭제 해야할 dom 속성명
	 * 					{Function} onComplete     : lazy 적용후 실행 callback
	 * @returns {Object} jQuery self
	 */
	$.fn.lazyload2 = function (settings) {
		var options = $.extend(true, {
			exposeAll: false,
			dataAttrName: 'data-original',
			lazySelector: '.bx-lazy',
			shouldRemoveAttr: 'width height',
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
			$lazyTarget.attr('src', path).removeAttr(options.dataAttrName,' ',options.shouldRemoveAttr);
			if($.type(options.onComplete) === 'function') {
				$lazyTarget.load(function() {
					options.onComplete.call($this);
				})
			}
		});
	};
	/**
	 * 순차적 이미지 로딩을 위한 lazy 전역함수
	 * scrollTop 0 으부터 스크롤시 정상동작, 하단으로부터 스크롤 혹은 페이지 로드시 앵커태그로 임의 이동의 경우 정상적으로 동작하지 않음.
	 * usage - $.lazy(selectors);
	 * @param $elements
	 */
	$.lazy = function ($elements) {
		var $els = $($elements);

		var c = {
			$cur: '',
			inProgress: false,
			check: function () {
				if(c.inProgress) return false;

				$els.each(function () {
					var $this = $(this);
					if($.inScreen($this)) {
						c.inProgress = true;
						$this.lazyload2({onComplete: function () {
							var $el = $($els.splice(0, 1));
							$el.removeClass('lazy').removeAttr('data-original');
							c.inProgress = false;
							c.check();
						}});
						return false;
					}
				})
			}
		};
		$win.scroll(function () {
			c.check();
		});
	};
	/**
	 * [ lazyload3 ]
	 * @desc	lazyload(http://appelsiini.net/projects/lazyload/) 가 기본적으로 대상 이미지에 height 를 선언해주어야 하는 부분에 대한 보완
	 * 			min-height 를 임의로 선언함으로 대상 이미지가 스크린에 노출/로드 되는지에 대한 여부를 결정할수 있도록 설정.
	 * 			해당 이미지가 로드된 이후에는 min-height 속성을 삭제함으로써 설정된 min-height보다 작은 이미지에 대한 대응.
	 *
	 * @param {Object} settings {
	 * 						{int}       minHeight : 스크롤 포지션확정을 위한 이미지의 최소 가정 높이( 해당 페이지의 이미지 평균높이에 따라 임의로 설정가능)
	 * 						{Boolean}	forceSize : min-height 를 무시하고 width, height 를 직접 대상에 입력할시 true 로 설정하면 min-height 값을 무시한다.
	 * @returns {jQuery} self;
	 */
	$.fn.lazyload3 = function (settings) {
		var options = $.extend(true, {
			minHeight: 500,
			forceSize: false
		}, settings || {});

		return this.each(function () {
			var $this = $(this);
			if(!forceSize) { $this.css('min-height', options.minHeight); }

			$this.lazyload().load(function () {
				$this.removeAttr('style');
			})
		})
	}


	$.fn.setBxSlider = function (settings) {
		$.sliders = $.sliders || [];

		var options = $.extend( true, {

		}, settings || {});

		return this.each(function () {
			var $owner = $(this),
				$sliderLi = $owner.find('li')
			;
			var c = {
				init: function () {
					$owner.attr('id', $.uuid());

					var isSingleImage = $sliderLi.length === 1;
					// 슬라이드 Direction - horizontal,vertical,fade
					var _mode = $owner.attr("data-mode");
					_mode = _mode ? _mode : 'horizontal';

					// 최대 보여지는 갯수
					var _maxSlides = $owner.attr("data-maxSlides");
					_maxSlides = _maxSlides && !isNaN(parseInt(_maxSlides)) ? parseInt(_maxSlides) : 1;

					// 슬라이드 사이 margin 값
					var _slideMargin = $owner.attr("data-slideMargin");
					_slideMargin = _slideMargin && !isNaN(parseInt(_slideMargin)) ? parseInt(_maxSlides) : 0;

					// 슬라이드 딜레이 설정
					var _delay = $owner.attr("data-delay");
					_delay = _delay && !isNaN(parseInt(_delay)) ? parseInt(_delay) : 4000;

					// 슬라이드 속도 설정
					var _speed = $owner.attr("data-speed");
					_speed = _speed && !isNaN(parseInt(_speed)) ? parseInt(_speed) : 400;

					// play / stop / puase Controlls
					var _autoBtn = $owner.attr("data-autoBtn");
					_autoBtn = _autoBtn && _autoBtn=='true' ? true : false;

					// 자동슬라이드 여부
					var _auto  = $owner.attr("data-auto");
					_auto = _auto && _auto=='true' ? true : false;

					// Pagination
					var _pager = $owner.attr("data-pager");
					_pager = ( _pager && _pager=='true' && !isSingleImage ) ? true : false;

					//자동 슬라이드 컨트롤 버튼 설정 여부
					var _controls = $owner.attr("data-controls");
					_controls = _controls && _controls=='true' ? true : false;

					var dataLazy = parseInt($owner.attr('data-lazyload'));
					dataLazy = (dataLazy !== void 0 && !isNaN(dataLazy))? dataLazy: 1;

					if(dataLazy) {
						$sliderLi.filter(function (i){
							if(i <= 1) { $(this).lazyload2();}
						})
					}
					else { $sliderLi.each(function () { $(this).lazyload2(); }) }
					$owner = $owner.bxSlider({
						slideWidth: $sliderLi.width()
						,slideMargin: _slideMargin
						,minSlides: 1, maxSlides: _maxSlides
						,speed: _speed
						,pause: _delay
						,mode: _mode
						,autoControls: _autoBtn, auto: _auto
						,pager: _pager
						,controls: _controls
						,preventDefaultSwipeX: true
						,infiniteLoop: true
						,lazyLoad: dataLazy
						,$container: $owner
						,loadComplete: false
						,onSliderLoad:function(){
							$owner.css('visibility', 'visible');
						}
						,onSliderResize:function(){
							// $owner.find('.bx-wrapper').css({
							// 	'max-width': $win.width() + 'px',
							// 	'margin': '1px auto'
							// });
							$owner.redrawSlider();
						},
						onSlideBefore: function ($slideElement, oldIdx, newIdx) {
							$sliderLi.lazyload2();
						}
					});
					$.sliders.push($owner);

					if( _auto && !isSingleImage ){
						$owner.on('mouseover touchstart',function(){ $owner.stopAuto() })
							.on('mouseout touchend',function(){ $owner.startAuto() });
					}
					c.slideStartByScrollView();
				},
				reloadSlider: function () {
					$owner.reloadSlider();
				},
				redrawSlider: function () {
					$owner.redrawSlider();
				},
				slideStartByScrollView: function () {
					$win.on('scroll', function () {
						if($.inScreen($owner)) { $owner.startAuto(); }
						else { $owner.stopAuto(); }
					})
				}
			};
			c.init();
			$win.trigger('scroll');
			$owner.data('slider', c);
		})
	};
	/**
	 *
	 * @param settings
	 */
	$.fn.tab = function (settings) {

	}
})(jQuery, window);