import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Ui} from "../../../../ui";

@inject( EventAggregator, Ui )
export class Option extends Ui {

  item = {};
  scales = [];
  selected;

  constructor( eventAggregator, ...rest ) {
    super(...rest);
    this.eventAggregator = eventAggregator;
  }

  change( isChecked ){
    let data = {item:this.item, checked:isChecked};
    this.eventAggregator.publish( this.item.optionsId + '-change', data );
  }

  changeMatrix( item, scale, scaleStep ){
    let data = {option: item, scale: scale, scaleStep: scaleStep};
    this.eventAggregator.publish( this.item.optionsId + '-change-matrix', data );
  }

  removeOption( index ){
    this.eventAggregator.publish( this.item.optionsId + '-remove', index );
  }

  activate( item ){
    let that = this;
    this.item = item;
    if( this.item.selected ){
      this.selected = this.item;
    }
    // this.item.name = item.type+'_'+item.qId;
    if( this.item.question.settings.questionType === 'matrix' && this.item.type === 'closed-option' ){
      this.scales = this.item.question.scales.elements;
    }

  }

}
