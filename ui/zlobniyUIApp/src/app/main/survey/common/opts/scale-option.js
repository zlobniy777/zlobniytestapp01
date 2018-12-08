import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {EventSources} from "../../../../services/event-sources";
import {Ui} from "../../../../ui";

@inject( EventAggregator, EventSources, Ui )
export class ScaleOption extends Ui {

  item = {};

  constructor( eventAggregator, eventSources, ...rest ) {
    super(...rest);
    this.eventAggregator = eventAggregator;
    this.eventSources = eventSources;
  }

  removeOption( index ){

    let data = {
      questionNumber: this.item.qNumber,
      scaleIndex: this.item.scaleIndex,
      optionIndex: index,
    };

    this.eventSources.addEvent( 'scaleOption.remove', data );

    // this.eventAggregator.publish( this.item.optionsId + '-remove', index );
  }

  activate( model ){
    this.item = model.item;
    this.params = model.params;

  }

}
