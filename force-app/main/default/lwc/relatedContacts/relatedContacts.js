import { LightningElement,track,api,wire } from 'lwc';
import getContactList from '@salesforce/apex/contactList.getContactList';
 import insertaccount from '@salesforce/apex/contactList.insertaccount';
import updateContact from '@salesforce/apex/contactList.updateContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 import { NavigationMixin } from 'lightning/navigation'; 
// import Id from '@salesforce/schema/Account.Id';
// import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';
export default class RelatedContacts extends NavigationMixin(LightningElement) {
    @api recordId;
    // @api recId;
    // @track recId; 
    @track accounts;
    @track error; 
     message;
    @track myMap = [];
     conName;
     conLastName;
     conEmail;
      isModalOpenContact = false;
    @track contactId;

    columns = [
        {
            label: 'First Name',
            fieldName: 'FirstName'
        },
        {
            label: 'Last Name',
            fieldName: 'LastName'
        },
        {
            label: 'Phone',
            fieldName: 'Phone',
            type: 'phone',
            sortable: true
        },
        {
            label: 'Email',
            fieldName: 'Email',
            type: 'email',
            sortable: true
        },
        { 
            type: "button", 
            typeAttributes: {  
                label: 'View',  
                name: 'View',  
                title: 'View',  
                disabled: false,  
                value: 'view',  
                iconPosition: 'left'  
            }
        },  
        { 
            type: "button", 
            typeAttributes: {  
                label: 'Edit',  
                name: 'Edit',  
                title: 'Edit',  
                disabled: false,  
                value: 'edit',  
                iconPosition: 'left'  
            }
        }  
    ];

    @wire(getContactList,{recordId:'$recordId'})
    wiredAccounts({data, error}){

        console.log('Inside null result',JSON.stringify(data));

        if(data){
            console.log('show data>>>'+data);
            this.accounts = data;
        }
        else{
            console.log('Inside null result');
            this.message = 'No Contact Record Found';
            console.log('this.message---->>'+this.message)
        }
    } 
    
    // nameChangeVal(event){
    //     this.conName = event.target.value;
       
    // }
    
    // lastNameChangeVal(event){
    //     this.conLastName = event.target.value;
       
    // }
    // emailChangeVal(event){
    //     this.conEmail = event.target.value;
    // }
    
   
    
    @track isModalOpen = false;
    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }
    
    submitDetails() {
        console.log('method called');
        var accAccount=[{'FirstName':this.conName,'LastName': this.conLastName,'Email':this.conEmail,'AccountId':this.recordId}];
        insertaccount({ acclist :  accAccount })
        .then(result => {
            console.log('after save--<<<' + result);
            if (result=='hello') {
                console.log('checkreult>>>'+result);
                //eval("$A.get('e.force:refreshView').fire();");
                window.location.reload();
            }
            
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact Record Created successfully',
                    variant: 'success'
                    
                })
            );
            console.log('show toast event dispatched successfully');
        })
        .catch(error => {
            console.log('error=<' + JSON.stringify(error));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
        this.isModalOpen = false;
    }
     
    // navigateToViewAccountPage(event) {
    //     this.record = event.detail.row;
    //     console.log('>>>>id'+this.record)
    //     this[NavigationMixin.Navigate]({
    //         type: 'standard__recordPage',
    //         attributes: {
    //             recordId: this.record,
    //             objectApiName: 'Contact',
    //             actionName: 'view'
    //         },
    //     });
    // }

    // @track isModalOpenContact = false;
    // openContact(event) {
    //     // to open modal set isModalOpen tarck value as true
    //    // this.isModalOpenContact = true;
    //     this.record = event.detail.row;
    // }

    closeContact() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpenContact = false;
    }

    submitContact() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        //console.log('submitcontactid>>>>='+ this.contactId);
        var accContact= [{'FirstName':this.conName,'LastName':this.conLastName ,'Email':this.conEmail,'Id':this.contactId}];
       console.log('cobID----:',this.contactId)
        updateContact({ updateId :accContact })
        .then(result => {
            console.log('after update--<<<' + result);
            if (result=='hii') {
                console.log('checkreult>>>'+result);
                console.log('submitcontactid>>>>='+ this.contactId);
                // window.location.reload();
            }
            
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact Record Updated successfully',
                    variant: 'success'
                    
                })
            );
            console.log(' updated show toast event dispatched successfully');
        })
        .catch(error => {
            console.log('error=<' + JSON.stringify(error));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
        this.isModalOpenContact = false;
    }

    
    callRowAction( event ) {  
            
        const recId =  event.detail.row.Id;  
        const actionName = event.detail.action.name;  
        if ( actionName === 'Edit' ) {  
            this.isModalOpenContact = true;
            console.log('idcheck>>>>>='+recId);
            this.contactId = recId;
        } else if ( actionName === 'View') {  
            this.isModalOpenContact = false;

            this[NavigationMixin.Navigate]({  
                type: 'standard__recordPage',  
                attributes: {  
                    recordId: recId,  
                    objectApiName: 'Contact',  
                    actionName: 'view'  
                }  
            })  
        }          
    }  

    

    // @wire(getAccounts) wiredAccounts ({ error, data }) {
    //     if (data) {
    //         this.lstaccounts = data; 
    //    } else if (error) { 
    //        this.error = error;  
    //   }   }
        //if (error) {
    //         console.log(error);
    //         this.error = error;
    //     }
    //     handleSubmit(event) {
    //         console.log('onsubmit event recordEditForm'+ event.detail.fields);
    //     }
    //     handleSuccess(event) {
    //         console.log('onsuccess event recordEditForm', event.detail.id);
    //     }
}