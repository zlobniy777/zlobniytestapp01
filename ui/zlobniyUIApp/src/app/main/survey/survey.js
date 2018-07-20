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

  availableItems = [];
  sortableData;
  surveyModel = {};

  constructor( surveyService, router, navigationService, eventAggregator, surveyModelTransformer, ...rest ) {
    super( ...rest );
    this.surveyService = surveyService;
    this.router = router;
    this.navigationService = navigationService;
    this.eventAggregator = eventAggregator;
    this.surveyModelTransformer = surveyModelTransformer;

    this.initSurveyMouseHandler();

    this.availableItems = [
      {'title':'Only one answer', 'type':'closed'},
      {'title':'Matrix', 'type':'matrix'}
    ];

    this.sortableData = {};
    this.sortableData.elements = [];
    this.sortableData.identifier = 'questions';
    this.sortableData.cssClass = '';
    this.sortableData.type = '';
    this.sortableData.groupName = 'questions';

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
    console.log('attached survey ');
    document.addEventListener( 'click', this.surveyMouseHandler );
  }

  detached() {
    console.log('detached survey ');
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
        that.surveyService.saveSurvey( that.surveyModel );
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
        that.navigationService.setTitle( that.surveyModel );
        console.log( surveyModel );
      } ).catch( function ( ex ) {
        console.log( 'parsing failed', ex )
      } );

    }else{
      // init new survey model
      this.surveyModel = this.surveyService.initNewSurveyModel();
      this.navigationService.setTitle( this.surveyModel );
    }

  }

}
