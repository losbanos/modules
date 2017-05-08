/**
 * Created by admin on 2017-05-08.
 */
;(function ($, win) {
	'use strict';
	var $win = $(win);
	$.fn.tab = function (settings) {
		var options = $.extend(true, {
			triggers: 'a',
			triggerAttr: 'href',
			contents: '.tab-content',
			activeClassName: 'on',
			onChange: null,
			sliders: '',
			videos: ''
		}, settings || {});

		return this.each(function () {
			var $owner = $(this);

			var c = {
				$triggers: '',
				$contents: '',
				init: function () {
					var triggers = options.triggers,
						contents = options.contents,
						triggerType = $.type(triggers)
					;
					if(triggerType === 'array' && triggers.length) triggers = triggers.join(',');

					this.$triggers = $(triggers);

					if($.type(contents) === 'array' && contents.length) contents = contents.join(',');


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