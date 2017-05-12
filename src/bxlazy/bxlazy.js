/**
 * Created by Hackers Publish Team on 2017-04-26.
 */
;(function ($, win) {
	'use strict';
	var $win = $(win);

	$.fn.setBxSlider = function (settings) {
		$.sliders = $.sliders || [];

		var options = $.extend( true, {

		}, settings || {});

		return this.each(function () {
			var $owner = $(this),
				$sliderLi = $owner.find('li')
			;
			var c = {
				initialize: false, lazy: true,
				hasPager: false,
				slider: '',
				init: function () {
					$owner.attr('id', $.uuid());

					var len = $sliderLi.length,
						isSingleImage = len === 1;

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
					this.hasPager = _pager;

					//자동 슬라이드 컨트롤 버튼 설정 여부
					var _controls = $owner.attr("data-controls");
					_controls = _controls && _controls=='true' ? true : false;

					c.lazy = $owner.attr('data-lazy');
					c.lazy = (c.lazy !== void 0 && !isNaN(c.lazy))? c.lazy: true;

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
							if(c.hasPager) {
								$sliderLi.loadLazyed();
							}
							else {
								if(newIdx > 0 || newIdx === len - 1) $slideElement.loadLazyed();
							}
						}
					});

					if( _auto && !isSingleImage ){
						$owner
							.on('mouseover touchstart',function(){ $owner.stopAuto() })
							.on('mouseout touchend',function(){ $owner.startAuto() });
					}

					c.initialized = true;
					c.showImage();
				},
				onScroll: function () {
					if($.inScreen($owner) ){
						if(!c.initialized) {
							c.init();
						}
						else {
							$owner.startAuto();
						}
					}
					else {
						if(c.initilized) {
							$owner.stopAuto()
						}
					}
				},
				showImage: function () {
					if(c.lazy) {
						var len = $sliderLi.length - 1;
						$sliderLi.filter(function (i){
							if(i == 0 || i == len) {
								$(this).loadLazyed();
							}
						});
					}
					else { $sliderLi.each(function () {$(this).loadLazyed(); }) }

					$owner.find('.bx-clone').loadLazyed();
				},
				reloadSlider: function () {
					if(!c.initialized) {
						c.init();
					}
					else {
						$owner.reloadSlider()
					}
				}
			};
			$win.on('scroll', c.onScroll);
			$owner.data('slider', c);
			$win.trigger('scroll');
		})
	};
})(jQuery, window);
