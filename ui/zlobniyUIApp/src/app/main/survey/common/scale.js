import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {SurveyHelper} from "../../../services/survey-helper";
import {Ui} from "../../../ui";

@inject( SurveyHelper, Ui )
export class Scale extends Ui {

  item = {};

  constructor( surveyHelper, ...rest ) {
    super(...rest);
    this.surveyHelper = surveyHelper;
  }

  addItem( options ){
    options.elements.push( this.surveyHelper.createOption( undefined, 'new step', this.item.type,  this.item.id, options.length, true ) );
  }

  activate( item ){
    this.item = item;
    this.item.name = item.type+'_'+item.qId;
  }

}
