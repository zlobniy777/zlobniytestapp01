import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {SurveyService} from "../../services/survey-service";
import {Ui} from "../../ui";
import {Router} from 'aurelia-router';

@inject( SurveyService, Router, Ui )
export class Survey extends Ui {

  constructor( surveyService, router, ...rest ) {
    super( ...rest );
    this.surveyService = surveyService;
    this.router = router;

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

  exit() {
    this.router.navigate( "/dashboard" );
  }

  attached() {
    document.addEventListener( 'click', this.surveyMouseHandler );
  }

  detached() {
    document.removeEventListener( 'click', this.surveyMouseHandler );
  }


}
