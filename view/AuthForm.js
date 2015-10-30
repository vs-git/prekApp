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
        var self = this;

        if( !this.model.set({
            loginName: this.$el.find('[name=loginName]').val(),
            password: this.$el.find('[name=password]').val()
        }, {validate:true})) {
            return;
        }
        this.model.set('password', md5(this.model.get('password')));

        //method, model, options
        this.model.sync('patch', this.model, {
            success : function(response, text, xhr){
                var resp = response[0]; // May be changed!!!

                if (0 == resp.code) {
                    self.model.successLogin(resp);
                } else {
                    ErrorOutputFactory.getHandler(/*{type:"page"}*/).fire("Incorrect login or password");
                }
            }
        });
/*
        this.model.save({
            loginName: this.$el.find('[name=loginName]').val(),
            password: md5(this.model.get('passwordSrc'))
        },{
            patch: true,
            success : function(model, response, options){
                var resp = response[0]; // May be changed!!!

                if (10001 == resp.code) {
                    ErrorOutputFactory.getHandler().fire("Incorrect login or password");
                } else {
                    model.successLogin(resp);
                }

            }
        });
*/
    }
});