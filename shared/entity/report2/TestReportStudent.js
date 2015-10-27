
var TestReportStudent = RM.Model.extend({

    defaults : {
        /** @type {String}*/
        firstName : String.value(null),

        /** @type {String}*/
        lastName : String.value(null),

        /** @type {Number}*/
        studentID : Number.value(null),

        /** @type {Array} List<TestReportCell> */
        cells : TestReportCell.Collection,

        /** @type {Number} */
        cmgAsnmtID : Number.value(null),

        /** @type {Number}*/
        testAsnmtID : Number.value(null),

        /** @type {Number}*/
        testPrepAsnmID : Number.value(null),

        /** @type {Array} List<TestPrepAssignment>*/
        amts : TestPrepAssignment.Collection

    }
});
/*
class TestReportStudent {

    constructor() {

        this.firstName = String.value(null);

        this.lastName = String.value(null);

        this.studentID = Number.value(null);

        this.cells = TestReportCell.Collection;


        this.cmgAsnmtID = Number.value(null);

        this.testAsnmtID = Number.value(null);

        this.testPrepAsnmID = Number.value(null);

        this.amts = TestPrepAssignment.Collection;

        //Object.preventExtensions(this);
    }
}*/
