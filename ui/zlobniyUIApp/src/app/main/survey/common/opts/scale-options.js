import 'css/survey.css';

import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyHelper} from "../../../../services/survey-helper";

@inject( EventAggregator, SurveyHelper )
export class ScaleOptions {

  @bindable item;
  @bindable params; // question selected and we show controls (like add, remove buttons)

  constructor( eventAggregator, surveyHelper ) {
    this.eventAggregator = eventAggregator;
    this.surveyHelper = surveyHelper;
  }

  addItem( event ){
    let option = this.surveyHelper.createOption(
      undefined,
      '',
      'scale-option',
      this.item.id,
      this.item.options.elements.length,
      true,
      'justify-content-center',
      this.item.options.id,
      [],
      "./../common/opts/scale-option"
    );

    this.item.options.elements.push( option );
    // add new item in scale index = this.item.index
    this.eventAggregator.publish( 'options_' + this.item.qId + '-add-scale-sub-group', this.item.index );

    event.stopImmediatePropagation();
  }

  removeItem( index ) {
    // delete item
    this.surveyHelper.deleteItem( this.item.options.elements, index );
    // when we delete scale step we need update scaleGroup in question.options (row)
    let data = {scaleIndex: this.item.index, scaleStepIndex: index};
    this.eventAggregator.publish( 'options_' + this.item.qId + '-remove-scale-sub-group', data );

  }


  attached() {
    let that = this;
    this.removeOptionSub = this.eventAggregator.subscribe( this.item.options.id + '-remove', index => {
      that.removeItem( index );
    } );

  }

  detached() {
    this.removeOptionSub.dispose();
  }

}
