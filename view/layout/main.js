
var MainPageLayout = RM.View.extend({

    template: 'layout/main',

    render: function () {
        TplManager.get(this.template, function(template){

            $('body').html($($(template).html()));

            new UserOnlineView({model: new UserOnline});

            (new AuthFormView({model: new AuthForm})).render();

        });
        return this;
    }
});