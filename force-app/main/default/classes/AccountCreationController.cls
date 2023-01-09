public class AccountCreationController {
    public account actObj{get;set;}

    public AccountCreationController(){
        actObj=new account();
    }
    public pagereference saveAccountRec(){
        insert actObj;
        return new pagereference('/'+actObj);
    }
}