@isTest
private class AccountCreationControllerTest {
    private static testMethod void testAccountCreation(){
        account accountObj=Test_DataFactory.prepareAccount(false);
            test.startTest();
        AccountCreationController actcreationControllerObj=new AccountCreationController();
        actcreationControllerObj.actObj=accountObj;
            actcreationControllerObj.saveAccountRec();
        test.stopTest();
        
        account actObj=[select id,name from account where name='salesforceTechbook'];
        system.Assert(actObj!=null);
    }
}