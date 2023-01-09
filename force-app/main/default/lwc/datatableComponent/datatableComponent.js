import { LightningElement,track,wire } from 'lwc';
import getContactList from '@salesforce/apex/contactHelper.getContactList';
export default class DatatableComponent extends LightningElement {
@track columns=[{
    label: 'Account name',
            fieldName: 'Name',
            type: 'text',
            sortable: true
        },
        {
            label: 'Type',
            fieldName: 'Type',
            type: 'text',
            sortable: true
        },
        {
            label: 'Annual Revenue',
            fieldName: 'AnnualRevenue',
            type: 'Currency',
            sortable: true
        },
        {
            label: 'Phone',
            fieldName: 'Phone',
            type: 'phone',
            sortable: true
        },
        {
            label: 'Website',
            fieldName: 'Website',
            type: 'url',
            sortable: true
        },
        {
            label: 'Rating',
            fieldName: 'Rating',
            type: 'test',
            sortable: true
        }
]
@track acclist;
@track error;
@wire(getContactList)
wireaccount({error,data}){
    if(data){
        this.acclist=data;
    }
    else if(error){
       this.error=error; 
    }
}

}