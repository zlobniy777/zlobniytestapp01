import 'css/survey.css';

import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyHelper} from "../../../services/survey-helper";

@inject( EventAggregator, SurveyHelper )
export class options {

  @bindable question;

  constructor( eventAggregator, surveyHelper ) {
    this.eventAggregator = eventAggregator;
    this.surveyHelper = surveyHelper;
  }

  addItem(  ){
    console.log( 'add item' );
    this.question.options.elements.push(
      this.surveyHelper.createOption(
        undefined,
        'new option',
        this.question.type,
        this.question.id,
        this.question.options.elements.length,
        true,
        undefined,
        this.question,
        this.question.options.id )
    );
  }


  attached() {
    let that = this;
    this.removeOptionSub = this.eventAggregator.subscribe( this.question.options.id + '-remove', index => {
      that.question.options.elements.splice( index, 1 );
    } );
  }

  detached() {
    this.removeOptionSub.dispose();
  }

  activate( data ) {
    console.log( 'activate ' + data );
  }

}
