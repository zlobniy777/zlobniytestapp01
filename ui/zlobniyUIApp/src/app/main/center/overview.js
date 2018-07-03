import 'css/dashboard.css';

import {inject} from 'aurelia-framework';
import {SurveyService} from "../../services/survey-service";
import {Ui} from "../../ui";

@inject( SurveyService, Ui )
export class Overview extends Ui {

  title = "-";
  surveyInfoList = [];

  constructor( surveyService, router, http, ...rest ) {
    super(...rest);
    this.surveyService = surveyService;
    this.router = router;
    this.http = http;
  }

  activate(){
    this.surveyService.loadSurveys( this.surveyInfoList );
  }

}
