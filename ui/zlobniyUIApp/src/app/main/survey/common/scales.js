import 'css/survey.css';

import {bindable, computedFrom, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyHelper} from "../../../services/survey-helper";

@inject( EventAggregator, SurveyHelper )
export class scales {

  @bindable question;

  constructor( eventAggregator, surveyHelper ) {
    this.eventAggregator = eventAggregator;
    this.surveyHelper = surveyHelper
  }

  attached() {
    let that = this;
    this.removeScaleSub = this.eventAggregator.subscribe( that.question.scales.id + '-remove', index => {
      that.question.scales.elements.splice( index, 1 );
    } );
  }

  @computedFrom( 'question.scales.elements.length' )
  get canAdd(){
    return this.question.scales.elements.length <= 2;
  }

  addScale(){
    this.question.scales.elements.push(
      this.surveyHelper.createScale(
        undefined,
        'new scale',
        this.question.type,
        this.question.id,
        this.question.scales.length,
        false,
        this.surveyHelper.createDefaultScaleSteps(),
        this.question.scales.id )
    );
  }

  detached() {
    this.removeScaleSub.dispose();
  }

  activate( data ) {
    console.log( 'activate ' + data );
  }

}
