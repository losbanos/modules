;(function ($, win, doc) {
    'use strict';
    var $win = $(window), $doc = $(document);
    $.fn.floating = function (setting) {
        var options = $.extend(true, {
            prev: null,
            activateClassName:'fixed',
            inlineCSS:{position: 'fixed', left: 0, top: '0 !important'}
        }, setting || {});

        return this.each(function() {
            var $this = $(this),
            	prev = options.prev ? $(options.prev) : $this.prev();
            $win.scroll(function () {
                var t = prev.position().top + prev.height();
                var offset = t + $this.height();
                $this.css({top: t + 'px'});
                if(offset < $win.scrollTop()) {
                    if(!options.activateClassName.length) $this.css(options.inlineCSS);
                    else $this.addClass(options.activateClassName);
                }
                else {
                	if(!options.activateClassName.length) $this.css({position: '', left: '', top: ''});
                	else $this.removeClass(options.activateClassName);
                }
            });
            $win.trigger('scroll');
        })
    }
})(jQuery, window, document);
