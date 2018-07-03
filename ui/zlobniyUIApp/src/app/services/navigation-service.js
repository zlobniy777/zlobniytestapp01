import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';
import {SurveyService} from './survey-service';


@inject( HttpClient, Router, SurveyService )
export class NavigationService {

  NAV_DASHBOARD = "/dashboard";
  NAV_SURVEY = "/survey";
  NAV_START_PAGE = "/";

  objectTitle;
  buttons = [];

  constructor( http, router, surveyService ) {
    this.http = http;
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

  setTitle( title ){
    this.objectTitle = title;
  }

}
