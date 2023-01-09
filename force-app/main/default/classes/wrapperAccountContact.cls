/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 01-09-2023
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class wrapperAccountContact {
     
    public static list<wrapperClass> getAccountContact(){
        list<wrapperClass>acconRecordList=new list<wrapperClass>();
        list<Account> accList=[SELECT Id, Name,Website, Phone,(SELECT Id, FirstName, LastName, Name, Email From Contacts)
        FROM Account];

        for(Account acc:accList){
            wrapperClass acconRecord=new wrapperClass(); 
            acconRecord.accRecord=acc;
            acconRecord.contactList=acc.Contacts;
            acconRecord.contactCount=acc.Contacts.size();
            acconRecordList.add(acconRecord);
        }
        return acconRecordList; 
    }


    public class wrapperClass{
        public account accRecord{get;set;}
        
        public list<contact>contactList{get;set;}

        public integer contactCount{get;set;}

    }
}