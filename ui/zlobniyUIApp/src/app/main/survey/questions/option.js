import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {SurveyService} from "../../../services/survey-service";
import {Ui} from "../../../ui";
import {Router} from 'aurelia-router';

@inject( SurveyService, Router, Ui )
export class Option extends Ui {

  item = {};

  constructor( surveyService, router, ...rest ) {
    super(...rest);
    this.surveyService = surveyService;
    this.router = router;
  }

  activate( item ){
    this.item = item;
    this.item.name = item.type+'_'+item.qId;
  }

}
