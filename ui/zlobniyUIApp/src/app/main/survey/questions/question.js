import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {SurveyService} from "../../../services/survey-service";
import {Ui} from "../../../ui";
import {Router} from 'aurelia-router';

@inject( SurveyService, Router, Ui )
export class Question extends Ui {

  question = {};
  name;
  isEdit = false;

  constructor( surveyService, router, ...rest ) {
    super(...rest);
    this.surveyService = surveyService;
    this.router = router;
    this.name = 'Question';

  }

  addItem( options ){
    console.log( 'add item' );
    options.elements.push( this.surveyService.createOption( 'new option', this.question.type, this.question.id, this.question.options.length, true ) );
    // this.question.options.elements.push( this.surveyService.createOption( 'new option', this.question.type, this.question.id, this.question.options.length, true ) );
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
