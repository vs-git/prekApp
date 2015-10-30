//var Model = Nested.Model;

Backbone.emulateHTTP = true;

var RM = {

    user : null,
    pageErrorSelector : "#error",
    urlPrefix : '/genie2-web/prekserv',//jsserv  prekserv


    Model : Nested.Model.extend({
        sync : function(method, model, options){
            options = _.extend(options, {
                url : RM.urlPrefix + this.url(),
                error : function(xhr, textStatus, errorThrown){
                    ErrorOutputFactory.getHandler(/*{type:"page"}*/).fire(xhr.getResponseHeader("RM-servlet-error"));
                    //ErrorOutputFactory.getHandler(/*{type:"page"}*/).fire(xhr.getResponseHeader("RM-servlet-stacktrace").replace(/\|/g, "\n"));

                }
            });
            return Backbone.sync.apply(this, [method, model, options]);
        },
        parse : function(response, options) {
            return response.length == 1 ? response[0] : response;
        },
        sendData : function(options){

            options = _.extend({
                url : RM.urlPrefix + this.url(),
                contentType : 'application/json',
                dataType : 'json',
                type : 'POST',
                data : JSON.stringify(this),
                model : this,
                context : this,
                success : function(data, textStatus, jqXHR) {
                    console.log( "sendData has been invoked successfully" );
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown  );
                }
            }, options);

            $.ajax(options);
        }
        /*
        initialize: function(){
         It looks like it's a bad idea
         maybe it may sense use in in method "change" that called by event
            Object.preventExtensions(this.attributes);
        }*/
    }),

    Collection : Backbone.Collection.extend({
        sync : function(method, model, options){
            options = _.extend(options, {
                url : RM.urlPrefix + this.url(),
                error : function(xhr, textStatus, errorThrown){
                    ErrorOutputFactory.getHandler(/*{type:"page"}*/).fire(xhr.getResponseHeader("RM-servlet-error"));
                    //ErrorOutputFactory.getHandler(/*{type:"page"}*/).fire(xhr.getResponseHeader("RM-servlet-stacktrace").replace(/\|/g, "\n"));
                }
            });
            return Backbone.sync.apply(this, [method, model, options]);
        }
    }),

    View : Backbone.View.extend({

        TplManager : {
            tplDir : "app/tpl/",
            templates: {},
            callbacks: {},

            get: function(id, callback){

                var template = this.templates[id];

                if (template) {
                    callback(template);

                } else if (typeof this.callbacks[id] == "undefined") {
                    this.callbacks[id] = [];
                    this.callbacks[id].push(callback);

                    var self = this
                        ,d = $.Deferred();

                    d.done(function(){
                        for (var i = 0; i < self.callbacks[id].length; i++) {
                            self.get(id, self.callbacks[id][i]); //after d.done the template[id] already exists
                        }
                    });
                    $.get(this.tplDir + id + ".html", function(template){

                        self.templates[id] = _.filter(
                            $(template), //collection of nodes from plain template
                            function(node){
                                return node.nodeType == 1; //1 => SCRIPT
                            }
                        );

                        d.resolve();
                    }, 'html');

                } else {
                    this.callbacks[id].push(callback);
                }
            }
        }
    }),

    SheetManager: (function () {

        var stickers = '#sheetStickers'; // selector of DOM element, container for sheet stickers
        var sheets = '#sheets'; // selector of DOM element, container for sheets

        var sheetRegistry = {};
        var stickerRegistry = {};

        var stickerTemplate = '<div class="sticker"><span class="bold close">X</span></div>';
        var stickerIdPostfix = 'Sticker';


        function add(sheetViewName) {

            var sheetView = new (eval(sheetViewName)); //todo подумать как избавиться от eval и надо ли
            if (!(sheetView instanceof RM.View)) {
                console.log('class by id ' + sheetViewName + ' is not instanceof RM.View');
            }

            sheetView.render().$el.attr("id", sheetViewName);

            events.off('sheetRendered');
            events.on('sheetRendered', function(e, data){
                $('#sheets').append(data.view.$el);
                if (!(typeof data.view.renderChildren === 'undefined')) {
                    data.view.renderChildren();
                }
            });
            toFront(sheetViewName);

            var $sticker = $(stickerTemplate).off('click.shm').on('click.shm', function(e){
                toFront($.data(e.target, 'sheetId'));
            });
            $.data($sticker.get(0), 'sheetId', sheetViewName);

            $(stickers).append($sticker);

            $sticker.off('mouseenter.shm', '.close').on('mouseenter.shm', '.close', function(e){
                $(e.target).addClass('mouseEnter');
            }).off('mouseout.shm', '.close').on('mouseout.shm', '.close', function(e){
                $(e.target).removeClass('mouseEnter');
            }).off('click.shm', '.close').on('click.shm', '.close', function(e){
                del(e);
            });

            sheetRegistry[sheetViewName] = sheetView;
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
            sheetRegistry[key].$el.addClass('hidden');
            stickerRegistry[key].removeClass('active');
        }

        function show(key){
            sheetRegistry[key].$el.removeClass('hidden');
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


        return {

            get : function(stickerId){
                var sheetViewName = stickerId.replace(/menuItem/i, '');

                if (!(sheetRegistry[sheetViewName] instanceof RM.View)) {
                    add(sheetViewName);
                }
                toFront(sheetViewName);
            }
        }

    })()
};


var events = (function(){
    var eventNode = $({});
    return {
        on: on,
        off: off,
        trigger: trigger
    };
    function on(){
        eventNode.on.apply(eventNode, arguments);
    }
    function off(){
        eventNode.off.apply(eventNode, arguments);
    }
    function trigger(){
        eventNode.trigger.apply(eventNode, arguments);
    }
})();








