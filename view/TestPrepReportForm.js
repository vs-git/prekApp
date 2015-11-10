var TestPrepReportFormView = RM.View.extend({

    template: 'testPrepReportForm',

    el : '#reportForm',

    render: function () {
        var self = this;
        this.TplManager.get(this.template, function(template){
            var tpl = _.template($(template).html());
            self.$el.html(tpl(self.model.toJSON()));
        });
        return this;
    },

    events : {
        'click button' : 'buttonListener'
    },

    buttonListener : function(e){
        this.updateModel();

    },

    updateModel : function(){
        // if RMDate is backbone-model
        //var startDate = new RMDate({stringDate : this.$el.find('[name=startDate]').val()});
        //var endDate = new RMDate({stringDate : this.$el.find('[name=endDate]').val()});

        var startDate = new RMDate(this.$el.find('[name=startDate]').val());
        var endDate = new RMDate(this.$el.find('[name=endDate]').val());

        this.model.set({
            classID : this.$el.find('[name=classID]').val(),
            startDate : startDate.isEmpty() ? null : startDate.toStartOfDay(), // if RMDate is backbone-model use toStartOfDay().attributes
            endDate : endDate.isEmpty() ? null : endDate.toEndOfDay(),         // if RMDate is backbone-model use toEndOfDay().attributes
            grade : this.$el.find('[name=grade]').val(),
            material : this.$el.find('[name=material]').val(),
            isPrint : false,//this.$el.find('[name=isPrint]').val(), //todo доделать!!!!!
            localSortColumn : this.$el.find('[name=localSortColumn]').val(),
            localSortAsc : false,//this.$el.find('[name=localSortAsc]').val(), //todo доделать!!!!!
            lastNDays : this.$el.find('[name=lastNDays]').val(),
            lastSolvedProblemsNumber : this.$el.find('[name=lastSolvedProblemsNumber]').val()
        }).sendData({
            data:JSON.stringify([this.model]),
            success : function(data, textStatus, jqXHR){

                TestPrepReportResponseObj.set(data);
                //var coll = new TPStandardColl(data.tpStandards);

                //console.log( coll );
            }
        });
    }

});