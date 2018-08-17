import 'css/main.css';

import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyService} from "../../services/survey-service";
import {SurveyModelTransformer} from '../../transformer/survey-model-transformer';

@inject( EventAggregator, SurveyService, SurveyModelTransformer )
export class SurveyViewer {

  @bindable surveyModel;
  question;

  constructor( eventAggregator, surveyService, surveyModelTransformer ) {
    this.eventAggregator = eventAggregator;
    this.surveyService = surveyService;
    this.surveyModelTransformer = surveyModelTransformer;
  }

  bind() {
    let that = this;
    this.nextQuestionEvent = this.eventAggregator.subscribe( 'next-question', question => {
      that.getNextQuestion( question );
    } );
    this.prevQuestionEvent = this.eventAggregator.subscribe( 'prev-question', question => {
      that.getPrevQuestion( question );
    } );
  }

  unbind() {
    this.nextQuestionEvent.dispose();
    this.prevQuestionEvent.dispose();
  }

  getNextQuestion( data ){
    let index = data.index + 1;
    if( index < this.surveyModel.questionnaire.elements.length ){
      this.saveAnswers( data );
      this.question = this.surveyModel.questionnaire.elements[index];
    }else if( index === this.surveyModel.questionnaire.elements.length ){
      this.saveAnswers( data );
      this.closeAction.call();
    }
  }

  getPrevQuestion( data ){
    let index = data.index - 1;
    if( index >= 0 ){
      this.saveAnswers( data );
      this.question = this.surveyModel.questionnaire.elements[index];
    }
  }

  saveAnswers( data ){

    let answerData = {};
    answerData.id = 0;
    answerData.questionId = data.id;
    answerData.userId = 'test';
    answerData.surveyId = this.surveyModel.id;
    answerData.questionNumber = data.number;
    answerData.questionType = data.settings.questionType;
    answerData.options = [];
    for ( let element of data.options.elements ) {
      answerData.options.push( {id: element.id, name: element.name, selected: element.selected, scaleGroup: element.scaleGroup} );
    }

    this.surveyService.saveAnswers( answerData )
      .then( function ( response ) {
        console.log( response )
      } ).catch( function ( ex ) {
      console.log( 'parsing failed', ex )
    } );
  }

  fillAnswers( answersData, surveyModel ){

    for ( let answerObject of answersData ) {
      let questionId = answerObject.questionId;
      // find question by id in surveyModel
      let question = this.getQuestionById( surveyModel, questionId );

      // mark answered options
      this.markAnsweredOptions( question, answerObject );
    }

  }

  markAnsweredOptions( question, answerObject ){
    for ( let option of question.options.elements ) {
      let answeredOption = this.getAnsweredOptionById( answerObject, option.id );
      option.selected = answeredOption.selected;
      option.scaleGroup = answeredOption.scaleGroup;
      this.markSelectedScaleGroup( option );
    }
  }

  markSelectedScaleGroup( option ){
    for ( let scaleGrp of option.scaleGroup ) {
      scaleGrp.selected = this.getSelectedScaleGroupOption( scaleGrp.options );
    }
  }

  getSelectedScaleGroupOption( options ){
    for ( let option of options ) {
      if( option.selected ){
        return option;
      }
    }
  }

  getAnsweredOptionById( answerObject, optionId ){
    for ( let option of answerObject.options ) {
      if( option.id === optionId ){
        return option;
      }
    }
  }

  getQuestionById( surveyModel, questionId ){
    for ( let question of surveyModel.questionnaire.elements ) {
      if( question.id === questionId ){
        return question;
      }
    }
  }

  activate( data ) {
    let that = this;

    this.closeAction = data.closeAction;

    this.surveyService.loadRespondentSurvey( data.id )
      .then( function ( response ) {
        return response.json()
      } ).then( function ( data ) {
      let answersData = data.answers;

      that.surveyModel = that.surveyModelTransformer.deSerialize( data.surveyModel );
      if( answersData.length > 0 ){
        that.fillAnswers( answersData, that.surveyModel );
      }

      that.question = that.surveyModel.questionnaire.elements[0];
    } ).catch( function ( ex ) {
      console.log( 'parsing failed', ex )
    } );

  }

}
