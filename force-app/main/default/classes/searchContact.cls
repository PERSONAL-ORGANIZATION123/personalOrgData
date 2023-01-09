/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 01-06-2023
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class searchContact {
    public searchContact() {

    }
     @AuraEnabled(Cacheable = true)
     public static list<contact> searchContactRecords(string textKey){
        textKey ='%' + textkey + '%';
        list<contact>conlist=[select id,name,email,phone from contact where name='text'];
        if(!conlist.isEmpty()){
        return conlist;
        }
        else{
            throw new AuraHandledException('No Record Found..');
        }
    }
}