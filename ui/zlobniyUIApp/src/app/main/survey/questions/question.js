import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {SurveyService} from "../../../services/survey-service";
import {SurveyHelper} from "../../../services/survey-helper";
import {Ui} from "../../../ui";

@inject( SurveyService, SurveyHelper, Ui )
export class Question extends Ui {

  question = {};
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

  finishEdit(){
    if( this.isEdit ){
      this.isEdit = false;
    }
  }

  activate( question ){
    this.question = question;
  }

}
