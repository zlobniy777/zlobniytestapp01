import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {SurveyService} from "../../../services/survey-service";
import {Ui} from "../../../ui";

@inject( SurveyService, Ui )
export class Option extends Ui {

  item = {};
  scales = [];

  constructor( surveyService, ...rest ) {
    super(...rest);
    this.surveyService = surveyService;
  }

  activate( item ){
    this.item = item;
    this.item.name = item.type+'_'+item.qId;
    if( item.question ){
      this.scales = item.question.scales.elements;
    }

  }

}
