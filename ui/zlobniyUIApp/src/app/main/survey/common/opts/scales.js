import 'css/survey.css';

import {bindable, computedFrom, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyHelper} from "../../../../services/survey-helper";
import {CollectionUtil} from "../../../../services/collection-util";
import {EventSources} from "../../../../services/event-sources";

@inject( EventAggregator, SurveyHelper, CollectionUtil, EventSources )
export class scales {

  @bindable question;
  @bindable params; // question selected and we show controls (like add, remove buttons)

  constructor( eventAggregator, surveyHelper, collectionUtil, eventSources ) {
    this.eventAggregator = eventAggregator;
    this.surveyHelper = surveyHelper;
    this.collectionUtil = collectionUtil;
    this.eventSources = eventSources;
  }

  // change scales in option for matrix.
  changeScalesGroup( oldIndex, newIndex ){
    let that = this;

    for ( let element of this.question.options.elements ) {
      let elementsHolder = {};
      elementsHolder.elements = element.scaleGroup;
      that.collectionUtil.updatePositions( newIndex, oldIndex, elementsHolder, false );
    }

  }

  attached() {
    let that = this;
    // this.removeScaleSub = this.eventAggregator.subscribe( that.question.scales.id + '-remove', index => {
    //   that.removeScale( index );
    // } );

    console.log( this.question.scales.id );
    this.changeScalesSub = this.eventAggregator.subscribe( this.question.scales.id + '-swap-scales', data => {
      that.changeScalesGroup( data.oldIndex, data.newIndex );
    } );
  }

  @computedFrom( 'question.scales.elements.length' )
  get canAdd(){
    return this.question.scales.elements.length <= 2;
  }

  addScale(){

    let data = {
      questionNumber: this.question.number,
    };

    this.eventSources.addEvent( 'scales.add', data );
  }


  detached() {
    this.changeScalesSub.dispose();
  }


}
