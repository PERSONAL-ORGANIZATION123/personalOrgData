// import { LightningElement,track } from 'lwc';
// import searchContactRecords  from '@salesforce/apex/searchContact.searchContactRecords';
// cols = [
//     {label:'Name', fieldName:'Name' , type:'text'} ,
//     {label:'Phone', fieldName:'Phone' , type:'Phone'} ,
//     {label:'Email', fieldName:'Email' , type:'Email'}
          
// ]
// export default class ContactSearch extends LightningElement {
//     @track searchValue;
//     @track accounts;

//     handleSearchKey(event){
//      searchValue=event.target.value;
//      }
//      searchMethod()
//      {
//         searchContactRecords({textKey:this.searchValue})
//         .then(result => {
//             this.accounts = result;
//        })
//          .catch( error=>{
//           this.accounts = null;
//        });

//       }
// }