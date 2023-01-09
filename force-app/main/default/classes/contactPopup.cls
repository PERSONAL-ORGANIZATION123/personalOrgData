/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 12-26-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class contactPopup {
    public contactPopup() {

    }
    @AuraEnabled(cacheable=true) 
    public static list<contact> getContactList(){
        
        return[SELECT Id, Name FROM contact];
}
}