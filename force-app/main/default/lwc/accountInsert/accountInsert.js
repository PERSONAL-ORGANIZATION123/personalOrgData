import { LightningElement, track } from 'lwc';
import insertaccount from '@salesforce/apex/insertaccountRecord.insertaccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class AccountInsert extends LightningElement {
    @track accounts;
    @track error;
    accname;
    accsite;
    accphone;
    nameChangeVal(event){
        this.accname=event.target.value;
    }
    siteChangeVal(event){
        this.accsite=event.target.value;
    }
    phoneChangeVal(event){
        this.accphone=event.target.value;
    }


    insertAccountAction(){
        console.log('method called');
        var accAccount=[{'Name':this.accname, 'Site':this.accsite, 'Phone':this.accphone}];
        insertaccount({ acclist : accAccount })
        .then(result => {
            if(result=='hello'){
                eval("$A.get('e.force:refreshView').fire();");}
            console.log('after save--<<<' + result);
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
    }
}