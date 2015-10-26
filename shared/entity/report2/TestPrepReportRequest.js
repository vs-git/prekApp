var TestPrepReportRequest = RM.Model.extend({

    url : function(){
        return '/report/buildTestPrepReport'; //servisename  - only lower case!!!!!
    },

    defaults : {
        /** @type {Number}*/
        classID : 30442, // get this from RM.user ???

        /** @type {RMDate}*/
        startDate : null,

        /** @type {RMDate}*/
        endDate : null,

        /** @type {Number}*/
        grade : 4,

        /** @type {Number}*/
        material : 0,

        /** @type {Boolean}*/
        isPrint : false,

        /** @type {Number}*/
        localSortColumn : 0,

        /** @type {Boolean}*/
        localSortAsc : false,

        /** @type {Number}*/
        lastNDays : 7,

        /** @type {Number}*/
        lastSolvedProblemsNumber : 0
    }
});