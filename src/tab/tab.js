/**
 * Created by Hackers Publish Team on 2017-05-08.
 */
;(function ($, win) {
	'use strict';
	var $win = $(win);
	$.fn.tab = function (settings) {
		var options = $.extend(true, {
			default: 1,
			triggers: 'a', triggerAttr: 'href',
			contents: '',
			activeClassName: 'on',
			oldTabPrefix: 'js-tab-type',
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
				$triggers: '', $contents: '', $sliders: '', $cur: '', $jwplayers: [], $activeClassTarget: '',
				init: function () {
					$.when(
						this.setTriggers(options.triggers),
						this.setContents(options.contents)
					).done(c.setActiveClassTarget(options.activeClassTarget));

					this.setPlayers();
					this.disableOldTab();

					$owner.on('click', options.triggers, function (ev) {
						$.preventActions(ev);
						c.show($(this));
					});

					this.setDefault(options.default);

					$owner.trigger('init');
					if(c.checkCallBack(options.onInit)) options.onInit.call($owner,c);
				},
				setTriggers: function (triggers) {
					var triggerType = $.type(triggers)
					;
					if(triggerType === 'array' && triggers.length) triggers = triggers.join(',');

					options.triggers = triggers;
					this.$triggers = $owner.find(triggers);

					return options.triggers;
				},
				setContents: function (contents) {
					if($.type(contents) === 'array' && contents.length) contents = contents.join(',');
					else {
						this.$triggers.each(function () {
							var $this = $(this);
							// if(!$this.is('a')) {
							// 	$this = $this.find('a');
							// }
							contents += $this.attr(options.triggerAttr)+',';
						})
					}
					options.contents = contents;
					this.$contents = $(contents.slice(0, -1));

					return options.contents;
				},
				setActiveClassTarget: function (activeClassTarget) {
					if($.type(activeClassTarget) === 'array' && activeClassTarget.length) activeClassTarget = activeClassTarget.join(',');
					else activeClassTarget = options.triggers;

					this.$activeClassTarget = $owner.find(activeClassTarget);

				},
				disableOldTab: function () {
					var prefix = options.oldTabPrefix;
					if(prefix && prefix.length) {
						var ot = $('ul[class*="'+prefix+'"]');
						if(ot.length) {
							ot.find('a').off('click');
						}
					}
					$win.on('old-tab', function () {
						var ot = $("ul[class*='"+prefix+"']");
						if(ot.length) {
							ot.find('a').off('click');
						}
					});
				},
				setPlayers: function () {
					if(options.players.length) {
						$.waitJwplayer(function () {
							if(options.players && options.players.length) {
								$.each(options.players, function (i, n) {
									c.$jwplayers = c.$jwplayers.length ? c.$jwplayers : [];
									c.$jwplayers[i] = $(n);
								})
							}
						});
					}
				},
				show: function ($tabTit) {
					this.$triggers.removeClass(options.activeClassName);
					$tabTit.addClass(options.activeClassName);

					this.$contents.hide().removeClass(options.activeClassName);

					// if(!$tabTit.is('a')) {
					// 	$tabTit = $tabTit.find('a');
					// }
					this.$cur = $($tabTit.attr(options.triggerAttr)).show().addClass(options.activeClassName);

					if(options.sliders.length) this.reloadSlider(this.$cur);


					if(options.players.length) {
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
					}

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
					});
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