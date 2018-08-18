import 'css/survey.css';

import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyHelper} from "../../../../services/survey-helper";

@inject( EventAggregator, SurveyHelper )
export class optionsGroup {

  @bindable option;
  @bindable parent;
  @bindable layout;

  constructor( eventAggregator, surveyHelper ) {
    this.eventAggregator = eventAggregator;
    this.surveyHelper = surveyHelper;
  }

  changeMatrix( item ){
    for ( let option of this.parent.options ) {
      if( option.index === item.index ){
        option.selected = true;
      }else{
        option.selected = false;
      }
    }
  }

  attached() {

  }

  detached() {

  }

}
