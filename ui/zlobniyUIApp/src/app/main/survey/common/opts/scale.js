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

    this.item.question.options.elements.forEach( function ( element ) {
      element.scaleGroup.splice( index, 1 );

      var i = 0;
      element.scaleGroup.forEach(function( element ) {
        element.index = i;
        i++;
      });

    } );

  }

  activate( item ){
    this.item = item;
  }

}
