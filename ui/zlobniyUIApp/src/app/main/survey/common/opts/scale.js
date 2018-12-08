import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyHelper} from "../../../../services/survey-helper";
import {EventSources} from "../../../../services/event-sources";
import {Ui} from "../../../../ui";

@inject( SurveyHelper, EventAggregator, EventSources, Ui )
export class Scale extends Ui {

  item = {};

  constructor( surveyHelper, eventAggregator, eventSources, ...rest ) {
    super(...rest);
    this.surveyHelper = surveyHelper;
    this.eventAggregator = eventAggregator;
    this.eventSources = eventSources;
  }

  removeOption( index ){
    let data = {
      questionNumber: this.item.qNumber,
      index: index,
    };

    this.eventSources.addEvent( 'scales.remove', data );
  }

  activate( model ){
    this.item = model.item;
    this.params = model.params;
  }

}
