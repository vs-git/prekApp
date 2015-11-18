var TestPrepReportGridView = RM.View.extend({

    initialize: function() {
        this.model.on('change', this.render, this);
    },

    el : '#reportGrid',

    template: 'testPrepReportGrid',

    render: function () {
//console.log( "TestPrepReportGridView.render" );

        var self = this;
        TplManager.get(this.template, function(template){
            var tpl = _.template($(template).html());

            self.$el.html(tpl(self.model.toJSON()));

            $("#testPrepReportTable").tablesorter({
                /*headers: {
                    4 : { sorter: false },
                    5 : { sorter: false }
                }*/
                selectorHeaders : ".sortHeader"
            });


       /*
            Mustache.parse($(template).html());   // optional, speeds up future uses

            var rendered = Mustache.render($(template).html(), self.model.toJSON());

            self.$el.html(rendered);
*/

        });
        return this;
    }



});