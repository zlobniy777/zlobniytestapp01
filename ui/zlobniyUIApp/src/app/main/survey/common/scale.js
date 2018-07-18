import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyHelper} from "../../../services/survey-helper";
import {Ui} from "../../../ui";

@inject( SurveyHelper, EventAggregator, Ui )
export class Scale extends Ui {

  item = {};

  constructor( surveyHelper, eventAggregator, ...rest ) {
    super(...rest);
    this.surveyHelper = surveyHelper;
    this.eventAggregator = eventAggregator;
  }

  addItem( options ){
    options.elements.push( this.surveyHelper.createOption( undefined, 'new step', this.item.type,  this.item.id, options.length, true ) );
  }

  activate( item ){
    this.item = item;
    this.item.name = item.type+'_'+item.qId;
  }

}
