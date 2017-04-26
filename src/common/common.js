/**
 * Created by Publish Team on 2017-04-26.
 */
;(function ($, win) {
	'use strict';
	var $win = $(win);

	/**
	 * [uuid - unique id 명 생성]
	 * @param null
	 * @return {String}
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
	 * @param  {jQuery} $el        [위치 확인 대상 - 뷰포트 영역에 들어갔는지 여부.]
	 * @return {Object} literal    [ {int} left, {int} top, {Boolean} insideViewport ]
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
		stance['justView'] =  stance.insideViewport || stance.crossAtTop || stance.crossAtBottom;
		return stance;
	};
	/**
	 * [ lazyloadImage bx 슬라이더용 lazyload 설정 ]
	 * @param {Object} settings
	 * 					{String} originAttr       : 원래 이미지의 path 를 가지고 있는 속성명
	 * 					{String} lazySelector     : lazy 가 적용 될 dom(img) 노드의 jQuery 선택자 문자열
	 * 					{String} shouldRemoveAttr : lazy 적용후 삭제 해야할 dom 속성명
	 * 					{Function} onComplete     : lazy 적용후 실행 callback
	 * @returns {Object} jQuery self
	 */
	$.fn.lazyloadImage = function (settings) {
		var options = $.extend(true, {
			exposeAll: false,
			originAttr: 'data-original',
			lazySelector: '.lazy',
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

			path = $lazyTarget.attr(options.originAttr);
			$lazyTarget.attr('src', path).removeAttr(options.originAttr,' ',options.shouldRemoveAttr);
			if($.type(options.onComplete) === 'function') {
				options.onComplete.call(this);
			}
		});
	};

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
							if(i <= 1) { $(this).lazyloadImage(); }
						})
					}
					else { $sliderLi.each(function () { $(this).lazyloadImage(); }) }
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
							$owner.reloadSlider();
						},
						onSlideBefore: function ($slideElement, oldIdx, newIdx) {
							if(this.loadComplete) return;
							if($.inScreen($owner).justView) {
								$sliderLi.lazyloadImage();
								this.loadComplete = true;
							}

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
					$owner.reloadSlider()
				},
				redrawSlider: function () {
					$owner.redrawSlider();
				},
				slideStartByScrollView: function () {
					$win.on('scroll', function () {
						if($.inScreen($owner).justView) {
							$owner.startAuto();
							$sliderLi.lazyloadImage({onComplete: function () {console.log('lazy complete')}});
							c.loadComplete = true;
						}
						else {
							$owner.stopAuto();
						}
					})
				}
			};
			c.init();
			$win.trigger('scroll');
			$owner.data('slider', c);
		})
	}

	$.fn.tab = function (settings) {
		let options = $.extend(true, {
			triggers: 'a',
			triggerAttr: 'href',
			contents: '.tab-content',
			activeClassName: 'active',
			onChange: null
		}, settings || {});

		return this.each(function () {
			let $owner = $(this);

			let c = {
				init: function () {
					let triggers = options.triggers,
						triggerType = $.type(triggers)
					;
					if(triggerType === 'array' && triggers.length) triggers = triggers.join(',');

					options.$triggers = $(triggers);
					$owner.on('click', triggers, function (ev) {
						$.preventActions(ev);
						c.show($(this));
					})
				},
				show: function ($t) {
					options.$triggers.removeClass(options.activeClassName);
					$t.addClass(options.activeClassName);

					$(options.contents).hide().removeClass(options.activeClassName);
					$($t.attr(options.triggerAttr)).show().addClass(options.activeClassName);

					if($.type(options.onChange) === 'function' && options.onChange) {
						options.onChange.call($owner, c);
					}
				},
				destory: function () {
					$owner.off('click').clearQueue().data('tab', null);
					c = null;
				}
			};

			c.init();
			$owner.data('tab', c);
		})
	};
	$.fn.tab = function (settings) {
		var options = $.extend(true, {
			triggers: 'a',
			triggerAttr: 'href',
			contents: '.tab-content',
			activeClassName: 'active',
			onChange: null
		}, settings || {});

		return this.each(function () {
			var $owner = $(this);

			var c = {
				init: function () {
					var triggers = options.triggers,
						triggerType = $.type(triggers)
					;
					if(triggerType === 'array' && triggers.length) triggers = triggers.join(',');

					options.$triggers = $(triggers);
					$owner.on('click', triggers, function (ev) {
						$.preventActions(ev);
						c.show($(this));
					})
				},
				show: function ($t) {
					options.$triggers.removeClass(options.activeClassName);
					$t.addClass(options.activeClassName);

					$(options.contents).hide().removeClass(options.activeClassName);
					$($t.attr(options.triggerAttr)).show().addClass(options.activeClassName);

					if($.type(options.onChange) === 'function' && options.onChange) {
						options.onChange.call($owner, c);
					}
				},
				destory: function () {
					$owner.off('click').clearQueue().data('tab', null);
					c = null;
				}
			};

			c.init();
			$owner.data('tab', c);
		})
	};
})(jQuery, window);