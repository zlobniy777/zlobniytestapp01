import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Ui} from "../../../../ui";

@inject( EventAggregator, Ui )
export class Option extends Ui {

  item = {};
  selected;

  constructor( eventAggregator, ...rest ) {
    super(...rest);
    this.eventAggregator = eventAggregator;
  }

  change( isChecked ){
    let data = {item:this.item, checked:isChecked};
    this.eventAggregator.publish( this.item.optionsId + '-change', data );
  }

  removeOption( index ){
    this.eventAggregator.publish( this.item.optionsId + '-remove', index );
  }

  activate( model ){
    this.item = model.item;
    this.params = model.params;
    if( this.item.selected ){
      this.selected = this.item;
    }

  }

}
