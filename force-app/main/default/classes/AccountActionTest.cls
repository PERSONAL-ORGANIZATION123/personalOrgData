@isTest
private class AccountActionTest {
    private static testMethod void testCreateContact(){
        account actObj=new account();
        actObj.Name='salesforceBook';
         actObj.Industry='engineering';
         actObj.Type='other';
        Test.startTest();
        insert actObj;
        Test.stopTest();
        contact conObj=[select id,name from contact where accountId=:actObj.Id];
        system.debug('contact list'+conObj);
        system.Assert(conObj.Id!=null);
    }
    private static testMethod void testCreateOpportunity(){
       account actObj=new account();
         actObj.Name='salesforceBook';
         actObj.Industry='engineering';
         actObj.Type='other';
        actObj.Rating='Hot';
        insert actObj;
        Test.startTest();
         actObj.Rating='warm';
        update actObj;
        Test.stopTest();
         opportunity oppObj=[select id,name from opportunity where accountId=:actObj.Id];
        system.Assert(oppObj.Id!=null);
    }
}