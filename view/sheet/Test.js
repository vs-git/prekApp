
var TestSheet = RM.View.extend({

    initialize: function() {
        //this.model.on('change', this.render, this);
    },

    template: 'sheet/test',

    //el : '#sheets',

    render: function () {
        var self = this;
        this.TplManager.get(this.template, function(template){

            self.$el.html($(template).html());
            //var tpl = _.template($(template).html());
            //self.$el.html(tpl(self.model.toJSON()));

            events.trigger('sheetRendered', {view:self});

        });
        return this;
    }

});
