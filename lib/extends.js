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
                    var errOut = xhr.getResponseHeader("RM-servlet-error") || errorThrown;
                    ErrOut.getHandler(/*{type:"page"}*/).fire(errOut);
                    //ErrOut.getHandler(/*{type:"page"}*/).fire(xhr.getResponseHeader("RM-servlet-stacktrace").replace(/\|/g, "\n"));
                }
            });
            return Backbone.sync.apply(this, [method, model, options]);
        },
        /*parse : function(response, options) {
            return response.length == 1 ? response[0] : response;
        },*/
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
                    var errOut = xhr.getResponseHeader("RM-servlet-error") || errorThrown;
                    ErrOut.getHandler(/*{type:"page"}*/).fire(errOut);
                    //ErrOut.getHandler(/*{type:"page"}*/).fire(xhr.getResponseHeader("RM-servlet-stacktrace").replace(/\|/g, "\n"));
                }
            });
            return Backbone.sync.apply(this, [method, model, options]);
        }
    }),

    View : Backbone.View.extend({
        // for sheets
        renderChildren : function(){}
    })

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








