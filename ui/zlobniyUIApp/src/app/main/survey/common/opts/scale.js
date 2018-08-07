import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyHelper} from "../../../../services/survey-helper";
import {Ui} from "../../../../ui";

@inject( SurveyHelper, EventAggregator, Ui )
export class Scale extends Ui {

  item = {};

  constructor( surveyHelper, eventAggregator, ...rest ) {
    super(...rest);
    this.surveyHelper = surveyHelper;
    this.eventAggregator = eventAggregator;
  }

  removeOption( index ){
    this.eventAggregator.publish( this.item.scaleId + '-remove', index );

  }

  activate( model ){
    this.item = model.item;
    this.params = model.params;
  }

}
