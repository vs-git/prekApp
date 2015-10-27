
var TestPrepAssignment = RM.Model.extend({

    defaults : {
        /** @type {Number}*/
        assignmentType : Number.value(null),

        /** @type {Number}*/
        assignmentID : Number.value(null),

        /**
         * @type {Number} only for smarter solving lessons assignment type: CurriculumTypes.SBRC */
        remainedLessons : Number.value(null)
    }
});
