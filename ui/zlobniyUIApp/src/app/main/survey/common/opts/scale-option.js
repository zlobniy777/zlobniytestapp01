import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Ui} from "../../../../ui";

@inject( EventAggregator, Ui )
export class ScaleOption extends Ui {

  item = {};

  constructor( eventAggregator, ...rest ) {
    super(...rest);
    this.eventAggregator = eventAggregator;
  }

  removeOption( index ){
    this.eventAggregator.publish( this.item.optionsId + '-remove', index );
  }

  activate( model ){
    this.item = model.item;
    this.params = model.params;

  }

}