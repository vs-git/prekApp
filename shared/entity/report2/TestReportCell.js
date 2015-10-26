var TestReportCell = RM.Model.extend({
    initialize: function(){
        //Object.preventExtensions(this.attributes); // it works when initializing of the object is new User(response.data);

       // console.log( this.attributes );
    },

    defaults : {

        /** @type {Number}*/
        solved : 0,

        /** @type {Number}*/
        given : 0,

        /** @type {Number}*/
        ratio : -1,

        /** @type {Number} -1 - unknown (hasn't yet been studied), 0 - diagnosed, 1 - passed, 2 - advanced  */
        status : -1,

        /** @type {Number} 0 - nothing, 1 - assigned, 2 - in progress */
        assigned : 0,

        /** @type {Number}*/
        objectiveID :0

    }
    /*
     ** @type {function():Number} *
     static get NOT_ASSIGNED() {
     return 0;
     }

     ** @type {function():Number} *
     static get ASSIGNED() {
     return 1;
     }

     ** @type {function():Number} *
     static get IN_PROGRESS() {
     return 2;
     }

     ** @type {function():Number} *
     static get UNKNOWN() {
     return -1;
     }

     /** @type {function():Number} *
     static get DIAGNOSED() {
     return 0;
     }

     ** @type {function():Number} *
     static get PASSED() {
     return 1;
     }

     ** @type {function():Number} *
     static get ADVANCED() {
     return 2;
     }
    */
});

/*
class TestReportCell {

    constructor() {

        ** @type {Number}*
        this.solved = 0;

        ** @type {Number}*
        this.given = 0;

        ** @type {Number}*
        this.ratio = -1;

        ** @type {Number} -1 - unknown (hasn't yet been studied), 0 - diagnosed, 1 - passed, 2 - advanced *
        this.status = -1;

        ** @type {Number}  0 - nothing, 1 - assigned, 2 - in progress *
        this.assigned = 0;

        ** @type {Number}*
        this.objectiveID = 0;

        Object.preventExtensions(this);
    }

    ** @type {function():Number} *
    static get NOT_ASSIGNED() {
        return 0;
    }

    ** @type {function():Number} *
    static get ASSIGNED() {
        return 1;
    }

    ** @type {function():Number} *
    static get IN_PROGRESS() {
        return 2;
    }

    ** @type {function():Number} *
    static get UNKNOWN() {
        return -1;
    }

    /** @type {function():Number} *
    static get DIAGNOSED() {
        return 0;
    }

    ** @type {function():Number} *
    static get PASSED() {
        return 1;
    }

    ** @type {function():Number} *
    static get ADVANCED() {
        return 2;
    }

}
*/
