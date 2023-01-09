import { LightningElement,track,wire } from 'lwc';
import getContactList from '@salesforce/apex/contactPopup.getContactList';
export default class ModalPopupComponent extends LightningElement {
    @track isModalOpen = false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }  
    @track accounts;
@track error;
    handleLoad(){
        getContactList()
        .then (result =>{
            this.accounts=result;
    
        })
        .catch(error =>{
           this.error=error; 
        });
    }
}