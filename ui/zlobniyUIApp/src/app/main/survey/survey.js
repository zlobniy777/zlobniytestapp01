import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {SurveyService} from "../../services/survey-service";
import {NavigationService} from "../../services/navigation-service";
import {Ui} from "../../ui";
import {Router} from 'aurelia-router';

@inject( SurveyService, Router, NavigationService, Ui )
export class Survey extends Ui {

  constructor( surveyService, router, navigationService, ...rest ) {
    super( ...rest );
    this.surveyService = surveyService;
    this.router = router;
    this.navigationService = navigationService;

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
      }
      },
      {
        title: 'Save', action: function () {
        that.surveyService.saveSurvey();
      }
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
        that.surveyService.setSurveyModel( surveyModel );
        that.navigationService.setTitle( that.surveyService.surveyModel );
        console.log( surveyModel );
      } ).catch( function ( ex ) {
        console.log( 'parsing failed', ex )
      } );

    }else{
      // init new survey model
      this.surveyService.initNewSurveyModel();
      this.navigationService.setTitle( this.surveyService.surveyModel );
    }

  }

}
