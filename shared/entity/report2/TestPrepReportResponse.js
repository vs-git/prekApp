var TestReportCell = {};
TestReportCell.NOT_ASSIGNED  = 0;
TestReportCell.ASSIGNED = 1;
TestReportCell.IN_PROGRESS = 2;
TestReportCell.UNKNOWN = -1;
TestReportCell.DIAGNOSED = 0;
TestReportCell.PASSED = 1;
TestReportCell.ADVANCED = 2;

TestReportCell = RM.Model.extend({
    initialize: function(){
        //Object.preventExtensions(this.attributes); // it works when initializing of the object is new User(response.data);

        // console.log( this.attributes );
    },

    defaults : {

        /** @type {Number}*/
        solved : Number.value(0),

        /** @type {Number}*/
        given : Number.value(0),

        /** @type {Number}*/
        ratio : Number.value(-1),

        /** @type {Number} -1 - unknown (hasn't yet been studied), 0 - diagnosed, 1 - passed, 2 - advanced  */
        status : Number.value(-1),

        /** @type {Number} 0 - nothing, 1 - assigned, 2 - in progress */
        assigned : Number.value(0),

        /** @type {Number}*/
        objectiveID : Number.value(0)

    }
}, TestReportCell);

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

var TestPrepReportResponse = RM.Model.extend({
    initialize: function(){
        //Object.preventExtensions(this.attributes); // it works when initializing of the object is new User(response.data);
        //console.log( this.attributes.tpStandards);

       // console.log( this.attributes.tpStandards.first() instanceof TPStandard);
        console.log("instanceof TestReportCell");
        console.log( this.attributes.students.first().cells.first() instanceof TestReportCell);
    },

    defaults : {

        /** @type {Array} List<TestReportStudent>*/
        students : TestReportStudent.Collection,

        /** @type {Array} number[]*/
        total : Number.Collection,

        /** @type {Number}*/
        reportID : -1,

        /** @type {Map} Map<Integer, String> */
        categories : Object,

        /** @type {Array} List<TPStandard> */
        tpStandards : TPStandard.Collection

    }
});

/*
class TestPrepReportResponse {

    constructor() {

        ** @type {Array} List<TestReportStudent>*
        this.students = [];

        ** @type {Array} number[]*
        this.total = [];

        ** @type {Number}*
        this.reportID = -1;

        ** @type {Map} Map<Integer, String> *
        this.categories = new Map();

        ** @type {Array} List<TPStandard> *
        this.tpStandards = [];

        Object.preventExtensions(this);
    }
}*/
/*
 List<TestReportStudent> students = new ArrayList<TestReportStudent>();
 float[] total = new float[0];
 private long reportID = -1;

 private Map<Integer, String> categories = new LinkedHashMap<Integer, String>();
 private List<TPStandard> tpStandards = new ArrayList<TPStandard>();

 */