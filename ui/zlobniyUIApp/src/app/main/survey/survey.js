import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {SurveyService} from "../../services/survey-service";
import {SurveyHelper} from "../../services/survey-helper";
import {EventAggregator} from 'aurelia-event-aggregator';
import {NavigationService} from "../../services/navigation-service";
import {EventSources} from "../../services/event-sources";
import {SurveyModelTransformer} from '../../transformer/survey-model-transformer';
import {Ui} from "../../ui";
import {Router} from 'aurelia-router';
import $ from 'jquery';

@inject( SurveyService, Router, NavigationService, EventAggregator, SurveyModelTransformer, EventSources, SurveyHelper, Ui )
export class Survey extends Ui {

  surveyModel = {};

  constructor( surveyService, router, navigationService, eventAggregator, surveyModelTransformer, eventSource, surveyHelper, ...rest ) {
    super( ...rest );
    this.surveyService = surveyService;
    this.router = router;
    this.navigationService = navigationService;
    this.eventAggregator = eventAggregator;
    this.surveyModelTransformer = surveyModelTransformer;
    this.eventSources = eventSource;
    this.surveyHelper = surveyHelper;

    this.initSurveyMouseHandler();
  }

  initSurveyMouseHandler(){
    let that = this;
    this.surveyMouseHandler = e => {
      console.log( e.target.dataset.type );
      if ( e.target.dataset.type === 'editable' ) {
        //console.log( that.name + " " + e.target );
      } else {
        console.log( 'not editable field' );
        if ( that.surveyService.isEditedModel() ) {
          console.log( 'isEditedModel' );
          that.surveyService.unsetEditedModel();
        } else {
          console.log( 'nothing to edit' );
        }
      }

    };
  }

  attached() {
    document.addEventListener( 'click', this.surveyMouseHandler );
    this.changeTitleSubscriber();
 }

  detached() {
    document.removeEventListener( 'click', this.surveyMouseHandler );
    this.changeTitleSub.dispose();
    this.clearSurveyInfo();
  }

  clearSurveyInfo(){
    this.navigationService.setTitle( {} );
    this.surveyService.unSetSurveyModel();
  }

  activate( data ){

    let that = this;
    let buttons = [
      {
        title: 'Exit', action: function () {
          that.navigationService.goTo( that.navigationService.NAV_DASHBOARD );
        }, css: 'fa fa-arrow-circle-left'
      },
      {
        title: 'Save', action: function () {
        //that.surveyService.saveSurvey( that.surveyModel );
          console.log( 'save survey button pressed' );
          that.surveyService.saveSurvey( that.surveyModel )
            .then( function ( response ) {
              return response.json()
            } ).then( function ( surveyModel ) {
            console.log( 'parsed json', surveyModel );
            that.tempSurveyModel = that.surveyModelTransformer.deSerialize( surveyModel );
            that.surveyModel = $.extend(true, {}, that.tempSurveyModel);
            that.navigationService.setTitle( that.surveyModel, true );
          } ).catch( function ( ex ) {
            console.log( 'parsing failed', ex )
          } );

      }, css: 'fas fa-save'
      },
      {
        title: 'undo', action: function () {

          if( !that.eventSources.isPossibleUndo() ) return;

          that.tempSurveyModel2 = $.extend(true, {}, that.tempSurveyModel );

          that.surveyModel.questionnaire.elements = that.tempSurveyModel2.questionnaire.elements;
          //that.surveyModel.questionnaire.elements = that.tempSurveyModel.questionnaire.elements;
          that.surveyModel.surveySettings = that.tempSurveyModel2.surveySettings;
          that.surveyModel.title = that.tempSurveyModel2.title;

          that.eventSources.executeAllExceptLast();

        }, css: 'fas fa-undo-alt'
      },
      {
        title: 'redo', action: function () {

          if( !that.eventSources.isPossibleRedo() ) return;

          that.tempSurveyModel2 = $.extend(true, {}, that.tempSurveyModel );

          that.surveyModel.questionnaire.elements = that.tempSurveyModel2.questionnaire.elements;
          //that.surveyModel.questionnaire.elements = that.tempSurveyModel.questionnaire.elements;
          that.surveyModel.surveySettings = that.tempSurveyModel2.surveySettings;
          that.surveyModel.title = that.tempSurveyModel2.title;

          that.eventSources.executeNextFromPosition();

        }, css: 'fas fa-redo-alt'
      },
    ];

    this.navigationService.setButtons( buttons );

    if( data.id !== undefined ){
      // load survey from server
      this.surveyService.loadSurvey( data.id )
        .then( function ( response ) {
          return response.json()
        } ).then( function ( surveyModel ) {
        console.log( 'parsed json', surveyModel );
        that.tempSurveyModel = that.surveyModelTransformer.deSerialize( surveyModel );
        //that.tempSurveyModel2 = $.extend(true, {}, that.tempSurveyModel);
        that.surveyModel = $.extend(true, {}, that.tempSurveyModel);
        that.navigationService.setTitle( that.surveyModel, true );
      } ).catch( function ( ex ) {
        console.log( 'parsing failed', ex )
      } );

    }else{
      // init new survey model
      that.tempSurveyModel = that.surveyService.initNewSurveyModel();
      //that.tempSurveyModel2 = $.extend(true, {}, that.tempSurveyModel);
      that.surveyModel = $.extend(true, {}, that.tempSurveyModel);
      that.navigationService.setTitle( that.surveyModel, true );

      // setTimeout( () => {
      //   that.surveyModel = that.surveyService.initNewSurveyModel();
      //   setTimeout( () => {
      //     that.navigationService.setTitle( that.surveyModel );
      //     setTimeout( () => {
      //       //alert('done');
      //     } );
      //   } );
      // } );

    }

  }

  // event, update any editable field in survey, title, options, scales ...
  changeTitleSubscriber(){
    let that = this;

    this.changeTitleSub = this.eventAggregator.subscribe('change.title', event => {

      let item = event.item;
      let value = event.value;

      if( item.type === 'SurveyModel' ){
        // update survey title
        that.surveyModel.title = value;
      }else{
        // update item in question
        let question = that.surveyHelper.findQuestionByNumber( that.surveyModel, item.qNumber );
        let type = item.type;
        let index = item.index;
        let scaleIndex = item.scaleIndex;


        switch ( type ){
          case 'scale':
            let scale = that.surveyHelper.findScaleByIndex( question, index );
            scale.title = value;
            break;
          case 'scale-option':
            let scaleOption = that.surveyHelper.findScaleOptionByIndex( question, scaleIndex, index );
            scaleOption.title = value;
            break;
          case 'closed-option':
            let option = that.surveyHelper.findOptionByIndex( question, index );
            option.title = value;
            break;

          default:
            console.log( 'unexpected journey' );

        }

      }

    });
  }

}
