/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 12-26-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class contactHelper {
    public contactHelper() {


    }
    @AuraEnabled(cacheable=true) 
    public static list<account> getContactList(){
        
        return[SELECT Id, Name, Type, Rating,
        Phone, Website, AnnualRevenue
    FROM Account];


   


    }
}