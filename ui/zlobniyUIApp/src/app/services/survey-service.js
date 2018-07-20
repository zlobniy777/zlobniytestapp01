import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {SurveyModelTransformer} from '../transformer/survey-model-transformer';
import {SurveyHelper} from './survey-helper';
import {HttpService} from './http-service';

@inject( HttpService, Router, SurveyModelTransformer, SurveyHelper )
export class SurveyService {

  editedModel;

  constructor( httpService, router, surveyTransformer, surveyHelper ) {
    this.http = httpService;
    this.router = router;
    this.surveyTransformer = surveyTransformer;
    this.surveyHelper = surveyHelper;
  }



  setEditedModel( model ){
    console.log( 'start editing ' + model.name );
    if( this.editedModel ){
      console.log( 'already editing ' + this.editedModel );
      this.editedModel.finishEdit();
    }
    this.editedModel = model;
    console.log( 'editedModel = ' + this.editedModel );
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
    let surveyModel = {};
    surveyModel.title = "New survey";
    surveyModel.questionnaire = {};
    surveyModel.questionnaire.questions = [];
    surveyModel.surveySettings = {};

    return surveyModel;
  }

  updatePositions( newIndex, oldIndex, surveyModel ){
    if (newIndex != oldIndex) {
      let questions = surveyModel.questionnaire.questions;

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

      this.sort( surveyModel );
    }
  }

  sort( surveyModel ){
    surveyModel.questionnaire.questions.sort( function compare(a, b) {
      if (a.index < b.index) {
        return -1;
      }
      if (a.index > b.index) {
        return 1;
      }
      return 0;
    } );
  }

  deleteQuestion( surveyModel, index ){
    surveyModel.questionnaire.questions.splice( index, 1 );
    this.surveyHelper.updateIndex( surveyModel.questionnaire.questions );
  }

  addQuestion( id, questionType, title, index, options, scales, surveyModel ){
    let questionNumber = surveyModel.questionnaire.questions.length;
    let question = this.surveyHelper.createQuestion( id, questionType, title, questionNumber, options, scales );
    this.surveyHelper.insertQuestion( surveyModel.questionnaire.questions, question, index );
  }

}
