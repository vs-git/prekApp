/**
 * @class
 * */
var AuthForm = RM.Model.extend(

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
            loginName: String.value(''),
            /** @type {String} */
            password : String.value('') /*,

           * @type {String}
            passwordSrc: ''*/
        },

        /** @type {function():void} */
        initialize: function(){
            this.on("invalid", function(model, error){
                ErrOut.getHandler(/*{type:"page"}*/).fire(error);
            });
        },

        /** @type {function():String} */
        validate: function(attrs/*, options*/) {
            if (attrs.loginName == '') {
                return "loginName cannot be empty";
            }
            if (attrs.password == '') {
                return "password cannot be empty";
            }
        },

        /** @type {function():void} */
        successLogin : function(response){
            RM.user = new User();
            loginFromSession();
        }
    }
);