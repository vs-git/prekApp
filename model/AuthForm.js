/**
 * @class
 * */
var AuthForm = RM.Model.extend(
    /** @lends RM.Model */
    {
        /** @type {function():String} */
        url : function(){
            return '/um/loginHTTP'; //servisename  - only lower case!!!!!
        },

        /** @type {function():boolean} */
        isNew : function () {
            return false; //false, otherwise we cannot send a partial data to server
        },

        /** @type {Object} */
        defaults: {
            /** @type {String} */
            loginName: '',
            /** @type {String} */
            password : '',

            /** @type {String} */
            passwordSrc: ''
        },

        /** @type {function():void} */
        initialize: function(){
            this.on("invalid", function(model, error){
                ErrorOutputFactory.getHandler(/*{type:"page"}*/).fire(error);
            });
        },

        /** @type {function():String} */
        validate: function(attrs/*, options*/) {
            if (attrs.loginName == '') {
                return "loginName cannot be empty";
            }
            if (attrs.passwordSrc == '') {
                return "password cannot be empty";
            }
        },

        /** @type {function():void} */
        successLogin : function(response){
            RM.user = new User(response.data);
            //(new AdultLayout).render();

            $.ajax({
                method : "post",
                url : RM.urlPrefix + "/um/loginFromSessionHTTP",
                //data : [],
                async : false,
                cache : false,
                success: function (data, textStatus) {
                    console.log( textStatus );

                    if (data !== "")
                        (new AdultLayout).render();
                    else
                        (new MainPageLayout).render();
                },
                error : function(){
                    console.log( "loginFromSessionHTTP ERROR!!!" );
                    (new MainPageLayout).render();
                }
            })
        }
    }
);