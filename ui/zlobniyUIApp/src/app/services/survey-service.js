import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';
import {SurveyModelTransformer} from '../transformer/survey-model-transformer';
import {SurveyHelper} from './survey-helper';

@inject( HttpClient, Router, SurveyModelTransformer, SurveyHelper )
export class SurveyService {

  test = false;
  isWizard = false;
  surveyModel = {};
  editedModel;

  constructor( http, router, surveyTransformer, surveyHelper ) {
    this.http = http;
    this.router = router;
    this.surveyTransformer = surveyTransformer;
    this.surveyHelper = surveyHelper;

  }

  initSurveySettings() {
    this.surveyModel.surveySettings.showQuestionNumber = true;
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

  loadSurvey( id ){
    let that = this;
    this.http.fetch( 'api/survey/' + id, {
      method: 'GET'
    })
      .then(surveyModel => surveyModel.json())
      .then(surveyModel => {
        that.surveyModel = that.surveyTransformer.deSerialize( surveyModel );
        console.log( surveyModel );
      });
  }

  saveSurvey(  ){
    let that = this;
    this.http.fetch( 'api/saveSurvey', {
      method: 'post',
      body: JSON.stringify( that.surveyTransformer.serialize( that.surveyModel ) ),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then( response => response.json())
      .then( response => {
        console.log( response );
      });
  }

  loadSurveys( surveyInfoList ){
    this.http.fetch( 'api/surveys', {
      method: 'GET'
    })
      .then( data => data.json() )
      .then( data => {
        for ( let obj of data ) {
          surveyInfoList.push( obj );
        }

        console.log( data );
      });
  }

  initNewSurveyModel(){
    this.surveyModel = {};
    this.surveyModel.title = "new survey";
    this.surveyModel.questionnaire = {};
    this.surveyModel.questionnaire.questions = [];
    this.surveyModel.surveySettings = {};

    this.initSurveySettings();
  }
  //surveyModel.questionnaire.questions;

  isEditedModel(){
    return this.editedModel !== undefined;
  }

  updatePositions( newIndex, oldIndex ){
    if (newIndex != oldIndex) {
      let questions = this.surveyModel.questionnaire.questions;

      if( oldIndex > newIndex ){
        questions[oldIndex].index = newIndex;
        for( var i = newIndex; i < oldIndex ; i++ ){
          questions[i].index =questions[i].index + 1;
        }
      }else{
        questions[oldIndex].index = newIndex;
        for( var i = newIndex; i > oldIndex ; i-- ){
          questions[i].index = questions[i].index - 1;
        }
      }

      this.sort();
    }
  }

  sort(){
    this.surveyModel.questionnaire.questions.sort( function compare(a, b) {
      if (a.index < b.index) {
        return -1;
      }
      if (a.index > b.index) {
        return 1;
      }
      return 0;
    } );
  }

  createQuestion( id, questionType, title, index, options, scales ){
    let questionNumber = this.surveyModel.questionnaire.questions.length;
    let question = this.surveyHelper.createQuestion( id, questionType, title, questionNumber, options, scales );
    this.surveyHelper.insertQuestion( this.surveyModel.questionnaire.questions, question, index );
  }

}
