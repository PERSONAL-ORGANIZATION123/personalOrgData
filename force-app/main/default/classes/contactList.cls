/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 01-05-2023
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class contactList {
    public contactList() {

    }
    
    @AuraEnabled(cacheable = true)
    public static List<Contact> getContactList(id recordId) {
        system.debug('inside contact method>>>>');
        system.debug('recordid check>>>>'+recordId);
        list<contact>conlist= [SELECT Id,Name, FirstName, LastName, Email, Phone from Contact where AccountId =:recordId];
        if(!conlist.isEmpty()){
            system.debug('conlist>>>>'+conlist);
            return conlist; 
        }
        else{
            system.debug('inside else>>>>'+conlist);
            return null;
        }
    }


         @AuraEnabled
         public static string insertaccount(List<Contact> acclist)
        {
           insert acclist;
           return 'hello';
   
        }
         @AuraEnabled
         public static string updateContact(list<contact> updateId)
         {
          System.debug('Contact record Id is this = '+updateId);
           list<contact>updatelist= [SELECT Id,Name, FirstName, LastName, Email, Phone from Contact where Id =:updateId];
           update updateId;
           return 'hii';
         }
}