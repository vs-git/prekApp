class RMDate {

    constructor() {  // 2 ways: 1 argument with string as Date (2015-10-09) or at least 3 arguments for correct date

        /** @type {Number} */
        let ms;
        /** @type {Date} */
        let date;

        if (arguments.length == 1) { //string as Date
            if (ms = Date.parse(arguments[0])) {
                date = new Date(ms);

                this.year   = date.getUTCFullYear();
                this.month  = date.getUTCMonth();
                this.day    = date.getUTCDate();
                this.hour   = date.getUTCHours();
                this.minute = date.getUTCMinutes();
            }
        }

        if (typeof date == 'undefined') { // year, month, day, hour, minute
            this.year   = arguments[0] || 0;
            this.month  = arguments[1] || 0;
            this.day    = arguments[2] || 0;
            this.hour   = arguments[3] || 0;
            this.minute = arguments[4] || 0;
        }
        Object.preventExtensions(this);
    }

    /** @type {function():boolean} */
    isEmpty() {
        for (var prop in this) {
            if(this[prop] !== null) { // in ES6 hasOwnProperty is not necessary
                return false;
            }
        }
        return true;
    }

    /** @type {function():this} */
    toStartOfDay() {
        this.hour = 0;
        this.minute = 0;
        return this;
    }

    /** @type {function():this} */
    toEndOfDay() {
        this.hour = 23;
        this.minute = 59;
        return this;
    }
}
/*
var RMDate = function(stringDate) {

    this.year = null;
    this.month = null;
    this.day = null;
    this.hour = null;
    this.minute = null;

    var ms, date;
    if (ms = Date.parse(stringDate)) {
        date = new Date(ms);
        this.year = date.getUTCFullYear();
        this.month = date.getUTCMonth();
        this.day = date.getUTCDate();
        this.hour = date.getUTCHours();
        this.minute= date.getUTCMinutes();
    }

    Object.preventExtensions(this);
};
RMDate.prototype.isEmpty = function(){
    for (var prop in this) {
        if(this.hasOwnProperty(prop) && this[prop] !== null) {
            return false;
        }
    }
    return true;
};
RMDate.prototype.toStartOfDay = function(){
    this.hour = 0;
    this.minute = 0;
    return this;
};
RMDate.prototype.toEndOfDay = function(){
    this.hour = 23;
    this.minute = 59;
    return this;
};
*/
/*
var RMDate = RM.Model.extend({
    initialize: function(){
        if (this.get('stringDate') != null) {
            var ms = Date.parse(this.get('stringDate'));
            if (ms){
                var date = new Date(ms);
                this.set({
                    year : date.getUTCFullYear(),
                    month : date.getUTCMonth(),
                    day : date.getUTCDate(),
                    hour : date.getUTCHours(),
                    minute : date.getUTCMinutes()
                });
            }
        }
        this.unset('stringDate');
        Object.preventExtensions(this.attributes);
    },
    defaults : {
        stringDate : null, // field only for initialization from date as string which can be parsed to correct date
        year : 0,
        month : 0,
        day : 0,
        hour : 0,
        minute : 0
    },
    isEmpty : function() {
        for (var prop in this.attributes) {
            if(this.attributes.hasOwnProperty(prop) && this.attributes[prop] !== 0) {
                return false;
            }
        }
        return true;
    },
    toStartOfDay : function(){
        this.set({
            hour : 0,
            minute : 0
        });
        return this;
    },
    toEndOfDay : function(){
        this.set({
            hour : 23,
            minute : 59
        });
        return this;
    }
});
*/