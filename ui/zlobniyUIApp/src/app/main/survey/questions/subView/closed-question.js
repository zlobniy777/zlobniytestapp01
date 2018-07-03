import {inject} from 'aurelia-framework';
import {SurveyHelper} from "../../../../services/survey-helper";
import {Ui} from "../../../../ui";

@inject( SurveyHelper, Ui )
export class ClosedQuestion extends Ui {

  question;

  constructor( surveyHelper, ...rest ) {
    super(...rest);
    this.surveyHelper = surveyHelper;
    this.name = 'Closed question';
  }

  addItem( options ){
    console.log( 'add item' );
    options.elements.push( this.surveyHelper.createOption( undefined, 'new option', this.question.type, this.question.id, this.question.options.length, true ) );
  }

  activate( question ){
    this.question = question;
  }

}
