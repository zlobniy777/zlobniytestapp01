import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {SurveyModelTransformer} from '../transformer/survey-model-transformer';
import {SurveyHelper} from './survey-helper';
import {HttpService} from './http-service';

@inject( HttpService, Router, SurveyModelTransformer, SurveyHelper )
export class SurveyService {

  surveyModel = {};
  editedModel;

  constructor( httpService, router, surveyTransformer, surveyHelper ) {
    this.http = httpService;
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

  isEditedModel(){
    return this.editedModel !== undefined;
  }

  loadSurvey( id ){
    return this.http.get( 'api/survey/' + id );
  }

  setSurveyModel( surveyModel ){
    this.surveyModel = this.surveyTransformer.deSerialize( surveyModel );
  }

  unSetSurveyModel(){
    this.surveyModel = {};
  }

  saveSurvey(  ){
    let that = this;

    let promis = this.http.post( 'api/saveSurvey', that.surveyTransformer.serialize( that.surveyModel ) );
    promis.then(function(response) {
      console.log('response', response)
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });

  }

  loadSurveys( surveyInfoList ){
    let promis = this.http.get( 'api/surveys' );
    promis.then(function(response) {
      console.log('response', response)
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
      for ( let obj of json ) {
        surveyInfoList.push( obj );
      }
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
  }

  initNewSurveyModel(){
    this.surveyModel = {};
    this.surveyModel.title = "New survey";
    this.surveyModel.questionnaire = {};
    this.surveyModel.questionnaire.questions = [];
    this.surveyModel.surveySettings = {};

    this.initSurveySettings();
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

  addQuestion( id, questionType, title, index, options, scales ){
    let questionNumber = this.surveyModel.questionnaire.questions.length;
    let question = this.surveyHelper.createQuestion( id, questionType, title, questionNumber, options, scales );
    this.surveyHelper.insertQuestion( this.surveyModel.questionnaire.questions, question, index );
  }

}
