import 'css/main.css';

import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyService} from "../../services/survey-service";
import {NavigationService} from "../../services/navigation-service";
import {SurveyModelTransformer} from '../../transformer/survey-model-transformer';

@inject( EventAggregator, SurveyService, NavigationService, SurveyModelTransformer )
export class SurveyViewer {

  @bindable surveyModel;
  question;
  userId;

  constructor( eventAggregator, surveyService, navigationService, surveyModelTransformer ) {
    this.eventAggregator = eventAggregator;
    this.surveyService = surveyService;
    this.navigationService = navigationService;
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
      if( this.closeAction ){
        this.closeAction.call();
      }else{
        console.log( 'redirect to end of answering survey' );
      }
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
    answerData.questionId = data.id;
    answerData.userId = this.userId ? this.userId : 'test';
    answerData.surveyId = this.surveyModel.id;
    answerData.questionNumber = data.number;
    answerData.questionType = data.settings.questionType;
    answerData.options = [];
    for ( let element of data.options.elements ) {
      answerData.options.push( {index: element.index, name: element.name, selected: element.selected, value:'', scaleGroup: element.scaleGroup} );
    }
    answerData.freeTextOption = {name: 'freeTextOption', selected: false, value:data.options.freeTextOption, scaleGroup: null};

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

      //fill free text option
      if( answerObject.freeTextOption ){
        question.options.freeTextOption = answerObject.freeTextOption.value;
      }

    }

  }

  markAnsweredOptions( question, answerObject ){
    for ( let option of question.options.elements ) {
      let answeredOption = this.getAnsweredOptionByIndex( answerObject, option.index );
      if( answeredOption ){
        option.selected = answeredOption.selected;


      }
      this.markSelectedScaleGroup( option, answeredOption );
    }
  }

  markSelectedScaleGroup( option, answeredOption ){
    let that = this;
    for ( let scaleGrp of option.scaleGroup ) {
      let scaleGroupOptions = [];
      if( answeredOption && answeredOption.scaleGroup ){
        scaleGroupOptions = that.getAnsweredScaleOptions( scaleGrp, answeredOption.scaleGroup );
        if( !scaleGroupOptions ){
          scaleGroupOptions = [];
        }
      }
      scaleGrp.selected = this.getSelectedScaleGroupOption( scaleGrp.options, scaleGroupOptions );
    }
  }

  getAnsweredScaleOptions( scaleGroup, answeredScaleGroups ){
    for ( let scaleGrp of answeredScaleGroups ) {
      if( scaleGroup.index === scaleGrp.index ){
        return scaleGrp.options;
      }
    }
  }

  getSelectedScaleGroupOption( options, scaleGroup ){
    let that = this;
    let selectedOption;
    for ( let option of options ) {
      // mark all selected options is selected, for multiple questions
      option.selected = that.isScaleOptionSelected( option, scaleGroup );
      if( option.selected ){
        selectedOption = option;
      }
    }
    if( selectedOption ){
      return selectedOption;
    }
  }
  
  isScaleOptionSelected( option, answeredOptions ){
    for ( let scaleOption of answeredOptions ) {
      let isSelected = (option.index === scaleOption.index);
      if( isSelected ){
        console.log( 'Option index: ' + option.index + ' answered index: ' + scaleOption.index + ' is true? ' + isSelected );
        return isSelected;
      }
    }
  }

  getAnsweredOptionByIndex( answerObject, optionIndex ){
    for ( let option of answerObject.options ) {
      if( option.index === optionIndex ){
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

   if( data.checksum ){
     this.openAsRespondent( data.checksum );
   }else{
     this.inPopup( data );
   }

  }

  openAsRespondent( checksum ){
    let that = this;

    console.log( 'openAsRespondent ' + checksum );
    this.navigationService.showClientInfo = false;

    this.surveyService.loadRealRespondentSurvey( checksum )
      .then( function ( response ) {
        return response.json()
      } ).then( function ( data ) {
      let answersData = data.answers;
      that.userId = data.userId;

      that.surveyModel = that.surveyModelTransformer.deSerialize( data.surveyView );
      if( answersData.length > 0 ){
        that.fillAnswers( answersData, that.surveyModel );
      }

      that.question = that.surveyModel.questionnaire.elements[0];
    } ).catch( function ( ex ) {
      console.log( 'parsing failed', ex )
    } );

  }

  inPopup( data ){
    let that = this;
    this.closeAction = data.closeAction;

    this.surveyService.loadRespondentSurvey( data.id )
      .then( function ( response ) {
        return response.json()
      } ).then( function ( data ) {
      let answersData = data.answers;

      that.surveyModel = that.surveyModelTransformer.deSerialize( data.surveyView );
      if( answersData.length > 0 ){
        that.fillAnswers( answersData, that.surveyModel );
      }

      that.question = that.surveyModel.questionnaire.elements[0];
    } ).catch( function ( ex ) {
      console.log( 'parsing failed', ex )
    } );
  }

}
