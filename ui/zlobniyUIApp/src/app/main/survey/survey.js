import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {SurveyService} from "../../services/survey-service";
import {EventAggregator} from 'aurelia-event-aggregator';
import {NavigationService} from "../../services/navigation-service";
import {SurveyModelTransformer} from '../../transformer/survey-model-transformer';
import {Ui} from "../../ui";
import {Router} from 'aurelia-router';

@inject( SurveyService, Router, NavigationService, EventAggregator, SurveyModelTransformer, Ui )
export class Survey extends Ui {

  surveyModel = {};

  constructor( surveyService, router, navigationService, eventAggregator, surveyModelTransformer, ...rest ) {
    super( ...rest );
    this.surveyService = surveyService;
    this.router = router;
    this.navigationService = navigationService;
    this.eventAggregator = eventAggregator;
    this.surveyModelTransformer = surveyModelTransformer;

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
 }

  detached() {
    document.removeEventListener( 'click', this.surveyMouseHandler );
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
            that.surveyModel = that.surveyModelTransformer.deSerialize( surveyModel );
            that.navigationService.setTitle( that.surveyModel, true );
          } ).catch( function ( ex ) {
            console.log( 'parsing failed', ex )
          } );

      }, css: 'fas fa-save'
      }
    ];

    this.navigationService.setButtons( buttons );

    if( data.id !== undefined ){
      // load survey from server
      this.surveyService.loadSurvey( data.id )
        .then( function ( response ) {
          return response.json()
        } ).then( function ( surveyModel ) {
        console.log( 'parsed json', surveyModel );
        that.surveyModel = that.surveyModelTransformer.deSerialize( surveyModel );
        that.navigationService.setTitle( that.surveyModel, true );
      } ).catch( function ( ex ) {
        console.log( 'parsing failed', ex )
      } );

    }else{
      // init new survey model
      that.surveyModel = that.surveyService.initNewSurveyModel();
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

}
