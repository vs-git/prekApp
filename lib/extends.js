//var Model = Nested.Model;

Backbone.emulateHTTP = true;

var RM = _.extend({

    user : null,
    pageErrorSelector : "#error",
    urlPrefix : '/genie2-web/prekserv',//jsserv  prekserv

    }, {


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
    })
});







