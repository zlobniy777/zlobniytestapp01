import 'css/survey.css';

import {bindable, computedFrom, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyHelper} from "../../../../services/survey-helper";

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
    let that = this;
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
    let groupIndex = this.question.scales.elements.length;

    this.question.scales.elements.push( scale );

    this.question.options.elements.forEach( function ( element ) {
      let group = that.surveyHelper.createGroup( scale, groupIndex );
      element.scaleGroup.push( group );

    } );

  }

  detached() {
    this.removeScaleSub.dispose();
  }


}
