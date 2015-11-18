var TestPrepReportResponseObj = new TestPrepReportResponse;// TODO !!!!!!!!!!!!!

var TestPrepReportSheet = RM.View.extend({

    initialize: function() {
        //this.model.on('change', this.render, this);
    },

    //el : '#sheets',

    template: 'sheet/report',

    render: function () {

        var self = this;
        return new Promise(function(resolve, reject) {
            TplManager.get(self.template, function (template) {

                self.$el.html($(template).html());
                //var tpl = _.template($(template).html());
                //self.$el.html(tpl(self.model.toJSON()));

                //events.trigger('sheetRendered', {view:self});

                //$('#sheets').append(self.$el);

                //self.renderChildren();
                //self.renderChildren().then(resolve).catch(function(error){ErrOut.getHandler({type:'console'}).fire(error);});
                resolve(self);
            });
        });
    },
    renderChildren : function(){
        (new TestPrepReportFormView({model : new TestPrepReportRequest})).render();
        (new TestPrepReportGridView({model : TestPrepReportResponseObj})).render();
        return this;
    }

});