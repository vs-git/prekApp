function percent(x){
    return x * 100;
}

var SheetManager = (function () {

    var stickers = '#sheetStickers'; // selector of DOM element, container for sheet stickers
    var sheets = '#sheets'; // selector of DOM element, container for sheets
    var menuItemSuffix = 'menuitem';

    var sheetRegistry = {};
    var stickerRegistry = {};

    var stickerTemplate = '<div class="sticker"><span class="bold close">X</span></div>';

    function add(sheetViewName, sheetViewAdapter) {

        sheetViewAdapter.html().attr("id", sheetViewName);

        sheetViewAdapter.render()
            .then(function(view){
                $(sheets).append(sheetViewAdapter.html())
                sheetViewAdapter.renderChildren();
            })
            .catch(function(error){
                ErrOut.getHandler({type:'console'}).fire(error);
            });

        var $sticker = $(stickerTemplate).off('click.shm').on('click.shm', function(e){
            toFront($.data(e.target, 'sheetId'));
        });
        $(stickers).append($sticker);
        $.data($sticker.get(0), 'sheetId', sheetViewName);

        $sticker.off('mouseenter.shm', '.close').on('mouseenter.shm', '.close', function(e){
            $(e.target).addClass('mouseEnter');
        }).off('mouseout.shm', '.close').on('mouseout.shm', '.close', function(e){
            $(e.target).removeClass('mouseEnter');
        }).off('click.shm', '.close').on('click.shm', '.close', function(e){
            del(e);
        });

        sheetRegistry[sheetViewName] = sheetViewAdapter;
        stickerRegistry[sheetViewName] = $sticker;
    }

    function del(e){

        var key = $.data($(e.target).parent().get(0), "sheetId");
        $(stickers).children().each(function(index, elem){

            if ($.data(elem, "sheetId") === key) {
                $(elem).remove();
                return;
            }
        });
        $('#'+key).remove();
        delete sheetRegistry[key];
        delete stickerRegistry[key];
        setFirstToFront();
    }

    function hide(key){
        sheetRegistry[key].html().addClass('hidden');
        stickerRegistry[key].removeClass('active');
    }

    function show(key){
        sheetRegistry[key].html().removeClass('hidden');
        stickerRegistry[key].addClass('active');
    }

    function setFirstToFront(){
        toFront();
    }

    function toFront(sheetViewName) {
        // if argument is empty, 1st sheet will be displayed
        for (var key in stickerRegistry) {
            if (stickerRegistry.hasOwnProperty(key)) {
                if (sheetViewName === key || !sheetViewName) {
                    show(key);
                    if (!sheetViewName) {
                        break;
                    }
                } else {
                    hide(key);
                }
            }
        }
    }


    // specify methods for used view
    function Adapter(view){
        this.view = view;
    }
    Adapter.prototype.render = function(){
        return this.view.render();// Promise
    }
    Adapter.prototype.renderChildren = function(){
        this.view.renderChildren();
        return this;
    }
    Adapter.prototype.html = function(){
        return this.view.$el;
    }

    return {

        get : function(stickerId){

            var sheetViewName = stickerId.replace(new RegExp(menuItemSuffix, 'i'), ''), sheetView;

            if (typeof global[sheetViewName] === 'undefined') {
                ErrOut.getHandler({type:'console'}).fire('variable "' + sheetViewName + '" is undefined');
                return;
            }
            sheetView = new Adapter(new global[sheetViewName]);

            if (!(sheetView.view instanceof RM.View)) {
                ErrOut.getHandler({type:'console'}).fire('variable "' + sheetViewName + '" is not contains RM.View');
                return;
            }
            if (!sheetRegistry[sheetViewName] || !(sheetRegistry[sheetViewName].view instanceof RM.View)) {
                add(sheetViewName, sheetView);
            }

            toFront(sheetViewName);
        }
    }

})();


var TplManager = (function () {

    var tplDir = "app/tpl/"
        , templates = {}
        , callbacks = {};

    return {
        setDir: function(path){
            tplDir = path;
        },
        get: function (id, callback) {

            var template = templates[id]
                ,self = this;

            if (template) {
                callback(template);

            } else if (typeof callbacks[id] == "undefined") {
                callbacks[id] = [];
                callbacks[id].push(callback);

                var d = $.Deferred();

                d.done(function () {
                    for (var i = 0; i < callbacks[id].length; i++) {
                        self.get(id, callbacks[id][i]); //after d.done the template[id] already exists
                    }
                });
                $.get(tplDir + id + ".html", function (template) {

                    templates[id] = _.filter(
                        $(template), //collection of nodes from plain template
                        function (node) {
                            return node.nodeType == 1; //1 => SCRIPT
                        }
                    );

                    d.resolve();
                }, 'html');

            } else {
                callbacks[id].push(callback);
            }
        }
    }
})();