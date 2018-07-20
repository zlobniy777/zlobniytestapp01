import 'css/dashboard.css';

import {inject} from 'aurelia-framework';
import {SurveyService} from "../../services/survey-service";
import {NavigationService} from "../../services/navigation-service";
import {Ui} from "../../ui";

@inject( SurveyService, NavigationService, Ui )
export class Overview extends Ui {

  title = "-";
  surveyInfoList = [];

  constructor( surveyService, navigationService, ...rest ) {
    super(...rest);
    this.surveyService = surveyService;
    this.navigationService = navigationService;
  }

  open( id ){
    this.navigationService.goTo( this.navigationService.NAV_SURVEY + "/" + id );
  }

  activate(){
    this.surveyService.loadSurveys( this.surveyInfoList );
  }

}
