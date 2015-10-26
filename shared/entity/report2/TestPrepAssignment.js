
var TestPrepAssignment = RM.Model.extend({

    defaults : {
        /** @type {Number}*/
        assignmentType : null,

        /** @type {Number}*/
        assignmentID : null,

        /**
         * @type {Number} only for smarter solving lessons assignment type: CurriculumTypes.SBRC */
        remainedLessons : null
    }
});
