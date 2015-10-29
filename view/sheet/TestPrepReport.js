var TestPrepReportResponseObj = new TestPrepReportResponse;

var TestPrepReportSheet = RM.View.extend({

    initialize: function() {
        //this.model.on('change', this.render, this);
    },

    template: 'sheet/testPrepReport',

    render: function () {
        var self = this;
        this.TplManager.get(this.template, function(template){

            self.$el.html($(template).html());
            //var tpl = _.template($(template).html());
            //self.$el.html(tpl(self.model.toJSON()));

            (new TestPrepReportFormView({model : new TestPrepReportRequest})).render();
            (new TestPrepReportGridView({model : TestPrepReportResponseObj})).render();
        });
        return this;
    }

});