var AdultLayout = RM.View.extend({

    template: 'layout/adult',


    el : 'body',

    /**
     *

     tplNodes: [],

     * @type Function
     * @param {String} id
     * @param {Boolean} wrap Return as jQuery object
     * @return {Object} (Element)
     * todo: move to TplManager (?)

    getTplNodeById : function(id, wrap){
        var node = _.filter(this.tplNodes, function(node){
            return node.getAttribute("id") == id.replace(/\W/g, "");
        }).shift();
        return wrap ? $(node) : node;
    },*/

    render: function () {
        var self = this;
        TplManager.get(this.template, function(template){

            self.tplNodes = template;

            self.$el.html($($(template).html()));

            //self.$el.html((new TestPrepReportSheet()).render().$el);

           // self.$el = (new TestPrepReportSheet()).render().$el;
            //self.addSheet();
            //self.addListeners();
            //(new AuthFormView({model: new AuthForm})).render();

        });
        return this;
    },

    events : {
        'click .menu div' : 'addMenuListener'
    },

    addMenuListener : function(e){
        SheetManager.get( $(e.target).attr('id'));
    }

});

