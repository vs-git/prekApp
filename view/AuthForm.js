var AuthFormView = RM.View.extend({

    template: 'authForm',

    el: "#authForm",

    render: function () {
        var self = this;
        this.TplManager.get(this.template, function(template){
            var tpl = _.template($(template).html());
            self.$el.html(tpl(self.model.toJSON()));
        });
        return this;
    },
    events : {
        "click button" : "buttonListener"
    },
    buttonListener : function(){
        this.model.set({
            passwordSrc: this.$el.find('[name=password]').val()
        });

        this.model.save({
            loginName: this.$el.find('[name=loginName]').val(),
            password: md5(this.model.get('passwordSrc'))
        },{
            patch: true,
            success : function(model, response/*, options*/){
                var resp = response[0]; // May be changed!!!

                if (10001 == resp.code) {
                    ErrorOutputFactory.getHandler(/*{type:"page"}*/).fire("Incorrect login or password");
                } else {
                    model.successLogin(resp);
                }

            }
        });

    }
});