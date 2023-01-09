public with sharing class GetPoject {
    
    @AuraEnabled//Get Account Records
    public static String getProjectList(Integer pageSize, Integer pageNumber){
        String jsonDT = '';
        Integer offset = (pageNumber - 1) * pageSize;
        Integer totalRecords = [SELECT COUNT() FROM Account];
        Integer recordEnd = pageSize * pageNumber;
        
        AccountDTWrapper objDT =  new AccountDTWrapper();  
        objDT.pageSize = pageSize;
        objDT.pageNumber = pageNumber;
        objDT.recordStart = offset + 1;
        objDT.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        objDT.totalRecords = totalRecords;
        objDT.accounts = [Select id,Name,Designation__c,Date_Of_Loss__c,Source_Reason_of_Loss__c,
                          Sale_Category__c,Loss_Type__c FROM Project__c LIMIT :pageSize OFFSET :offset];
        jsonDT = JSON.serialize(objDT);
        System.debug('jsonDT  ----' + jsonDT);
        return jsonDT;
    }
    
    @AuraEnabled
    public static List<Project__c> searchProjectList(String SearchName){
        String query;
        System.debug('condition' + SearchName);
        String condition = (String.isNotBlank(SearchName)
                            ? 'Designation__c LIKE\''  + SearchName + '%\''
                            : '');
        System.debug('condition ------------' + condition);
        /* condition += (String.isNotBlank(SearchName)
? 'Name LIKE\''  + SearchName + '%\''
: ''); */
        
        /* Date dateValue = Date.valueOf(SearchDate);
if(dateValue != null){
if(SearchName != null || SearchIndustry != null){
condition += 'AND MukeshD__SLAExpirationDate__c = ' +SearchDate;
}else{
condition += ' MukeshD__SLAExpirationDate__c = ' +SearchDate;
}   
}  */ 
        if (String.isNotBlank(condition)) {
            query = 'SELECT id,Name,Designation__c,Date_Of_Loss__c,Source_Reason_of_Loss__c,Sale_Category__c,Loss_Type__c FROM Project__c WHERE ' + condition;
        } 
        List<Project__c> lstAccount = new List<Project__c>();
        List<Project__c> lstStoreAccount = new List<Project__c>();
        lstAccount = Database.query(query);
        return lstAccount;     
    } 
    
    public class AccountDTWrapper {
        public Integer pageSize {get;set;}
        public Integer pageNumber {get;set;}
        public Integer totalRecords {get;set;}
        public Integer recordStart {get;set;}
        public Integer recordEnd {get;set;}
        public String strAccount {get;set;}
        public List<Project__c> accounts {get;set;}
    }
    
    @AuraEnabled
    public static string insertprojectrecord(List<Project__c> createProjectList){
        system.debug('createProjectList--1--->>>>'+createProjectList);
        if(createProjectList.size() > 0 && !createProjectList.isEmpty()){
            insert createProjectList;
            system.debug('createProjectList--->>>>'+createProjectList);
        }
        return createProjectList[0].id;
    }
    @AuraEnabled
    public static string insertContctRecord(List<Contact> createClientList){
        system.debug('createClientList--1--->>>>'+createClientList);
        if(createClientList.size() > 0 && !createClientList.isEmpty()){
            insert createClientList;
            system.debug('createClientList--->>>>'+createClientList);
        }
 return createClientList[0].id;
    }
     @AuraEnabled
    public static string insertInsuranceRecord(List<Insurance__c> insuranceRec){
        system.debug('insuranceRec----->>>>'+insuranceRec);
        if(insuranceRec.size() > 0 && !insuranceRec.isEmpty()){
            insert insuranceRec;
            system.debug('insuranceRec--->>>>'+insuranceRec);
        }
 return insuranceRec[0].id;
    }
}