import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';

@inject( HttpClient, Router )
export class SurveyService {

  test = false;
  isWizard = false;
  surveySettings = {};
  editedModel;


  constructor( http, router ) {
    this.http = http;
    this.router = router;
    this.initSurveySettings();
  }

  initSurveySettings() {
    this.surveySettings.showQuestionNumber = true;
  }

  setEditedModel( model ){
    console.log( 'start editing ' + model.name );
    if( this.editedModel ){
      this.editedModel.finishEdit();
    }
    this.editedModel = model;
  }

  unsetEditedModel(){
    if( this.editedModel ){
      this.editedModel.finishEdit();
      this.editedModel = undefined;
    }
  }

  isEditedModel(){
    return this.editedModel !== undefined;
  }

  createQuestion( questionType, title, index, qArray ){

    let question = {};
    let questionNumber = parseInt( qArray.length ) + 1;
    question.title = title + " " + questionNumber;
    question.id = questionNumber;

    if ( questionType === 'closed' ) {
      question.type = 'closed';

      question.options = [];
      question.options.push( this.createOption( 'single 1', question.type, question.id, 0, false ) );
      question.options.push( this.createOption( 'single 2', question.type, question.id, 1, false ) );
      question.options.push( this.createOption( 'single 3', question.type, question.id, 2, false ) );


    } else {
      question.type = 'matrix';
    }

    qArray.splice( index, 0, question );

    var i = 0;
    qArray.forEach(function(question) {
      console.log(question);
      question.index = i;
      i++;
    });

  }

  createOption( title, type, qId, index, isNew ){
    let option = {
      path: "./../questions/option",
      title: title,
      type: type,
      qId: qId,
      index: index,
      isNew: isNew
    };
    return option;
  }

}
