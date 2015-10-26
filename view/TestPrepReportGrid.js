var TestPrepReportGridView = RM.View.extend({

    initialize: function() {
        //this.model.on('change', this.render, this);
    },

    template: 'testPrepReport',

    render: function () {
        var self = this;
        this.TplManager.get(this.template, function(template){
            var tpl = _.template($(template).html());
            self.$el.html(tpl(self.model.toJSON()));

            $('body').find('#'+self.template).html(self.$el);
        });
        return this;
    }

});