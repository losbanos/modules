/**
 * Created by Hackers Publish Team on 2017-05-08.
 */
;(function ($, win) {
	'use strict';
	var $win = $(win);
	$.fn.tab = function (settings) {
		var options = $.extend(true, {
			default: 1,
			triggers: 'a',
			triggerAttr: 'href',
			contents: '',
			activeClassName: 'on',
			offOldTab: true,
			sliders: ['.bxslider'],
			players: '',
			onChange: null,
			onRollOver: null,
			onRollOut: null,
			onInit: null
		}, settings || {});

		return this.each(function () {
			var $owner = $(this);

			var c = {
				$triggers: '', $contents: '', $sliders: '', $cur: '', $jwplayers: [],
				init: function () {
					var triggers = options.triggers,
						contents = options.contents,
						triggerType = $.type(triggers)
					;
					if(triggerType === 'array' && triggers.length) triggers = triggers.join(',');

					options.triggers = triggers;
					this.$triggers = $owner.find(triggers);

					if($.type(contents) === 'array' && contents.length) contents = contents.join(',');
					else {
						this.$triggers.each(function () {
							contents += $(this).attr(options.triggerAttr)+',';
						})
					}
					options.contents = contents;
					this.$contents = $(contents.slice(0, -1));

					this.setPlayers();

					$owner.on('click', triggers, function (ev) {
						$.preventActions(ev);
						c.show($(this));
					});
					$win.on('old-tab', function (ev, type) {
						var oldTab = $("ul[class*='"+type+"']");
						oldTab.find('a').off('click');
					});

					this.setDefault(options.default);

					$owner.trigger('init');
					if(c.checkCallBack(options.onInit)) options.onInit.call($owner,c);
				},
				setPlayers: function () {
					$.waitJwplayer(function () {
						if(options.players && options.players.length) {
							$.each(options.players, function (i, n) {
								c.$jwplayers = c.$jwplayers.length ? c.$jwplayers : [];
								c.$jwplayers[i] = $(n);
							})
						}
					});
				},
				show: function ($tabTit) {
					this.$triggers.removeClass(options.activeClassName);
					$tabTit.addClass(options.activeClassName);

					this.$contents.hide().removeClass(options.activeClassName);
					this.$cur = $($tabTit.attr(options.triggerAttr)).show().addClass(options.activeClassName);

					if(options.sliders.length) this.reloadSlider(this.$cur);

					$.waitJwplayer(function () {
						if(options.players && options.players.length) {
							$.each(options.players, function (i, n) {
								jwplayer(options.players[i].slice(1)).pause(true);
							});
							$.each(options.players, function (i, n) {
								if(c.$cur.find(n).length) {
									jwplayer(n.slice(1)).play(true);
								}
							});
						}
					});

					$owner.trigger('onChange');
					$win.trigger('scroll');
					if(c.checkCallBack(options.onChange)) options.onChange.call(this.$cur,c);
				},
				setDefault: function (num) {
					if(num) {
						this.$triggers.eq(num-1).trigger('click');
					}
				},
				reloadSlider: function ($cur) {
					var $sliders = $cur.find(options.sliders.join(','));
					$sliders.each(function () {
						var slider =$(this).data('slider');
						if(slider.reloadSlider){
							slider.reloadSlider();
						}
					})
				},
				destory: function () {
					$owner.off('click').clearQueue().data('tab', null);
					c = null;
				},
				checkCallBack: function(callback) {
					return $.type(callback) === 'function' && callback;
				}
			};

			c.init();
			$owner.data('tab', c);
		})
	};
})(jQuery, window);