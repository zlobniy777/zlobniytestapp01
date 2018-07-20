import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Ui} from "../../../ui";

@inject( EventAggregator, Ui )
export class Option extends Ui {

  item = {};
  scales = [];

  constructor( eventAggregator, ...rest ) {
    super(...rest);
    this.eventAggregator = eventAggregator;
  }

  removeOption( index ){
    this.eventAggregator.publish( this.item.optionsId + '-remove', index );
  }

  activate( item ){
    this.item = item;
    this.item.name = item.type+'_'+item.qId;
    if( item.question && item.question.scales ){
      this.scales = item.question.scales.elements;
    }

  }

}
