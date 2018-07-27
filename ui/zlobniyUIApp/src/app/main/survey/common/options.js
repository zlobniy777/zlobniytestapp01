import 'css/survey.css';

import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyHelper} from "../../../services/survey-helper";

@inject( EventAggregator, SurveyHelper )
export class options {

  @bindable item;

  constructor( eventAggregator, surveyHelper ) {
    this.eventAggregator = eventAggregator;
    this.surveyHelper = surveyHelper;
  }

  addItem(  ){
    let option;
    if( this.item.type === 'scale' ){
      option = this.surveyHelper.createOption(
        undefined,
        'new option',
        'scale-option',
        this.item.id,
        this.item.options.elements.length,
        true,
        undefined,
        this.item.question,
        this.item.options.id,
      );
    } else {
      option = this.surveyHelper.createOption(
        undefined,
        'new option',
        'closed-option',
        this.item.id,
        this.item.options.elements.length,
        true,
        undefined,
        this.item,
        this.item.options.id,
      );
    }

    this.item.options.elements.push( option );
  }


  attached() {
    let that = this;
    this.removeOptionSub = this.eventAggregator.subscribe( this.item.options.id + '-remove', index => {
      that.surveyHelper.deleteItem( that.item.options.elements, index );
    } );
  }

  detached() {
    this.removeOptionSub.dispose();
  }

}
