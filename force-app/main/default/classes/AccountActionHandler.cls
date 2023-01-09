public class AccountActionHandler {
    public static void createContact(list<account>accountList){
       list<contact>contactList=new list<contact>();
        for(account actObj:accountList){
            contact contactObj=new contact();
            contactObj.AccountId=actObj.id;
            contactObj.LastName=actObj.name;
            contactList.add(contactObj);
        }
        if(!contactList.isempty()){
            insert contactList; 
        }
    }
    public static void createOpportunity(map<id,account>newAccountMap,map<id,account>oldAccountMap){
        list<opportunity>opportunityList=new list<opportunity>();
        for(account actObj:newAccountMap.values()){
            if(newAccountMap.get(actObj.id).Rating != oldAccountMap.get(actObj.id).Rating && newAccountMap.get(actObj.id).Rating=='warm'){
                opportunity opportunityObj=new opportunity();
                opportunityObj.AccountId=actObj.id;
                opportunityObj.Name=actObj.Name;
                opportunityObj.StageName='prospecting';
                opportunityObj.CloseDate=system.today();
                opportunityList.add(opportunityObj);
            }
            if(!opportunityList.isempty()){
                insert opportunityList;
            }
        }
    }
    
}