import { LightningElement } from 'lwc';

export default class ContactInsertLwc extends LightningElement {
    firstNameVal;
    lastNameVal;
    phoneVal;
    emailVal;

    handleFirstName(event){
        this.firstNameVal=event.target.value;
    }
    handleLastName(event){
        this.lastNameVal=event.target.value;
    }
    handlePhone(event){
        this.phoneVal=event.target.value;
    }
    handleEmail(event){
        this.emailVal=event.target.value;
    }
    handleClick(){
        createContact({ con : this.rec })
        .then(result => {
            this.message = result;
            this.error = undefined;
            if(this.message !== undefined) {
                this.firstNameVal = '';
                this.lastNameVal = '';
                this.phoneVal = '';
                this.emailVal = '';
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success',
                    }),
                    );
                }
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
        }
        
    }