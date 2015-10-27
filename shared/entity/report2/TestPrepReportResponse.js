

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