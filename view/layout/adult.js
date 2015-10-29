var AdultLayout = RM.View.extend({

    template: 'layout/adult',

    tplNodes: [],

    el : 'body',

    /**
     * @type Function
     * @param {String} id
     * @param {Boolean} wrap Return as jQuery object
     * @return {Object} (Element)
     */
    getTplNodeById : function(id, wrap){
        var node = _.filter(this.tplNodes, function(node){
            return node.getAttribute("id") == id;
        }).shift();
        return wrap ? $(node) : node;
    },

    render: function () {
        var self = this;
        this.TplManager.get(this.template, function(template){

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

    addSheet : function(id) {

        //todo при вызове листа который уже есть, делать его и его ярлык активным а прочие hidden

        var sheetName;
        if (id == 'testPrepReport') {
            sheetName = TestPrepReportSheet;
        }

        var $el = (new sheetName()).render().$el;
        $el.attr("id", id);

        $("#header").children(".sheetStickers").append(this.getTplNodeById("sheetStickerItem", true).html());
        $("#sheets").append($el);

    },

    events : {
        'click .menu div' : 'addMenuListener'
    },

    addMenuListener : function(e){
        this.addSheet($(e.target).attr('id'));
    }


     /*
    addListeners : function() {
        var self = this;
        $(".menu").on('click', 'div', function(e){
            self.addSheet($(e.target).attr('id'));
        });

    }*/
});