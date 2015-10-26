

(function( $ ){

    /**
     * ?????????? ????? ???? ???????? ????????? ????? ??????
     */
    $.fn.ShowBlackout = function(func, position)
    {
        if ('function' != typeof func) {
            func = function(){};
        }
        position = position || 'absolute';
        $('<div id="blackout" />').css('z-index', 110).css('background-color', '#000')
            .css('opacity', 0.5).css('width', $(document).width()+'px').css('height', $(document).height()+'px')
            .css('position', 'absolute').css('left', 0).css('top', 0).ChangeBlackout().fadeIn(300).appendTo($('body'));
        // ???? appendTo($('body')) - ???, ??? ???? ???? ??????????? ?????? ???
        $(this).appendTo($('body')).css('z-index', 120).css('position', position).fadeIn(300, func).centerByWindow();
        var showobj = this;
        $(document).one('keydown', function(e){// ?????????? ???????? ???? ?? ??????? ??????? Esc
            if ( 27 == e.keyCode ) {
                showobj.HideBlackout();
                return false;
            }
        });

        return $(this);
    };

    /**
     * ????????? ?????? ???????
     */
    $.fn.ChangeBlackout = function()
    {
        $(window).resize(function() {
            $('#blackout').width($(document).width());
        });
        return $(this);
    };

    /**
     * ???????? ????? ? ??????? ??????????
     */
    $.fn.HideBlackout = function()
    {
        $(this).fadeOut(300);
        $('#blackout').fadeOut(300, function(){
            $(this).remove();
        });
        return $(this);
    };


    /**
     * ?-??? jQuery
     * ????????????? ???????(?) ?? ?????? ????
     */
    $.fn.centerByWindow = function() {
        $(this).each(function() {
            var Wadd = 0;
            var Hadd = 0;
            if ('absolute' == $(this).css('position')) {
                Wadd = $(window).scrollLeft();
                Hadd = $(window).scrollTop();
            }
            var deltaW = ($(window).width() - $(this).width()) / 2 + Wadd;
            var deltaH = ($(window).height() - $(this).height()) / 2 + Hadd;
            if (deltaW < 0 ) deltaW = 0;
            if (deltaH < 0 ) deltaH = 0;
            $(this).css('left', deltaW).css('top', deltaH);
        });
        return $(this);
    };


    /**
     * ?-??? jQuery
     * ????????????? ???????(?) ?? ??????? JQuery
     */
    $.fn.centerByObject = function(jqobject) {
        $(this).each(function() {
            var deltaW = (jqobject.width() - $(this).width()) / 2;
            var deltaH = (jqobject.height() - $(this).height()) / 3;
            if( deltaH < 0 ) deltaH = 0;
            $(this).css('left', deltaW).css('top', deltaH);
        });
        return $(this);
    };





})(jQuery );
