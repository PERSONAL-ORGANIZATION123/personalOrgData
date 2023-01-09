public class accconopp {
public account acc{get;set;}
public contact con{get;set;}
public customopportunity__c opp{get;set;}

public accconopp(){
acc=new account ();
con=new contact();
opp=new customopportunity__c();
}
public pagereference saveit(){
insert acc;
con.accountid=acc.id;
opp.Account_name__c=acc.id;
insert con;
insert opp;

pagereference pr=new pagereference('/'+acc.id);
return pr;
}
public pagereference cancel(){
return null;
}
}