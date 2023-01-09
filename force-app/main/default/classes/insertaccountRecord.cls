public with sharing class insertaccountRecord {
    @AuraEnabled
    public static String insertaccount(list<account>acclist){
        System.debug('Account record is this = ' + acclist);
        insert acclist;
        return 'Hello Ajinkya Bhau';
    }
}