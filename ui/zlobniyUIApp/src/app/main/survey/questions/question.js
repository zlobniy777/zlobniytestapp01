import 'css/survey.css';

import {bindable, inject} from 'aurelia-framework';
import {SurveyService} from "../../../services/survey-service";
import {SurveyHelper} from "../../../services/survey-helper";
import {EventAggregator} from 'aurelia-event-aggregator';
import {Ui} from "../../../ui";
import $ from 'jquery';

@inject( SurveyService, SurveyHelper, EventAggregator, Ui )
export class Question extends Ui {

  @bindable question;
  name;
  isEdit = false;

  constructor( surveyService, surveyHelper, eventAggregator, ...rest ) {
    super(...rest);
    this.surveyService = surveyService;
    this.surveyHelper = surveyHelper;
    this.eventAggregator = eventAggregator;
    this.name = 'Question';
  }

  removeQuestion(){
    this.eventAggregator.publish( 'remove-question', this.question.index );
  }

  showSettings(){
    this.eventAggregator.publish( 'show-settings', this.question.index );
  }

  startEdit(){
    if( !this.isEdit ){
      this.surveyService.setEditedModel( this );
      this.isEdit = true;
    }
  }

  finishEdit(){
    if( this.isEdit ){
      this.isEdit = false;
    }
  }

  attached(){
    $('[data-toggle="tooltip"]').tooltip();
  }

  // activate( question ){
  //   this.question = question;
  // }

}
