@istest
public class testclass {
    public static testMethod void updateDescription(){
        list<account>acclist=new list<account>();
        for(integer i=0;i<20;i++){
            account a=new account(Name='Test Account'+i,Industry='Technology');
            acclist.add(a);
        }
        test.startTest();
            insert acclist;
        test.stopTest();
        
        list<account>inserted_acclist=[select id,name,Description from account where id in:acclist];
        for(account aa:inserted_acclist){
        system.assertEquals('Technology Account',aa.Description);
        }
    }
}