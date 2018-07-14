import 'css/survey.css';

import {bindable, inject} from 'aurelia-framework';
import {SurveyService} from "../../../services/survey-service";
import {SurveyHelper} from "../../../services/survey-helper";
import {Ui} from "../../../ui";
import $ from 'jquery';

@inject( SurveyService, SurveyHelper, Ui )
export class Question extends Ui {

  @bindable question;
  name;
  isEdit = false;

  constructor( surveyService, surveyHelper, ...rest ) {
    super(...rest);
    this.surveyService = surveyService;
    this.surveyHelper = surveyHelper;
    this.name = 'Question';
  }

  startEdit(){
    if( !this.isEdit ){
      this.surveyService.setEditedModel( this );
      this.isEdit = true;
    }
  }

  addItem( options ){
    console.log( 'add item' );
    options.elements.push( this.surveyHelper.createOption( undefined, 'new option', this.question.type, this.question.id, this.question.options.length, true ) );
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
