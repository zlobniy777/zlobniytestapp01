import 'css/survey.css';

import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyHelper} from "../../../../services/survey-helper";
import {EventSources} from "../../../../services/event-sources";

@inject( EventAggregator, SurveyHelper, EventSources )
export class ScaleOptions {

  @bindable item;
  @bindable params; // question selected and we show controls (like add, remove buttons)

  constructor( eventAggregator, surveyHelper, eventSources ) {
    this.eventAggregator = eventAggregator;
    this.surveyHelper = surveyHelper;
    this.eventSources = eventSources;
  }

  addItem( event ){

    let data = {
      questionNumber: this.item.qNumber,
      scaleIndex: this.item.index,
    };

    this.eventSources.addEvent( 'scaleOption.add', data );

    event.stopImmediatePropagation();
  }

  // removeItem( index ) {
  //   // delete item
  //   this.surveyHelper.deleteItem( this.item.options.elements, index );
  //   // when we delete scale step we need update scaleGroup in question.options (row)
  //   let data = {scaleIndex: this.item.index, scaleStepIndex: index};
  //   this.eventAggregator.publish( 'options_' + this.item.qId + '-remove-scale-sub-group', data );
  //
  // }


  attached() {
    // let that = this;
    // this.removeOptionSub = this.eventAggregator.subscribe( this.item.options.id + '-remove', index => {
    //   that.removeItem( index );
    // } );

  }

  detached() {
    // this.removeOptionSub.dispose();
  }

}
