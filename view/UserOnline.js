var UserOnlineView = RM.View.extend({

    initialize: function() {
        this.model.on('change', this.render, this);
    },

    template: 'userOnline',

    el: '#userOnline',

    render: function () {
        var self = this;
        TplManager.get(this.template, function(template){
            var tpl = _.template($(template).html());
            self.$el.html(tpl(self.model.toJSON()));
        });
        return this;
    }

});