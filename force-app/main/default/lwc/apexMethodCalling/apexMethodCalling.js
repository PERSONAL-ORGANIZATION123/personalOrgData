import { LightningElement,wire,track} from 'lwc';
import getContactList from '@salesforce/apex/contactHelper.getContactList';

export default class ApexMethodCalling extends LightningElement {
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