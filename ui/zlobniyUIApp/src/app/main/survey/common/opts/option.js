import 'css/survey.css';

import {computedFrom, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Ui} from "../../../../ui";
import {EventSources} from "../../../../services/event-sources";

@inject( EventAggregator, EventSources, Ui)
export class Option extends Ui {

  item = {};
  selected;

  constructor( eventAggregator, eventSources, ...rest ) {
    super(...rest);
    this.eventAggregator = eventAggregator;
    this.eventSources = eventSources;
  }

  change( isChecked ){
    let data = {item:this.item, checked:isChecked};
    this.eventAggregator.publish( this.item.optionsId + '-change', data );
  }

  removeOption( index ){

    let data = {
      questionNumber: this.item.qNumber,
      index: index,
    };

    this.eventSources.addEvent( 'option.remove', data );
    //this.eventAggregator.publish( this.item.optionsId + '-remove', index );
  }

  @computedFrom( 'params.settings.questionType', 'params.settings.layout' )
  get view(){
    if( this.params.settings.questionType === 'closed' ){
      if( this.params.settings.layout === 'radio' || this.params.settings.layout === 'checkbox' ){
        return "app/main/survey/common/opts/option-layout/radio-checkbox-single.html";
      }
      if( this.params.settings.layout === 'list' ){
        return "app/main/survey/common/opts/option-layout/list-single.html";
      }

    }else if( this.params.settings.questionType === 'matrix' ){
      return "app/main/survey/common/opts/option-layout/radio-checkbox-matrix.html";
    }
  }

  activate( model ){
    this.item = model.item;
    this.params = model.params;
    if( this.item.selected ){
      this.selected = this.item;
    }

  }

}
