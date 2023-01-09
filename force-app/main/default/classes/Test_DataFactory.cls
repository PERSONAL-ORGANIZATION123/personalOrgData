public class Test_DataFactory {
    public static account prepareAccount(boolean isinsert){
        account actObj=new account();
        actObj.Name='salesforceTechbook';
        actObj.Industry='engineering';
        actObj.Type='other';
        if(isinsert){
            insert actObj;
        }
        return actObj;
    }
}