import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {Client} from "../../services/client";
import {Ui} from "../../ui";
import {Router} from 'aurelia-router';

@inject( Client, Router, Ui )
export class Survey extends Ui {

  constructor( client, router, ...rest ) {
    super( ...rest );
    this.client = client;
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
        if ( that.client.isEditedModel() ) {
          console.log( 'isEditedModel' );
          that.client.unsetEditedModel();
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
