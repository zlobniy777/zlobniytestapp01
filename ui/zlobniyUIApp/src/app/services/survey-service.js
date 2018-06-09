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
      question.view = './../questions/subView/closed-question';

      question.options = {};
      question.options.id = "options_"+question.id;
      question.options.type = "options";
      question.options.elements = [];
      question.options.elements.push( this.createOption( 'single 1', question.type, question.id, 0, false ) );
      question.options.elements.push( this.createOption( 'single 2', question.type, question.id, 1, false ) );
      question.options.elements.push( this.createOption( 'single 3', question.type, question.id, 2, false ) );


    } else {
      question.type = 'matrix';
      question.view = './../questions/subView/matrix';

      question.options = {};
      question.options.id = "options_"+question.id;
      question.options.type = "options";
      question.options.elements = [];
      question.options.elements.push( this.createOption( 'single 1', question.type, question.id, 0, false, 'common-option', question ) );
      question.options.elements.push( this.createOption( 'single 2', question.type, question.id, 1, false, 'common-option', question ) );
      question.options.elements.push( this.createOption( 'single 3', question.type, question.id, 2, false, 'common-option', question ) );

      question.scales = {};
      question.scales.id = "scales_"+question.id;
      question.scales.type = "scales";
      question.scales.cssClass = "scales-view";
      question.scales.elements = [];
      question.scales.elements.push( this.createScale( 'Scale 1', question.type, question.id, 0, false ) );
      question.scales.elements.push( this.createScale( 'Scale 2', question.type, question.id, 1, false ) );
      question.scales.elements.push( this.createScale( 'Scale 3', question.type, question.id, 2, false ) );

    }

    qArray.splice( index, 0, question );

    var i = 0;
    qArray.forEach(function(question) {
      console.log(question);
      question.index = i;
      i++;
    });

  }

  createOption( title, type, qId, index, isNew, cssClass, question ){
    let option = {
      view: "./../common/option",
      title: title,
      type: type,
      qId: qId,
      index: index,
      isNew: isNew,
      cssClass: cssClass ? cssClass : 'common-option',
      question: question
    };
    return option;
  }

  createScale( title, type, qId, index, isNew ){
    let scale = {
      view: "./../common/scale",
      title: title,
      type: type,
      qId: qId,
      index: index,
      isNew: isNew
    };

    scale.options = [];
    scale.options.id = "steps_"+index;
    scale.options.cssClass = "scale-steps";
    scale.options.type = "steps";
    scale.options.elements = [];
    scale.options.elements.push( this.createOption( 'step 1', type, qId, 0, false ) );
    scale.options.elements.push( this.createOption( 'step 2', type, qId, 1, false ) );
    scale.options.elements.push( this.createOption( 'step 3', type, qId, 2, false ) );
    return scale;
  }

}
