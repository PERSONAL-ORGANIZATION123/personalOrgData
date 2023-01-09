import { LightningElement, track, wire, api } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import logoCleanClaims from '@salesforce/resourceUrl/CleanClaimsLogo';
import PROJECT_OBJECT from '@salesforce/schema/Project__c';
import DESIGNATION_FIELD from '@salesforce/schema/Project__c.Designation__c';
import LOSSTYPE_FIELD from '@salesforce/schema/Project__c.Loss_Type__c';
import SALECATEGORY_FIELD from '@salesforce/schema/Project__c.Sale_Category__c';
import CLASS_FIELD from '@salesforce/schema/Project__c.Class__c';
import CATEGORY_FIELD from '@salesforce/schema/Project__c.Category__c';
import STATE_FIELD from '@salesforce/schema/Project__c.State__c';
import SOURCE_FIELD from '@salesforce/schema/Project__c.Source_Reason_of_Loss__c';
import ContractCleanClaims from '@salesforce/label/c.ContractCleanClaims';
import ContractDescription from '@salesforce/label/c.Contract_Description';
import TermsAndCondition1 from '@salesforce/label/c.TERMSANDCONDITION1';
import TermsAndCondition2 from '@salesforce/label/c.TERMSANDCONDITION2';
import HealthSurvey from '@salesforce/label/c.Health_Survey';
import ContentsMovingProperty from '@salesforce/label/c.Contents_Moving_Property';
import ContentsMovingContract from '@salesforce/label/c.Contents_Moving_Contract';
import ContentsMovingServices from '@salesforce/label/c.Contents_Moving_Services';
import DirectPayAuthorization from '@salesforce/label/c.Direct_Pay_Authorization';
import DirectPayAuthorization2 from '@salesforce/label/c.Direct_Pay_Authorization2';
import Customerauthorizes from '@salesforce/label/c.Customer_authorizes';
import WarningMessage from '@salesforce/label/c.Warning_Message';
import insertprojectrecord from '@salesforce/apex/GetPoject.insertprojectrecord';
import insertContctRecord from '@salesforce/apex/GetPoject.insertContctRecord';
import insertInsuranceRecord from '@salesforce/apex/GetPoject.insertInsuranceRecord';
export default class CleanClaimHomeCmp extends LightningElement {

    lossTypMessage;
    contacts = [];
    lable = {
        ContractCleanClaims,
        ContractDescription,
        TermsAndCondition1,
        TermsAndCondition2,
        HealthSurvey,
        ContentsMovingContract,
        ContentsMovingProperty,
        ContentsMovingServices,
        DirectPayAuthorization,
        DirectPayAuthorization2,
        Customerauthorizes,
        WarningMessage
    };
    @track projectRecordId = '';
    @track isModalOpen = false;
    @track insuranceSelect = false;
    @track outOfPocketvalueSelected = false;
    @track equipmentRentalvalueSelected = false;
    @track warrantyvalueSelected = false;
    @track defaultInsurancetab = true;

    @track checkclientvalue = false;
    @track checkrentervalue = false;
    @track checkpropertyManagervalue = false;
    @track checkotherClientvalue = false;

