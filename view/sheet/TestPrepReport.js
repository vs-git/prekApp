var TestPrepReportResponseObj = new TestPrepReportResponse;// TODO !!!!!!!!!!!!!

var TestPrepReportSheet = RM.View.extend({

    initialize: function() {
        //this.model.on('change', this.render, this);
    },

    //el : '#sheets',

    template: 'sheet/report',

    render: function () {
        var self = this;
        this.TplManager.get(this.template, function(template){

            self.$el.html($(template).html());
            //var tpl = _.template($(template).html());
            //self.$el.html(tpl(self.model.toJSON()));

            //events.trigger('sheetRendered', {view:self});

            //todo м.б. имеет смысл сделать вью типа sheet и там сделать автовызов этих методов по завершению рендеринга шаблона
            $('#sheets').append(self.$el);
            self.renderChildren();
        });
        return this;
    },
    renderChildren : function(){
        console.log(  111);
        (new TestPrepReportFormView({model : new TestPrepReportRequest})).render();
        (new TestPrepReportGridView({model : TestPrepReportResponseObj})).render();
        return this;
    }

});