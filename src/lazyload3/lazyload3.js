/**
 * Created by Hackers Publish Team on 2017-04-26.
 */
;(function ($, win) {
	'use strict';
	var $win = $(win);
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
						$this.loadLazyed({onComplete: function () {
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
			minHeight: $win.height(),
			forceSize: false
		}, settings || {});

		return this.each(function () {
			var $this = $(this);
			if(!options.forceSize) {$this.height(options.minHeight).css('display', 'inline-block')}

			$this.lazyload(options).load(function () {
				$this.removeAttr('style data-original');
			});
		})
	}
})(jQuery, window);
