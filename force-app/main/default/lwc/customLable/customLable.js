import { LightningElement } from 'lwc';
// importing Custom Label
import WelcomeLabel from '@salesforce/label/c.WelcomeNoteLabel';
import HomePageLabel from '@salesforce/label/c.HomePageNewsLabe';
import NewCaseLabel from '@salesforce/label/c.NewCaseLabel';
export default class CustomLabelExampleLWC extends LightningElement {
    label = {
        WelcomeLabel,
        HomePageLabel,
        NewCaseLabel
    };
}