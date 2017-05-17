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
			sliders: ['.bxslider-lazy'],
			players: '',
			onChange: null,
			onRollOver: null,
			onRollOut: null,
			onInit: null
		}, settings || {});

		return this.each(function () {
			var $owner = $(this);
			var c = {
				$triggers: '', $contents: '', $sliders: '',$cur: '', $jwplayers: [], $activeClassTarget: '',
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
						contents = '';
						this.$triggers.each(function () {
							var $this = $(this);
							if($this.attr(options.triggerAttr)) {
								contents += $this.attr(options.triggerAttr)+',';
							}
							else {
								contents += $this.find('a').attr(options.triggerAttr)+',';
							}
						})
					}
					options.contents = contents;
					try{
						this.$contents = $(contents.slice(0, -1));
					}
					catch(e) {
						var msg = e.message;
						if(msg.indexOf('Syntax error') > -1){
							console.warn('탭 선택자 오타 혹은 오류입니다. \r\n 태그 및 trigger 확인 바랍니다. ', $owner)
						}
						return false;
					}
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
					var cur;
					if($tabTit.is('a')) {
						cur = $tabTit.attr(options.triggerAttr);
					}
					else {
						cur = $tabTit.find('a').attr(options.triggerAttr);
					}
					this.$cur = $(cur).show().addClass(options.activeClassName);

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
					$.emitScroll();

					if(c.checkCallBack(options.onChange)) options.onChange.call(c.$cur,c);
				},
				setDefault: function (num) {
					if(num) {
						this.$triggers.eq(num-1).trigger('click');
					}
					else {
						this.$triggers.eq(options.default-1).trigger('click');
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
		});
	};
})(jQuery, window);