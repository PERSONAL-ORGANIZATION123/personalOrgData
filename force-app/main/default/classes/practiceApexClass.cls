/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 01-04-2023
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class practiceApexClass {
    public practiceApexClass() {

    }
    @AuraEnabled( cacheable = true )  
    public static List< Account > fetchAccounts( String searchKey ) {  
        
        String strKey = '%' + searchKey + '%';  
        return [ 
            SELECT Id, Name, Industry 
            FROM Account 
            WHERE Name LIKE: strKey LIMIT 10 
        ];  
            
    }  
}