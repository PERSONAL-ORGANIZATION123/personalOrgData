import { LightningElement } from 'lwc';

export default class AugHello extends LightningElement {
    first;
    second;
    contactChanzeVal(event){
        this.first=event.target.value;
        console.log(' this.first--->>>'+ this.first);
    }
        contactValue(event){
            this.second=event.target.value;
            console.log('this.second--->>>'+this.second);
        }
        
        
      
}