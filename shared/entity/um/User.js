var User = RM.Model.extend({
    initialize: function(){
        Object.preventExtensions(this.attributes); // it works when initializing of the object is new User(response.data);
    }
});

/*public class User implements Serializable, Cloneable
{
    public final static int STANDARD = 0;
    public final static int EXPERIMENTAL = 1;
    public final static int BOTH = 2;

    public final static String G3_NO_NAME = "No name";

    protected long userID;
    protected String loginName;
    protected String md5hash;
    protected String firstName;
    protected String middleInitial;
    protected String lastName;
    protected String nickName;
    protected String prefix;
    protected String description;
    protected int roleId;
    protected boolean active = false;
    protected String timeZone = "America/Chicago";
    protected boolean isGuest = false;
    protected int system = STANDARD;
    private boolean staar = false;
    private boolean sbrc = false;
    private byte testContentCatalog = 0; //0 -nothing, 1 - staar, 2 - sbrc, 3 - both
    protected String idNumber;
    protected boolean debug;
    protected String email;
    protected boolean isDemo;
    //protected boolean disabled; check whether the user is disabled via field "active", see UMController.getUserBy(...)



    private boolean isRealClassesAccessiblele = false;
    private boolean sse = true;
    private boolean isIndividual = false;

    public User()
    {
    }
    */
/*
public boolean equals(Object obj)
{
    if (obj == this)
    {
            return true;
    }
    else if (!(obj instanceof User))
    {
        return false;
    }
    User data = (User) obj;
    return (userID == data.userID);
}



public String getFullName()
{
    StringBuilder s = new StringBuilder();
    if (roleId != Roles.STUDENT && prefix != null)
    {
        s.append(prefix);
    }
    if (firstName != null)
    {
        if (s.length() > 0)
        {
            s.append(" ");
        }
        s.append(firstName);
    }
    if (middleInitial != null)
    {
        if (s.length() > 0)
        {
            s.append(" ");
        }
        s.append(middleInitial);
    }
    if (lastName != null)
    {
        if (s.length() > 0)
        {
            s.append(" ");
        }
        s.append(lastName);
    }
    return s.toString();
}

public String toString()
{
    return "User{" +
        "ID=" + userID +
        ", login=" + loginName +
        ", roleId=" + roleId +
        ", active=" + active +
        ", timeZone=" + timeZone +
        ", isGuest=" + isGuest +
        ", system=" + system +
        ", staar=" + staar +
        ", sbrc=" + sbrc +
        ", debug=" + debug +
        ", access=" + isRealClassesAccessiblele +
        ", demo=" + isDemo +
        '}';
}
*/


// }