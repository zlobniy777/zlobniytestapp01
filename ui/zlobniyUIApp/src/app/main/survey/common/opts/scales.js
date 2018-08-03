import 'css/survey.css';

import {bindable, computedFrom, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyHelper} from "../../../../services/survey-helper";
import {CollectionUtil} from "../../../../services/collection-util";

@inject( EventAggregator, SurveyHelper, CollectionUtil )
export class scales {

  @bindable question;

  constructor( eventAggregator, surveyHelper, collectionUtil ) {
    this.eventAggregator = eventAggregator;
    this.surveyHelper = surveyHelper;
    this.collectionUtil = collectionUtil;
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
    this.removeScaleSub = this.eventAggregator.subscribe( that.question.scales.id + '-remove', index => {
      that.surveyHelper.deleteItem( that.question.scales.elements, index );
    } );

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
    let that = this;
    let scale = this.surveyHelper.createScale(
      undefined,
      'new scale',
      this.question.settings.questionType,
      this.question.id,
      this.question.scales.elements.length,
      false,
      this.surveyHelper.createDefaultScaleSteps(),
      this.question.scales.id,
      this.question);
    let groupIndex = this.question.scales.elements.length;

    this.question.scales.elements.push( scale );

    this.question.options.elements.forEach( function ( element ) {
      let group = that.surveyHelper.createGroup( scale, groupIndex, scale.name, element.name );
      element.scaleGroup.push( group );
    } );

  }

  detached() {
    this.removeScaleSub.dispose();
    this.changeScalesSub.dispose();
  }


}
