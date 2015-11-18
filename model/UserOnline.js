var UserOnline = RM.Model.extend({

    /** @type {function():String} */
    url : function(){
        return '/systemservice/getPopulation'; //servisename  - only lower case!!!!!
    },

    initialize: function(){
        //Object.preventExtensions(this.attributes);
        //RM.Model.prototype.initialize.apply(this, []);
        this.fetch();
    },

    defaults: {
        left: '',
        right : ''
    }
});