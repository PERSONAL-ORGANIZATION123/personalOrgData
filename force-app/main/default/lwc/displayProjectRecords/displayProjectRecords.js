import { LightningElement,wire,track } from 'lwc';
import getProjectList from '@salesforce/apex/GetPoject.getProjectList'
import getSearchRecord from '@salesforce/apex/GetPoject.searchProjectList'
import { NavigationMixin } from 'lightning/navigation';
export default class DisplayProjectRecords extends NavigationMixin(LightningElement) {

    SearchAccountName;
    accountList = [];
    initialRecords = [];
    isTableShow = false;
    value = '';
    isAsc = false;
    isDsc = false;
    error;
    sortedDirection = 'asc';
    sortedColumn;

    /* Pagination Variable */
    @track startingRecord = 1;
    @track pageSize = 5;
    @track pageNumber = 1;
    @track totalRecords = 0;
    @track totalPages = 0;
    @track recordEnd = 0;
    @track recordStart = 0;
    @track isPrev = true;
    @track isNext = true;
    @track items = []; 
    
    connectedCallback() {
        this.getAccounts();
    }   

    handleAccountName(event) {
        this.SearchAccountName = event.target.value;
    } 
 
    searchRecord(event) {
        this.SearchAccountName = event.target.value;
        getSearchRecord({
            SearchName: this.SearchAccountName
        })
            .then(response => {
                this.items = response;
                this.totalRecords = response.length; 
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize); 
                this.accountList = this.items.slice(0,this.pageSize); 
                this.endingRecord = this.pageSize;
                this.isTableShow = true;
            }).catch(error => {
                this.getAccounts();
        })
    }

     //get accounts
        getAccounts(){
            getProjectList({pageSize: this.pageSize, pageNumber : this.pageNumber})
            .then(result => {
                if(result){
                    var resultData = JSON.parse(result);
                    this.accountList = resultData.accounts;
                    this.pageNumber = resultData.pageNumber;
                    this.totalRecords = resultData.totalRecords;
                    this.recordStart = resultData.recordStart;
                    this.recordEnd = resultData.recordEnd;
                    this.totalPages = Math.ceil(resultData.totalRecords / this.pageSize);
                    this.isNext = (this.pageNumber == this.totalPages || this.totalPages == 0);
                    this.isPrev = (this.pageNumber == 1 || this.totalRecords < this.pageSize);
                }
            })
            .catch(error => {
                this.loader = false;
                this.error = error;
            });
        }
        
    //handle next
    handleNext() {
        if((this.pageNumber<this.totalPages) && this.pageNumber !== this.totalPages){
            this.pageNumber = this.pageNumber + 1; //increase page by 1
            this.displayRecordPerPage(this.pageNumber);   
            isPrev = false;
        }
    }

     //handle prev
    handlePrev() {
        if (this.pageNumber > 1) {
            this.pageNumber = this.pageNumber - 1; //decrease page by 1
            this.displayRecordPerPage(this.pageNumber);
        }
    }

    displayRecordPerPage(pageNumber){
        this.startingRecord = ((pageNumber - 1) * this.pageSize);
        this.recordEnd = (this.pageSize * pageNumber);
        this.recordEnd = (this.recordEnd > this.totalRecords) ? this.totalRecords : this.recordEnd; 
        this.accountList = this.items.slice(this.startingRecord, this.recordEnd);
        this.startingRecord = this.startingRecord + 1;
    }  

    sortName(event) {
        this.isNameSort = true;
        this.sortData(event.currentTarget.dataset.id);
    }

    sortData(sortColumnName) {
        if (this.sortedColumn === sortColumnName) {
            this.sortedDirection = this.sortedDirection === 'asc' ? 'desc' : 'asc';
        } 
        else {
            this.sortedDirection = 'asc';
        }

        if (this.sortedDirection === 'asc') {
            this.isAsc = true;
            this.isDsc = false;
        } 
        else {
            this.isAsc = false;
            this.isDsc = true;
        }

        let isReverse = this.sortedDirection === 'asc' ? 1 : -1;
        this.sortedColumn = sortColumnName;

        this.accountList = JSON.parse(JSON.stringify(this.accountList)).sort((a, b) => {
            a = a[sortColumnName] ? a[sortColumnName].toLowerCase() : ''; // Handle null values
            b = b[sortColumnName] ? b[sortColumnName].toLowerCase() : '';

            return a > b ? 1 * isReverse : -1 * isReverse;
        });;
    }

     navigateToRecordViewPage(event) {
        let rowId = event.target.dataset.recordId;
        console.log('RecordIdis->>>>>>' + rowId);

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                "recordId": rowId,
                "objectApiName": "Project__c",
                "actionName": "view"
            },
        });
        console.log('RecordIdis->>>>>>' + rowId);
    }
}