import { LightningElement,api } from 'lwc';

export default class EditAccountRecordEditForm extends LightningElement {
    @api recordId;
    handleSubmit(event){
        console.log('onsubmit event..'+event.detail.fields);
    }
    handleSuccess(event){
        console.log('onsuccess event..'+event.detail.Id);
 
    }
}