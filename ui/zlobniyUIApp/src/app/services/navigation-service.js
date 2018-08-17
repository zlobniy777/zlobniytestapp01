import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {SurveyService} from './survey-service';


@inject( Router, SurveyService )
export class NavigationService {

  NAV_DASHBOARD = "/dashboard";
  NAV_SURVEY = "/survey";
  NAV_START_PAGE = "/";

  objectTitle;
  buttons = [];

  constructor( router, surveyService ) {
    this.router = router;
    this.surveyService = surveyService;
    this.objectTitle = {};
  }

  goTo( path ) {
    this.router.navigate( path );
  }

  setButtons( buttons ){
    this.buttons = buttons;
  }

  setTitle( title, editMode ){
    this.objectTitle = title;
    this.editMode = editMode;
  }

}
