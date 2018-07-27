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
      that.surveyHelper.deleteItem( that.question.scales.elements, index );
    } );
  }

  @computedFrom( 'question.scales.elements.length' )
  get canAdd(){
    return this.question.scales.elements.length <= 2;
  }

  addScale(){
    let scale = this.surveyHelper.createScale(
      undefined,
      'new scale',
      this.question.settings.questionType,
      this.question.id,
      this.question.scales.elements.length,
      false,
      this.surveyHelper.createDefaultScaleSteps(),
      this.question.scales.id,
      this.question);

    this.question.scales.elements.push( scale );
  }

  detached() {
    this.removeScaleSub.dispose();
  }


}