    @track isMarkandCompletelockModalOpen = false;
    MarkandCompletelockopenModal() {
        this.isMarkandCompletelockModalOpen = true;
    }
    MarkandCompletelockcloseModal() {
        this.isMarkandCompletelockModalOpen = false;
    }
    handaleContactfieldsreset() {
        this.template.querySelector('form').reset();
    }
    MarkandCompletelocksubmitDetails() {
        this.isMarkandCompletelockModalOpen = false;

        var createProjectRecord = [{
            'Designation__c': this.designation,
            'Loss_Type__c': this.losstype,
            'Sale_Category__c': this.saleCategory,
            'Class__c': this.class,
            'Category__c': this.category,
            'Street_Address__c': this.streetAddress,
            'City__c': this.city,
            'State__c': this.state,
            'Zip__c': this.zip,
            'Client_Contacted__c': this.clientcontacted,
            'Year_Of_Structure__c': this.yearofstructure,
            'Date_Of_Loss__c': this.dateofloss,
            'Source_Reason_of_Loss__c': this.sourceReasonofLoss,
            'Affected_Areas__c': this.affectedAreas,
            'Site_Inspected__c': this.siteInspected
        }];
        console.log('Inside insertprojectrecord');
        insertprojectrecord({
            createProjectList: createProjectRecord
        })
            .then(result => {
                this.projectRecordId = result;
                console.log('after save-->>>' + this.projectRecordId);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Project Record Created successfully',
                        variant: 'success'
                    })
                );
                this.handaleContactfieldsreset();
                console.log('inside reset')
            })
            .catch(error => {
                console.log('error=>' + JSON.stringify(error));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });

    }
    handledefaultInsurancetab() {
        this.isMarkandCompletelockModalOpen = true;
    }
    handaleEstimateSave() {
        this.isMarkandCompletelockModalOpen = true;
    }
    handaleEquipmentRentalSave() {
        this.isMarkandCompletelockModalOpen = true;
    }
    handaleWarrantySave() {
        this.isMarkandCompletelockModalOpen = true;
    }
    //-------------Contact tab------------------------//
    //-----------------------Add Client Start -------------------------------//
    firstName;
    middleInitial;
    lastName;
    email;
    cell;
    phone;
    directPayAuth = false;
    contract = false;
    certiofComple = false;
    healthSurvey = false;
    containtMovingContract = false;

    @track firstNameValueNull = false;
    @track lastNameValueNull = false;
    @track emailValueNull = false;
    @track cellValueNull = false;
    @track phoneValueNull = false;

    keyIndex = 0;
    @track itemList = [];
    deleterow = false;

    addRow() {
        ++this.keyIndex;
        var newItem = [{ id: this.keyIndex }];
        this.itemList = this.itemList.concat(newItem);
        this.checkclientvalue = true;
        console.log('this.checkclientvalue = true-->>' + JSON.stringify(this.itemList));
    }
    removeRow(event) {
        if (this.itemList.length >= 0) {
            this.itemList = this.itemList.filter(function (element) {
                console.log('element id--' + element.id);
                return parseInt(element.id) !== parseInt(event.target.accessKey);
            });
            this.checkclientvalue = true;
            console.log('this.checkclientvalue = false');
        }
    }
    handleFirstNameChange(event) {
        this.firstName = event.target.value;
        console.log('this.firstName--->>>' + this.firstName);
        this.firstNameValueNull = false;
    }
    handleMiddleInitialChange(event) {
        this.middleInitial = event.target.value;
        console.log('this.middleInitial--->>>' + this.middleInitial);
    }
    handleLastNameChange(event) {
        this.lastName = event.target.value;
        console.log('this.lastName--->>>' + this.lastName);
        this.lastNameValueNull = false;
    }
    handleEmailChange(event) {
        this.email = event.target.value;
        console.log('this.email--->>>' + this.email);
        this.emailValueNull = false;
    }
    handleCellChange(event) {
        this.cell = event.target.value;
        console.log('this.cell--->>>' + this.cell);
        this.cellValueNull = false;
    }
    handlePhoneChange(event) {
        this.phone = event.target.value;
        console.log('this.phone--->>>' + this.phone);
        this.phoneValueNull = false;
    }
    handlePayAuthChange(event) {
        this.directPayAuth = event.target.checked;
        console.log('this.directPayAuth--->>>' + this.directPayAuth);
    }
    handleContractChange(event) {
        this.contract = event.target.checked;
        console.log('this.contract--->>>' + this.contract);
    }
    handleCertiofCompleChange(event) {
        this.certiofComple = event.target.checked;
        console.log('this.certiofComple--->>>' + this.certiofComple);
    }
    handleHealthSurveyChange(event) {
        this.healthSurvey = event.target.checked;
        console.log('this.healthSurvey--->>>' + this.healthSurvey);
    }
    handleContaintMovingContractChange(event) {
        this.containtMovingContract = event.target.checked;
        console.log('this.containtMovingContract--->>>' + this.containtMovingContract);
    }
    //-----------------------Add Client End -------------------------------//

    //-----------------------Add Renter Start -------------------------------//
    renterfirstName;
    rentermiddleInitial;
    renterlastName;
    renteremail;
    rentercell;
    renterphone;
    renterdirectPayAuth = false;
    rentercontract = false;
    rentercertiofComple = false;
    renterhealthSurvey = false;
    rentercontaintMovingContract = false;

    @track renterfirstNameValueNull = false;
    @track renterlastNameValueNull = false;
    @track renteremailValueNull = false;
    @track rentercellValueNull = false;
    @track renterphoneValueNull = false;

    addRenterindex = 0;
    @track addRenterList = [];
    defaultRenterShow = false;

    addRenterbox() {
        ++this.addRenterindex;
        var newItem = [{ id: this.addRenterindex }];
        this.addRenterList = this.addRenterList.concat(newItem);
        this.checkrentervalue = true;
        console.log('this.checkrentervalue = true');
    }
    removeRenterbox(event) {
        if (this.addRenterList.length >= 0) {
            this.addRenterList = this.addRenterList.filter(function (element) {
                console.log('element id--' + element.id);
                return parseInt(element.id) !== parseInt(event.target.accessKey);
            });
            this.checkrentervalue = false;
            console.log('this.checkrentervalue = false');
        }
    }
    handleRenterFirstNameChange(event) {
        this.renterfirstName = event.target.value;
        console.log('this.renterfirstName--->>>' + this.renterfirstName);
        this.renterfirstNameValueNull = false;
    }
    handleRenterMiddleInitialChange(event) {
        this.rentermiddleInitial = event.target.value;
        console.log('this.rentermiddleInitial--->>>' + this.rentermiddleInitial);
    }
    handleRenterLastNameChange(event) {
        this.renterlastName = event.target.value;
        console.log('this.renterlastName--->>>' + this.renterlastName);
        this.renterlastNameValueNull = false;
    }
    handleRenterEmailChange(event) {
        this.renteremail = event.target.value;
        console.log('this.renteremail--->>>' + this.renteremail);
        this.renteremailValueNull = false;
    }
    handleRenterCellChange(event) {
        this.rentercell = event.target.value;
        console.log('this.rentercell--->>>' + this.rentercell);
        this.rentercellValueNull = false;
    }
    handleRenterPhoneChange(event) {
        this.renterphone = event.target.value;
        console.log('this.renterphone--->>>' + this.renterphone);
        this.renterphoneValueNull = false;
    }
    handleRenterPayAuthChange(event) {
        this.renterdirectPayAuth = event.target.checked;
        console.log('this.renterdirectPayAuth--->>>' + this.renterdirectPayAuth);
    }
    handleRenterContractChange(event) {
        this.rentercontract = event.target.checked;
        console.log('this.rentercontract--->>>' + this.rentercontract);
    }
    handleRenterCertiofCompleChange(event) {
        this.rentercertiofComple = event.target.checked;
        console.log('this.rentercertiofComple--->>>' + this.rentercertiofComple);
    }
    handleRenterHealthSurveyChange(event) {
        this.renterhealthSurvey = event.target.checked;
        console.log('this.renterhealthSurvey--->>>' + this.renterhealthSurvey);
    }
    handleRenterContaintMovingContractChange(event) {
        this.rentercontaintMovingContract = event.target.checked;
        console.log('this.rentercontaintMovingContract--->>>' + this.rentercontaintMovingContract);
    }
    //-----------------------Add Renter End-------------------------------//

    //-----------------------Add Property Manager Start -------------------------------//
    propMangerfirstName;
    propMangermiddleInitial;
    propMangerlastName;
    propMangeremail;
    propMangercell;
    propMangerphone;
    propMangerdirectPayAuth = false;
    propMangercontract = false;
    propMangercertiofComple = false;
    propMangerhealthSurvey = false;
    propMangercontaintMovingContract = false;

    @track propManagerfirstNameValueNull = false;
    @track propManagerlastNameValueNull = false;
    @track propManageremailValueNull = false;
    @track propManagercellValueNull = false;
    @track propManagerphoneValueNull = false;

    addPropertyManagerindex = 0;
    @track addPropertyManagerList = [];
    defaulpropertyManagertShow = false;

    addPropertyManagerbox() {
        ++this.addPropertyManagerindex;
        var newItem = [{ id: this.addPropertyManagerindex }];
        this.addPropertyManagerList = this.addPropertyManagerList.concat(newItem);
        this.checkpropertyManagervalue = true;
        console.log('this.checkpropertyManagervalue = true');
    }
    removePropertyManagerbox(event) {
        if (this.addPropertyManagerList.length >= 0) {
            this.addPropertyManagerList = this.addPropertyManagerList.filter(function (element) {
                console.log('element id--' + element.id);
                return parseInt(element.id) !== parseInt(event.target.accessKey);
            });
            this.checkpropertyManagervalue = false;
            console.log('this.checkpropertyManagervalue = false');
        }
    }
    handlePropMangFirstNameChange(event) {
        this.propMangerfirstName = event.target.value;
        console.log('this.propMangerfirstName--->>>' + this.propMangerfirstName);
        this.propManagerfirstNameValueNull = false;
    }
    handlePropMangMiddleInitialChange(event) {
        this.propMangermiddleInitial = event.target.value;
        console.log('this.propMangermiddleInitial--->>>' + this.propMangermiddleInitial);
    }
    handlePropMangLastNameChange(event) {
        this.propMangerlastName = event.target.value;
        console.log('this.propMangerlastName--->>>' + this.propMangerlastName);
        this.propManagerlastNameValueNull = false;
    }
    handlePropMangEmailChange(event) {
        this.propMangeremail = event.target.value;
        console.log('this.propMangeremail--->>>' + this.propMangeremail);
        this.propManageremailValueNull = false;
    }
    handlePropMangCellChange(event) {
        this.propMangercell = event.target.value;
        console.log('this.propMangercell--->>>' + this.propMangercell);
        this.propManagercellValueNull = false;
    }
    handlePropMangPhoneChange(event) {
        this.propMangerphone = event.target.value;
        console.log('this.propMangerphone--->>>' + this.propMangerphone);
        this.propManagerphoneValueNull = false;
    }
    handlePropMangPayAuthChange(event) {
        this.propMangerdirectPayAuth = event.target.checked;
        console.log('this.propMangerdirectPayAuth--->>>' + this.propMangerdirectPayAuth);
    }
    handlePropMangContractChange(event) {
        this.propMangercontract = event.target.checked;
        console.log('this.propMangercontract--->>>' + this.propMangercontract);
    }
    handlePropMangCertiofCompleChange(event) {
        this.propMangercertiofComple = event.target.checked;
        console.log('this.propMangercertiofComple--->>>' + this.propMangercertiofComple);
    }
    handlePropMangHealthSurveyChange(event) {
        this.propMangerhealthSurvey = event.target.checked;
        console.log('this.propMangerhealthSurvey--->>>' + this.propMangerhealthSurvey);
    }
    handlePropMangContaintMovingContractChange(event) {
        this.propMangercontaintMovingContract = event.target.checked;
        console.log('this.propMangercontaintMovingContract--->>>' + this.propMangercontaintMovingContract);
    }
    //-----------------------Add Property Manager End -------------------------------//

    //-----------------------Add Other Client Start -------------------------------//
    otherClientfirstName;
    otherClientmiddleInitial;
    otherClientlastName;
    otherClientemail;
    otherClientcell;
    otherClientphone;
    otherClientdirectPayAuth = false;
    otherClientcontract = false;
    otherClientcertiofComple = false;
    otherClienthealthSurvey = false;
    otherClientcontaintMovingContract = false;

    @track otherClientfirstNameValueNull = false;
    @track otherClientlastNameValueNull = false;
    @track otherClientemailValueNull = false;
    @track otherClientcellValueNull = false;
    @track otherClientphoneValueNull = false;

    addOtherindex = 0;
    @track addotherList = [];
    defaulotherClienttShow = false;

    addOtherClientbox() {
        ++this.addOtherindex;
        var newItem = [{ id: this.addOtherindex }];
        this.addotherList = this.addotherList.concat(newItem);
        console.log('this.addotherList---->>>>' + JSON.stringify(this.addotherList));
        this.checkotherClientvalue = true;
        console.log('this.checkotherClientvalue = true');
    }
    removeOtherClientbox(event) {
        if (this.addotherList.length >= 0) {
            this.addotherList = this.addotherList.filter(function (element) {
                return parseInt(element.id) !== parseInt(event.target.accessKey);
            });
            this.checkotherClientvalue = false;
            console.log('this.checkotherClientvalue = false');
        }
    }
    handleOtherClientFirstNameChange(event) {
        this.otherClientfirstName = event.target.value;
        console.log('this.otherClientfirstName--->>>' + this.otherClientfirstName);
        this.otherClientfirstNameValueNull = false;
    }
    handleOtherClientMiddleInitialChange(event) {
        this.otherClientmiddleInitial = event.target.value;
        console.log('this.otherClientmiddleInitial--->>>' + this.otherClientmiddleInitial);
    }
    handleOtherClientLastNameChange(event) {
        this.otherClientlastName = event.target.value;
        console.log('this.otherClientlastName--->>>' + this.otherClientlastName);
        this.otherClientlastNameValueNull = false;
    }
    handleOtherClientEmailChange(event) {
        this.otherClientemail = event.target.value;
        console.log('this.otherClientemail--->>>' + this.otherClientemail);
        this.otherClientemailValueNull = false;
    }
    handleOtherClientCellChange(event) {
        this.otherClientcell = event.target.value;
        console.log('this.otherClientcell--->>>' + this.otherClientcell);
        this.otherClientcellValueNull = false;
    }
    handleOtherClientPhoneChange(event) {
        this.otherClientphone = event.target.value;
        console.log('this.otherClientphone--->>>' + this.otherClientphone);
        this.otherClientphoneValueNull = false;
    }
    handleOtherClientPayAuthChange(event) {
        this.otherClientdirectPayAuth = event.target.checked;
        console.log('this.otherClientdirectPayAuth--->>>' + this.otherClientdirectPayAuth);
    }
    handleOtherClientContractChange(event) {
        this.otherClientcontract = event.target.checked;
        console.log('this.otherClientcontract--->>>' + this.otherClientcontract);
    }
    handleOtherClientCertiofCompleChange(event) {
        this.otherClientcertiofComple = event.target.checked;
        console.log('this.otherClientcertiofComple--->>>' + this.otherClientcertiofComple);
    }
    handleOtherClientHealthSurveyChange(event) {
        this.otherClienthealthSurvey = event.target.checked;
        console.log('this.otherClienthealthSurvey--->>>' + this.otherClienthealthSurvey);
    }
    handleOtherClientContaintMovingContractChange(event) {
        this.otherClientcontaintMovingContract = event.target.checked;
        console.log('this.otherClientcontaintMovingContract--->>>' + this.otherClientcontaintMovingContract);
    }
    //-----------------------Add Other Client End -------------------------------//

    openModal() {
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
    submitDetails() {
        this.isModalOpen = false;
    }
    handlenewProjectButtonClick() {
        console.log('inside button click');
        this.openModal();
        console.log('Inside model');
    }

    @wire(getObjectInfo, { objectApiName: PROJECT_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: DESIGNATION_FIELD })
    DesignationPicklistValues;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: LOSSTYPE_FIELD })
    LossTypePicklistValues;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: SALECATEGORY_FIELD })
    SaleCategoryPicklistValues;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: CLASS_FIELD })
    ClassPicklistValues;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: CATEGORY_FIELD })
    CategoryPicklistValues;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: STATE_FIELD })
    StatePicklistValues;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: SOURCE_FIELD })
    SourceReasonofLossPicklistValues;

    handleDesignationChange(event) {
        this.designation = event.target.value;
        console.log('this.designation--->>>' + this.designation);
    }
    handleLossTypeChange(event) {
        this.losstype = event.target.value;
        console.log('this.losstype--->>>' + this.losstype);
        this.lossTypeValueNull = false;
    }
    handleSaleCategoryChange(event) {
        this.saleCategory = event.target.value;
        if (this.saleCategory === 'Insurance') {
            this.insuranceSelect = true;
            this.defaultInsurancetab = false;
            this.outOfPocketvalueSelected = false;
            this.equipmentRentalvalueSelected = false;
            this.warrantyvalueSelected = false;
            console.log('inside Insurance select');
        }
        if (this.saleCategory === 'Out Of Pocket') {
            this.outOfPocketvalueSelected = true;
            this.defaultInsurancetab = false;
            this.insuranceSelect = false;
            this.equipmentRentalvalueSelected = false;
            this.warrantyvalueSelected = false;
            console.log('inside Out Of Pocket select');
        }
        if (this.saleCategory === 'Equipment Rental') {
            this.equipmentRentalvalueSelected = true;
            this.insuranceSelect = false;
            this.defaultInsurancetab = false;
            this.outOfPocketvalueSelected = false;
            this.warrantyvalueSelected = false;
            console.log('inside Equipment Rental select');
        }
        if (this.saleCategory === 'Warranty') {
            this.warrantyvalueSelected = true;
            this.insuranceSelect = false;
            this.defaultInsurancetab = false;
            this.outOfPocketvalueSelected = false;
            this.equipmentRentalvalueSelected = false;
            console.log('inside Warranty select');
        }
        console.log('this.saleCategory--->>>' + this.saleCategory);

    }
    handleClassChange(event) {
        this.class = event.target.value;
        console.log('this.class--->>>' + this.class);
    }
    handleCategoryChange(event) {
        this.category = event.target.value;
        console.log('this.category--->>>' + this.category);
    }
    handlestateChange(event) {
        this.state = event.target.value;
        console.log('this.state--->>>' + this.state);
        this.stateValueNull = false;
    }
    handleSourceChange(event) {
        this.sourceReasonofLoss = event.target.value;
        console.log('this.sourceReasonofLoss--->>>' + this.sourceReasonofLoss);
    }
    handleStreetAddressChange(event) {
        this.streetAddress = event.target.value;
        console.log('this.streetAddress--->>>' + this.streetAddress);
        this.streetValueNull = false;
    }
    handleCityChange(event) {
        this.city = event.target.value;
        console.log('this.city--->>>' + this.city);
        this.cityValueNull = false;
    }
    handleClientContactedChange(event) {
        this.clientcontacted = event.target.value;
        console.log('this.clientcontacted--->>>' + this.clientcontacted);
        this.clientcontactedValueNull = false;
    }
    handleZipChange(event) {
        this.zip = event.target.value;
        console.log('this.zip--->>>' + this.zip);
        this.zipValueNull = false;
    }
    handleYearOfStructureChange(event) {
        this.yearofstructure = event.target.value;
        console.log('this.yearofstructure--->>>' + this.yearofstructure);
    }
    handleDateOfLossChange(event) {
        this.dateofloss = event.target.value;
        console.log('this.dateofloss--->>>' + this.dateofloss);
        this.dateoflossValueNull = false;
    }
    handleAffectedAreasChange(event) {
        this.affectedAreas = event.target.value;
        console.log('this.affectedAreas--->>>' + this.affectedAreas);
        this.affectedAreasValueNull = false;
    }
    handleSiteInspectedChange(event) {
        this.siteInspected = event.target.value;
        console.log('this.siteInspected--->>>' + this.siteInspected);
        this.siteInspectedValueNull = false;
    }
    //--------------Insurance Fields handle change Events---------------------//
    agentName;
    company;
    agentPhone;
    adjusterName;
    adjusterEmail;
    adjusterPhone;
    adjusterFax;
    vendorContactedAt;
    policyNumber;
    claimNumber;
    deductible;
    deductibleCollected = false;
    finishLater = false;
    estimate;
    estimateExplanation;

    @track companyValueNull = false;
    @track adjusterNameValueNull = false;
    @track adjusterEmailValueNull = false;
    @track adjusterPhoneValueNull = false;
    @track vendorContactedAtValueNull = false;
    @track claimNumberValueNull = false;

    handleCompanyChange(event) {
        this.company = event.target.value;
        console.log('this.company--->>>' + this.company);
        this.companyValueNull = false;
    }
    handleAgentNameChange(event) {
        this.agentName = event.target.value;
        console.log('this.agentName--->>>' + this.agentName);
    }
    handleAgentPhoneChange(event) {
        this.agentPhone = event.target.value;
        console.log('this.agentPhone--->>>' + this.agentPhone);
    }
    handleAdjusterNameChange(event) {
        this.adjusterName = event.target.value;
        console.log('this.adjusterName--->>>' + this.adjusterName);
        this.adjusterNameValueNull = false;
    }
    handleAdjusterEmailChange(event) {
        this.adjusterEmail = event.target.value;
        console.log('this.adjusterEmail--->>>' + this.adjusterEmail);
        this.adjusterEmailValueNull = false;
    }
    handleAdjusterPhoneChange(event) {
        this.adjusterPhone = event.target.value;
        console.log('this.adjusterPhone--->>>' + this.adjusterPhone);
        this.adjusterPhoneValueNull = false;
    }
    handleAdjusterFaxChange(event) {
        this.adjusterFax = event.target.value;
        console.log('this.adjusterFax--->>>' + this.adjusterFax);
    }
    handleVendorContactedAtChange(event) {
        this.vendorContactedAt = event.target.value;
        console.log('this.vendorContactedAt--->>>' + this.vendorContactedAt);
        this.vendorContactedAtValueNull = false;
    }
    handlePolicyNumberChange(event) {
        this.policyNumber = event.target.value;
        console.log('this.policyNumber--->>>' + this.policyNumber);
    }
    handleClaimNumberChange(event) {
        this.claimNumber = event.target.value;
        console.log('this.claimNumber--->>>' + this.claimNumber);
        this.claimNumberValueNull = false;
    }
    handleDeductibleChange(event) {
        this.deductible = event.target.value;
        console.log('this.deductible--->>>' + this.deductible);
    }
    handleDeductibleCollectedChange(event) {
        this.deductibleCollected = event.target.checked;
        console.log('this.deductibleCollected--->>>' + this.deductibleCollected);
    }
    handleFinishLaterChange(event) {
        this.finishLater = event.target.checked;
        console.log('this.finishLater--->>>' + this.finishLater);
    }
    handleEstimateChange(event) {
        this.estimate = event.target.value;
        console.log('this.estimate--->>>' + this.estimate);
    }
    handleEstimateExplanationChange(event) {
        this.estimateExplanation = event.target.value;
        console.log('this.estimateExplanation--->>>' + this.estimateExplanation);
    }
    handaleInsuranceSave() {
        if (!this.company) {
            this.companyValueNull = true;
            this.lossTypMessage = 'This field is required';
        } else {
            this.companyValueNull = false;
        }
        if (!this.adjusterName) {
            this.adjusterNameValueNull = true;
            this.lossTypMessage = 'This field is required';
        } else {
            this.adjusterNameValueNull = false;
        }
        if (!this.adjusterEmail) {
            this.adjusterEmailValueNull = true;
            this.lossTypMessage = 'This field is required';
        } else {
            this.adjusterEmailValueNull = false;
        }
        if (!this.adjusterPhone) {
            this.adjusterPhoneValueNull = true;
            this.lossTypMessage = 'This field is required';
        } else {
            this.adjusterPhoneValueNull = false;
        }
        if (!this.vendorContactedAt) {
            this.vendorContactedAtValueNull = true;
            this.lossTypMessage = 'This field is required';
        } else {
            this.vendorContactedAtValueNull = false;
        }
        if (!this.claimNumber) {
            this.claimNumberValueNull = true;
            this.lossTypMessage = 'This field is required';
        } else {
            this.claimNumberValueNull = false;
        }
        if (this.company != null && this.company != '' && this.company != undefined &&
            this.adjusterName != null && this.adjusterName != '' && this.adjusterName != undefined &&
            this.adjusterEmail != null && this.adjusterEmail != '' && this.adjusterEmail != undefined &&
            this.adjusterPhone != null && this.adjusterPhone != '' && this.adjusterPhone != undefined &&
            this.vendorContactedAt != null && this.vendorContactedAt != '' && this.vendorContactedAt != undefined &&
            this.claimNumber != null && this.claimNumber != '' && this.claimNumber != undefined
        ) {
            this.isMarkandCompletelockModalOpen = true;
        } else {
            this.isMarkandCompletelockModalOpen = false;
        }

    }
    //--------------Legal Review tab change --------------//
    @track skipSignatureCollection = false;
    healthSurveyResponse;
    logo = logoCleanClaims;

    handleSkipSignatureCollectionChange(event) {
        this.skipSignatureCollection = event.target.checked;
        console.log('this.skipSignatureCollection--->>>' + this.skipSignatureCollection);
    }
    handleHealthSurveyResponseChange(event) {
        this.healthSurveyResponse = event.target.value;
        console.log('this.healthSurveyResponse--->>>' + this.healthSurveyResponse);
    }
    legalReviewtabChangeHandler() {
        this.showInfoToast();

    }
    showInfoToast() {
        const evt = new ShowToastEvent({
            title: '',
            message: 'Issue, Contacts, and Insurance must first be completed',
            variant: 'info',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    //--------------Legal Review tab change --------------//
    designation;
    losstype;
    saleCategory;
    category;
    class;
    state;
    streetAddress;
    city;
    zip;
    yearofstructure;
    clientcontacted;
    dateofloss;
    sourceReasonofLoss;
    affectedAreas;
    siteInspected;

    @track lossTypeValueNull = false;
    @track streetValueNull = false;
    @track cityValueNull = false;
    @track stateValueNull = false;
    @track zipValueNull = false;
    @track clientcontactedValueNull = false;
    @track dateoflossValueNull = false;
    @track affectedAreasValueNull = false;
    @track siteInspectedValueNull = false;


    handleSaveProjectRecordevent() {
        if (!this.losstype) {
            this.lossTypeValueNull = true;
            this.lossTypMessage = 'This field is required';
        } else {
            console.log('inside else');
            this.lossTypeValueNull = false;
        } if (!this.streetAddress) {
            this.streetValueNull = true;
            this.lossTypMessage = 'This field is required';
        } else {
            console.log('inside else');
            this.streetValueNull = false;

        } if (!this.state) {
            this.stateValueNull = true;
            this.lossTypMessage = 'This field is required';
        } else {
            this.stateValueNull = false;
        } if (!this.city) {
            this.cityValueNull = true;
            this.lossTypMessage = 'This field is required';
        } else {
            this.cityValueNull = false;
        } if (!this.zip) {
            this.zipValueNull = true;
            this.lossTypMessage = 'This field is required';
        } else {
            this.zipValueNull = false;
        } if (!this.clientcontacted) {
            this.clientcontactedValueNull = true;
            this.lossTypMessage = 'This field is required';
        } else {
            this.clientcontactedValueNull = false;
        } if (!this.dateofloss) {
            this.dateoflossValueNull = true;
            this.lossTypMessage = 'This field is required';
        } else {
            this.dateoflossValueNull = false;
        } if (!this.affectedAreas) {
            this.affectedAreasValueNull = true;
            this.lossTypMessage = 'This field is required';
        } else {
            this.affectedAreasValueNull = false;
        } if (!this.siteInspected) {
            this.siteInspectedValueNull = true;
            this.lossTypMessage = 'This field is required';
        } else {
            this.
                siteInspectedValueNull = false;
        }
        if (!this.losstype || !this.streetAddress || !this.state || !this.city || !this.zip || !this.clientcontacted || !this.dateofloss || !this.affectedAreas || !this.siteInspected) {
            this.isMarkandCompletelockModalOpen = false;
        } else {
            this.isMarkandCompletelockModalOpen = true;
            // this.MarkandCompletelockopenModal();
        }
    }

    // -------------- contact save record --------------------//

    handleNullCheckContactRecord() {
        if (this.checkclientvalue == true) {
            console.log('checkclientvalue true ----****-----');
            if (!this.firstName) {
                this.firstNameValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.firstNameValueNull = false;
            } if (!this.lastName) {
                this.lastNameValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.lastNameValueNull = false;
            } if (!this.email) {
                this.emailValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.emailValueNull = false;
            } if (!this.cell) {
                this.cellValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.cellValueNull = false;
            } if (!this.phone) {
                this.phoneValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.phoneValueNull = false;
            }
            if (this.firstName != null && this.firstName != '' && this.firstName != undefined &&
                this.lastName != null && this.lastName != '' && this.lastName != undefined &&
                this.email != null && this.email != '' && this.email != undefined &&
                this.cell != null && this.cell != '' && this.cell != undefined &&
                this.phone != null && this.phone != '' && this.phone != undefined
            ) {
                this.isMarkandCompletelockModalOpen = true;
                var createClientRecord = {
                    'FirstName': this.firstName,
                    'MiddleName': this.middleInitial,
                    'LastName': this.lastName,
                    'Email': this.email,
                    'MobilePhone': this.cell,
                    'Phone': this.phone,
                    'Contract__c': this.contract,
                    'Project__c': this.projectRecordId,
                    'Direct_Pay_Authorization__c': this.directPayAuth,
                    'Certificate_of_Completion__c': this.certiofComple,
                    'Health_Survey__c': this.healthSurvey,
                    'Contents_Moving_Contract__c': this.containtMovingContract
                };
                this.contacts.push(createClientRecord);
                console.log('this.contacts-->>' + JSON.stringify(this.contacts));
            } else {
                this.isMarkandCompletelockModalOpen = false;
            }
        }
        if (this.checkrentervalue == true) {
            console.log('checkrentervalue true ---////-----');
            if (!this.renterfirstName) {
                this.renterfirstNameValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.renterfirstNameValueNull = false;
            } if (!this.renterlastName) {
                this.renterlastNameValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.renterlastNameValueNull = false;
            } if (!this.renteremail) {
                this.renteremailValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.renteremailValueNull = false;
            } if (!this.rentercell) {
                this.rentercellValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.rentercellValueNull = false;
            } if (!this.renterphone) {
                this.renterphoneValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.renterphoneValueNull = false;
            }
            if (this.renterfirstName != null && this.renterfirstName != '' && this.renterfirstName != undefined &&
                this.renteremail != null && this.renteremail != '' && this.renteremail != undefined &&
                this.renterlastName != null && this.renterlastName != '' && this.renterlastName != undefined &&
                this.rentercell != null && this.rentercell != '' && this.rentercell != undefined &&
                this.renterphone != null && this.renterphone != '' && this.renterphone != undefined
            ) {
                this.isMarkandCompletelockModalOpen = true;
                var createRenterRecord = {
                    'FirstName': this.renterfirstName,
                    'MiddleName': this.rentermiddleInitial,
                    'LastName': this.renterlastName,
                    'Email': this.renteremail,
                    'MobilePhone': this.rentercell,
                    'Phone': this.renterphone,
                    'Contract__c': this.rentercontract,
                    'Project__c': this.projectRecordId,
                    'Direct_Pay_Authorization__c': this.renterdirectPayAuth,
                    'Certificate_of_Completion__c': this.rentercertiofComple,
                    'Health_Survey__c': this.renterhealthSurvey,
                    'Contents_Moving_Contract__c': this.rentercontaintMovingContract
                };
                this.contacts.push(createRenterRecord);
                console.log('this.contacts--22------->>' + JSON.stringify(this.contacts));
            } else {
                this.isMarkandCompletelockModalOpen = false;
            }
        } if (this.checkpropertyManagervalue == true) {
            console.log('checkpropertyManagervalue true/-***/*/-//');
            if (!this.propMangerfirstName) {
                this.propManagerfirstNameValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.propManagerfirstNameValueNull = false;
            } if (!this.propMangerlastName) {
                this.propManagerlastNameValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.propManagerlastNameValueNull = false;
            } if (!this.propMangeremail) {
                this.propManageremailValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.propManageremailValueNull = false;
            } if (!this.propMangercell) {
                this.propManagercellValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.propManagercellValueNull = false;
            } if (!this.propMangerphone) {
                this.propManagerphoneValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.propManagerphoneValueNull = false;
            }
            if (this.propMangerfirstName != null && this.propMangerfirstName != '' && this.propMangerfirstName != undefined &&
                this.propMangerlastName != null && this.propMangerlastName != '' && this.propMangerlastName != undefined &&
                this.propMangeremail != null && this.propMangeremail != '' && this.propMangeremail != undefined &&
                this.propMangercell != null && this.propMangercell != '' && this.propMangercell != undefined &&
                this.propMangerphone != null && this.propMangerphone != '' && this.propMangerphone != undefined
            ) {
                this.isMarkandCompletelockModalOpen = true;
                var createPropertyManagerRecord = {
                    'FirstName': this.propMangerfirstName,
                    'MiddleName': this.propMangermiddleInitial,
                    'LastName': this.propMangerlastName,
                    'Email': this.propMangeremail,
                    'MobilePhone': this.propMangercell,
                    'Phone': this.propMangerphone,
                    'Project__c': this.projectRecordId,
                    'Contract__c': this.propMangercontract,
                    'Direct_Pay_Authorization__c': this.propMangerdirectPayAuth,
                    'Certificate_of_Completion__c': this.propMangercertiofComple,
                    'Health_Survey__c': this.propMangerhealthSurvey,
                    'Contents_Moving_Contract__c': this.propMangercontaintMovingContract
                };
                this.contacts.push(createPropertyManagerRecord);
                console.log('this.contacts--3------->>' + JSON.stringify(this.contacts));

            } else {
                this.isMarkandCompletelockModalOpen = false;
            }
        } if (this.checkotherClientvalue == true) {
            console.log('checkotherClientvalue true******');
            if (!this.otherClientfirstName) {
                this.otherClientfirstNameValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.otherClientfirstNameValueNull = false;
            } if (!this.otherClientlastName) {
                this.otherClientlastNameValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.otherClientlastNameValueNull = false;
            } if (!this.otherClientemail) {
                this.otherClientemailValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.otherClientemailValueNull = false;
            } if (!this.otherClientcell) {
                this.otherClientcellValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.otherClientcellValueNull = false;
            } if (!this.otherClientphone) {
                this.otherClientphoneValueNull = true;
                this.lossTypMessage = 'This field is required';
            } else {
                this.otherClientphoneValueNull = false;
            }
            if (this.otherClientfirstName != null && this.otherClientfirstName != '' && this.otherClientfirstName != undefined &&
                this.otherClientlastName != null && this.otherClientlastName != '' && this.otherClientlastName != undefined &&
                this.otherClientemail != null && this.otherClientemail != '' && this.otherClientemail != undefined &&
                this.otherClientcell != null && this.otherClientcell != '' && this.otherClientcell != undefined &&
                this.otherClientphone != null && this.otherClientphone != '' && this.otherClientphone != undefined
            ) {
                this.isMarkandCompletelockModalOpen = true;
                var createOtherClientRecord = {
                    'FirstName': this.otherClientfirstName,
                    'MiddleName': this.otherClientmiddleInitial,
                    'LastName': this.otherClientlastName,
                    'Email': this.otherClientemail,
                    'MobilePhone': this.otherClientcell,
                    'Phone': this.otherClientphone,
                    'Contract__c': this.otherClientcontract,
                    'Project__c': this.projectRecordId,
                    'Direct_Pay_Authorization__c': this.otherClientdirectPayAuth,
                    'Certificate_of_Completion__c': this.otherClientcertiofComple,
                    'Health_Survey__c': this.otherClienthealthSurvey,
                    'Contents_Moving_Contract__c': this.otherClientcontaintMovingContract
                };
                this.contacts.push(createOtherClientRecord);
                this.otherClientfirstName = '';
                this.otherClientmiddleInitial = '';
                this.otherClientlastName = '';
                this.otherClientemail = '';
                this.otherClientcell = '';
                this.otherClientphone = '';
                this.otherClientcontract = '';
                this.projectRecordId = '';
                this.otherClientdirectPayAuth,
                this.otherClientcertiofComple,
                this.otherClienthealthSurvey,
                this.otherClientcontaintMovingContract
                console.log('this.contacts-- = ------->>' ,JSON.stringify(this.contacts));
            } else {
                this.isMarkandCompletelockModalOpen = false;
            }
        }
    }
    handleSaveContctRecord() {
        this.isMarkandCompletelockModalOpen = false;
        console.log('Inside contact record save');
        insertContctRecord({
            createClientList: this.contacts
        })
            .then(result => {
                console.log('this.contacts---->>>' + JSON.stringify(this.contacts));
                console.log('result--->>>' + result);
                this.createContact = result;
                console.log('this.createContact-->>>' + this.createContact);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact Record Created Successfully!',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                console.log('error=>' + JSON.stringify(error));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    defaultInsurancesubmitDetails() {
        this.isMarkandCompletelockModalOpen = false;
    }
    insurance = [];
    insuranceRecordsubmitDetails() {
        this.isMarkandCompletelockModalOpen = false;

        var createInsuranceRecord = {
            'Company__c	': this.company,
            'Agent_Name__c': this.agentName,
            'Agent_Phone__c': this.agentPhone,
            'Adjuster_Name__c': this.adjusterName,
            'Adjuster_Email__c': this.adjusterEmail,
            'Adjuster_Phone__c': this.adjusterPhone,
            'Adjuster_Fax__c': this.adjusterFax,
            'Vendor_Contacted_At__c	': this.vendorContactedAt,
            'Policy_Number__c': this.policyNumber,
            'Project__c': this.projectRecordId,
            'Claim_Number__c': this.claimNumber,
            'Deductible__c': this.deductible,
            'Deductible_Collected__c': this.deductibleCollected,
            'Finish_Later__c': this.finishLater
        };
        console.log('Inside Insurance record save');
        this.insurance.push(createInsuranceRecord);
        console.log('this.insurance--->>>' + JSON.stringify(this.insurance));
        insertInsuranceRecord({
            insuranceRec: insurance
        })
            .then(result => {
                console.log('result--->>>' + result);
                this.createInsuranceId = result;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Insurance Record Created Successfully!',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                console.log('error=>' + JSON.stringify(error));
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